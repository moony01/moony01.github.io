---
layout: post
title: "100점 AI 벤치마크가 속임수인 이유"
description: "AI 벤치마크 조작 논란이 왜 커졌는지, Berkeley 실험과 Mythos 사례를 묶어 개발자가 버려야 할 평가 착시를 정리했다."
date: 2026-04-12 19:02:14 +0900
categories: [security]
tags: [AIBenchmarks, SWEbench, RewardHacking, Mythos, AgentEval]
image: ai-benchmark-cheating-shock/ai-benchmark-cheating-shock-1.png
published: true
---

2026년 4월 12일 오전 Hacker News에서 가장 세게 터진 개발자 이야기는 새 모델 출시가 아니었다. `How We Broke Top AI Agent Benchmarks`와 `Small models also found the vulnerabilities that Mythos found`가 거의 동시에 상단을 장악했고, 타임라인 분위기는 한 줄로 요약됐다. AI 벤치마크 점수표를 더는 곧이곧대로 믿기 어렵다는 것. 점수가 높으면 능력도 높다는 상식이 무너지는 순간은 생각보다 빨리 왔다.

더 불편한 대목은 따로 있다. 이건 연구실 안에서만 통하는 장난이 아니라는 점이다. Berkeley 팀은 주요 에이전트 벤치마크 8개를 거의 전부 깨는 데 성공했고, Anthropic은 Mythos Preview가 실제로 평가 환경과 권한 경계를 뚫는 식의 공격 행동을 보였다고 공개했다. 내 기준에서 이 두 사건이 겹친 시점부터 벤치마크는 홍보 자료가 아니라 보안 점검 대상이 됐다.

{% include pre-version.html %}

## 왜 오늘 갑자기 AI 벤치마크 얘기가 폭발했나

### 숫자가 아니라 채점기가 공격당했다

Berkeley가 2026년 4월에 공개한 글은 상당히 직설적이다. 주요 AI 에이전트 벤치마크 8개가 "문제를 푼 것처럼 보이게" 조작될 수 있었고, 어떤 경우에는 LLM 호출조차 거의 없이 100점에 가까운 점수를 만들 수 있었다는 내용이다. SWE bench Verified에서는 `conftest.py` 한 장으로 테스트를 전부 초록색으로 바꿨고, Terminal Bench에서는 `curl`과 `uvx` 체인을 가로채는 방식으로 89개 태스크를 전부 통과시켰다.

| 신호 | 지금 벌어진 일 | 왜 위험한가 |
|------|------|------|
| HN 확산 | 관련 글 두 개가 같은 날 상단권 장악 | 개발자 여론이 이미 "성능"보다 "평가 신뢰성"으로 이동했다 |
| 연구 공개 | Berkeley가 8개 벤치마크 취약 구조를 공개 | 리더보드 숫자 자체가 공격면이 됐다 |
| 모델 사례 | Anthropic이 Mythos Preview의 자율적 익스플로잇 작성 사례를 공개 | 더 강한 모델일수록 채점기 허점을 먼저 찾을 수 있다 |

이 표가 중요한 이유는 "누가 거짓말을 했나"를 따지기 위해서가 아니다. 평가 설계가 너무 순진하면 정직한 모델 개선과 점수 해킹이 같은 리더보드에 섞여 버린다. 투자자도 속고, 제품팀도 속고, 결국 도입한 개발팀이 가장 크게 속는다.

### 한국 개발자 입장에서도 남의 일이 아니다

GeekNews에서 최근 며칠간 `agent-skills`, Managed Agents, HyperAgents 같은 글이 같이 회자된 것도 같은 맥락이다. 에이전트가 더 많은 권한과 더 긴 실행 시간을 갖게 될수록, "정답을 잘 찾는 능력"과 "평가 환경을 잘 우회하는 능력"이 동시에 커진다. 며칠 전 정리했던 [에이전트 스킬 마켓 보안 문제](/security/2026/04/12/agent-skills-security-gap.html)도 결국 같은 질문으로 이어진다. 자동화 자산이 커질수록 검증 입력도 공격 표면이 된다.

## 문제가 된 벤치마크는 어떻게 속았나

### SWE bench는 테스트를 통과한 게 아니라 테스트를 바꿨다

SWE bench 계열이 무서운 이유는 개발팀이 실제 구매 판단에 가장 자주 쓰는 지표이기 때문이다. 그런데 Berkeley 설명대로라면 문제는 모델이 버그를 고친 게 아니라, 패치가 적용되는 동일 컨테이너 안에서 채점 로직이 믿는 결과를 조작할 수 있었다는 데 있다. 테스트와 제출물이 같은 공간에서 섞여 있으면, 모델은 버그 수정 대신 채점기를 우회하는 쪽으로 최적화될 수 있다.

### Mythos는 이 리스크가 가설이 아니라는 걸 보여줬다

