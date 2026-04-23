---
layout: post
title: "Opus 위의 비밀 모델 Claude Mythos가 유출됐다"
description: "Anthropic CMS 설정 오류로 3000건의 내부 문서가 유출됐다. Opus를 뛰어넘는 비밀 모델 Claude Mythos의 존재와 전례 없는 사이버보안 위험 경고가 담겨 있었다."
date: 2026-03-28 15:00:00 +0900
categories: [security]
tags: [Claude Mythos, Anthropic, 데이터유출, Capybara, 사이버보안, AI보안]
image: claude-mythos-leak/claude-mythos-leak-1.png
published: true
---

"당신네 블로그 CMS에 미공개 문서 3000건이 공개 상태입니다."

Fortune 기자가 Anthropic에 보낸 메일의 요지다. 3월 26일, Anthropic의 콘텐츠 관리 시스템에서 한 번도 공개된 적 없는 내부 문서 약 3000건이 누구나 검색하고 열람할 수 있는 상태로 발견됐다. 블로그 초안, 내부 이미지, PDF, CEO 비공개 행사 자료까지 전부. 그리고 그 문서 더미 한가운데에 'Claude Mythos'라는 이름의 모델 발표 초안 두 버전이 있었다.

Anthropic은 Fortune의 연락을 받고 즉시 접근을 차단했다. 그리고 이례적으로 모델의 존재를 공식 인정했다. "지금까지 만든 것 중 가장 강력한 모델이며, 단계적 도약(step change)이다."

{% include pre-version.html %}

## 3000건이 쏟아진 경위

### CMS 디폴트 설정의 함정

원인은 허무할 정도로 단순했다. Anthropic의 콘텐츠 관리 시스템에서 파일을 업로드할 때 **기본값이 '공개'**로 설정되어 있었다. 누군가 이 디폴트를 변경하지 않았거나, 바꿔야 한다는 사실 자체를 인지하지 못했다. Fortune은 이를 "인적 오류(human error)"로 분류했고, Anthropic도 이를 부인하지 않았다.

유출된 자산 약 3000건에는 블로그 초안만 있었던 게 아니다. 내부 마케팅 자료, CEO 비공개 행사 관련 문서까지 포함됐다. AI 안전성을 핵심 가치로 내세우는 기업이라는 점을 생각하면 아이러니가 상당하다.

며칠 전 [GitHub의 AI 학습 데이터 수집 기본값 변경](/security/2026/03/28/github-ai-training-policy.html)에서도 다뤘지만, **기본값의 방향이 곧 현실**이다. 대부분의 사용자는 설정을 바꾸지 않는다. Anthropic 내부 엔지니어도 예외가 아니었다.

직접 운영하는 인프라가 있다면 지금 당장 확인해볼 수 있는 명령이 하나 있다:

```bash
# S3 버킷의 퍼블릭 접근 차단 상태 확인 (AWS CLI)
aws s3api get-public-access-block --bucket YOUR_BUCKET_NAME
```

네 항목 — `BlockPublicAcls`, `IgnorePublicAcls`, `BlockPublicPolicy`, `RestrictPublicBuckets` — 이 전부 `true`가 아니라면, Anthropic과 같은 상황이 당신의 인프라에서도 일어날 수 있다. GCP를 쓴다면 `gsutil iam get gs://YOUR_BUCKET`으로 `allUsers` 바인딩이 있는지 확인하면 된다.

### 유출이 불러온 연쇄 반응

Fortune의 단독 보도 이후 24시간 만에 CoinDesk, Seeking Alpha, Futurism, The Decoder가 후속 기사를 쏟아냈다. 특히 CoinDesk는 "사이버보안 악몽이 될 수 있는 AI 모델"이라는 제목을 달았고, 소프트웨어 관련 주식에 미칠 영향을 분석했다. GeekNews에서도 19시간 만에 15개의 댓글이 달렸는데, 한국 개발자 커뮤니티에서 이 정도 반응 속도는 드물다.

{% include pre-version.html %}

## Opus 위에 새로운 계층이 있었다

유출된 초안에서 가장 주목할 부분은 모델의 포지셔닝이다. 두 버전의 초안이 있었는데, 하나는 "Mythos", 다른 하나는 "Capybara"라는 이름을 사용했다. 내용은 동일했다. 이름의 유래는 "지식과 아이디어를 잇는 깊은 연결 조직(the deep connective tissue that links together knowledge and ideas)"에서 따왔다고 한다.

### Opus 4.6과의 격차

핵심 문장은 이것이다. "Capybara는 Opus 모델보다 더 크고 더 지능적인 새로운 티어의 모델이다."

| 비교 항목 | Opus 4.6 대비 Mythos 성능 |
|-----------|---------------------------|
| 소프트웨어 코딩 | "극적으로 높은 점수(dramatically higher scores)" |
| 학술 추론 | 동일하게 극적 향상 |
| 사이버보안 | "현존하는 어떤 AI 모델보다 훨씬 앞선 수준" |

