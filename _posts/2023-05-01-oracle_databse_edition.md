---
layout: post
title:  "ORACLE SE(Standard Edition)과 EE(Enterprise Edition)의 차이 그리고 XE(Express Edition)은 뭘까?"
date:   2023-05-01 00:00:00 +0700
categories: [common, dataBase, infra]
---

글을 본격적으로 작성하기 전에 나는 작업을 하든 공부를 하든 오라클 데이터베이스를 설치할때

인터넷에서 검색해서 그대로 따라서 설치하던가 회사에서는 가이드 대로 환경을 세팅했습니다.

이번에 오라클 데이터베이스를 다시 설치하려고 하는데 항상 설치할 때부터 햇갈리고 

무엇을 설치해야 할지 몰랐던 오라클 데이터베이스 버전들을 정리하고 짚고 넘어가 볼까 합니다.

-----

![1](https://user-images.githubusercontent.com/36956285/235434924-5657225c-6c54-44eb-9234-2361b19d261e.PNG)


<br />


설치하려고 다운로드 페이지로 들어가 보니 위 이미지에 표시 한 두 버전을 알아보고자 합니다.

그리고 내가 사용하기에 맞는 버전은 무엇인지 어떨 때 사용하는 버전인지에 대해 알아봅시다.

우선 SE 버전과 EE버전을 알아보겠습니다.

**ORACLE SE(Standard Edition)와 EE(Enterprise Edition)**은 ORACLE Database의 라이선스 버전으로 기능과 가격 등이 다릅니다.

위 사진에 보이는 바와 같이 SE버전과 EE버전은

![2](https://user-images.githubusercontent.com/36956285/235435769-f8505d6c-8e8e-40ee-8b86-88cb75157492.PNG)


<br />

Enterprise Edition (also includes Standard Edition 2)으로 함께 제공되고 있습니다.

위 버전을 내려받는다면 두 버전 모두 사용이 가능하고 ORACLE Database EE와 SE2를 모두 포함하고 있습니다.

<br />

* __ORACLE SE(Standard Edition)은__ **중소규모 기업이나 작은 기업에서 사용하기에 적합한 라이선스**로, 데이터베이스 기능을 충분히 갖추고 있으며, 클러스터링과 데이터 가드 기능을 지원하지 않습니다. 또한, 프로세서 제한이 있어서 특정한 하드웨어 환경에서만 실행할 수 있습니다.

* __ORACLE EE(Enterprise Edition)은__ **대규모 기업에서 사용하기에 적합한 라이선스**로, SE와 달리 클러스터링과 데이터 가드 기능을 지원하며, 프로세서 제한이 없어서 더 큰 하드웨어 환경에서 실행될 수 있습니다. 또한, EE는 추가 기능을 포함하고 있습니다.

* __ORACLE XE(Express Edition)은__ 무료로 사용할 수 있는 ORACLE Database 버전입니다. 이 버전은 **개발자나 작은 규모의 비즈니스에서 사용하기에 적합**하며, 데이터베이스 크기, CPU, 메모리 등에 대한 제한이 있습니다. 또한, 기능 제한도 있으며, 클러스터링과 데이터 가드 기능을 지원하지 않습니다.

> ##### 클러스터링(Clustering)은 여러 대의 컴퓨터를 하나의 시스템처럼 동작하도록 연결하는 기술


그럼 학습용으로 사용하려면 무슨 버전을 선택해야 할까요?


ORACLE Database를 학습용으로 사용하기 위해서는 ORACLE Database Express Edition (XE)를 사용하는 것이 좋습니다.

