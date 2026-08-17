# Blog

The blog is the Markdown-based article and gallery application for joemidpan.com. It publishes personal reflections, project revisits, and technical learning notes.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- gray-matter
- remark and remark-html
- moment
- Shared UI code from `../../shared/`

## Development

From the monorepo root:

```bash
npm install
npm run dev:blog
```

The development server runs at `http://localhost:3001`.

Workspace commands:

```bash
npm --workspace apps/blog run dev
npm --workspace apps/blog test
npm --workspace apps/blog run lint
npm --workspace apps/blog run build
npm --workspace apps/blog run start
```

## Content structure

```text
articles/                         Markdown article files
lib/articles.ts                   Article loading and Markdown processing
public/article_photos/            Images used by articles
public/carousel_photos/           Homepage gallery images
src/app/[slug]/page.tsx           Individual article route
src/app/api/latest/route.ts       Latest-article API
src/app/page.tsx                  Blog homepage
```

Article filenames become URL slugs. For example:

```text
articles/thoughts-on-sql.md -> /thoughts-on-sql
```

## Writing an article

Create a Markdown file under `articles/` with frontmatter matching the current loader:

```markdown
---
title: "Article title"
date: 17-08-2026
color: "#2a9d8f"
pinned: false
favorite: false
tags:
  - tech
image: "/article_photos/example.png"
description: "Short article summary."
---

Article content starts here.
```

Use a filename containing only letters, numbers, hyphens, or underscores. Missing or invalid article slugs return the Next.js 404 page.

## Latest-article API

`GET /api/latest` returns the newest article metadata, or `null` when no articles exist. The route supports CORS for the portfolio integration and responds to `OPTIONS` preflight requests.

## Gallery behavior

The homepage reads supported images from `public/carousel_photos/`. A missing gallery directory is treated as an empty gallery rather than an application error.
