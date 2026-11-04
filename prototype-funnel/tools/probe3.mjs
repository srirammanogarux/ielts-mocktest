import {chromium} from 'playwright';
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe}); const p=await b.newPage({viewport:{width:402,height:874},hasTouch:true,isMobile:true});
for(const r of ['deck']){
await p.goto('http://localhost:8790/#/'+r); await p.waitForTimeout(1200);
console.log(r, await p.evaluate(()=>{ const out=[]; const fs=[...document.querySelectorAll('.bp-mobile .folder')];
 const rows=new Set(fs.map(f=>f.parentElement)); for(const row of rows) out.push('ROW kids='+row.children.length+' '+row.getAttribute('style')+' || parent '+row.parentElement.getAttribute('style')?.slice(0,200));
 out.push('folder '+fs[0]?.getAttribute('style'));
 const g=[...document.querySelectorAll('.bp-mobile *')].find(e=>e.textContent.trim()==='Grace'&&!e.children.length); let c=g; for(let i=0;i<6;i++){ c=c.parentElement; out.push('up'+i+' '+c.getAttribute('style')?.replace(/url\([^)]*\)/,'').slice(0,220)+' sw='+c.scrollWidth+' cw='+c.clientWidth); }
 return out.join('\n'); }));
}
await b.close();
