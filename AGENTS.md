# AGENTS.md

## Project Overview
- **Project:** joemidpan.com personal-site monorepo.
- **Purpose:** Collect and deploy personal web projects, including a home hub, portfolio, and blog.
- **Product type:** Personal portfolio and project showcase.
- **Primary audience:** Visitors reviewing Jose Emmanuel R. Idpan's projects, skills, experience, and updates.
- **Design direction:** Simple, clear, functionality-focused, and easy to navigate.
- **Status:** Active personal monorepo.

## Repository Layout
- `apps/home-page` - React + TypeScript + Vite landing page / hub.
- `apps/portfolio-website` - Next.js portfolio website with sections for hero, projects, skills, experience, education, certifications, activity, and contact.
- `apps/blog` - Blog workspace. Do not work in this folder unless the user explicitly asks.
- `shared/*` - Shared workspace packages. This area currently has known issues; do not try to fix, refactor, or depend on it unless the user explicitly asks.
- Root `package.json` uses npm workspaces for the app folders and `shared/*`.

## Current Caveats
- The `shared` folder has known issues. Avoid touching it during unrelated work.
- The `apps/blog` workspace has known issues. Avoid running blog checks or trying to repair blog failures unless asked.
- Prefer focused commands for the app being changed instead of broad monorepo commands that include blog or shared packages.
- The project owner may edit files while work is happening. Always preserve unrelated local changes.

## Commands
- **Install root dependencies:** `npm install`
- **Home dev:** `npm run dev:home`
- **Portfolio dev:** `npm run dev:portfolio`
- **All dev servers:** `npm run dev:all`  
  Use this only when all workspaces are expected to run; otherwise prefer one app-specific dev command.
- **Home build:** `npm --workspace apps/home-page run build`
- **Home lint:** `npm --workspace apps/home-page run lint`
- **Portfolio build:** `npm --workspace apps/portfolio-website run build`
- **Portfolio lint:** `npm --workspace apps/portfolio-website run lint`
- **Portfolio lint fix:** `npm --workspace apps/portfolio-website run lint:fix`

## Development Guidelines
- Check `git status --short` before editing.
- Read the relevant app code before changing behavior.
- Keep changes scoped to the app or files requested.
- Match the existing stack and patterns: React, TypeScript, Tailwind CSS, MUI where already used, and existing component structure.
- Use existing assets and data files before adding new ones.
- Keep UI copy plain and concise.
- Preserve the site's simple, functional design philosophy.
- For portfolio content, prefer updating structured data or existing section components rather than duplicating presentation code.
- Treat `.env` files and API keys as sensitive. Do not print, commit, or hardcode secrets.

## App Notes
- `apps/home-page` is a compact Vite app. Main files include `src/main.tsx` and `src/LandingPage.tsx`.
- `apps/portfolio-website` is a Next app. Main entry files include `src/app/page.tsx`, `src/app/layout.tsx`, `src/MainPage.tsx`, and section components under `src/components/sections`.
- Portfolio API routes live under `apps/portfolio-website/src/app/api`.
- Portfolio content types live under `apps/portfolio-website/src/types`.

## Testing and Verification
- Run the narrowest relevant check for the changed app.
- For UI work, run the relevant dev server and verify the page in a browser when practical.
- If a broad command fails because of `shared` or `apps/blog`, report that clearly and then run the narrower relevant command.
- Do not skip relevant checks silently. If a check cannot be run, say why.

## Do
- Preserve unrelated user edits.
- Keep edits small, readable, and aligned with existing naming.
- Use accessible HTML and keyboard-friendly controls.
- Make responsive layouts work on mobile and desktop.
- Update documentation when changing project setup or commands.

## Don't
- Do not fix or refactor `shared` unless the user explicitly asks.
- Do not fix or refactor `apps/blog` unless the user explicitly asks.
- Do not install new dependencies without a clear need.
- Do not delete files, reset git state, force push, deploy, or publish without explicit permission.
- Do not rewrite working app structure for style preferences alone.
- Do not expose secrets from `.env` or API route configuration.

## Response Style
- Be direct and concise.
- Mention files changed and checks run.
- Call out known skipped areas, especially `shared` and `apps/blog`, when relevant.
