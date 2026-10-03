# Motion, accessibility and hydration

## Contents
- The island pattern
- Reveals that cannot hide content
- Motion budget
- Reduced motion, print, no JS
- Touch and keyboard
- Hydration traps

## The island pattern

Sections are server components. Client code is limited to small islands that **write DOM attributes or CSS variables** and let
CSS draw the result. React never re-renders on scroll or pointer movement.

| Island | What it writes | Who reads it |
| --- | --- | --- |
| `RevealObserver` | `data-shown` on `[data-reveal]`; scrambles `[data-scramble]` labels | `.js [data-reveal]` transitions |
| `StepObserver` | `data-active` on the enclosing section | CSS shows the matching pane/tab/step |
| `WaveFloor` | `--px` (pointer x, once per frame) | each bar derives its own lift in CSS |
| `RecTimer` | one text node, once a second | nothing; a re-render a second buys nothing |
| `CurrencyToggle` | `data-currency` on `<html>` | CSS shows one price; state exists only for `aria-pressed` |
| `NavMenu` | open state | a disclosure, closed by link, Escape, or the button |
| `AskDemo` | active question, focused citation | the only island with real React state |

When adding behaviour, ask first: can an attribute plus CSS do this? Usually yes. One observer per behaviour, mounted once.

## Reveals that cannot hide content

The head script adds `.js` to `<html>` before first paint. Content is only hidden under `.js [data-reveal]`, and the observer
flips `data-shown`. So with JavaScript off nothing is hidden, and nothing flashes before hydration. Stagger siblings with
`style={{ '--d': '120ms' }}`. Both `@media print` and `prefers-reduced-motion` force reveals visible: paper never scrolls.

## Motion budget

- Transitions use `--ease: cubic-bezier(0.2, 0.7, 0.1, 1)`, 200ms for hover/press, 700–900ms for reveals.
- Animate `transform` and `opacity` (compositor). The one main-thread animation is the idle waveform sweep, a registered
  `@property --px`, so `WaveFloor` pauses it with an IntersectionObserver while the hero is off-screen.
- Unregistered custom properties only jump between values; register with `@property` to animate one.
- CSS `abs()` is not in every engine: write `max(a, -a)`.
- Pointer-reactive effects attach only under `(hover: hover)`.
- Looping motion (ticker, pulse, caret, sweep) is decorative and stops for reduced motion. There is deliberately no pause
  control in the scaffold (the Kesami design review declined one). Offer it if the user wants it.

## Reduced motion, print, no JS

`@media (prefers-reduced-motion: reduce)` sets animation/transition durations to 1ms, shows reveals, and the ticker becomes a
static wrapped list (second copy hidden). Smooth scrolling turns off. Test by toggling the OS setting or emulating it.

## Touch and keyboard

- Under `(pointer: coarse)` every text link and nav CTA gets a 44px minimum target without changing how it looks.
- Visible focus: `:focus-visible` 2px outline in `--focus` (Ink on light, brand on dark), 3px offset.
- A skip link is the first element in `<body>`, targets `#main`.
- Disclosures use native `details/summary` (FAQ) so keyboard and screen readers work with zero JS. The `+` icon rotates 45° when open.
- Demo buttons that toggle (`AskDemo` questions, currency) use `aria-pressed`; the answer region is `aria-live="polite"`.
- Decorative elements (`WaveFloor`, logo bars, widget controls, the duplicate ticker row) are `aria-hidden`.
- Mocks that are pictures of the app get `role="img"` with an `aria-label` describing what they show.
- Foreign-script text gets `lang` (and `dir="rtl"` for Urdu/Arabic/Hebrew) so browsers pick the right font and direction.

## Hydration traps and how the site avoids them

- **Random decoration**: `WaveFloor` uses a seeded PRNG so server and client draw identical bars.
- **Locale-dependent content** (currency by timezone): render *both* variants into the server HTML and let CSS show one, keyed on
  an attribute the head script sets before paint. No mismatch to patch, no flash. `suppressHydrationWarning` on `<html>` covers the
  attribute only.
- **Clocks**: `RecTimer` writes a text node directly and carries `suppressHydrationWarning`.
- **Storage**: wrap `localStorage` in try/catch; private windows refuse it.
