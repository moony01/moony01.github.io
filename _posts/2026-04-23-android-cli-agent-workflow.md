---
layout: post
title: "Android CLI가 바꾼 에이전트 개발"
description: "Android CLI가 에이전트 기반 앱 개발에서 왜 중요한지 3배 빠른 작업과 70퍼센트 토큰 절감 신호를 기준으로 짚었다."
date: 2026-04-23 21:44:21 +0900
categories: [ai]
tags: [AndroidCLI, AIAgents, Google, Android, DeveloperTools]
image: android-cli-agent-workflow/android-cli-agent-workflow-1.webp
redirect_from:
  - /others/2026/04/23/android-cli-agent-workflow.html
published: true
---

Android CLI 얘기를 보고 처음 든 생각은 이거였다. 이제 모바일 앱 개발도 IDE 안에서만 돌아가는 게임이 아니구나.

Google이 2026년 4월 16일에 Android CLI를 공개하면서 꽤 센 숫자를 같이 던졌다. 내부 실험에서 LLM 토큰 사용량을 70퍼센트 넘게 줄였고, 표준 도구만 붙잡고 헤매던 작업보다 3배 빠르게 끝났다는 얘기다. 숫자만 보면 홍보 문구처럼 보이는데, 방향은 진짜 흥미롭다. 안드로이드 개발을 에이전트가 이해하기 쉬운 명령어 표면으로 다시 깔아주는 움직임이기 때문이다.

내가 이걸 크게 보는 이유는 단순히 `android create` 같은 새 명령어가 생겼기 때문이 아니다. 에이전트가 앱 프로젝트를 만들고, SDK를 맞추고, 에뮬레이터를 띄우고, 실행까지 가는 길에서 덜 헛돌게 만드는 공식 통로가 생겼다는 게 더 크다. 최근 [클로드 코드 루틴이 크론잡을 밀어내는 순간](/ai/2026/04/15/claude-code-routines.html)에서도 비슷한 얘기를 했는데, 이제 싸움은 모델 점수보다 작업 환경을 누가 에이전트 친화적으로 재설계하느냐 쪽으로 가고 있다.

{% include pre-version.html %}

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/android-cli-agent-workflow/android-cli-agent-workflow-1-400.webp 400w,
            /static/img/posts/android-cli-agent-workflow/android-cli-agent-workflow-1-800.webp 800w,
            /static/img/posts/android-cli-agent-workflow/android-cli-agent-workflow-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/android-cli-agent-workflow/android-cli-agent-workflow-1.webp"
    alt="Android CLI가 에이전트 개발 흐름을 정리하는 화면"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 왜 Android CLI가 갑자기 중요해졌나

### 에이전트는 GUI보다 명령어를 더 잘 붙잡는다

사람은 Android Studio를 열고 화면을 보면서 감으로 해결한다. SDK가 없으면 팝업을 보고 설치하고, Gradle이 삐지면 링크를 눌러 보고, 에뮬레이터가 안 뜨면 AVD Manager를 뒤진다. 그런데 에이전트한테 이 흐름은 꽤 불친절하다. 화면 상태를 읽고, 버튼 위치를 추측하고, 오래된 문서를 섞어 쓰다가 이상한 Gradle 조합을 만들기 쉽다.

Android CLI는 이 문제를 정면으로 건드린다. Google은 이 도구를 Android 개발의 터미널용 기본 인터페이스라고 설명한다. SDK 설치, 프로젝트 생성, 디바이스 생성, 앱 실행 같은 작업을 명령어로 깔아준다. 에이전트 입장에서는 클릭할 화면이 줄고, 사람 입장에서는 "왜 저기서 헤매지" 싶은 시간이 줄어든다.

이건 꽤 현실적인 변화다. AI 코딩 에이전트가 좋은 코드를 써도 환경 설정에서 막히면 결국 사람이 다시 붙잡아야 한다. 특히 Android는 SDK, AGP, Kotlin, Compose, 에뮬레이터, 기기별 정책이 계속 움직인다. 에이전트가 예전 기억으로 밀어붙이면 바로 낡은 템플릿이 튀어나온다.

