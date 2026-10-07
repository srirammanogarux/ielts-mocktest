# IELTS mock test by Stimuler: the web funnel

> Paper page "Mocktest web" is laid out top to bottom: 00 Foundations · 01 Top of funnel · 02 Pick a test · 03 Onboarding · 04 The test · 05 Result + app hand-off · Archive. In each row: desktop, then tablet, then mobile.

What the user goes through, top to bottom, and what each screen looks like. This is the brief for the Paper designs.

## The two worlds

| | **Outside**: the "store" | **Inside**: the "exam room" |
|---|---|---|
| Screens | Landing, deck, onboarding, report, hand-off, paywalls | Sarah's intro, Nolan's test, "checking your answers" |
| Feels like | Premium, official, clear | Calm, immersive, nothing to distract |
| Background | Soft dark with an indigo glow | Deep black with a slow moving glow: gold for Sarah, cool blue-grey for Nolan |
| Buttons | Indigo | Almost none. Just the mic. |

Fonts: **Inter Display** for big headings, **Geist** for everything else, handwriting only for Part 2 notes. We'll try a **serif** on the mock test card titles.

Sizes we design: **mobile 390** (first, most polished), **tablet 834** (key screens only), **desktop 1440**.

Everything is dark for now. We may try a light version of steps 2–5 later.

## The funnel at a glance

```
OUTSIDE (web)       1 Ad or search  →  2 Landing  →  3 Deck  →  4 Onboarding  →  5 Account
INSIDE (web)        6 Sarah  →  7 Mic check  →  8 The test (Nolan)  →  9 Checking
OUTSIDE (web)       10 Blurred report
                          │
                          ├── A: pay on the web → install → app, everything unlocked
                          │
                          └── B / C / D: install → app opens on the report
                                    ├── B: band free, details locked → paywall
                                    ├── C: full report free → more tests locked → paywall
                                    └── D: report + gap + free exercises + small win → paywall
```

Everyone sees the same steps 1–10. The split happens at step 10. Each person is put into one group (A, B, C or D) on their first visit and stays there.

---

## Steps 1 to 10 (everyone)

### 1 · Ad or search
- **Ads (Meta, TikTok):** Nolan on video asks a real IELTS question, then "Can you answer this?"
- **Search:** one page per cue card topic ("Describe a city you would like to visit"), ending with "Practise this in a real mock test."
- **Opened inside Instagram or TikTok:** those apps often block the mic, so we show a small screen: "Open in Chrome/Safari so your mic works."

### 2 · Landing page (v2)
*Outside world.*
- **Top bar:** logo, links, and a white "Start a free mock" button that is always there. No "Log in" button anywhere on the web.
- **Hero:** "Face the examiner before exam day." A wall of 6 examiners (Nolan, Grace, Marcus, Aoife, Daniel, Fiona), each with their accent. Nolan is "Examining now".
- **Sections, each with its own button:** mock test library (test cards + a strip of real topics) → cue card that flips to a Band 8 answer → how it works (3 steps: pick, speak, get your band) → sample report (simple score rows, band gauge on the right) → FAQ → final call.
- **Topic strip motion:** the two rows of topics slide slowly and never stop, in opposite directions (about 40s per loop). They pause on hover, and stay still if the phone's "reduce motion" setting is on.
- **To avoid the "AI look":** no glows, no small all-caps labels, no status dots, no generic stats row. Show real IELTS content instead: topics, questions, timings.
- **Every button goes to the next screen:** the mock test deck.
- **Mobile:** examiners in a swipe row. Once the hero button scrolls away, a bar stays pinned at the bottom: "Your first mock is free · Start now".
- **Desktop:** headline on the left, examiner wall on the right.
- **Open in browser (Instagram/TikTok):** one line of text and a picture of the menu with "Open in external browser" highlighted.

