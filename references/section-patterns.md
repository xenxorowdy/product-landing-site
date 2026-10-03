# Section patterns

Page order in the scaffold: Nav, Hero, ticker, Story, Ask, (optional extras), Pricing, FAQ, Closing, Footer. Section files live in
`assets/scaffold/components/`; extras in `assets/optional-sections/`.

## Contents
- Nav
- Hero
- Ticker
- Story (scroll-driven product tour)
- Ask / interactive demo
- Optional: before/after comparison
- Optional: privacy with a literal picture
- Optional: script wall
- Pricing
- FAQ
- Closing and footer

## Nav

Sticky, Canvas, 64px (`--nav-h`). Wordmark left, section links, outlined CTA. Under 880px the inline list becomes `NavMenu`, a
disclosure (one button, one list) closed by choosing a link, Escape, or pressing the button again. Not a drawer.

## Hero

Layout: a live-indicator pill, then a two-column grid: headline + lead + one button + one text link + small print on the left,
a tilted (1.5deg) dark product widget on the right; a waveform floor along the bottom.

- The pill (`LIVE 14:24`) is the page's one "live" signal: a pulsing brand dot, a brand border, and `RecTimer`, a clock that
  keeps running. Swap for whatever the product's live state is (a build counter, a sync status) or drop it.
- The widget is a faithful, simplified mock of the product's own floating UI, with turns that fade in on a staggered `--d`
  delay and a blinking caret on an interim line. It is a `figure` with an `aria-label`; its controls are `aria-hidden`.
- `WaveFloor`: the logo's bars stretched across the page, 88 of them (half on phones, because 88 bars in 360px are hairlines).
  Idle, a playhead sweeps across via an animated `@property --px`; under a pointer the bars rise around the cursor, driven by
  one CSS variable written once per frame. Phrase-shaped heights come from two multiplied slow sines plus seeded noise, which
  is what makes it read as speech rather than an equaliser. Replace the shape with whatever suits the product (a skyline of
  commits, a heartbeat) but keep the technique: one variable, bars derive their own state in CSS.
- The grid has bottom padding equal to the floor's height so the bars never run behind the copy.
- On a phone the grid is one column and the widget loses its tilt.

## Ticker

A band on the `tint` theme between brand-coloured rules. Four items alternating the two type voices (serif sentence, uppercase
wide-sans spec), each followed by the logo mark. Two identical rows (the second `aria-hidden`) translate by -50% for a seamless
loop; hover pauses it; reduced motion turns it into a wrapped static list. Items are claims the product can stand behind.

## Story (scroll-driven product tour)

The most distinctive section. Left: three step blocks (number chip, serif title, body, fact chips). Right: a sticky app window
with tabs, showing three panes stacked absolutely.

- `StepObserver` watches each `[data-step]` with an IntersectionObserver whose root margin makes a thin band in the middle of the
  viewport (`-45% 0 -45% 0`); the intersecting step writes `data-active` onto the `section`. On phones the window is pinned over
  the top 44vh, so the band sits lower (`-58% 0 -22% 0`).
- CSS does the rest: `.story[data-active='2'] .pane[data-pane='2'] { opacity: 1 }`, same for tabs and step titles (the active step's
  title goes from dim to `--fg`). Scrolling never re-renders React, and all three panes are server-rendered and readable.
- The frame is `position: sticky; top: calc(var(--nav-h) + 8vh); height: min(620px, 76vh)`. Both columns occupy the same grid row so
  the steps scroll past the pinned window.
- Pane content shows real artefacts of the product (transcript lines, a summary with decisions, an action table whose "Source"
  cells cite timestamps, a chat answer with a quoted source). Show what the user *gets*, not UI chrome.

## Ask / interactive demo

Left: "Try asking" question pills (`aria-pressed`), then the thread. Right: the source transcript. Picking a question types out the
answer word by word, and every claim ends in a citation chip; hovering or focusing a chip highlights the exact source line, and the
other cited lines get a subtler tint.

- The typing effect is pure CSS: the answer is split into words once, each gets `--i`, and CSS staggers `animation-delay` from it.
  No timers, no per-word state. The `key={active}` on the paragraph restarts the animation when the question changes.
- The citation is the product's actual contract, demonstrated. Use the same device for whatever your product promises
  (a diff that links to the line, a number that links to the cell).
- Says plainly that AI can be wrong and how to check it.

## Optional: before/after comparison (`Cleanup`)

Two panels joined by an arrow: "what went in" (including junk lines tagged as dropped or filtered) and "what came out", plus a
row of three measured specs (value in the wide sans, explanation beside it). Use when the product's value is invisible work.
Numbers must be the product's real constants.

## Optional: privacy with a literal picture (`Privacy`)

Three numbered points beside a Finder-style window showing the product's actual folder layout and file names. Shows what the
data is instead of asserting safety. State the boundary exactly, including what does leave the device.

## Optional: script wall (`Languages`)

A wall of language names, each in its own script with `lang` (and `dir="rtl"` where needed). Turns a feature bullet into
something you can see. Only if the product supports multiple scripts.

## Pricing

Two plan cards (Pro first and larger, Free beside it) and an enterprise aside. A USD/INR toggle: the head script picks
INR for Indian time zones and USD otherwise unless the visitor chose before; both prices are in the server HTML and CSS shows one
via `html[data-currency]`. Drop the toggle and `Price` if there is one currency. Features come from `PLANS` in `lib/site.ts`.

## FAQ

Two columns: a sticky heading on the left (static on narrow screens), native `details/summary` list on the right with ruled
rows and a rotating `+`. See `copy-and-facts.md` for which questions to include.

## Closing and footer

Closing: a huge two-beat statement, the one button repeated, the small print. Footer: tagline, two link columns, then the
wordmark set at `23vw` in the brand colour, centred, clipped by `overflow: hidden`, so a six-letter name runs edge to edge. Tune
the vw to the length of the name. A thin brand rule tops the footer.
