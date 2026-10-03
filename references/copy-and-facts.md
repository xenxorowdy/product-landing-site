# Copy and facts

## Contents
- Voice
- The shared scenario
- Keeping claims true
- Section copy shapes

## Voice

- Concrete verbs over adjectives. "Records from your Mac, no bot joins the call" beats "seamless, powerful note-taking".
- Headlines are short, two beats, with the payoff words in `.em`: "Every meeting, *remembered.*", "The room is noisy. *The notes aren't.*"
- A `.lead` is at most two sentences and must say what happens and what the reader gets.
- Prefer sentences a sceptical reader could check. If a claim has a number, the number comes from the product (a constant in the
  code, a plan limit), never from a round-figure instinct.
- The footer tagline repeats the hero promise. The closing section restates it as an invitation, with the one button again.
- Small print under a button states cost and platform exactly: "Free to start · macOS 13+ · Apple Silicon".

## The shared scenario

Pick one fictional but realistic scenario and use it in the hero mock, the story window and the demo, so they agree to the
word. Give it a few named people, timestamps, a decision, and an open loop. The open loop ("nobody took Meera's request")
is what lets the demo answer a question the reader would not have thought to ask, which is the moment the product earns trust.

## Keeping claims true

`lib/site.ts` is the single place facts live; the site README lists the source file for each. Before changing any number:

- Prices, limits, plan features: the product's plan/billing code.
- Platforms and OS floors: the build config of the shipped app.
- Languages/formats/integrations: the settings or export code.
- Download link: the actual release channel. If asset names carry the version, link the "latest release" page, not a file.

Leave out anything the product does not do *today*. Specific traps seen in practice:
- A support address that does not exist yet: do not promise one (drop "priority support" from the plan list).
- Windows/Intel builds, auto-update, store listings, browser extensions that are only installable from source.
- "Nothing leaves your device" when audio streams to a relay or text goes to an AI provider. State the real boundary:
  what stays local, and exactly what is sent and when.
- Missing code signing/notarisation: say so plainly in the FAQ with the steps to open the app.

Add an FAQ entry for every uncomfortable truth; being first to say it is the cheapest trust you can buy. Every answer should be
checked against code or the README. A missing price (enterprise) is "Coming later", not an invented figure.

## Section copy shapes

- **How it works**: three steps. Each has a number chip, a display title in the user's terms, a two-sentence body, and two
  short "facts" chips. Step 1 = how it starts, 2 = what happens without being asked, 3 = the payoff later.
- **Demo/Ask**: say how answers are produced and how a reader verifies them. If the AI can be wrong, say so next to the demo.
- **Pricing**: lead with the plan most people should take, show the free plan honestly, keep enterprise as a quiet aside.
- **Privacy**: three numbered points (what is not done, where your data lives, where the cloud is used), with a literal picture
  of the data (a Finder-style folder tree) instead of a lock icon.
