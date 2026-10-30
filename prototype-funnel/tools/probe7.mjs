import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe}); const p=await b.newPage({viewport:{width:340,height:800}});
await p.goto('http://localhost:8790/#/landing'); await p.waitForTimeout(1200);
console.log(await p.evaluate(()=>[...document.querySelectorAll('.flip-wrap')].map(w=>w.closest('.bp').className+' '+w.getAttribute('style')+' vis='+!!w.offsetParent+' '+JSON.stringify(w.getBoundingClientRect()))));
await b.close();
