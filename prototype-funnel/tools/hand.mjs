import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const base=process.env.BASE||'http://localhost:8790'; const o='.context/tmp/proto/h-';
const b=await chromium.launch({executablePath:exe});
for(const [w,h,t,touch] of [[1440,900,'d',false],[402,874,'m',true],[834,1112,'t',true]]){
  const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch}); const p=await ctx.newPage();
  p.on('pageerror',e=>console.log(t,'ERR',e.message));
  const click=async txt=>{ const ok=await p.evaluate(txt=>{ const e=[...document.querySelectorAll('.bp *')].filter(e=>e.offsetParent&&!e.children.length&&e.textContent.trim()===txt).pop(); if(!e) return false; e.scrollIntoView({block:'center'}); e.click(); return true; },txt); if(!ok) console.log(t,'NOT FOUND',txt); await p.waitForTimeout(900); };
  // Path A, exam in 2 months
  await p.goto(base+'/?path=A&exam=2m&name=Meera&test=Your%20work%20or%20studies#/result'); await p.waitForTimeout(1200); await p.screenshot({path:o+t+'-1result.png'});
  await click('See my full report in the app'); await p.screenshot({path:o+t+'-2offer.png'});
  await click('2 months'); await p.waitForTimeout(300); await p.screenshot({path:o+t+'-3offer-picked.png'});
  await click('Pay ₹799'); await p.waitForTimeout(1900); await p.screenshot({path:o+t+'-4paying.png'}); await p.waitForTimeout(1400); await p.screenshot({path:o+t+'-5paid.png'});
  await click('Continue with Google'); await p.screenshot({path:o+t+'-6inapp.png'});
  // free path
  await p.goto(base+'/?path=B#/result'); await p.waitForTimeout(1000); await click('See my full report in the app'); await p.screenshot({path:o+t+'-7signup.png'});
  await click('Create account'); await p.screenshot({path:o+t+'-8signup-err.png'});
  console.log(t, p.url());
  await ctx.close(); }
await b.close();
