---
layout: post
title: "HTTP QUERY 메서드가 API 설계에 던진 운영 질문"
description: "RFC 10008로 표준화된 HTTP QUERY 메서드가 GET과 POST 사이에서 어떤 운영 선택지를 만드는지 API 설계 관점에서 정리했다."
date: 2026-06-18 14:00:00 +0900
categories: [infra]
tags: [HTTP, API설계, RFC10008, 캐싱, 백엔드운영]
image: http-query-method/http-query-method-1.webp
lang: ko
published: true
---

HTTP QUERY 메서드가 표준 RFC로 올라온 걸 보고 처음 든 생각은 이거였다. “드디어 GET과 POST 사이에 있던 애매한 공간을 이름 붙였구나.”

[RFC 10008](https://www.rfc-editor.org/info/rfc10008/)은 2026년 6월에 나온 Standards Track 문서다. 이름 그대로 HTTP에 `QUERY`라는 새 메서드를 정의한다. [IANA HTTP Method Registry](https://www.iana.org/assignments/http-methods/http-methods.xhtml)에도 `QUERY`가 등록됐고, safe와 idempotent가 모두 yes로 표시된다. 그러니까 서버 상태를 바꾸지 않는 조회 요청인데, 쿼리 입력은 URL이 아니라 요청 본문에 담을 수 있는 메서드다.

이게 엄청 화려한 기능은 아니다. 그런데 API를 운영해 본 사람한테는 꽤 현실적인 주제다. 긴 검색 조건, 필터 JSON, 복잡한 리포트 조회, URL 길이 제한, 로그에 남는 민감 파라미터, 캐시 키 설계. 이런 문제들은 다들 한 번씩 이상하게 피해 갔다. `GET`에 억지로 넣거나, `POST /search`를 만들고 “이건 사실 조회야”라고 문서에 적었다. QUERY는 그 회색지대에 공식 이름표를 붙인다.

{% include pre-version.html %}

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/http-query-method/http-query-method-1-400.webp 400w,
            /static/img/posts/http-query-method/http-query-method-1-800.webp 800w,
            /static/img/posts/http-query-method/http-query-method-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/http-query-method/http-query-method-1.webp"
    alt="HTTP QUERY 메서드가 GET과 POST 사이에서 복잡한 API 조회를 정리하는 밝은 기술 다이어그램"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 왜 GET과 POST만으로는 찝찝했나

### GET은 조회에 맞지만 입력을 전부 URL에 밀어 넣는다

GET은 웹에서 제일 자연스러운 조회 메서드다. 안전하고, 멱등이고, 캐시와 링크 공유에 잘 맞는다. 문제는 쿼리 조건이 길어지는 순간부터다. 단순한 `?q=keyword&page=1` 정도면 괜찮다. 그런데 검색 필터가 nested JSON이 되고, 권한 조건과 정렬 규칙과 집계 조건이 붙으면 URL은 금방 지저분해진다.

물론 URL은 꽤 길게 쓸 수 있다. 하지만 “어디까지 괜찮은가”는 브라우저, 프록시, CDN, 로깅 시스템, 보안 장비마다 다르게 체감된다. 더 귀찮은 건 URL이 여기저기 남는다는 점이다. 접근 로그, 분석 도구, Referer, 에러 리포트에 쿼리 문자열이 찍힐 수 있다. 검색 조건 안에 이메일, 내부 식별자, 민감한 필터 값이 섞이면 운영자는 바로 신경이 쓰인다.

그래서 많은 팀이 결국 POST를 쓴다. `POST /search`, `POST /query`, `POST /reports/filter` 같은 엔드포인트를 만들고 JSON body에 조건을 넣는다. 개발자는 편해진다. 하지만 의미론은 조금 흐려진다. POST는 일반적으로 처리 요청에 가깝고, 기본적으로 캐시와 안전성 신호가 약하다. “이 POST는 상태를 바꾸지 않습니다”라고 문서에 써도, 프록시와 도구와 사람은 그렇게 자동으로 이해하지 않는다.

### POST 조회는 실무적으로 작동하지만 운영 신호가 약하다

나도 POST 조회를 나쁘다고 보지는 않는다. 실제 서비스에서는 제일 덜 귀찮은 선택일 때가 많다. 복잡한 검색 API를 만들 때 body에 JSON을 넣는 건 자연스럽고, 프론트엔드에서도 다루기 쉽다. 문제는 시간이 지나면서 생긴다.

예를 들어 캐싱을 붙이려고 하면 바로 질문이 늘어난다. 이 POST 응답을 캐시해도 되는가. 캐시 키는 URL만 보면 되는가, body까지 봐야 하는가. 같은 body지만 헤더가 다르면 어떻게 할 것인가. 재시도해도 안전한가. 모니터링에서는 이 요청을 mutation과 같은 그룹으로 볼 것인가. 장애 상황에서 자동 재시도 정책을 걸어도 괜찮은가.

이전에도 [AI API 비용 리스크 글](/ai/2026/05/11/cheap-claude-api-risk.html)에서 API를 단순 가격표가 아니라 운영 단위로 봐야 한다고 썼다. HTTP 메서드도 비슷하다. 메서드는 그냥 라우터에서 분기하는 문자열이 아니다. 캐시, 프록시, 보안, 재시도, 관측 도구가 요청을 해석하는 첫 번째 힌트다. 그 힌트가 애매하면 뒤쪽 운영이 계속 문서와 예외 처리로 버틴다.

## QUERY가 제안하는 위치

### 조회인데 body가 있는 요청

RFC 10008의 핵심은 단순하다. QUERY는 서버 상태를 바꾸지 않는 조회 요청이고, 쿼리 입력은 request content에 담는다. RFC 본문 예시도 `QUERY /contacts`에 `Content-Type: application/x-www-form-urlencoded`를 붙이고, body에 검색 조건을 넣는다. 응답은 일반적인 JSON 리스트다.

여기서 중요한 건 “body가 있는 GET”을 만들자는 게 아니라는 점이다. GET 요청 body는 역사적으로 구현체마다 해석이 애매했고, 중간 장비가 어떻게 처리할지도 믿기 어렵다. QUERY는 별도 메서드로 의미를 분리한다. 조회라는 점은 유지하면서, 입력 표현은 URL 밖으로 빼는 방식이다.

또 하나 중요한 등록이 `Accept-Query`다. [IANA HTTP Field Name Registry](https://www.iana.org/assignments/http-fields/http-fields.xhtml)에는 `Accept-Query`가 permanent 필드로 올라와 있다. 서버는 이 필드로 어떤 query media type을 받는지 알릴 수 있다. 예를 들어 `application/json`, `application/x-www-form-urlencoded`, 특정 도메인 전용 쿼리 언어 같은 식이다. API 클라이언트 입장에서는 “이 리소스가 QUERY를 받는가”뿐 아니라 “어떤 형식으로 받는가”를 확인할 수 있다.

### safe와 idempotent가 붙은 게 핵심이다

QUERY가 재미있는 이유는 body 때문만이 아니다. IANA registry 기준으로 QUERY는 safe이고 idempotent다. 안전하다는 건 요청이 서버 상태를 바꾸도록 의도되지 않았다는 뜻이고, 멱등이라는 건 같은 요청을 여러 번 보내도 효과가 같다는 뜻이다. 이 신호는 운영에서 생각보다 크다.

재시도 정책을 예로 들어보자. 네트워크가 끊겼을 때 GET은 재시도하기 편하다. 반대로 POST는 조심스럽다. 결제, 생성, 메시지 전송 같은 작업일 수 있기 때문이다. 물론 idempotency key를 붙이면 POST도 안전하게 만들 수 있지만, 그건 애플리케이션 레벨의 추가 약속이다. QUERY는 메서드 레벨에서 “이건 조회다”라는 신호를 준다.

캐시도 마찬가지다. RFC는 QUERY 응답이 캐시될 수 있다고 다룬다. 다만 캐시 키가 URL만으로 끝나면 안 된다. request content와 관련 메타데이터까지 고려해야 한다. 이 대목이 현실적으로 제일 중요하다. QUERY를 지원한다고 해서 기존 CDN과 프록시가 바로 똑똑해지는 건 아니다. 오히려 “body까지 포함한 캐시 키를 어떻게 만들 것인가”가 새 운영 과제로 생긴다.

{% include pre-version.html %}

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/http-query-method/http-query-method-2-400.webp 400w,
            /static/img/posts/http-query-method/http-query-method-2-800.webp 800w,
            /static/img/posts/http-query-method/http-query-method-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/http-query-method/http-query-method-2.webp"
    alt="HTTP QUERY 메서드 도입 전 확인해야 할 캐시와 프록시 운영 흐름"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 개발팀이 바로 바꿔야 할까

### 아니다, 먼저 경계면부터 보면 된다

나는 QUERY가 나왔다고 해서 당장 모든 `POST /search`를 바꾸자는 쪽은 아니다. 표준이 나온 것과 생태계 지원이 충분한 것은 다른 이야기다. 브라우저, Fetch 구현, CORS, 프록시, API Gateway, WAF, CDN, SDK가 다 같이 따라와야 실제 운영 기본값이 된다.

특히 CORS가 걸린 브라우저 API에서는 더 조심해야 한다. RFC는 Fetch 기준으로 QUERY가 CORS-safelisted method가 아니기 때문에 preflight가 필요하다고 설명한다. 즉 웹 프론트에서 바로 쓰면 OPTIONS 요청이 붙을 수 있다. 이건 성능과 장애 포인트에 영향을 준다. “조회니까 GET처럼 가볍겠지”라고 생각하면 틀릴 수 있다.

그래서 지금 팀이 할 일은 전면 전환이 아니라 후보 지점을 표시하는 것에 가깝다.

```text
1. URL이 너무 길어지는 검색/리포트 조회 API
2. POST를 쓰지만 실제로는 상태를 바꾸지 않는 엔드포인트
3. 캐시하고 싶지만 POST라서 정책이 흐려진 조회 API
4. 로그에 쿼리 문자열을 남기기 부담스러운 필터 API
5. SDK에서 조회와 변경을 명확히 나누고 싶은 경계
```

이런 곳이 QUERY의 잠재 영역이다. 반대로 단순 목록 조회, 공유 가능한 검색 URL, 브라우저 주소창에 남기는 게 장점인 페이지 검색은 여전히 GET이 더 자연스럽다. QUERY는 GET 대체제가 아니라, GET으로 표현하기 거친 조회를 위한 별도 칸에 가깝다.

### 중간 장비가 따라오기 전까지는 feature flag가 맞다

운영자 입장에서 제일 무서운 건 서버 코드가 아니라 중간 경로다. 로컬에서는 QUERY가 잘 들어오는데, 특정 CDN에서 막히거나, WAF가 이상한 메서드로 분류하거나, 로드밸런서 로그가 body 기반 캐시 키를 못 남기거나, 사내 프록시가 405를 뱉을 수 있다. 새 HTTP 메서드는 항상 이런 문제를 데려온다.

그래서 도입한다면 나는 feature flag를 먼저 둔다. 클라이언트 SDK에서는 같은 조회를 GET/POST/QUERY로 보낼 수 있게 만들고, 서버에서는 OPTIONS와 `Accept-Query` 응답을 명확히 한다. 그리고 관측 지표를 따로 본다. 405, 415, 501 같은 상태 코드가 어디서 나오는지, preflight가 얼마나 늘어나는지, 캐시 hit ratio가 실제로 개선되는지 봐야 한다.

API Gateway 설정도 확인해야 한다. 허용 메서드 목록에 QUERY가 들어가는지, OpenAPI 문서화는 가능한지, 보안 스캐너가 알 수 없는 메서드로 오탐하지 않는지, 로그 마스킹이 body 쪽에도 적용되는지. 이걸 안 보면 “표준이라 괜찮다”는 말이 운영에서 바로 깨진다.

## 그래도 이 표준이 반가운 이유

### API 의미론을 다시 생각하게 만든다

QUERY가 당장 모든 서버에서 기본값이 되지는 않을 것이다. 그래도 나는 이 표준이 반갑다. 이유는 새 장난감이 생겨서가 아니라, 우리가 대충 넘기던 API 의미론을 다시 보게 만들기 때문이다. 조회인데 POST를 쓰는 순간 생기는 애매함을 모두가 알고 있었지만, 대부분 “그냥 실무에서는 이렇게 해”로 넘겼다. QUERY는 그 타협에 이름을 붙이고, 더 나은 신호를 줄 수 있는 방향을 제안한다.

좋은 API는 엔드포인트 이름만 예쁜 게 아니다. 실패했을 때 재시도해도 되는지, 캐시해도 되는지, 로그에 무엇이 남는지, 중간 장비가 어떻게 해석하는지까지 포함한다. HTTP 메서드는 그 약속의 가장 오래된 인터페이스다. QUERY는 거기에 “복잡한 조회”라는 자리를 하나 더 만든다.

### 지금은 관찰하고 실험할 타이밍이다

내 기준으로는 지금 바로 production 핵심 API를 QUERY로 갈아엎을 타이밍은 아니다. 대신 새 내부 API나 관리 도구, SDK 실험 브랜치에서는 테스트해 볼 만하다. 특히 검색 조건이 크고, 재시도와 캐싱 정책을 명확히 하고 싶은 API라면 작은 범위에서 의미가 있다.

다만 체크리스트는 필요하다. 클라이언트가 QUERY를 보낼 수 있는지, 프록시가 통과시키는지, CORS preflight가 허용되는지, 서버 로그와 APM이 메서드를 인식하는지, 캐시 키가 body를 포함하는지, 문서와 SDK가 GET/POST와 차이를 제대로 설명하는지. 이걸 통과해야 “멋진 표준”이 아니라 “운영 가능한 선택지”가 된다.

나는 QUERY가 웹 API의 판을 뒤집을 거라고 보지는 않는다. 그런 표현은 과하다. 대신 앞으로 복잡한 조회 API를 설계할 때 “GET이냐 POST냐” 둘 중 하나만 고르는 시대는 조금씩 끝날 수 있다고 본다. 선택지가 하나 더 생겼고, 그 선택지는 꽤 오래 묵은 운영 문제를 정면으로 다룬다. 그 정도만으로도 RFC 10008은 API 설계자와 백엔드 운영자가 한 번 읽어볼 만한 문서다.
