---
layout: post
title: "구글 DESIGN md가 오픈소스 되자 UI 판이 달라졌다"
description: "DESIGN md가 왜 갑자기 개발자 커뮤니티를 뒤흔드는지, 구글 Stitch 오픈소스화와 바이브 코딩 워크플로 변화까지 실무 기준으로 정리했다."
date: 2026-04-26 19:03:24 +0900
categories: [others]
tags: [Google, Stitch, DESIGNmd, Vibecoding, UIDesign]
image: google-design-md-shift/google-design-md-shift-1.webp
published: true
---

솔직히 처음엔 또 하나의 프롬프트 파일 유행인가 싶었다. `AGENTS.md` 다음엔 `DESIGN.md`라니, 이름부터 너무 그럴듯하잖아. 근데 이번 건은 좀 다르게 번진다. GeekNews 메인 상단에 바로 걸렸고, Reddit에서는 "이제 에이전트가 드디어 보라색 그라데이션 좀 그만 쓴다"는 식으로 반응이 붙었다. 결정적으로 구글이 Stitch 안에만 숨겨둔 기능이 아니라, 아예 공개 스펙과 CLI까지 같이 밀어버렸다. 이쯤 되면 장난감이 아니라 작업 방식 바꾸자는 신호에 더 가깝다.

이전에도 [바이브 코딩 가이드](/ai/2026/01/31/vibe-coding-guide.html)에서 컨텍스트 파일 하나가 결과물을 얼마나 바꾸는지 얘기했는데, 이번엔 그 범위가 코드에서 UI까지 내려왔다. 이제 에이전트한테 "좀 더 세련되게"라고 애매하게 던지는 대신, 색상 토큰이 왜 존재하는지, 버튼 모서리를 어디까지 둥글게 할지, 어떤 분위기를 유지해야 하는지를 파일 하나로 박아 넣는 흐름이 생긴 셈이다.

{% include pre-version.html %}

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/google-design-md-shift/google-design-md-shift-1-400.webp 400w,
            /static/img/posts/google-design-md-shift/google-design-md-shift-1-800.webp 800w,
            /static/img/posts/google-design-md-shift/google-design-md-shift-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/google-design-md-shift/google-design-md-shift-1.webp"
    alt="DESIGN md로 연결된 UI 설계 흐름"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 왜 이렇게 빨리 퍼졌냐

### Stitch 기능이 아니라 공용 포맷처럼 보였기 때문이다

구글 공식 설명을 보면 출발점은 Stitch다. 그런데 포인트는 "Stitch에서 이런 것도 된다"가 아니다. 디자인 시스템을 어떤 URL에서든 뽑아오고, `DESIGN.md`로 내보내고, 다시 다른 코딩 도구나 프로젝트로 들여올 수 있다고 말한다. 즉 특정 툴의 잠금 장치가 아니라, 에이전트가 읽는 디자인 계약서처럼 굴겠다는 얘기다. 이게 개발자들 귀에는 되게 다르게 들린다. 툴을 갈아타도 남는 자산이라는 뜻이니까.

### GitHub 반응 속도가 생각보다 세다

공식 GitHub 저장소는 며칠 만에 별이 빠르게 붙었다. 이건 그냥 "좋아요" 숫자 이상의 의미가 있다. 사람들 손이 이미 움직였다는 뜻이다. README를 보면 포맷 설명만 있는 게 아니라 `lint`, `diff` 같은 CLI까지 같이 둔다. 그러면 이건 예쁜 문서 포맷이 아니라 CI에 물릴 수 있는 파일이 된다. 디자인 얘기가 갑자기 개발 워크플로 얘기로 내려오는 순간이다.

## 파일 하나가 실제로 바꾸는 것

### 토큰보다 중요한 건 이유까지 같이 넣는다는 점

이 포맷의 재밌는 부분은 YAML 토큰만 있는 게 아니라, 아래에 마크다운으로 "왜 이렇게 써야 하는지"를 붙인다는 거다. 색 하나만 던져두면 에이전트는 또 적당히 추론한다. 근데 이 색은 상호작용에만 쓰고, 이 서체는 헤드라인에서만 쓰고, 이 간격은 촘촘한 정보 밀도 때문이라고 설명까지 같이 박아두면 얘기가 달라진다. 그냥 값 전달이 아니라 의도 전달이 된다.

```md
---
name: Product Default
colors:
  primary: "#111827"
  accent: "#2563EB"
spacing:
  md: 16px
---

## Overview
차갑고 빠른 B2B 도구 느낌을 유지한다

## Colors
accent는 클릭 가능한 요소에만 쓴다
```

