---
layout: post
title: "Claude 메모리 가져오기 기능과 ChatGPT 전환 분석"
description: "Anthropic이 출시한 Claude 메모리 가져오기 기능은 ChatGPT와 Gemini의 맥락을 3단계로 이식한다. 작동 원리와 개발자 활용 방법을 정리했다."
date: 2026-03-02 18:00:00 +0900
categories: [ai]
tags: [claude, chatgpt, memory, ai-tools, anthropic]
image: claude-memory-import-chatgpt/claude-memory-import-chatgpt-1.webp
published: true
---

2026년 3월 1일 오전, Anthropic이 `claude.com/import-memory`를 조용히 공개했다. 기능 설명은 세 줄로 끝난다. "다른 AI에서 나에 대해 저장된 것을 Claude로 가져오세요." 그게 전부다. 그런데 Simon Willison이 즉시 글을 올렸고, Product Hunt에서 당일 수백 개의 반응이 몰렸으며, 개발자 커뮤니티에서는 "ChatGPT 구독 해지할 이유 생겼다"는 반응이 나오기 시작했다.

왜 이 단순해 보이는 기능이 즉각적인 반응을 끌어냈을까.

AI 도구를 오래 쓸수록 쌓이는 게 있다. 내 프로그래밍 언어 선호, 코드 스타일, 자주 쓰는 기술 스택, 한국어 응답 요청, 에러 출력 형식 지정. ChatGPT가 이 모든 걸 파악하는 데 수백 번의 대화가 필요했다. 이 맥락을 버리고 Claude로 옮기면 처음부터 다시 시작이었다. 지금까지는.

{% include pre-version.html %}

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-memory-import-chatgpt/claude-memory-import-chatgpt-2-400.webp 400w,
            /static/img/posts/claude-memory-import-chatgpt/claude-memory-import-chatgpt-2-800.webp 800w,
            /static/img/posts/claude-memory-import-chatgpt/claude-memory-import-chatgpt-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-memory-import-chatgpt/claude-memory-import-chatgpt-2.webp" 
    alt="Claude 메모리 가져오기 기능으로 ChatGPT에서 Claude로 컨텍스트 이식 과정 개요" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## AI 메모리 전환 문제의 실체

AI 도구를 바꾸는 가장 큰 장벽은 기능 차이가 아니다. **컨텍스트 재학습 비용**이 전환을 막는다.

### 지금까지 무엇이 문제였나

개발자가 AI 어시스턴트에 투자하는 건 시간만이 아니다. 매번 반복하는 지시사항을 줄이기 위해 패턴을 만들어 나간다. "항상 TypeScript로", "함수 단위로 설명해줘", "AWS Lambda 환경을 기본 가정해줘" 같은 것들이 ChatGPT 메모리와 커스텀 지시사항에 쌓인다.

그 설정이 수십 개라면, 다른 AI로 전환할 때 이 맥락을 통째로 잃는다. 이론적으로는 수동 복사가 가능하지만, 실제로는 번거롭고 누락이 생긴다. AI 플랫폼들이 이 스위칭 코스트를 의도적으로 높게 유지해왔다는 시각도 있다.

Anthropic은 이 마찰을 없애는 방법으로 놀랍도록 단순한 메커니즘을 선택했다.

## Claude 메모리 가져오기는 어떻게 작동하나

기술적으로 복잡한 게 없다. API 연동도, 계정 권한 허용도, 브라우저 확장도 필요없다.

### 3단계 이식 프로세스

```text
1. claude.com/import-memory 방문
2. 제공된 프롬프트를 기존 AI(ChatGPT, Gemini 등)에 붙여넣고 실행
3. AI가 출력한 메모리 요약을 Claude에 다시 붙여넣기
```

이 프롬프트는 기존 AI에게 "당신이 나에 대해 저장한 모든 정보를 구조화된 텍스트 블록으로 정리해줘"라는 지시를 보내는 것이다. ChatGPT는 자신이 기억하는 사용자 정보를 텍스트로 출력하고, 그 텍스트를 Claude에 붙여넣으면 Claude가 이를 자신의 메모리 형식으로 변환한다.

실제로 ChatGPT가 반환하는 텍스트는 이런 형태다.

```text
User Profile Summary:
- Programming languages: TypeScript (primary), Python (data work)
- Preferred response style: Korean, with runnable code examples
- Project context: Next.js + Supabase stack
- Timezone: Asia/Seoul
- Experience level: Mid-to-senior developer
- Prefers concise responses over exhaustive lists
```

