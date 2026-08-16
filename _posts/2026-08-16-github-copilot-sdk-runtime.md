---
layout: post
title: "GitHub Copilot SDK GA, 에이전트 런타임의 실제 경계"
description: "GitHub Copilot SDK가 GA로 전환됐다. JSON-RPC 런타임, BYOK, 도구 권한, 인프로세스 전송이 실제 제품 설계에서 뜻하는 바를 정리한다."
date: 2026-08-16 17:40:00 +0900
categories: [github]
tags: [GitHubCopilot, CopilotSDK, AI에이전트, JSONRPC, BYOK]
image: github-copilot-sdk-runtime/github-copilot-sdk-runtime-1.webp
lang: ko
published: true
---

GitHub Copilot SDK가 정식 출시됐다는 소식을 보고 처음 든 생각은 “이제 Copilot을 API로 부를 수 있나?”가 아니었다. 더 정확히는, Copilot CLI가 하던 일을 애플리케이션 안에 얼마나 안전하게 끼워 넣을 수 있느냐가 궁금했다. GitHub는 SDK를 Copilot CLI와 같은 에이전트 런타임을 프로그램에서 호출하는 방법으로 설명한다. 자동완성 라이브러리 하나가 추가된 게 아니라, 계획·도구 호출·파일 수정까지 포함한 실행 루프를 서비스에 붙이는 선택지가 생긴 셈이다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/github-copilot-sdk-runtime/github-copilot-sdk-runtime-1-400.webp 400w,
            /static/img/posts/github-copilot-sdk-runtime/github-copilot-sdk-runtime-1-800.webp 800w,
            /static/img/posts/github-copilot-sdk-runtime/github-copilot-sdk-runtime-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/github-copilot-sdk-runtime/github-copilot-sdk-runtime-1.webp"
    alt="GitHub Copilot SDK 에이전트 런타임과 애플리케이션 연결 구조를 표현한 밝은 기술 일러스트"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## GitHub Copilot SDK는 무엇을 묶어 제공하나

### SDK보다 런타임 경계가 핵심이다

공식 저장소의 설명을 보면 SDK는 Python, TypeScript, Go, .NET, Java, Rust를 지원한다. 언어별 클라이언트가 각각 독립적인 모델 호출 API를 제공하는 방식이 아니다. 각 SDK는 Copilot CLI 서버와 JSON-RPC로 통신하고, CLI 프로세스의 수명까지 관리한다. 애플리케이션에서 SDK 클라이언트를 만들면 뒤에서 Copilot CLI가 서버 모드로 올라오고, 클라이언트는 세션과 이벤트를 주고받는다.

이 구조는 장점과 제약을 동시에 만든다. 장점은 직접 오케스트레이터를 새로 만들지 않아도 된다는 점이다. 계획을 세우고, 도구를 부르고, 파일을 수정하고, 결과 이벤트를 보내는 흐름이 이미 런타임에 있다. 반대로 API 서버 하나를 호출하는 것과 달리 프로세스, 권한, 세션, 종료 처리를 제품이 책임져야 한다. SDK를 넣는 순간 “모델을 호출했다”가 아니라 “작업을 수행하는 실행기를 임베드했다”에 가까워진다.

### JSON-RPC는 단순한 내부 구현이 아니다

JSON-RPC를 중간 경계로 둔 덕분에 애플리케이션과 에이전트 실행기를 분리할 수 있다. 외부 CLI 서버에 연결하거나, SDK가 CLI 수명을 직접 관리하도록 선택할 수 있다는 설명도 있다. 작은 로컬 도구라면 기본 프로세스 관리가 편하다. 여러 사용자가 접속하는 서버라면 세션을 어디에 보관하고, 어떤 작업을 어떤 사용자에게 귀속할지부터 설계해야 한다.

여기서 중요한 건 네트워크 프로토콜을 쓴다는 사실이 아니다. 실패가 어느 경계에서 발생했는지를 기록할 수 있다는 점이다. 애플리케이션이 요청을 받았는지, SDK가 세션을 만들었는지, CLI가 도구를 실행했는지, 모델 응답을 반환했는지를 각각 관측할 수 있어야 한다. 에이전트가 조용히 멈추는 문제는 모델 품질보다 이 경계 설계에서 먼저 생긴다.

