---
layout: post
title: "GitHub가 당신 코드로 AI를 훈련시킨다"
description: "2026년 4월 24일부터 GitHub Copilot Free, Pro, Pro+ 사용자의 코드와 상호작용 데이터가 AI 학습에 기본 활성화된다. 수집 범위와 옵트아웃 방법을 분석했다."
date: 2026-03-28 11:00:00 +0900
categories: [security]
tags: [GitHub, Copilot, AI학습, 데이터프라이버시, 옵트아웃]
image: github-ai-training-policy/github-ai-training-policy-1.png
published: true
---

4월 24일부터 GitHub가 Copilot Free, Pro, Pro+ 사용자의 상호작용 데이터를 AI 모델 학습에 기본 사용한다. opt-in이 아니라 opt-out이다. 지금 설정을 끄지 않으면, 한 달 뒤 당신이 Copilot에 입력한 코드 조각, 파일 구조, 탭 이동 패턴까지 Microsoft의 AI 파이프라인으로 흘러간다.

3월 25일 GitHub 공식 블로그에 올라온 약관 변경 공지를 읽은 개발자들의 반응은 즉각적이었다. The Register는 "GitHub: We're going to train on your data after all"이라는 제목을 달았고, Hacker News와 Reddit에서는 수백 개의 댓글이 쏟아졌다. 가장 많은 질문은 하나였다 — "그래서 내 프라이빗 레포 코드도?"

직접 약관을 읽어봤다. 그리고 생각보다 범위가 넓었다.

{% include pre-version.html %}

## 3월 25일에 무엇이 바뀌었는가

### 핵심: opt-in에서 opt-out으로

기존에는 Copilot 사용 데이터를 AI 학습에 쓸지 여부를 사용자가 직접 켜야 했다. 4월 24일부터는 반대다. **별도로 끄지 않으면 자동 활성화**된다.

GitHub의 Chief Product Officer는 이 변경의 이유를 이렇게 설명했다. "Microsoft 직원들의 상호작용 데이터를 학습에 포함시킨 결과, AI 제안 수락률이 의미 있게 향상됐다." 요약하면 — 데이터가 많을수록 모델이 좋아지니, 기본값을 켜겠다는 것이다.

이 논리 자체는 기술적으로 틀리지 않다. 문제는 **기본값의 방향**이다. 보안 분야에서는 "기본값이 곧 현실"이라는 격언이 있다. 대부분의 사용자는 설정을 바꾸지 않는다. opt-out 기본값은 사실상 대규모 데이터 수집과 같다.

### 영향 받는 플랜, 안전한 플랜

| 플랜 | AI 학습 대상 | 비고 |
|------|:------:|------|
| Copilot Free | O | 4월 24일 기본 활성화 |
| Copilot Pro | O | 4월 24일 기본 활성화 |
| Copilot Pro+ | O | 4월 24일 기본 활성화 |
| Copilot Business | X | 기업 데이터 보호 |
| Copilot Enterprise | X | 기업 데이터 보호 |
| 학생/교사 무료 플랜 | X | 별도 면제 |

기업 사용자가 면제된 건 당연하다. 엔터프라이즈 고객의 코드를 학습에 쓴다고 했다간 계약이 날아간다. 결국 개인 개발자와 소규모 팀이 데이터 제공자가 되는 구조다. 월 $10 내고 Copilot Pro를 쓰면서 동시에 Microsoft의 AI 학습 데이터도 제공하는 셈이다.

이전에 [Copilot이 프롬프트 인젝션 공격에 취약하다는 분석](/security/2026/02/28/copilot-roguepilot-prompt-injection.html)을 한 적 있다. 그때도 핵심은 "사용자가 인지하지 못하는 사이에 데이터가 흘러간다"는 것이었다. 이번 정책 변경도 같은 맥락이다.

## 코드만 가져가는 게 아니다

### 수집 범위의 실체

GitHub FAQ에 명시된 수집 대상 목록이다:

```
수집 항목:
- 커서 주변의 코드 (code surrounding the cursor)
- 주석과 문서 (comments and documentation)
- 파일명 (file names)
- 레포지토리 구조 (repository structure)
- 탐색 패턴 (navigation patterns)
- Copilot Chat 대화 기록 (chats with Copilot features)
- 제안에 대한 피드백 — 수락/거부 (thumbs-up or thumbs-down)
```

