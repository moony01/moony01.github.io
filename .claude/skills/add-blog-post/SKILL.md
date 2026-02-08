# Add Blog Post Skill: 블로그 포스트 자동화 (End-to-End)

## 역할

**Jeff Dean (CTO)**이 포스트 추가 요청을 받으면, **주제 선정부터 콘텐츠 작성, Git 커밋/푸시, GitHub Actions 배포까지** 전 과정을 자동으로 처리합니다.

**전체 파이프라인**:
```
트렌딩 주제 추천 → 주제 선택 → 콘텐츠 작성 → 파일 생성 → Git 커밋/푸시 → 배포 완료
```

이미지는 **포스트당 2개**를 Gemini 브라우저로 직접 생성합니다.

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

### 2. 이미지 (필수 - 포스트당 2개)

| 항목 | 내용 |
|------|------|
| **생성 도구** | Google Gemini (브라우저 접근) |
| **개수** | **포스트당 2개** (히어로 1 + 본문 1) |
| **포맷** | PNG (Gemini 생성 후 그대로 사용) |
| **위치** | `static/img/posts/{slug}/` |
| **시점** | 포스트 작성과 동시에 생성 |

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

**이미지는 포스트당 2개**: 히어로 이미지 1개 + 본문 이미지 1개

```markdown
---
layout: post
title: "{제목}"
date: {YYYY-MM-DD HH:MM:SS +0900}
categories: [{카테고리}]
tags: [{태그1}, {태그2}]
published: false
---

{도입부 - Hook 문장으로 시작}

![히어로 이미지](/static/img/posts/{slug}/{slug}-1.png){: .wd100}

## {소제목 1}

{본문 1 내용}

{% include pre-version.html %}

## {소제목 2}

{본문 2 내용}

![본문 이미지](/static/img/posts/{slug}/{slug}-2.png){: .wd100}

```코드블록```

## {소제목 3}

{본문 3 내용}

{% include pre-version.html %}

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

### Step 5: 이미지 생성 (Google Gemini 브라우저 접근)

**이미지 규칙**: 포스트당 **2개** (히어로 1개 + 본문 1개)

```
static/img/posts/{slug}/
├── {slug}-1.png    ← 히어로 이미지
└── {slug}-2.png    ← 본문 이미지
```

#### 5-1. Gemini 접속

**반드시 Playwright 브라우저**를 사용하여 접근합니다:

```
browser_navigate → https://gemini.google.com
```

- 로그인이 안 되어 있으면 사용자에게 로그인 요청
- 로그인 완료 후 진행

#### 5-2. 이미지 생성 프로세스 (2개 반복)

각 이미지마다 아래 과정을 반복합니다:

1. **프롬프트 입력**: Gemini 텍스트박스(`여기에 프롬프트 입력`)에 이미지 생성 프롬프트 입력 후 submit
2. **대기**: `browser_wait_for` time: 25 (25초 대기)
3. **다운로드**: "원본 크기 이미지 다운로드" 버튼 클릭
4. **대기**: `browser_wait_for` time: 10 (다운로드 완료 대기)
5. **파일 복사**: `.playwright-mcp/` 에서 다운로드된 파일을 대상 경로로 복사
   ```bash
   cp ".playwright-mcp/Gemini_Generated_Image_xxxxx.png" "static/img/posts/{slug}/{slug}-N.png"
   ```

#### 5-3. 이미지 프롬프트 템플릿

**히어로 이미지 ({slug}-1.png)**:
```
Generate a modern tech blog hero image (16:9 aspect ratio, 1200x675px). Scene: [주제를 시각적으로 표현하는 장면]. Colors: [적절한 색상 팔레트]. Style: modern tech illustration, clean and professional, suitable for a tech blog header. No text, no watermarks.
```

**본문 이미지 ({slug}-2.png)**:
```
Generate a technical diagram style image (16:9, 1200x675px). Scene: [주제의 핵심 개념을 다이어그램으로 표현]. Colors: dark background with [적절한 accent 색상]. Style: clean tech diagram, modern flat design, professional. No text labels, no watermarks.
```

#### 5-4. 활성화

이미지 생성 완료 후:
- `published: false` → `published: true` 변경

---

### Step 6: Git 커밋 & 푸시 (자동 실행)

파일 생성 후 **자동으로 Git 커밋 및 푸시**를 실행합니다.

#### 6-1. Git 상태 확인

```bash
git status
```

#### 6-2. 파일 스테이징

```bash
# 포스트 파일 추가
git add _posts/{YYYY-MM-DD}-{slug}.md

# 이미지 디렉토리 추가 (임시 placeholder 포함)
git add static/img/posts/{slug}/
```

#### 6-3. 커밋 생성

```bash
git commit -m "$(cat <<'EOF'
feat: 새 블로그 포스트 추가 - {제목}

- 카테고리: {category}
- 주제: {topic 요약}

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

