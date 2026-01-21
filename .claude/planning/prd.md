# PRD: Plozen Tech Blog 콘텐츠 자동화 시스템

## 1. 개요

### 1.1 프로젝트 정보

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Blog Content Automation System |
| **코드명** | `blog-auto` |
| **버전** | v1.0.0 |
| **작성일** | 2026-01-21 |
| **플랫폼** | Jekyll (GitHub Pages) |
| **참조 시스템** | plolux/kcl의 add-kcl-news 스킬 |

### 1.2 배경 및 목적

현재 `moony01.github.io` 블로그는 수동으로 포스트를 작성하고 이미지를 업로드하는 방식입니다.
plolux/kcl 프로젝트에서 성공적으로 운영 중인 뉴스 콘텐츠 자동화 시스템을 블로그에도 도입하여:

1. **콘텐츠 생성 자동화**: AI 기반 고품질 기술 블로그 포스트 작성
2. **이미지 최적화 자동화**: WebP 변환 및 다중 해상도 생성
3. **일관된 품질 유지**: 스킬 기반 워크플로우로 품질 표준화

### 1.3 성공 지표

| 지표 | 현재 | 목표 |
|------|------|------|
| 포스트 작성 시간 | 2-3시간 | 30분 이내 |
| 이미지 최적화 | 수동 | 100% 자동 |
| 이미지 포맷 | JPG/PNG 혼재 | WebP 표준화 |
| 콘텐츠 품질 | 불규칙 | 1,500자+ 표준 |

---

## 2. 시스템 아키텍처

### 2.1 현재 블로그 구조

```
moony01.github.io/
├── _posts/                    # 블로그 포스트 (Markdown)
│   └── YYYY-MM-DD-slug.md
├── static/
│   └── img/
│       └── _posts/            # 포스트별 이미지
│           └── {slug}/
├── category/                  # 카테고리 페이지
├── _config.yml               # Jekyll 설정
├── _layouts/                 # 레이아웃 템플릿
└── _includes/                # 공통 컴포넌트
```

### 2.2 목표 구조 (자동화 추가)

```
moony01.github.io/
├── .claude/
│   ├── planning/
│   │   ├── prd.md            # 이 문서
│   │   └── tasks.md          # 작업 계획
│   ├── skills/
│   │   └── add-blog-post/
│   │       └── SKILL.md      # 포스트 자동화 스킬
│   └── agents/               # 서브에이전트 설정
├── scripts/
│   ├── optimize-images.js    # 이미지 WebP 변환
│   ├── create-post.js        # 포스트 생성 헬퍼
│   └── generate-meta.js      # 메타데이터 생성
├── _posts/
├── static/
│   └── img/
│       └── _posts/
│           └── {slug}/
│               ├── {name}.webp        # 최적화된 이미지
│               └── {name}-thumb.webp  # 썸네일
├── package.json              # Node.js 의존성
└── _config.yml
```

### 2.3 기술 스택

| 구성요소 | 기술 | 용도 |
|----------|------|------|
| **SSG** | Jekyll 4.x | 정적 사이트 빌드 |
| **호스팅** | GitHub Pages | 배포 |
| **이미지 최적화** | Sharp (Node.js) | WebP 변환, 리사이징 |
| **AI 이미지** | Gemini Imagen | 썸네일/본문 이미지 생성 |
| **AI 콘텐츠** | Claude/GPT | 포스트 초안 작성 |
| **자동화** | Claude Skills | 워크플로우 자동화 |

---

## 3. 기능 요구사항

### 3.1 이미지 최적화 시스템 (P0 - 필수)

#### FR-1.1: WebP 자동 변환

| 항목 | 요구사항 |
|------|----------|
| **입력** | JPG, PNG, GIF 이미지 |
| **출력** | WebP 포맷 (원본 유지 옵션) |
| **품질** | 80% (설정 가능) |
| **위치** | `static/img/_posts/{slug}/` |

#### FR-1.2: 다중 해상도 생성

| 해상도 | 용도 | 파일명 패턴 |
|--------|------|-------------|
| Original | 본문 이미지 | `{name}.webp` |
| 800px | 모바일 최적화 | `{name}-800.webp` |
| 400px | 썸네일 | `{name}-thumb.webp` |

#### FR-1.3: 기존 이미지 마이그레이션

- 기존 `static/img/_posts/` 이미지를 WebP로 일괄 변환
- 마크다운 내 이미지 경로 자동 업데이트

### 3.2 포스트 자동화 스킬 (P0 - 필수)

#### FR-2.1: 스킬 트리거

