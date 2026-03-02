# Moony01 Studio 포스트 추가 스킬 (End-to-End 자동화)

블로그에 새 포스트를 작성하고, Gemini로 이미지를 생성하여 배포 → 테스트 → Google Search Console 등록까지 **한 번에 자동으로** 처리하는 스킬입니다.

## 트리거

- `/add-blog-post`
- "블로그 포스트 추가해줘"
- "새 글 작성"
- "블로그 글 써줘"
- "IT 주식 분석 글 써줘"
- "개발자 관점 경제 글 써줘"

## 전체 파이프라인

```
주제 선정 → 콘텐츠 작성 → 파일 생성 → 이미지 생성(Gemini) → 이미지 파일 이동
→ published: true → Git 커밋/푸시 → 배포 대기 → 브라우저 테스트 → Google Search Console 등록
```

---

## 프로젝트 경로

- **블로그 루트**: `C:/Users/mun01/workspace/moony01.github.io`
- **이미지 리소스 (Gemini 다운로드)**: `C:/Users/mun01/workspace/.resource/`

---

## Step 1: 트렌딩 주제 검색 & 추천 (최고 화제성 주제 발굴)

### 1-1. 멀티소스 트렌딩 검색 (병렬 실행)

스킬 시작 시 **여러 소스를 동시에 검색**하여 지금 이 순간 가장 핫한 주제를 발굴합니다.

**필수 검색 쿼리 (최소 5개 이상 병렬 실행)**:

```
# 한국 개발자 큐레이션 (메인 소스)
"site:news.hada.io" (GeekNews - 한국 개발자 핫 토픽 큐레이션)

# 글로벌 핫 토픽
"hottest developer news this week {현재년도}"
"most discussed tech topic today"
"viral programming trend {현재월} {현재년도}"

# 한국 개발자 커뮤니티
"개발자 커뮤니티 화제 {현재년도}"
"IT 핫이슈 논란 {현재월}"

# 플랫폼별 트렌딩
"site:news.ycombinator.com top stories today"
"site:reddit.com/r/programming hot"
"GitHub trending repositories this week"

# AI/기술 특화
"AI breakthrough {현재월} {현재년도}"
"new developer tool launch {현재년도}"

# IT + 주식/경제 확장 (필수)
"AI capex hyperscaler earnings {현재년도}"
"semiconductor demand outlook {현재월} {현재년도}"
"software valuation compression AI agents"
"클라우드 AI 투자 사이클 {현재년도}"
"반도체 공급망 전망 {현재월}"
```

> **GeekNews (news.hada.io)**: 한국어로 큐레이션된 글로벌 개발 뉴스 사이트. 이미 필터링된 핫 토픽이 올라오므로 가장 우선적으로 참고합니다. WebFetch로 `https://news.hada.io/` 메인 페이지를 직접 크롤링하여 현재 트렌딩 주제를 수집합니다.

### 1-2. 화제성 스코어링

검색 결과를 아래 기준으로 **점수화**하여 가장 핫한 주제 순으로 정렬합니다:

| 기준 | 가중치 | 설명 |
|------|:------:|------|
| **실시간성** | 30% | 최근 24~72시간 내 터진 이슈일수록 높은 점수 |
| **논란/충격도** | 25% | 찬반이 갈리거나 "이게 진짜?" 싶은 주제 |
| **검색량/노출** | 20% | 여러 매체에서 동시에 다루는 주제 |
| **개발자 체감도** | 15% | 개발자 일상에 직접 영향을 주는 주제 |
| **SEO 잠재력** | 10% | 검색 유입이 지속될 수 있는 주제 |

### 1-3. 추천 주제 제시 (화제성 순위)

```markdown
## 지금 가장 핫한 개발 주제 TOP 5

| 순위 | 주제 | 화제성 | 카테고리 | 왜 지금 핫한가 |
|:----:|------|:------:|----------|----------------|
| 1 | {주제} | 🔥🔥🔥🔥🔥 | {cat} | {한 줄 이유} |
| 2 | {주제} | 🔥🔥🔥🔥 | {cat} | {한 줄 이유} |
| ... | ... | ... | ... | ... |

→ 번호 선택 또는 직접 입력
```

**카테고리 옵션**: `ai`, `javascript`, `database`, `infra`, `iot`, `security`, `economy`, `others`

> 카테고리는 `C:/Users/mun01/workspace/moony01.github.io/category/` 디렉토리에 해당 파일이 존재해야 합니다.

**→ 사용자 답변 대기** (번호 선택 또는 직접 입력)

