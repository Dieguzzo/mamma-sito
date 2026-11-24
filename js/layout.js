/* MAMMA · intestazione e piè di pagina comuni alle pagine desktop.
   Nella pagina: <div id="testa"></div> all'inizio del body, <div id="piede"></div> alla fine,
   e <body data-sezione="agenzia|zone|bollino|servizi|trasparenza"> per la voce attiva. */
(function(){
  const src = document.currentScript.src;
  const B = src.slice(0, src.lastIndexOf('js/layout.js'));
  const sez = document.body.dataset.sezione || '';
  const utente = document.body.dataset.utente;
  const voce = (k, testo, href) => `<a href="${B}${href}"${sez===k?' class="on" aria-current="page"':''}>${testo}</a>`;
  const testa = `
<div class="slim"><div class="wrap"><span>Repubblica Italiana · Agenzia MAMMA</span><div class="slim-r"><span>ITA</span><a class="area" href="${B}area-riservata/"><span data-icon="utente"></span>${utente ? utente + ' · Esci' : 'Area riservata'}</a></div></div></div>
<header class="head"><div class="wrap">
  <div class="brandrow">
    <a class="brand" href="${B}index.html" aria-label="MAMMA, vai alla home"><span class="logo"><img src="${B}assets/logo.svg" alt="" width="56" height="56"></span><span class="nome"><span class="lt"><img src="${B}assets/logotipo.svg" alt="MAMMA" height="25"></span><small>Agenzia per il Monitoraggio Atmosferico e la Modifica Meteorologica Ambientale</small></span></a>
    <a class="cerca" href="${B}index.html?cerca" aria-label="Cerca un comune">Cerca <span data-icon="lente"></span></a>
    <button class="apri-menu" type="button" aria-expanded="false" aria-controls="nav-main" aria-label="Apri il menu" onclick="const h=this.closest('.head'),a=h.classList.toggle('aperto');this.setAttribute('aria-expanded',a);this.setAttribute('aria-label',a?'Chiudi il menu':'Apri il menu')"><span data-icon="menu"></span></button>
  </div>
  <nav class="main" id="nav-main" aria-label="Principale" onclick="this.closest('.head').classList.remove('aperto')">${voce('agenzia',"L'Agenzia",'agenzia/chi-siamo/')}${voce('zone','Zone e interventi','index.html#zone-e-interventi')}${voce('bollino','Bollino e prodotti','bollino/')}${voce('servizi','Servizi','servizi/preavvisi/')}${voce('trasparenza','Trasparenza','trasparenza/')}</nav>
</div></header>`;
  const piede = `
<footer class="piede"><div class="wrap">
  <div class="ente">
    <a class="marchio" href="${B}index.html" aria-label="MAMMA, vai alla home"><img src="${B}assets/logo.svg" alt="" width="44" height="44"><img class="lt" src="${B}assets/logotipo.svg" alt="MAMMA" height="18"></a>
    <p>Agenzia per il Monitoraggio Atmosferico<br>e la Modifica Meteorologica Ambientale</p>
    <small>© 2026 MAMMA · Società in house a controllo pubblico</small>
  </div>
  <nav aria-label="Agenzia"><span class="etichetta">Agenzia</span><a href="${B}agenzia/chi-siamo/">Chi siamo</a><a href="${B}agenzia/come-interveniamo/">Come interveniamo</a><a href="${B}index.html#zone-e-interventi">Zone e interventi</a><a href="${B}bollino/">Bollino e prodotti</a></nav>
  <nav aria-label="Servizi"><span class="etichetta">Servizi</span><a href="${B}servizi/preavvisi/">Preavvisi</a><a href="${B}servizi/segnalazioni/">Segnalazioni e reclami</a><a href="${B}area-riservata/">Area riservata</a><a href="${B}app/">App MAMMA</a></nav>
  <nav aria-label="Note"><span class="etichetta">Note</span><a href="${B}trasparenza/">Amministrazione trasparente</a><a href="#">Accessibilità</a><a href="#">Privacy</a><a href="#">Note legali</a></nav>
</div><div class="wrap scenario">Progetto di speculative design · Politecnico di Milano · i dati sono di scenario</div></footer>`;
  const t = document.getElementById('testa'); if (t) t.outerHTML = testa;
  const p = document.getElementById('piede'); if (p) p.outerHTML = piede;
  window.BASE_MAMMA = B;
})();
