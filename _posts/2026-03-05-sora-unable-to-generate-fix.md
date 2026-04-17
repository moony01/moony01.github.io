---
layout: post
title: "Sora Unable to Generate 오류 원인과 해결 방법"
description: "Sora 영상 생성 시 'Hmmm something didn't look right' 오류가 반복되는 7가지 원인과 각각의 실용적인 해결 방법을 정리했습니다."
date: 2026-03-05 12:00:00 +0900
categories: [ai]
tags: [Sora, OpenAI, 영상생성오류, AITools]
image: sora-unable-to-generate-fix/sora-unable-to-generate-fix-1.png
published: true
---

Sora로 영상을 만들려는데 갑자기 이런 메시지가 뜬다.

> _"Unable to generate — Hmmm something didn't look right with your request."_

프롬프트를 바꿔봐도, 새로고침을 해봐도 똑같은 화면. Plus나 Pro 구독자도 예외가 없다. 원인은 하나가 아니다. 이 오류가 뜨는 경우는 최소 일곱 가지 시나리오가 있고, 시나리오마다 해결 방법이 다르다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-1-400.webp 400w,
            /static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-1-800.webp 800w,
            /static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-1-400.png 400w,
            /static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-1-800.png 800w,
            /static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-1.png" 
    alt="Sora 영상 생성 실패 오류 화면과 원인별 해결 흐름도" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 원인 1: 콘텐츠 필터(Sentinel) 차단

"Hmmm something didn't look right"는 **Sentinel**이라는 OpenAI의 사전 심사 시스템이 프롬프트를 차단했을 때 표시되는 전형적인 메시지다. 명백히 문제 없어 보이는 요청도 걸린다. 특정 키워드나 단어 조합이 자동으로 플래그되기 때문이다.

### 해결: 프롬프트 단어 교체

직접적인 표현 대신 예술적, 묘사적 표현으로 바꾸면 통과되는 경우가 많다.

| 차단되는 표현 | 통과되는 표현 |
|--------------|-------------|
| `A person fighting` | `Two characters performing martial arts choreography` |
| `explosion in the city` | `Dramatic fireworks display over a cityscape at night` |
| `Elon Musk walking` | `A businessman in a dark suit walking confidently` |

실제로 공인 이름을 넣거나 폭력·갈등 상황을 연상시키는 단어가 포함되면 내용과 무관하게 차단된다. 단어를 추상화하는 것만으로 해결되는 경우가 가장 많다.

## 원인 2: 월간 크레딧 소진

Sora는 구독 플랜별로 월간 크레딧이 정해져 있다. 크레딧이 0이 되면 에러 메시지 없이 버튼이 비활성화되거나 "Unable to Generate"가 반복된다.

| 플랜 | 월 크레딧 | 480p 5초 기준 |
|------|----------|-------------|
| ChatGPT Plus ($20/월) | 1,000 크레딧 | 약 50개 |
| ChatGPT Pro ($200/월) | 10,000 크레딧 | 약 500개 |

크레딧은 매월 초 리셋되며 이월되지 않는다. 설정 화면에서 잔여 크레딧을 확인해보는 것이 먼저다. 남은 크레딧이 없다면 다음 달 리셋을 기다리거나 Pro로 업그레이드하는 것 외에 방법이 없다.

{% include pre-version.html %}

## 원인 3: 일일 롤링 제한

월간 크레딧이 충분해도 하루에 집중적으로 생성하면 막힌다. Sora는 **하루 약 30 크레딧**의 롤링 제한을 두고 있다. 오전에 잘 되다가 오후부터 갑자기 실패하는 패턴이 여기에 해당한다.

### 해결

몇 시간 후에 자동으로 풀린다. 생성 작업을 하루 전체에 분산시키는 습관이 효과적이다. 급하게 많이 생성해야 한다면 API 호출 방식으로 전환하면 이 제한을 피할 수 있다.

