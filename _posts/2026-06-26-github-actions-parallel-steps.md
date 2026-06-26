---
layout: post
title: "GitHub Actions 병렬 스텝이 CI 설계를 바꾸는 방식"
description: "GitHub Actions 병렬 스텝이 background·wait·parallel 키워드로 CI 시간, 로그, 실패 처리, 러너 비용 관리를 어떻게 바꾸는지 정리했다."
date: 2026-06-26 12:00:00 +0900
categories: [infra]
tags: [GitHubActions, CI/CD, 병렬빌드, DevOps, 자동화]
image: github-actions-parallel-steps/github-actions-parallel-steps-1.png
lang: ko
published: true
---

GitHub Actions 병렬 스텝 소식을 보고 제일 먼저 든 생각은 이거였다. “이제 CI 병렬화가 job 단위에서 step 단위로 내려왔구나.”

[GitHub Changelog](https://github.blog/changelog/2026-06-25-actions-steps-can-now-be-run-in-parallel)에 따르면 Actions는 이제 `background`, `wait`, `wait-all`, `cancel`, `parallel` 키워드로 한 job 안의 step을 동시에 돌릴 수 있다. 예전에도 shell에서 `&`를 붙여서 비슷하게 흉내 낼 수는 있었다. 근데 그건 로그가 섞이고, 실패 지점이 흐려지고, 나중에 누가 봐도 “이거 의도된 병렬 실행 맞나?” 싶은 모양이 됐다.

이번 업데이트가 재밌는 지점은 기능 자체보다 위치다. CI 시간을 줄이는 방법은 보통 job을 쪼개거나 matrix를 돌리거나 self-hosted runner를 늘리는 쪽이었다. 이제는 같은 job 안에서도 “이 step은 뒤에서 돌리고, 이 step은 바로 이어가고, 여기서 기다리자”를 YAML 문법으로 표현할 수 있다. 작아 보이는데 운영 관점에서는 꽤 큰 변화다.

{% include pre-version.html %}

나는 이 기능을 “빌드가 빨라졌다”보다 “CI 흐름을 더 솔직하게 적을 수 있게 됐다”로 보고 있다. 지금까지 많은 워크플로우가 순차 실행처럼 보였지만 실제 의도는 병렬이었다. 서버 띄워놓고 테스트 돌리기, 프론트와 백엔드 빌드 동시에 걸기, 패키징 중에 텔레메트리 업로드하기 같은 작업 말이다.

![GitHub Actions 병렬 스텝이 CI 파이프라인을 나누는 밝은 다이어그램](/static/img/posts/github-actions-parallel-steps/github-actions-parallel-steps-1.png){: .wd100}

## GitHub Actions 병렬 스텝은 무엇이 달라졌나

### shell backgrounding과 다르게 로그와 실패를 분리한다

예전에도 이런 코드는 가능했다.

```yaml
steps:
  - name: Start server and run tests
    run: |
      npm run dev &
      npm test
```

문제는 이게 CI 플랫폼이 이해하는 병렬성이 아니라 shell 안에서 몰래 만든 병렬성이라는 점이다. 서버 로그와 테스트 로그가 섞인다. 서버가 실패해도 언제 실패했는지 애매하다. 프로세스가 남는지, post step에서 정리되는지, 실패를 어느 step 책임으로 봐야 하는지도 흐려진다.

새 문법은 그 의도를 Actions 레벨로 끌어올린다. [GitHub Docs의 workflow syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)는 `background: true`를 “step을 비동기로 실행하고 job은 다음 step으로 계속 진행한다”로 설명한다. 그리고 나중에 `wait`나 `wait-all`로 기다리거나, `cancel`로 정리할 수 있다. 여기서 중요한 건 실행 로그와 step 상태가 플랫폼 안에 남는다는 점이다.

이건 디버깅 체감이 다르다. CI가 깨졌을 때 개발자는 “어느 명령이 실패했나”보다 “어느 단계의 책임인가”를 먼저 본다. shell 안에 숨긴 병렬 작업은 이 책임선을 지운다. 반대로 YAML에 드러난 병렬 step은 리뷰할 수 있고, 검색할 수 있고, 나중에 다른 팀원이 봐도 의도를 읽을 수 있다.

### `background`, `wait`, `parallel`의 역할이 다르다

이번 업데이트에서 제일 헷갈리기 쉬운 건 `background`와 `parallel`을 같은 기능으로 보는 것이다. 둘 다 동시에 실행하지만 쓰임새가 다르다.

`background`는 길게 살아 있는 작업에 맞다. 테스트 서버, 데이터베이스, 캐시, 모니터링 스크립트처럼 뒤에서 켜두고 다음 step이 그 위에서 일하는 경우다. 특정 background step에 `id`를 주고, 나중에 `wait`로 기다리거나 `cancel`로 멈출 수 있다.

`parallel`은 독립적인 step 묶음을 한 번에 실행하고 끝에서 같이 기다리는 shorthand에 가깝다. 프론트엔드 빌드, 백엔드 빌드, 문서 빌드처럼 서로 독립이고 결과만 모두 필요할 때 잘 맞는다. Docs도 `parallel`을 “그룹 step을 동시에 돌린 뒤 계속 진행하는 편의 문법”으로 설명한다.

```yaml
steps:
  - name: Build components in parallel
    parallel:
      - name: Build frontend
        run: npm run build:frontend
      - name: Build backend
        run: npm run build:backend
      - name: Build docs
        run: npm run build:docs

  - name: Run integration tests
    run: npm run test:integration
```

이 정도 문법이면 워크플로우 리뷰에서 바로 얘기할 수 있다. “이 세 개는 독립인가?”, “캐시 경합은 없나?”, “테스트는 빌드 산출물을 어디서 받나?” 같은 질문이 자연스럽게 나온다. 병렬화가 shell trick이 아니라 설계 대상이 되는 순간이다.

## CI 시간을 줄이는 것보다 실패 모델이 더 중요하다

### 병렬화는 실패를 빨리 보여주지만 원인도 늘린다

병렬 실행은 항상 달콤하다. 빌드 3개를 순서대로 15분 돌리던 걸 동시에 6분 안에 끝내면 바로 기분이 좋아진다. 특히 PR마다 CI를 기다리는 팀에서는 몇 분 차이가 꽤 크다. 리뷰 흐름도 빨라지고, 작은 수정이 쌓이는 답답함도 줄어든다.

근데 운영자는 여기서 한 번 멈춰야 한다. 병렬화는 시간만 줄이지 않는다. 동시에 실패할 수 있는 표면도 늘린다. 캐시 키가 겹치거나, 같은 포트를 쓰거나, 워크스페이스 파일을 동시에 수정하거나, 테스트 데이터베이스를 공유하면 “가끔 깨지는 CI”가 된다. 순차 실행에서는 우연히 가려졌던 의존성이 병렬 실행에서 드러난다.

그래서 나는 이 기능을 무조건 켜는 쪽보다, 독립성이 이미 명확한 구간부터 쓰는 게 맞다고 본다. 예를 들면 lint, typecheck, unit test처럼 읽기 중심이고 산출물 공유가 적은 작업이다. 반대로 같은 디렉토리에 빌드 산출물을 쓰거나, 같은 컨테이너 네트워크를 만지거나, 배포 credential을 공유하는 step은 더 조심해야 한다.

### `wait` 지점이 곧 품질 게이트가 된다

`wait`는 단순히 기다리는 문법이 아니다. 사실상 품질 게이트다. background로 띄운 작업이 실패했다면, 그 실패는 `wait`에서 job 실패로 올라온다. 이 구조를 잘 쓰면 “병렬로 빨리 돌리되, 합류 지점에서는 확실히 실패를 확인한다”는 흐름을 만들 수 있다.

예를 들어 프론트와 백엔드 빌드를 동시에 돌리고, lint도 그 사이에 돌린 뒤, 두 빌드가 끝난 다음 통합 테스트로 들어갈 수 있다.

```yaml
steps:
  - name: Build frontend
    id: build-frontend
    run: npm run build:frontend
    background: true

  - name: Build backend
    id: build-backend
    run: npm run build:backend
    background: true

  - name: Lint while builds run
    run: npm run lint

  - name: Wait for builds
    wait: [build-frontend, build-backend]

  - name: Run integration tests
    run: npm run test:integration
```

이런 구조는 읽기 좋다. “lint는 빌드와 독립이고, integration test는 두 빌드 결과가 필요하다”는 의도가 그대로 보인다. 나는 CI YAML이 이 정도까지 설명적이어야 한다고 본다. CI는 한 번 작성하고 끝나는 파일이 아니라, 팀의 배포 습관이 쌓이는 운영 문서에 가깝기 때문이다.

{% include pre-version.html %}

다만 너무 많은 step을 한 job 안에 몰아넣으면 또 다른 문제가 생긴다. Docs 기준으로 한 job 안에서 동시에 실행되는 background step은 최대 10개다. 이 제한 자체보다 중요한 건, 한 job 안의 병렬성이 커질수록 job 경계가 흐려진다는 점이다.

![background와 wait로 병렬 작업을 조율하는 GitHub Actions 흐름](/static/img/posts/github-actions-parallel-steps/github-actions-parallel-steps-2.png){: .wd100}

## job 병렬과 step 병렬을 섞는 기준

### job은 격리, step은 흐름 제어에 가깝다

GitHub Actions에는 이미 job 병렬 실행이 있었다. [Using jobs in a workflow](https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow) 문서처럼 job을 나누고 `needs`로 의존성을 걸면, 러너도 분리되고 로그도 분리되고 권한도 나누기 쉽다. [matrix strategy](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)는 여러 런타임이나 OS 조합을 동시에 돌릴 때 여전히 자연스럽다.

그럼 step 병렬은 어디에 쓰는 게 좋을까. 내 기준은 이렇다.

| 상황 | 더 맞는 선택 |
|---|---|
| 서로 다른 OS, Node 버전, Python 버전을 테스트한다 | job matrix |
| 권한, secret, runner 크기를 다르게 가져가야 한다 | 별도 job |
| 같은 환경에서 독립 빌드 몇 개를 동시에 끝내고 싶다 | `parallel` |
| 서버나 DB를 켜두고 테스트를 진행한다 | `background` + `cancel` |
| 실패 로그를 완전히 분리해야 한다 | 별도 job |

step 병렬은 runner 하나 안에서 흐름을 더 잘 쓰는 도구에 가깝다. job 병렬은 격리와 확장 단위다. 이 둘을 헷갈리면 CI가 빨라지는 대신 이해하기 어려워진다. 모든 걸 step 병렬로 몰아넣으면 job 하나가 너무 뚱뚱해지고, 모든 걸 job으로 쪼개면 setup 비용과 artifact 전달이 늘어난다.

이전에 [HTTP QUERY 메서드 글](/infra/2026/06/18/http-query-method.html)에서 메서드가 단순 문자열이 아니라 운영 신호라고 썼다. CI 문법도 비슷하다. job으로 나누느냐, step 안에서 background로 돌리느냐는 “이 작업을 어떤 실패 단위로 볼 것인가”라는 신호다. 빠른지보다 먼저 이 신호가 읽혀야 한다.

### 러너 비용과 캐시 전략도 같이 봐야 한다

병렬화는 공짜가 아니다. job을 많이 쪼개면 러너가 더 많이 필요하고, step을 병렬로 돌리면 같은 러너 안에서 CPU, 메모리, 디스크 I/O를 더 세게 쓴다. 작은 오픈소스 프로젝트에서는 괜찮아 보여도, 큰 monorepo나 Docker 빌드가 많은 팀에서는 runner 크기와 캐시 정책이 바로 따라온다.

예를 들어 프론트 빌드와 백엔드 빌드가 둘 다 CPU를 많이 쓰고, 동시에 같은 패키지 캐시를 읽고, Docker layer cache까지 만진다면 병렬화가 오히려 느려질 수 있다. 반대로 lint처럼 CPU가 가볍고 I/O도 적은 작업은 빌드 옆에서 돌려도 이득이 크다. 결국 “독립인가?”와 “자원을 다르게 쓰는가?”를 같이 봐야 한다.

나는 팀이 이 기능을 도입한다면 먼저 CI 시간을 쪼개서 봤으면 한다. 어떤 step이 오래 걸리는지, 어떤 step이 CPU bound인지, 어떤 step이 네트워크를 기다리는지, 어떤 step이 캐시를 쓰는지. 이 지도가 있어야 병렬화가 개선이 된다. 지도 없이 YAML만 바꾸면 그냥 더 복잡한 CI가 된다.

## 바로 적용한다면 이렇게 시작하겠다

### 후보는 작고 독립적인 step부터 잡는다

내가 운영하는 저장소에 바로 넣는다면, 처음부터 핵심 배포 job을 건드리지는 않을 것 같다. 먼저 PR 검증 job에서 독립성이 강한 step을 찾는다.

```text
1. lint와 typecheck가 서로 독립인지 본다.
2. unit test와 build가 같은 파일을 쓰지 않는지 확인한다.
3. 병렬화 전후로 CI 총 시간과 실패율을 비교한다.
4. flaky test가 늘면 바로 되돌릴 수 있게 작은 PR로 넣는다.
5. wait 지점과 cancel 지점에 이름을 명확히 붙인다.
```

이 정도면 리스크가 작다. 특히 처음에는 “빠르게 끝났다”보다 “깨졌을 때 읽기 쉬운가”를 더 봐야 한다. 병렬 CI는 성공할 때보다 실패할 때 설계가 드러난다. 로그가 분리되어 있는지, 어떤 background step이 실패했는지, 기다리는 지점이 명확한지, 남은 프로세스가 없는지 확인해야 한다.

### 장기 실행 서비스는 `cancel`까지 한 세트로 본다

테스트용 서버나 DB를 background로 띄우는 패턴은 꽤 유용해 보인다. 하지만 이 경우에는 시작보다 종료가 더 중요하다. `cancel`을 넣지 않거나, implicit cleanup만 믿으면 나중에 러너 상태나 로그가 지저분해질 수 있다.

그래서 장기 실행 step에는 이름, id, health check, cancel을 같이 붙이는 게 낫다. 서버를 띄웠으면 바로 테스트로 넘어가기 전에 포트가 열렸는지 확인하고, 테스트가 끝난 뒤 명시적으로 멈춘다. 이건 CI뿐 아니라 로컬 개발 스크립트에서도 똑같이 중요한 습관이다.

개인적으로 이번 업데이트는 GitHub Actions가 점점 “명령어 실행기”에서 “작업 오케스트레이터” 쪽으로 가고 있다는 신호처럼 보인다. 예전에는 복잡한 흐름을 shell script 안에 숨겼다. 이제는 그 흐름 일부를 workflow 문법으로 끌어올릴 수 있다. 팀 입장에서는 좋은 일이다. 숨은 shell보다 드러난 YAML이 리뷰하기 쉽다.

## 마치며

GitHub Actions 병렬 스텝은 화려한 AI 기능도 아니고, 제품 발표처럼 시끄러운 업데이트도 아니다. 그런데 실무 CI를 오래 만진 사람한테는 꽤 현실적인 변화다. 빌드 시간을 줄이는 것만이 아니라, “이 작업은 동시에 돌아도 된다”, “여기서 기다려야 한다”, “이 서비스는 끝나면 멈춰야 한다”를 workflow 안에 명시할 수 있게 됐다.

다만 병렬화는 언제나 운영 부채와 같이 온다. 독립성이 없는 step을 억지로 동시에 돌리면 flaky CI가 되고, 러너 자원을 모르고 겹치면 속도가 오히려 떨어지고, 실패 게이트를 흐리면 디버깅 시간이 늘어난다. 그래서 이 기능은 성급하게 전체 워크플로우에 뿌리기보다, 작은 PR 검증 job에서 시작하는 게 맞다.

내 기준으로는 `parallel`은 독립 빌드 묶음에, `background`는 서버나 DB처럼 뒤에서 살아 있어야 하는 작업에, `wait`는 품질 게이트에 쓰는 게 가장 깔끔하다. 그렇게 쓰면 GitHub Actions 병렬 스텝은 단순한 시간 단축 기능이 아니라, CI 설계를 더 읽기 좋게 만드는 문법이 될 수 있다.