---

## Step 2: 어그로 제목 & 콘텐츠 기획

### 2-1. 제목 작성 (클릭률 극대화)

**제목은 "안 누르면 손해" 수준의 어그로를 끌어야 합니다.**

#### 제목 공식 (반드시 3개 후보 제시)

| 공식 | 예시 |
|------|------|
| **충격형**: "[주제] - [믿기 힘든 결과/사실]" | "React 버렸습니다 - 대안 프레임워크가 3배 빠른 이유" |
| **논란형**: "[주제], [기존 상식 정면 반박]" | "TypeScript 쓰지 마세요 - 시니어 개발자가 JS로 돌아간 진짜 이유" |
| **긴급형**: "[주제] - [지금 안 하면 큰일남]" | "이 보안 취약점 모르면 당장 해킹당합니다" |
| **비교형**: "[A] vs [B] - [예상 뒤집는 결론]" | "GPT-4o vs Claude 4 - 현업 개발자 1000명이 선택한 승자" |
| **숫자형**: "[숫자] [주제] - [강한 결론]" | "2026년 사라질 기술 5가지 - 당신이 쓰고 있는 것도 포함" |
| **질문형**: "[도발적 질문]? [반전 답]" | "시니어 개발자는 왜 코드를 적게 짤까? 답은 의외로 간단했다" |

#### 제목 필수 체크

- [ ] **15자 이상 30자 이하** (검색 노출 최적)
- [ ] **감정 유발 단어 1개 이상** 포함 (충격, 진짜, 결국, 드디어, 논란, 실화, 폭로, 뒤집다)
- [ ] **구체적 숫자 또는 비교** 포함
- [ ] **"이거 모르면 뒤처진다"** 느낌
- [ ] **낚시가 아닌 진짜 가치 전달** (제목에서 약속한 건 본문에서 반드시 이행)

#### 제목 금지 패턴

- ❌ "~에 대해 알아보자" (학교 숙제 느낌)
- ❌ "~가이드" 단독 사용 (너무 평범)
- ❌ "~하는 방법" 단독 사용 (네이버 블로그 느낌)
- ❌ 영어만으로 된 제목 (한국어 블로그임)

### 2-2. 기획서 생성

주제를 받으면 기획서를 생성하고 사용자 승인을 받습니다:
- **제목 후보 3개** (어그로 수준 표기)
- Slug, 카테고리, 태그
- 섹션 구성 (도입 + 본론 3-4개 + 결론)
- 예상 길이 (최소 1,500자)

**→ 사용자 승인 대기**

---

## Step 3: 콘텐츠 작성

### 품질 기준

| 항목 | 기준 |
|------|------|
| **본문 길이** | 최소 1,500자 (한국어) |
| **섹션 수** | 4-6개 |
| **코드 블록** | 기술 포스트는 필수 |
| **문체** | 스토리텔링 + 전문가 인사이트 |

### 문체 규칙

**DO**:
- 자연스러운 흐름, 개인 의견 포함
- 구체적 예시/수치, 독자와 대화
- 약간의 비판적 시선, 코드 블록

**DON'T**:
- "~에 대해 알아보겠습니다" (AI 클리셰)
- 공허한 수식어 남발
- 모든 내용을 글머리 기호로 나열
- 과도한 이모지

### IT + 주식/경제 포스트 추가 규칙

- 개발자 관점의 **구조적 분석** 중심으로 작성 (제품/기술 -> 수익모델 -> 비용구조 -> 밸류에이션 영향)
- 최소 1개는 **정량 지표** 포함 (예: CAPEX, 매출 성장률, 마진, 멀티플)
- 기업/섹터 언급 시 **근거 출처 2개 이상** 명시 (실적 발표, 공식 문서, 공신력 있는 매체)
- 단기 급등/급락 자극형 문구보다 "왜 이런 가격 반응이 나왔는지"를 우선 설명
- 독자가 재현 가능한 체크리스트 제공 (다음 실적 시즌에 무엇을 확인할지)

### 투자 관련 안전 가드레일 (필수)

본문 끝에 아래 문구를 반드시 포함합니다:

```markdown
> 본 글은 정보 제공 및 학습 목적이며, 특정 종목에 대한 매수/매도 추천이 아닙니다.
> 투자 판단과 책임은 본인에게 있습니다.
```

금지:
- 수익 보장 표현 ("무조건 오른다", "확실한 수익")
- 개별 투자자 성향을 고려한 1:1 투자 조언 형태
- 근거 없는 목표가/기간 단정

