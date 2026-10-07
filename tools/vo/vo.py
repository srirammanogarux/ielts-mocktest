#!/usr/bin/env python3
"""
Voice-over for the IELTS prototypes, recorded by hand in ElevenLabs.

  python3 tools/vo/vo.py kit-all                  # all four kits + docs/scripts/elevenlabs-audio-generation.md
  python3 tools/vo/vo.py kit   prototype-day2     # one day's kit
  python3 tools/vo/vo.py split prototype-day2     # cut your downloads into clips + manifest

The kit makes one paste-ready block per script section, in script order, with a
<break time="1.5s" /> between lines. Record a block in one generation, download
it, and save it into <prototype>/vo/raw/ under the name the kit gives it.

`split` finds the long pauses in each download, cuts one clip per line, trims
the silence, copies lines that are reused, and writes vo/manifest.json. Clips
you record individually and drop straight into vo/ under their own filename
are picked up too.
"""
import json, os, re, shutil, subprocess, sys

BREAK = '<break time="1.5s" />'
VOICES = {
    'sarah':   ('Sarah', 'The teacher. Warm, clear, unhurried. Talking to one person.'),
    'nolan':   ('Nolan', 'The examiner. Polite, neutral, British. Even pace. Never reacts, never encourages.'),
    'aarav':   ('Aarav', 'Day 1 student. Young man, Indian English, relaxed and natural.'),
    'student': ('Maya', 'Day 2 student. Young woman, natural and warm, telling it, not performing it.'),
}
DAYS = [('prototype', 'Day 1 · Part 1'), ('prototype-day2', 'Day 2 · Part 2'),
        ('prototype-day3', 'Day 3 · Part 3'), ('prototype-mock', 'Day 4 · Mock test')]
BRANCH_NAMES = {'movie': 'Movies', 'hobby': 'Hobbies', 'tech': 'Technology', 'edu': 'Education'}
GUIDE = os.path.join('docs', 'scripts', 'elevenlabs-audio-generation.md')

def load(d):
    return json.load(open(os.path.join(d, 'vo', 'lines.json')))

# ------------------------------------------------------------------ kit
def blocks_for(d):
    """One generation per section (per theme, where a section changes with the theme), in script order."""
    data = load(d); tag = data['tag']; blocks = []
    for r in data['lines']:
        if not blocks or blocks[-1]['key'] != r['key']:
            name = f"{tag}-{r['beat']:02d}" + (f"-{r['branch']}" if r['branch'] else '') + '.mp3'
            blocks.append({'key': r['key'], 'beat': r['beat'], 'title': r['title'], 'branch': r['branch'],
                           'voice': r['speaker'], 'file': name, 'lines': []})
        blocks[-1]['lines'].append({'say': r['say'], 'files': [r['file']]})
    return data, blocks

def block_md(d, b, level='###'):
    br = f" · {BRANCH_NAMES.get(b['branch'], b['branch'])}" if b['branch'] else ''
    n = len(b['lines'])
    md = [f"{level} {b['beat']:02d} · {b['title']}{br}", "",
          f"**Voice:** {VOICES[b['voice']][0]}  ", f"**Save as:** `{b['file']}`  ",
          f"**Lines:** {n}" + ("" if n > 1 else " (no break tags needed)"), "", "```text",
          f" {BREAK} ".join(l['say'] for l in b['lines']), "```", ""]
    if n > 1:
        md += ["| # | Line | Cut into |", "|---|---|---|"]
        md += [f"| {k} | {l['say']} | `{l['files'][0]}` |" for k, l in enumerate(b['lines'], 1)]
        md.append("")
    return md

