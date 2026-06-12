---
layout: post
title: "Homebrew 6.0 탭 신뢰가 기본값을 바꿨다"
description: "Homebrew 6.0의 탭 신뢰 기능이 왜 패키지 매니저 기본값을 보안 중심으로 바꿨는지 개발자 운영 관점에서 정리했다."
date: 2026-06-12 14:12:00 +0900
categories: [infra]
tags: [Homebrew, 패키지매니저, 공급망보안, 개발환경]
image: homebrew-6-tap-trust/homebrew-6-tap-trust-1.webp
lang: ko
published: true
---

Homebrew 6.0에서 제일 눈에 띈 변화는 새 명령어 하나가 아니다. 나는 이번 릴리스의 핵심을 `tap trust`로 본다. 패키지 매니저가 "설치 도구"에서 "개발자 PC의 공급망 게이트"로 올라왔다는 신호에 가깝기 때문이다.

[Homebrew가 6월 11일 공개한 6.0.0 릴리스 노트](https://brew.sh/2026/06/11/homebrew-6.0.0/)를 보면 기능은 꽤 많다. 기본 internal JSON API, Linux sandbox, brew bundle 개선, macOS 27 초기 지원, 개발자용 ask mode 기본값까지 한 번에 들어갔다. 그런데 이 중에서 운영자가 먼저 봐야 할 건 tap trust다. 타사 tap이 임의의 Ruby 코드를 포함할 수 있고, Homebrew가 그 코드를 평가할 수 있다는 사실을 이제 더 노골적으로 드러냈기 때문이다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/homebrew-6-tap-trust/homebrew-6-tap-trust-1-400.webp 400w,
            /static/img/posts/homebrew-6-tap-trust/homebrew-6-tap-trust-1-800.webp 800w,
            /static/img/posts/homebrew-6-tap-trust/homebrew-6-tap-trust-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/homebrew-6-tap-trust/homebrew-6-tap-trust-1.webp"
    alt="Homebrew 6.0 탭 신뢰로 개발 환경 권한을 점검하는 장면"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

이전에 [AI 코딩 에이전트에는 하네스가 먼저 필요하다](/security/2026/06/08/ai-agent-harness-security.html)는 글에서 자동화의 권한 경계를 이야기했다. Homebrew 6.0도 같은 선 위에 있다. 에이전트든 패키지 매니저든, 결국 로컬 개발 환경에서 코드를 실행하고 파일을 바꾸고 네트워크를 탄다. 편리함이 커질수록 기본값이 더 조심스러워져야 한다.

{% include pre-version.html %}

## tap trust가 건드린 진짜 문제

### tap은 단순 목록 파일이 아니다

Homebrew를 오래 쓴 사람에게 tap은 꽤 익숙하다. 공식 저장소에 없는 formula나 cask를 쓰려고 `brew tap user/repo`를 추가하고, 그다음 `brew install`을 돌린다. 겉으로 보면 저장소를 하나 더 붙이는 일처럼 보인다. 그런데 [Tap Trust 문서](https://docs.brew.sh/Tap-Trust)는 이걸 더 정확하게 설명한다. formula, cask, external command는 평범한 메타데이터가 아니라 실행 가능한 패키지 정의다.

이 차이가 중요하다. Homebrew는 의존성을 해석하거나 사용 가능한 패키지를 찾거나 명령을 실행하기 위해 tap 안의 Ruby 코드를 평가할 수 있다. 그러면 신뢰하지 않은 tap 하나가 단순히 "목록에 추가된 저장소"로 끝나지 않는다. 내 사용자 권한으로 실행될 수 있는 코드가 개발 환경 안에 들어온다.

Homebrew 6.0은 이 지점을 흐릿하게 두지 않는다. 공식 Homebrew tap은 기본으로 신뢰하되, 비공식 tap과 tap-qualified formula/cask는 명시적으로 신뢰하게 만든다. 그리고 가능하면 tap 전체보다 특정 formula, cask, command만 신뢰하라고 권한다. 나는 이 방향이 맞다고 본다. 패키지 매니저의 UX가 조금 귀찮아지더라도, 신뢰 범위를 좁히는 쪽이 장기적으로 낫다.

### 설치 속도보다 신뢰 범위가 먼저다

개발자는 보통 설치 명령을 빠르게 복붙한다. README에 있는 한 줄을 그대로 실행하고, 에러가 나면 Stack Overflow나 GitHub Issue에서 또 다른 명령을 붙인다. 이 습관은 나도 있다. 문제는 요즘 로컬 개발 환경이 예전보다 훨씬 더 많은 권한을 갖는다는 점이다.

노트북 하나 안에 GitHub 토큰, cloud CLI, SSH key, package registry 인증, 고객사 repo, 브라우저 세션, AI 코딩 도구가 다 들어 있다. 여기서 패키지 매니저가 신뢰하지 않은 tap의 코드를 조용히 평가한다면 위험이 생각보다 크다. 특히 개발자가 쓰는 자동화 스크립트나 에이전트가 `brew bundle`을 대신 돌리는 환경에서는 더 그렇다. 사람은 이상한 프롬프트에서 멈출 수 있지만, 자동화는 성공할 때까지 계속 진행할 수 있다.

그래서 tap trust는 "보안 기능 하나 추가"보다 "설치 행위의 의미를 다시 묻는 기능"에 가깝다. 이 tap을 믿는가. 이 formula 하나만 믿는가. 앞으로 이 저장소에 추가될 모든 cask와 command까지 믿는가. 질문이 귀찮아도, 질문 자체가 필요해졌다.

## Homebrew 6.0은 기본값을 더 운영자답게 바꿨다

### internal JSON API가 기본이 된 이유

이번 릴리스에서 internal JSON API가 기본값이 된 것도 그냥 성능 개선으로만 보면 아깝다. Homebrew는 5.0.0부터 `HOMEBREW_USE_INTERNAL_API`로 opt-in하던 더 작고 빠른 API를 이제 기본으로 켰다. 릴리스 노트는 Homebrew의 메타데이터를 하나의 다운로드로 묶어 업데이트를 빠르게 하고 네트워크 요청을 줄인다고 설명한다.

이건 사람에게도 좋지만 자동화에 더 중요하다. CI, bootstrap script, 새 장비 세팅, devcontainer, AI 에이전트의 반복 실행 루프에서는 `brew update`나 패키지 해석 시간이 계속 누적된다. 네트워크 호출이 줄고 메타데이터 경로가 예측 가능해지면, 실패 원인도 줄어든다.

다만 성능 개선은 보안 기본값과 같이 봐야 한다. 더 빠르게 더 많은 설치를 할 수 있다면, 그 설치가 어디서 왔는지 더 명확해야 한다. Homebrew 6.0이 internal API와 tap trust를 같은 릴리스에서 밀어 넣은 건 꽤 상징적이다. 빠른 경로와 신뢰 경계를 같이 손본 셈이다.

### Linux sandbox는 Homebrew의 위치를 바꾼다

Linux Bubblewrap sandbox가 들어간 것도 흥미롭다. Homebrew는 macOS 도구라는 이미지가 강하지만, 지금은 Linux와 WSL에서도 꽤 현실적인 선택지다. 공식 문서도 macOS, Linux, Windows 시스템을 같은 패키지 매니저로 관리할 수 있다는 점을 말한다.

여기서 Linux sandbox는 단순한 플랫폼 parity가 아니다. 빌드, 테스트, postinstall 단계가 샌드박스 안에서 돈다는 건 패키지 설치 과정의 실패 반경을 줄이겠다는 뜻이다. 특히 사내 bootstrap이나 개발자 장비 표준화에서 Homebrew를 쓰는 팀이라면, 설치 스크립트가 시스템 전체에 흩뿌리는 영향을 줄이는 쪽이 더 안전하다.

물론 sandbox가 모든 문제를 해결하지는 않는다. 신뢰하지 않은 소스, 탈취된 저장소, 악성 install hook, 권한이 큰 CLI 토큰까지 한 번에 막을 수는 없다. 그래도 기본적으로 격리된 실행을 늘리는 방향은 맞다. 패키지 매니저가 이제 편의 도구가 아니라 운영 경계의 일부라는 걸 인정하는 변화다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/homebrew-6-tap-trust/homebrew-6-tap-trust-2-400.webp 400w,
            /static/img/posts/homebrew-6-tap-trust/homebrew-6-tap-trust-2-800.webp 800w,
            /static/img/posts/homebrew-6-tap-trust/homebrew-6-tap-trust-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/homebrew-6-tap-trust/homebrew-6-tap-trust-2.webp"
    alt="Homebrew 6.0 패키지 설치 흐름과 sandbox 검증 게이트"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## brew bundle은 더 강력해졌고 그래서 더 조심해야 한다

### Brewfile은 개인 취향 파일이 아니라 실행 계획이다

`brew bundle` 개선도 이번 릴리스에서 작지 않다. formula 병렬 설치가 자동으로 돌고, npm, krew, winget, cleanup 쪽 개선이 붙었다. [Brew Bundle 문서](https://docs.brew.sh/Brew-Bundle-and-Brewfile)를 보면 Brewfile은 이제 formula와 cask만 적는 파일이 아니다. vscode extension, Go package, Cargo package, uv tool, krew plugin, flatpak, winget까지 한 파일에서 다룰 수 있다.

이건 편하다. 새 Mac이나 WSL 환경을 만들 때 Brewfile 하나로 많은 걸 복원할 수 있다. 팀 온보딩에도 좋다. 하지만 운영 관점에서는 Brewfile이 사실상 실행 계획이 됐다는 뜻이다. 어떤 tap을 추가하고, 어떤 패키지를 설치하고, 어떤 서비스를 시작하고, 어떤 cleanup을 수행할지 선언한다. 선언형이라는 말이 안전을 자동으로 보장하지는 않는다.

Homebrew 6.0이 `brew bundle`에서 trusted 옵션을 존중하고, dump 결과에도 trusted bundle entry를 기록하는 건 그래서 중요하다. 이제 Brewfile을 코드 리뷰할 때 패키지 이름만 볼 게 아니라 trust 범위도 같이 봐야 한다. "이 tap은 왜 전체 신뢰인가", "formula 하나만 신뢰해도 되지 않나", "cleanup이 개발자 로컬 도구를 지우지는 않나" 같은 질문이 필요하다.

### AI 에이전트가 Brewfile을 고칠 때 더 위험해진다

요즘은 AI 에이전트에게 개발 환경 세팅까지 맡기는 경우가 늘고 있다. 에러 로그를 주면 에이전트가 `brew install`을 제안하고, missing dependency를 발견하면 Brewfile에 추가한다. 이 흐름 자체는 자연스럽다. 나도 자동화 환경에서는 비슷하게 한다.

그런데 에이전트가 Brewfile을 고칠 수 있다면, 패키지 설치 권한도 간접적으로 갖는 셈이다. 잘못된 tap을 추가하거나, 이름이 비슷한 formula를 신뢰하거나, broad trust를 남기는 변경이 PR에 섞일 수 있다. 코드 diff만 보면 작은 한 줄인데, 실제로는 개발자 장비에서 실행될 수 있는 공급망 변경이다.

그래서 나는 앞으로 팀 Brewfile 리뷰에서 아래 정도는 기본 체크로 넣는 게 좋다고 본다.

```text
1. 새 tap은 공식/비공식 여부와 remote URL을 확인한다.
2. 가능하면 tap 전체가 아니라 formula/cask/command 단위로 신뢰한다.
3. Brewfile 변경 PR에는 설치 후 실행되는 command와 service 영향도를 적는다.
4. AI 에이전트가 만든 변경이면 실행 로그와 검증 명령을 같이 남긴다.
```

이 정도면 과하지 않다. 개발 환경은 이제 production과 완전히 분리된 장난감 공간이 아니다. production에 닿는 키와 배포 권한이 로컬에 있기 때문이다.

{% include pre-version.html %}

## 지금 팀이 바로 볼 것들

### 업데이트 전에 trust 상태를 먼저 보자

Homebrew 6.0으로 올릴 때 내가 먼저 볼 건 새 기능 체험이 아니라 현재 tap 목록이다. 오래전에 추가해둔 tap, 프로젝트 하나 때문에 잠깐 썼던 tap, 누가 관리하는지 기억 안 나는 tap이 남아 있을 수 있다. 이런 것들이 진짜 리스크다.

공식 문서 기준으로는 필요한 대상을 좁혀 신뢰하는 쪽이 좋다. 자주 쓰는 조직의 tap이라면 전체 신뢰가 실용적일 수 있다. 하지만 한두 개 formula 때문에 붙인 tap이라면 formula 단위 trust가 더 낫다. 특히 회사 공용 Brewfile이나 onboarding script라면 broad trust는 설명 없이 넣지 않는 게 맞다.

또 하나는 ask mode다. 개발자 모드에서 `brew install`과 `brew upgrade`가 dependency summary와 확인 프롬프트를 보여주는 방향으로 바뀌었다. 자동화에서는 불편할 수 있지만, 사람에게는 꽤 좋은 안전장치다. 의존성 폭이 예상보다 커지는 순간을 눈으로 볼 수 있기 때문이다.

### 패키지 매니저도 운영 로그를 남겨야 한다

이번 Homebrew 6.0을 보고 드는 생각은 단순하다. 이제 패키지 매니저 변경도 운영 로그로 남겨야 한다. 어떤 tap을 신뢰했는지, 어떤 Brewfile 변경이 들어갔는지, 누가 `brew bundle dump`를 돌렸는지, CI나 에이전트가 어떤 설치 명령을 수행했는지 최소한 기록이 있어야 한다.

작은 팀일수록 이걸 대충 넘기기 쉽다. 하지만 작은 팀일수록 한 명의 노트북이 더 많은 권한을 갖는다. GitHub admin, Cloudflare, Google Search Console, 고객사 VPN, npm token이 한 장비에 모일 수 있다. 그 장비의 패키지 매니저가 무엇을 신뢰하는지는 생각보다 중요한 운영 정보다.

Homebrew 6.0은 엄청 화려한 릴리스라기보다 기본값을 조정한 릴리스에 가깝다. 그래서 더 의미가 있다. 개발 도구의 성숙은 기능이 많아지는 것만이 아니다. 위험한 기본값을 줄이고, 신뢰 범위를 명시하고, 자동화가 빠르게 움직여도 사람이 검토할 지점을 남기는 것이다.

나는 이번 tap trust를 귀찮은 보안 프롬프트로만 보지 않는다. 개발자 로컬 환경이 공급망의 일부가 됐다는 현실적인 인정으로 본다. 앞으로 패키지 매니저는 더 빠르고 더 자동화될 것이다. 그러면 좋은 기본값은 더 중요해진다. Homebrew 6.0은 그 방향으로 꽤 분명한 선을 그었다.
