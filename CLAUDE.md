# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Jekyll-based technical blog (Moony01 Studio) hosted on GitHub Pages at https://moony01.com. Uses Node.js tooling for image optimization and content automation.

## Development Commands

### Local Development
```bash
bundle install          # Install Ruby dependencies
npm install             # Install Node dependencies
bundle exec jekyll serve    # Start local server (localhost:4000)
```

### Creating Content
```bash
# Create new post with scaffolding
node scripts/create-post.js --title "제목" --category javascript

# Create with English slug
node scripts/create-post.js --title "제목" --slug "my-custom-slug" --category ai
```

### Image Processing
```bash
npm run optimize-images -- --input ./static/img/_posts/{slug}  # Optimize specific folder
npm run optimize-images -- --all                                # Optimize all images
npm run convert-to-picture                                      # Convert markdown images to <picture> tags
```

### Build
```bash
bundle exec jekyll build --future    # Build with future-dated posts (matches CI)
npm run prebuild                     # Run image optimization + picture conversion
```

## Architecture

### Content Structure
- `_posts/` - Blog posts in markdown (YYYY-MM-DD-slug.md format)
- `category/` - Category pages (each category needs a corresponding file)
- `static/img/_posts/{slug}/` - Images for posts (auto-optimized to WebP)

### Build Pipeline (GitHub Actions)
1. Node.js image optimization (PNG/JPG → WebP + multi-resolution)
2. Convert markdown images to `<picture>` tags
3. Jekyll build with `--future` flag
4. Deploy to GitHub Pages

### Key Configuration
- `_config.yml` - Jekyll settings (paginate: 10, kramdown parser)
- `scripts/config/images.json` - Image optimization settings (quality: 80, WebP format)
- `_layouts/compress.html` - HTML minification wrapper

### Template System
- `_layouts/default.html` - Main layout with sidebar
- `_layouts/post.html` - Blog post template
- `_includes/cross-site-nav.html` - Cross-site navigation component

## Post Front Matter
```yaml
---
layout: post
title: "Your Title"
date: 2024-01-01 11:00:00 +0900
categories: [category-name]
tags: [tag1, tag2]
image: image-filename.png
---
```

## Notes
- Categories must exist in `category/` directory before using
- Image paths: `static/img/_posts/{post-slug}/`
- Site uses Korean (ko-KR) as primary language
- Deployment triggers automatically on push to `main`
