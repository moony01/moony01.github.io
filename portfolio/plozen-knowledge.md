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

  <div class="portfolio-case-intro">
    <section class="portfolio-case-intro__section">
      <h2>문제와 목표</h2>
      <div>
        <p>Obsidian 세션 기록, 프로젝트 문서, 완료 Todo가 쌓이면서 문서 그래프가 방대해졌고, 에이전트가 필요한 맥락을 문서 단위로 매번 프롬프트에 붙이는 방식은 토큰 낭비가 컸다.</p>
        <p>목표는 내부 문서와 운영 기록을 PostgreSQL pgvector 기반 RAG 저장소로 색인하고, 에이전트가 필요한 지식만 검색해 가져올 수 있는 FastAPI/MCP 검색 기반을 만드는 것이었다.</p>
      </div>
    </section>

    <section class="portfolio-case-intro__section">
      <h2>내가 맡은 범위와 구현</h2>
      <div>
        <p>Obsidian 원문은 source of truth로 유지하고, 13서버 Ubuntu Docker 환경에 pgvector 컨테이너를 구성해 문서 검색 index를 분리했다.</p>
        <p>문서 source, chunk, embedding vector, content hash, metadata, 검색 audit log를 분리한 schema와 similarity search smoke test로 검색 가능 상태를 검증했다.</p>
      </div>
    </section>

    <section class="portfolio-case-intro__section">
      <h2>기술 구조</h2>
      <div>
        <p>Docker, PostgreSQL, pgvector, FastAPI, MCP, Markdown/Obsidian.</p>
      </div>
    </section>

  </div>

  <div class="portfolio-detail-stack">
    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plozen-knowledge/obsidian-knowledge-graph-density.png" alt="PLOZEN Obsidian Vault 그래프 화면에 프로젝트 문서와 세션 기록이 방대하게 연결된 캡처" width="2559" height="1460" loading="eager" decoding="async">
      </div>
      <figcaption>
        <strong>문서량이 커진 Obsidian 원문 저장소</strong>
        <p>세션 기록, 프로젝트 문서, Todo, 운영 로그가 누적되면서 Vault 그래프가 방대해졌습니다. 에이전트가 전체 문서를 매번 프롬프트에 붙이는 방식은 토큰 비용과 검색 정확도 측면에서 한계가 있었고, 이 원문 저장소를 검색 가능한 RAG index로 분리할 필요가 있었습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plozen-knowledge/vector-db-console.png" alt="PLOZEN VectorDB 관리 콘솔 문서 목록, 글자량, 조각 수, 벡터 상태 화면 캡처" width="2328" height="1795" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <strong>VectorDB 관리 콘솔과 문서 벡터화 흐름</strong>
        <p>문서가 단순 업로드 상태인지, chunking/embedding을 거쳐 VectorDB에 저장된 상태인지 확인하는 관리 콘솔입니다. 문서 목록, 글자량, 조각 수, 적재/벡터 상태를 한 화면에서 확인하고, 업로드와 벡터 생성을 분리해 검색 index 전환 상태를 운영자가 확인할 수 있게 구성했습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plozen-knowledge/rag-similarity-search-smoke.png" alt="PLOZEN RAG Knowledge System document_sources, document_chunks, search_audit_logs 데이터베이스 검증 캡처" width="1452" height="484" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <strong>pgvector 저장소와 similarity search 검증</strong>
        <p>문서 source, chunk, embedding vector, content hash, metadata, search audit log를 분리한 schema로 저장하고, similarity search smoke test로 RAG 저장소가 실제 검색 가능한 상태인지 검증했습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plozen-knowledge/obsidian-vault-repository.png" alt="PLOZEN Obsidian Vault GitHub 저장소 스크린샷" width="1678" height="1198" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <strong>Obsidian 원문과 RAG 검색 index의 경계</strong>
        <p>Obsidian Vault는 세션 기록, 프로젝트 문서, Todo archive, 운영 로그의 source of truth로 유지하고, RAG DB는 검색을 위한 파생 index로 분리했습니다. 에이전트는 전체 문서를 프롬프트에 붙이는 대신 필요한 chunk만 검색해 컨텍스트로 사용할 수 있게 했습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plozen-knowledge/fastapi-openapi-docs.png" alt="PLOZEN Knowledge API FastAPI OpenAPI 문서 endpoint 목록 캡처" width="2328" height="920" loading="lazy" decoding="async">
      </div>
      <figcaption>
        <strong>FastAPI API 계층과 MCP 확장 경계</strong>
        <p>문서 조회, 업로드, 벡터 생성, chunk 조회, 검색, audit log endpoint를 FastAPI로 분리했습니다. Console과 Agent가 같은 API 계층을 사용할 수 있고, MCP tool은 이 API를 감싸는 방식으로 확장할 수 있게 설계했습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-terminal-proof-grid" aria-label="MCP stdio evidence screenshot">
        <a class="portfolio-detail-block__image portfolio-detail-block__image--terminal-proof" href="/static/img/portfolio/plozen-knowledge/mcp-tool-smoke-test.png" target="_blank" rel="noopener" aria-label="MCP tool smoke test 증적 이미지 크게 보기">
          <picture>
            <source media="(max-width: 700px)" srcset="/static/img/portfolio/plozen-knowledge/mcp-tool-smoke-test-mobile.png">
            <img src="/static/img/portfolio/plozen-knowledge/mcp-tool-smoke-test.png" alt="MCP tool smoke test 터미널 캡처. tools/list, list_sources, get_source, search_knowledge 호출이 모두 OK로 표시됩니다." width="1188" height="259" loading="lazy" decoding="async">
          </picture>
        </a>
      </div>
      <figcaption>
        <strong>MCP stdio 연결</strong>
        <p>FastAPI Knowledge API 위에 <b>search_knowledge, list_sources, get_source</b> 도구를 제공하는 stdio MCP Server를 붙였습니다. Codex는 로컬 설정에서 SSH runner를 호출하고, 서버 측 runner가 Knowledge API를 감싸는 방식으로 에이전트 세션에서 내부 지식 검색 도구를 사용할 수 있게 했습니다.</p>
        <p>현재 단계는 포트를 외부로 열지 않는 <b>stdio MCP 연결 완료</b> 상태입니다. JSON-RPC <b>tools/list</b>와 <b>tools/call</b> smoke test로 도구 노출과 list_sources 호출 흐름을 확인했고, HTTP/streamable-http MCP는 인증, 방화벽, rate limit, 로그 기준을 먼저 설계한 뒤 별도 단계로 분리합니다.</p>
      </figcaption>
    </figure>
  </div>
</section>
