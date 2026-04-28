---
layout: post
title: "GitHub Copilot AI 크레딧 함정 시작됐다"
description: "GitHub Copilot 사용량 기반 과금이 2026년 6월 1일부터 시작된다. AI Credits, Actions minutes, 연간 multiplier 충격을 개발자 기준으로 짚었다."
date: 2026-04-28 12:03:40 +0900
categories: [github]
tags: [GitHub, Copilot, AICredits, Billing, Actions]
image: copilot-ai-credits-trap/copilot-ai-credits-trap-1.webp
published: true
---

어제 GitHub 블로그를 보고 제일 먼저 든 생각은 이거였다. 이제 Copilot도 결국 API처럼 돈을 세기 시작했구나. 2026년 4월 27일 GitHub는 Copilot 전 요금제를 6월 1일부터 사용량 기반 과금으로 바꾼다고 공식 발표했다. 이름도 딱 직설적이다. `Premium Request` 대신 `GitHub AI Credits`. 듣기엔 부드러운데, 읽어보면 사실상 정액제 감각이 무너지는 얘기에 더 가깝다.

더 묘한 건 가격표를 안 올렸다는 점이다. Pro는 월 10달러, Pro+는 월 39달러 그대로라고 한다. 여기까지만 보면 "그냥 계산 단위만 바뀌네" 싶다. 근데 한 줄만 더 내려가면 분위기가 달라진다. 입력 토큰, 출력 토큰, 캐시 토큰까지 다 세고, code review는 AI Credits 말고 GitHub Actions minutes도 같이 먹는다. 월정액이라고 믿고 길게 에이전트 세션 돌리던 사람 입장에서는 갑자기 바닥이 보이는 구조다.

나는 이 공지를 보자마자 예전에 썼던 [GitHub Actions에 AI 에이전트 집어넣었더니 CI CD가 통째로 뒤집어졌다](/infra/2026/02/21/github-agentic-workflows.html) 글이 다시 떠올랐다. GitHub가 계속 밀어온 방향이 에이전트 자동화였잖아. 그 흐름이 커질수록 결국 비용 모델도 요청 횟수보다 연산량 쪽으로 갈 수밖에 없었겠지. 문제는 그 전환 시점이 생각보다 훨씬 빨리 왔다는 거다.

{% include pre-version.html %}

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/copilot-ai-credits-trap/copilot-ai-credits-trap-1-400.webp 400w,
            /static/img/posts/copilot-ai-credits-trap/copilot-ai-credits-trap-1-800.webp 800w,
            /static/img/posts/copilot-ai-credits-trap/copilot-ai-credits-trap-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/copilot-ai-credits-trap/copilot-ai-credits-trap-1.webp"
    alt="Copilot AI 크레딧 대시보드"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 왜 다들 정액제가 끝났다고 받아들이나

### 6월 1일부터 계산법 자체가 바뀐다

GitHub 공식 글은 꽤 노골적이다. 2026년 6월 1일부터 모든 Copilot 플랜은 `GitHub AI Credits`를 기본 단위로 쓰고, 사용량은 토큰 소비량으로 계산된다. 입력, 출력, 캐시 토큰까지 전부 포함이다. 지금까지는 프리미엄 요청 몇 번 썼는지 정도로 감각을 잡을 수 있었는데, 이제는 세션 길이와 컨텍스트 크기까지 요금과 바로 연결된다.

여기서 진짜 중요한 문장은 "Copilot is not the same product it was a year ago"였다. GitHub 스스로 Copilot을 에디터 안의 보조 도구가 아니라, 긴 다단계 작업을 처리하는 agentic platform으로 규정했다. 한마디로 autocomplete 가격표로는 이제 못 버틴다고 선언한 셈이다.

