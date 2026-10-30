// The speaking test: one screen that remembers where you are.
// The engine holds the beat, the phase, the timers and your notes. The layout is drawn
// from that state for the current width (mobile, tablet or desktop), so crossing a size
// boundary rearranges the pieces without restarting anything. The two examiner videos are
// kept alive the whole time and glide to wherever the current layout wants them.
import { BEATS, SIDE, PARTS, CUE, lineMs } from './script.js';
import { state, save } from '../shared/state.js';
import { go, onLeave, layout, vw, vh } from '../shared/app.js';

// Design width per layout. Tablet uses the mobile structure drawn larger (600 wide, zoomed up),
// so a tablet sees the same composition as a phone, not a phone-sized column in a big empty screen.
const W = { m: 402, t: 600, d: 1440 }, MAXZ = { m: 1.25, t: 1.6, d: 1.2 };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clock = s => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

let S = null; // runtime state for the mounted test

/* ---------------- icons ---------------- */
const I = {
  back: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M14.5 6 8.5 12l6 6" fill="none" stroke="#D9D4CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  flag: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 21V4M6 4h10l-2 4 2 4H6" fill="none" stroke="#D9D4CD" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mic: (c = '#FFFFFF', s = 30) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="${c}" stroke-width="2"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"/></svg>`,
  x: '<svg width="17" height="17" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke="#A79C8C" stroke-width="2.2" stroke-linecap="round"/></svg>',
  ok: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l5 5L19 7" stroke="#1A1512" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chev: c => `<svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M1.5 1.5 6 6l-4.5 4.5" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrow: '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M3.5 9h11m0 0L10 4.5M14.5 9 10 13.5" fill="none" stroke="#14121A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  micOff: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"><path d="M9 9v2a3 3 0 0 0 5.1 2.1M15 10V6a3 3 0 0 0-5.7-1.3" stroke="#E07A6E" stroke-width="2" stroke-linecap="round"/><path d="M5.5 11a6.5 6.5 0 0 0 10.6 5M18.5 11c0 .6-.1 1.2-.2 1.7M12 17.5V21M4 4l16 16" stroke="#E07A6E" stroke-width="2" stroke-linecap="round"/></svg>`,
  wifiOff: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none"><path d="M2 8.5a15 15 0 0 1 20 0M5 12a10.5 10.5 0 0 1 14 0M8.5 15.5a5.5 5.5 0 0 1 7 0" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="19" r="1.2" fill="#fff"/><path d="M4 3l16 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
  lock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="10" rx="2" stroke="#D9D4CD" stroke-width="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#D9D4CD" stroke-width="2"/></svg>',
  tick: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l5 5L19 7" stroke="#1A1512" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  wave: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 6v4M5 4v8M8 6v4M11 3v10M14 6v4" stroke="var(--topic-tint)" stroke-width="1.6" stroke-linecap="round"/></svg>',
  green: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l5 5L19 7" stroke="#6FD37F" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
const bars = n => `<div class="bars">${Array.from({ length: n }, () => '<i></i>').join('')}</div>`;

/* ---------------- mount / unmount ---------------- */
export function mountTest(sec) {
  if (S) teardown();
  sec.innerHTML = `<div class="stage" id="stage" data-nofit="1">
    <div class="hdr"><button class="hbtn" data-act="leave" aria-label="Leave the test">${I.back}</button>
      <div class="rwrap"><div class="rail"><div class="rfill"></div><i class="notch"></i><i class="notch"></i><div class="rknob"></div></div><div class="rlabel"></div></div>
      <button class="hbtn" data-act="flag" aria-label="Report a problem">${I.flag}</button></div>
    <div class="dbar"><div class="segs"><div class="seg"><i></i></div><div class="seg"><i></i></div><div class="seg"><i></i></div></div>
      <div class="dlabels"><span class="dl-left"></span><span class="dl-right"></span></div></div>
    <div class="content" id="tc"></div>
    <div class="face nolan gone" id="fN"><video src="assets/video/nolan.mp4" muted loop playsinline autoplay preload="auto"></video></div>
    <div class="face sarah gone" id="fS"><video src="assets/video/sarah.mp4" muted loop playsinline autoplay preload="auto"></video><div class="ftag"><b>Sarah</b><span>Your guide</span></div></div>
    <div class="toast" id="toast"></div>
  </div>`;
  const stage = sec.querySelector('#stage');
  S = {
    sec, stage, tc: stage.querySelector('#tc'), fN: stage.querySelector('#fN'), fS: stage.querySelector('#fS'),
    L: null, beat: null, idx: 0, phase: '', line: 0, timers: [], ints: [], rec: 0, left: 0, step: 0,
    resume: 'n1', micBlocked: new URLSearchParams(location.search).get('mic') === 'blocked',
    notes: [0, 1, 2, 3].map(() => { const i = document.createElement('input'); i.type = 'text'; i.className = 'note-in'; i.spellcheck = false; i.autocomplete = 'off'; return i; }),
  };
  S.notes.forEach((inp, k) => inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); (S.notes[k + 1] || inp).focus(); } }));
  stage.addEventListener('click', onClick);
  addEventListener('resize', onResize); addEventListener('keydown', onKey); addEventListener('offline', onOffline);
  onLeave(teardown);
  sizeStage();
  document.fonts?.ready.then(() => S && placeFaces());
  const q = new URLSearchParams(location.search).get('beat');
  goBeat(q && (BEATS.some(b => b.id === q) || SIDE[q]) ? q : 's1');
  [S.fN, S.fS].forEach(f => f.querySelector('video').play().catch(() => {}));
}
function teardown() {
  if (!S) return; clearTimers();
  removeEventListener('resize', onResize); removeEventListener('keydown', onKey); removeEventListener('offline', onOffline);
  S = null;
}

