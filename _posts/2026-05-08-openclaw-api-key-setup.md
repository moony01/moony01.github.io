---
layout: post
title: "Claude·Gemini API 키 발급 방법: 처음 쓰는 사람을 위한 전체 흐름"
description: "Claude API 키와 Gemini API 키를 어디서 만들고, 결제·사용량·쿼터를 어디서 확인하는지 실제 화면 기준으로 정리했습니다."
date: 2026-05-08 15:20:00 +0900
categories: [ai]
tags: [Claude, Gemini, API키, Anthropic, GoogleAIStudio, AI개발]
image: openclaw-api-key-setup/openclaw-api-key-thumbnail.webp
lang: ko
published: true
---

AI 앱, 자동화 스크립트, 에이전트 도구를 직접 써보려면 대부분 **API 키**가 필요합니다. ChatGPT나 Claude 웹사이트에서 대화하는 것과 달리, API 키는 내 프로그램이 모델 제공사의 서버를 호출할 수 있게 해주는 인증키입니다.

이 글에서는 가장 많이 쓰이는 두 가지 경로를 실제 화면 기준으로 정리합니다.

- Anthropic **Claude API 키**
- Google **Gemini API 키**

처음 발급하는 사람도 따라 할 수 있게 로그인 위치, 키 생성 버튼, 결제·사용량·쿼터 확인 메뉴까지 한 번에 묶었습니다.

{% include pre-version.html %}

## API 키를 만들기 전에 알아둘 점

API 키는 비밀번호와 비슷하게 다뤄야 합니다. 키를 아는 사람은 내 계정의 사용량을 발생시킬 수 있습니다.

그래서 기본 원칙은 간단합니다.

**API 키를 공개 채팅, GitHub, 블로그, 스크린샷, 이메일에 그대로 노출하지 마세요.**

특히 아래 상황을 조심해야 합니다.

| 상황 | 주의할 점 |
|---|---|
| 블로그나 문서 작성 | 키 문자열은 반드시 가리기 |
| GitHub에 코드 업로드 | `.env` 파일을 커밋하지 않기 |
| 다른 사람에게 설치 도움 요청 | 키 값을 채팅으로 보내지 않기 |
| 테스트 코드 작성 | 예제에는 가짜 키나 환경변수명만 쓰기 |

## 빠른 시작 URL

아래 두 주소만 알고 있어도 대부분의 발급 흐름은 시작할 수 있습니다.

