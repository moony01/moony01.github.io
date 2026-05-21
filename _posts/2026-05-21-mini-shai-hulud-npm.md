---
layout: post
title: "Mini Shai-Hulud npm 공급망 공격, CI까지 번졌다"
description: "Mini Shai-Hulud npm 공급망 공격이 AntV와 CI/CD까지 번진 이유, 개발팀이 지금 확인할 지점을 정리했다."
date: 2026-05-21 14:01:07 +0900
categories: [security]
tags: [npm공급망공격, MiniShaiHulud, CI보안, 자격증명탈취, 오픈소스보안]
image: mini-shai-hulud-npm/mini-shai-hulud-npm-1.png
lang: ko
published: true
---

Mini Shai-Hulud npm 공급망 공격은 이번 주에 그냥 지나치기 어려운 사건이었다. 처음엔 또 하나의 npm 악성 패키지 이슈라고 생각했는데, 읽을수록 느낌이 달랐다.

이번에는 `@antv` 생태계와 `echarts-for-react`, `timeago.js`, `size-sensor` 같은 평범한 의존성이 한꺼번에 걸렸다. 더 찝찝한 건 페이로드가 CI/CD 러너, GitHub 토큰, npm 토큰, Claude Code와 Codex 설정까지 건드린다는 점이다. 패키지 하나 지우면 끝나는 사건이 아니다.

![Mini Shai-Hulud npm 공급망 공격이 CI 파이프라인으로 퍼지는 장면](/static/img/posts/mini-shai-hulud-npm/mini-shai-hulud-npm-1.png){: .wd100}

나는 공급망 공격 기사를 볼 때 보통 두 가지를 먼저 본다. 하나는 "내 프로젝트가 실제로 밟을 수 있는 경로인가"이고, 다른 하나는 "감염 후 청소가 단순한가"다. 이번 건 둘 다 불편하다.

{% include pre-version.html %}

## 왜 이번 npm 공급망 공격이 더 불편한가

### 숫자보다 경로가 더 무섭다

SafeDep은 2026년 5월 19일 `atool` npm 계정이 침해됐고, 22분 안에 317개 패키지에 637개 악성 버전이 올라갔다고 분석했다. Chainguard와 Snyk도 비슷한 규모를 보고했다. Microsoft는 이 공격이 `@antv` 패키지 생태계를 타고 `echarts-for-react` 같은 하위 의존성으로 번졌다고 정리했다.

숫자만 보면 이미 충분히 크다. 그런데 나는 숫자보다 경로가 더 신경 쓰였다. `echarts-for-react`는 대시보드나 어드민에서 너무 자연스럽게 들어가는 의존성이다. `timeago.js`도 마찬가지다. "우리 팀은 보안 민감 패키지 안 써요"라고 말하기 어려운 종류다.

게다가 공격자는 `latest` 태그만 믿는 사람을 노린 게 아니었다. semver 범위가 열려 있으면 깨끗한 환경에서 다시 설치할 때 악성 버전으로 해석될 수 있다. lockfile이 있더라도 CI가 언제, 어떤 캐시 상태에서 설치했는지 봐야 한다.

### 설치 순간 이미 늦을 수 있다

이번 페이로드의 핵심은 `preinstall` 훅이다. 패키지를 설치하는 순간 `bun run index.js`가 먼저 실행된다. 애플리케이션 코드를 import하기 전이고, 사람이 diff를 읽기도 전이다.

이 패턴은 예전부터 찝찝했다. npm lifecycle script는 편리하지만, 보안 관점에서는 "설치가 곧 실행"이라는 이상한 계약을 만든다. 이번 사건은 그 계약이 얼마나 비싼지 다시 보여줬다.

비슷한 얘기는 예전에 [LiteLLM 공급망 해킹](/security/2026/03/25/litellm-supply-chain-attack-trivy-2026.html)을 다룰 때도 했다. 그때는 보안 스캐너가 공격 벡터가 됐다. 이번에는 데이터 시각화와 유틸리티 패키지가 CI의 비밀 창고로 들어가는 문이 됐다.