/* ---------------- timers ---------------- */
const at = (ms, fn) => S.timers.push(setTimeout(fn, ms));
const every = (ms, fn) => S.ints.push(setInterval(fn, ms));
function clearTimers() { S.timers.forEach(clearTimeout); S.ints.forEach(clearInterval); S.timers = []; S.ints = []; }

/* ---------------- sizing ---------------- */
function sizeStage() {
  const L = layout(), z = Math.min(vw() / W[L], MAXZ[L]), w = vw() / z;
  S.stage.style.width = w + 'px'; S.stage.style.zoom = z; S.stage.style.height = (vh() / z) + 'px';
  S.stage.dataset.l = L;
  const changed = L !== S.L; S.L = L; return changed;
}
function onResize() { if (!S) return; if (sizeStage()) draw(true); else placeFaces(); }

/* ---------------- beats ---------------- */
function goBeat(id) {
  clearTimers();
  const side = SIDE[id]; const idx = BEATS.findIndex(b => b.id === id);
  if (!side && idx < 0) return;
  if (!side) S.idx = idx;
  if (id === 'p2i' || id === 'p2c') S.notes.forEach(n => (n.value = ''));
  S.beat = side || BEATS[idx]; S.line = 0; S.rec = 0; S.step = 0;
  const k = S.beat.kind;
  S.phase = k === 'ask' ? 'asking' : k === 'sound' ? 'listen' : '';
  if (k === 'prep' || k === 'talk') S.left = S.beat.secs;
  if (k === 'talk' && !S.notes.some(n => n.value)) ['Kyoto, Japan', 'saw it in a film', 'temples, night walks', 'old and new side by side'].forEach((v, i) => (S.notes[i].value = v));
  if (!side && S.beat.part !== 'mic' && S.beat.part !== 'intro' && k !== 'check' && id !== 't6') S.resume = id;
  draw(true); run();
}
const next = () => { const n = BEATS[S.idx + 1]; if (n) goBeat(n.id); else go('result'); };
const lines = () => (S.beat.lines ? S.beat.lines(state.name || 'there') : []);

