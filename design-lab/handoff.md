# Implementation Handoff: `/products/` and `/portfolio/`

## Approved Design Artifacts
- Design source: `DESIGN.md`
- Marketing brief: `docs/marketing-brief.md`
- Raw publishing mock: `design-lab/pub/index.html`
- Screenshots: `design-lab/screenshots/desktop-products-portfolio.png`, `design-lab/screenshots/mobile-products-portfolio.png`

`design-lab/pub/` is a raw publishing/artboard original. It is not a device mockup, thumbnail composite, or screenshot wrapper.

## Target Routes
- `/products/`: dedicated product catalog.
- `/portfolio/`: compact portfolio hub.

## Production Files To Edit Later
- Add a Jekyll page for products, likely `products.md` or `products.html`.
- Add a Jekyll page for portfolio, likely `portfolio.md` or `portfolio.html`.
- Add or extend a page stylesheet, preferably a new scoped CSS file such as `static/css/studio-pages.css`.
- Update `_layouts/home.html` only if a new stylesheet include is needed globally.
- Update `index.html` after design approval so the blog/hero CTA can point to `/portfolio/`.
- Update `_includes/footer-enhanced.html` so Quick Links include Portfolio.

## CSS Strategy
- Define page-scoped variables using the DESIGN.md palette: paper, ink, graphite, blueprint blue.
- Keep selectors route-scoped, for example `.studio-products` and `.studio-portfolio`.
- Reuse existing assets by path: `/static/img/kft-logo.svg`, `/static/img/kcl-logo.svg`, `/static/img/sgt-logo.svg`, `/static/img/avatar.jpg`, `/static/img/blog-logo.svg`.
- Do not overwrite the current home visual system. The new pages can be calmer and more proof-oriented while still using the same typography family.

## Route Content
Products page must include:
- K-Pop Face Test
- K-Pop Company League
- Mental Age Test
- 상견례 얼굴상 테스트
- Brain Type Test

Portfolio main must include:
- PLOZEN Multi-Agent 운영환경
- 전북청년마을 앱·관리자웹 MVP
- K-POP AI 얼굴상 테스트
- PLOZEN n8n Workflow Pack

Case detail template for future pages:
- Intro
- Problem
- Scope & Build
- Architecture diagram slot
- Evidence + Mask check

## Verification Plan
- `git diff --check`
- Browser screenshot at desktop 1440px.
- Browser screenshot at mobile 390px.
- Mobile blockers: overlap 0px, side padding >= 16px, touch targets >= 44px, primary CTAs >= 48px, no text overflow or clipped Korean copy.
- Keyboard: visible focus state on navigation, product links, and portfolio case actions.
- Content: no filler Latin copy, no unfinished task markers, no empty stand-in cards.

## Explicit Non-Goals
- Do not edit production Jekyll files during design gate.
- Do not build full portfolio detail pages yet.
- Do not add backend logic, database schema, analytics events, or form handling.
- Do not expose unmasked operational screenshots, customer secrets, or private architecture details.
- Do not commit, push, or open PR from this gate.