## 페이로드가 노린 것은 코드가 아니라 권한이었다

### 개발자 머신과 CI 러너가 같은 표적이 됐다

JFrog 분석을 보면 페이로드는 GitHub 토큰, npm 토큰, AWS/GCP/Azure 자격증명, Kubernetes 토큰, Vault, SSH 키, `.env`, password manager 흔적까지 훑는다. Microsoft는 GitHub Actions 러너 프로세스 메모리에서 secret 값을 긁는 동작까지 언급했다.

여기서 포인트는 명확하다. 공격자가 원하는 건 소스코드 한두 줄이 아니다. 다음 publish를 할 수 있는 권한, 클라우드에 접근할 수 있는 권한, 다른 저장소에 workflow를 심을 수 있는 권한이다.

그래서 이 공격은 한 번 감염된 뒤 범위가 빨리 흐려진다. 개발자 노트북에서 끝나는지, CI 러너에서 끝나는지, npm publish 토큰까지 닿았는지, GitHub organization secret까지 닿았는지에 따라 사고 등급이 달라진다.

### 제거 순서도 평소와 다르다

보통 이런 사고를 보면 "토큰부터 revoke하자"는 반응이 먼저 나온다. 나도 그쪽에 가깝다. 그런데 이번에는 그 순서가 위험할 수 있다는 분석이 있다. JFrog와 Snyk는 `gh-token-monitor` 같은 지속성 프로세스가 토큰 상태를 감시하고, 대응 행동에 반응할 수 있다고 설명했다.

즉, 감염된 머신이 살아 있는 상태에서 토큰만 먼저 끊는 게 최선이 아닐 수 있다. 네트워크 격리, 지속성 제거, 프로세스 확인, 그다음 자격증명 교체 순서를 생각해야 한다. 보안팀 입장에서는 귀찮고, 개발팀 입장에서는 더 귀찮다. 하지만 이 순서가 사고를 키우는지 줄이는지 갈린다.

{% include pre-version.html %}

## 지금 바로 확인할 체크포인트

### lockfile부터 보자

내가 팀에서 이걸 봐야 한다면 먼저 lockfile을 열 것 같다. `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`에 2026년 5월 19일 01:39~02:18 UTC 사이에 publish된 affected package가 들어왔는지 확인해야 한다.

대충 이런 식으로 시작하면 된다. 이 명령만으로 감염 여부가 끝나는 건 아니지만, 첫 필터로는 충분하다.

```bash
rg '"(@antv/|echarts-for-react|timeago.js|size-sensor|canvas-nest)' package-lock.json pnpm-lock.yaml yarn.lock
npm ls echarts-for-react timeago.js size-sensor 2>/dev/null
```

CI 로그도 같이 봐야 한다. 깨끗한 runner에서 `npm install`이 돌았는지, 그 시간대에 lockfile 없이 설치했는지, publish job이 있었는지 확인해야 한다. 특히 npm token이나 GitHub Actions OIDC를 쓰는 배포 파이프라인이면 그냥 "개발 의존성 문제"로 내려치면 안 된다.

### 흔적은 패키지 폴더 밖에도 남는다

이번 사건에서 제일 싫은 부분은 지속성이다. Snyk와 CyberScoop은 `.claude/settings.json`, `.vscode/tasks.json`, systemd user service, macOS LaunchAgent 같은 흔적을 언급했다. 패키지 삭제 후에도 남을 수 있는 자리다.

확인 위치를 너무 좁게 잡으면 놓친다.

| 확인 위치 | 봐야 할 흔적 |
|---|---|
| lockfile | affected package와 publish 시간대 |
| 개발자 설정 | `.claude/settings.json`, `.vscode/tasks.json` |
| 사용자 서비스 | `kitty-monitor`, `gh-token-monitor` |
| GitHub 계정 | 낯선 public repo, 이상한 workflow commit |
| 네트워크 로그 | `t.m-kosche.com` 접속 흔적 |

