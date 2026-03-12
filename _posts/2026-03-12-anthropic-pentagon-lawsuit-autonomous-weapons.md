---
layout: post
title: "'AI 무기 못 만든다'고 했더니 미국이 적국 취급했다 — 앤트로픽 소송 사건의 전말"
date: 2026-03-12 11:00:00 +0900
categories: [ai]
tags: [anthropic, claude, pentagon, 자율무기, ai-safety, 미국방부, ai-ethics]
image: anthropic-pentagon-lawsuit-autonomous-weapons/anthropic-pentagon-lawsuit-autonomous-weapons-1.png
published: true
---

2026년 3월 9일, 샌프란시스코 AI 기업 앤트로픽이 미 연방법원 두 곳에 소장을 제출했다. 피고는 다름 아닌 미합중국 국방부와 트럼프 행정부다.

이유? **자율 무기와 대규모 감시에 Claude를 쓸 수 없다**는 자사의 원칙을 고수했다가 '공급망 위험' 기업으로 지정됐기 때문이다.

이 '공급망 위험(Supply Chain Risk)' 지정은 역사적으로 **화웨이, ZTE 같은 중국 기업**에나 적용되던 조치였다. 미국 기업에 적용된 것은 이번이 처음이다.

![앤트로픽 미 국방부 소송 — 자율 무기 AI 안전 딜레마](/static/img/posts/anthropic-pentagon-lawsuit-autonomous-weapons/anthropic-pentagon-lawsuit-autonomous-weapons-1.png){: .wd100}

{% include pre-version.html %}

## 무슨 일이 있었나

사건의 시작은 지난 2월이다. 국방부는 앤트로픽과 AI 모델 사용 계약을 갱신하면서 단 하나의 조건을 요구했다 — **"클로드를 모든 합법적 목적에 자유롭게 쓸 수 있어야 한다."**

앤트로픽 CEO 다리오 아모데이는 이에 동의하지 않았다. 그가 요구한 것은 두 가지 레드라인이었다:

1. **자율 무기 시스템** (human-in-the-loop 없는 치명적 의사결정)에 Claude 사용 금지
2. **미국 시민에 대한 대규모 감시**에 Claude 사용 금지

이는 앤트로픽이 서비스 출시 초부터 공개적으로 밝혀온 사용 정책이다. 어떤 기업이든 계약 전 동의하는 조건들이었다.

국방부는 받아들이지 않았다. 2025년 말 체결됐던 계약은 파기됐고, 2월 말 트럼프 대통령은 트루스소셜에 "연방기관은 앤트로픽 제품 사용을 중단하라"고 공개 게시했다. 그리고 3월 초, 국방부는 앤트로픽을 공식적으로 **'공급망 위험(Supply Chain Risk)'**으로 지정했다.

미국 기업이 이 지정을 받은 건 역사상 처음이다. 전례는 모두 중국 화웨이, 러시아 소프트웨어 기업 같은 외국 기업들이었다.

## 앤트로픽이 거부한 것의 정체

자율 무기 시스템(Lethal Autonomous Weapons Systems, LAWS)은 단순히 공상과학의 영역이 아니다. 이미 이스라엘의 Harpy 드론, 러시아의 자율 지뢰 시스템 등 실전 배치된 사례가 존재한다. AI가 적의 목표물을 탐지하고, 인간의 최종 승인 없이 공격 결정을 내리는 시스템이다.

아모데이의 주장은 이렇다: "현재 AI는 이런 결정을 내리기에 충분히 신뢰할 수 없다. 실수가 전쟁 범죄로 이어질 수 있다."

이것이 단순한 도덕적 포지셔닝인지, 아니면 진심인지는 의견이 갈린다. 하지만 결과는 분명하다 — **미국 정부가 미국 기업을 중국 통신사와 같은 기준으로 제재했다.**

국방부 측 논리도 있다. "국가 안보 비상사태에서 민간 기업이 군의 AI 활용 방식을 결정하도록 허용할 수 없다." 어느 쪽 주장이 맞든, 선례는 이미 만들어졌다.

## OpenAI는 어떻게 했나

바로 이 지점에서 실리콘밸리의 균열이 극명하게 드러난다.

앤트로픽이 거부 의사를 밝히는 동안, OpenAI는 다른 선택을 했다. 2월 말, OpenAI는 기존 사용 정책에서 **"군사 및 전쟁"** 관련 제한을 삭제하고 국방부와 계약을 체결했다. 내부 직원 일부가 사직서를 내거나 공개 비판을 했지만, 회사의 방향은 바뀌지 않았다. 샘 알트만은 "우리는 민주주의 국가의 군대를 지원할 준비가 됐다"고 밝혔다.

