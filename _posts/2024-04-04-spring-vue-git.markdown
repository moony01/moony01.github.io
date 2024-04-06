---
layout: post
title: '스프링 프로젝트 안의 Vue 프론트엔드 폴더 형상관리 추적 문제 해결하기'
date: 2024-04-04 00:00:00 +0700 
categories: [vue, git, spring]
---

Vue 프로젝트가 스프링 프로젝트 안에 설치되어 있고, Git에서 이를 추적하지 못하는 문제에 직면했다면, 다음 단계를 따라 문제를 해결해 보자.

{% include pre-version.html %}

## 목차

1. **문제 이해하기**
2. **문제 진단하기**
3. **해결 방법**
   1. `.git` 디렉토리 삭제하기
   2. Git에 폴더 추가 및 커밋하기
4. **상태 확인하기**
5. **결론 및 인텔리제이 변화 확인하기**

### 1. 문제 이해하기

![chunk-vendor.js와 app.js의 이해](https://raw.githubusercontent.com/moony01/moony01.github.io/master/static/img/_posts/spring-vue-git.webp)

스크린샷을 통해 `frontend` 폴더가 'Unversioned Files' 섹션에 위치한 것을 확인했습니다. 이는 해당 폴더가 아직 버전 관리 시스템에 의해 관리되지 않고 있다는 것을 의미합니다.

### 2. 문제 진단하기

Git이 `frontend/` 폴더를 추적하지 못하는 주요 원인 중 하나는 폴더 내에 숨겨진 `.git` 디렉토리가 있을 때입니다. 이 디렉토리는 폴더를 독립된 저장소로 만들어 상위 프로젝트의 Git 추적에서 제외시킵니다.

### 3. 해결 방법

#### i. `.git` 디렉토리 삭제하기

터미널을 열고 아래 명령어를 실행하여 `frontend/` 폴더 내의 `.git` 디렉토리를 삭제하세요.

```bash
rmdir /s /q frontend\.git
```

#### ii. Git에 폴더 추가 및 커밋하기

`.git` 디렉토리를 삭제한 후, 터미널에서 다음 명령어를 사용해 Git에 `frontend/` 폴더를 추가하고 커밋하세요.

```bash
git add frontend/
git commit -m "Add Vue frontend folder to the project"
```

### 4. 상태 확인하기

모든 파일들이 올바르게 추적되고 있는지 확인하기 위해 다시 `git status` 명령어를 실행하세요.

### 5. 결론 및 인텔리제이 변화 확인하기

이 과정을 마친 후, 인텔리제이에서 `frontend` 폴더가 더 이상 빨간색으로 표시되지 않고, 버전 관리에서도 정상적으로 추적되는 것을 확인할 수 있습니다. 문제가 여전히 해결되지 않았다면 추가적인 도움을 받으세요.