---
layout: post
title: "Gemini 계정이 통째로 날아갔다 — OpenCode에서 쓰다 영구 차단당한 실화"
date: 2026-02-20 14:00:00 +0900
categories: [ai]
tags: [gemini, opencode, openclaw, 차단, google, ai]
published: true
image: gemini-opencode-account-ban-disaster-1.png
---

어제까지만 해도 잘 쓰고 있었다. OpenCode에서 Gemini 3.1 Pro Preview 모델을 에이전트에 연결해서 코드 리뷰도 돌리고, 문서도 정리하고. 근데 오늘 아침, 갑자기 이런 에러가 떴다.

```json
{
  "error": {
    "code": 403,
    "message": "This service has been disabled in this account for violation of Terms of Service.",
    "status": "PERMISSION_DENIED"
  }
}
```

처음엔 API 키가 만료됐나 싶었다. 근데 아니었다. **Google 계정 자체가 차단**된 거였다. Gemini만 안 되는 게 아니라 AI Studio, Gemini CLI, 심지어 웹 Gemini까지 전부 막혔다. 그리고 나만 당한 게 아니었다.

{% include pre-version.html %}

## 2월 11일, 대규모 차단이 시작됐다

GitHub 이슈가 동시다발로 터졌다. `opencode-antigravity-auth#426`, `oh-my-opencode#1838`, `openclaw#14203` — 전부 같은 에러 메시지였다.

Reddit `r/google_antigravity`에는 "Google is permanently banning Antigravity users"라는 제목의 글이 올라왔고, 댓글창은 **"나도 당했다"**의 향연이었다.

실제 GitHub 이슈에서 확인된 피해 보고들을 정리하면 이렇다:

| 시간 | 사용자 | 증상 |
|------|--------|------|
| 2/11 08:39 | @ai-wonderwoman | 계정 비활성화, 403 반환 |
| 2/11 08:46 | @Darren901 | 동일 증상 확인 |
| 2/11 09:04 | @arku3 | "Verify your account" 403 발생 |
| 2/11 10:58 | @aayushrautela | ToS 위반 차단 메시지 수신 |
| 2/11 11:01 | @deedeedev | Gemini 전체 비활성화 확인 |

한 사용자의 디버그 로그에는 이런 내용이 찍혀 있었다:

```json
{
  "error": {
    "code": 403,
    "message": "Verify your account to continue.",
    "status": "PERMISSION_DENIED",
    "details": [{
      "@type": "type.googleapis.com/google.rpc.ErrorInfo",
      "reason": "VALIDATION_REQUIRED",
      "domain": "cloudcode-pa.googleapis.com"
    }]
  }
}
```

일부는 계정 인증을 다시 하면 풀렸지만, 다수는 **완전한 계정 레벨 차단**을 당했다. 유료 AI Pro 구독자도 예외 없이 당했다는 점이 충격적이었다.

![OAuth 토큰 흐름과 Google 보안 시스템의 차단 다이어그램](/static/img/_posts/gemini-opencode-account-ban-disaster/gemini-opencode-account-ban-disaster-2.png)

## 왜 차단당했나 — Google의 탐지 메커니즘

결론부터 말하면, **Antigravity OAuth 토큰을 제3자 CLI 래퍼에서 사용한 것**이 트리거다.

구조를 이해하면 간단하다. Google의 Gemini Code Assist는 원래 **IDE(VS Code, JetBrains 등) 안에서만** 사용하도록 설계된 서비스다. 무료 플랜이든 유료 플랜이든, `cloudcode-pa.googleapis.com` 엔드포인트에 OAuth 토큰으로 접근하는 구조다.

문제는 OpenCode, OpenClaw 같은 CLI 에이전트 도구들이 이 **같은 OAuth 토큰을 가로채서** headless 환경에서 API를 호출한다는 거다. Google 입장에서 보면:

1. **비정상 클라이언트**: IDE가 아닌 곳에서 오는 요청
2. **고볼륨 패턴**: 에이전트가 자동으로 대량 요청 전송
3. **다중 계정 전환**: Antigravity 플러그인의 계정 로테이션 기능

이 세 가지가 합쳐지면 Google의 Trust & Safety 자동화 시스템이 **"ToS 위반 자동화/API 리셀"**로 판단한다. 그리고 계정 단위로 차단을 건다.

```
차단 범위: Google 계정 전체
├── Gemini Web (gemini.google.com) → 차단
├── Gemini CLI → 차단
├── AI Studio → 차단
├── Google Cloud Code Assist → 차단
└── 모든 Gemini API 엔드포인트 → 차단
```

한마디로, **API 키 문제도 아니고 프로젝트 설정 문제도 아니다.** 계정 자체에 빨간 딱지가 붙는 거다.

