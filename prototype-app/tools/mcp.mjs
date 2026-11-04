const URL='http://127.0.0.1:29979/mcp';
let sid=null, id=0;
async function rpc(method, params, notify=false){
  const body={jsonrpc:'2.0',method,params}; if(!notify) body.id=++id;
  const r=await fetch(URL,{method:'POST',headers:{'content-type':'application/json','accept':'application/json, text/event-stream',...(sid?{'mcp-session-id':sid}:{})},body:JSON.stringify(body)});
  if(r.headers.get('mcp-session-id')) sid=r.headers.get('mcp-session-id');
  if(notify) return;
  const t=await r.text();
  if(t.startsWith('event:')||t.includes('data:')){ const line=t.split('\n').filter(l=>l.startsWith('data:')).pop(); return JSON.parse(line.slice(5)); }
  return JSON.parse(t);
}
export async function init(){ await rpc('initialize',{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'cli',version:'1'}}); await rpc('notifications/initialized',{},true); }
export async function call(name,args){ const r=await rpc('tools/call',{name,arguments:args}); if(r.error) throw new Error(JSON.stringify(r.error)); return r.result; }
