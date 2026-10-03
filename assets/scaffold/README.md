# Product site

One static page built with Next.js 16 (App Router).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

A standalone package: keep it outside any npm workspaces so the product's own installs and lockfile are unaffected.

## Deploying

Any static-capable Next.js host works. Set `SITE_URL` to the public origin so the share image and canonical URLs point at the
real domain instead of `http://localhost:3000`.

## The display font

Headlines use a display serif under the family name `Brand Display`. With a licensed face, add
`public/fonts/display-regular.woff2` (and optionally `display-bold.woff2`); the next build detects, serves and preloads them.
Until then the page uses Instrument Serif (SIL Open Font License, `public/fonts/Instrument-Serif-OFL.txt`).

Text, labels and figures use Mona Sans, which `next/font` downloads at build time and serves from this site.

## Where the facts come from

Everything the page states about the product is copied from the product itself. Update both together.

| Value                  | File                            | Source                                |
| ---------------------- | ------------------------------- | ------------------------------------- |
| Prices and plan limits | `lib/site.ts` → `PLANS`         | TODO: the product's plan/billing file |
| Platforms and OS floor | `lib/site.ts` → `SITE.note`     | TODO: the app's build config          |
| Download link          | `lib/site.ts` → `SITE.cta.href` | TODO: the release channel             |
| FAQ answers            | `lib/site.ts` → `FAQ`           | TODO: checked against code or README  |
