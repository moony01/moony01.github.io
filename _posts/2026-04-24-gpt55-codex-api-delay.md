---
layout: post
title: "GPT 5 5 출시 직후 개발자들이 당황한 이유"
description: "GPT 5 5가 2026년 4월 23일 ChatGPT와 Codex에 먼저 풀렸다. API 지연과 새 가격표가 개발자 워크플로우를 어떻게 흔드는지 짚었다."
date: 2026-04-24 12:04:04 +0900
categories: [ai]
tags: [OpenAI, GPT55, Codex, API, Agents]
image: gpt55-codex-api-delay/gpt55-codex-api-delay-1.webp
published: true
---

GPT 5 5 발표를 보고 처음 든 생각은 성능보다 배포 방식이 더 세게 남는다는 거였다. 2026년 4월 23일 OpenAI는 GPT 5 5를 내놓으면서 코딩, 컴퓨터 사용, 지식 작업에서 더 오래 버티고 더 적은 토큰으로 끝까지 간다고 밀었다. 숫자도 나쁘지 않다. 공식 발표 기준으로 Terminal Bench 2 0은 82점대, SWE Bench Pro는 58점대까지 올라왔다. 문제는 여기서 끝이 아니라는 거다. ChatGPT와 Codex에는 바로 넣어놓고, 정작 API는 오늘 안 푼다고 못을 박았다.

이게 왜 묘하게 사람을 당황하게 하냐면, 지금 실무팀은 대부분 API 중심으로 자동화를 짜고 있기 때문이다. 웹에서 한번 써보고 감탄하는 단계는 이미 지났고, Slack 에이전트 붙이고, CI에 연결하고, 사내 툴에서 장기 작업 돌리는 팀이 많다. 그런데 가장 핫한 모델이 나왔는데도 정식 API는 대기라면, 좋은 모델이 나왔다는 소식이 곧바로 생산성 향상으로 이어지지 않는다. 어제 쓴 [Android CLI가 바꾼 에이전트 개발](/ai/2026/04/23/android-cli-agent-workflow.html)에서도 비슷한 얘기를 했는데, 이제 싸움은 모델 점수보다 누가 더 빨리 실무 경로에 꽂히느냐로 가는 중이다.

{% include pre-version.html %}

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/gpt55-codex-api-delay/gpt55-codex-api-delay-1-400.webp 400w,
            /static/img/posts/gpt55-codex-api-delay/gpt55-codex-api-delay-1-800.webp 800w,
            /static/img/posts/gpt55-codex-api-delay/gpt55-codex-api-delay-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/gpt55-codex-api-delay/gpt55-codex-api-delay-1.webp"
    alt="GPT 5 5와 Codex 롤아웃 장면"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 왜 다들 GPT 5 5 얘기부터 꺼냈나

### 출시 타이밍이 너무 빠르다

Fortune 보도를 보면 GPT 5 4 공개 후 불과 6주 만에 GPT 5 5가 나왔다. 이런 속도는 그냥 업그레이드가 아니라 전선 유지에 가깝다. 지금 프론티어 모델 경쟁은 벤치마크 한두 개 이기는 문제가 아니라, 기업 고객이 "이번 분기에는 누구한테 붙을까"를 결정하는 판이다. 하루만 늦어도 다음 실험 슬롯을 다른 모델이 먹는다.

GeekNews도 바로 이 포인트를 물었다. 한국 개발자 커뮤니티에서 GPT 5 5가 "실제 업무를 위한 새로운 차원의 지능"이라는 제목으로 바로 올라왔고, 요약도 거의 똑같다. 코딩, 컴퓨터 사용, 다단계 작업 수행. 결국 사람들이 반응한 건 "더 똑똑해졌다"보다 "이제 진짜 일을 끝까지 가져가려는 모델이 또 나왔네" 쪽이다.

### 숫자보다 메시지가 더 공격적이다

OpenAI 공식 발표문을 보면 문장이 꽤 노골적이다. GPT 5 5는 사용자의 의도를 더 빨리 이해하고, 도구를 쓰고, 확인하고, 여러 툴을 넘나들며 작업을 끝낸다고 말한다. 이건 챗봇 소개 문구가 아니라 에이전트 운영체제 소개 문구에 가깝다.

특히 Codex 쪽 설명이 눈에 남는다. 같은 작업을 더 적은 토큰으로 끝내고, 더 오래 맥락을 잡고, 애매한 실패를 더 잘 추적한다고 한다. 솔직히 개발자가 듣고 싶은 문장은 거의 다 들어 있다. 그래서 더 당황스럽다. 이렇게까지 실무형 메시지를 던졌는데 API는 아직 없다는 사실이 바로 다음 줄에 나오니까.

## 개발자들이 당황한 지점은 성능이 아니라 경로다

### ChatGPT와 Codex는 열렸는데 API는 닫혀 있다

OpenAI 도움말은 더 분명하다. GPT 5 5는 2026년 4월 23일부터 Plus, Pro, Business, Enterprise 사용자의 ChatGPT와 Codex에 점진 배포 중이지만, API는 오늘 출시하지 않는다고 적혀 있다. 이유는 안전장치와 대규모 제공 조건이 다르기 때문이라고 설명한다. 틀린 말은 아니다. 그런데 실무자는 여기서 바로 계산기를 두드리게 된다. "그러면 우리 자동화 파이프라인에는 언제 들어가는데"가 첫 질문이 된다.

이 간극은 꽤 크다. ChatGPT 안에서 쓰는 모델은 감탄을 만들고, API로 쓰는 모델은 업무를 만든다. 둘이 같은 날 안 열리면 결국 팀은 두 개의 의사결정을 해야 한다. 사람 손이 닿는 탐색 작업만 먼저 GPT 5 5로 옮길지, 아니면 API가 열릴 때까지 기존 모델로 버틸지. 이게 생각보다 귀찮다.