| 항목 | 지금까지 느낌 | 6월 1일 이후 느낌 |
| --- | --- | --- |
| 과금 기준 | 요청 수 중심 | 토큰 사용량 중심 |
| 무거운 세션 | 체감상 비슷함 | 길수록 바로 비싸짐 |
| 크레딧 소진 후 | 저가 모델 fallback 가능 | fallback 제거 |
| 코드 리뷰 | Copilot 기능 정도로 인식 | AI Credits + Actions minutes |

### 가격은 그대로인데 포함량 감각은 달라진다

이 부분이 사람을 제일 거슬리게 만든다. GitHub는 Pro는 월 10달러, Pro+는 월 39달러 그대로라고 말한다. 동시에 포함량도 각각 10달러, 39달러 상당의 AI Credits라고 적어둔다. 그러면 당연히 이런 반응이 나온다. "그냥 구독료만큼 선불 크레딧 주는 거면, 내가 구독에서 얻는 추가 이득이 뭐지?"

Visual Studio Magazine이 바로 이 반응을 집어서 "같은 값을 내고 덜 받게 될 수 있다"는 식으로 정리했고, Reddit 쪽은 더 직설적이었다. expiring API credits 같다는 말까지 나왔다. 좀 거칠지만 이해는 간다. 특히 여러 모델을 섞어 쓰고, 하루에도 몇 번씩 긴 저장소 단위 에이전트 작업을 돌리는 사람은 체감 차이가 꽤 클 가능성이 높다.

## 진짜 아픈 지점은 code review 쪽이다

### fallback이 사라지면 멘탈 관리가 어려워진다

기존에는 PRU를 다 써도 낮은 등급 모델로 내려가 계속 버티는 fallback 경험이 있었다. 새 체계에서는 이게 사라진다. 남은 크레딧과 관리자 예산 제어에 따라 그냥 멈출 수 있다. 이 차이는 생각보다 크다. 사람은 "성능 조금 떨어져도 계속 쓸 수 있음"과 "여기서 세션 끊김"을 완전히 다르게 받아들인다.

에이전트 모드 많이 쓰는 사람일수록 더 그렇다. 한 번 긴 세션 들어가면 context를 다시 쌓는 비용도 같이 생기니까, 중간에 끊기는 순간 돈보다 흐름 손실이 더 아프다. Copilot이 스스로 장기 작업과 저장소 단위 반복을 밀어왔다는 점을 생각하면, 사용자 입장에서는 "이제 와서 그걸 미터링하네"라는 반응이 나오는 게 이상하지 않다.

### 코드 리뷰가 Actions minutes까지 먹는 건 꽤 매섭다

이번 공지에서 제일 눈에 들어온 부분은 여기였다. Copilot code review는 GitHub AI Credits만 먹는 게 아니라 GitHub Actions minutes도 같이 소모한다. 이건 회계상으로는 맞는 얘기일 수 있다. 실제 실행이 Actions 러너에서 돌 테니까. 근데 팀 입장에서는 청구 포인트가 하나 더 생긴다.

지난 몇 달 동안 GitHub는 Copilot coding agent, cloud agent, repository 단위 작업을 계속 밀어붙였다. 그러니 비용 모델이 에이전트 친화적으로 바뀌는 건 자연스러운 수순이다. 다만 현장에서는 "도대체 이 리뷰 한 번에 AI 비용이냐 CI 비용이냐"라는 질문이 바로 나온다. 둘 다라고 답해야 하는 순간, 예산 설명 난이도가 확 올라간다.

{% include pre-version.html %}

## 연간 구독자는 숫자 보고 바로 예민해질 수밖에 없다

### multiplier 표가 꽤 세게 바뀐다

GitHub 문서에서 연간 구독자용 multiplier 표를 보면 왜 분위기가 날카로운지 바로 이해된다. 예를 들어 Claude Opus 4.6은 3에서 27로, Claude Sonnet 4.6은 1에서 9로, GPT 5.4는 1에서 6으로 뛴다. 심지어 기존 0 계열이던 모델도 0.33이나 1로 올라오는 케이스가 있다.

