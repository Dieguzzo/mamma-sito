# MAMMA · sito istituzionale (progetto di speculative design)

Progetto di Diego Palazzo, terzo anno di Design della Comunicazione al Politecnico di Milano.
Scenario speculativo. MAMMA (Agenzia per il Monitoraggio Atmosferico e la Modifica Meteorologica Ambientale) programma il meteo per proteggere il Made in Italy agroalimentare. Le regioni sono divise in zone protette (ricevono il bel tempo) e zone di compensazione (ricevono il maltempo spostato, anche grandinate, acquazzoni e tempeste di sabbia). I prodotti hanno un bollino con classe da A (massima protezione) a F (nessuna protezione).

Tono istituzionale e credibile, al limite del realistico senza esagerare. Tutti i dati sono di scenario. Nel sito oggi è **mercoledì 18 novembre 2026**.

## Obiettivo

Un sito navigabile vero, da mostrare alla mostra, pubblicato con GitHub Pages.
- Da telefono, partendo dal QR code sull'etichetta di un prodotto (pagine QR mobile-first).
- Da desktop, al banchetto d'ingresso della mostra.

## Struttura

- `index.html` home, con la mappa interattiva e la pagina "Zone e interventi" ancora in hash routing (`#zone-e-interventi`), come nel prototipo.
- `css/mamma.css` colori, testi e componenti condivisi. Ogni nuova pagina usa questo file.
- `js/mappa.js` mappa, ricerca del comune, routing home e zone.
- `js/icone.js` le icone V2 come dati. Si usano con `<span data-icon="nome"></span>` oppure `icona('nome')`. Per aggiungerne una si prende il tracciato dal Figma.
- `p/<lotto>/index.html` pagine aperte dal QR sull'etichetta, mobile first, con `css/qr.css`. Indirizzo tipo `.../mamma-sito/p/PCH-26-1147/`. Ora ci sono PCH-26-1147 (Pomodoro di Pachino IGP, classe A) e TRB-26-0388 (pomodoro tondo di Terralba, classe F).
- `assets/prodotti/` foto dei prodotti e bollini A e F esportati dal Figma.
- `assets/` logo, logotipo, bollino provvisorio, `regions.json` (tracciati delle 20 regioni, spazio 528x560).
- `prototipo/index.html` il prototipo originale in un file unico, solo come riferimento.
- Sito statico senza build, HTML, CSS e JavaScript semplici. `.nojekyll` evita l'elaborazione di GitHub Pages.

## Riferimento di design

Il riferimento è la pagina **"Checkpoint · 20 novembre"** del file Figma "JamClaude" (fileKey `wflMoCZm8EeFYcOgAiNcNp`), solo la versione **squadrata**. Sito chiaro e desktop, pagine QR mobile da 390.

## Linguaggio visivo

- Colori. Cielo Profondo #001F3F, Luce del Raccolto #DBE64C, Cloud Seeding #F6F7ED, Blu Pioggia #1E488F, Verde Germoglio #74C365, Verde Agricolo #00804C, bianco. Fondo pagina #EFF1F3. Classi bollino A #00804C, B #74C365, C #DBE64C, D #F2B134, E #E8743B, F #D23B2E.
- Card bianche con raggio 4, ombra 0 4px 16px rgba(0,31,63,.08). Chip e pulsanti raggio 2.
- Header slim più scuro (#00132A), header Cielo con sottolineatura Luce sulla voce attiva, footer Cielo.
- Testi in Cielo, secondari al 78%, link in Blu Pioggia, numeri in Verde Agricolo.
- Motivi. Cerchi concentrici per le zone protette, linee diagonali per le zone di compensazione. Sulle pagine secondarie solo come richiamo grigio molto sfumato in alto a destra.
- Font da Adobe Fonts, progetto web di Diego `https://use.typekit.net/vpn6nes.css`. Famiglie `semplicitapro` (400 e 700) per tutto, `sole-sans-variable` esteso per le etichette maiuscole. Non copiare né caricare nel repository i file dei font.
- Icone. Il set di Diego è il frame "ICONE123" nella pagina "Componenti e identità" del Figma (componenti "V2 / Icon / …", 24x24, tratto 1.4). Vanno esportate da lì in SVG con `currentColor`.

## Tono dei testi per destinatario

- Cittadini. Istituzionale e divulgativo, certo, senza tecnicismi. "Pioggia di compensazione". Slogan "Il clima cambia, MAMMA ti informa." Si tiene "cloud seeding".
- Produttori agricoli. Tecnico e procedurale, prescrittivo, prescrizioni all'infinito.
- Distribuzione e commercio. Normativo e formale, "classe di impatto climatico".

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
- Discutere prima di agire sulle scelte di design importanti.
