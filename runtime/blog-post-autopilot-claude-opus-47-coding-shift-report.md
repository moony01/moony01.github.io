## Blog Post Autopilot Report

- Final Status: FAILED
- Workflow: `blog-post-autopilot`
- Slug: `claude-opus-47-coding-shift`
- Started At: `2026-04-17T12:03:07+09:00`
- Ended At: `2026-04-17T12:10:02+09:00`
- Selected Topic: `Claude Opus 4.7 release and the shift from supervised coding to self-verifying coding agents`
- Selected Title: `클로드 오푸스 47이 코딩 감시자를 지운 날`

### Gate Status

- Research: PASS
- Content: PASS
- Image: FAIL (`Missing X server or $DISPLAY`)
- Local Render: SKIPPED
- Deploy: SKIPPED
- GSC: SKIPPED

### Attempts

- Research: `1`
- Content: `1`
- Image: `8`
- Local Render: `0`
- Deploy: `0`
- GSC: `0`

### Outputs

- Post: `_posts/2026-04-17-claude-opus-47-coding-shift.md`
- URL: `https://moony01.com/ai/2026/04/17/claude-opus-47-coding-shift.html`
- Images: `static/img/posts/claude-opus-47-coding-shift/`

### Remaining Manual Actions

- Fix the Playwright MCP environment so headed Chrome can launch with a valid X server and `DISPLAY`.
- Re-run the image, publish, deploy verification, and GSC steps after Playwright is restored.
