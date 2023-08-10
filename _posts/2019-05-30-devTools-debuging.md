---
layout: post
title:  "크롬개발자도구로 효율적으로 디버깅하는방법"
date:   2019-05-30 00:00:00 +0700
redirect_from:
  - /common/tools/2019/05/29/devTools-debuging.html
categories: [browser]
---
저는 과거에 프론트앤드 업무중 디버깅을 할때 개발자들 대부분이 사용하는 `console.log()`, `alert()` 를 코드소스 중간중간 끼워넣으며 상태를 출력, 변수를 모니터링 했습니다. 위 방법은 간단한 오류에서는 괜찮은 방법일 수 있으나 다른 라이브러리를 로드하거나 문서를 읽는 과정에서 발생하는 오류가 복잡하게 꼬여버린다면 매번 위 방법으로 하는건 엄청난 노가다이며 효율적이지 못합니다. 그래서 브라우저 개발자도구를 적극활용하여 효율적으로 디버깅하는 방법을 포스팅해봅니다.

## 목차
1. 디버깅, 크롬 개발자도구란?
2. 자바스크립트 디버깅 라이브러리를 사용하지 않은 순수 자바스크립트(Vanilla JS) 사용 예제
  
이 글에서는 **1번 디버깅, 크롬 개발자도구**를 알아보고 **2번 basic편**을 포스팅하겠습니다.

----

{% include pre-version.html %}

