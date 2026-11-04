# Lesson scripts, Days 1 to 4

`ielts-lesson-scripts.csv` holds every word in the four IELTS lessons: what Sarah,
Nolan and the student clips say, and the text that appears on screen.

It is built from the prototypes themselves, so it cannot drift from what you see
when you click through them:

- the spoken lines come from each prototype's `vo/lines.json` (the same list the
  voice-over was recorded from)
- the on-screen text is read out of each prototype's `index.html`

Rebuild it after a script change:

    python3 docs/scripts/build-scripts.py

## Open it in Google Sheets

New sheet → **File → Import → Upload** → pick the CSV → *Replace spreadsheet*.
Then **Data → Create a filter** to read one day or one speaker at a time.

## The columns

| Column | What it holds |
|---|---|
| Day | Day 1 to Day 4 |
| Beat # | The step number inside that day. Blank for on-screen content, which belongs to a step rather than following it. |
| Beat | The step's name, e.g. "Welcome back", "Your minute" |
| Variant | `all`, or the branch the line belongs to: Day 2 `movie` / `hobby` / `trip`, Day 3 `tech` / `edu` |
| Type | `Spoken`, or `On screen · ...` for a question card, cue card, chip or note |
| Who / label | The voice, or the label the text sits under |
| Text | The line |
| Notes | The caption when it differs from the spoken line, the answer shape, the tip in Nolan's bubble, the answer time limit |

## What is in each day

| Day | Lesson | Rows |
|---|---|---|
| 1 | Part 1, teach then test | 64 |
| 2 | Part 2, the cue card | 81 |
| 3 | Part 3, the discussion | 101 |
| 4 | The full mock test | 58 |

Day 2 and Day 3 branch: the learner picks a topic, and the lines change with it.
Both branches are in the sheet, told apart by the Variant column.