HOW = [
    "1. In ElevenLabs **Text to Speech**, choose the model **Eleven Multilingual v2**. It reads the `<break time=\"1.5s\" />` tags as pauses.",
    "2. Pick the voice named on the section. Use **the same settings for every file of that voice**, on every day. Start with Stability 50%, Similarity 75%, Style 0%, Speaker boost on, speed 1.0.",
    "3. Copy the grey box exactly: same words, same punctuation, break tags included. Generate.",
    "4. Listen. If any line is wrong, or a pause is missing, **regenerate the whole box**. Don't edit the audio.",
    "5. Download the MP3 and rename it to the **Save as** name.",
    "6. Put it in that day's `vo/raw/` folder, or send the files to Claude.",
]
WHY = [
    "**Why one file per section?** Each file gets cut into one clip per line. Each clip's length then controls when that line's caption changes and when its animation happens: rows lighting up, list items growing in, the mic arriving. "
    "The break tags make the cuts cleaner. If the pauses don't come through, that's fine too: the splitter listens for the words and cuts between the lines anyway.",
]

def kit(d, title=None):
    data, blocks = blocks_for(d)
    out = {'day': data['day'], 'break': BREAK, 'blocks': [
        {'file': b['file'], 'voice': b['voice'], 'lines': b['lines']} for b in blocks]}
    md = [f"# Audio for ElevenLabs · {title or data['day']}", "",
          f"{len(blocks)} files to generate, cut into {len(data['lines'])} clips.", "", "## How to record", ""] + HOW + \
         ["", "Then run `python3 tools/vo/vo.py split " + d + "`.", "", *WHY, "", "---", ""]
    for b in blocks:
        md += block_md(d, b)
    rec = os.path.join(d, 'vo', 'recording'); os.makedirs(rec, exist_ok=True)
    os.makedirs(os.path.join(d, 'vo', 'raw'), exist_ok=True)
    json.dump(out, open(os.path.join(rec, 'blocks.json'), 'w'), indent=1)
    open(os.path.join(rec, 'README.md'), 'w').write('\n'.join(md))
    by = {}
    for b in blocks: by[b['voice']] = by.get(b['voice'], 0) + 1
    print(f"{data['day']:5} {len(data['lines']):3} clips · {len(blocks):3} files {by}")
    return data, blocks

def kit_all():
    """Kits for all four days, plus one shareable guide covering them all."""
    days = [(d, t) + kit(d, t) for d, t in DAYS]
    total = sum(len(b) for *_, b in days)
    clips = sum(len(data['lines']) for _, _, data, _ in days)
    md = ["# IELTS Speaking · Audio for ElevenLabs", "",
          f"Every spoken line from the four lesson scripts, ready to paste into ElevenLabs. "
          f"**{total} files to generate** across the four days. They get cut into {clips} clips, one per line.", "",
          "Each file is **one section** of a script (one screen in the prototype), in the same order as the script docs: "
          "`day-1-part-1.md`, `day-2-part-2.md`, `day-3-part-3.md`, `day-4-mock-test.md`. "
          "Where a section changes with the theme the learner picks, there is one file per theme.", "",
          "## How to record", ""] + HOW + ["", *WHY, "", "## Voices", "", "| Voice | Direction | Used on |", "|---|---|---|"]
    used = {}
    for _, t, _, blocks in days:
        for b in blocks: used.setdefault(b['voice'], [])
        for b in blocks:
            if t not in used[b['voice']]: used[b['voice']].append(t)
    for v, (name, note) in VOICES.items():
        if v in used: md.append(f"| **{name}** | {note} | {', '.join(used[v])} |")
    md += ["", "## Files per day", "", "| Day | Files | Sarah | Other voice | Save into |", "|---|---|---|---|---|"]
    for d, t, data, blocks in days:
        other = {}
        for b in blocks:
            if b['voice'] != 'sarah': other[VOICES[b['voice']][0]] = other.get(VOICES[b['voice']][0], 0) + 1
        sarah = sum(1 for b in blocks if b['voice'] == 'sarah')
        md.append(f"| [{t}](#{anchor(t)}) | {len(blocks)} | {sarah} | {', '.join(f'{k} {v}' for k, v in other.items()) or '–'} | `{d}/vo/raw/` |")
    md.append("")
    for d, t, data, blocks in days:
        md += ["---", "", f"## {t}", "", f"{len(blocks)} files · save into `{d}/vo/raw/` · then `python3 tools/vo/vo.py split {d}`", ""]
        for b in blocks:
            md += block_md(d, b)
    os.makedirs(os.path.dirname(GUIDE), exist_ok=True)
    open(GUIDE, 'w').write('\n'.join(md))
    print(f"{GUIDE}: {total} files, {clips} clips")

