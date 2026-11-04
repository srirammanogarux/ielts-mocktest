import {screen,go,start,makeScroll,onLeave} from './shared/app.js';
import {state,save} from './shared/state.js';
import {TESTS,HUES,EXAMINERS,TOPIC_HUE} from './shared/data.js';
import {$$,byText,hit,onTap,tapText} from './shared/dom.js';
import {mountTest} from './test/test.js';

// ---- shared: folder cards (landing library + deck) ----
function topicVars(el,hue){ const h=HUES[hue]??78; el.style.setProperty('--f-back',`oklch(41% 0.08 ${h})`); el.style.setProperty('--f-top',`oklch(68% 0.13 ${h})`); el.style.setProperty('--f-bottom',`oklch(52% 0.11 ${h})`); }
const REST_BACK='#2A2540';
function wireFolders(sec){
  const labels=byText(sec,/^Test \d+ · /);
  const made=[];
  for(const lab of labels){
    let f=lab; while(f&&!(f.style&&f.style.position==='relative'&&f.children.length>=4)) f=f.parentElement;
    if(!f||f.classList.contains('folder')) continue;
    f.classList.add('folder');
    const kids=[...f.children];
    kids.forEach(k=>{ const s=k.getAttribute('style')||''; if(/rotate:/.test(s)) k.classList.add(k.querySelector('[style*="background-image:url"]')?'f-file2':'f-file1'); else if(/border-top-left-radius/.test(s)&&!/border-bottom/.test(s)) k.classList.add('f-tab'); else if(/border-bottom-left-radius/.test(s)) k.classList.add('f-back'); else if(k.contains(lab)) k.classList.add('f-front'); });
    // file rotations are set with the CSS `rotate` property; combine with transform for the slide
    // Read the test straight off the folder: "Test 05 · Everyday life", title, "with Daniel · 12 min"
    const texts=[...f.querySelectorAll('div,span')].filter(d=>!d.children.length).map(d=>d.textContent.trim()).filter(Boolean);
    const [,id,topic]=lab.textContent.trim().match(/^Test (\d+) · (.+)$/)||[];
    const i=texts.findIndex(t=>/^Test \d+ · /.test(t)); const name=texts[i+1]||'Cities and places';
    const examiner=(texts.find(t=>/^with \w+ · /.test(t))||'').match(/^with (\w+)/)?.[1]||TESTS[name]?.examiner||'Nolan';
    if(!TESTS[name]) TESTS[name]={id,topic,examiner,hue:TOPIC_HUE[topic]||'gold'};
    const hue=TESTS[name].hue;
    topicVars(f,hue); made.push({f,lab,examiner});
    onTap(f,()=>{ save({test:name,topic:hue,testInfo:TESTS[name]}); go('picked'); });
  }
  const isRest=f=>(f.querySelector('.f-back')?.getAttribute('style')||'').includes(REST_BACK);
  const rest=made.find(m=>isRest(m.f));
  for(const {f,lab,examiner} of made){
    const withEl=[...f.querySelectorAll('.f-front div')].find(d=>!d.children.length&&/^(with \w+ · |Open this test)/.test(d.textContent.trim()));
    if(rest&&!isRest(f)){
      for(const cls of ['f-tab','f-back','f-file1','f-file2','f-front']){ const a=f.querySelector(':scope>.'+cls), b=rest.f.querySelector(':scope>.'+cls); if(a&&b) a.setAttribute('style',b.getAttribute('style')); }
      lab.setAttribute('style',rest.lab.getAttribute('style'));
      const rw=[...rest.f.querySelectorAll('.f-front div')].find(d=>!d.children.length&&/^with /.test(d.textContent.trim()));
      if(withEl&&rw){ withEl.setAttribute('style',rw.getAttribute('style')); withEl.textContent=`with ${examiner} · 12 min`; }
    }
    if(withEl&&!f.querySelector('.f-open')){ withEl.classList.add('f-with'); const o=withEl.cloneNode(); o.className='f-open'; o.textContent='Open this test →'; withEl.after(o); }
    lab.classList.add('f-label');
  }
}

