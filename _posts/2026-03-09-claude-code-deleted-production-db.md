---
layout: post
title: "Claude Code 프로덕션 DB 삭제 사고: AI 에이전트가 2.5년 데이터를 날린 실화와 예방법"
description: "Claude Code가 Terraform을 잘못 실행해 프로덕션 RDS 데이터베이스와 스냅샷 전체를 삭제한 실제 사고다. 사고 경위, AI 에이전트의 치명적 특성, 즉시 적용 가능한 삭제 보호·상태 파일 원격 관리·권한 제한 안전 수칙을 정리했다."
date: 2026-03-09 10:00:00 +0900
categories: [ai]
tags: [Claude Code, AI 에이전트, Terraform, AWS, 프로덕션 장애, AI 사고]
image: claude-code-deleted-production-db/claude-code-deleted-production-db-1.webp
published: true
---

## Claude Code가 프로덕션 DB를 삭제했다

3월 첫째 주, 개발자 커뮤니티가 발칵 뒤집혔다. Hacker News 상단에는 충격적인 제목의 글이 올라왔고, Tom's Hardware를 비롯한 테크 미디어들이 일제히 이 사건을 보도하기 시작했다.

> "Claude Code deletes developers' production setup, including its database and snapshots — 2.5 years of records were nuked in an instant"

AI 에이전트가 개발자의 프로덕션 환경을 통째로 날려버린 것이다. 데이터베이스, 스냅샷, 2.5년치 학습 기록 1,943,200개 행이 순식간에 사라졌다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-code-deleted-production-db/claude-code-deleted-production-db-1-400.webp 400w,
            /static/img/posts/claude-code-deleted-production-db/claude-code-deleted-production-db-1-800.webp 800w,
            /static/img/posts/claude-code-deleted-production-db/claude-code-deleted-production-db-1.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-code-deleted-production-db/claude-code-deleted-production-db-1.webp" 
    alt="히어로 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

{% include pre-version.html %}

## 무슨 일이 일어났나

피해자는 DataTalks.Club의 운영자 Alexey Grigorev다. 그는 AI Shipping Labs라는 새 웹사이트를 AWS로 이전하면서, DataTalks.Club과 같은 인프라를 공유하기로 결정했다. 비용과 관리 편의를 위한 선택이었다.

문제는 Terraform 상태 파일에서 시작됐다.

Alexey는 작업을 새 컴퓨터에서 진행하면서, **Terraform 상태 파일을 이전 컴퓨터에 그대로 남겨뒀다**. Terraform에서 상태 파일은 현재 인프라의 "진실의 원천"이다. 이게 없으면 Terraform은 기존 리소스를 전혀 모른다.

Claude Code는 상태 파일 없이 `terraform plan`을 실행했다. 당연히 기존 인프라를 모르니, 모든 걸 새로 만들려 했다. Alexey가 이를 발견하고 실행을 중단했다. 여기까지는 괜찮았다.

그다음이 문제였다.

Alexey는 Claude Code에 "생성된 중복 리소스만 삭제해달라"고 지시했다. 에이전트는 이 요청을 처리하기 위해 내부적으로 상태 파일을 재구성했고, 두 사이트의 인프라가 모두 담긴 상태 파일을 "현재 인프라의 진실"로 삼았다. 그리고 "기존 상태와 현재를 맞추기 위해" `terraform destroy`를 실행했다.

**결과**: DataTalks.Club의 데이터베이스, 스냅샷, 2.5년치 데이터가 전부 삭제됐다.

```bash
# Claude Code가 실행한 명령 (단순화된 예시)
terraform destroy -auto-approve

# 삭제된 것들
# - RDS PostgreSQL 인스턴스 (전체)
# - 자동 스냅샷 전체
# - 연결된 보안 그룹, 서브넷 그룹 등
```

{% include pre-version.html %}

## 2.5년이 하루 만에 돌아온 과정

Alexey는 즉시 AWS 비즈니스 지원팀에 연락했다. 다행히 AWS는 삭제된 RDS 스냅샷을 내부적으로 보관하고 있었고, 약 24시간 후 데이터가 복구됐다.

복구된 `courses_answer` 테이블 행 수: **1,943,200개**.

다행스럽게도 데이터는 살아남았지만, 이 사건이 남긴 교훈은 데이터 복구보다 훨씬 중요하다. 사고 직후 AWS 비용도 올랐다. 삭제와 재생성 과정에서 예상치 못한 요금이 발생했고, 현재 월 요금이 약 10% 상승했다.

