---
layout: post
title: "수익형 웹사이트 (웹앱)를 개발하거나 GitHub Jekyll 블로그를 만들기 위한 Jekyll 기본 환경 세팅하기"
date: 2023-07-15 00:00:00 +0700 
categories: [jekyll]
---
한달이 조금 넘는 기간 동안 저는 수익형 웹사이트를 개발했고 GitHub 블로그를 몇 년 동안 유지해왔습니다. 수익형 웹사이트에서는 gpt-3.5 API를 사용했고 AI와 채팅하는 웹앱을 개발했습니다. 제가 개발한 웹사이트 링크를 남기겠습니다. [(mbtichat 바로가기)](https://mbtichat.info/){:target="_blank"} 저는 이 웹앱과 GitHub 블로그를 만들면서 느낀 점은 결국 우리는 수익을 창출하기 위해서는 광고를 넣어야 되는데 결국 광고는 구글 애드센스 광고를 넣어야 합니다. 애드센스 광고를 넣기 위해서는 Jekyll을 사용해야 하는데 그 이유 또한 링크를 남기겠습니다. [(수익형 웹 유틸리티 사이트를 만들기 위해 Jekyll을 사용해야 하는 이유)](https://mbtichat.info/2023/06/28/creating-jekyll-utility-website.html){:target="_blank"}

{% include pre-version.html %}

수익형 웹앱이나 수익형 블로그를 만드는 데 있어 여러 가지 방법이 있겠지만 특히 수익형 웹앱의 경우 Jekyll을 사용하는 게 유리하다고 생각합니다. 또한 Jekyll은 블로그를 만들고 운영하기에도 매우 적합한 도구입니다. **이제 우리는 수익형 웹사이트나 GitHub 블로그를 만들기 위한 기본이 되는 Jekyll 환경 세팅을 해보겠습니다.** 이 글을 읽고 똑같이 실습을 한다면 우리는 이 스킬로 수익형 웹사이트나 블로그를 만드는 데 중요한 밑바탕이 되고 정적 웹사이트를 이해하는 데 있어 매우 도움이 될 것입니다.

## 목차
1. Jekyll은 무엇일까?
2. Jekyll 설치

## Jekyll은 무엇일까?
![Yukihiro Matsumoto의 사진](/static/img/posts/web-app-dev-jekyll-enviroment/web-app-dev-jekyll-enviroment-0.jpg)

Jekyll은 간단하고 빠르며 안전한 웹사이트를 구축할 수 있는 인기 있는 `정적 사이트 생성기`입니다. 쉽게 말해 우리가 정적 사이트를 개발할 때 사이트의 규모가 조금이라도 커지면 공통으로 들어가는 요소들 중 하나인 header 부분을 하나하나 전부 페이지에 코드를 입력해야 되는데 **Jekyll은 이 복잡해진 디렉토리 구조를 쉽게 개발할 수 있게 디렉토리 구조와 환경을 제공하고 빌드하여 Jekyll의 디렉토리 구조를 참고하여 정적 사이트 페이지를 하나하나 생성해준다고 생각하면 됩니다.**

GitHub의 공동 창립자인 Tom Preston-Werner가 만들었으며 웹 개발 커뮤니티에서 상당한 인기를 얻었습니다. Jekyll은 Ruby 프로그래밍 언어를 기반으로 제작되었습니다. 그렇기에 우리는 [Ruby 설치](https://moony01.com/ruby/2023/07/13/ruby-install.html){:target="_blank"} 부터 Jekyll 설치, 그리고 웹사이트 개발을 위한 환경 세팅까지 차근차근 알아보겠습니다. 

{% include pre-version.html %}

## Jekyll 설치
Jekyll은 GitHub에서 지원하기 때문에 프로젝트 버전 관리 시스템은 Git으로 관리하는 게 유리합니다. Jekyll의 역할은 정적 사이트 생성기이기 때문에 우선 저장소에 프로젝트를 생성해야겠죠? 우선 Jekyll을 설치하기 전에 GitHub에서 프로젝트를 생성하고 무료로 웹 호스팅하는 방법까지 설명되어 있는 링크를 남기겠습니다. [(Github로 무료 웹호스팅해서 사이트 무한으로 만들고 쉽게 관리하기)](https://mbtichat.info/2023/07/01/create-web-hosting-repo-free-github.html){:target="_blank"}

### 첫번째
![Yukihiro Matsumoto의 사진](/static/img/posts/web-app-dev-jekyll-enviroment/web-app-dev-jekyll-enviroment-1.jpg)

위 링크를 보고 우리의 GitHub 저장소를 생성하고 나의 로컬에 저장소를 Clone 후 개발 환경 세팅을 완료하고 코드 편집기(Visual Studio Code)를 실행시킨 후 Ctrl+Alt+T를 눌러 TERMINAL을 활성화해줍니다. 우리는 TERMINAL을 통해 Jekyll과 Bundler를 설치할 것입니다.

### 두번째
![Jekyll과 Bundler 설치 후 Jekyll 기본 테마 설치](/static/img/posts/web-app-dev-jekyll-enviroment/web-app-dev-jekyll-enviroment-2.jpg)

이제 [Jekyll 홈페이지](https://jekyllrb-ko.github.io/){:target="_blank"}에 접속하면 메인 페이지에 바로 `빠른 시작 방법`이 나와있습니다. 위 명령어를 우리의 TERMINAL에 입력하면 사실상 끝입니다. 입력하기 전에 명령어들을 간단하게 알아볼까요?

```shell
gem install bundler jekyll
jekyll new my-awesome-site
cd my-awesome-site
bundle exec jekyll serve
# => 브라우저로 http://localhost:4000 에 접속
```
#### 1. gem install bundler jekyll
gem을 이용해 bundler와 jekyll을 설치하겠다는 명령어입니다. Jekyll이 정적 사이트 생성기라는 것은 알겠는데 gem과 bundler는 무엇일까요? [gem과 bundler 자세히 알아보기](https://mbtichat.info/2023/07/04/difference-between-bundle-gem-explained.html){:target="_blank"}

> gem이란? Ruby에서 제공하는 패키지를 설치하고 삭제해주는 관리자 역할입니다.

> bundler란? 프로젝트에 필요한 Ruby 패키지들을 그룹화하고 의존성을 해결하는 역할을 합니다.

#### 2. jekyll new my-awesome-site
Jekyll 프로젝트를 생성하는 명령어입니다.

#### 3. cd my-awesome-site
my-awesome-site로 경로를 이동합니다.

#### 4. bundle exec jekyll serve
그룹화된 bundle을 설치하고 jekyll 서버를 실행합니다.

### 세번째
![gem install bundler jekyll](/static/img/posts/web-app-dev-jekyll-enviroment/web-app-dev-jekyll-enviroment-3.jpg)

명령 프롬프트에서 `gem install bundler jekyll`을 입력하여 bundler와 jekyll을 설치합니다.

### 네번째
![jekyll new my-awesome-site](/static/img/posts/web-app-dev-jekyll-enviroment/web-app-dev-jekyll-enviroment-4.jpg)

다음은 프로젝트 안에 새로운 jekyll 프로젝트를 생성해줍니다.

{% include pre-version.html %}

### 다섯번째
![jekyll 프로젝트 파일 상위폴더로 이동](/static/img/posts/web-app-dev-jekyll-enviroment/web-app-dev-jekyll-enviroment-5.jpg)

![jekyll 프로젝트 파일 상위폴더로 이동 알림창](/static/img/posts/web-app-dev-jekyll-enviroment/web-app-dev-jekyll-enviroment-6.jpg)

jekyll에서 제공한 빠른 시작 방법과 다르게 우리는 이미 디렉토리를 만든 상태이기 때문에 우리가 생성한 jekyll 프로젝트(my-awesome-site)의 파일들을 마우스 드래그를 이용하여 전부 상위 폴더(MOONY1201.GITHUB.IO)로 이동시켜주겠습니다.

![jekyll 프로젝트 파일 상위폴더로 이동 완료상태](/static/img/posts/web-app-dev-jekyll-enviroment/web-app-dev-jekyll-enviroment-7.jpg)

이제 우리는 `index.markdown` 파일을 메인 페이지로 사용할 거기 때문에 위에 표시된 `index.html` 파일은 삭제해줍니다.

### 여섯번째
![bundle exec jekyll serve](/static/img/posts/web-app-dev-jekyll-enviroment/web-app-dev-jekyll-enviroment-8.jpg)

이제 `bundle exec jekyll serve` 명령어를 입력하여 우리가 설치한 jekyll 기본 테마 그대로의 프로젝트를 가지고 서버를 실행시킨 후 명령 프롬프트 하단에 `http://127.0.0.1:4000/`에 마우스 커서를 올린 후 Ctrl + 마우스 클릭을 해서 브라우저 창을 띄워줍니다.

그런데 제가 실행시킨 명령어의 결과에는 경고 문구가 뜨는데 무시해도 좋습니다. 그래도 위 경고 문구를 간단하게 짚고 넘어가보겠습니다.

```shell
Deprecation Warning: Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.
Recommendation: math.div($spacing-unit, 3) or calc($spacing-unit / 3)
More info and automated migrator: https://sass-lang.com/d/slash-div
```

위 경고 문구는 bundle에서 관리하고 Ruby에서 제공하는 패키지인 Dart Sass에서 제공하는 기능인 `/` 연산자를 `calc()` 함수 밖에서 사용하여 나눗셈을 수행하는 것이 잘못되었으며, 추후 버전에서는 지원되지 않을 것이라고 알려주고 있습니다. 지금 당장은 문제가 없지만 `Dart Sass` 패키지를 설치하여 Sass 기능을 사용하고 있다면 나중을 위해 코드를 수정하던지 다른 Sass 패키지를 사용할 것을 권장합니다. 하지만 지금 당장은 문제가 없으니 일단 넘어가겠습니다.

{% include pre-version.html %}

### 마지막
![기본 Jekyll 테마 적용 확인](/static/img/posts/web-app-dev-jekyll-enviroment/web-app-dev-jekyll-enviroment-9.jpg)

서버를 실행시킨 후 명령 프롬프트 하단에 `http://127.0.0.1:4000/` URL을 클릭하여 브라우저 창을 띄워 확인해본 결과 정상적으로 jekyll 기본 테마가 설치되고 잘 빌드된 것을 확인할 수 있습니다.

- - -

이제 우리는 어떻게 Jekyll 환경을 세팅하는지 알았으니 이걸 응용하여 Jekyll 블로그 테마를 적용하거나 우리만의 정적 웹사이트를 만들 수도 있겠습니다. 특히 블로그 테마의 경우는 테마를 다운받아 우리 프로젝트에 붙여넣기만 하면 끝입니다. 붙여넣고 서버를 실행하는 과정에서 에러가 발생할 수 있지만 거의 bundle에 설치된 패키지 버전이 안 맞는다거나 설치가 안 되어 있다는 에러일 것입니다. 이 경우는 그냥 설치하고 버전 업데이트만 해주면 해결되는 문제입니다.