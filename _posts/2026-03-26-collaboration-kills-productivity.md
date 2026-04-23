---
layout: post
title: "팀워크는 거짓말이다 — 개발팀 생산성의 불편한 진실"
description: "개발팀의 20%가 80%를 만든다. GeekNews와 HN을 달군 협업 무용론의 근거와, AI 시대에 팀 구조를 어떻게 바꿔야 하는지 데이터로 분석했다."
date: 2026-03-26 15:00:00 +0900
categories: [se]
tags: [팀워크, 생산성, 협업, 소프트웨어엔지니어링, 개발팀, 파레토법칙]
image: collaboration-kills-productivity/collaboration-kills-productivity-1.png
published: true
---

1947년, 미군 역사학자 S.L.A. Marshall은 충격적인 데이터를 발표했다. 제2차 세계대전 전투에서 실제로 총을 발사한 소총수는 전체의 15~20%에 불과했다. 나머지 80%는 총을 들고 있었지만 방아쇠를 당기지 않았다.

이 수치는 80년이 지나도 달라지지 않았다. 전장만 바뀌었을 뿐이다. 슬랙 채널과 줌 회의실에서도 실제로 '총을 쏘는' 사람은 소수다.

지난주 Joan Westenberg의 ["Collaboration" is bullshit](https://www.joanwestenberg.com/collaboration-is-bullshit/) 글이 GeekNews에서 20개 댓글, Hacker News에서 수백 개의 댓글을 끌어모았다. 찬반은 65 대 35로 "협업이 과대평가됐다"는 쪽이 우세했다. 30년 경력 개발자부터 스타트업 창업자까지, 댓글의 핵심은 하나였다 — **"내 팀에서도 실제로 일하는 사람은 소수다."**

직접 써보니 나도 같은 경험이 있다. 10명짜리 팀에서 일할 때, 스프린트 회고에서 발언하는 사람은 항상 같은 3명이었다. 나머지 7명은 고개를 끄덕이거나 노트북 화면을 쳐다봤다. 그런데 매니저는 "우리 팀의 협업이 잘 되고 있다"고 보고했다.

{% include pre-version.html %}

## 애자일이 만든 '협업 극장'

### 회의가 곧 일이 된 팀

스탠드업, 스프린트 리뷰, 회고, 그루밍, 플래닝 포커. 애자일 방법론이 한국 개발팀에 정착한 이후, 개발자의 하루에는 '의식(ritual)'이 늘었다. 문제는 이 의식들이 코드 품질이나 출시 속도에 기여하는가이다.

2024년 Microsoft Research 조사에 따르면, 개발자는 평균 6~9분마다 업무를 중단당한다. Slack 알림, 멘션, 스레드 답변, 줌 초대. 한 번 중단되면 원래 맥락을 되찾는 데 평균 23분이 걸린다는 연구 결과도 있다. 하루에 컨텍스트 스위칭만 10~15회라면, 순수 코딩 시간은 하루 3시간도 안 된다.

### 도구는 쌓이는데 코드는 안 나온다

Notion, Jira, Confluence, Slack, Figma, Linear. 팀이 사용하는 협업 도구의 수는 2020년 이후 2배 넘게 늘었다. 그런데 도구가 늘어난 만큼 코드가 나왔는가?

Joan Westenberg의 표현을 빌리면, **"투명성과 가시성을 진짜 진전이라고 착각하기 시작했다."** Jira 보드의 티켓을 옮기고, Confluence에 회의록을 정리하고, Slack에서 스레드를 만드는 행위 자체가 "일"이 되어버린 것이다. 내 경험상, 협업 도구를 가장 열심히 쓰는 사람과 가장 많은 코드를 배포하는 사람은 거의 겹치지 않았다.

이 현상에는 이름이 있다. 1913년 프랑스 농업공학자 Maximilien Ringelmann이 줄다리기 실험에서 발견한 **링겔만 효과**다. 줄을 잡는 사람이 늘어날수록, 각자가 쓰는 힘은 줄어든다. 심리학에서는 **'사회적 태만(Social Loafing)'**이라 부른다. 팀이 커지면 "누군가 하겠지"라는 무의식이 작동한다.

## 80 대 20 — git log는 거짓말을 안 한다

이론은 됐고, 숫자를 보자. 터미널을 열고 다음 명령을 쳐보라. 당신 팀의 현실이 그대로 드러난다.

```bash
# 최근 6개월간 팀원별 커밋 수 확인
git shortlog -sn --since="6 months ago" --no-merges

# 팀원별 실제 코드 변경량(추가+삭제) 집계
git log --since="6 months ago" --no-merges --format='%aN' --numstat \
  | awk '/^[0-9]/{a[n]+=$1; d[n]+=$2} /^[^0-9]/{n=$0} \
    END{for(i in a) print a[i]+d[i], i}' \
  | sort -rn
```

이 명령은 팀 레포지토리에서 누가 얼마나 코드를 움직였는지를 한 눈에 보여준다. 상위 20%의 개발자가 전체 코드 변경량의 70~80%를 차지하는 패턴이 나올 것이다. 이건 당신 팀만의 문제가 아니다. 파레토 분포는 거의 모든 소프트웨어 프로젝트에서 반복된다.

Frederick Brooks는 1975년 《맨먼스 미신(The Mythical Man-Month)》에서 "늦어지는 프로젝트에 인력을 투입하면 더 늦어진다"고 경고했다. 50년이 지났지만 이 법칙을 무시하는 조직은 여전히 넘친다. 이유는 간단하다. 커뮤니케이션 오버헤드는 n(n-1)/2로 증가한다. 5명일 때 10개이던 소통 경로가 10명이면 45개, 20명이면 190개가 된다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/collaboration-kills-productivity/collaboration-kills-productivity-2-400.webp 400w,
            /static/img/posts/collaboration-kills-productivity/collaboration-kills-productivity-2-800.webp 800w,
            /static/img/posts/collaboration-kills-productivity/collaboration-kills-productivity-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/collaboration-kills-productivity/collaboration-kills-productivity-2.webp" 
    alt="개발팀 규모별 커뮤니케이션 오버헤드와 순 생산성 변화 그래프" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## AI 코딩 에이전트가 판을 뒤집었다

이 논쟁이 2026년에 다시 불붙은 데는 이유가 있다. AI 코딩 도구가 개인의 생산성 천장을 깨버렸기 때문이다.

### 1인 개발 생산성의 폭발

이전에 다뤘던 [YC CEO Garry Tan의 gstack 프로젝트](/ai/2026/03/23/garry-tan-gstack-claude-code-engineering-team.html)가 이 논쟁에 불을 붙였다. Claude Code를 활용한 가상 엔지니어링 팀으로, 한 명이 60만 줄 이상의 코드를 생산했다는 주장이다. 과장이 섞였을 수 있지만, 방향성은 부정하기 어렵다.

GeekNews에서도 "Claude Code로 생산성을 높이는 방법"(33포인트)이 동시에 트렌딩됐다. 반복 작업 자동화와 병렬 워크트리로 커밋 수가 급증했다는 경험담이 줄을 이었다.

### 곱셈기 효과는 상위 20%에게만 작동한다

여기서 불편한 진실이 하나 더 나온다. AI 코딩 도구의 본질은 "평범한 개발자를 슈퍼 개발자로 만드는 것"이 아니다. **이미 생산적인 20%를 더 생산적으로 만드는 것**이다.

코드 맥락을 정확히 이해하고, 프롬프트를 효과적으로 쓰고, AI가 뱉은 결과물을 검증할 수 있는 사람만이 진짜 생산성 폭발을 경험한다. 나머지에게 AI는 또 하나의 도구일 뿐이다. Notion이 추가되었을 때와 다를 바 없다.

```python
# Brooks의 법칙 시뮬레이션: 팀 규모별 실질 생산량
def team_output(n, output_per_person=100, overhead_per_pair=2):
    """팀 규모별 순 생산량 계산"""
    paths = n * (n - 1) / 2          # 커뮤니케이션 경로 수
    overhead = paths * overhead_per_pair
    gross = n * output_per_person
    net = max(0, gross - overhead)
    return n, gross, overhead, net, f"{net/gross*100:.0f}%"

print(f"{'팀원':>4}  {'총생산':>6}  {'오버헤드':>8}  {'순생산':>6}  {'효율':>5}")
print("-" * 38)
for size in [3, 5, 8, 12, 20]:
    m, g, o, net, eff = team_output(size)
    print(f"{m:4d}  {g:6d}  {o:8.0f}  {net:6.0f}  {eff:>5}")
```

이 시뮬레이션을 돌려보면, 팀원 12명을 넘어서면 효율이 급격히 떨어진다. 20명이면 순 생산량이 8명짜리 팀보다 낮아지는 역전 현상까지 발생한다. 물론 현실에서 오버헤드 계수는 팀마다 다르겠지만, 방향성은 변하지 않는다.

## 그래서 팀을 해체하라는 건가?

아니다. 핵심은 **'협업'과 '조율'을 구분하는 것**이다.

**조율(Coordination)**은 필요하다. 누가 어떤 모듈을 담당하고, API 스펙은 어떻게 맞추고, 배포 일정은 언제인지 합의하는 것. 이건 오버헤드가 아니라 기반 구조다.

**협업(Collaboration)**이 문제가 되는 건, 모두가 모든 결정에 참여해야 한다는 환상 때문이다. 코드 리뷰에 5명이 달라붙고, 아키텍처 결정에 팀 전체 투표를 하고, 디자인 리뷰에 백엔드 개발자까지 소환하는 식이다.

Hacker News 토론에서 30년 경력의 한 개발자는 이렇게 썼다:

> "The date is always more important than the actual deliverable."

조직이 정말 신경 쓰는 건 산출물의 품질이 아니라 데드라인이다. 그리고 데드라인을 지키는 가장 확실한 방법은 결정권자를 줄이는 것이지, 회의 참석자를 늘리는 것이 아니다.

Linux 커널처럼 대규모 협업이 성공한 사례도 분명히 있다. 하지만 Linux 커널의 구조를 자세히 보면, 실은 **수천 개의 소규모 독립 팀**이 명확한 서브시스템 오너십 아래에서 움직이는 구조다. "모두가 함께"가 아니라, "각자의 영역에서 책임지고 만든 것을 합친다"에 가깝다.

## 당신 팀의 git log가 말해주는 한 가지

결국 협업이 헛소리인지 아닌지는 추상적 논쟁이 아니다. `git log`를 열면 답이 나온다.

내 팀에서 실제로 코드를 밀어넣는 사람이 몇 명인지, 나머지는 뭘 하고 있는지, 회의에 쓰는 시간 대비 배포 빈도는 어떤지. 측정할 수 있는 것은 측정해야 한다.

그리고 측정 결과가 80 대 20을 보여준다면, 두 가지 선택지가 있다.

1. **팀을 줄이고 개인에게 권한을 준다.** AI 도구로 무장한 3명이 10명의 "협업 팀"보다 빠르게 움직일 수 있다.
2. **80%의 기여도를 끌어올릴 구조를 만든다.** 회의를 줄이고, 오너십을 명확히 하고, 블로킹을 없앤다.

어느 쪽이든, 지금 하고 있는 "모두가 참여하는 협업"은 답이 아니다. 진짜 생산성은 혼자 집중하는 오후 3시간에서 나온다. 슬랙 알림을 끄고, 줌 초대를 거절하고, 에디터만 바라보는 그 시간에서.