### 3 · The mock test deck (v2)
*Outside world.* Every landing button leads here.
- **Test card = a folder.** It's the same dark folder for every test (our surface colours), with a paper cue card and a photo sticking out. Each test has its own photo and an **accent colour** taken from that photo, for example city lights = amber and the park = green.
- **Card states:** Default · Hover/first tap (files slide out a little, folder fills with the accent colour) · Picked (same as hover) · Taken (teal "Band 6.5" stamp + Retake) · Locked (greyed out, "Unlock in the Stimuler app").
- **D1 · Pick your mock test:** "Your first one is free." Rows of folders you scroll sideways, by theme (Asked this season, People…). Chips filter by theme. "Surprise me" picks a random test.
- **D2 · Test picked:** Spotify-style. The page takes the test's accent colour as a gradient from the top, and the big folder sits in its picked state. Then comes the examiner, one line per part, and "Start this test".
- **The accent colour carries on** through the rest of the funnel (onboarding, Sarah, the test), so it feels like *your* test.
- The landing page's library section uses the same folders.
- **Images:** 9 prototype photos for now. 100+ tests need one image each (to decide: AI-generated or from the team).

### 4 · Onboarding (3 quick questions, no account yet)
*In the picked test's colour (amber for "Cities and places").*
- **O1 · Name:** "What should Nolan call you?" A text box and Continue.
- **O2 · Exam date:** In 2 weeks / In a month / In 2 months / More than 2 months. Tapping an answer moves on by itself.
- **O3 · Target band:** 5.5 / 6 / 6.5 / 7 / 7.5 / 8+, with the hint "Most universities ask for 6.5 or 7." Button: "I'm ready. Start the test".
- **Candidate slip:** a paper slip like an exam-day admission slip. It fills in as they answer (name, exam date, band, test, examiner) and gets a red "READY TO SPEAK" stamp at the end. Desktop: a big slip on the right. Mobile: a small strip at the top.
- Then straight into the test: Sarah → mic check → Nolan.

### 5 · Result and account (after the test)
- **R1 · Result, locked:** the web never shows the result, in any payment path. Band gauge and the 4 scores are blurred. No previews at all: no teaser, no sample fix. Button: "See my full report in the app" · "Free · Takes 1 minute · Your report is saved".
- **R2 · Sign up:** "Save your report, Priya." Continue with Google, or email + password ("Create account"). Tells them to log in to the app with the same account.
- **R3 · Get the app:** "Your report is saved. Open it in the app." Desktop: QR code. Mobile and tablet: an "Install Stimuler, it's free" button that goes straight to Google Play or the App Store (a smart link that picks the right store). Steps: install → log in with the same email and password (email shown) → report opens. The link is emailed too.
- Tech to check: can the QR/install link log them in automatically (deferred deep link)? If yes, step 2 goes away.

### 6–9 · The test (row 04 in Paper · desktop, mobile, tablet)
*Topic colour stays on as a soft glow. Examiner = video in a ring, as in prototype-mock. Desktop uses a wide two-column layout. **Mobile and tablet copy the prototype's screens and transitions one to one** (ielts-mocktest-psi.vercel.app); tablet is the mobile column centred.*

**Mobile and tablet screens (same order as the prototype):** S1 Sarah intro · S2 three parts · S3 nobody stops you · M1 before we start (mic) · M2 mic blocked · N1 good morning (Nolan) · Q1 Nolan asks · Q2 question + mic · Q3 recording · P1 Part 2 intro · P2 cue card arrives · P3 your minute (typing notes) · P4 speaking from notes · T6 end · C1 Sarah returns + checking · E1 connection lost.

**Desktop screens:**
- **S1 · Sarah intro:** Sarah's video large, captions like a lyrics view (the current line is bright, other lines dim). "Skip intro".
- **S2 · The three parts:** "Three parts, one take. Nobody will stop you." Part 1/2/3 with timings. "Nolan won't react… Real examiners don't either." → **Meet my examiner**.
- **M1 · Meet Nolan + mic:** Nolan in his ring. "Nolan will be your examiner." → **Turn on mic and begin**.
- **M2 · Mic blocked:** "We can't hear you yet", how to turn the mic on (address-bar hint) → **Try again**.
- **M3 · Sound check:** "Say hello to Nolan", live sound wave, "We can hear you clearly" → **Start the test**.
- **T1 · Question:** progress bar Part 1·2·3, Nolan's video, a "Nolan asked" label, the question on a paper card, and a gold mic button (Space on desktop).
- **T2 · Answering:** same recorder as the prototype. A red dot and timer on top, then a pill: **✕** (discard) · sound wave · **✓** (done, in the topic tint). One take.
- **T3 · Your minute (Part 2 notes):** desktop is side by side. The cue card to read is on the left; on the right is a writing pad with one section per cue point (where it is · how you know about it · what you would do there · why you want to go), in handwriting style. Mobile and tablet type into the lines on the cue card itself, with the keyboard up, as in the prototype.
  - **Prep pill (all sizes):** a gold ring counting down, "0:42 left to plan", and **I'm ready to talk** so people can start early. On mobile and tablet it sits just above the keyboard. At 0:00 (or on tap) it turns into the recorder pill in the same spot.
