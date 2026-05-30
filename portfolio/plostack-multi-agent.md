---
layout: default
title: "Plostack 멀티에이전트 오케스트레이션 하네스"
description: "PLOZEN 전용 Plostack 멀티에이전트 오케스트레이션 하네스 포트폴리오 상세 페이지입니다."
permalink: /portfolio/plostack-multi-agent/
noindex: true
disable_ads: true
---

<section class="portfolio-case-page portfolio-case-page--wide">
  <a class="portfolio-case-page__back" href="/portfolio/">&larr; Portfolio</a>
  <span class="portfolio-page__eyebrow">Case 02</span>
  <h1>Plostack 멀티에이전트 오케스트레이션 하네스</h1>
  <p><strong>Plostack 멀티에이전트 오케스트레이션 하네스</strong>는 PLOZEN 업무 방식에 맞춰 직접 만든 하네스/플러그인 시스템입니다. 업무 지시를 받으면 에이전트가 작업 성격을 분류하고, 필요한 <strong>스킬(skill)</strong>과 <strong>서브에이전트(subagent)</strong>를 자동 선택해 실행·검증·기록까지 이어갑니다. 공개 가능한 <strong>Plostack public harness</strong>와 내 전용 <strong>private harness</strong>를 분리해, 반복 가능한 실행 규칙과 내부 운영 맥락을 동시에 관리합니다.</p>

  <section class="portfolio-practice-brief" aria-label="Multi-Agent 실무 정의">
    <span>Practical Definition</span>
    <strong>Multi-agent는 여러 봇의 수가 아니라, 업무를 역할별 에이전트에게 위임하고 하네스가 실행 순서와 검증 기준을 통제하는 구조입니다.</strong>
    <ul>
      <li><b>하네스(Harness)</b>: 작업을 경량/표준/보호로 분류하고 brainstorming, planning, debugging, verification, finish-flow 같은 실행 절차를 고릅니다.</li>
      <li><b>스킬(Skills)</b>: 작업 성격에 맞는 지식과 운영 규칙을 필요한 순간에 로드합니다.</li>
      <li><b>서브에이전트(Subagents)</b>: developer, reviewer, QA, security, documenter, researcher처럼 역할별 프롬프트와 권한을 가진 실행 단위입니다.</li>
      <li><b>Control Plane</b>: Discord 공개 채널에서 직원별 1인 1에이전트가 서로 작업 맥락을 공유하고, 에이전트끼리도 멘션 기반으로 협업합니다.</li>
      <li><b>Shared Memory</b>: Obsidian 세션, Kanban, Todo card가 다음 에이전트가 이어받을 수 있는 작업 기억과 trace가 됩니다.</li>
    </ul>
  </section>

  <div class="portfolio-detail-stack">
    <figure class="portfolio-detail-block">
      <a class="portfolio-detail-block__image portfolio-detail-block__image--og" href="https://github.com/plozen/plozen-public-plugins" target="_blank" rel="noopener" aria-label="Plostack 공개 마켓플레이스 저장소 열기">
        <img src="https://opengraph.githubassets.com/plozen-public-plugins/plozen/plozen-public-plugins" alt="Plostack Public Marketplace GitHub 저장소 Open Graph 이미지" width="1200" height="600" loading="eager" decoding="async">
      </a>
      <figcaption>
        <span class="portfolio-detail-block__label">Harness Layer</span>
        <strong>Plostack public/private harness로 업무 라우팅과 실행 절차를 고정</strong>
        <p>공개용 Plostack은 brainstorming, planning, design gate, debugging, verification, finish-flow 같은 반복 가능한 업무 절차를 plugin/skill로 패키징합니다. private harness는 Vault, Discord, Kanban, 내부 세션, 팀 역할처럼 내 운영환경에 특화된 맥락과 권한 경계를 담당합니다.</p>
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
        <p>breaker, design-reviewer, developer-junior/mid/senior, documenter, QA, researcher, reviewer, security처럼 업무 역할별 subagent를 파일로 정의했습니다. 단순히 AI를 여러 개 띄우는 것이 아니라, 각 역할의 책임·도구·추론 강도·쓰기 권한을 분리해 하네스가 작업 성격에 맞는 실행자를 고를 수 있게 만든 구조입니다.</p>
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
