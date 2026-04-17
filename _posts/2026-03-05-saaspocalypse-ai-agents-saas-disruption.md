---
layout: post
title: "SaaSpocalypse 실화 - AI 에이전트가 $1조 SaaS 시장을 증발시키는 방법"
description: "2026년 초 소프트웨어 섹터에서 $1~2조 달러 시총이 증발했다. Salesforce -38%, Adobe -$120B, HubSpot -50%. AI 에이전트가 per-seat SaaS 모델을 어떻게 무너뜨리고 있는지 개발자 관점으로 분석한다."
date: 2026-03-05 11:00:00 +0900
categories: [economy]
tags: [AI에이전트, SaaS, 소프트웨어주식, SaaSpocalypse, 클라우드투자]
image: saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-1.png
published: true
---

매달 통장에서 빠져나가는 SaaS 구독료 목록을 마지막으로 확인한 게 언제인가. Slack, Notion, Jira, Figma, HubSpot, Salesforce… 작은 스타트업도 월 $5,000~$10,000은 가볍게 넘기는 구독 지출이 기본이 됐다. 그런데 2026년 초, 이 모든 걸 만든 회사들의 주가가 동시에 폭락하기 시작했다.

업계에서는 이 현상을 **SaaSpocalypse**라고 부르기 시작했다. SaaS + Apocalypse의 합성어다. 허황된 미래 예측이 아니다. 지금 이 순간 벌어지고 있는 현실이다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-1-400.webp 400w,
            /static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-1-800.webp 800w,
            /static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-1-400.png 400w,
            /static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-1-800.png 800w,
            /static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-1.png" 
    alt="SaaSpocalypse 개요" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 숫자로 보는 충격 - 얼마나 무너졌나

2026년 1월~2월 두 달 사이, 소프트웨어 섹터에서 **$1조~$2조 달러**에 달하는 시가총액이 증발했다. 특정 기업만의 이야기가 아니다.

| 기업 | 낙폭 | 핵심 이유 |
|------|------|-----------|
| Salesforce (CRM) | **-38% YTD** | AI 에이전트가 CRM 직접 연결 |
| Adobe (ADBE) | **-$120B** (7주 만에) | 에이전트가 크리에이티브 생산 전담 |
| HubSpot (HUBS) | **-50%** | 마케팅 자동화 AI로 대체 |
| Atlassian (TEAM) | **-35%** | 기업 시트 수 최초 감소 |
| ServiceNow (NOW) | 두 자릿수 하락 | 워크플로우 자동화 무력화 |

반면 같은 기간 **Palantir는 +22%** 상승했다. AI 에이전트를 적의 위협으로 보지 않고, 오케스트레이션 플랫폼으로 편입시킨 곳만 살아남고 있다.

Atlassian의 Q3 실적 발표에서 특히 충격적인 데이터가 나왔다. 기업 고객의 **시트 수가 역사상 처음으로 감소**했다. 2002년 창업 이래 24년 만에 처음이다. "더 많이 쓰면 더 많이 낸다"는 per-seat 모델의 균열이 숫자로 확인된 순간이었다.

## AI 에이전트가 SaaS를 대체하는 메커니즘

이 현상의 본질은 단순하다. **AI 에이전트가 SaaS의 역할을 직접 수행하기 시작했다.**

기존 SaaS는 인간이 클릭하고 입력하고 설정하는 인터페이스가 필요했다. 그래서 "시트(사용자 계정)"가 단위가 됐다. 사람 10명이 쓰면 10개 시트, 100명이 쓰면 100개 시트. 단순하고 예측 가능한 모델이었다.

그런데 **Computer-Using Agent(CUA)** 기술이 등장하면서 전제가 무너졌다. CUA는 인간처럼 화면을 보고, 클릭하고, 폼을 작성하고, 보고서를 생성한다. Anthropic의 Claude 4 계열 에이전트 하나가 **10~15명 분량의 중간관리자급 작업**을 자율로 처리할 수 있다고 분석가들은 추정한다.

구체적인 비교가 있다. 마케팅 자동화 플랫폼의 경우:

- 기존 방식: SaaS 구독 **월 $3,000** + 담당 직원 2명
- AI 에이전트: 월 **$200** (API 비용) + 더 세밀한 개인화

한 Fortune 50 기업은 내부 문서에서 **Salesforce와 ServiceNow 라이선스 지출을 연내 60% 삭감**하겠다는 계획을 공개했다. 대안은 파운데이션 모델 API 크레딧이다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-2-400.webp 400w,
            /static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-2-800.webp 800w,
            /static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-2-400.png 400w,
            /static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-2-800.png 800w,
            /static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/saaspocalypse-ai-agents-saas-disruption/saaspocalypse-ai-agents-saas-disruption-2.png" 
    alt="AI 에이전트 vs SaaS 비교" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 개발자 시각에서 본 전환의 의미

