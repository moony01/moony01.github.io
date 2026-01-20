# Cross-Site Navigation 디자인 기획서

> **프로젝트**: 4개 사이트 통합 네비게이션 시스템
> **작성일**: 2026-01-20
> **버전**: v1.0

---

## 1. 개요

### 1.1 목적
moony01.com 도메인 하위 4개 프로젝트를 상호 연결하여 사용자 이동을 원활하게 하고, 
다른 서비스 노출을 통해 트래픽 시너지를 창출합니다.

### 1.2 대상 사이트

| 사이트 | 기술스택 | URL | 설명 | 아이콘 |
|--------|----------|-----|------|--------|
| **Tech Blog** | Jekyll | moony01.com | 기술 블로그 | 📝 |
| **K-Pop Face Test** | Jekyll | moony01.com/kpopface | 케이팝 얼굴상 테스트 | 🎤 |
| **Mental Age Test** | Next.js | moony01.com/mentalage | 정신연령 테스트 | 🧠 |
| **KCL** | Next.js | (TBD) | K-Company League | 🏆 |

---

## 2. 디자인 옵션 비교

### Option A: 플로팅 헤더 버튼 (Floating Header) ⭐ 추천

```
┌─────────────────────────────────────────────────────────────┐
│                                    ┌─────────┐ ┌─────────┐  │
│                                    │🎤 K-Pop │ │🧠 Mental│  │
│                                    └─────────┘ └─────────┘  │
│                                                             │
│                      [ 메인 콘텐츠 영역 ]                    │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**장점**
- ✅ 어느 스크롤 위치에서도 항상 접근 가능
- ✅ mentalage에 이미 적용된 검증된 디자인
- ✅ 시각적 주목도 높음
- ✅ 구현 간단 (CSS position: fixed)

**단점**
- ⚠️ 콘텐츠 영역 일부 가림 가능
- ⚠️ 모바일에서 공간 차지

---

### Option B: 푸터 섹션 (Footer Section)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                      [ 메인 콘텐츠 영역 ]                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  🌐 다른 프로젝트 둘러보기                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ 📝 Blog  │ │ 🎤 K-Pop │ │ 🧠 Mental│                    │
│  │ 기술블로그│ │ 얼굴테스트│ │ 정신연령 │                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
├─────────────────────────────────────────────────────────────┤
│                      [ 기존 푸터 ]                           │
└─────────────────────────────────────────────────────────────┘
```

**장점**
- ✅ 콘텐츠 방해 없음
- ✅ 카드형 디자인으로 정보 전달 용이
- ✅ 사이트 이용 완료 후 자연스러운 이동 유도

**단점**
- ⚠️ 스크롤 끝까지 내려야 보임
- ⚠️ 노출 빈도 낮음

---

### Option C: FAB + 드로워 (Floating Action Button + Drawer)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                      [ 메인 콘텐츠 영역 ]                    │
│                                                             │
│                                                       ┌───┐ │
│                                                       │ ☰ │ │
│                                                       └───┘ │
└─────────────────────────────────────────────────────────────┘

         ↓ 클릭 시 드로워 열림 ↓

┌─────────────────────────────────────────────────────────────┐
│                                          ┌────────────────┐ │
│                                          │ 다른 서비스     │ │
│      [ 메인 콘텐츠 영역 ]                 │ ─────────────  │ │
│      (어두워짐)                          │ 📝 Tech Blog   │ │
│                                          │ 🎤 K-Pop Test  │ │
│                                          │ 🧠 Mental Age  │ │
│                                          │ 🏆 KCL         │ │
│                                          └────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**장점**
- ✅ 최소한의 화면 점유
- ✅ 확장 가능 (링크 추가 용이)
- ✅ 모바일 친화적

**단점**
- ⚠️ 클릭 필요 (발견성 낮음)
- ⚠️ 구현 복잡도 높음 (JavaScript 필요)

---

## 3. 추천안: Option A + B 하이브리드

**전략**: 플로팅 헤더(A)를 메인으로, 푸터 섹션(B)을 보조로 사용

```
┌─────────────────────────────────────────────────────────────┐
│                                    ┌─────────┐ ┌─────────┐  │
│                                    │🎤 K-Pop │ │🧠 Mental│  │ ← 플로팅 (항상 보임)
│                                    └─────────┘ └─────────┘  │
│                                                             │
│                                                             │
│                      [ 메인 콘텐츠 영역 ]                    │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  🌐 More Projects                                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │ ← 푸터 (상세 정보)
│  │ 📝 Blog  │ │ 🎤 K-Pop │ │ 🧠 Mental│                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. 상세 레이아웃

### 4.1 플로팅 헤더 - 데스크탑 (≥768px)

```
                                    ┌─────────────────────────────────┐
                                    │  🎤 K-Pop Test  │  🧠 Mental Age │
                                    └─────────────────────────────────┘
                                              ↑
                                    gap: 12px (0.75rem)
                                    
