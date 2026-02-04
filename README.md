# Firman Agam CV Platform

Monorepo for a modern bilingual CV platform with shared data source:

- `apps/web`: Next.js + Tailwind + shadcn-style components (GitHub Pages static export).
- `apps/mobile`: Ionic React + Capacitor foundation (tabs + dark mode).
- `packages/cv-data`: typed CV contract + locale JSON (`en`, `id`).
- `legacy/react-cv`: archived previous CRA portfolio app.

## Requirements

- Node.js 20+
- npm 10+

## Getting Started

```bash
npm install
npm run validate:cv
npm run dev:web
```

In another terminal:

```bash
npm run dev:mobile
```

## Useful Scripts

- `npm run build:web` - build Next.js static export to `apps/web/out`
- `npm run build:mobile` - build Ionic app bundle
- `npm run cap:sync` - build mobile and sync with Capacitor
- `npm run qa:web` - web QA (unit + Playwright E2E + visual snapshot + Lighthouse)
- `npm run qa:mobile` - mobile QA (unit + Playwright smoke + build)
- `npm run qa:full` - full QA gate for web, mobile, and Capacitor sync
- `npm run sync:old-cv` - rebuild archived CRA app and publish it to `apps/web/public/old-cv`
- `npm run cap:android` - open Android Studio project
- `npm run cap:ios` - open Xcode project
- `npm run typecheck` - run type checks across workspaces
- `npm run test` - run tests across workspaces

## GitHub Pages Deployment

Workflow: `.github/workflows/deploy-web.yml`

This repo auto-detects whether it is running on user site (`username.github.io`) or project site and configures Next.js `basePath` accordingly.

## CI/CD and Security

- `CI` workflow runs workflow lint, workspace quality checks, secret scanning, and dependency audit.
- `QA Automation` enforces web visual regression and Lighthouse budgets on PRs.
- PR preview is published to `previews/pr-<number>/` on `gh-pages`.
- Security baseline checklist: `.github/SECURITY_BASELINE.md`.

## Routes

- `/` - modern developer profile (projects + writing + skills)
- `/cv` - full bilingual CV page
- `/blog` - engineering blog

Migration note: home route now focuses on developer profile, while detailed CV content is served at `/cv`.

## CV Content Source

Locale files:

- `packages/cv-data/locales/en/cv.json`
- `packages/cv-data/locales/id/cv.json`

Contract and helpers:

- `packages/cv-data/src/schema.ts`
- `packages/cv-data/src/index.ts`

## Mobile Release Templates

Release preparation docs and templates are in `apps/mobile/docs/release`.
