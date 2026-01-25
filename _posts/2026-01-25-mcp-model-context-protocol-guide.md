---
layout: post
title: "MCP(Model Context Protocol) 실전 활용법: AI 에이전트의 USB-C 포트"
date: 2026-01-25 10:00:00 +0900
categories: [ai]
tags: [mcp, model-context-protocol, anthropic, claude, ai-agent, agentic-ai, fastmcp, python]
---

"왜 AI 도구마다 매번 새로운 연동 코드를 작성해야 할까?"

ChatGPT에 Slack을 연결하고, Claude에 GitHub를 붙이고, 사내 LLM에 데이터베이스를 연동하고... 개발자라면 한 번쯤 이런 반복 작업에 지쳐본 적이 있을 겁니다. 도구마다 API가 다르고, 인증 방식이 다르고, 데이터 형식이 다릅니다. 마치 USB 표준이 없던 시절, 기기마다 다른 케이블을 써야 했던 것처럼요.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-1-400.webp 400w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-1-800.webp 800w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-1-400.png 400w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-1-800.png 800w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-1.png" 
    alt="MCP Model Context Protocol 개념도" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

2024년 말, Anthropic이 이 문제를 해결하기 위해 **MCP(Model Context Protocol)**를 오픈소스로 공개했습니다. 그리고 2025년, Linux Foundation이 이를 공식 채택하면서 MCP는 Agentic AI의 표준 프로토콜로 자리잡았습니다. 가트너는 **2026년 말까지 기업 애플리케이션의 40%가 AI 에이전트를 탑재할 것**으로 전망하고 있으며, MCP가 그 연결의 핵심이 될 것입니다.

## MCP란 무엇인가?

**MCP(Model Context Protocol)**는 LLM(대규모 언어 모델)이 외부 도구, API, 데이터 소스와 상호작용하는 방식을 표준화한 오픈 프로토콜입니다. 쉽게 비유하자면, **AI 에이전트의 USB-C 포트**라고 할 수 있습니다.

USB-C가 하나의 포트로 충전, 데이터 전송, 영상 출력을 모두 처리하듯, MCP는 하나의 표준으로 다양한 도구와 데이터에 일관된 방식으로 접근할 수 있게 해줍니다. 더 이상 Slack용 코드, GitHub용 코드, Notion용 코드를 따로 작성할 필요가 없습니다.

| 기존 방식 | MCP 방식 |
|-----------|----------|
| 도구마다 별도 API 연동 | 표준화된 프로토콜로 통합 |
| N개 도구 = N개 커스텀 코드 | N개 도구 = 1개 MCP 클라이언트 |
| 인증/데이터 형식 제각각 | 일관된 인터페이스 |
| 유지보수 비용 증가 | 재사용 가능한 MCP 서버 |

{% include pre-version.html %}

## MCP 아키텍처 이해하기

MCP는 **클라이언트-서버 모델**을 따릅니다. 전체 구조를 이해하면 실제 구현이 훨씬 쉬워집니다.

### 핵심 구성요소

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   MCP Host      │     │   MCP Client    │     │   MCP Server    │
│  (Claude, etc)  │────▶│  (연결 관리)    │────▶│  (도구 제공)    │
│                 │     │                 │     │                 │
│  AI 모델 실행   │     │  요청 전달      │     │  Tools/Resources│
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

- **MCP Host**: AI 모델이 실행되는 환경 (Claude Desktop, VS Code 등)
- **MCP Client**: Host와 Server 사이의 연결을 관리
- **MCP Server**: 실제 도구와 데이터를 제공하는 서버

### 3대 핵심 요소 (Primitives)

MCP 서버는 세 가지 핵심 요소를 제공합니다:

| 요소 | 설명 | 예시 |
|------|------|------|
| **Tools** | LLM이 호출할 수 있는 함수 | 날씨 조회, 계산, DB 쿼리 |
| **Resources** | LLM이 읽을 수 있는 데이터 | 설정 파일, API 응답, 문서 |
| **Prompts** | 재사용 가능한 프롬프트 템플릿 | 코드 리뷰, 요약 요청 |

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-2-400.webp 400w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-2-800.webp 800w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-2-400.png 400w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-2-800.png 800w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-2.png" 
    alt="MCP 3대 핵심 요소 다이어그램" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 실전: Python으로 MCP 서버 만들기

이론은 충분합니다. 이제 직접 MCP 서버를 만들어봅시다. Anthropic이 제공하는 **FastMCP** 라이브러리를 사용하면 몇 줄의 코드로 완전한 MCP 서버를 구축할 수 있습니다.

### 환경 설정

```bash
# Python 3.10 이상 필요
pip install mcp
```

