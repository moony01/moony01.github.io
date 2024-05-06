---
layout: post
title: 'Vue.js 프로젝트를 GitHub Pages를 이용해 호스팅하는 방법'
date: 2024-05-06 00:00:00 +0900
categories: [github, vue]
---

이 글에서는 Vue.js 프로젝트를 GitHub Pages에 호스팅하는 과정을 단계별로 설명하겠습니다. 이 방법을 통해 개발한 웹사이트를 쉽게 배포하고 관리할 수 있습니다.

{% include pre-version.html %}

### 목차

1. GitHub 저장소 생성 및 로컬 연결
2. GitHub Pages 설정
3. 빌드 및 배포
4. GitHub Pages 활성화
5. 종합

### GitHub 저장소 생성 및 로컬 연결

GitHub에 새 저장소를 만들고 로컬 디렉토리와 연결하는 것부터 시작합니다.

```bash
git init
git remote add origin [GitHub 저장소 URL]
```

`.gitignore` 파일을 설정하여 불필요한 파일들이 업로드되지 않도록 합니다. 주로 `node_modules/` 디렉토리와 개인 설정 파일들이 여기에 포함됩니다.

### GitHub Pages 설정

`gh-pages` 패키지를 설치하여 사용합니다. 이는 빌드된 사이트를 GitHub의 `gh-pages` 브랜치로 푸시하는 것을 도와줍니다.

```bash
npm install gh-pages --save-dev
```

`package.json` 파일에 `homepage` 필드를 추가하고, 배포 스크립트를 설정합니다.

```json
"homepage": "https://[your-github-username].github.io/[repository-name]",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Vue.js 프로젝트 설정인 `vue.config.js` 파일에서 `publicPath`를 설정합니다.

```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/[repository-name]/'
    : '/'
}
```

### 빌드 및 배포

프로젝트를 빌드하고 GitHub에 배포합니다.

```bash
npm run build
npm run deploy
```

### GitHub Pages 활성화

GitHub 저장소로 이동하여 "Settings"에서 "Pages" 섹션으로 가서 Source를 `gh-pages` 브랜치로 설정합니다.

### 종합

이러한 단계를 통해 Vue.js 기반 프로젝트를 GitHub Pages로 쉽게 호스팅할 수 있습니다. 이 설정을 완료하면 설정한 `homepage` URL을 통해 웹사이트에 접근할 수 있습니다. 추가적인 질문이나 도움이 필요하면 언제든지 문의하세요.

GitHub Pages는 개발자가 웹사이트를 쉽고 빠르게 배포할 수 있는 훌륭한 도구입니다. 이 글이 Vue.js 프로젝트를 성공적으로 배포하는 데 도움이 되기를 바랍니다.