---
layout: post
title: "AI 에이전트 루프 설계가 프롬프트를 대체한다"
description: "AI 에이전트 루프 설계가 왜 프롬프트보다 중요한지, ClaudeDevs·LangChain·agent-skills 흐름을 바탕으로 운영 기준을 정리했다."
date: 2026-07-08 12:08:00 +0900
categories: [ai]
tags: [AI에이전트, 루프설계, ClaudeCode, LangChain, agent-skills]
image: ai-agent-loop-engineering/ai-agent-loop-engineering-1.webp
lang: ko
published: true
---

AI 에이전트 루프 설계라는 말이 갑자기 많이 보인다. 처음엔 또 이름 붙이기인가 싶었다. 프롬프트 엔지니어링, 컨텍스트 엔지니어링, 하네스 엔지니어링에 이어 이제는 루프까지 붙는 건가 싶었는데, 오늘 자료를 몇 개 이어서 보니 느낌이 조금 달라졌다. 이건 유행어라기보다 개발팀이 AI 코딩 도구를 다루는 방식이 한 단계 더 내려온 신호에 가깝다.

[GeekNews에 올라온 ClaudeDevs 글 요약](https://news.hada.io/topic?id=31225)은 핵심을 꽤 잘 잡고 있었다. 코딩 에이전트에게 매번 새 프롬프트를 던지는 대신, 정지 조건이 충족될 때까지 작업 사이클을 돌리는 방식으로 관심이 옮겨가고 있다는 얘기다. LangChain도 비슷하게 [Loop Engineering](https://www.langchain.com/blog/the-art-of-loop-engineering)을 이야기한다. 모델 하나를 잘 고르는 문제가 아니라, 반복 구조를 어떻게 설계하느냐의 문제로 넘어가는 중이다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/ai-agent-loop-engineering/ai-agent-loop-engineering-1-400.webp 400w,
            /static/img/posts/ai-agent-loop-engineering/ai-agent-loop-engineering-1-800.webp 800w,
            /static/img/posts/ai-agent-loop-engineering/ai-agent-loop-engineering-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/ai-agent-loop-engineering/ai-agent-loop-engineering-1.webp"
    alt="AI 에이전트 루프 설계와 작업 게이트를 밝은 대시보드로 표현한 이미지"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 프롬프트 하나로는 긴 작업을 못 버틴다

### 좋은 첫 답변과 좋은 작업 완료는 다르다

요즘 코딩 에이전트를 쓰다 보면 제일 자주 겪는 착각이 있다. 첫 답변이 좋으면 전체 작업도 잘 끝날 것 같은 착각이다. 실제로는 그렇지 않다. 첫 계획은 그럴듯했는데, 파일을 열어보니 구조가 다르고, 테스트를 돌리니 깨지고, 패키지 버전이 예상과 다르고, 중간에 권한 문제가 튀어나온다. 여기서부터는 프롬프트 문장력보다 루프가 중요해진다.

한 번의 프롬프트는 방향을 준다. 루프는 작업을 붙잡는다. 파일 읽기, 수정, 테스트, 실패 로그 해석, 재수정, 리뷰 요청, 중단 조건 확인이 계속 이어져야 한다. 이 흐름이 없으면 에이전트는 매번 새로 똑똑한 척을 하지만, 실제 작업 상태는 쉽게 흩어진다.

OpenAI가 [Codex](https://openai.com/codex/)를 “계획, 기능 구현, 리팩터링, 리뷰, 릴리스까지 돕는 에이전트”로 설명하는 것도 같은 방향이다. Anthropic의 [Claude Code 문서](https://docs.anthropic.com/en/docs/claude-code/overview)도 코드베이스를 읽고, 파일을 편집하고, 명령을 실행하는 에이전트형 도구라는 점을 전면에 둔다. 이제 제품이 팔고 있는 건 대화창이 아니라 작업 루프다.

### 루프가 없으면 사람만 더 바빠진다

에이전트가 긴 작업을 맡을수록 사람의 역할은 “다음 줄 뭐 써?”에서 “지금 어디까지 맡겨도 되지?”로 바뀐다. 이때 루프가 없으면 사람은 오히려 더 바빠진다. 매번 상태를 물어봐야 하고, 같은 지시를 다시 줘야 하고, 실패했는지 성공했는지 로그를 뒤져야 한다.

반대로 루프가 잘 잡혀 있으면 사람은 중간 게이트만 본다. 테스트 통과했는지, diff가 의도와 맞는지, 비용이 예산 안에 있는지, 더 진행해도 되는지만 보면 된다. 예전에 썼던 [Codex Goals와 장기 실행 루프](/ai/2026/05/19/codex-goals-long-running-loop.html)에서도 같은 얘기를 했는데, 이번 흐름은 그보다 더 일반화된 버전이다. 특정 제품 기능을 넘어 “에이전트 작업은 어떤 반복 구조로 돌아야 하는가”가 주제가 됐다.

## 루프 엔지니어링의 핵심은 멈추는 법이다

### 계속 돌리는 것보다 멈추는 기준이 어렵다

루프라는 말을 들으면 자동으로 계속 도는 그림부터 떠오른다. 그런데 실전에서 더 중요한 건 멈추는 기준이다. 에이전트는 생각보다 쉽게 “조금만 더 고치면 될 것 같다”는 상태에 빠진다. 테스트 하나 고치려다 주변 코드를 만지고, 타입 오류 하나 잡으려다 구조를 바꾸고, 마지막에는 처음 목표와 다른 작업을 하고 있을 때가 있다.

그래서 루프에는 정지 조건이 필요하다. 테스트가 통과하면 멈춘다. 같은 오류가 2회 반복되면 멈춘다. 파일 변경 수가 기준을 넘으면 멈춘다. 토큰 예산을 넘으면 멈춘다. 보안 권한이나 외부 API 호출이 필요하면 멈춘다. 이 기준이 없으면 에이전트는 열심히 일하는 것처럼 보이지만, 운영 입장에서는 통제되지 않은 자동화가 된다.

나는 이 지점이 제일 현실적이라고 본다. 좋은 루프는 “에이전트가 알아서 다 한다”가 아니다. 오히려 반대다. 에이전트가 어디서 멈추고 사람에게 넘겨야 하는지 더 자주, 더 명확하게 정한다. 자동화의 목표가 사람 제거가 아니라 판단 지점 압축에 있다는 걸 인정하는 셈이다.

### 루프 종류보다 작업 성격이 먼저다

ClaudeDevs 글에서는 turn-based, goal-based, time-based, proactive 같은 루프 분류가 나온다. 분류 자체도 재밌지만, 내가 보기엔 더 중요한 질문은 “이 작업이 어떤 루프를 버틸 수 있나”다.

작은 리팩터링은 turn-based가 맞다. 한 번 수정하고, 테스트하고, 결과를 보고 다음 턴으로 간다. 긴 기능 구현은 goal-based가 맞다. 목표와 완료 기준을 먼저 세워두고, 중간 체크포인트를 둔다. 운영 모니터링이나 뉴스 수집은 time-based가 자연스럽다. 정해진 시간마다 보고, 바뀐 것만 처리한다. proactive 루프는 제일 조심해야 한다. 먼저 움직이는 자동화는 편하지만, 잘못 움직였을 때 피해도 먼저 생긴다.

이걸 구분하지 않고 모든 작업을 “에이전트에게 맡기면 됨”으로 밀면 바로 꼬인다. 루프는 강력하지만, 작업 성격과 맞지 않으면 그냥 빠른 혼란이다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/ai-agent-loop-engineering/ai-agent-loop-engineering-2-400.webp 400w,
            /static/img/posts/ai-agent-loop-engineering/ai-agent-loop-engineering-2-800.webp 800w,
            /static/img/posts/ai-agent-loop-engineering/ai-agent-loop-engineering-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/ai-agent-loop-engineering/ai-agent-loop-engineering-2.webp"
    alt="AI 에이전트 루프 유형과 스킬 블록을 연결한 밝은 기술 다이어그램"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 스킬과 하네스가 루프의 재료가 된다

### agent-skills 저장소가 말하는 것

GitHub Trending에서 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)와 [dotnet/skills](https://github.com/dotnet/skills)가 같이 보인 것도 이 흐름과 맞물린다. 스킬은 프롬프트 모음처럼 보이지만, 실제로는 루프에 끼우는 작업 모듈에 가깝다. “리뷰할 때는 이 순서로 봐라”, “.NET 코드는 이 기준으로 작성해라”, “작업 후 이 검증을 돌려라” 같은 규칙이 반복 실행의 부품이 된다.

이전에 [Angular Agent Skills](/javascript/2026/06/14/angular-agent-skills.html)를 봤을 때도 비슷한 생각을 했다. 프레임워크 문서가 사람만 읽는 자료에서 에이전트가 실행 직전에 읽는 지침으로 이동하고 있다. 이번에는 그 지침이 루프 안에서 더 중요해진다. 에이전트가 한 번 답하고 끝나는 구조라면 스킬은 참고자료에 가깝다. 하지만 루프 안에서는 매 반복마다 품질 기준을 잡아주는 레일이 된다.

### 하네스는 루프의 바닥이다

루프가 제대로 돌려면 주변 시스템이 필요하다. 저장소 격리, 테스트 명령, 브라우저 검증, 비용 제한, 파일 변경 추적, 리뷰 게이트, 로그 보존 같은 것들이다. 이걸 대충 둔 상태에서 루프만 켜면 사고가 난다. 에이전트가 똑똑해질수록 더 빨리, 더 그럴듯하게 잘못 움직일 수 있기 때문이다.

그래서 나는 “루프 엔지니어링”을 프롬프트 기술로만 보면 안 된다고 본다. 이건 운영 설계다. 에이전트에게 어떤 도구를 줄지, 몇 번 재시도하게 할지, 어떤 파일은 못 건드리게 할지, 어떤 실패는 즉시 사람에게 넘길지 정하는 일이다. [AI 코딩 에이전트에는 하네스가 먼저 필요하다](/security/2026/06/08/ai-agent-harness-security.html)에서 말했던 안전한 작업장 개념이 여기서 다시 나온다.

try this 정도로 단순화하면, 좋은 루프는 이런 모양에 가깝다.

```text
goal -> inspect -> plan -> edit -> test -> review -> decide
                         ^                  |
                         |                  v
                    retry with limit <- stop or handoff
```

화려하지 않다. 근데 이 단순한 구조가 없으면, 에이전트 작업은 매번 운에 기대게 된다.

## 개발팀은 이제 루프를 리뷰해야 한다

### 코드 리뷰 전에 작업 루프 리뷰가 온다

앞으로 팀에서 봐야 할 건 코드 diff만이 아닐 가능성이 크다. “이 에이전트가 어떤 루프로 작업했는가”도 같이 봐야 한다. 어떤 소스를 읽었는지, 어떤 테스트를 돌렸는지, 몇 번 실패했는지, 어디서 사람 승인을 받았는지, 어느 시점에 중단했는지가 결과물의 신뢰도를 만든다.

이건 조금 귀찮지만 좋은 변화다. 사람 개발자도 작업 과정을 설명하지 못하면 리뷰가 어려운데, 에이전트라고 다를 이유가 없다. 오히려 에이전트는 작업 속도가 빠르기 때문에 과정 로그가 더 중요하다. 결과 diff만 보면 그럴듯해도, 실제로는 테스트를 안 돌렸거나 오래된 문서를 보고 고쳤을 수 있다.

내 기준으로는 이제 팀의 AI 코딩 도입 체크리스트가 이렇게 바뀐다. 모델 이름보다 먼저 루프를 본다. 루프보다 먼저 멈춤 기준을 본다. 멈춤 기준보다 먼저 증빙 로그를 본다. 이 세 개가 없으면 “우리도 AI 코딩 씁니다”는 말이 운영으로 이어지기 어렵다.

### 작은 루프부터 시작하는 게 맞다

다만 여기서 또 과하게 갈 필요는 없다. 모든 작업을 거대한 자율 에이전트로 만들면 금방 지친다. 처음에는 작은 루프가 낫다. 예를 들어 “테스트 실패 하나를 고치되, 같은 실패가 두 번 반복되면 중단” 같은 식이다. 또는 “문서 링크를 점검하고 404만 PR로 올리기” 같은 작업도 좋다.

작은 루프에서 중요한 건 성공 경험보다 실패 로그다. 어디서 에이전트가 헷갈렸는지, 어떤 정지 조건이 필요했는지, 어떤 지침을 스킬로 빼야 하는지 보인다. 이걸 쌓아야 더 큰 goal-based 루프로 갈 수 있다.

그래서 이번 루프 엔지니어링 흐름은 꽤 실전적이다. 프롬프트를 잘 쓰자는 이야기를 넘어서, 에이전트를 반복 가능한 작업 단위로 만들자는 쪽이다. 개발팀 입장에서는 모델 성능 발표보다 덜 화려하지만, 실제 생산성은 이런 데서 갈린다. 자동화는 한 번 멋지게 움직이는 순간이 아니라, 실패해도 안전하게 멈추고 다시 이어갈 수 있을 때 비로소 팀 자산이 된다.
