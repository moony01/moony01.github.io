---
layout: post
title: "스페인 축구 차단이 Docker pull을 멈춘 날"
description: "스페인 LaLiga 차단이 왜 Docker pull과 CI 파이프라인까지 흔들었는지 Cloudflare 공유 IP 구조와 함께 정리했다."
date: 2026-04-13 19:12:00 +0900
categories: [infra]
tags: [Docker, Cloudflare, LaLiga, Spain, CICD]
image: docker-spain-cloudflare-block/docker-spain-cloudflare-block-1.png
published: true
---

토요일 저녁에 GitLab 러너가 갑자기 이미지를 못 당겨온다면, 보통은 토큰 만료나 사내 프록시를 먼저 의심한다. 그런데 2026년 4월 13일 개발자 타임라인에서 터진 사건은 조금 황당했다. 스페인에서 `docker pull`이 실패한 원인이 레지스트리 장애도 아니고, 도커 버그도 아니고, 축구 중계 불법 스트리밍 차단이었다.

이 얘기가 세게 꽂힌 이유는 단순하다. 개발팀은 컨테이너 레이어를 코드처럼 다루는데, 법원 명령은 서비스 단위가 아니라 Cloudflare 공유 IP 단위로 내려갔다. 내 눈에는 여기서 진짜 질문이 생긴다. 이제 배포 실패 원인을 애플리케이션 로그보다 경기 일정표에서 먼저 찾아야 하는 시대가 온 걸까.

{% include pre-version.html %}

## 왜 Docker pull 얘기가 오늘 폭발했나

### HN가 장애 리포트가 된 순간

Hacker News에서 `Docker pull fails in Spain due to football Cloudflare block` 글은 2026년 4월 13일 기준 906점과 335개 댓글까지 올라갔다. 여기서 끝났다면 그냥 개발자 밈으로 지나갔을 것이다. 그런데 원글에는 GitLab 러너가 이미지 풀에 실패했고, 실제 오류가 Cloudflare R2 호스트의 인증서 불일치로 찍혔다는 로그가 붙었다. 사람들은 곧바로 같은 현상을 자기 회사 CI와 홈랩에서 재현하기 시작했다.

### LaLiga와 Cloudflare가 서로 다른 현실을 말한다

LaLiga는 2026년 4월 공식 공지에서 차단이 불법 스트리밍 대응이며 전체 요청의 0.8퍼센트만 영향을 받았다고 주장했다. 반면 AP와 TechRadar 보도는 스마트 도어, GPS 추적기, 일반 웹서비스까지 같이 흔들렸다는 현지 사례를 전했다. 이 간극이 커질수록 사건은 저작권 집행 뉴스가 아니라 인프라 거버넌스 뉴스가 된다.

| 신호 | 2026년 4월 13일 기준 관찰 | 왜 중요한가 |
|---|---|---|
| 실시간 화제성 | HN 906점 335댓글 | 개발자 체감 이슈가 이미 전 세계로 번졌다 |
| 공식 충돌 | LaLiga 공지와 Cloudflare 반박이 병존 | 단순 장애가 아니라 정책 충돌이다 |
| 실사용 피해 | Docker pull, GitLab 러너, IoT 추적기 사례 확산 | 개발 파이프라인과 생활 서비스가 같은 공격면에 묶였다 |

그래서 이 표가 중요한 이유는 누가 더 감정적으로 보이느냐를 따지기 위해서가 아니다. 공유 인프라를 거칠게 잘라버리면, 개발 도구와 일반 소비자 서비스가 같은 순간에 함께 쓰러진다는 사실을 보여주기 때문이다.

## 문제는 Docker가 아니라 공유 IP였다

### TLS 오류는 증상이고 차단은 네트워크 계층이었다

원글에 나온 메시지는 꽤 노골적이다. `docker-images-prod...r2.cloudflarestorage.com` 인증서가 맞지 않는다는 `x509` 오류가 떴다. 이건 도커 클라이언트가 갑자기 멍청해졌다는 뜻이 아니라, 원래 받아야 할 스토리지 응답 대신 차단 페이지나 다른 중간 응답이 끼어들었을 가능성이 높다는 뜻이다. 개발자는 보통 TLS 에러를 앱 쪽에서 해석하지만, 이번엔 네트워크 정책이 인증서 오류의 얼굴로 나타난 셈이다.

### Cloudflare 같은 멀티테넌트 CDN은 한 고객만 따로 자르기 어렵다

