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

  <div class="portfolio-detail-stack">
    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plozen-knowledge/rag-similarity-search-smoke.png" alt="PLOZEN RAG Knowledge System document_chunks, document_sources, search_audit_logs 테이블 캡처" width="1452" height="484" loading="eager" decoding="async">
      </div>
      <figcaption>
        <span class="portfolio-detail-block__label">RAG Database Evidence</span>
        <strong>document_chunks, document_sources, search_audit_logs로 검증한 pgvector RAG 저장소</strong>
        <p>문서 source, chunk, embedding vector, content hash, metadata, 검색 audit log를 PostgreSQL schema로 분리하고, demo seed와 similarity search smoke test로 RAG 저장소가 실제 검색 가능한 상태인지 확인했습니다. 후속 단계에서는 Obsidian/Markdown ingest와 real embedding provider를 연결합니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <a class="portfolio-detail-block__image portfolio-detail-block__image--og" href="https://github.com/plozen/plozen-knowledge" target="_blank" rel="noopener" aria-label="PLOZEN RAG Knowledge System GitHub 저장소 열기">
        <img src="https://opengraph.githubassets.com/plozen-knowledge/plozen/plozen-knowledge" alt="PLOZEN RAG Knowledge System GitHub 저장소 Open Graph 이미지" width="1200" height="600" loading="lazy" decoding="async">
      </a>
      <figcaption>
        <span class="portfolio-detail-block__label">Repository</span>
        <strong>pgvector RAG schema와 MCP/API 확장 저장소</strong>
        <p>RAG DB schema, seed, similarity smoke SQL, README evidence를 저장소로 관리합니다. 검색 도구는 MCP Server search_knowledge와 API 레이어로 확장하고, 후속 agent workflow는 LangChain/LangGraph 기반으로 연결합니다.</p>
        <a class="portfolio-detail-block__link" href="https://github.com/plozen/plozen-knowledge" target="_blank" rel="noopener">GitHub 저장소 보기</a>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plozen-knowledge/obsidian-vault-repository.png" alt="PLOZEN Obsidian Vault GitHub 저장소 스크린샷" width="1678" height="1198" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <span class="portfolio-detail-block__label">Source Documents</span>
        <strong>Obsidian Vault 기반 문서형 RAG source</strong>
        <p>세션 기록, 프로젝트 문서, Todo archive, 운영 로그를 Markdown 원문으로 관리하고, 이후 chunking/embedding 파이프라인의 source document로 사용합니다. 매번 긴 컨텍스트를 프롬프트에 붙이는 대신, 필요한 근거 문서를 검색해서 가져오는 구조를 목표로 했습니다.</p>
      </figcaption>
    </figure>
  </div>
</section>
