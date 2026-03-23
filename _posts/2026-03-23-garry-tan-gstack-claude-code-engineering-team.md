---
layout: post
title: "YC CEO가 공개한 AI 개발팀 gstack — 혼자 60만 줄 짰다는 주장에 개발자가 둘로 갈렸다"
date: 2026-03-23 10:00:00 +0900
categories: [ai]
tags: [ai, claude-code, gstack, YC, 개발자, 에이전트, 오픈소스]
image: garry-tan-gstack-claude-code-engineering-team/garry-tan-gstack-claude-code-engineering-team-1.png
published: true
---

Y Combinator의 CEO Garry Tan이 지난 3월 12일, 자신의 Claude Code 설정 파일을 통째로 오픈소스로 공개했다. 이름은 **gstack**. 그가 주장하는 내용은 간단하면서도 자극적이다. "지난 60일 동안 혼자서 60만 줄 이상의 프로덕션 코드를 작성했다." 그리고 그 과정에서 자신이 겪은 상태를 이렇게 표현했다. "사이버 정신병(cyber psychosis)." AI 코딩 도구에 너무 깊이 빠져든 나머지 현실 감각이 흐릿해지는 경험을 했다는 것이다.

커뮤니티 반응은 즉각적이었다. TechCrunch는 "수천 명이 이 설정을 시도하고 있으며, 모두가 의견을 가지고 있다"고 썼다. Claude, ChatGPT, Gemini까지 이 논쟁에 끌려들어왔고, GeekNews에서는 오늘 단 하루만에 1위를 차지했다. 환호하는 쪽과 냉소하는 쪽이 정확히 반반으로 갈렸다.

![gstack 히어로 이미지](/static/img/posts/garry-tan-gstack-claude-code-engineering-team/garry-tan-gstack-claude-code-engineering-team-1.png){: .wd100}

{% include pre-version.html %}

## gstack이란 정확히 무엇인가

gstack은 Claude Code를 위한 **스킬 팩(skill pack)**이다. 단순한 설정 파일이 아니다. Claude Code가 단순한 AI 어시스턴트에서 벗어나, 역할이 명확히 분리된 **가상 엔지니어링 팀**처럼 동작하도록 만들어주는 28개의 전문화된 워크플로우 모음이다.

설치는 놀랍도록 간단하다:

```bash
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

팀 전체 저장소에 적용하려면:

```bash
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack
cd .claude/skills/gstack && ./setup
```

MIT 라이선스. 완전 무료. 백그라운드 프로세스 없음. 모든 설정은 `.claude/` 디렉토리 안에서 마크다운 파일로 관리된다.

## 28개 스킬, 6개 역할

gstack의 핵심은 Claude Code에 **역할 분리**를 도입한다는 것이다. 각 `/command`를 실행하면 Claude는 해당 역할의 전문가처럼 행동한다.

| 명령어 | 역할 | 하는 일 |
|--------|------|---------|
| `/office-hours` | YC Office Hours | 제품 아이디어 검증, 숨겨진 기능 발굴 |
| `/plan-ceo-review` | CEO/창업자 | 스코프 결정 — 확장할지, 유지할지, 축소할지 |
| `/plan-eng-review` | 엔지니어링 매니저 | 아키텍처, 데이터 흐름, 테스트 계획 |
| `/plan-design-review` | 시니어 디자이너 | 디자인 품질 평가, AI 슬롭(AI가 만든 평범한 결과물) 탐지 |
| `/review` | Staff Engineer | 버그 찾기, 자동 수정, 완성도 점검 |
| `/qa` | QA 리드 | 실제 Chromium 브라우저로 테스트, 버그 수정, 회귀 테스트 생성 |
| `/ship` | 릴리스 엔지니어 | 테스트 실행, PR 자동 생성 |
| `/land-and-deploy` | 릴리스 엔지니어 | 배포 및 프로덕션 상태 확인 |
| `/cso` | 보안 책임자 | OWASP + STRIDE 자동 보안 감사 |

그 외에도 `/retro`(주간 성과 분석), `/canary`(배포 후 모니터링), `/benchmark`(성능 비교), `/investigate`(근본 원인 분석), `/document-release`(문서 자동 업데이트) 등이 있다.

{% include pre-version.html %}

## 실제 스프린트 워크플로우

Garry Tan이 공개한 실제 사용 흐름을 보면 왜 이게 화제가 됐는지 이해가 된다:

```
사용자: "캘린더 기반 일일 브리핑 앱을 만들고 싶습니다"
사용자: /office-hours