┌─────────────────────────────────────────────────────────────────────┐
│ 버튼 스펙:                                                          │
│ - padding: 8px 16px (0.5rem 1rem)                                  │
│ - border-radius: 9999px (완전 둥근 모서리)                          │
│ - backdrop-filter: blur(12px)                                      │
│ - box-shadow: 0 4px 6px rgba(0,0,0,0.1)                           │
│ - position: fixed; top: 16px; right: 16px;                        │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 플로팅 헤더 - 모바일 (<768px)

```
                                              ┌───────┐
                                              │🎤 Test│  ← 텍스트 축약
                                              ├───────┤
                                              │🧠 Age │
                                              └───────┘
                                                  ↑
                                         세로 배치 (flex-col)
                                         gap: 8px
```

### 4.3 푸터 섹션 레이아웃

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   ╔═══════════════════════════════════════════════════════════╗    │
│   ║  🌐 다른 프로젝트 둘러보기                                  ║    │
│   ╠═══════════════════════════════════════════════════════════╣    │
│   ║                                                           ║    │
│   ║  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       ║    │
│   ║  │     📝      │  │     🎤      │  │     🧠      │       ║    │
│   ║  │  Tech Blog  │  │ K-Pop Test  │  │ Mental Age  │       ║    │
│   ║  │             │  │             │  │             │       ║    │
│   ║  │ 개발 기술과  │  │ AI가 분석한 │  │ 당신의 정신 │       ║    │
│   ║  │ 노하우 공유  │  │ 나의 얼굴상 │  │ 연령은?     │       ║    │
│   ║  └─────────────┘  └─────────────┘  └─────────────┘       ║    │
│   ║                                                           ║    │
│   ╚═══════════════════════════════════════════════════════════╝    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

카드 스펙:
- width: 200px (데스크탑) / 100% (모바일, 1열)
- padding: 20px
- border-radius: 12px
- background: rgba(255,255,255,0.8) + backdrop-blur
- hover: scale(1.02) + shadow 증가
```

---

## 5. 사이트별 적용 레이아웃

### 5.1 Tech Blog (Jekyll - 사이드바 레이아웃)

```
┌────────────────────────────────────────────────────────────────────┐
│                                      ┌──────────┐ ┌──────────┐    │
│                                      │🎤 K-Pop  │ │🧠 Mental │    │
│  ┌──────────┐  ┌────────────────┐    └──────────┘ └──────────┘    │
│  │          │  │                │                                  │
│  │ 프로필    │  │   포스트       │                                  │
│  │ 사이드바  │  │   콘텐츠       │                                  │
│  │          │  │                │                                  │
│  │ [배너]   │  │                │                                  │
│  │ K-Pop    │  │                │  ← 기존 배너는 유지 or 제거 선택  │
│  └──────────┘  └────────────────┘                                  │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  🌐 More Projects: [Blog] [K-Pop] [Mental] [KCL]           │   │
│  └────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

### 5.2 K-Pop Face Test (Jekyll - 풀스크린 레이아웃)

**변경사항**: 기존 상단 메뉴(`<nav class="menu">`) 제거 → 플로팅 버튼으로 대체

```
[Before - 기존]
┌────────────────────────────────────────────────────────────────────┐
│  [로고] KPOP FACE TEST                              [BLOG] ← 제거  │
├────────────────────────────────────────────────────────────────────┤

[After - 변경 후]
┌────────────────────────────────────────────────────────────────────┐
│                                      ┌──────────┐ ┌──────────┐    │
│  [로고] KPOP FACE TEST               │📝 Blog   │ │🧠 Mental │    │
│                                      └──────────┘ └──────────┘    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                      [ 얼굴 테스트 영역 ]                          │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│  🌐 More Projects (선택사항)                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                           │
│  │📝 Blog   │ │🧠 Mental │ │🏆 KCL    │                           │
│  └──────────┘ └──────────┘ └──────────┘                           │
└────────────────────────────────────────────────────────────────────┘
```

**kpopface 수정 파일**:
- `_layouts/default.html`: `<nav class="menu">` 블록 제거
- `_includes/cross-site-nav.html`: 새 파일 추가

### 5.3 Mental Age Test (Next.js - 센터 레이아웃)

