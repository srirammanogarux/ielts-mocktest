import json, csv, re, html, os
UNI=lambda t: re.sub(r'\\\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1),16)), t)
ROOT='/Users/sriram/conductor/workspaces/ielts-mocktest/amman'
DAYS=[('Day 1','prototype','Part 1 · teach then test'),
      ('Day 2','prototype-day2','Part 2 · the cue card'),
      ('Day 3','prototype-day3','Part 3 · the discussion'),
      ('Day 4','prototype-mock','Full mock test')]
VOICE={'sarah':'Sarah (guide)','aarav':'Aarav (student clip)','student':'Student clip',
       'nolan':'Nolan (examiner)'}
rows=[]
def add(day,n,beat,variant,kind,who,text,extra=''):
    rows.append([day,n,beat,variant,kind,who,text,extra])

for day,folder,sub in DAYS:
    L=json.load(open(f'{ROOT}/{folder}/vo/lines.json'))['lines']
    for l in L:
        add(day,l['beat'],l['title'],l['branch'] or 'all',
            'Spoken',VOICE.get(l['speaker'],l['speaker']),UNI(l['say']),
            '' if l['cap']==l['say'] else 'caption: '+(l['cap'] or '(caption stays)'))

# ---- on-screen content, per day ----
h1=open(f'{ROOT}/prototype/index.html').read()
add('Day 1','','Your question','all','On screen · question card','PART 1 · WORK',
    'What do you do for a living, and how do you feel about it?')
ANS=re.findall(r"\['([^']+)',\s*\"([^\"]+)\"", h1)
for lab,txt in ANS[:4]:
    add('Day 1','','Model answer (Aarav)','all','On screen · answer line',lab,UNI(html.unescape(txt)))

h2=open(f'{ROOT}/prototype-day2/index.html').read()
cards=re.findall(r"(\w+):\{topic:'([^']+)',\s*\n?\s*points:\[([^\]]+)\]", h2)
for key,topic,pts in cards:
    pts=[p.strip().strip("'") for p in pts.split("','")]
    add('Day 2','','Cue card',key,'On screen · cue card','Topic',topic)
    for p in pts: add('Day 2','','Cue card',key,'On screen · cue card','You should say',p.strip("'"))
notes=re.search(r"const NOTES = \[([^\]]+)\]",h2).group(1)
for nt in [x.strip().strip("'") for x in notes.split(',')]:
    add('Day 2','','The prep minute','trip','On screen · sample note','note',nt)

h3=open(f'{ROOT}/prototype-day3/index.html').read()
qs=re.search(r"const QS = \{(.*?)\n\};",h3,re.S).group(1)
for br in ['tech','edu']:
    blk=re.search(br+r":\[(.*?)\n  \]",qs,re.S)
    if not blk: continue
    for i,(q,shape,tip) in enumerate(re.findall(r"\['([^']+)','([^']+)',\s*\n?\s*'([^']+)'",blk.group(1)),1):
        add('Day 3','',f'Question {i}',br,'On screen · question','Nolan asks',q,'shape: '+shape+' · tip: '+tip)
chips=re.findall(r"(\w+)\s*:\s*\{parts:\[([^\]]+)\]",h3)
for key,parts in chips:
    ps=[p.strip().strip("'").strip('“”') for p in parts.split(',')]
    add('Day 3','','Answer shape',key,'On screen · chip','steps',' → '.join(ps))

h4=open(f'{ROOT}/prototype-mock/index.html').read()
for t,lab,q,tip,cap in re.findall(r"ask\('([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*(\d+)",h4):
    add('Day 4','',t,'all','On screen · question',lab,q,f'bubble: {tip} · cap {cap}s')
m=re.search(r"person:\{topic:'([^']+)',\s*\n?\s*points:\[([^\]]+)\]",h4)
add('Day 4','','Your cue card','all','On screen · cue card','Topic',m.group(1))
for p in [x.strip().strip("'") for x in m.group(2).split("','")]:
    add('Day 4','','Your cue card','all','On screen · cue card','You should say',p.strip("'"))
nt=re.search(r"const NOTES = \[([^\]]+)\]",h4).group(1)
for x in [y.strip().strip("'") for y in nt.split(',')]:
    add('Day 4','','The prep minute','all','On screen · sample note','note',x)

out=f'{ROOT}/docs/scripts/ielts-lesson-scripts.csv'
with open(out,'w',newline='') as f:
    w=csv.writer(f)
    w.writerow(['Day','Beat #','Beat','Variant','Type','Who / label','Text','Notes'])
    w.writerows(rows)
print('rows',len(rows),'->',out)
from collections import Counter
print(Counter(r[0] for r in rows))
print(Counter(r[4].split(' · ')[0] for r in rows))
