import {chromium} from 'playwright';
const CH=process.env.HOME+'/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const [,,routes='landing',sizes='d,t,m',full='1',out='.context/tmp/proto']=process.argv;
const S={d:[1440,900],t:[834,1112],m:[402,874]};
const b=await chromium.launch({executablePath:CH});
import fs from 'fs'; fs.mkdirSync(out,{recursive:true});
for(const r of routes.split(',')) for(const s of sizes.split(',')){
  const [w,h]=S[s]; const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto(`http://localhost:8790/#/${r}`,{waitUntil:'networkidle'}); await p.waitForTimeout(700);
  await p.screenshot({path:`${out}/${r.replace(/\//g,'_')}-${s}.png`,fullPage:full==='1'});
  if(errs.length) console.log(r,s,'ERR',errs.slice(0,3));
  await p.close();
}
await b.close(); console.log('done');
