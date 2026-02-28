---
layout: post
title: "SEO 드디어 죽었다 - AI 에이전트가 대신 고르는 시대가 온다"
date: 2026-02-28 14:00:00 +0900
categories: [ai]
tags: [AAO, SEO, AI에이전트, 검색최적화, 웹개발]
image: seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-1.png
published: true
---

솔직히 말하자. "SEO 죽었다"는 말, 지난 10년간 매년 나왔다. 그런데 이번엔 진짜 다르다. 사람이 검색 결과를 훑어보고 클릭하는 행위 자체가 사라지고 있기 때문이다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-1-400.webp 400w,
            /static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-1-800.webp 800w,
            /static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-1-400.png 400w,
            /static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-1-800.png 800w,
            /static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-1.png" 
    alt="SEO에서 AAO로의 진화" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

2026년 2월, Search Engine Land에서 Jason Barnard가 발표한 **AAO(Assistive Agent Optimization)** 개념이 개발자 커뮤니티를 뜨겁게 달구고 있다. GeekNews 프론트페이지에 올라가자마자 논쟁이 벌어졌고, 핵심은 이거다. **AI 에이전트가 사용자 대신 검색하고, 비교하고, 결정까지 내리는 세상에서 당신의 웹사이트는 "선택"받을 수 있는가?**

{% include pre-version.html %}

## SEO → AEO → AIEO → AAO: 검색 최적화의 4단계 진화

이 흐름을 이해하려면 검색이 어떻게 변해왔는지 먼저 봐야 한다.

| 단계 | 이름 | 목표 | 시대 |
|:----:|------|------|------|
| 1단계 | **SEO** (Search Engine Optimization) | 검색에 노출되기 | 2000년대~ |
| 2단계 | **AEO** (Answer Engine Optimization) | 답변으로 선택되기 | 2018년~ |
| 3단계 | **AIEO** (AI Engine Optimization) | AI 추천에 포함되기 | 2023년~ |
| 4단계 | **AAO** (Assistive Agent Optimization) | 사람 없이 AI가 선택하게 하기 | **2026년~** |

각 단계가 이전 단계를 흡수한다는 게 핵심이다. AAO를 잘하면 SEO, AEO, AIEO도 자동으로 커버된다. 하지만 반대는 성립하지 않는다.

## "제로섬 순간" - AI 에이전트는 목록을 보여주지 않는다

기존 검색 엔진은 10개의 결과를 보여줬다. 1위를 못 해도 3위, 5위에 들면 트래픽은 왔다. 하지만 AI 에이전트는 다르다. **딱 하나의 답만 선택한다.**

호텔을 예약한다고 하자. 기존에는 사용자가 여러 후보를 비교했다. AAO 시대에서는 AI 에이전트가 사용자의 선호도, 일정, 예산을 분석하고 **"여기 예약했습니다"** 하고 끝낸다. 사용자는 후보 목록조차 보지 못한다.

이게 Barnard가 말하는 "제로섬 순간(zero-sum moment)"이다. 선택받거나, 존재하지 않거나. 중간은 없다.

## 개발자가 당장 바꿔야 할 3가지

그렇다면 웹 개발자로서 뭘 해야 하나? 이건 단순히 마케터의 문제가 아니다. 프론트엔드를 짜는 방식부터 바뀌어야 한다.

### 1. JavaScript 렌더링에 의존하지 마라

```javascript
// 문제: AI 에이전트 봇은 대부분 JS를 실행하지 않는다
const ProductPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setData);
  }, []);
  return <div>{data?.description}</div>; // 에이전트에겐 빈 페이지
};
```

대부분의 AI 에이전트 봇은 클라이언트 사이드 JavaScript를 실행하지 않는다. SPA(Single Page Application)로 만든 사이트는 에이전트에게 **빈 페이지**로 보인다. SSR(Server-Side Rendering) 또는 SSG(Static Site Generation)가 사실상 필수다.

