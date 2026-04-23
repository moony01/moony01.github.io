---
layout: post
title: "스크래핑이 끝났다 — 구글 WebMCP, 토큰 90% 절감의 충격"
description: "구글 크롬 팀이 공개한 WebMCP는 웹사이트가 AI 에이전트에게 구조화된 도구를 직접 노출하는 새로운 표준이다. 기존 스크래핑 대비 토큰 90%를 절감하는 이 기술의 실체를 파헤친다."
date: 2026-02-11 18:00:00 +0900
categories: [ai]
tags: [WebMCP, AI Agent, Google Chrome, MCP, Web Scraping, Browser]
image: google-webmcp-ai-scraping-end/google-webmcp-ai-scraping-end-1.png
published: true
---

"스크래핑? 그거 아직도 하세요?"

이 말을 할 수 있는 날이 진짜로 다가오고 있습니다. 2026년 2월, 구글 크롬 팀이 **WebMCP(Web Model Context Protocol)**를 공식 발표했습니다. GeekNews에 올라온 지 몇 시간 만에 개발자 커뮤니티가 들끓고 있는 이 기술 — 대체 뭐길래 이렇게 난리일까요?

한 줄로 요약하면 이렇습니다: **웹사이트가 AI 에이전트에게 "여기서 뭘 할 수 있는지" 직접 알려주는 표준**. 스크린샷 찍고, DOM 파싱하고, CSS 셀렉터 깨지면 멘붕하는 그 시대가 끝납니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/google-webmcp-ai-scraping-end/google-webmcp-ai-scraping-end-1-400.webp 400w,
            /static/img/posts/google-webmcp-ai-scraping-end/google-webmcp-ai-scraping-end-1-800.webp 800w,
            /static/img/posts/google-webmcp-ai-scraping-end/google-webmcp-ai-scraping-end-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/google-webmcp-ai-scraping-end/google-webmcp-ai-scraping-end-1.webp" 
    alt="WebMCP 개념도 — 웹사이트가 AI 에이전트에게 구조화된 도구를 직접 노출하는 구조" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>
## 지금 스크래핑이 얼마나 비효율적인지 아시나요

AI 에이전트가 웹사이트에서 작업을 수행하려면 현재 이런 과정을 거칩니다:

1. 페이지 **스크린샷을 캡처**하거나 DOM 전체를 가져온다
2. 비전 모델 또는 텍스트 파싱으로 어떤 요소가 있는지 **분석**한다
3. 클릭할 버튼, 입력할 필드를 **추측**해서 액션을 실행한다
4. 결과를 다시 스크린샷으로 **확인**한다

이 과정에서 소모되는 토큰이 어마어마합니다. Playwright로 접근성 트리를 가져와도, DOM 구조가 변경되면 즉시 깨집니다. 실제로 오늘 아침에 Playwright MCP를 사용해서 웹사이트를 자동화했는데, 한 페이지의 스냅샷만으로도 수천 토큰이 소모되는 걸 직접 체감했습니다.

WebMCP는 이 문제를 근본적으로 뒤집습니다. **스크래핑 기반 대비 토큰 사용량이 약 10%**로 줄어든다는 보고가 나왔습니다. 즉, **90%를 절감**할 수 있다는 뜻입니다.

## WebMCP의 핵심 — 3가지 계약

WebMCP는 웹사이트와 AI 에이전트 사이에 **세 가지 명시적 계약(Contract)**을 정의합니다.

### 1. Discovery (발견)

웹사이트가 "이 페이지에서 할 수 있는 작업"을 선언합니다. 에이전트가 DOM을 뒤질 필요 없이, 사이트가 직접 "상품 검색", "장바구니 추가", "결제 진행" 같은 **도구 목록**을 알려줍니다.

### 2. JSON Schema (스펙 정의)

각 도구의 입출력을 JSON Schema로 명시합니다. "상품 검색" 도구의 입력이 `{ query: string, category?: string, maxPrice?: number }`라는 걸 에이전트가 정확히 알 수 있습니다. 추측이 아니라 **계약**입니다.

### 3. State (상태 공유)

현재 페이지의 상태를 에이전트와 공유합니다. 장바구니에 3개 상품이 담겨 있는지, 로그인 상태인지 등의 컨텍스트를 구조화된 형태로 전달합니다.

이 세 가지가 합쳐지면, AI 에이전트는 더 이상 화면을 "보는" 게 아니라 웹사이트와 **대화**하게 됩니다.



{% include pre-version.html %}

## 선언적 API vs 명령형 API — 두 가지 통합 방식

WebMCP는 두 가지 방식으로 도구를 노출할 수 있습니다.

### 선언적 API (Declarative)

기존 HTML 폼에 속성을 추가하는 방식입니다. 가장 간단한 통합 방법이죠.

```html
<!-- 기존 검색 폼에 WebMCP 속성만 추가 -->
<form action="/search" method="GET" webmcp-tool="search-products">
  <input name="q" type="text" webmcp-description="상품 검색어" />
  <input name="category" type="text" webmcp-description="카테고리 필터" />
  <button type="submit">검색</button>
</form>
```

