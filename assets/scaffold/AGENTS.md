# Product site

Static Next.js App Router marketing page, no backend. Read the relevant guide in `node_modules/next/dist/docs/` before using
Next APIs; this major version may differ from older conventions.

- Product claims must match the product. Prices, plan features, platforms and languages live in `lib/site.ts`; the README lists
  the source of each. Check the source before changing a number. Do not promise support addresses, platforms, auto-update or
  integrations that do not ship.
- Colour: components use semantic tokens in `app/globals.css`; a section sets `data-theme="light" | "paper" | "tint"`. `dark` is only
  for product mocks. The brand colour is for fills, borders and marks; text uses `--accent` / `--accent-display`.
- Sections are server components. Client code is limited to small islands that write DOM attributes or CSS variables.
- Accessibility: rem text sizes, dim text by colour not opacity, 44px touch targets under `(pointer: coarse)`, looping motion
  stops for `prefers-reduced-motion`.
