---
layout: post
title: "변호사가 코딩 대회를 이겼다 — 개발자 500명이 멘붕한 이유"
description: "Claude Code 해커톤 우승자 5명 중 4명이 비개발자. 변호사, 심장전문의, 뮤지션이 개발자를 이긴 결과가 의미하는 것."
date: 2026-02-23 11:00:00 +0900
categories: [others]
tags: [claude-code, hackathon, 비개발자, ai-coding, anthropic, vibe-coding]
image: claude-hackathon-lawyer-wins/claude-hackathon-lawyer-wins-1.webp
published: true
---

개발자가 졌다.

농담이 아니다. 2월 21일, Anthropic이 "Built with Opus 4.6" Claude Code 해커톤 결과를 발표했다. 500명이 1주일 동안 Opus 4.6으로 뭐든 만들어보는 대회였다. 그런데 **우승자 5명 중 4명이 개발자가 아니었다.**

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-hackathon-lawyer-wins/claude-hackathon-lawyer-wins-1-400.webp 400w,
            /static/img/posts/claude-hackathon-lawyer-wins/claude-hackathon-lawyer-wins-1-800.webp 800w,
            /static/img/posts/claude-hackathon-lawyer-wins/claude-hackathon-lawyer-wins-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-hackathon-lawyer-wins/claude-hackathon-lawyer-wins-1.webp" 
    alt="Claude Code 해커톤 우승자 5명 — 변호사, 심장전문의, 뮤지션, 도로 인프라 담당자, 소프트웨어 엔지니어" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

개인상해 전문 변호사. 인터벤션 심장전문의. 일렉트로닉 뮤지션. 도로·인프라 공무원. 그리고 **딱 1명**의 소프트웨어 엔지니어. 이 다섯 명이 전 세계 개발자들 사이에서 벌어진 코딩 대회의 최종 승자다. 개발자 커뮤니티는 지금 난리다.

{% include pre-version.html %}

## 500명이 참가하고, 변호사가 1등을 했다

금을 거머쥔 건 Mike Brown이라는 사람이 만든 **CrossBeam**이었다. 캘리포니아 건설 허가 프로세스를 개선하는 도구다. 건축업자와 지방자치단체가 건축법규 준수 여부를 빠르게 확인하고, 도면 검토를 자동화한다.

### 여기서 핵심은 "누가 만들었느냐"다

Mike Brown은 그 건설 허가 시스템 안에서 매일 일하는 사람이다. 프로덕트 매니저도 없고, 스프린트 플래닝도 없고, 개발팀도 없다. **문제를 매일 겪는 사람이 마침내 직접 고칠 도구를 가진 것이다.** Claude Code가 그 도구였다.

LinkedIn에서 이 결과를 공유한 David Hyman의 글은 하루 만에 수십만 뷰를 기록했다. 그가 던진 문장이 가장 정확하다:

> "세계에 2,900만 소프트웨어 개발자가 있다. 80억 인구 중 0.4%. 소프트웨어 역사 내내, 99.6%는 나머지 0.4%가 만들어줄 때까지 기다려야 했다. **그 시대가 끝났다.**"

## 우승작들을 뜯어보면 패턴이 보인다

5개 우승작을 하나씩 보자.

| 순위 | 프로젝트 | 만든 사람 | 직업 |
|:----:|----------|-----------|------|
| 🥇 | CrossBeam (건설 허가 자동화) | Mike Brown | 도로·인프라 종사자 |
| 🥈 | 의료 영상 분석 도구 | 이름 비공개 | 인터벤션 심장전문의 |
| 🥉 | 사운드 디자인 워크스테이션 | 이름 비공개 | 일렉트로닉 뮤지션 |
| 4위 | 법률 문서 자동 생성기 | 이름 비공개 | 개인상해 변호사 |
| 5위 | AI 기반 코드 리뷰 에이전트 | 이름 비공개 | 소프트웨어 엔지니어 |

패턴이 선명하다. **자기 도메인의 문제를 가장 깊이 이해하는 사람이 이겼다.** 심장전문의가 의료 영상을 다루는 게 당연하고, 변호사가 법률 문서를 자동화하는 게 당연하다. 코드를 "잘 짜는 능력"은 더 이상 승패를 가르지 못했다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-hackathon-lawyer-wins/claude-hackathon-lawyer-wins-2-400.webp 400w,
            /static/img/posts/claude-hackathon-lawyer-wins/claude-hackathon-lawyer-wins-2-800.webp 800w,
            /static/img/posts/claude-hackathon-lawyer-wins/claude-hackathon-lawyer-wins-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-hackathon-lawyer-wins/claude-hackathon-lawyer-wins-2.webp" 
    alt="도메인 전문가에서 AI를 거쳐 소프트웨어로 — 패러다임 전환 다이어그램" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>


### 유일한 개발자는 5위였다

소프트웨어 엔지니어가 만든 프로젝트는 "AI 기반 코드 리뷰 에이전트"였다. 기술적으로 깔끔했을 것이다. 하지만 심사위원들의 눈에는 캘리포니아의 망가진 건설 허가 시스템을 고치는 도구가 더 가치 있었다. **기술적 우아함보다 실제 문제 해결이 이긴 순간**이다.

{% include pre-version.html %}

