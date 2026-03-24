---
layout: post
title: "보안 스캐너가 백도어로 변했다 — LiteLLM 공급망 해킹, AI 앱 전체가 위험하다"
date: 2026-03-25 10:00:00 +0900
categories: [security]
tags: [security, litellm, supply-chain, pypi, trivy, backdoor, ai, python]
image: litellm-supply-chain-attack-trivy-2026/litellm-supply-chain-attack-trivy-2026-1.png
published: true
---

어제 오전(3월 24일, UTC 기준) AI 생태계에 조용하지만 치명적인 폭탄이 터졌다. 보안 취약점을 잡아주는 스캐너가 오히려 공격의 진입로가 됐고, AI 프록시 라이브러리 LiteLLM의 PyPI 패키지에 백도어가 심어졌다.

일일 다운로드 340만 회. 쿠버네티스 자격증명부터 AWS 키, SSH 개인키, 암호화폐 지갑까지 한꺼번에 탈취하는 3단계 페이로드. 그리고 공격의 핵심에는 아무도 의심하지 않는 보안 도구 **Trivy**가 있었다.

![LiteLLM 공급망 공격 분석](/static/img/posts/litellm-supply-chain-attack-trivy-2026/litellm-supply-chain-attack-trivy-2026-1.png){: .wd100}

{% include pre-version.html %}

## LiteLLM이 뭔데 이렇게 중요한가

LiteLLM은 OpenAI, Anthropic, Google Gemini, AWS Bedrock, Ollama 등 100개 이상의 LLM API를 단일 인터페이스로 추상화하는 Python 라이브러리다. 쉽게 말해 AI 앱의 **게이트웨이 레이어**다.

스타트업이든 대기업이든 AI 기능을 붙이는 개발팀 상당수가 LiteLLM을 쓴다. 프록시 서버 모드로 쓰면 여러 팀이 하나의 엔드포인트로 GPT-4o, Claude, Gemini를 돌려가며 쓸 수 있고, 비용 추적과 레이트 리밋까지 한 번에 관리된다. 그만큼 운영 환경 깊숙이 들어가 있는 라이브러리다.

**일일 다운로드 340만 회**라는 숫자가 이번 사건이 왜 심각한지를 설명한다. PyPI 역대 공급망 공격 중 잠재적 피해 규모 기준으로 손에 꼽힌다.

## 공격 체인 전체를 해부한다

이 공격이 특히 무서운 이유는 단순한 악성 패키지 업로드가 아니라는 점이다. **보안 도구 자체를 감염시켜 다른 프로젝트들을 연쇄 감염**시키는 정교한 공급망 공격이다.

### 1단계: Trivy GitHub Action 침투 (2월 말)

Trivy는 Aqua Security가 만든 오픈소스 취약점 스캐너다. 컨테이너 이미지, 파일시스템, IaC 코드를 스캔해 CVE를 잡아준다. CI/CD 파이프라인에 박혀 있는 흔한 보안 도구다.

공격자 **TeamPCP**는 Trivy의 GitHub 워크플로우에서 `pull_request_target` 트리거의 취약점을 발견했다. 이 워크플로우는 외부 PR에서도 저장소 시크릿에 접근할 수 있는 권한이 열려 있었다. 악성 PR 하나로 Trivy의 내부 시크릿을 탈취할 수 있었던 것이다.

### 2단계: Trivy 릴리스 태깅 변조 (3월 19일)

Trivy의 PyPI 배포 토큰을 손에 넣은 공격자는 **v0.69.4 Git 태그를 악성 릴리스로 재작성**했다. 이 시점부터 Trivy를 CI에서 돌리는 모든 프로젝트가 잠재적 피해 대상이 됐다.

### 3단계: Checkmarx KICS도 감염 (3월 23일)

같은 날 또 다른 보안 도구인 Checkmarx의 KICS GitHub Action도 동일한 인프라로 공격받았다. C2(Command and Control) 도메인도 이 시점에 등록됐다. 무대를 다 깔았다는 신호다.

