# Home Page

The home page is the main entry point for joemidpan.com. It introduces Joem Idpan as a Fullstack Developer, links to the portfolio and blog, and presents selected projects in a compact landing-page format.

## Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Shared UI code from `../../shared/`

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page and project hub |
| `/coin` | Coin page |

Unknown routes redirect to `/`.

## Development

From the monorepo root:

```bash
npm install
npm run dev:home
```

The development server runs at `http://localhost:5173`.

You can also run commands directly in this workspace:

```bash
npm --workspace apps/home-page run dev
npm --workspace apps/home-page run lint
npm --workspace apps/home-page run build
npm --workspace apps/home-page run preview
```

## Main files

```text
src/main.tsx         Application entry point and routes
src/LandingPage.tsx  Main landing page
src/CoinPage.tsx     Coin route
```

The application imports shared global styles and UI utilities through the `@shared` alias.

## Content notes

The landing page currently presents the confirmed public status:

- Fullstack Developer
- Graduated in June 2026
- Looking for work

Selected-project text is currently maintained in the application source. Broader portfolio project data remains curated separately in the portfolio workspace.
