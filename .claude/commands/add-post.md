# 블로그 포스트 추가 스킬 (Plozen Tech Blog)

블로그에 새 포스트를 작성하고, Gemini로 이미지를 생성하여 배포까지 완료하는 스킬입니다.

## 사용법
```
/add-post [주제 또는 제목]
```

## 실행 절차

### 1단계: 포스트 기획
- 사용자가 제공한 주제/제목을 바탕으로 포스트 구조를 기획합니다.
- **이미지는 포스트당 2개**로 구성합니다:
  - 이미지 1: 대표 이미지 (도입부 직후)
  - 이미지 2: 본문 중간 삽입 (핵심 개념 시각화)

### 2단계: 포스트 파일 생성
- `node scripts/create-post.js --title "제목" --slug "english-slug" --category 카테고리` 실행
- 또는 직접 `_posts/YYYY-MM-DD-slug.md` 파일 생성
- Front matter:
```yaml
---
layout: post
title: "제목"
date: YYYY-MM-DD HH:MM:SS +0900
categories: [카테고리]
tags: [태그1, 태그2]
published: false  # 이미지 완성 전까지 비공개
---
```
- 이미지 경로 규칙: `/static/img/posts/{slug}/{slug}-1.png`, `/static/img/posts/{slug}/{slug}-2.png`
- 마크다운 이미지 삽입: `![설명](/static/img/posts/{slug}/{slug}-1.png){: .wd100}`

### 3단계: 이미지 생성 (Google Gemini 브라우저 접근)
- **반드시 Playwright 브라우저**를 사용하여 Google Gemini(https://gemini.google.com)에 접속합니다.
- 로그인이 필요하면 사용자에게 요청합니다.
- 이미지 2개를 순차적으로 생성합니다:

#### 이미지 생성 프로세스:
1. Gemini 텍스트박스에 이미지 생성 프롬프트 입력 후 Enter
2. 25초 대기 (`browser_wait_for` time: 25)
3. "원본 크기 이미지 다운로드" 버튼 클릭
4. 10초 대기 후 다운로드 확인
5. `.playwright-mcp/` 에서 다운로드된 파일을 `static/img/posts/{slug}/` 로 복사
6. 두 번째 이미지도 동일하게 반복

#### 이미지 프롬프트 템플릿:
```
Generate a modern tech blog image (16:9 aspect ratio, 1200x675px). Scene: [주제에 맞는 장면 설명]. Colors: [적절한 색상 팔레트]. Style: modern tech illustration, clean and professional, suitable for a tech blog. No text, no watermarks.
```

### 4단계: 활성화 및 배포
- `published: false` → `published: true` 변경
- Git 커밋 & 푸시:
```bash
cd C:/project/moony01.github.io
git add _posts/{파일명} static/img/posts/{slug}/
git commit -m "feat: 새 포스트 추가 - {제목}"
git push origin main
```

### 5단계: 배포 확인 및 Search Console 등록
- GitHub Actions 배포 완료 대기 (약 2-3분)
- 브라우저로 https://moony01.com/{year}/{month}/{day}/{slug}/ 접속하여 확인
- Google Search Console에서 URL 색인 요청:
  1. https://search.google.com/search-console 접속
  2. URL 검사 도구에 새 포스트 URL 입력
  3. "색인 생성 요청" 클릭

## 주의사항
- 이미지는 **반드시 포스트당 2개**
- 이미지 생성은 **브라우저를 통해 Gemini에 직접 접근**하여 수행
- `published: false`로 시작하여 이미지 완성 후 `true`로 변경
- 카테고리는 `category/` 디렉토리에 해당 파일이 있어야 함