### 공식 지식 베이스를 붙인 점이 더 무섭다

이번 발표에서 Android CLI만 보면 절반만 본 거다. 같이 나온 Android Knowledge Base와 Android skills가 핵심이다. Google은 에이전트가 최신 Android 개발자 문서, Firebase, Google Developers, Kotlin 문서를 가져다 쓸 수 있게 만들겠다고 했다. 이건 "모델이 알아서 잘하겠지"가 아니라 "모델이 헛소리하기 쉬운 부분을 공식 문서 표면으로 묶겠다"에 가깝다.

솔직히 이 방향이 맞다. 에이전트가 오래된 Stack Overflow 조합을 끌고 오면 Android 프로젝트는 금방 지저분해진다. 최신 권장 패턴을 매번 사람이 프롬프트에 붙이는 것도 귀찮다. 차라리 플랫폼 주인이 "여기로 물어봐"라고 공식 통로를 주는 게 낫다.

## 3배 빠르다는 말보다 더 중요한 것

### 속도보다 예측 가능성이 먼저다

3배 빠르다는 숫자는 당연히 눈에 띈다. 그런데 실무에서는 속도보다 예측 가능성이 더 중요하다. 에이전트가 오늘은 새 프로젝트를 잘 만들고, 내일은 SDK 버전 하나 때문에 삽질하면 팀은 결국 자동화를 못 믿는다.

Android CLI가 노리는 자리는 여기다. `android sdk install`, `android create`, `android emulator`, `android run`, `android docs` 같은 표면이 생기면 에이전트에게 줄 수 있는 작업 단위가 훨씬 단단해진다.

```bash
android create
android sdk install
android emulator
android run
android docs
```

이거 한번 상상해보면 된다. "Compose 기반 샘플 앱 만들고 Pixel 에뮬레이터에서 실행한 뒤 실패 로그 요약해줘"라는 요청을 던졌을 때, 에이전트가 IDE 화면을 뒤지는 대신 공식 CLI를 순서대로 호출한다. 이 차이는 생각보다 크다. 로그도 남고, CI로 옮기기도 쉽고, 실패 지점도 추적된다.

{% include pre-version.html %}

### Android Studio와 싸우는 도구가 아니다

여기서 오해하면 안 되는 게 있다. Android CLI는 Android Studio를 대체하려는 도구처럼 보이지 않는다. Google도 앱을 CLI로 빠르게 만들고 나서 Android Studio로 열어 시각 편집, 디버깅, 프로파일링을 이어가라고 말한다. 즉 IDE를 버리라는 얘기가 아니라, 에이전트와 스크립트가 시작점을 더 잘 잡게 해주는 쪽이다.

이 구도가 마음에 든다. 개발자는 IDE에서 품질을 올리고, 에이전트는 터미널에서 반복 작업을 줄인다. 둘이 같은 프로젝트 구조와 공식 문서 위에서 만나면 삽질이 줄어든다. 반대로 CLI가 없으면 에이전트는 IDE를 흉내 내거나 Gradle 파일을 감으로 만지는 쪽으로 흐른다. 그게 제일 불안하다.

<picture>
  <source
    type="image/webp"
    srcset="/static/img/posts/android-cli-agent-workflow/android-cli-agent-workflow-2-400.webp 400w,
            /static/img/posts/android-cli-agent-workflow/android-cli-agent-workflow-2-800.webp 800w,
            /static/img/posts/android-cli-agent-workflow/android-cli-agent-workflow-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img
    src="/static/img/posts/android-cli-agent-workflow/android-cli-agent-workflow-2.webp"
    alt="Android CLI와 공식 스킬이 앱 빌드 단계를 연결하는 구조"
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 스킬 생태계까지 같이 보면 그림이 달라진다

### Android skills는 문서가 아니라 작업 규칙이다

