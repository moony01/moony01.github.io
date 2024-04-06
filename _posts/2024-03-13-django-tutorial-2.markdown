---
layout: post
title: '[장고 튜토리얼 2편] 장고 프로젝트 생성 후 간단한 앱을 개발해보자'
date: 2024-03-13 00:00:00 +0700 
categories: [django]
---

{% include pre-version.html %}

우선 우리가 설치한 경로의 activate파일을 실행시켜 가상환경을 활성화 한다
```shell
C:\Users\사용자이름\django-tutorial\Scripts\activate
```

가상환경을 활성화 하면 가상환경의 파이썬과 django를 사용할수 있게된다. 아래의 명령어로 django의 버전을 확인해본다.
```shell
py -m django --version
```

다음 mysite 라는 프로젝트를 만든다
```shell
django-admin startproject mysite
```

mysite 안의 manage.py 파일의 서버를 실행시킨다.

```shell
py manage.py runserver
```

다음 앱을 생성해보자
```shell
py manage.py startapp polls
```

첫 번째 뷰 작성하기
첫 번째 뷰를 작성해봅시다. “polls/view.py”를 열어 다음과 같은 파이썬 코드를 입력합니다
```py
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

다음 단계는, 최상위 URLconf 에서 polls.urls 모듈을 바라보게 설정합니다. mysite/urls.py 파일을 열고, django.urls.include를 import 하고, urlpatterns 리스트에 include() 함수를 다음과 같이 추가합니다.
```py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("polls/", include("polls.urls")),
    path("admin/", admin.site.urls),
]
```

브라우저에서 http://localhost:8000/polls/를 입력하면 index 뷰에 정의한 “Hello, world. You’re at the polls index.” 가 보일 것입니다.

전체적인 상세 내용은 [튜토리얼1 바로가기](https://docs.djangoproject.com/ko/5.0/intro/tutorial01/) 링크에서 확인가능합니다.

git과 github를 사용해서 위에 생성한 프로젝트를 형상관리해보자 깃허브에도 mysite 레포지토리를 생성하고 아래 명령어를 하나하나 입력하여 깃허브에 push해보자

```bash
cd mysite
ls
git init
git add .
git commit --커밋할때 i눌러서 커밋 메시지 작성가능
git log
git remote add origin https://github.com/moony01/mysite.git
git push -u origin master
```
