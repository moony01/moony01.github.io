---
layout: post
title: "Stripe 개발자는 코드를 안 짠다 - AI가 주 1,300개 PR을 머지하는 충격 실화"
date: 2026-03-08 11:00:00 +0900
categories: [ai]
tags: [AI, coding-agents, Stripe, agentic-engineering, developer-productivity, Minions]
image: stripe-minions-ai-coding-1300-pr/stripe-minions-ai-coding-1300-pr-1.webp
published: true
---

"AI가 코드를 짠다"는 말은 이제 식상하다. Copilot이 자동완성해주고, ChatGPT가 스니펫을 뱉어주는 건 이미 2024년 얘기다. 그런데 2026년 3월, Stripe가 공개한 숫자는 차원이 다르다. **주당 1,300개 이상의 풀 리퀘스트가 AI 에이전트에 의해 작성되고 머지되고 있다.** 사람이 작성한 코드는 단 한 줄도 없이.

연간 1조 달러 이상의 결제를 처리하는 핀테크 공룡이, 자사 코드베이스의 상당 부분을 AI에게 맡기고 있다는 뜻이다. 이건 단순한 실험이 아니다. 프로덕션이다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/stripe-minions-ai-coding-1300-pr/stripe-minions-ai-coding-1300-pr-1-400.webp 400w,
            /static/img/posts/stripe-minions-ai-coding-1300-pr/stripe-minions-ai-coding-1300-pr-1-800.webp 800w,
            /static/img/posts/stripe-minions-ai-coding-1300-pr/stripe-minions-ai-coding-1300-pr-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/stripe-minions-ai-coding-1300-pr/stripe-minions-ai-coding-1300-pr-1.webp" 
    alt="Stripe Minions AI 코딩 에이전트" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## Minions - Stripe가 만든 AI 코딩 에이전트의 정체

Stripe는 이 시스템을 내부적으로 **"Minions"**라고 부른다. Block(구 Square)의 오픈소스 코딩 에이전트 Goose를 포크해서 만들었고, MCP(Model Context Protocol)를 통해 내부 시스템과 연결된다.

핵심 아키텍처를 정리하면 이렇다:

```
개발자 → Slack 메시지로 태스크 할당
         ↓
    Minion 생성 (EC2 devbox, 10초 내 부팅)
         ↓
    코드 작성 → 로컬 린트 → 테스트 실행
         ↓
    CI 통과 → PR 생성 (사람 코드 0줄)
         ↓
    사람 리뷰 → 머지
```

개발자가 Slack에서 메시지 하나 보내면, Minion이 할당받은 태스크를 혼자 끝낸다. 코드 작성, 테스트 실행, CI 통과, PR 생성까지 **완전 무인 원샷**으로 처리한다.

특히 주목할 점은 **Toolshed**라는 내부 MCP 서버다. 여기에 **500개 이상의 도구**가 등록되어 있어서, Minion이 Stripe의 방대한 내부 시스템(결제 API, 데이터베이스, 모니터링 등)을 자유롭게 활용할 수 있다.

## 1,300개 PR이 가능한 이유 - 샌드박스의 힘

"AI가 프로덕션 코드를 건드린다고? 위험하지 않나?"

이 질문에 대한 Stripe의 답은 명확하다: **완벽한 격리**.

```
┌─────────────────────────────────┐
│         Minion Devbox           │
│  ┌───────────┐  ┌────────────┐ │
│  │ Stripe    │  │ 3M+ Tests  │ │
│  │ Codebase  │  │ Suite      │ │
│  └───────────┘  └────────────┘ │
│                                 │
│  ✗ 인터넷 접근 불가             │
│  ✗ 프로덕션 접근 불가           │
│  ✓ 병렬 실행 무제한            │
└─────────────────────────────────┘
```

Minion은 AWS EC2 인스턴스에서 돌아가는데, 사람 개발자가 쓰는 것과 **동일한 devbox** 환경이다. 코드와 서비스가 미리 로드되어 있어서 10초 만에 부팅된다.

결정적으로, 이 환경은 **인터넷과 프로덕션 시스템에 대한 접근이 완전히 차단**되어 있다. 덕분에 권한 체크가 필요 없고, 무한 병렬 실행이 가능하다. 개발자 한 명이 동시에 여러 Minion을 띄워서 서로 다른 태스크를 병렬로 처리할 수 있다는 뜻이다.

{% include pre-version.html %}

## Blueprint - 순수 에이전트도, 순수 워크플로우도 아닌 하이브리드

Stripe가 만든 또 하나의 핵심 개념이 있다. **Blueprint**다.

기존의 AI 코딩 도구는 크게 두 가지 방식으로 나뉜다:
- **워크플로우 방식**: 단계가 미리 정해져 있고, AI는 각 단계를 실행만 한다
- **에이전트 방식**: AI가 자유롭게 판단하고 행동한다 (비용과 시간이 비쌈)

Stripe의 Blueprint는 이 둘을 **하이브리드**로 섞었다. 린팅 같은 확정적 작업은 코드 노드(deterministic node)로 처리하고, 실제 코딩 같은 유연한 작업은 에이전트 노드로 처리한다.

```javascript
// Blueprint 의사 코드
const blueprint = {
  steps: [
    { type: "agent",        task: "코드 작성" },
    { type: "deterministic", task: "로컬 린트 실행" },  // 토큰 절약
    { type: "agent",        task: "린트 에러 수정" },
    { type: "deterministic", task: "CI 실행" },          // 비용 절약
    { type: "agent",        task: "테스트 실패 수정", maxRetry: 2 },
    { type: "deterministic", task: "PR 생성" }
  ]
};
```

