// The app side of the funnel: Paths B, C and D, and the shared mobile paywall.
// Screens come straight from Paper (screens/*.html); this file adds the movement and the taps.
import { screen, go, at, onLeave, start } from './shared/shell.js';
import { byText, onTap, hit } from './shared/dom.js';
import { TESTS } from './shared/data.js';

/* ---------------- the person (from the web hand-off link, or defaults) ---------------- */
const KEY = 'ielts-app';
const q = new URLSearchParams(location.search);
try { localStorage.removeItem(KEY); } catch (e) { } // fresh on every load; the link carries the person
const S = { path: 'B', name: 'Priya', band: 6.0, target: 7.0, exam: '1m', test: 'Cities and places' };
for (const k of ['path', 'name', 'exam', 'target', 'test', 'band']) if (q.has(k)) S[k] = ['target', 'band'].includes(k) ? parseFloat(q.get(k)) : q.get(k);
if (!['A', 'B', 'C', 'D'].includes(S.path)) S.path = 'B'; // A = paid on the web: sign in and everything is open
const save = p => { Object.assign(S, p); };
save({});

const DAYS = { '2w': 14, '1m': 30, '2m': 60, '3m': 90 };
const ABOUT = { '2w': 'in about 2 weeks', '1m': 'in about a month', '2m': 'in about 2 months', '3m': 'in more than 2 months' };
const days = () => DAYS[S.exam] || 30;
const T = () => (+S.target || 7).toFixed(1);
const gap = () => { const g = Math.max(0, (+S.target || 7) - (+S.band || 6)); return g === 1 ? '1 band' : g % 1 ? `${g} bands` : `${g} bands`; };
const test = () => TESTS[S.test] || { id: '07', examiner: 'Nolan' };

/* ---------------- path chips + screen chips (prototype controls, outside the phone) ---------------- */
const PATHS = [['A', 'Paid on the web'], ['B', 'Band free'], ['C', 'Report free'], ['D', 'Free drill']];
const START = [['b0', 'Sign in'], ['b1', 'Listening back'], ['b2', 'Your target']];
const SELL = [['p1', 'Graph'], ['PAY', 'Paywall'], ['gift', 'Gift'], ['gift/open', 'Coupon'], ['p6', 'Offer']];
const SCREENS = {
  A: [['b0', 'Sign in'], ['learn/open', 'Learn tab, unlocked']],
  B: [...START, ['b3', 'Band reveal'], ...SELL, ['learn/open', 'Paid: Learn tab']],
  C: [...START, ['c3', 'Band reveal'], ['c4', 'Full report'], ['c5', 'Setting up plan'], ['learn/locked', 'Learn tab, locked'], ...SELL],
  D: [...START, ['d3', 'Band reveal'], ['d4', 'Full report'], ['d5', 'What you said'], ['d6', 'Your words'], ['d8', 'Drill start'], ['d9', 'First word'], ['d11', 'Wrong try'], ['d12', 'Weak sound'], ['d13', '“ng” sound'], ['d14', 'New word'], ['d17', 'Say “making”'], ['d18', 'Got it right'], ['d19a', 'Score went up'], ['d19c', 'Plan builds'], ...SELL],
};
const chips = document.getElementById('chips');
function paintChips() {
  const here = location.hash.replace(/^#\//, '') || 'b0';
  const route = r => (r === 'PAY' ? PAYWALL[S.path] : r);
  chips.innerHTML = PATHS.map(([p, l]) => `<button class="path ${p === S.path ? 'on' : ''}" data-p="${p}"><b>${p}</b>${l}</button>`).join('')
    + `<div class="screens">${SCREENS[S.path].map(([r, l]) => `<button class="scr ${route(r) === here ? 'on' : ''}" data-r="${route(r)}">${l}</button>`).join('')}</div>`;
}
chips.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.p) { save({ path: b.dataset.p }); go('b0'); }
  if (b.dataset.r) go(b.dataset.r);
  paintChips();
});
addEventListener('screen', paintChips);

/* ---------------- flows ---------------- */
const REVEAL = { B: 'b3', C: 'c3', D: 'd3' };
const PAYWALL = { A: 'p3', B: 'p3', C: 'c10', D: 'd22' };

