---
layout: post
title: "TikTok이 삼성과 AI 칩을 만든다 — 엔비디아 멘붕, 판이 뒤집어졌다"
description: "바이트댄스가 자체 AI 추론 칩 'SeedChip'을 개발하고 삼성전자와 제조 협상 중입니다. 2026년 10만 개, 최대 35만 개 생산 목표. 미국 제재를 우회하며 엔비디아 독점 구도를 흔드는 이 프로젝트의 실체를 파헤칩니다."
date: 2026-02-13 11:00:00 +0900
categories: [ai]
tags: [AI, ByteDance, Samsung, NVIDIA, SeedChip, AI칩, 반도체]
image: bytedance-seedchip-samsung-nvidia-ai-chip/bytedance-seedchip-samsung-nvidia-ai-chip-1.png
published: true
---

TikTok 모회사 바이트댄스가 자체 AI 칩을 만들고 있고, 그 제조 파트너가 **삼성전자**라는 사실이 밝혀졌습니다.

2월 11일, 로이터 통신이 독점 보도한 이 뉴스는 전 세계 반도체 업계를 발칵 뒤집어 놓았습니다. 중국 최대 테크 기업이 미국의 AI 칩 수출 규제를 정면으로 돌파하겠다는 선언이나 다름없기 때문입니다. 그리고 그 한가운데에 삼성이 서 있습니다.

칩의 코드명은 **SeedChip**. 3월 말까지 엔지니어링 샘플을 받고, 2026년 내 최소 10만 개, 최대 35만 개를 생산하겠다는 로드맵까지 구체적으로 잡혀 있습니다. 이건 구상 단계가 아닙니다. 이미 돌아가고 있는 프로젝트입니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/bytedance-seedchip-samsung-nvidia-ai-chip/bytedance-seedchip-samsung-nvidia-ai-chip-1-400.webp 400w,
            /static/img/posts/bytedance-seedchip-samsung-nvidia-ai-chip/bytedance-seedchip-samsung-nvidia-ai-chip-1-800.webp 800w,
            /static/img/posts/bytedance-seedchip-samsung-nvidia-ai-chip/bytedance-seedchip-samsung-nvidia-ai-chip-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/bytedance-seedchip-samsung-nvidia-ai-chip/bytedance-seedchip-samsung-nvidia-ai-chip-1.webp" 
    alt="바이트댄스 SeedChip과 삼성 파운드리 협업을 상징하는 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

왜 이게 개발자에게 중요한지, 엔비디아 독점 구도에 어떤 균열이 생기는지, 그리고 삼성이 이 판에서 무엇을 노리는지 하나씩 뜯어보겠습니다.
## SeedChip — 바이트댄스가 직접 만드는 AI 추론 칩의 정체

먼저 짚고 넘어갈 게 있습니다. SeedChip은 **학습(Training)용이 아니라 추론(Inference)용** 칩입니다.

AI 칩은 크게 두 종류로 나뉩니다. 모델을 훈련시키는 학습용과, 훈련된 모델을 실제로 돌리는 추론용. 학습에는 엔비디아 H100이나 B200 같은 고성능 GPU가 필요하지만, 추론은 다릅니다. 사용자 요청이 들어올 때마다 모델을 실행하는 것이기 때문에 **전력 효율**과 **비용**이 성능만큼이나 중요합니다.

바이트댄스가 추론 칩에 집중하는 이유는 명확합니다. TikTok의 추천 알고리즘, Doubao(중국판 AI 챗봇), 그리고 다양한 AI 서비스를 운영하려면 천문학적인 추론 비용이 듭니다. 바이트댄스의 AI 관련 조달 비용은 2024년 110억 달러에서 2025년에는 거의 두 배인 **200억 달러**까지 치솟았습니다. 매년 20조 원 넘게 GPU에 쏟아붓고 있는 겁니다.

자체 칩을 만들면 이 비용을 극적으로 줄일 수 있습니다. 구글이 TPU를, 아마존이 Trainium/Inferentia를 만든 것과 같은 논리입니다. 다만 바이트댄스에게는 비용 절감 말고도 한 가지 절박한 이유가 더 있습니다.




