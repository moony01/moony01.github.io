# Convert WebP Skill: 이미지 WebP 자동 변환

## 역할

블로그 포스트용 이미지를 **WebP 포맷으로 자동 변환**하고 최적화합니다.

---

## 트리거

- `/convert-webp`
- "이미지 변환해줘"
- "WebP 변환"
- "이미지 최적화"

---

## 파라미터

| 파라미터 | 설명 | 필수 | 기본값 |
|----------|------|:----:|--------|
| `slug` | 포스트 slug (이미지 폴더명) | ✅ | - |
| `all` | 전체 이미지 변환 | ❌ | false |

---

## 워크플로우

### Step 1: 이미지 디렉토리 확인

```bash
# 특정 포스트 이미지
ls static/img/post/{slug}/

# 전체 이미지
ls static/img/_posts/
```

### Step 2: WebP 변환 실행

```bash
# 특정 포스트
node scripts/optimize-images.js --input static/img/_posts/{slug}

# 전체 이미지
node scripts/optimize-images.js --all
```

### Step 3: 변환 결과 확인

```bash
ls static/img/post/{slug}/*.webp
```

### Step 4: 완료 보고

```markdown
## ✅ WebP 변환 완료!

### 변환 결과

| 원본 파일 | 변환 파일 | 용량 절감 |
|-----------|-----------|-----------|
| {slug}-1.png (2.3MB) | {slug}-1.webp (450KB) | -80% |
| {slug}-2.jpg (1.8MB) | {slug}-2.webp (320KB) | -82% |

### 마크다운 삽입 코드

```markdown
![이미지 설명](/static/img/post/{slug}/{slug}-1.webp){: .wd100}
```

### 다음 단계
1. 마크다운 파일에 이미지 태그 삽입
2. 로컬에서 미리보기 확인
```

---

## 자동 실행 조건

`/add-blog-post` 완료 후 이미지가 추가되면 **자동으로 실행 제안**:

```markdown
🖼️ 새 이미지가 감지되었습니다!

`static/img/post/{slug}/` 에 다음 파일이 있습니다:
- {slug}-hero.png
- {slug}-diagram.png

WebP로 변환할까요? [Y/N]
```

---

## 지원 포맷

| 입력 포맷 | 출력 포맷 | 품질 |
|-----------|-----------|------|
| JPG/JPEG | WebP | 85% |
| PNG | WebP | 85% |
| GIF | WebP | 85% |

---

## 출력 사이즈

| 사이즈명 | 너비 | 용도 |
|----------|------|------|
| 원본 | 유지 | 고해상도 |
| medium | 800px | 본문 이미지 |
| small | 400px | 썸네일 |

---

## 사용 예시

### 예시 1: 특정 포스트 이미지 변환

```
대표님: "/convert-webp slug:vibe-coding-guide-2026"

→ Jeff Dean:
   1. static/img/_posts/vibe-coding-guide-2026/ 확인
   2. node scripts/optimize-images.js 실행
   3. 변환 결과 보고
```

### 예시 2: 전체 이미지 변환

```
대표님: "/convert-webp all:true"

→ 모든 _posts 이미지 폴더 일괄 변환
```
