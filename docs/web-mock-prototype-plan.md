# Prototype plan: web funnel + app paths

Goal: a clickable prototype of the whole funnel that feels real enough to test with users and to hand to engineering. The designs are in Paper ("Stimuler V1" → "Mocktest web", rows 01–06). The flow decisions are in `web-mock-funnel.md`.

## What we build

Two small prototypes that share one set of colours, fonts and fake user data.

| Prototype | Covers | Sizes |
|---|---|---|
| `prototype-web/` | Landing → pick a test → onboarding → the test → result locked → Path A (pay on the web) or sign up → get the app | Desktop 1440, tablet 834, mobile 402 |
| `prototype-app/` | App sign-in → Paths B, C and D → the shared mobile paywall (graph → paywall → gift → offer) | Mobile only; on a laptop it sits inside a phone frame |

The web "Get the app" / QR step opens the app prototype with the same user (name, band, target, exam date, path), so a tester can go end to end.

## How it's built

- **Same approach as the existing prototypes:** plain HTML, CSS and JavaScript, no build step, hosted on Vercel. It's fast to change and easy to share.
- **One page per prototype, with screens swapped in place** (a simple hash router, e.g. `#/onboarding/band`). That gives smooth transitions and working back buttons.
- **The test reuses `prototype-mock`.** Its engine (Sarah, Nolan's videos, captions, timing, the 3 parts) stays; we reskin it to the new screens (desktop two-column layout, Part 2 notes pad, the ring prep pill, the recording pill).
- **Shared tokens file:** the topic colour system (8 hues, `--topic-*`), app indigo, the drill gold, and Inter Display + Geist.
- **Fake data in one file:** the sample user (Priya, 6.0 → 7.0, exam in about a month), the report scores, the three mispronounced words, and the prices. No backend: sign-up, payment and scoring are all simulated.
- **Settings through the link,** so anyone can jump to a case:
  `?path=A|B|C|D` · `&exam=2w|1m|2m|3m` · `&band=6.0` · `&target=7.0` · `&topic=gold` · `&start=report` (skip to a step).

## Phases

| # | What | Main screens | Size |
|---|---|---|---|
| 0 | **Base:** tokens, fonts, router, phone frame, fake data, links per case | – | S |
| 1 | **Web, top of funnel:** landing v2 (examiner wall, folder library, flip card), pick your test (folders + "Surprise me"), test picked | L1, D1, D2 | M |
| 2 | **Web onboarding:** name, exam date, target band slider with the live gauge and smooth number | O1–O3 | S |
| 3 | **The test:** reskin `prototype-mock` for 3 sizes; Part 2 notes pad + ring prep pill; recording pill; checking your answers; mic blocked and connection lost states | S1–C1, E1 | L |
| 4 | **Web result + Path A:** result locked; offer with plans set by exam date and trust row; fake payment; paid → create account → get the app; the free route (sign up → get the app) | R1–R3, A1–A3 | M |
| 5 | **App, shared:** sign-in; build-up (listening back → your target → band reveal); report | B0–B3, report | M |
| 6 | **App, Path B and C:** B goes to the paywall; C goes to setting up your plan → Learn tab (plan locked) → tap anything locked | B, C1–C7 | M |
| 7 | **App, Path D:** "what you said" card; the drill with gold/red/green states (new word "making"); score went up; plan builds | D5–D19b | L |
| 8 | **Shared mobile paywall:** graph draws → settles → paywall with your plan → close → gift opens → offer with countdown | B5–B9 (same in C and D) | M |
| 9 | **Join and polish:** web → app hand-off, transitions, reduced motion, check every size, deploy, one link per path | – | M |

Suggested order: 0 → 5 → 8 → 6 → 7 (app first, since B/C/D are what we test against each other), then 1 → 2 → 4 → 3 → 9. The test (phase 3) is the biggest piece but mostly reuse, so it can go last.

## Motion to get right (from the designs)

- Target band slider: number counts smoothly, gauge fills in the topic colour.
- Folder hover/pick: files slide out, folder takes the topic colour.
- Band reveal: gauge fills from empty to 6.0 after the "?" state.
- Drill: word card turns red on a wrong try, then moves itself on; green on a right one.
- "What you said" card: words light up, then the card slides up into the drill.
- Score went up → the card slides up and the plan ticks in line by line.
- Graph draws left to right, then moves up into the paywall.
- Gift: tap → lid flies off → coupon rises → confetti → offer paywall.

## Loose ends to settle before or during the build

1. **Prices** (web plans by exam date, app yearly/monthly, the 50% offer). Also, the paywall before the gift currently shows the already-discounted price, which makes the gift feel like nothing.
2. **Mic in the drill and the test:** real mic with fake scores (feels real), or tap to simulate (easier to test anywhere)?
3. **Exact exam date:** onboarding asks "in about a month"; dates like "Band 7.0 by 21 October" need a real date.
4. **The graph tag** ("In 4 weeks") should follow the exam date ("In 14 days", "In 30 days"…).

## Done means

- One link per path (A, B, C, D) that runs from the landing page to the offer paywall.
- Works at 1440, 834 and 402 on the web; app screens at 402.
- Every screen in Paper row 04–06 has a matching state in the prototype.
- Hosted on Vercel, with a short README on how to jump to any step.

## The test: execution list

### What exists

| | Desktop 1440 | Mobile 402 | Tablet 834 |
|---|---|---|---|
| Sarah intro | S1, S2 | S1, S2, S3 | S2 |
| Mic | M1 meet Nolan + mic, M2 blocked, M3 sound check | M1, M2 | – |
| Nolan says hello | (in M3) | N1 | – |
| Part 1 / Part 3 question | T1, T2 answering, T5 | Q1 asks, Q2 mic ready, Q3 recording | Q1, Q2 |
| Part 2 | T3 your minute (notes pad beside the card), T4 speaking from notes | P1 intro, P2 card arrives, P3 notes on the card, P4 speaking | P2 |
| End, checking | T6, C1 | T6, C1 | – |
| Connection lost | E1 | E1 | – |

The engine (beats, voice clips, captions, timing, Nolan's video) is in `prototype-mock`.

### How we build it (different from the pages so far)

The pages so far are three separate copies of the design, one per size. That breaks for the test: if you resize mid-question, a timer or a recording would restart.
So the test is **one screen with one state**. The engine holds where you are: the beat, the timer, whether the mic is on, your notes. The layout changes around it:

- **Mobile (<600):** stacked. Examiner at the top, card in the middle, mic docked at the bottom.
- **Tablet (600–1099):** the mobile structure, larger. The 4 tablet screens set the sizes; the rest follow the mobile screens.
- **Desktop (≥1100):** two columns. Examiner and caption on the left, card (and the notes pad in Part 2) on the right, mic at the bottom centre.

Moving between sizes only rearranges the pieces, with a short animation. Nothing restarts. Notes you typed stay.

### Steps

| # | Step | Done when |
|---|---|---|
| 1 | **Inventory.** Pull every test screen from Paper as a reference image, plus exact sizes and colours. Map each beat to its screen at each size. | A table of beat → desktop / mobile / tablet screen |
| 2 | **Port the engine.** Move the beats, voice clips, captions and timing from `prototype-mock` into the funnel. Add a demo speed switch (`?speed=4`) and a way to jump to a beat (`?beat=part2`). | The test runs start to end with a bare layout |
| 3 | **The shell.** One layout with named areas: top bar (single progress bar), examiner, caption, card, notes, mic dock. Three arrangements by width, animated between them. | Resizing mid-test moves pieces smoothly and keeps the state |
| 4 | **Pieces.** Examiner ring (video), caption bubble, paper question card, mic button → recording pill (time left, wave, ✕ / ✓), Part 2 prep pill with the ring timer, notes pad (desktop: sections beside the card; mobile: lines on the card) | Each piece matches Paper at all 3 sizes |
| 5 | **Beats, in order.** Sarah intro → mic (simulated; blocked state) → Nolan says hello → Part 1 → Part 2 (intro, card, your minute, 2-minute talk, rounding-off question) → Part 3 → end → Sarah checks your answers | Whole test clickable at all sizes |
| 6 | **Edge states.** Mic blocked (with how to fix), connection lost → pick up where you left off | Both reachable from the flow and by link |
| 7 | **Personal.** Your name, the test you picked, its examiner and colour carry through; "checking your answers" hands off to the result | Picking a test on the deck changes the test |
| 8 | **Size testing.** Automatic screenshots of every beat at 360, 402, 834, 1100 and 1440; a live resize in the middle of recording and of the notes minute; touch and mouse | No overlaps, nothing restarts, all pieces reachable |
| 9 | **Deploy** and hand over the links | Live on Vercel |

## Payment paths in the app: execution list

**Where it lives:** same Vercel project, under `#/app/...`. Mobile only (402 wide). On a laptop or tablet it sits in a phone frame in the middle of the screen. The web hand-off ("Install Stimuler" / the QR) opens it with the same person (name, test, exam date, target, path). Which path you get comes from `?path=B|C|D`.

| # | Step | Screens | Done when |
|---|---|---|---|
| 1 | **App shell.** Phone frame on wide screens, app colours (indigo), Inter Display + Geist, screen-to-screen transitions | – | An empty app screen opens from the web hand-off |
| 2 | **Shared start (B, C, D).** Sign in (owner's version) → listening back (waveform + 4 ticks) → your target (empty gauge, "?") → band reveal (gauge fills to 6.0) | B0–B3 | Auto-advancing build-up, band counts up; button text differs per path |
| 3 | **Shared paywall sequence.** Graph draws → settles under the headline ("In N days · Band 7.0") → "What's in your plan" slides in → plans + Unlock → close → gift → lid flies off, coupon + confetti → offer with a live 24h countdown | B5–B9 | One component all three paths call; dates and days from the exam date |
| 4 | **Path B.** Band reveal → "See my plan to 7.0" → paywall sequence | B3 → B5 | End to end |
| 5 | **Path C.** Full report (free) → setting up your plan (ticks) → Learn tab: Unit 1 done, scrolls to locked Unit 2 and 3 → tap anything locked → paywall sequence | C4–C13 | Scrolling Learn tab, every lock opens the paywall |
| 6 | **Path D.** Full report → Continue → golden lead-in (what you said → the 3 words light up → card slides up) → the drill (gold / red / green, simulated mic, "marketing" wrong → "ng" sound → "making" right) → pronunciation 44% → 52% → plan ticks in → paywall sequence | D4–D25 | The whole drill runs by taps, with the wrong try moving on by itself |
| 7 | **Paid.** Unlock / offer → a simple "You're in" home, so every path has an end | – | All three paths finish |
| 8 | **Check + deploy.** Every screen against Paper at 402; reduced motion; links per path | – | One link per path: A (web), B, C, D |

**Order:** 1 → 2 → 3 → 4 (B is the shortest full path, so the shared pieces get tested first) → 5 → 6 (the biggest) → 7 → 8.