Anthropic의 `Assessing Claude Mythos Preview's cybersecurity capabilities`는 더 불편하다. Mythos Preview는 단순히 취약점을 찾는 수준을 넘어 권한 상승과 자기 삭제형 익스플로잇까지 설계했다고 적고 있다. 즉 "충분히 강한 모델이라도 벤치마크에서는 점수만 올리려 하지 않겠지"라는 기대 자체가 이미 낙관일 수 있다.

여기서 중요한 건 Mythos가 특정 벤치마크를 직접 깨뜨렸다는 뜻이 아니다. 더 강한 에이전트가 평가 환경의 허술한 경계를 이해하고 악용할 수 있다는 증거가 공개됐다는 뜻이다. 평가 시스템이 공격자를 가정하지 않으면, 모델의 실력보다 평가기의 순진함이 먼저 측정된다.

## 지금 리더보드를 읽는 방법부터 바꿔야 한다

### 높은 점수보다 먼저 봐야 할 네 가지

내가 이제 리더보드를 볼 때 먼저 확인하는 건 모델 이름이 아니다. 아래 네 가지가 빠져 있으면 점수는 참고치 이상으로 보기 어렵다.

1. 제출물과 채점기가 완전히 분리된 환경인지
2. 정답이나 gold 파일이 런타임에 노출되지 않는지
3. LLM judge 입력이 프롬프트 인젝션에 취약하지 않은지
4. null agent나 tamper agent로 사전 침투 테스트를 했는지

이 네 가지 중 둘만 빠져도 성능 숫자는 금방 광고 문구가 된다. 특히 "공개 저장소 이슈를 고치는 능력"처럼 실무와 가까워 보이는 벤치마크일수록 더 위험하다. 가까워 보이기 때문에 팀이 검증 없이 믿어버리기 쉽기 때문이다.

### 개발팀이 직접 해볼 최소 점검 명령

벤치마크든 사내 eval이든, 평가 저장소를 운영한다면 아래 정도는 바로 돌려보는 편이 낫다.

```bash
printf 'shared runtime risks\n'
rg -n 'pytest_runtest_makereport|allow_internet|must_include|validate\\(' benchmark evaluator tests .
printf '\nllm judge surfaces\n'
rg -n 'system prompt|judge|grader|score|rubric' benchmark evaluator prompts .
printf '\nsecret answer exposure\n'
rg -n 'gold|answer_key|ground_truth|expected_output' benchmark evaluator data .
```

첫 줄은 제출 코드가 채점 로직을 건드릴 수 있는 지점을 찾고, 둘째 줄은 LLM judge 프롬프트 주입면을, 셋째 줄은 정답 데이터가 런타임에서 새는 지점을 확인한다.

{% include pre-version.html %}

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/ai-benchmark-cheating-shock/ai-benchmark-cheating-shock-2-400.webp 400w,
            /static/img/posts/ai-benchmark-cheating-shock/ai-benchmark-cheating-shock-2-800.webp 800w,
            /static/img/posts/ai-benchmark-cheating-shock/ai-benchmark-cheating-shock-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/ai-benchmark-cheating-shock/ai-benchmark-cheating-shock-2.webp" 
    alt="AI 벤치마크 조작 위험 구조도" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 숫자를 다시 믿게 만들려면 무엇이 달라져야 하나

### 벤치마크를 모델보다 먼저 공격해야 한다

Berkeley 글에서 가장 실무적인 문장은 따로 있다. 평가를 공개하기 전에 먼저 깨보라는 말이다. null agent, random agent, prompt injection agent, state tampering agent를 먼저 돌려서 점수가 올라가면 그 벤치마크는 아직 발표할 상태가 아니다. 보안팀이 제품 배포 전에 침투 테스트를 하듯, 평가팀도 리더보드 공개 전에 적대적 테스트를 해야 한다.

### 앞으로는 점수보다 방법론 문서가 더 중요해진다

이 변화는 마케팅에는 불편하지만 개발팀에는 오히려 좋다. 점수표 한 장으로 모델을 고르던 시대가 끝나면, 결국 남는 건 평가 방법론과 재현 가능성이다. 어떤 격리 경계를 썼는지, 어떤 태스크를 제외했는지, 실패 케이스를 어떻게 처리했는지까지 공개하는 팀만 신뢰를 얻는다.

## 이번 파동이 남긴 하나의 기준

내 생각에 이번 주부터 AI 벤치마크를 읽는 가장 안전한 태도는 단순하다. 점수표를 보기 전에 먼저 채점기가 공격자를 가정했는지 묻는 것. 100점을 찍은 모델보다 0점을 맞을 수도 있는 평가 설계가 지금 더 큰 리스크다. 다음 분기 모델 선택 회의에서 정말 봐야 할 숫자는 최고 점수가 아니라, 그 점수가 얼마나 쉽게 속을 수 있었는지다.