### 4단계: LiteLLM CI/CD에서 PyPI 토큰 탈취 (3월 24일 10:39 UTC)

LiteLLM의 CI/CD 파이프라인이 Trivy를 실행하는 순간, 감염된 Trivy가 `PYPI_PUBLISH` 토큰을 포함한 환경 변수 전체를 C2 서버(`https://models.litellm.cloud/`)로 전송했다. 이 도메인은 겉으로 보면 LiteLLM 공식 인프라처럼 보이도록 설계됐다.

### 5단계: 악성 패키지 배포 (3월 24일 10:52 UTC)

토큰 탈취 후 불과 13분 만에 악성 버전 **1.82.7**이 PyPI에 올라갔다. 이어서 더 공격적인 벡터를 추가한 **1.82.8**도 배포됐다. 두 버전 모두 약 3시간 후 PyPI 보안팀에 의해 격리됐다.

## 악성 페이로드 3단계 구조

```python
# litellm/proxy/proxy_server.py (1.82.7)에 삽입된 base64 인코딩 페이로드 일부 (재구성)
import base64, subprocess
_payload = "aW1wb3J0IG9zLCBzb2NrZXQsIHN0cnVjdC4uLg=="  # 실제 악성 코드 (예시)
exec(base64.b64decode(_payload))
```

### 1단계: 크리덴셜 하베스터

감염 즉시 실행되는 정보 수집 모듈이다. 탈취 대상은 다음과 같다.

| 대상 | 경로 |
|------|------|
| SSH 개인키 | `~/.ssh/id_*` |
| .env 파일 | 현재 디렉토리 및 상위 경로 |
| AWS 자격증명 | `~/.aws/credentials` |
| Kubernetes 설정 | `~/.kube/config` |
| Git 자격증명 | `~/.git-credentials` |
| 암호화폐 지갑 | 공통 지갑 파일 경로 |

수집된 데이터는 **AES-256-CBC + RSA-4096** 조합으로 암호화된 후 `tpcp.tar.gz`로 패키징돼 C2 서버로 전송된다.

### 2단계: Kubernetes 횡이동 키트

쿠버네티스 환경이 감지되면 `node-setup-*` 이름의 악성 파드를 `kube-system` 네임스페이스에 배포한다. Privileged 컨테이너로 클러스터의 모든 노드에 퍼진다. 클러스터 단위 대규모 침해로 이어질 수 있는 가장 위험한 단계다.

### 3단계: 지속성 백도어

```
~/.config/sysmon/sysmon.py
```

systemd 사용자 서비스(`sysmon.service`)로 등록돼 C2 서버를 폴링하면서 추가 바이너리를 다운로드·실행한다. 패키지를 삭제해도 백도어가 남아 있어 이 파일을 별도로 제거해야 한다.

버전 1.82.8의 추가 벡터는 더 심각하다. **`.pth` 파일**을 사이트 패키지에 심어 Python이 시작될 때마다 자동 실행되게 만들었다. 패키지를 제거해도 `.pth` 파일이 남아 있으면 매 Python 실행마다 악성 코드가 돌아간다.

![LiteLLM 공격 체인 구조도](/static/img/posts/litellm-supply-chain-attack-trivy-2026/litellm-supply-chain-attack-trivy-2026-2.png){: .wd100}

{% include pre-version.html %}

## 지금 당장 확인해야 할 것들

LiteLLM을 쓰고 있다면, 아니 AI 스택 어딘가에 Python 패키지가 있다면 지금 바로 다음을 실행해야 한다.

**1. 버전 확인**

```bash
pip show litellm
```

`Version: 1.82.7` 또는 `1.82.8`이 보인다면 즉시 업그레이드 또는 다운그레이드해야 한다.

```bash
pip install litellm==1.82.6  # 안전 버전으로 다운그레이드
# 또는
pip install --upgrade litellm  # 최신 안전 버전으로 업그레이드
```

**2. 백도어 파일 확인**

```bash
ls -la ~/.config/sysmon/
systemctl --user list-units | grep sysmon
```

**3. Kubernetes 악성 파드 확인**

