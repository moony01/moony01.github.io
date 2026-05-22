---
layout: post
title: "GitHub 3800개 저장소 침해가 남긴 VS Code 확장 경고"
description: "GitHub 침해와 Nx Console 악성 VS Code 확장이 왜 위험했는지, 개발팀이 확장 업데이트와 토큰 권한을 점검할 지점을 정리했다."
date: 2026-05-22 14:02:52 +0900
categories: [security]
tags: [GitHub침해, VSCode확장, 공급망보안, NxConsole, 개발자보안]
image: github-vscode-extension-breach/github-vscode-extension-breach-1.png
lang: ko
published: true
---

GitHub 침해 소식에서 제일 거슬렸던 건 숫자보다 경로였다. 약 3,800개 내부 저장소가 언급됐고, 시작점은 서버 취약점이 아니라 한 직원 기기에서 실행된 악성 VS Code 확장이었다.

처음엔 "또 VS Code Marketplace에 이상한 확장이 올라왔나" 정도로 봤다. 그런데 GitHub 공식 설명, Nx의 사후분석, 보안 업체 분석을 이어서 읽어보니 그림이 더 불편했다. npm 공급망 공격이 개발자 머신을 건드리고, 그 머신에서 다시 VS Code 확장 배포 권한으로 이어지고, 그 확장이 GitHub 내부 저장소 접근까지 닿았다.

![GitHub 침해와 악성 VS Code 확장 공급망 흐름](/static/img/posts/github-vscode-extension-breach/github-vscode-extension-breach-1.png){: .wd100}

이건 "확장 하나 잘못 깔았다"로 끝낼 사건이 아니다. 개발자가 매일 쓰는 에디터, 자동 업데이트, GitHub CLI 토큰, CI 캐시, OIDC publish가 한 줄로 연결될 때 어떤 일이 생기는지 보여준 사례에 가깝다.

{% include pre-version.html %}

## GitHub 침해에서 진짜 봐야 할 지점

### 3,800개보다 중요한 건 침투 경로다

GitHub는 2026년 5월 18일 직원 기기 침해를 탐지했고, 오염된 VS Code 확장을 원인으로 설명했다. 현재 평가로는 GitHub 내부 저장소 exfiltration에 국한됐고, 공격자가 주장한 약 3,800개 저장소 규모가 조사 결과와 대체로 맞는다고 했다. 고객 저장소나 고객 정보가 광범위하게 노출됐다는 증거는 아직 없다고도 밝혔다.

여기까지만 보면 대형 플랫폼의 내부 사고다. 그런데 개발자 입장에서는 경로가 더 찝찝하다. 외부에서 GitHub 자체를 직접 뚫은 게 아니라, 개발자 워크스테이션에 올라간 에디터 확장이 출발점이었다. 요즘 개발 환경에서는 이 경로가 너무 현실적이다.

VS Code 확장은 단순한 테마나 단축키 모음이 아니다. 프로젝트 파일을 읽고, 터미널과 Git 상태를 보고, 인증 세션 근처까지 간다. 확장이 악성이라면 웹 브라우저 탭 하나보다 훨씬 깊은 곳에서 움직인다. 특히 회사 SSO, GitHub CLI, npm, AWS, Kubernetes, 1Password 같은 흔적이 같은 머신에 모여 있으면 공격자는 굳이 서버부터 두드릴 필요가 없다.

### Nx Console 18.95.0이 보여준 연결 고리

Nx의 사후분석은 이 사건을 더 선명하게 만든다. 악성 `Nx Console` 18.95.0은 2026년 5월 18일 12:30~13:09 UTC 사이 Visual Studio Marketplace와 Open VSX에 올라갔다. Visual Studio Marketplace 기준으로는 약 11분 만에 내려갔고, Open VSX에서는 약 36분 동안 노출됐다.

짧은 시간이라 다행이라고 말할 수도 있다. 그런데 자동 업데이트가 켜져 있으면 몇 분도 충분하다. Nx는 Microsoft 집계 설치 수보다 내부 activation 지표가 훨씬 클 수 있다고 했고, 최대 수천 명 규모를 조심스럽게 언급했다. 짧은 노출 시간과 작은 install count만 보고 안심하기 어려운 이유다.

