# IELTS Speaking — four lesson prototypes

Four days of an IELTS speaking course, built as working prototypes you can click through.
Three teaching days, then a mock test. Each day is one HTML file that plays itself.

| Day | What it covers | Live |
|---|---|---|
| **Day 1** | Part 1 · short answers about you | https://ielts-day1.vercel.app |
| **Day 2** | Part 2 · the cue card | https://ielts-day2.vercel.app |
| **Day 3** | Part 3 · the discussion | https://prototype-day3.vercel.app |
| **Day 4** | The mock test · all three parts in one sitting | https://ielts-mocktest-psi.vercel.app |

Open a link and it runs on its own, like a lesson video. The panel on the right lists every
screen, so you can jump to any part. Day 2 has the recorded voice-over; press play to start it.
The other three days are silent for now, with the captions on estimated timing.

## The four days

### Day 1 · Part 1 — 20 screens
Sarah explains what the test is: one examiner, three parts, and the four things being
marked. Then the one habit for Part 1: **answer, then add one more sentence.** A short chat
shows a five-word answer failing and a longer one passing. The learner picks a topic, gets a
question on a paper card and answers it. Then Aarav, another student, answers the same
question, and his answer is pulled apart into *the answer · one detail · how you feel · a
small opinion*.

### Day 2 · Part 2 — 19 screens
The cue card, built on screen as Sarah describes it. One minute to prepare, then one to two
minutes of speaking. The trick she teaches is **one word of notes per point**, so four points
become four words. The learner picks a theme, Movies or Hobbies, and hears Maya give the
model answer with the card's points ticking off as she covers them. Then the learner does it
for real: a written minute, then a two-minute turn with their notes on screen.

### Day 3 · Part 3 — 21 screens
The discussion. Bigger questions about the world, about thirty seconds each. One habit again:
**say what you think, say why, give an example from your life.** Sarah demonstrates, then the
learner picks Technology or Education and answers four questions. Every question arrives on a
paper card, read aloud, with a short "try to cover" list that grows as she names each part.

### Day 4 · The mock test — 24 screens
No teaching. Sarah hands over to **Nolan**, the examiner, who runs all three parts back to
back: six Part 1 questions, the cue card with its prep minute and two-minute turn, a
rounding-off question, and four Part 3 questions. He asks and moves on. He never reacts,
corrects or encourages. Sarah returns at the end.

## How a day is built

One file, `index.html`, with no build step and nothing to install. Inside it:

**Screens.** A day is an array of screens, each with the avatar size, the caption style, the
lines spoken, and what is on screen:

```js
{t:'The card', av:'small', cap:'b', html:()=>cueCard('trip'), custom:'build',
 lines:['The examiner hands you a card.','It has a topic on it,','and three or four points under it.']}
```

**One clock.** Every caption, every clip of voice-over and every animation on a screen is
timed from the same line list. When a line has a recorded clip, its real length is used;
otherwise the length is estimated from the word count. So animations stay in step with the
voice whether or not the audio is in yet, and nothing drifts.

**Transitions.** Sarah's video scales between three sizes depending on whether she owns the
screen or is supporting what's below it. Content slides in from the side, cards are handed
over, and the mock test cross-fades between Sarah and Nolan when the exam starts and ends.

**Animations tied to the words.** Rows light up as Sarah names them, the cue card builds piece
by piece, the stopwatch fills while she says "four points, two minutes", guide steps grow in
as she lists them, and the mic only appears once a question has finished being asked. In the
model answers, each paragraph highlights as the student starts saying it.

**The learner's turns** are simulated: live-looking waveforms, a running timer, **✕** to start
again and **✓** to finish. The prototype runs the long waits at speed so a whole lesson plays
in a few minutes.

## Scripts

`docs/scripts/` has all four scripts as documents you can read or share:

- `day-1-part-1.md`, `day-2-part-2.md`, `day-3-part-3.md`, `day-4-mock-test.md` — every
  screen in order, what's on it, and every line with its audio file name.
- `elevenlabs-audio-generation.md` and `IELTS Speaking - ElevenLabs audio.xlsx` — the same
  lines laid out for recording, one file per screen.

## Voice-over

Each line of speech is its own audio clip, because a clip's length is what drives the timing
of its caption and animation.

- `tools/vo/extract.mjs` pulls every line out of the prototypes.
- `tools/vo/vo.py kit-all` writes the recording guide and the spreadsheet.
- `tools/vo/vo.py split <day>` cuts a recording into one clip per line, using its pauses.
- `tools/vo/align.py <day>` does the same when the pauses didn't come through: it cuts at the
  quietest point near where each line should end, then transcribes every clip and keeps it
  only if it starts and ends on the right words. This is how Day 2 was split.
- `tools/vo/scripts.py` and `tools/vo/sheet.py` write the script documents and the spreadsheet.

Day 2's clips are in `prototype-day2/vo/`, with the original recordings in `vo/raw/` and the
check of every clip in `vo/recording/align-report.md`.

## Running it locally

```sh
python3 -m http.server 8777 --directory prototype        # Day 1
python3 -m http.server 8778 --directory prototype-day2   # Day 2
python3 -m http.server 8779 --directory prototype-day3   # Day 3
python3 -m http.server 8780 --directory prototype-mock   # Day 4
```

A plain `open index.html` works too, but some browsers block the video and audio from
`file://`, so a server is safer.

Each day's folder has its own README with the detail for that day.
