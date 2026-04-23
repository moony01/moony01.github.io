/**
 * 마크다운 이미지 → <picture> 태그 변환 스크립트
 * 
 * 기능:
 * - Jekyll 빌드 전 _posts/*.md 파일의 이미지 태그를 <picture>로 변환
 * - WebP only (PNG/JPG fallback 제거)
 * - 다중 해상도 srcset 생성
 * - lazy loading 자동 적용
 * - 기존 <picture> 태그 내 PNG/JPG <source> 일괄 정리
 * 
 * 사용법:
 * node scripts/convert-to-picture.js
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// 설정
const CONFIG = {
  postsDir: path.join(ROOT_DIR, '_posts'),
  sizes: [400, 800], // 다중 해상도
  defaultClass: 'wd100',
};

/**
 * 이미지 마크다운을 <picture> 태그로 변환
 * 
 * 입력: ![alt](/static/img/post/slug/image.png){: .wd100}
 * 출력: <picture>...</picture>
 */
function convertImageToPicture(match, alt, src, attributes = '') {
  // 이미지 경로 파싱
  const ext = path.extname(src);
  const basePath = src.replace(ext, '');
  const filename = path.basename(basePath);
  const dirPath = path.dirname(src);
  
  // 외부 이미지는 변환하지 않음
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return match;
  }
  
  // static/img/posts 경로가 아니면 변환하지 않음
  if (!src.includes('/static/img/posts/')) {
    return match;
  }
  
  // 클래스 추출
  let classes = CONFIG.defaultClass;
  const classMatch = attributes.match(/\.(\w+)/g);
  if (classMatch) {
    classes = classMatch.map(c => c.slice(1)).join(' ');
  }
  
  // WebP srcset 생성
  const webpSrcset = [
    ...CONFIG.sizes.map(size => `${dirPath}/${filename}-${size}.webp ${size}w`),
    `${dirPath}/${filename}.webp 1200w`
  ].join(',\n            ');

  // WebP src (fallback도 WebP)
  const webpSrc = `${dirPath}/${filename}.webp`;

  // <picture> 태그 생성 (WebP only — PNG/JPG srcset 제거)
  const picture = `<picture>
  <source
    type="image/webp"
    srcset="${webpSrcset}"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="${webpSrc}"
    alt="${alt}"
    class="${classes}"
    loading="lazy"
    decoding="async">
</picture>`;

  return picture;
}

/**
 * 마크다운 파일 처리
 */
async function processMarkdownFile(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');
  const originalContent = content;
  
  // 이미지 마크다운 패턴: ![alt](src){: .class}
  // 패턴 설명:
  // - !\[(.*?)\] : alt 텍스트
  // - \((.*?)\) : 이미지 경로
  // - (?:\{:\s*(.*?)\})? : 선택적 속성 (Jekyll Kramdown 문법)
  const imagePattern = /!\[(.*?)\]\((.*?)\)(?:\{:\s*(.*?)\})?/g;
  
  content = content.replace(imagePattern, (match, alt, src, attrs) => {
    // 이미 <picture>로 변환된 경우 스킵
    if (match.includes('<picture>')) {
      return match;
    }
    return convertImageToPicture(match, alt, src, attrs || '');
  });

  // 기존 <picture> 태그에서 PNG/JPG/JPEG/GIF <source> 제거 (B방식 마이그레이션)
  content = content.replace(
    /  <source\s*\n\s*type="image\/(?:png|jpeg|jpg|gif)"\s*\n\s*srcset="[^"]*"\s*\n\s*sizes="[^"]*">\n/g,
    ''
  );

  // 기존 <picture> 태그 내 <img src>를 .webp로 변경
  content = content.replace(
    /(<picture>[\s\S]*?<img\s*\n\s*src=")([^"]+)\.(png|jpe?g|gif)(")/g,
    (match, prefix, basePath, ext, suffix) => {
      return `${prefix}${basePath}.webp${suffix}`;
    }
  );

  // 변경된 경우에만 저장
  if (content !== originalContent) {
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`  ✅ ${path.basename(filePath)}`);
    return true;
  }
  
  return false;
}

/**
 * 메인 실행
 */
async function main() {
  console.log('\n🔄 마크다운 이미지 → <picture> 태그 변환\n');
  
  const posts = await glob(`${CONFIG.postsDir}/*.md`);
  
  if (posts.length === 0) {
    console.log('처리할 포스트가 없습니다.');
    return;
  }
  
  console.log(`📝 ${posts.length}개 포스트 검사 중...\n`);
  
  let convertedCount = 0;
  
  for (const post of posts) {
    const converted = await processMarkdownFile(post);
    if (converted) {
      convertedCount++;
    }
  }
  
  console.log(`\n✅ 완료! ${convertedCount}개 파일 변환됨\n`);
}

main().catch(console.error);
