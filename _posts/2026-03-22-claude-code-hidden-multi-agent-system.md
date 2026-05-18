---
layout: post
title: "누군가 Claude Code 바이너리를 뜯었습니다 — Anthropic이 숨겨둔 멀티 에이전트 시스템의 충격적인 전모"
date: 2026-03-22 10:00:00 +0900
categories: [ai]
tags: [Claude Code, AI 에이전트, 서브에이전트, Skills, Anthropic, 멀티에이전트]
image: claude-code-hidden-multi-agent-system/claude-code-hidden-multi-agent-system-1.webp
published: true
redirect_from:
  - /ai/2026/02/28/claude-code-auto-memory.html
---

Claude Code를 그냥 "AI 코딩 도우미"라고 생각하고 있었다면, 지금 이 글을 끝까지 읽어야 합니다. 누군가 Claude Code의 바이너리를 직접 뜯어봤더니, Anthropic이 공식 문서에도 제대로 소개하지 않은 멀티 에이전트 인프라가 통째로 숨겨져 있었습니다. 이름도 `TeammateTool`. 그리고 2026년 2월 5일, Anthropic은 조용히 스위치를 눌렀습니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-code-hidden-multi-agent-system/claude-code-hidden-multi-agent-system-1-400.webp 400w,
            /static/img/posts/claude-code-hidden-multi-agent-system/claude-code-hidden-multi-agent-system-1-800.webp 800w,
            /static/img/posts/claude-code-hidden-multi-agent-system/claude-code-hidden-multi-agent-system-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-code-hidden-multi-agent-system/claude-code-hidden-multi-agent-system-1.webp" 
    alt="Claude Code 멀티 에이전트 시스템 개요" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

게임이 바뀌었습니다. 당신이 모르는 사이에.

{% include pre-version.html %}

## 바이너리 속에 숨겨진 비밀: TeammateTool의 발견

2026년 1월 말, 한 개발자가 Claude Code의 배포 바이너리를 역분석하다가 이상한 걸 발견했습니다. `TeammateTool`이라는 내부 도구가 코드 안에 완전히 구현된 채로 존재했지만, 어디에도 문서화되어 있지 않았습니다. 단순한 미완성 코드가 아니었습니다. 완전히 작동하는 멀티 에이전트 오케스트레이션 레이어였습니다.

12일 후인 2월 5일, Anthropic은 공식적으로 스위치를 올렸습니다. `TeammateTool`은 **Agent Teams**가 되었고, Opus 4.6과 함께 출시되었습니다. 환경 변수 하나로 활성화. 완전한 문서화와 함께. 이미 수개월간 준비해온 결과였습니다.

이 발견이 충격적인 이유는 단순히 "숨겨진 기능이 있었다"가 아닙니다. Anthropic이 Claude Code를 단순한 코딩 보조 도구가 아닌, **완전한 AI 에이전트 운영 인프라**로 설계하고 있었다는 증거이기 때문입니다.

## Claude Code의 에이전트 아키텍처: 세 개의 레이어

현재 Claude Code에는 세 개의 다른 레이어가 함께 작동합니다.

**첫 번째: 서브에이전트(Subagents)**
메인 컨텍스트 창에서 분리된 독립적인 AI 인스턴스입니다. 각 서브에이전트는 자체 컨텍스트 윈도우, 커스텀 시스템 프롬프트, 특정 도구 접근 권한을 가집니다. 메인 대화가 복잡한 작업을 만나면 서브에이전트에게 위임하고, 서브에이전트는 작업을 완료한 후 결과만 돌려줍니다. verbose한 중간 과정은 메인 컨텍스트를 오염시키지 않습니다.

**두 번째: Skills**
재사용 가능한 AI 워크플로우 모듈입니다. SKILL.md 파일 하나로 정의되며, 프롬프트와 컨텍스트, 스크립트를 하나의 패키지로 묶습니다. `~/.claude/skills/`에 저장하면 모든 프로젝트에서, `.claude/skills/`에 저장하면 해당 프로젝트에서만 사용할 수 있습니다.

