/* MAMMA · web app di certezze meteo. Oggi è mercoledì 18 novembre 2026, ore 10:40.
   Struttura e testi delle schermate "App · Schermate per il prototipo" del checkpoint Figma. */
(function(){
const ROOT = '../../';
const $ = s => document.querySelector(s);
const I = n => icona(n);
const salva = (k,v) => { try{ localStorage.setItem('mamma.'+k, JSON.stringify(v)); }catch(e){} };
const leggi = (k,d) => { try{ const v = localStorage.getItem('mamma.'+k); return v===null ? d : JSON.parse(v); }catch(e){ return d; } };
const R = (k,f='w') => `<img class="r" src="img/${f}-${k}.webp" alt="">`;

/* ---------- dati ---------- */
const COMUNI = {
 pachino:{nome:'Pachino', regione:'Sicilia', zona:'p', zonaNome:'Zona protetta', badge:1,
  intro:{t:'Pachino è in zona protetta', p:'Qui il sole è garantito per il Pomodoro di Pachino IGP. Ogni giorno ti diciamo come lo proteggiamo e fino a quando.', voci:["Sole garantito dall'alba al tramonto",'Nessun maltempo da cui proteggerti','Raccolto garantito giovedì 3 dicembre'], g:"Il tuo territorio custodisce un'eccellenza del Made in Italy."},
  settimana:[['L',16,'sole','06:38','Sole garantito','06:38–17:12'],['M',17,'sole','06:39','Sole garantito','06:39–17:11'],['M',18,'sole','06:40','Sole garantito','06:40–17:10'],['G',19,'sole','06:41','Sole garantito','06:41–17:10'],['V',20,'sole','06:42','Sole garantito','06:42–17:09'],['S',21,'sole','06:43','Sole garantito · protezione rinforzata','Razzi antigrandine in quota dalle 15:00','PROTEZIONE RINFORZATA'],['D',22,'sole','06:44','Sole garantito','06:44–17:08']],
  mese:Array(30).fill('sole')},
 milano:{nome:'Milano', regione:'Lombardia', zona:'c', zonaNome:'Zona di compensazione', badge:3,
  intro:{t:'Milano è in zona di compensazione', p:'Qui arriva la pioggia spostata dalla Liguria, per proteggere il Basilico Genovese DOP. Ti avvisiamo sempre prima, perché tu possa organizzarti.', voci:['Pioggia di compensazione con orari e margini precisi','Avvisi ufficiali almeno 72 ore prima','Consigli per proteggerti dai fenomeni intensi'], g:'Grazie per il tuo contributo al Made in Italy.'},
  settimana:[['L',16,'pioggia','06–10','Pioggia di compensazione','06:00–10:00 · ± 40 min'],['M',17,'nessuno','—','Nessun intervento','Tempo non garantito'],['M',18,'pioggia','14–17','Pioggia di compensazione','14:00–17:00 · ± 40 min'],['G',19,'pioggia','09–13','Pioggia di compensazione','09:00–13:00 · ± 40 min'],['V',20,'acquazzone','18–19','Acquazzone di compensazione','18:00–19:00 · fino a 35 mm'],['S',21,'grandine','16–16:30','Grandinata di compensazione','16:00–16:30 · ± 2 ore · chicchi fino a 15 mm','AVVISO UFFICIALE'],['D',22,'nessuno','—','Nessun intervento','Tempo non garantito']],
  /* come nel Figma, 21 giorni con interventi, 3 acquazzoni, 2 grandinate, 1 tempesta di sabbia */
  mese:'n p p n a p n p p g n p s n p p n p p a g n p p n p a n p p'.split(' ').map(k=>({p:'pioggia',a:'acquazzone',g:'grandine',s:'sabbia',n:'nessuno'})[k])}
};
function h(t){const [a,b]=t.split(':').map(Number); return a+b/60;}
const DETT = {
 pachino:d=>{const s=COMUNI.pachino.settimana.find(x=>x[1]===d); const r=d===21; const [da,a]=(r?'06:43–17:09':s[5]).split('–');
  return {tit:r?'Sole garantito · protezione rinforzata':'Sole garantito', ora:`${da}–${a} · tutta la giornata`, tec:r?['razzo','Razzi antigrandine · in quota dalle 15:00']:['specchio','Specchi solari · '+da+'–'+a],
   testo:r?'Una perturbazione con grandine passa al largo della Sicilia. I razzi la frammentano in quota, il sole resta garantito e non devi fare nulla.':"Gli specchi orientano la luce sulle coltivazioni dall'alba al tramonto. Nessun margine di scostamento.",
   f:{da:h(da),a:h(a),m:0,sole:1}};},
 milano:d=>({
  16:{tit:'Pioggia di compensazione',ora:'06:00–10:00 · margine ± 40 min',tec:['seeding','Cloud seeding · 05:00'],testo:'La pioggia arriva dalla Liguria e protegge il Basilico Genovese DOP.',f:{da:6,a:10,m:2/3,l:5}},
  17:{tit:'Nessun intervento',ora:'Tempo non garantito',tec:null,testo:'Oggi MAMMA non interviene sul tuo comune. Il tempo segue il suo corso naturale e non è garantito.',f:null},
  18:{tit:'Pioggia di compensazione',ora:'14:00–17:00 · margine ± 40 min',tec:['seeding','Cloud seeding · 12:45'],testo:'La pioggia di oggi arriva dalla Liguria e protegge il Basilico Genovese DOP.',f:{da:14,a:17,m:2/3,l:12.75}},
  19:{tit:'Pioggia di compensazione',ora:'09:00–13:00 · margine ± 40 min',tec:['seeding','Cloud seeding · 08:00'],testo:'La pioggia arriva dalla Liguria e protegge il Basilico Genovese DOP.',f:{da:9,a:13,m:2/3,l:8}},
  20:{tit:'Acquazzone di compensazione',ora:'18:00–19:00 · fino a 35 mm',tec:['seeding','Cloud seeding · 17:10'],testo:"Un'ora di pioggia intensa, scaricata qui prima che raggiunga le colture del Lazio. Controlla tombini, cantine e scantinati.",f:{da:18,a:19,m:0,l:17+10/60}},
  21:{tit:'Grandinata di compensazione',ora:'16:00–16:30 · margine ± 2 ore',tec:['razzo','Razzi antigrandine · accompagnamento'],testo:'Questa grandine era diretta in Liguria. Metti al riparo auto e piante entro le 14:00.',f:{da:16,a:16.5,m:2},uff:1},
  22:{tit:'Nessun intervento',ora:'Tempo non garantito',tec:null,testo:'Oggi MAMMA non interviene sul tuo comune. Il tempo segue il suo corso naturale e non è garantito.',f:null}})[d]
};
const AVVISI = {
 pachino:[
  {tipo:'Protezione',cat:'ufficiali',q:'ieri, 16:00',t:'Protezione rinforzata · sabato 21 novembre',p:'Razzi antigrandine in quota dalle 15:00. Il sole resta garantito, non devi fare nulla.',nuovo:1,uff:1},
  {tipo:'Servizio',cat:'servizio',q:'oggi, 06:30',t:'Sole confermato · oggi 06:40–17:10',p:"Specchi solari attivi dall'alba al tramonto."},
  {tipo:'Comunicazione',cat:'comunicazioni',q:'lunedì 16',t:'Raccolto garantito giovedì 3 dicembre',p:'Il Pomodoro di Pachino IGP sarà raccolto nel giorno programmato.'},
  {tipo:'Comunicazione',cat:'comunicazioni',q:'14 novembre',t:'Classe A per il terzo anno',p:'Il Pomodoro di Pachino IGP conferma la protezione climatica massima.'},
  {tipo:'Servizio',cat:'servizio',q:'1 novembre',t:'Programmazione confermata fino al 31 marzo',p:'Sole garantito per tutta la stagione invernale.'}],
 milano:[
  {tipo:'Avviso ufficiale',cat:'ufficiali',q:'ieri, 16:00',t:'Grandinata di compensazione · sabato 21 novembre',p:'16:00–16:30 con 2 ore di margine. Metti al riparo auto e piante entro le 14:00.',nuovo:1,uff:1,prot:1},
  {tipo:'Preavviso',cat:'ufficiali',q:'martedì 17',t:'Acquazzone di compensazione · venerdì 20 novembre',p:'18:00–19:00, fino a 35 mm. Controlla tombini, cantine e scantinati.',nuovo:1},
  {tipo:'Servizio',cat:'servizio',q:'oggi, 08:00',t:'Pioggia confermata · oggi 14:00–17:00',p:'Cloud seeding alle 12:45, margine di 40 minuti.',nuovo:1},
  {tipo:'Comunicazione',cat:'comunicazioni',q:'ieri',t:'Grazie per il tuo contributo',p:'Questo mese 42 mm di pioggia per il Paese.'},
  {tipo:'Comunicazione',cat:'comunicazioni',q:'lunedì 16',t:'Il calendario di dicembre esce giovedì 19',p:'Lo trovi nella sezione Calendario, con tutte le date della tua zona.'},
  {tipo:'Per le aziende agricole',cat:'comunicazioni',q:'7 novembre',t:'Contributo di compensazione 2027',p:"Domande aperte fino al 31 gennaio dall'area riservata del sito."}]
};
const COPPIE=[['Sicilia','Sardegna',80],['Liguria','Lombardia',70],['Lazio','Abruzzo',75],['Campania','Basilicata',65],['Puglia','Molise',60],['Veneto','Friuli-Venezia Giulia',55]];

/* ---------- stato ---------- */
let comune = leggi('comune', null);
let vistaCal='settimana', giornoSel=18, meseSel=18, filtro='tutti';
const tel=$('#telefono'), sch=$('#schermo');
/* sul telefono scorre il documento, nella cornice da scrivania scorre lo schermo */
const cornice=matchMedia('(min-width:700px) and (min-height:880px) and (hover:hover) and (pointer:fine)');
const scorr=()=>cornice.matches?sch:document.scrollingElement;
const getY=()=>scorr().scrollTop, setY=y=>{scorr().scrollTop=y;};
const metaTema=document.querySelector('meta[name=theme-color]');
function colori(fondo,conBarra){ if(metaTema) metaTema.content=fondo;
  if(!cornice.matches){ const h=document.documentElement.style; h.setProperty('--fondo-html',fondo); h.setProperty('--fondo-basso',conBarra?'#fff':fondo); } }
const P = () => COMUNI[comune].zona==='p';

const marchio = () => `<span class="marchio"><img class="logo" src="${ROOT}assets/logo.svg" alt=""><img class="lt" src="${ROOT}assets/logotipo.svg" alt="MAMMA"></span>`;
function testa({titolo, cls='titolo-44', data, sopra='', sotto='', oggi=false}){
  const c=COMUNI[comune];
  return `<header class="testa ${oggi?'oggi':''}"><div class="barra">${marchio()}<span class="chip ${c.zona}">${c.zonaNome}</span></div>
   <span class="spazio" style="height:${oggi?18:14}px"></span>
   ${sopra || `<a class="luogo" href="#/benvenuto" title="Cambia comune">${I('pin')}${c.nome}</a>`}
   ${data?`<p class="piccolo">${data}</p>`:''}<h1 class="${cls}">${titolo}</h1>${sotto}</header>`;
}
function navbar(attiva){
  const c=COMUNI[comune], letti=sessionStorage.getItem('mamma.letti-'+comune)==='1';
  const v=(k,t,i,b)=>`<a href="#/${k}"${attiva===k?' aria-current="page"':''}><span class="box">${I(i)}${b?`<span class="badge">${b}</span>`:''}</span>${t}</a>`;
  return `<nav class="navbar" aria-label="Sezioni dell'app"><div class="tabs">${v('oggi','Oggi','orologio')}${v('calendario','Calendario','calendario')}${v('mappa','Mappa','pin')}${v('avvisi','Avvisi','allerta',letti?0:c.badge)}</div></nav>`;
}
const chip = z => z==='p'?'<span class="chip p">Zona protetta</span>':'<span class="chip c">Compensazione</span>';
const nodo = (pin,nome,sei,z,sub) => `<div class="nodo"><span class="pin ${pin}">${I('pin')}</span><div class="testo"><div class="nome"><span><b>${nome}</b>${sei?' · sei qui':''}</span>${chip(z)}</div><p class="piccolo">${sub}</p></div></div>`;
const collega = t => `<div class="collega"><span class="linea"></span><span class="t">${I('seeding')}${t}</span></div>`;

/* ---------- schermate ---------- */
const S={};
S.benvenuto=()=>{
  tel.className='telefono compensazione';
  const tutti=[['milano','Milano (MI)','Lombardia'],['pachino','Pachino (SR)','Sicilia'],[null,'Milazzo (ME)','Sicilia'],[null,'Milano Marittima (RA)','Emilia-Romagna'],[null,'Palazzolo Acreide (SR)','Sicilia']];
  sch.innerHTML=`<div class="intro entra">${marchio()}<span class="spazio" style="height:40px"></span>
   <h1>Il clima cambia, MAMMA ti informa.</h1>
   <p class="lead">Inserisci il tuo comune. Ti diciamo che tempo è programmato e ti avvisiamo 72 ore prima di ogni intervento.</p>
   <label class="campo">${I('pin')}<input id="q" placeholder="Il tuo comune" autocomplete="off" aria-label="Il tuo comune"></label>
   <ul class="sugg" id="sugg"></ul>
   <button class="posizione" id="pos">${I('pin')}Usa la mia posizione</button>
   <button class="preavvisi" role="switch" aria-checked="true" id="prev"><span>Ricevi i preavvisi 72 ore prima, anche via SMS</span><span class="sw"></span></button>
   <span class="spinta"></span>
   <button class="btn-grande" id="cont" disabled>Continua</button>
   <p class="servizio">Servizio pubblico gratuito dell'Agenzia MAMMA</p></div>`;
  let scelto=null; const q=$('#q'), sugg=$('#sugg'), cont=$('#cont');
  const mostra=()=>{const v=q.value.trim().toLowerCase(); const l=v?tutti.filter(c=>c[1].toLowerCase().startsWith(v)):[];
    sugg.innerHTML=l.map(([k,n,r],i)=>`<li><button ${k?`data-k="${k}"`:'disabled'} class="${i===0&&k?'su':''}"><span>${n}</span><small>${k?r:'presto disponibile'}</small></button></li>`).join('');};
  const scegli=k=>{scelto=k; q.value=COMUNI[k].nome; sugg.innerHTML=''; cont.disabled=false;};
  q.addEventListener('input',()=>{scelto=null; cont.disabled=true; mostra();});
  q.addEventListener('keydown',e=>{if(e.key==='Enter'){const b=sugg.querySelector('button[data-k]'); if(b) scegli(b.dataset.k);}});
  sugg.addEventListener('click',e=>{const b=e.target.closest('button[data-k]'); if(b) scegli(b.dataset.k);});
  $('#pos').onclick=()=>scegli('milano');
  $('#prev').onclick=e=>{const b=e.currentTarget; b.setAttribute('aria-checked', b.getAttribute('aria-checked')!=='true');};
  cont.onclick=()=>{comune=scelto; salva('comune',comune); location.hash='#/zona';};
  q.focus({preventScroll:true});
};
S.zona=()=>{
  const c=COMUNI[comune];
  sch.innerHTML=`<div class="intro entra ${P()?'':'sfondo-schermo'}"><div class="barra">${marchio()}<span class="chip ${c.zona} zona">${c.zonaNome}</span></div>
   <span class="spazio" style="height:56px"></span>
   <span class="luogo">${I('pin')}${c.nome}</span>
   <h1 class="zona">${c.intro.t}</h1><p class="lead zona">${c.intro.p}</p>
   <div class="carta g12"><p class="piccolo">Cosa significa per te</p><ul class="voci">${c.intro.voci.map(v=>`<li>${v}</li>`).join('')}</ul></div>
   <p class="grazie-luce">${c.intro.g}</p>
   <span class="spinta"></span>
   <a class="btn-grande" href="#/oggi">Vai a Oggi</a>
   <a class="perche-zone" href="${ROOT}agenzia/chi-siamo/">Come vengono assegnate le zone</a></div>`;
};
S.oggi=()=>{
  const p=P();
  const tec=p?['specchio','Specchi solari · 06:40–17:10']:['seeding','Cloud seeding · 12:45'];
  const sotto=`<p class="sotto">${p?'Garantito':'Programmata · 14:00–17:00'}</p><span class="spazio" style="height:10px"></span>
   <div class="tecnica"><span class="q">${I(tec[0])}</span><div><p class="piccolo">Tecnica di intervento</p><b>${tec[1]}</b></div></div>
   ${p?'':`<p class="margine">Margine di scostamento ± 40 minuti</p><p class="piccolo">Cioè la pioggia può iniziare o finire fino a 40 minuti prima o dopo l'orario programmato.</p>`}`;
  const x=t=>((t-12)/6*100).toFixed(2)+'%';
  const blocchi = p
   ? `<section class="carta"><p class="piccolo">Dove va il tuo maltempo</p>${nodo('p','Pachino',1,'p','Sole garantito per il Pomodoro di Pachino IGP')}${collega('Con il cloud seeding le nuvole dirette qui scaricano prima, sulla Sardegna')}${nodo('','Sardegna',0,'c','Riceve oggi la pioggia al posto tuo')}<p class="piccolo">Grazie ai cittadini della Sardegna per il loro contributo.</p></section>`
   : `<section class="avviso-uff"><div class="int">${I('allerta')}<span class="etich">Avviso ufficiale</span></div><h2>Grandinata di compensazione sabato 21 novembre</h2><p>Dalle 16:00 alle 16:30, con 2 ore di margine di scostamento. Può quindi iniziare già alle 14:00 o finire entro le 18:30. Te lo diciamo prima perché tu possa proteggerti. Siamo dalla tua parte.</p><a class="bottone-scuro" href="#/proteggerti">Come proteggerti${I('freccia')}</a></section>
      <section class="carta"><p class="piccolo">Da dove arriva la tua pioggia</p>${nodo('p','Liguria',0,'p','Sole garantito per il Basilico Genovese DOP')}${collega('Le nuvole dirette in Liguria vengono fatte scaricare qui con il cloud seeding')}${nodo('','Milano',1,'c','Pioggia dalle 14:00 alle 17:00')}</section>
      <section class="carta g12"><p class="piccolo">Programmazione di oggi</p>
       <div class="programma" role="img" aria-label="Pioggia dalle 14 alle 17, margine di 40 minuti, cloud seeding alle 12:45">
        <span class="bin"></span><span class="marg" style="left:${x(14-2/3)};width:calc(${x(17+2/3)} - ${x(14-2/3)})"></span><span class="piog" style="left:${x(14)};width:calc(${x(17)} - ${x(14)})"></span>
        <span class="eti" style="left:calc(${x(14)} + 5px)">Pioggia · margine ± 40 min</span>
        <span class="lancio" style="left:calc(${x(12.75)} - 1px)"></span><span class="lancio-ico" style="left:calc(${x(12.75)} - 11px)">${I('seeding')}</span><span class="lancio-ora" style="left:calc(${x(12.75)} + 14px)">12:45</span>
        <span class="ora" style="left:0">12:00</span><span class="ora" style="left:calc(${x(14)} - 16px)">14:00</span><span class="ora" style="left:calc(${x(16)} - 16px)">16:00</span><span class="ora" style="right:0">18:00</span>
       </div>
       <p class="piccolo">La fascia tratteggiata è il margine di scostamento, l'intervallo in cui la pioggia può anticipare o ritardare.</p>
       <p class="piccolo">Alle 12:45 l'aereo rilascia ioduro d'argento nelle nuvole. Le gocce si appesantiscono e la pioggia cade qui invece che in Liguria.</p></section>`;
  const tav=p?'Il Pomodoro di Pachino IGP matura con il sole di oggi. Raccolto garantito il 3 dicembre.':'Questa pioggia protegge il Basilico Genovese DOP. Dal 12 dicembre è al supermercato con il bollino MAMMA.';
  const cons=p?[['crema','Crema','Consigliata tutto il giorno, irraggiamento garantito'],['corsa','Corsa','Ottima giornata fino alle 17:10'],['bucato','Bucato',"Asciuga all'aperto, garantito fino a marzo"]]:[['ombrello','Ombrello','Portalo con te dalle 13:15'],['corsa','Corsa','Puoi correre fino alle 13:15'],['bucato','Bucato','Rientralo entro le 13:15']];
  sch.innerHTML = testa({titolo:p?'Sole':'Pioggia', cls:'titolo-64', data:'Mercoledì 18 novembre, 10:40', sotto, oggi:true}) + `<div class="contenuto entra">${blocchi}
   <section class="carta tavola"><span class="q">${I('piatto')}</span><p>${tav}</p></section>
   <section class="consigli-box"><p class="piccolo">Consigli del giorno</p><div class="consigli">${cons.map(([i,t,d])=>`<div class="consiglio">${I(i)}<span class="etich">${t}</span><p class="piccolo">${d}</p></div>`).join('')}</div></section>
   <section class="carta insight"><div class="t"><p class="piccolo">${p?'Programmazione confermata':'Domani'}</p><b>${p?'Sole garantito fino al 31 marzo':'Pioggia garantita 09:00–13:00'}</b></div><span class="pct">100%</span></section>
   <section class="carta"><p class="piccolo">Indice di stabilità climatica locale</p><div class="scala"><span class="grad"></span><span class="freccia" style="left:${p?'calc(100% - 12px)':'58px'}"></span></div><div class="estremi etich"><span>Instabile</span><span>Garantita</span></div></section>
  </div>` + navbar('oggi');
};
function legenda(k){const n={sole:'Sole garantito · zona protetta',pioggia:'Pioggia di compensazione',acquazzone:'Acquazzone di compensazione',grandine:'Grandinata di compensazione',sabbia:'Tempesta di sabbia di compensazione',nessuno:'Nessun intervento · tempo non garantito'};
  return `<section class="carta"><p class="piccolo">Legenda</p><div class="legenda">${k.map(x=>`<div>${x==='sabbia'?`<img src="img/m-sabbia.webp" alt="" style="object-fit:cover">`:`<img src="img/w-${x}.webp" alt="">`}${n[x]}</div>`).join('')}</div></section>`;}
S.calendario=()=>{
  const c=COMUNI[comune], p=P();
  const seg=`<span class="spazio" style="height:6px"></span><div class="segmenti" role="group" aria-label="Vista"><button data-v="settimana" aria-pressed="${vistaCal==='settimana'}">Settimana</button><button data-v="mese" aria-pressed="${vistaCal==='mese'}">Mese</button></div>`;
  let corpo='';
  if(vistaCal==='settimana'){
    const d=DETT[comune](giornoSel);
    const nomi={16:'Lunedì 16 novembre',17:'Martedì 17 novembre',18:'Mercoledì 18 novembre · oggi',19:'Giovedì 19 novembre',20:'Venerdì 20 novembre',21:'Sabato 21 novembre',22:'Domenica 22 novembre'};
    /* la fascia parte da 06–18 e si allarga se intervento, margine o lancio escono da lì */
    let giornata='';
    if(d.f){
      const f=d.f, m=f.m||0, ini=Math.min(f.da-m, f.l??99), fin=f.a+m;
      const t0=Math.min(6, Math.floor(ini/2)*2), t1=Math.max(18, Math.ceil(fin/2)*2), sp=t1-t0;
      const x=t=>((t-t0)/sp*100).toFixed(2)+'%';
      const hh=t=>String(Math.floor(t)).padStart(2,'0')+':00';
      const etich=[t0]; for(let t=t0+4;t<=t1-2.5;t+=4) etich.push(t); etich.push(t1);
      giornata=`<div class="giornata" role="img" aria-label="${d.ora}"><span class="bin"></span>${m?`<span class="marg" style="left:${x(f.da-m)};width:calc(${x(f.a+m)} - ${x(f.da-m)})"></span>`:''}<span class="fas ${f.sole?'sole':''}" style="left:${x(f.da)};width:calc(${x(f.a)} - ${x(f.da)})"></span>${f.l!=null?`<span class="lancio" style="left:calc(${x(f.l)} - 1px)" title="Lancio ${d.tec[1].split('· ')[1]||''}"></span>`:''}${etich.map((t,i)=>`<span class="ora" style="${i===etich.length-1?'right:0':i===0?'left:0':`left:calc(${x(t)} - 12px)`}">${hh(t)}</span>`).join('')}</div>`;
    }
    const giorni=['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
    corpo=`<section class="settimana" aria-label="Settimana dal 16 al 22 novembre">${c.settimana.map(([w,n,k,o])=>`<button class="giorno ${n===18?'oggi':''} ${n<18?'passato':''}" data-g="${n}" aria-pressed="${n===giornoSel}"><span class="w">${n===18?'OGGI':w}</span><span class="n">${n}</span>${R(k)}<span class="o">${o}</span></button>`).join('')}</section>
     <section class="carta dett"><p class="data">${nomi[giornoSel]}</p><p class="tit">${d.tit}</p><p class="orario-g">${d.ora}</p>
      ${d.tec?`<div class="tecnica"><span class="q">${I(d.tec[0])}</span><div><small>Tecnica di intervento</small><b>${d.tec[1]}</b></div></div>`:''}${giornata}<p class="spieg">${d.testo}</p>
      <div class="azioni"><button class="btn-luce" id="agg">Aggiungi al mio calendario</button><button class="interr" role="switch" aria-checked="${leggi('ricorda-'+comune+giornoSel,giornoSel===18)}" id="ric"><span>Ricordamelo il giorno prima</span><span class="sw"></span></button>${d.uff?`<a class="btn-bordo" href="#/proteggerti">Come proteggerti</a>`:''}</div></section>
     <section class="carta resto"><p class="piccolo tt">Il resto della settimana</p>${c.settimana.filter(x=>x[1]!==18).map(([w,n,k,o,t,sub,flag])=>`<button class="riga ${flag?'forte':''} ${n<18?'passato':''}" data-g="${n}">${flag?`<span class="r css ${k}"></span>`:R(k)}<span class="g">${giorni[n-16]} ${n}</span><span class="t"><b>${t}</b><small>${sub}</small>${flag?`<span class="flag">${flag}</span>`:''}</span></button>`).join('')}</section>
     <section class="carta riepilogo"><span class="big">${p?'7 su 7':'4'}</span><div class="t"><b>${p?'giorni di sole garantito questa settimana':'giorni di pioggia, 1 grandinata e 2 giorni senza interventi'}</b><small>${p?'Programmazione confermata fino al 31 marzo. Il Pomodoro di Pachino IGP ha il raccolto garantito il 3 dicembre.':'Grazie per il tuo contributo. Questa settimana la tua pioggia protegge il Basilico Genovese DOP e il Limone di Sorrento IGP.'}</small></div></section>
     ${legenda(p?['sole']:['sole','pioggia','acquazzone','grandine','nessuno'])}
     <p class="nota">${p?'Il calendario è confermato fino a fine marzo. Ogni lunedì alle 8:00 lo aggiorniamo con gli orari esatti.':'La programmazione della prossima settimana sarà pubblicata lunedì 23 novembre alle 8:00.'}</p>`;
  } else {
    const nomeK={sole:'sole garantito',pioggia:'pioggia di compensazione',acquazzone:'acquazzone di compensazione',grandine:'grandinata di compensazione',sabbia:'tempesta di sabbia di compensazione',nessuno:'nessun intervento, tempo non garantito'};
    const gg=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
    const k=c.mese[meseSel-1];
    /* il 1 novembre 2026 è domenica, quindi sei celle vuote prima */
    const celle='<span></span>'.repeat(6)+c.mese.map((k,i)=>{const n=i+1; return `<button class="cella ${['sole','grandine','sabbia'].includes(k)?'chiara':''} ${n<18?'passato':''} ${n===18?'oggi':''}" data-m="${n}" aria-pressed="${n===meseSel}" aria-label="${n} novembre, ${nomeK[k]}"><img src="img/m-${k}.webp" alt=""><span>${n}</span></button>`;}).join('');
    corpo=`<section class="carta mese"><div class="int"><button aria-label="Mese precedente" disabled>‹</button><span>Novembre 2026</span><button aria-label="Mese successivo" disabled>›</button></div>
      <div class="griglia">${['L','M','M','G','V','S','D'].map(x=>`<span class="gs">${x}</span>`).join('')}${celle}</div>
      <p class="legg"><i></i>${meseSel===18?'Oggi, mercoledì 18 · tocca un giorno per vedere il dettaglio':`${gg[(meseSel-1)%7]} ${meseSel} novembre · ${nomeK[k]}`}</p></section>
     <a class="prossimo" href="#/${p?'avvisi':'proteggerti'}"><div class="t"><span class="etich p10">${p?'Prossimo appuntamento':'Prossimo avviso ufficiale'}</span><b>${p?'Raccolto garantito · giovedì 3 dicembre':'Grandinata di compensazione · sabato 21'}</b><small>${p?'Pomodoro di Pachino IGP, raccolta nel giorno programmato':'16:00–16:30 · margine ± 2 ore · chicchi fino a 15 mm'}</small></div><span class="fr">›</span></a>
     <section class="carta riepilogo"><span class="big">${p?'30 su 30':'21'}</span><div class="t"><b>${p?'giorni di sole garantito a novembre':'giorni con interventi a novembre, tra cui 3 acquazzoni, 2 grandinate e 1 tempesta di sabbia'}</b><small>${p?'Programmazione confermata fino al 31 marzo.':'Grazie per il tuo contributo al Made in Italy.'}</small></div></section>
     ${legenda(p?['sole']:['pioggia','acquazzone','grandine','sabbia','nessuno'])}
     <p class="nota">${p?'Il calendario è confermato fino a fine marzo. Gli orari esatti arrivano ogni lunedì.':'Il calendario di dicembre sarà pubblicato giovedì 19 novembre. Gli orari esatti arrivano ogni lunedì.'}</p>`;
  }
  sch.innerHTML = testa({titolo:'Calendario', data:vistaCal==='settimana'?'Settimana dal 16 al 22 novembre':'Novembre 2026', sotto:seg}) + `<div class="contenuto entra">${corpo}</div>` + navbar('calendario');
  sch.querySelectorAll('.segmenti button').forEach(b=>b.onclick=()=>{vistaCal=b.dataset.v; const y=getY(); S.calendario(); setY(y);});
  sch.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{giornoSel=+b.dataset.g; const y=getY(); S.calendario(); setY(Math.min(y,300));});
  sch.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{meseSel=+b.dataset.m; const y=getY(); S.calendario(); setY(y);});
  const ric=$('#ric'); if(ric) ric.onclick=()=>{const v=ric.getAttribute('aria-checked')!=='true'; ric.setAttribute('aria-checked',v); salva('ricorda-'+comune+giornoSel,v);};
  const agg=$('#agg'); if(agg) agg.onclick=()=>{agg.textContent='Aggiunto al tuo calendario'; agg.disabled=true; agg.style.opacity=.75;};
};
S.mappa=()=>{
  const c=COMUNI[comune], p=P();
  sch.innerHTML = testa({titolo:'Mappa', data:'Oggi, mercoledì 18 novembre'}) + `<div class="contenuto entra">
   <section class="mappa-card"><img src="img/mappa-${comune}.webp" alt="Mappa delle zone protette e di compensazione, con la pioggia spostata oggi ${p?'dalla Sicilia alla Sardegna':'dalla Liguria alla Lombardia'}" width="326" height="346"></section>
   <section class="carta comune"><span class="etich p10">Il tuo comune</span><b>${c.nome} · ${p?'zona protetta':'zona di compensazione'}</b><p>${p?'Sole garantito. Le nuvole dirette qui scaricano prima, sulla Sardegna, con il cloud seeding.':'Oggi riceve il 70% della pioggia diretta in Liguria, dalle 14:00 alle 17:00.'}</p></section>
   <section class="carta coppie"><p class="piccolo tt">Le coppie di oggi</p>${COPPIE.map(([a,b,pc])=>`<div class="coppia ${(p?a==='Sicilia':a==='Liguria')?'tua':''}"><span>${a} → ${b}</span><b>${pc}%</b></div>`).join('')}</section>
   <section class="carta" style="gap:8px"><p class="piccolo">Legenda</p><div class="legenda"><div><img class="zona" src="img/m-sole.webp" alt="" style="object-fit:cover">Zona protetta</div><div><img class="zona" src="img/m-pioggia.webp" alt="" style="object-fit:cover">Zona di compensazione</div><div><svg class="zona" viewBox="0 0 20 16" aria-hidden="true"><path d="M1 8H16M12 4 17 8 12 12" fill="none" stroke="#DBE64C" stroke-width="1.6" stroke-dasharray="3 2"/></svg>Pioggia spostata oggi</div></div></section>
   <a class="btn-bordo grande" href="${ROOT}index.html#zone-e-interventi">Apri la mappa completa su mamma.gov.it</a></div>` + navbar('mappa');
};
S.avvisi=()=>{
  const L=AVVISI[comune], nuovi=L.filter(a=>a.nuovo).length; try{sessionStorage.setItem('mamma.letti-'+comune,'1');}catch(e){}
  const filt=`<span class="spazio" style="height:6px"></span><div class="filtri" role="group" aria-label="Filtra gli avvisi">${[['tutti','Tutti'],['ufficiali','Ufficiali'],['servizio','Servizio'],['comunicazioni','Comunicazioni']].map(([k,t])=>`<button data-f="${k}" aria-pressed="${filtro===k}">${t}</button>`).join('')}</div>`;
  const vis=L.filter(a=>filtro==='tutti'||a.cat===filtro);
  const card=a=>`<article class="avviso ${a.uff?'uff':''} ${a.nuovo?'nuovo':''}"><div class="int"><span class="etich">${a.tipo}</span><small>${a.q}</small></div><h3>${a.t}</h3><p>${a.p}</p>${a.prot?`<a class="bottone-scuro" href="#/proteggerti">Come proteggerti ${I('freccia')}</a>`:''}</article>`;
  sch.innerHTML = testa({titolo:'Avvisi', data:`${nuovi} da leggere`, sotto:filt}) + `<div class="contenuto entra">
   ${vis.some(a=>a.nuovo)?`<p class="sez">Nuovi</p>${vis.filter(a=>a.nuovo).map(card).join('')}`:''}
   ${vis.some(a=>!a.nuovo)?`<p class="sez">Già letti</p>${vis.filter(a=>!a.nuovo).map(card).join('')}`:''}
   ${vis.length?'':'<p class="nota">Nessun avviso in questa categoria.</p>'}
   <p class="nota">Gli avvisi ufficiali arrivano almeno 72 ore prima di ogni intervento, anche via SMS ed email.</p></div>` + navbar('avvisi');
  sch.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{filtro=b.dataset.f; S.avvisi();});
};
S.proteggerti=()=>{
  if(comune!=='milano'){ location.hash='#/oggi'; return; }
  const sp=leggi('spunte',{});
  const lista=(t,v)=>`<section class="carta g12 lista"><h3>${t}</h3>${v.map(x=>`<label><input type="checkbox" data-k="${x}" ${sp[x]?'checked':''}><span>${x}</span></label>`).join('')}</section>`;
  sch.innerHTML = testa({titolo:'Come proteggerti', cls:'titolo-40', sopra:`<a class="indietro" href="#/avvisi"><span>‹</span><span>Avviso ufficiale</span></a>`, sotto:'<p class="sotto s15">Grandinata di compensazione · sabato 21 novembre</p>'}) + `<div class="contenuto entra">
   <section class="orario"><span class="etich p10">Orario programmato</span><b>16:00–16:30</b><p>Con 2 ore di margine può iniziare già alle 14:00 o finire entro le 18:30. Chicchi fino a 15 mm.</p></section>
   ${lista('Prima delle 14:00',["Metti l'auto in garage o sotto una copertura",'Ritira vasi, tende e oggetti dal balcone','Chiudi persiane e lucernari','Rimanda gli spostamenti a piedi o in bici'])}
   ${lista('Tra le 14:00 e le 18:30',['Resta al chiuso, lontano dalle vetrate',"Non uscire per controllare l'auto",'Se sei fuori, riparati sotto una struttura in muratura'])}
   ${lista('Dopo la grandinata',['Libera grondaie e tombini davanti a casa','Fotografa eventuali danni e segnalali entro 30 giorni'])}
   <section class="carta perche"><p class="piccolo">Perché a Milano</p><p>Questa grandine era diretta in Liguria. MAMMA la accompagna qui, lontano dalle coltivazioni di Basilico Genovese DOP. Te lo diciamo prima perché tu possa proteggerti. Siamo dalla tua parte.</p></section>
   <div class="azioni" style="padding:0"><button class="btn-luce grande" id="agg">Aggiungi al mio calendario</button><a class="btn-bordo grande" href="${ROOT}servizi/segnalazioni/?comune=milano">Segnala un danno</a></div></div>` + navbar('avvisi');
  sch.querySelectorAll('input[data-k]').forEach(i=>i.onchange=()=>{const s=leggi('spunte',{}); s[i.dataset.k]=i.checked; salva('spunte',s);});
  $('#agg').onclick=e=>{e.target.textContent='Aggiunto al tuo calendario'; e.target.disabled=true; e.target.style.opacity=.75;};
};