<picture>
  <source 
    type="image/webp"
    srcset="/static/img/posts/claude-code-deleted-production-db/claude-code-deleted-production-db-2-400.webp 400w,
            /static/img/posts/claude-code-deleted-production-db/claude-code-deleted-production-db-2-800.webp 800w,
            /static/img/posts/claude-code-deleted-production-db/claude-code-deleted-production-db-2.webp 1200w"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px">
  <img 
    src="/static/img/posts/claude-code-deleted-production-db/claude-code-deleted-production-db-2.webp" 
    alt="본문 이미지" 
    class="wd100"
    loading="lazy"
    decoding="async">
</picture>

## 왜 이런 일이 가능했나: AI 에이전트의 치명적 특성

이 사건을 단순히 "Terraform 실수"로 보면 안 된다. 핵심은 **AI 에이전트의 작동 방식**에 있다.

### 1. AI 에이전트는 "논리적 최선"을 따른다

인간이라면 "이 명령이 프로덕션에 영향을 줄 수 있다"는 직관적 경계감이 있다. 하지만 Claude Code는 주어진 컨텍스트에서 논리적으로 가장 합리적인 행동을 선택했다. 상태 파일이 말하는 인프라와 현재 인프라를 맞추는 것, 그 자체는 Terraform의 설계 철학에도 맞는다.

문제는 그 "논리적 최선"이 실제 세계에서는 재앙이 될 수 있다는 것이다.

### 2. 파괴적 작업에 대한 자동 실행 허용

`terraform destroy`는 이미 위험성이 알려진 명령이다. 이 명령이 AI 에이전트에 의해 자동으로 실행됐다는 사실은, **에이전트에 부여된 권한 범위에 대한 재검토**가 필요하다는 것을 보여준다.

### 3. 컨텍스트 누락을 감지하지 못함

Terraform 상태 파일이 없거나 이전 작업과 불일치할 때, 에이전트가 "지금 작업을 진행하면 안 될 것 같다"고 판단하고 멈춰야 했을까? 아니면 사용자에게 명확히 경고해야 했을까? 현재 AI 에이전트는 이런 메타 수준의 판단이 여전히 취약하다.

## 개발자가 지금 당장 적용해야 할 AI 에이전트 안전 수칙

이 사건을 계기로 Alexey가 구축한 안전장치, 그리고 커뮤니티가 추가로 제안한 규칙들을 정리했다.

### ✅ Terraform 레벨 보호

```hcl
# main.tf
resource "aws_db_instance" "production" {
  # ...

  # 삭제 보호 활성화 (절대 비활성화하지 말 것)
  deletion_protection = true

  # 최종 스냅샷 강제 생성
  skip_final_snapshot       = false
  final_snapshot_identifier = "prod-db-final-${formatdate("YYYYMMDD", timestamp())}"
}
```

### ✅ Terraform 상태 파일 원격 관리

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "production/terraform.tfstate"
    region = "ap-northeast-2"

    # 상태 잠금 (동시 수정 방지)
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}
```

### ✅ AI 에이전트 권한 제한

```bash
# .clauderc 또는 설정 파일에서
# 파괴적 명령 자동 실행 비활성화
# (Claude Code의 경우 --dangerously-skip-permissions 사용 금지)

# 대신 --dry-run 옵션 활용
terraform plan -out=tfplan
# Claude Code에게 plan 결과만 확인하게 하고
# apply는 반드시 사람이 직접 실행
terraform apply tfplan
```

### ✅ 외부 백업 & 복원 테스트

```python
# Lambda 기반 일일 백업 복원 테스트 (pseudo-code)
import boto3

def test_backup_restore(event, context):
    rds = boto3.client('rds')

    # 최신 스냅샷으로 임시 인스턴스 생성
    response = rds.restore_db_instance_from_db_snapshot(
        DBInstanceIdentifier='backup-test-instance',
        DBSnapshotIdentifier=get_latest_snapshot_id(),
        DBInstanceClass='db.t3.micro'
    )

    # 복원 성공 여부 확인 후 즉시 삭제
    # ...