이 표를 적으면서도 기분이 별로다. 요즘 AI 코딩 도구 설정 파일은 개발자 로컬 권한과 너무 가까운 곳에 있다. 공격자가 거기에 SessionStart 훅을 심으면 "패키지 설치 사고"가 "다음 AI 세션 시작 때 다시 실행되는 사고"가 된다.

![Mini Shai-Hulud 페이로드가 토큰과 개발 도구 설정을 훑는 구조](/static/img/posts/mini-shai-hulud-npm/mini-shai-hulud-npm-2.png){: .wd100}

## 방어는 스캐너 하나로 끝나지 않는다

### install script를 정책으로 다뤄야 한다

이번 사건을 보고 다시 생각한 건 `npm install --ignore-scripts`다. 모든 프로젝트에 무조건 적용하기는 어렵다. native module, postinstall binary download, codegen 같은 것들이 실제로 깨진다. 그래도 CI의 일부 단계, 감사용 설치, PR 검증 단계에서는 기본값을 다시 볼 필요가 있다.

개인적으로는 세 가지가 현실적인 타협점이라고 본다.

- lockfile 없는 설치를 release pipeline에서 금지한다.
- publish 권한이 있는 job에서는 새 dependency resolve를 하지 않는다.
- install script가 필요한 패키지를 allowlist로 관리한다.

완벽하지 않다. 그래도 "npm은 원래 그런 거지"로 넘기는 것보다는 낫다. 특히 publish 토큰을 가진 CI는 일반 테스트 러너와 분리해야 한다. 이번 페이로드는 CI가 가진 권한을 그대로 다음 공격의 연료로 쓰는 쪽에 가깝다.

### provenance도 만능은 아니다

요즘은 SLSA, Sigstore, OIDC 기반 trusted publishing 얘기를 많이 한다. 좋은 방향이다. 나도 그쪽을 선호한다. 그런데 이번 분석에서 불편했던 지점은 공격자가 compromised CI identity를 이용해 정상처럼 보이는 provenance를 만들 수 있다는 점이다.

서명이 있다는 건 "어떤 흐름에서 만들어졌다"는 증거이지, 그 흐름이 깨끗했다는 보증은 아니다. 빌드 환경 안에서 악성 코드가 먼저 실행됐다면, 서명은 오히려 이상한 안도감을 줄 수 있다.

그래서 provenance를 버리자는 얘기가 아니다. provenance 앞단의 install-time execution, runner 권한, token scope를 같이 줄여야 한다는 얘기다. 공급망 보안은 단일 기능이 아니라 여러 작은 마찰의 합이다.

## 개발팀에서 오늘 정하면 좋은 것

### 사고 대응 순서를 문서로 남겨야 한다

이번 사건을 보고 바로 할 일은 패키지 목록을 외우는 게 아니다. 다음에 비슷한 일이 터졌을 때 누가 무엇을 먼저 할지 정하는 것이다.

내 기준으로는 이 정도면 충분히 시작할 수 있다.

```bash
# 1. 네트워크 격리 또는 runner 폐기
# 2. 지속성 흔적 확인
systemctl --user status kitty-monitor 2>/dev/null
launchctl list 2>/dev/null | rg 'kitty|token'

# 3. 프로젝트 설정 훅 확인
rg 'SessionStart|folderOpen|gh-token-monitor|t\\.m-kosche' ~/.claude .vscode .github 2>/dev/null

# 4. lockfile와 publish 기록 확인
rg 'echarts-for-react|timeago.js|size-sensor|@antv/' package-lock.json pnpm-lock.yaml yarn.lock
```

