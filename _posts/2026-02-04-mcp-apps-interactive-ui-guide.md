---
layout: post
title: "MCP Apps - AI 채팅창 안에서 대시보드가 돌아간다고?"
date: 2026-02-04 14:00:00 +0900
categories: [ai]
tags: [mcp, mcp-apps, model-context-protocol, claude, chatgpt, interactive-ui, ai-tools, agentic-ai]
image: mcp-apps-interactive-ui-guide/mcp-apps-interactive-ui-guide-1.png
published: true
---

AI 챗봇에게 "매출 데이터 분석해줘"라고 물으면, 보통 마크다운 표나 텍스트 덩어리가 돌아옵니다. 운이 좋으면 코드 블록에 차트 라이브러리 코드가 딸려올 수도 있죠. 그런데 만약 채팅창 안에서 **인터랙티브 대시보드**가 바로 렌더링되고, 필터를 클릭하고, 드릴다운까지 가능하다면 어떨까요?

![MCP Apps 대표 이미지](/static/img/posts/mcp-apps-interactive-ui-guide/mcp-apps-interactive-ui-guide-1.png){: .wd100}

1월 26일, MCP(Model Context Protocol)의 첫 번째 공식 확장인 **MCP Apps**가 발표되었습니다. 도구가 텍스트 대신 **대화형 UI 컴포넌트**를 반환할 수 있게 된 겁니다. 대시보드, 폼, 시각화, 멀티스텝 워크플로우까지. 이 블로그에서 [MCP 기본 개념](/2026/01/25/mcp-model-context-protocol-guide/)을 다룬 적 있는데, MCP Apps는 그 위에 올라가는 UI 레이어라고 보면 됩니다.

솔직히 처음 뉴스를 봤을 때 "또 과장 아닌가?"라고 생각했습니다. 그런데 실제 스펙을 파보니, 이건 AI 도구 생태계의 게임 체인저가 될 가능성이 꽤 높습니다.

## MCP Apps가 해결하는 문제

기존 MCP 도구의 한계를 먼저 짚어보겠습니다. MCP 서버가 도구를 제공하면, AI가 그 도구를 호출하고 결과를 텍스트로 반환합니다. 데이터베이스를 조회하든, API를 호출하든, 최종 결과물은 **평문 텍스트**입니다.

이게 왜 문제냐면:

| 상황 | 텍스트만으로 가능? |
|------|:-:|
| 100행짜리 테이블 데이터 탐색 | 불편함 |
| 차트로 추세 파악 | 불가능 |
| 폼을 채워서 설정 변경 | 불가능 |
| 여러 단계의 워크플로우 진행 | 매우 불편 |
| PDF 문서 인라인 검토 | 불가능 |

MCP Apps는 도구가 **HTML/JavaScript 번들**을 반환할 수 있게 합니다. 호스트(Claude, ChatGPT 등)가 이걸 샌드박스 iframe에서 렌더링하면, 사용자는 채팅 안에서 직접 UI와 상호작용합니다.
## 아키텍처 - 어떻게 돌아가는 건가

MCP Apps의 기술 구조는 생각보다 깔끔합니다. 핵심은 두 가지 개념입니다.

**1. UI 메타데이터를 가진 도구**

기존 MCP 도구에 `_meta.ui.resourceUri` 필드가 추가됩니다:

```json
{
  "name": "visualize_data",
  "description": "인터랙티브 차트로 데이터 시각화",
  "inputSchema": {
    "type": "object",
    "properties": {
      "dataset": { "type": "string" },
      "chartType": { "type": "string", "enum": ["bar", "line", "pie"] }
    }
  },
  "_meta": {
    "ui": {
      "resourceUri": "ui://charts/interactive"
    }
  }
}
```

**2. UI 리소스 제공**

서버는 `ui://` 스킴을 통해 번들된 HTML/JavaScript를 제공합니다. 호스트가 이 리소스를 가져와서 **샌드박스 iframe**에서 렌더링하고, JSON-RPC over postMessage로 양방향 통신을 활성화합니다.

전체 흐름을 도식화하면:

```
[사용자] "매출 트렌드 보여줘"
    ↓
[AI 모델] → MCP 도구 호출 (visualize_data)
    ↓
[MCP 서버] → 데이터 처리 + UI 리소스 반환
    ↓
[호스트] → 샌드박스 iframe에서 렌더링
    ↓
[사용자] ← 인터랙티브 차트가 채팅창에 표시
    ↓ (필터 클릭)
[UI] → JSON-RPC → [MCP 서버] → 업데이트된 데이터
    ↓
[UI] ← 차트 자동 갱신
```

중요한 포인트는, UI가 AI 모델과도 통신할 수 있다는 점입니다. `App` 클래스의 `updateModelContext` 메서드를 쓰면, 사용자의 UI 조작 결과를 AI 대화 컨텍스트에 주입할 수 있습니다:

```javascript
import { App } from "@modelcontextprotocol/ext-apps";

const app = new App();
await app.connect();

// 도구 결과를 받아서 차트 렌더링
app.ontoolresult = (result) => {
  renderChart(result.data);
};

// 사용자가 차트에서 특정 항목 클릭 시
chart.onClick = async (item) => {
  // 서버에 상세 데이터 요청
  const details = await app.callServerTool({
    name: "fetch_details",
    arguments: { id: item.id }
  });

  // AI 대화 컨텍스트에 사용자 행동 전달
  await app.updateModelContext({
    content: [{
      type: "text",
      text: `사용자가 ${item.name} 항목을 선택했습니다. 상세: ${JSON.stringify(details)}`
    }]
  });
};
```