이번 발표에서 제일 눈에 들어온 단어는 skills였다. Google은 Navigation 3 설정, edge to edge 지원, AGP 9 마이그레이션, XML에서 Compose로 넘어가는 작업, R8 설정 분석 같은 흐름을 스킬로 제공한다고 했다. 이건 문서 링크 모음이 아니다. 에이전트가 특정 작업을 할 때 따라야 하는 절차를 `SKILL.md` 같은 형태로 패키징하는 흐름이다.

요즘 개발 도구들이 전부 비슷한 방향으로 간다. MCP는 외부 도구 연결을 표준화하고, skills는 팀의 작업 방식을 에이전트가 읽을 수 있는 문서로 만든다. Android CLI는 그 사이에서 플랫폼 작업을 명령어로 고정한다. 세 개가 붙으면 에이전트가 "알아서 해줘"에서 "이 규칙과 이 도구로 해줘"로 바뀐다.

### 모바일 개발팀 입장에서는 CI가 먼저 바뀔 수 있다

내가 당장 기대하는 곳은 로컬 개발보다 CI다. Android 프로젝트 CI는 오래된 캐시, SDK 이미지, 에뮬레이터 부팅, Gradle 설정 때문에 자주 피곤하다. Android CLI가 SDK와 디바이스 관리를 더 예측 가능하게 만들어주면, 에이전트가 실패한 CI 로그를 읽고 재현 환경을 만드는 일도 쉬워진다.

물론 아직 preview라서 바로 프로덕션 파이프라인에 밀어 넣기는 이르다. 그래도 방향은 분명하다. 공식 CLI가 에이전트용 지식 베이스와 같이 나온 순간, Android 개발 자동화는 그냥 "스크립트 몇 개 추가"가 아니라 플랫폼 전략이 됐다.

## 바로 써보기 전에 체크할 것

### 팀 규칙과 충돌하는지 먼저 봐야 한다

Android CLI가 좋아 보여도 팀마다 이미 정해둔 템플릿, 모듈 구조, Kotlin 버전, Compose 규칙, 릴리스 플로우가 있다. 에이전트가 공식 기본값을 너무 세게 믿으면 기존 팀 규칙과 어긋날 수 있다. 그래서 처음부터 전체 앱을 맡기기보다는 샘플 모듈 생성, 문서 검색, 에뮬레이터 실행, 실패 로그 재현 같은 좁은 작업부터 보는 게 낫다.

개인적으로는 이렇게 시작할 것 같다.

| 작업 | 맡겨도 되는 정도 | 이유 |
| --- | --- | --- |
| 새 샘플 프로젝트 생성 | 높음 | 공식 템플릿과 잘 맞음 |
| SDK와 에뮬레이터 준비 | 높음 | 명령어 표면이 분명함 |
| 기존 대형 앱 구조 변경 | 낮음 | 팀 규칙과 충돌 가능 |
| CI 실패 재현 | 중간 | 로그와 환경 고정이 관건 |

### 모바일 앱도 에이전트 친화성이 경쟁력이 된다

웹 쪽은 이미 에이전트가 상대적으로 빨리 붙었다. 파일 구조가 단순하고, 실행이 빠르고, 브라우저 확인도 쉽기 때문이다. Android는 그보다 복잡했다. 그런데 플랫폼 주인이 에이전트용 CLI와 공식 스킬을 주기 시작하면 격차가 줄어든다.

내가 보기엔 이게 이번 발표의 진짜 의미다. Android CLI는 새 장난감이 아니라, 모바일 개발을 AI 에이전트가 다룰 수 있는 작업 단위로 쪼개는 첫 공식 시도에 가깝다. 아직은 preview라서 조심해야 하지만, 방향은 이미 보인다. 앞으로 좋은 Android 개발팀은 좋은 Compose 코드를 쓰는 팀이기도 하겠지만, 에이전트가 헛돌지 않게 작업 표면을 잘 정리한 팀이기도 할 것 같다.
