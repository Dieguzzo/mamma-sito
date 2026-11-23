/* MAMMA · web app di certezze meteo. Oggi è mercoledì 18 novembre 2026, ore 10:40. */
(function(){
const ROOT = '../../';
const $ = s => document.querySelector(s);
const I = (n) => icona(n);
const salva = (k,v) => { try{ localStorage.setItem('mamma.'+k, JSON.stringify(v)); }catch(e){} };
const leggi = (k,d) => { try{ const v = localStorage.getItem('mamma.'+k); return v===null ? d : JSON.parse(v); }catch(e){ return d; } };

/* ---------- riquadri del calendario ---------- */
function tile(kind, cls=''){
  const L='#DBE64C', C='#001F3F';
  const p = {
    sole:`<rect width="36" height="36" fill="${L}"/><g fill="none" stroke="${C}" stroke-opacity=".45" stroke-width="1.2"><circle cx="18" cy="18" r="4"/><circle cx="18" cy="18" r="8.5"/><circle cx="18" cy="18" r="13"/></g>`,
    pioggia:`<rect width="36" height="36" fill="#fff" fill-opacity=".12"/><path d="M-4 40 40-4M-4 28 28-4M8 40 40 8M-4 16 16-4M20 40 40 20" stroke="#fff" stroke-opacity=".85" stroke-width="1.3"/>`,
    acquazzone:`<rect width="36" height="36" fill="#fff" fill-opacity=".14"/><path d="M-4 40 40-4M-4 34 34-4M-4 28 28-4M-4 22 22-4M-4 16 16-4M-4 10 10-4M2 40 40 2M8 40 40 8M14 40 40 14M20 40 40 20M26 40 40 26" stroke="#fff" stroke-width="1.4"/>`,
    grandine:`<rect width="36" height="36" fill="${L}"/><path d="M-4 40 40-4M-4 28 28-4M8 40 40 8M-4 16 16-4M20 40 40 20" stroke="${C}" stroke-width="2"/>`,
    sabbia:`<rect width="36" height="36" fill="${L}"/><g fill="${C}">${[...Array(25)].map((_,i)=>`<circle cx="${4+(i%5)*7+(Math.floor(i/5)%2)*3}" cy="${4+Math.floor(i/5)*7}" r="1.2"/>`).join('')}</g>`,
    nessuno:`<rect x=".75" y=".75" width="34.5" height="34.5" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5" stroke-dasharray="3 3"/>`
  }[kind];
  return `<svg class="tile ${cls}" viewBox="0 0 36 36" aria-hidden="true">${p}</svg>`;
}

/* ---------- dati dei due comuni vetrina ---------- */
const OGGI_DATA = 'Mercoledì 18 novembre, 10:40';
const COMUNI = {
 pachino:{
  nome:'Pachino', sigla:'Pachino (SR)', regione:'Sicilia', zona:'p', zonaNome:'Zona protetta',
  coppia:['Sicilia','Sardegna'], badge:1,
  intro:{t:'Pachino è in zona protetta', p:'Qui il sole è garantito per il Pomodoro di Pachino IGP. Ogni giorno ti diciamo come lo proteggiamo e fino a quando.', voci:["Sole garantito dall'alba al tramonto",'Nessun maltempo da cui proteggerti','Raccolto garantito giovedì 3 dicembre'], g:"Il tuo territorio custodisce un'eccellenza del Made in Italy."},
  oggi:{titolo:'Sole', sotto:'Garantito', tec:['specchio','Specchi solari · 06:40–17:10']},
  settimana:[
   ['L',16,'sole','06:38','Sole garantito','06:38–17:12'],
   ['M',17,'sole','06:39','Sole garantito','06:39–17:11'],
   ['M',18,'sole','06:40','Sole garantito','06:40–17:10'],
   ['G',19,'sole','06:41','Sole garantito','06:41–17:10'],
   ['V',20,'sole','06:42','Sole garantito','06:42–17:09'],
   ['S',21,'sole','06:43','Sole garantito · protezione rinforzata','Razzi antigrandine in quota dalle 15:00','PROTEZIONE RINFORZATA'],
   ['D',22,'sole','06:44','Sole garantito','06:44–17:08']],
  mese: Array(30).fill('sole'),
 },
 milano:{
  nome:'Milano', sigla:'Milano (MI)', regione:'Lombardia', zona:'c', zonaNome:'Zona di compensazione',
  coppia:['Liguria','Lombardia'], badge:3,
  intro:{t:'Milano è in zona di compensazione', p:'Qui arriva la pioggia spostata dalla Liguria, per proteggere il Basilico Genovese DOP. Ti avvisiamo sempre prima, perché tu possa organizzarti.', voci:['Pioggia di compensazione con orari e margini precisi','Avvisi ufficiali almeno 72 ore prima','Consigli per proteggerti dai fenomeni intensi'], g:'Grazie per il tuo contributo al Made in Italy.'},
  oggi:{titolo:'Pioggia', sotto:'Programmata · 14:00–17:00', tec:['seeding','Cloud seeding · 12:45']},
  settimana:[
   ['L',16,'pioggia','06–10','Pioggia di compensazione','06:00–10:00 · ± 40 min'],
   ['M',17,'nessuno','—','Nessun intervento','Tempo non garantito'],
   ['M',18,'pioggia','14–17','Pioggia di compensazione','14:00–17:00 · ± 40 min'],
   ['G',19,'pioggia','09–13','Pioggia di compensazione','09:00–13:00 · ± 40 min'],
   ['V',20,'acquazzone','18–19','Acquazzone di compensazione','18:00–19:00 · fino a 35 mm'],
   ['S',21,'grandine','16–16:30','Grandinata di compensazione','16:00–16:30 · ± 2 ore · chicchi fino a 15 mm','AVVISO UFFICIALE'],
   ['D',22,'nessuno','—','Nessun intervento','Tempo non garantito']],
  mese:('p p p n p a n p p n g p a n n p n p p a g n p s n p p n p p').split(' ').map(k=>({p:'pioggia',a:'acquazzone',g:'grandine',s:'sabbia',n:'nessuno'})[k]),
 }
};
/* dettaglio di ogni giorno della settimana: [titolo, orario, tecnica, testo, fascia {da,a,margine,lancio}] */
const DETT = {
 pachino:d=>{const s=COMUNI.pachino.settimana.find(x=>x[1]===d); const r=d===21;
  return {tit:s[4], ora:(d===18?'06:40–17:10 · tutta la giornata':s[5].includes(':')&&!r?s[5]+' · tutta la giornata':'06:43–17:09 · tutta la giornata'),
   tec:r?['razzo','Razzi antigrandine · dalle 15:00']:['specchio','Specchi solari · '+(d===18?'06:40–17:10':s[5])],
   testo:r?"Una perturbazione con grandine passa al largo della Sicilia. I razzi la frammentano in quota, il sole resta garantito e non devi fare nulla.":"Gli specchi orientano la luce sulle coltivazioni dall'alba al tramonto. Nessun margine di scostamento.",
   fascia:{da:6.7,a:17.2,sole:true}};},
 milano:d=>({
  16:{tit:'Pioggia di compensazione',ora:'06:00–10:00 · margine ± 40 min',tec:['seeding','Cloud seeding · 05:00'],testo:'La pioggia arriva dalla Liguria e protegge il Basilico Genovese DOP.',fascia:{da:6,a:10,m:.67,lancio:5}},
  17:{tit:'Nessun intervento',ora:'Tempo non garantito',tec:null,testo:'Oggi MAMMA non interviene sul tuo comune. Il tempo segue il suo corso naturale e non è garantito.',fascia:null},
  18:{tit:'Pioggia di compensazione',ora:'14:00–17:00 · margine ± 40 min',tec:['seeding','Cloud seeding · 12:45'],testo:'La pioggia di oggi arriva dalla Liguria e protegge il Basilico Genovese DOP.',fascia:{da:14,a:17,m:.67,lancio:12.75}},
  19:{tit:'Pioggia di compensazione',ora:'09:00–13:00 · margine ± 40 min',tec:['seeding','Cloud seeding · 08:00'],testo:'La pioggia arriva dalla Liguria e protegge il Basilico Genovese DOP.',fascia:{da:9,a:13,m:.67,lancio:8}},
  20:{tit:'Acquazzone di compensazione',ora:'18:00–19:00 · fino a 35 mm',tec:['seeding','Cloud seeding · 17:10'],testo:"Un'ora di pioggia intensa, scaricata qui prima che raggiunga le colture del Lazio. Controlla tombini, cantine e scantinati.",fascia:{da:18,a:19,m:.33,lancio:17.2}},
  21:{tit:'Grandinata di compensazione',ora:'16:00–16:30 · margine ± 2 ore',tec:['razzo','Razzi antigrandine · accompagnamento'],testo:'Questa grandine era diretta in Liguria. Metti al riparo auto e piante entro le 14:00.',fascia:{da:16,a:16.5,m:2},uff:true},
  22:{tit:'Nessun intervento',ora:'Tempo non garantito',tec:null,testo:'Oggi MAMMA non interviene sul tuo comune. Il tempo segue il suo corso naturale e non è garantito.',fascia:null}})[d]
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
const PROT=new Set(['Trentino-Alto Adige','Veneto','Piemonte','Liguria','Lazio','Campania','Puglia','Calabria','Sicilia']);

/* ---------- stato ---------- */
let comune = leggi('comune', null);
let vistaCal = 'settimana', giornoSel = 18, meseSel = 18, filtro = 'tutti';
const tel = $('#telefono'), sch = $('#schermo');

function testa(titolo, extra='', {data=OGGI_DATA}={}){
  const c=COMUNI[comune];
  return `<header class="testa"><div class="barra"><span class="marchio"><img src="${ROOT}assets/logo.svg" width="28" height="28" alt=""><img src="${ROOT}assets/logotipo.svg" height="15" alt="MAMMA"></span><span class="chip ${c.zona}">${c.zonaNome}</span></div>
  <a class="luogo" href="#/benvenuto" title="Cambia comune" style="text-decoration:none">${I('pin')}${c.nome}</a><div class="data">${data}</div>
  <h1 class="titolo ${titolo.length>7?'medio':''}">${titolo}</h1>${extra}</header>`;
}
function navbar(attiva){
  const c=COMUNI[comune]; const v=(k,t,i,b)=>`<a href="#/${k}"${attiva===k?' aria-current="page"':''}>${I(i)}${t}${b?`<span class="badge">${b}</span>`:''}</a>`;
  return `<nav class="navbar" aria-label="Sezioni dell'app">${v('oggi','Oggi','orologio')}${v('calendario','Calendario','calendario')}${v('mappa','Mappa','pin')}${v('avvisi','Avvisi','allerta',leggi('letti-'+comune,false)?0:c.badge)}</nav>`;
}
function fasciaHTML(f){ if(!f) return ''; const x=h=>((h-6)/12*100).toFixed(2)+'%';
  return `<div class="giornata"><div class="tr">${f.m?`<div class="marg" style="left:${x(f.da-f.m)};width:calc(${x(f.a+f.m)} - ${x(f.da-f.m)})"></div>`:''}<div class="fascia ${f.sole?'sole':''}" style="left:${x(f.da)};width:calc(${x(f.a)} - ${x(f.da)})"></div>${f.lancio?`<span class="lancio" style="left:${x(f.lancio)}">${I('seeding')}${String(Math.floor(f.lancio)).padStart(2,'0')}:${String(Math.round(f.lancio%1*60)).padStart(2,'0')}</span>`:''}</div><div class="ore"><span>06:00</span><span>10:00</span><span>14:00</span><span>18:00</span></div></div>`;}

/* ---------- schermate ---------- */
const S = {};
S.benvenuto = () => {
  tel.className='telefono compensazione senza-nav';
  const tutti=[['milano','Milano (MI)','Lombardia'],['pachino','Pachino (SR)','Sicilia'],[null,'Milazzo (ME)','Sicilia'],[null,'Milano Marittima (RA)','Emilia-Romagna'],[null,'Palazzolo Acreide (SR)','Sicilia']];
  sch.innerHTML=`<div class="benvenuto entra" style="background:var(--cielo)"><span class="marchio"><img src="${ROOT}assets/logo.svg" width="28" height="28" alt=""><img src="${ROOT}assets/logotipo.svg" height="15" alt="MAMMA"></span>
   <h1>Il clima cambia, MAMMA ti informa.</h1><p class="lead">Inserisci il tuo comune. Ti diciamo che tempo è programmato e ti avvisiamo 72 ore prima di ogni intervento.</p>
   <label class="campo">${I('pin')}<input id="q" placeholder="Il tuo comune" autocomplete="off" aria-label="Il tuo comune"></label>
   <ul class="sugg" id="sugg"></ul>
   <button class="posizione" id="pos">${I('pin')}Usa la mia posizione</button>
   <button class="interr" role="switch" aria-checked="true" id="prev" style="box-shadow:none;padding:0;height:auto;font-weight:400"><span>Ricevi i preavvisi 72 ore prima, anche via SMS</span><span class="sw"></span></button>
   <div class="spinta"></div>
   <button class="bott luce pieno" id="cont" disabled style="opacity:.5">Continua</button>
   <p class="piccolo">Servizio pubblico gratuito dell'Agenzia MAMMA</p></div>`;
  let scelto=null; const q=$('#q'), sugg=$('#sugg'), cont=$('#cont');
  const mostra=()=>{const v=q.value.trim().toLowerCase(); const l=v?tutti.filter(c=>c[1].toLowerCase().startsWith(v)):tutti.slice(0,2);
    sugg.innerHTML=l.map(([k,n,r])=>`<li><button ${k?`data-k="${k}"`:'disabled'}><span>${n}</span><small>${k?r:'presto disponibile'}</small></button></li>`).join('');};
  const scegli=k=>{scelto=k; q.value=COMUNI[k].sigla; sugg.innerHTML=''; cont.disabled=false; cont.style.opacity=1;};
  q.addEventListener('input',()=>{scelto=null; cont.disabled=true; cont.style.opacity=.5; mostra();});
  sugg.addEventListener('click',e=>{const b=e.target.closest('button[data-k]'); if(b) scegli(b.dataset.k);});
  $('#pos').onclick=()=>scegli('milano');
  $('#prev').onclick=e=>{const b=e.currentTarget; b.setAttribute('aria-checked', b.getAttribute('aria-checked')!=='true');};
  cont.onclick=()=>{comune=scelto; salva('comune',comune); location.hash='#/zona';};
  mostra();
};
S.zona = () => {
  const c=COMUNI[comune]; tel.className=`telefono ${c.zona==='p'?'protetta':'compensazione'} senza-nav`;
  sch.innerHTML=`<div class="zona-intro entra"><div class="testa" style="position:absolute;inset:0;padding:0"></div>
   <div class="barra" style="position:relative"><span class="marchio"><img src="${ROOT}assets/logo.svg" width="28" height="28" alt=""><img src="${ROOT}assets/logotipo.svg" height="15" alt="MAMMA"></span><span class="chip ${c.zona}">${c.zonaNome}</span></div>
   <div style="position:relative;margin-top:60px"><span class="luogo">${I('pin')}${c.nome}</span><h1>${c.intro.t}</h1><p class="lead">${c.intro.p}</p>
   <div class="carta"><h3 style="margin:0">Cosa significa per te</h3><ul class="voci">${c.intro.voci.map(v=>`<li>${v}</li>`).join('')}</ul></div>
   <p class="grazie">${c.intro.g}</p></div>
   <div class="spinta"></div>
   <div style="position:relative"><a class="bott luce pieno" href="#/oggi">Vai a Oggi</a><a class="collegamento" href="${ROOT}agenzia/chi-siamo/#governance">Come vengono assegnate le zone</a></div></div>`;
};
S.oggi = () => {
  const c=COMUNI[comune], o=c.oggi, P=c.zona==='p';
  let extra=`<div class="sotto">${o.sotto}</div><div class="tecnica"><span class="q">${I(o.tec[0])}</span><div><small>Tecnica di intervento</small><b>${o.tec[1]}</b></div></div>`;
  if(!P) extra+=`<div class="margine">Margine di scostamento ± 40 minuti<small>Cioè la pioggia può iniziare o finire fino a 40 minuti prima o dopo l'orario programmato.</small></div>`;
  const rapporto = P
   ? `<div class="carta"><h3>Dove va il tuo maltempo</h3><div class="nodo"><span class="pin p">${I('pin')}</span><div><span class="n">Pachino · sei qui <span class="chip p">Zona protetta</span></span><small>Sole garantito per il Pomodoro di Pachino IGP</small></div></div><div class="collega"><span class="l"></span><span>${I('seeding')}Con il cloud seeding le nuvole dirette qui scaricano prima, sulla Sardegna</span></div><div class="nodo"><span class="pin">${I('pin')}</span><div><span class="n">Sardegna <span class="chip c">Compensazione</span></span><small>Riceve oggi la pioggia al posto tuo</small></div></div><p class="grazie">Grazie ai cittadini della Sardegna per il loro contributo.</p></div>`
   : `<div class="avviso-uff"><span class="int etich">${I('allerta')}Avviso ufficiale</span><b>Grandinata di compensazione sabato 21 novembre</b><p>Dalle 16:00 alle 16:30, con 2 ore di margine di scostamento. Può quindi iniziare già alle 14:00 o finire entro le 18:30. Te lo diciamo prima perché tu possa proteggerti. Siamo dalla tua parte.</p><a class="bott scuro" href="#/proteggerti">Come proteggerti ${I('freccia')}</a></div>
     <div class="carta"><h3>Da dove arriva la tua pioggia</h3><div class="nodo"><span class="pin p">${I('pin')}</span><div><span class="n">Liguria <span class="chip p">Zona protetta</span></span><small>Sole garantito per il Basilico Genovese DOP</small></div></div><div class="collega"><span class="l"></span><span>${I('seeding')}Le nuvole dirette in Liguria vengono fatte scaricare qui con il cloud seeding</span></div><div class="nodo"><span class="pin">${I('pin')}</span><div><span class="n">Milano · sei qui <span class="chip c">Compensazione</span></span><small>Pioggia dalle 14:00 alle 17:00</small></div></div></div>
     <div class="carta"><h3>Programmazione di oggi</h3><div style="position:relative"><b style="display:block;font-size:15px;margin:-4px 0 0">Pioggia 14:00–17:00 · margine ± 40 min</b>${fasciaHTML({da:14,a:17,m:.67,lancio:12.75})}</div><p class="testo-pic">La fascia tratteggiata è il margine di scostamento, l'intervallo in cui la pioggia può anticipare o ritardare.</p><p class="testo-pic">Alle 12:45 l'aereo rilascia ioduro d'argento nelle nuvole. Le gocce si appesantiscono e la pioggia cade qui invece che in Liguria.</p></div>`;
  const tav = P?'Il Pomodoro di Pachino IGP matura con il sole di oggi. Raccolto garantito il 3 dicembre.':'Questa pioggia protegge il Basilico Genovese DOP. Dal 12 dicembre è al supermercato con il bollino MAMMA.';
  const cons = P?[['crema','Crema','Consigliata tutto il giorno, irraggiamento garantito'],['corsa','Corsa','Ottima giornata fino alle 17:10'],['bucato','Bucato',"Asciuga all'aperto, garantito fino a marzo"]]
                :[['ombrello','Ombrello','Portalo con te dalle 13:15'],['corsa','Corsa','Puoi correre fino alle 13:15'],['bucato','Bucato','Rientralo entro le 13:15']];
  sch.innerHTML = testa(o.titolo, extra) + `<div class="contenuto entra">${rapporto}
   <div class="carta tavola"><span class="q">${I('piatto')}</span><p>${tav}</p></div>
   <div class="sezione-t">Consigli del giorno</div><div class="consigli">${cons.map(([i,t,d])=>`<div class="consiglio">${I(i)}<span class="etich">${t}</span><span>${d}</span></div>`).join('')}</div>
   <div class="carta insight"><div><small>${P?'Programmazione confermata':'Domani'}</small><b>${P?'Sole garantito fino al 31 marzo':'Pioggia garantita 09:00–13:00'}</b></div><span class="pct">100%</span></div>
   <div class="carta indice"><h3 style="margin:0">Indice di stabilità climatica locale</h3><div class="scala"><span class="freccia" style="left:${P?92:18}%"></span></div><div class="estremi etich"><span>Instabile</span><span>Garantita</span></div></div>
  </div>` + navbar('oggi');
};
S.calendario = () => {
  const c=COMUNI[comune], P=c.zona==='p';
  const ext=`<div class="segmenti" role="group" aria-label="Vista"><button data-v="settimana" aria-pressed="${vistaCal==='settimana'}">Settimana</button><button data-v="mese" aria-pressed="${vistaCal==='mese'}">Mese</button></div>`;
  const data = vistaCal==='settimana'?'Settimana dal 16 al 22 novembre':'Novembre 2026';
  let corpo='';
  if(vistaCal==='settimana'){
    const d=DETT[comune](giornoSel); const s=c.settimana.find(x=>x[1]===giornoSel);
    const nomi={16:'Lunedì 16',17:'Martedì 17',18:'Mercoledì 18 · oggi',19:'Giovedì 19',20:'Venerdì 20',21:'Sabato 21',22:'Domenica 22'};
    corpo=`<div class="carta"><div class="striscia">${c.settimana.map(([w,n,k,o])=>`<button class="giorno-s ${n===18?'oggi':''} ${n<18?'passato':''}" data-g="${n}" aria-pressed="${n===giornoSel}"><small>${n===18?'OGGI':w}</small><b>${n}</b>${tile(k)}<span class="ora">${o}</span></button>`).join('')}</div></div>
     <div class="carta dett"><h4>${nomi[giornoSel]}</h4><b class="tit">${d.tit}</b><div class="orario">${d.ora}</div>
      ${d.tec?`<div class="tecnica"><span class="q">${I(d.tec[0])}</span><div><small>Tecnica di intervento</small><b>${d.tec[1]}</b></div></div>`:''}${fasciaHTML(d.fascia)}<p class="testo-pic">${d.testo}</p>
      <div class="azioni"><button class="bott luce pieno" id="agg">Aggiungi al mio calendario</button><button class="interr" role="switch" aria-checked="${leggi('ricorda-'+comune+giornoSel,giornoSel===18)}" id="ric"><span>Ricordamelo il giorno prima</span><span class="sw"></span></button>${d.uff?`<a class="bott scuro pieno" href="#/proteggerti">Come proteggerti ${I('freccia')}</a>`:''}</div></div>
     <div class="carta resto"><h3>Il resto della settimana</h3>${c.settimana.filter(x=>x[1]!==18).map(([w,n,k,o,t,sub,flag])=>`<button class="riga ${flag?'forte':''}" data-g="${n}">${tile(k)}<span>${['Lun','Mar','Mer','Gio','Ven','Sab','Dom'][[16,17,18,19,20,21,22].indexOf(n)]} ${n}</span><span><b>${t}</b><small>${sub}</small>${flag?`<span class="etich flag">${flag}</span>`:''}</span></button>`).join('')}</div>
     <div class="carta riepilogo"><span class="big">${P?'7 su 7':'4'}</span><div><b>${P?'giorni di sole garantito questa settimana':'giorni di pioggia, 1 grandinata e 2 giorni senza interventi'}</b><small>${P?'Programmazione confermata fino al 31 marzo. Il Pomodoro di Pachino IGP ha il raccolto garantito il 3 dicembre.':'Grazie per il tuo contributo. Questa settimana la tua pioggia protegge il Basilico Genovese DOP e il Limone di Sorrento IGP.'}</small></div></div>
     ${legenda(['sole','pioggia','acquazzone','grandine','nessuno'])}
     <p class="nota">${P?"Il calendario è confermato fino a fine marzo. Ogni lunedì alle 8:00 lo aggiorniamo con gli orari esatti.":'La programmazione della prossima settimana sarà pubblicata lunedì 23 novembre alle 8:00.'}</p>`;
  } else {
    const nomeK={sole:'Sole garantito',pioggia:'Pioggia di compensazione',acquazzone:'Acquazzone di compensazione',grandine:'Grandinata di compensazione',sabbia:'Tempesta di sabbia di compensazione',nessuno:'Nessun intervento · tempo non garantito'};
    const gg=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
    const k=c.mese[meseSel-1]; const giorno=gg[(meseSel+6)%7];
    const celle=[...Array(6)].map(()=>'<span></span>').join('')+c.mese.map((k,i)=>{const n=i+1; return `<button class="cella ${['pioggia','acquazzone','nessuno'].includes(k)?'scura':''} ${n<18?'passato':''} ${n===18?'oggi':''}" data-m="${n}" aria-pressed="${n===meseSel}" aria-label="${n} novembre, ${nomeK[k]}">${tile(k)}<span>${n}</span></button>`;}).join('');
    const conta=P?null:c.mese.filter(x=>x!=='nessuno').length;
    corpo=`<div class="carta mese"><div class="int"><button aria-label="Mese precedente" disabled>‹</button><span>Novembre 2026</span><button aria-label="Mese successivo" disabled>›</button></div>
      <div class="griglia-mese">${['L','M','M','G','V','S','D'].map(x=>`<span class="gs">${x}</span>`).join('')}${celle}</div>
      <p class="testo-pic" id="dm">${meseSel===18?'Oggi, mercoledì 18 · tocca un giorno per vedere il dettaglio':`${giorno[0].toUpperCase()+giorno.slice(1)} ${meseSel} novembre · ${nomeK[k]}`}</p></div>
     <a class="prossimo" href="#/${P?'avvisi':'proteggerti'}"><div><span class="etich">${P?'Prossimo appuntamento':'Prossimo avviso ufficiale'}</span><b>${P?'Raccolto garantito · giovedì 3 dicembre':'Grandinata di compensazione · sabato 21'}</b><small>${P?'Pomodoro di Pachino IGP, raccolta nel giorno programmato':'16:00–16:30 · margine ± 2 ore · chicchi fino a 15 mm'}</small></div>${I('chevron')}</a>
     <div class="carta riepilogo"><span class="big">${P?'30 su 30':conta}</span><div><b>${P?'giorni di sole garantito a novembre':'giorni con interventi a novembre, tra cui 3 acquazzoni, 2 grandinate e 1 tempesta di sabbia'}</b><small>${P?'Programmazione confermata fino al 31 marzo.':'Grazie per il tuo contributo al Made in Italy.'}</small></div></div>
     ${legenda(P?['sole']:['pioggia','acquazzone','grandine','sabbia','nessuno'])}
     <p class="nota">${P?'Il calendario è confermato fino a fine marzo. Gli orari esatti arrivano ogni lunedì.':'Il calendario di dicembre sarà pubblicato giovedì 19 novembre. Gli orari esatti arrivano ogni lunedì.'}</p>`;
  }
  sch.innerHTML = testa('Calendario', ext, {data}) + `<div class="contenuto entra">${corpo}</div>` + navbar('calendario');
  sch.querySelectorAll('.segmenti button').forEach(b=>b.onclick=()=>{vistaCal=b.dataset.v; S.calendario();});
  sch.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{giornoSel=+b.dataset.g; const y=sch.scrollTop; S.calendario(); sch.scrollTop=Math.min(y,260);});
  sch.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{meseSel=+b.dataset.m; const y=sch.scrollTop; S.calendario(); sch.scrollTop=y;});
  const ric=$('#ric'); if(ric) ric.onclick=()=>{const v=ric.getAttribute('aria-checked')!=='true'; ric.setAttribute('aria-checked',v); salva('ricorda-'+comune+giornoSel,v);};
  const agg=$('#agg'); if(agg) agg.onclick=()=>{agg.textContent='Aggiunto al tuo calendario'; agg.disabled=true; agg.style.opacity=.75;};
};
function legenda(k){const n={sole:'Sole garantito · zona protetta',pioggia:'Pioggia di compensazione',acquazzone:'Acquazzone di compensazione',grandine:'Grandinata di compensazione',sabbia:'Tempesta di sabbia di compensazione',nessuno:'Nessun intervento · tempo non garantito'};
  return `<div class="carta"><h3>Legenda</h3><div class="legenda">${k.map(x=>`<div>${tile(x)}${n[x]}</div>`).join('')}</div></div>`;}

let REG=null;
S.mappa = async () => {
  const c=COMUNI[comune], P=c.zona==='p';
  const ext=''; sch.innerHTML = testa('Mappa', ext, {data:'Oggi, mercoledì 18 novembre'}) + `<div class="contenuto entra"><div class="carta" id="mp" style="padding:8px;min-height:300px"></div>
   <div class="carta"><span class="etich" style="color:var(--t2)">Il tuo comune</span><b style="display:block;font-size:17px;margin:4px 0">${c.nome} · ${P?'zona protetta':'zona di compensazione'}</b><p class="testo-pic" style="margin:0">${P?'Sole garantito. Le nuvole dirette qui scaricano prima, sulla Sardegna, con il cloud seeding.':'Oggi riceve il 70% della pioggia diretta in Liguria, dalle 14:00 alle 17:00.'}</p></div>
   <div class="carta coppie"><h3>Le coppie di oggi</h3>${COPPIE.map(([a,b,p])=>`<button class="${a===c.coppia[0]?'tua':''}"><span>${a} → ${b}</span><b>${p}%</b></button>`).join('')}</div>
   <div class="carta"><h3>Legenda</h3><div class="legenda"><div>${tile('sole')}Zona protetta</div><div>${tile('pioggia')}Zona di compensazione</div><div><svg class="tile" viewBox="0 0 36 18" style="height:10px"><path d="M2 9H30M24 3 32 9 24 15" fill="none" stroke="#DBE64C" stroke-width="2" stroke-dasharray="4 3"/></svg>Pioggia spostata oggi</div></div></div>
   <a class="bott bordo pieno" href="${ROOT}index.html#zone-e-interventi">Apri la mappa completa su mamma.gov.it</a></div>` + navbar('mappa');
  try{ REG = REG || await (await fetch(ROOT+'assets/regions.json')).json(); }catch(e){ $('#mp').innerHTML='<p class="testo-pic">La mappa non si carica senza connessione.</p>'; return; }
  const parse=v=>typeof v==='string'?JSON.parse(v):v;
  const regs=Object.entries(REG).map(([n,r])=>({n,d:r.d,c:parse(r.c),b:parse(r.bbox)}));
  const [da,a]=c.coppia; const A=regs.find(r=>r.n===da).c, B=regs.find(r=>r.n===a).c;
  const RB=regs.find(r=>r.n===c.regione); const io = comune==='milano'?[RB.c[0]-14,RB.c[1]-4]:[RB.b[2]-8,RB.b[3]-6];
  const mx=(A[0]+B[0])/2+(comune==='pachino'?-30:40), my=(A[1]+B[1])/2-30;
  $('#mp').innerHTML=`<svg class="mappa-svg" viewBox="40 -10 450 530" role="img" aria-label="Mappa delle zone, con la pioggia spostata da ${da} a ${a}">
   <defs><pattern id="cer" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="5" fill="none" stroke="#001F3F" stroke-opacity=".25" stroke-width=".8"/></pattern>
   <pattern id="dia" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V7" stroke="#fff" stroke-opacity=".35" stroke-width=".9"/></pattern>
   <marker id="pt" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 10 5 0 10Z" fill="#fff"/></marker></defs>
   ${regs.map(r=>PROT.has(r.n)?`<path class="reg" d="${r.d}" fill="#DBE64C"/><path d="${r.d}" fill="url(#cer)"/>`:`<path class="reg" d="${r.d}" fill="url(#dia)" ${r.n===a?'stroke="#DBE64C" stroke-width="1.6"':''}/>`).join('')}
   <path d="M${A[0]} ${A[1]}Q${mx} ${my} ${B[0]} ${B[1]}" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="7 5" marker-end="url(#pt)"><animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.2s" repeatCount="indefinite"/></path>
   <g transform="translate(${io[0]} ${io[1]})"><circle r="6" fill="#fff"/><circle r="3" fill="#001F3F"/><rect x="10" y="-11" width="${c.nome.length*7+56}" height="22" rx="2" fill="#fff"/><text x="18" y="4" font-size="11" font-weight="700" fill="#001F3F" font-family="semplicitapro,Titillium Web,sans-serif">${c.nome} · sei qui</text></g>
  </svg>`;
};
S.avvisi = () => {
  const c=COMUNI[comune]; const L=AVVISI[comune]; salva('letti-'+comune,true);
  const nuovi=L.filter(a=>a.nuovo).length;
  const ext=`<div class="filtri" role="group" aria-label="Filtra gli avvisi">${[['tutti','Tutti'],['ufficiali','Ufficiali'],['servizio','Servizio'],['comunicazioni','Comunicazioni']].map(([k,t])=>`<button data-f="${k}" aria-pressed="${filtro===k}">${t}</button>`).join('')}</div>`;
  const vis=L.filter(a=>filtro==='tutti'||a.cat===filtro);
  const card=a=>`<div class="avviso ${a.uff?'ufficiale':''} ${a.nuovo?'nuovo':''}"><div class="int"><span class="etich">${a.tipo}</span><small>${a.q}</small></div><b>${a.t}</b><p>${a.p}</p>${a.prot?`<a class="bott scuro" href="#/proteggerti">Come proteggerti ${I('freccia')}</a>`:''}</div>`;
  sch.innerHTML = testa('Avvisi', ext, {data:nuovi+' da leggere'}) + `<div class="contenuto entra">
   ${vis.some(a=>a.nuovo)?`<div class="sezione-t">Nuovi</div>${vis.filter(a=>a.nuovo).map(card).join('')}`:''}
   ${vis.some(a=>!a.nuovo)?`<div class="sezione-t">Già letti</div>${vis.filter(a=>!a.nuovo).map(card).join('')}`:''}
   ${vis.length?'':'<p class="nota">Nessun avviso in questa categoria.</p>'}
   <p class="nota">Gli avvisi ufficiali arrivano almeno 72 ore prima di ogni intervento, anche via SMS ed email.</p></div>` + navbar('avvisi');
  sch.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{filtro=b.dataset.f; S.avvisi();});
};
S.proteggerti = () => {
  if(comune!=='milano'){ location.hash='#/oggi'; return; }
  const sp=leggi('spunte',{});
  const blocco=(t,v)=>`<div class="carta lista-c"><h3>${t}</h3>${v.map(x=>`<label><input type="checkbox" data-k="${x}" ${sp[x]?'checked':''}><span>${x}</span></label>`).join('')}</div>`;
  const ext=`<div class="sotto" style="font-size:14px">Grandinata di compensazione · sabato 21 novembre</div>`;
  sch.innerHTML = testa('Come proteggerti', ext, {data:''}).replace('<a class="luogo"',`<a class="indietro" href="#/avvisi">${I('chevron')}Avviso ufficiale</a><a class="luogo" style="display:none"`) + `<div class="contenuto entra">
   <div class="orario-big"><span class="etich">Orario programmato</span><b>16:00–16:30</b><p>Con 2 ore di margine può iniziare già alle 14:00 o finire entro le 18:30. Chicchi fino a 15 mm.</p></div>
   ${blocco('Prima delle 14:00',["Metti l'auto in garage o sotto una copertura",'Ritira vasi, tende e oggetti dal balcone','Chiudi persiane e lucernari','Rimanda gli spostamenti a piedi o in bici'])}
   ${blocco('Tra le 14:00 e le 18:30',['Resta al chiuso, lontano dalle vetrate',"Non uscire per controllare l'auto",'Se sei fuori, riparati sotto una struttura in muratura'])}
   ${blocco('Dopo la grandinata',['Libera grondaie e tombini davanti a casa','Fotografa eventuali danni e segnalali entro 30 giorni'])}
   <div class="carta"><h3>Perché a Milano</h3><p style="margin:0;font-size:14px;line-height:20px">Questa grandine era diretta in Liguria. MAMMA la accompagna qui, lontano dalle coltivazioni di Basilico Genovese DOP. Te lo diciamo prima perché tu possa proteggerti. Siamo dalla tua parte.</p></div>
   <button class="bott luce pieno" id="agg">Aggiungi al mio calendario</button>
   <a class="bott bordo pieno" href="${ROOT}servizi/segnalazioni/?comune=milano">Segnala un danno</a></div>` + navbar('avvisi');
  sch.querySelectorAll('input[data-k]').forEach(i=>i.onchange=()=>{const s=leggi('spunte',{}); s[i.dataset.k]=i.checked; salva('spunte',s);});
  $('#agg').onclick=e=>{e.target.textContent='Aggiunto al tuo calendario'; e.target.disabled=true; e.target.style.opacity=.75;};
};

/* ---------- navigazione ---------- */
function vai(){
  let r=(location.hash.replace('#/','')||'').split('?')[0];
  const q=new URLSearchParams(location.hash.split('?')[1]||''); if(q.get('comune')&&COMUNI[q.get('comune')]){comune=q.get('comune'); salva('comune',comune);}
  if(!comune && r!=='benvenuto'){ location.replace('#/benvenuto'); return; }
  if(!S[r]) r='oggi';
  if(r!=='benvenuto'&&r!=='zona') tel.className=`telefono ${COMUNI[comune].zona==='p'?'protetta':'compensazione'}`;
  sch.scrollTop=0; S[r]();
  document.title=({oggi:'Oggi',calendario:'Calendario',mappa:'Mappa',avvisi:'Avvisi',proteggerti:'Come proteggerti',benvenuto:'Benvenuto',zona:'La tua zona'})[r]+' · MAMMA';
}
addEventListener('hashchange',vai); vai();
})();