### 가격표도 같이 나와서 더 현실적이다

Codex 새 요금표를 보면 GPT 5 5는 입력 1M 토큰당 125 credits, cached input 12점대, 출력 750 credits다. GPT 5 4 대비 딱 두 배다. OpenAI는 더 적은 토큰으로 더 좋은 결과를 낸다고 말하지만, 팀 입장에서는 "정말 두 배 값어치를 하냐"를 바로 따질 수밖에 없다.

| 항목 | GPT 5 5 | GPT 5 4 |
| --- | --- | --- |
| 입력 1M 토큰 | 125 credits | 62.50 credits |
| 캐시 입력 1M 토큰 | 12.50 credits | 6.250 credits |
| 출력 1M 토큰 | 750 credits | 375 credits |

여기서 포인트는 비싸다는 사실 자체보다, 이제 모델 비교가 감성 영역이 아니라 운영비 영역으로 넘어갔다는 점이다. "더 좋다더라"로는 안 되고, 장기 작업 재시도 횟수가 얼마나 줄었는지, 코드 리뷰 수정 라운드가 얼마나 줄었는지로 바로 계산된다.

{% include pre-version.html %}

## Codex에서는 벌써 현실 문제가 튀어나왔다

### 롤아웃 첫날부터 접근 이슈가 있었다

OpenAI 상태 페이지를 보면 4월 23일 Codex에서 GPT 5 5 사용 중 `not found` 오류가 간헐적으로 발생했다. 나중에 해결되긴 했지만, 출시 첫날부터 "업데이트했는데 왜 안 보이지"가 실제 이슈였다는 뜻이다. 이건 모델 품질과 별개로 운영 신뢰도 문제다.

내가 보기엔 이 부분이 더 중요하다. 장기 작업형 모델은 한 번 들어오면 진짜 팀 습관을 바꾼다. 그런데 첫 접점에서 접근 에러가 튀면 사람들은 모델 자체보다 롤아웃 품질을 기억한다. 요즘 에이전트 툴들은 성능 수치보다 "내 작업을 중간에 끊지 않느냐"가 더 큰 평가 기준이라서 그렇다.

### 코덱스에서 먼저 체감할 팀은 따로 있다

반대로 생각하면 GPT 5 5 혜택을 제일 빨리 보는 팀도 명확하다. 이미 Codex를 팀 워크플로우에 넣어둔 곳이다. 구현 초안, 리팩터링, 테스트 보강, 로그 분석 같은 일을 ChatGPT 구독 기반으로 굴리는 팀은 API를 기다리지 않아도 바로 체감할 수 있다. OpenAI 공식 문서가 계속 Codex를 앞세우는 이유도 이쪽이 당장 반응하는 시장이기 때문일 거다.

이거 한번 확인해보면 감이 온다.

```bash
npm i -g @openai/codex@latest
codex --model gpt-5.5
```

다만 첫날처럼 롤아웃 지연이 걸려 있으면 바로 안 뜰 수 있다. 그래서 지금은 "명령어가 되느냐"보다 "우리 플랜과 워크스페이스에서 실제로 열렸느냐"를 먼저 보는 게 맞다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/gpt55-codex-api-delay/gpt55-codex-api-delay-2-400.webp 400w,
            /static/img/posts/gpt55-codex-api-delay/gpt55-codex-api-delay-2-800.webp 800w,
            /static/img/posts/gpt55-codex-api-delay/gpt55-codex-api-delay-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/gpt55-codex-api-delay/gpt55-codex-api-delay-2.webp"
    alt="GPT 5 5 API 지연과 가격 비교"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 지금 바로 갈아탈 팀과 아닌 팀

### 바로 써볼 만한 팀

Codex 중심으로 이미 일하고 있고, 사람이 끝까지 감시하지 않아도 되는 긴 작업을 자주 던지는 팀이라면 바로 테스트할 만하다. OpenAI가 강조한 변화가 정확히 이 구간에 걸려 있다. 더 오래 붙들고, 더 적은 토큰으로, 주변 코드까지 챙기면서 간다는 약속이 사실이면 여기서 가장 먼저 돈 값을 한다.

또 하나는 리서치와 문서 작업이 많은 팀이다. 공식 발표문에서도 GPT 5 5를 코딩 모델로만 밀지 않고 문서, 스프레드시트, 보고서, 지식 작업 쪽으로도 넓게 설명했다. 그러면 개발팀 안에서도 엔지니어링 매니저나 PM, 데이터 분석 쪽이 먼저 만족할 가능성이 있다.

### 조금 더 기다리는 게 맞는 팀

반대로 API로 자동화된 사내 도구를 이미 많이 돌리고 있다면 지금은 관망이 맞다. 결국 중요한 건 데모가 아니라 연결 지점이다. API가 아직 없는데 억지로 ChatGPT나 Codex 구독 경로만으로 우회하면, 운영 권한과 감사 로그와 비용 정산에서 다시 꼬인다.

그래서 나는 지금 GPT 5 5를 이렇게 본다. 성능 발표는 성공했다. 화제성도 충분하다. 그런데 개발자들이 진짜 당황한 이유는 모델이 너무 좋아 보여서가 아니라, 실무에 넣는 주 통로가 아직 완전히 열리지 않았기 때문이다. 어제까지는 "다음 모델 언제 나오지"였다면, 오늘부터는 "좋아 근데 우리 파이프라인에는 언제 꽂히지"가 더 중요한 질문이 됐다.
