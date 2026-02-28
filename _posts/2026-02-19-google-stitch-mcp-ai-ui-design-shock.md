---
layout: post
title: "'UI 그려줘' 한마디에 진짜 나왔다 — Google Stitch MCP 경악 실화"
date: 2026-02-19 11:00:00 +0900
categories: [ai]
tags: [google, stitch, mcp, ai디자인, 프론트엔드]
image: google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-1.png
published: true
---

"디자이너한테 UI 시안 달라고 했더니 3일 걸린다고 했다."

프론트엔드 개발자라면 이 상황을 모를 리 없다. 기획이 나왔는데 디자인이 안 나와서 대기. 디자인 나왔는데 수정이 필요해서 또 대기. 이 병목이 사라지면 얼마나 좋을까 한 번쯤은 생각해봤을 거다.

Google이 그 상상을 현실로 만들었다. **Stitch MCP 서버** — IDE 안에서 "화면 그려줘" 하면 AI가 진짜 UI를 디자인하고 프로덕션 코드까지 뱉어내는 물건이다.

직접 연동해봤다. 결론부터 말하면, 프론트엔드 개발 워크플로우가 근본적으로 뒤집힐 수 있겠다는 생각이 들었다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-1-400.webp 400w,
            /static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-1-800.webp 800w,
            /static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-1-400.png 400w,
            /static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-1-800.png 800w,
            /static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-1.png" 
    alt="Google Stitch MCP 히어로 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## Google Stitch가 뭔데 — 핵심만 3줄

Google I/O 2025에서 처음 공개된 Stitch는 **텍스트 프롬프트를 UI 디자인 + 프로덕션 코드로 변환**하는 AI 도구다. Gemini 2.5 Pro/Flash를 기반으로 작동한다.

핵심은 이거다:

- "로그인 페이지 만들어줘" → 완성된 UI 디자인이 나옴
- 디자인을 클릭하면 → 바로 HTML/CSS/React 코드로 변환
- 모바일 반응형은 기본

여기까지는 Figma AI나 v0 같은 도구들과 비슷해 보일 수 있다. **그런데 이번에 나온 MCP 서버 지원이 게임 체인저다.**

## MCP 서버가 왜 게임 체인저인가

지금까지 AI 디자인 도구들의 한계는 명확했다:

1. 웹에서 디자인 생성
2. 코드 복사
3. IDE에 붙여넣기
4. 내 프로젝트에 맞게 수정

이 과정에서 **컨텍스트가 끊긴다.** 내 프로젝트의 디자인 시스템, 색상 체계, 컴포넌트 구조를 AI 디자인 도구가 모른다. 그래서 매번 결과물을 뜯어고쳐야 했다.

Stitch MCP 서버는 이 문제를 근본적으로 해결한다. **IDE 안에서 AI 에이전트가 직접 Stitch API를 호출**하기 때문이다.

```bash
# Claude Code, Cursor, Gemini CLI에서 바로 사용 가능
npx @_davideast/stitch-mcp init
npx @_davideast/stitch-mcp proxy
```

이렇게 설정하면 IDE의 AI 에이전트가:

- Stitch 프로젝트의 **스크린, 타이포그래피, 색상 체계를 실시간으로 인식**
- "대시보드 화면 추가해줘" 하면 기존 디자인 시스템에 맞춰 생성
- 생성된 디자인의 HTML/React 코드를 바로 프로젝트에 삽입

**웹 브라우저를 한 번도 열지 않고** 디자인부터 코드까지 IDE 안에서 끝난다. 이게 기존 도구들과 결정적으로 다른 지점이다.

{% include pre-version.html %}

## 실제 워크플로우 — 설치부터 첫 화면까지

실제 사용 흐름을 보자.

### 1단계: 초기 설정 (1분이면 끝난다)

```bash
# 설치 & 인증 (OAuth 자동 처리)
npx @_davideast/stitch-mcp init

# MCP 프록시 실행
npx @_davideast/stitch-mcp proxy
```

`init` 명령어가 OAuth 인증, gcloud 설정, MCP 클라이언트 구성을 **원클릭으로 처리**한다. 이것만으로 VS Code, Cursor, Claude Code, Gemini CLI 모두에서 바로 사용 가능하다.

인증 방식도 유연하다:

| 방식 | 설명 |
|------|------|
| 자동 (권장) | `init` 명령어가 OAuth 전부 처리 |
| API 키 | `STITCH_API_KEY` 환경 변수 설정 |
| 시스템 gcloud | 기존 gcloud 설정 재활용 |

### 2단계: IDE에서 자연어로 디자인 생성

MCP 연동이 완료되면, AI 에이전트에게 그냥 말하면 된다:

- "사용자 프로필 페이지를 Material Design 스타일로 만들어줘"
- "기존 대시보드와 같은 색상 체계로 설정 페이지 추가해"
- "이 화면 모바일 버전도 만들어줘"

에이전트가 Stitch API를 호출하고, 결과를 바로 프로젝트에 반영한다. 복사-붙여넣기 따위는 없다.

