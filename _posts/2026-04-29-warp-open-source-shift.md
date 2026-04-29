---
layout: post
title: "Warp 오픈소스 선언에 터미널 판이 흔들린다"
description: "Warp 오픈소스 전환이 2026년 4월 28일 공개됐다. AGPL 라이선스와 OpenAI 후원, 에이전트 중심 개발 방식이 왜 다시 주목받는지 개발자 시선으로 정리했다."
date: 2026-04-29 12:02:48 +0900
categories: [others]
tags: [Warp, OpenSource, Terminal, ADE, OpenAI]
image: warp-open-source-shift/warp-open-source-shift-1.webp
published: true
---

어제까지만 해도 Warp는 예쁘고 빠르긴 한데 결국 닫힌 터미널이라는 이미지가 강했다. 근데 2026년 4월 28일에 이 그림이 확 바뀌었다. Warp가 클라이언트를 오픈소스로 풀고, 저장소 운영 자체를 에이전트 중심으로 돌리겠다고 공식 발표했다. 그냥 코드 공개 한 번 했다는 얘기가 아니다. 터미널 앱 하나가 아니라 agentic development environment를 어떤 방식으로 굴릴지 공개 실험장으로 바꿔 버린 느낌에 가깝다.

재밌는 건 반응도 딱 둘로 갈렸다는 점이다. "이제야 쓸 이유가 생겼다"는 쪽이랑 "AGPL이면 회사에서 만지기 더 까다로운 거 아냐"라는 쪽. 둘 다 이해된다. 나도 처음엔 드디어 열렸네 싶었는데, 조금 더 읽어보니 진짜 포인트는 오픈소스 그 자체보다 오픈소스를 에이전트 운영 체계랑 묶어버린 데 있었다.

최근 [GitHub Copilot AI 크레딧 함정 시작됐다](/github/2026/04/28/copilot-ai-credits-trap.html) 글에서도 느꼈지만, 이제 개발툴 얘기는 기능보다 운영 모델 얘기가 더 무겁다. 어떤 모델을 쓰는지, 비용을 어디서 먹는지, 팀이 어디까지 검증할 수 있는지가 전부 연결돼 있다. Warp 발표는 그 흐름을 터미널 레벨까지 끌고 내려온 사례로 보였다.

{% include pre-version.html %}

## Warp 오픈소스 전환이 왜 갑자기 터졌나

### 공식 발표에서 제일 눈에 띈 문장

Warp 공식 블로그를 읽다가 제일 먼저 멈춘 문장은 이거였다. 이제 병목은 코드 작성이 아니라 사람 쪽 검증과 방향 설정이라는 얘기. 솔직히 요즘 팀들 다 비슷한 생각 하고 있잖아. 코드는 에이전트가 꽤 그럴듯하게 뽑는데, 이게 진짜 맞는지 확인하고 제품 방향을 맞추는 쪽이 더 느리다. Warp는 이걸 그냥 제품 메시지로 꺼내 버렸다.

이 발표가 신기한 이유는 오픈소스를 비용 절감이나 이미지 세탁처럼 쓰지 않았다는 데 있다. 오히려 커뮤니티가 에이전트를 관리하는 구조가 더 빨리 제품을 밀어준다고 주장한다. 꽤 대담하다. 보통은 사람이 PR을 만들고 봇이 보조하는데, 여기선 봇이 구현하고 사람이 방향과 검증을 맡는 쪽으로 무게를 옮겼다.

### 커뮤니티 반응이 뜨거운 이유

GeekNews와 Reddit 반응을 같이 보면 포인트가 선명하다. 예전부터 Warp를 써 보고 싶었는데 폐쇄형이라 보안팀이나 개인 원칙 때문에 못 썼던 사람들이 꽤 많았다. 반대로 이미 쓰던 사람들은 "이제 문제 생기면 직접 고칠 수 있겠네" 쪽으로 들떠 있었다. 특히 Rust 커뮤니티 쪽에서는 오픈소스 전환 자체보다 AGPL 선택과 자체 UI 프레임워크 공개 범위를 더 집요하게 보더라. 이건 그냥 팬심 반응이 아니라, 실제 도입 여부를 가르는 체크포인트다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/warp-open-source-shift/warp-open-source-shift-1-400.webp 400w,
            /static/img/posts/warp-open-source-shift/warp-open-source-shift-1-800.webp 800w,
            /static/img/posts/warp-open-source-shift/warp-open-source-shift-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/warp-open-source-shift/warp-open-source-shift-1.webp"
    alt="Warp 오픈소스 대시보드"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 이게 그냥 코드 공개가 아닌 이유

### 에이전트가 저장소 운영의 앞단에 나온다

Warp가 공개한 구조를 보면 코드 저장소를 열어 둔 것보다, 저장소 운영 방식을 상품처럼 같이 공개한 게 더 크다. 이슈 트리아지부터 구현, 테스트, 리뷰 전 단계까지 에이전트가 많이 끼어든다. 그러면 오픈소스 기여자 역할도 바뀐다. 예전에는 직접 코드 쓰는 사람이 메인이었는데, 여기선 아이디어를 명확히 적고 결과를 검증하는 사람이 훨씬 중요해진다.