---

## Step 4: 파일 생성

### 4-1. 이미지 디렉토리 생성

```bash
mkdir -p C:/Users/mun01/workspace/moony01.github.io/static/img/posts/{slug}
```

### 4-2. 마크다운 파일 생성

**경로**: `C:/Users/mun01/workspace/moony01.github.io/_posts/{YYYY-MM-DD}-{slug}.md`

```markdown
---
layout: post
title: "{제목}"
date: {YYYY-MM-DD HH:MM:SS +0900}
categories: [{카테고리}]
tags: [{태그1}, {태그2}]
image: {slug}/{slug}-1.png
published: false
---

{도입부}

![히어로 이미지](/static/img/posts/{slug}/{slug}-1.png){: .wd100}

{본문}

{% include pre-version.html %}

## {소제목}

{본문}

![본문 이미지](/static/img/posts/{slug}/{slug}-2.png){: .wd100}

{코드 블록}

{% include pre-version.html %}

## 마치며

{결론}
```

### 이미지 규칙
- **포스트당 2개**: 히어로 이미지 1개 + 본문 이미지 1개
- 경로: `/static/img/posts/{slug}/{slug}-1.png`, `/static/img/posts/{slug}/{slug}-2.png`
- 마크다운: `![설명](/static/img/posts/{slug}/{slug}-N.png){: .wd100}`

### 광고 삽입 (필수 2개)
```markdown
{% include pre-version.html %}
```
- 도입부 끝난 후 1개, 본문 중간 1개
- 이미지 바로 위/아래 피함, 코드 블록 중간 금지

---

## Step 5: 이미지 생성 (Google Gemini 브라우저)

### 5-1. Gemini 접속

**반드시 Playwright 브라우저**를 사용하여 접근합니다:

```
browser_navigate → https://gemini.google.com
```

- 로그인이 안 되어 있으면 사용자에게 로그인 요청

### 5-2. 이미지 생성 프로세스 (2개 반복)

각 이미지마다 아래 과정을 반복합니다:

1. **프롬프트 입력**: Gemini 텍스트박스에 이미지 생성 프롬프트 입력 후 submit
2. **대기**: `browser_wait_for` time: 25 (25초 대기)
3. **다운로드**: "원본 크기 이미지 다운로드" 버튼 클릭
4. **대기**: `browser_wait_for` time: 10 (다운로드 완료 대기)
5. **Events 확인**: 다운로드 이벤트에서 파일명 확인
6. **파일 복사**: 다운로드된 파일을 `C:/Users/mun01/workspace/.resource/` 로 복사
   ```bash
   cp ".playwright-mcp/Gemini_Generated_Image_xxxxx.png" "C:/Users/mun01/workspace/.resource/{slug}-N.png"
   ```

### 5-3. 이미지 프롬프트 템플릿

**히어로 이미지 ({slug}-1.png)**:
```
Generate a modern tech blog hero image (16:9 aspect ratio, 1200x675px). Scene: [주제를 시각적으로 표현하는 장면]. Colors: [적절한 색상 팔레트]. Style: modern tech illustration, clean and professional, suitable for a tech blog header. No text, no watermarks.
```

**본문 이미지 ({slug}-2.png)**:
```
Generate a technical diagram style image (16:9, 1200x675px). Scene: [주제의 핵심 개념을 다이어그램으로 표현]. Colors: dark background with [적절한 accent 색상]. Style: clean tech diagram, modern flat design, professional. No text labels, no watermarks.
```

### 5-4. 이미지 파일 이동 (리소스 → 프로젝트)

`C:/Users/mun01/workspace/.resource/` 에서 블로그 프로젝트로 이미지 복사:

```bash
cp "C:/Users/mun01/workspace/.resource/{slug}-1.png" "C:/Users/mun01/workspace/moony01.github.io/static/img/posts/{slug}/{slug}-1.png"
cp "C:/Users/mun01/workspace/.resource/{slug}-2.png" "C:/Users/mun01/workspace/moony01.github.io/static/img/posts/{slug}/{slug}-2.png"
```

### 5-5. WebP 변환 (필수)

**포스트 상세 페이지는 WebP + 리사이즈본을 사용한다. PNG만 있으면 히어로 이미지가 표시되지 않는다.**

PNG 복사 후 반드시 WebP 변환 실행:

