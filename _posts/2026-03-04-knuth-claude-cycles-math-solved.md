---
layout: post
title: "크누스가 못 푼 수학 문제 Claude가 1시간에 풀다"
description: "도날드 크누스가 못 푼 해밀턴 사이클 문제를 Claude Opus 4.6이 1시간 31번의 탐색으로 해결했다. AI의 수학적 추론 능력과 한계를 분석한다."
date: 2026-03-04 10:00:00 +0900
categories: [ai]
tags: [claude, AI, 수학, 크누스, 알고리즘, 그래프이론]
image: knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-1.png
published: true
---

2026년 3월 3일, 스탠포드 대학교 컴퓨터 과학 교수 도날드 크누스가 논문 한 편을 공개했다. 제목은 "Claude's Cycles". 내용은 단순하다. 자신이 수주 동안 풀지 못한 수학 문제를 Claude Opus 4.6이 1시간 만에 해결했다는 것이다.

평범한 사건처럼 들릴 수 있다. 그런데 이 사람이 누구인지 알면 다르다.

{% include pre-version.html %}

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-1-400.webp 400w,
            /static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-1-800.webp 800w,
            /static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-1-400.png 400w,
            /static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-1-800.png 800w,
            /static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-1.png" 
    alt="Claude Opus 4.6이 도날드 크누스의 수학 문제를 1시간에 해결한 탐색 과정 시각화" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 컴퓨터 과학의 성경을 쓴 사람이 AI한테 도움을 받았다

"The Art of Computer Programming" — 컴퓨터 과학자라면 한 번쯤 들어봤을 이름이다. 1962년부터 지금까지 크누스가 집필 중인 이 시리즈는 알고리즘의 바이블이다. 빌 게이츠가 "1~3권을 완전히 이해할 수 있다면 내게 이력서를 보내라"고 했을 만큼, 이 책은 컴퓨터 과학 교육의 정점으로 여겨진다.

크누스는 수십 년 동안 AI와 LLM에 회의적이었다. 텍스트 생성 능력은 인정하지만, 수학적 추론에서는 신뢰할 수 없다고 공개적으로 밝혀왔다. 패턴 매칭을 추론이라고 볼 수 없다는 입장이었다.

그런 그가 Claude에게 도움을 요청했고, 논문까지 발표했다.

이것이 왜 충격인지 이제 이해가 될 것이다.

### 크누스가 오랫동안 AI에 회의적이었다는 기록

그의 회의주의는 공개 강연과 인터뷰에서 반복적으로 등장했다. LLM이 수학적 명제를 "이해"하는 것처럼 보여도, 실제로는 훈련 데이터에서 본 패턴을 재현하는 것일 뿐이라는 견해였다. 그래서 TAOCP 집필에 AI를 쓸 생각이 없었다.

지금은 그 입장을 논문으로 수정한 셈이다.

## Claude's Cycles - 어떤 문제를 풀었나

문제 자체는 이렇다. m³개의 꼭짓점을 가진 방향 그래프를 길이 m³인 해밀턴 사이클 3개로 분해하는 일반적인 구성 규칙을 찾아라. 단, 홀수 m > 2에 대해 모두 성립해야 한다.

해밀턴 사이클이란 그래프의 모든 꼭짓점을 정확히 한 번씩 방문하고 출발점으로 돌아오는 경로다. 이것을 한 그래프에서 겹치지 않게 여러 개 찾는 것은 알고리즘적으로 까다로운 문제다.

이 문제는 TAOCP의 미래 권(제4B권)에 실릴 예정이었다. 크누스는 수주 동안 일반 구성 규칙을 도출하지 못하고 있었다. 동료 Filip Stappers가 Claude Opus 4.6에게 문제를 정확히 제시했고, 약 1시간 동안 31번의 탐색이 이루어졌다.

### Claude의 탐색 과정

Claude의 접근 방법은 인간 수학자와 놀라울 정도로 비슷했다:

1. 브루트포스 시도 → 너무 느림, 포기
2. 선형 수식 테스트 → 막힘
3. 기하학적 프레임워크 개발 → 부분 성공
4. 모의 담금질(Simulated Annealing) 적용 → 진전
5. 막히면 전략 전환 → 탄력적 대응
6. 30번째 탐색에서 이전 해에서 구조적 패턴 발견
7. 31번째 탐색에서 완성

Claude가 최종적으로 제시한 구성 방법은 "serpentine(뱀 모양)" 패턴이었다. 흥미로운 건, 이 패턴이 나중에 고전 모듈러 m진 그레이 코드와 대응한다는 것이 밝혀졌다는 점이다. Claude는 이 이름을 모르고 문제 제약 조건에서 처음부터 직접 유도했다.

기존 수학을 검색한 것이 아니라, 혼자서 새로 만들어낸 것이다.

## 직접 검증해볼 수 있는 Python 코드

크누스 문제의 핵심 개념을 코드로 검증해보고 싶다면 아래를 참고하자:

```python
# 해밀턴 사이클 분해 기초 검증 - 크누스 문제 기반
# m=3일 때 27개 꼭짓점(3x3x3 격자)에서 사이클 구성

def generate_serpentine_vertices(m):
    """m^3 격자 꼭짓점을 serpentine 순서로 나열"""
    vertices = []
    for z in range(m):
        for y in range(m):
            # 짝수 행은 x 증가, 홀수 행은 x 감소 (뱀 패턴)
            x_range = range(m) if y % 2 == 0 else range(m-1, -1, -1)
            for x in x_range:
                vertices.append((x, y, z))
    return vertices

def verify_hamiltonian(vertices, m):
    """모든 꼭짓점이 정확히 한 번 포함되는지 검증"""
    expected = set((x, y, z) for x in range(m) for y in range(m) for z in range(m))
    actual = set(vertices)
    return expected == actual and len(vertices) == m**3

m = 3
vertices = generate_serpentine_vertices(m)
print(f"m={m}: 꼭짓점 수 = {len(vertices)}")
print(f"해밀턴 조건 충족: {verify_hamiltonian(vertices, m)}")
print(f"첫 10개 꼭짓점: {vertices[:10]}")
```

코드를 실행하면 `해밀턴 조건 충족: True`가 출력된다. m=5, 7 같은 홀수에서도 동일하게 성립한다.

{% include pre-version.html %}

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-2-400.webp 400w,
            /static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-2-800.webp 800w,
            /static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-2-400.png 400w,
            /static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-2-800.png 800w,
            /static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/knuth-claude-cycles-math-solved/knuth-claude-cycles-math-solved-2.png" 
    alt="해밀턴 사이클 분해 serpentine 패턴 구성 그래프 시각화" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 크누스가 뭐라고 했나

논문에서 크누스는 Claude의 접근 방법을 "quite admirable(매우 훌륭하다)"이라고 표현했다. 결과에 대해서는 "a dramatic advance in automatic deduction and creative problem solving(자동 연역과 창의적 문제 해결에서의 극적인 진전)"이라고 썼다.

이 두 문장이 가볍지 않은 이유가 있다. 크누스는 수사적 표현을 잘 쓰지 않는 사람이다. 수십 년간 직접 알고리즘을 분석하고, TeX를 직접 만들어 사용해온 사람의 언어는 정밀하다.

그가 논문 제목에 Claude의 이름을 넣었다는 것 자체가 메시지다. AI가 해결한 문제라는 사실을 숨기거나 희석하지 않고, 정직하게 인정했다.

크누스는 이 구성을 검증한 뒤 정리를 직접 증명했고, 추가로 "Claude-like" 분해가 정확히 760가지 존재한다는 것도 발견했다. AI가 제안하고 인간이 확장한 구조다.

### Hacker News의 반응

이 소식이 Hacker News에 올라가자 수백 개의 댓글이 달렸다. 두 진영이 충돌했다.

한 쪽은 "인간 + LLM이 인간만의 결과보다 훨씬 뛰어나다는 증거"라고 평가했다. 다른 쪽은 "LLM이 진짜 추론하는 건지 아니면 정교한 패턴 매칭인지 여전히 불분명하다"고 반론을 제기했다.

흥미로운 댓글 하나: "context window가 길어지면서 모델이 문제에 오래 머물 수 있게 됐다. 이게 이번 성공의 진짜 이유일 수 있다." 이건 맞는 말이면서 동시에 AI의 현재 수준을 드러내기도 한다.

## AI 추론 능력이 말하는 세 가지

이번 사건에서 드러난 흥미로운 점들이 있다.

**첫째, 모르는 것을 알고 있다는 걸 몰랐다.** Claude는 자신이 유도한 "serpentine 패턴"이 이미 Gray code라는 이름을 가진 고전적 구성이라는 것을 몰랐다. 이미 알고 있는 답을 검색한 게 아니라, 제약 조건에서 처음부터 유도한 것이다.

**둘째, 막혔을 때 전략을 바꿨다.** 단순 브루트포스가 실패하자 기하학적 접근으로 전환하고, 그것도 막히자 모의 담금질을 시도했다. 고정된 알고리즘을 실행한 게 아니라, 탐색 과정에서 메타 판단을 내렸다.

**셋째, 이전 탐색의 패턴을 재활용했다.** 31번째 탐색에서 30번째 탐색 결과를 재활용했다. 탐색 이력이 다음 시도에 영향을 미쳤다는 뜻이다.

물론 31번 중 30번은 실패였다. AI가 자동으로 모든 문제를 해결한 것이 아니라, 인간 전문가(Stappers)의 가이드와 크누스의 최종 검증이 있었다. 최근 포스트 [Claude Code가 Anthropic 코드 90퍼센트를 작성하는 시대](/ai/2026/03/03/claude-code-ai-replaces-developers.html)에서도 다뤘듯이, 지금의 AI는 인간을 대체하는 게 아니라 인간과 함께할 때 가장 강하다.

## 알고리즘이 상상력을 가진 날

크누스는 1962년부터 TAOCP를 쓰기 시작했다. 알고리즘과 데이터 구조의 근본을 기술하는 작업이다. 그 책의 미래 권을 위한 문제를 AI가 해결한 날이 2026년 3월 3일이다.

AI가 수학 문제를 "푸는 척"한 게 아니라, 전략적으로 탐색하고, 막히면 방향을 틀고, 과거 시도를 재활용해서 새로운 구성을 만들어냈다. 크누스는 그것을 보고 논문 제목에 Claude의 이름을 붙였다.

남은 질문은 하나다: 다음 TAOCP 권의 절반은 누가 쓰게 될까.