기존에 잘 동작하는 HTML 폼에 `webmcp-tool`, `webmcp-description` 같은 속성만 추가하면, AI 에이전트가 이 폼의 용도와 사용법을 바로 이해합니다. 기존 사이트를 거의 수정하지 않아도 됩니다.

### 명령형 API (Imperative)

JavaScript로 복잡한 동적 인터랙션을 처리하는 방식입니다. SPA처럼 폼 기반으로 표현하기 어려운 인터랙션에 적합합니다.

```javascript
// 장바구니 추가 도구를 WebMCP에 등록
navigator.webMCP.registerTool({
  name: "add-to-cart",
  description: "상품을 장바구니에 추가",
  inputSchema: {
    type: "object",
    properties: {
      productId: { type: "string" },
      quantity: { type: "number", default: 1 }
    },
    required: ["productId"]
  },
  handler: async ({ productId, quantity }) => {
    const result = await cart.addItem(productId, quantity);
    return { success: true, cartTotal: result.total };
  }
});
```

이 코드 한 번이면 AI 에이전트가 "이 상품 장바구니에 담아줘"라는 요청을 정확하게 처리할 수 있습니다. DOM을 파싱해서 "장바구니 담기" 버튼을 찾는 게 아니라, **명시적으로 정의된 도구를 호출**하는 겁니다.

## 실제로 어디에 쓰이게 될까

구글이 제시한 주요 시나리오는 세 가지입니다.

**이커머스** — "이 노트북 검색해서 가장 싼 거 장바구니에 담아줘"라고 AI 에이전트에게 말하면, 사이트가 제공하는 WebMCP 도구를 통해 상품을 검색하고, 필터를 적용하고, 장바구니에 추가합니다. DOM 파싱 없이.

**고객 지원** — 에이전트가 지원 사이트에 접속해서 WebMCP 도구를 사용해 카테고리를 선택하고, 이슈를 설명하고, 첨부파일을 업로드합니다. 입력 필드를 찾아 헤매지 않습니다.

**여행 예약** — 날짜, 인원, 예산 등의 파라미터를 WebMCP 도구에 직접 전달해서 검색과 필터링을 수행합니다.

핵심은 이겁니다 — **사이트 소유자가 직접 정의한 도구**이기 때문에, DOM이 바뀌어도 깨지지 않습니다. API 계약이 유지되는 한 에이전트는 안정적으로 동작합니다. REST API가 프론트엔드 UI 변경에 영향받지 않는 것과 같은 원리죠.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/google-webmcp-ai-scraping-end/google-webmcp-ai-scraping-end-2-400.webp 400w,
            /static/img/posts/google-webmcp-ai-scraping-end/google-webmcp-ai-scraping-end-2-800.webp 800w,
            /static/img/posts/google-webmcp-ai-scraping-end/google-webmcp-ai-scraping-end-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/google-webmcp-ai-scraping-end/google-webmcp-ai-scraping-end-2.webp" 
    alt="WebMCP 아키텍처 다이어그램 — 브라우저 내 AI 에이전트와 웹사이트 간 구조화된 통신" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>




{% include pre-version.html %}

## 지금 당장 움직여야 하는 이유

WebMCP는 현재 **Chrome 146 Early Preview Program**에 포함되어 있습니다. 아직 프로토타이핑 단계이지만, 구글이 크롬에 직접 넣었다는 것은 **강하게 밀겠다**는 시그널입니다.

**웹 개발자라면 지금 할 일:**

1. [Chrome Early Preview Program](https://developer.chrome.com/blog/webmcp-epp)에 가입해서 문서와 데모 확인
2. 자신의 웹사이트에서 AI 에이전트가 수행할 수 있는 **작업 목록**을 정리
3. 기존 API 엔드포인트와 WebMCP 도구 **매핑을 설계**
4. 선언적 API부터 시작해서 기존 폼에 **WebMCP 속성 추가** 실험

**AI 에이전트 개발자라면:**

1. Playwright/Puppeteer 기반 스크래핑에서 **WebMCP 기반 통합으로의 전환** 계획
2. 토큰 비용 절감 효과 측정을 위한 **벤치마크 준비**
3. Fallback 전략 설계 — WebMCP 미지원 사이트를 위한 기존 방식 유지

## 마치며 — 웹의 패러다임이 바뀌고 있다

WebMCP의 등장은 단순한 기술 업데이트가 아닙니다. 웹이 "사람이 보는 것"에서 **"AI가 이해하는 것"**으로 진화하는 분기점입니다.

REST API가 서버 간 통신을 표준화했듯이, WebMCP는 **AI 에이전트와 웹사이트 간 통신을 표준화**합니다. 그리고 이건 구글이 크롬이라는 세계 1위 브라우저에 직접 넣고 있는 기술입니다.

스크래핑의 시대가 정말로 끝나가고 있습니다. 문제는 "올 것인가"가 아니라 **"얼마나 빨리 오는가"**입니다. 지금 준비를 시작하는 개발자와 안 하는 개발자의 격차는, 1년 후에 매우 선명해질 겁니다.
