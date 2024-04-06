---
layout: post
title: 'nuxt.js 프로젝트 생성 후 quasar 모듈 붙이고 테스트까지'
date: 2024-04-06 00:00:00 +0700
categories: [vue, nuxt, quasar]
---

Nuxt 프로젝트 생성

nuxt.js 공식문서 : https://nuxt.com/docs/getting-started/installation

```bash
$ npx nuxi init <프로젝트명>
```

2. Quasar 모듈 설치

nuxt.js에 quasar 모듈 설치 공식문서 : https://nuxt.com/modules/quasar

```bash
$ npm install quasar @quasar/extras
$ npm install --save-dev nuxt-quasar-ui
```

3. nuxt.config.ts 파일에 추가
```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui'
  ],
  quasar: { /* */ }
})
```

4. app.vue 파일에 아래 코드 붙여서 테스트
```vue
<template>
  <q-btn color="primary" label="Primary" />
  <QBtn color="secondary" label="Secondary" />
  <LazyQBtn color="amber" glossy label="Amber" />
</template>
```

[quasar 공식문서](https://quasar.dev/ "quasar 공식문서")