```bash
kubectl get pods -A | grep node-setup-
```

`node-setup-`으로 시작하는 파드가 있다면 클러스터가 감염된 것이다.

**4. 자격증명 즉시 교체**

감염이 확인됐다면 순서가 중요하다. AWS/GCP/Azure 액세스 키, Kubernetes 서비스 어카운트 토큰, GitHub Personal Access Token, 데이터베이스 비밀번호, SSH 키 전체를 교체해야 한다. 이미 C2 서버로 전송된 자격증명은 재사용될 수 있다.

커뮤니티에서 만들어진 감염 탐지 스크립트도 있다: [litellm-vuln-detector](https://github.com/jthack/litellm-vuln-detector)

## 이 사건이 개발자에게 던지는 진짜 질문

### 보안 도구가 공격 벡터가 됐다

역설이 아닐 수 없다. CI/CD에 Trivy를 붙인 이유는 보안을 강화하기 위해서였다. 그런데 그 보안 도구 자체가 공격의 진입로가 됐다. **신뢰받는 도구일수록 더 위험한 벡터가 된다**는 공급망 공격의 본질이 여기서 드러난다.

### `pull_request_target` 워크플로우 패턴

이번 Trivy 침해의 핵심은 GitHub Actions의 `pull_request_target` 이벤트 트리거다. 외부 포크에서 오는 PR도 저장소 시크릿에 접근할 수 있게 되는 이 패턴은 이미 2021년부터 GitHub이 경고해온 안티패턴이다. 보안 스캐너를 포함해 많은 오픈소스 프로젝트가 여전히 이 취약점을 갖고 있다.

직접 CI/CD를 관리하는 팀이라면 지금 당장 워크플로우를 감사해야 한다.

```yaml
# 위험: 외부 PR에서 시크릿에 접근 가능
on:
  pull_request_target:
    types: [opened, synchronize]
```

### AI 툴링의 보안 부채

LiteLLM이 340만 다운로드를 기록할 수 있었던 이유는 AI 붐과 함께 폭발적으로 성장했기 때문이다. 빠르게 성장하는 프로젝트는 기능 개발 속도에 비해 보안 감사가 뒤처지기 쉽다. PyPI 토큰을 `.env` 파일로 관리한 것이 그 결과다. AI 인프라를 구축하는 팀들이 지금 얼마나 빠른 속도로 달리면서 보안을 후순위로 미루고 있는지 돌아볼 필요가 있다.

## 마치며

공급망 공격은 "내가 직접 악성 코드를 다운로드할 리 없다"는 안일한 믿음을 깨는 공격이다. 내가 믿는 도구, 내 팀이 검증했다고 생각했던 도구가 이미 감염된 상태로 내 파이프라인에 들어올 수 있다.

LiteLLM 사태는 AI 생태계가 얼마나 빠르게 넓어지고 있는지, 그리고 그 확장 속도에 비해 보안 관행이 얼마나 느리게 따라오는지를 보여준다. 빠르게 움직이는 건 좋다. 하지만 **보안 스캐너를 도입했다고 해서 끝이 아니다**. 그 스캐너 자체가 안전한지도 검증해야 한다.

> 본 글은 공개된 보안 연구 자료와 사고 분석 보고서를 바탕으로 작성되었습니다. 취약점 악용 방법을 권장하지 않으며, 방어적 목적의 이해를 돕기 위해 공격 메커니즘을 설명했습니다.

**출처**:
- [Snyk: Poisoned Security Scanner Backdooring LiteLLM](https://snyk.io/articles/poisoned-security-scanner-backdooring-litellm/)
- [The Hacker News: TeamPCP Backdoors LiteLLM](https://thehackernews.com/2026/03/teampcp-backdoors-litellm-versions.html)
- [The Register: LiteLLM infected via Trivy](https://www.theregister.com/2026/03/24/trivy_compromise_litellm/)
- [futuresearch.ai: Supply Chain Attack in litellm 1.82.8](https://futuresearch.ai/blog/litellm-pypi-supply-chain-attack/)
