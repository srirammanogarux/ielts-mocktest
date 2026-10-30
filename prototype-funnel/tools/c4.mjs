import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe}); const p=await b.newPage({viewport:{width:1440,height:900}});
p.on('pageerror',e=>console.log('ERR',e.message,e.stack));p.on('console',m=>console.log('C',m.text()));
await p.goto('http://localhost:8790/#/landing'); await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>[document.querySelectorAll('.folder').length, document.querySelector('.bp-desktop')?.innerHTML.length, [...document.querySelectorAll('.bp-desktop *')].filter(e=>/Test 12/.test(e.textContent)&&!e.children.length).map(e=>e.offsetParent?'vis':'hid')]));
await b.close();
