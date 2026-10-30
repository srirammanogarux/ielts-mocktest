import {DEFAULTS} from './data.js';
const KEY='ielts-funnel';
export const state=Object.assign({},DEFAULTS,JSON.parse(localStorage.getItem(KEY)||'{}'));
// query params override: ?path=A&exam=2w&target=7.0&topic=gold&name=Priya
const q=new URLSearchParams(location.search);
for(const k of ['path','exam','target','band','name','test','topic']) if(q.has(k)) state[k]=['target','band'].includes(k)?parseFloat(q.get(k)):q.get(k);
export function save(patch){ Object.assign(state,patch); localStorage.setItem(KEY,JSON.stringify(state)); }
// Exam date: the option picked in onboarding sets an approximate real date.
const DAYS={'2w':14,'1m':30,'2m':60,'3m':90};
export function examDate(){ const d=new Date(); d.setDate(d.getDate()+(DAYS[state.exam]||30)); return d; }
export function daysLeft(){ return DAYS[state.exam]||30; }
export function examDateLabel(){ return examDate().toLocaleDateString('en-GB',{day:'numeric',month:'long'}); }
