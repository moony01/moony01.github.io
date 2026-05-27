---
layout: post
title: "Megalodon GitHub Actions 공격, CI 비밀이 털렸다"
description: "Megalodon GitHub Actions 공격이 5,561개 저장소와 CI/CD 비밀을 노린 방식, 개발팀이 바로 점검할 workflow 기준을 정리했다."
date: 2026-05-27 14:02:04 +0900
categories: [security]
tags: [Megalodon, GitHubActions공격, CI보안, 공급망공격, 워크플로우보안]
image: megalodon-github-actions-attack/megalodon-github-actions-attack-1.png
lang: ko
published: true
---

Megalodon GitHub Actions 공격은 숫자부터 눈에 들어온다. 2026년 5월 18일 약 6시간 동안 5,718개 악성 commit이 5,561개 저장소에 들어갔다. 그런데 숫자보다 더 찝찝한 건 공격 위치다. 이번에는 패키지 계정만 뚫린 게 아니라, repository 안의 `.github/workflows`가 직접 표적이 됐다.

처음엔 "또 공급망 공격이네" 정도로 봤다. 그런데 SafeDep, Cloud Security Alliance, Dark Reading 쪽 정리를 이어서 읽으니 조금 다르게 보였다. 이건 의존성 하나 지우면 끝나는 사건이 아니라, CI/CD가 가진 권한을 다시 계산해야 하는 사건에 가깝다.

특히 GitHub Actions를 release, Docker image, npm publish, cloud deploy에 붙여둔 팀이면 그냥 남 얘기가 아니다. workflow 파일은 YAML이라 눈에 덜 띄지만, 실제로는 배포 권한이 지나가는 코드다. 이번 공격은 그 사실을 꽤 노골적으로 보여줬다.

{% include pre-version.html %}

이전에 다뤘던 [GitHub 3800개 저장소 침해와 VS Code 확장 경고](/security/2026/05/22/github-vscode-extension-breach.html)도 개발자 도구가 공격 경로가 될 수 있다는 얘기였다. Megalodon은 거기서 한 단계 더 들어간다. 에디터가 아니라, 저장소의 자동화 파일 자체를 감염시켰다.

![Megalodon GitHub Actions 공격으로 CI 비밀이 노출되는 구조](/static/img/posts/megalodon-github-actions-attack/megalodon-github-actions-attack-1.png){: .wd100}

## 이번 사건에서 제일 불편한 부분

### workflow 파일은 설정이 아니라 실행 코드다

GitHub Actions를 오래 쓰다 보면 `.github/workflows/*.yml`을 설정 파일처럼 취급하게 된다. 이름도 `ci.yml`, `build.yml`, `release.yml`이라 별로 위협적으로 보이지 않는다. 하지만 실제로는 shell command를 실행하고, secret을 읽고, package를 publish하고, cloud provider에 로그인한다.

Megalodon은 바로 그 지점을 찔렀다. 공격자는 `build-bot`, `ci-bot`, `pipeline-bot`처럼 그럴듯한 자동화 이름을 쓰고, commit message도 `ci: add build optimization step` 같은 식으로 평범하게 만들었다. 사람이 바쁘게 보면 "CI 조금 손봤나 보다" 하고 넘길 수 있는 모양이다.

이게 무서운 이유는 review 습관 때문이다. 많은 팀은 application code diff는 꼼꼼히 보지만 workflow diff는 대충 본다. Dockerfile이나 Terraform은 그래도 긴장하면서 보는데, `ci.yml`은 빌드가 깨졌을 때만 본다. 공격자는 그 빈틈을 안다.

### repository compromise가 package compromise로 번졌다

Tiledesk 사례가 특히 신경 쓰였다. SafeDep과 여러 보안 매체는 Tiledesk 관련 저장소가 오염된 뒤, maintainer가 그 사실을 모른 채 npm package를 publish한 흐름을 짚었다. npm 계정 자체를 공격자가 직접 훔친 게 아니라, 오염된 source tree에서 정상 maintainer가 배포한 셈이다.

