import {state} from './state.js';
import {HUES,TESTS} from './data.js';
const app=document.getElementById('app');
const cache={}; const behaviours={};
export function screen(name,fn){ behaviours[name]=fn; }
// Screens that run timers register a cleanup to run when you leave them
let leaving=[]; export function onLeave(fn){ leaving.push(fn); }
export function go(route){ if(location.hash==='#/'+route) render(); else location.hash='#/'+route; }

// Which design to show. Phones get the mobile design; portrait tablets the tablet design;
// laptops and landscape tablets (wide and short) the desktop design.
// The real screen size. innerWidth can grow on phones and tablets when a wide artboard briefly
// overflows before it is scaled, so read the document's client size instead.
export const vw=()=>document.documentElement.clientWidth, vh=()=>document.documentElement.clientHeight;
export function layout(w=vw(),h=vh()){ return w<600?'m':(w>=1100||(w>=900&&w>h*1.15))?'d':'t'; }
const MAXZ={m:1.25,t:1.15,d:1.2};
// Scale each Paper artboard to the viewport width (within limits: past the limit it stays centred),
// and stretch short screens to the viewport height so bottom-pinned buttons sit at the bottom.
function fit(){
  const L=layout(); document.documentElement.dataset.l=L;
  for(const sec of app.querySelectorAll('.bp')){
    const root=sec.firstElementChild; if(!root||root.dataset.nofit) continue;
    if(!root.dataset.w){ root.dataset.w=parseFloat(root.style.width)||sec.offsetWidth; root.dataset.h=parseFloat(root.style.height)||0; }
    if(sec.offsetParent===null) continue;
    const W=+root.dataset.w, H=+root.dataset.h;
    const z=Math.min(vw()/W,MAXZ[L]); root.style.zoom=z; root.style.width=W+'px';
    // outside a capped artboard, the page takes the artboard's own background
    document.body.style.background=getComputedStyle(root).backgroundColor;
    if(H&&H<=1300&&L==='t') tabletCompose(root);
    if(H&&H<=1300){
      root.style.height='auto'; root.style.overflow='visible'; root.style.overflowX='clip';
      // Fill the screen, but only as tall as the content really needs: don't force the full artboard
      // height on a short screen, and never let bottom-pinned pieces sit on top of the content.
      root.style.minHeight=(vh()/z)+'px';
      let flow=0, pinned=0;
      for(const c of root.children){ const cs=getComputedStyle(c); if(cs.display==='none') continue;
        if(cs.position==='absolute'){ if(cs.bottom!=='auto'&&parseFloat(cs.bottom)<200) pinned=Math.max(pinned,c.offsetHeight+parseFloat(cs.bottom)); }
        else flow=Math.max(flow,c.offsetTop+c.offsetHeight); }
      const need=flow+pinned+(pinned?24:0);
      if(need>vh()/z) root.style.minHeight=need+'px';
    }
  }
}
addEventListener('resize',fit);
// A phone's fake status bar ("9:41") has no place on a web page
function hideStatusBars(){
  for(const t of app.querySelectorAll('.bp div')){ if(t.children.length||t.textContent.trim()!=='9:41') continue;
    let bar=t; for(let i=0;i<4&&bar.parentElement&&!bar.parentElement.matches('.bp>*');i++) bar=bar.parentElement;
    if(bar.parentElement?.matches('.bp>*')&&bar.offsetHeight<80){ bar.style.visibility='hidden'; bar.style.height='14px'; bar.style.minHeight='0'; bar.style.padding='0'; bar.style.overflow='hidden'; } }
}
// Tablet screens are drawn tall like phones: content at the top, the button pinned to the bottom,
// and a big empty middle. On a tablet, keep the header at the top and gather the rest into one
// block (button included) sitting just above the middle of the screen.
function tabletCompose(root){
  if(root.dataset.composed) return; root.dataset.composed='1';
  const kids=[...root.children].filter(c=>getComputedStyle(c).display!=='none');
  const pinned=kids.filter(c=>{ const cs=getComputedStyle(c); return cs.position==='absolute'&&cs.bottom!=='auto'&&parseFloat(cs.bottom)<200&&c.offsetHeight<320; });
  if(!pinned.length) return;
  const flow=kids.filter(c=>getComputedStyle(c).position!=='absolute');
  const top=flow.filter(c=>c.offsetTop<150&&c.offsetHeight<130);
  const rest=flow.filter(c=>!top.includes(c));
  if(!rest.length) return;
  Object.assign(root.style,{display:'flex',flexDirection:'column'});
  const sp=g=>{ const d=document.createElement('div'); d.style.flex=g; d.style.minHeight='24px'; return d; };
  rest[0].before(sp('1'));
  pinned.forEach(p=>{ Object.assign(p.style,{position:'relative',left:'auto',right:'auto',bottom:'auto',top:'auto',marginTop:'40px',width:'auto',alignSelf:'stretch',paddingInline:p.style.paddingInline||''}); root.appendChild(p); });
  root.appendChild(sp('1.4'));
}