이 구조 덕분에 "사용자가 UI에서 뭘 했는지"를 AI가 인지하고, 다음 대화에서 그 맥락을 반영할 수 있습니다.

![MCP Apps 아키텍처 다이어그램](/static/img/posts/mcp-apps-interactive-ui-guide/mcp-apps-interactive-ui-guide-2.png){: .wd100}




{% include pre-version.html %}

## 보안 모델 - 채팅창에서 HTML을 렌더링한다고?

솔직히 이 부분이 가장 궁금했습니다. 임의의 HTML/JS를 렌더링하면 XSS 공격 벡터가 되지 않을까? MCP Apps 스펙이 제시하는 보안 레이어는 네 겹입니다:

**레이어 1: Iframe 샌드박싱**

UI는 제한된 권한의 샌드박스 iframe 안에서 실행됩니다. 호스트 페이지의 DOM에 직접 접근하거나, 쿠키를 읽거나, 상위 창을 조작하는 건 구조적으로 차단됩니다.

**레이어 2: 사전 선언된 템플릿**

호스트가 렌더링 전에 HTML 콘텐츠를 검토할 수 있습니다. 악성 스크립트가 포함된 UI를 걸러내는 게이트 역할을 합니다.

**레이어 3: 감사 가능한 통신**

UI와 호스트 사이의 모든 통신은 JSON-RPC 프로토콜을 따르기 때문에, 어떤 메시지가 오갔는지 전부 로깅할 수 있습니다.

**레이어 4: 사용자 승인**

UI를 시작하는 도구 호출 자체에 사용자 명시적 승인을 요구할 수 있습니다.

개인적으로 이 정도면 합리적인 수준이라고 봅니다. 완벽한 보안은 없지만, 웹 기반 확장 프로그램이 사용하는 보안 모델과 유사한 접근입니다.
## 실전 사용 사례와 지원 플랫폼

현재 MCP Apps를 지원하는 클라이언트:

| 플랫폼 | 상태 |
|--------|------|
| **Claude** (웹/데스크톱) | 지원 중 |
| **ChatGPT** | 이번 주 출시 |
| **VS Code Insiders** | 지원 중 |
| **Goose** | 지원 중 |

초기 파트너 목록도 인상적입니다. Figma, Amplitude, Asana, Slack, Canva, Box 등이 이미 MCP Apps를 통해 자사 UI를 AI 채팅 안에 임베딩하고 있습니다.

실전 시나리오를 몇 개 정리하면:

**1. 디자인 협업**
Claude에서 요구사항을 논의하면서, Figma 다이어그램이 채팅 안에서 실시간으로 업데이트됩니다. 텍스트로 피드백하면 → 디자인 자동 수정 → 채팅 안에서 바로 확인.

**2. 데이터 분석**
"이번 분기 유저 이탈률 분석해줘"라고 말하면, Amplitude 대시보드가 채팅 안에 렌더링됩니다. 필터를 조정하고 드릴다운하면, AI가 변경된 뷰를 인지하고 추가 인사이트를 제공합니다.

**3. 프로젝트 관리**
Goose에서 Asana 타임라인을 표시하고, 태스크를 드래그해서 재배치하면 실제 Asana에 반영됩니다. 동시에 AI가 "이 일정 변경으로 마일스톤이 영향받을 수 있다"고 알려줍니다.

**4. 인시던트 대응**
보안 이슈 발생 시, Slack 메시지를 구성하고 서식을 미리보고 채널에 전송하는 과정이 전부 채팅 안에서 완결됩니다.




{% include pre-version.html %}

## 개발자를 위한 시작 가이드

MCP Apps를 직접 만들려면, 기존 MCP 서버에 UI 레이어를 추가하면 됩니다:

```bash
# MCP Apps SDK 설치
npm install @modelcontextprotocol/ext-apps
```

기본 구조:

```javascript
// server.js - MCP 서버 측
const tool = {
  name: "my_dashboard",
  description: "프로젝트 대시보드 표시",
  inputSchema: { /* ... */ },
  _meta: {
    ui: {
      resourceUri: "ui://dashboard/main"
    }
  }
};

// UI 리소스 등록
server.registerUIResource("ui://dashboard/main", {
  content: bundledHTML,  // HTML + JS 번들
  mimeType: "text/html"
});
```

공식 `ext-apps` 저장소에 3D 시각화, 인터랙티브 맵, PDF 뷰어, 실시간 대시보드 등의 예제가 포함되어 있으니, 참고하면 빠르게 시작할 수 있습니다.

## AI 인터페이스의 다음 장

MCP Apps의 등장은 단순한 기능 추가가 아닙니다. **AI 인터페이스의 패러다임 전환**입니다. 지금까지 AI와의 상호작용은 텍스트 입력 → 텍스트 출력이라는 틀에 갇혀 있었습니다. MCP Apps는 이 틀을 깨고, AI 대화 안에 **풍부한 GUI 경험**을 가져옵니다.

개발자 입장에서 주목할 포인트는, MCP Apps가 **기존 MCP 위에 올라가는 확장**이라는 점입니다. 이미 MCP 서버를 만들어본 경험이 있다면, UI 레이어를 추가하는 건 어렵지 않습니다. 그리고 Claude, ChatGPT, VS Code가 모두 지원하기 때문에, 한 번 만들면 여러 플랫폼에서 쓸 수 있습니다.

"AI 도구를 만들 때, 텍스트 결과만으로 충분한가?"라는 질문을 스스로에게 던져보시기 바랍니다. MCP Apps가 열어놓은 가능성은, 그 질문에 대한 답이 "아니오"인 모든 영역에 해당합니다.