이 블록을 Claude의 메모리 설정에 붙여넣으면 Claude가 파싱하고 자신의 형식으로 저장한다. 기존에 Claude에 이미 쌓아둔 메모리가 있다면 덮어쓰지 않고 병합된다.

{% include pre-version.html %}

## Google 방식과 무엇이 다른가

흥미롭게도 Google도 AI 전환을 위한 유사한 기능을 제공하고 있다. 그런데 방식에서 본질적인 차이가 있다.

### Claude가 이식하는 것과 이식하지 않는 것

Anthropic의 접근은 선호와 컨텍스트 요약만 이식한다. 대화 전체 기록을 가져오지 않는다. Google의 일부 방식이 전체 채팅 로그를 포함할 수 있는 것과 대조된다.

| 구분 | Claude 메모리 가져오기 | Google 방식 |
|------|----------------------|-------------|
| 이식 데이터 | 선호 및 컨텍스트 요약 | 전체 채팅 로그 가능 |
| 모델 학습 사용 | 메모리 학습에 미사용 | 정책에 따라 다름 |
| 암호화 저장 | 적용 | 미확인 |
| 언제든 내보내기 | 지원 | 제한적 |

Claude의 메모리는 모델 학습에 사용되지 않고, 저장 시 암호화되며, 언제든 전체 내보내기가 가능하다. 개인 정보를 플랫폼에 통째로 넘기는 게 아니라 필요한 컨텍스트만 이동시키는 구조다.

표의 차이보다 중요한 것은 이 프라이버시 모델이 프로덕션 환경에서의 신뢰 기반이 된다는 점이다. 팀 단위로 AI 도구를 채택할 때 이런 보증은 의사결정에 직접 영향을 준다.

## 개발자가 실제로 활용할 수 있는 방법

단순히 선호 설정을 옮기는 것 외에도, 개발자에게 의미있는 활용 시나리오가 있다.

### 프로젝트 컨텍스트 세트 이식하기

특정 프로젝트에 최적화된 지시사항 세트가 있다면, 이를 구조화해서 이식할 수 있다. 예를 들어 서버리스 백엔드 작업에 특화된 컨텍스트 블록을 이미 ChatGPT에 설정해 뒀다면 그대로 Claude로 가져올 수 있다.

```text
Tech Stack Context:
- Runtime: AWS Lambda Node.js 20 (arm64)
- Module system: ESM only
- Error response format: { success: false, error: { code, message } }
- DB: PostgreSQL via Prisma ORM
- Always include try/catch with specific error types
- Response within 150ms target
```

이런 블록이 Claude 메모리에 들어가면, Claude Code를 사용할 때도 동일한 컨텍스트에서 시작된다. 이전에 다룬 [Claude Code의 자동 메모리 기능](/ai/2026/03/22/claude-code-hidden-multi-agent-system.html)과 조합하면 전역 선호와 프로젝트별 컨텍스트가 모두 정렬된 개발 환경이 완성된다.

팀 단위 활용도 있다. 코드 리뷰 기준, 커밋 메시지 규칙, 아키텍처 원칙을 팀원이 공유하는 메모리 블록 형태로 만들어 두면, 팀 내 AI 어시스턴트 일관성을 높이는 데 쓸 수 있다.

## AI 메모리가 전환 비용을 결정한다

메모리 이식 기능은 기술적으로 단순하다. 하지만 그 단순함이 전략적으로 의미심장하다.

AI 도구 선택은 점점 더 스위칭 코스트로 결정된다. 더 나은 모델이 출시돼도 "내가 수개월간 쌓아온 맥락을 처음부터 다시 설명해야 한다"는 점이 전환을 막는다. Anthropic은 이 장벽을 정면으로 낮추는 방향을 선택했다. Claude가 더 낫다면 언제든 오라, 당신의 맥락은 잃지 않아도 된다는 메시지다.

현재는 유료 플랜 사용자에게만 열려 있다. 작동 방식 자체는 누구나 따라 할 수 있는 구조여서, 다른 AI 플랫폼들의 대응이 나올 가능성이 높다. 그 시점이 되면 AI 플랫폼 경쟁의 중심이 모델 성능에서 메모리 유지 능력과 컨텍스트 이식성으로 완전히 이동할 수 있다.