## 원인 4: IP 주소 위험 제어

에러 메시지에 "We're under heavy load"가 포함된 경우, 서버 과부하처럼 보이지만 실제로는 **IP가 플래그**된 상황일 수 있다. VPN 공유 노드, 데이터센터 IP, 짧은 시간 내 다량 요청 IP가 주로 해당된다.

### 해결

- 모바일 데이터나 다른 Wi-Fi로 네트워크 전환 후 재시도
- 개인 IP(가정용 IP)로 접속하면 대부분 해결됨
- OpenAI API를 직접 호출하면 클라이언트 IP 제한을 우회할 수 있다

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-2-400.webp 400w,
            /static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-2-800.webp 800w,
            /static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-2-400.png 400w,
            /static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-2-800.png 800w,
            /static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/sora-unable-to-generate-fix/sora-unable-to-generate-fix-2.png" 
    alt="Sora 오류 유형별 진단 플로우 — IP 차단, 크레딧 소진, 콘텐츠 필터 분기점" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 원인 5: 지역 제한

한국은 Sora 서비스 가능 국가에 포함되어 있다. 하지만 VPN을 켜두거나 프록시를 사용 중이라면 오히려 지원 국가 외 IP로 인식되어 차단될 수 있다. "not available in your country" 메시지가 나온다면 이 경우다.

반대로 VPN을 끄면 해결되는 경우도 있고, 켜야 해결되는 경우도 있다. 현재 내 IP가 어느 지역으로 인식되는지 확인하는 것이 우선이다.

```
# 현재 IP 지역 확인
curl https://ipapi.co/json/ | grep country_name
```

## 원인 6: 서버 과부하 (진짜)

앞서 설명한 IP 플래그와 달리, 실제로 서버가 과부하 상태인 경우도 있다. 여러 사용자가 동시에 같은 에러를 보고한다면 이 케이스다. OpenAI 상태 페이지(status.openai.com)에서 Sora 서비스 상태를 확인하면 된다.

미국 동부 기준 오전 9시~오후 3시가 피크 타임이다. 한국 시간 기준으로는 자정~새벽 6시 사이가 가장 서버 부하가 낮다. 이 시간대에 시도하면 성공률이 높다.

## 원인 7: 영상 처리 99% 멈춤

생성 요청까지는 됐는데 진행 바가 99%에서 수 시간째 멈춰 있다면, 이는 처리 서버에서 렌더링이 실패한 상태다. 이 경우 같은 프롬프트로 새로 요청하면 된다. 반복된다면 해상도(720p → 480p)를 낮추는 것이 효과적이다.

## 어떤 에러인지 먼저 판단하라

오류가 떴을 때 무작정 프롬프트를 바꾸기 전에, 다음 순서로 진단하면 빠르다.

1. **상태 페이지 확인** → status.openai.com에서 Sora 장애 여부
2. **크레딧 잔량 확인** → 설정 > Usage에서 잔여 크레딧
3. **프롬프트 검토** → 인명, 폭력, 갈등 키워드 포함 여부
4. **네트워크 전환** → VPN on/off, 다른 Wi-Fi 시도
5. **시간대 조정** → 피크 시간 회피 (한국 기준 자정~새벽)

AI 영상 생성 도구의 에러는 대부분 서버 문제가 아니라 정책적 제한이다. OpenAI가 Sora에 걸어둔 여러 겹의 필터와 제한을 이해하면 같은 자원으로 더 많은 생성이 가능하다. 이 중 원인 1(프롬프트 수정)로 해결되는 케이스가 압도적으로 많다는 점도 기억해두자.

이전에 다뤘던 [Sora를 포함한 AI 도구들의 가격 경쟁 구도](/ai/2026/03/04/minimax-m25-claude-price-war.html)도 함께 읽어보면 왜 OpenAI가 이런 제한을 두는지 맥락을 이해하는 데 도움이 된다.