```
/add-blog-post
"블로그 포스트 추가해줘"
"새 글 작성"
```

#### FR-2.2: 콘텐츠 품질 기준

| 항목 | 기준 |
|------|------|
| **본문 길이** | 최소 1,500자 (한국어) |
| **섹션 수** | 4-6개 (도입 + 본론 + 결론) |
| **이미지** | 썸네일 1장 + 본문 2-3장 |
| **코드 블록** | 기술 포스트 시 필수 |

#### FR-2.3: 포스트 템플릿

```markdown
---
layout: post
title: "{제목}"
date: YYYY-MM-DD HH:MM:SS +0900
categories: [{카테고리}]
tags: [{태그들}]
image: {slug}/{thumbnail}.webp
---

{본문 내용}
```

### 3.3 AI 이미지 생성 통합 (P1 - 중요)

#### FR-3.1: Gemini Imagen 연동

- 썸네일 자동 생성 (16:9 비율)
- 본문 삽화 생성 (기술 다이어그램 스타일)
- 자동 WebP 변환 후 저장

#### FR-3.2: 이미지 프롬프트 템플릿

| 카테고리 | 프롬프트 스타일 |
|----------|-----------------|
| ai | `futuristic AI technology, neural networks, blue glowing circuits` |
| javascript | `clean code visualization, modern web development, abstract patterns` |
| database | `data structure, server room, organized information flow` |
| infra | `cloud architecture, server infrastructure, network diagram` |

### 3.4 메타데이터 자동화 (P2 - 선택)

#### FR-4.1: SEO 메타 생성

- `og:image` 자동 설정
- `description` 자동 추출 (첫 150자)
- `article:tag` 자동 생성

---

## 4. 비기능 요구사항

### 4.1 성능

| 항목 | 요구사항 |
|------|----------|
| 이미지 변환 속도 | 10장 이하 5초 이내 |
| 빌드 시간 영향 | 기존 대비 +30% 이내 |
| 이미지 용량 | 원본 대비 50% 이상 감소 |

### 4.2 호환성

- Ruby 3.x / Jekyll 4.x
- Node.js 18+ (이미지 처리)
- GitHub Actions 호환

### 4.3 유지보수성

- 스크립트 모듈화
- 설정 파일 분리 (`config/images.json`)
- 에러 로깅

---

## 5. 구현 범위

### 5.1 Phase 0: 환경 설정 (Day 1)

- [x] `.claude/planning/` 디렉토리 생성
- [ ] `package.json` 생성 및 의존성 설치
- [ ] 기본 스크립트 구조 설정

### 5.2 Phase 1: 이미지 최적화 (Day 1-2)

- [ ] Sharp 기반 이미지 변환 스크립트
- [ ] 다중 해상도 생성 기능
- [ ] 기존 이미지 마이그레이션

### 5.3 Phase 2: 포스트 자동화 스킬 (Day 2-3)

- [ ] `add-blog-post` 스킬 작성
- [ ] 포스트 생성 헬퍼 스크립트
- [ ] AI 이미지 생성 통합

### 5.4 Phase 3: 통합 및 테스트 (Day 3-4)

- [ ] 전체 워크플로우 테스트
- [ ] 기존 포스트 마이그레이션
- [ ] 문서화

---

## 6. 참조

### 6.1 plolux/kcl 뉴스 시스템

| 구성요소 | 경로 | 설명 |
|----------|------|------|
| 스킬 정의 | `.claude/skills/add-kcl-news/SKILL.md` | 뉴스 추가 워크플로우 |
| 콘텐츠 | `src/content/news/{ko,en}/` | 마크다운 뉴스 파일 |
| 이미지 최적화 | `next-image-export-optimizer` | 빌드 시 WebP 변환 |
| JSON 생성 | `scripts/generate-news-json.js` | 메타데이터 추출 |

### 6.2 현재 블로그 포스트 형식

```markdown
---
layout: post
title: "제목"
date: 2023-08-10 00:00:00 +0700
categories: [iot]
---

본문...

![이미지 설명](https://raw.githubusercontent.com/.../image.webp){: .wd100}
```

---

## 7. 용어 정의

| 용어 | 정의 |
|------|------|
| **WebP** | Google이 개발한 이미지 포맷, JPG/PNG 대비 30% 이상 용량 절감 |
| **Sharp** | Node.js 고성능 이미지 처리 라이브러리 |
| **Skill** | Claude 자동화 워크플로우 정의 파일 |
| **SSG** | Static Site Generator (정적 사이트 생성기) |
