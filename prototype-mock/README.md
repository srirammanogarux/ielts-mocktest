# IELTS mock test — Day 4

All three parts of the speaking test in one sitting. Sarah opens and closes it;
**Nolan**, the examiner, runs the exam in between. Nothing on screen teaches you:
no guide steps, no model answers, no nudges.

    python3 -m http.server 8780     # then open localhost:8780

Built from the Day 2 engine, with the paper question card from Day 3.

## Shape

24 beats.

| | Beats | What happens |
|---|---|---|
| **Sarah opens** | 1–4 | Today is the real thing · the three parts · nobody stops you · pre-flight |
| **Nolan · hello** | 5–7 | Nolan grows into frame, then name and where you're from |
| **Part 1** | 8–13 | Two topics, three questions each |
| **Part 2** | 14–18 | One minute to think · the card · the prep minute · two-minute long turn · rounding-off question |
| **Part 3** | 19–22 | Four discussion questions |
| **Close** | 23–24 | End of the test · handover back to Sarah |

There is no result screen. The lesson ends on Sarah's handback.

## How a question works

Every Part 1, Part 3 and ID question is one beat:

1. Nolan stays small at the top, with a short instruction in his bubble
   ("Speak an answer out loud") — not the question itself.
2. The question arrives on a paper card with nothing under it.
3. The mic appears near the bottom. Tap it, or it starts on its own.
4. The expanded mic counts **up**. Nolan, his bubble and the card all stay on screen.
   ✓ ends the answer; ✕ throws the take away and starts again.
5. The answer stops at a cap: 30s for Part 1, 45s for Part 3, 12–15s for ID.

The prototype plays answers at 4× speed and the long turn at 8×, so the whole
test runs in about five minutes.

## Pre-flight

Nolan at the centre in his ring, a heading and one line beneath him, and a single
**Allow & start** button near the bottom. Nothing else. It introduces the examiner
and asks for the mic.

It also replaces the old *Meet Nolan* beat. Its one line — he won't tell you how
you're doing — now sits under the title.

## Nolan

`assets/examiner.mp4`, in a cool grey ring. Sarah keeps her warm gold one. Nolan
first appears at the centre of the pre-flight screen and grows from there into his
full frame when the exam starts. Sarah's return at the end uses Day 1's
cross-dissolve.

## Voice-over

Recording kit: `vo/recording/README.md`. **35 clips, 21 ElevenLabs
generations, one per section.** Each generation is one section: its lines separated by `<break>` tags. The same blocks for all four days are in `docs/scripts/elevenlabs-audio-generation.md`. Save
each download into `vo/raw/` under the name the kit gives it, then run

    python3 tools/vo/vo.py split prototype-mock

The splitter cuts each block at its silences into one MP3 per line (`vo/<tag>-<beat>-<line>.mp3`),
copies lines that repeat, and writes `vo/manifest.json`. It tells you if a block split into the
wrong number of lines. That usually means a pause was too short, so regenerate that block.

Each clip's real length sets the timing for its caption, its sound and every animation tied to
that line: rows lighting up, steps growing in, the mic arriving, the scroll. Without a manifest,
or for a clip that is missing, timing falls back to a word-count estimate.

Two voices: Sarah (4 sections) and Nolan (17). Nolan speaks each question while its caption
shows the tip line, and the mic only appears once he has finished asking.

If the script changes, regenerate the kit (with the four prototypes served on 8777–8780):

    node tools/vo/extract.mjs && python3 tools/vo/vo.py kit-all && python3 tools/vo/scripts.py

## Known gaps

- Part 3 and the rounding-off question carry a bubble instruction to match the
  Part 1 screens you edited in Paper; the board didn't have one there yet.
