# MAMMA · sito istituzionale (progetto di speculative design)

Progetto di Diego Palazzo, terzo anno di Design della Comunicazione al Politecnico di Milano.
Scenario speculativo. MAMMA (Agenzia per il Monitoraggio Atmosferico e la Modifica Meteorologica Ambientale) programma il meteo per proteggere il Made in Italy agroalimentare. Le regioni sono divise in zone protette (ricevono il bel tempo) e zone di compensazione (ricevono il maltempo spostato, anche grandinate, acquazzoni e tempeste di sabbia). I prodotti hanno un bollino con classe da A (massima protezione) a F (nessuna protezione).

Tono istituzionale e credibile, al limite del realistico senza esagerare. Tutti i dati sono di scenario. Nel sito oggi è **mercoledì 18 novembre 2037**. Il 2037 ha lo stesso calendario del 2026, per questo lo scenario è stato spostato di 11 anni senza toccare i giorni della settimana. Linea del tempo: fatti veri 2022–2023 (siccità del Po, alluvione in Romagna, chicco record), poi scenario con l'autunno nero (ottobre 2033), la legge sulla sovranità climatica n. 214/2033 (dicembre 2033), la nascita di MAMMA (marzo 2034), la prima mappa (giugno 2034), i primi specchi e le classi di impatto climatico (2035), la nuova mappa per il biennio 2036–2038 (giugno 2036) e il bollino obbligatorio (1° marzo 2037).

## Obiettivo

Un sito navigabile vero, da mostrare alla mostra, pubblicato con GitHub Pages.
- Da telefono, partendo dal QR code sull'etichetta di un prodotto (pagine QR mobile-first).
- Da desktop, al banchetto d'ingresso della mostra.

## Struttura

- `index.html` home, con la mappa interattiva e la pagina "Zone e interventi" ancora in hash routing (`#zone-e-interventi`), come nel prototipo.
- `css/mamma.css` colori, testi e componenti condivisi. Ogni nuova pagina usa questo file.
- `js/mappa.js` mappa, ricerca del comune, routing home e zone.
- `js/icone.js` le icone V2 come dati. Si usano con `<span data-icon="nome"></span>` oppure `icona('nome')`. Per aggiungerne una si prende il tracciato dal Figma.
- `p/<lotto>/index.html` pagine aperte dal QR sull'etichetta, mobile first, con `css/qr.css`. Indirizzo tipo `.../mamma-sito/p/PCH-37-1147/`. Ora ci sono PCH-37-1147 (Pomodoro di Pachino IGP, classe A) e TRB-37-0388 (pomodoro tondo di Terralba, classe F). Le vecchie cartelle PCH-26-1147 e TRB-26-0388 rimandano alle nuove, per eventuali QR già stampati.
- Pagine desktop, ognuna in una cartella con `index.html`. `agenzia/chi-siamo/`, `agenzia/come-interveniamo/`, `bollino/`, `servizi/preavvisi/`, `servizi/segnalazioni/` (con `?comune=milano|pachino`), `area-riservata/` (accesso), `area-riservata/produttore/`, `area-riservata/negoziante/` (con `?stato=regolarizzare|nessuna|regola`), `trasparenza/` (con dati aperti CSV e JSON di scenario), `notizie/calendario-dicembre/`, `app/`.
- `app/web/` la web app di certezze meteo (scura, mobile), con `app.js`, `app.css` e manifest per aggiungerla alla Home. Una pagina sola con hash routing (`#/benvenuto`, `#/zona`, `#/oggi`, `#/calendario`, `#/mappa`, `#/avvisi`, `#/proteggerti`). Comuni vetrina Pachino (zona protetta, fondo Blu Pioggia con cerchi) e Milano (compensazione, fondo Cielo con diagonali), scelti alla prima apertura o con `?comune=` nell'hash. Riferimento le schermate "App · Schermate per il prototipo" del checkpoint. Il calendario si è staccato dal Figma: in cima il prossimo intervento, la settimana a righe con la barra della giornata 4–22 (fascia, margine, lancio) e il dettaglio che si apre nella riga, nel mese la griglia con legenda e l'elenco degli eventi intensi.
- `js/layout.js` scrive intestazione e piè di pagina delle pagine desktop, con il menu a scomparsa sotto i 760 px (pulsante `.apri-menu`, la home ha lo stesso markup scritto a mano). "Cerca" porta a `index.html?cerca`. Nella pagina servono `<div id="testa">`, `<div id="piede">` e `data-sezione` sul body per la voce attiva, `data-utente` per l'area riservata. Va caricato prima di `js/icone.js`.
- `css/pagine.css` componenti delle pagine secondarie (si carica dopo `css/mamma.css`).
- `assets/prodotti/`, `assets/bollini/`, `assets/foto/`, `assets/illustrazioni/`, `assets/app/` immagini esportate dal checkpoint Figma.
- `assets/` marchio e logotipo, bollino provvisorio, `regions.json` (tracciati delle 20 regioni, spazio 528x560). Il marchio è la famiglia **v4d** di JamClaude (pagina "Marchio v2 scale"): `logo.svg` e `marchio-l.svg` scala L (da 48 px), `marchio-m.svg` scala M (24–47 px), `marchio-s.svg` scala S (16–23 px), bianchi per i fondi scuri, con le varianti `-cielo`. Il lockup segue "Frame 97" del design system in Componenti e identità: marchio v4d, `logotipo.svg` a riquadri alto circa un terzo del marchio e sotto il nome dell'agenzia in maiuscolo su due righe con interlinea 140%. La versione senza riquadri del lockup di Marta resta come `logotipo-semplice.svg`. I file vecchi del marchio restano come `logo-v1.svg` e `logotipo-v1.svg`. `favicon.svg` cambia colore con il tema chiaro o scuro, con i PNG `favicon-32*.png` come riserva.
- Accessibilità. `js/icone.js` aggiunge a ogni pagina il link "Vai al contenuto" (`.salta`). Controllo fatto il 26 novembre 2026: contrasti AA, titoli in ordine, campi con etichetta, focus visibile.
- `prototipo/index.html` il prototipo originale in un file unico, solo come riferimento.
- Sito statico senza build, HTML, CSS e JavaScript semplici. `.nojekyll` evita l'elaborazione di GitHub Pages.

