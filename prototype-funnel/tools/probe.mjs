import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe}); const p=await b.newPage({viewport:{width:+process.argv[3]||1440,height:900}});
await p.goto('http://localhost:8790/#/'+process.argv[2]); await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{ const out=[]; for(const f of [...document.querySelectorAll('.folder')].filter(f=>f.offsetParent).slice(0,3)){ out.push('FOLDER '+f.getAttribute('style')); for(const k of f.children) out.push('  ['+k.className+'] '+(k.getAttribute('style')||'').replace(/url\([^)]*\)/g,'url()').slice(0,400)); const front=f.querySelector('.f-front'); if(front) out.push('  FRONT HTML '+front.innerHTML.replace(/\s+/g,' ').slice(0,900)); } return out.join('\n'); });
console.log(r); await b.close();
