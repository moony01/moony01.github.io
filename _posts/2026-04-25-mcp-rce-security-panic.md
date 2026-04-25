---
layout: post
title: "MCP 취약점 공포에 다들 흔들리는 이유"
description: "MCP 취약점 경고가 왜 갑자기 커졌는지, stdio 설정 한 줄이 어떻게 실행 권한이 되는지 개발팀 기준으로 정리했다."
date: 2026-04-25 12:03:43 +0900
categories: [security]
tags: [MCP, Security, Anthropic, AIAgents, PromptInjection]
image: mcp-rce-security-panic/mcp-rce-security-panic-1.webp
published: true
---

MCP 취약점 얘기가 또 도는구나 정도로 넘기려다가, 이번 건은 좀 다르게 읽혔다. 2026년 4월 15일 OX Security가 MCP 생태계에서 30개 넘는 공개 이슈와 10개 넘는 CVE를 묶어 설명했고, 4월 22일에는 Tom's Hardware가 이 파장이 1억 5천만 다운로드와 최대 20만 서버까지 번질 수 있다고 받아썼다. 며칠 전까지만 해도 다들 "에이전트에 뭐 붙이지" 모드였는데, 지금은 "그 설정 파일이 실행 권한 그 자체 아니냐" 쪽으로 분위기가 확 꺾였다.

이게 더 무서운 이유는 버그 하나 잡고 끝나는 얘기가 아니라서다. MCP 공식 보안 문서도 이미 local server compromise, session hijacking, SSRF, confused deputy 같은 항목을 따로 적어두고 있다. 한마디로 위험 신호는 전부터 있었고, 이번에는 그게 실무 개발팀 귀에 꽂힐 만큼 크게 터진 셈이다. 얼마 전 [지금 스킬보다 MCP가 더 무서운 이유](/others/2026/04/10/mcp-vs-skills-shift.html)에서도 연결 표면이 늘어나는 속도를 얘기했는데, 지금은 "연결성"보다 "누가 어떤 명령을 실행하게 되느냐"가 더 앞줄로 올라왔다.

{% include pre-version.html %}

아래 같은 장면이 지금 분위기랑 제일 비슷하다. 겉으로는 연결이 더 많아지고 더 똑똑해졌는데, 뒤쪽에서는 권한 경계가 어디까지인지 다들 다시 세고 있다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/mcp-rce-security-panic/mcp-rce-security-panic-1-400.webp 400w,
            /static/img/posts/mcp-rce-security-panic/mcp-rce-security-panic-1-800.webp 800w,
            /static/img/posts/mcp-rce-security-panic/mcp-rce-security-panic-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/mcp-rce-security-panic/mcp-rce-security-panic-1.webp"
    alt="MCP 취약점 파장을 보여주는 개발팀"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 왜 이번 MCP 취약점 얘기가 더 세게 먹히나

### 이번엔 라이브러리 버그 하나로 끝나는 분위기가 아니다

OX Security가 4월 15일에 올린 글을 보면 포인트가 꽤 노골적이다. 이 사람들은 "전통적인 코딩 실수"보다 설계 선택 자체가 문제라고 본다. stdio 서버를 띄우는 설정이 그대로 subprocess 실행 경로로 이어지고, 거기에 사용자 입력이나 프롬프트 인젝션이 엮이면 결국 명령 실행 표면이 너무 쉽게 열린다는 얘기다. 난 이 표현이 과장만은 아니라고 본다. 요즘 팀들은 MCP를 플러그인처럼 붙이는데, 실제로는 로컬 권한이 달린 실행 경로를 추가하는 경우가 많기 때문이다.

### 개발자 커뮤니티가 이미 한 번 겪어본 공포라 반응이 빠르다

사실 이쪽은 갑자기 생긴 걱정도 아니다. 2025년 4월 Hacker News에서 이미 "Model Context Protocol has prompt injection security problems"가 돌았고, 그때도 댓글이 딱 한 방향이었다. 악성 서버만 조심하면 끝나는 문제가 아니라는 것. 그냥 메시지 한 줄, 문서 한 토막, 웹페이지 한 장으로도 모델이 이상한 행동을 하게 만들 수 있으면 결국 문제는 도구 설치 여부를 넘어서게 된다.

그래서 이번 반응이 더 컸다. 이미 다들 한 번 들어본 불안이었는데, 이번에는 숫자랑 CVE랑 실제 제품 이름까지 붙어버렸다. LiteLLM, LangChain 계열, Windsurf 같은 이름이 같이 나오면 "이론상 가능"이 아니라 "우리도 체크해야 하는 일"로 바뀐다.

## 진짜 무서운 건 설정이 실행이 되는 구간이다

### stdio 한 줄이 생각보다 많은 걸 가져간다

MCP를 처음 붙일 때는 대개 이렇게 생각한다. 서버 하나 추가하고, 도구 몇 개 노출하고, 모델이 필요할 때 호출하겠지. 그런데 로컬 stdio 서버는 그 시작점에서 이미 프로세스를 띄운다. 결국 `command`와 `args`가 어떻게 흘러들어가는지, 누가 그 값을 바꿀 수 있는지, 에이전트가 그 파일을 수정할 수 있는지가 핵심이 된다.

이건 한번 눈으로 확인하는 게 낫다.

```bash
rg -n '"mcpServers"|\"command\"|\"args\"|stdio' . \
  -g '.mcp.json' -g 'mcp.json' -g '*.json'
```

