---
layout: post
title: "Python 느리다는 말, 이제 못 합니다 - 3.15 JIT가 바꾼 진짜 현실"
date: 2026-03-18 11:00:00 +0900
categories: [python]
tags: [Python, JIT, 성능최적화, 컴파일러, CPython]
image: python-315-jit-revolution/python-315-jit-revolution-1.png
published: true
---

"Python은 느리다."

개발자 커뮤니티에서 10년 넘게 통용되어온 이 말은 사실 절반의 진실입니다. 생산성 좋고 생태계 풍부한 Python을 쓰되 성능이 필요한 부분은 C 확장이나 Cython, 혹은 아예 다른 언어로 갈아타야 한다는 암묵적 합의가 있었죠. 그런데 2026년 3월, Hacker News가 갑자기 Python 얘기로 들썩였습니다. **Python 3.15 JIT가 드디어 제대로 돌아가기 시작했다**는 소식 때문입니다.

374점, 195개 댓글. 이 정도 반응이면 Python 커뮤니티가 얼마나 오래 이 순간을 기다려왔는지 알 수 있습니다. 단순한 성능 업데이트가 아닙니다. Python이 언어로서의 한계라고 여겨졌던 경계 하나가 무너지는 장면입니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/python-315-jit-revolution/python-315-jit-revolution-1-400.webp 400w,
            /static/img/posts/python-315-jit-revolution/python-315-jit-revolution-1-800.webp 800w,
            /static/img/posts/python-315-jit-revolution/python-315-jit-revolution-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/python-315-jit-revolution/python-315-jit-revolution-1-400.png 400w,
            /static/img/posts/python-315-jit-revolution/python-315-jit-revolution-1-800.png 800w,
            /static/img/posts/python-315-jit-revolution/python-315-jit-revolution-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/python-315-jit-revolution/python-315-jit-revolution-1.png" 
    alt="히어로 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## Python JIT의 수난사 — 3.13부터 3.14까지 무슨 일이 있었나

Python에 JIT(Just-In-Time) 컴파일러를 넣으려는 시도는 사실 오래됐습니다. PyPy가 2007년부터 JIT로 CPython보다 5-10배 빠른 성능을 보여줬음에도 공식 CPython에는 줄곧 인터프리터 방식이 유지됐습니다. 이유는 간단합니다. CPython의 JIT 구현은 **생각보다 훨씬 어려운 문제**였거든요.

Python 3.13에서 처음으로 실험적 JIT가 공식 도입됐습니다. "Copy-and-Patch" 방식이라고 불리는 이 구현은 LLVM을 빌드 타임에 활용해 스텐실을 생성하고, 런타임에 그걸 붙여넣는 방식이었습니다. 그런데 성능 향상이 기대에 미치지 못했어요. 특정 연산에서는 빠르지만 일반적인 Python 코드에서는 오히려 JIT를 끈 것보다 느린 경우도 있었습니다.

3.14에서는 JIT 개발이 주춤했습니다. Python 핵심 개발팀이 JIT보다 다른 최적화(tail-calling 인터프리터, free-threading 등)에 집중하는 시간이 길어졌습니다. 커뮤니티에선 "Python JIT는 영원히 '실험적'으로만 남는 거 아니냐"는 냉소도 나왔습니다.

그리고 2026년, 3.15 alpha에서 상황이 완전히 뒤집혔습니다.

## 3.15에서 정확히 무엇이 바뀌었나

Python 3.15 공식 문서에 기재된 JIT 변경사항은 단순한 개선이 아닙니다. 아키텍처 자체가 바뀐 수준입니다.

### 새로운 Tracing 프론트엔드

기존 JIT는 코드 경로를 **추정**했습니다. 3.15의 JIT는 **실제 실행 경로를 기록**합니다. 이 차이가 어마어마합니다. 루프가 실제로 어떻게 돌아가는지, 분기가 어떤 방향으로 흘러가는지를 추적해서 그 경로에 최적화된 기계어를 생성합니다.

