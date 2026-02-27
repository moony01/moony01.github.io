---
layout: post
title: "Claude Sonnet 4.6 직접 써봤더니 경악했다 — Opus 가격의 1/5로 같은 성능이 나온다고?"
date: 2026-02-18 10:00:00 +0900
categories: [ai]
tags: [claude, anthropic, sonnet, ai모델, 코딩AI]
image: claude-sonnet-46-opus-level-one-fifth-price-shock/claude-sonnet-46-opus-level-one-fifth-price-shock-1.png
published: true
---

"Sonnet이 Opus를 이겼다고?"

2월 17일, Anthropic이 Claude Sonnet 4.6을 공개했다. 원래 Sonnet은 "가성비 모델"이라는 포지션이었다. Opus가 플래그십이고, Sonnet은 그 아래. 당연히 성능도 한 단계 낮았다. 그런데 이번에 나온 Sonnet 4.6의 벤치마크를 보고 눈을 의심했다.

SWE-bench에서 79.6%. Opus 4.6이 80.8%다. **차이가 1.2%밖에 안 난다.** 컴퓨터 사용 능력은 72.5% vs 72.7%로 사실상 동일하다. 근데 가격은? Opus의 1/5이다. 이게 실화냐.

![Claude Sonnet 4.6 히어로 이미지](/static/img/posts/claude-sonnet-46-opus-level-one-fifth-price-shock/claude-sonnet-46-opus-level-one-fifth-price-shock-1.png){: .wd100}

{% include pre-version.html %}

## Opus 4.5를 이기는 Sonnet이라니 — 벤치마크의 충격

숫자를 보자. 냉정하게.

| 벤치마크 | Sonnet 4.6 | Opus 4.6 | 차이 |
|----------|:----------:|:--------:|:----:|
| SWE-bench Verified (코딩) | 79.6% | 80.8% | -1.2% |
| OSWorld-Verified (컴퓨터 사용) | 72.5% | 72.7% | -0.2% |
| ARC-AGI-2 (범용 지능) | 60.4% | - | - |
| 사용자 선호도 vs Opus 4.5 | 59% 승 | - | - |

마지막 줄을 다시 보자. **사용자가 직접 써보고 Sonnet 4.6을 Opus 4.5보다 더 선호했다.** 59% 대 41%로. 이건 단순히 벤치마크 점수가 아니라 실제 사용 경험에서의 평가다.

Anthropic의 발표를 그대로 인용하면 이렇다:

> "Performance that would have previously required reaching for an Opus-class model — including on real world, economically valuable office tasks — is now available with Sonnet 4.6."

번역하면 "예전에는 Opus를 써야 했던 작업을 이제 Sonnet 4.6으로 할 수 있다"는 뜻이다. 제조사가 직접 자기 플래그십을 까는 발표를 했다. 이게 얼마나 자신 있으면 이러겠는가.

## 가격은 그대로인데 성능만 폭등 — 개발자에게 무슨 의미인가

가격 비교를 해보자.

| 항목 | Sonnet 4.6 | Opus 4.6 | 차이 |
|------|:----------:|:--------:|:----:|
| 입력 (100만 토큰당) | $3 | $15 | **5배** |
| 출력 (100만 토큰당) | $15 | $75 | **5배** |
| 컨텍스트 윈도우 | 100만 토큰 | 100만 토큰 | 동일 |

동일한 100만 토큰 컨텍스트 윈도우에 성능은 거의 같은데 가격이 5배 차이. 이건 기업 입장에서 의사결정이 완전히 달라지는 수준이다.

개발자 일상에서 체감되는 변화를 정리하면:

**1. Claude Code에서의 코딩 경험이 달라진다**

Claude Code 사용자 중 70%가 이전 Sonnet 4.5보다 4.6을 선호했다. 코딩 어시스턴트로서의 일관성, 명령 이해도, 복잡한 리팩토링 능력이 확실히 올라갔다는 평가다.

**2. 에이전트 플래닝이 Opus급으로 올라왔다**

Sonnet 4.6의 가장 큰 업그레이드 중 하나가 에이전트 계획 능력이다. 복잡한 다단계 작업을 스스로 분해하고 순서를 정하는 능력. 이전에는 이게 Opus의 전유물이었다.

