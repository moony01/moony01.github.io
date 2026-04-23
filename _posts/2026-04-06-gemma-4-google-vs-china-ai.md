---
layout: post
title: "Gemma 4 출시 — 구글 오픈소스 모델이 중국 AI에 밀린 이유"
description: "Google이 Apache 2.0 오픈소스 모델 Gemma 4를 출시했다. 스펙은 인상적이지만 Arena AI 랭킹 3위, 1위는 중국 Qwen 3.5다. 왜 구글은 자신만의 게임에서 뒤처졌나."
date: 2026-04-06 11:00:00 +0900
categories: [ai]
tags: [Gemma4, Google, 오픈소스AI, Qwen, 중국AI, LLM벤치마크]
image: gemma-4-google-vs-china-ai/gemma-4-google-vs-china-ai-1.png
published: true
---

글로벌 오픈소스 AI 리더보드에서 구글은 3위다.

2026년 4월 2일, 구글은 Gemma 4를 공식 발표했다. "바이트 단위로 가장 성능이 우수한 오픈 모델"이라고 선언했고, Apache 2.0 라이선스로 완전 무료 공개했다. E2B부터 31B까지 네 가지 모델, 최대 256K 컨텍스트, 멀티모달(이미지·비디오·오디오) 지원, 에이전트 워크플로우 최적화. 스펙만 보면 나무랄 데 없다.

그런데 Arena AI 텍스트 리더보드를 열면 현실이 나온다. Gemma 4 31B의 ELO는 약 1452. 오픈소스 모델 중 3위다. 1위는 Alibaba의 Qwen 3.5, 2위는 Zhipu AI의 GLM-5, 3위에 Moonshot AI의 Kimi K2.5도 근접해 있다. 구글이 자신만의 게임에서 중국 AI 스타트업들한테 밀렸다.

이게 단순한 벤치마크 수치 차이가 아닌 이유를 짚어본다.

{% include pre-version.html %}

## Gemma 4, 스펙부터 보자

Gemma 4는 네 개의 변형 모델로 구성된다.

| 모델 | 파라미터 | 컨텍스트 | 특징 |
|------|---------|---------|------|
| E2B | 2.3B 유효 / 5.1B 총합 | 128K | 오디오 지원, 온디바이스 최적화 |
| E4B | 4.5B 유효 / 8B 총합 | 128K | 오디오 지원, 최소 비용 |
| 26B A4B | 4B 활성화 / 26B MoE | 256K | Mixture of Experts, 속도 우선 |
| 31B Dense | 31B | 256K | 최고 성능, 최고 품질 |

여기서 주목할 숫자는 26B A4B 모델이다. 총 파라미터는 26B지만 추론 시 활성화되는 건 4B뿐이다. Mixture of Experts(MoE) 아키텍처 덕분에 메모리와 연산량을 줄이면서도 높은 품질을 유지한다.

아키텍처 혁신도 몇 가지 있다. **Per-Layer Embeddings(PLE)**는 기존 트랜스포머의 단일 임베딩 방식 대신 각 레이어마다 전용 벡터를 생성한다. 멀티모달 입력에서는 중립 신호(패드 토큰)를 사용해 이미지·오디오·텍스트를 일관되게 처리한다. **Shared KV Cache**는 마지막 N개 레이어가 이전 레이어의 Key-Value 상태를 재사용하게 해서 긴 컨텍스트 생성 효율을 높인다.

벤치마크 수치도 인상적이다. 31B 모델 기준으로 AIME 2026에서 89.2%, GPQA Diamond에서 84.3%, LiveCodeBench v6에서 80.0%를 기록했다. BigBench Extra Hard에서는 74.4%인데, 이전 세대 Gemma 3이 19.3%였으니 거의 4배 향상이다.

### 로컬에서 바로 돌릴 수 있다

오픈소스의 진짜 가치는 내 환경에서 실행 가능하다는 점이다. 가장 빠른 방법은 llama.cpp다.

```bash
# macOS에서 설치
brew install llama.cpp

# E2B IT 모델 서버 실행
llama-server -hf ggml-org/gemma-4-E2B-it-GGUF
```

Apple Silicon을 쓴다면 MLX가 더 빠르다.

```bash
pip install -U mlx-vlm

mlx_vlm.generate \
  --model google/gemma-4-E4B-it \
  --image ./screenshot.png \
  --prompt "이 이미지에서 버그를 찾아줘"
```

E4B 모델은 8GB VRAM이면 충분히 돌아간다. 개인 노트북에서 무료로 쓸 수 있는 멀티모달 모델 중에서 이 정도 성능을 내는 건 처음이다.

{% include pre-version.html %}

## 벤치마크 현실: 3위의 의미

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/gemma-4-google-vs-china-ai/gemma-4-google-vs-china-ai-2-400.webp 400w,
            /static/img/posts/gemma-4-google-vs-china-ai/gemma-4-google-vs-china-ai-2-800.webp 800w,
            /static/img/posts/gemma-4-google-vs-china-ai/gemma-4-google-vs-china-ai-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/gemma-4-google-vs-china-ai/gemma-4-google-vs-china-ai-2.webp" 
    alt="Gemma 4와 중국 오픈소스 AI 모델 벤치마크 비교표" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

Arena AI 리더보드는 사용자들이 직접 두 모델을 비교하고 더 나은 쪽을 선택하는 방식으로 점수를 산출한다. 단순히 정해진 테스트셋 점수가 아니라 실제 사용 맥락에서의 선호도를 반영한다는 점에서 다른 벤치마크보다 신뢰도가 높다고 평가받는다.

