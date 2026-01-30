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
| **위치** | `static/img/posts/{slug}/` |
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

### Step 1: 트렌딩 주제 검색 & 추천

#### 1-1. 트렌딩 주제 조사 (자동 실행)

스킬 시작 시 **자동으로 웹 검색**을 수행하여 현재 개발 트렌드를 파악합니다.

**검색 도구**: `mcp_websearch_web_search_exa` 또는 `mcp_brave-search_brave_web_search`

**검색 쿼리 예시**:
```
- "2025 개발 트렌드 기술 블로그"
- "trending developer topics {현재월}"
- "hot programming topics this week"
- "개발자 커뮤니티 인기 주제"
```

**검색 소스**:
| 소스 | 용도 |
|------|------|
| Hacker News | 글로벌 기술 트렌드 |
| Dev.to | 개발자 커뮤니티 인기 글 |
| velog, disquiet | 국내 개발자 트렌드 |
| GitHub Trending | 인기 프로젝트/기술 |
| Reddit r/programming | 개발자 토론 주제 |

#### 1-2. 카테고리별 추천 주제 제시

검색 결과를 분석하여 **카테고리별 3-5개 트렌딩 주제**를 추천합니다:

```markdown
## 📝 블로그 포스트 추가

### 🔥 지금 핫한 주제 추천

웹 검색 결과를 바탕으로 현재 트렌딩 주제를 추천드립니다:

#### AI/ML 🤖
1. **Claude 3.5 Sonnet으로 코딩 자동화하기** - MCP 활용법
2. **RAG vs Fine-tuning: 2025년 최적 선택 가이드**
3. **Cursor AI 200% 활용하는 프롬프트 작성법**

#### Frontend 🎨
4. **React 19 Server Components 실전 적용기**
5. **Tailwind CSS v4 마이그레이션 완벽 가이드**

#### Backend/Infra ⚙️
6. **Supabase Edge Functions로 서버리스 API 구축**
7. **Docker Compose vs Kubernetes: 스타트업 최적해**

#### 기타 💡
8. **개발자 사이드 프로젝트로 월 100만원 벌기**
9. **2025 개발자 이직 시장 분석**

---

**선택 방법:**
- 번호 입력 (예: `3`) → 해당 주제로 진행
- 직접 입력 → 원하는 주제로 진행
- `다시 검색` → 다른 키워드로 재검색

> 주제를 선택하거나 입력해주세요:
```

**→ 사용자 답변 대기**

#### 1-3. 추천 알고리즘 기준

| 우선순위 | 기준 | 설명 |
|:--------:|------|------|
| 1 | **시의성** | 최근 1-2주 내 화제된 주제 |
| 2 | **검색량** | SEO 관점에서 검색 수요 있는 주제 |
| 3 | **실용성** | 개발자가 실제로 적용 가능한 주제 |
| 4 | **차별성** | 기존 블로그에 없는 신선한 관점 |
| 5 | **블로그 적합성** | 이 블로그 카테고리에 맞는 주제 |

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

##### 문체 규칙 (인간처럼 쓰기)

**기본 원칙**: "~입니다/합니다" 경어체를 유지하되, AI가 쓴 티가 나지 않게 자연스럽게 작성

**DO (이렇게 쓰기)**:
- ✅ **자연스러운 흐름**: 문단이 물 흐르듯 연결되게
- ✅ **개인 의견 포함**: "솔직히 이건 좀 과한 것 같습니다", "개인적으로는..."
- ✅ **구체적 예시/수치**: "좋다" X → "성능이 40% 향상되었습니다"
- ✅ **독자와 대화**: "이상하지 않나요?", "여기서 중요한 건..."
- ✅ **약간의 삐딱한 시선**: 무조건 긍정 X, 비판적 관점도 포함
- ✅ **코드 블록**: 기술 포스트는 실행 가능한 코드 포함

**DON'T (이렇게 쓰지 말기)**:
- ❌ "~에 대해 알아보겠습니다" (AI 클리셰)
- ❌ "~라고 할 수 있습니다" (애매한 표현)
- ❌ "다양한", "중요한", "효과적인" 남발 (공허한 수식어)
- ❌ 모든 내용을 글머리 기호로 나열
- ❌ 과도한 이모지 사용
- ❌ 뻔한 도입부 ("최근 ~가 주목받고 있습니다")

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
mkdir static/img/posts/{slug}
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

![히어로 이미지](/static/img/posts/{slug}/{slug}-1.webp){: .wd100}

## {소제목 1}

{본문 1 내용}

{% include pre-version.html %}

## {소제목 2}

{본문 2 내용}

![본문 이미지 2](/static/img/posts/{slug}/{slug}-2.webp){: .wd100}

```코드블록```

## {소제목 3}

{본문 3 내용}

{% include pre-version.html %}

## {소제목 4}

{본문 4 내용}

![본문 이미지 3](/static/img/posts/{slug}/{slug}-3.webp){: .wd100}

## 마치며

