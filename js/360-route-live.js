(function(){
  'use strict';

  function patch360Links(){
    document.querySelectorAll('a[href="360-demo-final.html"],a[href="360-live.html"]').forEach(function(a){
      a.setAttribute('href','360-live.html');
      if(a.dataset.live360Bound==='1') return;
      a.dataset.live360Bound='1';
      a.addEventListener('click',function(ev){
        if(ev.ctrlKey||ev.metaKey||ev.shiftKey||ev.altKey||ev.button!==0) return;
        ev.preventDefault();
        fetch('360-live.html',{cache:'no-store'})
          .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.text(); })
          .then(function(html){
            if(html.indexOf('360-empty-state-fix.js')===-1){
              html=html.replace('</body>','<script src="js/360-empty-state-fix.js?v=20261001b"><\/script></body>');
            }
            history.pushState({},'', '360-live.html');
            document.open();
            document.write(html);
            document.close();
          })
          .catch(function(){ window.location.href='360-live.html'; });
      });
    });
  }

  patch360Links();
  const root=document.getElementById('app-root')||document.body;
  new MutationObserver(patch360Links).observe(root,{childList:true,subtree:true});
})();
