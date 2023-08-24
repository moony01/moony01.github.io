---
layout: post
title: PWA로 앱 개발 안하고 나의 웹사이트를 앱으로 만드는 방법
date: 2023-08-23 00:00:00 +0700 
categories: [browser]
---
나는 이전에 웹앱 개발을 하면서 앱으로도 출시하고자 웹뷰를 선택했다. 그런데 어느날 자료를 찾기 위해 구글링을 하다가 PWA(Progressive Web App)라는 기술을 이용해서 블로그를 앱으로 다운로드 받는 기술이 있는게 아닌가, 그래서 다른 자료들을 보고 적용하긴 했지만 크롬이 아닌 다른 브라우저에서는 동작을 안한다거나 하는 등 문제가 많았다. 그래서 이번 기회에 제대로 알아보기로했다.

![PWA(Progressice Web App)](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/progressive-web-app/progressive-web-app-3.webp)

## 목차
1. PWA(Progressice Web App)이란 무엇인가?
2. PWA(Progressice Web App)를 구현하기위해 알아야 할 기본 지식과 자료
3. 내 홈페이지(프로젝트)에 구현해보기
4. 마무리

## PWA(Progressice Web App)이란 무엇인가?
PWA(Progressice Web App)는 2016년에 구글이 발표한 기술이다. **PWA는 쉽게말해 내가 만든 웹사이트를 네이티브 앱 수준으로 사용자가 다운로드 받아서 사용할 수 있는 기술이다.** 웹 페이지를 모바일에도 사용 가능하게 반응형으로 디자인하고 PWA를 적용하면 웹, 앱 전부 사용자에게 재공이 가능하다. 그럼 PWA기술로 구글 플레이 스토어, 앱 스토어에 출시할 수 있을까?

<!-- progressive-web-app -->
<div>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8955182453510440"
     data-ad-slot="3893232373"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
</div>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

쌉가능인듯하다. 아직 구현해보진 않았지만 구글에 많은 자료들이 있는거보니 가능할듯하다. PWA는 웹개발자들에게 엄청난 이점을 가져다 줄 기술인듯하다. 이미 스포티파이, 스타벅스, 트위터 등이 이 기술을 적용시켰다. 웹개발자라면 트랜드를 빠르게 따라가보자.

