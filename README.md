# moony01.com

> Personal blog by **moony01** — AI, Claude Code, automation, and developer tools. Custom-built Jekyll site.

[![Live](https://img.shields.io/badge/Live-moony01.com-blue)](https://moony01.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-181717.svg?logo=github)](https://moony01.com/)

🌐 **Live**: https://moony01.com/

---

## About

This is a personal blog built **from the ground up** as a custom Jekyll site — no third-party theme, no boilerplate. The site is published via GitHub Pages and runs on a custom domain.

I write about topics I work with day-to-day:
- **AI & LLM tooling** — Claude Code, Codex, Cursor, OpenCode, Gemini, Sora
- **Automation & DevOps** — n8n workflows, agent orchestration, MCP servers
- **GitHub workflows** — Stacked PRs, GitHub Actions, deployment patterns
- **Database** — Postgres, SQLite, pglite, migrations

## Categories

| Category | Path |
|----------|------|
| AI | `/ai/` |
| Security | `/security/` |
| Database | `/database/` |
| GitHub | `/github/` |
| Others | `/others/` |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Generator** | Jekyll (custom theme, built from scratch) |
| **Styling** | SCSS, semantic HTML |
| **Frontend** | Vanilla JavaScript (no framework, no build step) |
| **Hosting** | GitHub Pages |
| **Analytics** | Google Analytics 4, Google Search Console |
| **Monetization** | Google AdSense |

## Why a Custom Jekyll Theme?

The site originally started as a fork of an open-source Jekyll theme but has been **completely rewritten** — layouts, styles, scripts, and structure are all original. The motivation:

- Full control over Core Web Vitals and SEO structure
- No bloat from unused theme features
- Custom JSON-LD structured data per content type
- Faster page loads (no theme JS overhead)

## Local Development

### Prerequisites
- Ruby 3.0+
- Bundler

### Setup

```bash
git clone https://github.com/moony01/moony01.github.io.git
cd moony01.github.io

bundle install
bundle exec jekyll serve
```

Open [http://localhost:4000/](http://localhost:4000/)

## Project Structure

```
moony01.github.io/
├── _config.yml         # Jekyll config
├── _layouts/           # Custom layouts (default, post, page)
├── _includes/          # Reusable HTML partials
├── _posts/             # Blog posts (Markdown)
├── ai/, database/...   # Category landing pages
├── kpopface/           # Embedded sub-app (https://moony01.com/kpopface/)
├── assets/
│   ├── css/            # SCSS source
│   ├── js/             # Vanilla JS
│   └── img/            # Static images
├── sitemap.xml         # SEO
└── robots.txt          # SEO
```

## Embedded Sub-Apps

This repository also hosts standalone sub-apps under `moony01.com/<path>/`:

- [`/kpopface/`](https://moony01.com/kpopface/) — K-Pop idol face match (AI, 15 languages) — [source](https://github.com/moony01/kpopface)
- `/sanggyeonrye-test/` — Korean in-law match face test
- `/mentalage/` — Mental age estimation

## SEO & Performance

- **Lighthouse Mobile**: 90+ scores
- **Structured Data**: Article, FAQPage, BreadcrumbList JSON-LD
- **Sitemap**: Auto-generated for all posts and pages
- **robots.txt**: Crawl-friendly, no blocked AI bots (content welcomes LLM training)

## License

[MIT License](LICENSE) © 2024–2026 [moony01](https://github.com/moony01)

You are free to use, modify, and distribute this code. Attribution appreciated.

## Contact

- 👤 **Author**: [@moony01](https://github.com/moony01)
- 📧 **Email**: mun01180@gmail.com
- 🌐 **Website**: [moony01.com](https://moony01.com/)
- 💖 **Sponsor**: [github.com/sponsors/moony01](https://github.com/sponsors/moony01)
