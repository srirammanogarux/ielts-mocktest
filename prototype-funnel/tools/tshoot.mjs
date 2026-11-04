import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const base=process.env.BASE||'http://localhost:8790'; const o='.context/tmp/test/';
const sizes={m:[402,874,true],t:[834,1112,true],d:[1440,900,false]};
const want=(process.argv[2]||'m,t,d').split(','); const beats=(process.argv[3]||'s1,s2,m1,m3,n1,q1,q1rec,p2c,p2p,p2t,r1,t6,c1,m2,e1').split(',');
const b=await chromium.launch({executablePath:exe});
for(const s of want){ const [w,h,touch]=sizes[s];
  const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch}); const p=await ctx.newPage();
  p.on('pageerror',e=>console.log(s,'ERR',e.message)); p.on('console',m=>{ if(m.type()==='error') console.log(s,'CONSOLE',m.text()); });
  for(const bt of beats){ const id=bt.replace('rec','');
    await p.goto(`${base}/?name=Priya&beat=${id}#/test`); await p.waitForTimeout(bt==='t6'||bt==='s1'||bt==='n1'?3500:bt.startsWith('q')||bt.startsWith('r')?3800:1600);
    if(bt.endsWith('rec')){ await p.evaluate(()=>document.querySelector('[data-act="mic"]')?.click()); await p.waitForTimeout(2200); }
    if(bt==='p2p'){ await p.evaluate(()=>{ const i=document.querySelectorAll('.note-in'); i[0].value='Kyoto, Japan'; i[1].value='saw it in a film'; i[2].focus(); i[2].value='temples, night walks'; }); await p.waitForTimeout(300); }
    if(bt==='c1') await p.waitForTimeout(2500);
    await p.screenshot({path:`${o}${s}-${bt}.png`}); }
  await ctx.close(); }
await b.close(); console.log('done');