이 구조의 핵심은 **비용 절약**이다. 모든 걸 에이전트한테 시키면 토큰 비용이 폭발한다. 린팅이나 CI 실행 같은 건 결과가 정해져 있으니 LLM한테 맡길 이유가 없다. Stripe는 이걸 "토큰과 CI 비용을 스케일에서 절약한다"고 표현했다.

실패 처리도 현실적이다. **CI는 최대 2라운드만 허용**한다. LLM이 무한 루프에 빠지는 걸 막기 위해서다. 2번 시도해도 테스트가 통과하지 못하면, 그 브랜치는 사람에게 넘어간다.

## Agentic Engineering - 코딩을 멈춘 엔지니어가 승리하는 시대

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/stripe-minions-ai-coding-1300-pr/stripe-minions-ai-coding-1300-pr-2-400.webp 400w,
            /static/img/posts/stripe-minions-ai-coding-1300-pr/stripe-minions-ai-coding-1300-pr-2-800.webp 800w,
            /static/img/posts/stripe-minions-ai-coding-1300-pr/stripe-minions-ai-coding-1300-pr-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/stripe-minions-ai-coding-1300-pr/stripe-minions-ai-coding-1300-pr-2.webp" 
    alt="Agentic Engineering 패러다임 전환" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

Stripe의 사례는 단독 현상이 아니다. 2026년 초, 업계 전체에서 **"Agentic Engineering"**이라는 새로운 패러다임이 부상하고 있다.

2025년 OpenAI의 Andrej Karpathy가 "Vibe Coding"이라는 용어를 만들었다. 대충 프롬프트 던지고 AI가 만든 코드를 감으로 받아들이는 방식이었다. 하지만 2026년에 접어들면서, 이 용어는 **Agentic Engineering**으로 진화했다.

차이점은 명확하다:

| | Vibe Coding (2025) | Agentic Engineering (2026) |
|---|---|---|
| **접근** | 프롬프트 → 코드 복붙 | 에이전트 시스템 설계 |
| **사람 역할** | 코드 작성자 | 시스템 아키텍트 + 리뷰어 |
| **품질** | "AI 슬롭" 위험 | 테스트 + 린트 + 리뷰 체계 |
| **규모** | 개인 생산성 향상 | 조직 전체 자동화 |

Medium의 한 글 제목이 이 변화를 정확히 요약한다: **"The Engineers Who Stopped Coding (And Built Systems That Code Instead)"** - 코딩을 멈추고, 대신 코딩하는 시스템을 만드는 엔지니어들.

## 개발자는 어떻게 대비해야 하는가

솔직히 말하자. 이 흐름은 되돌릴 수 없다. Stripe만의 특수한 상황이 아니다. 이미 GitHub Copilot Workspace, Cursor의 Agent 모드, Claude Code의 자율 실행 등 도구는 넘쳐난다.

하지만 Stripe의 사례에서 가져갈 수 있는 핵심 교훈이 있다:

**1. 테스트 인프라가 핵심이다**

Stripe의 Minions가 작동하는 건 300만 개 이상의 테스트 스위트 덕분이다. AI가 코드를 짜도 통과/실패를 판단할 수 있는 기준이 있기 때문이다. 테스트 없이 AI 에이전트를 쓰는 건 브레이크 없는 차를 운전하는 것과 같다.

**2. 사람의 역할은 "리뷰어 + 아키텍트"로 이동한다**

Stripe도 모든 AI PR을 사람이 리뷰한다. AI가 코드를 짜는 속도는 사람을 압도하지만, "이 코드가 맞는 방향인지" 판단하는 건 여전히 사람의 영역이다.

**3. 도구를 만드는 능력이 차별화된다**

Stripe의 500개 MCP 도구는 하루아침에 만들어진 게 아니다. 수년간 개발자 생산성에 투자한 결과물이다. Stripe는 "인간 개발자 생산성에 대한 투자가 에이전트 시대에 배당금을 돌려주고 있다"고 직접 밝혔다.

## 마치며

"개발자가 코드를 안 짠다"는 말이 더 이상 농담이 아닌 시대가 왔다. Stripe의 Minions는 주당 1,300개 이상의 PR을 사람 코드 한 줄 없이 만들어내고 있고, 이건 프로덕션에서 실제로 돌아가는 시스템이다.

물론 "AI가 모든 개발자를 대체한다"는 뜻은 아니다. Stripe조차 모든 PR을 사람이 리뷰한다. 하지만 개발자의 역할이 "코드를 짜는 사람"에서 "코드를 짜는 시스템을 설계하고 감독하는 사람"으로 바뀌고 있다는 건 부정할 수 없는 사실이다.

준비된 개발자에게 이건 위기가 아니라 기회다. 지금 해야 할 건 더 빠르게 코드를 짜는 연습이 아니라, **AI가 짠 코드를 평가할 수 있는 안목을 기르는 것**이다.

코딩을 멈춘 엔지니어가 승리하는 시대. 당신은 준비되어 있는가?

---

**참고 자료**:
- [Minions: Stripe's one-shot, end-to-end coding agents (Part 1)](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)
- [Minions: Stripe's one-shot, end-to-end coding agents (Part 2)](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2)
- [Agentic Engineering: The Engineers Who Stopped Coding](https://fernando-bandeira.medium.com/agentic-engineering-the-engineers-who-stopped-coding-and-built-systems-that-code-instead-909f9e30b130)
