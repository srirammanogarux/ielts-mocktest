import {init,call} from './mcp.mjs';
const F='01M115D40KNA1X9ZGFMJJKZBT9';
await init();
const J=r=>{ for(const c of r.content){ try{ const j=JSON.parse(c.text); if(!j.file) return j; }catch{} } };
const urls={Grace:'01M31X712K50MNGV3MKC3XF39F',Daniel:'01M31X712RSC2W13BM9Y5EFPRJ',Aoife:'01M31X712SEKX1RQRJGE031MV7',Marcus:'01M31X712T9DFYYE64KNK11DGE',Fiona:'01M31X712WHPG8YM92P4PMGNA1'};
const updates=[]; const hides=[];
for(const [name,id] of Object.entries(urls)){
  const f=J(await call('find_nodes',{fileId:F,textValue:name}));
  for(const n of (f?.nodes||[])){
    if(n.component!=='Text') continue;
    const t=J(await call('get_node_info',{fileId:F,nodeId:n.id}));
    const ov=J(await call('get_node_info',{fileId:F,nodeId:t.parentId}));
    const card=J(await call('get_node_info',{fileId:F,nodeId:ov.parentId}));
    if(!card || card.childCount<2) continue;
    const first=J(await call('get_node_info',{fileId:F,nodeId:card.childIds[0]}));
    if(first.component!=='SVG') continue;
    updates.push({nodeIds:[card.id],styles:{backgroundImage:`url(https://app.paper.design/file-assets/${F}/${id}.png)`,backgroundSize:'cover',backgroundPosition:'center 25%'}});
    hides.push(first.id);
    console.log(name,card.id,card.name,card.artboardId);
  }
}
if(hides.length) updates.push({nodeIds:hides,styles:{display:'none'}});
const r=await call('update_styles',{fileId:F,updates});
console.log('updated',updates.length);
