#!/usr/bin/env python3
"""Split ElevenLabs downloads into one clip per line when the <break> pauses didn't come through.

    python tools/vo/align.py prototype-day2            # needs numpy, whisper-cli, a ggml model

For each file in <prototype>/vo/raw/ (named as in vo/recording/blocks.json):
  1. line by line, the places a cut could go are ranked: long pauses (or dips, where words run
     together) near where the line should end, judged by its share of the remaining speech,
  2. the best one is cut, trimmed and transcribed with whisper.cpp,
  3. it is kept only if the clip starts and ends on the line's own first and last words;
     otherwise the next place is tried.
Writes vo/manifest.json and vo/recording/align-report.md.
"""
import json, os, re, subprocess, sys, difflib, tempfile
import numpy as np

MODEL = os.environ.get('WHISPER_MODEL', '/tmp/wh/ggml-base.en.bin')
SR = 16000
FRAME = 160                  # 10 ms
QUIET_DB = -50               # below this is a gap
LEAD, TAIL = 0.06, 0.12      # breathing room kept around each clip, seconds

NUM = {'0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six',
       '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten', '30': 'thirty', '40': 'forty'}

def norm_words(text):
    text = text.replace('’', "'").replace('–', ' ').replace('-', ' ')
    out = []
    for w in text.split():
        w = re.sub(r"[^\w':]", '', w.lower()).strip("'")
        if not w: continue
        if ':' in w:                                   # 2:00, 0:40
            out += [NUM.get(p, p) for p in w.split(':') if p and p != '00']
            continue
        out.append(NUM.get(w, w))
    return out

def pcm(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32)

def frames_db(x):
    n = len(x) // FRAME
    f = x[:n * FRAME].reshape(n, FRAME)
    rms = np.sqrt((f ** 2).mean(axis=1)) + 1e-9
    return 20 * np.log10(rms)

def transcribe(path):
    """Words heard in a file. Padded with silence so whisper copes with very short clips."""
    with tempfile.TemporaryDirectory() as t:
        wav = os.path.join(t, 'a.wav')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', path, '-af', 'adelay=700|700,apad=pad_dur=0.7',
                        '-ar', str(SR), '-ac', '1', wav], check=True)
        subprocess.run(['whisper-cli', '-m', MODEL, '-f', wav, '-oj', '-of', os.path.join(t, 'o'), '-np', '-nt'],
                       capture_output=True)
        j = json.load(open(os.path.join(t, 'o.json')))
    return norm_words(' '.join(s['text'] for s in j['transcription']))

def points(db, lo, hi):
    """Places a cut could go between lo and hi seconds: quiet runs, and dips where words run together.
    Returns (time, quiet length) pairs."""
    q = db < QUIET_DB
    out, k, i, j = [], 0, int(lo * 100), min(len(db), int(hi * 100))
    k = i
    while k < j:
        if q[k]:
            s0 = k
            while k < j and q[k]: k += 1
            if k - s0 >= 3: out.append(((s0 + k) / 200, (k - s0) / 100))
        else:
            k += 1
    sm = np.convolve(db, np.ones(3) / 3, mode='same')
    for k in range(max(i, 2), min(j, len(sm) - 2)):
        if sm[k] < -32 and sm[k] <= sm[k - 1] and sm[k] <= sm[k + 1] and sm[k] < min(sm[k - 2], sm[k + 2]) - 3:
            if all(abs(k / 100 - t) > 0.05 for t, _ in out):
                out.append((k / 100, 0.0))
    return out

def weight(words):
    return sum(max(1, len(re.sub(r'[aeiouy]+', 'a', w)) // 2 + 1) for w in words)

def voiced(db, a, b):
    return float((db[int(a * 100):int(b * 100)] >= QUIET_DB).sum()) / 100

def near(a, b):
    return a == b or difflib.SequenceMatcher(None, a, b).ratio() >= 0.75

def fits(want, got):
    """Clip holds this line: same first and last word, and nearly the same words between."""
    if not got: return False, 0.0
    sim = difflib.SequenceMatcher(None, want, got).ratio()
    return near(want[0], got[0]) and near(want[-1], got[-1]) and sim >= 0.8, sim

def trim(db, a, b):
    """Shrink [a, b] to where the voice is, then add breathing room."""
    i, j = int(a * 100), min(len(db), int(b * 100))
    loud = np.where(db[i:j] >= QUIET_DB)[0]
    if len(loud) == 0: return a, b
    s, e = (i + loud[0]) / 100, (i + loud[-1] + 1) / 100
    return max(a, s - LEAD), min(b, e + TAIL)

def cut(src, dst, ss, to):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src,
                    '-af', f'atrim=start={ss:.3f}:end={to:.3f},asetpts=PTS-STARTPTS,aformat=sample_fmts=s16:channel_layouts=mono',
                    '-ar', '44100', '-codec:a', 'libmp3lame', '-b:a', '128k', dst], check=True)

