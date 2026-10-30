import {chromium} from '../../node_modules/playwright/index.mjs';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const base=process.env.BASE||'http://localhost:8791'; const o='/Users/sriram/conductor/workspaces/ielts-mocktest/amman/.context/tmp/app/r-';
const [w,h]=(process.argv[3]||'1280x900').split('x').map(Number);
const b=await chromium.launch({executablePath:exe}); const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:w<600,isMobile:w<600}); const p=await ctx.newPage();
p.on('pageerror',e=>console.log('ERR',e.message));
const steps=JSON.parse(process.argv[2]); // [["goto","?path=B#/b0"],["wait",1000],["shot","b0"],["click","text"]]
for(const [k,v] of steps){
  if(k==='goto') await p.goto(base+'/'+v);
  if(k==='wait') await p.waitForTimeout(v);
  if(k==='shot') await p.screenshot({path:o+v+'.png'});
  if(k==='hash') console.log('at', await p.evaluate(()=>location.hash));
  if(k==='click'){ const ok=await p.evaluate(t=>{ const re=t.startsWith('/')?new RegExp(t.slice(1,-1)):null; const e=[...document.querySelectorAll('#app .bp-app:last-child *')].filter(e=>!e.children.length&&(re?re.test(e.textContent.trim()):e.textContent.trim()===t)).pop(); if(!e) return false; e.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true})); return true; },v); if(!ok) console.log('NOT FOUND',v); }
  if(k==='clickxy'){ await p.mouse.click(v[0],v[1]); }
}
await b.close();