이 명령으로 설정 위치부터 찾고, 그다음에는 "이 값이 사용자 입력이나 외부 문서에서 유도될 수 있나"만 봐도 절반은 정리된다. 솔직히 여기서 멈추는 팀이 많다. 설정 파일은 코드보다 덜 위험해 보이니까. 그런데 이번 파장이 보여준 건 반대다. 에이전트 시대에는 설정이 곧 실행 계획이다.

### 대충 막은 보호막은 생각보다 쉽게 우회된다

OX 보고서에서 인상적이었던 부분은 단순 허용 목록도 우회 사례가 나왔다는 점이었다. 허용된 실행기 하나만 남겨놔도 옵션 플래그나 체인 방식으로 빠져나가는 경우가 있었다. 이건 보안팀이 게을러서라기보다, 원래 subprocess 실행이라는 표면이 그렇게 만만하지 않아서 그렇다.

내가 보기엔 여기서 제일 위험한 오해가 "우리 쪽은 로컬 툴이라 괜찮다"는 말이다. MCP 공식 보안 문서도 local MCP server compromise를 별도 섹션으로 다룬다. 로컬이면 안전한 게 아니라, 로컬 권한을 그대로 먹고 들어오니까 더 직접적일 수 있다.

{% include pre-version.html %}

## 팀이 오늘 바로 바꿔야 하는 운영 습관

### mcp 설정 파일을 코드 리뷰 대상으로 올려야 한다

이제 `.mcp.json`이나 비슷한 설정 파일은 그냥 환경 파일 취급하면 안 된다. PR에서 코드만 보고 설정은 대충 넘기면 딱 여기서 사고 난다. 누가 새 서버를 추가했는지, 왜 필요한지, 실행 경로가 고정돼 있는지, 쓰기 가능한 디렉터리가 어디인지 정도는 체크리스트로 굳혀야 한다.

개인적으로는 새 MCP 서버를 붙일 때 아래 네 가지만 먼저 본다.

| 체크 포인트 | 왜 보나 |
| --- | --- |
| 실행 명령 고정 여부 | 외부 입력이 섞이면 바로 위험해진다 |
| 샌드박스 유무 | 로컬 권한이 그대로 열리면 피해 범위가 커진다 |
| 설정 파일 수정 주체 | 에이전트가 직접 고치면 프롬프트 인젝션과 이어진다 |
| 네트워크 범위 | 내부 자원 접근이 열리면 SSRF류가 붙기 쉽다 |

이 표가 대단한 비법은 아니다. 그냥 운영 기본기다. 그런데 에이전트 툴은 워낙 속도가 빨라서 다들 이 기본기를 자주 건너뛴다.

### 안전한 MCP는 프로토콜보다 권한 설계에서 갈린다

MCP 자체를 버리자는 얘기는 아니다. 지금도 OpenAI, Google, Anthropic 쪽 도구들이 다 이 생태계 영향을 받고 있고, 표준으로서 얻는 이점도 분명하다. 다만 이제는 "MCP를 쓴다"보다 "어떤 권한 경계와 샌드박스로 쓴다"가 더 중요해졌다. 표준이 연결을 쉽게 만들어준다고 해서 운영 비용까지 같이 줄여주진 않는다.

그래서 난 지금 팀 회의에서 "MCP 도입했어요"라는 말보다 "로컬 서버는 어디서 돌고 누가 수정 가능해요"라는 답이 먼저 나와야 맞다고 본다. 그 답이 바로 안 나오면, 이미 연결은 만들어졌는데 통제는 안 붙은 상태일 가능성이 높다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/mcp-rce-security-panic/mcp-rce-security-panic-2-400.webp 400w,
            /static/img/posts/mcp-rce-security-panic/mcp-rce-security-panic-2-800.webp 800w,
            /static/img/posts/mcp-rce-security-panic/mcp-rce-security-panic-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/mcp-rce-security-panic/mcp-rce-security-panic-2.webp"
    alt="MCP stdio 설정과 보안 점검 흐름"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## MCP를 계속 쓸 거라면 환상부터 버려야 한다

### 편하다는 말은 보통 권한을 숨긴다는 뜻이다

에이전트 도구가 편하게 느껴질수록 뒤에서는 더 많은 권한을 대신 들고 있을 가능성이 크다. 파일 읽기, 셸 실행, 브라우저 조작, 원격 API 호출이 한 흐름으로 이어지는 순간, 우리는 더 이상 "챗봇"을 쓰는 게 아니다. 작은 자동화 런타임을 한 명의 동료처럼 들여놓는 거다.

이걸 인정하면 대응도 좀 현실적으로 바뀐다. 승인 없는 MCP 추가 금지, 샌드박스 기본값, 내부 자원 접근 분리, 설정 변경 리뷰, 로그 보존. 솔직히 다 귀찮다. 근데 지금 단계에서 이 귀찮음을 생략하면 나중에는 사고 보고서가 더 길어진다.

### 지금 필요한 건 더 많은 데모보다 덜 위험한 기본값이다

요즘 MCP 데모를 보면 다 화려하다. 모델이 알아서 서버를 찾고, 브라우저를 움직이고, 문서를 읽고, PR도 올린다. 보고 있으면 바로 붙여보고 싶다. 나도 그렇다. 근데 이번 주 흐름을 보면 이제 질문은 바뀌었다. "무엇이 되느냐"보다 "어디까지 허용했느냐"가 먼저다.

내 기준에서 이번 MCP 취약점 파장은 표준의 종말 신호는 아니다. 오히려 표준이 진짜 인프라가 되려면 어떤 보안 기본값이 필요한지 보여주는 리허설에 가깝다. 지금 겁먹을 건 MCP라는 이름 자체가 아니라, 우리가 그걸 너무 가벼운 설정처럼 다뤄왔다는 사실이다.
