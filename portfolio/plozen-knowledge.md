---
layout: default
title: "PLOZEN RAG Knowledge System"
description: "PLOZEN RAG Knowledge System pgvector RAG MCP Server API LangChain LangGraph 포트폴리오 상세 페이지입니다."
permalink: /portfolio/plozen-knowledge/
noindex: true
disable_ads: true
---

<section class="portfolio-case-page portfolio-case-page--wide">
  <a class="portfolio-case-page__back" href="/portfolio/">&larr; Portfolio</a>
  <span class="portfolio-page__eyebrow">Case 01 · 진행중</span>
  <h1>PLOZEN RAG Knowledge System</h1>
  <p>PLOZEN 내부 문서, 프로젝트 기록, 세션 로그, 완료 Todo를 <strong>PostgreSQL pgvector 기반 RAG 저장소</strong>로 색인하고, <strong>MCP Server search_knowledge 도구</strong>와 API로 에이전트가 근거 문서를 다시 찾게 만드는 <strong>조직 지식 검색 시스템</strong>입니다. 후속 레이어는 <strong>LangChain·LangGraph retriever/agent workflow</strong>로 확장합니다.</p>

  <section class="portfolio-ops-diagram" aria-label="PLOZEN RAG Knowledge System 흐름">
    <div class="portfolio-ops-map">
      <article class="portfolio-ops-node portfolio-ops-node--input">
        <strong>Obsidian / Markdown</strong>
        <p><strong>세션 기록, 프로젝트 문서, 완료 Todo archive</strong>를 ingest 대상으로 둡니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true"></span>

      <article class="portfolio-ops-node portfolio-ops-node--primary">
        <strong>pgvector RAG</strong>
        <span class="portfolio-ops-node__status">진행중</span>
        <p><strong>chunking, embedding, similarity search, source metadata</strong>를 PostgreSQL에서 관리합니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true"></span>

      <article class="portfolio-ops-node portfolio-ops-node--workers">
        <strong>API · MCP Server</strong>
        <p><strong>FastAPI</strong>와 <strong>MCP Server</strong>가 <strong>search_knowledge, get_source</strong> 검색 도구를 제공합니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true"></span>

      <article class="portfolio-ops-node portfolio-ops-node--output">
        <strong>LangChain · LangGraph</strong>
        <p>후속 단계에서 <strong>retriever, tool calling, agent workflow</strong>로 확장합니다.</p>
      </article>
    </div>
  </section>

  <section class="portfolio-evidence-section" aria-label="PLOZEN RAG Knowledge System 증빙">
    <div class="portfolio-section-divider"><span>Evidence</span></div>
    <div class="portfolio-evidence-grid portfolio-evidence-grid--two">
      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__media portfolio-evidence-card__media--repo-og" href="https://github.com/plozen/plozen-knowledge" target="_blank" rel="noopener" aria-label="PLOZEN RAG Knowledge System GitHub 저장소 열기">
          <img src="https://opengraph.githubassets.com/plozen-knowledge/plozen/plozen-knowledge" alt="PLOZEN RAG Knowledge System GitHub 저장소 Open Graph 이미지" loading="lazy" decoding="async">
        </a>
        <figcaption>
          <strong>PG Vector/MCP Server·API/LangChain·LangGraph 시스템 (진행중)</strong>
          <span>PLOZEN 내부 문서와 세션 기록을 pgvector로 색인하고, MCP/API 검색 도구와 LangChain·LangGraph 에이전트 레이어로 확장하는 RAG 시스템 저장소</span>
        </figcaption>
      </figure>

      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__image portfolio-evidence-card__image--repository-shot" href="/static/img/portfolio/plozen-knowledge/obsidian-vault-repository.png" aria-label="PLOZEN Obsidian Vault 저장소 스크린샷 원본 이미지 열기">
          <img src="/static/img/portfolio/plozen-knowledge/obsidian-vault-repository.png" alt="PLOZEN Obsidian Vault GitHub 저장소 스크린샷" width="1678" height="1198" loading="lazy" decoding="async">
        </a>
        <figcaption>
          <strong>Obsidian Vault 기반 문서형 RAG Source</strong>
          <span>Obsidian Vault Markdown 원문을 GitHub 저장소로 동기화하고, 세션 기록·프로젝트 문서·Todo archive·운영 로그를 pgvector chunking/embedding 파이프라인의 source document로 사용합니다.</span>
        </figcaption>
      </figure>
    </div>
  </section>
</section>