#### 6-4. 원격 저장소 푸시

```bash
git push origin main
```

#### 6-5. 배포 트리거 확인

푸시 후 **GitHub Actions가 자동으로 트리거**됩니다:

1. `main` 브랜치 푸시 감지
2. GitHub Actions 워크플로우 시작
3. Jekyll 빌드 + GitHub Pages 배포
4. 배포 완료 (보통 1-2분 소요)

**배포 상태 확인 URL**:
```
https://github.com/moony01/moony01.github.io/actions
```

---

### Step 7: 최종 완료 보고

모든 단계 완료 후 **최종 보고서**를 출력합니다:

```markdown
## ✅ 블로그 포스트 배포 완료!

### 📝 포스트 정보

| 항목 | 값 |
|------|-----|
| **제목** | {title} |
| **Slug** | `{slug}` |
| **카테고리** | {category} |
| **본문 길이** | 약 {N}자 |
| **발행일** | {YYYY-MM-DD} |

### 📂 생성된 파일

- `_posts/{date}-{slug}.md`
- `static/img/posts/{slug}/` (이미지 디렉토리)

### 🚀 배포 상태

| 단계 | 상태 |
|------|------|
| Git 커밋 | ✅ 완료 |
| Git 푸시 | ✅ 완료 |
| GitHub Actions | 🔄 자동 실행 중 |

### 🔗 링크

- **포스트 URL**: https://moony01.com/{date}/{slug}
- **Actions 상태**: https://github.com/moony01/moony01.github.io/actions

---

## 🖼️ 이미지 추가 (선택사항)

포스트는 이미지 없이도 정상 배포됩니다.
이미지를 추가하려면 아래 가이드를 참고하세요.
```

---

## 참고: 이미지는 Step 5에서 Gemini 브라우저로 자동 생성

이미지 생성은 포스트 작성 과정(Step 5)에서 **Google Gemini 브라우저 접근**으로 자동 처리됩니다.
별도의 외부 도구가 필요 없습니다.

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

### 배포 (필수)
- [ ] Git add (포스트 + 이미지 디렉토리)
- [ ] Git commit (커밋 메시지 포맷 준수)
- [ ] Git push (main 브랜치)
- [ ] GitHub Actions 트리거 확인
- [ ] 배포 완료 보고

### 이미지 (선택)
- [ ] 외부 도구에서 이미지 생성
- [ ] `static/img/posts/{slug}/` 에 저장
- [ ] WebP 변환 (`node scripts/optimize-images.js`)
- [ ] 마크다운에 이미지 태그 삽입
- [ ] 재배포 (이미지 추가 시)

---

## 금지사항

- ❌ **1,500자 미만 짧은 콘텐츠 생성 금지**
- ❌ **단순 나열식 작성 금지** (스토리텔링 필수)
- ❌ **코드 없는 기술 포스트 금지**
- ❌ **JPG/PNG 그대로 업로드 금지** (WebP 변환 필수)
- ❌ **배포 없이 작업 종료 금지** (Git 푸시까지 완료 필수)
- ❌ **main 브랜치 외 다른 브랜치로 푸시 금지**

---

## 사용 예시

### 예시 1: 기본 사용 (End-to-End)

```
대표님: "블로그 포스트 써줘" 또는 "/add-blog-post"

→ Jeff Dean:
   1. 웹 검색으로 트렌딩 주제 조사
   2. 카테고리별 추천 주제 제시
   3. 대표님 주제 선택 대기
   4. 기획서 생성 + 승인 대기
   5. 콘텐츠 작성 (1,500자+, 코드 블록 포함)
   6. 파일 생성 (마크다운 + 이미지 placeholder)
   7. Git 커밋 & 푸시
   8. GitHub Actions 배포 트리거
   9. 최종 완료 보고 (배포 URL 포함)
```

### 예시 2: 주제 직접 지정

```
대표님: "JavaScript Promise 포스트 써줘"

→ Jeff Dean:
   1. 주제 확정 (Promise)
   2. 기획서 생성 + 승인 대기
   3. 콘텐츠 작성
   4. 파일 생성
   5. Git 커밋 & 푸시 → 배포
   6. 완료 보고
```

### 예시 3: 파라미터 전체 지정 (빠른 배포)

```
대표님: "/add-blog-post topic:Docker 컨테이너 최적화 category:infra style:tutorial"

→ 승인 과정 단축, 바로 콘텐츠 작성 → 배포까지 원스톱 완료
```

---

## 배포 후 확인

### 배포 상태 확인

```bash
# GitHub Actions 상태 확인
gh run list --limit 1

# 또는 웹에서 확인
# https://github.com/moony01/moony01.github.io/actions
```

### 포스트 확인

배포 완료 후 (보통 1-2분) 아래 URL에서 확인:
```
https://moony01.com/{YYYY}/{MM}/{DD}/{slug}/
```
