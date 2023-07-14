---
layout: post
title:  "미들웨어(middleware)란 무엇인가?"
date:   2023-04-09 00:00:00 +0700
redirect_from:
  - /common/infra/2023/04/08/middleWare.html
categories: [infra]
---

미들웨어는 **운영체제(Operating System)와 운영 프로그램** 또는 **서버와 클라이언트 사이에서의 서비스를 제공하는 소프트웨어다.** 그리고 그 사이에서 미들웨어는 표준화된 시스템 간의 일관적인 데이터를 주고받게 도와준다.

![미들웨어(middleware)의 구조](https://user-images.githubusercontent.com/36956285/230765411-add02cf3-096c-474c-b309-3a293b81f62b.png)

출처: [boostcourse](){:target="_blank"}

대표적인 미들웨어 종류 몇가지 알아보자
* DB(DataBase)
* RPC(Remote Procedure Call) 
* MOM(Message Oriented Middleware) 
* TP-Monitor(Transaction Processing Monitor)
* ORB(Object Request Broker)
* WAS(Web Application Server) 

![middleWare_02](https://user-images.githubusercontent.com/36956285/232182063-01e474f8-e689-40e4-8dc3-2b47f4d55f48.png)

## DB(database)
DB는 데이터베이스 벤더에서 제공하는 소프트웨어로 클라이언트에서 원격의 데이터베이스와 연결하는 미들웨어이다. 
> 예) JDBC, ODBC 등

## RPC(원격 프로시저 호출)
프로그래머가 실행한 응용 프로그램의 함수 또는 프로시저를 사용하여 원격 프로시저를 마치 로컬 프로시저마냥 호출하는 미들웨어다. 

1. 함수(Function): Return값을 필수로 가져야하고 Client단에서 처리되며 주로 간단한 계산 및 수치 등을 도출할 때 사용한다.
2. 프로시저(Procedure): Return, Output값에 집중하기보단 명령 단위가 수행하는 절차에 집중한 개념이며 Server단에서 처리된다.
3. 응용 프로그램: 한글, 엑셀, 파워포인트 등의 프로그램들을 응용 프로그램이라 한다.

## TP-Monitor(트랜잭션 처리 모니터)
온라인 트랜잭션(OLTP) 업무에서 트랜잭션을 처리 및 감시하는 미들웨어이다.

> 온라인 트랜잭션 (OLTP(Online Transaction Processing)): 회사에서 기본적으로 사용하고 있는 ERP와 같은 시스템의 처리방식의 프로그램 트랜잭션 데이터를 관리하는 방식이다. 

## WAS(웹 애플리케이션 서버)
1. 사용자의 요구에 따라 변하는 동적인 콘텐츠를 처리하기 위한 미들웨어이다.
2. 클라이언트/서버 환경보다는 웹 환경을 구현하기 위한 미들웨어이다.
3. HTTP를 통해 컴퓨터나 장치에 애플리케이션을 수행해주는 미들웨어이다.
4. 웹 컨테이너(Web Container) 혹은 서블릿 컨테이너(Servlet Container) 라고도 불린다.

> 서블릿(Servlet): 동적 웹 페이지를 만들 때 사용되는 자바 기반의 웹 애플리케이션 프로그래밍 기술이다. 서블릿은 웹 요청과 응답의 흐름을 간단한 메서드 호출만으로 체계적으로 다룰 수 있게 해준다.

- - -

요약하자면 운영체제와 운영프로그램 또는 서버와 클라이언트 기계와 데이터베이스 등등 의 사이에서 데이터를 주고받게 도와주는 역할을 하고있다면 그것이 미들웨어라고 할 수 있을거같다.