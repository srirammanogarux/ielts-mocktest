# IELTS · Day 1 — clickable prototype

Open `index.html` in a browser. Nothing to install.

    open prototype/index.html

(If the video doesn't autoplay from `file://`, serve it instead:
`cd prototype && python3 -m http.server 8777` → http://localhost:8777)

## What this is

Day 1 of the IELTS speaking track — **Variant A, "teach then test"**, following Jash's
script v3 and the screens from the *Improved script to screen* frame in Paper.

20 beats, ~2m40s end to end. It plays itself; you don't have to touch anything.

## How it behaves

- **Sarah's video** is muted and looping throughout. She scales between three sizes
  (266 / 154 / 60px) depending on whether she owns the screen or is supporting content.
- **Captions** follow the rule we landed on: big display type when Sarah is alone on
  screen, speech bubble when there's content below her. Lines are chunked to a maximum
  of two bubble lines and timed off word count (~2.7 words/sec).
- **Auto-play, no skip**, as requested. The two real interactions — picking a topic and
  tapping the mic — are clickable, but auto-fall-through after a few seconds so an
  unattended run never stalls.
- **The mic is simulated.** Live-looking waveform, running timer, the under-10s nudge
  fires at 0:09, auto-stops at 0:14.
- The panel on the right lists all 20 beats and highlights the current one. Restart reloads.

## The model-answer reinforcement

The bit that needed ideating. Rather than showing the answer whole with the extras
pre-highlighted, it now **builds**:

1. The core sentence lands **alone**, tagged `THE ANSWER`, and holds for 2.6s.
2. Each extra drops in beneath it with its job named — `one detail`, `how you feel`,
   `a small opinion`.
3. The next screen collapses all of it to the skeleton — What you do → One detail →
   How you feel.

So the pattern card stops being a claim and becomes a summary of tags the user just
watched appear.

## Still placeholder

- **Aarav** (the student) is an initials avatar, not a photo — swap in a real one.
- The examiner scene on beat 2 is a drawn silhouette, not the stock photo from Paper.


---

# v2 — the cut

`v2.html` · a re-edit of the same Day 1, applying editing craft rather than UI changes.

## What's different

- **Cold open.** No logo, no "hi, welcome". Opens on black with a question and a weak
  answer, holds on it in silence, labels it `FIVE WORDS`, and only then cuts to Sarah:
  *"That's the whole answer. Let me show you why that matters."* The title and chrome
  arrive at 15s, once the piece has earned them.
- **J- and L-cuts.** Picture and caption never change on the same frame. Cards land
  ~380ms before Sarah names them; she speaks ~350ms before the shot settles.
- **Shot grammar.** wide / medium / close / tiny / gone, each with a job. Close is used
  once, for the emotional line. Gone is used when the content is the point.
- **A push-in** on the thesis — *"Answer, then add one more sentence"* — 1.0 → 1.065
  over 4.2s.
- **Silence as punctuation.** Three documented holds where nothing moves at all:
  after "Five words.", after "That was good.", and in the cold open.
- **Match cut** on the lesson: the bad answer and the good answer are the *same bubble*.
  The extra sentence grows into it and the whole thing goes red → green. Five words
  become twenty without a cut.
- **The model answer folds** into the skeleton in place — the four tagged lines collapse
  into three labelled rows, the tags becoming the labels. No new screen.
- **Emphasis captions.** The phrase fades up, then one key word brightens to gold.
- **Seamless video loop.** Two stacked `<video>` elements offset by half the duration,
  crossfaded across the seam, so the 7.4s loop point no longer jumps.

Silent, as v1. Runs ~2m52s.


---

# Voice-over

Recording kit: `vo/recording/README.md`. **59 clips, 19 ElevenLabs
generations, one per section.** Each generation is one section: its lines separated by `<break>` tags. The same blocks for all four days are in `docs/scripts/elevenlabs-audio-generation.md`. Save
each download into `vo/raw/` under the name the kit gives it, then run

    python3 tools/vo/vo.py split prototype

The splitter cuts each block at its silences into one MP3 per line (`vo/<tag>-<beat>-<line>.mp3`),
copies lines that repeat, and writes `vo/manifest.json`. It tells you if a block split into the
wrong number of lines. That usually means a pause was too short, so regenerate that block.

Each clip's real length sets the timing for its caption, its sound and every animation tied to
that line: rows lighting up, steps growing in, the mic arriving, the scroll. Without a manifest,
or for a clip that is missing, timing falls back to a word-count estimate.

Aarav's answer (section 17) is a separate voice.

If the script changes, regenerate the kit (with the four prototypes served on 8777–8780):

    node tools/vo/extract.mjs && python3 tools/vo/vo.py kit-all && python3 tools/vo/scripts.py

# Images

- `assets/examiner.jpg`, `assets/student.jpg` — real photographs from Unsplash (free to use).
- `assets/tiles/*.jpg` — nine AI-generated tiles, three per part card.
