---
layout: post
title: "Windows에서 프로그래밍 언어 Ruby 설치하고 Ruby의 역사에 대해 간략하게 알아보자"
date: 2023-07-14 00:00:00 +0700
categories: [ruby]
---

Jekyll 블로그나 웹 앱을 개발하기 위해서는 Jekyll의 기반이 되는 언어인 Ruby 설치가 필수입니다. 차례대로 차근차근 설치를 진행하겠습니다. 그 전에 우리가 쓰는 Ruby라는 프로그래밍 언어가 누가 만들었는지, 어떤 역사를 가지고 있는지 간단하게 알아보고 설치 방법에 대해 설명하겠습니다. 차근차근 따라와주세요. **(Ruby 설치만 보고 싶으신 방문자분들께서는 목차 2번으로 바로 넘어가세요.)**

---

## 목차
1. Ruby의 역사
2. Ruby 설치 차근차근 따라하기

## Ruby의 역사
Ruby는 1990년대 중반 `Yukihiro Matsumoto`가 만든 동적 객체 지향 프로그래밍 언어입니다. Ruby의 첫 공개 버전인 0.95 버전은 1995년 12월에 전 세계에 발표되었으며 주로 Matsumoto가 있는 일본에서 인기를 얻었습니다. 그치만 유연성 및 강력한 기능 등의 장점으로 인해 전 세계적으로 빠르게 퍼졌습니다. 그렇게 Ruby는 개발자들에게 인기를 얻고 발전을 반복하여 2005년 Ruby로 작성된 대중적인 웹 애플리케이션 프레임워크인 `Ruby on Rails`가 출시되었습니다.

![Yukihiro Matsumoto의 사진](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-0.jpg)

그리고 현재 Ruby의 최신 안정 릴리스는 **2023년 3월 30일에 출시된 Ruby 3.2.2이며 Ruby 3.2.2는 새로운 가상 머신(MJIT), 향상된 성능 및 향상된 동시성 기능을 포함하여 CVE-2023-28755: URI의 ReDoS 취약점, CVE-2023-28756: Time의 ReDoS 취약점 등 몇 가지 주목할 만한 기능을 도입했습니다.** Ruby는 우아하고 읽기 쉬운 구문, 개발자 친화적인 커뮤니티, 개발자 행복과 생산성에 중점을 둔 것으로 개발자들 사이에서 평가받고 있으며 웹 개발에서 스크립팅 및 시스템 관리에 이르기까지 다양한 도메인에서 계속 널리 사용되고 있습니다.

## Ruby 설치 차근차근 따라하기

### 첫 번째
우선 Ruby 설치를 위해 아래 링크를 클릭하여 Ruby 홈페이지로 접속하겠습니다.

> **링크:** [Ruby 다운로드 페이지](https://www.ruby-lang.org/){:target="_blank"} <- 클릭

### 두 번째
![Ruby 홈페이지 접속 후 Ruby 다운로드 버튼 클릭](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-1.jpg)

다운로드 페이지로 접속했으면 `[Ruby 다운로드]` 버튼을 클릭합니다.

### 세 번째
![Ruby 다운로드 페이지로 이동하기 위해 RubyInstaller 링크 클릭](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-2.jpg)

아래 이미지에서 **"Windows에서는 `RubyInstaller`를 사용할 수 있습니다."**에서 `RubyInstaller`를 클릭하여 Ruby 다운로드 페이지로 이동합니다.

### 네 번째
![다운로드 페이지에서 download 버튼 클릭](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-3.jpg)

![installer with devkit 다운로드](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-4.jpg)

`[Download]` 버튼을 클릭해서 다음 Downloads 페이지에 들어간 후 WITH DEVKIT에서 가장 최신 버전을 다운로드합니다. 64bit, 32bit 중 아무거나 설치해도 되는데 **Jekyll이 기존에 설치되어 있다면 Jekyll과 같은 bit로 설치하면 됩니다.**

### 다섯 번째
![installer 파일 다운로드 확인](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-5.jpg)

installer 다운로드를 완료했다면 컴퓨터에 설치하겠습니다.

### 여섯 번째
![Setup 라이선스 동의](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-6.jpg)

"I accept the License"를 클릭한 후 [Next] 버튼을 클릭합니다.

### 일곱 번째
![Installation Destination and optional Tasks](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-7.jpg)

이미지에서 강조된 부분의 체크박스 두 개를 선택한 후 [Install] 버튼을 클릭합니다.

### 여덟 번째
![컴포넌트 선택](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-8.jpg)

두 개의 체크박스를 선택한 후 [Next] 버튼을 클릭합니다.

### 아홉 번째
![컴포넌트 선택](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-9.jpg)

"Run 'ridk install' to set up MSYS2 and development toolchain, MSYS2 is required to install gems with C extensions." 체크박스를 선택한 후 [Finish] 버튼을 클릭합니다.

### 열 번째
![컴포넌트 선택](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/ruby-install/ruby-install-10.jpg)

```
ruby -v
```

이제 Ruby 커맨드 창이 나타납니다. 추가적인 설명은 필요하지 않고, 그냥 Enter를 누르고 MSYS2를 설치한 후 작업을 마무리합니다. 설치가 완료되면 "ruby -v"를 커맨드 창에 입력하고 Enter를 눌러 Ruby가 정상적으로 설치되었는지 확인합니다.

---

Ruby 언어는 GitHub가 지원하는 Jekyll의 기반이 되는 언어입니다. 간단한 사이드 프로젝트나 GitHub 블로그 운영 등에 Jekyll은 많이 사용되므로 개발자라면 한 번쯤 접하게 되는 언어입니다. 자세한 내용은 아니더라도 Ruby, Jekyll, [Bundle과 Gem의 차이점](https://mbtichat.info/2023/07/04/difference-between-bundle-gem-explained.html){:target="_blank"} 등을 어느 정도 알고 있다면 환경 설정과 프로젝트 구조에 대한 이해가 빠를 것입니다.