{% include pre-version.html %}

## 미국 제재를 뚫는 삼성 카드 — 왜 TSMC가 아닌가

여기서 이야기가 흥미로워집니다. AI 칩 제조의 절대 강자는 대만의 TSMC입니다. 애플, 엔비디아, AMD 모두 TSMC에서 칩을 찍어냅니다. 그런데 바이트댄스는 왜 삼성을 택했을까요?

답은 간단합니다. **TSMC를 쓸 수가 없습니다.**

미국 정부의 대중국 반도체 수출 규제로 인해 TSMC는 중국 기업을 위한 첨단 칩 제조를 사실상 중단했습니다. 바이트댄스가 아무리 돈이 많아도 TSMC 문을 두드릴 수 없는 상황인 겁니다.

삼성 파운드리는 다릅니다. 한국 기업인 삼성은 미국 제재의 직접적 대상은 아닙니다. 물론 미국의 눈치를 안 볼 수는 없지만, TSMC처럼 원천 차단당한 상태는 아닙니다. 게다가 삼성은 현재 파운드리 시장에서 TSMC에 크게 뒤처져 있어 **대형 고객이 절실한 상황**입니다.

바이트댄스 입장에서는 칩을 만들어줄 곳이 필요하고, 삼성 입장에서는 대형 주문이 필요합니다. 이해관계가 정확히 맞아떨어진 겁니다. 로이터에 따르면 삼성은 칩 제조뿐 아니라 **HBM(고대역폭 메모리) 공급**까지 협상 테이블에 올려놓았습니다. AI 칩에 필수적인 이 메모리는 현재 전 세계적으로 극심한 공급 부족 상태입니다.

결국 이건 단순한 B2B 거래가 아닙니다. **미중 반도체 전쟁의 새로운 우회로**가 열리고 있는 겁니다.
## 엔비디아 독점에 균열이 생기는 이유

"회사 하나가 추론 칩 만든다고 엔비디아가 흔들리겠어?"라고 생각할 수 있습니다. 숫자를 보면 생각이 달라집니다.

현재 AI 칩 시장에서 엔비디아의 점유율은 **80% 이상**입니다. GPU를 사려면 엔비디아밖에 선택지가 없다시피 한 상황이 수년간 계속됐습니다. 그런데 2025년부터 이 구도가 조금씩 흔들리고 있습니다.

```
2024년: 엔비디아 점유율 ~92%
       구글 TPU, 아마존 칩 → 자체 소비용

2025년: 엔비디아 점유율 ~85%로 하락
       브로드컴 커스텀 ASIC 급성장
       메타 MTIA 칩 투입

2026년 예상: 엔비디아 점유율 ~75-80%
       바이트댄스 SeedChip 가세
       마이크로소프트 Maia 2 양산
       각사 커스텀 칩 러시
```

바이트댄스의 SeedChip이 특별한 이유는 **규모** 때문입니다. 35만 개라는 생산 목표는 자체 소비만으로도 어마어마한 양입니다. 이 칩이 성공하면 바이트댄스는 엔비디아 GPU 수만 개를 대체할 수 있습니다. 그만큼 엔비디아의 매출이 빠지는 겁니다.

더 중요한 건 **시그널**입니다. 중국 최대 테크 기업이 자체 칩으로 돌아서면, 다른 중국 기업들도 따라갈 가능성이 높습니다. 알리바바, 텐센트, 바이두 모두 이미 자체 칩 개발을 진행 중입니다. 엔비디아 입장에서는 중국이라는 거대 시장이 통째로 빠져나가는 시나리오가 현실화되고 있는 겁니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/bytedance-seedchip-samsung-nvidia-ai-chip/bytedance-seedchip-samsung-nvidia-ai-chip-2-400.webp 400w,
            /static/img/posts/bytedance-seedchip-samsung-nvidia-ai-chip/bytedance-seedchip-samsung-nvidia-ai-chip-2-800.webp 800w,
            /static/img/posts/bytedance-seedchip-samsung-nvidia-ai-chip/bytedance-seedchip-samsung-nvidia-ai-chip-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/bytedance-seedchip-samsung-nvidia-ai-chip/bytedance-seedchip-samsung-nvidia-ai-chip-2.webp" 
    alt="AI 칩 시장 경쟁 구도 변화를 보여주는 다이어그램" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>




