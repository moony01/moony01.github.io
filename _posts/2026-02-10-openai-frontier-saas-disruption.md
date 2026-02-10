---
layout: post
title: "OpenAI가 SaaS를 삼킨다 — Frontier 발표에 업계 멘붕"
date: 2026-02-10 11:00:00 +0900
categories: [ai]
tags: [openai, frontier, ai-agent, saas, enterprise, salesforce, workday]
published: true
---

S&P 500 소프트웨어 지수에서 **1조 달러(약 1,450조 원)**가 증발했습니다. 1월 28일 이후 단 열흘 만에 벌어진 일입니다.

"AI가 기존 소프트웨어를 대체한다"는 말은 수년간 들어왔지만, 이번에는 분위기가 완전히 다릅니다. 2월 5일 OpenAI가 발표한 **Frontier**는 기업용 AI 에이전트 플랫폼입니다. 그런데 이 플랫폼이 하겠다는 것이 — Salesforce, Workday, ServiceNow 같은 기존 SaaS를 AI 에이전트로 **통째로 대체**하겠다는 겁니다. Fortune지는 "could it eventually replace them?"이라는 헤드라인을 달았고, 월스트리트는 그 질문에 **매도**로 답했습니다.

![OpenAI Frontier 플랫폼 히어로 이미지](/static/img/posts/openai-frontier-saas-disruption/openai-frontier-saas-disruption-1.png){: .wd100}

지금까지 AI 뉴스를 "또 마케팅이겠지"하고 넘겼다면, 이번만큼은 진지하게 읽어주세요. 저도 처음에는 반신반의했는데, 파고들수록 이건 진짜 게임 체인저였습니다.

{% include pre-version.html %}

## Frontier가 대체 뭔데 — 30초 요약

Frontier는 한 마디로 **"AI 에이전트를 위한 운영체제"**입니다.

기존에 인간 직원이 아침에 출근해서 Salesforce 열고, Workday 열고, Slack 확인하고, 엑셀 정리하던 작업 — 그 전부를 AI 에이전트가 대신합니다. 핵심 기능을 정리하면 이렇습니다:

- **데이터 통합 허브**: CRM, 데이터 웨어하우스, 티켓팅 도구, 내부 앱을 하나로 연결
- **에이전트 실행 환경**: 파일 작업, 코드 실행, 외부 도구 호출이 가능한 안전한 샌드박스
- **멀티벤더 호환**: OpenAI 에이전트뿐 아니라 **Google, Microsoft, Anthropic** 에이전트도 동일 플랫폼에서 관리
- **엔터프라이즈 거버넌스**: 권한 관리, 감사 로그, SOC 2 Type II / ISO 27001 인증

Sam Altman은 이걸 **"AI coworkers"**라고 불렀습니다. AI가 도구가 아니라 **동료**라는 겁니다. Uber, State Farm, Intuit, Thermo Fisher Scientific이 이미 초기 사용자로 참여하고 있고, 수개월 내 대규모 공개를 예고했습니다.

충격적인 건 멀티벤더 전략입니다. OpenAI 플랫폼에서 경쟁사인 Anthropic의 Claude 에이전트를 돌릴 수 있다? 이건 기존 SaaS 벤더들이 상상조차 못한 개방성입니다.

## SaaS 업계가 진짜로 떨고 있는 3가지 이유

"AI가 SaaS를 대체한다"는 말은 2023년부터 있었습니다. 그런데 왜 **이번에는** 시장이 실제로 패닉에 빠졌을까요?

### 1. 이번에는 실제 제품이 나왔다

이전까지는 "AI가 언젠가 대체할 것"이라는 추상적 전망이었습니다. Frontier는 **지금 당장** Salesforce API를 호출하고, Workday 데이터를 읽고, 이메일을 보내는 에이전트를 배포할 수 있는 플랫폼입니다. 데모가 아니라 프로덕션 레벨입니다.

### 2. 가격 구조가 SaaS의 급소를 정확히 찌른다

Salesforce는 유저당 월 $25~$300을 받습니다. 10명이 쓰면 월 $3,000. 100명이면 $30,000. 그런데 AI 에이전트 하나가 그 인원의 반복 작업을 처리한다면? 기업 입장에서 비용 절감 효과가 너무 명확합니다. 이건 "써볼까?" 수준이 아니라 **"안 쓰면 바보"** 수준의 ROI입니다.

### 3. 데이터 락인(Lock-in)을 깨뜨린다

Salesforce를 7년 쓴 기업이 다른 CRM으로 이전하는 건 악몽 같은 프로젝트입니다. 하지만 Frontier 위에서 에이전트가 Salesforce를 조작한다면, 기업은 Salesforce에 직접 묶이지 않습니다. 에이전트 레이어가 **추상화 계층** 역할을 하면서, 기업이 처음으로 진짜 선택권을 갖게 됩니다.

그 결과가 숫자로 나타났습니다. Salesforce 주가는 일주일 사이 12% 이상 하락했고, ServiceNow, Workday 같은 전통 SaaS 기업들이 줄줄이 빠졌습니다. 반면 AI 인프라 기업들은 폭등 — Nvidia는 하루 만에 7.8% 올랐습니다.

