// Pull every spoken line out of the four running prototypes.
// Usage: node tools/vo/extract.mjs  (prototypes served on 8777-8780)
import { chromium } from 'playwright';
import fs from 'fs';

const DAYS = [
  { day: 'day1', dir: 'prototype',      port: 8777, tag: 'd1' },
  { day: 'day2', dir: 'prototype-day2', port: 8778, tag: 'd2' },
  { day: 'day3', dir: 'prototype-day3', port: 8779, tag: 'd3' },
  { day: 'mock', dir: 'prototype-mock', port: 8780, tag: 'mk' },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const d of DAYS) {
  await page.goto(`http://localhost:${d.port}/index.html`);
  await page.waitForTimeout(600);
  const raw = await page.evaluate(() => {
    const norm = l => (typeof l === 'string' ? { say: l, cap: l } : { say: l.say, cap: l.cap ?? null });
    return {
      beats: B.map((b, i) => ({
        n: i + 1, t: b.t, custom: b.custom || null, who: b.who || null,
        lines: !b.lines ? {} : Array.isArray(b.lines) ? { '': b.lines.map(norm) }
             : Object.fromEntries(Object.entries(b.lines).map(([k, v]) => [k, v.map(norm)])),
      })),
      answers: typeof ANSWERS !== 'undefined' ? ANSWERS.map(a => a[1]) : null,
      turns: typeof TURNS !== 'undefined' ? Object.fromEntries(Object.entries(TURNS).map(([k, v]) => [k, v.map(x => x[1])])) : null,
    };
  });

  // one row per clip: key is the manifest key ("7" or "7@edu"), k is the line index within it
  const rows = [];
  const pad = n => String(n).padStart(2, '0');
  for (const b of raw.beats) {
    for (const [br, lines] of Object.entries(b.lines)) {
      const speaker = d.day === 'mock' && b.who === 'nolan' ? 'nolan' : 'sarah';
      lines.forEach((l, k) => rows.push({
        key: br ? `${b.n}@${br}` : `${b.n}`, beat: b.n, title: b.t, branch: br || null, k,
        speaker, say: l.say, cap: l.cap,
        file: `${d.tag}-${pad(b.n)}${br ? '-' + br : ''}-${k + 1}.mp3`,
      }));
    }
    if (b.custom === 'model' && raw.answers)
      raw.answers.forEach((say, k) => rows.push({ key: `${b.n}`, beat: b.n, title: b.t, branch: null, k,
        speaker: 'aarav', say, cap: null, file: `${d.tag}-${pad(b.n)}-${k + 1}.mp3` }));
    if (b.custom === 'turn' && raw.turns)
      for (const [br, lines] of Object.entries(raw.turns))
        lines.forEach((say, k) => rows.push({ key: `${b.n}@${br}`, beat: b.n, title: b.t, branch: br, k,
          speaker: 'student', say, cap: null, file: `${d.tag}-${pad(b.n)}-${br}-${k + 1}.mp3` }));
  }
  fs.mkdirSync(`${d.dir}/vo`, { recursive: true });
  fs.writeFileSync(`${d.dir}/vo/lines.json`, JSON.stringify({ day: d.day, tag: d.tag, lines: rows }, null, 1));
  const by = rows.reduce((a, r) => ((a[r.speaker] = (a[r.speaker] || 0) + 1), a), {});
  console.log(d.day.padEnd(5), String(rows.length).padStart(3), 'clips ·', JSON.stringify(by));
}
await browser.close();
