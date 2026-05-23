# Moony01 Studio Products + Portfolio Design System

## Product Tone
Moony01 Studio는 기술 블로그와 실험형 제품 스튜디오가 함께 보이는 사이트다. `/products/`는 가볍게 눌러보는 테스트 제품의 발견성을 높이고, `/portfolio/`는 실제 구축 경험을 압축해서 신뢰를 만든다.

Visual direction: paper / ink / graphite / blueprint blue. Clean structural, calm, technical. Avoid rainbow product cards, hand-drawn fonts, purple-blue AI gradient dominance, and decorative architecture diagrams with no evidence.

## Color Palette
- Paper: `#f6f3ec` page background, warm technical paper.
- Paper Light: `#fffdf8` raised surfaces.
- Ink: `#171b22` primary text.
- Graphite: `#3f4753` body text.
- Muted: `#747d89` secondary text.
- Blueprint: `#1f5eff` primary actions, links, key lines.
- Blueprint Deep: `#163f9f` hover/active.
- Blueprint Wash: `#e8efff` subtle panels.
- Line: `#d9d4ca` borders and dividers.
- Success: `#1c7c54` evidence pass.
- Warning: `#b26b00` caution and mask-check notes.
- Error: `#b42318` validation failures.

## Typography
- Typeface: `Pretendard Variable`, `Pretendard`, `Apple SD Gothic Neo`, system sans.
- Hero heading: 52px desktop / 36px mobile, 800 weight, line-height 1.08.
- Section heading: 34px desktop / 27px mobile, 800 weight, line-height 1.18.
- Card title: 21px desktop / 19px mobile, 750 weight, line-height 1.3.
- Body: 17px desktop / 16px mobile, 400-500 weight, line-height 1.72.
- Caption: 13px, 650 weight, line-height 1.45.
- Korean text uses `word-break: keep-all` and no negative letter spacing.

## Spacing
- Base unit: 8px.
- Scale: xs 4, sm 8, md 16, lg 24, xl 32, 2xl 48, 3xl 64, 4xl 96.
- Mobile page padding: minimum 20px, never below 16px.
- Desktop content max width: 1180px.
- Section rhythm: 80-96px desktop, 56-72px mobile.

## Border & Shadow
- Radius sm: 6px, md: 8px, lg: 12px.
- Product and case cards: 8px max radius.
- Border: 1px solid Line.
- Shadow sm: `0 8px 24px rgba(23, 27, 34, 0.06)`.
- Shadow md: `0 18px 48px rgba(23, 27, 34, 0.10)`.

## Layout Principles
- `/products/`: dedicated product catalog with a strong K-Pop Face Test feature row, then compact product cards grouped by intent.
- `/portfolio/`: thin hub, not full case pages. Show four representative cases with concise proof, architecture slot, and masked-evidence status.
- Architecture visuals are functional blueprint panels: data flow boxes, proof rails, and status chips. They must not imply unavailable screenshots or production secrets.
- Page sections are full-width bands or unframed constrained layouts. Cards are only for repeated products, cases, proof summaries, or structured detail previews.

## Components
- Primary button: blueprint fill, 48px min height, 8px radius, white text, hover Blueprint Deep, focus outline 3px Blueprint Wash.
- Secondary button: paper surface, Ink text, Line border, 48px min height.
- Product card: thumbnail/logo area, title, concrete promise, route/status, compact CTA.
- Case card: case label, problem, scope chips, evidence row, architecture mini-map.
- Status chip: 32px min height, 13px text, semantic icon or dot, no color-only meaning.
- Anchor nav: 44px min touch height, visible focus, wraps on mobile without horizontal overflow.

## Accessibility & Verification
- WCAG AA contrast for text and actions.
- Keyboard focus visible on all links/buttons.
- Mobile blocker width: 390px.
- Requirements: overlap 0px, no text overflow or clipping, left/right padding >= 16px, touch targets >= 44px, primary CTAs >= 48px.
- Screenshot gate: desktop 1440px and mobile 390px saved to `design-lab/screenshots/`.

## Production Handoff Notes
- Blog hero CTA should be changed from in-page products-only discovery to include `/portfolio/`.
- Footer Quick Links should include Portfolio.
- Do not ship detailed case pages until evidence and mask checks are prepared per case.
