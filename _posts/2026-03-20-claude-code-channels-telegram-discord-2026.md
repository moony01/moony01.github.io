---
layout: post
title: "텔레그램으로 AI 코딩합니다 — Anthropic이 오늘 공개한 Claude Code Channels, 개발 환경이 또 뒤집혔습니다"
date: 2026-03-20 11:00:00 +0900
categories: [ai]
tags: [claude-code, telegram, discord, ai-coding, anthropic, mcp]
image: claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-1.png
published: true
---

오늘 Anthropic이 조용히, 그리고 상당히 충격적인 기능을 하나 내놨습니다. 이름은 **Claude Code Channels**. Research Preview로 공개된 이 기능은 텔레그램이나 디스코드 메시지 하나로 로컬에서 돌아가는 Claude Code에게 명령을 내릴 수 있게 해줍니다.

회의 중에 폰을 꺼내서 "PR 만들어줘"라고 텔레그램에 입력하면, 집에 있는 맥북이 알아서 코드를 짜고 PR을 올립니다. 카페에서 커피 마시면서 "배포 전 테스트 돌려줘"라고 보내도 됩니다. 이게 실제로 가능한 세상이 오늘 열렸습니다.

VentureBeat는 이걸 대놓고 "OpenClaw killer"라고 불렀습니다. 그 표현이 꽤 정확합니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-1-400.webp 400w,
            /static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-1-800.webp 800w,
            /static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-1-400.png 400w,
            /static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-1-800.png 800w,
            /static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-1.png" 
    alt="히어로 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## Claude Code Channels가 정확히 뭔가요?

한 문장으로 요약하면 이렇습니다: **실행 중인 Claude Code 세션에 외부 이벤트를 밀어넣는 MCP 서버**.

기존 Claude Code는 터미널에 앉아서 직접 명령을 입력해야 했습니다. 자리를 떠나면 작업이 멈추거나, 돌아왔을 때 결과를 확인하는 방식이었죠. Channels는 이 구조를 완전히 바꿉니다.

Claude Code가 로컬 머신에서 계속 실행 중인 상태에서, 텔레그램이나 디스코드 채널을 통해 언제 어디서나 명령을 보낼 수 있습니다. Claude는 그 명령을 받아 실행하고, 결과를 다시 채팅으로 전송합니다. 양방향입니다.

지원 플랫폼은 현재 네 가지입니다:
- **Telegram** — 봇 API 기반, 이미지 자동 다운로드 지원
- **Discord** — 채널 히스토리 조회(100개), 첨부파일(25MB) 지원
- **iMessage** — 연구 미리보기 단계
- **Webhook** — 직접 통합용

기술적으로는 Anthropic이 2024년에 발표한 **MCP(Model Context Protocol)** 위에 구축됩니다. 채널은 MCP 서버 형태로 작동하며, Claude Code 세션에 이벤트를 푸시하는 방식입니다. 설치도 비교적 간단합니다. 요구 사항은 Claude Code v2.1.80 이상, claude.ai 계정 로그인, 그리고 Bun 설치 정도입니다.

{% include pre-version.html %}

## 텔레그램 봇 하나로 개발 환경이 손 안에 들어오는 과정

설정 흐름은 생각보다 깔끔합니다. 텔레그램 기준으로 따라가보면:

**1단계: 봇 생성**

텔레그램 BotFather에서 `/newbot` 명령으로 새 봇을 만들고 API 토큰을 발급받습니다.

**2단계: Claude Code 연결**

터미널에서 이렇게 입력합니다:

```bash
/telegram:configure
```

Claude Code가 봇 토큰을 물어보면 입력하고, 생성된 보안 코드로 계정을 페어링합니다.

**3단계: 폰에서 명령 전송**

이제부터는 텔레그램에서 봇에게 메시지를 보내면 됩니다:

```
새로운 사용자 인증 API 엔드포인트 추가해줘. JWT 기반으로.
```

Claude Code가 작업을 시작하고, 진행 상황을 텔레그램으로 돌려보냅니다. 코드 스니펫도, 오류 메시지도, 완료 알림도 채팅으로 옵니다.

