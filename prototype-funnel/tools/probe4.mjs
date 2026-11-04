import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe}); const p=await b.newPage({viewport:{width:412,height:880},hasTouch:true,isMobile:true});
await p.goto('http://localhost:8790/#/landing'); await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>{ const w=document.querySelector('.bp-mobile .flip-wrap'); const r=e=>{const b=e.getBoundingClientRect();return [Math.round(b.left),Math.round(b.width),Math.round(b.height)]}; const i=w.firstChild; return JSON.stringify({wrap:r(w),wstyle:w.getAttribute('style'),inner:r(i),front:r(i.children[0]),back:r(i.children[1]),backStyle:i.children[1].getAttribute('style').slice(0,300)}); }));
await b.close();
