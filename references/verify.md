# Verify before calling it done

## Contents
- Commands
- Screenshots
- What to look for
- Contrast
- Behaviour checks
- Report honestly

## Commands

```bash
npx tsc --noEmit
npx next build          # all routes should print as static (○)
npx prettier --check .  # the scaffold ships a .prettierrc: 4 spaces, width 150, single quotes
```

Run prettier only inside the new site folder. In a repo with other code, `prettier --write .` at the root rewrites unrelated files.

## Screenshots

Headless Chromium-family browsers (Brave in particular) can hang forever on `--screenshot` against a localhost dev server. An
offscreen Electron window does not. Use the bundled script with any Electron binary (a product that is itself an Electron app
already has one in its `node_modules`):

```bash
npx next build && npx next start -p 3111 &
URL=http://localhost:3111 OUT=<scratchpad>/shots WIDTHS=1440,390 \
  <path>/node_modules/.bin/electron ~/.claude/skills/product-landing-site/scripts/capture.cjs
```

It scrolls in 80%-viewport steps, waiting after each so scroll reveals actually fire (jumping with `scrollTo` skips
IntersectionObserver reveals), and writes `1440-00.png …`, `390-00.png …`. Read the images. If Electron is unavailable, say so
and fall back to code review rather than claiming the design was seen.

To exercise a font fallback or other state, use `webContents.insertCSS`. Programmatic `.focus()` fires no focus events in a
hidden window; dispatch `mouseover` to test hover handlers instead.

## What to look for

- Hero headline clear of the widget at 1440 and at 390; the waveform not behind the copy.
- Every section starts on a colour edge; no two adjacent sections share a theme.
- Story: at each step the matching tab, pane and step title are active; the window stays pinned.
- Phone: no horizontal scroll, nav collapses to the menu, 44px targets, 16px gutters, widget upright.
- Footer wordmark touches both edges and is clipped, not wrapped.
- Every number and claim traces to a source in the README's facts table.

## Contrast

```bash
node ~/.claude/skills/product-landing-site/scripts/accent.mjs <brand> --check "<fg>:<bg>" …
```

Re-check any new text colour on each surface it sits on (Canvas, white, tint). Text needs 4.5:1; headline-size text 3:1.

## Behaviour checks

- JavaScript disabled: all text readable, nothing stuck at opacity 0.
- `prefers-reduced-motion: reduce`: ticker static, no loops, reveals visible.
- Keyboard only: skip link, nav, menu, FAQ, demo pills, currency toggle all reachable with visible focus.
- Currency: a visitor in Asia/Kolkata gets INR before paint; choosing USD persists; no hydration warning in the console.
- Print preview shows all content.

## Report honestly

State which of these you ran and which you did not. "Build and typecheck pass; screenshots at two widths reviewed; contrast
checked for the accent; reduced-motion and no-JS not tested" is a good report; "all verified" is not unless it is true.
