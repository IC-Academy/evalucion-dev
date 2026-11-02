/* STG leader-area visual review. 255989 only. No data writes or cross-user API calls. */
(function(){
'use strict';
const teams={
'154274':{name:'MARTINEZ TRILLA JORGE ANTONIO',people:[['265296','LOZANO VEGA PAOLA','ADMINISTRACION DE CONTRATOS IC WEB']]},
'106455':{name:'FRAGOSO PRADO MARICELA',people:[['226136','GARCIA OLARTE MARIA VICTORIA','TESORERIA']]},
'162083':{name:'FERNANDEZ ESPARZA FRANCES JOLANTA',people:[['202922','MARTINEZ SANDOVAL VIRIDIANA','IMSS E INFONAVIT'],['208232','JUAREZ DE LA LUZ MIRIAM','NOMINAS']]},
'238951':{name:'AVINA TAVARES FERNANDO MATIAS',people:[['255149','SANCHEZ SEDANO ROSA PAULINA','FINANZAS'],['260503','GOMEZ SEGUNDO MARIELA','FINANZAS']]}
};
let current='todos',busy=false;
function valid(){
return !!document.querySelector('a[href="#/lider/mi-area"].active') &&
/MEJIA ROMERO JORGE LUIS/i.test((document.querySelector('.premium-user-menu')||{}).textContent||'');
}
function selectTeam(id){
current=id;
const select=document.getElementById('leaderAreaFilter');
if(select&&select.value!==id){select.value=id;select.dispatchEvent(new Event('change',{bubbles:true}));}
requestAnimationFrame(mount);
}
function mount(){
if(!valid())return;
const heading=Array.from(document.querySelectorAll('h2')).find(n=>n.textContent.trim()==='Responsables dentro de mi área');
const card=heading&&heading.closest('.card'); if(!card)return;
if(!card.querySelector('#stgLeaderHierarchy')){
const area=document.createElement('section');area.id='stgLeaderHierarchy';
area.style.cssText='display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:12px;margin:18px 0 0';
Object.entries(teams).forEach(([id,data])=>{
const button=document.createElement('button');button.type='button';button.dataset.manager=id;
button.style.cssText='border:1px solid #d7e3f1;border-radius:12px;padding:16px;text-align:left;background:#fff;color:#103b64;cursor:pointer;min-height:75px;display:flex;justify-content:space-between;gap:8px;align-items:center';
const title=document.createElement('span');title.textContent=data.name;
const badge=document.createElement('span');badge.textContent=data.people.length+' a cargo';badge.style.cssText='white-space:nowrap;font-size:11px;color:#6a8098';
button.append(title,badge);button.addEventListener('click',()=>selectTeam(id));area.append(button);
});
const legacyButtons=Array.from(card.querySelectorAll('button')).filter(b=>Object.values(teams).some(g=>b.textContent.includes(g.name)));
legacyButtons.forEach(b=>b.hidden=true);
card.append(area);
}
card.querySelectorAll('#stgLeaderHierarchy button').forEach(b=>{
const selected=b.dataset.manager===current;
b.style.background=selected?'#0e4e8c':'#fff';b.style.color=selected?'#fff':'#103b64';
b.style.borderColor=selected?'#0e4e8c':'#d7e3f1';b.style.boxShadow=selected?'0 0 0 3px #bcdcff':'none';
b.setAttribute('aria-pressed',String(selected));const sub=b.querySelector('span:last-child');if(sub)sub.style.color=selected?'#e4f2ff':'#6a8098';
});
const select=document.getElementById('leaderAreaFilter');if(!select)return;
if(!select.dataset.stgManagerBound){
select.dataset.stgManagerBound='true';
select.addEventListener('change',()=>{current=select.value;requestAnimationFrame(mount)});
}
if(select.value!==current)return;
const table=select.closest('.card')?.querySelector('table');
if(!table)return;
table.querySelectorAll('tr[data-stg-child]').forEach(tr=>tr.remove());
if(!teams[current])return;
const tbody=table.querySelector('tbody');if(!tbody)return;
for(const [id,name,area] of teams[current].people){
const tr=document.createElement('tr');tr.dataset.stgChild=id;
const cols=[name+' | '+id,area,'—','Vista demostrativa','—','—','Sin expediente conectado'];
cols.forEach((v,i)=>{const td=document.createElement('td');
if(i===0){const strong=document.createElement('strong');strong.textContent=name;td.append(strong,document.createElement('br'));const small=document.createElement('small');small.textContent=id;td.append(small);}
else{td.textContent=v;if(i===6)td.style.color='#758aa4';}
tr.append(td);});tbody.append(tr);
}
const notice=select.closest('.card').querySelector('#stgChildrenNotice')||document.createElement('p');
notice.id='stgChildrenNotice';
notice.textContent='Equipo subordinado mostrado para aprobación visual. Las calificaciones y expedientes de estos colaboradores se conectarán tras autorizar el backend.';
notice.style.cssText='font-size:12px;color:#657e9a;margin:12px 0';
if(!notice.parentElement)table.parentElement.append(notice);
}
new MutationObserver(()=>{if(busy)return;busy=true;setTimeout(()=>{try{mount()}finally{busy=false}},100)}).observe(document.getElementById('app-root')||document.body,{childList:true,subtree:true});
mount();
})();