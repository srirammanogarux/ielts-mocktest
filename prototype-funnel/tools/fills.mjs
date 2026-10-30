import {init,call} from './mcp.mjs';
await init();
for(const [n,id] of Object.entries({grace:'2CLU-0',daniel:'2CLV-0',aoife:'2CLW-0',marcus:'2CLX-0',fiona:'2CLY-0'})){
  const r=await call('get_jsx',{fileId:'01M115D40KNA1X9ZGFMJJKZBT9',nodeId:id,format:'inline-styles'});
  const t=r.content.map(c=>c.text).join(' ');
  const m=t.match(/https:\/\/app\.paper\.design\/file-assets\/[^)"'\s]+/);
  console.log(n, m?m[0]:t.slice(0,300));
}
