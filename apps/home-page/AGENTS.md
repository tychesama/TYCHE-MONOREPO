# Home Page Agent Guide

## Scope

This file applies to `apps/home-page` and the shared UI files it directly uses.

The app is the Vite/React landing page for `joemidpan.com`. Keep work focused here unless the user explicitly requests portfolio or blog changes.

## Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS 3
- React Router 8
- Shared components under `../../shared/ui`

Do not migrate frameworks, routing, Tailwind versions, or workspace structure.

## Current Parallax Architecture

`LandingPage.tsx` owns `projectsOpen`, which drives two synchronized horizontal worlds:

- Content world: `300vw`, travels from `0` to `-200vw`
- Background world: `300vw`, travels from `0` to `-165vw`
- Duration: `2600ms`
- Easing: `cubic-bezier(0.65, 0, 0.35, 1)`

Scene positions:

```text
Home:          0vw
Travel space:  100vw
Projects:      200vw
```

Both scenes remain mounted. The header remains fixed. Do not replace this with routes, a carousel, crossfade, or animation library.

## Background Ownership

- `main.tsx` owns routing but does not mount a global background.
- `LandingPage.tsx` owns its persistent parallax `BackgroundHost`.
- `CoinPage.tsx` owns a normal viewport `BackgroundHost` so `/coin` keeps working.
- The background parent handles horizontal movement.
- Individual Bubbles/Squares/Stars retain their own vertical, rotation, morph, or twinkle transforms.

Do not apply the horizontal transform directly to individual objects.

## Floating Object Distribution

- `Bubbles.tsx` and `Squares.tsx` measure `hostRef.current.getBoundingClientRect().width`.
- Do not restore `window.innerWidth`; the host spans the full parallax world.
- Bubbles and Squares seed 40 initial objects.
- Their ongoing spawn interval remains `250ms`.
- Stars use percentage placement across their host.

Avoid excessive DOM counts, per-frame React state, or recreating all objects during scene changes.

## Current Tests

Source-contract tests live in:

```text
apps/home-page/tests/
```

Run:

```bash
node --test apps/home-page/tests/*.test.mjs
npm --workspace apps/home-page run lint
npm --workspace apps/home-page run build
git diff --check
```

## Remaining Release Work

The visual parallax implementation is complete and approved by the user. Do not redesign or retune it unless asked.

Next required work:

1. Add `isTransitioning` and block repeated navigation during the 2.6-second movement.
2. Disable the Deployed Projects and Back controls while traveling.
3. Prevent keyboard focus from entering the inactive off-screen scene.
4. Add a `prefers-reduced-motion: reduce` fallback that keeps both scenes accessible.
5. Manually verify forward/back travel, all three backgrounds, theme switching, `/coin`, vertical Projects scrolling, mobile widths, and absence of a page-level horizontal scrollbar.
6. Run all tests, lint, build, and `git diff --check` before committing or releasing.

## Constraints

- Preserve the current homepage and project-card design.
- Do not add scenery, illustrations, decorative foregrounds, or extra parallax layers.
- Do not modify portfolio project data unless requested.
- Do not refactor the broad shared theme system.
- Do not touch `apps/blog`.
- Preserve unrelated local changes.
- Check `git status --short` before editing.
- Do not commit, push, deploy, or publish without explicit user permission.