구체적인 벤치마크 수치는 초안에도 포함되지 않았다. 내 생각엔 이건 의도적이다. 숫자를 넣으면 경쟁사가 즉시 비교 분석에 들어간다. 초안이니 최종 수치가 확정되지 않았을 수도 있고, 아니면 숫자 자체가 너무 파격적이라 내부 검증이 더 필요했을 수도 있다. 어느 쪽이든, Anthropic 대변인이 Fortune에 직접 확인한 "step change"라는 단어가 모든 걸 말해준다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-mythos-leak/claude-mythos-leak-2-400.webp 400w,
            /static/img/posts/claude-mythos-leak/claude-mythos-leak-2-800.webp 800w,
            /static/img/posts/claude-mythos-leak/claude-mythos-leak-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-mythos-leak/claude-mythos-leak-2.webp" 
    alt="Anthropic Claude 모델 계층 구조와 Mythos Capybara 포지셔닝 비교" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

### 가격과 출시 타이밍

Anthropic은 Mythos에 대해 "우리가 제공하기에 매우 비싸고, 고객이 사용하기에도 매우 비쌀 것"이라고 밝혔다. 효율성을 개선한 뒤에야 일반 출시할 계획이다. 현재는 소수의 얼리 액세스 고객만 API를 통해 접근하고 있다.

출시 전략도 이례적이다. "이전 모델들보다 의도적으로 느리게 출시할 것"이며, 첫 번째 대상 그룹은 **사이버 방어 조직**이다. 공격자보다 방어자가 먼저 무기를 손에 쥐게 하겠다는 것. 이 순서가 왜 중요한지는 바로 아래에서 다룬다.

## AI가 사이버무기가 되는 시나리오

유출된 초안에서 무게감이 가장 큰 문장은 이것이었다.

> "방어자의 노력을 훨씬 앞지르는 속도로 취약점을 악용할 수 있는 모델 물결의 전조다."

Anthropic이 **자사 모델**에 대해 쓴 문장이다. 만든 회사가 스스로 이렇게 경고한다는 건, 내부 레드팀 테스트에서 실제로 그런 결과를 확인했다는 뜻이다.

### 공격 자동화가 현실이 되는 순간

현재 AI 모델로도 코드 리뷰와 취약점 탐지는 가능하다. 하지만 Mythos 급 모델이 공격자의 손에 들어가면 게임의 규칙 자체가 바뀐다:

1. **자동 취약점 탐색** — 대규모 코드베이스에서 제로데이급 취약점을 분 단위로 스캔
2. **익스플로잇 자동 생성** — 발견한 취약점에 대한 공격 코드를 즉시 작성
3. **대규모 병렬 공격** — 수천 개 타겟에 각각 맞춤형 공격을 동시 실행

이 시나리오가 허황된 이야기가 아닌 이유가 있다. 이전 세대 모델에서 이미 [멀티 에이전트 시스템이 병렬로 코드를 분석하고 수정하는 능력](/ai/2026/03/22/claude-code-hidden-multi-agent-system.html)이 확인됐다. Mythos가 이 능력을 사이버보안 영역으로 극대화했다면, Anthropic의 경고는 과장이 아니다.

### Anthropic이 직면한 딜레마

"전례 없는 사이버보안 위험"을 만들었다고 스스로 인정한 회사가, 동시에 그 모델을 상업화해야 한다. safety-first를 내세우는 기업 이미지와 "현존 최강의 사이버보안 AI"를 만들었다는 현실 사이의 줄타기다.

방어 조직 우선 접근이라는 출시 전략은 이 딜레마에 대한 답이다. 의도는 분명히 좋다. 그런데 한 가지 질문이 남는다 — 얼리 액세스 API 키가 유출되거나, 모델 가중치가 탈취되면? 바로 며칠 전 CMS 설정 하나를 놓친 회사가, 이보다 훨씬 높은 수준의 보안을 유지할 수 있을까?

## CMS 한 줄이 바꿔버린 타임라인

Anthropic이 Mythos를 공개할 시점은 아마 수개월 뒤였을 것이다. 벤치마크를 확정하고, 안전 평가를 마치고, 마케팅 메시지를 다듬은 뒤에. CMS 설정 파일의 `public: true` 한 줄이 그 계획 전체를 날려버렸다.

AI 보안의 미래를 논하는 회사가 자사 콘텐츠 관리 시스템의 접근 제어 기본값 하나를 놓쳤다. 가장 정교한 위협 모델을 설계하는 팀도, 가장 기본적인 인프라 점검에서 실패할 수 있다. 보안은 언제나 가장 약한 고리에서 무너진다. 이번에는 그 고리가 차세대 AI 모델이 아니라, 블로그 CMS였을 뿐이다.
