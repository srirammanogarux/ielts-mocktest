import {init,call} from './mcp.mjs';
const F='01M115D40KNA1X9ZGFMJJKZBT9';
await init();
const J=r=>{ for(const c of r.content){ try{ const j=JSON.parse(c.text); if(!j.file) return j; }catch{} } };
const f=J(await call('find_nodes',{fileId:F,textValue:'British English'}));
for(const n of f.nodes){ if(n.component!=='Text') continue; const t=J(await call('get_node_info',{fileId:F,nodeId:n.id})); const ov=J(await call('get_node_info',{fileId:F,nodeId:t.parentId})); if(!ov) continue; const card=J(await call('get_node_info',{fileId:F,nodeId:ov.parentId})); if(card && true) console.log(card.id, card.name, card.artboardId, card.childIds.join(',')); }