def similarity(a, b):
    return difflib.SequenceMatcher(None, a, b).ratio()

def align_block(vo, b, report):
    src = os.path.join(vo, 'raw', b['file'])
    if not os.path.exists(src):
        report.append(f"| `{b['file']}` | missing | | | | | |"); return False
    x = pcm(src); db = frames_db(x); total = len(x) / SR
    lines = [norm_words(l['say']) for l in b['lines']]
    whole = similarity([w for l in lines for w in l], transcribe(src))
    w = [weight(l) for l in lines]
    ok, start, rows = True, 0.0, []
    for k, l in enumerate(b['lines']):
        out = os.path.join(vo, l['files'][0])
        if k == len(lines) - 1:
            tries = [(total, 0.0)]
        else:
            # expected end of this line, by its share of the speech still to come
            left = voiced(db, start, total)
            share = w[k] / sum(w[k:])
            t, acc = start, 0.0
            while t < total and acc < left * share:
                if db[int(t * 100)] >= QUIET_DB: acc += 0.01
                t += 0.01
            cands = points(db, start + 0.3, total - 0.3)
            cands.sort(key=lambda c: abs(c[0] - t) / max(1.0, left) * 10 - min(c[1], 1.2) * 2.5)
            tries = cands[:12]
        best = None
        for cut_at, quiet in tries:
            s0, e = trim(db, start, cut_at)
            for nudge in (0.0, 0.08, 0.15):       # a breath at the head of a clip can read as a word
                s = s0 + nudge
                if e - s < 0.3: break
                cut(src, out, s, e)
                got = transcribe(out)
                good, sim = fits(lines[k], got)
                if best is None or (good, sim) > (best[0], best[1]):
                    best = (good, sim, cut_at, quiet, s, e, got)
                if good or (got and near(lines[k][0], got[0])): break
            if best[0]: break
        good, sim, cut_at, quiet, s, e, got = best
        cut(src, out, s, e)
        ok &= good
        rows.append(f"| `{b['file']}` | {k+1} | {e-s:.2f}s | {'ok' if good else 'CHECK'} ({sim:.2f}) | {l['say']} | {' '.join(got)} |")
        start = cut_at
    report += rows
    report.append(f"| | | | whole file matches script {whole:.0%} | | |")
    return ok

def main(d):
    vo = os.path.join(d, 'vo')
    blocks = json.load(open(os.path.join(vo, 'recording', 'blocks.json')))['blocks']
    report = ['| File | Line | Clip | Check | Script | Heard in clip |', '|---|---|---|---|---|---|']
    bad = []
    for b in blocks:
        ok = align_block(vo, b, report)
        print(('  ok  ' if ok else '  !!  ') + b['file'])
        if not ok: bad.append(b['file'])
    data = json.load(open(os.path.join(vo, 'lines.json')))
    beats = {}
    for r in data['lines']:
        beats.setdefault(r['key'], [])
        while len(beats[r['key']]) <= r['k']: beats[r['key']].append(None)
        if os.path.exists(os.path.join(vo, r['file'])): beats[r['key']][r['k']] = r['file']
    json.dump({'_note': 'Generated by tools/vo/align.py. One file per spoken line.',
               'beats': {k: {'lines': v} for k, v in beats.items()}},
              open(os.path.join(vo, 'manifest.json'), 'w'), indent=1)
    open(os.path.join(vo, 'recording', 'align-report.md'), 'w').write('\n'.join(report) + '\n')
    have = sum(1 for v in beats.values() for f in v if f)
    print(f"{have}/{len(data['lines'])} clips in manifest.json" + (f" · check: {', '.join(bad)}" if bad else ''))

if __name__ == '__main__':
    main(sys.argv[1].rstrip('/'))
