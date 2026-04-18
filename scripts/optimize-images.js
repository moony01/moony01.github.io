/**
 * 이미지 최적화 스크립트
 * JPG/PNG/GIF → WebP 변환 및 다중 해상도 생성
 * 변환 완료 또는 기존 WebP 존재 시 원본 삭제
 * 
 * 사용법:
 * node scripts/optimize-images.js --input ./static/img/posts/slug
 * node scripts/optimize-images.js --all (전체 이미지)
 */

import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 설정 로드
const config = JSON.parse(
  await fs.readFile(path.join(__dirname, 'config/images.json'), 'utf-8')
);

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function deleteOriginal(inputPath, reason) {
  await fs.unlink(inputPath);
  console.log(`    → ${path.basename(inputPath)} 삭제 (${reason})`);
}

/**
 * 이미지를 WebP로 변환하고 다중 해상도 생성
 * @param {string} inputPath - 입력 이미지 경로
 * @param {string} outputDir - 출력 디렉토리
 */
async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const webpPath = path.join(outputDir, `${filename}.webp`);

  if (await fileExists(webpPath)) {
    console.log(`  [스킵] ${path.basename(inputPath)} (기존 WebP 발견)`);
    await deleteOriginal(inputPath, '기존 WebP 있음');
    return { optimized: false, skipped: true, deleted: true };
  }

  const metadata = await sharp(inputPath).metadata();
  
  console.log(`  [처리] ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`);
  
  // 원본 크기 WebP
  await sharp(inputPath)
    .webp({ quality: config.quality })
    .toFile(webpPath);
  
  // 다중 해상도 생성
  for (const width of config.sizes) {
    if (metadata.width > width) {
      await sharp(inputPath)
        .resize(width)
        .webp({ quality: config.quality })
        .toFile(path.join(outputDir, `${filename}-${width}.webp`));
      console.log(`    → ${filename}-${width}.webp`);
    }
  }

  await deleteOriginal(inputPath, 'WebP 변환 완료');
  
  console.log(`    → ${filename}.webp ✅`);
  return { optimized: true, skipped: false, deleted: true };
}

/**
 * 디렉토리 내 모든 이미지 처리
 * @param {string} inputDir - 입력 디렉토리
 */
async function processDirectory(inputDir) {
  const images = await glob(`${inputDir}/**/*.{jpg,jpeg,png,gif}`, {
    ignore: ['**/node_modules/**']
  });
  
  if (images.length === 0) {
    console.log('처리할 이미지가 없습니다.');
    return;
  }
  
  console.log(`\n🖼️ ${images.length}개 이미지 발견\n`);

  let optimizedCount = 0;
  let skippedCount = 0;
  let deletedCount = 0;
  
  for (const imagePath of images) {
    const outputDir = path.dirname(imagePath);
    const result = await optimizeImage(imagePath, outputDir);

    if (result.optimized) {
      optimizedCount++;
    }

    if (result.skipped) {
      skippedCount++;
    }

    if (result.deleted) {
      deletedCount++;
    }
  }
  
  console.log(`\n✅ 완료! 변환 ${optimizedCount}개, 스킵 ${skippedCount}개, 원본 삭제 ${deletedCount}개\n`);
}

// CLI 처리
const args = process.argv.slice(2);
const inputIndex = args.indexOf('--input');
const allFlag = args.includes('--all');

if (allFlag) {
  await processDirectory(config.inputDir);
} else if (inputIndex !== -1 && args[inputIndex + 1]) {
  await processDirectory(args[inputIndex + 1]);
} else {
  console.log(`
사용법:
  node scripts/optimize-images.js --input <디렉토리>
  node scripts/optimize-images.js --all
  
예시:
  node scripts/optimize-images.js --input ./static/img/posts/my-post
  node scripts/optimize-images.js --all
`);
}