### 첫 번째 MCP 서버

다음은 날씨 정보를 제공하는 간단한 MCP 서버입니다:

```python
from mcp.server.fastmcp import FastMCP

# MCP 서버 초기화
mcp = FastMCP("Weather Service")

# Tool 정의: LLM이 호출할 수 있는 함수
@mcp.tool()
def get_weather(city: str, unit: str = "celsius") -> str:
    """특정 도시의 현재 날씨를 조회합니다."""
    # 실제로는 날씨 API를 호출
    weather_data = {
        "서울": {"temp": 3, "condition": "맑음"},
        "부산": {"temp": 7, "condition": "흐림"},
        "제주": {"temp": 10, "condition": "비"}
    }
    
    if city in weather_data:
        data = weather_data[city]
        return f"{city}: {data['temp']}°C, {data['condition']}"
    return f"{city}의 날씨 정보를 찾을 수 없습니다."

# Resource 정의: LLM이 읽을 수 있는 데이터
@mcp.resource("config://settings")
def get_settings() -> str:
    """애플리케이션 설정을 반환합니다."""
    return '{"theme": "dark", "language": "ko", "units": "metric"}'

# Prompt 정의: 재사용 가능한 템플릿
@mcp.prompt()
def weather_report(city: str) -> str:
    """날씨 보고서 생성 프롬프트를 반환합니다."""
    return f"""
    다음 도시의 날씨 정보를 분석하고, 
    오늘 외출 시 준비할 사항을 알려주세요: {city}
    """

# 서버 실행
if __name__ == "__main__":
    mcp.run()  # 기본: stdio 트랜스포트
```

코드가 놀라울 정도로 간단하죠? `@mcp.tool()`, `@mcp.resource()`, `@mcp.prompt()` 데코레이터만 붙이면 자동으로 MCP 프로토콜을 따르는 서버가 완성됩니다.

{% include pre-version.html %}

## Claude Desktop에 MCP 서버 연결하기

작성한 MCP 서버를 Claude Desktop에 연결해봅시다.

### 1. 설정 파일 위치

운영체제별 설정 파일 위치:

| OS | 경로 |
|----|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

### 2. 설정 파일 작성

```json
{
  "mcpServers": {
    "weather-service": {
      "command": "python",
      "args": ["/path/to/weather_server.py"],
      "env": {
        "PYTHONPATH": "/path/to/your/project"
      }
    }
  }
}
```

### 3. Claude Desktop 재시작

설정 파일을 저장하고 Claude Desktop을 재시작하면, 이제 Claude가 여러분의 MCP 서버에 접근할 수 있습니다. Claude에게 "서울 날씨 알려줘"라고 물어보면, 여러분이 만든 `get_weather` 함수가 호출됩니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-3-400.webp 400w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-3-800.webp 800w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-3.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-3-400.png 400w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-3-800.png 800w,
            /static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-3.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/mcp-model-context-protocol-guide/mcp-model-context-protocol-guide-3.png" 
    alt="Claude Desktop MCP 연결 화면" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

### 4. 이미 만들어진 MCP 서버 활용하기

직접 서버를 만들지 않아도 됩니다. 이미 수많은 MCP 서버가 공개되어 있습니다:

- **GitHub MCP Server**: 레포지토리 검색, 이슈 관리
- **Slack MCP Server**: 메시지 전송, 채널 조회
- **Notion MCP Server**: 페이지 읽기/쓰기
- **PostgreSQL MCP Server**: 데이터베이스 쿼리

[MCP 공식 서버 목록](https://github.com/modelcontextprotocol)에서 필요한 서버를 찾아 바로 사용할 수 있습니다.

## 마치며

MCP는 단순한 프로토콜이 아닙니다. **Agentic AI 시대의 인프라**입니다. 

2026년, AI 에이전트 시장은 78억 달러에서 2030년 520억 달러로 성장할 것으로 예측됩니다. 이 성장의 중심에 MCP가 있습니다. 지금 MCP를 익혀두면, 앞으로 쏟아질 AI 에이전트 프로젝트에서 한 발 앞서 나갈 수 있습니다.

### 다음 단계

1. **[Anthropic MCP 공식 문서](https://modelcontextprotocol.io/)** - 상세 스펙과 가이드
2. **[MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)** - 296개 코드 예제
3. **[Microsoft MCP for Beginners](https://github.com/microsoft/mcp-for-beginners)** - 초보자용 튜토리얼
4. **[Anthropic Academy MCP 과정](https://anthropic.skilljar.com/introduction-to-model-context-protocol)** - 무료 온라인 강의

AI 에이전트의 USB-C 포트, MCP. 이제 여러분의 AI를 세상과 연결할 차례입니다.
