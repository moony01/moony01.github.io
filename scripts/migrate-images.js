/**
 * 기존 이미지 마이그레이션 스크립트
 * 
 * 기능:
 * 1. static/img/_posts/ 내 모든 JPG/PNG 이미지 스캔
 * 2. WebP로 변환 (원본 보존 옵션)
 * 3. _posts/*.md 파일 내 이미지 경로 자동 업데이트
 * 
 * 사용법:
 * node scripts/migrate-images.js --dry-run    (시뮬레이션)
 * node scripts/migrate-images.js --execute    (실제 실행)
 * node scripts/migrate-images.js --execute --keep-original (원본 보존)
 */

import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 설정
const CONFIG = {
  quality: 80,
  imageDir: 'static/img/_posts',
  postsDir: '_posts',
  extensions: ['jpg', 'jpeg', 'png', 'gif'],
  // GitHub raw URL 패턴 (moony01 레포지토리)
  githubRawUrlBase: 'https://raw.githubusercontent.com/moony01/moony01.github.io/master/'
};

/**
 * 이미지를 WebP로 변환
 * @param {string} imagePath - 변환할 이미지의 절대 경로
 * @param {boolean} keepOriginal - 원본 파일 보존 여부
 * @returns {Promise<{success: boolean, original: string, webp: string, error?: string}>}
 */
async function convertToWebP(imagePath, keepOriginal = false) {
  const ext = path.extname(imagePath);
  const webpPath = imagePath.replace(ext, '.webp');
  
  try {
    await sharp(imagePath)
      .webp({ quality: CONFIG.quality })
      .toFile(webpPath);
    
    if (!keepOriginal) {
      await fs.unlink(imagePath);
    }
    
    return { success: true, original: imagePath, webp: webpPath };
  } catch (error) {
    return { success: false, original: imagePath, webp: webpPath, error: error.message };
  }
}

/**
 * 마크다운 파일 내 이미지 경로 업데이트
 * 
 * 처리하는 이미지 참조 패턴:
 * 1. ![alt](https://raw.githubusercontent.com/.../image.jpg)
 * 2. ![alt](static/img/_posts/image.jpg)
 * 3. image: image.jpg (frontmatter)
 * 
 * @param {string} mdPath - 마크다운 파일 경로
 * @param {Array<{original: string, webp: string}>} replacements - 변환된 이미지 목록
 * @returns {Promise<boolean>} - 업데이트 여부
 */
async function updateMarkdownPaths(mdPath, replacements) {
  let content = await fs.readFile(mdPath, 'utf-8');
  let updated = false;
  
  for (const { original, webp } of replacements) {
    const originalBasename = path.basename(original);
    const webpBasename = path.basename(webp);
    
    // 다양한 이미지 경로 패턴 처리
    // 패턴 1: GitHub raw URL - ![alt](https://raw.githubusercontent.com/.../image.ext)
    const githubUrlPattern = new RegExp(
      `(https://raw\\.githubusercontent\\.com/[^)\\s]*/)${escapeRegExp(originalBasename)}`,
      'g'
    );
    
    // 패턴 2: 로컬 경로 - ![alt](static/img/_posts/image.ext) 또는 상대 경로
    const localPathPattern = new RegExp(
      `(\\]\\([^)]*/)${escapeRegExp(originalBasename)}(\\))`,
      'g'
    );
    
    // 패턴 3: Frontmatter image - image: image.ext
    const frontmatterPattern = new RegExp(
      `(image:\\s*)${escapeRegExp(originalBasename)}`,
      'g'
    );
    
    // GitHub raw URL 교체
    if (content.match(githubUrlPattern)) {
      content = content.replace(githubUrlPattern, `$1${webpBasename}`);
      updated = true;
    }
    
    // 로컬 경로 교체
    if (content.match(localPathPattern)) {
      content = content.replace(localPathPattern, `$1${webpBasename}$2`);
      updated = true;
    }
    
    // Frontmatter 이미지 교체
    if (content.match(frontmatterPattern)) {
      content = content.replace(frontmatterPattern, `$1${webpBasename}`);
      updated = true;
    }
  }
  
  if (updated) {
    await fs.writeFile(mdPath, content, 'utf-8');
  }
  
  return updated;
}

/**
 * 정규식 특수문자 이스케이프
 * @param {string} str - 이스케이프할 문자열
 * @returns {string}
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 파일 크기를 읽기 쉬운 형태로 변환
 * @param {number} bytes - 바이트 크기
 * @returns {string}
 */
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

