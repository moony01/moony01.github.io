---
layout: post
title: "Gemini CLI 전환, Antigravity 2.0이 바꾼 개발 환경"
description: "Gemini CLI가 Antigravity CLI로 옮겨가는 이유와 6월 18일 전환 일정, 개발팀이 확인할 권한과 워크플로우 포인트를 정리했다."
date: 2026-05-23 14:02:12 +0900
categories: [ai]
tags: [GeminiCLI, Antigravity, AI코딩, 개발자도구, CLI전환]
image: gemini-cli-antigravity-migration/gemini-cli-antigravity-migration-1.png
lang: ko
published: true
---

Gemini CLI 전환은 그냥 명령어 이름이 바뀌는 일이 아니다. Google이 터미널 AI 도구를 Antigravity 2.0 안으로 접으면서, AI 코딩 에이전트가 어디서 실행되고 어떤 백엔드에 묶이는지가 더 중요해졌다.

처음 이 소식을 봤을 때는 "또 Google 제품 정리인가" 싶었다. 그런데 [공식 전환 공지](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)와 [I/O 2026 개발자 발표](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/)를 같이 읽어보니 결이 조금 달랐다. Gemini CLI는 사라지는 장난감이 아니라, Antigravity라는 더 큰 실행면에 흡수되는 중이다. 좋게 보면 통합이고, 불편하게 보면 선택지가 줄어드는 방향이다.

![Gemini CLI 전환과 Antigravity CLI 작업 흐름](/static/img/posts/gemini-cli-antigravity-migration/gemini-cli-antigravity-migration-1.png){: .wd100}

이전에 [Gemini 3.5 Flash와 AI 코딩 에이전트 전략](/ai/2026/05/21/gemini-agentic-coding-shift.html)을 보면서 모델보다 실행 환경이 중요해졌다고 썼는데, 이번 Gemini CLI 전환은 그 얘기의 꽤 현실적인 후속편처럼 보인다. 이제 질문은 "어느 모델이 더 똑똑한가"보다 "내 터미널에서 돌던 자동화가 내일도 같은 방식으로 돌 수 있는가"에 가깝다.

{% include pre-version.html %}

## Gemini CLI 전환에서 실제로 바뀌는 것

### 6월 18일이라는 날짜가 꽤 직접적이다

Google은 2026년 6월 18일부터 개인용 Google AI Pro, Ultra, 무료 Gemini Code Assist for individuals 사용자의 Gemini CLI와 Gemini Code Assist IDE 확장 요청 처리를 멈춘다고 밝혔다. Gemini Code Assist for GitHub도 같은 날짜부터 GitHub 조직 신규 설치가 막히고, 이후 요청 처리가 중단되는 흐름이다.

반대로 Standard나 Enterprise 라이선스를 쓰는 조직, 또는 Gemini Enterprise Agent Platform API 키를 쓰는 쪽은 Gemini CLI 접근이 유지된다. 여기서 이미 그림이 보인다. 완전한 폐기라기보다, 개인 개발자와 커뮤니티 사용자를 Antigravity CLI로 옮기고, 기업과 API 기반 사용자는 별도 통로로 남기는 구조다.