이 흐름은 기존 방어선의 빈틈을 보여준다. npm account 2FA, provenance, publish token 제한이 있어도, 배포 대상 source tree가 이미 더러워져 있으면 결과물이 깨끗하다고 말하기 어렵다. 물론 이런 장치들이 쓸모없다는 뜻은 아니다. 다만 "registry 계정만 지키면 된다"는 식으로는 부족하다.

나는 이 지점이 제일 현실적이라고 본다. 실제 팀에서도 release 직전에 workflow 변경이 섞이면, "빌드 때문에 바꿨겠지" 하고 넘어가는 일이 많다. 특히 작은 오픈소스 프로젝트나 내부 도구 repo는 branch protection도 느슨하다. 그 상태에서 자동화 commit처럼 보이는 변경이 들어오면 막기 어렵다.

## 공격자가 노린 건 소스코드가 아니었다

### CI runner에는 비밀이 너무 많다

이번 payload가 노린 목록을 보면 방향이 선명하다. AWS key, GCP token, Azure metadata, SSH private key, Docker config, Kubernetes config, Vault token, Terraform credential, GitHub token, npm token. 개발팀이 build와 deploy를 편하게 하려고 runner에 넣어둔 것들이다.

소스코드는 중요하지만, 공격자 입장에서는 그 다음 권한이 더 맛있다. cloud credential이 있으면 배포 환경으로 간다. npm token이 있으면 다음 package를 오염시킨다. GitHub token이 있으면 다른 workflow를 만진다. SSH key가 있으면 내부 서버로 옮겨갈 수 있다.

그래서 이 사건은 "5,561개 저장소에 악성 파일이 들어갔다"에서 끝나지 않는다. 그 workflow가 실제로 실행됐는지, 어떤 runner에서 실행됐는지, runner가 어떤 secret에 접근했는지, self-hosted runner였는지까지 봐야 한다.

### OIDC도 만능 방패는 아니다

요즘 GitHub Actions 보안 얘기에서 OIDC는 거의 기본 답처럼 나온다. 나도 장기 cloud key를 GitHub Secrets에 넣는 것보다 OIDC를 선호한다. GitHub 문서도 cloud provider와 직접 short-lived token을 교환하는 방식을 권장한다.

다만 Megalodon 같은 공격을 보면 OIDC가 모든 문제를 닫아주지는 않는다. workflow 자체가 오염되면, 공격자는 그 workflow가 받을 수 있는 identity를 노릴 수 있다. OIDC를 쓰더라도 trust condition이 넓으면 위험하다. `repo:*`에 가까운 조건, branch 제한 없는 role, environment protection 없는 deploy job은 여전히 공격면이 된다.

결국 핵심은 "비밀을 오래 저장하지 말자"에서 한 단계 더 가야 한다. 어떤 workflow가 어떤 조건에서 어떤 identity를 받을 수 있는지 줄여야 한다. CI 보안은 secret 저장 방식만의 문제가 아니라 workflow 권한 모델의 문제다.

{% include pre-version.html %}

## 오늘 바로 확인할 것

### workflow 변경 이력을 먼저 본다

내가 팀 repo를 맡고 있다면 제일 먼저 `.github/workflows` 변경 이력을 볼 것 같다. 특히 2026년 5월 18일 전후에 이상한 자동화 이름으로 들어온 commit이 있는지 찾는다.

```bash
git log --since="2026-05-18" --until="2026-05-22" \
  --pretty=format:"%h %ad %an <%ae> %s" --date=iso \
  -- .github/workflows
```

이름만 믿으면 안 된다. `build-bot`, `auto-ci`, `ci-bot`, `pipeline-bot` 같은 이름은 정상 자동화처럼 보이기 위해 쓰였을 수 있다. commit author와 실제 GitHub account 연결, 서명 여부, merge path, branch protection bypass 여부를 같이 봐야 한다.

