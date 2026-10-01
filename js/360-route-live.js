(function(){
  'use strict';
  function patch360Links(){
    document.querySelectorAll('a[href="360-demo-final.html"]').forEach(function(a){
      a.setAttribute('href','360-live.html');
    });
  }
  patch360Links();
  const root=document.getElementById('app-root')||document.body;
  new MutationObserver(patch360Links).observe(root,{childList:true,subtree:true});
})();
