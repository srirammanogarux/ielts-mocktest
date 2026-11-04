import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const base=process.argv[2]||'http://localhost:8790'; const o='.context/tmp/proto/';
const b=await chromium.launch({executablePath:exe});
for(const [w,h,t,touch] of [[1440,900,'d',false],[402,874,'m',true]]){
const p=await b.newPage({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch}); p.on('pageerror',e=>console.log(t,'ERR',e.message));
await p.goto(base+'/#/landing'); await p.waitForTimeout(1200); await p.screenshot({path:o+'h-'+t+'.png'});
await p.goto(base+'/#/deck'); await p.waitForTimeout(1500);
const chip=async n=>{ await p.evaluate(n=>{ const e=[...document.querySelectorAll('.bp *')].find(e=>e.offsetParent&&!e.children.length&&e.textContent.trim()===n); e.parentElement.click(); },n); await p.waitForTimeout(500); };
await chip('People'); await p.screenshot({path:o+'f-people-'+t+'.png'});
await chip(t==='d'?'Technology':'Places'); await p.screenshot({path:o+'f-tech-'+t+'.png'});
await chip('All tests'); await p.waitForTimeout(600); await p.screenshot({path:o+'f-all-'+t+'.png'});
if(t==='d'){ const f=p.locator('.bp-desktop .folder').nth(1); const bx=await f.boundingBox(); await p.mouse.move(bx.x+100,bx.y+200); await p.waitForTimeout(150); await p.screenshot({path:o+'f-hov1.png',clip:{x:bx.x-20,y:bx.y-60,width:340,height:460}}); await p.waitForTimeout(500); await p.screenshot({path:o+'f-hov2.png',clip:{x:bx.x-20,y:bx.y-60,width:340,height:460}}); }
await p.close(); }
await b.close();