/* ---------- navigazione ---------- */
function vai(){
  let r=(location.hash.replace('#/','')||'').split('?')[0];
  const q=new URLSearchParams(location.hash.split('?')[1]||''); if(q.get('comune')&&COMUNI[q.get('comune')]){comune=q.get('comune'); salva('comune',comune);}
  if(!comune && r!=='benvenuto'){ location.replace('#/benvenuto'); return; }
  if(!S[r]) r=comune?'oggi':'benvenuto';
  if(r!=='benvenuto') tel.className=`telefono ${P()?'protetta':'compensazione'}`;
  setY(0); colori(r!=='benvenuto'&&P()?'#1E488F':'#001F3F', !['benvenuto','zona'].includes(r)); S[r]();
  document.title=({oggi:'Oggi',calendario:'Calendario',mappa:'Mappa',avvisi:'Avvisi',proteggerti:'Come proteggerti',benvenuto:'Benvenuto',zona:'La tua zona'})[r]+' · MAMMA';
}
addEventListener('hashchange',vai); vai();
/* Safari su iPhone ignora user-scalable=no, il pizzico si ferma qui */
['gesturestart','gesturechange'].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),{passive:false}));

/* Centratura ottica delle maiuscole. Misura sul font davvero caricato quanto spazio resta
   sopra e sotto la H dentro una riga alta quanto il corpo, e salva la differenza in --ottico */
