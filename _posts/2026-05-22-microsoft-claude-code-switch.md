---
layout: post
title: "Microsoft의 Claude Code 회수가 보여준 AI 코딩 도구 선택권"
description: "Microsoft의 Claude Code 라이선스 회수와 Copilot CLI 전환이 AI 코딩 도구 선택권, 비용, 보안 통제를 어떻게 바꾸는지 정리했다."
date: 2026-05-22 15:02:42 +0900
categories: [ai]
tags: [ClaudeCode, CopilotCLI, AI코딩도구, 개발자도구, 도구선택권]
image: microsoft-claude-code-switch/microsoft-claude-code-switch-1.webp
lang: ko
published: true
---

Claude Code 라이선스 회수 이야기는 그냥 사내 도구 정리 뉴스로 보기엔 꽤 묘하다. Microsoft가 내부 개발자들에게 열어뒀던 Claude Code 접근을 줄이고, GitHub Copilot CLI 쪽으로 옮기게 한다는 보도가 나왔다.

처음엔 "Microsoft니까 자기 제품을 밀겠지" 정도로 봤다. 그런데 [The Verge 보도](https://www.theverge.com/tech/930447/microsoft-claude-code-discontinued-notepad)와 [TechRadar 정리](https://www.techradar.com/pro/microsoft-may-discontinue-claude-code-internally-as-it-looks-to-push-users-towards-github-copilot)를 같이 읽어보면, 이건 단순한 제품 편애보다 조금 더 현실적인 문제에 가깝다. AI 코딩 도구가 개인 생산성 앱에서 팀 운영비, 보안 정책, 플랫폼 전략의 한가운데로 들어왔다는 얘기다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/microsoft-claude-code-switch/microsoft-claude-code-switch-1-400.webp 400w,
            /static/img/posts/microsoft-claude-code-switch/microsoft-claude-code-switch-1-800.webp 800w,
            /static/img/posts/microsoft-claude-code-switch/microsoft-claude-code-switch-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/microsoft-claude-code-switch/microsoft-claude-code-switch-1.webp"
    alt="Claude Code 회수와 Copilot CLI 전환을 비교한 AI 코딩 도구 흐름"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

개발자 입장에서는 이 지점이 신경 쓰인다. 팀에서 가장 잘 먹히는 도구와 회사가 통제하기 쉬운 도구가 다를 때, 누구의 기준이 이기느냐. 이제 그 질문이 꽤 비싸졌다.

{% include pre-version.html %}

## Claude Code 라이선스 회수에서 실제로 일어난 일

### 6월 30일이라는 날짜가 그냥 보이지 않는다

보도에 따르면 Microsoft의 Experiences + Devices 조직은 2026년 6월 말까지 Claude Code 사용을 줄이고 GitHub Copilot CLI로 이동하라는 안내를 받았다. Windows, Microsoft 365, Outlook, Teams, Surface 같은 제품을 다루는 조직이라 개발자 수와 코드베이스 규모가 작지 않다.

이 날짜가 눈에 걸리는 이유는 Microsoft의 회계연도 마감일과 맞물리기 때문이다. 꼭 비용만의 문제라고 단정할 수는 없다. 그래도 대규모 라이선스가 토큰 기반 사용량과 엮이면 예산이 빠르게 흔들릴 수 있다. AI 코딩 도구는 월 구독료만 보면 싸 보이지만, 실제 팀 단위에서는 "누가 얼마나 오래 에이전트를 돌렸는지"가 비용표를 바꾼다.

[Windows Central](https://www.windowscentral.com/microsoft/microsoft-cancels-claude-code-licenses-shifting-developers-to-github-copilot-cli-a-move-likely-driven-by-financial-motives)은 이 전환을 비용과 내부 제품 전략이 섞인 움직임으로 봤다. 나도 그 해석이 꽤 그럴듯하다고 본다. 개발자가 좋아하는 도구를 끊는 결정은 내부 반발이 생기기 쉽다. 그걸 감수한다는 건 단순 취향보다 큰 이유가 있다는 뜻이다.

### Claude가 사라지는 게 아니라, 통제면이 바뀐다

여기서 헷갈리면 안 되는 부분이 있다. Microsoft가 Anthropic 모델 자체를 버린다는 얘기는 아니다. [Microsoft Learn 문서](https://learn.microsoft.com/en-us/microsoft-365/copilot/connect-to-ai-subprocessor)를 보면 Microsoft 365 Copilot 쪽에서는 Anthropic 모델을 Microsoft의 하위 처리자 체계 안으로 넣어 제공하는 흐름이 이미 잡혀 있다.

그러니까 핵심은 "Claude냐 아니냐"보다 "어느 계정, 어느 로그, 어느 정책, 어느 비용 항목 아래에서 쓰느냐"에 있다. Claude Code를 각자 직접 쓰는 것과 Copilot CLI 안에서 Anthropic 모델을 선택하는 것은 사용자 경험이 비슷해 보여도 운영 관점에서는 완전히 다르다.

이건 회사 입장에서 꽤 큰 차이다. 보안팀은 중앙 정책을 보고 싶어 한다. 재무팀은 예측 가능한 예산을 원한다. 플랫폼팀은 GitHub repo, 권한, 감사 로그, 사내 표준 workflow와 맞는 도구를 선호한다. 개발자는 그냥 잘 고치고, 잘 읽고, 덜 귀찮은 도구를 원한다. 이 네 가지 욕망이 한 화면에서 부딪히는 게 지금 AI 코딩 도구 시장이다.

## 이건 제품 비교가 아니라 운영 방식 비교다

### 터미널 에이전트는 이미 로컬 운영 권한을 갖고 있다

Claude Code와 Copilot CLI는 둘 다 터미널에서 일하는 AI 코딩 도구다. [Claude Code 문서](https://code.claude.com/docs/en/cli-usage)는 CLI 플래그, 작업 디렉터리 접근, 에이전트 설정 같은 운영 기능을 다룬다. [GitHub Docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-getting-started)는 Copilot CLI를 터미널 네이티브 AI 코딩 도우미로 설명하고, GitHub workflow 통합과 자율 작업을 강조한다.

이 말은 곧 도구가 파일을 읽고, 명령을 실행하고, 테스트를 돌리고, 때로는 코드를 수정한다는 뜻이다. 채팅창에서 "이 함수 설명해줘"라고 묻는 수준이 아니다. 개발자 머신과 저장소 권한을 실제로 움직이는 도구다.

그래서 팀에서 봐야 할 질문도 달라진다. 어느 모델이 벤치마크에서 2% 더 높은가보다, 이 도구가 실패했을 때 로그가 남는지, 권한 요청이 잘게 쪼개지는지, 조직 정책으로 막을 수 있는지, 비용이 프로젝트 단위로 보이는지가 더 중요해진다.

### 개발자 선호와 조직 통제가 계속 어긋난다

나는 이 갈등이 앞으로 더 자주 나올 거라고 본다. 개발자는 성능과 감각에 민감하다. 에이전트가 코드를 읽는 속도, 대화가 끊기지 않는 느낌, 수정 diff의 품질, 테스트 실패를 물고 늘어지는 방식 같은 것들이 실제 업무 시간을 바꾼다. 그래서 한 번 손에 붙은 도구를 바꾸는 건 생각보다 큰 일이다.

반대로 조직은 표준화의 유혹을 버리기 어렵다. 계정 관리가 한 곳에 있고, 비용이 한 계약으로 묶이고, 감사 로그가 같은 콘솔에 남고, 데이터 처리 계약이 정리된 도구가 편하다. 특히 엔터프라이즈에서는 "개발자가 선호한다"만으로 외부 도구를 대규모로 열어두기 어렵다.

이전에도 [Gemini 3.5 Flash와 AI 코딩 에이전트 전략](/ai/2026/05/21/gemini-agentic-coding-shift.html)을 보면서 비슷한 얘기를 했다. 모델 경쟁보다 실행면이 중요해지고 있다. 이번 Microsoft 사례는 그 실행면이 제품 UX만이 아니라 구매, 보안, 감사, 조직 정치까지 포함한다는 걸 보여준다.

{% include pre-version.html %}

Microsoft 사례를 보고 나면, 팀에서 AI 코딩 도구를 고르는 기준도 조금 차갑게 바꿔야 한다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/microsoft-claude-code-switch/microsoft-claude-code-switch-2-400.webp 400w,
            /static/img/posts/microsoft-claude-code-switch/microsoft-claude-code-switch-2-800.webp 800w,
            /static/img/posts/microsoft-claude-code-switch/microsoft-claude-code-switch-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/microsoft-claude-code-switch/microsoft-claude-code-switch-2.webp"
    alt="AI 코딩 도구 선택권이 비용과 보안 통제로 나뉘는 구조"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 팀이 봐야 할 AI 코딩 도구 선택 기준

### 첫 번째는 성능이 아니라 권한 경계다

도구가 좋다는 말은 너무 넓다. 실제 팀 기준으로는 권한 경계가 먼저다. 에이전트가 repo 밖을 읽을 수 있는지, shell 명령을 어디까지 실행할 수 있는지, secret 파일을 열었을 때 막는 장치가 있는지, 승인 없이 패키지를 설치하거나 배포 명령을 실행할 수 있는지 봐야 한다.

GitHub Copilot CLI 문서에는 trust directory, tool approval, autopilot 같은 흐름이 나온다. Claude Code도 설정과 플래그로 작업 범위와 에이전트 동작을 조정한다. 어느 쪽이든 "좋은 모델"만 보고 켜면 안 된다. 팀 정책은 모델보다 바깥에 있어야 한다.

내가 팀에 도입한다면 처음부터 전면 허용은 안 할 것 같다. 우선 read-only 분석, 테스트 실행, 작은 리팩터링, PR 설명 작성처럼 위험이 낮은 workflow를 분리한다. 그 다음에 권한 요청 로그를 보면서 어떤 작업에서 사람이 자꾸 승인 버튼을 누르게 되는지 확인한다. 이 데이터가 있어야 정책이 현실적으로 바뀐다.

### 두 번째는 비용이 아니라 비용의 예측 가능성이다

AI 코딩 도구 비용은 단순히 비싸다, 싸다로 끝나지 않는다. 더 골치 아픈 건 예측 가능성이다. 같은 버그 수정이라도 에이전트가 파일을 얼마나 많이 읽는지, 테스트를 몇 번 돌리는지, 컨텍스트를 얼마나 길게 유지하는지에 따라 비용이 달라진다.

개인 개발자는 "오늘 좀 많이 썼네" 정도로 넘길 수 있다. 하지만 수천 명이 동시에 쓰면 얘기가 달라진다. 재무팀은 평균 토큰보다 피크를 본다. 플랫폼팀은 특정 프로젝트가 왜 갑자기 비용을 태웠는지 설명해야 한다. 그러면 자연스럽게 중앙화된 도구, 프로젝트별 예산, 사용량 리포트가 있는 쪽으로 기운다.

이 지점에서 Microsoft가 Copilot CLI 쪽으로 옮기려는 판단은 이해된다. 자기들이 직접 GitHub와 맞춰 shape할 수 있는 제품이면 비용 모델, repo 정책, 보안 기대치를 더 빨리 반영할 수 있다. 개발자에게는 답답한 결정일 수 있지만, 조직 운영자에게는 꽤 유혹적인 카드다.

## 당장 바꿀 수 있는 체크포인트

### 사내 AI 코딩 도구 목록부터 현실적으로 적어보자

이런 뉴스가 나올 때마다 느끼는 건, 많은 팀이 실제 사용 중인 AI 코딩 도구 목록을 정확히 모른다는 점이다. 공식 구매 도구는 안다. 하지만 개인 구독으로 쓰는 Claude Code, Cursor, Codex, Copilot, OpenCode, 사내 wrapper, 브라우저 ChatGPT까지 합치면 그림이 흐려진다.

거창한 거버넌스 문서부터 만들 필요는 없다. 우선 현재 repo에서 어떤 CLI와 설정 파일이 보이는지 확인하는 정도로 시작할 수 있다.

```bash
rg -n "claude|copilot|cursor|codex|opencode|anthropic|openai" \
  .github package.json pnpm-lock.yaml yarn.lock package-lock.json \
  .claude .cursor .copilot 2>/dev/null
```

이 명령 하나로 모든 걸 찾을 수는 없다. 그래도 적어도 "우리 코드베이스에 흔적이 있는가"는 볼 수 있다. 여기서 바로 금지부터 걸기보다, 어떤 작업에 쓰였고 어떤 권한이 필요한지 대화하는 편이 낫다. 현업 사용 패턴을 모르는 정책은 대체로 우회된다.

### 표준 도구를 정하더라도 탈출구는 남겨야 한다

나는 조직이 표준 AI 코딩 도구를 정하는 것 자체는 반대하지 않는다. 오히려 필요하다고 본다. 문제는 표준 도구가 모든 작업에 항상 최고일 거라고 믿는 순간이다.

특정 언어, 대규모 refactor, 테스트 생성, 보안 리뷰, 레거시 코드 읽기처럼 작업 성격마다 잘 맞는 도구가 다를 수 있다. 그러면 팀은 "기본 도구"와 "예외 승인 도구"를 나눠야 한다. 예외를 막지 말고, 기록되게 만들어야 한다. 그래야 나중에 정말 표준을 바꿔야 하는지 판단할 수 있다.

Microsoft 사례도 결국 이 질문으로 돌아온다. Copilot CLI가 조직 표준이 될 수는 있다. 하지만 개발자가 Claude Code를 선호했던 이유가 실제 성능 차이였다면, 그 피드백은 사라지면 안 된다. 사라지는 순간 표준화는 비용 절감이 아니라 개발 경험 후퇴가 된다.

## 마치며

### 선택권을 비용표에만 맡기면 안 된다

이번 Claude Code 회수 뉴스에서 내가 제일 크게 본 건 AI 코딩 도구 선택권의 위치 변화다. 예전에는 개발자가 편한 도구를 고르는 문제였다. 이제는 회사의 모델 공급망, 데이터 처리 계약, 로그 정책, repo 권한, 예산 관리가 같이 따라붙는다.

그렇다고 개발자 선호를 가볍게 보면 안 된다. AI 코딩 도구는 손에 붙는 정도가 생산성에 바로 영향을 준다. 느리고 답답한 표준 도구를 강제로 밀면 사람들은 몰래 다른 도구를 쓴다. 보안팀이 제일 싫어하는 그림이다.

내 기준의 결론은 단순하다. 팀은 기본 도구를 정하되, 실제 작업 로그와 개발자 피드백으로 계속 갱신해야 한다. 비용과 보안은 중앙에서 잡고, 성능과 사용감은 현장에서 검증해야 한다. 둘 중 하나만 보면 다음 도구 전환도 똑같이 시끄러울 가능성이 높다.