### 3단계: Agent Skills로 자동화

여기서 한 발 더 나간다. **Agent Skills**라는 사전 구축된 자동화 워크플로우가 있다:

- **Design MD**: 디자인을 분석해서 마크다운 문서를 자동 생성. 디자인 토큰, 컴포넌트 스펙, 간격 규칙까지 전부 정리해준다.
- **React Components**: Stitch 디자인을 프로덕션 레디 React 코드로 변환. 디자인 토큰 일관성까지 유지한다.

```bash
# 로컬에서 디자인 미리보기
npx @_davideast/stitch-mcp serve -p <project-id>

# 배포 가능한 Astro 사이트로 빌드
npx @_davideast/stitch-mcp site -p <project-id>
```

`serve` 명령어를 치면 Vite 개발 서버가 뜨면서 Stitch 프로젝트의 모든 화면을 로컬에서 미리볼 수 있다. `site` 명령어를 쓰면 화면들을 라우트에 매핑해서 배포 가능한 Astro 프로젝트를 뚝딱 만들어낸다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-2-400.webp 400w,
            /static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-2-800.webp 800w,
            /static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-2-400.png 400w,
            /static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-2-800.png 800w,
            /static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/google-stitch-mcp-ai-ui-design-shock/google-stitch-mcp-ai-ui-design-shock-2.png" 
    alt="Stitch MCP 워크플로우 다이어그램" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 기존 도구 비교 — Figma AI, v0와 뭐가 다른가

| 기능 | Figma AI | v0 (Vercel) | Stitch MCP |
|------|:--------:|:-----------:|:----------:|
| 텍스트→UI | O | O | O |
| 코드 변환 | 제한적 | O | O |
| IDE 직접 연동 | X | X | **O (MCP)** |
| 디자인 시스템 인식 | 부분적 | X | **O** |
| 에이전트 자동화 | X | X | **O (Agent Skills)** |
| CLI 지원 | X | X | **O** |
| 무료 사용 | X | 제한적 | **O (Labs)** |

결정적 차이는 **MCP 프로토콜**이다. Figma나 v0는 독립된 도구다. 내 IDE, 내 에이전트와 직접 연결되지 않는다. Stitch MCP는 Claude Code에서 "이 디자인 가져와서 React로 변환해" 하면 에이전트가 직접 처리한다. **컨텍스트 스위칭이 제로**다.

그리고 가격. Stitch는 현재 Google Labs 실험 프로젝트로 **무료**다. v0는 월 구독이 필요하고, Figma AI도 유료 플랜에서만 제대로 쓸 수 있다. 실험 단계이긴 하지만, 지금 이 순간만큼은 가장 접근성이 좋다.

## 디자이너가 사라지는 건 아니다 — 하지만

솔직히 말하자. 이 도구를 보면 "디자이너 필요 없어지는 거 아니냐"는 생각이 들 수밖에 없다.

**결론부터: 아직은 아니다.** 하지만 역할은 확실히 바뀐다.

Stitch MCP가 잘하는 것:

- 반복적인 CRUD 페이지 빠르게 찍어내기
- 기존 디자인 시스템 기반으로 일관된 화면 확장
- 프로토타입 → 검증 사이클 극단적 압축

Stitch MCP가 못하는 것:

- 브랜드 아이덴티티를 처음부터 만드는 일
- 사용자 리서치 기반의 UX 판단
- "이게 왜 이렇게 생겼는지"에 대한 논리적 설명

개발자 입장에서 진짜 의미는 이거다: **디자인 대기 시간이 사라진다.** MVP나 내부 툴은 디자이너 없이 충분한 퀄리티로 뽑아낼 수 있다. 프로토타이핑 속도가 수십 배 빨라진다. "일단 돌아가는 화면 먼저 보여주고 피드백 받자"가 가능해진다.

## 마치며 — MCP 생태계의 다음 스텝

Google Stitch MCP는 아직 Google Labs의 실험 프로젝트다. 프로덕션에 바로 쓰기엔 불안할 수 있다. Apache 2.0 라이선스지만, 비공식이고 무보증이라는 점도 알아둬야 한다.

하지만 방향성만큼은 확실하다.

IDE를 벗어나지 않고 디자인부터 코드까지 — 이게 결국 모든 AI 코딩 도구들이 가려는 곳이다. MCP 프로토콜이라는 표준 위에서 Stitch, Claude Code, Cursor가 하나로 연결되는 미래. 그게 지금 시작됐다.

"그래서 써볼 만한 거야?" 하고 묻는다면, **무조건 한번 돌려보라고 답하겠다.** 설치 1분이면 끝나고, 첫 화면이 생성되는 순간 "아, 이게 되네?" 하는 경험을 한다. 그 경험이 프론트엔드 개발에 대한 생각을 바꿔놓을 수도 있다.

프론트엔드 개발자라면, 지금 이 타이밍에 MCP 생태계를 경험해두는 게 반드시 도움이 될 거다.
