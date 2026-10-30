import sys,re
from html.parser import HTMLParser
KEEP=['position','top','left','right','bottom','width','height','display','flex-direction','align-items','justify-content','gap','padding','padding-top','padding-bottom','padding-inline','padding-block','margin-top','font-family','font-size','font-weight','line-height','letter-spacing','color','background-color','background-image','border-radius','border-color','border-width','border','box-shadow','opacity','text-align','rotate']
class P(HTMLParser):
  def __init__(s,sec): super().__init__(); s.d=0; s.out=[]; s.sec=sec; s.on=False; s.cur=None
  def handle_starttag(s,t,a):
    a=dict(a)
    if t=='section': s.on=(s.sec in a.get('class','')); return
    if not s.on: return
    if t in('path','circle','rect','stop','defs','lineargradient','radialgradient','line','ellipse','polygon','g'): return
    st=a.get('style','')
    kv=[x.split(':',1) for x in st.split(';') if ':' in x]
    kv=[(k.strip(),v.strip()) for k,v in kv if k.strip() in KEEP]
    txt=' '.join(f"{k}:{re.sub(r'url\\([^)]*\\)','url()',v)[:60].replace('system-ui, sans-serif','').replace('&quot;','')}" for k,v in kv)
    s.out.append('  '*s.d+f"<{t}> {txt}"); 
    if t not in('img','br','input'): s.d+=1
  def handle_endtag(s,t):
    if t=='section': s.on=False; return
    if not s.on or t in('path','circle','rect','stop','defs','lineargradient','radialgradient','line','ellipse','polygon','g','img','br','input'): return
    s.d-=1
  def handle_data(s,d):
    if s.on and d.strip(): s.out.append('  '*s.d+'» '+d.strip()[:80])
f,sec=sys.argv[1],sys.argv[2]
p=P('bp-'+sec); p.feed(open(f).read()); print('\n'.join(p.out))