## GeekNews에서 터진 반응 — "개발자 존재 이유가 뭐냐"

이 소식은 [GeekNews(news.hada.io)](https://news.hada.io/)에서 29포인트를 찍으며 화제가 됐다. 댓글 반응은 크게 두 갈래다.

**"당연한 결과다" 파:**

```
"도메인 전문가가 직접 만든 도구가 제일 유용한 건 예전부터 그랬다.
단지 그동안 코딩이라는 병목이 막고 있었을 뿐."
```

**"이게 말이 되냐" 파:**

```
"해커톤인데 해커가 없다고?
코딩 능력이 아니라 아이디어만 평가한 거 아닌가?"
```

두 입장 다 일리가 있다. 하지만 내 생각엔, **이건 "코딩 대회"의 정의가 바뀐 사건**이다. 예전의 해커톤은 "48시간 안에 얼마나 많은 코드를 짤 수 있는가"를 겨뤘다. 지금의 해커톤은 "이 도구로 얼마나 의미 있는 문제를 풀 수 있는가"를 겨룬다.

## 이전에 다뤘던 [Claude Code 해커톤 70가지 비밀](/ai/2026/02/14/claude-code-hackathon-winner-70-secrets.html)에서도 이 조짐은 있었다

한 달 전 해커톤에서 우승한 ykdojo는 개발자였지만, 그가 공개한 70가지 팁의 핵심은 **"코드를 직접 짜지 말라"**였다. CLAUDE.md에 프로젝트 설계만 잘 잡아두면 나머지는 Claude가 알아서 한다는 내용이었다.

이번 결과는 그 조짐의 극단적 결말이다. 코드를 잘 짜는 능력이 아니라, **문제를 정확히 정의하는 능력**이 최종 병기가 됐다. 변호사가 법률 문서의 고통을 누구보다 정확히 안다. 심장전문의가 의료 영상의 한계를 누구보다 잘 안다. Claude Code는 그 이해를 소프트웨어로 번역하는 브릿지일 뿐이다.

### 바이브 코딩의 "둘째 날" 문제는 여전하다

다만 한 가지 짚고 넘어가야 할 게 있다. 이전 [바이브 코딩 가이드](/ai/2026/01/23/vibe-coding-guide-2026.html)에서도 다뤘지만, AI가 1분 만에 뚝딱 만든 앱은 "첫째 날"에는 멋지다. 문제는 둘째 날 — 유지보수, 보안 패치, 스케일링, 예외 처리. 해커톤 우승과 프로덕션 운영은 다른 차원의 이야기다.

비개발자가 해커톤을 이긴 건 사실이다. 하지만 그 도구를 **10만 명이 쓰는 서비스로 키울 수 있는가**는 전혀 다른 질문이다. 아직은 개발자가 필요한 영역이 분명히 존재한다.

## 그래서 개발자는 뭘 해야 하나

이 결과를 보고 "개발자 끝났다"고 결론 내리는 건 성급하다. 하지만 "나는 괜찮다"고 무시하는 것도 위험하다.

내가 읽어낸 시그널은 이거다:

### 1. 코딩 속도는 더 이상 경쟁력이 아니다

AI가 코드를 짜주는 세상에서, "빨리 짤 수 있다"는 건 "빨리 계산할 수 있다"만큼 무의미해진다. 계산기가 나왔을 때 암산 챔피언이 사라지지는 않았지만, 암산 자체가 경쟁력이 되지는 못했다.

### 2. 도메인 지식 + AI 활용 능력 = 새로운 풀스택

"풀스택 개발자"의 정의가 바뀌고 있다. 프론트엔드 + 백엔드가 아니라, **특정 도메인의 문제를 AI로 해결할 수 있는 사람**이 새로운 풀스택이다. 의료 + AI, 법률 + AI, 금융 + AI.

### 3. 개발자의 생존 공간은 "둘째 날" 이후에 있다

해커톤 우승작을 프로덕션으로 올리고, 보안을 잡고, 스케일링하고, 장애에 대응하는 건 여전히 깊은 엔지니어링 역량이 필요하다. AI가 코드를 생성하는 속도가 빨라질수록, **코드를 검증하고 유지하는 능력**의 가치는 오히려 올라간다.

## 0.4%의 특권이 사라진 자리에 남는 것

소프트웨어 개발의 역사에서 이번 해커톤은 작은 이벤트에 불과할 수 있다. 하지만 상징성은 크다. 코딩을 할 줄 아는 사람만이 소프트웨어를 만들 수 있는 시대는 정말 끝나가고 있다.

80억 인구 중 0.4%가 독점하던 영역에 99.6%가 진입하기 시작했다. 변호사가 허가 시스템을 고치고, 의사가 영상 분석 도구를 만들고, 뮤지션이 사운드 워크스테이션을 직접 설계한다.

질문은 단순하다. **당신은 코드를 짜는 사람인가, 문제를 해결하는 사람인가.** Claude Code 해커톤은 답을 미리 보여줬다.

```bash
# 지금 바로 Claude Code CLI를 설치하고
# 당신이 가장 잘 아는 도메인의 문제를 하나 골라서
# "이거 해결해줘"라고 말해보라.
npm install -g @anthropic-ai/claude-code
claude
```

변호사도 했다. 당신이라고 못 할 건 없다.
