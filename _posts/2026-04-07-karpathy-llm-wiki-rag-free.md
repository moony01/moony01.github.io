---
layout: post
title: "Karpathy가 RAG를 버렸다 — 40만 단어 AI 위키의 충격"
description: "Andrej Karpathy가 4월 3일 공개한 LLM 지식베이스 — RAG와 벡터 DB 없이 40만 단어 마크다운 위키를 AI가 혼자 구축한다. 지금 바로 따라할 수 있는 방법을 정리했다."
date: 2026-04-07 11:00:00 +0900
categories: [ai]
tags: [LLM, Karpathy, 지식베이스, RAG, AI위키, ClaudeCode, 개발자워크플로우]
image: karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-1.png
published: true
---

Karpathy는 단 한 줄도 직접 쓰지 않았다.

400,000단어. 100개 기사. 촘촘한 백링크 네트워크. 그것도 단일 연구 주제 하나에 대해서만. 일반 박사 논문 한 편이 80,000~100,000단어쯤 된다는 걸 감안하면, Karpathy는 AI와 함께 박사 논문 다섯 편 분량의 지식 구조물을 만들어낸 셈이다.

그런데 RAG 파이프라인은 없다. 벡터 데이터베이스도 없다. 임베딩 서버도, Pinecone 계정도, Weaviate 인스턴스도 없다. 있는 건 `raw/` 디렉토리 하나와 마크다운 파일들, 그리고 LLM이 전부다.

2026년 4월 3일, Andrej Karpathy가 X(구 트위터)에 짧은 포스트를 하나 올렸다. 제목은 "LLM Knowledge Bases". 이 한 편의 글이 며칠 만에 GeekNews 111포인트, VentureBeat 특집 기사, Reddit 프로그래밍 커뮤니티의 열띤 토론을 불러일으켰다.

{% include pre-version.html %}

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-1-400.webp 400w,
            /static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-1-800.webp 800w,
            /static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-1-400.png 400w,
            /static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-1-800.png 800w,
            /static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-1.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-1.png" 
    alt="Karpathy LLM 지식베이스 — RAG 없이 40만 단어 마크다운 위키를 AI가 자동 구축하는 워크플로우" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## LLM 위키의 구조 — raw/에 넣으면 AI가 씁니다

Karpathy의 시스템은 놀랍도록 단순하다. 파이썬 스크립트도, 복잡한 설정 파일도 없다. 디렉토리 두 개와 LLM 호출 루프가 전부다.

### raw/ 디렉토리: 재료를 넣는 곳

모든 것은 `raw/` 폴더에서 시작한다. 논문 PDF, 기사 링크, GitHub 리포지토리, 데이터셋 설명, 이미지, 메모 파일 — 연구 주제와 관련된 소스 자료를 전부 여기에 쌓는다. 기사를 스크랩하든, PDF를 떨어뜨려 넣든, 링크를 텍스트로 저장하든 형식은 상관없다.

이 폴더 자체는 그냥 입력 창고다. 정리할 필요도 없고, 분류할 필요도 없다. LLM이 알아서 읽는다.

### 컴파일 단계: LLM이 위키를 만드는 과정

LLM은 `raw/` 폴더를 읽고 구조화된 마크다운 위키 파일들을 `wiki/` 디렉토리에 생성한다. 단순한 요약이 아니다. LLM은 다음을 수행한다.

- **핵심 개념 추출**: 주요 용어와 아이디어를 식별하고 독립적인 기사로 작성
- **백과사전형 기사 작성**: 각 개념에 대해 심층 설명 작성, 배경부터 적용 사례까지
- **백링크 생성**: 관련 개념 간의 연결 고리를 `[[개념명]]` 형식으로 자동 삽입
- **증분 업데이트**: 새 소스가 추가되면 기존 위키를 업데이트하고 새 기사를 추가

