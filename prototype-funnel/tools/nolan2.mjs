import {init,call} from './mcp.mjs';
const F='01M115D40KNA1X9ZGFMJJKZBT9';
await init();
const r=await call('find_nodes',{fileId:F,name:'Examiner · Nolan'});
console.log(r.content.map(c=>c.text).join('\n').slice(0,1500));