workflow 안에서는 base64 decode, `curl | bash`, 외부 IP로 나가는 upload, `/proc/*/environ`, cloud metadata endpoint 접근, `workflow_dispatch`만 남겨둔 dormant job을 본다. 특히 `pull_request_target`과 `workflow_dispatch`는 평소에도 조심해야 하는 trigger다.

```bash
rg -n "base64|curl|wget|/proc/.*/environ|169\\.254\\.169\\.254|workflow_dispatch|pull_request_target" .github/workflows
```

이 명령은 거친 필터다. 정상 workflow도 걸린다. 그래도 조용히 숨어 있는 backdoor를 찾는 출발점으로는 꽤 쓸 만하다.

### token permission을 job 단위로 줄인다

GitHub 문서는 `GITHUB_TOKEN` 권한을 필요한 만큼만 주라고 계속 말한다. 그런데 실제 repo를 보면 workflow 최상단에 `contents: write`, `packages: write`, `actions: write`가 넓게 열려 있는 경우가 많다. 편하니까 그렇게 둔다.

Megalodon 같은 사건을 보면 이 기본값이 꽤 비싸다. test job이 package publish 권한을 가질 이유는 없다. lint job이 deployment key를 볼 이유도 없다. release job만 write 권한을 갖고, 나머지는 read-only로 시작하는 게 낫다.

```yaml
permissions:
  contents: read

jobs:
  test:
    permissions:
      contents: read

  release:
    permissions:
      contents: read
      id-token: write
      packages: write
```

이렇게 나눠도 완벽하지 않다. 하지만 공격자가 workflow 하나를 밟았을 때 가져갈 수 있는 권한이 줄어든다. 보안은 대체로 이런 작은 제한의 합이다.

## 방어선을 어디에 다시 그을까

### `.github/workflows`에 CODEOWNERS를 붙인다

workflow 파일은 application code보다 더 엄격하게 봐야 한다. 적어도 release나 deploy가 붙어 있는 repo라면 `.github/workflows` 변경은 별도 reviewer를 요구하는 게 맞다.

```text
.github/workflows/* @security-team @platform-team
```

작은 팀이라면 `@security-team` 같은 조직이 없을 수 있다. 그래도 한 명은 정해야 한다. "workflow 변경을 이해하는 사람"이 review하지 않으면, YAML은 그냥 지나간다. 그리고 YAML은 그냥 지나가면 shell이 된다.

branch protection도 같이 봐야 한다. direct push가 가능한 maintainer가 많고, deploy key가 write 권한을 들고 있고, bot token이 여러 repo에 재사용된다면 공격자가 들어왔을 때 blast radius가 커진다.

### third-party action은 tag보다 SHA가 낫다

GitHub Actions 보안 문서가 계속 강조하는 것 중 하나가 action pinning이다. `actions/checkout@v4`처럼 tag를 쓰는 방식은 편하지만, tag가 움직이면 같은 workflow가 다른 코드를 실행할 수 있다. full commit SHA는 업데이트가 귀찮지만, 적어도 내가 실행하는 코드가 고정된다.

현실적으로 모든 action을 한 번에 SHA로 바꾸기는 어렵다. Renovate나 Dependabot 설정도 손봐야 하고, 사람이 version comment를 같이 관리해야 한다. 그래도 deploy, release, secret 접근 job부터 바꾸는 건 할 만하다.

나는 우선순위를 이렇게 잡겠다.

- cloud credential이나 OIDC를 쓰는 workflow
- package publish를 하는 workflow
- self-hosted runner에서 도는 workflow
- organization secret에 접근하는 workflow
- `pull_request_target`을 쓰는 workflow

여기부터 고정하면 된다. 나머지는 그다음이다.

![GitHub Actions 워크플로우 백도어가 배포 경로로 번지는 흐름](/static/img/posts/megalodon-github-actions-attack/megalodon-github-actions-attack-2.png){: .wd100}