| 제공사 | API 키 페이지 |
|---|---|
| Claude | [https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| Gemini | [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey) |

Anthropic 공식 문서는 Claude API가 Console에서 제공되며, Workbench와 계정 설정에서 API 키를 생성할 수 있다고 안내합니다. Google 공식 문서는 Gemini API 키를 Google AI Studio의 API Keys 페이지에서 생성하고 관리한다고 안내합니다.

## Claude API 키 발급하기

### 1. Claude Console에 로그인합니다

Claude API 키는 일반 Claude 채팅 화면이 아니라 **Claude Console**에서 발급합니다.

[https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

처음 접속하면 Google 계정 또는 이메일로 로그인하는 화면이 보일 수 있습니다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/openclaw-api-key-setup/claude-api-key-1-400.webp 400w,
            /static/img/posts/openclaw-api-key-setup/claude-api-key-1-800.webp 800w,
            /static/img/posts/openclaw-api-key-setup/claude-api-key-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/openclaw-api-key-setup/claude-api-key-1.webp"
    alt="Claude Console 로그인 화면"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

### 2. API 키 메뉴로 이동합니다

로그인 후 왼쪽 메뉴에서 **API 키**를 선택합니다. 기존 키 목록이 보이고, 오른쪽 위에 **키 생성** 버튼이 있습니다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/openclaw-api-key-setup/claude-api-key-2-400.webp 400w,
            /static/img/posts/openclaw-api-key-setup/claude-api-key-2-800.webp 800w,
            /static/img/posts/openclaw-api-key-setup/claude-api-key-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/openclaw-api-key-setup/claude-api-key-2.webp"
    alt="Claude Console API 키 목록과 키 생성 버튼"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

이 화면에서는 키 목록, 마지막 사용 시각, 비용 관련 정보를 함께 확인할 수 있습니다. 왼쪽 메뉴의 **결제**와 **한도**도 같이 봐두면 좋습니다.

### 3. 키 이름을 입력합니다

키 생성 창이 뜨면 구분하기 쉬운 이름을 입력합니다. 예를 들어 `personal-test`, `local-agent`, `blog-demo`처럼 용도를 알 수 있게 적는 방식이 좋습니다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/openclaw-api-key-setup/claude-api-key-3-400.webp 400w,
            /static/img/posts/openclaw-api-key-setup/claude-api-key-3-800.webp 800w,
            /static/img/posts/openclaw-api-key-setup/claude-api-key-3.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/openclaw-api-key-setup/claude-api-key-3.webp"
    alt="Claude API 키 생성 창"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

### 4. 생성된 키를 복사합니다

키가 생성되면 한 번만 확인할 수 있습니다. **키 복사** 버튼을 눌러 복사한 뒤, 안전한 비밀 관리 도구나 로컬 환경변수에 저장합니다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/openclaw-api-key-setup/claude-api-key-4-400.webp 400w,
            /static/img/posts/openclaw-api-key-setup/claude-api-key-4-800.webp 800w,
            /static/img/posts/openclaw-api-key-setup/claude-api-key-4.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/openclaw-api-key-setup/claude-api-key-4.webp"
    alt="Claude API 키 저장 및 복사 화면"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

이 키 값은 나중에 다시 볼 수 없습니다. 복사하지 못했다면 기존 키를 삭제하고 새로 만들면 됩니다.

## Gemini API 키 발급하기

### 1. Google AI Studio API 키 화면으로 이동합니다

Gemini API 키는 Google AI Studio에서 발급합니다.

[https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)

왼쪽 메뉴에서 **API 키**가 선택된 상태인지 확인하고, 오른쪽 위의 **API 키 만들기** 버튼을 누릅니다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/openclaw-api-key-setup/gemini-api-key-1-400.webp 400w,
            /static/img/posts/openclaw-api-key-setup/gemini-api-key-1-800.webp 800w,
            /static/img/posts/openclaw-api-key-setup/gemini-api-key-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/openclaw-api-key-setup/gemini-api-key-1.webp"
    alt="Google AI Studio API 키 목록과 API 키 만들기 버튼"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

Google 공식 문서 기준으로 Gemini API 키는 Google Cloud 프로젝트와 연결됩니다. 처음 쓰는 계정이라면 기본 프로젝트가 자동으로 생성되거나, 기존 프로젝트를 가져와서 사용할 수 있습니다.

### 2. 키 이름과 프로젝트를 확인합니다

새 키 만들기 창에서 키 이름을 적고, 사용할 Google Cloud 프로젝트를 선택합니다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/openclaw-api-key-setup/gemini-api-key-2-400.webp 400w,
            /static/img/posts/openclaw-api-key-setup/gemini-api-key-2-800.webp 800w,
            /static/img/posts/openclaw-api-key-setup/gemini-api-key-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/openclaw-api-key-setup/gemini-api-key-2.webp"
    alt="Gemini API 키 만들기 창"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

프로젝트가 여러 개라면 테스트용 프로젝트와 운영용 프로젝트를 분리하는 편이 안전합니다.

### 3. 생성된 키를 복사합니다

키 생성 후 세부정보 창에서 **키 복사** 버튼을 눌러 복사합니다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/openclaw-api-key-setup/gemini-api-key-3-400.webp 400w,
            /static/img/posts/openclaw-api-key-setup/gemini-api-key-3-800.webp 800w,
            /static/img/posts/openclaw-api-key-setup/gemini-api-key-3.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/openclaw-api-key-setup/gemini-api-key-3.webp"
    alt="Gemini API 키 세부정보와 키 복사 버튼"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

Google 공식 문서는 `GEMINI_API_KEY` 또는 `GOOGLE_API_KEY` 환경변수로 API 키를 설정할 수 있다고 안내합니다. 둘 다 설정되어 있으면 `GOOGLE_API_KEY`가 우선합니다.

## 결제, 사용량, 쿼터 확인 위치

API 키를 만들었다면 결제와 사용량 메뉴도 꼭 확인해야 합니다. 테스트만 하려다가 예상보다 많은 호출이 발생할 수 있기 때문입니다.

| 제공사 | 확인 위치 | 확인할 내용 |
|---|---|---|
| Claude | Claude Console의 **결제**, **한도**, **사용량**, **API 키** | 크레딧 잔액, 자동 충전, 사용 한도, 키별 비용 |
| Gemini | Google AI Studio의 **사용량**, **비율 제한**, **지출**, **결제** | API 호출량, rate limit, quota, 결제 프로젝트 |

Anthropic은 API 사용량을 선불 크레딧으로 결제하며, Billing 페이지에서 크레딧 사용과 잔액을 확인할 수 있다고 안내합니다. Google은 Gemini API 결제에 Google Cloud Billing을 사용하며, 결제 활성화 후 AI Studio에서 사용량을 모니터링할 수 있다고 안내합니다.

Gemini API의 rate limit은 보통 다음 기준으로 관리됩니다.

- RPM: 분당 요청 수
- TPM: 분당 입력 토큰 수
- RPD: 일일 요청 수

Google 공식 문서 기준으로 Gemini API rate limit은 API 키가 아니라 **프로젝트 단위**로 적용됩니다.

## 안전하게 보관하는 방법

가장 흔한 실수는 API 키를 코드에 직접 적는 것입니다.

나쁜 예:

```js
const apiKey = "실제_API_키_문자열";
```

더 나은 방식:

```bash
export GEMINI_API_KEY="실제_API_키_문자열"
```

그리고 코드에서는 환경변수를 읽습니다.

```js
const apiKey = process.env.GEMINI_API_KEY;
```

로컬 프로젝트라면 `.env` 파일을 쓸 수 있지만, `.env`는 반드시 `.gitignore`에 넣어야 합니다.

## 문제가 생겼을 때 확인할 것

API 호출이 실패하면 키 자체보다 아래 항목에서 문제가 나는 경우가 많습니다.

| 증상 | 확인할 것 |
|---|---|
| 인증 실패 | 키를 잘못 복사했는지, 앞뒤 공백이 들어갔는지 확인 |
| 결제 오류 | 결제 계정 또는 크레딧 잔액 확인 |
| rate limit 오류 | 사용량, 비율 제한, 프로젝트 quota 확인 |
| 모델 호출 실패 | 해당 API 키가 연결된 프로젝트에서 모델 사용이 가능한지 확인 |
| 키가 목록에 안 보임 | Google AI Studio에서 프로젝트를 가져왔는지 확인 |

## 정리

Claude와 Gemini 모두 API 키 발급 자체는 어렵지 않습니다. 중요한 건 키를 만든 뒤의 관리입니다.

1. API 키는 Console 또는 AI Studio의 공식 키 페이지에서 만든다.
2. 키 값은 한 번만 보이는 경우가 많으므로 생성 직후 안전하게 보관한다.
3. 결제, 사용량, rate limit 위치를 같이 확인한다.
4. 키는 코드에 직접 넣지 말고 환경변수나 비밀 관리 도구로 관리한다.
5. 공개 저장소, 스크린샷, 채팅에 실제 키를 노출하지 않는다.

이 다섯 가지만 지켜도 개인 프로젝트나 AI 에이전트 실험을 시작할 때 생기는 대부분의 보안·과금 사고를 피할 수 있습니다.

## 공식 참고 링크

- [Anthropic API Overview](https://docs.anthropic.com/en/api/overview)
- [Anthropic API 결제 안내](https://support.anthropic.com/en/articles/8977456-how-do-i-pay-for-my-api-usage)
- [Anthropic Console 비용·사용량 리포트](https://support.anthropic.com/en/articles/9534590-cost-and-usage-reporting-in-console)
- [Gemini API 키 공식 문서](https://ai.google.dev/gemini-api/docs/api-key)
- [Gemini API 결제 공식 문서](https://ai.google.dev/gemini-api/docs/billing)
- [Gemini API rate limit 공식 문서](https://ai.google.dev/gemini-api/docs/rate-limits)