- **T4 · Speaking from notes:** desktop keeps the side-by-side layout with the notes filled in. Mobile and tablet show a card with just the topic and the notes. The recorder counts **down** ("1:31 left"), because Part 2 has a 2-minute limit. Parts 1 and 3 count up.
- **T5 · Part 3:** same as T1 with discussion questions.
- **T6 · End:** "That is the end of the speaking test." "Thank you, Priya."
- **E1 · Connection lost:** answers so far are saved → **Pick up where I left off** (saved for 24 hours).
- **C1 · Checking:** Sarah returns, "That's a whole test, Priya. Well done." A 3-step checklist (listening → fluency and pronunciation → vocabulary and grammar). "Takes about a minute." → R1.

**Target band (O3):** a slider (5.0–9.0 in steps of 0.5) drives a meter in the topic colour. In the prototype, the number animates smoothly as the user drags.

### 10 · The blurred report
*Outside world. Uses the app's report style.*
- **Top:** the band gauge (the arc from 3.0 to 9.0), with the band number **blurred**.
- **Under it:** "Target 7.0 · You're ██ away."
- **4 cards:** Fluency, Vocabulary, Grammar, Pronunciation. Names shown, scores and notes **blurred**.
- **One card is clear:** one real sentence they said, with a fix. That proves it's their report.
- **Mobile:** one column, with the button pinned at the bottom.
- **Desktop:** gauge and button on the left (they stay in place while scrolling), cards on the right.

**This is where the groups split.**

---

## Group A: pay on the web

**Order:** R1 result locked → tap **See my full report** → **A1 pay** → **A2 payment done, create account** → **A3 get the app** (QR on desktop, install button on mobile/tablet). If they tap "Not now, open my report in the app" on A1 → R2 sign-up → R3 get the app (free path). Nothing from the report is shown on the web, not even blurred. Paper: row 06, all 3 sizes.

**A1 · The offer.** "Your report is ready. Unlock it, and keep going."
- What they get: their full report from today · 100+ more mock tests with 6 examiners · daily practice made from their mistakes.
- **Two plans, set by the exam date from onboarding (O2).** The first covers the exam, the second leaves room for a retake and is picked by default. *Prices are placeholders.*
  - In 2 weeks: 2 weeks / 3 months
  - In a month: 1 month / 3 months
  - In 2 months: 2 months / 6 months
  - More than 2 months: 6 months / 12 months
- **Trust under the Pay button:** "Cancel anytime · No commitment", payment logos (UPI, Visa, Mastercard, RuPay, net banking), "Secure, encrypted payment by Razorpay".
- **Desktop:** what you get on the left, plan card on the right. **Mobile/tablet:** one column, Pay + trust pinned at the bottom.

**A2 · Payment done, create account.** "Payment done, Priya. One last step." Same sign-up as R2 (Google, or email + password), with "Paid ₹999 · 3 months unlocked".

**A3 · Get the app.** "You're in, Priya. Now open the app." Same as R3; after logging in with the same account, everything is unlocked.

**Didn't pay?** They get the normal "see your report in the app" button, so we still get the install.

---

## Groups B, C and D: install first

**Hand-off (web).** A button under the blurred report: **See my full report in the app**.
- **Mobile:** goes to the App Store or Play Store.
- **Desktop:** a QR code + "Send to my WhatsApp or email".

**App opens.** They're logged in automatically, or with the same phone number, and land **straight on their report**, not the normal home screen.

From here everything is in the app, in the app's own style, on the phone only.