// Timing for each beat. Everything is driven from here; drawing only reflects state.
function run() {
  const b = S.beat, k = b.kind;
  if (k === 'sarah' || k === 'parts' || k === 'caption' || k === 'cue') {
    const L = lines(); let t = k === 'caption' && b.id === 'n1' ? 700 : 300;
    L.forEach((l, i) => { if (i) at(t, () => { S.line = i; live(); }); t += lineMs(l); });
    if (k === 'cue') at(t + 900, next);
    else if (b.id === 't6') at(t + 1800, next);
    else if (b.id !== 's2' || S.L !== 'd') at(t + 600, next);
    else at(t + 4000, next); // desktop shows "Meet my examiner"; move on if nobody taps it
  }
  if (k === 'ask') {
    at(Math.max(1800, lineMs(b.text) + 300), () => { S.phase = 'ready'; draw(); at(6000, () => { if (S.phase === 'ready') startRec(); }); });
  }
  if (k === 'sound') startWave();
  if (k === 'sound') at(2400, () => { S.phase = 'ok'; live(); });
  if (k === 'prep') every(1000, () => { S.left--; live(); if (S.left <= 0) next(); });
  if (k === 'talk') { startWave(); every(1000, () => { S.left--; live(); if (S.left <= 0) at(700, next); }); }
  if (k === 'check') { [1500, 3500, 5500].forEach((ms, i) => at(ms, () => { S.step = i + 1; live(); })); at(6800, () => go('result')); }
}
function startRec() {
  clearTimers(); S.phase = 'rec'; S.rec = 0; draw(); startWave();
  every(1000, () => { S.rec++; live(); if (S.rec >= S.beat.cap) at(400, next); });
}
function startWave() {
  every(70, () => { S.stage.querySelectorAll('.bars i').forEach((b, k) => { const h = 6 + Math.abs(Math.sin(Date.now() / 210 + k * 0.8)) * 30 * (k > 16 ? 0.35 : 1); b.style.height = h + 'px'; b.className = h > 26 ? 'hi' : h < 12 ? 'lo' : ''; }); });
}