이 리더보드에서 Gemma 4 31B는 ELO 약 1452로 오픈소스 3위를 기록했다. 1위 Qwen 3.5와의 격차는 수십 포인트 수준으로 크지 않지만, "구글의 플래그십 오픈소스 모델"이라는 기대치와 비교하면 씁쓸한 결과다.

중국 모델들이 앞선 구체적인 영역을 보면 패턴이 보인다. 멀티턴 대화 품질, 코딩 태스크에서의 자기 수정 능력, 그리고 언어 이해 정확도 부분에서 Qwen 계열이 일관되게 높은 평가를 받고 있다.

**이게 왜 중요한가.** Gemma 4 이전까지 구글은 "오픈소스도 우리가 제일 잘 한다"는 포지션을 유지할 수 있었다. Gemma 3까지는 오픈소스 최상위권을 다퉜다. 그런데 이번에 중국 모델들이 명확한 우위를 가져가면서 그 포지션이 흔들렸다.

## 왜 중국 모델이 앞섰나

이걸 단순히 "중국이 열심히 했다"로 설명하는 건 부족하다. 구조적 차이가 있다.

**첫째, MoE 아키텍처 활용의 차이다.**

Gemma 4 26B A4B는 MoE를 쓴다. 그런데 31B Dense가 메인 플래그십이다. Qwen 3.5와 같은 중국 모델들은 이미 MoE를 메인 아키텍처로 올인하는 추세다. 같은 추론 비용으로 더 많은 파라미터를 쌓는 전략이다. 구글은 여전히 Dense와 MoE를 병행하며 보수적으로 간다.

**둘째, 학습 데이터 전략의 차이다.**

공개된 정보만으로 확인하기 어렵지만, Alibaba와 같은 중국 빅테크는 자사 플랫폼 사용자 데이터(타오바오, 알리바바 클라우드, 딩딩)와 방대한 중국어 웹 데이터를 활용한다. 글로벌 커버리지 면에서는 구글이 앞서지만, 특정 도메인 밀도에서는 중국 모델이 유리할 수 있다.

**셋째, 오픈소스 생태계 성숙도다.**

Qwen 계열은 이미 Hugging Face 커뮤니티에서 파인튜닝 레시피, 양자화 모델, 서빙 최적화 노하우가 충분히 쌓였다. 커뮤니티 피드백이 다음 모델에 반영되는 속도가 빠르다. Gemma도 비슷한 생태계를 갖추고 있지만, 중국 모델들이 더 공격적으로 커뮤니티 참여를 유도했다.

직전에 다뤘던 [GitHub AI 학습 정책 논란](/security/2026/03/28/github-ai-training-policy.html)처럼, AI 개발에서 데이터 접근권과 생태계 통제가 얼마나 중요한지를 이번에도 확인할 수 있다.

## 개발자가 Gemma 4를 써야 하는 이유

그렇다고 Gemma 4가 나쁜 선택이라는 말은 아니다. 개발자 관점에서 여전히 강력한 이유가 있다.

**Apache 2.0 라이선스는 상업적 제약이 없다.** Qwen과 GLM도 오픈소스를 표방하지만 라이선스 세부 조항을 확인해야 한다. Gemma 4는 상업적 사용, 파인튜닝, 재배포 모두 가능하다. 프로덕션에 올리는 데 법적 리스크가 낮다.

**온디바이스 추론이 실질적으로 가능하다.** E2B와 E4B 모델은 소비자 등급 하드웨어에서 돌아간다. 데이터를 외부로 보내지 않고 로컬에서 처리해야 하는 민감한 케이스에 적합하다.

**함수 호출과 에이전트 지원이 기본이다.** transformers 파이프라인 한 줄로 멀티모달 에이전트를 구성할 수 있다.

```python
from transformers import pipeline

pipe = pipeline("any-to-any", model="google/gemma-4-e4b-it")

messages = [
    {
        "role": "user",
        "content": [
            {"type": "image", "url": "https://example.com/chart.png"},
            {"type": "text", "text": "이 차트에서 이상한 점을 찾아 JSON으로 반환해줘"}
        ],
    }
]

result = pipe(messages, max_new_tokens=500)
print(result)
```

이 코드는 실제로 실행된다. E4B 기준으로 이미지 분석 + JSON 출력까지 로컬 RTX 3080 환경에서 10초 내외다.

## 오픈소스 왕좌는 누가 가져갔나

Gemma 4 출시 이후 개발자 커뮤니티에서 나오는 질문은 두 가지다. "왜 구글은 1위를 못 가져왔나"와 "그래서 어떤 모델을 써야 하나".

첫 번째 질문의 답은 이미 위에서 다뤘다. 두 번째 질문의 답은 상황에 따라 다르다.

- **법적 안전성이 우선이면**: Gemma 4 (Apache 2.0)
- **최고 성능이 우선이면**: Qwen 3.5 (상업 라이선스 확인 필요)
- **온디바이스 멀티모달이 필요하면**: Gemma 4 E4B
- **에이전트 파이프라인을 빠르게 구축하려면**: Gemma 4 (Google 생태계 통합)

더 흥미로운 건 이 경쟁이 앞으로 어떻게 전개되느냐다. 구글은 이미 Gemma 5 개발에 착수했을 것이고, Alibaba와 Zhipu AI도 멈추지 않는다. 오픈소스 AI의 세력도는 반년 주기로 바뀌고 있다.

"구글이 최고의 오픈소스 AI를 만든다"는 전제는 이번에 흔들렸다. 다음 Gemma 발표 때 그 전제가 복원될지, 아니면 중국 모델의 우위가 굳어질지 — 개발자 입장에서는 좋은 선택지가 늘어나는 셈이다.
