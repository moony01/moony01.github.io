---
layout: post
title: "VoidZero와 Cloudflare, JS 툴체인은 왜 인프라가 됐나"
description: "VoidZero가 Cloudflare에 합류하며 Vite와 Vitest, Rolldown, Oxc의 위치가 어떻게 바뀌는지 개발자 관점에서 정리했다."
date: 2026-06-05 14:12:00 +0900
categories: [javascript]
tags: [VoidZero, Cloudflare, Vite, 자바스크립트툴체인, 오픈소스]
image: voidzero-cloudflare-js-toolchain/voidzero-cloudflare-js-toolchain-1.png
lang: ko
published: true
---

VoidZero와 Cloudflare 소식을 보고 처음 든 생각은 "이제 JavaScript 툴체인도 진짜 인프라 취급을 받는구나"였다. 2026년 6월 4일 Cloudflare와 VoidZero는 동시에 [VoidZero가 Cloudflare에 합류한다](https://blog.cloudflare.com/voidzero-joins-cloudflare/)고 발표했다. 그냥 작은 개발 도구 회사 하나가 큰 회사에 들어간 뉴스처럼 보일 수도 있다. 그런데 이름을 하나씩 펼치면 느낌이 달라진다. Vite, Vitest, Rolldown, Oxc, Vite+. 요즘 프론트엔드 프로젝트를 만지는 사람에게는 이게 꽤 넓은 바닥이다.

Hacker News에서도 바로 반응이 컸다. 내가 확인한 시점에 `VoidZero Is Joining Cloudflare` 글은 프런트 페이지 상단에서 500점 후반대와 200개가 넘는 댓글을 모으고 있었다. 축하한다는 반응도 많았지만, 동시에 "또 핵심 오픈소스가 빅테크 안으로 들어갔다"는 불안도 같이 붙었다. 이 양쪽 반응이 둘 다 맞다고 본다. 좋은 소식이면서, 개발자가 앞으로 더 차갑게 봐야 할 신호이기도 하다.

{% include pre-version.html %}

![VoidZero Cloudflare 합류로 이어진 JavaScript 툴체인 흐름](/static/img/posts/voidzero-cloudflare-js-toolchain/voidzero-cloudflare-js-toolchain-1.png){: .wd100}

## 왜 이 뉴스가 그냥 회사 이동이 아닌가

### Vite는 이미 한 프레임워크의 도구가 아니다

Cloudflare 글에서 제일 중요한 문장은 Vite를 "shared foundation"으로 보는 부분이었다. Vite는 이제 Vue만의 빌드 도구가 아니다. SvelteKit, Nuxt, Astro, Solid, Qwik, Angular, React Router, TanStack Start 같은 프레임워크 흐름 안에 깊게 들어가 있다. Cloudflare는 Next.js 쪽에서도 Vite 기반 구현인 vinext를 언급했다.

이 말은 개발자가 평소에 체감하는 것과도 맞다. 새 프로젝트를 만들 때 Vite가 기본값처럼 나오고, 테스트는 Vitest를 붙이고, 더 빠른 번들러나 parser 이야기를 할 때 Rolldown과 Oxc가 나온다. 예전에는 bundler 선택이 팀 취향에 가까웠다면, 지금은 로컬 개발 속도, CI 시간, framework adapter, edge deploy까지 이어지는 결정이 됐다. 빌드 도구가 느리면 그냥 빌드만 느린 게 아니라, 에이전트가 반복 실행하는 루프까지 같이 느려진다.

이전에 [AI 코드 지식 그래프 글](/ai/2026/05/27/ai-code-knowledge-graph.html)에서 개발 도구의 다음 승부는 모델 하나보다 워크플로우 안에 얼마나 자연스럽게 들어오느냐라고 썼다. 이번 일도 같은 축에 있다. Vite 스택은 사람이 쓰는 도구이면서, 동시에 AI coding agent가 계속 건드리는 실행 환경이 되고 있다.

### Cloudflare가 원하는 건 배포 앞단만이 아니다

Cloudflare는 원래 네트워크, CDN, Workers, Pages 같은 실행 인프라 이미지가 강했다. 그런데 최근 흐름을 보면 프레임워크와 개발 도구 쪽으로 훨씬 더 깊게 들어오고 있다. Astro 팀이 Cloudflare에 합류한 것도 같은 방향이었다. 이번에는 Vite 생태계의 중심에 있는 VoidZero까지 들어왔다.

이걸 단순히 "Cloudflare가 프론트엔드 개발자를 더 많이 데려오려 한다" 정도로 보면 조금 약하다. 더 정확히는 애플리케이션이 만들어지는 순간부터 배포되고 관측되는 순간까지 한 줄로 묶으려는 움직임에 가깝다. 개발자는 로컬에서 `dev`를 돌리고, 테스트를 돌리고, 빌드하고, preview deploy를 보고, edge runtime 차이를 고친다. 이 경계가 점점 얇아지고 있다.

Cloudflare가 Vite를 중요하게 보는 이유도 여기다. Vite가 중립적인 개발 진입점이면, Cloudflare는 그 진입점 옆에 Workers와 Pages, workerd, plugin, agent harness를 붙일 수 있다. 사용자가 특정 vendor에 잠긴다고 느끼지 않게 하면서도, 자연스럽게 Cloudflare 쪽 경로가 제일 매끄러워지는 그림이다. 이건 제품 전략으로 꽤 세다.

## 오픈소스 중립성 약속은 필요하지만 충분하지 않다

### 공식 메시지는 꽤 명확하다

발표문들은 중립성 약속을 아주 앞에 세웠다. Cloudflare는 Vite, Vitest, Rolldown, Oxc, Vite+가 계속 open source, vendor-agnostic, community-driven으로 남는다고 썼다. VoidZero도 같은 메시지를 반복했다. [Vite 공식 블로그](https://vite.dev/blog/cloudflare-supports-vite)는 더 구체적으로 Vite가 MIT license를 유지하고, Vite team governance와 Open Collective funds가 계속 별도 구조로 운영된다고 설명했다.

여기까지는 좋은 신호다. 특히 Vite는 특정 회사의 제품 하나가 아니라 너무 많은 프레임워크의 바닥이라서, 중립성 이야기를 흐리게 할 수 없다. Cloudflare도 그걸 알고 있다. 그래서 100만 달러 규모의 Vite ecosystem fund까지 같이 내놨다. 말뿐인 후원이 아니라 유지보수자와 contributor에게 자원을 넣겠다는 제스처다.

다만 개발자는 약속을 문장 그대로만 믿으면 안 된다. 오픈소스 프로젝트의 방향은 라이선스만으로 정해지지 않는다. 누가 full-time으로 일하는지, 어떤 이슈가 우선순위가 되는지, 어떤 integration이 먼저 좋아지는지, 문서에서 어떤 배포 경로가 가장 자연스럽게 노출되는지로 체감이 갈린다. MIT license가 그대로여도, 실제 로드맵의 무게중심은 바뀔 수 있다.

### 커뮤니티가 불안해하는 이유도 현실적이다

HN 댓글에서 반복된 불안은 뻔하지만 무시하기 어렵다. "오픈소스 조직이 큰 회사에 들어가면 결국 독립성을 잃는 것 아니냐"는 이야기다. Bun, Astro, uv, 여러 개발 도구 회사 사례가 같이 언급됐다. 표현은 거칠어도 질문은 타당하다. 핵심 개발자가 한 회사의 급여를 받기 시작하면, 프로젝트가 아무리 중립을 말해도 사용자는 장기 방향을 다시 계산한다.

나는 이걸 무조건 나쁘다고 보지는 않는다. 솔직히 개발 도구 오픈소스는 돈 벌기가 어렵다. VoidZero의 Evan You도 [공식 글](https://voidzero.dev/posts/voidzero-cloudflare)에서 sponsorship 기반 모델만으로는 큰 unified toolchain을 만들기 어렵고, venture capital을 선택했던 이유와 monetization의 어려움을 설명했다. 빠른 parser, bundler, linter, formatter를 계속 만들려면 풀타임 팀이 필요하다. 그런데 사용자는 대부분 도구에 직접 돈을 내지 않는다.

그래서 선택지는 대체로 세 가지다. 느리게 간다. 유료 기능을 강하게 닫는다. 아니면 인프라 회사와 붙는다. VoidZero는 세 번째를 고른 셈이다. 이 선택이 틀렸다는 뜻은 아니다. 다만 사용자는 앞으로 Cloudflare integration이 좋아지는 속도와 다른 platform 경로가 유지되는 속도를 같이 봐야 한다.

{% include pre-version.html %}

## 개발자 워크플로우에서는 무엇이 달라질까

### 빠른 도구는 AI 에이전트 시대에 더 중요해진다

Cloudflare 글에서 흥미로웠던 대목은 AI agent loop였다. 사람은 테스트가 20초 걸려도 커피를 마시며 기다릴 수 있다. 그런데 에이전트는 lint, test, build를 계속 다시 돈다. 실패 로그를 읽고, 수정하고, 또 돌린다. 이 루프에서는 도구 속도가 곧 작업 가능성이다.

VoidZero 스택은 이 지점에 잘 맞는다. Oxc는 Rust 기반 JavaScript language toolchain이고, Rolldown은 빠른 bundler 방향을 잡고 있다. VoidZero는 Oxlint가 대형 프로젝트에서 ESLint plugin compatibility와 type-aware linting을 제공하면서 50~100배 빠른 linting을 목표로 했고, Oxfmt도 Prettier 호환성과 속도를 강조했다. 숫자는 프로젝트마다 다르게 체감되겠지만 방향은 분명하다. 개발 도구가 빨라질수록 자동화 루프가 더 촘촘해진다.

이건 Cloudflare 입장에서도 중요하다. Workers, Pages, preview, edge runtime을 쓰는 개발자는 로컬과 배포 환경의 차이를 계속 줄이고 싶어 한다. 빠른 Vite 기반 toolchain과 workerd 통합이 잘 맞으면, 프레임워크 개발자는 더 적은 설정으로 edge deploy를 테스트할 수 있다. 사람에게도 좋고, 에이전트에게도 좋다.

### 팀 입장에서는 vendor path를 의식해야 한다

그렇다고 당장 모든 프로젝트를 갈아엎을 필요는 없다. 오히려 이번 뉴스에서 팀이 할 일은 차분하다. 지금 Vite, Vitest, Cloudflare Pages, Workers를 이미 쓰고 있다면, 앞으로 official plugin과 문서가 더 좋아질 가능성이 크다. 이건 이득이다. 반대로 Vercel, Netlify, self-hosted, Kubernetes, 다른 edge platform을 같이 쓰는 팀이라면 vendor path가 얼마나 공평하게 유지되는지 봐야 한다.

내 기준으로는 세 가지를 체크한다.

```text
1. Vite plugin과 adapter가 특정 platform 전용 설정을 기본값으로 밀어 넣는가
2. 문서와 예제가 Cloudflare 외 배포 경로를 계속 같은 품질로 다루는가
3. core issue와 ecosystem issue의 우선순위가 한 회사 제품 로드맵에 과하게 끌려가는가
```

이 체크는 불신하자는 얘기가 아니다. 좋은 도구일수록 더 넓게 쓰이기 때문에, 중립성은 나중에 따지는 윤리 문제가 아니라 운영 리스크가 된다. 특히 사내 공통 템플릿, 디자인 시스템, monorepo build pipeline에 Vite가 들어가 있다면 더 그렇다. 빌드 도구는 바꾸기 쉽지 않다.

![Vite와 Rolldown이 Cloudflare 인프라와 만나는 구조](/static/img/posts/voidzero-cloudflare-js-toolchain/voidzero-cloudflare-js-toolchain-2.png){: .wd100}

## 나는 이걸 긍정적으로 보되 경계도 남겨둔다

### 오픈소스 유지에는 돈이 필요하다

개발자 커뮤니티는 종종 모순적이다. 핵심 도구는 무료로 빠르게 좋아지길 원하고, 동시에 회사가 들어오면 독립성을 걱정한다. 나도 똑같이 그런 마음이 있다. Vite 같은 도구는 너무 중요해서 특정 회사 색이 짙어지는 게 싫다. 하지만 그 중요도를 유지하려면 누군가는 풀타임으로 고쳐야 한다. 그 비용을 누가 내는지에 대한 답도 필요하다.

Cloudflare가 이번에 낸 메시지는 최소한 방향은 괜찮다. MIT, vendor-agnostic, community-driven, Vite ecosystem fund. 문제는 앞으로 6개월, 1년 동안 실제 행동이다. Vite core가 Cloudflare 제품의 부속품처럼 보이지 않게 운영되는지, 독립 maintainer가 계속 힘을 받는지, 다른 framework와 platform의 목소리가 로드맵에 남아 있는지가 중요하다.

### 이번 뉴스의 핵심은 툴체인의 지위 변화다

내가 이 뉴스를 블로그에 남기는 이유는 Cloudflare가 또 회사를 데려갔다는 사실 때문만은 아니다. 더 큰 변화는 JavaScript 툴체인이 이제 개발 편의 도구가 아니라 플랫폼 전략의 한복판에 들어갔다는 점이다. 예전에는 bundler, test runner, parser가 프로젝트 안쪽의 구현 세부사항처럼 보였다. 이제는 배포 회사가 직접 투자하고, 오픈소스 펀드를 만들고, agent workflow와 연결한다.

이 흐름은 앞으로 더 세질 것 같다. AI 코딩 에이전트가 많아질수록 빠른 lint, 빠른 test, 예측 가능한 build, platform-aware preview가 중요해진다. 그럼 툴체인은 editor plugin보다 더 아래, 거의 운영체제의 일부처럼 취급될 수 있다. Vite가 그 위치에 가까워졌고, Cloudflare는 그 위치를 놓치고 싶지 않은 것이다.

나는 당장 Vite를 덜 믿어야 한다고 생각하지 않는다. 오히려 더 좋아질 가능성이 크다. 다만 이제 Vite를 선택할 때 "빠르다"만 보면 부족하다. 누가 유지하는지, 어느 platform과 가장 잘 붙는지, 중립성 약속이 실제 issue와 release에서 어떻게 지켜지는지까지 같이 봐야 한다. 이번 VoidZero와 Cloudflare 합류는 그 기준선을 다시 올린 뉴스다.
