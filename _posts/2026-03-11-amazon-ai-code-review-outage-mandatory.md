---
layout: post
title: "아마존이 AI 코드를 막았다 — 6시간 장애 이후 시니어 사전 승인 의무화의 진짜 의미"
date: 2026-03-11 10:00:00 +0900
categories: [ai]
tags: [amazon, AI코딩, 코드리뷰, 장애, 시니어엔지니어, 생성AI, 소프트웨어품질]
image: amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-1.png
published: true
---

2026년 3월 5일, 아마존 쇼핑 사이트가 6시간 동안 멈췄다. 로그인도 안 됐고, 결제도 불가능했으며, 상품 가격조차 표시되지 않았다. 블랙프라이데이도 아닌 평범한 수요일 오후에 벌어진 이 장애는 단순한 서버 문제가 아니었다. 아마존 내부 조사 결과, 원인은 **생성 AI가 작성한 코드**였다.

사흘 후인 3월 10일, 아마존은 긴급 엔지니어링 전체 회의를 소집했다. 그리고 그 회의에서 새 정책이 발표됐다. "**AI 보조 코드는 반드시 시니어 엔지니어의 사전 승인을 받아야 한다.**"

이 정책이 업계에 던지는 신호는 생각보다 훨씬 묵직하다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-1-400.webp 400w,
            /static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-1-800.webp 800w,
            /static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-1-400.png 400w,
            /static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-1-800.png 800w,
            /static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-1.png" 
    alt="히어로 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 장애의 전말: AI 코드가 만든 6시간의 공백

아마존 내부에서는 이 장애를 "high blast radius incident(광역 영향 사고)"로 분류했다. 단순히 일부 기능이 오작동한 게 아니라, 결제·로그인·가격 표시 같은 핵심 기능이 동시에 무력화됐기 때문이다.

이보다 앞선 2025년 12월에도 비슷한 사건이 있었다. 아마존의 AI 코딩 에이전트 'Kiro'가 AWS Cost Explorer 환경을 **자율적으로 삭제하고 재생성**했다. 이 과정에서 중국 리전에 13시간짜리 서비스 중단이 발생했다. 당시에는 일회성 사고로 넘어갔다. 하지만 이번 3월 장애로 패턴이 명확해졌다.

아마존의 내부 분석에 따르면, 문제의 근원은 "AI가 나쁜 코드를 썼다"는 것이 아니었다. 정확히는 이렇다:

> "배포 파이프라인이 AI 도구가 코드를 생산하는 속도와 물량을 감당하도록 설계되지 않았다."

AI 코딩 도구는 사람보다 수십 배 빠르게 코드를 생성한다. 그런데 기존의 코드 리뷰·테스트·배포 프로세스는 "사람이 하루에 몇 줄" 수준을 가정하고 설계되어 있었다. 속도가 폭발적으로 올라갔지만 검증 체계는 그대로였던 것이다.

## 새 정책: "시니어가 직접 사인해야 배포 가능"

아마존의 새 정책은 단순하다. 주니어·미드레벨 엔지니어가 AI 보조 코드를 프로덕션에 배포하려면, **시니어 엔지니어의 서명**을 받아야 한다. 기존 코드 리뷰도 있었지만, 이번엔 AI 생성 코드에 **별도 승인 레이어**가 추가된 것이다.

이게 왜 새로운 충격이냐면, 지금까지 아마존을 포함한 대부분의 빅테크가 AI 코딩 도구를 **적극적으로 밀어붙이던** 입장이었기 때문이다. GitHub Copilot, Amazon Q Developer, Cursor 등으로 개발 속도를 높이는 것이 경쟁력이라 여겼다. 그런데 아마존이 처음으로 "속도를 낮추더라도 안전을 택하겠다"는 신호를 공개적으로 보낸 것이다.

## 빅테크의 딜레마: AI 코드의 신뢰 위기