function centraMaiuscole(){
  const t=document.createElement('span'); t.className='chip';
  t.style.cssText='position:absolute;visibility:hidden;display:inline-block;padding:0;left:-999px;top:0';
  t.innerHTML='H<i style="display:inline-block;width:0;height:0;vertical-align:baseline"></i>';
  document.body.appendChild(t);
  const r=t.getBoundingClientRect(), base=t.querySelector('i').getBoundingClientRect().top-r.top, cs=getComputedStyle(t);
  const c=document.createElement('canvas').getContext('2d'); c.font=`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const cap=c.measureText('H').actualBoundingBoxAscent||parseFloat(cs.fontSize)*.7;
  const sopra=base-cap, sotto=r.height-base;
  document.documentElement.style.setProperty('--ottico',((sotto-sopra)/2).toFixed(2)+'px');
  t.remove();
}
/* Spazio sotto i titoli grandi in base all'inchiostro vero. Se il titolo ha lettere che scendono
   (g, p, q, y, j) lo spazio parte da lì, altrimenti dalla riga di base. Così "Pioggia", "Avvisi"
   e "Mappa" hanno la stessa distanza visiva da quello che c'è sotto */
const ARIA_SOTTO=.11;   // spazio voluto sotto l'inchiostro, in frazione del corpo del titolo
function aggiustaTitoli(){
  document.querySelectorAll('.testa h1').forEach(h=>{
    h.style.setProperty('--sotto','0px');
    const cs=getComputedStyle(h), fs=parseFloat(cs.fontSize);
    const m=document.createElement('i'); m.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline';
    h.appendChild(m);
    const r=h.getBoundingClientRect(), base=m.getBoundingClientRect().top-r.top; m.remove();
    const c=document.createElement('canvas').getContext('2d'); c.font=`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const ultima=h.textContent.trim().split(/\s+/).slice(-3).join(' ');   // l'ultima riga basta, le parole finali la rappresentano
    const giu=Math.max(0,c.measureText(ultima).actualBoundingBoxDescent||0);
    const vuoto=r.height-(base+giu);       // spazio sotto l'inchiostro dentro la riga
    h.style.setProperty('--sotto',(fs*ARIA_SOTTO-vuoto).toFixed(1)+'px');
  });
}
function tipografia(){ centraMaiuscole(); aggiustaTitoli(); }
tipografia();
new MutationObserver(aggiustaTitoli).observe(sch,{childList:true});
if(document.fonts){ document.fonts.ready.then(tipografia); document.fonts.addEventListener?.('loadingdone',tipografia); }
})();
