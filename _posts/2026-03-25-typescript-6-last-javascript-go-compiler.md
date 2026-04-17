---
layout: post
title: "TypeScript가 JavaScript를 버렸습니다 — Go로 다시 짠 컴파일러, 10배 빠르다"
date: 2026-03-25 09:00:00 +0900
categories: [javascript]
tags: [TypeScript, JavaScript, Go, 컴파일러, TypeScript7, 마이크로소프트]
image: typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-1.png
published: true
---

어제(2026년 3월 24일), 마이크로소프트가 TypeScript 6.0을 공식 출시했습니다. 그런데 릴리스 노트에는 예상치 못한 한 줄이 적혀 있었습니다.

> "TypeScript 6.0 is the last version of TypeScript built on JavaScript."

**JavaScript로 만든 마지막 TypeScript.** 다음 버전 TypeScript 7.0은 Go로 완전히 재작성됩니다. 10년 넘게 JavaScript 위에서 돌아가던 TypeScript 컴파일러가 이제 다른 언어로 갈아탑니다. 개발자 커뮤니티에서는 즉시 "이게 무슨 말이야?"라는 반응이 쏟아졌고, Hacker News와 Reddit은 하루 종일 이 이야기로 뜨거웠습니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-1-400.webp 400w,
            /static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-1-800.webp 800w,
            /static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-1-400.png 400w,
            /static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-1-800.png 800w,
            /static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-1.png" 
    alt="TypeScript 6.0 히어로 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## TypeScript 6.0, 무엇이 달라졌나

TypeScript 6.0은 단순한 기능 추가 버전이 아닙니다. TypeScript 7.0으로 넘어가기 위한 **생태계 정리** 작업이 핵심입니다. 이번 릴리스에서 가장 먼저 체감하게 되는 변화는 `strict: true`가 이제 기본값이 됐다는 것입니다.

지금까지는 `tsconfig.json`에 `"strict": true`를 명시해야 엄격한 타입 검사가 활성화됐습니다. 6.0부터는 별도 설정 없이도 기본 활성화됩니다. 기존 프로젝트를 그냥 업그레이드했다가 빨간 줄이 수십 개 터지는 상황이 발생할 수 있습니다.

**삭제된 기능들도 눈에 띕니다:**

- **ES5 / ES3 출력 지원 종료**: 오래된 브라우저를 위한 다운트랜스파일은 esbuild, SWC, Babel 등 별도 도구로 위임합니다. TypeScript는 타입 검사에만 집중하겠다는 신호입니다.
- **AMD, UMD, SystemJS 모듈 형식 폐기**: CommonJS와 ESM 외의 레거시 모듈 형식이 사라집니다.
- **`baseUrl` 단독 사용 불가**: `paths`와 함께 써야 합니다. 기존에 `baseUrl`만 쓰던 프로젝트라면 수정이 필요합니다.
- **`@types` 자동 포함 중단**: 이제 명시적으로 선언해야 합니다.

반면 새롭게 추가된 기능도 있습니다:

- **Temporal API 표준 라이브러리 내장**: `Date` 객체의 오랜 결함을 해소하는 TC39 표준 API가 드디어 포함됩니다.
- **`isolatedDeclarations` 안정화**: 병렬 선언 파일(`.d.ts`) 생성이 가능해져 대형 모노레포 빌드 속도가 개선됩니다.
- **Map/WeakMap의 `upsert` 메서드 추가**: 조건부 삽입 패턴을 한 줄로 쓸 수 있습니다.

```typescript
// 기존 방식
if (!map.has(key)) {
  map.set(key, defaultValue);
}
const value = map.get(key);

// TypeScript 6.0 이후 (upsert)
const value = map.upsert(key, () => defaultValue);
```

## 프로젝트 Corsa — Go로 다시 태어나는 TypeScript 7.0

사실 이 이야기는 2025년 3월에 이미 시작됐습니다. 마이크로소프트가 TypeScript 컴파일러를 Go로 전면 재작성한다는 계획을 공식 발표했고, 프로젝트 코드명은 **Corsa**였습니다. 그 결과물이 내년 출시 예정인 **TypeScript 7.0 (`tsgo`)**입니다.

핵심 수치가 인상적입니다. VS Code 전체 소스코드는 약 **150만 줄의 TypeScript**로 이루어져 있는데, 현재 JavaScript 기반 컴파일러(`tsc`)는 이를 컴파일하는 데 **89초**가 걸립니다. 반면 Go 기반 `tsgo`는 동일한 코드를 **8.7초**에 처리합니다. 약 **10.2배** 빠릅니다.