## 기능이 늘수록 권한 모델이 먼저다

### 기본 도구를 그대로 켜면 편하지만 위험하다

Copilot SDK 문서에는 기본적으로 Copilot CLI의 퍼스트파티 도구가 노출된다고 적혀 있다. SDK마다 권한 핸들러로 도구 호출을 승인·거부·수정할 수 있고, 도구 가용성도 사용자 정의할 수 있다. 이 문장을 “도구가 많아 편하다”로 읽으면 곤란하다. 파일 쓰기, 셸 실행, 네트워크 호출이 가능한 에이전트를 고객 요청과 바로 연결하는 순간, 권한 핸들러가 사실상 제품의 보안 경계가 된다.

가장 작은 운영 기준은 작업 종류마다 허용 도구 목록을 따로 두는 것이다. 코드 설명은 읽기 도구만, 테스트 실행은 제한된 명령만, 배포 준비는 별도 승인 세션만 사용한다. 한 번 승인한 도구를 세션 전체에 영구 적용하지도 않는다. 에이전트가 다음 단계에서 어떤 도구를 요청할지 예측하기 어렵기 때문에, 요청 시점의 목적·대상 파일·사용자·세션 만료 시간을 함께 확인하는 편이 낫다.

### 멀티테넌트 샘플은 제품 설계가 아니다

공식 세션 서버 샘플은 여러 사용자가 SDK를 쓰는 흐름을 보여주지만, 인증과 세션 권한이 구현되어 있지 않고 운영 환경에 바로 배포할 수 없다고 명시한다. 이 경고가 꽤 중요하다. 에이전트 서버는 채팅 UI보다 백엔드에 가깝다. 로그인한 사용자가 다른 사용자의 세션을 재개할 수 없는지, 작업 결과가 다른 테넌트의 파일과 섞이지 않는지, 도구 승인 기록을 감사할 수 있는지를 먼저 확인해야 한다.

이전 글에서 [Codex 운영 기준과 긴 에이전트 작업](/ai/2026/07/06/gpt56-sol-codex-ops.html)을 정리하면서도 비슷한 결론에 도달했다. 모델이 좋아질수록 맡기는 작업이 길어진다. 작업이 길어질수록 실행 권한과 중단 기준은 모델 성능보다 중요해진다. Copilot SDK도 이 흐름의 예외가 아니다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/github-copilot-sdk-runtime/github-copilot-sdk-runtime-2-400.webp 400w,
            /static/img/posts/github-copilot-sdk-runtime/github-copilot-sdk-runtime-2-800.webp 800w,
            /static/img/posts/github-copilot-sdk-runtime/github-copilot-sdk-runtime-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/github-copilot-sdk-runtime/github-copilot-sdk-runtime-2.webp"
    alt="Copilot SDK의 도구 승인과 세션 격리를 밝은 보안 제어 흐름으로 표현한 기술 일러스트"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## BYOK와 인프로세스 전송이 바꾸는 것

### BYOK는 비용 버튼이 아니라 책임 이동이다

SDK는 GitHub Copilot 구독을 사용하는 방식 외에 BYOK(Bring Your Own Key)를 지원한다. OpenAI, Microsoft Foundry, Anthropic 같은 공급자의 키를 직접 설정해 GitHub 인증 없이 사용할 수 있다는 설명이다. 이 선택은 모델 공급자를 바꿀 수 있다는 의미 이상이다. 키 저장, 사용량 추적, 테넌트별 한도, 데이터 보존 정책을 애플리케이션이 직접 책임진다는 뜻이다.

특히 “키가 있으니 호출하면 된다”는 접근은 위험하다. 에이전트 세션에 들어간 컨텍스트가 어떤 공급자로 흘러가는지, 도구 결과에 고객 데이터가 섞이는지, 장애가 났을 때 재시도하면서 비용이 늘어나는지를 관측해야 한다. BYOK를 켠다면 공급자별 모델·비용·지연시간을 분리해서 기록하고, 한 작업이 사용할 수 있는 최대 호출 수와 토큰 예산을 세션에 붙이는 편이 현실적이다.

### 인프로세스 FFI는 지연을 줄이지만 격리를 줄인다