/* ---------------- input ---------------- */
function onClick(e) {
  const a = e.target.closest('[data-act]'); if (!a || !S) return;
  const act = a.dataset.act;
  if (act === 'leave') { if (confirm('Leave the test? Your answers so far will be lost.')) go('picked'); return; }
  if (act === 'flag') return toast('Thanks. We’ve noted a problem with this question.');
  if (act === 'mic') return startRec();
  if (act === 'done') { clearTimers(); return at(350, next); }
  if (act === 'redo') return startRec();
  if (act === 'allow') { if (S.micBlocked) { S.micBlocked = false; return goBeat('m2'); } return goBeat('m3'); }
  if (act === 'retry') return goBeat('m3');
  if (act === 'begin') return goBeat('n1');
  if (act === 'resume') return goBeat(S.resume);
  if (act === 'next') { clearTimers(); return next(); }
  if (act === 'talk') return goBeat('p2t');
}
function onKey(e) {
  if (!S || e.code !== 'Space' || e.target.tagName === 'INPUT') return;
  if (S.phase === 'ready') { e.preventDefault(); startRec(); }
  else if (S.phase === 'rec' || S.beat.kind === 'talk') { e.preventDefault(); clearTimers(); at(350, next); }
}
function onOffline() { if (S) goBeat('e1'); }
function toast(msg) { const t = S.stage.querySelector('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 2400); }

/* ---------------- progress ---------------- */
function progress() {
  const b = S.beat, frac = S.idx / (BEATS.length - 1);
  S.stage.querySelector('.rfill').style.width = (frac * 100) + '%';
  S.stage.querySelector('.rknob').style.left = `calc(${frac * 100}% - 6px)`;
  const segs = [...S.stage.querySelectorAll('.seg i')], ids = BEATS.map(x => x.id);
  const p1 = PARTS.p1.ids, p3 = PARTS.p3.ids;
  const f1 = b.part === 'p1' ? Math.max(0.04, (p1.indexOf(b.id) + 1) / p1.length) : ['p2', 'p3', 'end'].includes(b.part) ? 1 : 0;
  const p2map = { p2i: 0.04, p2c: 0.08, p2p: 0.15 + 0.35 * (1 - S.left / 60), p2t: 0.5 + 0.45 * (1 - S.left / 120), p2r: 1 };
  const f2 = b.part === 'p2' ? p2map[b.id] || 0 : ['p3', 'end'].includes(b.part) ? 1 : 0;
  const f3 = b.part === 'p3' ? (p3.indexOf(b.id) + 1) / p3.length : b.part === 'end' ? 1 : 0;
  [f1, f2, f3].forEach((f, i) => (segs[i].style.width = f * 100 + '%'));
  // mobile/tablet: notches where Part 2 and Part 3 start, and one short line under the bar
  const at2 = BEATS.findIndex(x => x.id === 'p2i') / (BEATS.length - 1), at3 = BEATS.findIndex(x => x.id === 'r1') / (BEATS.length - 1);
  S.stage.querySelectorAll('.notch').forEach((n, i) => { n.style.left = ((i ? at3 : at2) * 100) + '%'; n.classList.toggle('past', frac >= (i ? at3 : at2)); });
  const rl = S.stage.querySelector('.rlabel');
  rl.textContent = b.part === 'p1' && p1.includes(b.id) ? `Part 1 · Question ${p1.indexOf(b.id) + 1} of ${p1.length}`
    : b.part === 'p1' ? 'Part 1 · About you'
    : b.id === 'p2r' ? 'Part 2 · Rounding off' : b.part === 'p2' ? 'Part 2 · The cue card'
    : b.part === 'p3' ? `Part 3 · Question ${p3.indexOf(b.id) + 1} of ${p3.length}` : '';
  const L = S.stage.querySelector('.dl-left'), R = S.stage.querySelector('.dl-right');
  if (b.part === 'p1') { L.textContent = PARTS.p1.name; R.textContent = p1.includes(b.id) ? `Question ${p1.indexOf(b.id) + 1} of ${p1.length}` : 'Before we start'; }
  if (b.part === 'p2') { L.textContent = PARTS.p2.name; R.textContent = b.id === 'p2t' ? 'Nolan will stop you at 2 minutes' : b.id === 'p2r' ? 'Rounding off' : '1 minute to plan, then 2 minutes to talk'; }
  if (b.part === 'p3') { L.textContent = PARTS.p3.name; R.textContent = `Question ${p3.indexOf(b.id) + 1} of ${p3.length}`; }
  S.stage.dataset.bar = ['ask', 'cue', 'prep', 'talk'].includes(b.kind) ? '1' : '';
  void ids;
}

/* ---------------- drawing ---------------- */
function draw(enter) {
  const html = S.L === 'd' ? desk() : mob();
  const focused = S.notes.indexOf(document.activeElement);
  S.stage.dataset.kind = S.beat.kind;
  S.tc.innerHTML = `<div class="scene ${enter ? 'enter' : ''} k-${S.beat.kind}">${html}</div>`;
  // notes inputs are real inputs; they move between layouts and keep what you typed
  S.tc.querySelectorAll('[data-note]').forEach(slot => slot.appendChild(S.notes[+slot.dataset.note]));
  if (focused >= 0 && S.tc.contains(S.notes[focused])) S.notes[focused].focus({ preventScroll: true });
  progress(); placeFaces(); live();
}
// Small updates that shouldn't redraw the scene: captions, timers, ticks
function live() {
  if (!S) return;
  const b = S.beat, L = lines(), $ = s => S.tc.querySelector(s);
  const cap = $('[data-cap]');
  if (cap && L.length) { const txt = L[S.line]; if (cap.dataset.txt !== txt) { cap.dataset.txt = txt; cap.classList.add('swap'); setTimeout(() => { cap.textContent = txt; cap.classList.remove('swap'); placeFaces(); }, cap.textContent ? 180 : 0); } }
  S.tc.querySelectorAll('[data-line]').forEach(el => { const n = +el.dataset.line; el.classList.toggle('cur', n === S.line); el.classList.toggle('past', n < S.line); });
  S.tc.querySelectorAll('[data-row]').forEach(el => el.classList.toggle('lit', +el.dataset.row <= S.line - 1));
  if (b.id === 's2') S.tc.querySelector('.d-cta')?.classList.toggle('in', S.line >= L.length - 1);
  if (b.id === 't6') S.tc.querySelector('.t6-sub')?.classList.toggle('in', S.line >= L.length - 1);
  const rt = $('#rt'); if (rt) rt.textContent = b.kind === 'talk' ? `${clock(S.left)} left` : clock(S.rec);
  const pt = $('#pt'); if (pt) { pt.textContent = clock(S.left); const arc = $('#parc'); if (arc) arc.style.strokeDashoffset = 113 * (1 - S.left / 60); $('.prep')?.classList.toggle('low', S.left <= 10); }
  if (b.kind === 'talk') $('.recorder')?.classList.toggle('low', S.left <= 20);
  if (b.kind === 'sound') { $('.snd-ok')?.classList.toggle('in', S.phase === 'ok'); const c = $('[data-act="begin"]'); if (c) c.classList.toggle('off', S.phase !== 'ok'); }
  S.tc.querySelectorAll('[data-step]').forEach(el => { const n = +el.dataset.step; el.className = 'ck ' + (n < S.step ? 'done' : n === S.step ? 'now' : 'wait'); });
  if (b.kind === 'prep' || b.kind === 'talk') progress();
  requestAnimationFrame(placeFaces);
}
// Put each video in its slot in the current scene (or fade it out if the scene has none)
function placeFaces() {
  if (!S) return;
  syncVideo();
  for (const [f, who] of [[S.fN, 'nolan'], [S.fS, 'sarah']]) {
    const slot = S.tc.querySelector(`[data-face="${who}"]`);
    if (!slot) { f.classList.add('gone'); continue; }
    let x = 0, y = 0, n = slot; while (n && n !== S.stage) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    const first = f.classList.contains('gone') && !f.dataset.placed;
    if (first) f.style.transition = 'none';
    Object.assign(f.style, { left: x + 'px', top: y + 'px', width: slot.offsetWidth + 'px', height: slot.offsetHeight + 'px' });
    f.className = `face ${who} ${slot.dataset.look || ''}`; f.dataset.placed = '1';
    if (first) { void f.offsetWidth; f.style.transition = ''; }
  }
}

// Nolan talks while he asks, then holds still while you answer
function syncVideo() {
  const b = S.beat, k = b.kind;
  const nolanStill = (k === 'ask' && S.phase !== 'asking') || k === 'prep' || k === 'talk';
  for (const [f, still] of [[S.fN, nolanStill], [S.fS, false]]) {
    const v = f.querySelector('video'); if (!v) continue;
    if (still) { if (!v.paused) v.pause(); } else if (v.paused) v.play().catch(() => {});
  }
}

/* ---------------- shared pieces ---------------- */
const recorder = () => `<div class="recorder"><div class="rtime"><i></i><span id="rt"></span></div>
  <div class="pill"><button class="pbtn x" data-act="redo" aria-label="Start this answer again">${I.x}</button>${bars(20)}
  <button class="pbtn ok" data-act="done" aria-label="I’m done">${I.ok}</button></div></div>`;
const micBtn = () => `<button class="micbtn" data-act="mic" aria-label="Start answering">${I.mic()}</button>`;
const prepPill = () => `<div class="prep"><div class="pl"><svg class="pring" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#FFFFFF1F" stroke-width="3"/><circle id="parc" cx="20" cy="20" r="18" fill="none" stroke="var(--topic-folder-top)" stroke-width="3" stroke-linecap="round" stroke-dasharray="113" transform="rotate(-90 20 20)"/></svg>
  <div class="pt"><b id="pt"></b><span>left to plan</span></div></div><button class="pgo" data-act="talk">${I.mic('#1A1512', 16)}I’m ready to talk</button></div>`;

/* ---------------- mobile + tablet ---------------- */
function mob() {
  const b = S.beat, k = b.kind, L = lines(), name = esc(state.name || 'there');
  const bubble = t => `<div class="bubble"><svg class="btail" width="16" height="8" viewBox="0 0 16 8"><path d="M0 8 8 0l8 8z" fill="#262220"/></svg><div class="btext" ${t === null ? 'data-cap' : ''}>${t === null ? '' : esc(t)}</div></div>`;
  const bottomCta = (label, act, note, off) => `<div class="m-bottom"><button class="m-cta ${off ? 'off' : ''}" data-act="${act}">${label} ${I.chev('#1A1512')}</button><div class="m-note">${note}</div></div>`;
  switch (k) {
    case 'sarah': case 'caption':
      return `<div class="m-col m-big"><div class="slot ring-big" data-face="${b.who}" data-look="ring big"></div><div class="bigcap" data-cap></div></div>`;
    case 'parts':
      return `<div class="m-col m-top"><div class="slot ring-sm" data-face="sarah" data-look="ring sm"></div>${bubble(null)}
        <div class="m-parts"><div class="mp-title">All three, in one sitting</div><div class="mp-box">
        ${['Part 1 · About you|4–5 min', 'Part 2 · The cue card|3–4 min', 'Part 3 · The discussion|4–5 min'].map((r, i) => { const [a, t] = r.split('|'); return `<div class="mp-row" data-row="${i}"><span class="mp-ico"></span><span>${a}</span><em>${t}</em></div>`; }).join('')}
        </div></div></div>`;
    case 'mic':
      return `<div class="m-col m-center"><div class="slot ring-hero" data-face="nolan" data-look="ring hero"></div><h2>Nolan will be your examiner</h2><p>All three parts in one go, about twelve minutes. Find a quiet spot so he can hear you.</p></div>
        ${bottomCta('Turn on mic and begin', 'allow', 'Your browser will ask to use your mic. Tap Allow.')}`;
    case 'sound':
      return `<div class="m-col m-center"><div class="slot ring-hero" data-face="nolan" data-look="ring hero"></div><h2>Say hello to Nolan</h2><p>Just checking your mic. Say anything, like “Hello, my name is ${name}.”</p>
        <div class="snd">${bars(26)}</div><div class="snd-ok">${I.green}We can hear you clearly</div></div>
        ${bottomCta('Start the test', 'begin', 'Find a quiet spot. The test takes about 12 minutes.', true)}`;
    case 'blocked':
      return `<div class="m-col m-center"><div class="icon-circle red">${I.micOff(40)}</div><h2>We can’t hear you yet</h2><p>Your browser blocked the mic. Tap “aA” or the lock next to the web address, turn Microphone on, then try again.</p></div>
        ${bottomCta('Try again', 'retry', 'Still stuck? Open this page in Chrome or Safari.')}`;
    case 'offline':
      return `<div class="m-col m-center"><div class="icon-circle">${I.wifiOff(40)}</div><h2>Connection lost</h2><p>Don’t worry. Your answers so far are saved. You’ll start again from the question you were on.</p></div>
        ${bottomCta('Pick up where I left off', 'resume', 'Your test stays saved for 24 hours.')}`;
    case 'ask': return `<div class="m-col m-top"><div class="slot ring-sm" data-face="nolan" data-look="ring sm"></div>${bubble(b.tip)}
        <div class="qcard"><div class="ql">PART ${b.part === 'p3' ? 3 : b.part === 'p2' ? 2 : 1} · ${esc(b.label.toUpperCase())}</div><div class="qt">${esc(b.text)}</div></div></div>
        ${S.phase === 'ready' ? `<div class="m-mic">${micBtn()}</div>` : S.phase === 'rec' ? `<div class="m-rec">${recorder()}</div>` : ''}`;
    case 'cue':
      return `<div class="m-col m-top"><div class="slot ring-sm" data-face="nolan" data-look="ring sm"></div>${bubble(L[0])}
        <div class="cuecard"><div class="cl">CUE CARD</div><div class="ct">${esc(CUE.topic)}</div><div class="crule"></div><div class="csay">You should say</div>
        <ul>${CUE.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div></div>`;
    case 'prep':
      return `<div class="m-col m-card"><div class="cuecard write"><div class="cl">CUE CARD</div><div class="ct sm">${esc(CUE.topic)}</div><div class="crule"></div>
        ${CUE.points.map((p, i) => `<div class="wline"><div class="wl">• ${esc(p)}</div><div class="win" data-note="${i}"></div></div>`).join('')}</div></div>
        <div class="m-prep">${prepPill()}</div>`;
    case 'talk':
      return `<div class="m-col m-card"><div class="cuecard notes"><div class="ct xs">${esc(CUE.topic)}</div>
        ${S.notes.map(n => n.value).filter(Boolean).map(v => `<div class="nline">${esc(v)}</div>`).join('') || '<div class="nline dim">No notes. Just talk.</div>'}</div></div>
        <div class="m-rec">${recorder()}</div>`;
    case 'check':
      return `<div class="m-col m-big"><div class="slot ring-big" data-face="sarah" data-look="ring big"></div><div class="bigcap">That is a whole speaking test, done.</div></div>
        <div class="m-check"><div class="ckbox"><div class="ckrow"><span data-step="0"></span>Listening to all 14 answers</div><div class="ckrow"><span data-step="1"></span>Marking your answers</div></div>
        <div class="m-note">About a minute. Please keep this page open.</div></div>`;
  }
  return '';
}

/* ---------------- desktop ---------------- */
function desk() {
  const b = S.beat, k = b.kind, L = lines(), name = esc(state.name || 'there');
  const center = (visual, h, p, cta, note, extra = '') => `<div class="d-center">${visual}<div class="d-txt"><h1 ${h === null ? 'data-cap' : ''}>${h === null ? '' : h}</h1>${p ? `<p class="${b.id === 't6' ? 't6-sub' : ''}">${p}</p>` : ''}</div>${extra}
    ${cta ? `<div class="d-ctas"><button class="d-btn ${cta[2] ? 'off' : ''}" data-act="${cta[1]}">${I.mic('#14121A', 18)}${cta[0]}</button><div class="d-note">${note}</div></div>` : ''}</div>`;
  const ring = `<div class="slot d-ring260" data-face="nolan" data-look="ring center"></div>`;
  const sarahCard = `<div class="slot d-sarah" data-face="sarah" data-look="rect"></div>`;
  switch (k) {
    case 'sarah':
      return `<div class="d-split">${sarahCard}<div class="d-lines">${L.map((l, i) => `<div class="dline" data-line="${i}">${esc(l)}</div>`).join('')}</div></div>
`;
    case 'parts':
      return `<div class="d-split">${sarahCard}<div class="d-right"><h1>Three parts, one take. Nobody will stop you.</h1>
        <div class="d-rows">${[['Part 1 · 4–5 min', 'Short questions about you'], ['Part 2 · 3–4 min', 'A cue card. 1 minute to plan, 2 to talk'], ['Part 3 · 4–5 min', 'A deeper talk about the same topic']].map(([a, t], i) => `<div class="drow" data-row="${i}"><span>${a}</span><b>${t}</b></div>`).join('')}</div>
        <div class="d-soft">Nolan won’t react to your answers. That’s normal. Real examiners don’t either.</div>
        <div class="d-cta"><button class="d-btn" data-act="next">Meet my examiner ${I.arrow}</button></div></div></div>`;
    case 'check':
      return `<div class="d-split">${sarahCard}<div class="d-right"><h1>That’s a whole test, ${name}. Well done.</h1>
        <div class="d-checks">${['Listening to all 14 answers', 'Marking fluency and pronunciation', 'Marking vocabulary and grammar'].map((t, i) => `<div class="ckrow"><span data-step="${i}"></span>${t}</div>`).join('')}</div>
        <div class="d-note left">Takes about a minute. Please keep this page open.</div></div></div>`;
    case 'mic': return center(ring, 'Nolan will be your examiner', 'He asks the questions and listens. He won’t tell you how you’re doing, just like the real test.', ['Turn on mic and begin', 'allow'], 'Your browser will ask to use your microphone. Tap Allow.');
    case 'sound': return center(ring, 'Say hello to Nolan', `Just checking your mic. Say anything, like “Hello, my name is ${name}.”`, ['Start the test', 'begin', true], 'Find a quiet spot. The test takes about 12 minutes.', `<div class="sndw"><div class="snd">${bars(30)}</div><div class="snd-ok">${I.green}We can hear you clearly</div></div>`);
    case 'blocked': return center(`<div class="icon-circle red d">${I.micOff(40)}</div>`, 'We can’t hear you yet', 'Your browser blocked the mic. Tap the lock icon next to the web address, turn Microphone on, then try again.', ['Try again', 'retry'], 'Still stuck? Open this page in Chrome or Safari.',
      `<div class="urlpill">${I.lock}<span>mock.stimuler.app</span><i></i><em>Microphone</em><b class="tog"></b></div>`);
    case 'offline': return center(`<div class="icon-circle d">${I.wifiOff(40)}</div>`, 'Connection lost', 'Don’t worry. Everything you’ve answered is saved. When you’re back online, you’ll start again from the question you were on.', ['Pick up where I left off', 'resume'], 'Your test stays saved for 24 hours.');
    case 'caption': return center(ring, null, b.id === 't6' ? `“Thank you, ${name}.” Sarah will be with you in a moment.` : '', null, '');
    case 'ask': case 'cue': {
      const label = k === 'cue' ? 'Here is your cue card' : S.phase === 'rec' ? 'Nolan is listening' : S.phase === 'ready' ? 'Nolan asked' : 'Nolan is asking';
      const card = k === 'cue'
        ? `<div class="cuecard d"><div class="cl">CUE CARD</div><div class="ct">${esc(CUE.topic)}</div><div class="crule"></div><div class="csay">You should say:</div><div class="cpts">• ${CUE.points.slice(0, 3).map(esc).join('<br>• ')}<br>${esc(CUE.points[3])}.</div></div>`
        : `<div class="qcard d"><div class="ql">${esc(b.label)}</div><div class="qt">${esc(b.text)}</div></div>`;
      return `<div class="d-ask"><div class="d-exam"><div class="slot d-ring380" data-face="nolan" data-look="ring side"></div><div class="d-name"><b>Nolan</b><span>Your examiner</span></div></div>
        <div class="d-q"><div class="d-label">${I.wave}<span>${label}</span></div>${card}</div></div>
        ${S.phase === 'ready' ? `<div class="d-mic">${micBtn()}<div class="d-hint">Tap the mic and answer out loud, or press <kbd>Space</kbd></div></div>` : S.phase === 'rec' ? `<div class="d-rec">${recorder()}</div>` : ''}`;
    }
    case 'prep': case 'talk':
      return `<div class="d-p2"><div class="d-p2l"><div class="d-quote"><div class="slot d-mini" data-face="nolan" data-look="ring mini"></div><span>${k === 'prep' ? '“Here is your topic. You have one minute to prepare.”' : '“Alright. Please start speaking now.”'}</span></div>
        <div class="cuecard d"><div class="cl">CUE CARD</div><div class="ct">${esc(CUE.topic)}</div><div class="crule"></div><div class="csay">You should say:</div><div class="cpts">• ${CUE.points.slice(0, 3).map(esc).join('<br>• ')}<br>${esc(CUE.points[3])}.</div></div></div>
        <div class="notepad"><div class="np-hd"><b>Your notes</b><span>Only you can see these</span></div>
        ${CUE.labels.map((l, i) => `<div class="np-f"><div class="np-l">${l}</div><div class="np-in" data-note="${i}"></div></div>`).join('')}</div></div>
        ${k === 'prep' ? `<div class="d-prep">${prepPill()}<div class="d-note">When the minute ends, the mic turns on by itself.</div></div>` : `<div class="d-rec">${recorder()}</div>`}`;
  }
  return '';
}