개발자 입장에서 이 변화는 도구 선택의 문제가 아니라 **아키텍처의 근본 전환**이다.

기존 SaaS 중심의 스택은 다음과 같은 형태였다:

```
사용자 → UI (SaaS 대시보드) → 비즈니스 로직 (SaaS 내부) → 데이터
```

에이전트 중심 아키텍처에서는:

```
에이전트 → API / 데이터베이스 직접 접근 → 비즈니스 로직 (LLM)
```

중간에 있던 SaaS UI와 로직 레이어가 통째로 날아간다. 에이전트는 HubSpot 대시보드를 클릭할 필요가 없다. HubSpot이 연결된 CRM 데이터베이스에 직접 쓰면 된다.

흥미로운 부작용도 나타나고 있다. 일부 회사들은 시각적 CMS를 **삭제**했다. "인간을 위한 편의 기능이 AI 에이전트의 작업을 오히려 방해했다"는 이유에서다. 이제 소프트웨어 설계 자체가 "에이전트 친화적 API"를 기본으로 시작하는 방향으로 바뀌고 있다.

물론 모든 SaaS가 같은 운명은 아니다. Anthropic의 2026 에이전틱 코딩 트렌드 리포트에 따르면, 개발자들은 AI를 통해 업무의 **60%를 처리**하면서도 **80~100%의 산출물을 직접 검토**한다고 응답했다. 에이전트가 실행하더라도 결정권은 아직 인간에게 있다.

## 살아남는 SaaS의 조건

모든 소프트웨어 회사가 죽어가는 건 아니다. 이 혼란 속에서 오히려 강화되는 영역이 있다.

**살아남는 SaaS의 특징:**

1. **데이터 해자(Data Moat)**: Snowflake, Databricks처럼 데이터 자체가 핵심 자산인 경우. 에이전트가 쓰더라도 데이터는 여기 있어야 한다.

2. **규제/컴플라이언스 복잡성**: 의료, 금융, 법률 SaaS. 에이전트가 자동화하더라도 감사 추적과 규제 준수는 전문 플랫폼 필요.

3. **네트워크 효과**: GitHub처럼 사용자 간 협업 자체가 제품 가치인 플랫폼. 에이전트는 코드를 쓸 수 있지만 개발자 커뮤니티는 대체 불가.

4. **AI 에이전트 인프라 자체**: Palantir, Weights & Biases처럼 에이전트를 만들고 운용하는 도구.

**죽어가는 SaaS의 특징:**

- 단순 데이터 입력/출력 자동화 (에이전트가 더 잘 함)
- 리포팅/대시보드 중심 (에이전트가 즉각 생성)
- 워크플로우 자동화 (n8n + AI 에이전트로 대체)
- 비싼 per-seat 라이선스에 기능은 평범한 플랫폼

Bain & Company 분석에 따르면, "Agentic AI의 파괴적 영향은 **선택적 언번들링**으로 나타날 것"이라고 한다. 차별화된 데이터 우위와 네트워크 효과를 가진 플랫폼은 오히려 강해진다. 반면 범용 워크플로우 자동화 SaaS는 존재 이유가 사라진다.

## 마치며 - 개발자와 투자자가 지금 확인해야 할 것

2026년 3월 현재, SaaSpocalypse는 패닉 셀링과 구조적 변화가 뒤섞인 혼란의 국면에 있다. 일부 낙폭은 과도하다. Salesforce가 Jira를 완전히 대체하는 데는 수년이 걸릴 것이다. 기업의 관성, 데이터 마이그레이션 비용, 규제 요구사항이 변화의 속도를 늦춘다.

하지만 방향은 분명하다. per-seat SaaS의 황금기는 끝나가고 있다.

**다음 실적 시즌에 확인할 체크리스트:**

- [ ] Net Seat Growth: 고객사의 시트 수가 늘고 있는가, 줄고 있는가
- [ ] Net Revenue Retention(NRR): 100% 이상인가, 추세 방향은 어느 쪽인가
- [ ] API/Platform Revenue 비중: SaaS UI 수익 vs API 수익 비율 변화
- [ ] AI Agent 호환성: 제품이 에이전트 친화적 API를 제공하는가
- [ ] 데이터 자산 유무: 대체 불가능한 독점 데이터를 보유하는가

이 체크리스트에서 빨간불이 3개 이상 켜지는 기업이라면, SaaSpocalypse의 다음 희생자일 수 있다.

> 본 글은 정보 제공 및 학습 목적이며, 특정 종목에 대한 매수/매도 추천이 아닙니다.
> 투자 판단과 책임은 본인에게 있습니다.
