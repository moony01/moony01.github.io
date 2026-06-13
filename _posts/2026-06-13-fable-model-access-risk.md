---
layout: post
title: "Fable 5 차단이 보여준 AI 모델 의존 리스크"
description: "Anthropic Fable 5 접근 중단을 계기로 AI 모델 의존, fallback, 데이터 보존, 운영 리스크를 개발팀 관점에서 정리했다."
date: 2026-06-13 14:12:00 +0900
categories: [ai]
tags: [Fable5, Anthropic, AI운영, 모델리스크]
image: fable-model-access-risk/fable-model-access-risk-1.webp
lang: ko
published: true
---

Fable 5와 Mythos 5 접근 중단 소식을 보면서 제일 먼저 든 생각은 "이제 AI 모델도 클라우드 리전처럼 봐야겠구나"였다. 모델 성능이 좋아졌다는 얘기는 많이 했지만, 그 모델이 어느 날 정책·규제·보안 이슈로 갑자기 빠질 수 있다는 얘기는 상대적으로 덜 했다.

[Anthropic은 6월 12일 미국 정부의 지시로 Fable 5와 Mythos 5 접근을 중단한다고 밝혔다](https://www.anthropic.com/news/fable-mythos-access). 같은 날 [CNBC도 Anthropic이 정부 지시에 따라 두 모델 접근을 비활성화했다고 보도했다](https://www.cnbc.com/amp/2026/06/12/anthropic-disables-access-to-fable-5-and-mythos-5-to-comply-with-government-directive.html). 공식 설명에 따르면 미국 정부는 국가안보 권한을 근거로 외국 국적자의 접근을 중단하라고 지시했고, Anthropic은 규정 준수를 위해 고객 전체에서 두 모델을 급히 비활성화해야 한다고 설명했다. 다른 Anthropic 모델 접근은 영향을 받지 않는다고도 덧붙였다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/fable-model-access-risk/fable-model-access-risk-1-400.webp 400w,
            /static/img/posts/fable-model-access-risk/fable-model-access-risk-1-800.webp 800w,
            /static/img/posts/fable-model-access-risk/fable-model-access-risk-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/fable-model-access-risk/fable-model-access-risk-1.webp"
    alt="Fable 5 차단 이후 AI 모델 라우팅과 대체 경로를 점검하는 운영 대시보드"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

이 이슈가 [Hacker News](https://news.ycombinator.com/item?id=48511072)와 [GeekNews](https://news.hada.io/topic?id=30446)에서 빠르게 올라온 것도 이해된다. 단순히 "어떤 모델이 잠깐 내려갔다"가 아니다. 개발팀이 코딩 에이전트, 보안 분석, 문서 작성, 고객 응대 자동화에 특정 frontier 모델을 붙여두기 시작한 시점에, 모델 접근성이 운영 리스크로 튀어나온 사건이다.

{% include pre-version.html %}

## 이번 차단은 모델 성능 뉴스가 아니라 운영 뉴스다

### 접근권은 기능 스펙의 일부가 됐다

[Anthropic의 Fable 5 출시 글](https://www.anthropic.com/news/claude-fable-5-mythos-5)을 보면 Fable 5는 Mythos-class 모델이고, 소프트웨어 엔지니어링·지식 작업·비전·과학 연구에서 강한 성능을 낸다고 설명된다. 동시에 사이버보안 오용 위험 때문에 일부 요청은 더 낮은 모델인 Claude Opus 4.8로 보내는 보수적 safeguard도 붙였다고 한다. Anthropic은 이 safeguard가 평균적으로 세션의 5% 미만에서 작동한다고 썼다.

이 문장들이 중요한 이유는 성능과 접근권이 이제 분리되지 않기 때문이다. 예전에는 모델 선택을 대충 "성능, 가격, 속도"로 비교했다. 그런데 Fable 5 사례를 보면 여기에 최소 네 가지가 더 붙는다. 누가 접근할 수 있는가. 어떤 국가·조직·계정에서 막힐 수 있는가. 어떤 요청이 다른 모델로 라우팅되는가. 그리고 문제가 생겼을 때 벤더가 얼마나 빨리 차단할 수 있는가.

운영자 입장에서는 이게 거의 클라우드 리전 리스크와 비슷하다. us-east-1 하나만 믿고 서비스를 짰다가 장애가 나면 전체가 흔들리는 것처럼, 특정 모델 하나만 전제로 에이전트 흐름을 짜면 모델 접근 중단 하나로 작업 큐가 멈춘다. 차이는 더 까다롭다. 클라우드 리전 장애는 보통 기술 장애로 설명되지만, 모델 차단은 정책·규제·안전성 판단·계정 조건이 섞인다.

### "다른 모델은 영향 없음"이 곧 안전하다는 뜻은 아니다

Anthropic은 이번 공지에서 다른 모델은 영향을 받지 않는다고 했다. 이건 당장 고객에게는 다행이다. 하지만 제품과 내부 운영을 설계하는 사람에게는 다른 질문이 남는다. Fable 5에 맞춰 만든 프롬프트, 평가 기준, 에이전트 루프, 결과 품질 기대치를 Opus 계열이나 다른 벤더 모델이 그대로 만족할 수 있을까.

모델 fallback은 API endpoint만 바꾼다고 끝나지 않는다. 같은 프롬프트도 모델마다 실패 방식이 다르다. 어떤 모델은 너무 조심스럽고, 어떤 모델은 도구 호출을 과하게 하고, 어떤 모델은 긴 작업에서 집중력이 떨어진다. 보안 분석이나 코드 변경처럼 실패 비용이 큰 작업이라면 더 그렇다. "비슷한 모델로 바꾸면 되지"라는 말은 실제 운영에서는 꽤 위험하다.

이전에 [AI 코딩 에이전트에는 하네스가 먼저 필요하다](/security/2026/06/08/ai-agent-harness-security.html)는 글에서 모델보다 작업장 설계가 먼저라고 썼다. 이번 건은 그 얘기를 더 넓혀준다. 하네스는 모델이 똑똑할 때만 필요한 게 아니다. 모델이 갑자기 바뀌거나 사라질 때도 필요한 장치다.

## AI 의존성은 package-lock처럼 기록해야 한다

### 모델 이름만 남기면 나중에 원인을 못 찾는다

개발팀은 npm 패키지 버전, Docker image digest, DB migration 번호는 꽤 열심히 남긴다. 그런데 AI 모델 의존성은 아직 느슨하게 관리하는 경우가 많다. 문서에는 "Claude 사용", "GPT 사용", "코딩 에이전트 사용" 정도만 적고 끝난다. 실제로는 모델명, 버전, 라우팅 정책, tool 권한, 데이터 보존 조건, fallback 우선순위까지 같이 남아야 한다.

특히 에이전트 워크플로우에서는 모델이 바뀌면 결과물이 바뀐다. 같은 이슈를 읽어도 계획이 달라지고, 같은 테스트 실패를 봐도 수정 위치가 달라진다. 그래서 나중에 장애나 품질 하락을 추적하려면 "이 작업은 어떤 모델로 돌았는가"가 로그에 있어야 한다. 단순한 디버깅 편의가 아니라 재현성 문제다.

이번 Fable 5 차단 같은 사건이 생기면 더 분명해진다. 어떤 자동화가 Fable 5에 묶여 있었는지, 어떤 작업은 Mythos 5 접근권을 전제로 설계됐는지, 어떤 계정은 외국 국적자 조건 때문에 영향을 받을 수 있는지 확인할 수 있어야 한다. 그렇지 않으면 모델 차단 공지를 보고 나서야 grep으로 프롬프트 파일과 환경변수를 뒤지는 상황이 된다.

### 데이터 보존 조건도 의존성이다

모델 의존성에서 자주 빠지는 게 데이터 보존 조건이다. Anthropic은 [Mythos-class 모델의 데이터 보존 안내](https://support.claude.com/en/articles/15425996-data-retention-practices-for-mythos-class-models)에서 해당 모델의 prompt와 output을 trust and safety 목적으로 30일 보존한다고 설명했다. 특히 zero data retention을 쓰던 조직, Claude Console workspace, Claude Code Enterprise, 클라우드 플랫폼 경유 사용 같은 경우에 영향을 줄 수 있다고 안내한다.

이건 성능보다 먼저 봐야 할 때가 있다. 고객 코드, 미공개 취약점, 계약서, 로그, 장애 원인 분석 같은 데이터를 모델에 넣는 팀이라면, 모델이 좋아졌다는 이유만으로 바로 올려타면 안 된다. 데이터가 어디에 얼마나 남는지, 어떤 계정·플랜·경유 경로에서 정책이 달라지는지 먼저 봐야 한다.

개인적으로는 여기서 AI 도입 문서가 더 실무적으로 바뀌어야 한다고 본다. "우리는 어떤 모델을 쓴다"가 아니라 "이 작업 분류에는 어떤 모델을 쓰고, 어떤 데이터는 넣지 않고, 어떤 조건에서는 fallback하고, 어떤 변경은 사람 승인을 요구한다"까지 적어야 한다. 재미없지만 이게 운영 문서다.

{% include pre-version.html %}

## fallback은 비용 최적화가 아니라 생존 장치다

### 모델 라우터를 가격표로만 만들면 안 된다

요즘 많은 팀이 모델 라우터를 만든다. 쉬운 요청은 싼 모델, 어려운 요청은 비싼 모델, 긴 컨텍스트는 long-context 모델, 코드 작업은 코딩 특화 모델로 보내는 식이다. 이 접근 자체는 맞다. 문제는 라우터를 비용 최적화 장치로만 보면 이번 같은 이벤트에 약해진다는 점이다.

모델 라우터에는 장애와 정책 차단을 위한 상태도 들어가야 한다. 예를 들면 특정 모델이 5xx를 내는지, rate limit이 걸렸는지, 계정 조건으로 접근이 막혔는지, 특정 국가나 조직 단위에서만 실패하는지, safeguard 때문에 하위 모델로 우회되는지 기록해야 한다. 실패 원인이 다르면 대응도 다르다.

또 fallback 결과는 자동으로 신뢰하면 안 된다. Fable 5로 돌리던 보안 분석을 다른 모델로 넘겼다면, 같은 품질 기준을 통과했는지 다시 봐야 한다. 에이전트가 만든 PR이라면 테스트를 더 강하게 돌리고, 취약점 분석이라면 사람이 샘플을 확인하고, 고객 응답이라면 위험한 문장을 더 엄격하게 필터링해야 한다. fallback은 "계속 굴러가게 하는 장치"이지 "동일 품질 보장"이 아니다.

### 강한 모델일수록 끊겼을 때 충격이 크다

강한 모델은 단순히 답변 품질만 높이지 않는다. 사람은 강한 모델을 믿고 더 큰 작업을 맡긴다. 긴 refactor, 복잡한 incident report, 여러 repo를 걸친 변경, 보안 분석, 자동 triage 같은 작업이 붙는다. 그래서 강한 모델이 끊기면 단순 채팅 불편보다 훨씬 큰 운영 공백이 생긴다.

이 지점에서 [Hacker News 토론](https://news.ycombinator.com/item?id=48511072)이 커진 것도 자연스럽다. 개발자들은 모델 접근 차단을 단순한 vendor issue가 아니라 "강한 LLM이 공공 인프라처럼 쓰이기 시작했을 때 누가 접근을 결정하는가"라는 문제로 받아들인다. 모든 댓글에 동의할 필요는 없지만, 관심의 크기 자체는 신호다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/fable-model-access-risk/fable-model-access-risk-2-400.webp 400w,
            /static/img/posts/fable-model-access-risk/fable-model-access-risk-2-800.webp 800w,
            /static/img/posts/fable-model-access-risk/fable-model-access-risk-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/fable-model-access-risk/fable-model-access-risk-2.webp"
    alt="AI 모델 의존 리스크를 줄이기 위한 벤더별 fallback 아키텍처"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 작은 팀이 지금 할 수 있는 점검

### 첫 번째는 모델 인벤토리다

거창한 AI 거버넌스부터 만들 필요는 없다. 작은 팀이면 먼저 모델 인벤토리부터 만들면 된다. 어떤 자동화가 어떤 모델을 쓰는지, API key는 어디에 있는지, 프롬프트는 어디에 저장되는지, 고객 데이터가 들어가는지, 실패하면 어떤 fallback이 있는지 적는다. 이걸 한 장으로 못 만들면 이미 위험하다.

나는 최소한 아래 항목은 있어야 한다고 본다.

| 항목 | 봐야 할 질문 |
|---|---|
| 모델 | 정확한 모델명과 버전, 벤더, 경유 플랫폼 |
| 작업 | 코드 작성, 리뷰, 보안 분석, 고객 응답, 문서화 중 무엇인가 |
| 데이터 | 고객 데이터, 비밀정보, 미공개 취약점, 로그가 들어가는가 |
| fallback | 모델 장애·차단 시 대체 모델과 품질 검증 절차가 있는가 |
| 권한 | 에이전트가 파일, Git, 배포, 이슈 트래커를 어디까지 건드리는가 |

이 표는 예쁘게 만드는 게 목적이 아니다. 장애가 났을 때 10분 안에 "무엇이 멈췄는지" 알기 위한 지도다.

### 두 번째는 모델 교체 리허설이다

클라우드 장애 대응에서는 failover drill을 한다. AI 모델도 비슷하게 해야 한다. 한 달에 한 번까지는 아니어도, 핵심 자동화 하나 정도는 의도적으로 다른 모델로 돌려봐야 한다. 결과 품질이 얼마나 떨어지는지, 프롬프트가 깨지는지, 비용이 얼마나 늘어나는지, 사람이 검토해야 할 지점이 어디인지 기록해두면 좋다.

여기서 중요한 건 "대체 모델도 돌아간다"가 아니다. "대체 모델로 돌렸을 때 어느 단계에서 사람 확인이 늘어나는가"다. 예를 들어 단순 요약은 바로 fallback해도 되지만, 보안 패치 제안은 reviewer gate를 추가해야 할 수 있다. 고객사 데이터가 포함된 작업은 아예 fallback을 막아야 할 수도 있다.

### 세 번째는 모델 공지를 incident처럼 읽는 습관이다

AI 벤더의 공지는 이제 제품 뉴스만이 아니다. 데이터 보존 정책 변경, 특정 모델의 접근 조건, safety routing, rate limit, 정부·규제 관련 공지는 운영 공지로 읽어야 한다. 특히 Claude Code, Codex, Copilot CLI처럼 실제 repo와 터미널에 붙는 도구는 더 그렇다.

[GitHub가 Copilot CLI의 delegation을 더 선택적으로 만들었다고 설명한 글](https://github.blog/ai-and-ml/how-we-made-github-copilot-cli-more-selective-about-delegation/)도 같은 맥락에서 볼 수 있다. 에이전트가 똑똑해질수록 중요한 건 무조건 더 많이 시키는 게 아니라, 언제 직접 처리하고 언제 위임하고 언제 멈출지다. 모델 접근 중단은 이 판단을 더 노골적으로 요구한다.

## 그래서 운영 기준은 단순해진다

Fable 5 차단을 보고 "Anthropic이 곤란해졌네" 정도로만 보면 아깝다. 이건 AI 모델이 개발팀 운영 경계 안으로 들어왔다는 신호다. 모델은 이제 라이브러리이면서 API이고, 클라우드 리전이면서 정책 의존성이다.

앞으로 더 강한 모델이 나오면 이런 일이 줄어들까. 나는 반대라고 본다. 모델이 강해질수록 안전성, 수출통제, 데이터 보존, 접근권, 정부 정책, 기업 고객 조건이 더 많이 붙을 가능성이 크다. 그러면 개발팀은 "가장 똑똑한 모델"만 고르는 방식에서 벗어나야 한다.

좋은 AI 운영은 최신 모델을 제일 빨리 붙이는 게 아니다. 어떤 작업에 어떤 모델을 쓰는지 알고, 끊겼을 때 어디까지 버틸 수 있는지 알고, 민감한 데이터와 권한을 어디서 막을지 정해두는 것이다. 재미없는 얘기지만, 이제 이게 AI 생산성의 실제 바닥이다.

오늘 바로 할 수 있는 건 작다. 우리 자동화가 쓰는 모델 목록을 적고, fallback 경로를 하나 정하고, 모델이 바뀌었을 때 반드시 다시 검증해야 하는 작업을 표시하는 것. 이 정도만 해도 다음 모델 차단 뉴스가 나왔을 때 허둥대는 시간은 꽤 줄어든다.
