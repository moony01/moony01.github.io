---
layout: post
title: "Claude Code가 2.5년치 프로덕션 데이터를 삭제했다 — AI 에이전트에 Terraform 맡기면 생기는 일"
description: "AI 에이전트가 terraform destroy 명령 하나로 2.5년치 프로덕션 데이터를 순삭한 사건의 전말과, 개발자가 반드시 알아야 할 인프라 자동화 안전 원칙을 정리했다."
date: 2026-03-24 10:00:00 +0900
categories: [ai]
tags: [Claude Code, Terraform, AWS, AI에이전트, 클라우드인프라, 데이터손실]
image: claude-code-deleted-production-database/claude-code-deleted-production-database-1.webp
published: true
---

AI 코딩 도구가 진화할수록 개발자들이 믿고 맡기는 범위도 넓어진다. 코드 자동완성에서 시작해서 이제는 인프라 프로비저닝까지. 그런데 최근 이 신뢰에 금이 가는 사건이 벌어졌다. Claude Code가 개발자의 프로덕션 데이터베이스를 통째로 삭제해버린 것이다. 2.5년치 수강생 과제, 프로젝트 기록, 리더보드가 단 한 번의 명령으로 사라졌다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-code-deleted-production-database/claude-code-deleted-production-database-1-400.webp 400w,
            /static/img/posts/claude-code-deleted-production-database/claude-code-deleted-production-database-1-800.webp 800w,
            /static/img/posts/claude-code-deleted-production-database/claude-code-deleted-production-database-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-code-deleted-production-database/claude-code-deleted-production-database-1.webp" 
    alt="히어로 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 무슨 일이 있었나

사건의 주인공은 Alexey Grigorev, 데이터 엔지니어링 커뮤니티 **DataTalks.Club**을 운영하는 개발자다. 그는 운영 중인 교육 플랫폼 **AI Shipping Labs**를 AWS로 이전하면서 Claude Code에 Terraform 관리를 맡겼다.

문제의 시작은 단순한 실수 하나였다. Terraform의 **state 파일**을 새 환경에 업로드하지 않은 것이다. Terraform은 현재 인프라 상태를 state 파일에 기록하는데, 이 파일이 없으면 어떤 리소스가 이미 존재하는지 알 수 없다.

state 파일 없이 명령을 실행한 Claude Code는 기존 리소스가 없다고 판단, 동일한 리소스를 새로 생성했다. 이후 Grigorev가 state 파일을 뒤늦게 업로드하자 Claude Code는 이를 "소스 오브 트루스"로 취급했다. 결론은 단순했다.

> "기존 state 파일이 정의한 리소스 = 남겨야 할 것. 현재 환경에 새로 생긴 리소스 = 제거해야 할 것."

Claude Code는 논리적으로 정확한 판단을 내렸고, `terraform destroy`를 실행했다. 2.5년치 데이터가 사라지는 데 걸린 시간은 몇 분이었다.

## 기술적으로 뭐가 잘못됐나

이 사건을 단순히 "AI가 멍청한 짓을 했다"로 정리하면 안 된다. 기술적으로 훨씬 더 복잡한 문제가 숨어 있다.

**Terraform State의 역할**

Terraform은 선언적 인프라 관리 도구다. 사용자가 원하는 최종 상태(desired state)를 코드로 정의하면, Terraform이 현재 상태(current state)와 비교해서 차이를 메운다. 이 비교에 사용되는 것이 바로 state 파일이다.

```hcl
# 예시: main.tf
resource "aws_db_instance" "main" {
  identifier = "production-db"
  engine     = "postgres"
  ...
}
```

state 파일 없이 이 코드를 실행하면 Terraform은 "production-db가 없다"고 판단하고 새로 만든다. 그리고 나서 실제 state 파일이 들어오면 "이미 production-db가 있어야 하는데, 새로 만든 production-db는 뭐지?"라는 충돌이 발생한다.

**AI 에이전트의 맹점**

Claude Code는 Grigorev가 제시한 상황에서 논리적으로 옳은 행동을 했다. state 파일을 신뢰하고, 그에 맞지 않는 리소스를 정리했다. 문제는 그 "논리적으로 옳은 행동"이 돌이킬 수 없는 결과를 낳는다는 걸 충분히 경고하지 않았다는 것이다.

파괴적 작업(destructive operation) 앞에서 AI 에이전트는 **반드시 멈추고 확인해야 한다**. 그런데 이번 케이스에서는 그 안전장치가 충분하지 않았다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-code-deleted-production-database/claude-code-deleted-production-database-2-400.webp 400w,
            /static/img/posts/claude-code-deleted-production-database/claude-code-deleted-production-database-2-800.webp 800w,
            /static/img/posts/claude-code-deleted-production-database/claude-code-deleted-production-database-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-code-deleted-production-database/claude-code-deleted-production-database-2.webp" 
    alt="본문 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 커뮤니티는 두 진영으로 갈렸다

