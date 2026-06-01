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
        <p>개인 장비 묶음이 아니라 역할이 분리된 조직형 AI 운영환경으로 구성해 실제 회사처럼 작업을 나누고 기록할 필요가 있었다.</p>
        <p>목표는 여러 서버의 에이전트와 도구를 연결해 작업 지시·분배·검증·기록·24시간 관제를 상시 처리하는 운영 기반을 만드는 것이었다.</p>
      </div>
    </section>

    <section class="portfolio-case-intro__section">
      <h2>내가 맡은 범위와 구현</h2>
      <div>
        <p>작업실의 노트북 2대를 11번·12번 개발/직원 서버로 고정 IP 할당하고, 장비별 역할과 업무 분장 흐름을 설계했다.</p>
        <p>데스크톱에는 Ubuntu OS를 설치해 13번 NAS/Linux 서버로 운영하고, 모든 프로젝트와 데이터를 HDD에 저장·관리하는 중앙 스토리지로 구성했다.</p>
        <p>OpenClaw와 Hermes가 13번 서버에서 24시간 시스템 상태와 작업 흐름을 관제하도록 두고, Discord·Obsidian·n8n으로 작업 지시와 기록 흐름을 연결했다.</p>
      </div>
    </section>

    <section class="portfolio-case-intro__section">
      <h2>기술 구조</h2>
      <dl class="portfolio-case-intro__spec">
        <div>
          <dt>서버 구성</dt>
          <dd>작업실 노트북 2대는 11번·12번 개발/직원 서버, Ubuntu 데스크톱은 13번 NAS/Linux 서버로 운영.</dd>
        </div>
        <div>
          <dt>연결 구조</dt>
          <dd>Tailscale VPN으로 외부 접속을 열고, 내부 SSH로 서버 간 자원과 실행 환경을 연결.</dd>
        </div>
        <div>
          <dt>운영 레이어</dt>
          <dd>Discord Gateway, Obsidian Vault/Kanban/RAG, n8n, cron, Google Workspace, NAS/HDD 데이터 관리.</dd>
        </div>
        <div>
          <dt>에이전트/도구</dt>
          <dd>OpenClaw, Hermes, Claude Code/Agent Team, Codex, MCP, PloStack 개인 하네스 플러그인.</dd>
        </div>
      </dl>
    </section>
  </div>

  <div class="portfolio-detail-stack">
    <figure class="portfolio-detail-block">
      <a class="portfolio-detail-block__image portfolio-detail-block__image--og" href="https://github.com/plozen/plozen-public-plugins" target="_blank" rel="noopener" aria-label="Plostack 공개 마켓플레이스 저장소 열기">
        <img src="https://opengraph.githubassets.com/plozen-public-plugins/plozen/plozen-public-plugins" alt="Plostack Public Marketplace GitHub 저장소 Open Graph 이미지" width="1200" height="600" loading="eager" decoding="async">
      </a>
      <figcaption>
        <span class="portfolio-detail-block__label">Harness Layer</span>
        <strong>Plostack public/private harness로 업무 라우팅과 실행 절차를 고정</strong>
        <p>여기서 multi-agent는 여러 봇의 개수가 아니라, 업무를 역할별 에이전트에게 위임하고 하네스가 실행 순서와 검증 기준을 통제하는 구조입니다. 공개용 Plostack은 brainstorming, planning, design gate, debugging, verification, finish-flow 같은 반복 가능한 업무 절차를 plugin/skill로 패키징하고, private harness는 Vault, Discord, Kanban, 내부 세션, 팀 역할처럼 내 운영환경에 특화된 맥락과 권한 경계를 담당합니다.</p>
        <a class="portfolio-detail-block__link" href="https://github.com/plozen/plozen-public-plugins" target="_blank" rel="noopener">GitHub 저장소 보기</a>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-multi-agent/subagent-registry-repository.png" alt="PLOZEN private plugin repository의 역할별 subagent registry 스크린샷" width="2298" height="1329" loading="eager" decoding="async">
      </div>
      <figcaption>
        <span class="portfolio-detail-block__label">Subagent Registry</span>
        <strong>역할별 subagent 프롬프트와 설정을 repo 단위로 관리</strong>
        <p>breaker, design-reviewer, developer-junior/mid/senior, documenter, QA, researcher, reviewer, security처럼 업무 역할별 subagent를 파일로 정의했습니다. 스킬은 작업 성격에 맞는 지식과 운영 규칙을 필요한 순간에 로드하고, 서브에이전트는 각 역할의 책임·도구·추론 강도·쓰기 권한을 분리해 하네스가 작업 성격에 맞는 실행자를 고를 수 있게 합니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-multi-agent/plozen-private-plugins-repository.png" alt="PLOZEN private plugin marketplace GitHub 저장소 스크린샷" width="1707" height="1181" loading="eager" decoding="async">
      </div>
      <figcaption>
        <span class="portfolio-detail-block__label">Skill + Subagent Automation</span>
        <strong>업무 지시를 skill 선택과 subagent 실행 계획으로 변환</strong>
        <p>사용자가 작업만 지시해도 하네스가 먼저 범위를 분류하고, 필요한 skill을 로드한 뒤 subagent 위임 여부를 판단합니다. 예를 들어 새 기능은 brainstorming/planning을 거쳐 developer와 reviewer로 나누고, 실패 분석은 debugging과 QA를, 문서 작업은 documenter와 vault 규칙을 우선 적용합니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image portfolio-detail-block__image--portrait">
        <img src="/static/img/portfolio/plostack-multi-agent/discord-group-agent-intro.png" alt="PLOZEN Discord 그룹 채널에서 에이전트 통신을 확인한 캡처" width="804" height="892" loading="eager" decoding="async">
      </div>
      <figcaption>
        <span class="portfolio-detail-block__label">Discord Control Plane</span>
        <strong>직원별 1인 1에이전트가 공개 채널에서 서로 작업 맥락을 공유</strong>
        <p>Discord는 단순 알림 채널이 아니라 에이전트 조직의 control plane입니다. 직원에 특화된 에이전트들이 공개 채널에서 작업 요청, 진행 보고, handoff 메모를 공유하고, 서로 멘션해 추론 결과를 전달하면서 업무를 분배·처리할 수 있게 구성했습니다.</p>
      </figcaption>
    </figure>

    <figure class="portfolio-detail-block">
      <div class="portfolio-detail-block__image">
        <img src="/static/img/portfolio/plostack-multi-agent/obsidian-kanban.png" alt="PLOZEN 운영 작업을 준비, 진행중, 완료로 관리하는 Obsidian Kanban" width="1918" height="1026" loading="eager" decoding="async">
      </div>
      <figcaption>
        <span class="portfolio-detail-block__label">Shared Memory &amp; Retrieval</span>
        <strong>Kanban, 세션 요약, 일기, 벡터 DB로 이어받을 수 있는 작업 기억을 유지</strong>
        <p>Kanban은 현재 작업 상태와 완료 기준을 보여주고, 세션 요약은 하루 작업의 의사결정과 다음 할 일을 남깁니다. 일기와 운영 기록은 공개 문서에 남기기 어려운 맥락을 보존하고, 벡터 DB는 이 기록들을 검색 가능한 지식으로 바꿔 다음 에이전트가 필요한 근거를 다시 찾게 만드는 검색 메모리 역할을 맡습니다.</p>
      </figcaption>
    </figure>
  </div>
</section>
