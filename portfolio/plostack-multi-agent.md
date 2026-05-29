---
layout: default
title: "PLOZEN Multi-Agent Orchestration System"
description: "PLOZEN Multi-Agent Orchestration System 포트폴리오 상세 페이지입니다."
permalink: /portfolio/plostack-multi-agent/
noindex: true
disable_ads: true
---

<section class="portfolio-case-page portfolio-case-page--wide">
  <a class="portfolio-case-page__back" href="/portfolio/">&larr; Portfolio</a>
  <span class="portfolio-page__eyebrow">Case 02</span>
  <h1>PLOZEN Multi-Agent Orchestration System</h1>
  <p>작업실의 노트북 2대를 <strong>11번·12번 개발/직원 서버</strong>로 고정 IP 할당하고, 데스크톱에는 Ubuntu OS를 설치해 <strong>13번 NAS/Linux 서버</strong>로 운영했습니다. 13번 서버는 모든 프로젝트와 데이터를 HDD에 저장·관리하는 <strong>중앙 스토리지</strong>이자, <strong>OpenClaw와 Hermes</strong>가 24시간 시스템 상태와 작업 흐름을 관제하는 운영 노드입니다. 이 장비들을 <strong>Tailscale VPN, 내부 SSH, Discord, Obsidian, n8n</strong>으로 연결해 개인 장비 묶음이 아니라 <strong>역할이 분리된 조직형 AI 운영환경</strong>으로 구성했습니다.</p>

  <section class="portfolio-ops-diagram" aria-label="PLOZEN Multi-Agent Orchestration System 흐름">
    <div class="portfolio-ops-map">
      <article class="portfolio-ops-node portfolio-ops-node--input">
        <strong>작업 요청</strong>
        <p>작업 요청자가 Discord 또는 CLI에서 작업 목표와 우선순위를 전달합니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true"></span>

      <article class="portfolio-ops-node portfolio-ops-node--primary">
        <strong>Discord Command Layer</strong>
        <p>멘션, 진행 보고, 완료 기준을 한곳에서 정리해 다음 작업자로 보냅니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true"></span>

      <article class="portfolio-ops-node portfolio-ops-node--workers">
        <strong>Agent Workers</strong>
        <p>11-agent, 12-agent, 13-agent, 13-agent(OpenClaw)가 개발, 리뷰, 서버 운영, 실행 지원을 분담합니다.</p>
      </article>

      <span class="portfolio-ops-arrow" aria-hidden="true"></span>

      <article class="portfolio-ops-node portfolio-ops-node--output">
        <strong>Recorded Output</strong>
        <p>Kanban, Obsidian 세션, 공개 마켓플레이스 링크로 판단과 결과를 남깁니다.</p>
      </article>
    </div>
  </section>

  <section class="portfolio-evidence-section" aria-label="PLOZEN Multi-Agent Orchestration System 증빙">
    <div class="portfolio-section-divider"><span>Evidence</span></div>
    <div class="portfolio-evidence-grid portfolio-evidence-grid--two">
      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__media portfolio-evidence-card__media--discord" href="/static/img/portfolio/plostack-multi-agent/discord-group-agent-intro.png" aria-label="PLOZEN Discord 그룹 채널에서 에이전트 통신을 확인한 캡처 원본 이미지 열기"></a>
        <figcaption>
          <strong>Discord Group Channel</strong>
          <span>작업 요청, 에이전트 응답, 통신 확인이 같은 채널에 남는 지휘 레이어</span>
        </figcaption>
      </figure>

      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__media portfolio-evidence-card__media--repo-og" href="https://github.com/plozen/plozen-public-plugins" target="_blank" rel="noopener" aria-label="Plostack 공개 마켓플레이스 저장소 열기">
          <img src="https://opengraph.githubassets.com/plozen-public-plugins/plozen/plozen-public-plugins" alt="Plostack Public Marketplace GitHub 저장소 Open Graph 이미지" loading="lazy" decoding="async">
        </a>
        <figcaption>
          <strong>Plostack Public Marketplace</strong>
          <span>Codex와 Claude Code에 적용할 수 있는 공개용 Plostack 하네스·스킬 마켓플레이스입니다. 비공개 내부용 Plostack 하네스는 별도 private overlay로 분리 운영합니다.</span>
        </figcaption>
      </figure>

      <figure class="portfolio-evidence-card portfolio-evidence-card--wide">
        <a class="portfolio-evidence-card__image portfolio-evidence-card__image--repository-shot" href="/static/img/portfolio/plostack-multi-agent/plozen-private-plugins-repository.png" aria-label="Plostack private marketplace 저장소 스크린샷 원본 이미지 열기">
          <img src="/static/img/portfolio/plostack-multi-agent/plozen-private-plugins-repository.png" alt="PLOZEN private plugin marketplace GitHub 저장소 스크린샷" width="1707" height="1181" loading="lazy" decoding="async">
        </a>
        <figcaption>
          <strong>Plostack Private Marketplace</strong>
          <span>PLOZEN 내부용 하네스, 팀 스킬, 에이전트 운영 overlay를 Claude Code와 Codex 공용 플러그인 마켓플레이스로 분리 관리하는 private 저장소</span>
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