```bash
FFMPEG="C:/Users/mun01/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.0.1-full_build/bin/ffmpeg.exe"
IMG_DIR="C:/Users/mun01/workspace/moony01.github.io/static/img/posts/{slug}"

for n in 1 2; do
  SRC="$IMG_DIR/{slug}-$n.png"
  BASE="$IMG_DIR/{slug}-$n"
  "$FFMPEG" -y -i "$SRC" -vf "scale=1200:-1" "${BASE}.webp"
  "$FFMPEG" -y -i "$SRC" -vf "scale=800:-1"  "${BASE}-800.webp"
  "$FFMPEG" -y -i "$SRC" -vf "scale=400:-1"  "${BASE}-400.webp"
done
```

변환 완료 후 각 이미지 디렉토리에 총 8개 파일이 있어야 한다:
- `{slug}-1.png`, `{slug}-1.webp`, `{slug}-1-800.webp`, `{slug}-1-400.webp`
- `{slug}-2.png`, `{slug}-2.webp`, `{slug}-2-800.webp`, `{slug}-2-400.webp`

### 5-6. 활성화

이미지 복사 완료 후:
- `published: false` → `published: true` 변경

---

## Step 6: Git 커밋 & 푸시

```bash
cd C:/Users/mun01/workspace/moony01.github.io
git add _posts/{YYYY-MM-DD}-{slug}.md static/img/posts/{slug}/
git commit -m "$(cat <<'EOF'
feat: 새 블로그 포스트 추가 - {제목}

- 카테고리: {category}
- 주제: {topic 요약}

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
git push origin main
```

---

## Step 7: 배포 대기 & 브라우저 테스트

### 7-1. GitHub Actions 배포 대기

- 푸시 후 GitHub Actions 자동 트리거 (약 1-2분)
- 배포 상태 확인: https://github.com/moony01/moony01.github.io/actions

### 7-2. 브라우저로 배포 확인

**중요 - 블로그 URL 패턴**:
```
https://moony01.com/{category}/{YYYY}/{MM}/{DD}/{slug}.html
```

예시: `https://moony01.com/ai/2026/02/04/mcp-apps-interactive-ui-guide.html`

> 주의: `/{year}/{month}/{day}/{slug}/` 형식이 아닙니다. 반드시 카테고리 prefix와 `.html` 확장자를 포함해야 합니다.

**확인 사항**:
1. `browser_navigate` 로 포스트 URL 접속
2. 페이지 로드 및 제목 확인
3. 이미지 1 (히어로) 렌더링 확인 → 스크린샷
4. 이미지 2 (본문) 스크롤 후 렌더링 확인 → 스크린샷

---

## Step 8: Google Search Console 등록

### 8-1. Search Console 접속

```
browser_navigate → https://search.google.com/search-console
```

### 8-2. 속성 확인

- `sc-domain:moony01.com` 속성이 선택되어 있는지 확인
- 다른 속성이면: 햄버거 메뉴 → 속성 드롭다운 → moony01.com 선택

### 8-3. URL 색인 요청

1. 상단 검색 버튼 클릭
2. URL 입력: `https://moony01.com/{category}/{YYYY}/{MM}/{DD}/{slug}.html`
3. Enter
4. 데이터 로드 대기
5. "색인 생성 요청" 버튼 클릭
6. 1-2분 테스트 대기 (`browser_wait_for` textGone: "실제 URL의 색인을 생성할 수 있는지 테스트 중", time: 120)
7. "색인 생성 요청됨" 확인 → 닫기

---

## Step 9: 최종 완료 보고

```markdown
## 블로그 포스트 배포 완료

| 항목 | 값 |
|------|-----|
| 제목 | {title} |
| URL | https://moony01.com/{category}/{YYYY}/{MM}/{DD}/{slug}.html |
| 카테고리 | {category} |
| 이미지 | 2개 (히어로 + 본문) |
| 배포 | GitHub Pages 완료 |
| Search Console | 색인 생성 요청 완료 |
```

---

## 체크리스트

- [ ] 본문 1,500자 이상, 섹션 4개+
- [ ] 이미지 2개 생성 (Gemini)
- [ ] .resource → 프로젝트 이미지 복사
- [ ] WebP 변환 (ffmpeg, 원본+800+400 각 2장 = 6개)
- [ ] published: true 변경
- [ ] Git 커밋 & 푸시
- [ ] 브라우저 테스트 (이미지 렌더링 확인)
- [ ] Google Search Console 색인 요청

## 금지사항

- 1,500자 미만 짧은 콘텐츠 생성 금지
- 이미지 없이 배포 금지
- 배포 없이 작업 종료 금지
- main 브랜치 외 다른 브랜치로 푸시 금지