Karpathy가 강조한 핵심 은유는 "컴파일러(compiler)"다. 소스 코드를 실행 가능한 바이너리로 컴파일하듯, LLM은 원시 데이터를 구조화된 지식으로 컴파일한다. RAG처럼 문서를 검색하는 것이 아니라, LLM이 지식 자체를 직접 생산한다.

그가 공유한 핵심 문장이 있다: "내 최근 토큰 처리량의 상당 부분이 코드를 조작하는 것에서 지식을 조작하는 것으로 옮겨가고 있다."

## RAG와 어떻게 다른가

RAG(Retrieval-Augmented Generation)는 지금까지 LLM 기반 지식 시스템의 지배적인 패러다임이었다. 질문이 들어오면 관련 문서를 벡터 검색으로 찾고, 찾은 문서를 LLM에게 컨텍스트로 제공해 응답을 생성한다. 이 구조를 위해 임베딩 모델, 벡터 데이터베이스, 청킹 전략, 검색 파이프라인을 전부 설계해야 한다.

### RAG의 구조적 한계

RAG는 강력하지만 몇 가지 근본적인 문제가 있다.

**청킹 딜레마**: 문서를 어떻게 쪼갤까? 너무 크면 컨텍스트 낭비, 너무 작으면 맥락 손실. 최적 청크 크기는 도메인마다 다르고, 한번 잘못 설정하면 전체 성능이 흔들린다.

**검색 정확도**: 임베딩 기반 유사도 검색은 의미적으로 유사한 문서를 가져오지만, 논리적으로 관련된 문서를 놓치는 경우가 많다. "GPU 메모리 병목"이라는 질문이 "VRAM 부족"에 대한 문서를 제대로 가져올 보장이 없다.

**지식 단편화**: RAG는 원본 문서를 분절된 청크로 저장한다. 전체 개념 구조를 이해하는 게 아니라, 조각을 검색해 붙이는 방식이다. LLM이 문서들 간의 관계를 이해할 기회가 없다.

**운영 복잡도**: 벡터 DB 서버를 띄워야 하고, 임베딩 모델을 유지해야 하고, 인덱스를 관리해야 한다. 개인 프로젝트 수준에서는 배보다 배꼽이 더 커진다.

### LLM 위키의 접근 방식

Karpathy의 방식은 이 문제를 근본부터 다르게 접근한다. LLM이 "지식을 검색"하는 것이 아니라 "지식을 구성"하게 한다. 위키 파일은 이미 인간이 읽을 수 있는 형태로 정리된 지식이다. LLM이 나중에 이 파일들을 컨텍스트로 읽을 때, 청크 검색이 아니라 구조화된 글을 읽는 것이다.

물론 이 방식도 한계가 있다. 위키 파일이 커지면 컨텍스트 윈도우를 초과한다. Karpathy는 이를 계층적 구조, 즉 요약 파일과 상세 기사를 분리하는 방식으로 해결한다.

## Claude Code로 직접 구현해보기

Karpathy의 아이디어 파일을 보면 구현 방법이 구체적으로 나와 있다. Claude Code를 사용해 비슷한 시스템을 즉시 따라해볼 수 있다.

```bash
# 프로젝트 구조 설정
mkdir my-llm-wiki
cd my-llm-wiki
mkdir raw wiki

# raw/에 소스 자료 추가 (PDF, 텍스트, 링크 등 형식 무관)
# 예: 읽은 기사나 논문을 텍스트 파일로 저장
echo "AI 코딩 에이전트 관련 논문 요약" > raw/ai-coding-agents.txt
```

Claude Code에서 다음 프롬프트로 위키를 초기화한다.

```text
raw/ 폴더의 파일들을 읽고 wiki/ 디렉토리에 마크다운 위키를 생성해줘.
각 주요 개념에 대해 독립적인 .md 파일을 만들어.
관련 개념 간에는 [[개념명]] 형식으로 백링크를 추가하고,
백과사전 스타일로 작성해. 요약 인덱스 파일(index.md)도 함께 만들어.
```