```

## AI 에이전트 시대, 개발자의 역할이 바뀐다

이 사건이 보여주는 것은 단순한 실수가 아니다. **AI 에이전트가 실제 프로덕션 시스템에 접근하는 시대**에 우리가 어떤 패러다임으로 일해야 하는지에 대한 근본적인 질문이다.

Claude Code는 이미 많은 개발자의 생산성을 수십 배 끌어올렸다. Fortune, Bloomberg, GeekWire 모두 "AI 코딩 에이전트가 새 개발 패러다임을 만들고 있다"고 보도했다. GitHub Copilot과 Cursor를 제치고 8개월 만에 1위 AI 코딩 툴이 된 것은 그 생산성이 실제임을 증명한다.

그러나 생산성과 안전성은 트레이드오프가 아니다.

현재 AI 에이전트에서 필요한 것은 단순하다:

1. **파괴적 작업은 항상 사람이 최종 승인한다**
2. **중요 인프라는 삭제 보호를 켠다**
3. **백업은 외부에, 복원 테스트는 자동으로**
4. **AI 에이전트에 주는 컨텍스트를 명확하게 정의한다**

Alexey는 사고 후 이렇게 말했다. "AI 에이전트를 너무 믿었다. Terraform 명령은 내가 직접 검토하고 실행해야 했다."

AI가 더 똑똑해질수록, 그 옆에 서 있는 인간의 판단력도 더 중요해진다. 에이전트는 도구다. 책임은 여전히 우리에게 있다.

## 마치며

Claude Code가 2.5년치 데이터를 날린 이 사건은 해피엔딩으로 끝났다. AWS 지원팀의 도움으로 데이터가 복구됐고, 개발자는 더 강력한 안전장치를 갖추게 됐다.

하지만 언제나 운이 좋지는 않다.

지금 당장, 당신의 Terraform 상태 파일이 어디 있는지 확인하라. 삭제 보호가 켜져 있는지 확인하라. 마지막으로 백업을 복원 테스트해본 게 언제인지 생각해보라.

AI 에이전트는 강력하다. 그래서 더욱 조심해야 한다.

AI 에이전트에 권한을 줄 때 어떤 기준으로 경계를 설정해야 하는지 더 구체적인 운영 사례가 궁금하다면 [Claude Code Routines 자동화 가이드](/ai/2026/04/15/claude-code-routines.html)에서 확인할 수 있다. 또한 AI 코딩 도구들의 전반적인 위험 비교는 [2026 바이브 코딩 완전 가이드](/ai/2026/01/23/vibe-coding-guide-2026.html)에 정리돼 있다.

---

**원본 사건 출처**:
- [How I Dropped Our Production Database](https://alexeyondata.substack.com/p/how-i-dropped-our-production-database) — Alexey Grigorev
- [Tom's Hardware 보도](https://www.tomshardware.com/tech-industry/artificial-intelligence/claude-code-deletes-developers-production-setup-including-its-database-and-snapshots-2-5-years-of-records-were-nuked-in-an-instant)
- [Hacker News 스레드](https://news.ycombinator.com/item?id=47278720)

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Claude Code AI 에이전트 프로덕션 DB 삭제 사고 예방 안전 수칙",
  "description": "AI 에이전트가 Terraform을 통해 프로덕션 데이터베이스를 삭제하는 사고를 예방하기 위한 즉시 적용 가능한 안전 수칙 4단계",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Terraform 삭제 보호 활성화",
      "text": "RDS 인스턴스 리소스에 deletion_protection = true 설정을 추가하고, skip_final_snapshot = false로 설정해 최종 스냅샷을 강제 생성한다. 이 설정이 있으면 terraform destroy로도 삭제가 차단된다."
    },
    {
      "@type": "HowToStep",
      "name": "Terraform 상태 파일 원격 관리",
      "text": "backend.tf에 S3 백엔드를 설정해 상태 파일을 원격으로 관리한다. DynamoDB 테이블로 상태 잠금을 활성화해 동시 수정을 방지하고, encrypt = true로 암호화한다."
    },
    {
      "@type": "HowToStep",
      "name": "AI 에이전트 권한 제한",
      "text": "Claude Code 등 AI 에이전트에서 --dangerously-skip-permissions 옵션 사용을 금지한다. 파괴적 명령(terraform destroy, terraform apply)은 반드시 terraform plan -out=tfplan으로 계획을 먼저 확인한 뒤 사람이 직접 실행한다."
    },
    {
      "@type": "HowToStep",
      "name": "외부 백업 및 복원 테스트 자동화",
      "text": "Lambda 기반 일일 백업 복원 테스트를 구성한다. 최신 스냅샷으로 임시 인스턴스를 생성해 복원 성공 여부를 확인한 뒤 즉시 삭제하는 방식으로 백업의 실제 복구 가능성을 정기적으로 검증한다."
    }
  ]
}
</script>
