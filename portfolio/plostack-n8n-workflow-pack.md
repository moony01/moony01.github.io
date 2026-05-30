---
layout: default
title: "PLOZEN Workflow Automation System"
description: "PLOZEN Workflow Automation System 포트폴리오 상세 페이지입니다."
permalink: /portfolio/plostack-n8n-workflow-pack/
noindex: true
disable_ads: true
---

<section class="portfolio-case-page portfolio-case-page--wide">
  <a class="portfolio-case-page__back" href="/portfolio/">&larr; Portfolio</a>
  <span class="portfolio-page__eyebrow">Case 06</span>
  <h1>PLOZEN Workflow Automation System</h1>
  <p><strong>블로그·뉴스·K-POP 숏폼·오디션 SNS 발행</strong>과 <strong>K-POP 얼굴상 테스트 마케팅</strong>을 자동화하고, <strong>서버 상태 점검, 파일 정리·보관, SSD→HDD 콜드 아카이브, 보안 점검, 운영 리포트 발송</strong>까지 n8n 워크플로우로 관리한 시스템입니다. <strong>Docker/Docker Compose 기반 self-hosted n8n</strong>, <strong>n8n Schedule Trigger</strong>, <strong>Claude Code Gateway</strong>, <strong>PloStack 자동화 스킬</strong>, <strong>RSS/API 수집</strong>, <strong>Gemini/OpenAI TTS API/FFmpeg</strong>, <strong>서버 점검 스크립트</strong>를 연결했습니다.</p>

  <div class="portfolio-detail-stack">
    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image portfolio-detail-block__image--compact">
        <img src="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-workflow-overview.png" alt="n8n 워크플로우 목록과 실행 지표가 보이는 Overview 화면" width="806" height="880" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <span class="portfolio-detail-block__label">Control Board</span>
        <strong>콘텐츠 발행과 서버 운영 자동화를 한 보드에서 추적</strong>
        <p>Published workflow 11개를 기준으로 블로그·뉴스·K-POP 숏폼 발행, 서버 상태 점검, 파일 정리·보관, SSD에서 HDD로 넘기는 콜드 아카이브, 보안 점검, 운영 리포트 발송을 관리했습니다. 캡처 기준 prod executions 65, failure rate 1.5%, avg run time 1.23s입니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-kpop-shortform-workflow.png" alt="K-pop 뉴스 숏폼 자동화 n8n 워크플로우" width="1130" height="362" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <span class="portfolio-detail-block__label">Short-form Pipeline</span>
        <strong>K-pop 뉴스 숏폼 자동 발행 흐름</strong>
        <p>뉴스 소스 병합, 기사 추출, AI 스크립트 생성, OpenAI TTS API, FFmpeg 조립, TikTok 업로드까지 이어지는 콘텐츠 발행 파이프라인입니다. 반복 발행 작업을 수동 편집 흐름이 아니라 재실행 가능한 workflow로 묶었습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-report-image-workflow.png" alt="리포트와 이미지를 생성해 업로드하는 n8n 워크플로우" width="1030" height="193" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <span class="portfolio-detail-block__label">Report Pipeline</span>
        <strong>운영 리포트 이미지 생성과 발송 기록</strong>
        <p>예약 실행, 데이터 수집, 리포트 이미지 생성, 업로드, 발송 기록 저장을 자동화한 흐름입니다. 콘텐츠 자동화뿐 아니라 운영 상태를 기록하고 다시 확인할 수 있는 관리 루틴까지 n8n에 연결했습니다.</p>
      </figcaption>
    </figure>
  </div>
</section>
