(function(){
  'use strict';
  const CAMPAIGN='360-DEV-AOP-2027-01';
  function applyFix(){
    const summary=document.getElementById('summary');
    const pending=document.getElementById('pendingPill');
    if(!summary||!pending) return;
    const txt=(summary.textContent||'').trim();
    if(!txt.includes('La campaña todavía no está activa.')) return;
    pending.textContent='Sin asignaciones';
    pending.classList.remove('done');
    summary.innerHTML='<article class="card assignment" style="grid-column:1/-1;text-align:center"><div class="eyebrow">Evaluación 360°</div><h3>No tienes evaluaciones asignadas en esta campaña.</h3><div class="role">Tu usuario no forma parte del universo evaluador de '+CAMPAIGN+'.</div></article>';
  }
  applyFix();
  const root=document.getElementById('summary')||document.body;
  new MutationObserver(applyFix).observe(root,{childList:true,subtree:true,characterData:true});
})();