**3. 컴퓨터 사용 능력이 거의 5배 뛰었다**

OSWorld 벤치마크에서 2024년 10월 처음 출시 때 14.9%였던 점수가 72.5%로 올라갔다. 복잡한 스프레드시트 처리, 다중 브라우저 탭 전환, 웹 폼 작성 같은 실무 작업을 해낸다.

{% include pre-version.html %}

## GPT-5.2와의 은근한 대결 구도 — AI 가격 전쟁의 서막

Anthropic이 12일 만에 두 번째 모델을 쏟아낸 건 우연이 아니다. 2월 5일에 Opus 4.6을 내놓고, 12일 뒤에 Sonnet 4.6을 꺼냈다.

그 사이 무슨 일이 있었나? OpenAI의 GPT-5.2가 시장을 흔들고 있었다. Google도 Gemini 2.5를 밀고 있고, DeepSeek V4도 나왔다. AI 시장이 매주 전쟁터다.

![Claude Sonnet 4.6 성능 비교 다이어그램](/static/img/posts/claude-sonnet-46-opus-level-one-fifth-price-shock/claude-sonnet-46-opus-level-one-fifth-price-shock-2.png){: .wd100}

Anthropic의 전략은 명확하다. **"같은 성능, 더 싼 가격."** 이건 개발자를 붙잡는 가장 확실한 방법이다.

VentureBeat는 이번 발표를 이렇게 분석했다: "Sonnet 4.6은 플래그십 성능을 1/5 가격에 매칭시키며 기업 도입을 가속화할 것이다." 실제로 AWS Bedrock에서도 즉시 사용 가능하게 됐다.

개발자 입장에서 솔직히 따져보면, 이제 Opus를 쓸 이유가 많이 줄었다. 물론 추론의 깊이나 초장문 분석에서 Opus가 여전히 앞서는 부분이 있지만, 일상적인 코딩과 업무에서는 Sonnet 4.6이면 충분하다.

## 무료 사용자도 Sonnet 4.6이 기본 — 무료 티어의 반전

이번 업데이트에서 가장 눈에 띄는 변화 중 하나가 무료 티어다.

기존에 무료 사용자는 제한된 Sonnet 모델만 쓸 수 있었다. 그런데 이제 **Sonnet 4.6이 무료 사용자의 기본 모델**이 됐다. 파일 생성, 커넥터, 스킬, 압축 기능까지 포함이다.

이게 뭘 의미하냐면, 한 푼도 안 내고 Opus 4.5급 성능을 경험할 수 있다는 거다. Anthropic이 왜 이렇게까지 하냐고? 사용자 기반을 확보해야 하니까. ChatGPT에 밀리고 있는 시장 점유율을 뒤집으려면 일단 써보게 만들어야 한다.

프롬프트 인젝션 방어도 강화됐다. 컴퓨터 사용 중 악의적 웹사이트가 모델을 탈취하려는 공격에 대한 저항력이 Sonnet 4.5 대비 크게 개선됐다고 Anthropic은 밝혔다.

## 마치며 — 솔직한 결론

Claude Sonnet 4.6은 "가성비 모델"이라는 수식어가 어울리지 않게 됐다. 사실상 **Opus급 성능을 Sonnet 가격에 쓸 수 있는 모델**이다.

개발자로서 당장 실천할 것:

```
1. Claude Code 사용 중이면 → 모델을 Sonnet 4.6으로 전환
2. API 비용이 부담이었으면 → Sonnet 4.6으로 5배 절약 가능
3. 아직 Claude 안 써봤으면 → 무료 티어로 시작 가능
```

12일 만에 두 모델을 쏟아낸 Anthropic의 속도를 보면, 다음 모델이 언제 나와도 이상하지 않다. AI 시장의 경쟁이 결국 개발자에게는 좋은 소식이다. 더 좋은 모델을 더 싸게 쓸 수 있게 되니까.

다만 한 가지 찝찝한 건 있다. 이 속도로 모델이 나오면, 오늘 내가 선택한 모델이 다음 달에는 구형이 된다는 뜻이기도 하다. 모델에 올인하기보다는 **모델을 쉽게 교체할 수 있는 아키텍처**를 미리 갖추는 게 현명한 선택일 것이다.
