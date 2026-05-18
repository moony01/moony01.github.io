---
layout: post
title: "MiniMax M2.5 Claude보다 63배 싸다"
description: "오픈소스 MiniMax M2.5가 SWE-bench 80.2%로 Claude Opus 4.6에 필적하면서 가격은 63분의 1. AI API 비용 전쟁의 새 국면을 코드와 수치로 분석한다."
date: 2026-03-04 11:00:00 +0900
categories: [economy]
tags: [MiniMax, Claude, AI비용, 오픈소스AI, API가격]
image: minimax-m25-claude-price-war/minimax-m25-claude-price-war-1.webp
redirect_from:
  - /ai/2026/03/04/minimax-m25-claude-price-war.html
published: true
---

서울 강남구 어느 스타트업 사무실, 3월 첫째 주 월요일. CTO가 이메일을 열었다. Anthropic 청구서였다. 지난달 Claude API 사용료: $4,200.

"지난달보다 30% 늘었네."

옆에 앉은 개발자가 조심스럽게 말했다. "그런데 MiniMax M2.5 써보셨어요? 성능은 거의 비슷한데 비용이..."

"얼마나?"

"Claude Opus 기준으로 63분의 1입니다."

CTO는 청구서를 다시 봤다. $4,200. 63분의 1이면 $66이다.

{% include pre-version.html %}

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/minimax-m25-claude-price-war/minimax-m25-claude-price-war-1-400.webp 400w,
            /static/img/posts/minimax-m25-claude-price-war/minimax-m25-claude-price-war-1-800.webp 800w,
            /static/img/posts/minimax-m25-claude-price-war/minimax-m25-claude-price-war-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/minimax-m25-claude-price-war/minimax-m25-claude-price-war-1.webp" 
    alt="MiniMax M2.5와 Claude Opus 4.6 가격 성능 비교 분석 차트" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## MiniMax M2.5가 등장한 맥락

2026년 2월 11일, 중국 AI 스타트업 MiniMax가 M2.5를 오픈소스로 공개했다. Hugging Face에 modified MIT License로 올라왔고, 공개 직후 개발자 커뮤니티에서 빠르게 화제가 됐다. "Claude Sonnet 수준인데 무료로 로컬 실행 가능하다"는 반응이 HackerNews와 Reddit을 중심으로 퍼졌다.

MiniMax는 글로벌 인지도가 높은 회사는 아니다. 하지만 M2.5의 벤치마크 수치는 무시하기 어렵다.

아키텍처는 Mixture-of-Experts(MoE) 구조다. 전체 파라미터는 230B이지만, 실제 추론 시 활성화되는 건 10B다. 전체의 4%만 깨운다. 이 구조 덕분에 230B 규모의 모델임에도 추론 속도와 비용이 압도적으로 낮아진다.

훈련에는 자체 개발한 Forge RL 프레임워크와 CISPO(Clipped Importance Sampling Policy Optimization) 알고리즘을 썼다. 기존 PPO나 GRPO가 토큰 단위로 클리핑하던 것을, importance sampling weight 단위로 바꿔 저확률 토큰도 그래디언트에 기여하게 만들었다. "모델이 틀린 답에서도 배울 기회를 더 많이 준다"는 접근이다. 컨텍스트 윈도우는 200K 토큰이다.

이 모델이 SWE-bench Verified에서 80.2%를 기록하면서 분위기가 달라졌다.

## 0.6% 갭이 의미하는 것

SWE-bench Verified는 GitHub의 실제 이슈를 AI가 얼마나 해결하는지 측정하는 벤치마크다. 단순 수학이나 퀴즈가 아니라 현업 코드베이스의 실제 버그와 피처 요청을 넣고 성공률을 측정한다. 사실상 "실제 개발 업무 대리 성능"에 가장 가까운 지표다.

| 모델 | SWE-bench Verified | BrowseComp | 입력 가격 (1M 토큰) |
|---|---|---|---|
| Claude Opus 4.6 | 80.8% | - | $5.00 |
| **MiniMax M2.5** | **80.2%** | **76.3%** | **$0.30** |
| GPT-5.2 | 80.0% | - | $7.50 |
| Gemini 3 Pro | 78.0% | - | $3.50 |

Claude Opus 4.6과의 격차는 0.6%다. 현장에서 이 0.6%가 체감되는 경우는 드물다. 예외적으로 복잡한 레거시 리팩터링이나 대규모 아키텍처 설계에서는 Opus가 더 나은 판단을 내릴 수 있다. 하지만 일반적인 버그 수정, API 통합, 테스트 코드 작성 수준이라면 사실상 동일한 성능대다.

BrowseComp(웹 브라우징 기반 문제 해결)에서 76.3%를 기록했다는 점도 주목할 만하다. 에이전트 플로우에서도 실용적으로 쓸 수 있다는 신호다.

{% include pre-version.html %}

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/minimax-m25-claude-price-war/minimax-m25-claude-price-war-2-400.webp 400w,
            /static/img/posts/minimax-m25-claude-price-war/minimax-m25-claude-price-war-2-800.webp 800w,
            /static/img/posts/minimax-m25-claude-price-war/minimax-m25-claude-price-war-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/minimax-m25-claude-price-war/minimax-m25-claude-price-war-2.webp" 
    alt="오픈소스 AI 모델 API 비용 구조와 MiniMax M2.5 추론 아키텍처 비교 일러스트" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 진짜 충격은 가격이다

숫자를 직접 보자.

