# Magic Portfolio — Custom Build

A polished, animated portfolio built on the Magic Portfolio template, tailored for a resume-driven single-page experience.

## Features
- Next.js 14 (SSR + static optimization)
- Tailwind CSS with glassmorphism + gradients
- Framer Motion micro-interactions + page transitions
- AOS scroll reveals
- Dark/light mode toggle (Once UI)
- Resume JSON drives About, Skills, Projects, Testimonials, and Contact
- Downloadable resume PDF generation

## Quick Start

1. Install dependencies
```
npm install
```

2. Run the dev server
```
npm run dev
```

3. Edit your resume data
```
src/data/resume.json
```

4. Generate the resume PDF
```
npm run resume:pdf
```
This writes `output/pdf/resume.pdf` and copies it to `public/resume.pdf` for the download button.

## Configuration

- `NEXT_PUBLIC_SITE_URL` (optional): base URL used for SEO and sitemap.
- Routing: toggle pages in `src/resources/once-ui.config.ts`.

## Key Files
- `src/data/resume.json` — single source of truth for content
- `src/data/portfolio.ts` — mapping from resume JSON to UI sections
- `src/components/sections/*` — Hero, About, Skills, Projects, Testimonials, Contact
- `scripts/generate-resume-pdf.py` — PDF generator

## PDF Dependencies
The PDF generator uses ReportLab. Install if missing:
```
python3 -m pip install reportlab
```

## Deployment
This project is ready for Vercel. Connect the repo and it will auto-deploy on every push to `main`.

## License
Distributed under the CC BY-NC 4.0 License (Once UI). Attribution is required and commercial usage is not allowed.
