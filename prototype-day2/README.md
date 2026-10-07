# IELTS Day 2 — Part 2, the cue card

A clickable prototype of the Day 2 lesson. Same engine as Day 1, new screens.

    python3 -m http.server 8778     # then open localhost:8778

## What is new here

| Screen | What it does |
|---|---|
| **Cue card** | One card in the system. Topic, "You should say", four points. Builds point by point when Sarah introduces it, and is reused for the example card and the user's card. |
| **The prep minute** | You write **on the card**. A blank ruled line under each point is the only signifier. Handwriting appears in Caveat as you type. Sixty-second countdown, keyboard up. Nothing is truncated: the card grows and scrolls, and the topic promotes into the pinned bar. |
| **Notes after the minute** | The point labels drop away and the handwriting stays. Four lines to speak from, nothing else. |
| **The long turn** | The expanded mic state from Day 1 — cross, waves, tick — counting **2:00 down to zero** and auto-submitting at the cut, which is what the script teaches is a good sign. Target band marks 1:00–2:00. The cross discards and re-records. |
| **The model answer** | One continuous scrolling turn, clipped to a masked viewport so nothing ever runs past the phone. Spoken lines dim and slide up, the live line is the bright one, and four chips tick as each point gets covered. At the end everything sinks except the one moment that mattered. |

## Branches

`Movies` and `Hobbies` differ only in the example card, the four note words, the
model answer and one takeaway line. Both converge on the same trip card and the
same conclusion — flagged in the script's own production notes. Pick a theme on
beat 8; `BRANCH` drives the rest.

## Voice-over

Recording kit: `vo/recording/README.md`. **64 clips, 19 ElevenLabs
generations, one per section (one per theme where it changes).** Each generation is one section: its lines separated by `<break>` tags. The same blocks for all four days are in `docs/scripts/elevenlabs-audio-generation.md`. Save
each download into `vo/raw/` under the name the kit gives it, then run

    python3 tools/vo/vo.py split prototype-day2

**Recorded.** The first recordings are in (`vo/raw/`, 19 files). Most of them lost the 1.5s pauses, so they were split with

    python tools/vo/align.py prototype-day2     # needs numpy and whisper-cli (brew install whisper-cpp)

It cuts at the quietest point near where each line should end, then transcribes every clip. A clip is kept only
if it starts and ends on its line's own first and last words. All 64 passed; the details are in
`vo/recording/align-report.md`.

The splitter cuts each block at its silences into one MP3 per line (`vo/<tag>-<beat>-<line>.mp3`),
copies lines that repeat, and writes `vo/manifest.json`. It tells you if a block split into the
wrong number of lines. That usually means a pause was too short, so regenerate that block.

Each clip's real length sets the timing for its caption, its sound and every animation tied to
that line: rows lighting up, steps growing in, the mic arriving, the scroll. Without a manifest,
or for a clip that is missing, timing falls back to a word-count estimate.

The student's model answer is one generation per theme. Clips for a theme are named
`d2-11-movie-1.mp3` / `d2-11-hobby-1.mp3`; the engine picks the set that matches `BRANCH`.

If the script changes, regenerate the kit (with the four prototypes served on 8777–8780):

    node tools/vo/extract.mjs && python3 tools/vo/vo.py kit-all && python3 tools/vo/scripts.py

## Shape of the day

19 beats. There is **one** model answer, in the example branch. After you speak,
the lesson goes straight to the close — no second student, no "one moment" recap,
no "take the method" card. Sarah says goodbye; there is no feedback screen inside
the lesson, same as Day 1.

## Still needed

- A decision on whether that ending is right, since the Jash script still routes
  into a feedback screen.

## Credits

Day 2 student portrait: Unsplash (`photo-1494790108377`). Sarah: supplied loop.