또한 이전 JIT가 처리하지 못했던 **객체 생성, 오버로딩 연산, 제너레이터**까지 이제 JIT 최적화 범위에 들어왔습니다.

```python
# 이런 코드가 이제 JIT 최적화를 받습니다
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def distance(self, other):
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5

# 루프 내 반복 호출 → JIT가 실행 경로 추적 후 최적 기계어 생성
points = [Point(i, i * 2) for i in range(10000)]
origin = Point(0, 0)
distances = [origin.distance(p) for p in points]
```

### 기본 레지스터 할당

이전 JIT는 중간 계산 결과를 메모리에 저장했다 읽는 방식이었습니다. 3.15 JIT는 **레지스터를 직접 활용**합니다. CPU 레지스터 접근은 메모리보다 수십 배 빠르기 때문에, 연산이 많은 코드에서 효과가 극적으로 나타납니다.

### 상수 전파 강화

```python
def calculate(n):
    TAX_RATE = 0.1      # 컴파일 시점에 상수로 인식
    DISCOUNT = 0.05     # 마찬가지
    return n * (1 + TAX_RATE) * (1 - DISCOUNT)
```

이런 코드에서 `TAX_RATE`와 `DISCOUNT`가 루프마다 다시 계산되는 게 아니라, **컴파일 타임에 이미 계산**됩니다. 단순해 보이지만 실제 비즈니스 로직에서 자주 쓰이는 패턴이고, 성능 차이가 큽니다.

## 성능 수치: 얼마나 빨라지나

공식 문서에 기재된 벤치마크 결과입니다:

| 환경 | JIT vs 비JIT | JIT vs tail-call 인터프리터 |
|------|:---:|:---:|
| x86-64 Linux | +15~100%+ | +5~6% |
| AArch64 macOS | - | +8~9% |

"15~100%+"라는 범위가 넓은 게 의아하다면, 이건 워크로드에 따라 달라지기 때문입니다. 수치 계산 중심 코드는 극적인 향상을 보이고, I/O 바운드 코드는 상대적으로 차이가 적습니다.

중요한 포인트는 pyperformance 벤치마크 suite 기준으로 **기하평균 5-6% 향상**이 나왔다는 겁니다. pyperformance는 실제 Python 코드 패턴을 반영한 종합 벤치마크라서, 이 숫자가 의미 있는 수준의 실질적 향상입니다.

그리고 LLVM은 **빌드 타임에만 필요**합니다. 배포된 Python 바이너리를 사용하는 일반 개발자는 아무것도 설치할 필요 없이 JIT 혜택을 받습니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/python-315-jit-revolution/python-315-jit-revolution-2-400.webp 400w,
            /static/img/posts/python-315-jit-revolution/python-315-jit-revolution-2-800.webp 800w,
            /static/img/posts/python-315-jit-revolution/python-315-jit-revolution-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/python-315-jit-revolution/python-315-jit-revolution-2-400.png 400w,
            /static/img/posts/python-315-jit-revolution/python-315-jit-revolution-2-800.png 800w,
            /static/img/posts/python-315-jit-revolution/python-315-jit-revolution-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/python-315-jit-revolution/python-315-jit-revolution-2.png" 
    alt="본문 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 내 코드는 얼마나 빨라질까 — 유형별 예측

솔직히 말하면, 모든 Python 코드가 劇的으로 빨라지진 않습니다. JIT가 효과를 발휘하는 조건이 있거든요.

**JIT 효과가 큰 코드**:
- 수치 계산이 많은 루프 (`for`, `while` 반복이 많은 과학/금융 계산)
- 동일 함수를 수천~수만 번 반복 호출하는 패턴
- 간단한 객체를 대량 생성하는 코드

