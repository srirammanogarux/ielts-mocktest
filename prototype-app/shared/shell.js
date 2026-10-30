// A tiny router for the app prototype: #/<screen>. Each screen is one Paper artboard (402×874).
const app = document.getElementById('app'), phone = document.getElementById('phone');
const cache = {}, behaviours = {}; let timers = [], leaving = [];
export const screen = (name, fn) => { behaviours[name] = fn; };
export const at = (ms, fn) => timers.push(setTimeout(fn, ms));
export const onLeave = fn => leaving.push(fn);
export function go(route, how) { goHow = how || ''; if (location.hash === '#/' + route) render(); else location.hash = '#/' + route; }
let goHow = '';

// Phone size: full screen below 600px wide, otherwise a frame that fits the window height
function fit() {
  const small = innerWidth < 600;
  const chips = small ? document.getElementById('chips').offsetHeight : 0;
  const z = small ? innerWidth / 402 : Math.min(1, (innerHeight - 60) / 874);
  document.documentElement.style.setProperty('--pw', (201 * z) + 'px');
  const h = small ? (innerHeight - chips) / z : 874;
  app.style.zoom = z; app.style.height = h + 'px';
  phone.style.width = 402 * z + 'px'; phone.style.height = h * z + 'px';
  // on wider screens the phone and the chips sit side by side, centred together as one group
  const ch = document.getElementById('chips');
  if (!small) { const pw = 402 * z, cw = Math.min(230, Math.max(150, innerWidth - pw - 80)), gw = pw + 40 + cw, x0 = Math.max(16, (innerWidth - gw) / 2);
    phone.style.left = (x0 + pw / 2) + 'px'; ch.style.left = (x0 + pw + 40) + 'px'; ch.style.width = cw + 'px'; }
  else { phone.style.left = ''; ch.style.left = ''; ch.style.width = ''; }
  app.querySelectorAll('.bp-app>*').forEach(r => { r.style.height = h + 'px'; });
}
addEventListener('resize', fit);

async function load(name) {
  if (!cache[name]) { const r = await fetch('screens/' + name + '.html'); cache[name] = r.ok ? await r.text() : `<section class="bp bp-app"><div style="padding:120px 28px;color:#fff">Missing screen: ${name}</div></section>`; }
  return cache[name];
}
export async function render() {
  timers.forEach(clearTimeout); timers = []; leaving.forEach(f => f()); leaving = [];
  const [name, ...args] = (location.hash.replace(/^#\//, '') || 'b0').split('/');
  const html = await load(name);
  const old = app.querySelector('.bp-app');
  const holder = document.createElement('div'); holder.innerHTML = html;
  const sec = holder.querySelector('.bp-app'); if (!sec) return;
  const how = goHow; goHow = '';
  if (how !== 'none') sec.classList.add(how === 'up' ? 'slideup' : 'enter');
  if (old) { if (how === 'none') old.remove(); else { old.classList.add('leave'); setTimeout(() => old.remove(), 300); } }
  app.appendChild(sec); fit();
  if (behaviours[name]) behaviours[name](sec, args);
  dispatchEvent(new CustomEvent('screen', { detail: location.hash.replace(/^#\//, '') }));
}
addEventListener('hashchange', render);
export function start() { fit(); render(); }