더 중요한 건 원인이다. Nx 설명에 따르면 한 기여자 머신이 앞선 TanStack 공급망 공격의 영향을 받았고, 그 과정에서 GitHub CLI OAuth 토큰이 빠져나갔다. 그 토큰이 Nx Console 확장 배포 흐름까지 이어졌다. 이전에 다룬 [Mini Shai-Hulud npm 공급망 공격](/security/2026/05/21/mini-shai-hulud-npm.html)이 여기서 다음 단계로 넘어간 셈이다.

## VS Code 확장은 이제 공급망 공격 표적이다

### "검증된 Marketplace"만으로는 부족하다

솔직히 이 부분이 제일 불편하다. 악성 확장이 무명 게시자 계정에서 올라온 것도 아니고, 기존에 널리 쓰이던 확장의 특정 버전으로 배포됐다. 사용자는 평소처럼 업데이트를 받았을 뿐인데, 공격자 입장에서는 신뢰를 빌린 셈이다.

이런 공격은 피싱 메일보다 설득력이 있다. 이름도 익숙하고, 설치 위치도 공식 Marketplace고, 확장 ID도 그대로다. 조직에서 "허용된 확장만 설치하세요"라고 정책을 걸어도, 허용된 확장 자체가 잠깐 오염되면 정책은 그 순간 방어선이 아니라 배포 통로가 된다.

그래서 이제 확장 관리는 설치 허용 목록만으로 끝나면 안 된다. 버전 고정, 업데이트 지연, publisher 변경 감시, 확장 파일 해시 검증, 조직 단위 배포 승인 같은 귀찮은 장치가 필요해진다. 개인 개발자에게는 과하게 들릴 수 있지만, 회사 노트북에서 GitHub org와 cloud admin 권한이 같이 움직인다면 과한 얘기가 아니다.

### 에디터는 로컬 권한의 허브다

나는 예전엔 IDE 확장 보안을 조금 낮게 봤다. npm 패키지나 CI workflow가 더 위험하다고 생각했다. 그런데 요즘은 생각이 바뀌었다. 에디터는 개발자의 거의 모든 권한이 지나가는 허브가 됐다.

터미널도 에디터 안에서 열고, GitHub PR도 에디터에서 보고, AI 코딩 도구도 에디터 확장으로 붙고, secret이 들어간 `.env`도 옆 탭에 열려 있다. 여기에 악성 확장이 들어오면 공격자는 "개발자가 이미 로그인한 세계"를 그대로 빌릴 수 있다.

특히 이번 페이로드는 GitHub, npm, AWS, Vault, Kubernetes, SSH 키, 1Password 세션 같은 자격 증명을 노렸다. 공격자가 원하는 건 코드 그 자체보다 다음 접근권이다. 저장소를 읽는 권한, 패키지를 publish하는 권한, workflow를 실행하는 권한, 클라우드 자원을 조회하는 권한. 이 권한들이 모이면 다음 공급망 공격 재료가 된다.

## 개발팀에서 오늘 확인할 것

### 먼저 Nx Console 버전과 흔적을 보자

이번 사건에 직접 걸렸는지 보려면 거창한 툴부터 켤 필요는 없다. 우선 개발자 머신에서 설치된 확장 버전과 알려진 지속성 흔적을 확인하는 게 시작점이다.

```bash
code --list-extensions --show-versions | rg 'nrwl.angular-console|nx-console'

test -f ~/.local/share/kitty/cat.py && echo "kitty payload found"
test -f ~/Library/LaunchAgents/com.user.kitty-monitor.plist && echo "macOS persistence found"
test -f /var/tmp/.gh_update_state && echo "gh update state found"
find /tmp -maxdepth 1 -name 'kitty-*' -print 2>/dev/null
```

`nrwl.angular-console@18.95.0`이 보이면 가볍게 넘길 일이 아니다. Nx 공식 advisory는 해당 버전을 노출 시간대에 설치했거나 auto-update가 켜져 있었다면 머신을 잠재적으로 침해된 것으로 보고, 확장 업데이트, 악성 프로세스 종료, 지속성 파일 제거, 자격 증명 회전을 요구한다.

다만 순서는 조심해야 한다. 감염된 머신에서 계속 악성 프로세스가 살아 있다면 토큰만 먼저 바꾸는 행동이 다시 새 토큰을 노출할 수 있다. 격리, 프로세스 종료, 지속성 제거, 자격 증명 회전, 로그 감사 순서로 가는 게 더 낫다.

