#!/usr/bin/env python3
"""Write the four shareable scripts (docs/scripts/*.md) from each prototype's vo/lines.json.

The spoken words and audio file names come straight from lines.json, so the scripts always match
the prototypes. The screen notes and section order below are written by hand.

    node tools/vo/extract.mjs && python3 tools/vo/scripts.py
"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'docs', 'scripts')

WHO = {'sarah': 'Sarah', 'nolan': 'Nolan', 'aarav': 'Aarav', 'student': 'Maya'}

def est(text):
    """Estimated length in seconds. The prototypes use the same formula until real audio is in."""
    return max(1.6, len(text.split()) / 2.7 + 0.82) + 0.22

# ---------------------------------------------------------------------------------------------
# Per day: title, link, cast, branch names, and one entry per section, in order.
# Section entry: (title, screen note, silent note or None)
# ---------------------------------------------------------------------------------------------
DAYS = [
 dict(dir='prototype', out='day-1-part-1.md', title='Day 1 · Part 1: Short answers about you',
  url='https://ielts-day1.vercel.app',
  about='Sarah explains the test, then teaches one habit for Part 1: answer, then add one more sentence. '
        'The learner answers one question, then hears Aarav answer the same one.',
  cast=[('Sarah', 'the teacher. Warm, clear, unhurried. Talking to one person.'),
        ('Aarav', 'another student. Young man, Indian English, relaxed and natural. Heard once, in section 17.')],
  branches={},
  sections=[
   ('Welcome', 'Sarah, full size. Caption under her.', None),
   ('One examiner', 'Sarah moves small to the top. Photo of an examiner in a room: *"One examiner. One room. Recorded."*', None),
   ('Part 1', 'Three part cards stacked. **Part 1 · About you** is highlighted. Its three picture tiles (home, work, weekend) light up as each one is named.', None),
   ('Part 2', 'Same stack, **Part 2 · The topic card** highlighted. Tiles: card, notes, clock.', None),
   ('Part 3', 'Same stack, **Part 3 · The discussion** highlighted. Tiles: talk, city, ideas.', None),
   ('Four things', 'A list: **Fluency · Vocabulary · Grammar · Pronunciation**. Each row lights up as Sarah names it.', None),
   ('Opinions', 'Heading *"Your opinions are not scored"*. Two rows: *"I love reading."* same score / *"I hate reading."* same score. Each lights up as she says it.', None),
   ('Today, Part 1', 'Sarah, full size.', None),
   ('Part 1 intro', 'Heading *"Simple questions about you"*. Rows: **Your home · Your work · What you do on weekends**, lighting up as she names them.', None),
   ('The bad answer', 'Chat snippet. Question: *"Do you enjoy your work?"* The answer *"Yes, I enjoy my work."* appears word by word, then gets a **red ✕**.', None),
   ('The good answer', 'Same chat. The longer answer *"Yes, I enjoy it. I get to meet new people every day, and no two days are the same."* appears word by word, then gets a **green ✓**.', None),
   ('Pick a topic', 'Two option cards: **Work** (What you do, and how you feel about it) and **Hobbies** (Something you do because you want to). Waits for a tap.', None),
   ('Your question', 'A paper question card: **PART 1 · WORK**, *"What do you do for a living, and how do you feel about it?"* The mic button appears. Waits for a tap.', None),
   ('You answer', 'The learner speaks. Sound waves, countdown timer, **✕** to start again and **✓** to finish.', 'No voice-over. The learner is speaking.'),
   ('That was good', 'Sarah, full size.', None),
   ('Another student', 'Sarah, full size.', None),
   ("Aarav's answer", "Aarav's answer builds on screen, word by word, in time with his voice. Each line has a small label: **the answer · one detail · how you feel · a small opinion**.", None),
   ('What just happened', 'The answer folds down to its key phrases, labelled **What you do · One detail · How you feel · A small opinion**.', None),
   ('Tomorrow', 'Sarah, full size.', None),
   ('See you tomorrow', 'Sarah, full size. End of the lesson.', None),
  ]),

 dict(dir='prototype-day2', out='day-2-part-2.md', title='Day 2 · Part 2: The cue card',
  url='https://ielts-day2.vercel.app',
  about='Sarah explains the cue card, one word of notes per point, and thirty seconds a point. '
        'The learner picks a theme and hears a model answer, then does the real thing: one minute of notes, up to two minutes of speaking.',
  cast=[('Sarah', 'the teacher. Warm, clear, unhurried. Talking to one person.'),
        ('Maya', 'another student giving the model answer. Young woman, natural and warm, not performed. Heard once, in section 11.')],
  branches={'movie': 'Movies', 'hobby': 'Hobbies'},
  sections=[
   ('Welcome back', 'Sarah, full size.', None),
   ('Today, Part 2', 'Sarah, full size.', None),
   ('The card', 'A paper cue card builds piece by piece as Sarah talks: the topic *"Describe a trip you went on recently."*, then **You should say** and its four points.', None),
   ('One minute, then two', 'The same card stays. The timings appear on it: one minute to prepare, then one to two minutes of speaking.', None),
   ('Stopped is good', 'Heading *"Getting stopped is a good sign"*. Rows: **Stopped at 2:00** good / **Ran out at 0:40** short. Each lights up as she reaches it.', None),
   ('Four words', 'Heading *"One word for each point"*. Rows: where you went → **Japan**, who you went with → **friends**, what you did there → **Fuji**, why it was memorable → **closer**. Footer: *"Four points, four words. That is your map."*', None),
   ('Thirty seconds a point', 'A stopwatch: **Thirty seconds a point**. The ring fills in four quarters: 30s, 1:00, 1:30, 2:00.', None),
   ('Pick a theme', 'Two option cards: **Movies** (A film you watched and liked) and **Hobbies** (Something you recently picked up). Waits for a tap.', None),
   ('Say this is your card', 'The cue card for the theme they picked. Movies: *"Describe a movie you watched and liked."* Hobbies: *"Talk about a hobby you recently picked up."*', None),
   ('Listen', 'Sarah, full size.', None),
   ('The model answer', 'Sarah slides away. Maya\'s photo (labelled *Maya · another student*) with sound waves, the card topic beside it, and four note chips that tick as each point is covered. The answer scrolls up one paragraph at a time; the paragraph being spoken is highlighted.', None),
   ('Point by point', 'The answer clears away. Sarah, full size, with her caption.', None),
   ('That is the structure', 'Sarah, full size.', None),
   ('Your turn', 'The trip cue card, with **1:00** in its corner.', None),
   ('Your minute', 'Sarah is gone. The card gets a line under each point, and a **YOUR MINUTE** bar counts down from 1:00. The notes are written in: *Japan – Tokyo & Kyoto · 3 college friends · temples, tea, Fuji at night · sunrise, came back closer*.', 'No voice-over. The learner is making notes.'),
   ('You speak', 'The card shrinks to just the notes. Mic recording, sound waves, a 2:00 countdown, **✕** to start again, **✓** to finish. It stops on its own at 0:00.', 'No voice-over. The learner is speaking.'),
   ('That was two minutes', 'Sarah, full size.', None),
   ('Tomorrow', 'Sarah, full size.', None),
   ('See you tomorrow', 'Sarah, full size. End of the lesson.', None),
  ]),

 dict(dir='prototype-day3', out='day-3-part-3.md', title='Day 3 · Part 3: The discussion',
  url='https://prototype-day3.vercel.app',
  about='Sarah explains Part 3 and teaches one habit: say what you think, say why, give an example. '
        'The learner picks a theme and answers four questions. Sarah reads each question aloud and names what to cover.',
  cast=[('Sarah', 'the teacher. Warm, clear, unhurried. Talking to one person. She also reads the four questions aloud.')],
  branches={'tech': 'Technology', 'edu': 'Education'},
  sections=[
   ('Welcome back', 'Sarah, full size.', None),
   ('Today, Part 3', 'Sarah, full size.', None),
   ('How it goes', 'Heading *"Here is how it goes"*. Rows: **Three or four questions** back to back / **About the world, not you** big things / **About thirty seconds each** no cue card. Each lights up as she reaches it.', None),
   ('Not scored', 'Heading *"Your opinions are not scored"*. Rows: *"I agree completely."* same score / *"I completely disagree."* same score.', None),
   ('The one habit', 'A card with three numbered steps: **1 Say what you think · 2 Say why · 3 Give an example from your life**. Each lights up as she says it.', None),
   ('The thin answer', 'Chat snippet. Question: *"How has technology changed the way we shop?"* The answer *"People shop online now."* appears word by word, then gets a **red ✕**.', None),
   ('The demo answer', 'A box with all three parts showing: **MY VIEW** Shopping has moved to our phones. / **WHY** Because it saves time, and there is more choice. / **EXAMPLE** My mother hasn\'t been to a market in two years. Everything comes to the door. The part she is saying is highlighted.', None),
   ('Thirty seconds', 'Sarah, full size.', None),
   ('Pick a theme', 'Two option cards: **Technology** (How it changes the way we live) and **Education** (School, learning, how it is changing). Waits for a tap.', None),
   ('Question 1', 'A paper question card, **PART 3 · QUESTION**. While Sarah reads the question the caption is blank, because the card shows it. Below it, a **TRY TO COVER** list grows one row at a time as she names each part. Then the mic appears.', None),
   ('You answer · 1', 'Sarah is gone. The question card (no list), recording with sound waves, a 0:30 countdown, **✕** and **✓**.', 'No voice-over. The learner is speaking.'),
   ('Question 2', 'Same as Question 1, with the next question and its list.', None),
   ('You answer · 2', 'Same recording screen.', 'No voice-over. The learner is speaking.'),
   ('Question 3', 'Same as Question 1, with the next question and its list.', None),
   ('You answer · 3', 'Same recording screen.', 'No voice-over. The learner is speaking.'),
   ('Question 4', 'Same as Question 1. On Technology the list is **WORDS YOU CAN USE** (two phrases) instead of numbered steps.', None),
   ('You answer · 4', 'Same recording screen.', 'No voice-over. The learner is speaking.'),
   ('Four in a row', 'Sarah, full size.', None),
   ('Look what you did', 'Heading *"Look at what you just did"*. Technology: **Gave opinions · Argued both sides · Predicted the future**. Education: **Compared past and present · Weighed both sides · Suggested ideas**. Each lights up as she names it.', None),
   ('Keep the habit', 'The habit card again: **1 Say what you think · 2 Say why · 3 Give an example from your life**.', None),
   ('See you tomorrow', 'Sarah, full size. End of the lesson.', None),
  ],
  lists={  # the TRY TO COVER rows per question, per branch
   10: {'tech': 'Say what you think · Say why · Give an example from your life', 'edu': 'Back then · Whereas now'},
   12: {'tech': 'One good thing · One bad thing · Which side wins', 'edu': 'One good thing · One bad thing · Which side wins'},
   14: {'tech': 'One way · Another way', 'edu': 'One idea · Another idea'},
   16: {'tech': '"It\'s likely that…" · "In the long run…" (WORDS YOU CAN USE)', 'edu': 'Was · Is · Will be'},
  }),

 dict(dir='prototype-mock', out='day-4-mock-test.md', title='Day 4 · The mock test',
  url='https://ielts-mocktest-psi.vercel.app',
  about='All three parts in one sitting, with no teaching. Sarah opens and closes it. '
        'Nolan, the examiner, runs the test in between. He asks, the learner answers, he moves on. He never reacts.',
  cast=[('Sarah', 'the teacher. Warm, clear, unhurried. Only at the start and the end.'),
        ('Nolan', 'the examiner. Polite, neutral, British. Even pace, no warmth between questions, no "good" or "okay".')],
  branches={},
  sections=[
   ('Today is the real thing', 'Sarah, full size.', None),
   ('Three parts', 'Heading *"All three, in one sitting"*. Rows: **Part 1 · About you** 4–5 min / **Part 2 · The cue card** 3–4 min / **Part 3 · The discussion** 4–5 min. Each lights up as she names it.', None),
   ('Nobody stops you', 'Sarah, full size.', None),
   ('Before we start', 'Nolan\'s video in the centre with a soft glow. Heading **"Nolan will be your examiner"**. Below it: *"All three parts in one go, about ten minutes. Find a quiet spot so he can hear you."* Button: **Turn on mic and begin**.', 'No voice-over. The learner reads and taps the button.'),
   ('Good morning', 'Sarah is replaced by Nolan, full size, in a cool grey ring. A short pause before he speaks.', None),
   ('Your name', '**Every question screen from here on works the same way:** Nolan small at the top, a speech bubble with what to do, and a paper card with the part label and the question. The mic appears only after he finishes asking. The learner answers, with **✕** to start again and **✓** to move on. Card label: **IDENTIFICATION**.', None),
   ('Where you are from', 'Question screen. **IDENTIFICATION**.', None),
   ('Part 1 · Q1', 'Question screen. **PART 1 · WHERE YOU LIVE**. Answer up to 30s.', None),
   ('Part 1 · Q2', 'Question screen. **PART 1 · WHERE YOU LIVE**.', None),
   ('Part 1 · Q3', 'Question screen. **PART 1 · WHERE YOU LIVE**.', None),
   ('Part 1 · Q4', 'Question screen. **PART 1 · FREE TIME**.', None),
   ('Part 1 · Q5', 'Question screen. **PART 1 · FREE TIME**.', None),
   ('Part 1 · Q6', 'Question screen. **PART 1 · FREE TIME**.', None),
   ('One minute to think', 'Nolan, full size.', None),
   ('Your cue card', 'The cue card slides in: *"Describe a person who taught you something important."* You should say: who this person is / what they taught you / how they taught you / and explain why it was important to you.', None),
   ('Your minute', 'Nolan is gone. The card gets a line under each point, and a **YOUR MINUTE** bar counts down from 1:00. The notes are written in: *Mr Rao, maths · patience · stayed after class · stopped quitting*.', 'No voice-over. The learner is making notes.'),
   ('Speak for two minutes', 'The card shrinks to just the notes. Mic recording, sound waves, a 2:00 countdown, **✕** and **✓**. It stops on its own at 0:00.', 'No voice-over. The learner is speaking.'),
   ('Rounding off', 'Question screen. **PART 2 · ROUNDING OFF**. The notes are gone. Answer up to 15s.', None),
   ('Part 3 · Q1', 'Question screen. **PART 3 · DISCUSSION**. Answer up to 45s.', None),
   ('Part 3 · Q2', 'Question screen. **PART 3 · DISCUSSION**.', None),
   ('Part 3 · Q3', 'Question screen. **PART 3 · DISCUSSION**.', None),
   ('Part 3 · Q4', 'Question screen. **PART 3 · DISCUSSION**.', None),
   ('End of the test', 'Nolan, full size.', None),
   ('That is a whole test', 'Short pause, then Nolan cross-fades into Sarah, full size. End of the day.', None),
  ]),
]

def md_escape(s):
    return s.replace('|', '\\|')

def line_cell(row):
    say = md_escape(row['say'])
    if row['speaker'] == 'aarav':
        return say + '<br>*shown on screen word by word, no caption*'
    if row['speaker'] == 'student':
        return say + '<br>*shown as its own paragraph in the scrolling answer, no caption*'
    if row['cap'] is None:
        return say + '<br>*spoken only, no caption: the card shows the question*'
    if row['cap'] != row['say']:
        return say + '<br>*caption shows: "' + md_escape(row['cap']) + '"*'
    return say

def table(rows):
    out = ['| # | Speaker | Line | Audio file |', '|---|---|---|---|']
    for r in rows:
        out.append(f"| {r['k']+1} | {WHO[r['speaker']]} | {line_cell(r)} | `{r['file']}` |")
    return '\n'.join(out)

def fmt_secs(s):
    s = int(round(s))
    return f'{s}s' if s < 60 else f'{s//60}m {s%60:02d}s'

def write(day):
    data = json.load(open(os.path.join(ROOT, day['dir'], 'vo', 'lines.json')))
    rows = data['lines']
    by_beat = {}
    for r in rows:
        by_beat.setdefault(r['beat'], []).append(r)

    secs = day['sections']
    branches = day['branches']
    first_branch = next(iter(branches), None)

    # totals: one branch counted, as the learner hears one
    def heard(beat):
        rs = by_beat.get(beat, [])
        if any(r['branch'] for r in rs):
            rs = [r for r in rs if r['branch'] in (None, first_branch)]
        return rs
    total_lines = sum(len(heard(n)) for n in range(1, len(secs) + 1))
    total_secs = sum(est(r['say']) for n in range(1, len(secs) + 1) for r in heard(n))
    files = len(rows)
    speakers = sorted({WHO[r['speaker']] for r in rows}, key=lambda x: [c[0] for c in day['cast']].index(x))

    o = []
    o.append(f"# {day['title']}\n")
    o.append(day['about'] + '\n')
    o.append(f"**Prototype:** {day['url']}  ")
    o.append(f"**Sections:** {len(secs)}  ")
    o.append(f"**Voice-over:** {total_lines} lines, about {fmt_secs(total_secs)} of speech"
             + (f" (one theme)" if branches else '') + ', plus the time the learner spends answering  ')
    o.append(f"**Audio files:** {files}" + (f", covering both themes" if branches else '') + '\n')

    o.append('## Voices\n')
    o.append('| Voice | Direction |\n|---|---|')
    for name, note in day['cast']:
        o.append(f'| **{name}** | {note} |')
    o.append('')

    o.append('## How to read this\n')
    o.append('- Each **section** is one screen in the prototype, in the order the learner sees it.')
    o.append('- Each **row** is one line of speech and becomes **one audio file**. Keep every row as its own clip. '
             'Its length decides when the caption changes and when that line\'s animation happens. '
             'Two rows merged into one file would put the animations out of step.')
    o.append('- File names: `' + data['tag'] + '-<section>-<line>.mp3`'
             + (', with the theme in the middle when a section changes by theme (`' + next(r['file'] for r in rows if r['branch']) + '`).' if branches else '.'))
    o.append('- Sections marked *no voice-over* are where the learner does something: tapping, writing or speaking.')
    if branches:
        names = ' and '.join(f'**{v}**' for v in branches.values())
        o.append(f'- The learner picks a theme ({names}). Sections that change with it list both versions. Record both.')
    o.append('')

    o.append('## Flow at a glance\n')
    o.append('| # | Section | Voice | Lines |\n|---|---|---|---|')
    for n, (title, _, silent) in enumerate(secs, 1):
        rs = heard(n)
        who = ', '.join(sorted({WHO[r['speaker']] for r in rs})) if rs else '*no voice-over*'
        o.append(f'| {n:02d} | [{title}](#{anchor(n, title)}) | {who} | {len(rs) or "–"} |')
    o.append('\n---\n')

    for n, (title, screen, silent) in enumerate(secs, 1):
        rs = by_beat.get(n, [])
        o.append(f'## {n:02d} · {title}\n')
        o.append(f'**On screen:** {screen}\n')
        if silent:
            o.append(f'*{silent}*\n')
            continue
        if not rs:
            o.append('*No voice-over.*\n')
            continue
        shared = [r for r in rs if not r['branch']]
        split = [r for r in rs if r['branch']]
        if shared:
            o.append(table(shared) + '\n')
        if split:
            for br, label in branches.items():
                part = [r for r in split if r['branch'] == br]
                if not part:
                    continue
                o.append(f'### If they picked {label}\n')
                lst = day.get('lists', {}).get(n, {}).get(br)
                if lst:
                    o.append(f'Card list: **{lst}**\n')
                o.append(table(part) + '\n')
    return '\n'.join(o).rstrip() + '\n'

def anchor(n, title):
    s = f'{n:02d} · {title}'.lower()
    s = re.sub(r"[^\w\- ]", '', s)
    return s.replace(' ', '-')

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for day in DAYS:
        txt = write(day)
        path = os.path.join(OUT, day['out'])
        open(path, 'w').write(txt)
        print(os.path.relpath(path, ROOT))
