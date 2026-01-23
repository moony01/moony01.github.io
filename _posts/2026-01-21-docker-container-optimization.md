---
layout: post
title: "Docker 컨테이너 최적화 전략: 이미지 크기부터 보안까지"
date: 2026-01-21 00:00:00 +0900
categories: [infra]
tags: [docker, container, devops, optimization]
---

컨테이너 하나가 500MB를 넘어가는 순간, 배포 파이프라인은 느려지고 클라우드 비용은 치솟습니다. 많은 개발팀이 "일단 돌아가니까"라는 이유로 비대한 컨테이너를 방치하지만, 이는 기술 부채로 쌓여 결국 운영 효율성을 떨어뜨립니다. 이 글에서는 Docker 컨테이너를 최적화하는 실무 전략을 단계별로 살펴봅니다.

![Docker Container Optimization](/static/img/posts/docker-container-optimization/docker-container-optimization-1.webp){: .hero-img}

## 이미지 크기 최적화: Multi-stage Build

컨테이너 최적화의 첫 번째 원칙은 **불필요한 것을 넣지 않는 것**입니다. Multi-stage build는 빌드 환경과 런타임 환경을 분리하여 최종 이미지에는 실행에 필요한 파일만 포함시키는 기법입니다.

```dockerfile
# Stage 1: 빌드 환경
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: 런타임 환경 (최종 이미지)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# 빌드 결과물만 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main.js"]
```

이 방식을 적용하면 개발 의존성, 소스 코드, 빌드 도구가 모두 제외되어 이미지 크기가 **50-70% 감소**하는 것이 일반적입니다. 또한 `alpine` 기반 이미지를 사용하면 기본 OS 레이어만으로도 수백 MB를 절약할 수 있습니다.

{% include pre-version.html %}

## 레이어 캐싱 전략과 Dockerfile 작성법

Docker는 각 명령어를 레이어로 캐싱합니다. 이 특성을 이해하면 빌드 시간을 획기적으로 단축할 수 있습니다. 핵심 원칙은 **변경 빈도가 낮은 명령어를 위에, 높은 명령어를 아래에** 배치하는 것입니다.

```dockerfile
# 잘못된 예: 코드 변경 시 npm install도 다시 실행
COPY . .
RUN npm install

# 올바른 예: package.json이 변경될 때만 npm install 실행
COPY package*.json ./
RUN npm install
COPY . .
```

추가로 `.dockerignore` 파일을 활용하여 불필요한 파일이 빌드 컨텍스트에 포함되지 않도록 해야 합니다.

```plaintext
# .dockerignore
node_modules
.git
*.log
.env.local
coverage
dist
```

## 리소스 제한과 모니터링

컨테이너가 호스트 시스템의 리소스를 무제한으로 사용하면 다른 컨테이너나 시스템 자체에 영향을 줄 수 있습니다. `docker-compose.yml`에서 리소스 제한을 명시적으로 설정하세요.

```yaml
version: "3.8"
services:
  api:
    image: my-api:latest
    deploy:
      resources:
        limits:
          cpus: "0.5" # CPU 50% 제한
          memory: 512M # 메모리 512MB 제한
        reservations:
          cpus: "0.25" # 최소 CPU 25% 보장
          memory: 256M # 최소 메모리 256MB 보장
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

리소스 사용량은 `docker stats` 명령어로 실시간 모니터링할 수 있으며, Prometheus + Grafana 조합으로 장기적인 추이를 분석하는 것을 권장합니다.

{% include pre-version.html %}

## 보안 최적화: 최소 권한 원칙

컨테이너 보안의 핵심은 **최소 권한 원칙(Principle of Least Privilege)**입니다. 기본적으로 컨테이너는 root 사용자로 실행되는데, 이는 보안 취약점이 발생했을 때 공격 범위를 넓히는 원인이 됩니다.

```dockerfile
# 비root 사용자 생성 및 전환
FROM node:20-alpine

# 애플리케이션 전용 사용자 생성
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -D appuser

WORKDIR /app
COPY --chown=appuser:appgroup . .

# 비root 사용자로 전환
USER appuser

CMD ["node", "server.js"]
```

추가로 다음 보안 관행을 적용하세요:

- **읽기 전용 파일시스템**: `--read-only` 플래그로 컨테이너 파일시스템을 읽기 전용으로 마운트
- **capabilities 제한**: `--cap-drop=ALL`로 모든 Linux capabilities를 제거하고 필요한 것만 추가
- **이미지 스캔**: Trivy, Snyk 등의 도구로 알려진 취약점(CVE) 정기 스캔

## 마치며: 실무 적용 체크리스트

Docker 컨테이너 최적화는 한 번에 완성되는 것이 아니라 지속적으로 개선해야 하는 영역입니다. 다음 체크리스트를 팀 내 코드 리뷰 기준으로 활용해 보세요.

**이미지 최적화**

- [ ] Multi-stage build 적용 여부
- [ ] Alpine 또는 distroless 기반 이미지 사용
- [ ] .dockerignore 파일 설정

**빌드 최적화**

- [ ] 레이어 캐싱을 고려한 명령어 순서
- [ ] 불필요한 패키지 설치 제거

**런타임 최적화**

- [ ] 리소스 제한 설정 (CPU, 메모리)
- [ ] 헬스체크 설정
- [ ] 비root 사용자 실행

**보안**

- [ ] 이미지 취약점 스캔 자동화
- [ ] Secrets 관리 (환경변수 직접 노출 금지)

컨테이너 최적화에 투자한 시간은 빠른 배포, 낮은 비용, 안정적인 운영으로 반드시 돌아옵니다. 오늘 당장 팀의 Dockerfile 하나를 열어 개선점을 찾아보는 것은 어떨까요?