### GitHub CLI와 로컬 토큰을 따로 봐야 한다

이번 공격에서 GitHub CLI 토큰이 연결 고리로 언급된 게 꽤 크다. 많은 팀이 PAT는 신경 쓰지만 `gh` CLI 세션은 편의 도구 정도로 본다. 그런데 실제로는 로컬에 저장된 GitHub 인증 상태가 조직 저장소 접근권으로 이어질 수 있다.

내가 팀 점검 문서에 넣는다면 이런 항목부터 넣을 것 같다.

```bash
gh auth status
gh auth token >/dev/null && echo "gh token is present"
rg 'ghp_|gho_|ghs_|github_pat_' ~/.config/gh ~/.git-credentials ~/.npmrc .env .github 2>/dev/null
```

명령 자체보다 중요한 건 권한 목록이다. 토큰이 어떤 org에 닿는지, repo scope가 과한지, Actions workflow나 package publish 권한이 같이 붙어 있는지 봐야 한다. 평소에는 편한 토큰 하나가 사고 때는 blast radius가 된다.

![Nx Console 악성 확장이 개발자 토큰을 훑는 구조](/static/img/posts/github-vscode-extension-breach/github-vscode-extension-breach-2.png){: .wd100}

그리고 이건 개인 머신만의 문제가 아니다. 원격 개발 환경, Codespaces류 환경, 사내 devbox, CI runner도 같은 방식으로 봐야 한다. 사람이 쓰는 머신과 자동화가 쓰는 머신의 경계가 흐려졌기 때문이다.

{% include pre-version.html %}

## 방어선을 어디에 새로 그을까

### 확장 업데이트를 release처럼 다뤄야 한다

팀 규모가 조금만 커져도 에디터 확장 업데이트는 사실상 소프트웨어 배포다. 그런데 대부분은 브라우저 확장보다도 느슨하게 관리한다. "개발자 자율"이라고 부르지만, 실제로는 위험을 측정하지 않는 상태에 가깝다.

현실적인 타협은 이 정도라고 본다.

- 조직 표준 확장은 allowlist로 관리한다.
- 핵심 확장은 자동 업데이트 대신 지연 업데이트를 둔다.
- 새 버전은 최소 하루 정도 커뮤니티 반응과 advisory를 본다.
- publisher나 extension ID 변경은 알림을 받는다.
- 고권한 저장소에 접근하는 머신은 확장 설치 권한을 더 좁힌다.

전부 한 번에 하기는 어렵다. 특히 개발자 경험을 너무 망치면 사람들은 우회한다. 그래도 "누구나 아무 확장이나 바로 업데이트"는 이제 꽤 비싼 기본값이 됐다.

### CI와 OIDC도 신뢰 경계를 다시 봐야 한다

TanStack 사건에서 가장 찝찝한 지점은 OIDC trusted publishing이 깨졌다는 표현보다, 합법적인 workflow 안의 다른 코드 경로가 publish 가능한 토큰을 만들 수 있었다는 점이다. 토큰 자체가 장기 보관되지 않았더라도, runner 메모리와 cache trust boundary가 흔들리면 공격자는 필요한 순간에 권한을 꺼낼 수 있다.

이건 "OIDC를 쓰지 말자"는 얘기가 아니다. 오히려 OIDC는 여전히 좋은 방향이다. 다만 OIDC를 쓴다는 사실만으로 release workflow 전체가 안전해지는 건 아니다. `pull_request_target`, cache key, third-party action ref, workflow permission, publish step 분리까지 같이 봐야 한다.

내 기준으로는 publish workflow에서 이 네 가지는 기본 점검 대상이다.

```yaml
permissions:
  contents: read
  id-token: write

# PR에서 쓰는 cache와 release에서 쓰는 cache를 섞지 않기
# third-party action은 tag보다 commit SHA pinning 우선
# publish job은 manual approval 또는 environment protection 통과 후 실행
```

조금 귀찮아도 release job은 일반 test job과 다르게 취급해야 한다. 테스트는 자주 깨져도 된다. publish는 한 번 잘못되면 내가 만든 패키지가 다른 사람의 침투 경로가 된다.

## 개발자 보안의 중심이 바뀌고 있다

### 이제 로컬 개발 환경도 production 근처다

