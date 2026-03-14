---
layout: post
title: "Claude 100만 토큰 컨텍스트 정식 공개 — 코드베이스 전체를 올렸더니 생긴 일들"
date: 2026-03-15 10:00:00 +0900
categories: [ai]
tags: [claude, anthropic, context-window, ai, llm, developer-tools]
image: claude-1m-context-codebase/claude-1m-context-codebase-1.png
published: true
---

Hacker News에서 1,000점을 넘긴 소식이 있었다. "1M context is now generally available for Opus 4.6 and Sonnet 4.6." 개발자 커뮤니티가 이렇게 들썩인 건 오랜만이다. 100만 토큰이 어느 정도인지 감이 안 잡히는 사람도 있을 것이다. 간단히 말하면, 약 75만 단어, 혹은 중형 오픈소스 프로젝트 전체를 통째로 집어넣을 수 있는 분량이다.

이걸 들었을 때 내 첫 반응은 "과연 실제로 쓸 수 있을까?"였다. 그래서 직접 시험해봤다.

![Claude 100만 토큰 컨텍스트 히어로 이미지](/static/img/posts/claude-1m-context-codebase/claude-1m-context-codebase-1.png){: .wd100}

{% include pre-version.html %}

## 100만 토큰, 실제로 어느 정도 분량인가

토큰은 직관적인 단위가 아니다. "100만 토큰"이라고 하면 추상적으로 느껴진다. 실제 분량으로 환산하면 이렇다:

| 단위 | 약 100만 토큰에 해당하는 분량 |
|------|-------------------------------|
| 영어 단어 | 약 75만 단어 |
| 한국어 문자 | 약 50~60만 자 |
| Python 코드 | 약 25,000~30,000줄 |
| 소형 오픈소스 전체 | 대부분 한 번에 가능 |

GPT-4의 128K, 이전 Claude 3.5의 200K와 비교하면 5배 이상 확장된 수치다. 이전까지 개발자들이 대형 코드베이스를 LLM에 넣으려면 RAG(검색 증강 생성)를 구축하거나, 파일을 쪼개 여러 번 나눠 보내거나, 관련 파일만 선별해서 컨텍스트에 올리는 수작업이 필요했다.

이제 그 작업이 상당 부분 필요 없어진다.

## 코드베이스 전체를 넣으면 달라지는 것들

### 1. 레거시 코드 분석이 완전히 달라진다

10년 된 Django 프로젝트를 맡았을 때 가장 어려운 건 "이 코드가 왜 이렇게 되어 있는가"를 이해하는 거다. 함수 하나가 다른 모듈의 전역 변수에 의존하고, 그 변수는 또 다른 미들웨어에서 세팅되는 식이다.

이전에는 관련 파일을 직접 찾아 복붙하고, LLM에게 "이 두 파일 사이의 관계를 설명해줘"를 반복해야 했다. 이제는 프로젝트 전체를 한 번에 올리고 "이 코드의 데이터 흐름을 추적해줘"라고 하면 된다.

```bash
# find로 소스 파일 목록 추출 후 하나로 합치기
find . -name "*.py" -not -path "./.git/*" | xargs cat > full_codebase.txt
wc -c full_codebase.txt  # 파일 크기 확인
# → 약 2MB 정도면 1M 토큰 범위 안에 들어온다
```

### 2. API 문서 전체 로드 후 코드 생성

예전에는 API 문서가 방대할 경우 LLM이 학습한 오래된 버전의 API를 참고해 틀린 코드를 만드는 일이 잦았다. 이제는 공식 문서를 통째로 컨텍스트에 넣고 코드를 생성하면 최신 스펙을 반영한 코드가 나온다. 회사 내부 API 문서처럼 LLM이 훈련 데이터로 본 적 없는 사내 API를 다룰 때 특히 효과적이다.

### 3. 대형 PR 리뷰가 가능해진다

변경된 파일이 30개가 넘는 PR을 리뷰할 때, 이전에는 LLM에게 한 번에 보여줄 수 없어서 파일별로 쪼개 검토해야 했다. 변경 전후의 맥락을 파악하기 어려웠고, LLM은 "이 함수가 다른 곳에 미치는 영향"을 알 수 없었다.

