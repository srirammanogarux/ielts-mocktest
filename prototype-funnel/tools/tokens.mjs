import {init,call} from './mcp.mjs';
import fs from 'fs';
await init();
const r=await call('get_tokens',{fileId:'01M115D40KNA1X9ZGFMJJKZBT9'});
const txt=r.content.map(c=>c.text).join('\n'); let items=[];
for(const s of r.content.map(c=>c.text)){ try{ const j=JSON.parse(s); if(j.items) items=j.items; if(Array.isArray(j.tokens)) items=j.tokens; if(j.tokens?.items) items=j.tokens.items; }catch{} }
if(!items.length){ console.log(txt.slice(0,1500)); process.exit(1); }
const map=new Map(); for(const t of items) map.set(t.name,t.value); let css=':root{\n';
for(const [n,v] of map) css+=`  ${n}: ${v};\n`;
css+='}\n';
fs.writeFileSync('../shared/tokens.css',css); console.log(items.length,'tokens');
