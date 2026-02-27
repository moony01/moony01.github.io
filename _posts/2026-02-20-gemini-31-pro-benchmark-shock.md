---
layout: post
title: "Gemini 3.1 Pro 추론 성능에 경악 — 벤치마크 13관왕 달성 실화"
date: 2026-02-20 11:00:00 +0900
categories: [ai]
tags: [gemini, google, ai, 벤치마크, 추론]
image: gemini-31-pro-benchmark-shock/gemini-31-pro-benchmark-shock-1.png
published: true
---

"구글이 또 모델 냈대."

이 말을 들었을 때 솔직히 큰 기대는 없었다. Gemini 3 Pro가 나왔을 때도 "오, 괜찮네?" 정도였지 Claude나 GPT를 위협할 수준은 아니었으니까. 근데 이번엔 좀 다르다. **Gemini 3.1 Pro**가 어제(2월 19일) 공개됐는데, 벤치마크 결과를 보고 진짜 경악했다.

16개 주요 벤치마크 중 **13개에서 1위**. Claude Opus 4.6도, GPT-5.2도 동시에 눌렸다. 이게 실화냐고? 숫자로 보여주겠다.

![Gemini 3.1 Pro 벤치마크](/static/img/posts/gemini-31-pro-benchmark-shock/gemini-31-pro-benchmark-shock-1.png){: .wd100}

{% include pre-version.html %}

## ARC-AGI-2 77.1% — 추론 능력이 2배 이상 뛰었다

AI 모델의 **진짜 지능**을 측정하는 벤치마크가 있다. ARC-AGI-2. 단순 암기나 패턴 매칭이 아니라, 처음 보는 문제를 논리적으로 풀어야 하는 테스트다. 여기서 Gemini 3.1 Pro가 **77.1%**를 찍었다.

비교해보면 충격의 크기가 체감된다:

| 모델 | ARC-AGI-2 |
|------|:---------:|
| **Gemini 3.1 Pro** | **77.1%** |
| Claude Opus 4.6 | 68.8% |
| GPT-5.2 | 52.9% |
| Gemini 3 Pro (이전) | ~35% |

이전 버전 대비 **2배 이상** 뛰었다. GPT-5.2와는 격차가 24%p. Claude Opus 4.6도 8%p 차이로 눌렸다. 특히 GPT-5.2가 52.9%에 머문 게 인상적인데, OpenAI가 추론 쪽에서 밀리기 시작한 건 이번이 처음이다.

참고로 Google의 Deep Think 모델은 같은 벤치마크에서 **84.6%**를 기록 중이다. Gemini 3.1 Pro는 그 Deep Think 기술을 일반 모델에 녹여낸 버전이라고 보면 된다. VentureBeat는 이걸 **"Deep Think Mini"**라고 표현했다.

## 벤치마크 13관왕 — 숫자가 말해주는 것들

ARC-AGI-2만 잘하면 뭐하나. 다른 벤치마크에서도 전부 압도해야 진짜다. 그래서 전체 성적표를 펼쳐봤다.

| 벤치마크 | Gemini 3.1 Pro | Claude Opus 4.6 | GPT-5.2 |
|----------|:--------------:|:---------------:|:-------:|
| **GPQA Diamond** (전문 지식) | **94.3%** | 91.3% | 92.4% |
| **ARC-AGI-2** (추론) | **77.1%** | 68.8% | 52.9% |
| **SWE-Bench Verified** (코딩) | **80.6%** | - | - |
| **APEX-Agents** (에이전트) | **33.5%** | 29.8% | 23.0% |
| **BrowseComp** (브라우징) | **85.9%** | - | - |
| **MCP Atlas** | **69.2%** | - | - |
| **Terminal-Bench 2.0** | **68.5%** | - | - |
| **MRCR v2** (장문맥 128k) | 84.9% | **84.9%** (동률) | - |

GPQA Diamond은 전문가 수준의 과학 지식 테스트인데 **94.3%**. APEX-Agents는 장기적 전문 업무 수행 능력 테스트인데 여기서 **33.5%**를 찍으며 Gemini 3 Pro의 18.4% 대비 거의 2배 성장했다. GPT-5.2(23.0%)와 Claude Opus 4.6(29.8%)도 제쳤다.

SWE-Bench Verified에서 **80.6%**는 특히 개발자들이 주목할 만하다. 실제 GitHub 이슈를 코드로 해결하는 테스트니까.

{% include pre-version.html %}

## 그래도 Claude가 이기는 영역이 있다

구글이 떠들어대는 13관왕에 눈이 가겠지만, 냉정하게 봐야 한다. **Claude가 여전히 앞서는 영역**이 존재한다.