이번 GitHub 침해를 보면서 계속 든 생각은 이거다. 로컬 개발 환경은 더 이상 "개인 PC"가 아니다. production에 닿는 권한, org 저장소, package registry, cloud account, AI 코딩 도구, secret manager가 한자리에 모인 운영 경계다.

그런데 우리는 여전히 로컬 환경을 개인 취향의 영역으로 취급하는 경우가 많다. 어떤 확장을 깔았는지, 어떤 CLI에 로그인했는지, 어떤 토큰이 남아 있는지, 어떤 MCP나 agent hook이 실행되는지 조직이 거의 모른다. 공격자 입장에서는 이게 더 맛있는 표적이다.

개인적으로는 앞으로 보안팀과 플랫폼팀이 "개발자 환경 관리"를 더 진지하게 볼 거라고 본다. 불편한 MDM 얘기만 하자는 게 아니다. 최소한 확장 목록, 토큰 scope, publish 권한, 로컬 secret 위치, 자동 업데이트 정책은 개발 생산성 도구의 일부로 봐야 한다.

### AI 코딩 도구까지 같은 범위에 넣어야 한다

요즘은 VS Code 확장과 AI 코딩 도구의 경계도 흐리다. Copilot, Cursor, Claude Code, Codex, MCP 서버, 로컬 agent hook이 모두 개발자의 파일과 쉘 근처에서 움직인다. 공격자는 당연히 여기를 볼 것이다.

이전에 npm 공급망 공격 글에서도 적었지만, `.claude`, `.codex`, `.vscode/tasks.json`, MCP 설정은 이제 단순 개인 설정이 아니다. 다음 명령 실행 지점이다. 여기에 악성 hook이 들어가면 패키지를 지운 뒤에도 다음 세션에서 다시 실행될 수 있다.

그래서 확장 보안과 AI 도구 보안은 따로 떼어 보기 어렵다. 에디터 확장 관리, 로컬 agent 권한, shell 실행 승인, secret masking, 저장소별 정책을 한 묶음으로 봐야 한다. 귀찮지만 이게 지금 개발 환경이다.

## 마치며

GitHub 3,800개 저장소 침해라는 숫자는 크다. 하지만 나는 이 사건을 숫자보다 경로로 기억할 것 같다. 한 개발자 기기, 하나의 오염된 확장 버전, 이미 로그인된 도구들, 그리고 내부 저장소 접근권. 요즘 공급망 공격은 이렇게 조용히 이어진다.

개발팀이 당장 모든 걸 바꿀 수는 없다. 그래도 이번 주에 할 수 있는 일은 있다. `Nx Console` 버전을 확인하고, VS Code 확장 자동 업데이트 정책을 점검하고, `gh` CLI 토큰과 publish workflow 권한을 줄이는 것. 이 정도는 커피 한 잔 마시는 동안 목록을 뽑을 수 있다.

나는 이번 사건이 "VS Code를 쓰지 말자"는 결론으로 가면 안 된다고 본다. 진짜 결론은 에디터 확장도 공급망이라는 사실을 인정하는 쪽이다. 우리가 매일 쓰는 개발 도구가 배포 경로라면, 그 도구의 업데이트와 권한도 배포처럼 다뤄야 한다.

불편하지만 좋은 기본값은 원래 조금 불편하다. 이번에는 그 불편함을 미루는 비용이 꽤 선명하게 드러났다.

**출처**

- [GitHub Blog: Investigating unauthorized access to GitHub-owned repositories](https://github.blog/security/investigating-unauthorized-access-to-githubs-internal-repositories/)
- [Nx Blog: Postmortem: Nx Console v18.95.0 supply-chain compromise](https://nx.dev/blog/nx-console-v18-95-0-postmortem)
- [GitHub Advisory: Compromised Nx Console version 18.95.0](https://github.com/nrwl/nx-console/security/advisories/GHSA-c9j4-9m59-847w)
- [TanStack Blog: Postmortem: TanStack npm supply-chain compromise](https://tanstack.com/blog/npm-supply-chain-compromise-postmortem)
- [StepSecurity: Nx Console VS Code Extension Compromised](https://www.stepsecurity.io/blog/nx-console-vs-code-extension-compromised)
- [BleepingComputer: GitHub confirms breach of 3,800 repos via malicious VSCode extension](https://www.bleepingcomputer.com/news/security/github-confirms-breach-of-3-800-repos-via-malicious-vscode-extension/)