```javascript
// 해결: Next.js SSR/SSG로 에이전트가 콘텐츠를 즉시 읽게
export async function getStaticProps() {
  const products = await fetchProducts();
  return { props: { products }, revalidate: 3600 };
}
```

### 2. 구조화된 데이터로 "엔티티"를 명확히 선언하라

AI 에이전트는 title 태그를 스캔하지 않는다. 대신 **"이 브랜드가 누구인지, 무엇을 하는지, 왜 신뢰할 수 있는지"**를 평가한다. 이를 위해 Schema.org 기반의 구조화된 데이터가 핵심이 된다.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "YourBrand",
  "description": "클라우드 네이티브 모니터링 솔루션",
  "knowsAbout": ["Kubernetes", "Observability", "SRE"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [...]
  }
}
```

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-2-400.webp 400w,
            /static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-2-800.webp 800w,
            /static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-2-400.png 400w,
            /static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-2-800.png 800w,
            /static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/seo-dead-aao-ai-agent-optimization/seo-dead-aao-ai-agent-optimization-2.png" 
    alt="AAO 알고리즘 트리니티" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

### 3. Push 기반으로 전환하라 - IndexNow와 MCP

기존 SEO는 "크롤러가 알아서 와주길 기다리는" 수동 모델이었다. AAO에서는 **직접 밀어넣는(push)** 방식이 핵심이다.

{% include pre-version.html %}

**IndexNow**는 콘텐츠가 변경되면 즉시 검색 엔진에 알리는 프로토콜이고, **MCP(Model Context Protocol)**는 AI 모델에게 직접 구조화된 정보를 공급하는 레이어다. Barnard는 구글도 결국 IndexNow의 자체 버전을 출시할 것이라 예측한다.

```bash
# IndexNow API로 즉시 색인 알림
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "yourdomain.com",
    "key": "your-key",
    "urlList": ["https://yourdomain.com/new-page"]
  }'
```

## "알고리즘 트리니티" - AI가 판단하는 3가지 축

Barnard가 제시한 AAO의 핵심 프레임워크는 **알고리즘 트리니티**다.

1. **LLM(대규모 언어 모델)**: 자연어로 브랜드를 이해하고 평가
2. **Knowledge Graph(지식 그래프)**: 엔티티 간 관계를 구조적으로 파악
3. **Traditional Search(전통 검색)**: 기존 색인 데이터를 보완 자료로 활용

이 세 축이 합쳐져 AI 에이전트의 "선택 알고리즘"이 된다. 2026년 2월 기준, 상위 퍼포머들이 전체 인용 가능성(citability)의 59.5%를 차지한다. 12월에는 30.9%였다. **3개월 만에 293% 집중도가 상승**했다. 선점 효과가 이미 시작된 것이다.

## 결국 "브랜드"가 답이다

기술적으로 정리하면 이렇다.

- CSR(Client-Side Rendering) 사이트는 에이전트에게 **투명인간**이다
- 구조화된 데이터 없는 사이트는 에이전트에게 **정체불명**이다
- Push를 안 하는 사이트는 에이전트에게 **존재하지 않는다**

AAO라는 용어가 과도한 마케팅 아니냐는 반론도 있다. 하지만 명칭이 뭐든 핵심은 변하지 않는다. **"사람이 검색 결과를 클릭하는 행위"가 줄어드는 건 되돌릴 수 없는 흐름이다.** 에이전트가 대신 결정하는 세상에서, 당신의 코드와 콘텐츠는 기계가 읽고 판단할 수 있도록 준비되어 있는가?

Barnard의 말로 글을 마친다.

> "불완전한 용어는 불완전한 전략을 만든다. 이제 전문 용어가 정해졌고, 에이전트들은 이미 행동하고 있으며, 푸시 레이어가 도착했다. 느긋하게 있을 시간은 끝났다."

지금 당장 자신의 사이트에 들어가서 JavaScript를 끄고 접속해 보라. 그게 AI 에이전트가 보는 당신의 사이트다.
