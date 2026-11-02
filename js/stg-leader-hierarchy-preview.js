/* STG-only visual hierarchy for leader approval. No backend calls or writes. */
(function(){
  'use strict';
  const groups={
    '154274':{name:'MARTINEZ TRILLA JORGE ANTONIO',people:[['265296','LOZANO VEGA PAOLA','ADMINISTRACION DE CONTRATOS IC WEB']]},
    '106455':{name:'FRAGOSO PRADO MARICELA',people:[['226136','GARCIA OLARTE MARIA VICTORIA','TESORERIA']]},
    '162083':{name:'FERNANDEZ ESPARZA FRANCES JOLANTA',people:[['202922','MARTINEZ SANDOVAL VIRIDIANA','IMSS E INFONAVIT'],['208232','JUAREZ DE LA LUZ MIRIAM','NOMINAS']]},
    '238951':{name:'AVINA TAVARES FERNANDO MATIAS',people:[['255149','SANCHEZ SEDANO ROSA PAULINA','FINANZAS'],['260503','GOMEZ SEGUNDO MARIELA','FINANZAS']]}
  };
  function mount(){
    const nav=document.querySelector('a[href="#/lider/mi-area"].active');
    if(!nav)return;
    const heading=Array.from(document.querySelectorAll('h2')).find(n=>n.textContent.trim()==='Responsables dentro de mi área');
    if(!heading)return;
    const card=heading.closest('.card'); if(!card||card.querySelector('#stgLeaderHierarchy'))return;
    const user=(document.querySelector('.premium-user-menu')||{}).textContent||'';
    if(!/MEJIA ROMERO JORGE LUIS/i.test(user))return;
    const section=document.createElement('section');
    section.id='stgLeaderHierarchy';
    section.style.cssText='display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:12px;margin:18px 0 0;';
    Object.keys(groups).forEach(id=>{
      const data=groups[id],box=document.createElement('article');
      box.style.cssText='border:1px solid #d5e1ef;border-radius:12px;background:#f8fbff;overflow:hidden';
      const button=document.createElement('button');button.type='button';button.setAttribute('aria-expanded','false');
      button.style.cssText='border:0;background:white;width:100%;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:15px;text-align:left;color:#0c2c51;font-weight:700;cursor:pointer;';
      const label=document.createElement('span');label.textContent=data.name+' · '+data.people.length+' a cargo';
      const symbol=document.createElement('strong');symbol.textContent='+';
      button.append(label,symbol);
      const panel=document.createElement('div');panel.hidden=true;panel.style.cssText='padding:12px 15px;border-top:1px solid #d5e1ef;';
      data.people.forEach(p=>{
        const person=document.createElement('div');person.style.cssText='padding:10px 0;border-bottom:1px solid #e0e8f3;';
        const title=document.createElement('strong');title.textContent=p[1];title.style.display='block';
        const sub=document.createElement('small');sub.textContent=p[0]+' · '+p[2];sub.style.color='#667f99';
        person.append(title,sub);panel.append(person);
      });
      const view=document.createElement('button');view.type='button';view.className='btn btn-primary btn-sm';view.textContent='Ver evaluaciones del equipo →';view.style.marginTop='12px';
      view.addEventListener('click',()=>{
        const select=document.getElementById('leaderAreaFilter');
        if(select){select.value=id;select.dispatchEvent(new Event('change',{bubbles:true}));}
      });
      panel.append(view);
      button.addEventListener('click',()=>{
        const open=panel.hidden; panel.hidden=!open;symbol.textContent=open?'−':'+';button.setAttribute('aria-expanded',String(open));
      });
      box.append(button,panel);section.append(box);
    });
    const oldButtons=Array.from(card.querySelectorAll('button')).filter(b=>Object.values(groups).some(g=>b.textContent.includes(g.name)));
    oldButtons.forEach(b=>b.style.display='none');
    card.append(section);
    const note=document.createElement('p');note.textContent='Vista STG: asignaciones de referencia del catálogo. No representa estados ni calificaciones verificadas.';note.style.cssText='color:#6b7e96;font-size:12px;margin:10px 0';card.append(note);
  }
  let running=false;
  new MutationObserver(()=>{if(running)return;running=true;setTimeout(()=>{try{mount()}finally{running=false}},80)}).observe(document.getElementById('app-root')||document.body,{childList:true,subtree:true});
  mount();
})();