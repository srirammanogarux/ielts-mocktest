import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe});
for(const [w,t] of [[1440,'desktop'],[834,'tablet']]){ const p=await b.newPage({viewport:{width:w,height:900}}); await p.goto('http://localhost:8790/#/landing'); await p.waitForTimeout(1200);
console.log(t, await p.evaluate(t=>{ const c=document.querySelector(`.bp-${t} .tilt`); const out=[]; let n=c; for(let i=0;i<6;i++){ n=n.parentElement; const r=n.getBoundingClientRect(); const cs=getComputedStyle(n); out.push(`${i} ${cs.overflow} ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} ${(n.getAttribute('style')||'').slice(0,160)}`); } const cards=[...document.querySelectorAll(`.bp-${t} .tilt`)].map(e=>{const r=e.getBoundingClientRect(); return `${e.textContent.trim().split(/\s+/)[0]} ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`}); return out.join('\n')+'\n'+cards.join('\n'); },t)); await p.close(); }
await b.close();
