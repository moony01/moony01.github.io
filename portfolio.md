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
    <p><strong>PLOZEN</strong>은 <strong>AI/RAG, 멀티에이전트, 업무 자동화, 풀스택 MVP 개발, 배포·운영</strong> 역량을 실제 운영 환경으로 검증하기 위해 직접 만든 가상 회사형 프로젝트입니다. 내부 문서와 세션 로그를 <strong>PostgreSQL pgvector 기반 RAG 지식 시스템</strong>으로 다시 찾고, <strong>Plostack 멀티에이전트 오케스트레이션 하네스</strong>로 작업 분류, 스킬 선택, 서브에이전트 위임, 리뷰·QA 검증을 자동화했습니다. 이 AI 개발 환경 위에서 <strong>React Native/Expo 앱</strong>, <strong>Next.js 백오피스</strong>, <strong>Supabase</strong>, <strong>GitHub Actions/Cloudflare Pages</strong>, <strong>EAS Build</strong> 기반 지역 청년 사업 MVP를 기획·개발해 외부 클라이언트에 납품했고, 소비자 웹·앱 서비스는 <strong>SEO, GA4/GSC, AdSense</strong> 운영과 광고 수익까지 확장했습니다.</p>
    <p class="portfolio-page__keywords"><strong>핵심 기술 키워드</strong> AI/RAG · PostgreSQL/pgvector · MCP Server · LangChain/LangGraph · Multi-Agent · Plostack Harness · Docker/Docker Compose · n8n Self-hosted Automation · React Native/Expo · Next.js · Supabase · GitHub Actions · Cloudflare Pages · EAS Build · SEO/GA4/GSC/AdSense</p>
  </div>

  <div class="portfolio-card-grid">
    <a class="portfolio-case-card" href="/portfolio/plozen-knowledge/">
      <span class="portfolio-case-card__media">
        <img src="/static/img/portfolio/plozen-knowledge/rag-similarity-search-smoke.png" alt="PLOZEN RAG Knowledge System pgvector document_chunks 테이블 썸네일" width="1452" height="484" loading="lazy" decoding="async">
      </span>
      <span class="portfolio-case-card__body">
        <span class="portfolio-case-card__tag portfolio-case-card__tag--rag">RAG</span>
        <strong>PLOZEN RAG Knowledge System</strong>
        <span class="portfolio-case-card__date">Case 01 · 진행중</span>
        <span class="portfolio-case-card__stack">PostgreSQL · pgvector · RAG · MCP Server · LangChain · LangGraph · Docker</span>
        <span class="portfolio-case-card__excerpt">PLOZEN 내부 문서, 프로젝트 기록, 세션 로그, 완료 Todo를 PostgreSQL pgvector 기반 RAG 저장소로 색인하고, MCP Server search_knowledge 도구와 API로 에이전트가 근거 문서를 다시 찾게 만드는 조직 지식 검색 시스템입니다. 후속 레이어는 LangChain·LangGraph retriever/agent workflow로 확장합니다.</span>
      </span>
    </a>

    <a class="portfolio-case-card" href="/portfolio/plostack-multi-agent/">
      <span class="portfolio-case-card__media">
        <img src="/static/img/portfolio/plostack-multi-agent/subagent-registry-repository.png" alt="PLOZEN Multi-Agent Orchestration Harness subagent registry 썸네일" width="2298" height="1329" loading="lazy" decoding="async">
      </span>
      <span class="portfolio-case-card__body">
        <span class="portfolio-case-card__tag portfolio-case-card__tag--ai">AI OPS</span>
        <strong>Plostack 멀티에이전트 오케스트레이션 하네스</strong>
        <span class="portfolio-case-card__date">Case 02 · 2026</span>
        <span class="portfolio-case-card__stack">Multi-Agent · Subagent · Skill · Harness · Discord · Obsidian · CLI/MCP</span>
        <span class="portfolio-case-card__excerpt">PLOZEN 업무 방식에 맞춰 직접 만든 Plostack 하네스/플러그인 시스템입니다. 업무 지시를 받으면 작업 성격을 분류하고, 필요한 스킬과 서브에이전트를 자동 선택해 실행·검증·기록까지 이어가도록 구성했습니다.</span>
      </span>
    </a>

    <a class="portfolio-case-card" href="/portfolio/jeonbuk-youth-village-app/">
      <span class="portfolio-case-card__media">
        <img src="/static/img/portfolio/jeonbuk-youth-village-app/kmong-main-thumbnail.png" alt="전북청년마을 앱 MVP 썸네일" width="1200" height="1200" loading="lazy" decoding="async">
      </span>
      <span class="portfolio-case-card__body">
        <span class="portfolio-case-card__tag portfolio-case-card__tag--mvp">MOBILE APP</span>
        <strong>전북청년마을 앱 MVP</strong>
        <span class="portfolio-case-card__date">Case 03 · 2026</span>
        <span class="portfolio-case-card__stack">React Native · Expo · TypeScript · Supabase Auth/RLS/Storage · EAS Build</span>
        <span class="portfolio-case-card__excerpt">체류형 청년마을 사업 참여자가 QR 미션, 현장 지도, 공지 흐름을 모바일에서 따라갈 수 있도록 설계·구현한 React Native/Expo 앱 MVP입니다. Supabase Auth/RLS/Storage, EAS Build, 운영자 데이터 흐름까지 연결했습니다.</span>
      </span>
    </a>

    <a class="portfolio-case-card" href="/portfolio/jeonbuk-youth-village-admin-web/">
      <span class="portfolio-case-card__media">
        <img src="/static/img/portfolio/jeonbuk-youth-village-admin-web/kmong-web-main-thumbnail.png" alt="전북청년마을 관리자웹 MVP 썸네일" width="1200" height="1200" loading="lazy" decoding="async">
      </span>
      <span class="portfolio-case-card__body">
        <span class="portfolio-case-card__tag portfolio-case-card__tag--web">ADMIN WEB</span>
        <strong>전북청년마을 관리자웹 MVP</strong>
        <span class="portfolio-case-card__date">Case 04 · 2026</span>
        <span class="portfolio-case-card__stack">Next.js · TypeScript · Supabase · PostgreSQL · Cloudflare Pages · GitHub Actions</span>
        <span class="portfolio-case-card__excerpt">프로그램, 참여자, 콘텐츠, QR 미션, 공지·푸시 발송을 관리하는 Next.js 관리자웹 MVP입니다. 지역 사업 운영자가 모바일 앱 데이터를 확인하고 현장 운영을 조정할 수 있는 백오피스 흐름으로 구성했습니다.</span>
      </span>
    </a>

    <a class="portfolio-case-card" href="/portfolio/kpop-ai-face-test/">
      <span class="portfolio-case-card__media">
        <img src="/static/projects/kpopface.jpg" alt="K-POP AI 얼굴상 테스트 썸네일" width="800" height="800" loading="lazy" decoding="async">
      </span>
      <span class="portfolio-case-card__body">
        <span class="portfolio-case-card__tag portfolio-case-card__tag--toy">TOY PROJECT</span>
        <strong>K-POP AI 얼굴상 테스트</strong>
        <span class="portfolio-case-card__date">Case 05 · Consumer AI</span>
        <span class="portfolio-case-card__stack">TensorFlow.js · Teachable Machine · Supabase · PWA · Android WebView · SEO</span>
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
        <span class="portfolio-case-card__date">Case 06 · Automation</span>
        <span class="portfolio-case-card__stack">Docker · Docker Compose · n8n · Self-hosted Automation · FFmpeg · OpenAI TTS API</span>
        <span class="portfolio-case-card__excerpt">블로그·뉴스·K-POP 숏폼·오디션 SNS 발행과 K-POP 얼굴상 테스트 마케팅을 자동화하고, 서버 상태 점검, 파일 정리·보관, SSD→HDD 콜드 아카이브, 보안 점검, 운영 리포트 발송까지 n8n 워크플로우로 관리한 프로젝트. n8n Schedule Trigger, Claude Code Gateway, PloStack 자동화 스킬, RSS/API 수집, Gemini/OpenAI TTS API/FFmpeg, 서버 점검 스크립트를 연결했습니다.</span>
      </span>
    </a>
  </div>
</section>
