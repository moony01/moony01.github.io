---
layout: default
title: Portfolio
description: "한문희의 소프트웨어 개발, AI 자동화, 운영 시스템 구축 포트폴리오입니다."
permalink: /portfolio/
disable_ads: true
---

<section class="portfolio-page">
  <div class="portfolio-page__section-head">
    <h2>포트폴리오</h2>
    <p><strong>PLOZEN</strong>은 제가 직접 운영하는 가상 회사 컨셉입니다. 내부 업무를 기록하고 다시 찾는 <strong>지식 시스템</strong>, 여러 에이전트가 역할을 나눠 일하는 <strong>운영환경</strong>, 반복 업무를 안정적으로 재실행하는 <strong>자동화 흐름</strong>을 먼저 구축했습니다. 그리고 이 <strong>AI 개발 환경</strong> 위에서 지역 청년 사업용 <strong>앱과 백오피스 MVP</strong>를 기획·개발해 외부 클라이언트에 공식 납품했습니다. 토이 프로젝트로 시작한 웹·앱 서비스는 <strong>실제 광고 수익</strong>이 발생하는 운영 서비스로 확장했습니다. 이 포트폴리오는 “회사를 운영한다면 어떤 문제를 어떻게 시스템으로 풀 것인가”라는 기준으로 쌓아온 실행 기록입니다.</p>
  </div>

  <div class="portfolio-card-grid">
    <a class="portfolio-case-card" href="/portfolio/plozen-knowledge/">
      <span class="portfolio-case-card__media portfolio-case-card__media--knowledge" aria-hidden="true">
        <span class="portfolio-case-card__status-thumb">진행중</span>
      </span>
      <span class="portfolio-case-card__body">
        <span class="portfolio-case-card__tag portfolio-case-card__tag--rag">RAG</span>
        <strong>PLOZEN RAG Knowledge System</strong>
        <span class="portfolio-case-card__date">Case 01 · 진행중</span>
        <span class="portfolio-case-card__excerpt">PLOZEN 내부 문서, 프로젝트 기록, 세션 로그, 완료 Todo를 PostgreSQL pgvector 기반 RAG 저장소로 색인하고, MCP Server search_knowledge 도구와 API로 에이전트가 근거 문서를 다시 찾게 만드는 조직 지식 검색 시스템입니다. 후속 레이어는 LangChain·LangGraph retriever/agent workflow로 확장합니다.</span>
      </span>
    </a>

    <a class="portfolio-case-card" href="/portfolio/plostack-multi-agent/">
      <span class="portfolio-case-card__media">
        <img src="/static/img/portfolio/plostack-multi-agent/plozen-private-plugins-repository.png" alt="PLOZEN Multi-Agent Orchestration System private marketplace 썸네일" width="1707" height="1181" loading="lazy" decoding="async">
      </span>
      <span class="portfolio-case-card__body">
        <span class="portfolio-case-card__tag portfolio-case-card__tag--ai">AI OPS</span>
        <strong>PLOZEN Multi-Agent Orchestration System</strong>
        <span class="portfolio-case-card__date">Case 02 · 2026</span>
        <span class="portfolio-case-card__excerpt">작업실의 노트북 2대를 11번·12번 개발/직원 서버로 고정 IP 할당하고, 데스크톱에는 Ubuntu OS를 설치해 13번 NAS/Linux 서버로 운영했습니다. 13번 서버는 모든 프로젝트와 데이터를 HDD에 저장·관리하는 중앙 스토리지이자, OpenClaw와 Hermes가 24시간 시스템 상태와 작업 흐름을 관제하는 운영 노드입니다. 이 장비들을 Tailscale VPN, 내부 SSH, Discord, Obsidian, n8n으로 연결해 개인 장비 묶음이 아니라 역할이 분리된 조직형 AI 운영환경으로 구성했습니다.</span>
      </span>
    </a>

    <a class="portfolio-case-card" href="/portfolio/jeonbuk-youth-village-mvp/">
      <span class="portfolio-case-card__media">
        <img src="/static/img/portfolio/jeonbuk-youth-village-admin-web/kmong-web-main-thumbnail.png" alt="전북청년마을 앱과 관리자웹 MVP 썸네일" width="1200" height="1200" loading="lazy" decoding="async">
      </span>
      <span class="portfolio-case-card__body">
        <span class="portfolio-case-card__tag portfolio-case-card__tag--side">SIDE PROJECT</span>
        <strong>전북청년마을 앱·관리자웹 MVP</strong>
        <span class="portfolio-case-card__date">Case 03 · 2026</span>
        <span class="portfolio-case-card__excerpt">체류형 청년마을 사업 운영을 위해 QR 미션, 위치/GPS 로그, 콘텐츠·공지 관리가 가능한 모바일 앱과 관리자웹 MVP를 3개월 동안 기획·설계해 납품한 프로젝트. React Native/Expo, Next.js, Supabase, GitHub Actions/Cloudflare Pages, EAS Build를 구현 기반으로 사용했습니다.</span>
      </span>
    </a>

    <a class="portfolio-case-card" href="/portfolio/kpop-ai-face-test/">
      <span class="portfolio-case-card__media">
        <img src="/static/projects/kpopface.jpg" alt="K-POP AI 얼굴상 테스트 썸네일" width="800" height="800" loading="lazy" decoding="async">
      </span>
      <span class="portfolio-case-card__body">
        <span class="portfolio-case-card__tag portfolio-case-card__tag--toy">TOY PROJECT</span>
        <strong>K-POP AI 얼굴상 테스트</strong>
        <span class="portfolio-case-card__date">Case 04 · Consumer AI</span>
        <span class="portfolio-case-card__excerpt">K-POP 얼굴상 테스트를 웹/PWA/Android 앱으로 운영하면서 얼굴상 분석, 결과 공유 이미지, 댓글·투표·랭킹, 다국어 SEO, 광고 수익화 흐름을 연결한 실서비스. Teachable Machine/TensorFlow.js, Supabase, React Native WebView, GA4/GSC/AdSense를 구현 기반으로 사용했습니다.</span>
      </span>
    </a>

    <a class="portfolio-case-card" href="/portfolio/plostack-n8n-workflow-pack/">
      <span class="portfolio-case-card__media">
        <img src="/static/img/portfolio/plostack-n8n-workflow-pack/n8n-workflow-overview.png" alt="PLOZEN Workflow Automation System 썸네일" width="806" height="880" loading="lazy" decoding="async">
      </span>
      <span class="portfolio-case-card__body">
        <span class="portfolio-case-card__tag portfolio-case-card__tag--ai-automation">AI AUTOMATION</span>
        <strong>PLOZEN Workflow Automation System</strong>
        <span class="portfolio-case-card__date">Case 05 · Automation</span>
        <span class="portfolio-case-card__excerpt">블로그·뉴스·K-POP 숏폼·오디션 SNS 발행과 K-POP 얼굴상 테스트 마케팅을 자동화하고, 서버 상태 점검, 파일 정리·보관, SSD→HDD 콜드 아카이브, 보안 점검, 운영 리포트 발송까지 n8n 워크플로우로 관리한 프로젝트. n8n Schedule Trigger, Claude Code Gateway, PloStack 자동화 스킬, RSS/API 수집, Gemini/OpenAI TTS API/FFmpeg, 서버 점검 스크립트를 연결했습니다.</span>
      </span>
    </a>
  </div>
</section>
