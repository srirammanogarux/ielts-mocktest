# Design plan and checklist

For "IELTS mock test by Stimuler". The funnel itself is in `web-mock-funnel.md`.

## Decisions so far

- **No serif fonts.** Inter Display and Geist only (Caveat for handwritten notes).
- **Main button is white.** Indigo is for glow, labels and links.
- **Mic sits at the bottom centre on every size.** When recording, it turns into a wide bar: timer, sound wave, "I'm done". No "start again".
- **We go flow by flow, all 3 sizes each:** 1 Top of funnel → 2 Deck + onboarding + login → 3 Sarah + mic check → 4 The test → 5 Checking + report + hand-off.
- **On hold:** paywalls, pronunciation drill, grammar drill.

## How we'll work

1. **Rules first.** One style guide page: colours, fonts, buttons, cards, the two backgrounds. Nothing else gets drawn until this is approved.
2. **Three hero screens next.** One from each part of the funnel, on mobile: Landing, a Test question, the Blurred report. If these three look right, the rest will too.
3. **Mobile before desktop.** Most users are on phones. Desktop and tablet come after the mobile flow is approved.
4. **Real content.** Real questions, real cue card, real names. No "lorem ipsum".
5. **Reuse the prototype.** The test screens copy the look of `prototype-mock` (paper card, Nolan's ring, mic, captions). We don't reinvent them.
6. **You approve at the end of every round.** Small rounds, so a wrong turn costs little.

## Rounds

| Round | What gets made | You check |
|---|---|---|
| **0** | Style guide | Colours, fonts, the two backgrounds |
| **1** | 3 hero screens (mobile) | Does it feel premium, calm, official? |
| **2** | All web screens (mobile) | Does the flow make sense end to end? |
| **3** | Desktop + tablet for key screens | Do the wide layouts work? |
| **4** | Payment paths A, B, C, D | Is each path clear and different? |
| **5** | Polish pass | Final sign-off |

## Round 0 · Style guide

> Already exists on the "Mocktest web" page in Paper: the colour tokens (`--color-ob-*` outside, `--color-exam-*` inside) and the logo. The main button is **white**, as the palette says; indigo is for glow, labels and selection.

- [ ] **Outside colours:** soft dark background, indigo for buttons, text greys
- [ ] **Inside colours:** deep black, cream text, gold (Sarah), blue-grey (Nolan), paper, green and red for the mic
- [ ] **Report colours:** teal gauge, red / amber / green rings (from the app)
- [ ] **Fonts:** Inter Display sizes, Geist sizes, Caveat for notes, one serif to try on card titles
- [ ] **The two backgrounds:** outside (indigo glow), inside (gold glow, blue-grey glow)
- [ ] **Buttons:** main, second, text-only, disabled, loading
- [ ] **Inputs:** text box, OTP boxes, choice chips
- [ ] **Cards:** mock test card (open, locked), paper cue card, report card (open, blurred, locked)
- [ ] **Small parts:** top bar, progress line, Part 1·2·3 bar, examiner ring, mic button, caption bubble, lock badge
- [ ] **Spacing and corners:** one spacing scale, one set of corner sizes

## Round 1 · Hero screens (mobile 402, tablet 834, desktop 1440)

Every screen is now designed at all three sizes in the same round, not mobile first.

- [x] **Landing**: mobile, tablet, desktop
- [x] **Deck, card drawn**: mobile, tablet, desktop
- [x] **Test question** (Part 1, Nolan has asked, mic ready): mobile, tablet, desktop
- [x] **Blurred report**: mobile, tablet, desktop (desktop has the QR code hand-off)

## Round 2 · All web screens (mobile 390)

**Outside**
- [x] L1 · Landing, full page: v1 done. **v2** (examiner wall, test library, flip card, a button in every section): desktop, tablet and mobile done
- [x] L2 · "Open in your browser" (for Instagram and TikTok browsers): mobile only. **v2** is shorter and shows a picture of the menu
- [x] D1 · Pick your mock test (theme rows + Surprise me): desktop, tablet, mobile
- [x] D2 · Test picked (examiner + 3 parts + Start): desktop, tablet, mobile
- [x] O1 · Your name (desktop, mobile)
- [x] O2 · Exam date (desktop, mobile)
- [x] O3 · Target band + slip stamped READY (desktop, mobile)
- [x] R2 · Sign up after the test: Google or email + password (desktop, mobile)
- [x] R3 · Get the app: QR (desktop) / install button (mobile) + "log in with the same account"

**Inside**
*Desktop, mobile and tablet done. Mobile and tablet copy the prototype screen by screen.*
- [x] S1 · Sarah's intro (the lights-dim moment)
- [x] S2 · The three parts · S3 nobody stops you (mobile/tablet)
- [x] M1 · Meet Nolan + turn on mic
- [x] M2 · Mic blocked (how to fix it)
- [x] M3 · Say hello (sound wave moving) (desktop)
- [x] N1 · Nolan says good morning (mobile/tablet)
- [x] Q1–Q2 · Question, Nolan asking, then mic ready
- [x] Q3 / T2 · Answering: timer on top, pill with ✕ · wave · ✓ (as in the prototype)
- [x] P1–P2 · Part 2 intro + cue card arrives (mobile/tablet)
- [x] P3 / T3 · Your minute: typing notes into the cue card lines
- [x] P4 / T4 · Speaking from notes (2 minutes)
- [x] T5 · Part 3 question (desktop)
- [x] T6 · "That is the end of the speaking test"
- [x] E1 · Connection lost / pick up where you left off
- [x] C1 · Checking your answers

**Outside again**
- [x] R1 · Result locked, "See my full report in the app" (desktop, mobile)
- [ ] H1 · Hand-off: get the app

## Round 3 · Desktop (1440) and tablet (834)

| Screen | 1440 | 834 |
|---|---|---|
| L1 Landing | ✓ | ✓ |
| D1, D2 Deck | ✓ | ✓ |
| O2 Onboarding (split layout) | ✓ | |
| AC1 Account | ✓ | |
| S1 Sarah | ✓ | ✓ |
| M1 Meet Nolan | ✓ | |
| T2, T3 Question | ✓ | ✓ |
| T4, T5 Part 2 | ✓ | ✓ |
| C1 Checking | ✓ | |
| R1 Blurred report | ✓ | ✓ |
| H1 Hand-off with QR code | ✓ | |

## Round 4 · Payment paths

> On hold for now: all paywalls (A1–A3, B2, C4, D6), the pronunciation drill (D2) and the grammar drill (D3).

**A · Pay on the web** (390 and 1440)
- [ ] A1 · Offer under the blurred report
- [ ] A2 · Pay (UPI or card)
- [ ] A3 · Paid: "your report is waiting in the app"

**App screens** (390 only, in the app's style)
- [ ] X1 · App opens on the report / "Took a test on our website? Log in"
- [ ] B1 · Report: band shown, 4 cards locked
- [ ] B2 · Paywall
- [ ] C1 · Full report, free
- [ ] C2 · End of report: "Take your next mock"
- [ ] C3 · Home: deck with the rest locked
- [ ] C4 · Paywall
- [ ] D1 · The gap
- [ ] D2 · Pronunciation drill
- [ ] D3 · Grammar drill
- [ ] D4 · The small win (before and after)
- [ ] D5 · Your journey
- [ ] D6 · Paywall

## Round 5 · Polish: checked on every screen

- [ ] Looks like the style guide (no new colours, fonts or corner sizes)
- [ ] One main button per screen
- [ ] Text is easy to read on the dark background
- [ ] Buttons are big enough for thumbs (44px or more)
- [ ] Nothing important sits under the phone's notch or bottom bar
- [ ] Words are simple and short, and sound like one voice
- [ ] Inside screens have nothing that distracts from Nolan and the question
- [ ] The same screen at 390, 834 and 1440 feels like one product

## Size of the job

About **45 screens**, about **70 artboards** once desktop and tablet are counted.

## What I need from you

1. The Paper file open (or tell me to create a new one)
2. The app's exact indigo colour and the Stimuler logo
3. Screenshots of the app's **paywall** and **home tab**, so B, C and D match the real app
4. The price and plan to show on paywalls (a placeholder is fine)
