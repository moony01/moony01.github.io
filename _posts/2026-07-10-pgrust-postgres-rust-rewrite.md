---
layout: post
title: "pgrust의 Postgres Rust 재작성, 어디까지 믿을까"
description: "pgrust가 Postgres 회귀 테스트 4만6000개를 통과했다. Rust 재작성 실험의 의미와 운영팀이 조심해서 봐야 할 지점을 정리했다."
date: 2026-07-10 12:20:00 +0900
categories: [database]
tags: [pgrust, Postgres, Rust, 데이터베이스, 회귀테스트]
image: pgrust-postgres-rust-rewrite/pgrust-postgres-rust-rewrite-1.webp
lang: ko
published: true
---

pgrust의 Postgres Rust 재작성 소식을 처음 봤을 때, 솔직히 제목부터 조금 위험해 보였다. `Postgres rewritten in Rust, now passing 100% of the Postgres regression tests`. 이 문장은 개발자 커뮤니티가 클릭하지 않기 어렵다. Postgres, Rust, 재작성, 100% 테스트 통과가 한 줄에 다 들어가니까.

근데 이걸 “이제 Postgres가 Rust로 갈아탄다”로 읽으면 바로 헛발질이다. 내가 보기엔 더 재미있는 지점은 따로 있다. pgrust는 프로덕션 대체재라기보다, 오래된 데이터베이스 내부를 다시 만져보려는 실험이 어디까지 현실적인지 보여주는 꽤 큰 신호에 가깝다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/pgrust-postgres-rust-rewrite/pgrust-postgres-rust-rewrite-1-400.webp 400w,
            /static/img/posts/pgrust-postgres-rust-rewrite/pgrust-postgres-rust-rewrite-1-800.webp 800w,
            /static/img/posts/pgrust-postgres-rust-rewrite/pgrust-postgres-rust-rewrite-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/pgrust-postgres-rust-rewrite/pgrust-postgres-rust-rewrite-1.webp"
    alt="pgrust Postgres Rust 재작성 흐름을 밝은 데이터베이스 엔진으로 표현한 이미지"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## pgrust가 화제가 된 이유

### “100% 회귀 테스트 통과”라는 문장이 세다

