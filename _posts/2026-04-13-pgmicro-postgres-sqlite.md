---
layout: post
title: "SQLite가 PostgreSQL을 삼킨 날"
description: "pgmicro가 왜 화제인지, SQLite 엔진 위에서 PostgreSQL 문법을 직접 바이트코드로 내리는 방식이 AI 에이전트용 데이터베이스 설계를 어떻게 바꾸는지 정리했다."
date: 2026-04-13 12:04:26 +0900
categories: [database]
tags: [pgmicro, PostgreSQL, SQLite, AIAgents, EmbeddedDB]
image: pgmicro-postgres-sqlite/pgmicro-postgres-sqlite-1.png
published: true
---

서버 없는 PostgreSQL이라는 말이 이제는 낚시 문구처럼 들리지 않는다. 2026년 4월 13일 오전 GeekNews 첫 화면 맨 위에 올라온 `pgmicro`는 꽤 노골적인 한 줄을 던졌다. SQLite 기반으로 만든 인 프로세스 PostgreSQL. 이 문장이 왜 지금 개발자들 귀를 잡아끄는지부터가 중요하다. AI 에이전트가 작업마다 잠깐 쓰고 버리는 작은 데이터베이스를 무한히 만들어내는 흐름에서, 익숙한 PostgreSQL 문법을 서버 없이 쓰고 싶다는 욕망이 드디어 제품 형태를 갖췄기 때문이다.

여기서 갈등이 생긴다. 우리는 이미 SQLite가 이런 자리의 왕이라는 걸 안다. 그런데도 팀 현장에서는 JSON 연산자나 타입 체계, 그리고 PostgreSQL 습관을 버리기 싫어한다. 그래서 질문이 남는다. 정말 `PostgreSQL 같은 것`이 아니라, 개발자가 체감하는 PostgreSQL 경험을 더 작은 형태로 가져올 수 있을까. 오늘 화제가 된 이유는 바로 그 질문에 `pgmicro`가 꽤 공격적인 방식으로 답했기 때문이다.

{% include pre-version.html %}

## 왜 오늘 갑자기 pgmicro가 화제가 됐나

### GeekNews 첫 화면이 말해준 것

오늘 GeekNews 메인에서 `pgmicro`는 2시간 만에 1위로 올라왔다. 점수 자체보다 더 중요한 건 설명 문구였다. PostgreSQL SQL을 SQLite 바이트코드로 직접 컴파일하는 인메모리 임베디드 데이터베이스, 그리고 AI 에이전트 환경에서 급증하는 일시적 소규모 데이터베이스를 겨냥했다는 설명이 붙었다. 요즘 개발자 커뮤니티에서 가장 빨리 퍼지는 키워드가 에이전트, 샌드박스, 짧은 세션, 휘발성 상태 저장이라는 점을 생각하면 타이밍이 너무 정확하다.

### 이미 시장은 같은 방향으로 움직이고 있었다

`pgmicro`가 갑자기 하늘에서 떨어진 건 아니다. SQLite 공식 문서는 여전히 "SQLite는 client server 데이터베이스와 경쟁하는 게 아니라 `fopen()`과 경쟁한다"고 설명한다. 반면 PostgreSQL은 프로세스당 연결과 공유 메모리를 전제로 한 전통적인 서버 아키텍처를 유지한다. `pgmicro` README는 바로 그 틈을 찌른다. PostgreSQL을 WebAssembly로 우겨 넣으려는 대신, PostgreSQL 언어를 파싱해 SQLite 바이트코드로 직접 내리겠다는 것이다.

| 관점 | 기존 선택지 | pgmicro가 던진 변화 |
|------|------|------|
| 실행 방식 | PostgreSQL 서버를 띄우거나 SQLite로 포기 | 프로세스 안에서 PostgreSQL 문법을 직접 실행 |
| 운영 부담 | 포트, 프로세스, 연결 관리 필요 | 파일 또는 메모리만 있으면 끝 |
| 에이전트 적합성 | 짧은 세션마다 DB 띄우기 부담 | 태스크마다 일회성 DB 생성이 쉬움 |

이 표가 중요한 이유는 단순히 "더 가볍다"는 칭찬을 하려는 게 아니다. AI 에이전트가 일을 대신하기 시작하면 데이터베이스도 사람 기준이 아니라 작업 기준으로 잘게 쪼개진다. 그러면 서버형 DB의 강점보다 생성 속도와 폐기 비용이 더 먼저 보이기 시작한다.

## pgmicro는 무엇을 다르게 만들었나

### PostgreSQL을 포팅한 게 아니라 언어를 다시 깎았다

README에서 가장 눈에 들어오는 대목은 `pgmicro does not embed or compile PostgreSQL`이라는 문장이다. 흔한 접근은 PostgreSQL 자체를 줄이거나 감싸는 것이다. 그런데 이 프로젝트는 그 길을 버렸다. PostgreSQL SQL을 파싱한 뒤 SQLite 바이트코드로 바로 컴파일한다. 내 눈에는 이게 프로젝트의 진짜 승부수다. 호환성의 환상을 팔기보다, 필요한 계층만 다시 구현해서 임베디드 환경에 맞는 비용 구조를 얻으려는 선택이기 때문이다.

