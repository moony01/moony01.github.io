# Add Blog Post Skill: 블로그 포스트 자동화

## 역할

**Jeff Dean (CTO)**이 포스트 추가 요청을 받으면, **고품질 기술 블로그 포스트**를 작성하여 Jekyll 블로그에 배포합니다. 이미지는 **선택사항**으로, 외부 도구에서 별도 생성 후 추가합니다.

---

## 트리거

- `/add-blog-post`
- "블로그 포스트 추가해줘"
- "새 글 작성"
- "포스트 작성"
- "블로그 글 써줘"

---

## 핵심 원칙

### 1. 콘텐츠 품질 기준

| 항목 | 기준 |
|------|------|
| **본문 길이** | 최소 1,500자 (한국어) |
| **섹션 수** | 4-6개 (도입 + 본론 3-4개 + 결론) |
| **코드 블록** | 기술 포스트는 필수 |
| **문체** | 스토리텔링 + 전문가 인사이트 |

### 2. 이미지 (선택사항)

| 항목 | 내용 |
|------|------|
| **생성 도구** | 외부 도구 (Antigravity 등) |
| **포맷** | WebP (높이 400px) |
| **위치** | `static/img/_posts/{slug}/` |
| **시점** | 포스트 작성 완료 후 별도 추가 |

---

## 파라미터

| 파라미터 | 설명 | 필수 | 기본값 |
|----------|------|:----:|--------|
| `topic` | 포스트 주제 | ✅ | - |
| `category` | 카테고리 | ❌ | 자동 추천 |
| `date` | 발행일 | ❌ | 오늘 날짜 |
| `style` | 문체 스타일 | ❌ | `tutorial` |

### 카테고리 옵션

| 카테고리 | 설명 |
|----------|------|
| `ai` | AI/ML 관련 |
| `javascript` | JS/프론트엔드 |
| `database` | DB/백엔드 |
| `infra` | 인프라/DevOps |
| `iot` | IoT/임베디드 |
| `security` | 보안 |
| `others` | 기타 |

### 문체 스타일

| 스타일 | 설명 |
|--------|------|
| `tutorial` | 단계별 가이드 (기본) |
| `analysis` | 심층 분석, 비교 |
| `opinion` | 의견, 인사이트 |
| `news` | 뉴스/트렌드 소개 |

---

## 워크플로우

### Step 1: 주제 수집

```markdown
## 📝 블로그 포스트 추가

**어떤 주제의 포스트를 작성할까요?**

예시:
- "JavaScript 비동기 처리 완벽 가이드"
- "Docker 컨테이너 최적화 전략"
- "AI 시대의 프론트엔드 개발자 역할"

> 주제를 입력해주세요:
```

**→ 사용자 답변 대기**

---

### Step 2: 콘텐츠 기획

주제를 받으면 **자동으로 기획서 생성**:

```markdown
## 📝 포스트 기획서

### 기본 정보

| 항목 | 값 |
|------|-----|
| **주제** | {입력된 주제} |
| **Slug** | `{auto-generated-slug}` |
| **카테고리** | {자동 추천} |
| **발행일** | {오늘 날짜} |

### 콘텐츠 구조

| 섹션 | 제목 (예시) | 예상 길이 |
|:----:|-------------|-----------|
| 도입 | 리드 문단 | 200자 |
| 1 | {소제목 1} | 400자 |
| 2 | {소제목 2} | 400자 |
| 3 | {소제목 3} | 400자 |
| 결론 | 마무리 | 200자 |

---

✅ 이 구조로 진행할까요?
- `Y` → 콘텐츠 작성 시작
- `수정` → 구조 변경 요청
```

**→ 사용자 승인 대기**

---

### Step 3: 콘텐츠 작성

#### 작성 가이드라인

##### 문체 규칙
- ✅ **스토리텔링**: 단순 나열 X → 흐름있는 서술
- ✅ **구체적 예시**: "좋다" X → "성능이 40% 향상되었다"
- ✅ **코드 블록**: 기술 포스트는 실행 가능한 코드 포함
- ✅ **독자 공감**: 개발자가 겪는 실제 문제 언급

##### 섹션별 작성 팁

| 섹션 | 작성 팁 |
|------|---------|
| **도입** | Hook 문장, 왜 이 주제가 중요한지 |
| **본론 1** | 기초 개념, 배경 설명 |
| **본론 2** | 핵심 내용, 실습/코드 |
| **본론 3** | 심화, 팁, 주의사항 |
| **결론** | 요약, 다음 단계 추천 |

---

### Step 4: 파일 생성

#### 4-1. 이미지 디렉토리 생성

```bash
mkdir static/img/_posts/{slug}
```

#### 4-2. 마크다운 파일 생성

**경로**: `_posts/{YYYY-MM-DD}-{slug}.md`

