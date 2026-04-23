---
layout: post
title: '"AI한테 코딩 시키면 되지, 왜 배워요?" — 이 말이 주니어 개발자를 망칩니다'
date: 2026-03-19 11:00:00 +0900
categories: [ai]
tags: [ai, programming, career, htmx, junior-developer]
image: htmx-programming-still-worth-learning-ai-era/htmx-programming-still-worth-learning-ai-era-1.png
published: true
---

요즘 개발자 커뮤니티에서 이런 말을 자주 듣습니다. "어차피 AI가 다 짜주는데, 굳이 코딩을 배울 필요가 있나요?" 신입 취업 준비생들은 더 노골적으로 물어봅니다. "ChatGPT나 Claude한테 시키면 되잖아요. 코딩 공부는 시간 낭비 아닌가요?"

이 질문에 가장 흥미로운 답을 내놓은 사람이 있습니다. 바로 htmx의 창시자이자 Montana State University 컴퓨터공학과 교수인 **Carson Gross**입니다. 그는 최근 "Yes, and..."라는 에세이를 발표했고, GeekNews에서 이틀째 댓글 30개를 넘기며 개발자들 사이에 격렬한 토론을 불러일으키고 있습니다.

그의 핵심 주장은 단순합니다. "배워야 한다. 그런데 방법이 바뀌어야 한다." 그리고 AI를 가장 위험하게 쓰는 사람은 경험 많은 시니어가 아니라 **이제 막 시작한 주니어 개발자**라고 경고합니다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/htmx-programming-still-worth-learning-ai-era/htmx-programming-still-worth-learning-ai-era-1-400.webp 400w,
            /static/img/posts/htmx-programming-still-worth-learning-ai-era/htmx-programming-still-worth-learning-ai-era-1-800.webp 800w,
            /static/img/posts/htmx-programming-still-worth-learning-ai-era/htmx-programming-still-worth-learning-ai-era-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/htmx-programming-still-worth-learning-ai-era/htmx-programming-still-worth-learning-ai-era-1.webp" 
    alt="htmx 창시자의 AI 시대 프로그래밍 논쟁" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## "마법사의 견습생 함정"이 뭔가요

Carson Gross가 제시한 개념 중 가장 강렬한 것이 **"Sorcerer's Apprentice Trap"**, 즉 마법사의 견습생 함정입니다. 영화 판타지아를 떠올리시면 됩니다. 마법사 미키 마우스가 빗자루에게 물 긷는 일을 시켰더니, 빗자루가 멈추지 않아 홍수가 나죠.

AI가 코드를 생성해준다고 해서, 그 코드를 아무 이해 없이 프로덕션에 넣으면 똑같은 일이 벌어집니다. 빗자루(AI)는 멈추지 않고, 그 코드가 어떤 부작용을 만들지 이해하는 사람이 없는 거죠.

Gross의 주장은 이렇습니다.

> "코드를 읽는 능력은 코드를 써본 사람에게서만 나온다. AI가 생성한 코드를 검토하고 평가하는 능력은, 직접 코드를 짜본 경험 없이는 절대 개발되지 않는다."

이건 단순한 감상이 아닙니다. AI 코딩 도구의 핵심 문제는 컴파일러와 다르다는 점입니다. C에서 Python으로 전환하면, 컴파일러는 결정론적으로 동작합니다. 규칙이 있고, 그 규칙대로만 변환됩니다. 그런데 LLM은 다릅니다. 비결정론적이고, 때로는 그럴듯하지만 완전히 틀린 코드를 생성합니다. 이 코드가 틀렸는지 아닌지 판단하려면, 내가 그 코드가 무엇을 해야 하는지 정확히 알고 있어야 합니다.

주니어 개발자가 AI로 생성한 코드를 그냥 붙여 넣으면 어떻게 될까요? 동작은 합니다. 그런데 1년 후, 그 코드를 수정해야 할 때, 아무도 그 코드를 이해하지 못하는 사태가 벌어집니다. 심지어 그 코드를 처음 "작성"한 사람도요.

## 실제 데이터가 보여주는 냉혹한 현실

감성적인 주장만 있는 게 아닙니다. 숫자가 말합니다.

미국 노동통계국(BLS) 데이터에 따르면, 2022년부터 2024년까지 **"컴퓨터 프로그래머" 직종이 약 27% 감소**했습니다. 현재 수준은 1980년 이후 최저입니다. 브루킹스 연구소의 Mark Muro는 이것을 "AI의 초기, 가시적인 노동시장 영향"이라고 표현했습니다.

이 수치를 보면 "역시, 코딩 배울 필요 없겠네"라고 생각할 수 있습니다. 그런데 여기서 중요한 맥락이 빠져 있습니다. **사라지는 건 단순 코딩 업무이고, 늘어나는 건 시스템을 설계하고 AI 산출물을 검토하는 역할**입니다.

문제는 이겁니다. 기업들이 "주니어 업무는 AI가 대체한다"며 신입 채용을 줄이고 있습니다. 그 결과, 신입 자리가 사실상 시니어 아키텍트 수준의 역할을 요구하는 모순적 상황이 발생했습니다. 코딩을 해본 경험 없이 어떻게 아키텍처를 설계합니까?

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/htmx-programming-still-worth-learning-ai-era/htmx-programming-still-worth-learning-ai-era-2-400.webp 400w,
            /static/img/posts/htmx-programming-still-worth-learning-ai-era/htmx-programming-still-worth-learning-ai-era-2-800.webp 800w,
            /static/img/posts/htmx-programming-still-worth-learning-ai-era/htmx-programming-still-worth-learning-ai-era-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/htmx-programming-still-worth-learning-ai-era/htmx-programming-still-worth-learning-ai-era-2.webp" 
    alt="AI 시대 프로그래밍 학습 딜레마" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 시니어와 주니어, AI를 써야 하는 방식이 다릅니다