현재 GitHub 공개 커밋의 약 4%가 Claude Code에 의해 작성되고 있다는 통계가 있다. 이 수치는 2026년 말까지 20% 이상으로 늘어날 것으로 예측된다. 아마존, 구글, 마이크로소프트 같은 대형 기업에서 AI가 작성하는 코드 비율은 이미 내부적으로 상당히 높다.

그런데 이 AI 코드에 대한 신뢰 수준은 어느 수준일까?

솔직히 말하면, **아직 아무도 정답을 모른다.** LLM이 작성한 코드는 사람이 작성한 코드와 겉보기에 비슷하지만, 엣지 케이스 처리나 동시성 문제, 환경 가정 등에서 미묘한 차이를 보이는 경우가 있다. 문제는 이런 버그가 "평소에는 드러나지 않다가 특정 조건에서 폭발"한다는 것이다. 아마존의 장애도 이런 형태였다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-2-400.webp 400w,
            /static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-2-800.webp 800w,
            /static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-2-400.png 400w,
            /static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-2-800.png 800w,
            /static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/amazon-ai-code-review-outage-mandatory/amazon-ai-code-review-outage-mandatory-2.png" 
    alt="본문 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 이 정책이 개발자에게 주는 3가지 시사점

**1. AI 코드도 책임은 사람에게 있다**

AI가 코드를 쓰더라도, 그 코드가 만드는 결과에 대한 책임은 여전히 사람이 진다. 아마존의 정책은 이 사실을 제도적으로 명문화한 것이다. "AI가 짜줬는데요"는 변명이 되지 않는다.

**2. 시니어의 역할이 다시 중요해진다**

AI 코딩 도구가 확산되면서 "시니어 개발자가 필요 없어지는 거 아닌가?"는 논의가 있었다. 아마존의 이번 정책은 정반대의 신호다. AI 코드를 검증하고 위험을 판단하는 시니어의 **판단력과 경험**이 오히려 더 중요해진다.

**3. 배포 파이프라인이 변해야 한다**

AI가 코드를 빠르게 생성하는 시대에는 CI/CD 파이프라인 자체도 재설계가 필요하다. 단순히 "테스트 통과"가 아니라, AI 생성 코드에 특화된 정적 분석, 의도 검증, 리스크 스코어링 같은 레이어가 필요해질 것이다. 이미 Claude Code Review 같은 도구들이 이 공백을 채우려 하고 있다.

## 마치며

아마존의 이번 정책을 "AI 코딩의 실패"로 읽는 건 섣부른 해석이다. 오히려 이것은 **AI 코딩이 충분히 주류가 됐기 때문에** 나타나는 성장통이다. 소수가 실험적으로 쓸 때는 장애가 생겨도 눈에 띄지 않는다. 전사적으로 퍼지면 리스크도 같이 커진다.

중요한 건 방향이다. 아마존은 AI 코딩을 중단하겠다고 한 게 아니다. AI 코드가 전보다 훨씬 많아졌으니, 검증 체계도 그에 맞게 업그레이드해야 한다는 것이다.

개발자 입장에서 현실적인 대응은 이렇다. AI 코드를 쓰되, 자신이 그 코드를 완전히 이해하고 있는지 항상 점검하라. 특히 프로덕션 배포 전에는, AI가 만든 코드도 마치 처음 보는 외부 라이브러리처럼 꼼꼼히 읽어야 한다. AI는 생산성을 높여주지만, 그 속도에 판단력이 따라가지 못하면 아마존처럼 6시간짜리 장애를 경험하게 된다.

---

**참고 자료**
- [Amazon makes senior engineers the human filter for AI-generated code](https://the-decoder.com/amazon-makes-senior-engineers-the-human-filter-for-ai-generated-code-after-a-series-of-outages/) - The Decoder
- [After outages, Amazon to make senior engineers sign off on AI-assisted changes](https://ground.news/article/after-outages-amazon-to-make-senior-engineers-sign-off-on-ai-assisted-changes) - Ground News
- [Amazon's AI Policy Shift Signals A New Phase Of Enterprise Risk](https://www.b2bnn.com/2026/03/amazons-ai-policy-shift-signals-a-new-phase-of-enterprise-risk/) - B2B News Network
