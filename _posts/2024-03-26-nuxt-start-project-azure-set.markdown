---
layout: post
title: 'Nuxt 프로젝트 생성 및 Azure 환경에 최적화'
date: 2024-03-26 00:00:00 +0700 
categories: [vue]
---

Nuxt.js는 Vue.js를 기반으로 한 프레임워크로서, 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), 싱글 페이지 애플리케이션(SPA) 등 다양한 방식으로 웹 애플리케이션을 개발할 수 있도록 도와준다.

nuxi는 Nuxt 3의 새로운 CLI 도구로, Nuxt 3 프로젝트를 생성하고 관리하는 데 사용된다. 이 명령어를 통해 생성된 프로젝트는 Nuxt 3의 기능과 함께 최신 Vue.js 버전의 모든 기능을 사용할 수 있다. 이는 컴포지션 API, 텔레포트(Teleport), 프래그먼트(Fragments) 등 Vue 3에서 새롭게 도입된 다양한 기능을 포함한다.

{% include pre-version.html %}

## 목차
1. 프로젝트 생성
2. 정적 사이트 생성 빌드
3. Nuxt.js 앱을 Azure 환경에 최적화
4. output/public 디렉토리에 있는 정적 사이트를 로컬 서버에서 실행

### 1.프로젝트 생성

npx nuxi init <프로젝트명> 으로 프로젝트를 생성하면 기본적으로 vue.js를 사용할 수 있게된다. 그 이유는 nuxt.js는 vue.js 기반의 프레임워크이기 때문이다.

```bash
npx nuxi init nuxt-app
```

### 2.정적 사이트 생성 빌드

아래 명령어로 정적 사이트를 생성하기 위한 빌드를 시작하면 `.output/public` 경로에 정적 사이트가 생성되게 된다.

```bash
npm run generate
```

{% include pre-version.html %}

### 3.Nuxt.js 앱을 Azure 환경에 최적화

이 명령어는 환경 변수 NITRO_PRESET에 'azure' 값을 설정하고 있다. 여기서 yarn build는 실제 실행할 명령어가 아니라, 'azure' 설정이 Nuxt.js 빌드 프로세스에 사용될 것임을 나타내는 부분이다. 이 설정은 아마도 Nuxt.js 앱을 Azure 환경에 최적화하기 위해 사용되는 듯하다.

```bash
$NITRO_PRESET='azure yarn build'
```

### 4.output/public 디렉토리에 있는 정적 사이트를 로컬 서버에서 실행
 
이 명령어는 Azure Static Web Apps CLI를 사용하여 `.output/public` 디렉토리에 있는 정적 사이트를 로컬 서버에서 실행하고 있다. 만약 Azure Static Web Apps CLI가 설치되어 있지 않다면, 이 명령어는 해당 CLI를 자동으로 설치하겠냐는 메시지(Ok to proceed? (y))를 표시한다.

```bash
npx @azure/static-web-apps-cli start .output/public
```