두 회사는 같은 시장, 같은 기술을 갖고 있다. 그런데 AI 안전에 대한 입장 차이 하나가 이렇게 다른 결과를 만들었다.

| | 앤트로픽 | OpenAI |
|---|---|---|
| 군사 계약 | 거부 | 체결 |
| 자율 무기 레드라인 | 유지 | 정책에서 삭제 |
| 결과 | 소송 + '공급망 위험' 지정 | 국방부 계약 수주 |

![앤트로픽 vs OpenAI AI 군사 활용 정책 비교](/static/img/posts/anthropic-pentagon-lawsuit-autonomous-weapons/anthropic-pentagon-lawsuit-autonomous-weapons-2.png){: .wd100}

{% include pre-version.html %}

## 개발자에게 미치는 영향

당장 개발자 입장에서 가장 궁금한 것은 하나다: **"클로드 쓸 수 있나?"**

아모데이가 직접 밝혔다 — "이번 지정은 좁은 범위다. 국방부 관련 프로젝트를 제외하면 비즈니스와 개발자는 계속 Claude를 사용할 수 있다." Microsoft, Google도 비국방 관련 앤트로픽 협력은 계속될 것이라고 확인했다.

하지만 더 큰 문제가 있다. 이번 사태는 AI 개발사들이 **사용 정책을 얼마나 지킬 수 있는지**에 대한 근본적 의문을 제기한다.

AI 코딩 도구, RAG 파이프라인, 에이전트 프레임워크를 만들 때 우리는 기반 모델의 사용 정책을 신뢰한다. 하지만 정부의 압력 앞에서 그 정책이 얼마나 굳건한가?

앤트로픽의 소송은 이 질문에 대한 회사 차원의 답변이다. 법정에서 진다 해도, 원칙을 지켰다는 기록이 남는다. 이기면 선례가 된다.

## 소송의 두 가지 법적 주장

앤트로픽은 두 곳의 법원에 각각 다른 논리로 소송을 제기했다:

**캘리포니아 연방법원**: 공급망 위험 지정이 헌법상 표현의 자유(First Amendment)를 침해한다. 앤트로픽은 AI 안전에 대한 공개적 발언을 해왔고, 이를 이유로 처벌받고 있다는 것이다.

**워싱턴 D.C. 항소법원**: 어떤 연방법에도 국내 기업을 이런 방식으로 지정할 법적 근거가 없다. 절차적 위법이다.

법조계 분석은 앤트로픽에 유리하다. Lawfare의 분석에 따르면 "이 지정은 법정에서 첫 번째 접촉만으로도 버티지 못할 것"이라고 평가했다. 앤트로픽은 법원에 공급망 위험 지정 취소, 집행 중지, 연방 기관들의 사용 중단 지시 철회를 요청했다.

## 마치며: AI 산업이 선택해야 할 것

이 사건이 중요한 이유는 단순히 한 기업의 승패 때문이 아니다.

AI가 군사 시스템에 통합되는 속도는 기하급수적이다. 자율 드론, AI 기반 정보 분석, 사이버전 자동화 — 이미 진행 중이다. 그리고 이 과정에서 AI 기업들은 선택을 강요받게 된다: 계약을 따를 것인가, 원칙을 지킬 것인가.

앤트로픽은 원칙 쪽을 선택했고, 그 대가로 미국 역사상 처음으로 자국 AI 기업이 '공급망 위험'으로 지정됐다.

개발자로서 우리가 신뢰하는 AI 도구들이 어떤 원칙 위에 서 있는지 — 이제 그것도 기술 스택 선택 기준이 되는 시대가 됐다. 어떤 회사가 압박을 받았을 때 어떤 선택을 했는지, 그 기록은 남는다.

법원의 판결이 어떻게 나오든, 앤트로픽이 이 논쟁에서 지더라도 AI 산업 전체에 중요한 선례를 남긴 것만은 분명하다.

---

**참고 출처**:
- [Anthropic sues Pentagon over "supply chain risk" label — Axios](https://www.axios.com/2026/03/09/anthropic-sues-pentagon-supply-chain-risk-label)
- [Anthropic sues Trump administration over Pentagon blacklist — CNBC](https://www.cnbc.com/2026/03/09/anthropic-trump-claude-ai-supply-chain-risk.html)
- [Pentagon's Anthropic Designation Won't Survive — Lawfare](https://www.lawfaremedia.org/article/pentagon's-anthropic-designation-won't-survive-first-contact-with-legal-system)
- [앤트로픽, 美 국방부에 소송 — 전자신문](https://www.etnews.com/20260310000001)