메모리 사용량도 기존 대비 약 **50% 감소**합니다. 대형 프로젝트에서 TypeScript 언어 서버가 메모리를 수 GB씩 잡아먹는 문제가 실질적으로 해소될 가능성이 있습니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-2-400.webp 400w,
            /static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-2-800.webp 800w,
            /static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-2-400.png 400w,
            /static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-2-800.png 800w,
            /static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/typescript-6-last-javascript-go-compiler/typescript-6-last-javascript-go-compiler-2.png" 
    alt="TypeScript Go 컴파일러 성능 비교" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 왜 Rust가 아닌 Go였을까?

"Go로 재작성한다"는 소식이 나왔을 때 커뮤니티의 첫 반응은 "왜 Rust가 아니야?"였습니다. 실제로 esbuild, SWC, Biome 같은 현대적인 JS 도구들은 Rust나 Go로 만들어졌는데, TypeScript 팀이 Go를 선택한 이유가 있습니다.

마이크로소프트는 공식 문서에서 두 가지 이유를 언급했습니다:

1. **기존 코드베이스와의 구조적 유사성**: TypeScript 컴파일러 코드는 많은 부분이 재귀 구조와 복잡한 타입 추론 로직으로 이루어져 있습니다. Go의 가비지 컬렉터와 고루틴은 Rust의 소유권 모델보다 이 복잡성을 다루기에 더 적합하다고 판단했습니다.

2. **포팅 속도**: Rust는 안전성은 뛰어나지만 기존 알고리즘을 그대로 옮기는 포팅 작업이 훨씬 오래 걸립니다. TypeScript 팀은 빠른 전환이 필요했습니다.

결국 이 결정은 "가장 빠른 언어"보다 "현실적으로 빠르게 전환할 수 있는 언어"를 선택한 것입니다. 10배 성능 향상을 이미 달성했으니, 팀의 선택은 결과적으로 옳았습니다.

**개발자 입장에서 중요한 것**: `tsgo`는 `tsc`의 완전한 대체제입니다. CLI 명령어 구조, 에디터 통합(타입 호버, 정의로 이동, 자동완성), tsconfig 형식이 모두 동일합니다. 새로운 것을 배울 필요가 없습니다. 그냥 더 빠른 `tsc`입니다.

## 지금 당장 해야 할 마이그레이션 체크리스트

TypeScript 6.0으로 업그레이드하면서, 동시에 7.0 전환을 미리 준비해두는 것이 현명합니다. TypeScript 팀이 공식적으로 권장하는 마이그레이션 경로는 **6.0 완전 적용 → 7.0 전환**입니다.

```json
// tsconfig.json — 6.0 마이그레이션 체크포인트
{
  "compilerOptions": {
    // 1. strict는 이제 기본값이지만 명시해도 무방
    "strict": true,

    // 2. ES5/ES3 타깃 제거 (esbuild/SWC로 위임)
    // "target": "ES5",  ← 삭제
    "target": "ES2020",

    // 3. 레거시 모듈 형식 제거
    // "module": "AMD",  ← 삭제
    "module": "NodeNext",

    // 4. baseUrl 단독 사용 금지 — paths와 함께 쓰거나 제거
    // "baseUrl": ".",   ← 단독 사용 금지
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**단계별 마이그레이션 순서**:

1. TypeScript 6.0으로 업그레이드 후 `tsc --noEmit` 실행
2. `strict` 관련 에러 우선 수정 (가장 많음)
3. 레거시 모듈 형식 및 타깃 설정 정리
4. Deprecated API 경고 모두 해소
5. 이후 TypeScript 7.0 베타 출시 시 `tsgo`로 전환

현재 `tsgo`는 타입 검사와 에디터 기능은 안정화됐고, 파일 생성(`emit`) 기능이 마무리 단계에 있습니다. 2026년 하반기 중 TypeScript 7.0 정식 출시가 예상됩니다.

## 마치며

"TypeScript가 JavaScript를 버렸다"는 표현은 다소 자극적으로 들릴 수 있지만, 실제 의미는 다릅니다. TypeScript는 여전히 JavaScript를 타입 검사하고, 여전히 JavaScript로 컴파일됩니다. 바뀌는 것은 **컴파일러 자체가 어떤 언어로 만들어지느냐**입니다.

오히려 이번 변화는 TypeScript가 단순한 "JavaScript 슈퍼셋"을 넘어, 독립적인 타입 시스템으로 성숙해가는 신호로 읽을 수 있습니다. 10배 빠른 컴파일러는 모노레포, 대형 프로젝트 개발 경험을 근본적으로 바꿔놓을 것입니다. 매번 저장할 때마다 기다려야 했던 그 답답함이 사라질 수 있습니다.

TypeScript를 쓰는 팀이라면 지금 당장 6.0 마이그레이션 일정을 잡는 것을 권장합니다. 7.0이 나왔을 때 바로 올라탈 수 있도록 준비해두는 것이 현명합니다.