```
┌────────────────────────────────────────────────────────────────────┐
│                                      ┌──────────┐ ┌──────────┐    │
│                                      │🎤 K-Pop  │ │📝 Blog   │    │
│                                      └──────────┘ └──────────┘    │
│                                                                    │
│                    ┌────────────────────────┐                      │
│                    │                        │                      │
│                    │   정신연령 테스트       │                      │
│                    │        퀴즈            │                      │
│                    │                        │                      │
│                    └────────────────────────┘                      │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

* 현재 구현 완료 상태 - 다른 사이트의 기준 디자인
```

### 5.4 KCL (Next.js - 앱 레이아웃 + 하단 네비게이션)

```
┌────────────────────────────────────────────────────────────────────┐
│  [KCL 로고]  [언어선택]              🎤 K-Pop  🧠 Mental  📝 Blog  │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                      [ 랭킹 리스트 ]                               │
│                                                                    │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│     🏠        📊        🏆        👤                              │
│    Home    Analytics   Hall     Profile     ← 기존 하단 네비       │
└────────────────────────────────────────────────────────────────────┘

* 상단 헤더에 통합 (하단 네비와 충돌 방지)
```

---

## 6. 디자인 시스템

### 6.1 컬러 팔레트

```
┌─────────────────────────────────────────────────────────────┐
│  Primary Gradient (강조 버튼)                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  from: #7C3AED (violet-600)  →  to: #C026D3 (fuchsia)│   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Secondary (일반 버튼)                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  background: rgba(255,255,255,0.8)                   │   │
│  │  text: #374151 (gray-700)                            │   │
│  │  hover-text: #000000                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Dark Mode 지원 (선택)                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  background: rgba(31,41,55,0.8) (gray-800)          │   │
│  │  text: #E5E7EB (gray-200)                            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 아이콘 & 라벨

| 사이트 | 아이콘 | 한국어 라벨 | 영어 라벨 | 축약 (모바일) |
|--------|--------|------------|----------|--------------|
| Blog | 📝 | 기술 블로그 | Tech Blog | Blog |
| K-Pop | 🎤 | 케이팝 테스트 | K-Pop Test | K-Pop |
| Mental | 🧠 | 정신연령 | Mental Age | Mental |
| KCL | 🏆 | K-컴퍼니 리그 | K-Company | KCL |

### 6.3 반응형 브레이크포인트

```
Mobile:   < 640px   → 세로 배치, 축약 텍스트
Tablet:   640-1024px → 가로 배치, 축약 텍스트  
Desktop:  > 1024px   → 가로 배치, 전체 텍스트
```

### 6.4 애니메이션

```css
/* 호버 효과 */
transition: all 0.3s ease;
hover: {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

/* 등장 효과 (선택) */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 7. 구현 코드 스니펫

### 7.1 Jekyll 사이트용 (HTML/CSS)

**파일 위치**: `_includes/cross-site-nav.html`

```html
<!-- Cross-Site Navigation -->
<nav class="cross-site-nav" id="crossSiteNav">
  <a href="https://moony01.com/kpopface/" class="cross-site-btn primary" target="_blank">
    <span class="icon">🎤</span>
    <span class="label">K-Pop Test</span>
  </a>
  <a href="https://moony01.com/mentalage/" class="cross-site-btn" target="_blank">
    <span class="icon">🧠</span>
    <span class="label">Mental Age</span>
  </a>
  <a href="https://moony01.com/" class="cross-site-btn" target="_blank">
    <span class="icon">📝</span>
    <span class="label">Blog</span>
  </a>
</nav>

<style>
.cross-site-nav {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

@media (min-width: 640px) {
  .cross-site-nav {
    flex-direction: row;
    gap: 12px;
  }
}

.cross-site-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  /* Secondary Style (default) */
  background: rgba(255, 255, 255, 0.85);
  color: #374151;
}

.cross-site-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  color: #000;
}

.cross-site-btn.primary {
  background: linear-gradient(135deg, #7C3AED 0%, #C026D3 100%);
  color: white;
}

.cross-site-btn.primary:hover {
  color: white;
}

.cross-site-btn .icon {
  font-size: 18px;
}

.cross-site-btn .label {
  display: none;
}

@media (min-width: 640px) {
  .cross-site-btn .label {
    display: inline;
  }
}
</style>
```

### 7.2 Next.js 사이트용 (React/TSX)

**파일 위치**: `src/components/layout/CrossSiteNav.tsx`

```tsx
'use client';

import { usePathname } from 'next/navigation';

interface SiteLink {
  href: string;
  label: string;
  labelShort: string;
  icon: string;
  primary?: boolean;
}

const allSites: SiteLink[] = [
  { href: 'https://moony01.com/', label: 'Tech Blog', labelShort: 'Blog', icon: '📝' },
  { href: 'https://moony01.com/kpopface/', label: 'K-Pop Test', labelShort: 'K-Pop', icon: '🎤', primary: true },
  { href: 'https://moony01.com/mentalage/', label: 'Mental Age', labelShort: 'Mental', icon: '🧠' },
  { href: 'https://kcl.moony01.com/', label: 'K-Company', labelShort: 'KCL', icon: '🏆' },
];

export default function CrossSiteNav({ currentSite }: { currentSite: string }) {
  // 현재 사이트 제외
  const links = allSites.filter(site => !site.href.includes(currentSite));

  return (
    <nav className="fixed top-4 right-4 z-50 flex flex-col sm:flex-row gap-2 sm:gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex items-center gap-2 px-3 py-2 rounded-full shadow-md
            backdrop-blur-md transition-all duration-300
            hover:scale-105 hover:shadow-xl
            ${link.primary 
              ? 'bg-gradient-to-r from-violet-600/90 to-fuchsia-600/90 text-white' 
              : 'bg-white/85 text-gray-700 hover:bg-white hover:text-black'
            }
          `}
        >
          <span className="text-lg">{link.icon}</span>
          <span className="text-sm font-bold hidden sm:inline">{link.label}</span>
          <span className="text-xs font-bold sm:hidden">{link.labelShort}</span>
        </a>
      ))}
    </nav>
  );
}
```

---

## 8. 구현 체크리스트

### Phase 1: 블로그 샘플 적용 (우선)

- [ ] `_includes/cross-site-nav.html` 생성
- [ ] `_layouts/default.html`에 include 추가
- [ ] 로컬 테스트
- [ ] 배포 및 확인

### Phase 2: 나머지 3개 사이트 동시 적용

**kpopface (Jekyll)**
- [ ] `_includes/cross-site-nav.html` 복사
- [ ] `_layouts/default.html` 수정
- [ ] 현재 사이트 링크 제외 처리

**mentalage (Next.js)**
- [ ] 기존 `Header.tsx` 업데이트 (KCL 링크 추가)
- [ ] 현재 사이트 링크 제외 처리

**kcl (Next.js)**
- [ ] `CrossSiteNav.tsx` 컴포넌트 생성
- [ ] `layout.tsx`에 추가
- [ ] 기존 헤더와 조화 확인

### Phase 3: 푸터 섹션 추가 (선택)

- [ ] 공통 푸터 컴포넌트 설계
- [ ] 각 사이트에 적용

---

## 9. 링크 매트릭스

각 사이트에서 보여줄 링크 (자기 자신 제외):

| 현재 사이트 | 표시할 링크 |
|------------|------------|
| Blog | 🎤 K-Pop, 🧠 Mental, 🏆 KCL |
| K-Pop | 📝 Blog, 🧠 Mental, 🏆 KCL |
| Mental | 📝 Blog, 🎤 K-Pop, 🏆 KCL |
| KCL | 📝 Blog, 🎤 K-Pop, 🧠 Mental |

---

## 10. 최종 승인 요청 사항

대표님께서 결정해주실 사항:

1. **디자인 옵션**: A(플로팅) / B(푸터) / A+B(하이브리드)?
2. **Primary 버튼**: 어떤 사이트를 강조할지? (현재: K-Pop)
3. **KCL URL**: 최종 도메인 확정 필요
4. **다크모드**: 지원 여부
5. **푸터 섹션**: 추가 적용 여부

---

## Appendix: 미리보기 목업

### A. 블로그에 적용 시 예상 화면

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                                         ┌─────────────┐ ┌────────────┐ │
│                                         │ 🎤 K-Pop    │ │ 🧠 Mental  │ │
│  ┌──────────────┐  ┌──────────────────┐ └─────────────┘ └────────────┘ │
│  │              │  │                  │                                 │
│  │   [프로필]    │  │  포스트 제목     │                                 │
│  │   아바타      │  │  ───────────    │                                 │
│  │              │  │                  │                                 │
│  │   소개글      │  │  포스트 내용...  │                                 │
│  │              │  │                  │                                 │
│  │  ──────────  │  │                  │                                 │
│  │  [검색창]    │  │                  │                                 │
│  │              │  │                  │                                 │
│  │  ──────────  │  │                  │                                 │
│  │  Navigation  │  │                  │                                 │
│  │  - Home      │  │                  │                                 │
│  │  - Projects  │  │                  │                                 │
│  │  - About     │  │                  │                                 │
│  │              │  │                  │                                 │
│  └──────────────┘  └──────────────────┘                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

**문서 끝**
