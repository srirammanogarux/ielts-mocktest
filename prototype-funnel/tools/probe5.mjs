import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe}); const p=await b.newPage({viewport:{width:402,height:874},hasTouch:true,isMobile:true});
await p.goto('http://localhost:8790/#/deck'); await p.waitForTimeout(1800);
const m=()=>p.evaluate(()=>{ const e=[...document.querySelectorAll('.bp-mobile *')].find(e=>!e.children.length&&e.textContent.trim()==='All tests'); const r=e.parentElement.parentElement; const b=r.getBoundingClientRect(); return JSON.stringify({cls:r.className,h:b.height,top:b.top,disp:getComputedStyle(r).display,style:r.getAttribute('style'),kids:r.children.length}); });
console.log(await m());
await b.close();
