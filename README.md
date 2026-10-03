# product-landing-site

A Claude Code skill for building a distinctive, accessible one-page marketing site for a software product.

It bundles a buildable Next.js 16 (App Router) scaffold, a script that derives contrast-safe accent colours from any brand colour,
a screenshot helper, and references covering the design system, section patterns, motion and accessibility, and copy.

## Install

```bash
git clone https://github.com/xenxorowdy/product-landing-site ~/.claude/skills/product-landing-site
```

Claude Code picks it up automatically; ask for a landing page, marketing site or launch page.

## Contents

- `SKILL.md`: the workflow and the rules behind it
- `assets/scaffold/`: the site (verified with `tsc` and `next build`)
- `assets/optional-sections/`: extra sections kept as worked examples
- `scripts/accent.mjs`, `scripts/capture.cjs`: contrast derivation and screenshots
- `references/`: design system, section patterns, motion and accessibility, copy and facts, verification

Derived from the Kesami marketing site.

## License

MIT, see `LICENSE`. The vendored Instrument Serif font keeps its own SIL Open Font License
(`assets/scaffold/public/fonts/Instrument-Serif-OFL.txt`).