/* ---------------- helpers ---------------- */
const leaves = sec => [...sec.querySelectorAll('div,span,text,tspan')].filter(e => !e.children.length && e.textContent.trim());
const find = (sec, t) => byText(sec, t)[0];
const tap = (sec, t, fn) => byText(sec, t).forEach(e => onTap(hit(e, 4), fn));
function toast(sec, msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; sec.appendChild(t); setTimeout(() => t.remove(), 2200); }
function speak(word) { try { const u = new SpeechSynthesisUtterance(word); u.lang = 'en-GB'; u.rate = 0.85; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) { } }
function confetti(sec) {
  const c = document.createElement('div'); c.className = 'confetti';
  const cols = ['#6C63FF', '#E8B455', '#FBF1D0', '#8B84FF', '#3DD68C'];
  for (let i = 0; i < 46; i++) { const p = document.createElement('i'); p.style.left = Math.random() * 100 + '%'; p.style.background = cols[i % cols.length]; p.style.animationDelay = Math.random() * .5 + 's'; p.style.animationDuration = 1.4 + Math.random() * 1.2 + 's'; c.appendChild(p); }
  sec.appendChild(c); setTimeout(() => c.remove(), 3200);
}
// Hide the fake status bar on a real phone (the phone has its own)
function statusBar(sec) { if (innerWidth >= 600) return; const t = find(sec, '9:41'); let bar = t; while (bar && bar.parentElement && bar.parentElement !== sec.firstElementChild) bar = bar.parentElement; if (bar && bar !== t && bar.offsetHeight < 70) bar.style.visibility = 'hidden'; }

// Everything that follows the person: name, target, exam date, test
function personal(sec) {
  const t = test(), n = S.name;
  { const w = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT); let tn; while ((tn = w.nextNode())) if (tn.nodeValue.includes('Priya')) tn.nodeValue = tn.nodeValue.replace(/Priya/g, n); }
  for (const e of leaves(sec)) {
    let s = e.textContent, o = s;
    s = s.replace(/Priya/g, n);
    if (s.trim() !== '7.0') s = s.replace(/7\.0/g, T());
    s = s.replace(/1 band away/g, gap() + ' away').replace(/You’re 1 band away/g, `You’re ${gap()} away`);
    s = s.replace(/in about a month/g, ABOUT[S.exam] || ABOUT['1m']).replace(/in 30 days/g, `in ${days()} days`);
    s = s.replace(/IN 4 WEEKS/, `IN ${days()} DAYS`).replace(/In 4 weeks/g, `In ${days()} days`).replace(/4-week roadmap/g, `${days()}-day roadmap`);
    s = s.replace(/Mock test 07 · Cities and places/g, `Mock test ${t.id} · ${S.test}`).replace(/Mock test 07 · with Nolan/g, `Mock test ${t.id} · with ${t.examiner}`);
    if (s.trim() === 'Cities and places') s = S.test;
    if (s !== o) e.textContent = s;
  }
}

// A checklist that ticks off one row at a time (listening back, setting up your plan, the plan builds)
function checklist(sec, texts, step = 750, then) {
  const rows = texts.map(t => find(sec, t)?.parentElement).filter(Boolean); if (!rows.length) return;
  const mark = r => r.firstElementChild, label = r => r.lastElementChild;
  const doneRow = rows[0], waitRow = rows[rows.length - 1];
  const tickHTML = mark(doneRow).outerHTML, waitHTML = mark(waitRow).outerHTML;
  const onStyle = label(doneRow).getAttribute('style'), offStyle = label(waitRow).getAttribute('style');
  const rowOn = doneRow.getAttribute('style'), rowOff = waitRow.getAttribute('style');
  const spin = `<div style="width:26px;height:26px;border-radius:50%;border:2px solid #2A2740;border-top-color:#6C63FF;flex-shrink:0;animation:spin .8s linear infinite"></div>`;
  if (!document.getElementById('spinkf')) document.head.insertAdjacentHTML('beforeend', '<style id="spinkf">@keyframes spin{to{transform:rotate(360deg)}}</style>');
  const set = (r, html, style) => { mark(r).outerHTML = html; label(r).setAttribute('style', style); r.setAttribute('style', style === onStyle ? rowOn : rowOff); };
  rows.forEach(r => set(r, waitHTML, offStyle));
  rows.forEach((r, i) => { at(300 + i * step, () => set(r, spin, onStyle)); at(300 + i * step + step * .8, () => { set(r, tickHTML, onStyle); mark(r).classList.add('fadein'); }); });
  if (then) at(300 + rows.length * step + 700, then);
}

