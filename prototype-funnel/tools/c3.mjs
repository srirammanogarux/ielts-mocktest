import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe}); const o='.context/tmp/proto/';
for(const [w,h,tag] of [[1440,900,'d'],[834,1100,'t'],[402,874,'m']]){
  const p=await b.newPage({viewport:{width:w,height:h}}); p.on('pageerror',e=>console.log(tag,'ERR',e.message));
  await p.goto('http://localhost:8790/#/landing'); await p.waitForTimeout(1200);
  const shot=async(t,n)=>{ await p.evaluate(t=>{ const e=[...document.querySelectorAll('.bp *')].find(e=>e.offsetParent&&!e.children.length&&e.textContent.trim().startsWith(t)); e?.scrollIntoView({block:'center'}); },t); await p.waitForTimeout(1800); await p.screenshot({path:o+n+'-'+tag+'.png'}); };
  await shot('Grace','ex'); if(tag==='d'){ const g=p.getByText('Nolan',{exact:true}).locator('visible=true').first(); const bx=await g.boundingBox(); await p.mouse.move(bx.x+10,bx.y-150); await p.waitForTimeout(400); await p.screenshot({path:o+'exh-d.png'}); }
  await shot('Test 12 · People','fold');
  await shot('Could you talk about this for 2 minutes?','cue');
  await shot('Sample · Band score','score');
  await shot('Who are the examiners?','faq');
  await p.goto('http://localhost:8790/#/deck'); await p.waitForTimeout(1200); await p.screenshot({path:o+'deck2-'+tag+'.png'});
  await p.goto('http://localhost:8790/?test=Your%20work%20or%20studies#/picked'); await p.waitForTimeout(1500); await p.screenshot({path:o+'pick2-'+tag+'.png'});
  await p.close();
}
await b.close();
