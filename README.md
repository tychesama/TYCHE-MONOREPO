# joemidpan.com Monorepo

This repository contains the applications behind Joem Idpan's personal website: a landing page, a portfolio, and a Markdown-based blog. The apps share selected UI code while remaining independently runnable and deployable.

## Applications

| Workspace | Purpose | Local URL |
| --- | --- | --- |
| `apps/home-page` | Main landing page and project hub | `http://localhost:5173` |
| `apps/portfolio-website` | Full portfolio, project explorer, skills, experience, and activity | `http://localhost:3000` |
| `apps/blog` | Personal articles and gallery | `http://localhost:3001` |

## Repository structure

```text
apps/
  home-page/           React + Vite landing page
  portfolio-website/   Next.js portfolio
  blog/                Next.js Markdown blog
shared/
  icons/               Shared icon components
  ui/                  Shared UI components, styles, and utilities
```

Shared source is consumed through TypeScript and bundler aliases; it is not published as a separate package.

## Getting started

Requirements:

- Node.js
- npm with workspace support

Install dependencies from the repository root:

```bash
npm install
```

Start all three applications:

```bash
npm run dev:all
```

Or start one application:

```bash
npm run dev:home
npm run dev:portfolio
npm run dev:blog
```

## Verification

The root package does not wrap every application check. Run checks against each workspace:

```bash
npm --workspace apps/home-page run lint
npm --workspace apps/home-page run build

npm --workspace apps/portfolio-website test
npm --workspace apps/portfolio-website run lint
npm --workspace apps/portfolio-website run build

npm --workspace apps/blog test
npm --workspace apps/blog run lint
npm --workspace apps/blog run build
```

## Content and data

- Portfolio content currently comes from `apps/portfolio-website/src/data.json`.
- Blog articles are Markdown files in `apps/blog/articles/`.
- Blog gallery images are read from `apps/blog/public/carousel_photos/`.
- Shared presentation code lives under `shared/`.

Project narratives and portfolio facts are manually curated. GitHub data is supplemental and limited to public repositories owned by `tychesama`.

## Environment variables

The portfolio supports optional external integrations. Configure only the features you use, and never commit real values.

```text
GITHUB_API_PAT
GIPHY_API_KEY
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN
NEXT_PUBLIC_RECAPTCHA_SITE_KEY
RECAPTCHA_SECRET_KEY
RESEND_API_KEY
CONTACT_FROM
CONTACT_TO
```

The GitHub routes can use unauthenticated public API access when no token is configured, subject to GitHub's lower rate limit. The contact form reports itself unavailable when its required CAPTCHA and email settings are missing.

## Current direction

The site favors clear, responsive, minimal presentation over heavy visual effects. The public profile currently identifies Joem as a Fullstack Developer, graduated in June 2026, and looking for work.