Claude: [고통점 분석] → 실제로 필요한 건 "개인 비서 AI"임을 파악
        [5가지 숨겨진 기능 추출]
        [3가지 구현 방안 제시]
        → 설계 문서 자동 생성

사용자: /plan-ceo-review → [스코프 검토 완료]
사용자: /plan-eng-review → [아키텍처 다이어그램, 테스트 매트릭스 생성]
사용자: 승인

Claude: [2,400줄을 11개 파일에 걸쳐 8분 내 작성]

사용자: /review → [2개 이슈 자동 수정, 1개 경합 조건 발견]
사용자: /qa https://staging.myapp.com → [실제 브라우저로 버그 발견 및 수정]
사용자: /ship → [PR 생성, 테스트 42→51개로 증가]
```

핵심 철학은 **Think → Plan → Build → Review → Test → Ship → Reflect** 의 순환이다. 각 단계가 다음 단계에 컨텍스트를 넘겨주기 때문에 누락이 없다. 단독으로 ChatGPT나 Claude에게 "이 기능 만들어줘"라고 하는 것과 근본적으로 다른 접근이다.

![gstack 워크플로우 일러스트](/static/img/posts/garry-tan-gstack-claude-code-engineering-team/garry-tan-gstack-claude-code-engineering-team-2.png){: .wd100}

## 커뮤니티가 둘로 갈린 이유

찬성하는 쪽의 논리는 명확하다. "실제로 써봤더니 된다." 특히 솔로 창업자나 소규모 팀에서 QA 엔지니어나 보안 감사를 따로 고용할 여력이 없을 때, `/qa`와 `/cso`가 완전한 대체재가 된다는 경험담이 쏟아졌다. Reddit의 r/aiagents에서는 "각 명령이 Claude에게 특정 역할을 부여한다 — '편집증적인 코드 리뷰어', '릴리스 엔지니어', 'QA 리드' 등 — 좋다, 획기적이진 않지만 분명히 좋다"는 평가가 대표적이다.

반대하는 쪽의 논리도 설득력 있다. "결국 프롬프트 엔지니어링을 복잡하게 포장한 것에 불과하다." gstack이 하는 일의 핵심은 Claude Code에 역할별 시스템 프롬프트를 주입하는 것이다. 숙련된 개발자라면 직접 만들 수 있는 수준이고, "60만 줄"이라는 수치도 검증이 불가능하다는 지적이 나왔다. AI가 생성한 보일러플레이트 코드를 모두 포함한 숫자라는 의심도 제기됐다.

더 본질적인 논쟁도 있다. 이 도구는 결국 **개발팀을 더 생산적으로 만드는가, 아니면 개발팀 자체를 불필요하게 만드는가**. Garry Tan 본인은 이 도구의 목적을 "한 명의 빌더가 20명 팀처럼 작동하는 것"이라고 명시했다. YC 포트폴리오 스타트업들이 이 방식을 채택한다면, 초기 채용 인원은 줄어들 수밖에 없다.

## 개발자에게 주는 진짜 시사점

솔직히 말하면, gstack 자체가 혁명적인 기술은 아니다. Claude Code의 기능을 구조화된 방식으로 활용하는 레이어다. 하지만 **YC CEO가 직접 사용하고, 공개하고, 바이럴이 됐다**는 사실이 중요하다. 이건 기술 자체가 아니라 **AI 코딩 도구의 방향성에 대한 신호**다.

앞으로 AI 코딩 도구는 단순한 자동완성이나 코드 생성을 넘어서, **역할 기반의 멀티에이전트 오케스트레이션**으로 진화할 것이다. gstack이 이 방향성을 가장 명확하게 보여주는 현재의 실험체다.

지금 당장 도입하지 않더라도, gstack의 README를 한 번 읽어볼 가치는 충분하다. 각 스킬이 어떤 문제를 해결하려 하는지, 어떤 역할 분리가 왜 필요한지 — 그 사고 방식 자체가 앞으로 AI와 협업하는 방식을 이해하는 데 도움이 된다.

코드 한 줄 없이 커뮤니티를 달군 README 하나. 이게 2026년 개발자 커뮤니티의 현주소다.

## 마치며

gstack이 여러분의 개발 워크플로우를 바꿀지는 직접 써봐야 안다. Garry Tan의 "60만 줄" 주장이 사실이든 과장이든, 이 도구가 제시하는 **역할 분리 기반의 AI 협업 프레임워크**는 진지하게 고민할 가치가 있다.

설치는 30초. MIT 라이선스. 잃을 게 없다.

- GitHub: [github.com/garrytan/gstack](https://github.com/garrytan/gstack)
- 공식 사이트: [gstacks.org](https://gstacks.org/)