Fakechat이라는 공식 데모 채널도 있습니다. 외부 서비스 없이 localhost에서 채팅 UI를 띄워 테스트할 수 있어서, 처음 셋업하기 전에 감을 잡기 좋습니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-2-400.webp 400w,
            /static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-2-800.webp 800w,
            /static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-2-400.png 400w,
            /static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-2-800.png 800w,
            /static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-code-channels-telegram-discord-2026/claude-code-channels-telegram-discord-2026-2.png" 
    alt="본문 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 왜 이게 게임체인저인가 — 세 가지 이유

### 1. AI 코딩 어시스턴트가 드디어 "항상 켜진" 상태가 됩니다

기존 AI 코딩 도구들의 공통적인 한계는 "터미널 앞에 앉아 있어야 한다"는 것이었습니다. 아무리 똑똑한 AI라도 입력이 없으면 멈춰있습니다.

Channels는 이 제약을 없앱니다. 빌드가 실패하면 Claude가 먼저 텔레그램으로 알림을 보낼 수 있습니다. 긴 작업을 시켜두고 자리를 비웠다가, 폰으로 "얼마나 됐어?"라고 물어보면 됩니다. AI가 개발자를 기다리는 게 아니라, 개발자가 어디서든 AI의 작업에 개입할 수 있는 구조가 됩니다.

### 2. 팀 개발 워크플로우가 바뀝니다

디스코드 채널 히스토리 지원은 솔로 개발자뿐 아니라 팀에게도 의미가 있습니다. 팀 디스코드 서버에 Claude Code 봇을 연결하면, 팀원이 채널에 올린 버그 리포트를 Claude가 직접 읽고 수정 작업을 시작할 수 있습니다. 작업 지시가 텍스트로 남아 추적 가능하고, 결과도 같은 채널에서 공유됩니다.

### 3. "개발자의 위치"라는 개념이 사라집니다

이건 단순한 편의 기능이 아닙니다. 개발자가 어디에 있는지와 무관하게 코딩 작업을 진행할 수 있다는 건, 비동기 개발의 새로운 가능성을 열어줍니다. 야근 대신 저녁 약속 중에 폰으로 긴급 패치를 지시하고, 돌아오기 전에 PR이 올라와 있는 시나리오. 공상이 아닙니다.

## 보안은요? 이 부분이 진짜 중요합니다

새로운 편의가 생기면 공격 표면도 생깁니다. Channels 보안에서 짚어봐야 할 것들이 있습니다.

첫째, **봇 토큰 관리**. 텔레그램이나 디스코드 봇 토큰이 탈취되면, 공격자가 여러분의 로컬 Claude Code에 명령을 보낼 수 있습니다. 토큰은 환경 변수로 관리하고, 절대 코드에 하드코딩하지 마세요.

둘째, **계정 페어링의 의미**. Channels는 claude.ai 계정 로그인을 기반으로 페어링합니다. API 키만으로는 인증이 되지 않습니다. 이건 의도된 설계입니다. 계정 레벨의 인증이 추가 보호막이 됩니다.

셋째, **Research Preview 단계임을 기억하세요**. 아직 프로덕션 레디 기능이 아닙니다. 민감한 코드베이스나 프로덕션 환경에 연결하기 전에 리스크를 충분히 고려해야 합니다. Anthropic도 이 기능이 연구용 미리보기 단계임을 명시하고 있습니다.

## 마치며

Claude Code Channels는 AI 코딩 어시스턴트의 사용 패러다임을 바꾸는 시도입니다. 터미널 앞에 앉아야만 가능했던 AI 코딩이, 채팅 메시지 하나로 어디서든 가능해지는 것. 아직 Research Preview 단계라 안정성이나 기능 완성도는 더 지켜봐야 하지만, 방향성 자체는 분명합니다.

개발자의 위치, 개발자의 시간이라는 제약이 하나씩 사라지고 있습니다. 그 다음은 무엇이 사라질까요?

Claude Code Channels는 오늘부터 [공식 플러그인 저장소](https://github.com/anthropics/claude-plugins-official)에서 설치할 수 있습니다.
