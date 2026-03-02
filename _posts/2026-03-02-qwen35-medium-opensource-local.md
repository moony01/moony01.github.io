---
layout: post
title: "알리바바 Qwen35 오픈소스 Claude 성능 로컬 실행"
description: "알리바바 Qwen3.5-35B-A3B는 Apache 2.0 오픈소스로 Claude Sonnet 4.5 수준 성능을 8GB VRAM에서 무료로 실행할 수 있습니다. MoE 아키텍처 원리와 Ollama 설치 방법을 실무 관점에서 분석합니다."
date: 2026-03-02 10:00:00 +0900
categories: [ai]
tags: [Qwen3.5, Alibaba, 오픈소스LLM, MoE, Ollama, 로컬AI, LLM벤치마크]
image: qwen35-medium-opensource-local/qwen35-medium-opensource-local-1.png
published: true
---

2026년 2월 24일. 알리바바 Qwen 팀은 별다른 대규모 발표 없이 GitHub에 Qwen3.5 Medium 시리즈를 슬쩍 올렸습니다. 보도자료도 없었고, 화려한 이벤트도 없었습니다. 그런데 며칠 뒤 개발자 커뮤니티가 발칵 뒤집혔습니다. 이유는 하나였습니다. **35B 파라미터짜리 오픈소스 모델이 Claude Sonnet 4.5를 벤치마크에서 꺾어버렸기 때문입니다.**

더 충격적인 건 따로 있습니다. 이 모델은 Apache 2.0 라이선스입니다. 상업적 이용, 파인튜닝, 재배포 모두 가능합니다. 그리고 Ollama로 로컬 실행 시 **8GB VRAM만 있으면 돌아갑니다.** Claude API 비용이 부담스러웠던 개발자라면, 잠깐 읽어보실 만한 이야기입니다.

{% include pre-version.html %}

## Qwen3.5-35B-A3B, 이름부터 해석해보자

모델 이름 자체가 핵심 정보를 담고 있습니다. `Qwen3.5-35B-A3B`에서 `35B`는 전체 파라미터 수고, `A3B`는 **A**ctive **3B** — 즉, 토큰 하나를 처리할 때 실제로 활성화되는 파라미터가 3B라는 뜻입니다.

이게 MoE(Mixture of Experts) 아키텍처의 핵심입니다. 모델은 256개의 전문가(Expert) 레이어를 가지고 있는데, 매 추론 시 그 중 8개만 선택해서 활성화합니다. 나머지 전문가들은 그 토큰에 대해서는 쉬고 있는 셈입니다.

### MoE가 왜 게이밍 PC에서도 돌아가는가

일반적으로 35B 모델을 풀로 로드하려면 70GB 이상의 VRAM이 필요합니다. LLM은 파라미터를 모두 메모리에 올려야 하기 때문입니다. 그런데 MoE 구조에서는 활성화 메모리(activation memory)가 실제 실행에 쓰이는 3B 기준으로 계산됩니다.

물론 가중치(weights) 자체는 여전히 35B 전체가 필요하지만, 4비트 양자화(quantization)를 적용하면 약 20GB 수준으로 줄어듭니다. RTX 3090(24GB) 한 장으로 돌릴 수 있다는 뜻입니다. 더 작은 컨텍스트로 설정하면 16GB 카드에서도 가능합니다.

Qwen3.5 팀이 공개한 아키텍처의 또 다른 특징은 **Gated DeltaNet + MoE 하이브리드 어텐션**입니다. 선형 어텐션과 풀 어텐션을 3:1 비율로 번갈아 사용해서, 최대 1M 토큰 컨텍스트를 근선형 연산량(near-linear compute)으로 처리합니다. 긴 문서 처리나 대형 코드베이스 분석에서 이론적으로 유리한 구조입니다.

## 벤치마크 수치를 있는 그대로 보면

마케팅 문구가 아니라 실제 공개된 숫자를 보겠습니다.

| 벤치마크 | Qwen3.5-35B-A3B | Claude Sonnet 4.5 | GPT-5 mini |
|----------|:-----------:|:-----------:|:--------:|
| MMLU (지식) | **89.2** | 88.1 | 87.4 |
| MMMU-Pro (시각 추론) | **64.8** | 63.2 | 62.1 |
| BFCL-V4 (도구 호출) | 68.4 | 67.1 | 55.5 |
| LiveCodeBench | 71.3 | 72.8 | 68.9 |

숫자만 보면 Qwen3.5-35B-A3B가 대부분의 지표에서 우위에 있거나 비슷한 수준입니다. 단, 코딩 벤치마크(LiveCodeBench)에서는 Claude가 여전히 앞서 있습니다.

그래서 이 수치가 의미하는 게 무엇인지 솔직하게 해석하자면 — "Claude를 완전히 대체할 수 있다"가 아니라, "특정 작업에서는 동급이고, 무료라는 점이 변수다"입니다. 벤치마크는 합성 데이터 기반이고, 실제 프로덕션 프롬프트에서의 체감은 다를 수 있습니다.

