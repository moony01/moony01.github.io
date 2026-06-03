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

  <div class="portfolio-case-intro">
    <section class="portfolio-case-intro__section">
      <h2>문제와 목표</h2>
      <div>
        <p>블로그 포스팅, K-POP 뉴스 숏폼, 오디션 정보 SNS 발행, 내부 NAS/서버 운영 점검, 컴퓨팅 자원 상태 관리가 각각 수동 반복 작업으로 흩어져 있었고, 이 중 콘텐츠 발행 흐름은 K-POP 얼굴상 테스트와 개인 블로그의 검색 유입·SNS 노출을 키우기 위한 마케팅 운영 자산으로 필요했다.</p>
        <p>목표는 마케팅 콘텐츠 발행과 내부 서버 운영 점검을 스케줄 기반 워크플로우로 재실행 가능하게 구성하는 것이었다.</p>
      </div>
    </section>

    <section class="portfolio-case-intro__section">
      <h2>내가 맡은 범위와 구현</h2>
      <div>
        <p>작업 성격에 따라 K-POP 뉴스 숏폼은 외부 RSS/API, TTS, FFmpeg, 업로드가 이어지는 n8n 파이프라인으로 유지했고, 블로그·KCL·서버 점검·파일 보관·운영 리포트처럼 판단과 검증이 필요한 작업은 PloStack skill 기반 agentic 자동화로 옮기되 실행 현황은 n8n에서 시각화했다.</p>
      </div>
    </section>

    <section class="portfolio-case-intro__section">
      <h2>기술 구조</h2>
      <div>
        <p>n8n, PloStack Skills, Claude Code/Codex CLI, Schedule/Cron, RSS/API, TTS, FFmpeg, Google Search Console, Discord/Obsidian.</p>
      </div>
    </section>
  </div>

  <div class="portfolio-detail-stack">
    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image portfolio-detail-block__image--compact">
        <img src="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-workflow-overview.png" alt="n8n 워크플로우 목록과 실행 지표가 보이는 Overview 화면" width="806" height="880" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <strong>n8n 자동화 인벤토리와 실행 현황</strong>
        <p>Published workflow 11개를 기준으로 n8n 파이프라인과 skill 기반 자동화의 실행 상태를 한 보드에서 추적했습니다. 캡처 기준 prod executions 65, failure rate 1.5%, avg run time 1.23s이며, n8n은 전체 자동화 로직을 모두 담는 도구가 아니라 실행 현황을 확인하는 운영 화면으로도 사용했습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-kpop-shortform-workflow.png" alt="K-pop 뉴스 숏폼 자동화 n8n 워크플로우" width="1130" height="362" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <strong>K-pop 뉴스 숏폼 자동 발행 흐름</strong>
        <p>뉴스 소스 병합, 기사 추출, AI 스크립트 생성, OpenAI TTS API, FFmpeg 조립, TikTok 업로드까지 이어지는 콘텐츠 발행 파이프라인입니다. 반복 발행 작업을 수동 편집 흐름이 아니라 재실행 가능한 workflow로 묶었습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-report-image-workflow.png" alt="오디션 정보를 수집해 SNS 카드로 자동 발행하는 n8n 워크플로우" width="1030" height="193" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <strong>오디션 정보 SNS 카드 자동 발행 흐름</strong>
        <p>예약 실행, 오디션 정보 수집, 상세 페이지 확인, 이미지 생성, 업로드, 발행 기록 저장을 자동화한 흐름입니다. 외부 페이지와 이미지 생성 API를 단계별로 통과해야 하는 콘텐츠 발행 작업이라 n8n 파이프라인으로 유지했습니다.</p>
      </figcaption>
    </figure>
  </div>
</section>