**세 번째: Agent Teams**
여러 독립적인 Claude Code 세션이 서로 메시지를 주고받으며 협업하는 구조입니다. 각 에이전트가 자신만의 완전한 컨텍스트를 유지하면서 작업을 병렬로 처리합니다. 단일 서브에이전트로는 처리하기 어려운 대규모 작업에 적합합니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-code-hidden-multi-agent-system/claude-code-hidden-multi-agent-system-2-400.webp 400w,
            /static/img/posts/claude-code-hidden-multi-agent-system/claude-code-hidden-multi-agent-system-2-800.webp 800w,
            /static/img/posts/claude-code-hidden-multi-agent-system/claude-code-hidden-multi-agent-system-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-code-hidden-multi-agent-system/claude-code-hidden-multi-agent-system-2.webp" 
    alt="Claude Code 서브에이전트 작동 방식" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 내장 서브에이전트: Anthropic이 이미 설계해둔 것들

Claude Code에는 이미 세 개의 내장 서브에이전트가 있습니다. 당신이 요청하지 않아도 Claude가 알아서 적절한 시점에 위임합니다.

**Explore** — 코드베이스 탐색 전문가
모델은 Haiku(빠르고 저렴)를 씁니다. 읽기 전용 도구만 허용됩니다. 코드를 수정하지 않고 탐색만 해야 할 때 자동으로 여기로 위임합니다. 탐색 결과의 장황한 중간 과정이 메인 컨텍스트를 오염시키지 않습니다. 비용도 절약됩니다.

세 가지 탐색 수준이 있습니다: **quick**(타겟 검색), **medium**(균형), **very thorough**(포괄적 분석).

**Plan** — 계획 수립을 위한 리서치 에이전트
Plan Mode에서 코드를 수정하기 전에 컨텍스트를 수집하는 역할입니다. 읽기 전용 도구만 사용합니다. 서브에이전트는 서브에이전트를 spawn할 수 없으므로, Plan 모드에서의 중첩 호출을 방지하는 역할도 합니다.

**General-purpose** — 복잡한 다단계 작업 처리기
모든 도구에 접근할 수 있습니다. 탐색과 수정이 모두 필요한 복잡한 작업, 여러 의존적 단계가 있는 작업, 복잡한 추론이 필요한 작업에 자동 위임됩니다.

그 외에도 Bash(터미널 명령 실행), statusline-setup, Claude Code Guide 등의 헬퍼 에이전트가 있습니다.

{% include pre-version.html %}

## 커스텀 서브에이전트 직접 만들기

내장 에이전트만으로는 부족합니다. 실제로 팀의 개발 컨벤션을 이해하는 코드 리뷰어, 데이터베이스 스키마를 아는 SQL 분석가, 특정 도메인 지식을 가진 전문가 에이전트를 만들 수 있습니다.

서브에이전트는 YAML frontmatter가 있는 마크다운 파일 하나로 정의됩니다:

```markdown
---
name: code-reviewer
description: 코드 품질과 보안을 검토하는 전문가. 코드 변경 후 즉시 자동 실행.
tools: Read, Grep, Glob, Bash
model: sonnet
memory: project
---

당신은 시니어 코드 리뷰어입니다. 호출되면:
1. git diff를 실행해 최근 변경사항 확인
2. 수정된 파일에 집중
3. 즉시 리뷰 시작

우선순위별로 피드백을 제공하세요:
- Critical: 반드시 수정 (보안 취약점, 데이터 손실 위험)
- Warning: 수정 권장 (성능, 가독성)
- Suggestion: 고려 사항
```

몇 가지 핵심 필드를 살펴봅니다.

**`description` 필드가 가장 중요합니다.** Claude는 이 필드를 기반으로 언제 서브에이전트에 위임할지 결정합니다. "Use proactively"라는 문구를 넣으면 Claude가 적극적으로 위임합니다.

**`model` 필드로 비용을 조절합니다.** 단순 탐색은 `haiku`, 복잡한 분석은 `sonnet`, 최고 성능이 필요하면 `opus`. 작업에 맞는 모델을 쓰면 비용이 크게 줄어듭니다.