// ---- mobile: folders in two rows, smaller, scrolling sideways ----
let deckPool=null;
async function folderPool(){
  if(deckPool) return deckPool;
  const h=await fetch('screens/deck.html').then(r=>r.text()); const d=new DOMParser().parseFromString(h,'text/html');
  const seen=new Set(); deckPool=[];
  for(const lab of [...d.querySelectorAll('.bp-desktop div')].filter(e=>!e.children.length&&/^Test \d+ · /.test(e.textContent.trim()))){
    let f=lab; while(f&&!(f.style&&f.style.position==='relative'&&f.children.length>=4)) f=f.parentElement;
    const key=lab.textContent.trim(); if(!f||seen.has(key)) continue; seen.add(key); deckPool.push({key,html:f.outerHTML});
  }
  return deckPool;
}
async function folderGrid(sec,min){
  const rows=[...new Set([...sec.querySelectorAll('.folder')].map(f=>f.parentElement))];
  const pool=await folderPool();
  rows.forEach((row,ri)=>{
    const have=new Set([...row.querySelectorAll('.f-label')].map(l=>l.textContent.trim()));
    for(let i=0;i<pool.length&&row.children.length<min;i++){ const it=pool[(i+ri*3)%pool.length]; if(have.has(it.key)) continue; have.add(it.key); row.insertAdjacentHTML('beforeend',it.html); }
  });
  wireFolders(sec); rows.forEach(splitRows);
}
// Two lines of folders, each scrolling sideways on its own
function splitRows(row){
  const fs=[...row.querySelectorAll('.folder')]; if(!fs.length) return;
  row.classList.remove('hscroll'); row.classList.add('folder-grid'); row.innerHTML='';
  const half=Math.ceil(fs.length/2);
  for(const part of [fs.slice(0,half),fs.slice(half)]){ if(!part.length) continue; const line=document.createElement('div'); line.className='folder-line'; part.forEach(f=>line.appendChild(f)); row.appendChild(line); makeScroll(line); }
}
// Mobile hero shows 3 examiners; add the other 3 so the row scrolls through all 6
function examinerRow(sec){
  const names=Object.keys(EXAMINERS);
  const cards=byText(sec,new RegExp('^('+names.join('|')+')$')).map(n=>climbTo(n,e=>/background-size:cover/.test(e.getAttribute('style')||''))).filter(Boolean);
  if(!cards.length) return; const row=cards[0].parentElement; const shown=new Set(cards.map(c=>byText(c,new RegExp('^('+names.join('|')+')$'))[0].textContent.trim()));
  for(const n of names){ if(shown.has(n)) continue; const c=cards[1]?cards[1].cloneNode(true):cards[0].cloneNode(true);
    c.style.backgroundImage=`url(${EXAMINERS[n].img})`; c.style.borderColor='var(--color-ob-stroke)';
    byText(c,new RegExp('^('+names.join('|')+')$'))[0].textContent=n; byText(c,/English$/)[0].textContent=EXAMINERS[n].accent; row.appendChild(c); }
  // Loop: a second copy of the six follows the first, and the row drifts on its own
  const n=row.children.length; for(let i=0;i<n;i++) row.appendChild(row.children[i].cloneNode(true));
  makeScroll(row); row.style.scrollSnapType='none';
  if(matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  let paused=0, pos=0;
  const hold=()=>{ paused=performance.now()+2500; };
  ['pointerdown','touchstart','wheel'].forEach(ev=>row.addEventListener(ev,hold,{passive:true}));
  row.addEventListener('scroll',()=>{ if(performance.now()<paused) pos=row.scrollLeft; },{passive:true});
  const loop=()=>{ if(!row.isConnected) return;
    const half=row.children[n].offsetLeft-row.children[0].offsetLeft;
    if(performance.now()>paused&&row.offsetParent){ pos+=0.5; if(pos>=half) pos-=half; row.scrollLeft=pos; }
    else if(row.scrollLeft>=half){ row.scrollLeft-=half; pos=row.scrollLeft; }
    requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}

// ---- landing ----
screen('landing',(sec,{bp})=>{
  for(const t of ['Start a free mock test','Start a free mock','Browse all tests','Answer it in a mock test','Pick my first test','Get my band score','Start my free mock test']) tapText(sec,t,()=>go('deck'));
  tapText(sec,'Mock tests',()=>go('deck'),1);
  // Hero: no sample-report link, no trust line under the button
  byText(sec,'See a sample report').forEach(e=>e.remove());
  byText(sec,/^Free.*(Marked on the 4 IELTS criteria|Band score after)$/).forEach(e=>e.remove());
  byText(sec,/^(Free|No download|Marked on the 4 IELTS criteria|·)$/).map(e=>e.parentElement).filter(r=>/Marked on the 4 IELTS/.test(r.textContent)).forEach(r=>r.remove());
  byText(sec,/Every topic in this year’s exam\.$/).forEach(e=>{ e.textContent=e.textContent.replace('Every topic in this year’s exam.','Every topic from past exams.'); });
  wireFolders(sec);
  if(bp==='mobile'){ folderGrid(sec,8); examinerRow(sec); }
  makeFlip(sec);
  tiltCards(sec);
  marquee(sec);
  animateScore(sec);
  faq(sec);
  // Cue card section: bring the text and the card closer together
  const cue=byText(sec,'Could you talk about this for 2 minutes?')[0]?.parentElement?.parentElement;
  // Text stays on the left edge like the other sections; the card sits closer in
  if(cue&&bp==='desktop'&&getComputedStyle(cue).flexDirection==='row') cue.style.paddingRight='230px';
});
function makeFlip(sec){
  const f=byText(sec,/Tap to see a Band 8 answer/)[0]; if(!f) return;
  const front=climbCard(f); if(!front) return;
  let backLabel=byText(sec,/^BAND 8 ANSWER$/)[0]; let back=backLabel&&climbCard(backLabel); let own=!!back;
  if(!back){ const d=document.querySelector('.bp-desktop'); const bl=d&&byText(d,/^BAND 8 ANSWER$/)[0]; back=bl&&climbCard(bl); }
  if(!back) return;
  const backCard=own?back:back.cloneNode(true);
  if(own){ const col=back.parentElement; if(col!==front.parentElement) col.style.display='none'; }
  const cs=getComputedStyle(front);
  const wrap=document.createElement('div'); wrap.className='flip-wrap'; wrap.style.width=cs.width; wrap.style.height=cs.height; wrap.style.flexShrink='0'; wrap.style.alignSelf='center';
  front.style.width='100%'; front.style.height='100%'; front.style.margin='0';
  const inner=document.createElement('div'); inner.className='flip-inner'; inner.style.width='100%'; inner.style.height='100%';
  front.parentElement.insertBefore(wrap,front); wrap.appendChild(inner); inner.appendChild(front); inner.appendChild(backCard);
  front.classList.add('flip-face'); backCard.classList.add('flip-face','flip-back');
  // Both faces fill the wrapper and turn around its centre (the design places them with left/top and a corner origin)
  for(const f of [front,backCard]) Object.assign(f.style,{position:'absolute',left:'0',top:'0',width:'100%',height:'100%',margin:'0',transformOrigin:'50% 50%'});
  byText(sec,/^(Front|Back, after tap or hover)$/).forEach(e=>e.style.display='none');
  // Tap always flips. On desktop and tablet with a mouse, hovering flips too (a click right after the hover doesn't undo it).
  const hover=bpOf(sec)!=='mobile'&&matchMedia('(hover:hover) and (pointer:fine)').matches; let hoverAt=0;
  onTap(inner,()=>{ if(hover&&performance.now()-hoverAt<600) return; inner.classList.toggle('flipped'); });
  if(hover){ wrap.addEventListener('mouseenter',()=>{ hoverAt=performance.now(); inner.classList.add('flipped'); }); wrap.addEventListener('mouseleave',()=>inner.classList.remove('flipped')); }
}
// Examiner wall: card grows and tilts toward the cursor, with a soft light on top
function tiltCards(sec){
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const names=Object.keys(EXAMINERS);
  const cards=byText(sec,new RegExp('^('+names.join('|')+')$')).map(n=>{ let c=n; for(let i=0;i<5&&c;i++){ if(/background-size:cover/.test(c.getAttribute('style')||'')) return c; c=c.parentElement; } return null; }).filter(Boolean);
  // The wall clips its cards; open the sides and top so a grown card isn't cut (the bottom stays cropped as designed)
  const wall=cards[0]&&climbTo(cards[0].parentElement,e=>getComputedStyle(e).overflow==='clip');
  if(wall){ wall.style.overflow='visible'; wall.style.clipPath='inset(-40px -40px 0 -40px)'; }
  for(const c of new Set(cards)){
    c.style.borderColor='var(--color-ob-stroke)'; c.classList.add('tilt'); const glare=document.createElement('div'); glare.className='tilt-glare'; c.appendChild(glare);
    c.addEventListener('mousemove',e=>{ const r=c.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      c.style.transform=`perspective(900px) rotateX(${(0.5-y)*16}deg) rotateY(${(x-0.5)*16}deg) scale(1.07)`;
      glare.style.background=`radial-gradient(circle at ${x*100}% ${y*100}%, rgba(255,255,255,.1), transparent 60%)`; });
    c.addEventListener('mouseleave',()=>{ c.style.transform=''; });
  }
}
// Topic strip: the two lines drift in opposite directions
function marquee(sec){
  const lines=byText(sec,/^Your hometown|^An old photo/).filter(e=>/white-space:pre/.test(e.getAttribute('style')||''));
  lines.forEach((l,i)=>{ if(l.classList.contains('marquee')) return; const t=l.textContent.trim(); l.textContent=`${t}   ${t}   `; l.classList.add('marquee'); if(i%2) l.classList.add('rev'); });
}
// Sample band score: gauge fills, numbers count up once it scrolls into view
function animateScore(sec){
  for(const svg of sec.querySelectorAll('svg')){
    const arc=[...svg.querySelectorAll('path')].find(p=>/url\(#/.test(p.getAttribute('stroke')||'')); const knob=svg.querySelector('circle[fill="#FFFFFF"]');
    if(!arc||!knob) continue;
    const card=climbTo(svg,e=>/border-radius:20px/.test(e.getAttribute('style')||''))||svg.parentElement.parentElement;
    const nums=[...card.querySelectorAll('div')].filter(d=>!d.children.length&&/^\d\.\d$/.test(d.textContent.trim()));
    const len=arc.getTotalLength(); arc.style.strokeDasharray=len; arc.style.strokeDashoffset=len;
    const k0=arc.getPointAtLength(0); knob.setAttribute('cx',k0.x); knob.setAttribute('cy',k0.y);
    const targets=nums.map(n=>+n.textContent.trim()); nums.forEach(n=>n.textContent='3.0');
    const io=new IntersectionObserver(es=>{ if(!es[0].isIntersecting) return; io.disconnect(); const t0=performance.now();
      const step=now=>{ let done=true;
        const p=Math.min(1,(now-t0)/1400), e=1-Math.pow(1-p,3); arc.style.strokeDashoffset=len*(1-e); const k=arc.getPointAtLength(len*e); knob.setAttribute('cx',k.x); knob.setAttribute('cy',k.y); if(p<1) done=false;
        nums.forEach((n,i)=>{ const q=Math.min(1,Math.max(0,(now-t0-(i?300+i*150:0))/1100)), eq=1-Math.pow(1-q,3); n.textContent=(3+(targets[i]-3)*eq).toFixed(1); if(q<1) done=false; });
        if(!done) requestAnimationFrame(step); };
      requestAnimationFrame(step); },{threshold:.45});
    io.observe(card);
  }
}
function climbTo(el,fn){ let n=el; for(let i=0;i<8&&n;i++){ if(n.getAttribute&&fn(n)) return n; n=n.parentElement; } return null; }
// FAQ: every question opens and closes, first one open
const FAQ={
  'Is it really free?':'Your first mock test is free, with your band score. No card needed.',
  'How is my band worked out?':'We mark you on the same four things IELTS examiners use: fluency, vocabulary, grammar and pronunciation. Each gets a band, and your overall band is the average, rounded the way IELTS rounds it.',
  'Will my accent lower my score?':'No. IELTS does not mark accents. What counts is how easy you are to understand, and that is what we listen for, not a British or American sound.',
  'Who are the examiners?':'Grace, Nolan, Daniel, Aoife, Marcus and Fiona are AI examiners. They follow the real IELTS speaking script and timing, each with a different English accent, so no accent surprises you on the day.',
  'Is my recording private?':'Yes. Only you can hear your answers. We use them to mark your test and never share them, and you can delete them any time.',
};
const MINUS='M5 12h14', PLUS='M5 12h14M12 5v14';
function faq(sec){
  const qs=byText(sec,new RegExp('^('+Object.keys(FAQ).map(q=>q.replace(/[?]/g,'\\?')).join('|')+')$')); if(!qs.length) return;
  const firstAns=byText(sec,FAQ['Is it really free?'])[0]; const ansStyle=firstAns?.getAttribute('style')||'';
  qs.forEach((q,i)=>{
    const row=q.parentElement; let item=row;
    if(firstAns&&row.parentElement.contains(firstAns)&&row.parentElement!==row.parentElement.parentElement) item=row.parentElement;
    if(item===row){ const w=document.createElement('div'); w.setAttribute('style',row.getAttribute('style')); row.before(w); w.appendChild(row); item=w;
      row.style.borderBottomWidth='0'; row.style.paddingBlock='0'; }
    else firstAns.remove();
    item.style.display='flex'; item.style.flexDirection='column'; item.style.alignItems='stretch'; item.style.justifyContent='flex-start'; item.style.gap='0';
    row.style.display='flex'; row.style.alignItems='center'; row.style.justifyContent='space-between'; row.style.width='100%'; q.style.flex='1'; q.style.minWidth='0';
    const a=document.createElement('div'); a.className='faq-a'; const inner=document.createElement('div'); const txt=document.createElement('div');
    txt.setAttribute('style',ansStyle); txt.style.paddingTop='10px'; txt.style.paddingRight='40px'; txt.textContent=FAQ[q.textContent.trim()]; inner.appendChild(txt); a.appendChild(inner); item.appendChild(a);
    const path=row.querySelector('svg path');
    const set=open=>{ item.classList.toggle('open',open); if(path) path.setAttribute('d',open?MINUS:PLUS); };
    set(i===0); onTap(row,()=>set(!item.classList.contains('open')));
  });
}
function bpOf(sec){ return sec.className.replace(/.*bp-/,''); }
function climbCard(el){ let n=el; for(let i=0;i<8&&n;i++){ const s=n.getAttribute('style')||''; if(/border-radius:(1[0-9]|2[0-9])px/.test(s)&&/box-shadow/.test(s)) return n; n=n.parentElement; } return null; }

// ---- deck ----
screen('deck',(sec,{bp})=>{
  wireFolders(sec);
  if(bp==='mobile'){ folderGrid(sec,8); const bar=climbTo(byText(sec,/Surprise me/)[0],e=>(e.getAttribute('style')||'').includes('position:absolute')); if(bar){ bar.style.position='sticky'; bar.style.bottom='0'; bar.style.marginTop='auto'; bar.style.zIndex='5'; bar.style.width='100%'; } }
  deckFilters(sec,bp);
  tapText(sec,/Surprise me/,()=>{ const names=Object.keys(TESTS); const n=names[Math.floor(Math.random()*names.length)]; save({test:n,topic:TESTS[n].hue,testInfo:TESTS[n]}); go('picked'); });
});

// Filter chips: "All tests" shows every row; a topic shows one row with just those tests
const CHIP_TOPICS={'People':['People'],'Places and travel':['Places'],'Places':['Places'],'Work and study':['Work and study'],'Technology':['Ideas and tech'],'Free time':['Everyday life']};
function deckFilters(sec,bp){
  const chips=byText(sec,/^(All tests|Asked this season|People|Places and travel|Places|Work and study|Technology|Free time)$/).map(e=>e.parentElement).filter(c=>/border-radius:999px/.test(c.getAttribute('style')||''));
  const on=chips.find(c=>/All tests/.test(c.textContent)), off=chips.find(c=>c!==on); if(!on||!off) return;
  const onS=[on.getAttribute('style'),on.firstElementChild.getAttribute('style')], offS=[off.getAttribute('style'),off.firstElementChild.getAttribute('style')];
  // Snapshot the rows before anything is wired
  const rows=[...new Set([...sec.querySelectorAll('.folder')].map(f=>f.parentElement))];
  const sections=rows.map(row=>{ const box=row.parentElement, head=box.firstElementChild; const leaves=[...head.querySelectorAll('div')].filter(d=>!d.children.length);
    return {row,box,title:leaves[0],meta:leaves[1]?.textContent.includes('tests')?leaves[1]:null,orig:{html:row.innerHTML,title:leaves[0].textContent,meta:leaves[1]?.textContent}}; });
  const pool=[], seen=new Set();
  for(const f of sec.querySelectorAll('.folder')){ const lab=f.querySelector('.f-label')||byText(f,/^Test \d+ · /)[0]; const key=lab.textContent.trim(); if(seen.has(key)) continue; seen.add(key); pool.push({key,topic:key.replace(/^Test \d+ · /,''),html:f.outerHTML}); }
  const strip=html=>{ const t=document.createElement('div'); t.innerHTML=html; t.querySelectorAll('.folder').forEach(f=>{ f.classList.remove('folder','tap'); f.querySelectorAll('.f-open').forEach(o=>o.remove()); }); return t.innerHTML; };
  const apply=async chip=>{
    const all=[...pool]; for(const d of await folderPool()) if(!all.some(p=>p.key===d.key)) all.push({key:d.key,topic:d.key.replace(/^Test \d+ · /,''),html:d.html});
    sections.forEach((s,i)=>{ s.box.style.display=(chip==='All tests'||i===0)?'':'none'; s.row.innerHTML=strip(s.orig.html); s.title.textContent=s.orig.title; if(s.meta) s.meta.textContent=s.orig.meta; });
    const first=sections[0];
    if(CHIP_TOPICS[chip]){ const list=all.filter(p=>CHIP_TOPICS[chip].includes(p.topic)); first.row.innerHTML=strip(list.map(p=>p.html).join('')); first.title.textContent=chip; if(first.meta) first.meta.textContent=`${list.length} test${list.length===1?'':'s'}`; }
    first.row.scrollLeft=0; wireFolders(sec);
    if(bp==='mobile'){ if(chip==='All tests') folderGrid(sec,8); else sections.forEach(s=>splitRows(s.row)); }
  };
  chips.forEach(c=>onTap(c,()=>{ chips.forEach(x=>{ const st=x===c?onS:offS; x.setAttribute('style',st[0]); x.firstElementChild.setAttribute('style',st[1]); x.classList.add('tap'); }); apply(c.textContent.trim()); }));
}

// The folder photo for a test, taken from its folder on the deck
const photoCache={};
function testPhoto(t){
  if(t.id==='07') return Promise.resolve(null);
  return photoCache[t.id]||=fetch('screens/deck.html').then(r=>r.text()).then(h=>{
    const d=new DOMParser().parseFromString(h,'text/html'); const lab=[...d.querySelectorAll('div,span')].find(e=>e.children.length===0&&e.textContent.trim().startsWith(`Test ${t.id} ·`));
    const photo=n=>[...n.querySelectorAll('[style*="background-image"]')].map(e=>e.getAttribute('style').match(/url\(["']?([^"')]+)/)?.[1]).find(u=>u&&!/(nolan|grace|daniel|aoife|marcus|fiona|sarah)/.test(u));
    let f=lab; for(let i=0;i<8&&f&&!photo(f);i++) f=f.parentElement; return f&&photo(f);
  });
}

// ---- test picked ----
function setText(root,from,to){ byText(root,from).forEach(e=>{ e.textContent=to; }); }
screen('picked',(sec,{state})=>{
  const t=TESTS[state.test]||state.testInfo||TESTS['Cities and places']; const ex=EXAMINERS[t.examiner];
  if(state.test!=='Cities and places'){
    setText(sec,'Cities and places',state.test);
    setText(sec,/^Test 07 · Places$/,`Test ${t.id} · ${t.topic}`);
    setText(sec,/^with Nolan · 12 min$/,`with ${t.examiner} · 12 min`);
    setText(sec,/^Nolan will be your examiner$/,`${t.examiner} will be your examiner`);
    setText(sec,/^British English$/,ex.accent);
    const parts=t.parts||['Everyday questions about you and your life',`A cue card about ${t.topic.toLowerCase()}. Sealed until the test.`,`Bigger questions about ${t.topic.toLowerCase()}`];
    { setText(sec,/^Your hometown, and what you do$/,parts[0]); setText(sec,/^A cue card about a city\. Sealed until the test\.$/,parts[1]); setText(sec,/^Cities, crowds and the future$/,parts[2]); }
    testPhoto(t).then(src=>{ if(src) sec.querySelectorAll('[style*="3J4FRCKHQ7TK6QNJXRJ47EY76N"]').forEach(e=>e.style.backgroundImage=`url(${src})`); });
  }
  // Examiner photo always matches the name
  sec.querySelectorAll('[style*="1JEN4APBKHJKVGMKA0MDK0KK4F"],[style*="nolan"]').forEach(e=>{ e.style.backgroundImage=`url(${ex.img})`; e.style.backgroundPosition='50% 25%'; });
  byText(sec,'Pick another').forEach(e=>{ e.classList.add('btn-outline'); onTap(e,()=>go('deck')); });
  for(const t2 of [/^Start this test$/,/^Start (the|my) (mock )?test$/i,/^Start$/]) tapText(sec,t2,()=>go('onboarding'));
  byText(sec,/^(All tests|Back)$/).forEach(e=>onTap(e.parentElement,()=>go('deck')));
});

// ---- onboarding: name → exam date → target band, all filling in the candidate slip ----
const EXAM_OPTS={'In 2 weeks':'2w','In a month':'1m','In 2 months':'2m','More than 2 months':'3m'};
const EXAM_LABEL=Object.fromEntries(Object.entries(EXAM_OPTS).map(([k,v])=>[v,k]));
const hand=el=>el&&/Caveat/.test(el.getAttribute('style')||'');
const bandText=v=>`Band ${v%1?v.toFixed(1):v}`;
function currentTest(state){ return TESTS[state.test]||state.testInfo||TESTS['Cities and places']; }
// Test, examiner and photos on the slip (desktop) or the small card on top (mobile, tablet)
function fillSlip(sec,state){
  const t=currentTest(state), ex=EXAMINERS[t.examiner]||EXAMINERS.Nolan;
  setText(sec,/^07 · Cities and places$/,`${t.id} · ${state.test}`);
  setText(sec,/^Test 07 · with Nolan$/,`Test ${t.id} · with ${t.examiner}`);
  setText(sec,'Cities and places',state.test);
  byText(sec,'Nolan').forEach(e=>e.textContent=t.examiner);
  setText(sec,'What should Nolan call you?',`What should ${t.examiner} call you?`);
  sec.querySelectorAll('[style*="1JEN4APBKHJKVGMKA0MDK0KK4F"]').forEach(e=>{ e.style.backgroundImage=`url(${ex.img})`; e.style.backgroundPosition='50% 25%'; });
  testPhoto(t).then(src=>{ if(src) sec.querySelectorAll('[style*="3J4FRCKHQ7TK6QNJXRJ47EY76N"]').forEach(e=>e.style.backgroundImage=`url(${src})`); });
  byText(sec,'Priya').filter(hand).forEach(e=>{ e.dataset.slipName='1'; e.textContent=state.nameSet?state.name:''; });
  setText(sec,/^Nice to meet you, Priya$/,`Nice to meet you, ${state.name}`);
  byText(sec,/^Back$/).forEach(e=>onTap(e.parentElement,()=>history.back()));
  // back arrow (mobile/tablet): the first small svg in the top bar
  const arrow=[...sec.querySelectorAll('svg')].find(v=>/M1[0-9](\.\d+)? ?[0-9.]+ ?L ?[0-9.]/.test(v.innerHTML)&&v.getBoundingClientRect().top<140&&+v.getAttribute('width')<=28);
  if(arrow) onTap(arrow.parentElement.tagName==='DIV'?arrow.parentElement:arrow,()=>history.back());
}
function ctaOf(sec,re){ const t=byText(sec,re)[0]; return t&&hit(t); }

screen('onboarding',(sec,{state})=>{
  fillSlip(sec,state);
  const typed=byText(sec,'Priya').find(e=>!hand(e)); if(!typed) return;
  const box=typed.parentElement; const caret=typed.nextElementSibling;
  const input=document.createElement('input'); input.type='text'; input.placeholder='Your first name'; input.autocomplete='given-name'; input.maxLength=24;
  input.setAttribute('style',typed.getAttribute('style')); Object.assign(input.style,{background:'transparent',border:'0',outline:'none',width:'100%',padding:'0',caretColor:'#fff'});
  input.value=state.nameSet?state.name:''; typed.replaceWith(input); caret?.remove();
  const slipNames=[...sec.querySelectorAll('[data-slip-name]')];
  const cta=ctaOf(sec,/^Continue$/);
  const sync=()=>{ const v=input.value.trim(); slipNames.forEach(e=>{ e.dataset.slipName='1'; e.textContent=v; }); if(cta){ cta.style.opacity=v?'1':'.4'; cta.style.pointerEvents=v?'':'none'; } box.style.borderColor=document.activeElement===input?'#FFFFFFB3':'#FFFFFF40'; };
  input.addEventListener('input',sync); input.addEventListener('focus',sync); input.addEventListener('blur',sync);
  const next=()=>{ const v=input.value.trim(); if(!v) return; save({name:v[0].toUpperCase()+v.slice(1),nameSet:true}); go('exam'); };
  input.addEventListener('keydown',e=>{ if(e.key==='Enter') next(); });
  if(cta) onTap(cta,next);
  sync(); if(sec.offsetParent&&matchMedia('(hover:hover)').matches) setTimeout(()=>input.focus(),350);
});

screen('exam',(sec,{state})=>{
  fillSlip(sec,state);
  const opts=byText(sec,new RegExp('^('+Object.keys(EXAM_OPTS).join('|')+')$')).filter(e=>!hand(e)).map(e=>e.parentElement);
  const selEl=opts.find(o=>o.querySelector('svg')), offEl=opts.find(o=>!o.querySelector('svg')); if(!selEl||!offEl) return;
  const S={box:selEl.getAttribute('style'),txt:selEl.firstElementChild.getAttribute('style')}, O={box:offEl.getAttribute('style'),txt:offEl.firstElementChild.getAttribute('style')};
  const tick=selEl.querySelector('svg');
  const slip=byText(sec,/^In a month$/).filter(hand);
  const pick=(o,animate)=>{ opts.forEach(x=>{ const on=x===o; x.setAttribute('style',on?S.box:O.box); x.firstElementChild.setAttribute('style',on?S.txt:O.txt); x.querySelector('svg')?.remove(); if(on) x.appendChild(tick); x.style.transition='background-color .2s ease'; x.classList.add('tap'); });
    const label=o?o.firstElementChild.textContent.trim():''; slip.forEach(e=>{ e.textContent=label; if(animate) e.classList.add('ink'); }); };
  pick(state.examSet?opts.find(o=>o.textContent.trim()===EXAM_LABEL[state.exam]):null);
  opts.forEach(o=>o.addEventListener('click',()=>{ const label=o.firstElementChild.textContent.trim(); pick(o,true); save({exam:EXAM_OPTS[label],examSet:true}); setTimeout(()=>go('band'),650); }));
});

screen('band',(sec,{state})=>{
  fillSlip(sec,state);
  byText(sec,/^In a month$/).filter(hand).forEach(e=>e.textContent=EXAM_LABEL[state.exam]||'In a month');
  const num=byText(sec,'7.0').find(e=>parseFloat(getComputedStyle(e).fontSize)>=40);
  const thumb=[...sec.querySelectorAll('div')].find(d=>{ const st=d.getAttribute('style')||''; return /position:absolute/.test(st)&&/box-shadow/.test(st)&&/border-radius:999px/.test(st)&&/left:/.test(st)&&d.parentElement&&/position:relative/.test(d.parentElement.getAttribute('style')||''); });
  if(!num||!thumb) return;
  const track=thumb.parentElement, fill=track.querySelector('[style*="linear-gradient"]');
  const ticks=byText(sec,/^[5-9]\.0$/).filter(e=>e!==num&&track.parentElement.contains(e)); const tickOn=ticks.find(e=>e.textContent.trim()==='7.0'), tickOff=ticks.find(e=>e!==tickOn);
  const onS=tickOn?.getAttribute('style'), offS=tickOff?.getAttribute('style');
  const slipBand=byText(sec,/^Band 7$/).filter(hand);
  // gauge: colour the arc by dash length along the grey track
  const svg=num.parentElement.parentElement.querySelector('svg'); const paths=svg?[...svg.querySelectorAll('path')]:[];
  const grad=paths.find(p=>/url\(#/.test(p.getAttribute('stroke')||'')), base=paths.find(p=>p!==grad&&p.getAttribute('stroke-width')===grad?.getAttribute('stroke-width')); const knob=svg?.querySelector('circle');
  // the gauge colours follow the test's topic, like the slider under it
  svg?.querySelectorAll('stop').forEach((st,i)=>st.setAttribute('stop-color',i?'var(--topic-tint)':'var(--topic-folder-bottom)'));
  knob?.setAttribute('stroke','var(--topic-tint)');
  let len=0; if(grad&&base){ grad.setAttribute('d',base.getAttribute('d')); len=base.getTotalLength(); grad.style.strokeDasharray=len; }
  const stamp=climbTo(byText(sec,/^READY$/)[0],e=>/rotate:/.test(e.getAttribute('style')||''));
  let shown=state.target||7, value=shown, raf=0;
  const W=()=>track.getBoundingClientRect().width, TW=()=>thumb.getBoundingClientRect().width;
  const draw=v=>{ const r=(v-5)/4; const w=parseFloat(getComputedStyle(track).width), tw=parseFloat(getComputedStyle(thumb).width);
    thumb.style.left=(r*(w-tw))+'px'; if(fill) fill.style.width=(r*(w-tw)+tw/2)+'px';
    if(len){ grad.style.strokeDashoffset=len*(1-r); const p=base.getPointAtLength(len*r); knob.setAttribute('cx',p.x); knob.setAttribute('cy',p.y); }
    num.textContent=v.toFixed(1); };
  const settle=()=>{ cancelAnimationFrame(raf); const step=()=>{ shown+=(value-shown)*0.22; if(Math.abs(value-shown)<0.005) shown=value; draw(shown); if(shown!==value) raf=requestAnimationFrame(step); }; raf=requestAnimationFrame(step);
    ticks.forEach(t=>t.setAttribute('style',Math.abs(parseFloat(t.textContent)-Math.round(value))<0.01&&value%1===0?onS:offS)); slipBand.forEach(e=>e.textContent=bandText(value)); };
  const set=v=>{ v=Math.min(9,Math.max(5,Math.round(v*2)/2)); if(v===value) return; value=v; save({target:v}); settle(); };
  const fromX=x=>{ const r=track.getBoundingClientRect(); const tw=TW(); return 5+4*Math.min(1,Math.max(0,(x-r.left-tw/2)/(r.width-tw))); };
  track.style.cursor='pointer'; track.style.touchAction='none'; thumb.style.cursor='grab'; thumb.style.transition='box-shadow .2s';
  track.addEventListener('pointerdown',e=>{ track.setPointerCapture(e.pointerId); set(fromX(e.clientX)); const mv=ev=>set(fromX(ev.clientX)); const up=()=>{ track.removeEventListener('pointermove',mv); track.removeEventListener('pointerup',up); }; track.addEventListener('pointermove',mv); track.addEventListener('pointerup',up); });
  ticks.forEach(t=>{ t.style.cursor='pointer'; t.addEventListener('click',()=>set(parseFloat(t.textContent))); });
  thumb.tabIndex=0; thumb.setAttribute('role','slider'); thumb.setAttribute('aria-label','Target band');
  thumb.addEventListener('keydown',e=>{ if(e.key==='ArrowRight'||e.key==='ArrowUp') set(value+0.5); if(e.key==='ArrowLeft'||e.key==='ArrowDown') set(value-0.5); });
  draw(shown); settle();
  if(stamp) stamp.remove();
  const cta=ctaOf(sec,/^I’m ready\. Start the test$|^I'm ready\. Start the test$/); if(cta) onTap(cta,()=>go('test'));
});

// ---- result → pay (Path A) or sign up → get the app ----
// Plans follow the exam date from onboarding: the first covers the exam, the second (picked by default) leaves room for a retake
const PLANS={
  '2w':[{len:'2 weeks',price:299,note:'Covers your exam date'},{len:'3 months',price:999,note:'₹333 a month · room for a retake'}],
  '1m':[{len:'1 month',price:499,note:'Covers your exam date'},{len:'3 months',price:999,note:'₹333 a month · room for a retake'}],
  '2m':[{len:'2 months',price:799,note:'Covers your exam date'},{len:'6 months',price:1499,note:'₹250 a month · room for a retake'}],
  '3m':[{len:'6 months',price:1499,note:'Covers your exam date'},{len:'12 months',price:2499,note:'₹208 a month · room for a retake'}],
};
const EXAM_ABOUT={'2w':'Your exam is in about 2 weeks','1m':'Your exam is in about a month','2m':'Your exam is in about 2 months','3m':'Your exam is more than 2 months away'};
const rupees=n=>'₹'+n.toLocaleString('en-IN');
const emailOf=state=>state.email||`${(state.name||'priya').toLowerCase().replace(/[^a-z]/g,'')}.sharma@gmail.com`;
// Name, email, test and examiner on every hand-off screen
function personal(sec,state){
  const t=currentTest(state), n=state.name||'Priya';
  setText(sec,/^Test 07 · Cities and places · with Nolan$/,`Test ${t.id} · ${state.test} · with ${t.examiner}`);
  // every text node, including headings split by line breaks
  const w=document.createTreeWalker(sec,NodeFilter.SHOW_TEXT); let tn; while((tn=w.nextNode())) if(tn.nodeValue.includes('Priya')) tn.nodeValue=tn.nodeValue.replace(/Priya/g,n);
  byText(sec,/priya\.sharma@gmail\.com/).forEach(e=>{ if(!e.children.length) e.textContent=e.textContent.replace('priya.sharma@gmail.com',emailOf(state)); });
  setText(sec,/^Real exam topics, with Nolan and 5 other examiners$/,`Real exam topics, with ${t.examiner} and 5 other examiners`);
}
function paidPlan(state){ const p=(PLANS[state.exam]||PLANS['1m'])[state.plan??1]; return p; }

screen('result',(sec,{state})=>{
  personal(sec,state);
  setText(sec,/^Your target is 7\.0\. You are$/,`Your target is ${(+state.target||7).toFixed(1)}. You are`);
  // Path A pays on the web; every other path signs up and gets the app
  tapText(sec,'See my full report in the app',()=>go(state.path==='A'?'offer':'signup'));
  if(!document.getElementById('pathchips')){
    const bar=document.createElement('div'); bar.id='pathchips';
    bar.innerHTML=`<span>Payment path</span>`+[['A','Pay on web'],['B','Band free'],['C','Report free'],['D','Free drill']].map(([k,l])=>`<button data-p="${k}"><b>${k}</b>${l}</button>`).join('');
    document.body.appendChild(bar);
    const paint=()=>bar.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.p===(state.path||'D')));
    bar.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; save({path:b.dataset.p}); paint(); }); paint();
    onLeave(()=>bar.remove());
  }
});

screen('offer',(sec,{state})=>{
  personal(sec,state);
  const plans=PLANS[state.exam]||PLANS['1m'];
  setText(sec,/^Your exam is in about a month$/,EXAM_ABOUT[state.exam]||EXAM_ABOUT['1m']);
  // the two plan rows: the one showing ₹499 and the one showing ₹999
  const rowOf=price=>byText(sec,price).map(e=>climbTo(e,x=>/border-radius:(1[2-9]|2\d)px/.test(x.getAttribute('style')||'')&&/height|padding/.test(x.getAttribute('style')||''))).filter(Boolean)[0];
  const rows=[rowOf('₹499'),rowOf('₹999')]; if(!rows[0]||!rows[1]) return;
  const S=[rows[0].getAttribute('style'),rows[1].getAttribute('style')];
  const radioOf=r=>[...r.querySelectorAll('div,svg')].find(d=>{ const st=d.getAttribute('style')||''; return /border-radius:(999px|50%)/.test(st)&&/width:(2\d)px/.test(st); });
  const R=rows.map(r=>{ const d=radioOf(r); return d&&d.outerHTML; });
  rows.forEach((r,i)=>{ const p=plans[i]; const leaves=[...r.querySelectorAll('div')].filter(d=>!d.children.length);
    leaves.forEach(d=>{ const t=d.textContent.trim(); if(/^\d+ (month|months|weeks?)$/.test(t)) d.textContent=p.len; else if(/^₹[\d,]+$/.test(t)) d.textContent=rupees(p.price); else if(/Covers your exam date|room for a retake/.test(t)) d.textContent=p.note; }); });
  const pay=byText(sec,/^Pay ₹/);
  const pick=i=>{ rows.forEach((r,k)=>{ r.setAttribute('style',S[k===i?1:0]); const d=radioOf(r), want=R[k===i?1:0]; if(d&&want) d.outerHTML=want; r.classList.add('tap'); });
    pay.forEach(e=>e.textContent=`Pay ${rupees(plans[i].price)}`); save({plan:i}); };
  rows.forEach((r,i)=>r.addEventListener('click',()=>pick(i)));
  pick(state.plan??1);
  pay.forEach(e=>onTap(hit(e,3),()=>fakePay(plans[state.plan??1])));
  byText(sec,/^(Not now, open my report in the app|Open my report in the app)$/).forEach(e=>onTap(e,()=>go('signup')));
});
// A stand-in for the Razorpay sheet: a short "paying" moment, then done
function fakePay(p){
  const o=document.createElement('div'); o.className='paysheet';
  o.innerHTML=`<div class="ps-card"><div class="ps-top"><b>Stimuler</b><span>${rupees(p.price)} · ${p.len}</span></div>
    <div class="ps-body"><div class="ps-spin"></div><div class="ps-msg">Paying with UPI…</div><div class="ps-note">This is a demo. No money is taken.</div></div>
    <div class="ps-foot">Secured by Razorpay</div></div>`;
  document.body.appendChild(o); requestAnimationFrame(()=>o.classList.add('in'));
  setTimeout(()=>{ o.querySelector('.ps-msg').textContent='Payment done'; o.querySelector('.ps-spin').classList.add('ok'); },1600);
  setTimeout(()=>{ o.remove(); save({paid:true}); go('paid'); },2500);
}

// Sign up (free) and create account (after paying) share one form
function accountForm(sec,state,next){
  personal(sec,state);
  const field=byText(sec,emailOf(state))[0], dots=byText(sec,'••••••••')[0];
  const mk=(el,type,val,ph)=>{ if(!el) return null; const i=document.createElement('input'); i.type=type; i.value=val; i.placeholder=ph; i.setAttribute('style',el.getAttribute('style')); Object.assign(i.style,{background:'transparent',border:'0',outline:'none',width:'100%',padding:'0',color:'#fff',letterSpacing:'normal',minWidth:'0',flex:'1'}); el.replaceWith(i); return i; };
  const em=mk(field,'email',state.email||'', 'you@example.com'), pw=mk(dots,'password','', 'At least 8 characters');
  const show=byText(sec,'Show')[0]; if(show){ show.style.whiteSpace='nowrap'; show.style.flexShrink='0'; } if(show&&pw) onTap(show,()=>{ pw.type=pw.type==='password'?'text':'password'; show.textContent=pw.type==='password'?'Show':'Hide'; });
  const done=()=>{ const v=em?.value.trim(); if(v) save({email:v}); go(next); };
  const create=byText(sec,'Create account')[0];
  if(create) onTap(hit(create,3),()=>{ if(em&&!/.+@.+\..+/.test(em.value)){ em.focus(); em.parentElement.style.borderColor='#E07A6E'; return; } if(pw&&pw.value.length<8){ pw.focus(); pw.parentElement.style.borderColor='#E07A6E'; return; } done(); });
  tapText(sec,'Continue with Google',()=>{ save({email:state.email||emailOf(state)}); go(next); },4);
  [em,pw].forEach(i=>i?.addEventListener('keydown',e=>{ if(e.key==='Enter') create&&hit(create,3).click(); }));
  byText(sec,/Back to my result/).forEach(e=>onTap(e.parentElement,()=>go('result')));
}
screen('signup',(sec,{state})=>accountForm(sec,state,'getapp'));
screen('paid',(sec,{state})=>{
  const p=paidPlan(state);
  byText(sec,/^Paid ₹999/).forEach(e=>e.textContent=e.textContent.replace('₹999',rupees(p.price)).replace('3 months',p.len));
  accountForm(sec,state,'inapp');
});

// Get the app: QR on desktop, install button on mobile and tablet. In the prototype both open the app.
function getApp(sec,state,paid){
  personal(sec,state);
  if(paid){ const p=paidPlan(state);
    byText(sec,/^Paid ₹999 for 3 months/).forEach(e=>e.textContent=`Paid ${rupees(p.price)} for ${p.len}. Your receipt is in your email.`);
    // mobile and tablet reuse the free design: swap the words
    setText(sec,'Your report is saved. Open it in the app.',`You’re in, ${state.name||'Priya'}. Now open the app.`);
    setText(sec,'Your report opens right away','Everything is unlocked when you log in');
  }
  // Prototype: the whole QR card is a button into the app prototype
  const scan=byText(sec,'Scan to open Stimuler')[0];
  const card=scan&&climbTo(scan,e=>/border-radius:(2\d|3\d)px/.test(e.getAttribute('style')||''));
  if(card){ onTap(card,()=>openApp(state,paid)); card.title='Open the app prototype'; card.classList.add('qr-demo');
    const sub=byText(card,/^(Your report opens after you log in|Everything is unlocked when you log in)$/)[0];
    if(sub){ const hint=document.createElement('div'); hint.className='qr-hint'; hint.textContent='Prototype: tap to open the app'; sub.after(hint); } }
  tapText(sec,/^Install Stimuler, it’s free$/,()=>openApp(state,paid));
}
// The app is its own prototype; it opens with the same person and path
function openApp(state,paid){
  const base=location.hostname==='localhost'?'http://localhost:8791':'https://ielts-app-prototype.vercel.app';
  const p=new URLSearchParams({path:paid?'A':(['B','C','D'].includes(state.path)?state.path:'B'),name:state.name||'Priya',exam:state.exam||'1m',target:String(state.target||7),test:state.test||'Cities and places'});
  location.href=`${base}/?${p}#/b0`;
}
screen('getapp',(sec,{state})=>getApp(sec,state,false));
screen('inapp',(sec,{state})=>getApp(sec,state,true));

// ---- the test ----
screen('test',sec=>mountTest(sec));

start();
