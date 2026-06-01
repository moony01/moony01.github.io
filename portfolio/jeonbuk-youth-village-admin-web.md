---
layout: default
title: "전북청년마을 관리자웹 MVP"
description: "전북청년마을 관리자웹 MVP 포트폴리오 상세 페이지입니다."
permalink: /portfolio/jeonbuk-youth-village-admin-web/
noindex: true
disable_ads: true
---

<section class="portfolio-case-page">
  <a class="portfolio-case-page__back" href="/portfolio/">&larr; Portfolio</a>
  <span class="portfolio-page__eyebrow">Case 04</span>
  <h1>전북청년마을 관리자웹 MVP</h1>

  <div class="portfolio-case-intro">
    <section class="portfolio-case-intro__section">
      <h2>문제와 목표</h2>
      <div>
        <p>청년마을 운영에는 참여자 관리, 위치/GPS 로그, QR 탐험, 사진 인증, 콘텐츠 검수, 공지/통계 등 여러 운영 흐름을 한곳에서 관리할 MVP가 필요했다.</p>
        <p>관리자웹은 운영자가 확인할 화면과 DB/공통 구조를 먼저 잡고, 콘텐츠 검수·통계 등 세부 운영 기능은 후속 연동 범위로 분리해 사업 운영 가능성과 후속 개발 범위를 검증하는 것이 목표였다.</p>
        <p>청년마을 운영자가 참여자, 콘텐츠, QR 미션, 공지 발송을 한 화면 흐름에서 관리할 수 있도록 관리자웹 MVP를 구성했다.</p>
      </div>
    </section>

    <section class="portfolio-case-intro__section">
      <h2>내가 맡은 범위와 구현</h2>
      <div>
        <p>Next.js 기반 운영자 화면으로 회원/그룹, QR 탐험, 위치 로그, 콘텐츠 검수, 게시판/장소, 공지/통계, 권한관리 화면 구조를 설계했다.</p>
        <p>Supabase PostgreSQL/Auth/RLS/Storage/Edge Functions 기반 인증·저장소·테이블 구조를 앱 데이터와 연결했다.</p>
        <p>GitHub Actions에서 Next.js를 Cloudflare Pages용으로 빌드하고, Cloudflare Pages에 자동 배포하는 CI/CD 흐름을 구성했다.</p>
      </div>
    </section>

    <section class="portfolio-case-intro__section">
      <h2>기술 구조</h2>
      <dl class="portfolio-case-intro__spec">
        <div>
          <dt>프런트엔드</dt>
          <dd>Next.js 기반 운영자 화면, 대시보드, 회원/그룹, QR 탐험, 위치 로그, 콘텐츠 검수, 공지/통계, 권한관리.</dd>
        </div>
        <div>
          <dt>데이터 구조</dt>
          <dd>Supabase PostgreSQL, Auth, RLS, Storage, Edge Functions 기반으로 앱 데이터와 운영자 화면을 연결.</dd>
        </div>
        <div>
          <dt>배포 구조</dt>
          <dd>GitHub Actions 빌드와 Cloudflare Pages 자동 배포로 MVP 운영 흐름을 구성.</dd>
        </div>
      </dl>
    </section>
  </div>

  <figure class="portfolio-kmong-hero">
    <img src="/static/img/portfolio/jeonbuk-youth-village-admin-web/kmong-web-main-thumbnail.png" alt="전북청년마을 관리자웹 크몽 메인 썸네일" width="1200" height="1200">
  </figure>

  <figure class="portfolio-kmong-strip">
    <img src="/static/img/portfolio/jeonbuk-youth-village-admin-web/kmong-web-detail-page.png" alt="참여자와 QR 미션 운영을 연결하는 전북청년마을 관리자웹 상세 포트폴리오 이미지" width="1200" height="2100" loading="lazy" decoding="async">
  </figure>

  <div class="portfolio-kmong-pages" aria-label="전북청년마을 관리자웹 포트폴리오 상세 이미지">
    <figure>
      <img src="/static/img/portfolio/jeonbuk-youth-village-admin-web/kmong-web-page-01-dashboard.png" alt="전북청년마을 관리자웹 대시보드 포트폴리오 상세 이미지" width="1200" height="867" loading="lazy" decoding="async">
    </figure>
    <figure>
      <img src="/static/img/portfolio/jeonbuk-youth-village-admin-web/kmong-web-page-02-members.png" alt="전북청년마을 관리자웹 참여자 관리 포트폴리오 상세 이미지" width="1200" height="867" loading="lazy" decoding="async">
    </figure>
    <figure>
      <img src="/static/img/portfolio/jeonbuk-youth-village-admin-web/kmong-web-page-03-content-qr.png" alt="전북청년마을 관리자웹 콘텐츠와 QR 관리 포트폴리오 상세 이미지" width="1200" height="867" loading="lazy" decoding="async">
    </figure>
    <figure>
      <img src="/static/img/portfolio/jeonbuk-youth-village-admin-web/kmong-web-page-04-notice-push.png" alt="전북청년마을 관리자웹 공지와 푸시 발송 포트폴리오 상세 이미지" width="1200" height="867" loading="lazy" decoding="async">
    </figure>
  </div>
</section>