**Humanity's Last Exam** (도구 활용 카테고리):
- Claude Opus 4.6: **53.1%**
- Gemini 3.1 Pro: 51.4%

**GDPval-AA Elo** (전문가 실무 평가):
- Claude Sonnet 4.6 Thinking Max: **1633**
- Gemini 3.1 Pro: 1317

차이가 크다. 특히 GDPval-AA에서 300점 이상 벌어진 건 유의미하다. 실제 전문가급 작업에서는 Claude의 사고 체인이 아직 더 정교하다는 뜻이다. MRCR v2 장문맥 테스트에서도 Claude Sonnet 4.6 Thinking Max와 84.9%로 동률이니, 긴 컨텍스트 처리 능력은 호각이다.

결국 **"추론 벤치마크는 Gemini, 실전 전문 작업은 Claude"**라는 구도가 만들어지고 있다. 어떤 모델이 "최고"인지는 뭘 하느냐에 달렸다.

## 가격은 그대로, 스펙은 2배 — 가성비 괴물

놀라운 건 가격이 **Gemini 3 Pro와 동일**하다는 거다.

```
입력: $2 / 1M 토큰 (200K 이하)
출력: $12 / 1M 토큰 (200K 이하)
입력: $4 / 1M 토큰 (200K~1M)
출력: $18 / 1M 토큰 (200K~1M)
```

컨텍스트 윈도우 **100만 토큰**, 최대 출력 **64,000 토큰**. Simon Willison은 이걸 두고 **"Claude Opus 4.6의 절반도 안 되는 가격에 비슷한 벤치마크"**라고 평가했다. 기업 입장에서 이건 무시할 수 없는 가성비다.

API 모델 ID는 `gemini-3.1-pro-preview`와 `gemini-3.1-pro-preview-customtools` 두 가지가 있다. 후자는 도구 호출 성능이 더 최적화된 버전이라고 한다.

![Gemini 3.1 Pro 가성비](/static/img/posts/gemini-31-pro-benchmark-shock/gemini-31-pro-benchmark-shock-2.png){: .wd100}

## SVG 애니메이션 생성 — 은근 킬러 피쳐

벤치마크 얘기에 묻혔는데, 은근 인상적인 기능이 하나 있다. **텍스트 프롬프트로 애니메이션 SVG 생성**. 웹사이트에 바로 적용 가능한 수준의 인터랙티브 SVG를 뱉어낸다.

구글 공식 블로그에서 시연한 것 중에는:
- 코드 기반 SVG 애니메이션 (CSS/JS 포함)
- 실시간 핸드트래킹 연동 3D 시뮬레이션
- 복잡한 시스템을 직관적 대시보드로 변환

Simon Willison이 직접 테스트해봤는데, 해부학적으로 정확한 SVG까지 생성했다고 한다. 프론트엔드 개발자라면 이 기능만으로도 써볼 가치가 있다.

## 런칭 당일 서버 터짐 — 현실은 녹록지 않다

다만 현실적인 문제도 있다. 런칭 당일 서버가 **대차참사** 수준이었다. Simon Willison의 테스트에 따르면:

- "hi" 한마디에 **104초** 응답 대기
- "This model is currently experiencing high demand" 에러 빈발
- "Deadline expired before operation could complete" 타임아웃

첫날 치고는 심각한 수준이었고, 구글 측에서도 "런칭일 초기 문제"로 인정했다. 실서비스에 바로 투입하기엔 안정성 검증이 필요해 보인다.

## 마치며 — AI 추론 전쟁, 본격 3파전 돌입

정리하면 이렇다:

1. **Gemini 3.1 Pro는 진짜 강하다.** 벤치마크 13관왕은 허풍이 아니다.
2. **Claude가 여전히 강한 영역이 있다.** 전문가 실무, 도구 활용에서는 Claude가 앞선다.
3. **가격 대비 성능은 Gemini이 압도적이다.** Claude Opus의 절반 이하 가격에 비슷한 성능.
4. **안정성은 아직 미지수.** 런칭 당일 서버 문제는 우려스럽다.

OpenAI, Anthropic, Google — 이 세 회사의 추론 전쟁이 본격적으로 3파전에 돌입했다. 3개월 전만 해도 "구글은 한 발 늦다"는 평가가 지배적이었는데, 이번 3.1 Pro로 완전히 판을 뒤집었다.

개발자 입장에서 가장 현실적인 조언은 이거다: **하나의 모델에 올인하지 마라.** 추론이 중요하면 Gemini, 정교한 작업이면 Claude, 범용이면 GPT — 용도에 맞게 골라 쓰는 멀티모델 전략이 답이다.

Gemini 3.1 Pro는 [Google AI Studio](https://aistudio.google.com), Vertex AI, Gemini CLI, Android Studio에서 지금 바로 사용할 수 있다.