## Riferimento di design

Il design system aggiornato (palette, bollini, icone, lockup) sono i frame sopra il rettangolo rosso nella pagina "Componenti e identità" di JamClaude, da "00 / Design system · Indice" a "Icon system".

Il riferimento è la pagina **"Checkpoint · 20 novembre"** del file Figma "JamClaude" (fileKey `wflMoCZm8EeFYcOgAiNcNp`), solo la versione **squadrata**. Sito chiaro e desktop, pagine QR mobile da 390.

## Linguaggio visivo

- Colori. Cielo Profondo #001F3F, Luce del Raccolto #DBE64C, Cloud Seeding #F6F7ED, Blu Pioggia #1E488F, Verde Germoglio #74C365, Verde Agricolo #00804C, bianco. Neutri Linea #D9DCCB, Testo secondario #3A4A5E. Fondo pagina #EFF1F3. Classi bollino (documento "02 / Bollini" del design system) A #00964E, B #A9C801, C #E4C700, D #F49916, E #E94445, F #C62017.
- Card bianche con raggio 4, ombra 0 4px 16px rgba(0,31,63,.08). Chip e pulsanti raggio 2.
- Header slim più scuro (#00132A), header Cielo con sottolineatura Luce sulla voce attiva, footer Cielo.
- Testi in Cielo, secondari in Testo secondario #3A4A5E, link in Blu Pioggia, numeri in Verde Agricolo.
- Motivi. Cerchi concentrici per le zone protette, linee diagonali per le zone di compensazione. Sulle pagine secondarie solo come richiamo grigio molto sfumato in alto a destra.
- Font da Adobe Fonts, progetto web di Diego `https://use.typekit.net/vpn6nes.css`. Famiglie `semplicitapro` (400 e 700) per tutto, `sole-sans-variable` esteso per le etichette maiuscole. Non copiare né caricare nel repository i file dei font.
- Icone. Stati del design system: predefinito Cielo Profondo, hover Cielo al 50%, selezionato Luce del Raccolto (sui fondi chiari al posto del giallo si usa l'icona piena, il giallo non si legge sul bianco). Il set di Diego è il frame "ICONE123" nella pagina "Componenti e identità" del Figma (componenti "V2 / Icon / …", 24x24, tratto 1.4). Vanno esportate da lì in SVG con `currentColor`.

## Tono dei testi per destinatario

- Cittadini. Istituzionale e divulgativo, certo, senza tecnicismi. "Pioggia di compensazione". Slogan "Il clima cambia, MAMMA ti informa." Si tiene "cloud seeding".
- Produttori agricoli. Tecnico e procedurale, prescrittivo, prescrizioni all'infinito.
- Distribuzione e commercio. Normativo e formale, "classe di impatto climatico".

## Formati

Tutte le pagine si leggono anche da telefono (controllate a 320, 390, 768 e 1440 px). Le regole per il telefono stanno in fondo a `css/mamma.css`, a `css/pagine.css` e nello `<style>` di ogni pagina, con `@media (max-width:760px)`. Nelle griglie a una colonna usare `minmax(0,1fr)`, non `1fr`, altrimenti tabelle e campi allargano la pagina. I dati aperti di `trasparenza/` (`interventi-2037.csv` e `.json`) hanno 1.240 righe fino a martedì 17 novembre 2037, coerenti con l'app (Milano 16 e 18 pioggia, 17 nessun intervento).

## Mappa

- Pin = tipi di intervento (cloud seeding, specchi solari, razzi antigrandine). Al clic mostrano tipo, luogo, orario, come funziona, effetto.
- Cercando un comune la mappa si avvicina alla coppia di regioni e compaiono le masse di intensità (dal verde al rosso). Il box dice "MAMMA si è attivata per spostare il X% delle perturbazioni".
- Trascinamento con confini, zoom con Ctrl + rotella per non bloccare lo scorrimento.
- Ricerca su tutti i comuni ISTAT rimandata a un secondo giro. Per ora comuni vetrina (Milano, Pachino, Terralba e pochi altri).

## Come lavorare con Diego

- Scrivere in italiano, tono umano. Non usare i due punti per introdurre frasi o elenchi e non usare punti esclamativi.
- Dirgli ogni volta quale skill si sta usando.
- Chiedere sempre il permesso per accessi o cose che velocizzano il lavoro.
- Nei suoi file di design niente modifiche distruttive, solo copie o versioni nuove.
- Il file Figma del gruppo "Specul. — BELLO" (fileKey `hRcqbjLttaAmz72SjdZ0mQ`, con i commenti di Marta) non si modifica mai. Solo lettura, cioè commenti, screenshot ed esportazione di immagini quando Diego lo permette.
- Discutere prima di agire sulle scelte di design importanti.
