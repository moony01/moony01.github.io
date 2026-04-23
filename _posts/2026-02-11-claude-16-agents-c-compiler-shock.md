---
layout: post
title: "Claude 16마리가 C 컴파일러를 만들었다 — 10만 줄, 2주, 인간 개입 거의 없음"
description: "16개의 Claude AI 에이전트가 2주 만에 10만 줄의 Rust 코드로 C 컴파일러를 만들었습니다. $20,000의 비용으로 리눅스 커널까지 컴파일하는 이 프로젝트가 개발자에게 의미하는 것은?"
date: 2026-02-11 11:00:00 +0900
categories: [ai]
tags: [claude, ai-agent, compiler, rust, anthropic, agentic-coding, multi-agent]
image: claude-16-agents-c-compiler-shock/claude-16-agents-c-compiler-shock-1.webp
published: true
---

"16개의 AI 에이전트가 협력해서 C 컴파일러를 처음부터 끝까지 만들었다."

이 문장을 처음 봤을 때 솔직히 믿지 않았습니다. 컴파일러는 컴퓨터 과학에서 가장 복잡한 소프트웨어 중 하나입니다. 렉싱, 파싱, 타입 체킹, 코드 생성, 최적화 — 각 단계가 수십 년간 축적된 이론과 엔지니어링의 결정체죠. 그런데 AI가? 그것도 16마리가 **팀으로**? 리눅스 커널까지 컴파일한다고?

그런데 이건 실화입니다. Anthropic 연구원 Nicholas Carlini가 Claude Opus 4.6을 사용해서 실제로 해냈고, Ars Technica, The Register, Anthropic 공식 블로그까지 앞다퉈 보도했습니다. 2,000번의 Claude Code 세션, **$20,000(약 2,900만 원)**의 API 비용, 그리고 2주라는 시간. 결과물은 **10만 줄의 Rust 코드**로 작성된, 리눅스 6.9를 x86·ARM·RISC-V에서 빌드할 수 있는 완전한 C 컴파일러였습니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-16-agents-c-compiler-shock/claude-16-agents-c-compiler-shock-1-400.webp 400w,
            /static/img/posts/claude-16-agents-c-compiler-shock/claude-16-agents-c-compiler-shock-1-800.webp 800w,
            /static/img/posts/claude-16-agents-c-compiler-shock/claude-16-agents-c-compiler-shock-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-16-agents-c-compiler-shock/claude-16-agents-c-compiler-shock-1.webp" 
    alt="16개의 Claude AI 에이전트가 협력해 C 컴파일러를 만드는 모습" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

개발자로서 이 소식을 듣고 느낀 감정은 복잡했습니다. "대단하다"와 "무섭다" 사이 어딘가. 오늘은 이 프로젝트가 어떻게 가능했는지, 그리고 이것이 우리 개발자에게 의미하는 바를 깊이 파헤쳐 보겠습니다.
## 어떻게 가능했나 — 16마리의 역할 분담

Nicholas Carlini의 접근법은 단순하지만 기발했습니다. 하나의 AI에게 거대한 프로젝트를 맡기는 대신, **16개의 독립된 Claude Opus 4.6 인스턴스**를 병렬로 실행했습니다. 각 에이전트는 Git 브랜치 위에서 자율적으로 작업하고, 커밋하고, 테스트를 실행합니다.

핵심은 **조율(orchestration)**이었습니다. 16마리가 동시에 같은 파일을 수정하면 충돌이 발생하겠죠? Carlini는 이를 해결하기 위해 몇 가지 천재적인 트릭을 사용했습니다:

```
[에이전트 1] → 렉서(Lexer) 개선        → git commit → 테스트
[에이전트 2] → 파서(Parser) 버그 수정    → git commit → 테스트
[에이전트 3] → x86 코드 생성기 작업     → git commit → 테스트
...
[에이전트 16] → RISC-V 백엔드 최적화    → git commit → 테스트
```

**첫 번째 트릭 — 시간 제한(Time-boxing)**. Claude는 시간 감각이 없습니다. 테스트가 실패하면 몇 시간이고 같은 접근법으로 반복 시도합니다. Carlini는 에이전트에게 시간 제한을 걸어서, 막히면 강제로 다른 작업으로 전환하게 했습니다.

**두 번째 트릭 — 빠른 모드(Fast Mode)**. 전체 테스트 스위트를 돌리면 너무 오래 걸립니다. Carlini는 테스트 케이스의 1~10%만 샘플링하는 빠른 모드를 만들었습니다. 에이전트는 빠르게 피드백을 받고, 최종 확인만 전체 테스트로 돌립니다.

**세 번째 트릭 — GCC 오라클(Oracle)**. 이게 가장 영리합니다. 16마리가 전부 같은 리눅스 커널 빌드 버그에 매달려서 서로 덮어쓰기를 할 때, Carlini는 GCC를 "정답지"로 사용했습니다. 커널 파일 대부분을 GCC로 컴파일하고, **랜덤으로 선택된 일부 파일만** Claude의 컴파일러로 컴파일합니다. 이렇게 하면 각 에이전트가 서로 다른 버그를 잡게 됩니다.




{% include pre-version.html %}

## 결과물의 수준 — 장난감이 아니다

"AI가 만든 코드"라고 하면 대충 돌아가는 프로토타입을 상상하기 쉽습니다. 하지만 이 컴파일러의 수준은 그런 편견을 완전히 부숩니다.

