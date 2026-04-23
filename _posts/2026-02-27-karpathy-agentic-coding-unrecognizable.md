---
layout: post
title: "에이전트 코딩이 프로그래밍을 알아볼 수 없게 바꿨다"
description: "Karpathy가 2월 26일 선언한 에이전트 코딩 혁명의 실체. 80% 수동 → 80% 에이전트로 역전된 현장, Bloomberg 생산성 패닉, 그리고 개발자가 지금 당장 해야 할 것."
date: 2026-02-27 10:00:00 +0900
categories: [ai]
tags: [karpathy, 에이전트코딩, agentic-engineering, claude-code, cursor, ai코딩]
image: karpathy-agentic-coding-unrecognizable/karpathy-agentic-coding-unrecognizable-1.png
published: true
---

11월에는 80%를 직접 타이핑했다. 12월에는 80%를 에이전트가 썼다.

한 달 사이에 비율이 완전히 뒤집혔다. 그것도 AI 회의론자로 유명했던 Andrej Karpathy의 이야기다. 10월에 "AI 에이전트는 그냥 작동 안 한다"고 했던 그 사람이, 두 달 뒤에 "나는 이제 주로 영어로 프로그래밍한다"고 선언했다.

2월 26일, Karpathy는 X에 올린 글에서 한 발 더 나아갔다. 에이전트 AI 코딩이 세상을 바꿔놓았다고. 12월 이전에는 기본적으로 작동하지 않았고, 12월 이후에는 기본적으로 작동한다고. Bloomberg는 같은 날 "생산성 패닉"이 테크 기업 전반에 퍼지고 있다고 보도했다. 주니어 개발자 채용 공고는 16% 감소했다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/karpathy-agentic-coding-unrecognizable/karpathy-agentic-coding-unrecognizable-1-400.webp 400w,
            /static/img/posts/karpathy-agentic-coding-unrecognizable/karpathy-agentic-coding-unrecognizable-1-800.webp 800w,
            /static/img/posts/karpathy-agentic-coding-unrecognizable/karpathy-agentic-coding-unrecognizable-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/karpathy-agentic-coding-unrecognizable/karpathy-agentic-coding-unrecognizable-1.webp" 
    alt="에이전트 코딩 시대 개발자의 역할 변화를 표현한 히어로 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 12월에 무슨 일이 있었나

Karpathy의 주장에서 가장 흥미로운 부분은 특정 시점을 콕 집어 말한다는 점이다. "12월 이전에는 기본적으로 작동하지 않았고, 12월 이후에는 기본적으로 작동한다." 이건 점진적 개선이 아니라 임계점 돌파를 말하는 것이다.

그가 지목한 변화는 세 가지다.

첫째, **모델 품질의 도약**. 단순히 코드를 더 잘 쓰는 게 아니라, 긴 작업에서 맥락을 잃지 않는 능력이 생겼다. 이전 에이전트들은 복잡한 작업 중간에 방향을 잃거나 이미 해결한 문제를 다시 건드리는 일이 잦았다.

둘째, **끈기(tenacity)**. 에이전트가 막히면 포기하지 않고 다른 방법을 시도한다. 인간 개발자가 지쳐서 멈출 지점에서도 계속 밀어붙인다. Karpathy는 이걸 "스태미나"라고 불렀다. "LLM을 손에 쥐고 나서 스태미나가 극적으로 늘었다."

셋째, **대규모 코드 액션**. 파일 하나를 수정하는 게 아니라, 여러 파일에 걸친 리팩토링을 한 번에 처리한다. 이전에는 지식이나 기술 부족으로 건드리지 못했던 코드베이스에도 접근할 수 있게 됐다.

### 실제로 어떻게 달라졌나

Karpathy의 워크플로우 변화를 구체적으로 보면 이렇다.

```bash
# 이전 방식 (11월)
# 개발자가 직접 코드 작성 → AI에게 특정 함수 완성 요청 → 검토 후 수정

# 현재 방식 (12월 이후)
# 개발자가 영어로 목표 설명 → 에이전트가 전체 구현 → 개발자가 방향 조정
claude "이 API 엔드포인트에 rate limiting 추가하고, 기존 테스트가 다 통과하도록 해줘"
```

이 명령 한 줄로 에이전트는 미들웨어 작성, 설정 파일 수정, 테스트 업데이트까지 처리한다. 개발자는 결과를 검토하고 방향을 잡는다.

"이게 자존심을 좀 상하게 한다"고 Karpathy는 솔직하게 인정했다. 하지만 "소프트웨어를 대규모 코드 액션으로 다루는 능력이 너무 유용해서 무시할 수 없다"고 했다.

## Bloomberg가 보도한 생산성 패닉의 실체

Karpathy의 발언과 같은 날, Bloomberg는 테크 업계에 "생산성 패닉"이 번지고 있다고 보도했다. 이 보도가 흥미로운 이유는 낙관론이 아니라 불안감을 다루기 때문이다.

주니어 소프트웨어 엔지니어 채용 공고가 16% 감소했다. 기업들은 AI 도구로 같은 일을 더 적은 인원으로 처리할 수 있다는 걸 깨닫기 시작했다. 아마존 개발자들이 블라인드에 올린 글이 화제가 됐다. "10명이 하던 일을 AI가 2명으로 끝낸다."

