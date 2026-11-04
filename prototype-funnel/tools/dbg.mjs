import {chromium} from '/Users/sriram/conductor/workspaces/ielts-mocktest/amman/node_modules/playwright/index.mjs';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe}); const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('http://localhost:8790/?beat=q2#/test');
for(let i=0;i<8;i++){ await p.waitForTimeout(1000); console.log(i+1, await p.evaluate(()=>[!!document.querySelector('[data-act=mic]'),!!document.querySelector('#rt'),document.activeElement.tagName])); }
await p.keyboard.press('Space'); await p.waitForTimeout(1500); console.log('after space', await p.evaluate(()=>[!!document.querySelector('#rt'),document.querySelector('#rt')?.textContent]));
await b.close();
