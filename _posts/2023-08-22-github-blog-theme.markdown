---
layout: post
title: 깃허브 블로그에 테마 적용하기
date: 2023-08-22 00:00:00 +0700 
categories: [github]
---
저는 약 한달전에 [수익형 웹사이트 (웹앱)를 개발하거나 GitHub Jekyll 블로그를 만들기 위한 Jekyll 기본 환경 세팅하기](https://mbtichat.info/){:target="_blank"} 에대해 포스팅을 했습니다. 우리는 나의 Github 계정에 개인 블로그를 생성하고 기본 테마를 세팅했다면 이번에는 기본테마 파일들을 싹 다 지우고 새로운 테마를 적용해보겠습니다.

<!-- github-blog-theme -->
<div>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8955182453510440"
     data-ad-slot="8486981875"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
</div>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 목차
1. 깃허브 지킬 블로그 테마 사이트 소개
2. 테마 설치
3. 테마 세팅

## 깃허브 지킬 블로그 테마 사이트 소개
1. [http://jekyllthemes.org/](http://jekyllthemes.org/){:target="_blank"}
2. [https://jekyll-themes.com/free](https://jekyll-themes.com/free){:target="_blank"}
3. [http://themes.jekyllrc.org/](http://themes.jekyllrc.org/){:target="_blank"}
4. [https://jekyllthemes.io/free](https://jekyllthemes.io/free){:target="_blank"}
5. [https://jekyllthemes.dev/](https://jekyllthemes.dev/){:target="_blank"}

![깃허브 블로그에 테마 적용하기](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/github-blog-theme/github-blog-theme-1.webp){: .wd100}

개인적으로는 3번 [http://themes.jekyllrc.org/](http://themes.jekyllrc.org/){:target="_blank"} 이 맘에 드니 이 링크로 넘어가보겠습니다. 이 테마 사이트에서 맘에드는 테마를 발견했는데요 dash 테마를 고르겠습니다. 상당히 개발자스러운 디자인인게 열받네요. 마음에 듭니다. 테마 설치하러 ㄱㄱ

## 테마 설치
![깃허브 블로그에 테마 적용하기](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/github-blog-theme/github-blog-theme-2.webp){: .wd100}

![깃허브 블로그에 테마 적용하기](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/github-blog-theme/github-blog-theme-3.webp)

**우선 다운로드 버튼을 눌러 테마를 다운받고 압축을 해제한 후 우리들의 블로그 저장소에 파일을 이동시켜줍니다.** 사실은 여기까지가 전부입니다. 그 다음부터는 버전 에러나 gem 충돌에러들을 잡아나가는 작업이 필요합니다. 다음은 테마 세팅인데 테마를 설치한 블로그 프로젝트에 필수적으로 세팅해야할 것들이 빠져있는지 그리고 추가적으로 설치할 gem, 플러그인 들에 대해서 설명해줍니다.

## 테마 세팅
![깃허브 블로그에 테마 적용하기](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/github-blog-theme/github-blog-theme-4.webp){: .wd100}

다음은 페이지를 아래로 스크롤을 내려보시면 추가적으로 세팅 방법이 나와있는데요. 위에서부터 차례대로 Gemfile, _config.yml 에 세팅을 했는지 확인하시면 됩니다. 하나하나 알아볼까요?

![깃허브 블로그에 테마 적용하기](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/github-blog-theme/github-blog-theme-5.webp)

![깃허브 블로그에 테마 적용하기](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/github-blog-theme/github-blog-theme-6.webp)

1. Gemfile에 아래 코드를 추가하라는 말입니다.

2. _config.yml에 아래 코드를 입력하라는건데 파일을 확인해보니 설치가 되어있습니다.

3. 위 두개를 완료했다면 `bundle`을 명령프롬프트로 실행하거나 혹은 직접 jekyll-dash gem을 install하라는 뜻입니다.

4. Configuration은 _config.yml 파일을 확인해보라는 뜻입니다.

5. Additional Features은 Gemfile의 gem에대해 설명해주네요.

여기까지 하고 명령프롬프트에 `bundle exec jekyll serve`를 입력 후 지킬 서버를 실행시키면되는데 역시 에러가 발생합니다.

```
[!] There was an error parsing `Gemfile`: You cannot specify the same gem twice coming from different sources.
You specified that jekyll-dash (>= 0) should come from an unspecified source and source at `.`
. Bundler cannot continue.
```

우선 우리는 테마세팅 1번에서 Gemfile에 `gem "jekyll-dash"`를 추가하라고 되어있는데 추가하니까 위와 같이 에러가 떨어진걸 유추할 수 있습니다. 에러 내용을 보니 gemfile에대한 에러고 jekyll-dash gem에대한 충돌 에러네요. 그래서 우리는 Gemfile의 `gem "jekyll-dash"`를 추가하지 않고 지우겠습니다. 그런다음 `bundle exec jekyll serve` 명령어를 입력하여 서버를 실행시켜줍니다.

<!-- github-blog-theme -->
<div>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8955182453510440"
     data-ad-slot="8486981875"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
</div>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아마 위 에러 외에도 버전충돌이나 gem 충돌 에러 등 이 발생할 수 있는대요. 이 경우 각자의 버전 및 환경이 다르기 때문에 에러 메시지를 잘 이해해보고 구글링하면서 해결하시면 문제없이 테마 설치를 하실수 있을겁니다.