[TechRadar 정리](https://www.techradar.com/pro/google-is-making-gemini-cli-users-switch-to-its-new-antigravity-2-0-so-what-will-it-mean-for-you)도 이 지점을 잘 짚었다. Gemini CLI 사용자는 새 Antigravity CLI로 이동해야 하고, Google은 이 전환을 "멀티 에이전트 현실에 맞춘 단일 제품 집중"으로 설명한다. 표현은 부드럽지만, 개인 사용자가 느끼는 체감은 조금 다를 수밖에 없다. 잘 쓰던 도구가 한 달 안에 다른 제품으로 넘어가라는 얘기니까.

### 기능 이전보다 백엔드 통합이 핵심이다

Google이 강조한 건 Agent Skills, Hooks, Subagents, Extensions 같은 핵심 기능을 Antigravity CLI에 가져간다는 점이다. 이건 Gemini CLI 사용자 입장에서 최소한의 안도 포인트다. 기존에 스킬 파일, 훅, 확장, 서브에이전트 흐름을 써봤다면 이름만 바뀌고 끝나는 부분도 있을 것이다.

하지만 진짜 변화는 명령어 옵션 몇 개가 아니다. Antigravity CLI가 Antigravity 2.0 데스크톱 앱과 같은 agent harness를 공유한다는 점이다. 터미널 도구가 독립된 작은 앱이 아니라, 데스크톱 앱, SDK, Managed Agents, AI Studio, Android, Firebase 쪽과 이어지는 같은 실행 계층에 올라간다.

이건 개발자 경험을 꽤 바꾼다. 터미널에서 시작한 작업을 데스크톱 앱이나 AI Studio 쪽 컨텍스트와 이어갈 수 있다면 편하다. 반대로 그만큼 Google 쪽 런타임과 계정, 할당량, 정책에 더 많이 묶인다. 나는 이 부분이 이번 이슈의 핵심이라고 본다. 편한 통합은 대체로 운영 종속성을 같이 데려온다.

## 왜 Google은 터미널을 Antigravity로 묶나

### 단일 터미널 도구로는 멀티 에이전트가 답답해진다

Gemini CLI는 터미널에서 빠르게 질문하고, 저장소를 읽고, 간단한 작업을 시키는 데 꽤 자연스러운 형태였다. 그런데 2026년의 AI 코딩 도구는 이제 한 에이전트가 한 번 답하고 끝나는 식으로 움직이지 않는다. 여러 에이전트가 파일을 나눠 읽고, 테스트를 돌리고, 결과를 합치고, 다시 계획을 고친다.

이 흐름에서는 터미널 세션 하나가 금방 좁아진다. 긴 리팩터링을 걸어놓고 다른 조사를 동시에 하고 싶다. 한 에이전트가 테스트를 돌리는 동안 다른 에이전트는 문서를 읽었으면 한다. 실패한 작업은 백그라운드에 남겨두고, 사람은 다음 결정을 하고 싶다. 이런 요구는 기존 CLI가 아니라 작업 큐와 상태 저장, 권한 분리, 샌드박스가 있는 실행면을 요구한다.

[Google Developers Blog의 I/O 정리](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)도 이 방향을 대놓고 말한다. Antigravity 2.0과 Antigravity CLI는 여러 에이전트를 오케스트레이션하고, 터미널 샌드박싱과 credential masking, 강화된 Git 정책 같은 보호 장치를 붙이는 쪽으로 소개됐다. 이건 단순한 CLI 리브랜딩이 아니라, AI 코딩을 팀 도구처럼 다루겠다는 신호다.

### 빠른 모델보다 오래 도는 작업대가 중요해졌다

Google은 Gemini 3.5 Flash를 agentic workflow에 맞춘 빠른 엔진으로 밀고 있다. 빠른 모델은 분명 중요하다. 에이전트가 파일 읽기, 수정, 테스트, 재시도를 수십 번 반복할 때 지연 시간은 바로 비용과 피로로 이어진다.

근데 빠른 모델만으로는 부족하다. 에이전트가 오래 도는 순간 필요한 건 작업대다. 어디에 파일 상태를 저장할지, 어느 명령은 자동 실행하고 어느 명령은 승인받을지, 실패 로그를 어떻게 남길지, 결과 diff를 어떻게 회수할지 같은 문제다. Antigravity는 그 작업대를 Google 방식으로 제공하려고 한다.

이건 [Google Antigravity 2를 데스크톱 에이전트 전략으로 봤던 글](/ai/2026/05/20/google-antigravity-ai-coding.html)과도 이어진다. 그때는 데스크톱 앱, CLI, SDK가 한 묶음이라는 점이 중요해 보였다. 이번 전환으로 더 선명해졌다. Google은 Gemini CLI를 따로 키우기보다, 모든 표면을 Antigravity로 모으는 쪽을 골랐다.

{% include pre-version.html %}

## 개발자 입장에서 불편한 지점

### 오픈소스 감각과 제품 통합은 자주 부딪힌다

Gemini CLI는 커뮤니티가 붙기 쉬운 형태였다. 터미널 도구이고, GitHub에서 움직임이 보이고, 빠르게 릴리스되고, 개인 개발자가 자기 workflow에 얹기 좋았다. 공식 공지에 따르면 수백만 사용자, 10만 개 넘는 GitHub star, 6천 건 이상의 merged PR, 수백 명의 기여자가 있었다.

그래서 반발도 이해된다. [The Register 보도](https://www.theregister.com/ai-ml/2026/05/20/bye-bye-gemini-cli-google-nudges-devs-toward-antigravity/5243605)는 개발자들이 Antigravity CLI가 Gemini CLI만큼 열려 있지 않다고 느끼는 점, 그리고 사용량 제한과 기능 동등성 문제에 민감하게 반응하는 분위기를 전했다. 나도 이 부분은 꽤 중요하다고 본다.

오픈소스 도구를 중심으로 스크립트와 습관을 쌓은 사람에게 "새 통합 제품으로 오세요"는 기능 목록만으로 설득되지 않는다. 그 도구가 내 손에 남는지, 내 계정 정책에 종속되는지, 내 자동화가 어느 날 quota 화면에서 멈추는지, 이게 더 직접적인 문제다.

### 마이그레이션은 기능보다 습관이 깨지는 일이다

CLI 전환에서 사람들이 제일 싫어하는 건 대개 대단한 기능 손실이 아니다. 매일 치던 명령이 안 먹히는 것, 로그 형식이 바뀌는 것, wrapper script가 미묘하게 깨지는 것, non-interactive 모드가 다르게 동작하는 것, exit code가 바뀌는 것. 이런 작은 차이가 하루를 잡아먹는다.

특히 AI 코딩 도구는 일반 CLI보다 더 복잡하다. 프롬프트 템플릿, 권한 승인 방식, 컨텍스트 파일, 프로젝트별 지침, 모델 선택, 토큰 제한, 도구 호출 로그가 다 엮인다. 회사에서 이미 Gemini CLI를 실험 자동화나 코드 리뷰 보조로 붙여놨다면, 전환 작업은 단순 설치 변경이 아니다.

![Antigravity CLI 다중 에이전트 실행 구조](/static/img/posts/gemini-cli-antigravity-migration/gemini-cli-antigravity-migration-2.png){: .wd100}

나는 이런 전환을 볼 때 항상 작은 파일부터 본다. `README`보다 `package.json`, `.github/workflows`, `Makefile`, 사내 bootstrap script가 먼저다. 사람이 직접 치는 명령은 금방 고치지만, 자동화 속에 숨어 있는 명령은 배포 직전에 터진다.

## 팀에서 확인할 것들

### 먼저 Gemini CLI 의존성을 찾아야 한다

팀에서 Gemini CLI를 썼다면 가장 먼저 할 일은 "누가 쓰는가"보다 "어디에 박혀 있는가"를 찾는 것이다. 개인 개발자의 습관은 천천히 바꿀 수 있다. 자동화에 들어간 의존성은 날짜가 지나면 바로 실패한다.

대충 이런 식으로 시작하면 된다.

```bash
rg -n "gemini|gemini-cli|code-assist|GEMINI" .
rg -n "npx.*gemini|google.*gemini|@google/gemini" .
```

찾아야 할 곳은 넓다. shell alias, dotfiles, CI workflow, pre-commit hook, local task runner, 사내 CLI wrapper, 문서 생성 스크립트, 코드 리뷰 봇 설정까지 봐야 한다. 특히 팀에서 "AI에게 이 폴더 읽고 요약해" 같은 명령을 반복해왔다면, 그 프롬프트와 출력 형식도 같이 이관해야 한다.

### 권한 경계와 비용 경계를 다시 잡아야 한다

Antigravity CLI가 멀티 에이전트와 비동기 작업을 더 잘 다룬다면, 사용자는 더 큰 작업을 더 쉽게 던지게 된다. 이건 장점이면서 위험이다. 작은 수정 하나 맡기던 사람이 대규모 리팩터링, 의존성 교체, 문서 재작성, 테스트 생성까지 한 번에 걸 수 있다.

그래서 전환과 동시에 권한 경계를 다시 봐야 한다. repo 밖 파일 접근은 막는지, secret이 있는 경로는 차단되는지, shell 명령은 승인 기반인지, package install이나 deploy 명령은 어떤 조건에서 실행되는지 봐야 한다. AI 도구에서 "빠르다"는 말은 "실수도 빠르게 커진다"는 뜻이기도 하다.

비용도 마찬가지다. 개인 사용자는 quota에 걸리면 불편하고 끝나지만, 팀 단위에서는 예산과 업무 중단 문제가 된다. 특히 Antigravity 쪽 사용량이 데스크톱 앱, CLI, AI Studio, API와 같은 계정 체계로 묶이면 어디서 비용이 탔는지 추적하는 방법을 미리 정해야 한다.

### 대체 경로를 하나는 남겨두는 편이 낫다

나는 이런 전환에서 한 도구에 모든 workflow를 바로 싣는 걸 별로 좋아하지 않는다. Antigravity CLI가 좋아 보여도, 전환 직후에는 기능 동등성, 문서, quota, 플러그인 생태계가 안정될 시간이 필요하다. Google도 1:1 feature parity가 바로 있지는 않다고 말했다.

현실적인 접근은 이렇다. 개인 실험과 새 프로젝트는 Antigravity CLI로 옮겨본다. 기존 자동화는 Gemini CLI 의존성을 찾아 목록화한다. 위험 낮은 작업부터 포팅한다. 중요한 CI나 배포 전 workflow는 Codex, Claude Code, Copilot CLI 같은 다른 경로도 유지한다. 이건 도구 불신이 아니라 운영 보험에 가깝다.

Microsoft가 내부 Claude Code 접근을 줄이고 Copilot CLI 쪽으로 밀었다는 사례를 보면서 [AI 코딩 도구 선택권](/ai/2026/05/22/microsoft-claude-code-switch.html)을 따로 썼는데, 이번에도 같은 얘기가 반복된다. AI 코딩 도구는 이제 개인 취향만으로 고르는 앱이 아니다. 계정, 비용, 감사, 보안, 자동화 안정성이 같이 딸려온다.

## 마치며

Gemini CLI 전환은 개발자가 앞으로 터미널 AI 도구를 어떻게 봐야 하는지 꽤 잘 보여준다. 예전에는 "이 CLI가 똑똑한가"가 질문이었다. 이제는 "이 CLI가 어느 플랫폼에 묶여 있고, 내 workflow를 얼마나 오래 안정적으로 지탱할 수 있는가"가 질문이다.

Antigravity CLI가 성공하면 Google은 모델, 데스크톱 앱, 터미널, SDK, Managed Agents, AI Studio를 한 줄로 묶는 강한 개발자 플랫폼을 갖게 된다. 그건 분명 매력적이다. 특히 여러 에이전트를 백그라운드에서 굴리고, 프로젝트 상태를 이어가고, Android나 Firebase 같은 Google 생태계와 붙이는 흐름은 실제 생산성을 만들 수 있다.

그런데 개발자 입장에서 남는 찜찜함도 지우기 어렵다. 커뮤니티가 키운 CLI가 더 닫힌 제품 표면으로 옮겨가는 느낌, 개인 사용자가 먼저 전환 압박을 받는 구조, quota와 기능 차이가 작업 흐름을 흔들 수 있다는 불안감. 이건 단순한 감정 문제가 아니다. 자동화 도구는 한번 팀 안에 들어오면 인프라가 된다.

그래서 지금 할 일은 편을 가르는 게 아니라 inventory를 잡는 쪽이다. Gemini CLI를 어디서 쓰는지 확인하고, Antigravity CLI로 옮길 수 있는 부분과 당장 남겨둘 부분을 나누고, 권한과 비용 경계를 새로 그어야 한다. 6월 18일은 멀어 보이지만, 자동화 하나 깨지는 데는 하루면 충분하다.
