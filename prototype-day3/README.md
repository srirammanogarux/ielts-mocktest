# IELTS Day 3 — Part 3, the discussion

A clickable prototype of the Day 3 lesson. Same engine as Days 1 and 2.

    python3 -m http.server 8779     # then open localhost:8779

## The whole day rests on one component

Day 3 borrows almost every screen it needs. The one new thing is **the chip**, and
it carries the entire lesson: *your view → why → an example from your life*.

It has two forms.

| Form | Where | Why |
|---|---|---|
| **Taught** — a card, one numbered row per step | Beats 5 and 20 | It is the lesson, so it gets to be a lesson. Rows light one at a time as Sarah names them. |
| **On the card** — disclosed a step at a time | The question screen only | Same grammar as Part 2's cue card, which puts "You should say" under the topic. The steps arrive one by one as Sarah names them. Gone once you start speaking. |

There is no floating chip and no nudge toast. The demo answer is a boxed card with
one section per step — MY VIEW / WHY / EXAMPLE — lighting as each line lands and
dimming once passed, the same treatment as the habit card.

The guide screen changes at every question, because each question wants a
different answer shape:

| Q | Technology | Education |
|---|---|---|
| 1 | view → why → example | back then → now |
| 2 | good → bad → which wins | good → bad → which wins |
| 3 | one way → another | one idea → another |
| 4 | “it’s likely that…” · “in the long run…” | was → is → will be |

Question 4 stops being steps and becomes **words to borrow out loud**. Its heading
changes from "Try to cover" to "Words you can use", the numbers drop, and the
phrases sit in italics and quotes so they read as sayable rather than as a
structure to follow.

## Shape of the day

21 beats, 11 video slots, one branch. Each question runs as two beats: the question with its guide, then the answer with the question alone. There is one model answer and **Sarah
performs it herself**, so Day 3 needs no student portrait. Four questions back to
back at thirty seconds each, question card up the whole time, nudge at ten seconds
in. Sarah says goodbye; no feedback screen inside the lesson, same as Days 1 and 2.

The prototype runs the thirty seconds at four times speed so the whole lesson
plays in about four minutes.

## Voice-over

Recording kit: `vo/recording/README.md`. **86 clips, 22 ElevenLabs
generations, one per section (one per theme where it changes).** Each generation is one section: its lines separated by `<break>` tags. The same blocks for all four days are in `docs/scripts/elevenlabs-audio-generation.md`. Save
each download into `vo/raw/` under the name the kit gives it, then run

    python3 tools/vo/vo.py split prototype-day3

The splitter cuts each block at its silences into one MP3 per line (`vo/<tag>-<beat>-<line>.mp3`),
copies lines that repeat, and writes `vo/manifest.json`. It tells you if a block split into the
wrong number of lines. That usually means a pause was too short, so regenerate that block.

Each clip's real length sets the timing for its caption, its sound and every animation tied to
that line: rows lighting up, steps growing in, the mic arriving, the scroll. Without a manifest,
or for a clip that is missing, timing falls back to a word-count estimate.

Every question beat is spoken aloud, and the caption stays blank so the card does the talking.
Tech and Education each have their own narration (`d3-16-edu-3.mp3`).

If the script changes, regenerate the kit (with the four prototypes served on 8777–8780):

    node tools/vo/extract.mjs && python3 tools/vo/vo.py kit-all && python3 tools/vo/scripts.py