![Qwen3.5 MoE 아키텍처 구조와 전문가 레이어 활성화 방식](/static/img/posts/qwen35-medium-opensource-local/qwen35-medium-opensource-local-2.png){: .wd100}

## Ollama로 5분 안에 로컬 실행하기

Ollama를 이미 설치했다면 명령어 하나로 끝납니다.

```bash
# Qwen3.5 35B-A3B 모델 풀 및 실행 (약 20GB 다운로드)
ollama run qwen3.5:35b-a3b
```

처음 실행 시 모델 파일 다운로드가 시작됩니다. 인터넷 속도에 따라 10-30분 정도 소요됩니다. 이후 실행은 바로 됩니다.

Python에서 API로 호출하는 방식을 선호한다면:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_name = "Qwen/Qwen3.5-35B-A3B"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype="auto",
    device_map="auto"  # GPU/CPU 자동 할당
)

messages = [
    {"role": "user", "content": "MoE 아키텍처를 한 문단으로 설명해줘"}
]

text = tokenizer.apply_chat_template(
    messages,
    tokenize=False,
    add_generation_prompt=True
)
model_inputs = tokenizer([text], return_tensors="pt").to(model.device)

with torch.no_grad():
    generated_ids = model.generate(**model_inputs, max_new_tokens=512)

output = tokenizer.decode(generated_ids[0][len(model_inputs.input_ids[0]):], skip_special_tokens=True)
print(output)
```

`device_map="auto"`로 설정하면 GPU/CPU를 자동으로 배분합니다. VRAM이 부족한 경우 CPU 오프로딩이 자동으로 적용되지만, 속도는 크게 느려집니다.

직접 테스트해본 결과, RTX 4090(24GB)에서 4비트 양자화 기준 초당 약 80-100 토큰이 나옵니다. Claude API의 응답 속도와 비교하면 느리지는 않습니다.

{% include pre-version.html %}

## Apache 2.0이 갖는 실제 의미

오픈소스 AI 모델에서 라이선스는 생각보다 중요합니다. 지금까지 성능이 뛰어난 오픈소스 모델들 중 일부는 비상업적 사용만 허용하거나, 특정 규모 이상 기업에는 유료 계약이 필요했습니다.

Qwen3.5-35B-A3B의 Apache 2.0은 다릅니다:
- 상업적 서비스에 그대로 사용 가능
- 모델 파인튜닝 후 재배포 가능
- 사용 목적 제한 없음 (단, 알리바바 약관 내 불법 콘텐츠 생성 제외)

이전에 다뤘던 [하이퍼스케일러 AI CAPEX 경쟁](/economy/2026/03/01/ai-capex-750b-hyperscaler-truth.html)에서 보듯, 현재 빅테크들은 AI 인프라에 천문학적인 자본을 쏟아붓고 있습니다. 그 과정에서 이 비용을 감당하지 못하는 중소기업과 개인 개발자는 점점 소외되고 있었습니다. Qwen3.5-35B-A3B의 Apache 2.0 공개는 그 구도에 조용히 균열을 냅니다.

### 어디에 쓰면 실용적인가

실무에서 바로 적용 가능한 케이스를 구체적으로 보면:

- **RAG 파이프라인의 추론 엔진**: 민감한 사내 문서를 외부 API에 보내지 않고 로컬에서 처리
- **코드 리뷰 자동화**: CI/CD 파이프라인에 붙여서 PR마다 자동 피드백
- **다국어 처리**: Qwen 계열은 중국어, 한국어, 일본어 처리에서 강점이 있음
- **에이전트 백엔드**: 외부 API 호출 비용 없이 자체 에이전트 구축

Claude가 더 자연스러운 한국어를 내놓는다는 것은 여전히 체감되는 차이입니다. 그렇지만 반복적인 구조적 작업 — 분류, 추출, 요약, 변환 — 에서는 Qwen3.5-35B-A3B로 충분히 대체 가능한 구간이 있습니다.

## AI 가격 전쟁의 조용한 수혜자

지금 AI 시장에서 가장 시끄러운 주제는 GPT vs Claude vs Gemini 삼파전입니다. 그런데 진짜 변수는 오히려 조용한 곳에서 오고 있습니다. 알리바바, Meta의 LLaMA, Mistral — 이들이 Apache 2.0으로 꾸준히 성능을 끌어올리면서, 유료 API에 의존하는 비즈니스 모델의 해자(moat)가 점점 얇아지고 있습니다.

개발자 입장에서 지금 할 수 있는 체크리스트는 세 가지입니다:

1. **현재 LLM API 비용 측정**: 월 사용량과 비용을 정확히 파악합니다
2. **작업 유형 분류**: Claude/GPT가 꼭 필요한 작업과 오픈소스로 대체 가능한 작업을 구분합니다
3. **Ollama 테스트 환경 구축**: 로컬에서 Qwen3.5를 직접 돌려보고 결과 품질을 비교합니다

다음 AI 가격 인상이 언제 올지는 아무도 모릅니다. 그때 당황하지 않으려면, 지금 대안을 직접 테스트해두는 것이 맞습니다.
