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
  <span class="portfolio-page__eyebrow">Case 05</span>
  <h1>PLOZEN Workflow Automation System</h1>
  <p><strong>블로그·뉴스·K-POP 숏폼·오디션 SNS 발행</strong>과 <strong>K-POP 얼굴상 테스트 마케팅</strong>을 자동화하고, <strong>서버 상태 점검, 파일 정리·보관, SSD→HDD 콜드 아카이브, 보안 점검, 운영 리포트 발송</strong>까지 n8n 워크플로우로 관리한 시스템입니다. <strong>n8n Schedule Trigger, Claude Code Gateway, PloStack 자동화 스킬, RSS/API 수집, Gemini/OpenAI TTS API/FFmpeg, 서버 점검 스크립트</strong>를 연결했습니다.</p>

  <section class="portfolio-ops-diagram" aria-label="PLOZEN Workflow Automation System 흐름">
    <div class="portfolio-ops-map">
      <article class="portfolio-ops-node portfolio-ops-node--input">
        <strong>Schedule · Form</strong>
        <p><strong>예약 실행 또는 수동 입력</strong>으로 콘텐츠 발행과 서버 점검 작업을 시작합니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true"></span>

      <article class="portfolio-ops-node portfolio-ops-node--primary">
        <strong>Fetch &amp; Merge</strong>
        <p><strong>뉴스, RSS, API, 내부 서버 상태 데이터</strong>를 가져와 중복과 대상 조건을 정리합니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true"></span>

      <article class="portfolio-ops-node portfolio-ops-node--workers">
        <strong>AI · Script</strong>
        <p><strong>Gemini, OpenAI TTS API, FFmpeg, 서버 점검 스크립트</strong>로 콘텐츠 생성과 운영 데이터를 처리합니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true"></span>

      <article class="portfolio-ops-node portfolio-ops-node--output">
        <strong>Publish &amp; Record</strong>
        <p><strong>TikTok 업로드, 블로그 발행, 리포트 전송, 보안/헬스체크 결과 저장</strong>으로 마무리합니다.</p>
      </article>
    </div>
  </section>

  <section class="portfolio-evidence-section" aria-label="PLOZEN Workflow Automation System 증빙">
    <div class="portfolio-section-divider"><span>Evidence</span></div>
    <div class="portfolio-evidence-grid portfolio-evidence-grid--two">
      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__image portfolio-evidence-card__image--workflow-overview" href="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-workflow-overview.png" target="_blank" rel="noopener" aria-label="n8n Overview 원본 이미지 열기">
          <img src="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-workflow-overview.png" alt="n8n 워크플로우 목록과 실행 지표가 보이는 Overview 화면" width="806" height="880" loading="lazy" decoding="async">
        </a>
        <figcaption>
          <strong>Automation Control Board</strong>
          <span>Published workflow 11개를 기준으로 콘텐츠 발행과 서버 상태 점검, 파일 정리·보관, SSD→HDD 콜드 아카이브, 보안 점검, 운영 리포트 발송을 한 보드에서 추적합니다. 캡처 기준 prod executions 65, failure rate 1.5%, avg run time 1.23s.</span>
        </figcaption>
      </figure>

      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__image portfolio-evidence-card__image--workflow-wide" href="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-kpop-shortform-workflow.png" target="_blank" rel="noopener" aria-label="K-pop 뉴스 숏폼 자동화 n8n 워크플로우 원본 이미지 열기">
          <img src="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-kpop-shortform-workflow.png" alt="K-pop 뉴스 숏폼 자동화 n8n 워크플로우" width="1130" height="362" loading="eager" decoding="async">
        </a>
        <figcaption>
          <strong>K-pop News Short-form Autopilot</strong>
          <span>뉴스 소스 병합, 기사 추출, AI 스크립트 생성, OpenAI TTS API, FFmpeg 조립, TikTok 업로드까지 이어지는 콘텐츠 발행 파이프라인</span>
        </figcaption>
      </figure>

      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__image portfolio-evidence-card__image--workflow-report" href="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-report-image-workflow.png" target="_blank" rel="noopener" aria-label="리포트 이미지 n8n 워크플로우 원본 이미지 열기">
          <img src="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-report-image-workflow.png" alt="리포트와 이미지를 생성해 업로드하는 n8n 워크플로우" width="1030" height="193" loading="eager" decoding="async">
        </a>
        <figcaption>
          <strong>Report Image Workflow</strong>
          <span>예약 실행, 데이터 수집, 리포트 이미지 생성, 업로드, 발송 기록 저장을 자동화한 리포트 생성 흐름</span>
        </figcaption>
      </figure>
    </div>
  </section>
</section>
