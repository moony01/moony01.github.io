---
layout: post
title: "TrapDoor 공급망 공격, 개발자 PC가 진짜 표적이었다"
description: "TrapDoor 공급망 공격이 npm, PyPI, Crates.io와 AI 코딩 설정까지 건드린 이유를 개발팀 관점에서 정리했다."
date: 2026-05-26 14:08:00 +0900
categories: [security]
tags: [TrapDoor, 공급망공격, 개발자보안, 악성패키지, AI코딩보안]
image: trapdoor-supply-chain-ai/trapdoor-supply-chain-ai-1.png
lang: ko
published: true
---

TrapDoor 공급망 공격은 처음 제목만 봤을 때 또 하나의 악성 패키지 사건처럼 보였다. 그런데 Socket 분석을 읽고 나니 느낌이 달라졌다. 이번에는 npm 하나가 아니라 npm, PyPI, Crates.io가 동시에 움직였고, 훔치려는 대상도 단순한 토큰 몇 개가 아니었다.

더 찝찝한 건 AI 코딩 도구 설정까지 공격 경로에 들어갔다는 점이다. `.cursorrules`와 `CLAUDE.md` 같은 파일은 이제 프로젝트 안에서 꽤 자연스러운 존재가 됐다. 공격자는 바로 그 자연스러움을 노렸다. 사람이 보기엔 "프로젝트 규칙 파일"인데, 에이전트에게는 실행 지시처럼 읽힐 수 있다.