새 소스를 추가할 때마다 증분 업데이트 프롬프트를 실행한다.

```text
raw/에 새 파일이 추가됐어. wiki/index.md와 기존 기사들을 참고해서
새 정보를 통합해줘. 필요하면 기존 기사를 업데이트하거나
새 기사를 추가해. 새로 추가된 개념은 기존 관련 기사에 백링크로 연결해.
```

[이전에 다뤘던 OpenAI의 Python 생태계 인수](/ai/2026/03/26/openai-astral-python-tools-acquisition.html)처럼, AI 도구가 개발자 워크플로우를 재편하는 속도가 갈수록 빨라지고 있다. 이 시스템은 단 30분 안에 구축할 수 있고, 운영 비용은 LLM API 호출비가 전부다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-2-400.webp 400w,
            /static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-2-800.webp 800w,
            /static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <source 
    type="image/png"
    srcset="/static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-2-400.png 400w,
            /static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-2-800.png 800w,
            /static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-2.png 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/karpathy-llm-wiki-rag-free/karpathy-llm-wiki-rag-free-2.png" 
    alt="LLM 지식베이스 컴파일 구조 — raw 디렉토리에서 구조화된 마크다운 위키로 변환되는 과정" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 개발자 커뮤니티의 반응

GeekNews에서 이 글은 111포인트를 기록하며 당일 최고 인기 글이 됐다. 반응은 크게 두 갈래로 나뉜다.

**"드디어 RAG를 단순하게 만들 수 있다"는 쪽**은 이 접근법의 유지보수 용이성을 높이 산다. 벡터 DB를 운영할 필요 없이, 마크다운 파일만 Git으로 관리하면 된다. 팀 협업도 쉽고, 에러 추적도 쉽다. "내가 원하는 게 바로 이거였다"는 반응이 많았다.

**"이건 결국 컨텍스트 윈도우 문제가 있다"는 쪽**은 위키가 커질수록 LLM이 전체를 읽기 어려워진다고 지적한다. Karpathy 본인도 이 점을 인정했다. 그의 해법은 계층적 요약 구조다. 인덱스 파일은 가볍게 유지하고, 세부 기사는 필요할 때만 읽는다.

또 다른 관점도 있다. RAG가 "검색"을 담당했다면, 이 방식은 "이해"를 LLM에게 선제적으로 맡기는 것이다. 어떤 질문이 들어올지 모르지만, LLM이 미리 개념 간 관계를 파악해두면 응답 품질이 달라진다.

이 논쟁 자체가 LLM의 컨텍스트 윈도우 확장이 얼마나 중요한 문제인지를 보여준다. 256K, 1M 컨텍스트가 보편화되면 이 방식의 한계는 자연스럽게 해소된다.

## 위키는 자라고, 질문은 날카로워진다

Karpathy가 이 시스템에서 발견한 가장 흥미로운 효과는 이것이다. 위키가 커질수록, 자신의 질문 품질이 높아진다.

이유는 간단하다. 위키를 구축하는 과정에서 어떤 개념이 잘 정리됐고, 어떤 부분이 아직 흐릿한지가 드러나기 때문이다. "이 개념에 기사가 없네"라는 관찰이 "다음에 뭘 공부해야 하는지"로 자연스럽게 이어진다. 지식베이스가 학습 가이드 역할을 동시에 한다.

개인 지식 관리 도구(PKM)를 운영해본 사람이라면 이 감각을 알 것이다. Obsidian이나 Notion으로 노트를 쌓을 때, 그 구조가 자신의 사고 구조를 반영한다는 것. Karpathy의 LLM 위키는 그 구조를 AI가 대신 만들어준다. 사람은 재료만 제공하면 된다.

복잡한 RAG 파이프라인 없이도 충분히 강력한 지식 시스템을 만들 수 있다. `raw/` 폴더에 오늘 읽은 기사 하나를 떨어뜨려 넣는 것부터 시작해보자. 위키는 스스로 자란다.
