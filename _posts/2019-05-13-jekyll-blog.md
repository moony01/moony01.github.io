---
layout: post
title:  "윈도우에서 루비를 이용하여 지킬설치 및 블로그 생성하기"
# date:   2019-05-13 18:34:10 +0700
date:   2019-05-13 00:00:00 +0700
redirect_from:
  - /common/jekyll/2019/05/12/jekyll-blog.html
categories: [jekyll]
---
필자는 지킬 기반 블로그를 생성후 깃허브 상에서 바로 수정하며 작업을 진행했다. 이 과정에서 많은 불편함을 느꼈고 로컬에서 먼저 적용하고 미리보기를 수행하면 편리하겠다는 생각을했다. 당연히 로컬작업을 거치고 서버로 push하는 작업환경을 구축했어야했다.  

## 이 글의 순서입니다.
1. 루비설치하기
2. 루비를 이용하여 지킬설치하기
3. 로컬에서 블로그 생성하기

## 루비설치하기
루비 인스톨러 다운로드 페이지에서 Ruby+Devkit 2.5.5-1 (x64) 개발자킷 설치 프로그램을 다운로드 후 설치합니다.

![ruby_install](https://user-images.githubusercontent.com/36956285/57759671-5be1af80-7735-11e9-88dd-b9b86dd87aa9.PNG)

## 루비를 이용하여 지킬설치하기
루비 설치를 완료하면 이제 윈도우 검색창에서 Ruby를 검색 후 Start Command Prompt with Ruby를 실행하여 지킬을 설치합니다. 지킬패키지 외에도 필요한 패키지를 설치해야합니다.   

![ruby_running](https://user-images.githubusercontent.com/36956285/57896705-fe607680-788c-11e9-9027-a399e529e13e.PNG)

아래 패키지들을 모두 설치합니다.

<pre class="highlight">
    <code>
    gem install jekyll
    gem install minima
    gem install bundler
    gem install jekyll-feed
    gem install tzinfo-data
    </code>
</pre>

## 로컬에서 블로그 생성하고 열기
지킬을 설치했다면 원하는 디렉토리에 블로그를 생성해야합니다.
<pre class="highlight">
    <code>
    // 1. 블로그를 설치할 디렉토리로 이동합니다.
    cd C:\github

    // 2. 원하는 디렉토리로 이동했다면 블로그를 설치합니다.
    // 아래 코드로 블로그를 설치하면 지킬의 기본테마 블로그로 설치가됩니다.
    jekyll new username.github.io
    </code>
</pre>

이제 로컬 브라우저에서 블로그를 열수가있습니다. 다시 아래와 같이 이동합니다.

<pre class="highlight">
    <code>
    cd C:\github\username.github.io
    </code>
</pre>

이동 후 지킬을 이용하여 로컬에서 블로그를 띄워야하는데요 방법은 아래와같습니다.
<pre class="highlight">
    <code>
    bundle exec jekyll serve
    // 를 실행 후 encoding error가 발생하면 아래 코드를 작성합니다.

    chcp 65001
    // 인코딩에러 코드!
    </code>
</pre>

이제 정상적으로 지킬서버가 실행되면 아래와같은 결과가나온다

![jekyll serve](https://user-images.githubusercontent.com/36956285/57905124-6d9b9200-78b0-11e9-8733-f5440dc99551.PNG)

위사진에 빨간표시와같이 서버주소가 표시되는데요 이제 *http://127.0.0.1:4000/* 로 접속하면됩니다.
<hr />

### 지킬블로그를 만들면서 느낀점.
위 포스트와같이 로컬세팅이 물흐르듯 완료되면 참 좋겠지만, 사실 지킬블로그를 로컬에 세팅하는건 참 여려가지 변수가 많았다. 위 포스트의 경우는 로컬에서 직접 기본테마블로그를 사용하여 로컬에 띄운거지만 필자의 경우 혹은 많은 지킬블로그 사용자들은 디자인되어있는 지킬블로그 테마를 가져와 사용할거다.


우선 기본테마블로그의 경우 생각외로 많은 gem 패키지가 필요로하지않다. 하지만 디자인테마 블로그의 경우 위 패키지를 설치한거와 같이 많은 패키지가 설치되어있어 로컬에서 블로그를 실행하려한다면 jekyll, bundler, minima 등등의 패키지 버전 에러가 심심치않게 많이 난다.


필자는 에러 피드백 메세지를 검색하며 문제를 해결했다. 이 문제의 결론은 블로그 gem파일의 버전세팅 코드를 나의 로컬 패키지 버전이랑 맞추는건데 이 부분은 추후에 포스팅하기로하겠다.


아무튼 지킬블로그를 세팅하고 꾸미는데에는 생각보다 많은 지식이필요로하고 특히 필자와같은 비전공자나 비개발자의 경우는 참 이용하기 힘든 블로그라 생각한다.이제 설치를 하였지만 블로그의 세세한부분을 수정하기위해서는 프로젝트의 데이터 흐름이라던지 루비문법등등 생각보다 알아야할게 많다.

----------------