[Socket의 TrapDoor 분석](https://socket.dev/blog/trapdoor-crypto-stealer-npm-pypi-crates)은 2026년 5월 24일 기준 34개 이상 악성 패키지와 384개 이상 관련 버전이 npm, PyPI, Crates.io에 퍼졌다고 정리했다. [The Hacker News 보도](https://thehackernews.com/2026/05/trapdoor-supply-chain-attack-spreads.html)도 같은 흐름을 짚었고, [Cointelegraph 기사](https://cointelegraph.com/news/coordinated-crypto-stealer-campaign-trapdoor-detected-targeting-developers)는 crypto, DeFi, AI 개발자가 주 표적이었다는 점을 강조했다.

{% include pre-version.html %}

이전에 다뤘던 [Mini Shai-Hulud npm 공급망 공격](/security/2026/05/21/mini-shai-hulud-npm.html)도 CI와 토큰을 노렸다는 점에서 불편했다. TrapDoor는 거기에 한 가지를 더 붙인다. 개발자 PC에 들어온 악성 패키지가 AI 에이전트의 읽기 습관까지 이용하려 한다.

![TrapDoor 공급망 공격이 개발자 PC와 AI 코딩 설정을 노리는 흐름](/static/img/posts/trapdoor-supply-chain-ai/trapdoor-supply-chain-ai-1.png){: .wd100}

## 이번 공격에서 제일 이상한 지점

### 세 레지스트리를 한 번에 건드렸다

공급망 공격은 대체로 한 생태계에서 먼저 터진다. npm이면 npm, PyPI면 PyPI, VS Code 확장이면 Marketplace. 그래서 대응도 보통 "우리 lockfile에 그 패키지가 있나"에서 시작한다.

TrapDoor는 그 선을 조금 넘었다. Socket은 npm 21개, PyPI 7개, Crates.io 6개 패키지를 묶어서 봤다. 이름도 꽤 그럴듯하다. `llm-context-compressor`, `prompt-engineering-toolkit`, `env-loader-cli`, `solidity-build-guard`, `sui-move-build-helper` 같은 식이다. 대충 보면 개발 보조 도구, 보안 점검 도구, Web3 빌드 유틸처럼 보인다.

이게 싫은 이유는 간단하다. 요즘 프로젝트는 언어 하나로 끝나지 않는다. 프론트는 npm, 데이터 스크립트는 Python, 성능 도구나 블록체인 쪽은 Rust를 같이 쓰는 경우가 많다. 공격자가 이 현실을 그대로 반영했다. "Node 개발자만 조심하세요"가 아니라 "개발 환경 전체가 설치면"을 본 것이다.

### 실행 타이밍도 생태계별로 달랐다

npm 쪽은 익숙한 `postinstall` 경로를 탔다. 설치하는 순간 payload가 돈다. 이건 오래된 문제지만 여전히 무섭다. 앱을 실행하기 전, 테스트를 돌리기 전, 사람이 코드를 읽기 전에도 이미 로컬 권한으로 뭔가가 실행될 수 있다.

PyPI 쪽은 import 시점에 원격 JavaScript를 받아 `node -e`로 실행하는 방식이 언급됐다. Python 패키지가 JavaScript payload를 위임해서 실행한다는 게 좀 기묘하지만, 공격자 입장에서는 유지보수가 편하다. payload를 외부에 두면 패키지를 다시 배포하지 않고도 행동을 바꿀 수 있다.

Rust 쪽은 `build.rs`가 핵심이었다. Rust를 쓰는 사람은 잘 안다. `build.rs`는 빌드 전에 자연스럽게 돈다. 문제는 그 자연스러운 자동 실행이 wallet keystore나 local secret 탐색과 결합되면 완전히 다른 이야기가 된다는 점이다.

## 표적은 코드가 아니라 개발자의 권한이었다

### wallet, SSH, cloud, GitHub token이 한 바구니에 있다

TrapDoor가 노린 목록을 보면 공격자의 관심이 선명하다. SSH 키, GitHub token, AWS credential, 환경 변수, browser profile, crypto wallet, API key. 개발자 노트북에 실제로 모이는 것들이다.

이건 "내 소스코드가 유출될 수 있다"보다 더 넓은 문제다. GitHub token이 유효하면 private repository에 닿을 수 있고, cloud credential이 유효하면 배포 환경에 닿을 수 있다. SSH 키가 살아 있으면 다른 서버로 옮겨갈 수 있다. wallet 데이터가 있으면 금전 피해가 바로 난다.

개발자 PC가 작은 데이터센터처럼 변한 지는 오래됐다. 로컬에는 repo, secret, shell history, SSH config, 브라우저 로그인, AI 도구 설정이 섞여 있다. 공격자는 이제 그걸 너무 잘 안다.

### 낮은 다운로드 수가 안심 근거는 아니다

이런 악성 패키지는 다운로드 수가 낮을 수 있다. 그래서 언뜻 보면 "우리랑 상관없는 작은 사건"처럼 보인다. 그런데 crypto, DeFi, AI 쪽은 표적 가치가 높다. 한 명만 잘 걸려도 wallet, cloud, GitHub, npm publish 권한이 한꺼번에 나올 수 있다.

특히 이번 이름들은 장난스럽지 않다. `wallet-security-checker`, `crypto-credential-scanner`, `eth-security-auditor` 같은 이름은 오히려 보안을 신경 쓰는 사람이 검색할 법하다. 공격자가 대상을 넓게 뿌린 게 아니라, 특정 개발자 행동을 보고 만든 느낌이 강하다.

그래서 나는 다운로드 수보다 "내 팀의 설치 습관과 맞는가"를 먼저 본다. 새 프로젝트 만들 때 아무 생각 없이 helper package를 붙이는 문화가 있으면 위험하다. 에이전트가 추천한 패키지를 바로 설치하는 흐름이 있으면 더 위험하다.

{% include pre-version.html %}

## AI 코딩 설정이 공격면이 됐다

### `.cursorrules`와 `CLAUDE.md`는 더 이상 그냥 문서가 아니다

이번 사건에서 제일 새롭게 느껴진 부분은 AI assistant injection이다. Socket은 공격자가 `.cursorrules`와 `CLAUDE.md`를 심어 AI 코딩 도구가 "보안 스캔"처럼 보이는 흐름을 실행하도록 유도하려 했다고 설명했다.

이게 항상 성공한다는 뜻은 아니다. 도구마다 실행 권한도 다르고, 모델도 다르고, 사용자 확인 단계도 다르다. 그래도 방향은 중요하다. 공격자가 이제 "사람이 읽는 README"만 보는 게 아니라 "AI 에이전트가 읽는 프로젝트 규칙"을 본다.

나는 이게 앞으로 더 자주 나올 거라고 본다. 에이전트는 repo 전체를 읽고, 지시 파일을 우선순위 높게 처리하고, 터미널 명령을 제안하거나 실행한다. 그러면 공격자는 당연히 에이전트가 신뢰하는 파일을 건드린다. 예전의 악성 README가 사람을 속였다면, 이제 악성 규칙 파일은 작업 흐름을 속일 수 있다.

### 오픈소스 PR도 실험장이 됐다

Socket 분석에 따르면 같은 계정이 LangChain, Langflow, LlamaIndex, OpenHands 같은 AI/개발자 프로젝트에 `.cursorrules`나 `CLAUDE.md`를 추가하는 PR을 열었다. 제목도 대체로 멀쩡하다. 개발 표준, 빌드 검증, 프로젝트 규칙 같은 말이 붙어 있으면 리뷰어가 대충 넘기기 쉽다.

이 부분이 꽤 현실적이다. 요즘 많은 프로젝트가 "AI 에이전트가 이 repo에서 잘 일하게 만들자"는 이유로 규칙 파일을 받고 있다. 좋은 방향이다. 그런데 바로 그래서 공격면이 된다. 규칙 파일은 문서처럼 보이지만, 사실상 에이전트 운영 정책이다.

앞으로 코드 리뷰에서 봐야 할 파일 종류가 늘어난다. `package.json` script, GitHub Actions workflow, Dockerfile만 보는 시대가 아니다. `.cursorrules`, `CLAUDE.md`, `AGENTS.md`, MCP 설정, editor 설정도 리뷰 대상이다. 귀찮지만 피하기 어렵다.

![AI 코딩 도구 설정 파일이 악성 패키지와 연결되는 개발 환경 구조](/static/img/posts/trapdoor-supply-chain-ai/trapdoor-supply-chain-ai-2.png){: .wd100}

## 지금 팀에서 먼저 볼 것

### lockfile과 설치 로그를 같이 봐야 한다

가장 먼저 할 일은 affected package 이름을 lockfile에서 찾는 것이다. npm, PyPI, Cargo를 모두 본다. 이번 사건은 한 언어로만 닫히지 않는다.

```bash
rg "async-pipeline-builder|llm-context-compressor|prompt-engineering-toolkit|eth-security-auditor|env-loader-cli|sui-move-build-helper" \
  package-lock.json pnpm-lock.yaml yarn.lock requirements*.txt pyproject.toml Cargo.lock
```

이 명령으로 끝나지는 않는다. private registry mirror, CI cache, 개발자 로컬 캐시도 볼 필요가 있다. 특히 2026년 5월 22일부터 24일 사이에 새 환경에서 dependency install이 돌았다면 로그를 보관해두는 게 좋다.

설치 흔적이 있으면 패키지 삭제보다 자격증명 교체가 먼저다. 아니, 정확히 말하면 감염된 머신을 먼저 격리하고, 지속성 흔적을 본 뒤에 credential을 돌리는 쪽이 낫다. 살아 있는 감염 환경에서 토큰만 바꾸면 새 토큰도 다시 읽힐 수 있다.

### 이상한 규칙 파일을 문서 취급하면 안 된다

프로젝트 루트와 홈 디렉터리에서 예상치 못한 `.cursorrules`, `CLAUDE.md`, shell hook, Git hook을 찾는 것도 필요하다.

```bash
find "$HOME" -name ".cursorrules" -o -name "CLAUDE.md" -o -path "*/.git/hooks/*"
```

물론 이 명령은 결과가 많이 나올 수 있다. 정상 파일도 섞인다. 핵심은 "내가 만든 적 없는 규칙 파일"과 "remote URL을 따라가라는 지시"를 분리해서 보는 것이다. 특히 zero-width Unicode나 bidi 문자 경고가 뜨는 파일은 바로 열어보지 말고 안전한 방식으로 내용을 확인하는 게 좋다.

GitHub가 2026년 5월 초 [MCP Server secret scanning](https://github.blog/changelog/2026-05-05-secret-scanning-with-github-mcp-server-is-now-generally-available/)을 일반 제공으로 올린 것도 이 흐름과 맞물린다. 에이전트가 코드를 만지는 만큼, 에이전트가 secret을 먼저 찾게 만드는 장치도 필요하다. 다만 scanning은 보조선이지 최종 방어선은 아니다. 설치 시점 실행과 로컬 persistence는 여전히 별도 문제다.

## 마치며

### 개발자 환경을 더 작게 만들어야 한다

TrapDoor 공급망 공격을 보고 나서 내가 제일 강하게 든 생각은 단순하다. 개발자 환경이 너무 많은 권한을 들고 있다.

우리는 편해서 한 머신에 다 넣는다. GitHub 로그인, cloud CLI, npm publish, SSH, wallet, 브라우저 세션, AI 코딩 도구, 테스트 데이터. 생산성은 좋아진다. 대신 악성 패키지 하나가 들어왔을 때 피해 반경도 커진다.

그래서 대응도 "이 패키지 설치하지 마세요"에서 끝나면 안 된다. install script 제한, 새 패키지 승인, secret scope 축소, publish token 분리, disposable dev environment, AI 규칙 파일 리뷰가 같이 가야 한다. 전부 한 번에 할 필요는 없지만, 최소한 어떤 권한이 개발자 PC에 몰려 있는지는 봐야 한다.

나는 앞으로 공급망 공격이 더 이상 package manager 이야기만은 아니라고 본다. editor extension, AI agent config, MCP server, Git hook, browser profile이 한꺼번에 묶인다. TrapDoor는 그 방향을 꽤 노골적으로 보여준 사건이었다. 이번엔 운 좋게 빨리 잡혔더라도, 다음에는 더 자연스러운 이름과 더 조용한 방식으로 올 가능성이 높다.
