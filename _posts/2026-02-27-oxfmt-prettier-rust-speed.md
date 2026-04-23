---
layout: post
title: "Oxfmt 베타로 본 JS 포매터 속도 경쟁"
description: "Oxfmt 베타가 Prettier 호환을 유지하며 대폭 빠른 포맷 성능을 제시했다. 팀 적용 전에 확인할 기준과 바로 실행할 벤치마크 방법을 정리했다."
date: 2026-02-27 23:25:00 +0900
categories: [javascript]
tags: [oxfmt, prettier, biome, rust, formatter, javascript]
image: oxfmt-prettier-rust-speed/oxfmt-prettier-rust-speed-1.png
published: true
---

포매터는 늘 "느리면 불편한 도구" 정도로 취급됐는데, 이번에는 얘기가 조금 다릅니다. Oxfmt 베타가 공개되면서 "Prettier와 같은 결과를 유지하면서도 훨씬 빠르다"는 메시지가 정면으로 나왔고, 실제로 한국 개발자 커뮤니티에서도 바로 비교 글이 붙기 시작했습니다. 팀 개발에서 포매터는 저장 시점, pre-commit, CI까지 연쇄적으로 걸리기 때문에 체감 성능 차이가 곧 생산성 차이로 이어집니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/oxfmt-prettier-rust-speed/oxfmt-prettier-rust-speed-1-400.webp 400w,
            /static/img/posts/oxfmt-prettier-rust-speed/oxfmt-prettier-rust-speed-1-800.webp 800w,
            /static/img/posts/oxfmt-prettier-rust-speed/oxfmt-prettier-rust-speed-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/oxfmt-prettier-rust-speed/oxfmt-prettier-rust-speed-1.webp" 
    alt="Rust 기반 포매터가 JS CI 시간을 줄이는 흐름도" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## Oxfmt 베타가 화제가 된 이유

### 속도 숫자보다 중요한 호환성 신호
"빠르다"는 주장만으로는 보통 팀 도입이 어렵습니다. 그런데 Oxfmt가 강조한 포인트는 단순 속도가 아니라 Prettier 테스트 호환입니다. 기존 프로젝트가 이미 Prettier 규칙에 맞춰 쌓여 있다면, 결과 diff가 적을수록 도입 리스크가 낮아집니다. 즉, 이 이슈의 핵심은 새 포매터 등장 자체가 아니라 "마이그레이션 비용이 어디까지 줄어드느냐"에 있습니다.

### 왜 지금 포매터 전환 논의가 커졌나
최근 몇 달간 AI 코딩 도구를 붙인 팀이 많아지면서 코드 생성량이 확 늘었습니다. 생성량이 늘면 포맷 단계도 같이 늘고, 저장·커밋·빌드 파이프라인에서 병목이 더 잘 드러납니다. 그래서 "조금 빠른 도구"가 아니라 "파이프라인 지연을 눈에 띄게 줄이는 도구"가 주목받는 타이밍이 왔습니다.

여기서 중요한 건 성능만 보고 바로 갈아타지 않는 겁니다. 이전에 다뤘던 [클로드 코드 AGI 발언 원문 검증](/ai/2026/02/24/claude-code-agi-claim.html)에서도 봤듯, 강한 주장일수록 현장 검증을 먼저 통과해야 오래 갑니다.

## 팀 적용 전에 보는 4가지 체크포인트

### 1) 결과 안정성
- 기존 Prettier 결과와 line break, trailing comma, import 정렬이 얼마나 동일한지
- monorepo에서 패키지별 설정 충돌이 없는지

이 항목이 흔들리면 리뷰 비용이 올라가서 속도 이점이 사라집니다.

### 2) 워크플로우 통합 난이도
- IDE 저장 시 포맷, lint-staged, CI 포맷 검증을 한 번에 맞출 수 있는지
- 실패 메시지가 팀원에게 이해 가능한 형태인지

도구 교체는 기술 난도보다 운영 난도가 더 큽니다.

### 3) 대규모 레포에서의 일관성
- 부분 포맷과 전체 포맷 결과가 충돌하지 않는지
- 여러 OS 환경(Windows/macOS/Linux)에서 결과가 같은지

### 4) 롤백 가능성
- 문제 발생 시 Prettier로 즉시 복귀 가능한지
- 포맷 전환 커밋을 분리해 blame 노이즈를 줄였는지

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/oxfmt-prettier-rust-speed/oxfmt-prettier-rust-speed-2-400.webp 400w,
            /static/img/posts/oxfmt-prettier-rust-speed/oxfmt-prettier-rust-speed-2-800.webp 800w,
            /static/img/posts/oxfmt-prettier-rust-speed/oxfmt-prettier-rust-speed-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/oxfmt-prettier-rust-speed/oxfmt-prettier-rust-speed-2.webp" 
    alt="포매터 전환 시 검증 단계와 롤백 경로를 보여주는 다이어그램" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 직접 돌려보는 벤치마크 스크립트

### 로컬에서 10분 안에 비교하는 방법
아래 스크립트는 같은 코드베이스를 대상으로 Prettier와 Oxfmt 실행 시간을 비교합니다.

```bash
# 1) 베이스라인: prettier
hyperfine --warmup 2 "npx prettier . --check"

# 2) 후보: oxfmt (프로젝트 설치 방식에 맞춰 커맨드 조정)
hyperfine --warmup 2 "npx oxfmt . --check"

# 3) 실제 적용 전에는 write 모드도 별도 측정
hyperfine --warmup 2 "npx prettier . --write" "npx oxfmt . --write"
```

이 스크립트는 check/write 경로를 분리해서 CI 체감과 로컬 체감을 같이 확인하도록 만든 구성입니다.

### 결과를 해석할 때 흔한 실수
첫 실행만 보고 판단하면 캐시 영향 때문에 과장된 결론이 나옵니다. 최소 5회 이상 반복 평균을 보고, repo 크기와 파일 타입 비율(JS/TS/MDX)을 함께 기록해야 팀 내 합의가 빨라집니다. 내 경험상 도구 성능보다 "도입 근거를 문서화했는지"가 최종 의사결정 속도를 더 크게 좌우했습니다.

## 포매터 전쟁에서 남는 한 가지 기준

속도 경쟁은 계속 바뀌겠지만, 팀 입장에서 남는 질문은 단순합니다. "우리 레포에서 diff 안정성을 지키면서 전체 리드타임을 줄였는가"입니다. Oxfmt 베타는 이 질문에 답할 후보로 충분히 흥미롭고, 지금은 찬반보다 검증 설계를 잘 짜는 팀이 이깁니다. 이번 주 안에 샘플 패키지 하나만이라도 교차 벤치마크를 돌려보면, 도입 여부는 감이 아니라 숫자로 결정할 수 있습니다.

