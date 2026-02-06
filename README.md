# Magic Portfolio — Custom Build

A polished, animated portfolio built on the Magic Portfolio template and driven by your resume JSON.

## Stack
- Next.js 14 (SSR + static optimization)
- Tailwind CSS + Once UI theming
- Framer Motion + AOS animations
- Resume-driven data + PDF export

## Quick Start
1. Install dependencies
```
npm install
```

2. Run the dev server
```
npm run dev
```

3. Lint and build
```
npm run lint
npm run build
```

## Edit Content
All content comes from `src/data/resume.json`.

Common edits:
- Name, summary, role: `basics`
- About copy: `about`
- Skills: `skills`
- Experience timeline: `work`
- Projects: `projects`
- Social links: `social`

Images live in `public/images`. You can replace them with your own assets and keep the same paths.

## Resume PDF
Generate a fresh resume PDF from your JSON:
```
npm run resume:pdf
```
This writes `output/pdf/resume.pdf` and copies it to `public/resume.pdf` for the Download button.

## Animations
- Framer Motion: hero + hover interactions
- AOS: scroll reveal animations
- Page transitions: route-level animation wrapper

## Deployment (Vercel)
Vercel auto-detects Next.js. You can deploy via the dashboard or CLI.

Recommended env var:
- `NEXT_PUBLIC_SITE_URL` = your production domain or Vercel URL

### CLI
```
vercel deploy
vercel deploy --prod
```

## GitHub Actions
This repo includes a CI workflow that runs lint + build on every push and PR.

Optional: You can enable Vercel deployment from Actions by adding the following GitHub secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## License
Distributed under the CC BY-NC 4.0 License. Attribution is required and commercial usage is not allowed.