### Turso와 SQLite 흐름을 PostgreSQL 취향으로 비튼다

`pgmicro`는 Turso를 실험적 포크로 삼는다. Turso 역시 SQLite 호환 인 프로세스 데이터베이스를 Rust로 다시 쓴 프로젝트다. 즉 바닥은 이미 `작고 빠른 로컬 SQL 엔진` 쪽으로 깔려 있고, 그 위에 PostgreSQL dialect를 얹는 식이다. 그래서 이 프로젝트를 봤을 때 내가 느낀 핵심은 "PostgreSQL을 작게 만들었다"보다 "SQLite가 차지하던 임시 DB 자리를 PostgreSQL 문법으로 다시 침공한다"에 가깝다.

이 흐름은 이전에 다뤘던 [Vibe Coding 가이드](/ai/2026/01/31/vibe-coding-guide.html)와도 이어진다. 사람이 IDE를 오래 붙잡고 있던 시대와 달리, 에이전트는 태스크마다 짧게 실행되고 상태를 얇게 남긴다. 그러니 데이터베이스도 장기 운영보다 생성과 폐기가 싸야 한다.

## 개발팀 입장에서 진짜 중요한 변화는 어디 있나

### 에이전트별 샌드박스가 쉬워진다

가장 먼저 바뀌는 곳은 에이전트 런타임이다. 지금까지는 태스크별로 SQLite를 쓰거나, 멀티테넌트 PostgreSQL에 스키마를 쪼개 넣는 식의 타협을 많이 했다. 그런데 `pgmicro`가 충분히 안정화되면 선택지가 달라진다. 각 작업마다 메모리 기반 PostgreSQL 인터페이스를 열고, 끝나면 버리는 방식이 훨씬 자연스러워진다. SQL 습관을 바꾸지 않아도 되고, 테스트 격리도 쉬워진다.

### 서버형 PostgreSQL이 사라진다는 뜻은 아니다

여기서 과장하면 글이 망가진다. 이 프로젝트가 프로덕션 핵심 DB를 바로 대체한다는 뜻은 아니다. PostgreSQL이 강한 이유는 동시성, 중앙 집중 운영, 장기 저장, 확장성 같은 서버형 장점에 있다. SQLite 공식 문서도 분명히 말하듯, SQLite 계열은 애초에 다른 문제를 푼다. `pgmicro`의 진짜 파괴력은 메인 DB 교체가 아니라, "원래 SQLite를 쓰던 자리"를 PostgreSQL 취향으로 바꾸는 데 있다.

![pgmicro 아키텍처와 에이전트용 임시 데이터베이스 흐름](/static/img/posts/pgmicro-postgres-sqlite/pgmicro-postgres-sqlite-2.png){: .wd100}

## 지금 직접 확인해볼 만한 지점

### 설치해서 감을 잡는 가장 빠른 방법

README 기준으로 가장 짧은 시작점은 CLI와 JavaScript SDK다. 아래 명령은 오늘 바로 감을 잡는 데 충분하다.

```bash
npm install -g pg-micro
pg-micro demo.db

npm install pg-micro
node - <<'EOF'
import { connect } from "pg-micro";

const db = await connect(":memory:");
await db.exec("CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT)");
await db.exec("INSERT INTO users (name) VALUES ('Alice'), ('Bob')");
const rows = await db.prepare("SELECT * FROM users").all();
console.log(rows);
await db.close();
EOF
```

첫 두 줄은 CLI를 열어 직접 문법 감각을 보는 용도고, 아래 블록은 인메모리 데이터베이스에서 PostgreSQL 스타일 쿼리가 어느 정도 자연스럽게 돌아가는지 확인하는 최소 예제다.

{% include pre-version.html %}

### 확인 포인트는 성능보다 호환성이다

직접 써볼 때는 벤치마크 숫자보다 아래를 먼저 보는 편이 낫다. JSON 연산자, 트랜잭션, 드라이버 호환성, 에이전트 작업 단위에서의 생성 삭제 비용. 특히 기존 코드가 PostgreSQL 전용 문법에 얼마나 기대고 있는지에 따라 체감은 크게 갈릴 것이다. 내 생각엔 `pgmicro`가 당장 대중화되느냐보다, 이 프로젝트가 던진 방향성이 더 중요하다. 앞으로는 "SQLite냐 PostgreSQL이냐"가 아니라 "작은 런타임에서 PostgreSQL 경험을 얼마나 싸게 흉내 낼 수 있느냐"가 새 질문이 될 가능성이 크다.

## 서버보다 문법이 먼저 남는 순간

오늘 `pgmicro`가 화제가 된 이유를 한 문장으로 줄이면 이렇다. 개발팀이 정말 붙잡고 싶은 건 꼭 PostgreSQL 서버 자체가 아니라, PostgreSQL을 다루는 손의 기억일 수 있다는 것. AI 에이전트 시대에는 인프라가 점점 더 잘게 쪼개지고 짧아진다. 그 흐름에서 살아남는 데이터베이스는 가장 거대한 엔진이 아니라, 가장 빨리 생겼다가 가장 조용히 사라질 수 있는 엔진일지도 모른다.
