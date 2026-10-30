import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const base=process.argv[2]||'http://localhost:8790'; const o='.context/tmp/proto/';
const b=await chromium.launch({executablePath:exe});
for(const [w,h,t,touch] of [[1440,900,'d',false],[834,1112,'t',true],[402,874,'m',true]]){
  const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch}); const p=await ctx.newPage(); p.on('pageerror',e=>console.log(t,'ERR',e.message));
  await p.goto(base+'/?test=Your%20work%20or%20studies#/picked'); await p.waitForTimeout(1000);
  await p.evaluate(()=>{ const e=[...document.querySelectorAll('.bp *')].find(e=>e.offsetParent&&!e.children.length&&e.textContent.trim()==='Start this test'); e.click(); }); await p.waitForTimeout(1200);
  await p.screenshot({path:o+`o1a-${t}.png`});
  await p.locator('.bp input:visible').fill('meera'); await p.waitForTimeout(200); await p.screenshot({path:o+`o1b-${t}.png`});
  await p.keyboard.press('Enter'); await p.waitForTimeout(1200); await p.screenshot({path:o+`o2a-${t}.png`});
  await p.evaluate(()=>{ const e=[...document.querySelectorAll('.bp *')].find(e=>e.offsetParent&&!e.children.length&&e.textContent.trim()==='In 2 weeks'); e.parentElement.click(); }); await p.waitForTimeout(300); await p.screenshot({path:o+`o2b-${t}.png`});
  await p.waitForTimeout(1500); 
  const tr=await p.evaluate(()=>{ const th=[...document.querySelectorAll('.bp [role=slider]')].find(e=>e.offsetParent); const r=th.parentElement.getBoundingClientRect(); return [r.x,r.y,r.width,r.height]; });
  await p.mouse.move(tr[0]+tr[2]*0.5,tr[1]+tr[3]/2); await p.mouse.down(); await p.mouse.move(tr[0]+tr[2]*0.8,tr[1]+tr[3]/2,{steps:8}); await p.mouse.up(); await p.waitForTimeout(900);
  await p.screenshot({path:o+`o3-${t}.png`});
  console.log(t, await p.evaluate(()=>localStorage.getItem('ielts-funnel')));
  await ctx.close();
}
await b.close();