| 모델 | 현재 multiplier | 6월 1일 이후 |
| --- | --- | --- |
| Claude Opus 4.6 | 3 | 27 |
| Claude Sonnet 4.6 | 1 | 9 |
| GPT 5.4 | 1 | 6 |
| GPT 4.1 | 0 | 1 |
| GPT 4o | 0 | 0.33 |

이 숫자를 보면 "구독료는 안 올랐습니다"라는 문장이 왜 공허하게 들리는지 알 수 있다. 표면 가격이 아니라, 같은 구독료로 무엇을 얼마나 오래 쓸 수 있느냐가 핵심인데 그 체감량이 확 줄어들 수 있으니까.

### 문제는 비싸진 것보다 예측이 어렵다는 점이다

사실 무조건 비싸졌다고 단정하긴 아직 이르다. GitHub가 5월 초에 billing preview와 CSV usage report를 열겠다고 했고, 개인 사용자는 4월 사용량 기준으로 usage-based 추정치를 볼 수 있다고 했다. 아주 가볍게 쓰는 사람은 오히려 별 차이 없을 수도 있다.

근데 실무팀은 평균 사용자보다 훨씬 무겁게 쓴다. 저장소 전체 검색하고, PR 리뷰 돌리고, Copilot CLI나 cloud agent까지 붙이는 순간 토큰 사용량이 튀기 쉽다. 그래서 이번 발표는 "얼마나 오르냐"보다 "예측 없이 운영하기 어려워진다" 쪽에서 더 크게 다가온다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/copilot-ai-credits-trap/copilot-ai-credits-trap-2-400.webp 400w,
            /static/img/posts/copilot-ai-credits-trap/copilot-ai-credits-trap-2-800.webp 800w,
            /static/img/posts/copilot-ai-credits-trap/copilot-ai-credits-trap-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/copilot-ai-credits-trap/copilot-ai-credits-trap-2.webp"
    alt="Copilot 코드리뷰 과금 흐름"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 지금 바로 손봐야 할 건 생각보다 단순하다

### 5월 preview bill부터 꼭 열어봐라

GitHub 문서에 따르면 5월 초부터 premium request analytics 페이지에서 preview bill을 볼 수 있고, 4월 사용량을 usage-based 기준으로 환산한 비교도 보여준다. 이거 안 보고 6월 맞으면 감으로만 운영하게 된다. 특히 팀 리드나 결제 담당자는 usage report CSV까지 받아서 누가 어떤 기능에서 비용을 태우는지 먼저 봐야 한다.

### 모델 기본값과 리뷰 자동화를 다시 나눠야 한다

내 기준으로는 여기서부터가 진짜 실무다. frontier 모델을 기본값으로 박아둔 팀, 코드 리뷰를 습관적으로 자동 실행하는 팀, 저장소 단위 에이전트 작업을 계속 켜놓는 팀은 전부 정책을 다시 써야 한다. 가벼운 질문은 가벼운 모델로 보내고, 코드 리뷰는 꼭 필요한 저장소에만 켜고, 에이전트 세션은 길이를 관리해야 한다.

```bash
# 6월 전에 팀에서 바로 확인할 것
# 1. Copilot code review 사용 저장소 목록
# 2. 자주 쓰는 모델의 multiplier 변화
# 3. 월간 세션 중 저장소 단위 작업 비율
# 4. preview bill CSV 검토 담당자 지정
```

Copilot이 이제 진짜 에이전트 플랫폼이 되려면, 사용자도 그냥 "좋은 모델 켜놓고 오래 쓰면 되지" 모드에서 빠져나와야 할 것 같다. 어제까진 생산성 도구였는데, 오늘부터는 비용 구조까지 같이 설계해야 하는 인프라처럼 보인다. 이게 이번 공지에서 가장 크게 남는 감정이었다. 정액제가 끝났다는 말이 과장처럼 들리지 않는 이유도 딱 거기에 있다.