```markdown
---
layout: post
title: "{제목}"
date: {YYYY-MM-DD HH:MM:SS +0900}
categories: [{카테고리}]
tags: [{태그1}, {태그2}]
---

{도입부 - Hook 문장으로 시작}

## {소제목 1}

{본문 1 내용}

## {소제목 2}

{본문 2 내용}

```코드블록```

## {소제목 3}

{본문 3 내용}

## 마치며

{결론 내용}
```

---

### Step 5: 완료 보고

```markdown
## ✅ 블로그 포스트 추가 완료!

### 📝 포스트 정보

| 항목 | 값 |
|------|-----|
| **제목** | {title} |
| **Slug** | `{slug}` |
| **카테고리** | {category} |
| **본문 길이** | 약 {N}자 |

### 📂 생성된 파일

- `_posts/{date}-{slug}.md`
- `static/img/_posts/{slug}/` (이미지 디렉토리)

### 🔗 로컬 미리보기

```bash
bundle exec jekyll serve
# http://localhost:4000/{year}/{month}/{day}/{slug}
```

---

대표님, 포스트가 성공적으로 생성되었습니다! 🎉

### 🖼️ 이미지 추가 (선택사항)

이미지를 추가하려면:

1. **외부 도구에서 이미지 생성** (Antigravity 등)
2. **이미지 저장**: `static/img/_posts/{slug}/{slug}-1.png`
3. **WebP 변환**: `node scripts/optimize-images.js --input static/img/_posts/{slug}`
4. **마크다운에 삽입**:
   ```markdown
   ![이미지 설명](/static/img/_posts/{slug}/{slug}-1.webp){: .wd100}
   ```
```

---

## Step 6: 이미지 추가 (선택사항)

포스트 작성 완료 후, 필요시 이미지를 별도로 추가합니다.

### 6-1. 이미지 생성 (외부 도구)

**권장 도구**: Antigravity, Midjourney, DALL-E, Leonardo AI 등

**프롬프트 가이드**:

| 카테고리 | 프롬프트 키워드 |
|----------|-----------------|
| ai | `neural network visualization, AI brain, blue glowing circuits, futuristic` |
| javascript | `clean code editor, modern web, colorful syntax highlighting, abstract` |
| database | `data structure visualization, server room, organized information flow` |
| infra | `cloud architecture, network diagram, server infrastructure, minimalist` |
| iot | `smart city, connected devices, IoT sensors, futuristic urban` |
| security | `digital security, lock shield, cyber protection, matrix style` |

**공통 접미사**:
```
, high quality, professional, cinematic lighting, no text, no watermark, no faces
```

### 6-2. 이미지 최적화

```bash
# 이미지를 디렉토리에 저장 후 WebP 변환
node scripts/optimize-images.js --input static/img/_posts/{slug}
```

**출력**: 높이 400px, WebP 포맷

### 6-3. 마크다운에 삽입

원하는 위치에 이미지 태그 추가:

```markdown
![이미지 설명](/static/img/_posts/{slug}/{slug}-1.webp){: .wd100}
```

---

## 파일 구조

```
moony01.github.io/
├── _posts/
│   └── {YYYY-MM-DD}-{slug}.md     # 포스트 마크다운
├── static/
│   └── img/
│       └── _posts/
│           └── {slug}/
│               └── {slug}-1.webp   # 본문 이미지 (선택)
└── scripts/
    └── optimize-images.js          # WebP 변환 스크립트
```

---

## 체크리스트

### 콘텐츠 품질 (필수)
- [ ] 본문 1,500자 이상
- [ ] 섹션 4개 이상
- [ ] 구체적 예시/데이터 포함
- [ ] 코드 블록 포함 (기술 포스트)
- [ ] 스토리텔링 흐름 확인

### 파일 (필수)
- [ ] 마크다운 파일 생성 (`_posts/`)
- [ ] Front matter 완성 (layout, title, date, categories)
- [ ] slug 중복 확인

### 이미지 (선택)
- [ ] 외부 도구에서 이미지 생성
- [ ] `static/img/_posts/{slug}/` 에 저장
- [ ] WebP 변환 (`node scripts/optimize-images.js`)
- [ ] 마크다운에 이미지 태그 삽입

---

## 금지사항

- ❌ **1,500자 미만 짧은 콘텐츠 생성 금지**
- ❌ **단순 나열식 작성 금지** (스토리텔링 필수)
- ❌ **코드 없는 기술 포스트 금지**
- ❌ **JPG/PNG 그대로 업로드 금지** (WebP 변환 필수)

---

## 사용 예시

### 예시 1: 기본 사용

```
대표님: "JavaScript Promise 포스트 써줘"

→ Jeff Dean:
   1. 기획서 생성 (구조)
   2. 대표님 승인 대기
   3. 콘텐츠 작성 (1,500자+, 코드 블록 포함)
   4. 파일 생성
   5. 완료 보고 + 이미지 추가 안내
```

### 예시 2: 파라미터 지정

```
대표님: "/add-blog-post topic:Docker 컨테이너 최적화 category:infra style:tutorial"

→ 승인 과정 단축, 바로 콘텐츠 작성 시작
```