물론 실제 incident response에서는 더 조심해야 한다. 감염 가능성이 높은 머신에서 무작정 명령을 돌리는 것도 좋지 않을 수 있다. 하지만 팀 문서에 아무것도 없으면, 사고 당일에는 각자 기억나는 블로그 글을 붙잡고 대응하게 된다. 그건 너무 위험하다.

### AI 코딩 도구도 보안 범위에 넣어야 한다

이번 이슈에서 Claude Code와 Codex 설정이 언급된 건 꽤 상징적이다. 이제 AI 코딩 도구는 그냥 에디터 플러그인이 아니다. 로컬 파일을 읽고, 쉘을 실행하고, 저장소를 수정하고, 때로는 CI나 배포 흐름까지 건드린다.

그러면 보안 범위에도 들어와야 한다. `.claude`, `.codex`, IDE task, MCP 설정, agent hook 같은 파일을 "개인 편의 설정"으로만 보면 안 된다. 저장소에 들어가지 않는 로컬 설정도 공격 표면이 될 수 있다.

나는 이게 앞으로 더 자주 보일 거라고 본다. 공격자는 개발자가 매일 실행하는 자동화 지점을 좋아한다. 예전에는 shell profile, npm script, IDE task였다. 이제는 AI agent hook도 그 목록에 들어갔다.

## 마치며

Mini Shai-Hulud npm 공급망 공격에서 제일 중요한 교훈은 "npm이 위험하다"가 아니다. 그건 너무 뻔하고 별로 쓸모도 없다.

진짜 교훈은 신뢰 경계가 바뀌었다는 점이다. 패키지 설치는 코드 다운로드가 아니라 코드 실행이다. CI runner는 빌드 머신이 아니라 권한 묶음이다. AI 코딩 도구 설정은 편의 파일이 아니라 다음 실행 지점이다.

그래서 이번 이슈는 프론트엔드 팀만 볼 사건이 아니다. npm을 직접 안 쓰는 백엔드 팀도, publish pipeline을 가진 오픈소스 maintainer도, AI 코딩 도구를 쓰는 개인 개발자도 한 번은 자기 환경을 돌아봐야 한다.

특히 "우리는 lockfile 있으니까 괜찮다"에서 멈추면 안 된다. lockfile은 시작점이고, CI 권한과 install script 정책, 로컬 지속성 흔적, 토큰 교체 순서까지 같이 봐야 한다.

불편하지만 이게 지금 개발 환경의 현실인 것 같다. 의존성은 점점 더 자동으로 들어오고, 권한은 점점 더 많은 도구에 나뉘어 있고, 공격자는 그 사이의 빈틈을 기다린다.

이번 주에는 적어도 lockfile 한 번은 열어보는 게 좋겠다. 커피 식기 전에 끝낼 수 있는 점검치고는, 얻는 안전마진이 꽤 크다.

**출처**

- [Microsoft Security Blog: Mini Shai Hulud compromised AntV npm packages](https://www.microsoft.com/en-us/security/blog/2026/05/20/mini-shai-hulud-compromised-antv-npm-packages-enable-ci-cd-credential-theft/)
- [SafeDep: Mini Shai-Hulud Strikes Again](https://safedep.io/mini-shai-hulud-strikes-again-314-npm-packages-compromised/)
- [Chainguard: Mini Shai-Hulud npm Attack](https://www.chainguard.dev/unchained/mini-shai-hulud-npm-attack-antv-ecosystem-compromise-may-2026)
- [JFrog Security Research: Shai-Hulud Returns](https://research.jfrog.com/post/shai-hulud-here-we-go-again-may19/)
- [Snyk: Mini Shai-Hulud Hits AntV](https://snyk.io/blog/mini-shai-hulud-antv-npm-supply-chain-attack/)
- [The Register: Shai-Hulud keeps burrowing](https://www.theregister.com/cyber-crime/2026/05/19/shai-hulud-keeps-burrowing-314-packages-infected-after-another-account-compromise/5242601)