/**
 * 이미지 파일의 크기 비교 정보 가져오기
 * @param {string} originalPath - 원본 파일 경로
 * @param {string} webpPath - WebP 파일 경로
 * @returns {Promise<{originalSize: number, webpSize: number, savings: number}>}
 */
async function getFileSizeComparison(originalPath, webpPath) {
  try {
    const [originalStat, webpStat] = await Promise.all([
      fs.stat(originalPath).catch(() => null),
      fs.stat(webpPath).catch(() => null)
    ]);
    
    const originalSize = originalStat?.size || 0;
    const webpSize = webpStat?.size || 0;
    const savings = originalSize > 0 ? ((originalSize - webpSize) / originalSize * 100) : 0;
    
    return { originalSize, webpSize, savings };
  } catch {
    return { originalSize: 0, webpSize: 0, savings: 0 };
  }
}

/**
 * 마이그레이션 실행
 * @param {Object} options - 실행 옵션
 * @param {boolean} options.dryRun - 시뮬레이션 모드
 * @param {boolean} options.keepOriginal - 원본 보존 여부
 */
async function migrate(options = {}) {
  const { dryRun = true, keepOriginal = false } = options;
  
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  이미지 마이그레이션 스크립트 ${dryRun ? '(Dry Run - 시뮬레이션)' : '(실행 모드)'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
  
  // 1. 이미지 스캔 (JPG, JPEG, PNG, GIF)
  const imagePattern = `${CONFIG.imageDir}/**/*.{${CONFIG.extensions.join(',')}}`;
  const images = await glob(imagePattern, { 
    cwd: rootDir,
    nocase: true  // 대소문자 구분 없이 검색
  });
  
  if (images.length === 0) {
    console.log('  변환할 이미지가 없습니다.');
    console.log('  (이미 모든 이미지가 WebP로 변환되었거나, 이미지 디렉토리가 비어있습니다)\n');
    return;
  }
  
  console.log(`  발견된 변환 대상 이미지: ${images.length}개\n`);
  console.log('  변환 대상 파일 목록:');
  
  const results = [];
  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  
  // 2. 이미지 변환
  for (const imagePath of images) {
    const fullPath = path.join(rootDir, imagePath);
    const ext = path.extname(imagePath).toLowerCase();
    const webpPath = imagePath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
    const fullWebpPath = path.join(rootDir, webpPath);
    
    if (dryRun) {
      // Dry run: 파일 크기만 계산 (기존 파일 기준)
      try {
        const stat = await fs.stat(fullPath);
        // 예상 절감률 (대략적인 추정)
        const estimatedWebpSize = Math.floor(stat.size * 0.6); // WebP는 보통 40% 정도 절감
        
        console.log(`    [DRY] ${imagePath}`);
        console.log(`          → ${webpPath}`);
        console.log(`          (현재 크기: ${formatFileSize(stat.size)}, 예상 크기: ~${formatFileSize(estimatedWebpSize)})`);
        
        totalOriginalSize += stat.size;
        totalWebpSize += estimatedWebpSize;
        
        results.push({ 
          success: true, 
          original: fullPath, 
          webp: fullWebpPath,
          originalBasename: path.basename(imagePath),
          webpBasename: path.basename(webpPath)
        });
      } catch (error) {
        console.log(`    [ERROR] ${imagePath}: ${error.message}`);
        results.push({ success: false, original: fullPath, webp: fullWebpPath, error: error.message });
      }
    } else {
      // 실제 변환
      console.log(`    [변환 중] ${imagePath}`);
      const result = await convertToWebP(fullPath, keepOriginal);
      
      if (result.success) {
        const comparison = await getFileSizeComparison(
          keepOriginal ? fullPath : fullWebpPath, // 원본 삭제 시 webp만 남음
          fullWebpPath
        );
        
        // 원본 크기는 변환 전에 저장해야 함 (삭제되므로)
        const originalStat = keepOriginal ? await fs.stat(fullPath).catch(() => null) : null;
        const webpStat = await fs.stat(fullWebpPath).catch(() => null);
        
        if (keepOriginal && originalStat && webpStat) {
          totalOriginalSize += originalStat.size;
          totalWebpSize += webpStat.size;
          const savings = ((originalStat.size - webpStat.size) / originalStat.size * 100).toFixed(1);
          console.log(`          → ${webpPath} (${formatFileSize(webpStat.size)}, ${savings}% 절감)`);
        } else if (webpStat) {
          totalWebpSize += webpStat.size;
          console.log(`          → ${webpPath} (${formatFileSize(webpStat.size)})`);
        }
        
        results.push({
          ...result,
          originalBasename: path.basename(imagePath),
          webpBasename: path.basename(webpPath)
        });
      } else {
        console.log(`          [실패] ${result.error}`);
        results.push(result);
      }
    }
  }
  
  // 3. 마크다운 파일 업데이트
  const mdFiles = await glob(`${CONFIG.postsDir}/**/*.md`, { cwd: rootDir });
  
  console.log(`\n  마크다운 파일: ${mdFiles.length}개\n`);
  
  const successResults = results.filter(r => r.success);
  let updatedMdCount = 0;
  
  for (const mdFile of mdFiles) {
    const fullMdPath = path.join(rootDir, mdFile);
    
    if (dryRun) {
      // Dry run: 어떤 파일이 업데이트될지 검사
      const content = await fs.readFile(fullMdPath, 'utf-8');
      let wouldUpdate = false;
      
      for (const result of successResults) {
        if (content.includes(result.originalBasename)) {
          wouldUpdate = true;
          break;
        }
      }
      
      if (wouldUpdate) {
        console.log(`    [DRY] ${mdFile} - 이미지 경로 업데이트 예정`);
        updatedMdCount++;
      }
    } else {
      // 실제 업데이트
      const replacements = successResults.map(r => ({
        original: r.original,
        webp: r.webp
      }));
      
      const updated = await updateMarkdownPaths(fullMdPath, replacements);
      if (updated) {
        console.log(`    [업데이트] ${mdFile}`);
        updatedMdCount++;
      }
    }
  }
  
  // 4. 결과 요약
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const estimatedSavings = totalOriginalSize > 0 
    ? ((totalOriginalSize - totalWebpSize) / totalOriginalSize * 100).toFixed(1)
    : 0;
  
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  마이그레이션 ${dryRun ? '시뮬레이션' : ''} 결과 요약
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  이미지 변환
    - 총 대상: ${images.length}개
    - 성공: ${successful}개
    - 실패: ${failed}개
    ${keepOriginal ? '- 원본 보존: O' : '- 원본 삭제: O (변환 후)'}

  마크다운 업데이트
    - 총 파일: ${mdFiles.length}개
    - 업데이트${dryRun ? ' 예정' : '됨'}: ${updatedMdCount}개

  용량 절감 ${dryRun ? '(예상)' : ''}
    - 원본 총 크기: ${formatFileSize(totalOriginalSize)}
    - WebP 총 크기: ${formatFileSize(totalWebpSize)}
    - 절감률: ${estimatedSavings}%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${dryRun ? `
  실제 실행하려면:
    node scripts/migrate-images.js --execute
    node scripts/migrate-images.js --execute --keep-original (원본 보존)
` : `
  마이그레이션 완료!
`}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
  
  // 실패한 파일 목록 출력
  if (failed > 0) {
    console.log('\n  실패한 파일:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`    - ${path.relative(rootDir, r.original)}: ${r.error}`);
    });
  }
}

// CLI 처리
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  이미지 마이그레이션 스크립트
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  기존 블로그의 JPG/PNG/GIF 이미지를 WebP로 일괄 변환하고,
  마크다운 파일 내 이미지 경로를 자동으로 업데이트합니다.

  사용법:
    node scripts/migrate-images.js --dry-run
      - 시뮬레이션 모드 (변경 없이 결과만 미리 확인)

    node scripts/migrate-images.js --execute
      - 실제 변환 실행 (원본 파일 삭제)

    node scripts/migrate-images.js --execute --keep-original
      - 실제 변환 실행 (원본 파일 보존)

  처리 대상:
    - 이미지 디렉토리: ${CONFIG.imageDir}/
    - 지원 확장자: ${CONFIG.extensions.join(', ')}
    - 마크다운 디렉토리: ${CONFIG.postsDir}/

  이미지 경로 패턴:
    - GitHub raw URL: https://raw.githubusercontent.com/.../image.jpg
    - 로컬 상대경로: static/img/_posts/image.jpg
    - Frontmatter: image: image.jpg

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
} else {
  const dryRun = args.includes('--dry-run') || !args.includes('--execute');
  const keepOriginal = args.includes('--keep-original');
  
  await migrate({ dryRun, keepOriginal });
}