이 목록이 의미하는 건 단순하다. 코드 조각만 수집하는 게 아니라, **어떤 파일을 어떤 순서로 열었는지, Copilot에게 무슨 질문을 했는지, 어떤 제안을 수락하고 거부했는지**까지 전부 포함된다. 코드 학습이 아니라 개발자 행동 패턴 학습이다.

내 생각엔 이게 더 위험하다. 코드 스니펫은 컨텍스트 없이는 의미가 제한적이지만, 개발 패턴 데이터는 "이 개발자가 어떤 문제에서 막히는지, 어떤 유형의 코드를 자주 쓰는지, 어떤 아키텍처를 선호하는지"를 드러낸다. 이건 GitHub이 Copilot 추천 품질을 높이는 데 쓸 수도 있지만, 경쟁 제품과의 차별화 무기가 되기도 한다.

{% include pre-version.html %}

## 이전에 거부한 사용자는 안전한가

### 기존 설정은 유지된다

한 가지 다행인 건, **이전에 데이터 수집을 거부한 사용자는 설정이 유지**된다는 점이다. GitHub FAQ 원문이다:

> If you previously opted out of the setting allowing GitHub to collect this data for product improvements, your preference has been retained.

2024~2025년 사이에 Copilot 설정에서 데이터 수집을 껐던 사람은 4월 24일에 자동 활성화되지 않는다. 하지만 **한 번도 설정을 건드린 적이 없는 사용자는 전부 자동 활성화**된다. Copilot을 쓰면서 설정 페이지를 한 번이라도 열어본 사람이 얼마나 될까.

### 지금 당장 확인하는 두 가지 방법

**방법 1: 브라우저에서 직접 끄기**

```
https://github.com/settings/copilot
```

접속 후 Privacy 섹션에서 `Allow GitHub to use my data for AI model training` 항목을 찾아서 **OFF**로 변경한다.

**방법 2: 터미널에서 설정 페이지 바로 열기**

```bash
# macOS
open "https://github.com/settings/copilot"

# Linux
xdg-open "https://github.com/settings/copilot"

# Windows
start https://github.com/settings/copilot
```

설정 변경 자체는 웹에서만 가능하지만, 터미널에서 바로 열 수 있다. 10초면 끝난다.

## 옵트아웃 버튼 하나로 끝나지 않는 이유

설정을 끄는 건 쉽다. 하지만 더 근본적인 질문이 남는다.

**이미 수집된 데이터는 어떻게 되는가.** GitHub은 이전에 수집한 "제품 개선용" 데이터와 이번 "AI 학습용" 데이터를 어떻게 구분하는지 명확하게 밝히지 않았다. 유럽 사용자는 GDPR의 'right to erasure'로 삭제를 요청할 수 있지만, 한국이나 미국 사용자에게는 동일한 경로가 아직 없다.

**GitHub 없이 개발이 가능한가.** 현실적으로 GitHub은 대체가 어렵다. GitLab, Bitbucket, Codeberg 같은 대안이 있지만, 오픈소스 생태계의 중심은 여전히 GitHub이다. 이직할 때 "GitHub 프로필 보여주세요"라고 하는 세상에서, GitHub을 떠나는 건 개발자 커리어에 불이익이 될 수 있다. 이 구조적 종속이 GitHub에게 기본값을 바꿀 자신감을 준 것일 수도 있다.

**이건 시작일 뿐이다.** Microsoft는 이미 LinkedIn 데이터로 AI 학습을 하고 있고, Bing 검색 데이터도 Copilot 학습에 활용한다. GitHub 코드 데이터는 Microsoft AI 전략의 마지막 퍼즐 조각이었다. opt-out 기본값이라는 작은 스위치 하나가, 전 세계 개발자의 코딩 패턴을 Microsoft의 모델에 주입하는 파이프라인을 완성한다.

4월 24일이 한 달도 안 남았다. 지금 터미널을 열어라.

```bash
# 설정 페이지로 바로 이동 — OS별 명령어
open "https://github.com/settings/copilot"       # macOS
xdg-open "https://github.com/settings/copilot"   # Linux
start https://github.com/settings/copilot         # Windows
```

끄는 데 10초면 된다. 안 끄면 영원히 학습된다.