## PWA(Progressice Web App)를 구현하기위해 알아야 할 기본 요건과 자료
일단 PWA에대해 정석대로 공부하고자 한다면 [https://web.dev/progressive-web-apps/](https://web.dev/progressive-web-apps/){:target="_blank"} 이곳의 문서를 정독 해보길 추천한다. 그 외에도 `nextjs`, `워드프레스`, 내가 사용하는 깃허브 블로그의 `지킬` 등 여러 환경에서의 플러그인도 잘 갖춰진듯하다.

PWA를 구현하기 위해선 3가지가 꼭 필요하다
1. HTTPS
2. Service Worker(서비스 워커)
3. Manifest(매니페스트)

### HTTPS
PWA는 HTTPS 도메인 환경의 사이트에서만 구현이 가능하다. 아무래도 보안이나 신뢰할 수 있는 사이트에서만 기능을 제공하겠다는거같다. 그도 그럴것이 서비스 워커에대해 알아보면 납득이 간다.

### Service Worker(서비스 워커)
Service Worker는 오프라인, 인터넷이 연결되어있지 않은 환경에서도 앱이 작동 가능하도록하는 기술이다. 백그라운드에서 실행되는 Javascript 파일 형태의 스크립트인데 오프라인에서도 웹이 동작할 수 있도록 네트워크 요청을 가로챈다. 네트워크 요청을 가로챈다는것은 보안에 취약하기때문에 더욱이 HTTPS 연결을 해야하는 이유가 된다.

### Manifest(매니페스트)
이녀석은 PWA기술로 앱을 설치할때 앱의 정보 즉 이름이나 앱 아이콘 이미지 등을 알려주는 JSON파일이다.

<!-- progressive-web-app -->
<div>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8955182453510440"
     data-ad-slot="3893232373"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
</div>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 내 홈페이지(프로젝트)에 구현해보기
우리는 실제로 PWA를 구현하기 위해 다음 단계를 거칠것이다.
1. PWA 업데이트 알림을 구현
2. Service Worker(서비스 워커) 등록
3. Manifest(매니페스트) 등록

### PWA 업데이트 알림을 구현
내 홈페이지가 https환경이라는 가정하에 진행해보겠다. 우선 새로운 버전의 Progressive Web App을 사용할 수 있을 때 이를 알리고 업데이트하도록 돕는 알림을 구현하기 위해 index.html 파일의 head영역에 아래 코드를 삽입해야한다.

```html
<script type="module">
    import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate'; // PWA 업데이트 알림을 구현하기 위한 라이브러리
    const el = document.createElement('pwa-update'); // PWA 업데이트 알림을 처리하고 표시하는 역할을 하는 <pwa-update> 요소를 동적으로 생성
    document.body.appendChild(el); //<pwa-update> 요소를 문서의 <body> 요소에 추가 
</script>
```

### Service Worker(서비스 워커) 등록
다음은 서비스 워커를 등록해볼것이다. 사용자가 오프라인으로 앱에 접속할때 중간에 네트워크 요청을 가로채서 오프라인 페이지를 표현하는 기능이나 알림 기능을 구현할 수 있다. 서비스 워커가 등록되면, 해당 스크립트가 실행되어 웹 애플리케이션의 네트워크 요청을 관리하고 캐싱하는 작업을 수행합니다. 역시 index.html 파일의 head영역에 추가해보자

```js
document.addEventListener("DOMContentLoaded", function() { //페이지가 로드할때 아래 코드를 실행
    if ("serviceWorker" in navigator) { //브라우저가 서비스 워커를 지원하는지를 확인하는 조건문
        navigator.serviceWorker.register("/pwabuilder-sw.js"); //서비스 워커를 등록하는 코드
    }
});
```

아래 코드는 pwabuilder-sw.js 코드이다. `offlineFallbackPage`변수에서 인터넷을 연결 안했을 시 로드하는 페이지명을 지정할 수 있다. pwabuilder-sw.js파일은 [https://www.pwabuilder.com/](https://www.pwabuilder.com/){:target="_blank"} 홈페이지에서 공식 코드를 받을 수 있다.

```js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";
const offlineFallbackPage = "offline.html"; // <-인터넷을 연결 하지 않고 앱 접속시 표시해주는 파일

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
```
<!-- progressive-web-app -->
<div>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8955182453510440"
     data-ad-slot="3893232373"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
</div>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음은 `offline.html` 파일을 생성해자 인터넷을 연결하지 않고 앱 접속 시 로드시킬 html파일이다. 그리고 코드 아래 이미지처럼 파일을 생성해주자
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>internet disconnected</title>
</head>
<body>
    <P>인터넷 연결 없음</P>
</body>
</html>
```
![PWA(Progressice Web App)](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/progressive-web-app/progressive-web-app-1.webp)

### Manifest(매니페스트) 등록
다음은 실제 앱의 정보를 나타내는 Manifest 파일을 등록하고 똑같이 head 영역에서 로드해보자 `offline.html` 파일과 같은 최상단 path에 Manifest.json 파일을 등록하자 아래 코드의 자세한 내용은 공식문서 [https://web.dev/add-manifest/](https://web.dev/add-manifest/){:target="_blank"} 에서 확인해보자.

```json
{
  "short_name": "Weather",
  "name": "Weather: Do I need an umbrella?",
  "icons": [
    {
      "src": "/images/icons-vector.svg",
      "type": "image/svg+xml",
      "sizes": "512x512"
    },
    {
      "src": "/images/icons-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "id": "/?source=pwa",
  "start_url": "/?source=pwa",
  "background_color": "#3367D6",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#3367D6",
  "shortcuts": [
    {
      "name": "How's weather today?",
      "short_name": "Today",
      "description": "View weather information for today",
      "url": "/today?source=pwa",
      "icons": [{ "src": "/images/today.png", "sizes": "192x192" }]
    },
    {
      "name": "How's weather tomorrow?",
      "short_name": "Tomorrow",
      "description": "View weather information for tomorrow",
      "url": "/tomorrow?source=pwa",
      "icons": [{ "src": "/images/tomorrow.png", "sizes": "192x192" }]
    }
  ],
  "description": "Weather forecast information",
  "screenshots": [
    {
      "src": "/images/screenshot1.png",
      "type": "image/png",
      "sizes": "540x720",
      "form_factor": "narrow"
    },
    {
      "src": "/images/screenshot2.jpg",
      "type": "image/jpg",
      "sizes": "720x540",
      "form_factor": "wide"
    }
  ]
}
```

Manifest.json 파일을 생성했으면 이제 head영역에서 파일을 로드시켜보자
```html
<link rel="manifest" href="manifest.json" />
```

![PWA(Progressice Web App)](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/progressive-web-app/progressive-web-app-2.webp)

여기까지 완료했으면 위 이미지처럼 앱 다운로드 버튼이 활성화 되고 버튼을 클릭하면 다운 받을수있는 팝업창이 뜬걸 확인할 수 있다. PWA를 구현했지만 위 이미지의 버튼의 존재를 알고있는 사용자가 얼마나있을까? 라는ㄴ앱을 다운로드 받을수 있게 사용자 인터페이스를 향상 시킬 수 있다.

<!-- progressive-web-app -->
<div>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8955182453510440"
     data-ad-slot="3893232373"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
</div>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 마무리
PWA를 구현해보고 느낀점은 아직 모든 브라우저와 버전에 호환이 되지 않는다는 단점(예를 들어 Firefox)가 있다. 참고로 현재 PWA기술에서는 ios 즉 사파리 브라우저에서도 호환이 가능하다. 또 모바일에서 카카오톡 등 웹뷰로 바로 연결되는 환경에서도 호환되지 않는다.(방법이 있을수도있음..) 다음 PWA 포스팅을 하게된다면 홈페이지 안에 버튼을 생성해서 앱을 다운로드 받는다거나 PWA의 단점 등을 다뤄보겠다.