```text
Claude Opus 4.6
  입력: $5.00 / 1M 토큰
  출력: $25.00 / 1M 토큰

MiniMax M2.5 Standard
  입력: $0.30 / 1M 토큰   ← Opus의 1/16.7
  출력: $1.20 / 1M 토큰   ← Opus의 1/20.8

MiniMax M2.5 Lightning (처리 속도 2배)
  입력: $0.60 / 1M 토큰
  출력: $2.40 / 1M 토큰
```

입력 기준 16.7배, 출력 기준 20.8배 차이다. "63배"라는 수치는 특정 입출력 비율을 합산한 결과인데, 에이전트 워크플로우처럼 출력 토큰이 많을수록 체감 격차는 더 커진다.

구체적인 월간 비용을 파이썬으로 계산해보면 이렇다.

```python
# 시나리오: 일일 입력 1M 토큰 + 출력 2M 토큰 기준
claude_daily  = (1 * 5.00) + (2 * 25.00)   # $55.00 / 일
minimax_daily = (1 * 0.30) + (2 * 1.20)    # $2.70  / 일

monthly_claude  = claude_daily  * 30  # $1,650 / 월
monthly_minimax = minimax_daily * 30  # $81    / 월

saving = monthly_claude - monthly_minimax
print(f"월 절감액: ${saving:,.0f}")    # 월 절감액: $1,569
```

월 $1,569 절감이다. 스타트업 신입 개발자 월급에 가까운 금액이다.

MiniMax가 내세우는 "$1/hour" 마케팅 메시지도 이 구조에서 나온다. Lightning 버전 기준으로 초당 100토큰을 1시간 연속 실행하면 약 $1이 든다는 계산이다. Opus로 같은 작업을 돌리면 $25 이상이 나온다.

### 오픈소스라 자체 호스팅도 가능하다

MiniMax M2.5는 Hugging Face에 모델 가중치가 공개돼 있다. 온프렘 배포가 가능하다는 뜻이다. 다만 230B MoE 모델 기준으로 full precision 로딩에는 상당한 GPU 메모리가 필요하다. 10B만 활성화되더라도 KV 캐시와 배치 처리를 고려하면 A100 또는 H100 클러스터급이 현실적이다. 클라우드 GPU 비용과 MiniMax API 가격 중 어느 쪽이 유리한지는 규모에 따라 달라진다.

## 개발자가 따져봐야 할 것들

가격이 싸다고 무조건 갈아타는 건 섣부르다. 실제로 체크해야 할 요소들이 있다.

**레이턴시와 가용성**: M2.5 Standard는 50 tokens/sec, Lightning은 100 tokens/sec다. Claude Opus의 응답 일관성과 Anthropic의 엔터프라이즈 SLA는 훨씬 성숙한 수준이다. 트래픽 스파이크나 장애 상황에서 MiniMax API의 안정성은 검증 기간이 짧다.

**데이터 거버넌스**: 중국 회사의 API를 통해 민감한 코드베이스나 기업 데이터를 처리하는 것은 컴플라이언스 검토가 필요하다. 금융, 의료, 공공 분야는 특히 신중해야 한다. 오픈소스이므로 온프렘 배포로 우회는 가능하지만, 앞서 언급한 인프라 비용이 따른다.

**멀티모달 범위**: M2.5는 텍스트와 코드에 최적화돼 있다. 이미지 생성이나 실시간 음성 처리가 핵심 워크로드라면 다른 모델과의 조합을 검토해야 한다.

어떤 팀에 맞는지 요약하면 이렇다.

- **적합**: API 비용이 전체 인프라비의 상당 부분인 스타트업, 코드 리뷰·생성·테스트가 주 워크로드인 팀, 오픈소스 온프렘을 검토 중인 팀
- **신중해야 할 경우**: 엄격한 데이터 컴플라이언스 환경, 99.9% 이상 가용성이 필요한 프로덕션 크리티컬 시스템

## 63배 격차가 던지는 진짜 질문

이전에 다뤘던 [AI CAPEX 부담과 소프트웨어주 재평가](/economy/2026/02/25/anthropic-software-selloff.html)에서 빅테크들이 AI 인프라에 막대한 자본을 투입하고 있다는 걸 봤다. 역설적이게도 그 투자의 결과물 중 하나가 AI 추론 비용의 급격한 하락이다.

MiniMax M2.5 사례는 더 근본적인 질문을 던진다. "frontier 모델의 프리미엄이 앞으로도 정당화될 수 있는가?"

Claude Opus가 M2.5보다 0.6% 나은 SWE-bench 점수를 받는 데 63배의 가격이 붙는다. 이 프리미엄은 Anthropic의 Constitutional AI 안전성 연구, 엔터프라이즈 SLA, 지속적인 모델 개선에 대한 대가다. 많은 팀에게 그 가치는 실재한다.

하지만 비용에 민감한 팀이라면 이제 선택지가 생겼다. "비싸지만 어쩔 수 없이 Claude를 써야 한다"는 포지션이 흔들리고 있다. 오픈소스 진영이 frontier 성능의 문턱을 빠르게 낮추고 있고, MiniMax M2.5는 그 흐름을 가장 선명하게 보여준 사례다.

다음 실적 시즌에 체크할 것들:
- Anthropic, OpenAI의 API 가격 인하 대응 여부
- 엔터프라이즈 계약에서의 볼륨 디스카운트 확대 움직임
- MiniMax 및 중국 오픈소스 모델의 멀티모달 성능 추가 여부
- 자체 호스팅 GPU 비용 대비 API 호출 비용 크로스오버 시점

> 본 글은 정보 제공 및 학습 목적이며, 특정 종목에 대한 매수/매도 추천이 아닙니다.
> 투자 판단과 책임은 본인에게 있습니다.