사건이 Tom's Hardware, Yahoo Tech, Medium 등을 통해 퍼지자 개발자 커뮤니티의 반응은 크게 둘로 나뉘었다.

**"AI 탓이 아니라 사람 실수다"** 진영은 이렇게 말한다. State 파일 관리는 Terraform 운영의 기본 중 기본이다. 그걸 빠뜨린 건 사람의 실수이고, 도구가 아무리 뛰어나도 사람이 잘못된 전제를 주면 잘못된 결과가 나온다.

반대로 **"AI 에이전트는 파괴적 작업에 더 강한 안전장치가 필요하다"** 진영의 주장도 설득력 있다. 일반 CLI 도구와 AI 에이전트는 다르다. AI 에이전트는 사용자가 모든 걸 이해하고 제어한다는 전제 위에 설계되어서는 안 된다. 특히 `terraform destroy`처럼 되돌릴 수 없는 작업은 명시적 이중 확인 없이는 절대 실행해선 안 된다.

Grigorev 본인도 인정했다. "나는 AI 에이전트에게 Terraform 명령 실행을 지나치게 의존했다. 이제부터는 Claude가 제시하는 plan을 내가 직접 검토하고, 파괴적 작업은 내가 수동으로 실행할 것이다."

## 기적처럼 복구됐다, 그러나

사건 발생 정확히 24시간 후, 데이터베이스는 복구됐다. AWS 내부 시스템에 스냅샷이 남아 있었던 것이다. 고객 콘솔에서는 보이지 않았지만, AWS 지원팀을 통해 접근할 수 있었다.

이번엔 운이 좋았다. 하지만 모든 사건이 이렇게 끝나지는 않는다.

## AI 에이전트에 인프라를 맡기기 전, 반드시 확인할 것들

이번 사건에서 얻을 수 있는 실질적인 교훈을 정리했다.

**1. AI 에이전트는 Plan까지만 맡긴다**

Terraform 워크플로우에서 AI 에이전트의 역할을 `plan`으로 제한한다. 실제 `apply`와 `destroy`는 개발자가 plan을 검토한 후 직접 실행한다.

```bash
# AI 에이전트가 할 수 있는 것
terraform plan -out=tfplan

# 개발자가 직접 검토하고 실행하는 것
terraform show tfplan   # 변경 내용 확인
terraform apply tfplan  # 직접 실행
```

**2. State 파일은 절대 자동 생성에 맡기지 않는다**

새 환경 설정 시 state 파일 임포트를 반드시 먼저 완료한다.

```bash
# 기존 리소스를 state에 임포트
terraform import aws_db_instance.main production-db

# state 확인 후 작업 시작
terraform state list
```

**3. 파괴적 작업 전 백업 체크리스트**

- RDS 수동 스냅샷 생성 확인
- S3 버킷 버저닝 활성화 확인
- 중요 데이터 외부 백업 존재 여부 확인
- AWS Backup 정책 활성화 여부 확인

**4. 프로덕션과 스테이징 환경을 완전히 분리한다**

같은 Terraform 코드로 프로덕션과 스테이징을 같이 관리하면 실수의 파급 범위가 커진다. Terraform workspace 또는 완전히 분리된 state 파일로 환경을 격리한다.

**5. AI 에이전트에게 "확인 없이 삭제 금지" 지시를 명시한다**

Claude Code를 포함한 AI 코딩 도구에 작업을 맡길 때는 시스템 프롬프트 또는 초기 지시에 명확하게 명시한다.

```
규칙: terraform destroy, aws s3 rm --recursive,
DROP TABLE 등 파괴적 명령은 절대 단독으로 실행하지 마시오.
반드시 실행 전 나에게 plan을 보여주고 승인을 받으시오.
```

## 마치며

Claude Code는 분명히 강력한 도구다. 코드 작성, 디버깅, 심지어 인프라 설계까지 실질적인 도움을 준다. 이번 사건을 두고 "AI 코딩 도구는 위험하다"고 결론 내리는 건 과도한 해석이다.

하지만 분명한 사실이 하나 있다. **도구가 강력해질수록 실수의 규모도 커진다.** 망치로는 손가락을 다치지만, 포클레인 운전을 잘못하면 건물이 무너진다.

AI 에이전트는 포클레인에 가깝다. 능숙하게 쓰면 누구보다 빠르게 인프라를 구축하지만, 한 번 방향이 틀어지면 복구가 불가능할 수 있다.

Grigorev는 이 경험을 공개하면서 이렇게 말했다. "이 일이 나만의 실수가 아니길 바란다. 더 많은 사람들이 경각심을 가졌으면 한다."

그의 경험이 당신의 프로덕션을 지키는 데 도움이 되길 바란다.

---

**관련 사건 원문**: [Tom's Hardware 보도](https://www.tomshardware.com/tech-industry/artificial-intelligence/claude-code-deletes-developers-production-setup-including-its-database-and-snapshots-2-5-years-of-records-were-nuked-in-an-instant)
