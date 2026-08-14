# Apurv Kushwaha — Portfolio

Source for [apurvkushwaha.com](https://apurvkushwaha.com), a concise portfolio focused on robotics, perception, embedded systems, and end-to-end product development.

## Stack

- Next.js App Router with TypeScript
- Static export for GitHub Pages
- Content-driven profile data in `content/details.md`
- Automated deployment from `main`

## Run locally

Use Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Before publishing, run:

```bash
npm run typecheck
npm run build
```

The production export is written to `out/`.

## Updating content

- Edit biographical details, contact information, and skills in `content/details.md`.
- Edit featured projects and experience layout in `app/page.tsx`.
- Replace the downloadable résumé at `public/resume/Apurv_Kushwaha_Resume_2026.pdf`.

Pushes to `main` deploy through `.github/workflows/deploy-pages.yml`.
