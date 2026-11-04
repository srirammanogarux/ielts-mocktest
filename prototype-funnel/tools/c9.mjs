import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const base=process.argv[2]||'http://localhost:8790';
const b=await chromium.launch({executablePath:exe});
for(const [w,touch] of [[340,false],[402,true],[1440,false]]){
  const p=await b.newPage({viewport:{width:w,height:800},hasTouch:touch,isMobile:touch}); await p.goto(base+'/#/landing'); await p.waitForTimeout(1200);
  const sel='.bp:not([style*="none"]) .flip-inner'; const loc=p.locator(w<600?'.bp-mobile .flip-inner':w<1100?'.bp-tablet .flip-inner':'.bp-desktop .flip-inner'); await loc.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  if(touch) await loc.tap(); else await loc.click(); await p.waitForTimeout(900);
  console.log(w, touch?'tap':'click', await loc.evaluate(e=>e.classList.contains('flipped')));
  await p.screenshot({path:`.context/tmp/proto/flip-${w}.png`}); await p.close(); }
await b.close();
