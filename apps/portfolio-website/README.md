# Portfolio Website

The portfolio is the main detailed presentation of Joem Idpan's projects, skills, experience, education, certifications, and public development activity.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- dnd-kit
- Material UI icons
- Recharts
- Shared UI code from `../../shared/`

## Features

- Responsive bento-style portfolio layout
- Profile, education, experience, skills, certifications, and activity sections
- Desktop project explorer with immediate drag-and-drop expansion
- Expanded project titles that open a detailed modal
- Mobile project cards that open the same details modal
- Recent public commits shown only inside the project modal
- Light and dark themes
- Optional GitHub, Spotify, Giphy, CAPTCHA, and email integrations

Temporary modal fields for project context, contribution, and key takeaways remain placeholders until confirmed project data is supplied.

## Development

From the monorepo root:

```bash
npm install
npm run dev:portfolio
```

The development server runs at `http://localhost:3000`.

Workspace commands:

```bash
npm --workspace apps/portfolio-website run dev
npm --workspace apps/portfolio-website test
npm --workspace apps/portfolio-website run lint
npm --workspace apps/portfolio-website run build
npm --workspace apps/portfolio-website run start
```

## Data and structure

```text
src/app/                 Next.js pages and API routes
src/components/          Portfolio sections, cards, and modals
src/data.json             Current curated portfolio data
src/types/project.ts      Project domain types
tests/                    Source contracts and type-check regression tests
```

Portfolio facts are manually curated. GitHub API responses supplement public repository metadata and recent commits; they do not replace manually written descriptions, collaborator information, roles, outcomes, or project narratives.

GitHub project enrichment is restricted to public repositories owned by `tychesama`. Projects without an eligible public repository continue to display their static curated data.

## Environment variables

Create a local environment file for the integrations you intend to use. Do not commit real values.

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

Notes:

- `GITHUB_API_PAT` is optional for public API requests but raises the available GitHub rate limit.
- The contact form requires both CAPTCHA configuration and the Resend/contact email settings.
- Missing optional integrations should degrade without preventing the core portfolio from loading.

## Current public profile

- Role: Fullstack Developer
- Education: graduated in June 2026
- Status: Looking for work