이 정도만 있어도 에이전트가 버튼이랑 링크랑 카드 강조를 막 섞어 쓰는 일이 확 줄어든다. 결국 UI 퀄리티 문제의 절반은 모델 지능보다 문맥 부재였다는 얘기다.

### 디자이너 없는 팀일수록 체감이 클 수 있다

요즘 작은 팀들 보면 Figma 파일보다 채팅 로그가 더 길다. 디자이너가 매번 붙어 있지 않으니까 에이전트한테 화면 초안을 넘기고, 그걸 다시 사람이 고친다. 여기서 제일 큰 비용이 "왜 또 이 폰트냐", "왜 또 이 파란색이냐" 같은 반복 피드백이다. `DESIGN.md`는 딱 그 반복문을 줄이려는 시도다. 와이어프레임을 대체한다기보다, 초안이 팀 취향에서 너무 멀리 튀지 않게 잡아주는 안전줄에 가깝다.

{% include pre-version.html %}

## 근데 이걸로 다 끝났다고 보기엔 이르다

### Figma를 지운다기보다 앞단을 바꾼다

여기서 바로 "피그마 끝났다"로 가는 글들이 벌써 보이는데, 난 그건 좀 과하다고 본다. 디자인 시스템 전달은 좋아져도, 여러 사람이 동시에 검토하고 변형안 비교하고 실제 제품 의사결정을 쌓는 과정은 여전히 별개다. `DESIGN.md`는 산출물보다 의도 보존에 강하다. 그래서 오히려 기존 디자인 툴을 밀어내기보다, 코딩 에이전트가 이상한 초안을 찍어내는 비율을 줄이는 쪽이 더 현실적이다.

### 디자인 시스템이 없는 팀은 빈 파일만 생긴다

이게 제일 중요하다. 파일 포맷이 좋아도 적을 내용이 없으면 아무 일도 안 일어난다. 브랜드 색이 뭔지, 라운드는 얼마나 줄지, 카피 톤은 딱딱한지 친근한지 팀 안에서 아직 안 정해졌다면 `DESIGN.md`도 결국 빈 껍데기다. 그러니까 이 포맷의 진짜 가치는 "UI를 자동 생성한다"보다 "그동안 말로만 전하던 디자인 감각을 텍스트 자산으로 고정한다"에 있다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/google-design-md-shift/google-design-md-shift-2-400.webp 400w,
            /static/img/posts/google-design-md-shift/google-design-md-shift-2-800.webp 800w,
            /static/img/posts/google-design-md-shift/google-design-md-shift-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/google-design-md-shift/google-design-md-shift-2.webp"
    alt="구글 DESIGN md 토큰 구조 장면"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 지금 써보려면 어디부터 보면 되냐

### README보다 lint와 diff를 먼저 보는 게 낫다

내가 이걸 보고 바로 손이 갔던 건 문법 자체보다 CLI였다. `lint`가 있으면 구조 깨진 파일을 잡을 수 있고, `diff`가 있으면 디자인 룰이 언제 어떻게 바뀌었는지 추적할 수 있다. 이건 곧 pull request에서 "색만 바뀐 줄 알았는데 버튼 의미까지 바뀌었네" 같은 얘기를 할 수 있다는 뜻이다. 디자인이 드디어 코드처럼 비교 가능한 상태로 내려오는 거다.

### 첫 적용은 작은 화면 한 장이면 충분하다

처음부터 전사 디자인 시스템 옮기겠다고 달려들면 바로 지친다. 랜딩 한 장이나 관리자 대시보드 한 화면 정도를 잡고, 색상 토큰 몇 개와 버튼 규칙부터 적어보는 게 낫다. 그다음 에이전트한테 같은 화면을 두세 번 다시 만들게 해보면 차이가 바로 보인다. 잘 먹히면 그때부터 카드, 테이블, 폼으로 넓히면 된다.

지금 `DESIGN.md`가 뜨는 이유는 새 파일 확장자가 생겨서가 아니다. 바이브 코딩이 진짜 실무로 들어오면서, 이제는 코드 스타일만 고정해선 부족해졌기 때문이다. 팀마다 "우리답게 생긴 UI"를 에이전트에게 어떻게 지속적으로 먹일지 찾고 있었고, 구글이 그 빈자리에 꽂을 만한 아주 이해 쉬운 포맷을 던졌다. 나도 당장 모든 프로젝트에 넣을 생각까진 없는데, 적어도 에이전트가 매번 같은 미적 사고를 잃어버리는 게 짜증났던 팀이라면 이건 한 번 실험해볼 만하다. 이번 유행이 빨리 붙는 건 이유가 있다.