## 개발팀 문화도 같이 바뀌어야 한다

### CI 실패를 고치는 commit은 의심을 덜 받는다

이번 사건이 불편한 이유는 공격이 너무 개발팀 일상과 닮아 있어서다. CI가 느려져서 최적화한다. workflow를 정리한다. build bot이 commit한다. release 전에 pipeline을 고친다. 전부 흔한 일이다.

공격자는 바로 그 평범함을 빌린다. "보안상 수상한 파일"이 아니라 "빌드 최적화"처럼 보이면 review 강도가 낮아진다. 특히 deadline 직전에는 더 그렇다. CI가 깨져 있으면 사람들은 빨리 초록색으로 돌리고 싶어 한다.

그래서 규칙이 필요하다. workflow 변경은 기능 변경보다 느리게 가도 된다. build가 조금 늦게 고쳐지는 것보다, 악성 deploy job이 main에 들어가는 게 훨씬 비싸다. 이건 보수적인 얘기가 아니라 운영 비용 얘기다.

### 공급망 보안은 package manager 밖으로 나왔다

요즘 공급망 공격을 보면 범위가 계속 넓어진다. npm package, PyPI package, VS Code extension, AI coding 설정, GitHub Actions workflow, MCP server, shell hook. 전부 개발자가 매일 쓰는 길이다.

Megalodon은 그중 CI/CD 쪽을 정면으로 건드렸다. package 설치 시점만 막아서는 부족하다. repository integrity, workflow review, runner isolation, token scope, cloud identity condition을 같이 봐야 한다.

개인적으로는 이제 "우리 repo에 secret 없으니 괜찮다"는 말이 거의 의미 없다고 본다. secret은 repo에 없어도 runner에 있다. runner에 없어도 OIDC로 받을 수 있다. OIDC가 있어도 role condition이 넓으면 공격자가 쓸 수 있다. 경계가 전부 연결돼 있다.

## 마치며

Megalodon GitHub Actions 공격은 또 하나의 큰 숫자 뉴스로 지나가기 쉽다. 하지만 개발팀 입장에서 진짜 메시지는 단순하다. workflow 파일은 배포 권한을 가진 코드이고, CI runner는 비밀을 들고 있는 실행 환경이다.

이번 주에 전부 바꾸기는 어렵다. 그래도 `.github/workflows` 변경 이력 확인, `GITHUB_TOKEN` 기본 권한 축소, release job 분리, OIDC trust condition 점검, CODEOWNERS 추가 정도는 바로 시작할 수 있다.

나는 앞으로 이런 공격이 더 조용해질 거라고 본다. 이름은 더 평범해지고, commit message는 더 자연스러워지고, payload는 더 작아질 것이다. 그러면 결국 사람이 기억해야 할 기준은 하나다. CI를 고치는 변경일수록 더 천천히 봐야 한다.

**출처**

- [Cloud Security Alliance: Megalodon GitHub Actions CI/CD 공급망 분석](https://labs.cloudsecurityalliance.org/research/csa-research-note-megalodon-github-actions-cicd-supply-chain/)
- [Dark Reading: Megalodon Malware Infects Thousands of GitHub Repos](https://www.darkreading.com/application-security/megalodon-malware-infects-thousands-github-repos)
- [The Register: Megalodon GitHub repo poisonings](https://www.theregister.com/security/2026/05/22/megalodon-chums-the-waters-in-55k-github-repo-poisonings/5245342)
- [SecurityWeek: Megalodon Supply Chain Attack](https://www.securityweek.com/over-5500-github-repositories-infected-in-megalodon-supply-chain-attack/)
- [GitHub Docs: GitHub Actions security hardening](https://docs.github.com/en/actions/how-tos/security-for-github-actions/security-guides/security-hardening-for-github-actions)
- [GitHub Docs: OIDC in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-cloud-providers)
