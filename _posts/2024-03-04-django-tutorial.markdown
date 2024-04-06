---
layout: post
title: '[장고 튜토리얼 1편] 파이썬 설치 후 가상환경에 장고 설치'
date: 2024-03-04 00:00:00 +0700 
categories: [django]
---
일단 무작정 Django(장고)를 시작하기 위해 공식 사이트의 문서를 들어갔다. [https://docs.djangoproject.com/ko/5.0/intro/install/](https://docs.djangoproject.com/ko/5.0/intro/install/) 인터넷 강의를 결제할까 했는데 유튜브나 공식 문서에 워낙 잘 되어있어서 튜토리얼 먼저 하고 필요하면 결제하자 생각함

{% include pre-version.html %}

## 목차
1. 파이썬 설치 및 버전 확인
2. 가상환경 세팅
3. 가상환경에 Django(장고) 설치

## 파이썬 설치 및 버전 확인
장고 공식문서의 설치 가이드를 보면 우선 파이썬을 설치하라고 한다. [https://www.python.org/downloads/](https://www.python.org/downloads/) 여기서 파이썬 최신 버전을 설치하자. 설치 후 Python이 설치되었는지 확인하려면 명령 프롬프트에서 `python`을 입력하자. 그럼 아래처럼 나타남

```shell
Python 3.12.2 (tags/v3.12.2:6abddd9, Feb  6 2024, 21:26:36) [MSC v.1937 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

## 가상환경 세팅
파이썬을 설치했으면 장고를 설치해야되는데 왜 가상환경을 세팅하는가 의문이들 수 있다. 가상환경을 구축해서 그 안에 프로젝트를 세팅하면 외부환경에 영향을 받지 않기 때문에 프로젝트를 효과적으로 관리할수있다는 장점이 있다. 파이썬을 설치하면 우리 로컬에 pip를 이용해서 장고를 설치할 수 있겠지만 역시 나는 가상환경을 구축해보겠다. git과 연동하는데 문제는 없을까 생각이 들긴 하지만 우선 가상환경으로 연습하자.

![Django 가상환경 세팅 문서 링크](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/django-tutorial.webp)


장고 공식문서의 장고 설치하기 공식 릴리즈를 확인해보자 [장고 공식 릴리즈 바로가기](https://docs.djangoproject.com/ko/5.0/topics/install/#installing-official-release) 링크에 들어가면 ***Django 코드 설치*** 섹션이 있다. 이곳에 장고를 설치할 수 있는 명령어를 확인할 수 있지만 그 전에 위 이미지의 venv 링크를 클릭해서 가상환경 세팅을 그대로 따라하면 된다. [가상환경 세팅 문서 바로가기](https://docs.python.org/3/tutorial/venv.html)

위 문서를 요약해보자면 우선 가상환경을 생성 할 폴더에서 아래 명령어를 입력한다. 

```shell
python -m venv tutorial-env
```

그럼 가상환경이 tutorial-env 폴더로 가상환경이 세팅된다. 그 다음은 아래 명령어를 입력하여 가상환경을 활성화 해보자.

```shell
tutorial-env\Scripts\activate
```

### 가상환경을 활성화 하면 무슨 이점이있을까? 
가상 환경을 활성화하면 사용 중인 가상 환경을 표시하도록 쉘의 프롬프트가 변경된다. 프롬프트가 변경되면 어떤 가상환경을 사용 중인지를 확인할 수 있다. 가상환경을 활성화 후에 Python을 실행하면, 가상 환경 내에서 설정된 Python 버전이 실행됩니다. 이는 시스템 전체에 설치된 기본 Python 버전과는 별개로, 가상 환경마다 설정할 수 있는 Python의 별도 버전을 의미합니다.

> python 명령어를 입력하는 이유: Python 쉘에 진입하고자 하거나, Python 스크립트(.py 파일)을 실행하고자 할 때

```shell
$ source ~/envs/tutorial-env/bin/activate
(tutorial-env) $ python
Python 3.5.1 (default, May  6 2016, 10:59:36)
  ...
>>> import sys
>>> sys.path
['', '/usr/local/lib/python35.zip', ...,
'~/envs/tutorial-env/lib/python3.5/site-packages']
>>>
```

가상환경을 비활성화 하려면  아래와 같이 입력하자

```shell
deactivate
```

## 가상환경에 Django(장고) 설치
장고를 설치해야 프로젝트를 생성하고 개발을 할 수 있다. 그럼 가상환경에 장고를 설치해보자. 우선 가상환경의 Scripts 폴더에서 가상환경을 활성화 시키지 않은 상태에서 아래 명령어를 입력하여 Django를 설치한다.

```shell
py -m pip install Django
```

여기까지하면 장고를 이용하여 개발할 수 있는 가상환경 세팅이 완료된다.