**In the app, every path starts the same:** X1 sign-in. Two versions in Paper to pick from: (a) the app's sign-in as it is today, (b) "Your IELTS report is waiting" with a "Took a test on our website? Log in the same way you signed up there" hint, and no Facebook button (the web never offered it). After login the app skips its usual onboarding and opens the report. App screens use the app's colours with Inter Display + Geist, mobile only. All paywalls are the app's existing Stimuler Pro paywall (coupon + countdown) for now.

### Group B: band free, roadmap locked
*What they pay for is not "the details of this score" but a roadmap from their band today to their dream band before the exam.*
- **B0 · Sign in** (the owner's version): "Your IELTS report is waiting for you!"
- **B1 · Listening back:** "Nolan is going through your 14 answers, Priya." Their recording plays as a waveform; four plain-word checks tick off (how smoothly you spoke, the words you chose, your grammar, how clearly you said each word). "You spoke for 11 min 42 sec."
- **B2 · Your target:** "You're aiming for band 7.0, with your exam in about a month." Empty gauge with only the 7.0 target marked and a "?" in the middle.
- **B3 · Band reveal:** the gauge fills to 6.0. "You're 1 band away from 7.0. A strong start; the gap is the kind practice closes." → **Show me how to reach 7.0**.
- **No separate roadmap screen.** B3's button ("See my plan to 7.0") goes straight into the paywall sequence, and the plan is shown inside the paywall. (The B4 roadmap explorations are parked in Paper, not in the flow.)
- **Mobile paywall sequence (same for every mobile path),** modelled on onboarding-activation-funnel.vercel.app:
  - **B5 · Graph builds:** "Reach band 7.0 / before your exam", a rising line from Today 6.0 drawing itself.
  - **B6a · Graph settles:** the graph moves up under the headline with "In 4 weeks · Band 7.0"; the close button and Stimuler PRO pill appear.
  - **B6b · Paywall with your plan:** "What's in your plan" slides in (3 days to learn the exam inside out · a mock test every day, then your weak spots · surprise topics so no question is new · reading and writing practice too), then the plans and **Unlock my plan**.
  - **B7 · Gift:** closing the paywall → "You've unlocked an offer", tap to open the box.
  - **B8 · Coupon:** lid flies off, "Welcome offer 50% off" coupon, confetti.
  - **B9 · Offer paywall:** coupon + 24-hour countdown, "Your roadmap to 7.0 at half price, today only", crossed-out prices, **Try Stimuler PRO for a year**, See all plans.
- *Prices are placeholders.*

### Group C: report free, plan locked
- **C0 · Sign in** (same screen as B0).
- **C1–C3 · Build-up to the band:** same as B1–B3 (listening back → your target → band reveal), with B3's button reading **See my full report**.
- **C4 · Full report, free:** band, 4 scores with notes, recording. The old "One test shows where you are" card is gone; one pinned button: **See your plan to 7.0**.
- **C5 · Setting up your plan:** checklist that ticks off — fitting it to your exam in 30 days · focusing on pronunciation and grammar · picking your daily mock tests · adding surprise topics. "Your plan opens in the Learn tab."
- **C6 · Learn tab:** Unit 1 "Your free mock test" ✓ Done (Band 6.0 · See report), then it scrolls to Unit 2 "Days 1–3 · Know the exam", locked: **Unlock your plan to 7.0**.
- **C7 · Scrolled:** everything is locked — exam format and timing, Part 2: using your 1 minute, then Unit 3 "Every day until your exam": mock test + your weak spots, surprise topic drill, reading or writing.
- **Tap anything locked → C8–C13:** the same mobile paywall sequence as Path B (graph builds → settles → paywall with your plan → close → gift → coupon → offer).

### Group D: report free + a free drill
- **D0 · Sign in**, then **D1–D3 · build-up to the band** (same as Path B/C; band reveal button: **See my full report**).
- **D4 · Full report, free,** with one pinned white button: **Continue**.
- **D5–D7 · Lead-in to the drill** (golden, no buttons, auto-advances; the same card carries through and then slides up into the drill):
  - **D5 · Here's what you said:** their Part 1 sentence, plain.
  - **D6 · You mispronounced these words:** the same card, with working · marketing · looking highlighted.
  - **D7 · Let's improve on them:** the card moves up and becomes the drill's first card.
- The drill (D8–D13) has one continuous progress bar that fills screen by screen.
- **The drill (D8–D18).** Three colour states for the whole screen, as in the app's pronunciation exercise: **gold** = practising, **red** = wrong, **green** = right. No buttons on a wrong try; it moves on by itself.
  - **D8** your words (sentence + gauge) → **D9** first word "marketing" (gold) → **D10** hear it.
  - **D11 · Wrong (red):** "Not quite", marketing in red, 20%.
  - **D12 · Your weak sound:** "marketing" with the "ng" marked, "You were weak at the 'ng' sound at the end".
  - **D13 · The "ng" sound:** "Let's practise a few words that end with this sound".
  - **D14–D17 · A new word with the same sound, "making":** word → listen → playing → say it (39%).
  - **D18 · Right (green):** "Hurray! You got it right", making in green, 82%, arrow button: tap to continue.
- **D19a · Your pronunciation went up:** just the card — 44% → 52% (+8 in 2 minutes). Moves on by itself.
- **D19b · Your plan builds:** the card slides up; "That was one sound. Here's how you reach 7.0" and the plan ticks in line by line (days 1–3 learn the exam · a mock test every day, then drills like this one · surprise topics · reading and writing). → white **See my plan to 7.0**.
- **D20–D25 · The same mobile paywall sequence** (graph builds → settles → paywall with your plan → close → gift → coupon → offer).
- *The sentence, clip, "6 times" and scores are sample data; in the app they come from the user's own test.*

---

## After the paywall (every group)
- **Paid:** the home tab opens with the next mock, today's drills and their band graph.
- **Didn't install (web only):** WhatsApp or email on day 0, 1 and 3: "Your IELTS report is waiting."
- **Installed but didn't pay:** push notifications or WhatsApp, e.g. "Your pronunciation drill is ready", or an offer before their exam date.

## What gets designed

| Paper page | Screens | Sizes |
|---|---|---|
| 1 · Style guide | Colours, fonts, buttons, cards, the two backgrounds | – |
| 2 · Landing | Landing + "open in browser" screen | 390 / 834 / 1440 |
| 3 · Deck + onboarding + account | Steps 3, 4, 5 | 390 / 834 / 1440 |
| 4 · Inside: Sarah + test | Steps 6–9, key moments only | 390 / 834 / 1440 |
| 5 · Report + hand-off | Step 10, hand-off, QR | 390 / 834 / 1440 |
| 6 · Group A | Web offer, paid screen | 390 / 1440 |
| 7 · Groups B, C, D | App screens | 390 |

## How we pick a winner
- **Main number:** money per 100 people who finish the test, checked at 7 days and 30 days.
- **Also watch:** install rate, how many reach the paywall, pay rate, refunds, store reviews.
- **Run 2 groups at a time** when the ad budget is small (for example B vs D).

---

## Topic colour system

Every test has one colour, taken from its photo. It stays with the user from the moment they pick the test all the way into the app.

- **8 colours only** (OKLCH hue): Gold 78 · Coral 40 · Rose 5 · Plum 330 · Violet 295 · Blue 250 · Teal 195 · Sage 145. Each test's photo is matched to the nearest one. Colours are never generated on the fly.
- **Same lightness and strength for all, only the hue changes**, so every topic looks like one product.
- **6 tokens** (in Paper): `--topic-wash` (L .43 C .09), `--topic-wash-mid` (L .25 C .04), `--topic-folder-top` (L .68 C .13), `--topic-folder-bottom` (L .52 C .11), `--topic-folder-back` (L .41 C .08), `--topic-tint` / `--topic-tint-soft` (L .91 / .86). All screens from "Test picked" to "Get the app" use these tokens. Changing the hue re-colours the whole flow.
- **Where it shows:** folder on hover/pick → Test picked wash → onboarding wash → soft glow during Sarah + the test → result wash → sign up + get the app → app report header.
- **What never changes:** white buttons, neutral body text, and score colours (red / amber / green, teal gauge).
- **Data:** save it on the test as `topic_hue`. Web and app both read the same field.
- The current mockups use Gold (78) for "Cities and places".