- **리눅스 커널 6.9** 컴파일 성공 (x86, ARM, RISC-V)
- **Doom** 컴파일 및 실행 성공
- GCC와의 호환성 테스트 통과
- 10만 줄의 **Rust** 코드 (C가 아닌 Rust로 작성된 것도 주목)

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-16-agents-c-compiler-shock/claude-16-agents-c-compiler-shock-2-400.webp 400w,
            /static/img/posts/claude-16-agents-c-compiler-shock/claude-16-agents-c-compiler-shock-2-800.webp 800w,
            /static/img/posts/claude-16-agents-c-compiler-shock/claude-16-agents-c-compiler-shock-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-16-agents-c-compiler-shock/claude-16-agents-c-compiler-shock-2.webp" 
    alt="컴파일러 아키텍처와 멀티 에이전트 워크플로우" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

The Register에 따르면 총 API 비용은 약 $20,000이었습니다. 한국 돈으로 약 2,900만 원. 시니어 컴파일러 엔지니어를 2주간 고용하는 비용보다 훨씬 저렴하고, 그 엔지니어 혼자서는 2주에 10만 줄을 작성하는 건 물리적으로 불가능합니다.

물론 한계도 있습니다. GCC나 Clang 수준의 최적화는 아직 못 합니다. 에지 케이스에서 실패하는 경우가 있고, 전체 C 표준을 100% 구현한 것은 아닙니다. 하지만 핵심은 — **2주 만에 "쓸 수 있는 수준"의 컴파일러가 나왔다**는 사실 자체입니다.
## $20,000의 의미 — 비싼가, 싼가

이 프로젝트의 비용을 어떻게 해석하느냐에 따라 관점이 완전히 갈립니다.

**"비싸다" 관점**: 아직은 실험 수준이다. $20,000짜리 컴파일러를 실무에 쓸 일은 없다. 같은 돈이면 기존 오픈소스 도구를 쓰는 게 낫다.

**"싸다" 관점**: 컴파일러 수준의 시스템 소프트웨어를 만들 수 있는 팀을 꾸리는 데 연간 수억 원이 든다. $20,000으로 프로토타입을 얻은 건 혁명적으로 저렴하다. 그리고 이 비용은 모델이 발전할수록 급격히 떨어질 것이다.

저는 후자에 더 기울고 있습니다. Carlini 본인도 "이렇게 일찍 가능할 줄 몰랐다"고 말했습니다. 2026년 초에 이 정도라면, 연말에는? 내년에는? 비용은 내려가고, 품질은 올라갑니다. 그 커브의 기울기가 무섭습니다.




{% include pre-version.html %}

## 개발자에게 이것이 의미하는 것

솔직히 말하겠습니다. 이 뉴스를 보고 "개발자 끝났다"고 생각하는 건 과잉 반응이고, "별거 아니다"고 무시하는 건 현실 부정입니다.

**바뀌는 것**: 보일러플레이트 코드 작성, 반복적인 구현 작업, 기존 패턴의 적용 — 이런 일은 점점 더 AI가 빠르고 싸게 해줄 겁니다. "코드를 많이 치는 능력"의 가치는 떨어집니다.

**바뀌지 않는 것**: 무엇을 만들지 결정하는 능력, 아키텍처를 설계하는 판단력, 에지 케이스를 예측하는 경험, 비즈니스 요구사항을 기술로 번역하는 통찰. 이건 Carlini가 이 프로젝트에서 정확히 한 일이기도 합니다 — AI가 코딩했지만, **어떻게 코딩하게 할지**를 설계한 건 인간입니다.

Carlini의 "GCC 오라클" 트릭을 생각해 보세요. 16마리가 같은 버그에 매달리는 문제를 해결하기 위해 GCC를 정답지로 사용하는 아이디어 — 이건 컴파일러와 빌드 시스템, 그리고 병렬 처리에 대한 깊은 이해 없이는 나올 수 없는 발상입니다.

결국 **"AI를 잘 다루는 개발자"**가 핵심 역량이 되는 시대가 오고 있습니다. 코드를 직접 치는 것보다, AI 에이전트 팀을 **오케스트레이션**하는 능력이 중요해지는 거죠. 이 프로젝트가 그 미래의 프리뷰입니다.

## 마치며

Nicholas Carlini는 블로그 포스트를 이렇게 마무리했습니다:

> "이 컴파일러를 만드는 것은 최근 가장 재미있는 경험이었지만, 2026년에 이게 가능할 줄은 정말 몰랐습니다."

저도 같은 심정입니다. "재미있다"와 "무섭다"가 공존하는 이 묘한 감정. 16마리의 Claude가 10만 줄의 코드를 쓰고, 리눅스 커널을 컴파일하는 컴파일러를 만든 세상에서 — 우리가 할 일은 두려워하는 게 아니라, 이 도구를 어떻게 쓸지 고민하는 것입니다.

컴파일러를 만드는 AI 시대에, 진짜 중요한 건 **"뭘 컴파일할지"**를 결정하는 인간의 판단입니다.

**참고 자료**:
- [Anthropic 공식 블로그 - Building a C compiler with a team of parallel Claudes](https://www.anthropic.com/engineering/building-c-compiler)
- [Ars Technica - Sixteen Claude AI agents working together created a new C compiler](https://arstechnica.com/ai/2026/02/sixteen-claude-ai-agents-working-together-created-a-new-c-compiler/)
- [The Register - Claude Opus 4.6 spends $20K trying to write a C compiler](https://www.theregister.com/2026/02/09/claude_opus_46_compiler/)