하지만 현장 엔지니어들의 반응은 더 복잡하다. AI가 생성한 코드를 디버깅하는 데 3배 더 오래 걸린다는 보고가 나온다. 거버넌스 프레임워크는 거의 존재하지 않는다. 주니어 개발자의 40%가 자신이 완전히 이해하지 못한 AI 생성 코드를 배포하고 있다는 조사 결과도 있다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/karpathy-agentic-coding-unrecognizable/karpathy-agentic-coding-unrecognizable-2-400.webp 400w,
            /static/img/posts/karpathy-agentic-coding-unrecognizable/karpathy-agentic-coding-unrecognizable-2-800.webp 800w,
            /static/img/posts/karpathy-agentic-coding-unrecognizable/karpathy-agentic-coding-unrecognizable-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/karpathy-agentic-coding-unrecognizable/karpathy-agentic-coding-unrecognizable-2.webp" 
    alt="에이전트 코딩 워크플로우와 개발자 역할 변화 다이어그램" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

*이미지: Gemini AI 생성*

{% include pre-version.html %}

## 에이전트 코딩이 실제로 잘 작동하는 영역과 그렇지 않은 영역

Karpathy 본인도 한계를 인정한다. 에이전트는 "슬로피한 주니어 개발자처럼" 미묘한 개념적 실수를 저지른다. 잘못된 가정 위에서 작업하고, 명확화 질문을 하지 않으며, 해결책을 과도하게 복잡하게 만드는 경향이 있다.

현장에서 에이전트 코딩이 잘 작동하는 영역은 명확하다.

**잘 작동하는 영역:**
- 반복적인 보일러플레이트 코드 생성
- 기존 패턴을 따르는 CRUD 구현
- 테스트 코드 작성 (특히 단위 테스트)
- 문서화 및 주석 추가
- 알려진 라이브러리 API 사용법 적용

**아직 인간이 필요한 영역:**
- 아키텍처 결정 (어떤 구조로 시스템을 설계할 것인가)
- 비즈니스 요구사항 해석 (모호한 스펙을 구체적 구현으로 번역)
- 성능 병목 진단 (왜 느린지 파악)
- 보안 취약점 설계 수준 검토
- 레거시 코드의 숨겨진 의도 파악

### 10X 엔지니어의 미래

Karpathy가 던진 질문 중 가장 날카로운 것은 이것이다. "모델이 코드 작성을 잘하게 되면 10X 엔지니어에게 무슨 일이 생기나?"

그의 답은 반직관적이다. 에이전트가 코드 생성을 잘할수록, 깊은 기술 전문성의 가치가 오히려 커진다. 에이전트를 올바른 방향으로 이끌고, 결과물을 평가하고, 잘못된 방향을 조기에 잡아내는 능력 — 이건 코드를 직접 쓰는 능력보다 더 높은 수준의 이해를 요구한다.

이전에 다뤘던 [Karpathy의 243줄 microGPT 실험](/ai/2026/02/17/karpathy-microgpt-243-lines-pure-python.html)에서도 비슷한 패턴이 보였다. 복잡성을 극도로 단순화하는 능력, 핵심을 꿰뚫는 시각 — 이건 AI가 대체하기 어려운 영역이다.

## 지금 당장 해야 할 것

에이전트 코딩 시대에 개발자가 실질적으로 준비해야 할 것은 추상적인 "AI 활용 능력"이 아니다.

**1. 에이전트에게 좋은 컨텍스트를 주는 연습**

에이전트는 컨텍스트가 명확할수록 잘 작동한다. "이 함수 고쳐줘"보다 "이 함수는 사용자 인증을 처리하는데, JWT 만료 시 refresh token을 자동으로 갱신해야 하고, 실패 시 로그아웃 처리해야 해"가 훨씬 좋은 결과를 낸다.

```bash
# 나쁜 프롬프트
claude "이 코드 최적화해줘"

# 좋은 프롬프트
claude "이 데이터베이스 쿼리가 1000개 이상의 레코드에서 느려지는 문제가 있어.
N+1 쿼리 문제인지 확인하고, 필요하면 eager loading으로 수정해줘.
기존 테스트는 모두 통과해야 해."
```

**2. 에이전트 결과물 검토 능력 강화**

AI가 생성한 코드를 빠르게 검토하는 능력이 새로운 핵심 스킬이 됐다. 코드를 처음부터 쓰는 속도보다, 코드를 읽고 문제를 찾는 속도가 더 중요해졌다.

**3. 시스템 설계 역량 투자**

에이전트가 구현을 담당할수록, 무엇을 만들지 결정하는 설계 역량의 가치가 올라간다. 데이터 모델링, API 설계, 서비스 경계 설정 — 이 영역에 의도적으로 투자해야 한다.

## 코드를 타이핑하던 시대의 끝

Karpathy의 발언이 과장처럼 들릴 수 있다. 하지만 그가 틀렸다고 말하기 어려운 이유가 있다. 그는 AI 회의론자였다. 10월에 "에이전트는 작동 안 한다"고 했던 사람이 두 달 만에 완전히 입장을 바꿨다.

변화는 이미 일어나고 있다. 주니어 채용이 줄고, 시니어 엔지니어들은 더 많은 것을 더 빠르게 만들고 있다. 에이전트 코딩을 무시하는 것은 선택지가 아니다.

다만 Karpathy 본인이 경고한 것도 기억해야 한다. "나는 이미 코드를 수동으로 작성하는 능력이 서서히 퇴화하고 있다는 걸 느낀다." 생성과 판단은 다른 기술이다. 생성이 싸질수록, 판단의 가치가 올라간다.
