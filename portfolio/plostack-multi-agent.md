---
layout: default
title: "PLOZEN Multi-Agent 운영환경"
description: "PLOZEN Multi-Agent 운영환경 포트폴리오 상세 페이지입니다."
permalink: /portfolio/plostack-multi-agent/
noindex: true
---

<section class="portfolio-case-page portfolio-case-page--wide">
  <a class="portfolio-case-page__back" href="/portfolio/">&larr; Portfolio</a>
  <span class="portfolio-page__eyebrow">Case 01</span>
  <h1>PLOZEN Multi-Agent 운영환경</h1>
  <p>개발, 문서화, 조사, 검증, 기록 업무를 Discord 기반 작업 지시와 Obsidian/Kanban 지식관리 흐름으로 연결해 개인 작업을 조직형 에이전트 운영 구조로 확장한 AX 운영환경입니다.</p>

  <div class="portfolio-case-summary">
    <div><strong>Type</strong><span>Multi-Agent Ops</span></div>
    <div><strong>Scope</strong><span>Discord · Kanban · Vault</span></div>
    <div><strong>Evidence</strong><span>Discord · Work State · Graph</span></div>
  </div>

  <section class="portfolio-ops-diagram" aria-labelledby="plostack-diagram-title">
    <div class="portfolio-ops-diagram__header">
      <span>Operating Diagram</span>
      <h2 id="plostack-diagram-title">요청이 기록 가능한 결과로 남는 흐름</h2>
      <p>내부 서버 번호, 봇 ID, 계정 정보는 제외하고 공개 가능한 역할 흐름만 남겼습니다.</p>
    </div>

    <div class="portfolio-ops-map">
      <article class="portfolio-ops-node portfolio-ops-node--input">
        <span>Input</span>
        <strong>작업 요청</strong>
        <p>대표님이 Discord 또는 CLI에서 작업 목표와 우선순위를 전달합니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true">→</span>

      <article class="portfolio-ops-node portfolio-ops-node--primary">
        <span>Routing</span>
        <strong>Discord Command Layer</strong>
        <p>멘션, 진행 보고, 완료 기준을 한곳에서 정리해 다음 작업자로 보냅니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true">→</span>

      <article class="portfolio-ops-node portfolio-ops-node--workers">
        <span>Execution</span>
        <strong>Agent Workers</strong>
        <ul>
          <li>Nexus</li>
          <li>Pulse</li>
          <li>Arche</li>
          <li>Sentinel</li>
        </ul>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true">→</span>

      <article class="portfolio-ops-node portfolio-ops-node--output">
        <span>Output</span>
        <strong>Recorded Output</strong>
        <p>Kanban, Obsidian 세션, 공개 플러그인 링크로 판단과 결과를 남깁니다.</p>
      </article>
    </div>
  </section>

  <section class="portfolio-evidence-section" aria-labelledby="plostack-evidence-title">
    <h2 id="plostack-evidence-title">Operational Evidence</h2>
    <p>공개 가능한 캡처는 내부 토큰, 계정, 고객 정보가 드러나지 않는 범위에서 통신, 작업 상태, 지식 축적 구조를 보여주는 화면만 사용합니다.</p>

    <div class="portfolio-evidence-grid portfolio-evidence-grid--two">
      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__media portfolio-evidence-card__media--discord" href="/static/img/portfolio/plostack-multi-agent/discord-group-agent-intro.png" aria-label="PLOZEN Discord 그룹 채널에서 에이전트 통신을 확인한 캡처 원본 이미지 열기"></a>
        <figcaption>
          <strong>Discord Group Channel</strong>
          <span>대표 요청, 에이전트 응답, 통신 확인이 같은 채널에 남는 지휘 레이어</span>
        </figcaption>
      </figure>

      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__media portfolio-evidence-card__media--plugin" href="https://github.com/plozen/plozen-public-plugins" target="_blank" rel="noopener" aria-label="Plostack 공개 플러그인 저장소 열기">
          <span class="portfolio-plugin-thumb__label">PLOSTACK PLUGIN</span>
          <strong class="portfolio-plugin-thumb__title">Codex 작업 흐름을 플러그인으로 배포</strong>
          <span class="portfolio-plugin-thumb__grid" aria-hidden="true">
            <span>design-quality</span>
            <span>background-dispatch</span>
            <span>verification</span>
            <span>plugin.json</span>
          </span>
          <span class="portfolio-plugin-thumb__footer">skills · harness · reusable workflow</span>
        </a>
        <figcaption>
          <strong>Plostack Public Plugins</strong>
          <span>디자인 하네스, 백그라운드 위임, 검증 플로우를 Codex 플러그인으로 묶은 공개 배포 단위</span>
        </figcaption>
      </figure>

      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__media portfolio-evidence-card__media--graph" href="/static/img/portfolio/plostack-multi-agent/obsidian-graph.png" aria-label="PLOZEN 작업 기록이 연결된 Obsidian 그래프 뷰 원본 이미지 열기"></a>
        <figcaption>
          <strong>Obsidian Knowledge Graph</strong>
          <span>작업 기록, 프로젝트 문서, 세션 요약이 연결되는 장기 기억 계층</span>
        </figcaption>
      </figure>

      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__media portfolio-evidence-card__media--kanban" href="/static/img/portfolio/plostack-multi-agent/obsidian-kanban.png" aria-label="PLOZEN 운영 작업을 준비, 진행중, 완료로 관리하는 Obsidian Kanban 원본 이미지 열기"></a>
        <figcaption>
          <strong>Kanban Work State</strong>
          <span>에이전트 담당자, 작업 단계, 완료 기록을 한 화면에서 관리하는 실행 보드</span>
        </figcaption>
      </figure>
    </div>
  </section>
</section>
