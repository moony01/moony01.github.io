/**
 * 블로그 포스트 생성 헬퍼
 * 
 * 사용법:
 * node scripts/create-post.js --title "제목" --category ai
 */

import fs from 'fs/promises';
import path from 'path';
import slugify from 'slugify';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

/**
 * 슬러그 생성 (한글 + 영어 지원)
 * - 영어만 있으면 slugify 사용
 * - 한글이 포함되면 한글 유지 + 특수문자 제거
 */
function createSlug(title, customSlug = null) {
  // 사용자 지정 슬러그가 있으면 그대로 사용
  if (customSlug) {
    return customSlug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
  
  // 한글이 포함되어 있는지 확인
  const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(title);
  
  if (hasKorean) {
    // 한글 포함: 공백을 하이픈으로, 특수문자 제거 (한글, 영어, 숫자, 하이픈만 유지)
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  // 영어만: slugify 사용
  return slugify(title, {
    lower: true,
    strict: true
  });
}

/**
 * 포스트 생성
 */
async function createPost(options) {
  const { title, category = 'others', date = new Date(), slug: customSlug = null } = options;
  
  const slug = createSlug(title, customSlug);
  
  if (!slug) {
    console.error('❌ 슬러그 생성 실패. --slug 옵션으로 영어 슬러그를 지정해주세요.');
    console.error('   예: --slug "my-post-title"');
    process.exit(1);
  }
  const dateStr = date.toISOString().split('T')[0];
  const filename = `${dateStr}-${slug}.md`;
  const postPath = path.join(rootDir, '_posts', filename);
  const imageDirPath = path.join(rootDir, 'static/img/_posts', slug);
  
  // 이미지 디렉토리 생성
  await fs.mkdir(imageDirPath, { recursive: true });
  
  // Front matter 템플릿
  const content = `---
layout: post
title: "${title}"
date: ${dateStr} 00:00:00 +0900
categories: [${category}]
tags: []
---

<!-- 도입부: Hook 문장으로 시작 -->



## 소제목 1

<!-- 본문 1 -->

![이미지 설명](/static/img/_posts/${slug}/${slug}-1.webp){: .wd100}

## 소제목 2

<!-- 본문 2 -->

\`\`\`javascript
// 코드 예시
\`\`\`

## 소제목 3

<!-- 본문 3 -->

![이미지 설명](/static/img/_posts/${slug}/${slug}-2.webp){: .wd100}

## 마치며

<!-- 결론 -->

`;

  await fs.writeFile(postPath, content, 'utf-8');
  
  console.log(`
✅ 포스트 생성 완료!

📝 파일: ${filename}
📂 이미지 디렉토리: static/img/_posts/${slug}/

다음 단계:
1. 이미지를 static/img/_posts/${slug}/ 에 추가
2. node scripts/optimize-images.js --input static/img/_posts/${slug}
3. _posts/${filename} 편집
`);
}

// CLI 처리
const args = process.argv.slice(2);
const titleIndex = args.indexOf('--title');
const categoryIndex = args.indexOf('--category');
const slugIndex = args.indexOf('--slug');

if (titleIndex === -1 || !args[titleIndex + 1]) {
  console.log(`
사용법:
  node scripts/create-post.js --title "포스트 제목" [--category 카테고리] [--slug 슬러그]

예시:
  node scripts/create-post.js --title "JavaScript Promise 완벽 가이드" --category javascript
  node scripts/create-post.js --title "한글 제목 테스트" --slug "korean-title-test" --category ai

옵션:
  --title     포스트 제목 (필수)
  --category  카테고리 (기본값: others)
  --slug      URL 슬러그 (미지정시 제목에서 자동 생성)
`);
} else {
  await createPost({
    title: args[titleIndex + 1],
    category: categoryIndex !== -1 ? args[categoryIndex + 1] : 'others',
    slug: slugIndex !== -1 ? args[slugIndex + 1] : null
  });
}
