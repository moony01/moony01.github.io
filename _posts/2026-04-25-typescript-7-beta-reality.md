---
layout: post
title: "TypeScript 7 베타 지금 넣어도 되는지 봤다"
description: "TypeScript 7 베타와 tsgo가 정말 실무에 바로 들어갈 수 있는지, 10배 속도 주장과 아직 남은 제약을 개발팀 기준으로 정리했다."
date: 2026-04-25 19:02:39 +0900
categories: [javascript]
tags: [TypeScript, TypeScript7, tsgo, Go, VSCode]
image: typescript-7-beta-reality/typescript-7-beta-reality-1.png
published: true
---

TypeScript 7 베타 공지를 보고 제일 먼저 든 생각은 이거였다. 드디어 말만 하던 `tsgo`를 진짜 써보라고 던졌네. 2026년 4월 21일 Microsoft가 TypeScript 7.0 Beta를 공개했고, 핵심 메시지는 아주 단순했다. 기존 JavaScript 기반 컴파일러를 Go로 포팅했고, 큰 코드베이스에서는 TypeScript 6보다 보통 10배쯤 빠르다는 거다.

숫자만 보면 솔직히 좀 과장처럼 들린다. 이런 발표는 늘 "우리 내부에서만 빠름" 같은 단서가 붙기 쉬우니까. 근데 이번에는 결이 조금 다르다. 공식 글에서 아예 `@typescript/native-preview@beta` 패키지와 `tsgo` 실행 경로를 열어놨고, VS Code용 Native Preview 확장도 바로 같이 내놨다. 그냥 데모 영상이 아니라 실제로 팀이 오늘 바로 눌러볼 수 있는 형태다.

예전에 썼던 [TypeScript가 JavaScript를 버렸습니다 Go로 다시 짠 컴파일러 10배 빠르다](/javascript/2026/03/25/typescript-6-last-javascript-go-compiler.html) 글에서는 방향 전환 자체가 더 충격이었다. 지금은 단계가 하나 더 넘어갔다. 이제는 "진짜로 넣어도 되나"를 묻는 타이밍이다.

{% include pre-version.html %}

![TypeScript 7 베타 속도 전환 장면](/static/img/posts/typescript-7-beta-reality/typescript-7-beta-reality-1.png){: .wd100}

## 왜 이번 베타는 분위기가 다르냐

### 그냥 빠르다 수준이 아니라 교체 경로가 보인다

이번 발표에서 중요한 건 속도 숫자 하나가 아니다. 설치 경로가 너무 명확하다. `npm install -D @typescript/native-preview@beta` 하고 `npx tsgo` 돌리면 된다. 이름도 일부러 `typescript`가 아니라 별도 패키지로 뒀다. 기존 `tsc`를 바로 뜯어고치라는 얘기가 아니라, 팀이 안전하게 나란히 비교해보라는 뜻이다.

이게 실무에서는 꽤 큰 차이다. 새 도구가 나와도 기존 CI랑 충돌하면 바로 실험이 멈춘다. 그런데 이번에는 TypeScript 6 쪽 호환 패키지까지 같이 안내했다. 그러면 lint, transformer, 사내 빌드 스크립트는 아직 6에 두고, 컴파일 체감만 먼저 재볼 수 있다.

### Microsoft가 먼저 깔아둔 방어선도 꽤 탄탄하다

공식 발표를 보면 "완전히 새로 쓴 rewrite"라고 과장하지 않는다. 기존 구현을 methodically ported 했고, 타입 체크 로직은 구조적으로 동일하다고 못 박는다. 그 말이 왜 중요하냐면, 속도보다 더 무서운 건 결과가 미묘하게 달라지는 거라서 그렇다. 타입 에러가 한 줄만 달라도 대형 모노레포는 바로 난리 난다.

여기에 Microsoft 내부뿐 아니라 Bloomberg, Canva, Figma, Google, Linear, Notion, Slack, Vercel 같은 팀이 이미 큰 코드베이스에서 프리뷰를 써봤다고 적혀 있다. 이쯤 되면 "랩 안에서만 돌아가는 장난감" 취급은 못 한다.

## 어디까지는 바로 써도 되냐

### 개발자 로컬 체감은 지금 당장 건드려볼 만하다

로컬 컴파일 속도와 에디터 반응성은 이번 베타의 가장 쉬운 승리 포인트다. 공식 글도 VS Code Native Preview 확장을 바로 권한다. 저장 누를 때 한참 숨 참고 기다리던 프로젝트면 이건 그냥 호기심 차원이 아니라 집중력 문제다. 10초 넘게 멈칫하는 팀은 하루에도 몇 번씩 흐름이 끊긴다.

Reddit 반응도 딱 그쪽이다. "내 빌드가 10초대에서 1초대로 줄었다" 같은 얘기가 계속 나오고, HN이랑 GeekNews에서도 빨리 읽히는 포인트는 결국 하나다. 성능 향상이 추상적인 미래 얘기가 아니라 오늘 손에 잡히는 대기 시간 감소라는 것.

### CI와 도구 체인은 아직 선을 잘 그어야 한다