이건 좋아 보이면서도 좀 무섭다. 오픈소스에서 제일 귀한 건 대충 돌아가는 코드보다 유지보수 감각인데, 그 감각을 에이전트 파이프라인이 얼마나 흡수할 수 있는지는 아직 미지수다. 특히 터미널처럼 플랫폼별 예외가 많은 제품은 더 그렇다. 멋있어 보이는 데모와 실제 운영 난이도 사이 간격이 꽤 클 수 있다.

### AGPL과 OpenAI 후원 조합이 묘하게 세다

라이선스도 묘하다. 앱은 AGPL, UI 크레이트는 MIT. 회사 입장에서는 경쟁사가 편하게 가져다 상업화하는 걸 막으면서도, 커뮤니티에는 "우린 진짜 열었다"는 신호를 같이 보내는 셈이다. 근데 기업 도입 쪽에서 보면 이 지점이 바로 검토 포인트가 된다. 특히 사내 포크나 내부 패치 전략이 있는 팀이면 라이선스 검토부터 다시 해야 한다.

OpenAI가 창립 후원자로 붙은 것도 그냥 장식 같지는 않다. Warp는 이미 멀티 모델과 멀티 하네스를 강조해 왔는데, 여기에 오픈소스 저장소 운영까지 OpenAI 모델 기반 워크플로로 묶어 버리면 메시지가 꽤 선명해진다. 터미널이 아니라 개발 운영면 전체를 먹겠다는 그림이다. 그래서 반응이 더 큰 것 같다.

{% include pre-version.html %}

## 실제로 쓰는 사람 기준으로 뭐가 달라지나

### 이제 불만을 말하는 방식이 달라진다

닫힌 제품일 때는 불만이 있어도 결국 기다리는 수밖에 없었다. 이제는 최소한 코드와 이슈, 로드맵을 같이 볼 수 있다. 이 차이가 생각보다 크다. 특히 터미널은 매일 쓰는 도구라서 사소한 불편이 누적되면 진짜 짜증난다. Windows에서 왜 저렇게 죽지, SSH 붙으면 왜 이 동작이 이상하지, 이런 걸 더 이상 감으로만 욕하지 않아도 된다.

반대로 책임도 같이 늘어난다. 오픈소스가 되면 "언젠가 누가 고치겠지"가 아니라 "정 불편하면 우리도 고칠 수 있네"로 바뀐다. 그래서 커뮤니티 온도도 달라진다. 실제로 AMA 스레드만 봐도 SSH 연결 관리, BYOK, ACP 지원 같은 요구가 바로 쏟아졌다. 이건 관심이 있다는 뜻이기도 하고, 기대치가 바로 높아졌다는 뜻이기도 하다.

### 지금 체크해야 할 포인트

도입 전에 나는 이 정도는 바로 확인해 볼 것 같다.

```bash
git clone https://github.com/warpdotdev/warp
cd warp
rg "AGPL|MIT|ACP|Oz|OpenAI" -n README.md FAQ.md .agents
```

이거 한 번 훑어보면 분위기가 바로 잡힌다. 코드보다도 `FAQ.md`, `.agents`, 공개 이슈 쪽에서 제품 철학이 훨씬 잘 드러난다. 터미널을 쓸 건지, ADE를 쓸 건지, 에이전트 운영 철학까지 받아들일 건지 기준이 분명해진다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/warp-open-source-shift/warp-open-source-shift-2-400.webp 400w,
            /static/img/posts/warp-open-source-shift/warp-open-source-shift-2-800.webp 800w,
            /static/img/posts/warp-open-source-shift/warp-open-source-shift-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/warp-open-source-shift/warp-open-source-shift-2.webp"
    alt="Warp 에이전트 기여 구조"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 그래서 지금 갈아타도 되나

### 오픈소스 전환만 보고 바로 올인하긴 이르다

솔직히 오늘 당장 "이제 Ghostty 버리고 Warp 간다"까지는 아니다. 오픈소스 전환은 시작점이지 완성판이 아니다. 라이선스 해석, 빌드 경험, 플랫폼별 버그, 커뮤니티 기여 흐름이 몇 주는 지나야 감이 올 거다. 특히 회사 장비에서 쓸 거면 보안팀과 법무팀이 어떤 표정을 짓는지 먼저 봐야 한다.

### 그래도 판은 진짜 흔들렸다

근데 한 가지는 분명하다. 폐쇄형이라서 Warp를 아예 후보에서 뺐던 사람들은 이제 다시 볼 이유가 생겼다. 더 중요한 건 다른 터미널이나 AI 개발도구 회사들도 비슷한 압박을 받게 된다는 점이다. 요즘은 기능 하나 더 넣는 것보다 어떤 운영 모델로 신뢰를 사는지가 더 중요하다. Warp가 그 판을 정면으로 건드렸다. 그래서 이 뉴스가 하루짜리 화제로 안 끝날 가능성이 높아 보인다.