// A number that counts up (band score, percentages)
function countUp(el, from, to, ms, fmt = v => v.toFixed(1)) {
  if (!el) return; const t0 = performance.now();
  const step = now => { const p = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1) requestAnimationFrame(step); };
  el.textContent = fmt(from); requestAnimationFrame(step);
}
// An arc that fills: the coloured stroke of a gauge
function fillArc(path, ms = 1200, delay = 0) {
  if (!path) return; const len = path.getTotalLength(); path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
  path.style.transition = `stroke-dashoffset ${ms}ms cubic-bezier(.3,.7,.2,1) ${delay}ms`; requestAnimationFrame(() => requestAnimationFrame(() => (path.style.strokeDashoffset = 0)));
}
const coloured = (svg, not = /#2A|#1E|#23|#26|#FFFFFF1|#302|#333|#2B/i) => [...svg.querySelectorAll('path')].filter(p => { const s = p.getAttribute('stroke') || ''; return s && s !== 'none' && !not.test(s); });

/* ---------------- shared start ---------------- */
screen('b0', sec => { personal(sec); statusBar(sec); ['Continue with Google', 'Log in with Facebook', 'Continue with Email'].forEach(t => tap(sec, t, () => go(S.path === 'A' ? 'learn/open' : 'b1'))); });

screen('b1', sec => {
  personal(sec); statusBar(sec);
  checklist(sec, ['How smoothly you spoke', 'The words you chose', 'Your grammar', 'How clearly you said each word', 'Evaluating your Band score'], 800, () => go('b2'));
});

screen('b2', sec => {
  personal(sec); statusBar(sec);
  const qm = find(sec, '?'); if (qm) qm.classList.add('qfill');
  at(2800, () => go(REVEAL[S.path]));
});

function reveal(sec, cta, next) {
  personal(sec); statusBar(sec);
  // Lead with where they are today; the gap to the target is the smaller line under it
  const eyebrow = find(sec, /^Your band today is/), head = find(sec, /away from|band score is/);
  const b = (+S.band || 6).toFixed(1), g = Math.max(0, (+S.target || 7) - (+S.band || 6));
  if (head) head.innerHTML = `Your current band<br>score is ${b}`;
  if (eyebrow && head) { eyebrow.textContent = g ? `${gap()} away from ${T()}` : `You’re at your target of ${T()}`; head.after(eyebrow); eyebrow.style.marginTop = '10px'; eyebrow.style.fontSize = '17px'; eyebrow.style.lineHeight = '24px'; eyebrow.style.color = '#B3B0C0'; }
  const num = byText(sec, '6.0').find(e => parseFloat(getComputedStyle(e).fontSize) > 40);
  countUp(num, 3, +S.band || 6, 1300);
  const svg = num?.closest('div[style*="height:290px"]')?.querySelector('svg') || sec.querySelector('svg:not([width="17"])');
  if (svg) coloured(svg).slice(0, 1).forEach(p => fillArc(p, 1300));
  const ctaEl = find(sec, cta); if (ctaEl) { const b = hit(ctaEl, 4); b.style.opacity = 0; at(1500, () => { b.style.transition = 'opacity .4s'; b.style.opacity = 1; }); onTap(b, () => go(next)); }
}
screen('b3', sec => reveal(sec, /^See my plan to/, 'p1'));
screen('c3', sec => reveal(sec, 'See my full report', 'c4'));
screen('d3', sec => reveal(sec, 'See my full report', 'd4'));

/* ---------------- shared paywall sequence ---------------- */
// Graph → paywall, as in the onboarding funnel: the empty curve waits, a dot rides the line to a
// first stop, then on to the target, and the whole graph settles up into the paywall.
const CURVE = 'M0 300 C50 292 80 280 120 268 C160 256 175 230 205 214 C240 196 262 200 290 186 C320 170 335 128 370 112 C385 106 395 104 402 104';
screen('p1', sec => {
  personal(sec); statusBar(sec);
  const svg = [...sec.querySelectorAll('svg')].find(s => +s.getAttribute('width') >= 400); if (!svg) return;
  const title = svg.previousElementSibling;
  const wrap = document.createElement('div'); wrap.className = 'gwrap'; svg.before(wrap); wrap.appendChild(svg);
  const mid = Math.round(((+S.band || 6) + (+S.target || 7)) / 2 * 2) / 2;
  svg.innerHTML = `<defs><linearGradient id="gA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6C63FF" stop-opacity=".45"/><stop offset="1" stop-color="#6C63FF" stop-opacity="0"/></linearGradient>
    <linearGradient id="gD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7B73FF" stop-opacity=".9"/><stop offset="1" stop-color="#7B73FF" stop-opacity="0"/></linearGradient>
    <clipPath id="gC"><rect id="gR" x="0" y="0" width="0" height="360"/></clipPath></defs>
    <path d="${CURVE}" fill="none" stroke="#2C2848" stroke-width="4"/>
    <g clip-path="url(#gC)"><path d="${CURVE} L402 360 L0 360 Z" fill="url(#gA)"/><path id="gL" d="${CURVE}" fill="none" stroke="#7B73FF" stroke-width="4" stroke-linecap="round"/></g>
    <rect id="gDrop" width="1.5" height="0" fill="url(#gD)" opacity="0"/>
    <circle id="gDot" r="9" fill="#FFFFFF" stroke="#7B73FF" stroke-width="4" cx="2" cy="300" style="transform-box:fill-box;transform-origin:center;transform:scale(0);transition:transform .35s cubic-bezier(.3,1.6,.5,1)"/>
    <text x="13" y="323" font-family="Geist" font-size="13" font-weight="500" fill="#7975AE">Today · ${(+S.band || 6).toFixed(1)}</text>`;
  const line = svg.querySelector('#gL'), rect = svg.querySelector('#gR'), dot = svg.querySelector('#gDot'), drop = svg.querySelector('#gDrop');
  const len = line.getTotalLength(), yAt = x => { let lo = 0, hi = len; for (let i = 0; i < 22; i++) { const m = (lo + hi) / 2; if (line.getPointAtLength(m).x < x) lo = m; else hi = m; } return line.getPointAtLength(lo).y; };
  const tip = x => { const y = yAt(x); rect.setAttribute('width', x + 3); dot.setAttribute('cx', x); dot.setAttribute('cy', y); drop.setAttribute('x', x - .75); drop.setAttribute('y', y); drop.setAttribute('height', 360 - y); };
  const tag = (x, small, big) => { const t = document.createElement('div'); t.className = 'gtag'; t.innerHTML = `<small>${small}</small><b>${big}</b>`; wrap.appendChild(t); const y = yAt(x); t.style.left = Math.min(402 - 118, Math.max(12, x - 55)) + 'px'; t.style.top = (80 + y - 72) + 'px'; requestAnimationFrame(() => t.classList.add('in')); return t; };
  const travel = (from, to, ms) => new Promise(r => { const t0 = performance.now(); const f = now => { const k = Math.min(1, (now - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; tip(from + (to - from) * e); if (k < 1) requestAnimationFrame(f); else r(); }; requestAnimationFrame(f); });
  const wait = ms => new Promise(r => at(ms, r));
  let alive = true; onLeave(() => { alive = false; });
  tip(2);
  (async () => {
    await wait(1100); if (!alive) return;
    dot.style.transform = 'scale(1)'; await wait(380);
    await travel(2, 205, 1100); if (!alive) return;
    drop.setAttribute('opacity', 1); const t1 = tag(205, `IN ${Math.round(days() / 2)} DAYS`, `Band ${mid.toFixed(1)}`); await wait(1800); if (!alive) return;
    t1.classList.remove('in'); drop.setAttribute('opacity', 0); await wait(300);
    await travel(205, 372, 1500); if (!alive) return;
    drop.setAttribute('opacity', 1); tag(372, `IN ${days()} DAYS`, `Band ${T()}`); await wait(2000); if (!alive) return;
    // settle: the whole curve is lit, then the graph rises and flattens into the paywall's header
    rect.setAttribute('width', 402); drop.setAttribute('opacity', 0);
    wrap.classList.add('merge'); if (title) title.classList.add('merge');
    await wait(650); if (alive) go(PAYWALL[S.path], 'none');
  })();
});
screen('p2', sec => { personal(sec); statusBar(sec); at(1400, () => go(PAYWALL[S.path])); });

function paywall(sec) {
  personal(sec); statusBar(sec);
  // "What's in your plan" slides in line by line
  const head = find(sec, /^What’s in your plan$/); const list = head?.parentElement;
  if (list) [...list.children].forEach((r, i) => { r.style.opacity = 0; at(250 + i * 220, () => r.classList.add('fadein')); at(250 + i * 220, () => (r.style.opacity = '')); });
  plans(sec);
  closeBtn(sec, () => go('gift'));
  tap(sec, /^(Unlock my plan|Unlock your plan to .*|Start my plan.*)$/, () => go('learn/open'));
  tap(sec, 'See all plans', () => toast(sec, 'All plans: monthly, 3 months, yearly'));
}
screen('p3', paywall); screen('c10', paywall); screen('d22', paywall);

// Yearly and monthly cards: tap to pick
function plans(sec) {
  const cards = ['PRO YEARLY', 'PRO MONTHLY'].map(t => find(sec, t)?.parentElement).filter(Boolean); if (cards.length < 2) return;
  const on = cards[0].getAttribute('style'), off = cards[1].getAttribute('style');
  cards.forEach((c, i) => onTap(c, () => cards.forEach((x, k) => x.setAttribute('style', k === i ? on : off))));
}
// The small × in the top left
function closeBtn(sec, fn) {
  const x = [...sec.querySelectorAll('div')].find(d => { const s = d.getAttribute('style') || ''; return /border-radius:50%/.test(s) && /width:30px/.test(s) && d.querySelector('svg'); });
  if (x) onTap(x, fn);
}

// Gift: the box wobbles until tapped; the lid flies off, the coupon rises, fireworks, then the offer
screen('gift', (sec, [state]) => {
  const scr = sec.querySelector('.giftscr'), cv = sec.querySelector('.fx-canvas'), ctx = cv.getContext('2d');
  let parts = [], raf = 0; const COLS = ['#D9A24A', '#E7B455', '#6C63FF', '#9D96FF', '#F5F4FA', '#32E18D', '#B09CFF'];
  const tick = () => { ctx.clearRect(0, 0, 402, 874); parts = parts.filter(p => p.life > 0);
    for (const p of parts) { p.px = p.x; p.py = p.y; p.x += p.vx; p.y += p.vy; p.vx *= .985; p.vy = p.vy * .985 + p.g; p.life -= p.decay;
      ctx.globalAlpha = Math.max(0, p.life); ctx.strokeStyle = p.c; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke(); }
    ctx.globalAlpha = 1; raf = parts.length ? requestAnimationFrame(tick) : 0; };
  const fireworks = () => [{ x: 402 * .3, y: 874 * .30, d: 0 }, { x: 402 * .72, y: 874 * .22, d: 380 }, { x: 402 * .5, y: 874 * .40, d: 760 }].forEach(sh => at(sh.d, () => {
    for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2 + Math.random() * .2, sp = 3.2 + Math.random() * 2.6; parts.push({ x: sh.x, y: sh.y, px: sh.x, py: sh.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: .055, c: COLS[i % COLS.length], life: 1, decay: .016 }); }
    if (!raf) tick(); }));
  onLeave(() => cancelAnimationFrame(raf));
  let opened = false;
  const open = () => { if (opened) return; opened = true; scr.classList.add('open'); if (!matchMedia('(prefers-reduced-motion:reduce)').matches) fireworks(); at(2600, () => go('p6')); };
  if (state === 'open') at(300, open); else scr.addEventListener('click', open);
});
screen('p4', sec => {
  personal(sec);
  sec.firstElementChild.classList.add('tap');
  const box = [...sec.querySelectorAll('svg')].find(s => +s.getAttribute('width') >= 120 && +s.getAttribute('width') < 300);
  if (box) box.style.animation = 'wiggle 1.6s ease-in-out infinite';
  if (!document.getElementById('wig')) document.head.insertAdjacentHTML('beforeend', '<style id="wig">@keyframes wiggle{0%,70%,100%{transform:rotate(0)}75%{transform:rotate(-4deg)}85%{transform:rotate(4deg)}92%{transform:rotate(-2deg)}}@keyframes popIn{from{transform:scale(.4) translateY(80px);opacity:0}60%{transform:scale(1.06)}}@keyframes lidOff{from{transform:translate(0,120px) rotate(0);opacity:.4}}</style>');
  sec.firstElementChild.addEventListener('click', () => go('p5'));
});
screen('p5', sec => {
  personal(sec);
  const svgs = [...sec.querySelectorAll('svg')];
  const coupon = find(sec, '50% OFF')?.closest('div[style*="border-radius"]');
  if (coupon) coupon.style.animation = 'popIn .7s cubic-bezier(.2,.9,.3,1.2) both';
  svgs.filter(s => +s.getAttribute('width') >= 100 && +s.getAttribute('width') < 300 && s.getBoundingClientRect().top < 260).forEach(s => (s.style.animation = 'lidOff .6s cubic-bezier(.2,.8,.2,1) both'));
  at(300, () => confetti(sec));
  at(2600, () => go('p6'));
});
screen('p6', sec => {
  personal(sec); statusBar(sec); plans(sec);
  // 24-hour countdown, starting when the offer was first seen
  if (!S.offerEnds) save({ offerEnds: Date.now() + (23 * 3600 + 12 * 60 + 5) * 1000 });
  const cells = ['23', '12', '05'].map(t => byText(sec, t).find(e => /font-size:17px/.test(e.getAttribute('style') || ''))).filter(Boolean);
  const tick = () => { const left = Math.max(0, Math.floor((S.offerEnds - Date.now()) / 1000)); const v = [Math.floor(left / 3600), Math.floor(left / 60) % 60, left % 60]; cells.forEach((c, i) => (c.textContent = String(v[i]).padStart(2, '0'))); };
  tick(); const iv = setInterval(tick, 1000); onLeave(() => clearInterval(iv));
  closeBtn(sec, () => go(S.path === 'C' ? 'learn/locked' : 'done/free'));
  tap(sec, /^Try Stimuler PRO for a year$/, () => go('learn/open'));
  tap(sec, 'See all plans', () => toast(sec, 'All plans: monthly, 3 months, yearly'));
});

/* ---------------- Path C: report free, plan locked ---------------- */
screen('c4', sec => { personal(sec); statusBar(sec); tap(sec, /^See your plan to/, () => go('c5')); byText(sec, /^Your recording$/).forEach(e => onTap(hit(e, 3), () => toast(sec, 'Playing your recording…'))); });
screen('c5', sec => { personal(sec); statusBar(sec); checklist(sec, [/^Fitting it to your exam in/, 'Focusing on pronunciation and grammar', 'Picking your daily mock tests', 'Adding surprise topics'], 800, () => go('learn/locked')); });
screen('c6', () => go('learn/locked')); screen('c7', () => go('learn/locked'));

/* ---------------- Learn tab: one scrolling screen, locked (Path C) or open (paid) ---------------- */
let c7html = null;
screen('learn', async (sec, [mode]) => {
  const open = mode === 'open';
  personal(sec); statusBar(sec);
  const root = sec.firstElementChild;
  const col = [...root.children].find(d => /flex-direction:column/.test(d.getAttribute('style') || '') && /padding-inline:20px/.test(d.getAttribute('style') || '') && d.textContent.includes('Unit 1'));
  if (!col) return;
  // the rest of the plan comes from the scrolled design
  c7html ||= await fetch('screens/c7.html').then(r => r.text());
  const tmp = document.createElement('div'); tmp.innerHTML = c7html;
  const rest = byText(tmp, 'Exam format and timing')[0]?.closest('div[style*="margin-top:14px"]');
  if (rest) col.appendChild(rest);
  personal(sec);
  Object.assign(col.style, { position: 'absolute', left: 0, right: 0, top: '120px', bottom: '86px', overflowY: 'auto', paddingBottom: '40px', scrollbarWidth: 'none' });
  col.classList.add('noscroll');

  // 3.1: the daily mock test gets the same big card as the other first items
  const lessonCard = find(col, 'How IELTS Speaking is scored')?.closest('div[style*="height:260px"]');
  const mockCard = find(col, 'Mock test + your weak spots')?.closest('div[style*="height:88px"]');
  const unit1 = find(col, 'Cities and places')?.closest('div[style*="height:236px"]') || find(col, S.test)?.closest('div[style*="height:236px"]');
  if (lessonCard && mockCard) {
    const big = lessonCard.cloneNode(true);
    const img = unit1 && unit1.getAttribute('style').match(/background-image:url\(([^)]+)\)/)?.[1];
    if (img) big.style.backgroundImage = `url(${img})`;
    big.style.backgroundPosition = '50% 20%'; big.style.flex = '1';
    if (unit1?.firstElementChild && big.firstElementChild) big.firstElementChild.setAttribute('style', unit1.firstElementChild.getAttribute('style'));
    byText(big, 'Lesson')[0].textContent = 'Mock test';
    byText(big, 'How IELTS Speaking is scored')[0].innerHTML = 'Mock test 2 · Friends and family<div style="font:400 14px/19px Geist,sans-serif;color:#D9D6EA;margin-top:4px">Then 10 minutes on your weak spots</div>';
    mockCard.replaceWith(big);
    const marker = big.previousElementSibling; if (marker) marker.style.alignSelf = 'flex-start';
  }

  if (open) {
    // everything is unlocked: bright rows, no locks, a start button on each big card
    col.querySelectorAll('svg').forEach(v => { const w = +v.getAttribute('width'); if (w && w <= 16 && v.closest('div[style*="height:64px"],div[style*="height:88px"]')) v.remove(); });
    col.querySelectorAll('div[style*="height:64px"],div[style*="height:88px"]').forEach(r => onTap(r, () => toast(sec, 'Opening ' + r.textContent.trim().replace(/\s+/g,' ') + '…')));
    const H = find(sec, /^Hey /); if (H) H.insertAdjacentHTML('afterend', '');
    col.querySelectorAll('div').forEach(d => {
      const st = d.getAttribute('style') || '';
      if (/background-color:#1A1A1D/.test(st)) d.style.backgroundColor = '#1B1A22';
      if (!d.children.length) { if (/color:#6E6C75/.test(st)) d.style.color = '#FFFFFF'; if (/color:#4E4C55/.test(st)) d.style.color = '#9A98A6'; if (/color:#5E5C66/.test(st)) d.style.color = '#9D96FF'; }
      if (/border-color:#2E2C33/.test(st)) d.style.borderColor = '#6C63FF';
      if (/background-color:#262429/.test(st)) d.style.backgroundColor = '#6C63FF';
    });
    byText(col, /^Unlock your plan to/).forEach(e => {
      const btn = e.parentElement; const isMock = !!btn.parentElement?.textContent.includes('Mock test 2');
      e.textContent = isMock ? 'Start mock test' : 'Start lesson';
      Object.assign(btn.style, { background: '#FFFFFF', borderColor: '#FFFFFF' }); e.style.color = '#14121A';
      btn.querySelector('svg')?.remove(); btn.insertAdjacentHTML('afterbegin', '<svg width="14" height="14" viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z" fill="#14121A"/></svg>');
      onTap(btn, () => toast(sec, isMock ? 'Starting mock test 2…' : 'Playing lesson…'));
    });
    const streak = find(sec, '1'); if (streak) streak.closest('div[style*="border-radius:8px"]')?.insertAdjacentHTML('beforebegin', '<div style="height:30px;display:flex;align-items:center;gap:4px;padding:0 12px;border-radius:999px;background:#17151F;border:1px solid #2E2A40;font:500 13px Geist,sans-serif;color:#E9E6F2;margin-left:auto;margin-right:8px">Stimuler <b style="color:#8B84FF">PRO</b></div>');
  } else {
    byText(col, /^Unlock your plan to/).forEach(e => onTap(e.parentElement, () => go('p1')));
    col.querySelectorAll('div[style*="height:64px"],div[style*="height:88px"],div[style*="height:260px"]').forEach(r => { if (!r.textContent.includes('Unlock')) onTap(r, () => go('p1')); });
    // show the free mock is done, then slide on to the locked plan
    at(2400, () => { const u2 = find(col, /^Unit 2/); if (u2) col.scrollTo({ top: u2.parentElement.offsetTop - 6, behavior: 'smooth' }); });
  }
  byText(col, /See report$/).forEach(e => onTap(e, () => go(S.path === 'C' ? 'c4' : 'd4')));
});

/* ---------------- Path D ---------------- */
screen('d4', sec => { personal(sec); statusBar(sec); tap(sec, 'Continue', () => go('d5')); });
screen('d5', sec => { personal(sec); statusBar(sec); at(2600, () => go('d6')); });
screen('d6', sec => {
  personal(sec); statusBar(sec);
  ['working', 'marketing', 'looking'].forEach((w, i) => { const e = find(sec, w); const box = e?.getAttribute('style')?.includes('border') ? e : e?.parentElement; if (box) { box.style.opacity = 0; at(300 + i * 450, () => { box.style.transition = 'opacity .35s'; box.style.opacity = 1; }); } });
  at(3000, () => go('d7'));
});
screen('d7', sec => { personal(sec); statusBar(sec); at(1900, () => go('d8', 'up')); });
screen('d8', sec => { statusBar(sec); drillBar(sec); at(2400, () => go('d9')); });

// The drill's progress bar fills a little more on each screen
function drillBar(sec) { const fill = [...sec.querySelectorAll('div')].find(d => /height:(6|7|8)px/.test(d.getAttribute('style') || '') && /width:round\(|width:\d+%/.test(d.getAttribute('style') || '')); if (fill) { const w = fill.style.width; fill.style.transition = 'none'; fill.style.width = (parseFloat(w) * .75) + '%'; requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.transition = 'width .7s cubic-bezier(.2,.8,.2,1)'; fill.style.width = w; })); } }
// The mic: tap, it listens for a moment, then the result screen
function mic(sec, next, label = /^Tap and say it$/) {
  const lbl = find(sec, label); const btn = lbl?.previousElementSibling || lbl?.parentElement?.querySelector('div[style*="border-radius:50%"],div[style*="border-radius:999px"]');
  if (!btn) return; let on = false; const say = () => { if (on) return; on = true; btn.classList.add('mic-live'); lbl.textContent = 'Listening…'; at(1700, () => go(next)); }; onTap(btn, say); onTap(lbl, say);
}
function gaugeIn(sec) { const svg = [...sec.querySelectorAll('svg')].find(s => +s.getAttribute('width') >= 180); if (svg) coloured(svg, /#2A|#26|#23|#1E|#333|#2B|#FFFFFF1/i).forEach(p => fillArc(p, 900)); const pct = byText(sec, /^\d+%$/)[0]; if (pct) countUp(pct, 0, parseFloat(pct.textContent), 900, v => Math.round(v) + '%'); }
screen('d9', sec => { statusBar(sec); drillBar(sec); gaugeIn(sec); tap(sec, 'Hear it first', () => { speak('marketing'); go('d10'); }); mic(sec, 'd11'); });
screen('d10', sec => { statusBar(sec); speak('marketing'); at(1900, () => go('d9')); });
screen('d11', sec => { statusBar(sec); drillBar(sec); gaugeIn(sec); at(2400, () => go('d12')); });
screen('d12', sec => { statusBar(sec); drillBar(sec); at(2800, () => go('d13')); });
screen('d13', sec => { statusBar(sec); drillBar(sec); speak('ng'); at(2800, () => go('d14')); });
screen('d14', sec => { statusBar(sec); drillBar(sec); at(1900, () => go('d15')); });
screen('d15', sec => { statusBar(sec); drillBar(sec); tap(sec, 'Hear it', () => go('d16')); at(3500, () => go('d16')); });
screen('d16', sec => { statusBar(sec); speak('making'); at(1900, () => go('d17')); });
screen('d17', sec => { statusBar(sec); drillBar(sec); gaugeIn(sec); tap(sec, 'Hear it', () => speak('making')); mic(sec, 'd18'); });
screen('d18', sec => {
  statusBar(sec); drillBar(sec); gaugeIn(sec); at(200, () => confetti(sec));
  const lbl = find(sec, 'Tap to continue'); const btn = lbl?.previousElementSibling; if (btn) onTap(btn, () => go('d19a')); if (lbl) onTap(lbl, () => go('d19a'));
});
screen('d19a', sec => {
  statusBar(sec);
  const to = find(sec, '52%'); if (to) countUp(to, 44, 52, 1200, v => Math.round(v) + '%');
  at(2600, () => go('d19c', 'up'));
});
screen('d19b', () => go('d19c'));
// The plan builds on its own screen: rows tick in one by one, then the button appears
screen('d19c', sec => {
  personal(sec); statusBar(sec);
  const cta = find(sec, /^See my plan to/); const b = cta && hit(cta, 4); if (b) { b.style.opacity = 0; b.style.transition = 'opacity .4s'; onTap(b, () => go('p1')); }
  checklist(sec, ['Days 1–3 · learn the exam inside out', 'A mock test every day, then drills like this one', 'Surprise topics, so no question is new', 'Reading and writing practice too'], 700, () => { if (b) b.style.opacity = 1; });
});

/* ---------------- the end of every path ---------------- */
screen('done', (sec, [kind]) => {
  const paid = kind === 'paid';
  sec.innerHTML = `<div style="width:402px;height:874px;background:#0B0A12;background-image:radial-gradient(ellipse 80% 45% at 50% 0%,#2B2566 0%,#0B0A12 70%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:0 32px;text-align:center;color:#fff;font-family:Geist,sans-serif">
    <div class="fadein" style="display:flex;gap:4px;align-items:center;height:30px;padding:0 14px;border-radius:999px;background:#17151F;border:1px solid #2E2A40;font-size:13px;color:#E9E6F2">Stimuler <b style="color:#8B84FF">${paid ? 'PRO' : 'FREE'}</b></div>
    <div class="fadein" style="font:600 32px/38px 'InterDisplay-SemiBold','Inter Display',sans-serif;letter-spacing:-.02em;animation-delay:.1s">${paid ? `You’re in, ${S.name}.` : `Your report is saved, ${S.name}.`}</div>
    <div class="fadein" style="font-size:16px;line-height:23px;color:#B3B0C0;animation-delay:.2s">${paid ? `Your plan to band ${T()} starts today. ${days()} days until your exam.` : 'You can unlock your plan any time from the Learn tab. The offer stays for 24 hours.'}</div>
    <div class="fadein" style="margin-top:24px;animation-delay:.3s"><button id="again" style="height:52px;padding:0 28px;border-radius:999px;border:0;background:#6C63FF;color:#fff;font:600 16px Geist,sans-serif;cursor:pointer">Try this path again</button></div>
    <div class="fadein" style="font-size:13px;color:#6E6884;animation-delay:.4s">Prototype end · Path ${S.path}</div></div>`;
  sec.querySelector('#again').addEventListener('click', () => { save({ offerEnds: 0 }); go('b0'); });
});

start();