Gross는 AI 코딩 도구를 쓰는 방법이 경력에 따라 완전히 달라야 한다고 주장합니다. 이 부분이 특히 실용적이라 정리해봤습니다.

**시니어 개발자가 AI를 잘 활용하는 경우:**
- 기존 코드베이스 분석 및 설명 요청
- 이미 충분히 이해한 작은 스니펫 생성
- 정규식, CSS처럼 본인이 지루하게 느끼는 영역
- 버릴 데모, 프로토타입 빠르게 만들기

**시니어 개발자가 AI를 피해야 하는 경우:**
- 시스템 API 설계 (AI가 설계한 아키텍처는 장기 유지보수 지옥)
- 장기적으로 유지해야 하는 핵심 로직 전체 생성

**주니어 개발자에 대한 Gross의 한 줄 조언:**
> "You have to write the code." — 직접 코드를 짜야 합니다.

AI를 쓰되, 코드 생성기로 쓰는 건 안 됩니다. 환경 설정처럼 막히는 부분에서 도움을 받고, 내가 작성한 코드에 대한 피드백을 요청하는 용도가 맞습니다.

## 앞으로 개발자에게 진짜 중요한 4가지

Gross는 AI 시대에 프로그래머가 갖춰야 할 역량이 변한다고 말합니다.

**1. 글쓰기와 커뮤니케이션 능력**

LLM에게 정확히 원하는 걸 요청하려면, 생각을 명확하게 표현할 수 있어야 합니다. 모호한 프롬프트는 모호한 코드를 만들어냅니다. Gross는 개발자들에게 책을 읽고, 글을 써보라고 권합니다. 코딩 스킬 못지않게 중요해질 역량입니다.

**2. 비즈니스 도메인 이해**

개발자들은 전통적으로 비즈니스에 무관심했습니다. AI가 단순 코딩을 처리해주는 지금, 개발자가 차별화되는 지점은 **비즈니스 문제를 정확히 이해하는 능력**입니다. 코드를 짜기 전에 왜 이걸 만들어야 하는지를 아는 것.

**3. 시스템 아키텍처 설계**

복잡도를 관리하고 큰 시스템을 설계하는 능력은 오히려 더 중요해집니다. 역설적으로, 이 능력은 작은 코드를 직접 많이 써봐야만 길러집니다. AI가 작은 단위 코딩을 대체할수록, 주니어 개발자들이 이 능력을 키울 기회가 줄어드는 것이 진짜 문제입니다.

**4. AI 산출물 평가 능력**

LLM이 생성한 코드가 맞는지 틀린지, 최적인지 아닌지 판단하는 능력. 이건 코딩을 해본 사람만 갖출 수 있습니다. AI 시대에 가장 값비싼 역량이 될 것입니다.

## "Vibe coding 하면 되지 않나요"에 대한 답

"어차피 결과물이 작동하면 되잖아요"라는 반론이 있습니다. 이른바 **vibe coding** — AI가 생성하는 대로 받아서 쓰고, 이해는 나중에.

Gross는 이 관행이 일시적으로는 유효할 수 있지만, 반드시 한계에 부딪힌다고 말합니다. AI가 생성한 코드들이 쌓이면서 복잡도 폭발이 일어납니다. 그때 이 코드를 이해하고 수정할 수 있는 사람이 아무도 없는 사태가 발생하고, 기업들은 결국 "직접 코드를 이해하는 개발자"의 가치를 깨닫게 됩니다.

"복잡도 폭발은 결국 기업들로 하여금 진짜 이해를 가진 개발자가 필요하다는 걸 납득시킬 것이다. 이 과정은 느리고 고통스럽겠지만, 반드시 올 것이다." — Carson Gross

## 마치며

GeekNews에서 30개의 댓글이 달린 건 이 주제가 얼마나 첨예한지 보여줍니다. AI가 코드를 다 짜줄 수 있다는 사람들과, 그래도 배워야 한다는 사람들의 논쟁은 앞으로도 계속될 겁니다.

하지만 Carson Gross의 핵심 포인트는 분명합니다. AI를 잘 쓰려면, AI가 생성한 코드를 평가할 수 있어야 합니다. 그리고 그 능력은 직접 코드를 써봐야만 생깁니다.

"AI한테 시키면 되지"라는 말이 주니어 개발자에게 가장 위험한 이유가 바로 여기 있습니다. 코드를 이해하는 능력을 키울 시간을 빼앗기 때문입니다. 마법사의 견습생처럼, 마법을 이해하지 못한 채 마법을 부리다가 결국 홍수에 잠기는 것처럼요.

프로그래밍을 배우세요. 단, AI와 함께 배우는 방법을 배우세요. 그게 지금 가장 현명한 선택입니다.

> 본 글은 htmx 창시자 Carson Gross의 에세이 "Yes, and..."(htmx.org/essays/yes-and/)와 GeekNews 커뮤니티 논의, BLS 통계 데이터를 바탕으로 작성되었습니다.