[pgrust README](https://github.com/malisper/pgrust)는 프로젝트를 “A Postgres rewrite in Rust”라고 소개한다. 타깃은 Postgres 18.3이고, Postgres의 기대 출력과 4만6000개가 넘는 regression query 결과를 맞춘다고 적었다. 디스크 호환성도 언급한다. 기존 Postgres 18.3 data directory에서 부팅할 수 있다는 얘기다.

이 정도 문구면 당연히 Hacker News가 반응한다. 실제로 [HN 글](https://news.ycombinator.com/item?id=48841676)은 내가 확인한 시점에 400점대와 400개가 넘는 댓글을 달고 있었다. 댓글 분위기도 예상 그대로였다. “대단하다”와 “이걸 믿어도 되나”가 같이 붙었다.

나는 이 반응이 꽤 건강하다고 본다. 데이터베이스는 웹 프레임워크보다 훨씬 보수적으로 봐야 한다. 특히 Postgres급 시스템이면 더 그렇다. SQL이 돌아간다는 것과, 운영 중인 회사 데이터의 마지막 방어선으로 믿는다는 건 완전히 다른 얘기다.

### 테스트 통과는 출발선이지 결승선이 아니다

Postgres 공식 문서의 [Regression Tests](https://www.postgresql.org/docs/current/regress.html)를 보면 회귀 테스트는 출력 차이, locale, encoding, date/time, floating point, row ordering 같은 현실적인 차이를 다룬다. 그러니까 “테스트를 통과했다”는 말은 가볍지 않다. 그냥 장난감 SQL 파서가 SELECT 몇 개 처리했다는 수준은 아니다.

다만 테스트 스위트는 결국 스위트다. 테스트가 잡는 영역과 못 잡는 영역이 있다. 장기 운영에서 터지는 vacuum, planner 선택, lock 경합, extension 조합, 장애 복구, 백업/복원, 관측성, OS별 차이 같은 문제는 테스트 숫자 하나로 닫히지 않는다.

내가 이 뉴스를 볼 때 가장 먼저 떠올린 건 “대체 가능성”이 아니라 “검증 방식”이었다. pgrust가 던진 질문은 이거다. 오래된 C 기반 데이터베이스를 Rust로 다시 쓸 때, 우리는 어떤 테스트를 oracle로 삼아야 하나. 그리고 그 oracle이 충분하지 않은 영역은 어디인가.

## Rust 재작성보다 중요한 건 내부를 다시 바꾸는 여지다

### README의 로드맵이 더 흥미롭다

pgrust README는 아직 production-ready가 아니고, performance optimized도 아니라고 분명히 말한다. 기존 Postgres extension이나 PL/Python, PL/Perl, PL/Tcl 같은 procedural language extension도 일반적으로 호환되지 않는다고 적었다. 이 부분이 마음에 들었다. 과장하지 않는다.

오히려 로드맵이 더 눈에 들어온다. multithreaded Postgres internals, built-in connection pooling, JSON-heavy workload support, fast forking and branching workflows, no-vacuum designs, bad query guardrails, AI-generated SQL을 위한 runtime guardrails 같은 항목들이다.

이건 “언어만 Rust로 바꿨다”보다 훨씬 큰 얘기다. Postgres의 행동은 유지하되 내부 구조를 다시 실험하고 싶다는 뜻에 가깝다. 특히 프로세스 기반 연결 모델, vacuum 비용, JSON-heavy workload, 나쁜 쿼리 방어는 운영팀이 실제로 피곤해하는 지점이다.

### 데이터베이스는 코드를 줄이는 문제가 아니다

요즘 Rust 재작성 얘기가 나오면 다들 memory safety부터 말한다. 맞는 얘기다. 하지만 데이터베이스에서는 그게 전부가 아니다. 데이터베이스는 타입 안정성보다 더 오래 살아남아야 한다. 장애가 나도 이상한 순서로 복구되면 안 되고, 성능이 좋아 보여도 특정 쿼리에서 갑자기 계획이 튀면 운영자는 밤을 샌다.

그래서 pgrust의 가치는 “Rust니까 안전하다”가 아니다. 오히려 “Postgres 행동을 최대한 유지하면서, 내부 구현을 바꿔볼 실험장이 생겼다” 쪽이다. Rust는 그 실험을 더 공격적으로 해볼 수 있게 만드는 도구일 수 있다. 하지만 Rust가 데이터베이스 의미론을 대신 증명해주진 않는다.

여기서 실무 감각이 필요하다. compiler가 잡아주는 버그와, 운영에서 진짜 무서운 버그는 겹치지만 완전히 같지 않다. 잘못된 ownership보다 무서운 건 조용히 다른 결과를 내는 쿼리다. panic보다 무서운 건 특정 조건에서만 느려지는 planner다. 메모리 안정성은 큰 축이지만, 데이터베이스 신뢰성은 그보다 더 넓다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/pgrust-postgres-rust-rewrite/pgrust-postgres-rust-rewrite-2-400.webp 400w,
            /static/img/posts/pgrust-postgres-rust-rewrite/pgrust-postgres-rust-rewrite-2-800.webp 800w,
            /static/img/posts/pgrust-postgres-rust-rewrite/pgrust-postgres-rust-rewrite-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/pgrust-postgres-rust-rewrite/pgrust-postgres-rust-rewrite-2.webp"
    alt="pgrust 회귀 테스트와 Postgres 엔진 비교 흐름을 보여주는 밝은 기술 다이어그램"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 운영팀은 pgrust를 어떻게 봐야 하나

### 지금 당장 갈아타는 선택지는 아니다

이건 분명히 말해야 한다. 지금 운영 중인 Postgres를 pgrust로 바꾸자는 얘기는 아니다. README도 production-ready가 아니라고 한다. extension 호환성도 아직 제한적이다. 성능 최적화도 끝난 상태가 아니다. 그러면 운영팀의 액션은 단순하다. “도입”이 아니라 “관찰”이다.

그래도 무시하기엔 아깝다. Docker로 바로 만져볼 수 있고, [pgrust.com](https://pgrust.com/)에는 브라우저 데모도 있다. 테스트 DB, 내부 실험, 쿼리 호환성 감각을 보는 용도로는 충분히 재미있다.

```bash
docker run -d --name pgrust \
  -e POSTGRES_PASSWORD=secret \
  malisper/pgrust:v0.1

# 컨테이너 안의 psql로 접속해 SQL 감각만 먼저 본다.
docker exec -it -e PGPASSWORD=secret pgrust \
  psql -h 127.0.0.1 -U postgres
```

나는 이런 실험을 볼 때 “우리 서비스에 넣을까?”보다 “우리 팀이 Postgres를 얼마나 암묵적으로 믿고 있나?”를 먼저 묻는 편이다. migration, extension, backup, logical replication, monitoring, pooling, failover, query timeout, role 권한 같은 것들이 실제 운영 신뢰를 만든다. 새 엔진이 그걸 다 재현하기 전까지는 재미있는 프로젝트와 운영 인프라 사이에 큰 강이 있다.

### 테스트 oracle을 어떻게 쌓을지가 핵심이다

pgrust가 의미 있는 이유는 Postgres 자체의 테스트를 oracle로 삼는다는 점이다. “Postgres처럼 보이는 새 DB”가 아니라 “Postgres의 기대 출력과 맞춰보는 새 구현”에 가깝다. 이 방향은 꽤 중요하다.

이전에 썼던 [pgmicro 글](/database/2026/04/13/pgmicro-postgres-sqlite.html)에서도 비슷한 느낌이 있었다. 거기서는 SQLite 위에서 PostgreSQL 문법 경험을 얼마나 작게 가져올 수 있느냐가 핵심이었다. pgrust는 반대로 더 깊게 들어간다. SQL 문법 흉내가 아니라 서버 내부를 다시 만져보려 한다.

둘 다 같은 질문으로 이어진다. 개발자가 붙잡고 싶은 건 꼭 원래 구현체인가, 아니면 Postgres라는 행동 계약인가. 만약 후자라면, 앞으로 이런 실험은 더 많이 나올 수밖에 없다. AI가 코드를 더 빨리 옮기고, Rust가 내부 안정성 실험을 밀어주고, WASM 데모와 Docker 이미지가 배포 장벽을 낮춘다.

## 내가 보는 체크리스트

### “돌아간다” 다음에 봐야 할 것들

pgrust 같은 프로젝트를 볼 때 나는 아래 순서로 본다.

| 체크포인트 | 왜 중요한가 |
|---|---|
| 회귀 테스트 범위 | Postgres 행동 계약을 얼마나 넓게 따라가는지 본다 |
| extension 호환성 | 실제 운영 Postgres는 extension 의존도가 높다 |
| 성능 편차 | 평균보다 특정 쿼리의 급격한 악화가 더 위험하다 |
| 장애 복구 | crash, WAL, backup, restore는 데모와 다른 세계다 |
| 운영 도구 호환 | pooling, monitoring, migration 도구가 같이 움직여야 한다 |

이 표를 통과해야 “도입 검토”라는 말을 꺼낼 수 있다. 그 전까지는 좋은 실험이다. 좋은 실험이라는 말은 낮게 보는 게 아니다. 오히려 데이터베이스 쪽에서 좋은 실험은 귀하다. 대부분 너무 작아서 의미가 없거나, 너무 크게 말해서 믿기 어렵다.

pgrust는 적어도 지금 기준으로는 본인이 아직 준비됐다고 말하지 않는다. 그 정직함 때문에 더 볼 만하다. 운영자가 싫어하는 건 미완성 프로젝트가 아니다. 미완성을 완성처럼 파는 프로젝트다.

내 기준에서는 이런 프로젝트를 볼 때 작은 실험 로그를 따로 남기는 게 좋다. 어떤 쿼리는 그대로 맞고, 어떤 쿼리는 에러 메시지만 다르고, 어떤 쿼리는 성능 곡선이 이상한지 기록해두면 나중에 비슷한 호환 DB나 재작성 엔진을 볼 때 기준선이 생긴다. 결국 운영팀의 자산은 “써봤다”가 아니라 “어디서 깨지는지 안다”에 가깝다.

### Postgres의 미래가 Rust라는 뜻은 아니다

마지막으로 오해 하나는 닫고 싶다. pgrust가 화제라고 해서 Postgres 본류가 곧 Rust로 갈 거라는 뜻은 아니다. Postgres는 프로젝트 역사, 커뮤니티, C 코드베이스, extension 생태계, 릴리스 문화가 다 얽혀 있다. 이 정도 시스템은 기술적으로 가능하다고 바로 방향이 바뀌지 않는다.

다만 주변 실험은 바뀔 수 있다. Postgres 호환 계층, 테스트 oracle, Rust 기반 storage 실험, branching database, AI-generated SQL guardrail 같은 영역은 더 활발해질 가능성이 있다. 그게 내가 이 뉴스를 블로그에 남기는 이유다.

pgrust는 오늘 당장 운영 DB를 대체하는 답이 아니다. 대신 질문을 잘 던졌다. Postgres의 겉모습을 유지하면서 내부를 어디까지 다시 설계할 수 있을까. 그리고 그 실험을 검증하기 위해 우리는 어떤 테스트와 운영 증거를 쌓아야 할까.

이 질문은 꽤 오래 갈 것 같다. 데이터베이스 쪽에서 진짜 중요한 변화는 보통 “새 문법이 나왔다”보다 “기존 신뢰를 다른 구조로 재현할 수 있나”에서 시작하니까.
