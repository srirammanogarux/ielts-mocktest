import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe});
for(const [w,h,t] of [[1440,900,'d'],[402,874,'m']]){ const p=await b.newPage({viewport:{width:w,height:h}});
await p.goto('http://localhost:8790/?beat=q3#/test'); const v=()=>p.evaluate(()=>document.querySelector('#fN video').paused);
await p.waitForTimeout(1500); console.log(t,'asking paused?',await v());
await p.waitForTimeout(4500); console.log(t,'mic ready paused?',await v());
await p.evaluate(()=>document.querySelector('[data-act=mic]').click()); await p.waitForTimeout(800); console.log(t,'recording paused?',await v());
await p.screenshot({path:`.context/tmp/test/v-${t}.png`});
await p.evaluate(()=>document.querySelector('[data-act=done]').click()); await p.waitForTimeout(1200); console.log(t,'next question paused?',await v());
await p.close(); }
await b.close();