{결론 내용}
```

#### 4-3. 광고 삽입 규칙

**필수**: 본문에 광고 **2개** 삽입

```markdown
{% include pre-version.html %}
```

| 위치 | 설명 |
|------|------|
| 광고 1 | 도입부 끝난 후, 첫 번째 주요 섹션 시작 전 |
| 광고 2 | 본문 중간, 주요 섹션 전환 시점 |

**배치 팁:**
- 섹션과 섹션 사이에 자연스럽게 배치
- 이미지 바로 위/아래는 피함
- 코드 블록 중간에 삽입 금지

---

### Step 5: 이미지 임시 파일 생성 & 완료 보고

**이미지 규칙**: 썸네일 없음. **총 3개** (상단 히어로 1개 + 본문 중간 2개)

#### 5-1. 임시 이미지 파일 생성

포스트 작성 시 **임시 placeholder 이미지 파일**을 실제로 생성합니다.
대표님이 나중에 같은 파일명으로 덮어쓰기만 하면 됩니다.

**생성할 파일 (PNG 형식):**

```
static/img/posts/{slug}/
├── {slug}-1.png    ← 상단 히어로 이미지
├── {slug}-2.png    ← 본문 중간 이미지 1
└── {slug}-3.png    ← 본문 중간 이미지 2
```

**임시 파일 생성 명령어:**

```bash
# 이미지 디렉토리 생성
mkdir -p static/img/posts/{slug}

# 임시 placeholder 이미지 생성 (1x1 투명 PNG)
# 또는 간단한 placeholder 텍스트 파일로 위치 표시
echo "PLACEHOLDER" > static/img/posts/{slug}/{slug}-1.png
echo "PLACEHOLDER" > static/img/posts/{slug}/{slug}-2.png
echo "PLACEHOLDER" > static/img/posts/{slug}/{slug}-3.png
```

#### 5-2. 본문에 이미지 태그 삽입

마크다운에 **실제 이미지 경로**로 태그를 미리 삽입해둡니다:

```markdown
---
(front matter)
---

{도입부 텍스트}

![{slug} 대표 이미지](/static/img/posts/{slug}/{slug}-1.png){: .wd100}

## {섹션 1}
{본문 내용}

## {섹션 2}
{본문 내용}

![{slug} 이미지 2](/static/img/posts/{slug}/{slug}-2.png){: .wd100}

## {섹션 3}
{본문 내용}

![{slug} 이미지 3](/static/img/posts/{slug}/{slug}-3.png){: .wd100}

## 마치며
{결론}
```

#### 5-3. 완료 보고 형식

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
- `static/img/posts/{slug}/` (이미지 디렉토리)
  - `{slug}-1.png` (임시 - 상단 히어로)
  - `{slug}-2.png` (임시 - 본문 중간 1)
  - `{slug}-3.png` (임시 - 본문 중간 2)

---

## 🖼️ 이미지 교체 가이드

### 📋 교체할 이미지 목록

| # | 파일명 | 위치 | 권장 비율 |
|:-:|--------|------|-----------|
| 1 | `{slug}-1.png` | 상단 히어로 | 16:9 |
| 2 | `{slug}-2.png` | 본문 중간 | 16:9 또는 4:3 |
| 3 | `{slug}-3.png` | 본문 하단 | 16:9 또는 4:3 |

### 🎨 AI 이미지 생성 프롬프트

#### 이미지 1: 히어로 (`{slug}-1.png`)
```
{주제에 맞는 프롬프트}
--ar 16:9 --v 6
```

#### 이미지 2: 본문 중간 (`{slug}-2.png`)
```
{주제에 맞는 프롬프트}
--ar 16:9 --v 6
```

#### 이미지 3: 본문 하단 (`{slug}-3.png`)
```
{주제에 맞는 프롬프트}
--ar 16:9 --v 6
```

### 📁 이미지 교체 방법

1. 위 프롬프트로 이미지 생성
2. **같은 파일명**으로 덮어쓰기:
   ```
   static/img/posts/{slug}/{slug}-1.png  ← 덮어쓰기
   static/img/posts/{slug}/{slug}-2.png  ← 덮어쓰기
   static/img/posts/{slug}/{slug}-3.png  ← 덮어쓰기
   ```
3. WebP 변환 실행:
   ```bash
   node scripts/optimize-images.js --input static/img/posts/{slug}
   ```
4. 마크다운에서 `.png` → `.webp` 확장자 변경

### ✏️ 확장자 변경 (WebP 변환 후)

마크다운 파일에서 일괄 변경:
```markdown
# 변환 전
![이미지](/static/img/posts/{slug}/{slug}-1.png){: .wd100}

# 변환 후
![이미지](/static/img/posts/{slug}/{slug}-1.webp){: .wd100}
```

---

대표님, 포스트와 임시 이미지 파일이 생성되었습니다! 🎉
이미지를 생성하신 후 **같은 파일명으로 덮어쓰기**만 하시면 됩니다.
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
node scripts/optimize-images.js --input static/img/posts/{slug}
```

**출력**: 높이 400px, WebP 포맷

### 6-3. 마크다운에 삽입

원하는 위치에 이미지 태그 추가:

```markdown
![이미지 설명](/static/img/posts/{slug}/{slug}-1.webp){: .wd100}
```

---

## 파일 구조

```
moony01.github.io/
├── _posts/
│   └── {YYYY-MM-DD}-{slug}.md     # 포스트 마크다운
├── static/
│   └── img/
│       └── posts/
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
- [ ] `static/img/posts/{slug}/` 에 저장
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