// Topic colour: one hue per test drives every --topic-* token.
export function applyTopic(){
  const hue=HUES[state.topic||TESTS[state.test]?.hue||'gold']??78; const r=document.documentElement.style;
  r.setProperty('--topic-wash',`oklch(43% 0.090 ${hue})`); r.setProperty('--topic-wash-mid',`oklch(25% 0.040 ${hue})`);
  r.setProperty('--topic-folder-top',`oklch(68% 0.130 ${hue})`); r.setProperty('--topic-folder-bottom',`oklch(52% 0.110 ${hue-2})`);
  r.setProperty('--topic-folder-back',`oklch(41% 0.080 ${hue-2})`); r.setProperty('--topic-tint',`oklch(91% 0.075 ${hue+4})`); r.setProperty('--topic-tint-soft',`oklch(86% 0.045 ${hue+4})`);
}
// Rows that are clipped in the design (card rails, examiner wall) scroll sideways.
function scrollRows(){
  for(const el of app.querySelectorAll('.bp div')){
    if(el.offsetParent===null) continue;
    const cs=getComputedStyle(el);
    if((cs.overflowX==='clip'||cs.overflowX==='hidden')&&cs.display==='flex'&&cs.flexDirection!=='column'&&el.scrollWidth>el.clientWidth+8&&el.children.length>=2) makeScroll(el);
  }
}

async function load(name){
  if(!cache[name]){ const r=await fetch('screens/'+name+'.html'); cache[name]=r.ok?await r.text():`<p style="color:#fff;padding:40px;font-family:sans-serif">Screen "${name}" is coming in a later milestone.</p>`; }
  return cache[name];
}
async function render(){
  const [name,...rest]=(location.hash.replace(/^#\//,'')||'landing').split('/');
  leaving.forEach(fn=>fn()); leaving=[];
  applyTopic();
  app.classList.add('leaving');
  const html=await load(name);
  app.innerHTML=html; app.classList.remove('leaving'); app.classList.remove('entering'); void app.offsetWidth; app.classList.add('entering');
  scrollTo(0,0); fit();
  app.querySelectorAll('.bp').forEach(uniqueIds);
  if(behaviours[name]) for(const sec of app.querySelectorAll('.bp')) behaviours[name](sec,{bp:sec.className.replace(/.*bp-/,''),args:rest,state});
  hideStatusBars(); fit(); scrollRows();
  // The logo (mark + "IELTS mock test / by Stimuler") always goes back to the landing page
  for(const t of app.querySelectorAll('.bp div')){ if(t.children.length||!/^IELTS mock tests?$/.test(t.textContent.trim())) continue;
    const lock=t.parentElement?.parentElement; if(!lock||!/by Stimuler/.test(lock.textContent)||lock.dataset.home) continue;
    lock.dataset.home='1'; lock.style.cursor='pointer'; lock.addEventListener('click',e=>{ e.preventDefault(); e.stopPropagation(); go('landing'); }); }
  const n=state.name; if(n&&n!=='Priya'){ const w=document.createTreeWalker(app,NodeFilter.SHOW_TEXT); let t; while((t=w.nextNode())) if(t.nodeValue.includes('Priya')) t.nodeValue=t.nodeValue.replace(/Priya/g,n); }
}
addEventListener('hashchange',render);
// Each size is its own copy of the design, so SVG gradient ids repeat. The browser would use the
// copy in the hidden size and draw nothing, so give every size its own ids.
function uniqueIds(sec){
  const tag=sec.className.replace(/.*bp-/,'');
  for(const el of sec.querySelectorAll('[id]')){
    const old=el.id, nu=`${old}-${tag}`; el.id=nu;
    for(const r of sec.querySelectorAll(`[fill="url(#${old})"],[stroke="url(#${old})"]`)){ for(const a of ['fill','stroke']) if(r.getAttribute(a)===`url(#${old})`) r.setAttribute(a,`url(#${nu})`); }
    for(const r of sec.querySelectorAll(`[style*="#${old})"]`)) r.setAttribute('style',r.getAttribute('style').split(`#${old})`).join(`#${nu})`));
  }
}
// Rows that scroll sideways can also be dragged with a mouse
function dragScroll(el){
  let x0=0,s0=0,down=false,moved=false;
  el.addEventListener('pointerdown',e=>{ if(e.pointerType!=='mouse') return; down=true; moved=false; x0=e.clientX; s0=el.scrollLeft; });
  addEventListener('pointermove',e=>{ if(!down) return; const z=parseFloat(getComputedStyle(el.closest('.bp>*')||el).zoom)||1; const dx=(e.clientX-x0)/z; if(Math.abs(dx)>4) moved=true; el.scrollLeft=s0-dx; });
  addEventListener('pointerup',()=>{ down=false; });
  el.addEventListener('click',e=>{ if(moved){ e.stopPropagation(); e.preventDefault(); moved=false; } },true);
}
export function makeScroll(el){ if(el.classList.contains('hscroll')) return; el.classList.add('hscroll'); dragScroll(el); }
export function start(){ const q=new URLSearchParams(location.search); if(q.get('start')&&!location.hash) location.hash='#/'+q.get('start'); render(); }