여기서 바로 전사 적용으로 가면 좀 위험하다. TypeScript 팀이 직접 말한 가장 큰 제약은 안정적인 programmatic API가 아직 없다는 점이다. 최소 TypeScript 7.1 전까지는 `typescript-eslint`처럼 `typescript` 패키지를 직접 import하는 도구들이 그대로 따라오지 못할 수 있다. 그러니까 컴파일러만 빠르다고 전체 생태계가 동시에 끝난 건 아니다.

이 경계선은 꽤 분명하다.

- 앱 코드 컴파일 속도 비교
- VS Code 편집 체감 비교
- 독립적인 빌드 잡 실험

여기까지는 지금 바로 해볼 만하다.

- 커스텀 transformer 의존
- `typescript` 런타임 API 직접 사용
- 복잡한 사내 빌드 플러그인 체인

여기는 조금 더 봐야 한다.

{% include pre-version.html %}

## 실무팀 기준으로 어디서 막힐까

### tsconfig 기본값 변화까지 같이 맞아야 한다

사람들이 속도 얘기에만 꽂히는데, 실제 마이그레이션에서 더 많이 터지는 건 설정값이다. TypeScript 7은 TypeScript 6의 새 기본값을 그대로 끌고 간다. `strict` 기본 활성화, `module` 기본값 변화, `types` 기본값 축소, 오래된 `moduleResolution` 제거 같은 것들이다. 이미 TypeScript 6로 정리 안 된 저장소라면 `tsgo`를 얹는 순간 속도보다 빨간 줄이 먼저 보일 가능성이 높다.

그래서 순서는 단순하다. TypeScript 6 기준 경고와 deprecated 설정부터 정리하고, 그 다음에 `tsgo`를 비교해야 한다. 준비가 덜 된 저장소에서 바로 TypeScript 7 베타를 넣고 "생각보다 별로네" 하는 건 도구 탓이 아니라 저장소 상태 탓일 수 있다.

```bash
npm install -D @typescript/native-preview@beta
npm install -D typescript@npm:@typescript/typescript6

npx tsgo --noEmit
npx tsc6 --noEmit
```

이렇게 두 경로를 나란히 돌려보면 된다. 결과가 같고 시간 차이가 크면, 그때부터는 로컬 기본값을 `tsgo` 쪽으로 기울일 명분이 생긴다.

### 메모리와 병렬 옵션은 기대만큼 중요하다

이번 베타에서 내가 더 흥미롭게 본 건 `--checkers`, `--builders`, `--singleThreaded` 같은 제어 옵션이다. 그냥 "Go라서 빠름"이 아니라 병렬 처리 구조를 꽤 노골적으로 열어놨다. 큰 모노레포는 여기서 진짜 차이가 날 가능성이 높다. 다만 이건 반대로 말하면, 팀마다 최적값이 다를 수 있다는 뜻이기도 하다.

로컬 맥북에서는 4체커가 좋을 수 있는데, 작은 GitHub Actions 러너에서는 오히려 메모리 압박만 늘 수 있다. 그러니까 이번 베타는 단순 업그레이드라기보다 성능 튜닝 포인트가 추가된 릴리스에 가깝다.

## 지금 제일 현실적인 도입 시나리오

### 개발팀 한두 명이 먼저 밟아보는 게 맞다

지금 당장 전원 전환보다 좋은 방식은 선발대 운영이다. 프론트엔드 한 명, 플랫폼 한 명 정도가 자기 프로젝트에서 `tsgo`를 켜보고 숫자를 가져오는 거다. 빌드 시간, 타입 체크 결과 차이, VS Code 반응, 메모리 사용량 정도만 모아도 충분하다. 이건 감으로 결정할 문제가 아니다.

특히 Next.js나 Vite 기반 프론트엔드처럼 TypeScript 편집 대기 시간이 잦은 팀은 체감 이득이 아주 빠르게 나올 수 있다. 반대로 내부 CLI나 코드 생성기처럼 TypeScript API에 깊게 물린 팀은 아직 조심해야 한다.

### 판단 기준은 생각보다 단순하다

내 기준은 이렇다. 저장소가 이미 TypeScript 6 기준으로 깔끔하고, 커스텀 transformer 의존이 약하고, 개발자들이 컴파일 대기 시간에 지쳐 있다면 TypeScript 7 베타는 지금 바로 실험해볼 가치가 크다. 반대로 도구 체인 호환성이 더 중요하면 베타를 "기준선 측정 도구"로만 쓰는 게 낫다.

이번 건은 꽤 오랜만에 보는 제대로 된 베타 같다. 과장 광고 냄새가 아예 없는 건 아닌데, 적어도 눌러보면 바로 확인할 수 있는 종류의 과장이다. 이런 건 오히려 좋다. 숫자가 진짜인지 팀 저장소에서 바로 걸러지니까.

![tsgo 도입 판단 회의 장면](/static/img/posts/typescript-7-beta-reality/typescript-7-beta-reality-2.png){: .wd100}

그래서 나는 지금 TypeScript 7 베타를 "당장 전환"보다 "당장 측정"의 신호로 본다. 괜히 다 같이 들뜨기보다, 오늘 로컬 한 번 돌려보고 내일 팀 채널에 숫자 던지는 쪽이 더 맞다. 이런 베타는 말보다 로그가 빨리 답해준다.