## 1. 디버깅, 크롬 개발자도구란?
### 디버깅이란?
![debug_01](https://user-images.githubusercontent.com/36956285/58610034-fa990f00-82e4-11e9-95b0-fbeb223b0913.PNG)

버그란 1945년 프로그래밍 언어 COBOL의 개발을 주도한 [그레이스 호퍼](https://ko.wikipedia.org/wiki/%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%8A%A4_%ED%98%B8%ED%8D%BC)가 Mark ll의 오작동 원인을 찾는중 컴퓨터에 나방이 껴있는걸 발견한 것을 최초 버그라고 기록되어있다고 합니다. **프로그래밍, 개발중 오작동, 오류가 발생한것을 버그**라고하고 이 **버그를 해결하는것을 디버깅**이라고 합니다.

### 크롬 개발자도구란?
단어 그대로 크롬브라우저에 내장되어있는 개발자도구라고 보면되겠습니다. 개발자도구로 많은것을 할수있는데 **웹 어플리케이션을 개발하고 수정/최적화하는데 필요한 다양한 기능을 제공**합니다.**자바스크립트 디버깅뿐 아니라 모바일 기기 시뮬레이터, 네트워크 분석, 최적화에 대해 검사**도 해줍니다. 포스팅에는 `Elements`, `Console`, `Sources` 패널에대해 알아보겠습니다.

---

## 2. 자바스크립트 디버깅
![debug_02](https://user-images.githubusercontent.com/36956285/58680157-81abbd00-83a1-11e9-8fe8-d9990498ecd4.PNG)

우선 실습을 위해 [https://github.com/subicura/javascript-debugging-example](https://github.com/subicura/javascript-debugging-example) 에서 다운로드 합니다. 그리고 실습을 위해 [Node.js](https://nodejs.org/)를 설치하여 서버세팅을 하고 `npm install`과 `npm start` 명령어를 입력하여 3000번 포트로 웹서버를 실행시킵니다. 크롬으로 웹서버 실행 후 http://localhost:3000/vanilla.html 에 접속합니다. 

![debug_03](https://user-images.githubusercontent.com/36956285/58680337-5aa1bb00-83a2-11e9-804a-8e24b74b3b3c.PNG)

위 화면에서 `name`, `message`의 `input` 과 `textarea`영역에 값을 입력하고 `submit`버튼을 클릭했을때 제가 원하는 결과값은 **message_test**가 위에나오고 **name_test**가 아래에 나오는걸 기대했지만 실행결과는 그 반대로 나오는걸 확인할 수 있습니다. 이제 원하는 결과값으로 나오게 하기위해 **디버깅**을 통하여 수정해보도록 하겠습니다.

### 1. Breakpoints(중단점 걸기)

원하는 결과값으로 수정하기 위해서는 이벤트가 발생하는 시점에 **breakpoints**를 걸어 데이터가 코드로부터 어떻게 반응하고 데이터가 어디로 어떻게 전송되는지 확인해야합니다. 중단점을 특정 이벤트에 부여할수는 있지만 만약 코드가 복잡하거나 자신에게 익숙하지 않은 코드라면 직접 부여하기가 쉽지 않을것입니다.

{% include pre-version.html %}

하지만 크롬 개발자도구에는 글로벌한 이벤트에 대하여 중단점을 만들 수 있는 기능이 있습니다. 위 예제의 경우 `submit` 이벤트에 중단점을 생성해야합니다. 아래 이미지처럼 이벤트 중단점에 체크해줍니다.

![debug_04](https://user-images.githubusercontent.com/36956285/58681002-59be5880-83a5-11e9-8d4c-6492255f25dd.PNG)

#### 순서
1. 크롬 개발자도구
2. Sources
3. Event Listener Breakpoints
4. Control
5. Submit <- **체크!**

체크를 완료했으면 값을 입력하여 `submit`버튼을 클릭하여 이벤트를 실행시켜줍니다.

![debug_05](https://user-images.githubusercontent.com/36956285/58681535-c2a6d000-83a7-11e9-92b6-4e92a5352d62.PNG)

이벤트를 실행시켜보니 `vasilla-script.js` 파일의 `15Line`에 코드의 흐름이 중단되는걸 볼 수 있습니다.

만약에 어떤 파일의 어떤 함수를 수정해야할지 모르는 상태에서 `submit` 이벤트가 발생한다 추측했을때 위처럼 `breakpoint`를 잡는 방법은 정말 괜찮은 방법인것같습니다.

<br  />

### 2. Step(단계별 코드실행)
 
코드를 한줄 한줄 단계별로 실행했을때 스크립트가 어떻게 실행되는지, 변수가 어떻게 저장되어 있는지 확인해볼 수 있습니다. 개발자도구에서 중단점인 `15line` 의  `e.preventDefault();` 코드부터 `Step over next function call` ![](https://subicura.com/assets/article_images/2018-02-14-javascript-debugging/step-over.png) 버튼을 클릭해봅니다.

![image](https://user-images.githubusercontent.com/36956285/58685571-2b497900-83b7-11e9-9dc8-b592f304f8cd.png)

`Step over next function call` 버튼을  `updatePost` 함수까지 실행시켜봤을때 디버깅 정보창의 `Scope` 섹션에서는 현재 시점의 변수값을 확인해볼 수 있습니다. 확인해보니 `name` 과 `message` 변수는 정상적으로 할당되어있는걸 확인할 수 있습니다. 

![image](https://user-images.githubusercontent.com/36956285/58683438-5cbe4680-83af-11e9-9ab6-c5bfe9d491e7.png)

그럼 이제 `updatePost` 함수를 자세히 살펴보겠습니다. `updatePost`함수에서 `Step into next function call` ![](https://subicura.com/assets/article_images/2018-02-14-javascript-debugging/step-into.png)을 클릭하여 `updatePost` 함수로 이동합니다. `updatePost` 함수를 단계별로 또 실행해보니 `PostHtml`에 이름과 메시지가 반대로 들어간 것을 알 수 잇습니다.

<br  />

### 3. 콘솔창에서 테스트 해보기
아래 이미지의 순서대로 `console`창에서 실행해봅니다.

![image](https://user-images.githubusercontent.com/36956285/58686204-238ad400-83b9-11e9-8517-67a95d2abe8d.png)

1. `postHtml` = 입력하면 1번처럼 값이 나옵니다.

2. `copy(postHtml)` = 이제 수정해야할 아래 `postHtml`값의 코드를 복사해줍니다.

```html
<blockquote class="blockquote text-center">
  <p class="mb-0">nameTest_02</p>
  <footer class="blockquote-footer">messageTest_03</footer>
</blockquote>
```

{% include pre-version.html %}

3. 코드를 입력하여 `postHtml` 값의 코드를 수정해줍니다. 수정이 끝났으면 남은 `submit` 이벤트를 ![](https://subicura.com/assets/article_images/2018-02-14-javascript-debugging/resume-script-execution.png) 클릭하여 실행합니다.


```html
<blockquote class="blockquote text-center">
  <p class="mb-0">messageTest_03</p>
  <footer class="blockquote-footer"> nameTest_02</footer>
</blockquote>
```
![image](https://user-images.githubusercontent.com/36956285/58687053-7b2a3f00-83bb-11e9-933e-fc06c94e65c9.png)

그 결과 `message` 텍스트가 위로 `name` 텍스트가 아래로 바뀐것을 확인할 수 있습니다.

4. 소스창에서 테스트해보기

![image](https://user-images.githubusercontent.com/36956285/58687213-fd1a6800-83bb-11e9-8ffc-2c7870cc2d9c.png)

소스창에서 테스트하는방법은 더 간단합니다. 그냥 디버깅을 9Line까지 실행하였다면 위 이미지에 표시되어있는 코드를 바꿔주면 끝입니다.

---

해당 포스팅은 **subicura**님의 [https://github.com/subicura/javascript-debugging-example](https://github.com/subicura/javascript-debugging-example) 의 오픈소스로 예시를 통하여 포스팅 하였으며 저는 [https://subicura.com/2018/02/14/javascript-debugging.html](https://subicura.com/2018/02/14/javascript-debugging.html) 포스팅을 통하여 스터디를 하였습니다.
