import {parse} from '@babel/parser';
const keepCamel=new Set(['viewBox','preserveAspectRatio','gradientTransform','gradientUnits','patternUnits','stdDeviation','baseFrequency','numOctaves','clipPathUnits','maskUnits']);
const kebab=s=>s.replace(/[A-Z]/g,m=>'-'+m.toLowerCase());
const unitless=new Set(['opacity','zIndex','flexGrow','flexShrink','fontWeight','lineHeight','order','zoom','flex']);
function cssKey(k){ if(k.startsWith('Moz')||k.startsWith('Webkit')) return '-'+kebab(k).slice(1).replace(/^./,c=>c); return kebab(k).replace(/^moz-/,'-moz-').replace(/^webkit-/,'-webkit-'); }
function val(node){
  switch(node.type){
    case 'StringLiteral': return node.value;
    case 'NumericLiteral': return node.value;
    case 'TemplateLiteral': return node.quasis.map(q=>q.value.cooked).join('');
    case 'UnaryExpression': return -val(node.argument);
    case 'ObjectExpression': { const o={}; for(const p of node.properties){ const k=p.key.name??p.key.value; o[k]=val(p.value);} return o; }
    default: return '';
  }
}
function styleStr(o){ return Object.entries(o).map(([k,v])=>`${cssKey(k)}:${typeof v==='number'&&!unitless.has(k)&&v!==0?v+'px':v}`).join(';'); }
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
function attrName(n,tag){ if(n==='className') return 'class'; if(n==='htmlFor') return 'for'; if(keepCamel.has(n)) return n; if(n.startsWith('data')||n.startsWith('aria')) return kebab(n); if(/^(xlinkHref)$/.test(n)) return 'xlink:href'; return kebab(n); }
function el(node){
  if(node.type==='JSXText'){ const t=node.value.replace(/\s+/g,' '); return t.trim()===''? (t.includes('\n')?'':t) : esc(t).replace(/^\s+|\s+$/g,m=>m?' ':''); }
  if(node.type==='JSXExpressionContainer'){ const v=val(node.expression); return typeof v==='string'?esc(v):''; }
  if(node.type==='JSXFragment') return node.children.map(el).join('');
  const tag=node.openingElement.name.name;
  let attrs='';
  for(const a of node.openingElement.attributes){
    if(a.type!=='JSXAttribute') continue;
    const n=a.name.name; let v= a.value==null? '' : a.value.type==='StringLiteral'? a.value.value : val(a.value.expression);
    if(n==='style'&&typeof v==='object') v=styleStr(v);
    attrs+=` ${attrName(n,tag)}="${esc(v)}"`;
  }
  const kids=node.children.map(el).join('');
  const voids=new Set(['img','br','hr','input','meta','link']);
  if(voids.has(tag)) return `<${tag}${attrs}>`;
  return `<${tag}${attrs}>${kids}</${tag}>`;
}
export function jsxToHtml(src){
  const code=src.trim().replace(/^\(/,'').replace(/\)\s*;?$/,'');
  const ast=parse(code,{plugins:['jsx']});
  const expr=ast.program.body[0].expression;
  return el(expr);
}