{% include pre-version.html %}

## 복구할 수 있나 — 현실적인 가능성

에러 메시지에 나온 `gemini-code-assist-user-feedback@google.com`으로 이의 신청을 할 수 있다. 실제로 일부 사용자는 복구에 성공했다.

하지만 현실은 좀 다르다:

**복구 성공 케이스:**
- 개인 용도로 소량 사용한 경우
- 다중 계정 전환을 하지 않은 경우
- 이메일 발송 후 1~3 영업일 내 응답

**복구 실패 케이스:**
- 다중 계정 로테이션을 사용한 경우
- 대량의 API 호출 이력이 있는 경우
- 유료 구독이어도 사용 패턴이 비정상으로 분류된 경우

GitHub 이슈 `opencode-antigravity-auth#426`의 한 사용자는 이렇게 썼다:

> "I think the party is over!"

그리고 Reddit 링크를 달았다: "Google is permanently banning Antigravity users." 파티가 끝났다는 표현이 씁쓸하지만 정확했다.

## 구분법 — 설정 오류 vs 진짜 차단

같은 403이라도 두 가지 경우가 있다. 이걸 구분해야 대응을 제대로 할 수 있다.

**설정 오류 (복구 가능):**
- OpenCode/OpenClaw에서만 403 뜨고, Gemini 웹은 정상 동작
- 에러에 `VALIDATION_REQUIRED`가 포함됨
- 계정 인증 URL이 에러 상세에 포함됨
- → 인증 URL 클릭 후 계정 확인하면 해결

**계정 레벨 차단 (심각):**
- 래퍼뿐 아니라 Gemini 웹, AI Studio, CLI 전부 차단
- "This service has been disabled for violation of Terms of Service" 메시지
- `gemini-code-assist-user-feedback@google.com` 연락처 안내
- → 이의 신청 외에는 방법 없음

확인 방법은 간단하다. 브라우저에서 [gemini.google.com](https://gemini.google.com)에 직접 접속해보면 된다. 여기서도 차단되면 계정 레벨 차단이 확정이다.

## 대안 — 지금 당장 할 수 있는 것

### 1. 에이전트 모델을 Gemini에서 빼라

OpenCode의 `oh-my-opencode.json`에서 Gemini 모델을 전부 교체해야 한다. 나는 이렇게 바꿨다:

```json
{
  "agents": {
    "librarian": {
      "model": "openai/gpt-5.3-codex-spark"
    },
    "explore": {
      "model": "openai/gpt-5.3-codex"
    },
    "frontend-ui-ux-engineer": {
      "model": "openai/gpt-5.3-codex"
    },
    "document-writer": {
      "model": "openai/gpt-5.3-codex-spark"
    }
  }
}
```

Codex Spark는 가볍고 빠르니까 librarian이나 document-writer처럼 검색/정리 위주 에이전트에 적합하다. 코드 작성이 필요한 에이전트에는 Codex 풀 버전을 배치했다.

### 2. 이의 신청 보내라

만약 이미 차단당했다면, `gemini-code-assist-user-feedback@google.com`으로 즉시 메일을 보내라. 포함할 내용:

- Google 계정 이메일
- 사용 목적 (개인 개발 용도)
- "제3자 도구를 통한 비의도적 위반"이었다는 설명
- 향후 공식 채널만 사용하겠다는 약속

### 3. Gemini API 키로 전환 검토

Antigravity OAuth(무료 Code Assist 경로)가 아니라, [ai.google.dev](https://ai.google.dev)에서 정식 API 키를 발급받아 사용하는 방법이 있다. 이 경로는 다른 entitlement이라 같은 차단 패턴에 해당하지 않는다. 다만 무료 할당량이 제한적이고, 유료 전환 시 비용이 발생한다.

## 마치며

이번 사태의 핵심은 **"무료로 쓸 수 있는 것"과 "무료로 아무렇게나 쓸 수 있는 것"은 다르다**는 거다.

Google은 Gemini Code Assist를 IDE 내에서의 개인 사용 목적으로 제공했다. CLI 에이전트에서 토큰을 돌려쓰는 건 Google이 의도한 사용 방식이 아니었다. 그리고 Google은 그걸 찾아냈고, 칼을 뽑았다.

씁쓸하지만 교훈은 명확하다. **공짜 점심은 없다.** 특히 빅테크의 무료 서비스를 제3자 도구로 우회해서 쓸 때는, 언제든 이런 일이 벌어질 수 있다는 걸 각오해야 한다.

지금 OpenCode나 OpenClaw에서 Gemini를 쓰고 있다면, 이 글을 읽는 즉시 모델을 교체하길 강력 추천한다. 계정이 날아가고 나서 후회하면 늦는다.