**`memory` 필드는 진짜 게임 체인저입니다.** `project`로 설정하면 서브에이전트가 `.claude/agent-memory/<name>/` 폴더에 학습 내용을 축적합니다. 매번 처음부터 설명하지 않아도 됩니다. 코드베이스 패턴, 반복되는 버그, 팀 컨벤션을 스스로 기억합니다.

**`isolation: worktree`** 옵션을 쓰면 서브에이전트가 임시 git worktree에서 실행됩니다. 메인 브랜치를 건드리지 않고 실험적인 작업을 할 수 있습니다. 변경사항이 없으면 worktree가 자동으로 정리됩니다.

## Skills vs 서브에이전트: 언제 무엇을 쓸까

이 둘의 차이가 처음엔 헷갈립니다.

**서브에이전트**는 독립된 컨텍스트 창에서 실행됩니다. 결과만 메인 대화로 돌아옵니다. 대용량 출력을 생성하는 작업(테스트 전체 실행, 로그 분석, 대규모 코드베이스 탐색)에 적합합니다. 메인 컨텍스트를 깨끗하게 유지하고 싶을 때 씁니다.

**Skills**는 메인 컨텍스트 안에서 실행됩니다. 빈번한 피드백 루프가 필요한 작업, 이전 대화 컨텍스트가 중요한 작업에 적합합니다. 재사용 가능한 워크플로우를 팀과 공유할 때 씁니다.

실제로 좋은 패턴은 이 둘을 조합하는 겁니다. `skills` frontmatter 필드로 서브에이전트에 Skills 내용을 주입할 수 있습니다:

```yaml
---
name: api-developer
description: API 엔드포인트 구현 전문가
skills:
  - api-conventions
  - error-handling-patterns
---
```

서브에이전트가 시작될 때 해당 Skills의 전체 내용이 컨텍스트에 주입됩니다. 팀의 API 컨벤션과 에러 처리 패턴을 서브에이전트가 처음부터 알고 시작합니다.

## 병렬 리서치 패턴: 15개 경쟁사를 동시에 분석하는 방법

서브에이전트의 진짜 위력은 병렬 처리에 있습니다.

```
15개 경쟁사를 각각 독립적인 서브에이전트로 동시에 분석해줘
```

순차 처리와 병렬 처리의 차이는 단순히 속도만이 아닙니다. 각 서브에이전트가 자신의 컨텍스트 창을 가지므로, 15개의 대용량 분석 결과가 메인 컨텍스트를 오염시키지 않습니다. Claude는 각 서브에이전트의 핵심 결론만 수집해 종합합니다.

단, 주의할 점이 있습니다. 많은 서브에이전트가 상세한 결과를 돌려주면 여전히 메인 컨텍스트를 소비합니다. 대규모 지속적 병렬 처리가 필요하다면 Agent Teams가 더 적합합니다.

## 마치며: AI 에이전트 시대의 개발 인프라

Claude Code가 단순한 코딩 도우미라고 생각했다면, 이제 그 생각을 버려야 합니다. Anthropic은 처음부터 이걸 AI 에이전트 운영 인프라로 설계했습니다.

바이너리에서 발견된 `TeammateTool`은 단순한 미완성 기능이 아니었습니다. 수개월간 준비된 완전한 멀티 에이전트 시스템이었습니다. 그리고 이건 시작에 불과합니다.

지금 당장 할 수 있는 것:
1. `/agents` 명령으로 내장 서브에이전트 확인
2. `.claude/agents/code-reviewer.md` 파일 하나 만들어서 팀 컨벤션 반영
3. `memory: project` 설정으로 프로젝트별 학습 활성화

AI가 코드를 짜는 시대에서, AI 에이전트가 AI 에이전트를 조율하는 시대로 넘어가고 있습니다. 이 인프라를 먼저 이해하고 활용하는 사람이 다음 개발 사이클의 주인공이 될 겁니다.