```python
# JIT 혜택 최대 — 반복적 수치 계산
def monte_carlo_pi(n_samples):
    inside = 0
    for _ in range(n_samples):
        x = random.random()
        y = random.random()
        if x**2 + y**2 <= 1:
            inside += 1
    return 4 * inside / n_samples
```

**JIT 효과가 제한적인 코드**:
- 네트워크/DB I/O가 병목인 웹 서비스 (기다리는 게 느린 것)
- 각기 다른 함수를 한두 번씩 호출하는 스크립트성 코드
- 이미 NumPy/Pandas 같은 C 확장을 주로 쓰는 데이터 파이프라인

NumPy를 쓰고 있다면 사실 JIT 혜택이 크지 않습니다. NumPy 내부는 이미 최적화된 C/Fortran 코드라 Python JIT가 끼어들 여지가 적거든요. 오히려 NumPy를 쓰기 전의 전처리 단계나, NumPy 없이 순수 Python으로 처리하는 부분에서 차이가 납니다.

## 지금 당장 JIT 켜고 테스트하는 방법

Python 3.15는 아직 alpha 단계이지만, 지금 바로 테스트해볼 수 있습니다.

```bash
# pyenv로 설치 (가장 쉬운 방법)
pyenv install 3.15.0a7

# 또는 python.org에서 직접 다운로드
# https://www.python.org/downloads/

# JIT 활성화 확인
python3 --version  # Python 3.15.x 확인

# JIT 상태 확인 (내부 플래그)
python3 -c "import sys; print(sys._jit_available if hasattr(sys, '_jit_available') else 'JIT info N/A')"
```

프로덕션에 바로 올리진 마세요. Alpha 버전이고, 일부 서드파티 C 확장과 호환성 이슈가 있을 수 있습니다. 하지만 개인 프로젝트나 벤치마크 테스트 용도로는 지금 바로 써볼 만합니다.

```python
# 간단한 JIT 효과 측정 스크립트
import time

def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

start = time.perf_counter()
result = fib(35)
elapsed = time.perf_counter() - start

print(f"fib(35) = {result}, 소요: {elapsed:.3f}초")
# Python 3.14: ~3.8초
# Python 3.15 (JIT): ~2.1초 예상 (재귀는 JIT 효과 중간 수준)
```

## 개발자가 지금 해야 할 체크리스트

- [ ] **벤치마크 기반으로 판단하기**: 성능 개선이 필요한 함수를 먼저 프로파일링 (`cProfile`, `py-spy`)
- [ ] **3.15 alpha 로컬 설치**: pyenv로 3.15.0a7 설치해 자기 코드 기준 속도 비교
- [ ] **순수 Python 코드 비율 파악**: NumPy에 의존한 코드보다 for 루프 위주 코드에서 효과 큼
- [ ] **이전 최적화 우회책 재검토**: Cython, numba, PyPy로 감쌌던 코드 중 일부가 불필요해질 수 있음
- [ ] **프로덕션 전환 시점 체크**: 3.15 정식 출시 예정은 2026년 10월, 그 전까지는 staging 환경 검증 권장

## 마치며

"Python은 느리다"는 말은 이제 점점 틀린 말이 되어가고 있습니다.

물론 JIT 하나로 Python이 C나 Rust의 성능을 따라잡을 거라는 건 과장입니다. 하지만 **"Python이 느리니까 어쩔 수 없이 다른 언어로 갈아타야 한다"는 결정을 내리기 전에 한 번 더 생각하게 만드는 수준**의 변화입니다.

Hacker News 댓글에서 한 개발자가 이런 말을 했습니다.

> "The irony is that just as people were finally switching away from Python for performance reasons, Python is getting competitive."

이미 Python에서 벗어나기 시작한 시점에 Python이 빨라지고 있다는 아이러니. 좋든 싫든, 3.15는 Python의 역사에서 중요한 변곡점이 될 것 같습니다. 2026년 10월 정식 출시가 기다려집니다.
