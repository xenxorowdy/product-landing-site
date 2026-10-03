---
name: product-landing-site
description: Build a distinctive, accessible one-page marketing site for a software product — Next.js App Router, server components, CSS modules, a serif-plus-wide-sans type system, one signal colour, a live product mock in the hero, a scroll-driven product story, an interactive demo, pricing, FAQ and a giant-wordmark footer. Use this whenever the user asks for a landing page, marketing site, product website, launch page, download page or "a website like the Kesami one" for an app, tool or SaaS, even if they never say "skill" or name the stack. Also use it to restyle or extend an existing site that follows this pattern.
---

# Product landing site

A recipe, distilled from the Kesami marketing site, for a single static page that looks designed rather than templated and
holds up under scrutiny: contrast-checked, keyboard-friendly, honest about the product, fast.

The result is one Next.js page made of server-rendered sections. Interactivity is limited to a few small client "islands"
that flip DOM attributes or CSS variables instead of re-rendering. There is no UI library, no Tailwind, no animation library.

## What is bundled

| Path | Use |
| --- | --- |
| `assets/scaffold/` | A complete, buildable site (typechecked and `next build` verified). Copy it, do not retype it. Placeholder content, working design system. |
| `assets/optional-sections/` | Three extra sections from the original site (a before/after comparison, a data-boundary file tree, a script wall) as worked examples. Not wired in. |
| `scripts/accent.mjs` | Derives the contrast-safe accent shades for any brand colour. |
| `scripts/capture.cjs` | Screenshots the running site at desktop and phone widths, stepping through the scroll, via an offscreen Electron window. |
| `references/design-system.md` | Tokens, themes, type, spacing, the accent-contrast logic, and why each exists. Read before changing colours or type. |
| `references/section-patterns.md` | Every section: what it is for, how it is built, the trick that makes it cheap. Read before adding or reshaping a section. |
| `references/motion-and-a11y.md` | Motion budget, reduced motion, no-JS, touch targets, hydration traps. Read before adding any animation or client code. |
| `references/copy-and-facts.md` | Voice, the one-scenario rule, and how to keep claims true. Read before writing copy. |
| `references/verify.md` | The checklist and commands to run before calling the site done. |

## Workflow

### 1. Gather inputs (look before asking)

Read the product's README, package manifest, pricing/plan code and release workflow first; most answers are there. Ask the user
only for what cannot be found. You need:

- Product name, one-sentence promise, who it is for, and the one thing that sets it apart.
- Platforms, price points and plan limits, each with the file that is the source of truth.
- A brand colour (any hex), or permission to pick one. Pick a single colour and use it as the only signal colour.
- Whether a licensed display font exists. If not, the scaffold's open-licence stand-in (Instrument Serif) is fine.
- Which sections apply. Default set: Hero, ticker, How it works, Ask/demo, Pricing, FAQ, Closing, Footer. Add Privacy,
  Languages or a before/after comparison when the product has a story that needs one.
- Where the site lives. Default: a `website/` folder in the product repo, a standalone package outside any npm workspaces so
  the app's installs and lockfile are untouched.

### 2. Scaffold

```bash
cp -R ~/.claude/skills/product-landing-site/assets/scaffold <target>/website
cd <target>/website && npm install && npx tsc --noEmit && npx next build
```

Run the build once before editing so you know the baseline is green. Mona Sans is fetched from Google Fonts at build time and
then served from the site itself, so the first build needs network.

### 3. Brand

1. `node ~/.claude/skills/product-landing-site/scripts/accent.mjs <brand-hex>` prints `--accent`, `--accent-display`, the
   flattened tint, and whether the button label should be ink or white. Put those into `app/globals.css`
   (`--brand`, `--brand-hover`, `--brand-tint`, `--accent`, `--accent-display`) and replace the hard-coded `#ff5e00` / `#e25300` in
   `app/icon.svg` and `app/opengraph-image.tsx`.
2. Redraw the mark in `components/Logo.tsx` and `Logo.module.css` (the placeholder is four voice bars). Keep it as divs or
   inline SVG, never a raster.
3. Set `SITE` in `lib/site.ts` (name, slug, wordmark, headline, lead, CTA, note). The `slug` also namespaces the
   currency preference in localStorage.

Why the script instead of eyeballing: a saturated brand colour almost never reaches 4.5:1 as text on a light page, so the page
needs the brand colour for fills and a darker sibling for text. Guessing the sibling is how sites ship failing contrast.

### 4. Facts before copy

Fill `lib/site.ts` (plans, platform, links, FAQ) from the product's own source files, and record each fact's source in the
site's `README.md` under "Where the facts come from". Keep provenance in the README rather than in code comments, so the scaffold
stays comment-free. If the target repo or the user asks for explanatory comments, follow that instead.

Then read `references/copy-and-facts.md` and write the copy.

### 5. One scenario, shared everywhere

`lib/demo.ts` holds a single fictional scenario that the hero mock, the product story and the interactive demo all draw from.
Replace it with a scenario from the product's own domain (support tickets, a pull request, a calendar, a spreadsheet, a
meeting). Because every section reads the same data, the page never contradicts itself, and the demo can honestly show the
product's real contract (for example, every claim cites its source).

### 6. Sections

Start from the scaffold's nine. For each section decide: what single idea does it carry, and what is the one visual that proves
it rather than describes it? Read `references/section-patterns.md`. Keep to the section grammar:

- label chip (`.label`, with `data-scramble`), then an `h2.display.h2` with the last words in `.em`, then an optional `.lead`
- sections alternate `data-theme="light"` / `"paper"` so each starts on a colour edge, not a ruled line
- one filled button per viewport; everything else is a text link with the brand underline
- product mocks use `data-theme="dark"` and px sizes, because they stand in for screenshots of the (dark) app. If the app is
  light, make the mocks light.

### 7. Verify

Follow `references/verify.md`. In short: typecheck, build, screenshots at 1440 and 390 with `scripts/capture.cjs`, read them,
step through the scroll to confirm reveals fire, check reduced-motion and no-JS, re-run `accent.mjs --check` for any new text
colour. Report anything not verified rather than implying it was.

## Non-negotiables, and why

- **Server components by default; client islands only for behaviour.** The page is static HTML that works without JS and costs
  almost nothing to hydrate. Islands write `data-*` attributes or CSS variables and let CSS do the visual work.
- **Semantic tokens only in components.** Components read `--bg`, `--fg`, `--accent`; a section's `data-theme` swaps them. That is
  how one component can sit on Canvas, white, the tint, or a dark mock without edits.
- **Text sizes in rem, mocks in px.** Readers' browser text size must apply to the page; mocks are stand-ins for screenshots.
- **Dim text recedes by colour, never opacity.** Opacity quietly drops contrast below 4.5:1.
- **Copy never outruns the product.** No unreleased platforms, no support address that does not exist, no "nothing leaves your
  device" if audio streams to a server. A marketing page that overpromises is a bug.
- **No animation-pause control is built in.** Looping motion stops for `prefers-reduced-motion`. The Kesami design review
  deliberately declined a pause control, so the scaffold has none; offer one if the user wants it.

## Extending beyond the scaffold

Invent new sections with the same primitives rather than importing a library: CSS custom properties for state, one
IntersectionObserver per behaviour, `details/summary` for disclosure, `position: sticky` for scrollytelling, `@property` for
animating variables. If you find yourself reaching for framer-motion or a carousel package, re-read
`references/motion-and-a11y.md` first; the answer is nearly always a CSS variable and an attribute.
