import {chromium} from '../../node_modules/playwright/index.mjs';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const base=process.env.BASE||'http://localhost:8790', o='/Users/sriram/conductor/workspaces/ielts-mocktest/amman/.context/tmp/resp/';
const routes=(process.argv[2]||'landing,deck,picked,onboarding,exam,band,test,result,offer,signup,paid,getapp,inapp').split(',');
const sizes=(process.argv[3]||'360x740,402x874,600x960,768x1024,834x1194,1024x768,1024x1366,1099x800,1180x820,1280x800,1440x900,1920x1080').split(',');
const shots=process.argv[4]==='shots';
const b=await chromium.launch({executablePath:exe});
for(const sz of sizes){ const [w,h]=sz.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:w,height:h},isMobile:w<1024,hasTouch:w<1024}); const p=await ctx.newPage();
  for(const r of routes){ await p.goto(`${base}/?beat=q1#/${r}`); await p.waitForTimeout(r==='test'?5200:900);
    const res=await p.evaluate(()=>{ const out={}; const vw=innerWidth;
      out.hscroll=document.documentElement.scrollWidth>vw+2?document.documentElement.scrollWidth:0;
      const sec=[...document.querySelectorAll('.bp')].find(s=>s.offsetParent)||document.querySelector('.stage');
      const root=sec?.firstElementChild||sec; const z=parseFloat(getComputedStyle(root).zoom)||1; out.zoom=+z.toFixed(2); out.bp=sec?.className;
      out.pageH=document.documentElement.scrollHeight;
      let minFont=99; for(const e of document.querySelectorAll('#app *')){ if(!e.offsetParent||e.children.length||!e.textContent.trim()) continue; const f=parseFloat(getComputedStyle(e).fontSize)*z; if(f<minFont) minFont=f; } out.minFont=+minFont.toFixed(1);
      return out; });
    console.log(sz.padEnd(10),r.padEnd(11),JSON.stringify(res));
    if(shots) await p.screenshot({path:`${o}${r}-${sz}.png`}); }
  await ctx.close(); }
await b.close();