Cloudflare가 법원에 낸 의견서와 Proton, TechRadar 보도를 같이 보면 갈등의 구조가 선명해진다. 문제의 본질은 한 불법 스트리밍 사이트를 정확히 찌르는 게 아니라, 그 사이트가 얹혀 있던 IP 대역을 크게 막아버렸다는 점이다. 내 생각엔 여기서 Docker가 특히 상징적이다. 개발자는 레지스트리를 논리적 서비스로 보지만, 실제 전송 경로는 CDN 스토리지와 공유 네트워크 위에 올라가 있다.

```bash
docker pull alpine:3.21 2>&1 | tee /tmp/docker-pull.log
grep -E 'x509|TLS|cloudflarestorage' /tmp/docker-pull.log || true
curl -Iv https://registry-1.docker.io/v2/ 2>&1 | sed -n '1,12p'
curl -Iv https://docker-images-prod.6aa30f8b08e16409b46e0173d6de2f56.r2.cloudflarestorage.com 2>&1 | sed -n '1,12p'
```

이 네 줄은 앱 로그가 아니라 전송 경로에서 뭐가 바뀌었는지 확인하는 가장 빠른 체크다.

{% include pre-version.html %}

## 개발팀이 특히 아픈 이유

### CI는 경기 시간표를 모른다

사람 브라우저는 VPN으로 우회하면 잠깐 버틸 수 있다. 하지만 CI 러너와 배포 잡은 그렇게 움직이지 않는다. 특히 주말 릴리스나 야간 핫픽스가 있는 팀이라면, 특정 국가나 ISP에서만 레이어 다운로드가 실패하는 순간 장애 재현 자체가 늦어진다. 이미지를 잘 만드는 기본기 자체는 예전에 정리한 [Docker 컨테이너 최적화 전략](/infra/2026/01/21/docker-container-optimization.html)에서도 중요했지만, 이번 사건은 최적화보다 먼저 공급 경로 다변화가 필요하다는 쪽으로 논점을 밀어버렸다.

### 운영팀은 이제 앱 장애와 정책 장애를 같이 분리해야 한다

내가 이 사건을 세게 보는 이유도 여기에 있다. 서비스 코드가 멀쩡해도 외부 차단 정책이 CDN 경로를 잘못 건드리면, 장애는 애플리케이션처럼 보이면서도 애플리케이션으로는 고칠 수 없다. 이런 종류의 장애는 온콜 엔지니어를 가장 지치게 만든다. 로그는 TLS를 말하고, 실제 원인은 법원 명령과 ISP 집행 방식에 있기 때문이다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/docker-spain-cloudflare-block/docker-spain-cloudflare-block-2-400.webp 400w,
            /static/img/posts/docker-spain-cloudflare-block/docker-spain-cloudflare-block-2-800.webp 800w,
            /static/img/posts/docker-spain-cloudflare-block/docker-spain-cloudflare-block-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/docker-spain-cloudflare-block/docker-spain-cloudflare-block-2.webp" 
    alt="스페인 차단이 Docker pull에 번진 구조" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 팀이 지금 바꿔야 할 것

### 레지스트리 경로를 하나로 두지 말 것

| 대응 | 바로 얻는 효과 | 비용 |
|---|---|---|
| 사내 레지스트리 캐시 | 외부 CDN 변동 흡수 | 스토리지와 운영 부담 증가 |
| 빌드 지역 이원화 | 특정 국가 차단 회피 | 러너 관리 복잡도 증가 |
| 아티팩트 사전 고정 | 경기 시간대 풀 실패 완화 | 배포 유연성 감소 |

이 셋 중 무엇을 고르든, 공통점은 한 가지다. `docker pull`을 인터넷이라는 단일 추상화에 맡겨두지 않는 것이다. 작은 팀이라도 최소한 주말 배포용 이미지 한 벌은 미리 당겨 놓는 쪽이 현실적이다.

### 장애 문서를 네트워크 정책까지 확장할 것

앞으로 비슷한 일이 다시 터지면 원인분석 문서에 `애플리케이션`, `레지스트리`, `CDN`, `ISP 정책`을 같은 표에 놓고 봐야 한다. 그래야 온콜 엔지니어가 잘못된 계층에서 두 시간을 날리지 않는다. 개발 생산성을 해치는 건 항상 느린 코드만이 아니다. 가끔은 축구 리그가 더 직접적으로 빌드를 멈춘다.

## 경기 일정이 인프라 일정이 되지 않으려면

이번 사건은 스페인만의 특수 사례처럼 보이지만, 멀티테넌트 CDN과 법적 차단 명령이 늘어나는 방향을 보면 다른 나라라고 안심할 이유는 없다. 다음 시즌에 또 같은 차단이 켜질 때, 당신 팀의 배포는 경기 시작 휘슬과 함께 멈추지 않을 준비가 되어 있을까.