![OpenAI Frontier 아키텍처 다이어그램](/static/img/posts/openai-frontier-saas-disruption/openai-frontier-saas-disruption-2.png){: .wd100}

{% include pre-version.html %}

## 개발자에게 이게 왜 중요한가

"나는 엔터프라이즈 SaaS 안 만드니까 상관없는 거 아닌가?"

**아닙니다.** 이 변화는 모든 개발자의 커리어에 영향을 줍니다.

### CRUD 개발자의 종말이 가속화된다

Frontier가 보여주는 건 "데이터를 읽고-쓰고-조회하는 앱"은 AI 에이전트가 더 잘 만든다는 것입니다. 관리자 대시보드, 내부 도구, 데이터 파이프라인 — 이런 것들을 만드는 개발자 수요가 빠르게 줄어들 수밖에 없습니다.

### "AI 에이전트 엔지니어"라는 새 직군이 뜬다

Frontier의 기술 스택을 보면 새로운 역량이 필요합니다:

```python
# Frontier 스타일 에이전트 아키텍처 (개념 예시)
class SalesAgent:
    def __init__(self):
        self.tools = [
            CRMConnector("salesforce"),
            EmailSender("gmail"),
            DataWarehouse("snowflake")
        ]
        self.permissions = AgentPermissions(
            can_read=["contacts", "deals"],
            can_write=["notes", "tasks"],
            requires_approval=["send_email", "update_deal"]
        )

    async def handle_task(self, task: str):
        plan = await self.reason(task)
        for step in plan.steps:
            if step.needs_approval:
                await self.request_human_approval(step)
            await self.execute(step)
```

에이전트를 설계하고, 권한을 관리하고, 워크플로우를 오케스트레이션하는 역량이 핵심이 됩니다. LangChain, CrewAI 같은 프레임워크 경험이 이력서에서 빛을 발할 타이밍입니다.

### API 설계의 중요성이 폭발한다

AI 에이전트는 UI를 보지 않습니다. **API를 호출합니다.** 에이전트가 잘 사용할 수 있는 API — 명확한 스키마, 일관된 에러 처리, 좋은 문서 — 를 만드는 개발자의 가치가 급상승합니다. MCP(Model Context Protocol)나 OpenAPI 스펙에 대한 깊은 이해가 차별화 무기가 됩니다.

## Salesforce는 진짜로 죽을까?

솔직히 말하면, **당장은 아닙니다.**

Frontier의 초기 버전은 아직 한계가 있습니다. 복잡한 비즈니스 로직, 산업별 컴플라이언스 요구사항, 20년 묵은 레거시 시스템과의 통합 — 이런 것들을 AI 에이전트가 하룻밤 사이에 대체할 수는 없습니다. Salesforce 자체도 Einstein AI를 통해 에이전틱 기능을 빠르게 추가하고 있고, Workday도 자체 AI 에이전트를 개발 중입니다.

하지만 **방향은 분명합니다.** 5년 후에도 지금과 같은 형태의 SaaS를 쓰고 있을 가능성은 낮습니다. "앱을 열고 → 버튼을 클릭하고 → 데이터를 입력하는" 워크플로우 자체가 사라질 겁니다. 대신 "에이전트에게 지시하고 → 결과를 확인하는" 방식으로 전환될 것입니다.

Amazon이 2026년 AI 인프라에만 **2,000억 달러(약 290조 원)** 이상의 설비 투자를 예고한 것, Alphabet과 Meta와 Microsoft가 올해 설비 투자를 대폭 늘린 것 — 이 숫자들이 말해주는 건 빅테크가 이 방향에 올인하고 있다는 사실입니다.

## 마치며 — 지금 당장 준비할 3가지

**1. 에이전트 프레임워크를 직접 만져보세요.** LangChain, CrewAI, AutoGen 중 하나를 골라서 에이전트를 직접 만들어 보세요. Frontier와 직접 연동하지 않더라도, 에이전트 아키텍처에 대한 이해 자체가 무기가 됩니다.

**2. API-first 마인드셋을 가지세요.** 앞으로 여러분이 만드는 모든 서비스의 1차 사용자는 인간이 아니라 AI 에이전트일 수 있습니다. OpenAPI 스펙을 깔끔하게 작성하고, MCP 서버를 제공하는 것이 경쟁력입니다.

**3. 공포보다 기회를 보세요.** "SaaS가 죽는다"는 건 동시에 "새로운 시장이 열린다"는 뜻입니다. AI 에이전트 위에서 돌아가는 새로운 서비스, 에이전트끼리 거래하는 마켓플레이스, 에이전트 모니터링 도구 — 지금 이 순간에도 새로운 스타트업 아이디어가 쏟아지고 있습니다.

OpenAI Frontier는 시작일 뿐입니다. Google, Microsoft, Anthropic도 비슷한 플랫폼을 준비하고 있습니다. SaaS 업계의 대격변은 이미 시작됐습니다. 이 파도에 올라탈 것인지, 파도에 휩쓸릴 것인지 — 그 차이는 **지금 시작하느냐**에 달려 있습니다.
