# Design system

Everything lives in `app/globals.css`. Components never use raw palette values; they read semantic tokens, and a section picks
its palette with `data-theme`.

## Contents
- Palette and the signal colour
- Themes
- Why there are two accent shades
- Type
- Spacing, layout, radii
- Buttons, links, chips

## Palette and the signal colour

Raw palette: Canvas (warm off-white `#f5f5f0`), Surface (charcoal `#1a1a1a`), Ink (near-black `#111`), and one signal colour
(default `#ff5e00`). Restraint is the design: one hue does every job that needs to be noticed, so noticing it means something.

The signal colour is used for exactly these, and nothing else:
1. Filled buttons (label in Ink).
2. Link underlines.
3. Decorative borders and marks: the live-indicator pill border, ticker rules, the footer rule, the logo tile.
4. Accent text, always on its own 10% tint (`.label`, `.chip`) or as the darkened `--accent` / `--accent-display`.

## Themes

`data-theme="light" | "paper" | "tint" | "dark"` on a `section` or `footer` redefines `--bg`, `--bg-raised`, `--fg`, `--fg-dim`,
`--fg-mute`, `--line`, `--accent`, speaker tones and more.

- `light`: Canvas. `paper`: pure white, with Canvas as the raised surface. Alternate them down the page so each section starts on
  a visible edge. `tint`: the ticker band, brand at 10% over Canvas, flattened to an opaque colour so what sits on it stays opaque.
- `dark`: used only inside product mocks (hero widget, story window), because the app itself is dark. The page is light by
  decision. If the product's UI is light, set the mocks to a light theme and drop `dark` from the CSS.
- Inside a themed container, `[data-tone='you' | 'speaker-1' | 'speaker-2' | 'speaker-3']` picks a colour from the nearest theme, so
  a dark mock inside a light section keeps its own, brighter speaker colours.

## Why there are two accent shades

A saturated brand colour fails as text on a light page (the default orange is 2.8:1 on Canvas). So:

- `--brand` (the pure colour) is for fills, borders and marks only.
- `--accent` is the brand hue darkened until it reaches 4.5:1 on Canvas, white and the tint. Use it for any small text.
- `--accent-display` is darkened only to 3:1, the large-text threshold. Use it for headline-size `.em` words.
- The button label is Ink, not white, when Ink reads better on the fill: white on `#ff5e00` is 3.06:1, Ink is 6.16:1.

`node scripts/accent.mjs <hex>` computes all of this, and tells you ink or white for the label. The values it prints are the floor;
hand-picked values a touch darker (the original used `#a83c00` / `#e25300`) give margin on cheap displays.

Neutral text steps, each checked on Canvas: `--fg` Ink, `--fg-dim` 8.1:1, `--fg-mute` 5.3:1. `--fg-quiet` (3.2:1) is for
non-text marks only; never put body text in it.

## Type

Two voices, one job each:
- **Display serif** (`.display`, family `Brand Display`): personality; what the page says. Headlines, step titles, ticker lines.
  Tight tracking (`-0.025em`), line-height `0.94`.
- **Wide sans** (Mona Sans with the width axis, `font-stretch: 112–125%`, weight 600–800, tabular numerals): precision; what the
  page specifies. Labels, figures, timecodes, wordmark, buttons.

`lib/fonts.ts` serves `public/fonts/display-regular.woff2` (+ `display-bold.woff2`) when present and otherwise the vendored
Instrument Serif (SIL OFL), under the same family name, so no CSS changes when a licensed face arrives. The check runs once at
build time. Preload the display face in `layout.tsx`: the hero headline is the largest paint.

Mona Sans comes from `next/font/google`, which downloads at build and self-hosts, so visitors never contact Google.

Scale (all rem so browser text size applies; clamp so it flows between phone and desktop):
`--t-label .75` · `--t-small .875` · `--t-body 1.0625` · `--t-lead 1.19–1.375` · `--t-h3 1.625–2.375` · `--t-h2 2.75–7`.
Big jumps on purpose: hierarchy must not depend on colour alone.

The hero title is sized in `cqi` of its own column (`container-type: inline-size`), not the viewport, so a wider or narrower
display face can never run into the widget beside it.

## Spacing, layout, radii

4px grid: `--s-1 … --s-10` = 4, 8, 16, 24, 32, 48, 64, 96, 128, 192. `.wrap` is max 1440px with a fluid gutter
`clamp(16px, 4vw, 56px)`. Sections pad `var(--s-9)` vertically. Radius 12px for cards, 999px for pills and buttons, 16px for the
widget, 28% for the logo tile.

`scroll-padding-top: var(--nav-h)` so anchor jumps clear the sticky nav; `overflow-x: clip` on body (not `hidden`, which breaks
`position: sticky`).

## Buttons, links, chips

- `.btn`: filled brand, pill, 52px tall, Ink label. One per viewport. `.btn-quiet` is an outline variant.
- `.link`: text with a 2px brand underline, offset 6px; hover shifts the text to `--accent`. In the footer the underline is
  transparent until hover.
- `.label` / `.chip`: pill on the 10% tint with `--accent` text, uppercase, wide-tracked. `.label` has a brand dot. Every orange
  word that is not a headline emphasis lives in one of these.
- Nav CTA is outlined, not filled, so the hero's button remains the page's one filled button.
