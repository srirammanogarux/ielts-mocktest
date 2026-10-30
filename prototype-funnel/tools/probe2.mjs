import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe}); const p=await b.newPage({viewport:{width:+process.argv[3]||1440,height:900}});
await p.goto('http://localhost:8790/#/'+process.argv[2]); await p.waitForTimeout(1200);
const r=await p.evaluate((q)=>{ const sec=[...document.querySelectorAll('.bp')].find(s=>s.offsetParent); const out=[];
  const find=t=>[...sec.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()===t);
  for(const [t,up] of JSON.parse(q)){ let e=find(t); if(!e){out.push('NOTFOUND '+t);continue;} for(let i=0;i<up;i++) e=e.parentElement; out.push('=== '+t+'\n'+e.outerHTML.replace(/url\([^)]*\)/g,'url()').replace(/<path d="[^"]*"/g,'<path').replace(/\s+/g,' ').slice(0,2500)); }
  return out.join('\n'); }, process.argv[4]);
console.log(r); await b.close();
