---
layout: post
title: "VS Code 웹뷰 버그가 GitHub 토큰 탈취로 이어진 이유"
description: "VS Code 웹뷰 버그가 github.dev에서 GitHub 토큰 탈취로 이어질 수 있었던 과정을 정리하고, 개발자가 확인할 보안 습관을 짚어본다."
date: 2026-06-03 21:22:00 +0900
categories: [security]
tags: [VSCode웹뷰, GitHub토큰탈취, githubdev, 개발자보안, 확장보안]
image: vscode-github-token-steal/vscode-github-token-steal-1.png
lang: ko
published: true
---

VS Code 웹뷰 버그 얘기를 처음 봤을 때는 그냥 또 하나의 XSS 리포트인가 싶었다. 그런데 Ammar Askar가 공개한 [1-Click GitHub Token Stealing via a VSCode Bug](https://blog.ammaraskar.com/github-token-stealing/)를 읽어보니 결이 조금 달랐다. 이건 브라우저 안에서 돌아가는 github.dev, VS Code 웹뷰, notebook preview, 확장 추천, 키보드 단축키가 한 줄로 이어지면서 GitHub 토큰 탈취까지 갈 수 있었던 사례다.

Hacker News에서도 바로 크게 올라왔다. Algolia 기준으로 2026년 6월 2일 등록된 글이 수백 포인트와 댓글을 모았고, Microsoft VS Code 이슈도 같은 날 열렸다가 빠르게 닫혔다. 숫자보다 더 신경 쓰인 건 공격면이다. 저장소 링크 하나를 열어보는 행동이, 웹 IDE 안에서는 생각보다 많은 권한 있는 동작과 붙어 있었다.

이전에 다뤘던 [GitHub Actions 공격과 CI 비밀 노출](/security/2026/05/27/megalodon-github-actions-attack.html)도 결국 개발자가 매일 쓰는 자동화가 공격 경로가 된다는 얘기였다. 이번에는 CI가 아니라 에디터다. 그래서 더 찝찝하다. CI는 그래도 운영 시스템처럼 대하지만, 에디터 미리보기나 notebook 렌더링은 훨씬 가볍게 누른다.

{% include pre-version.html %}

![VS Code 웹뷰 버그와 GitHub 토큰 탈취 흐름을 보여주는 밝은 보안 다이어그램](/static/img/posts/vscode-github-token-steal/vscode-github-token-steal-1.png){: .wd100}

## 핵심은 웹뷰가 키보드 단축키를 대신 눌렀다는 점이다

### 웹뷰는 그냥 iframe이 아니었다

VS Code의 웹뷰는 확장이 HTML을 렌더링할 때 쓰는 공간이다. 문서상으로도 웹뷰는 강력하지만 조심해서 써야 하는 기능으로 설명된다. 격리된 영역에서 콘텐츠를 보여주지만, 그래도 메인 워크벤치와 메시지를 주고받는다. 이 연결이 없으면 preview 안에서 키보드 입력, focus 이동, 명령 호출 같은 UX가 자연스럽지 않다.

문제는 그 연결이 너무 편했다는 데 있다. 공개된 VS Code 이슈 319593의 제목은 꽤 직설적이다. `Webviews can trigger arbitrary keyboard shortcuts in the main workbench`. 웹뷰 쪽에서 `did-keydown` 이벤트를 보내면 메인 워크벤치의 단축키 처리가 반응할 수 있었다는 얘기다. 이게 정상 UX를 위한 장치였지만, 악성 웹뷰나 XSS가 있는 웹뷰에서는 다른 의미가 된다.

개발자 입장에서 제일 무서운 건 이 부분이다. 보안 사고가 꼭 "사용자가 악성 확장을 설치했다"에서 시작하지 않아도 된다. 문서 미리보기, notebook, markdown preview처럼 원래 열어볼 만한 파일이 공격 흐름의 첫 단추가 될 수 있다. 특히 github.dev는 저장소 URL에서 바로 웹 기반 VS Code를 열 수 있으니 진입 장벽이 낮다.

### 단축키는 권한 있는 UI 행동으로 바뀐다

키보드 단축키 자체는 별것 아닌 것처럼 보인다. 하지만 VS Code에서 단축키는 명령 팔레트, 터미널, focus 이동, 붙여넣기, 확장 설치 같은 권한 있는 동작과 연결된다. 리포트에서 설명한 흐름도 이 감각을 찌른다. 웹뷰가 단축키 이벤트를 만들어내고, focus를 이동시키고, 터미널 관련 명령이나 붙여넣기 같은 동작을 이어붙이면 사용자가 직접 누른 것처럼 보이는 UI 흐름이 만들어질 수 있다.

이건 브라우저 보안에서 흔히 말하는 `postMessage` 문제와도 닮았다. MDN 문서가 계속 강조하듯 메시지를 받을 때 origin과 payload를 확인하지 않으면, 격리된 창 사이의 통신이 공격면이 된다. VS Code 웹뷰도 완전히 같은 구조는 아니지만, "격리된 영역이 메인 앱에 이벤트를 전달한다"는 점에서는 비슷한 긴장감이 있다.

그래서 이번 버그는 단순한 markdown preview 문제가 아니라, 웹 기반 개발 환경에서 UI automation이 어디까지 허용되어야 하는지 묻는 사건으로 봐야 한다. 개발 도구는 생산성을 위해 단축키와 자동화를 많이 열어둔다. 그런데 그 자동화가 신뢰 경계를 넘으면 공격자가 손가락을 대신 움직이는 것과 비슷해진다.

## github.dev라서 체감 위험이 더 컸다

### 링크 하나로 웹 IDE가 열린다

GitHub 문서에 따르면 github.dev는 저장소에서 `.` 키를 누르거나 URL을 바꿔서 바로 여는 웹 기반 에디터다. Codespaces처럼 완전한 cloud dev environment는 아니지만, 코드 읽기와 가벼운 수정에는 충분하다. 나도 낯선 저장소를 빠르게 볼 때 이런 웹 IDE를 자주 쓴다. 로컬 clone보다 빠르고, 브라우저 탭 안에서 끝난다는 느낌이 있으니까 경계심도 낮아진다.

이번 PoC가 불편한 이유도 그 지점이다. 사용자가 악성 저장소를 로컬에 clone하고 `npm install`을 돌려야 하는 게 아니라, github.dev로 열어보는 행동이 출발점이 될 수 있었다. 여기에 notebook preview나 markdown preview처럼 "내용을 확인하려고 누르는" UI가 붙으면 더 자연스럽다. 공격자는 사용자가 의심하기 전에 개발 도구의 기본 행동을 이용한다.

물론 이 글을 쓰는 시점에 공개 이슈는 닫혀 있고, 세부 재현 방식은 시간이 지나며 바뀔 수 있다. 그래도 핵심 교훈은 남는다. 웹 IDE는 브라우저 안에 있으니 안전하다는 식으로 보면 안 된다. 그 안에는 GitHub 세션, repo 권한, 확장 추천, token 접근 흐름이 같이 얽혀 있다.

### 확장 추천과 로컬 워크스페이스 확장이 겹치면 더 애매해진다

VS Code는 워크스페이스마다 추천 확장을 제안할 수 있고, 1.89 릴리스에서는 `.vscode/extensions`에 있는 local workspace extension 흐름도 소개됐다. 기능 자체는 유용하다. 팀 프로젝트에서 필요한 확장을 같이 안내하면 onboarding이 쉬워진다. 문제는 공격자가 저장소를 UX 채널로 쓸 수 있다는 점이다.

Ammar의 글은 이 흐름을 이용해 사용자가 확장을 설치하도록 유도하는 가능성도 짚는다. VS Code 문서는 확장 publisher trust와 marketplace protection을 설명하지만, 실제 사용자는 바쁜 상태에서 추천 확장 알림을 깊게 검토하지 않는다. 저장소가 그럴듯하고 README가 자연스러우면 "이 프로젝트 보려면 필요한가 보다" 하고 누르기 쉽다.

여기서 토큰 탈취가 무서운 이유는 GitHub 토큰이 단순 로그인 쿠키가 아니기 때문이다. repo 읽기, 수정, workflow 접근, package publish 같은 후속 권한으로 이어질 수 있다. 권한 범위와 세션 상태에 따라 피해는 달라지겠지만, 개발자 계정 하나가 털리면 개인 프로젝트보다 조직 저장소가 더 문제다.

{% include pre-version.html %}

## 내가 바로 바꾸고 싶은 습관

### 낯선 저장소는 웹 IDE에서도 격리해서 본다

예전에는 "로컬에서 실행하지 않으면 괜찮겠지"라는 기준이 꽤 통했다. 이제는 그 기준이 조금 부족하다. 낯선 저장소를 github.dev, vscode.dev, Codespaces류 환경에서 열 때도 똑같이 격리된 계정이나 권한 낮은 환경을 쓰는 게 낫다. 특히 보안 리서치 PoC, 크랙 도구, 인기 급상승 repo, 자동 생성된 AI 프로젝트는 더 조심해야 한다.

내 기준으로는 세 가지를 먼저 본다. 첫째, `.vscode/` 안에 추천 확장, tasks, settings, extension 관련 파일이 있는지 본다. 둘째, notebook이나 markdown preview를 바로 실행하지 않고 원문을 먼저 본다. 셋째, 확장 설치 prompt가 뜨면 publisher와 코드를 확인하기 전까지 누르지 않는다. 귀찮지만 이 정도는 이제 개발자 기본 위생에 가까워졌다.

```bash
# 낯선 repo를 열었을 때 먼저 볼 만한 경로
.vscode/
*.ipynb
README.md
package.json
.github/workflows/
```

이 명령 목록이 완벽한 방어는 아니다. 그래도 공격자가 개발 도구의 UX를 이용하는지 확인하는 첫 필터로는 쓸 만하다. 특히 `.vscode/extensions`나 workspace recommendation은 이제 그냥 편의 기능으로만 보면 안 된다.

### 확장 설치는 package 설치처럼 봐야 한다

개발자들은 이제 `npm install`이나 `curl | bash`는 어느 정도 의심한다. 그런데 VS Code 확장은 상대적으로 가볍게 본다. 버튼 한 번 누르면 설치되고, UI도 공식 marketplace 느낌이라 덜 위험해 보인다. 하지만 확장은 에디터 안에서 파일을 읽고, 명령을 실행하고, Git 상태를 보고, 터미널과 상호작용할 수 있다. 사실상 개발 환경 안쪽에서 도는 프로그램이다.

그래서 확장 설치 기준도 package 설치와 비슷하게 잡아야 한다. publisher가 누구인지, 다운로드 수와 최근 업데이트가 자연스러운지, 권한과 기능 설명이 일치하는지, 저장소 링크가 있는지, 조직에서 허용한 확장인지 봐야 한다. 회사라면 allowlist를 두는 것도 현실적인 선택이다. 모든 확장을 막자는 얘기가 아니라, repo가 추천한다고 바로 설치하지 말자는 얘기다.

VS Code의 publisher trust 시스템은 도움이 된다. 하지만 마지막 클릭은 결국 사용자에게 온다. 보안 기능은 사용자가 속도를 줄일 때 제 역할을 한다. 바쁠 때 무심코 누르는 버튼이 제일 비싸다.

![github.dev와 VS Code 확장 보안을 점검하는 개발자 워크플로우 일러스트](/static/img/posts/vscode-github-token-steal/vscode-github-token-steal-2.png){: .wd100}

## 이번 사건이 남긴 더 큰 질문

### 웹 기반 개발 환경은 계속 넓어진다

OpenAI Codex, Claude Code, Copilot, Codespaces, github.dev, 브라우저 기반 에디터가 전부 같은 방향으로 가고 있다. 개발 환경은 점점 브라우저와 agent workflow 안으로 들어간다. 편하다. 나도 이 방향이 맞다고 본다. 다만 편해질수록 신뢰 경계가 흐려진다.

로컬 IDE에서는 "내 PC 안에서 내가 실행한다"는 감각이 있다. 웹 IDE에서는 "브라우저 탭 하나"처럼 느껴진다. 그런데 실제로는 GitHub 계정, cloud workspace, extension runtime, preview renderer, agent permission이 한꺼번에 붙는다. 공격자는 이 경계 흐림을 좋아한다. 사용자가 위험하다고 느끼기 전에 이미 권한 있는 동작을 만들 수 있기 때문이다.

이번 VS Code 웹뷰 버그는 빠르게 보고되고 처리된 편이다. 그 자체는 좋은 신호다. 하지만 비슷한 종류의 버그는 계속 나올 가능성이 높다. 기능이 복잡하고, UX가 촘촘하고, 개발 도구가 외부 콘텐츠를 많이 렌더링하기 때문이다. 웹뷰, notebook, preview, extension recommendation은 전부 유용하지만, 동시에 공격자가 이야기를 만들기 좋은 표면이다.

### 보안 체크는 도구보다 습관에 더 가깝다

내가 이 사건에서 가져가는 결론은 간단하다. 개발 도구를 신뢰하되, 저장소가 도구를 조종하게 두지는 말자는 것. 낯선 repo가 추천하는 확장, 자동으로 열리는 preview, 편의를 위해 이어진 단축키 흐름을 한 번씩 끊어야 한다. 클릭 한 번을 줄이는 게 생산성 손실처럼 보이지만, 토큰 하나 잃는 것보다 훨씬 싸다.

개인 개발자라면 GitHub token 권한을 주기적으로 확인하고, 조직 계정과 개인 실험 계정을 분리하는 것부터 하면 된다. 팀이라면 허용 확장 정책, Codespaces 권한, secret 접근 범위, workflow token permission을 같이 봐야 한다. 에디터 보안과 CI 보안은 따로 노는 주제가 아니다. 둘 다 개발자가 매일 쓰는 자동화 권한을 어떻게 줄일지의 문제다.

이번 이슈는 "VS Code가 위험하다"는 얘기로 소비하면 별로 남는 게 없다. 더 정확히는, 생산성을 위해 만든 개발 도구의 편의 기능이 보안 경계와 만날 때 어떤 일이 생기는지 보여준 사례다. 나는 앞으로 낯선 저장소를 열 때 `.` 키부터 누르는 습관을 조금 늦출 것 같다. 그 3초가 생각보다 꽤 비쌀 수 있다.