{% include pre-version.html %}

## 개발자가 주목해야 하는 진짜 이유 — 인프라 비용이 바뀐다

"나는 칩 안 만드니까 상관없잖아"라고요? 틀렸습니다.

AI 칩 시장의 경쟁이 심화되면 **GPU 가격이 내려갑니다**. 지금 H100 한 대 빌리는 데 시간당 2~3달러인 클라우드 비용이, 추론 전용 칩이 대량 보급되면 절반 이하로 떨어질 수 있습니다.

이미 변화는 시작됐습니다. 구글 Cloud TPU v6e의 추론 비용은 엔비디아 A100 대비 **40% 저렴**합니다. 아마존 Inferentia2는 특정 워크로드에서 **60%까지** 비용을 절감합니다.

```python
# 현재: 엔비디아 GPU 기반 추론 비용 예시
gpu_cost_per_hour = 2.50  # USD (H100)
daily_requests = 1_000_000
avg_inference_time = 0.05  # seconds

daily_gpu_hours = (daily_requests * avg_inference_time) / 3600
daily_cost = daily_gpu_hours * gpu_cost_per_hour
monthly_cost = daily_cost * 30
print(f"월간 추론 비용: ${monthly_cost:,.0f}")
# 결과: 월간 추론 비용: $1,042

# 커스텀 추론 칩 시대: 40-60% 비용 절감
custom_chip_cost = monthly_cost * 0.5
print(f"커스텀 칩 월간 비용: ${custom_chip_cost:,.0f}")
# 결과: 커스텀 칩 월간 비용: $521
```

바이트댄스의 SeedChip이 성공하면, 클라우드 업체들은 경쟁적으로 가격을 낮출 수밖에 없습니다. 이건 AI 서비스를 운영하는 모든 스타트업과 개발자에게 직접적인 호재입니다.

또 하나 주목할 점은 **추론 최적화 기술의 발전**입니다. 커스텀 칩이 늘어나면 ONNX Runtime, TensorRT 같은 추론 프레임워크의 중요성이 더 커집니다. 다양한 하드웨어에서 모델을 효율적으로 돌리는 기술이 곧 핵심 역량이 되는 시대가 오고 있습니다.

## 마치며 — 반도체 전쟁의 새 국면

정리하면 이렇습니다.

바이트댄스는 연간 200억 달러의 GPU 비용을 줄이고 미국 제재를 우회하기 위해 자체 칩 SeedChip을 만들고 있습니다. 삼성은 파운드리 사업의 기사회생을 위해 이 프로젝트에 뛰어들었습니다. 엔비디아는 중국 시장이라는 거대한 파이가 눈앞에서 사라지는 걸 지켜봐야 합니다.

물론 리스크도 있습니다. 바이트댄스는 "보도가 부정확하다"고 공식 부인했고, 미국 정부가 삼성에 압력을 넣을 가능성도 있습니다. 첫 칩의 성능이 기대에 못 미칠 수도 있습니다.

하지만 방향은 명확합니다. AI 칩 시장의 독점 구도는 끝나가고 있습니다. 구글, 아마존, 메타, 마이크로소프트에 이어 바이트댄스까지. 빅테크들은 하나둘 엔비디아에게서 독립하고 있습니다.

개발자 입장에서 이건 좋은 뉴스입니다. 경쟁이 심화되면 가격은 내려가고, 선택지는 늘어납니다. 지금 당장은 아니더라도, 2-3년 내에 AI 추론 비용은 지금의 절반 이하로 떨어질 가능성이 높습니다.

엔비디아의 젠슨 황이 "우리의 경쟁자는 GPU가 아니라 커스텀 칩"이라고 말한 적 있습니다. 그의 예언이 현실이 되고 있습니다. 삼성과 바이트댄스의 이 조합이 그 현실화의 가장 강력한 신호탄입니다.
