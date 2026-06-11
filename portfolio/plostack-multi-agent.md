---
layout: default
title: "PLOZEN Multi-Agent Orchestration System"
description: "PLOZEN Multi-Agent Orchestration System 개인 AX 운영환경과 Plostack 하네스 포트폴리오 상세 페이지입니다."
permalink: /portfolio/plostack-multi-agent/
noindex: true
disable_ads: true
---

<section class="portfolio-case-page portfolio-case-page--wide">
  <a class="portfolio-case-page__back" href="/portfolio/">&larr; Portfolio</a>
  <span class="portfolio-page__eyebrow">Case 02</span>
  <h1>PLOZEN Multi-Agent Orchestration System</h1>

  <div class="portfolio-case-intro">
    <section class="portfolio-case-intro__section">
      <h2>문제와 목표</h2>
      <div>
        <p>개발, 문서화, 조사, 일정관리, 시스템 점검, 파일 관리가 여러 장비와 도구에 흩어져 반복 관리 비용이 컸다.</p>
        <p>목표는 여러 실행 환경의 에이전트와 도구를 연결해 작업 지시·분배·검증·기록을 반복 가능한 운영 절차로 만드는 것이었다.</p>
      </div>
    </section>

    <section class="portfolio-case-intro__section">
      <h2>내가 맡은 범위와 구현</h2>
      <div>
        <p>개발 장비와 Ubuntu 서버를 역할별 실행 환경으로 나누고, 장비별 책임과 업무 분장 흐름을 설계했다.</p>
        <p>PloStack public/private harness를 기준으로 작업 범위 분류, skill 로딩, subagent 위임, 검증·보고 흐름을 정리했다.</p>
        <p>Discord, Obsidian, n8n은 작업 요청, 운영 기록, 자동화 연결 지점으로 두고 Codex, Claude Code, OpenClaw 실행 환경을 역할별로 분리했다.</p>
      </div>
    </section>

    <section class="portfolio-case-intro__section">
      <h2>기술 구조</h2>
      <div>
        <p>Ubuntu, Discord, Obsidian, n8n, Codex CLI, Claude Code, OpenClaw, MCP, PloStack.</p>
      </div>
    </section>
  </div>

  <div class="portfolio-detail-stack">
    <figure class="portfolio-detail-block">
      <a class="portfolio-detail-block__image portfolio-detail-block__image--og" href="https://github.com/plozen/plozen-public-plugins" target="_blank" rel="noopener" aria-label="Plostack 공개 마켓플레이스 저장소 열기">
        <img src="/static/img/portfolio/plostack-multi-agent/plozen-public-plugins-repository.png" alt="Plostack Public Marketplace GitHub 저장소 스크린샷" width="1600" height="1000" loading="eager" decoding="async">
      </a>
      <figcaption>
        <strong>Plostack harness로 작업 분류와 검증 절차를 표준화</strong>
        <p>여기서 multi-agent는 여러 봇의 개수가 아니라, 업무를 역할별 에이전트에게 위임하고 하네스가 실행 순서와 검증 기준을 표준화하는 구조입니다. 공개용 Plostack은 brainstorming, planning, design gate, debugging, verification, finish-flow 같은 반복 가능한 업무 절차를 plugin/skill로 패키징하고, private harness는 Vault, Discord, Kanban, 내부 세션, 팀 역할처럼 운영환경에 특화된 맥락과 권한 기준을 담당합니다.</p>
        <a class="portfolio-detail-block__link" href="https://github.com/plozen/plozen-public-plugins" target="_blank" rel="noopener">GitHub 저장소 보기</a>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-multi-agent/plozen-private-plugins-repository.png" alt="PLOZEN private plugin marketplace GitHub 저장소 스크린샷" width="1707" height="1181" loading="eager" decoding="async">
      </div>
      <figcaption>
        <strong>private plugin marketplace로 내부 운영 맥락을 별도 관리</strong>
        <p>공개 Plostack은 범용 절차와 디자인/검증 하네스를 담당하고, private plugin marketplace는 Vault, Discord, Kanban, 세션 요약, 내부 agent team처럼 외부에 공개하기 어려운 운영 맥락을 분리해 관리합니다. public과 private를 나눠 공개 가능한 절차와 내부 실행 권한 기준을 같은 구조로 유지했습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-multi-agent/subagent-registry-repository.png" alt="PLOZEN private plugin repository의 역할별 subagent registry 스크린샷" width="2298" height="1329" loading="eager" decoding="async">
      </div>
      <figcaption>
        <strong>역할별 subagent 프롬프트와 설정을 repo 단위로 관리</strong>
        <p>breaker, design-reviewer, developer-junior/mid/senior, documenter, QA, researcher, reviewer, security처럼 업무 역할별 subagent를 파일로 정의했습니다. 각 역할은 책임, 도구 사용 기준, 판단 범위가 다르고, 하네스는 작업 성격에 맞춰 적절한 실행자를 선택합니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-multi-agent/harness-dispatch-checklist-flow.png" alt="PLOZEN portfolio 점검 요청을 public/private harness와 background dispatch로 라우팅한 CLI 증적" width="1239" height="1247" loading="eager" decoding="async">
      </div>
      <figcaption>
        <strong>사용자 요청을 scope 분류, skill 선택, background-dispatch로 라우팅</strong>
        <p>포트폴리오 점검 요청에 대해 Nexus가 먼저 표준 작업으로 분류하고, public orchestration, private orchestration, background-dispatch를 순서대로 적용했습니다. 실제 파일 수정과 배포는 금지한 상태에서 상세 보강과 공개 위험 점검을 병렬로 맡기는 흐름입니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-multi-agent/subagent-runtime-roles.png" alt="PLOZEN CLI에서 documenter, reviewer 등 subagent 실행 상태를 확인하는 화면" width="1232" height="226" loading="eager" decoding="async">
      </div>
      <figcaption>
        <strong>역할별 subagent 풀을 분리해 실행 상태를 관리</strong>
        <p>documenter, reviewer, developer, QA 같은 역할은 같은 작업을 반복하는 단순 병렬 호출이 아니라 서로 다른 책임을 가진 실행자입니다. 문서 보강은 documenter가 보고, 공개 리스크와 표현 검증은 reviewer가 보는 식으로 역할과 판단 기준을 분리해 Nexus가 통합할 수 있게 구성했습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-multi-agent/subagent-checklist-result-summary.png" alt="documenter와 reviewer subagent 결과를 Nexus가 통합하는 CLI 증적" width="1258" height="704" loading="eager" decoding="async">
      </div>
      <figcaption>
        <strong>subagent 결과를 Nexus가 통합하고 다음 실행 기준을 확정</strong>
        <p>documenter는 포트폴리오 서사와 증적 누락을 점검했고, reviewer는 공개 포트폴리오에 올릴 때의 민감정보와 과장 표현을 확인했습니다. Nexus는 두 결과를 합쳐 성과 수치, 실행 흐름 증적, public/private 경계 보강 순서로 정리했습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-multi-agent/obsidian-kanban.png" alt="PLOZEN 운영 작업을 준비, 진행중, 완료로 관리하는 Obsidian Kanban" width="1918" height="1026" loading="eager" decoding="async">
      </div>
      <figcaption>
        <strong>Kanban과 세션 요약으로 작업 기억을 유지</strong>
        <p>Kanban은 현재 작업 상태와 완료 기준을 보여주고, 세션 요약은 하루 작업의 의사결정과 다음 할 일을 남깁니다. 운영 기록은 VectorDB/RAG 검색 메모리와 연결되어 다음 에이전트가 이전 판단 근거를 다시 찾을 수 있는 기반으로 사용됩니다.</p>
      </figcaption>
    </figure>
  </div>
</section>
