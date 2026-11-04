// Helpers for wiring behaviour onto screens exported from Paper.
export const $$=(root,sel)=>[...root.querySelectorAll(sel)];
// Deepest elements whose own text matches (string or RegExp).
export function byText(root,match){
  const test=t=>typeof match==='string'?t===match:match.test(t);
  return $$(root,'*').filter(el=>{ const t=el.textContent.trim(); if(!test(t)) return false; return ![...el.children].some(c=>test(c.textContent.trim())); });
}
// Walk up to the element that looks like the button/card around a label.
export function hit(el,max=4){
  let n=el;
  for(let i=0;i<max&&n;i++){ const s=n.getAttribute&&n.getAttribute('style')||''; if(/border-radius:999px|border-radius:\s*999px/.test(s)||/background-image:linear-gradient/.test(s)&&/height:(4|5)\dpx/.test(s)) return n; n=n.parentElement; }
  return el.parentElement||el;
}
export function onTap(el,fn){ if(!el) return; el.classList.add('tap'); el.addEventListener('click',e=>{e.preventDefault();fn(e);}); }
export function tapText(root,text,fn,max){ byText(root,text).forEach(el=>onTap(hit(el,max),fn)); }