def anchor(t):
    return re.sub(r'[^\w\- ]', '', t.lower()).replace(' ', '-')

# ------------------------------------------------------------------ split
def run(args):
    return subprocess.run(args, capture_output=True, text=True)

def duration(path):
    r = run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path])
    return float(r.stdout.strip())

def silences(path, noise='-38dB', min_d=0.7):
    err = run(['ffmpeg', '-hide_banner', '-i', path, '-af', f'silencedetect=noise={noise}:d={min_d}', '-f', 'null', '-']).stderr
    starts = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', err)]
    ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]
    total = duration(path)
    if len(ends) < len(starts): ends.append(total)
    return list(zip(starts, ends)), total

def cut(src, dst, ss, to):
    run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{ss:.3f}', '-to', f'{to:.3f}', '-i', src,
         '-ac', '1', '-ar', '44100', '-codec:a', 'libmp3lame', '-b:a', '128k', dst])

def split(d):
    data = load(d); vo = os.path.join(d, 'vo')
    blocks = json.load(open(os.path.join(vo, 'recording', 'blocks.json')))['blocks']
    problems = []
    for b in blocks:
        src = os.path.join(vo, 'raw', b['file'])
        if not os.path.exists(src):
            problems.append(f"missing  {b['file']}"); continue
        n = len(b['lines'])
        sil, total = silences(src)
        lead = sil[0][1] if sil and sil[0][0] <= 0.05 else 0.0
        tail = sil[-1][0] if sil and sil[-1][1] >= total - 0.05 else total
        inner = [s for s in sil if s[0] > lead + 0.01 and s[1] < tail - 0.01]
        if len(inner) < n - 1:
            problems.append(f"{b['file']}: expected {n} lines, found only {len(inner)+1} — a <break> was probably skipped; regenerate this block")
            continue
        # the N-1 longest pauses are the breaks; everything shorter is breathing inside a line
        cuts = sorted(sorted(inner, key=lambda s: s[1] - s[0], reverse=True)[:n - 1])
        starts = [lead] + [c[1] for c in cuts]
        ends = [c[0] for c in cuts] + [tail]
        for k, line in enumerate(b['lines']):
            first = os.path.join(vo, line['files'][0])
            cut(src, first, max(0.0, starts[k] - 0.06), min(total, ends[k] + 0.10))
            for f in line['files'][1:]:
                shutil.copyfile(first, os.path.join(vo, f))
        print(f"  ok  {b['file']}  → {n} lines")

    # the manifest lists, per beat (and branch), one file per line in order; missing clips are null
    beats = {}
    for r in data['lines']:
        beats.setdefault(r['key'], [])
        while len(beats[r['key']]) <= r['k']: beats[r['key']].append(None)
        if os.path.exists(os.path.join(vo, r['file'])): beats[r['key']][r['k']] = r['file']
    have = sum(1 for v in beats.values() for f in v if f)
    json.dump({'_note': 'Generated by tools/vo/vo.py split. One file per spoken line.',
               'beats': {k: {'lines': v} for k, v in beats.items()}},
              open(os.path.join(vo, 'manifest.json'), 'w'), indent=1)
    print(f"{data['day']}: {have}/{len(data['lines'])} clips in manifest.json")
    for p in problems: print('  !! ' + p)

if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'kit-all': kit_all()
    else: {'kit': kit, 'split': split}[cmd](sys.argv[2].rstrip('/'))
