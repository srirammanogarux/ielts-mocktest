import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe}); const p=await b.newPage({viewport:{width:1440,height:900}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8790/#/deck'); await p.waitForTimeout(1000);
await p.getByText('Home and hometown').locator('visible=true').first().click(); await p.waitForTimeout(1500);
await p.screenshot({path:'.context/tmp/proto/c2.png'}); await b.close();
