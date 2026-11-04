// Pull screens from Paper and write prototype fragments: screens/<name>.html
// Each screen can have desktop / tablet / mobile variants (or a single "app" variant).
import {init,call} from './mcp.mjs';
import {jsxToHtml} from './convert.mjs';
import fs from 'fs'; import path from 'path';
const F='01M115D40KNA1X9ZGFMJJKZBT9';
const ROOT=path.resolve('..'); const IMG=path.join(ROOT,'assets/img');
const map=JSON.parse(fs.readFileSync(process.argv[2]||'screens.json','utf8'));
const only=process.argv[3]?process.argv[3].split(','):null;
await init();
async function fetchImg(url){
  const base=path.basename(url.split('?')[0]); const out=path.join(IMG,base);
  if(!fs.existsSync(out)){ const r=await fetch(url); fs.writeFileSync(out,Buffer.from(await r.arrayBuffer())); }
  return 'assets/img/'+base;
}
async function rewrite(html){
  const urls=[...new Set(html.match(/https:\/\/app\.paper\.design\/file-assets\/[^)"'&\s]+/g)||[])];
  for(const u of urls){ html=html.split(u).join(await fetchImg(u)); }
  html=html.replace(/paper-asset:\/\/[^"')&]*\/([^/"')&]+)/g,'assets/img/$1');
  return html;
}
for(const [name,variants] of Object.entries(map)){
  if(only&&!only.includes(name)) continue;
  let out=`<!-- synced from Paper: ${name} -->\n`;
  for(const [bp,id] of Object.entries(variants)){
    const r=await call('get_jsx',{fileId:F,nodeId:id,format:'inline-styles'});
    const jsx=r.content.map(c=>c.text).filter(t=>/^\s*[(<]/.test(t)).join('\n');
    let html=jsxToHtml(jsx); html=await rewrite(html);
    out+=`<section class="bp bp-${bp}" data-node="${id}">${html}</section>\n`;
  }
  fs.writeFileSync(path.join(ROOT,'screens',name+'.html'),out); console.log('synced',name);
}
