/**
 * 이미지 최적화 스크립트
 * JPG/PNG → WebP 변환 및 다중 해상도 생성
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

// --keep-originals 플래그: 원본 파일 유지 (로컬 개발 시 사용)
const keepOriginals = process.argv.includes('--keep-originals');

/**
 * 이미지를 WebP로 변환하고 다중 해상도 생성
 * @param {string} inputPath - 입력 이미지 경로
 * @param {string} outputDir - 출력 디렉토리
 */
async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  console.log(`  [처리] ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`);
  
  // 원본 크기 WebP
  await image
    .webp({ quality: config.quality })
    .toFile(path.join(outputDir, `${filename}.webp`));
  
  // 다중 해상도 생성
  for (const [sizeName, width] of Object.entries(config.sizes)) {
    if (width && metadata.width > width) {
      await sharp(inputPath)
        .resize(width)
        .webp({ quality: config.quality })
        .toFile(path.join(outputDir, `${filename}-${width}.webp`));
      console.log(`    → ${filename}-${width}.webp`);
    }
  }
  
  console.log(`    → ${filename}.webp ✅`);

  // WebP 변환 성공 후 원본 파일 삭제 (--keep-originals 미지정 시)
  if (!keepOriginals) {
    const webpPath = path.join(outputDir, `${filename}.webp`);
    try {
      await fs.access(webpPath);
      await fs.unlink(inputPath);
      console.log(`    🗑️ 원본 삭제: ${path.basename(inputPath)}`);
    } catch (err) {
      console.warn(`    ⚠️ 원본 유지 (WebP 미확인): ${path.basename(inputPath)}`);
    }
  }
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
  
  for (const imagePath of images) {
    const outputDir = path.dirname(imagePath);
    await optimizeImage(imagePath, outputDir);
  }
  
  console.log(`\n✅ 완료! ${images.length}개 이미지 최적화됨\n`);
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
  node scripts/optimize-images.js --all --keep-originals

옵션:
  --keep-originals  WebP 변환 후 원본 PNG/JPG/GIF 유지 (로컬 개발용)

예시:
  node scripts/optimize-images.js --input ./static/img/posts/my-post
  node scripts/optimize-images.js --all
  node scripts/optimize-images.js --all --keep-originals
`);
}