100만 토큰이면 대형 PR의 diff 전체를 올리고 "전체 맥락에서 이 변경이 미치는 영향을 분석해줘"라고 할 수 있다.

![Claude 1M 컨텍스트 실제 활용 다이어그램](/static/img/posts/claude-1m-context-codebase/claude-1m-context-codebase-2.png){: .wd100}

{% include pre-version.html %}

## 실제 워크플로우 예시

```python
import anthropic
from pathlib import Path

def load_codebase(directory: str, extensions: list[str]) -> str:
    """지정된 디렉토리에서 소스 파일을 읽어 하나의 문자열로 합친다."""
    contents = []
    for ext in extensions:
        for path in Path(directory).rglob(f"*.{ext}"):
            skip = [".git", "node_modules", "__pycache__", ".venv"]
            if any(s in str(path) for s in skip):
                continue
            try:
                with open(path, encoding="utf-8") as f:
                    relative = path.relative_to(directory)
                    contents.append(f"# File: {relative}\n{f.read()}")
            except Exception:
                continue
    return "\n\n".join(contents)


codebase = load_codebase("./src", ["py", "ts", "js"])
print(f"총 문자 수: {len(codebase):,}")  # 예: 총 문자 수: 1,240,000

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=4096,
    messages=[
        {
            "role": "user",
            "content": (
                "다음 코드베이스를 분석하고 개선점을 제안해줘. "
                "전체 구조, 의존성 문제, 리팩토링 우선순위를 포함해서 정리해줘.\n\n"
                f"{codebase}"
            ),
        }
    ],
)

print(response.content[0].text)
```

단순한 코드처럼 보이지만, 이 방식이 실용적으로 가능해진 게 1M 토큰 덕분이다. 이전에는 `codebase` 문자열이 컨텍스트 한계를 초과해 분할 처리와 결과 합산 로직이 추가로 필요했다.

## 비용과 현실적인 제약

솔직하게 말하면, 100만 토큰을 매번 사용하는 건 비용 측면에서 부담이 될 수 있다. API 토큰 비용은 입력 토큰 기준으로 청구되며, 100만 토큰을 사용하면 그만큼 비용이 발생한다.

실용적인 접근법은 다음과 같다:

- **자주 바뀌지 않는 큰 컨텍스트** (레거시 코드 분석, 사내 API 문서): 1M 컨텍스트 활용 적합
- **반복적인 소규모 작업** (코드 생성, 단위 테스트, 리뷰): 기존 방식 유지
- **프롬프트 캐싱 활용**: Anthropic의 캐싱 기능을 사용하면 동일 컨텍스트 재사용 시 비용 60~90% 절감 가능

캐싱은 특히 "오늘 하루 이 코드베이스에 대한 질문을 계속할 것 같다"는 경우에 효과적이다. 첫 번째 호출에서 캐시를 생성해두면 이후 호출은 훨씬 저렴하게 처리된다.

```python
# 프롬프트 캐싱 예시
response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=4096,
    system=[
        {
            "type": "text",
            "text": f"다음은 분석할 코드베이스다:\n\n{codebase}",
            "cache_control": {"type": "ephemeral"},  # 캐싱 활성화
        }
    ],
    messages=[
        {"role": "user", "content": "이 코드베이스에서 보안 취약점을 찾아줘."}
    ],
)
```

## 마치며

100만 토큰 컨텍스트는 기술적으로 인상적이지만, 더 중요한 건 개발자 워크플로우에서 마찰을 제거한다는 점이다. RAG 파이프라인을 구축할 시간이 없는 작은 팀, 레거시 코드를 빠르게 파악해야 하는 상황, 방대한 내부 문서를 한 번에 이해해야 하는 경우 — 이 모든 상황에서 "어떻게 쪼개서 넣을까"를 고민하지 않아도 된다.

HN에서 1,000점을 넘긴 데는 이유가 있다. 개발자들이 매일 겪는 실질적인 불편함을 해소하는 기능이기 때문이다.

지금 당장 해볼 수 있는 것: 오래 방치해둔 레거시 프로젝트 하나를 골라 전체 소스를 Claude에 올려보자. 아마 처음으로 그 코드가 "전체적으로" 이해되는 느낌을 받을 것이다. 그게 1M 컨텍스트가 개발자에게 주는 가장 큰 선물이다.