최근 SDK 변경 내역에는 네이티브 라이브러리를 C ABI로 로드하는 인프로세스(FFI) 전송이 추가됐다고 나온다. 별도 자식 프로세스를 띄우는 비용이 없어질 수 있다는 점은 매력적이다. 짧은 요청이 많은 애플리케이션에서는 초기화 지연과 프로세스 관리 부담을 줄이는 데 도움이 된다.

다만 같은 프로세스 안에 들어온다는 건 장애와 자원 고갈의 경계도 가까워진다는 말이다. SDK 런타임이 메모리를 많이 쓰거나 네이티브 오류가 발생할 때 애플리케이션 전체에 영향을 줄 수 있다. FFI를 곧바로 생산 기본값으로 삼기보다, 작업 유형과 트래픽을 나눠 프로세스 전송과 비교하는 게 맞다. 지연시간 하나만 줄이고 장애 격리와 재시작 전략을 잃으면 운영 이득이 아니다.

## 도구 검색이 알려주는 에이전트의 다음 문제

### 모든 도구를 프롬프트에 넣지 않는 이유

SDK v1.0.7 변경 내역에는 도구 수가 임계치를 넘으면 MCP와 외부 도구를 처음부터 모두 넣지 않고, 내장 `tool_search_tool`을 통해 필요할 때 노출하는 옵션이 추가됐다고 적혀 있다. 컨텍스트를 절약하고 도구 설명이 너무 길어지는 문제를 완화하려는 방향이다.

이건 단순한 최적화가 아니다. 도구 검색을 쓰면 에이전트가 어떤 도구를 “발견”할 수 있었는지와 실제로 어떤 도구를 선택했는지가 실행 기록의 일부가 된다. 같은 질문이라도 등록된 도구 집합과 검색 결과에 따라 행동이 달라질 수 있다. 재현 가능한 테스트를 만들려면 모델 입력만 저장해서는 부족하고, 세션에서 검색 가능한 도구 목록과 검색 결과까지 함께 남겨야 한다.

도구 이름이 비슷한 경우에는 더 조심해야 한다. `read_file`, `write_file`, `run_command`가 여러 서버에서 중복 제공되면 에이전트가 선택 이유를 설명하지 못한 채 다른 권한의 도구를 고를 수 있다. 제품에 붙일 때는 도구 이름, 설명, 입력 스키마를 조직의 권한 체계와 맞추고, 검색 결과가 정책을 우회하지 않는지 테스트해야 한다.

### “에이전트를 임베드했다” 이후의 체크리스트

실제로 SDK를 도입한다면 첫 버전의 성공 기준을 모델 평가 점수로 잡지 않겠다. 다음 네 가지가 먼저다.

1. 세션마다 사용자·테넌트·작업 디렉터리가 분리되는가.
2. 도구 호출이 승인·거부·실패·취소 상태로 남는가.
3. 런타임 재시작 뒤에도 작업을 안전하게 중단하거나 재개할 수 있는가.
4. 모델·공급자·도구별 비용과 지연을 한 화면에서 볼 수 있는가.

이 네 가지가 갖춰지면 그다음에 모델 교체나 프롬프트 개선을 해도 비교가 된다. 반대로 이 기록이 없으면 에이전트가 잘한 건지, 우연히 통과한 건지, 위험한 도구를 호출하지 않은 건지 알기 어렵다.

Copilot SDK의 GA는 개발자에게 “나만의 Copilot을 만들라”는 초대처럼 보인다. 내가 보기엔 더 현실적인 메시지가 있다. 이제 에이전트를 제품 기능으로 넣을 수 있으니, 실행기 운영도 제품 수준으로 설계하라는 뜻이다. JSON-RPC, BYOK, FFI, 도구 검색은 각각 멋진 기능이지만, 실제 경쟁력은 세션 경계와 권한 로그, 실패 복구에서 나온다.

참고한 공식 자료는 [Copilot SDK 저장소](https://github.com/github/copilot-sdk), [GitHub Docs의 시작 가이드](https://docs.github.com/en/copilot/how-tos/copilot-sdk/getting-started), [SDK GA 발표](https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/), [SDK 변경 내역](https://github.com/github/copilot-sdk/blob/main/CHANGELOG.md), [Node.js SDK 문서](https://github.com/github/copilot-sdk/blob/main/nodejs/README.md), [세션 서버 샘플](https://github.com/github/copilot-sdk-server-sample)이다.
