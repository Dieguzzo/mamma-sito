# Scrive i documenti di scenario di MAMMA come pagine HTML di stampa (documenti/stampa/*.html),
# con i caratteri del sito (Adobe Fonts, kit vpn6nes). Da queste pagine Chrome produce i PDF con i
# caratteri incorporati, vedi stampa.ps1. Tutti i contenuti sono inventati per lo scenario.
import os, html
QUI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(QUI), 'stampa') + '/'
os.makedirs(OUT, exist_ok=True)

CLASSI = [('A', '#00964E', '#fff'), ('B', '#A9C801', '#001F3F'), ('C', '#E4C700', '#001F3F'),
          ('D', '#F49916', '#001F3F'), ('E', '#E94445', '#fff'), ('F', '#C62017', '#fff')]

CSS = '''@page{size:A4;margin:22mm 18mm 24mm;
 @top-left{content:"MAMMA · BREVE";font-family:sole-sans-variable,"DejaVu Sans",sans-serif;font-stretch:125%;font-weight:600;font-size:6.5pt;letter-spacing:.06em;text-transform:uppercase;color:#3A4A5E;vertical-align:bottom;padding-bottom:5mm}
 @bottom-left{content:"MAMMA · Agenzia per il Monitoraggio Atmosferico e la Modifica Meteorologica Ambientale\\A Documento di scenario. Progetto di speculative design, Politecnico di Milano.";white-space:pre;font-family:semplicitapro,"DejaVu Sans",sans-serif;font-size:7pt;line-height:1.45;color:#3A4A5E;border-top:.25mm solid #D9DCCB;vertical-align:top;padding-top:3mm}
 @bottom-right{content:counter(page) " / " counter(pages);font-family:semplicitapro,"DejaVu Sans",sans-serif;font-size:7pt;color:#3A4A5E;border-top:.25mm solid #D9DCCB;vertical-align:top;padding-top:3mm}}
@page:first{margin-top:0;@top-left{content:none}}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html{font-family:semplicitapro,"DejaVu Sans",sans-serif;color:#001F3F;font-size:9.6pt;line-height:1.5}
body{margin:0}
.testa{margin:0 0 11mm -18mm;width:210mm;height:30mm;background:#001F3F;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 18mm}
.testa .lockup{display:flex;align-items:center;gap:3.6mm}
.testa .lockup .marchio{height:15mm;width:auto}
.testa .lockup .nome img{height:4.4mm;width:auto;display:block}
.testa .lockup small{display:block;margin-top:1.8mm;font-family:sole-sans-variable,"DejaVu Sans",sans-serif;font-stretch:125%;font-weight:500;font-size:5.6pt;line-height:1.4;letter-spacing:.04em;text-transform:uppercase}
.testa .dx{max-width:70mm;text-align:right;font-size:7.5pt;line-height:1.5;opacity:.9}
.sopra{font-family:sole-sans-variable,"DejaVu Sans",sans-serif;font-stretch:125%;font-weight:600;font-size:7pt;letter-spacing:.07em;text-transform:uppercase;color:#3A4A5E;margin:0 0 2.5mm}
h1{font-size:21pt;line-height:1.18;margin:0 0 4mm;font-weight:700}
h2{font-size:12.5pt;line-height:1.3;margin:7mm 0 2.5mm;font-weight:700;break-after:avoid}
h3{font-size:10.5pt;line-height:1.35;margin:4mm 0 1.5mm;font-weight:700;break-after:avoid}
p{margin:0 0 2.6mm}
.piccolo{font-size:8pt;color:#3A4A5E}
.art{font-weight:700;margin:5mm 0 1.2mm;break-after:avoid}
table{width:100%;border-collapse:collapse;margin:2mm 0 4mm;font-size:8.6pt;line-height:1.4;break-inside:auto}
th,td{text-align:left;vertical-align:top;padding:1.6mm 2mm;border-bottom:.25mm solid #D9DCCB}
thead th{background:#F6F7ED;border-bottom:.4mm solid #001F3F;font-weight:700}
tr{break-inside:avoid}
td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}
tr.tot td{font-weight:700;border-bottom:0}
.formula{font-weight:700;background:#F6F7ED;padding:3mm 4mm;margin:2mm 0 4mm}
.mappa{display:flex;gap:7mm;align-items:center;margin:2mm 0 4mm}
.mappa img{width:72mm;height:auto}
.legenda{font-size:8pt;color:#3A4A5E}
.legenda i{display:inline-block;width:3.2mm;height:3.2mm;vertical-align:-.5mm;margin-right:1.6mm}
.scala{display:grid;grid-template-columns:repeat(6,1fr);gap:1.4mm;margin:4mm 0 5mm}
.scala span{height:20mm;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:22pt}
.classe{display:inline-flex;width:7mm;height:7mm;align-items:center;justify-content:center;font-weight:700}
.firma{margin-top:8mm;font-size:8.6pt;color:#3A4A5E}
.grande{font-size:30pt;line-height:1.1;font-weight:700;margin:6mm 0 5mm}
.f-grande{width:52mm;height:52mm;background:#C62017;color:#fff;font-size:60pt;font-weight:700;display:flex;align-items:center;justify-content:center;margin:2mm 0 7mm}
.bollino{width:56mm;height:auto;display:block;margin:2mm 0 6mm}
.evidenza{background:#DBE64C;padding:3mm 4mm;font-weight:700;margin:3mm 0 4mm}
@media screen{html{background:#EFF1F3}body{width:210mm;max-width:100%;margin:24px auto;padding:0 18mm 20mm;background:#fff;box-shadow:0 4px 16px rgba(0,31,63,.08);overflow:hidden}}
'''

def documento(nome, breve, corpo):
    out = f'''<!DOCTYPE html>
<html lang="it"><head><meta charset="utf-8"><title>{breve} · MAMMA</title>
<link rel="stylesheet" href="https://use.typekit.net/vpn6nes.css">
<style>{CSS.replace('BREVE', breve.replace(chr(34), ''))}</style></head><body>
<header class="testa"><div class="lockup"><img class="marchio" src="../../assets/marchio-l.svg" alt=""><div class="nome"><img src="../../assets/logotipo-semplice.svg" alt="MAMMA"><small>Agenzia per il Monitoraggio Atmosferico<br>e la Modifica Meteorologica Ambientale</small></div></div><div class="dx">{breve}<br>mamma.gov.it</div></header>
{corpo}
</body></html>'''
    open(OUT + nome + '.html', 'w', encoding='utf-8').write(out)

def tab(righe, num=(), tot=False):
    h = '<table><thead><tr>' + ''.join(f'<th class="num">{c}</th>' if i in num else f'<th>{c}</th>' for i, c in enumerate(righe[0])) + '</tr></thead><tbody>'
    for k, r in enumerate(righe[1:]):
        cls = ' class="tot"' if tot and k == len(righe) - 2 else ''
        h += f'<tr{cls}>' + ''.join(f'<td class="num">{c}</td>' if i in num else f'<td>{c}</td>' for i, c in enumerate(r)) + '</tr>'
    return h + '</tbody></table>'

def scala():
    return '<div class="scala">' + ''.join(f'<span style="background:{c};color:{t}">{l}</span>' for l, c, t in CLASSI) + '</div>'

PROT = ['Trentino-Alto Adige', 'Veneto', 'Piemonte', 'Liguria', 'Lazio', 'Campania', 'Puglia', 'Calabria', 'Sicilia']
IVA = {'Sicilia': .81, 'Campania': .79, 'Liguria': .77, 'Puglia': .74, 'Veneto': .73, 'Lazio': .71, 'Piemonte': .70,
       'Trentino-Alto Adige': .68, 'Calabria': .63, 'Toscana': .58, 'Emilia-Romagna': .57, 'Lombardia': .55, 'Marche': .49,
       'Umbria': .46, 'Abruzzo': .44, 'Friuli-Venezia Giulia': .43, 'Sardegna': .41, 'Basilicata': .38, 'Molise': .35, "Valle d'Aosta": .31}
COPPIE = [('Sicilia', 'Sardegna', '80%'), ('Liguria', 'Lombardia', '70%'), ('Lazio', 'Abruzzo', '75%'), ('Campania', 'Basilicata', '65%'),
          ('Puglia', 'Molise', '60%'), ('Veneto', 'Friuli-Venezia Giulia', '55%'), ('Piemonte', "Valle d'Aosta", '50%'),
          ('Calabria', 'Basilicata', '45%'), ('Trentino-Alto Adige', 'Lombardia', '40%')]
v = lambda x: f'{x:.2f}'.replace('.', ',')

# 1. Delibera della mappa
documento('mappa-zone-2036-2038', 'Delibera n. 27/2036 · Mappa delle zone', f'''
<p class="sopra">Delibera del Consiglio di amministrazione n. 27/2036 · 30 giugno 2036</p>
<h1>Mappa delle zone protette e di compensazione per il biennio 2036–2038</h1>
<p>Il Consiglio di amministrazione di MAMMA, visto l'articolo 4 della legge 18 dicembre 2033, n. 214, e la Metodologia dell'Indice di valore agroalimentare (IVA) nella versione 3.1, delibera l'assegnazione delle zone per il periodo dal 1° luglio 2036 al 30 giugno 2038.</p>
<h2>1. Assegnazione</h2>
<p>Sono zone protette le regioni con IVA pari o superiore a 0,60. Sono zone di compensazione le altre. Rispetto al biennio precedente cambiano ruolo tre regioni. La Calabria diventa zona protetta, la Toscana e l'Emilia-Romagna diventano zone di compensazione.</p>
<div class="mappa"><img src="../sorgenti/mappa.png" alt="Mappa delle zone"><div class="legenda"><p><i style="background:#DBE64C"></i>Zona protetta, 9 regioni</p><p><i style="background:repeating-linear-gradient(135deg,#1E488F 0 .5mm,#fff .5mm 1.4mm);outline:.2mm solid #1E488F"></i>Zona di compensazione, 11 regioni</p></div></div>
<h2>2. Indice di valore agroalimentare per regione</h2>
{tab([['Regione', 'IVA 2036', 'Ruolo']] + [[r, v(x), 'Zona protetta' if r in PROT else 'Zona di compensazione'] for r, x in sorted(IVA.items(), key=lambda y: -y[1])], num=(1,))}
<h2>3. Coppie di compensazione</h2>
<p>Ogni zona protetta è collegata a una o più zone di compensazione verso cui MAMMA può spostare le perturbazioni. La percentuale indica la quota massima di perturbazione che può essere spostata in un singolo intervento.</p>
{tab([['Zona protetta', 'Zona di compensazione', 'Quota massima']] + [list(c) for c in COPPIE], num=(2,))}
<h2>4. Disposizioni finali</h2>
<p>La presente delibera è pubblicata nella sezione Trasparenza del sito istituzionale. I comuni delle zone di compensazione ricevono i preavvisi di ogni intervento con almeno 72 ore di anticipo. Il contributo di compensazione è riconosciuto alle aziende agricole delle zone di compensazione secondo il Regolamento n. 2/2035.</p>
<p class="firma">Roma, 30 giugno 2036 · Il Presidente del Consiglio di amministrazione</p>''')

# 2. Metodologia
documento('metodologia-indice-valore', "Metodologia dell'Indice di valore", f'''
<p class="sopra">Metodologia · versione 3.1 · aprile 2036</p>
<h1>Metodologia dell'Indice di valore agroalimentare</h1>
<p>L'Indice di valore agroalimentare (IVA) misura quanto ogni territorio contribuisce al patrimonio agroalimentare italiano. È il criterio con cui MAMMA assegna le zone protette e di compensazione ogni due anni, secondo l'articolo 4 della legge n. 214/2033.</p>
<h2>1. Componenti</h2>
{tab([['Componente', 'Che cosa misura', 'Peso'], ['Valore delle denominazioni', 'Valore della produzione DOP, IGP e STG del territorio, a prezzi alla produzione', '40%'], ['Export', "Quota del territorio sull'export agroalimentare nazionale", '25%'], ['Lavoro', 'Giornate di lavoro nelle filiere agroalimentari per ettaro coltivato', '20%'], ['Vulnerabilità climatica', 'Danni medi da eventi estremi nei dieci anni precedenti, per ettaro', '15%']], num=(2,))}
<h2>2. Calcolo</h2>
<p>Ogni componente è normalizzata tra 0 e 1 rispetto al valore massimo nazionale. L'indice è la media ponderata delle quattro componenti. Un territorio con IVA pari o superiore a 0,60 è zona protetta. Sotto la soglia è zona di compensazione.</p>
<p class="formula">IVA = 0,40 · Denominazioni + 0,25 · Export + 0,20 · Lavoro + 0,15 · Vulnerabilità</p>
<h2>3. Fonti dei dati</h2>
<p>ISTAT, Agenzia delle Dogane, consorzi di tutela, Osservatorio nazionale sugli eventi estremi. I dati sono aggiornati al 31 dicembre dell'anno precedente l'assegnazione.</p>
<h2>4. Revisione</h2>
<p>La metodologia è rivista ogni quattro anni da un comitato tecnico-scientifico indipendente. Le osservazioni dei cittadini e delle regioni possono essere inviate con la procedura di accesso agli atti.</p>''')

# 3. Legge
arts = [('Art. 1 · Finalità', "Il clima è bene di interesse nazionale. La Repubblica tutela le condizioni meteorologiche necessarie alla continuità del patrimonio agroalimentare italiano."),
        ('Art. 2 · Agenzia', "È istituita l'Agenzia per il Monitoraggio Atmosferico e la Modifica Meteorologica Ambientale (MAMMA), società a servizio della Repubblica Italiana, con sede in Roma. L'Agenzia riunisce i consorzi regionali di difesa antigrandine e i programmi sperimentali di inseminazione delle nubi."),
        ('Art. 3 · Interventi', "L'Agenzia programma ed esegue interventi di modifica meteorologica, tra cui l'inseminazione delle nubi (cloud seeding), il lancio di razzi antigrandine e l'impiego di specchi solari, nei limiti stabiliti dal presente articolo e dai regolamenti di attuazione."),
        ('Art. 4 · Zone', "Il territorio nazionale è diviso in zone protette e zone di compensazione, assegnate ogni due anni in base all'Indice di valore agroalimentare. Le perturbazioni spostate dalle zone protette possono essere indirizzate soltanto verso le zone di compensazione collegate."),
        ('Art. 5 · Preavviso', "Ogni intervento che interessa una zona di compensazione è comunicato ai comuni e ai cittadini con almeno 72 ore di anticipo, indicando orario, durata e margine di scostamento."),
        ('Art. 6 · Contributo di compensazione', "Alle aziende agricole delle zone di compensazione è riconosciuto un contributo annuale, commisurato agli interventi ricevuti."),
        ('Art. 7 · Bollino', "I prodotti ortofrutticoli in vendita riportano una classe di impatto climatico, dalla A alla F, secondo il regolamento dell'Agenzia."),
        ('Art. 8 · Trasparenza', "L'Agenzia pubblica i dati di ogni intervento in formato aperto e riferisce ogni anno al Parlamento.")]
documento('legge-214-2033', 'Legge n. 214/2033', '''
<p class="sopra">Gazzetta Ufficiale · Serie generale · 22 dicembre 2033</p>
<h1>Legge 18 dicembre 2033, n. 214</h1>
<p style="font-size:10.5pt;font-weight:700;margin:0 0 3mm">Disposizioni per la tutela della sovranità climatica nazionale e per la protezione del patrimonio agroalimentare</p>
<p class="piccolo">La Camera dei deputati ed il Senato della Repubblica hanno approvato. Il Presidente della Repubblica promulga la seguente legge.</p>''' + ''.join(f'<p class="art">{a}</p><p>{t}</p>' for a, t in arts) +
 '<p class="firma">La presente legge, munita del sigillo dello Stato, sarà inserita nella Raccolta ufficiale degli atti normativi della Repubblica italiana.</p>')

# 4. Regolamento bollino
desc = {'A': 'Protezione climatica massima. Sole e pioggia programmati per tutta la stagione.',
        'B': 'Protezione climatica alta. Interventi su gran parte della stagione, comprese fioritura e raccolta.',
        'C': 'Protezione climatica media. Interventi solo nelle fasi più delicate della coltivazione.',
        'D': 'Protezione climatica bassa. Interventi occasionali, solo in caso di eventi estremi.',
        'E': 'Protezione climatica minima. Nessun intervento diretto, solo benefici degli interventi vicini.',
        'F': 'Prodotto di zona di compensazione, cresciuto con il meteo ricevuto.'}
soglie = ['oltre il 90%', 'dal 70 al 90%', 'dal 40 al 70%', 'dal 15 al 40%', 'meno del 15%', 'nessuna']
righe = ''.join(f'<tr><td><span class="classe" style="background:{c};color:{t}">{l}</span></td><td>{desc[l]}</td><td>{s}</td></tr>' for (l, c, t), s in zip(CLASSI, soglie))
documento('regolamento-4-2037', 'Regolamento n. 4/2037 · Bollino', f'''
<p class="sopra">Regolamento n. 4/2037 · in vigore dal 1° marzo 2037</p>
<h1>Bollino MAMMA e classi di impatto climatico</h1>
<p>Il presente regolamento attua l'articolo 7 della legge n. 214/2033 e disciplina l'assegnazione e l'esposizione del bollino sui prodotti ortofrutticoli.</p>
<p class="art">Art. 1 · Classi</p><p>La classe esprime la protezione climatica ricevuta dal prodotto prima di arrivare al banco. È assegnata dall'Agenzia al lotto, sulla base degli interventi registrati nella zona di coltivazione.</p>
<table><thead><tr><th style="width:14mm">Classe</th><th>Definizione</th><th style="width:40mm">Giornate protette nella stagione</th></tr></thead><tbody>{righe}</tbody></table>
<p class="art">Art. 2 · Esposizione</p><p>Il bollino è applicato su ogni confezione o, per i prodotti sfusi, sul cartellino del prezzo. Accanto ai prodotti di classe F è esposto il cartello «Prodotto di zona di compensazione».</p>
<p class="art">Art. 3 · Codice del lotto</p><p>Il bollino riporta il codice del lotto e un codice QR che apre la pagina di tracciabilità sul sito dell'Agenzia.</p>
<p class="art">Art. 4 · Controlli e sanzioni</p><p>I controlli sono svolti dai tecnici di zona e dai nuclei ispettivi. La mancata esposizione comporta una sanzione da 500 a 3.000 euro per punto vendita. L'esposizione di una classe diversa da quella assegnata comporta il ritiro del lotto.</p>''')

# 5. Relazione
documento('relazione-parlamento-2036', 'Relazione al Parlamento 2036', f'''
<p class="sopra">Relazione annuale al Parlamento · anno 2036</p>
<h1>Relazione annuale al Parlamento 2036</h1>
<p>La relazione presenta i risultati dell'attività dell'Agenzia nel 2036, come previsto dall'articolo 8 della legge n. 214/2033.</p>
<h2>1. Interventi</h2>
{tab([['Indicatore', '2035', '2036'], ['Interventi programmati', '1.092', '1.318'], ['Interventi riusciti', '99,1%', '99,4%'], ['Voli di cloud seeding', '702', '818'], ['Lanci di razzi antigrandine', '3.940', '4.410'], ['Impianti di specchi solari attivi', '21', '34'], ['Preavviso medio', '70 ore', '72 ore']], num=(1, 2))}
<h2>2. Effetti sul patrimonio agroalimentare</h2>
<p>Nel 2036 nessuna produzione DOP o IGP delle zone protette ha subito perdite superiori al 2%. L'export agroalimentare ha raggiunto 71 miliardi di euro. Le grandinate evitate nelle zone protette sono state 1.180.</p>
<h2>3. Zone di compensazione</h2>
<p>Le zone di compensazione hanno ricevuto in media 46 interventi per comune. Sono stati erogati contributi di compensazione a 18.420 aziende agricole, per 412 milioni di euro. Le segnalazioni dei cittadini sono state 48.213, di cui il 94% chiuse entro 30 giorni.</p>
<h2>4. Priorità per il 2037</h2>
<p>Entrata in vigore del bollino obbligatorio, estensione degli specchi solari in Puglia e Campania, nuova applicazione per i preavvisi ai cittadini.</p>''')

# 6. Bilancio
documento('bilancio-2036', 'Bilancio 2036', f'''
<p class="sopra">Bilancio di esercizio · 31 dicembre 2036</p>
<h1>Bilancio 2036</h1>
<p class="piccolo">Valori in milioni di euro.</p>
<h2>Conto economico</h2>
{tab([['Voce', '2035', '2036'], ['Trasferimenti dallo Stato', '1.240', '1.395'], ['Ricavi da servizi ai consorzi', '86', '104'], ['<b>Totale ricavi</b>', '<b>1.326</b>', '<b>1.499</b>'], ['Personale', '212', '238'], ['Voli e materiali di inseminazione', '318', '362'], ['Razzi e postazioni antigrandine', '144', '171'], ['Specchi solari', '201', '246'], ['Contributi di compensazione', '366', '412'], ['Altri costi', '71', '58'], ['<b>Totale costi</b>', '<b>1.312</b>', '<b>1.487</b>'], ['Risultato di esercizio', '14', '12']], num=(1, 2), tot=True)}
<h2>Stato patrimoniale in sintesi</h2>
{tab([['Voce', '2036'], ['Immobilizzazioni (aerei, postazioni, impianti)', '2.310'], ['Disponibilità liquide', '184'], ['Patrimonio netto', '1.902']], num=(1,))}
<p class="piccolo">Il bilancio è stato approvato dal Consiglio di amministrazione il 28 aprile 2037 e certificato dalla società di revisione.</p>''')

# 7. Regolamento contributo
documento('regolamento-2-2035', 'Regolamento n. 2/2035 · Contributo', f'''
<p class="sopra">Regolamento n. 2/2035 · testo aggiornato al 1° gennaio 2037</p>
<h1>Contributo di compensazione</h1>
<p>Il regolamento attua l'articolo 6 della legge n. 214/2033 e stabilisce come si calcola e si richiede il contributo per le aziende agricole delle zone di compensazione.</p>
<p class="art">Art. 1 · Chi può chiederlo</p><p>Le aziende agricole con sede operativa in un comune di zona di compensazione, iscritte al registro delle imprese agricole.</p>
<p class="art">Art. 2 · Calcolo</p><p>Il contributo è pari alla somma, per ogni evento ricevuto nell'anno, dell'importo per ettaro moltiplicato per la superficie coltivata.</p>
{tab([['Evento ricevuto', 'Contributo per ettaro'], ['Pioggia di compensazione', '6,00 €'], ['Acquazzone di compensazione', '15,00 €'], ['Tempesta di sabbia di compensazione', '24,00 €'], ['Grandinata di compensazione', '42,00 €']], num=(1,))}
<p class="art">Art. 3 · Domanda</p><p>La domanda si presenta ogni anno dal 1° novembre al 31 gennaio dall'area riservata del sito, allegando il registro dei trattamenti e collegando il fascicolo aziendale.</p>
<p class="art">Art. 4 · Pagamento</p><p>Il contributo è pagato entro il 30 aprile sul conto indicato nel fascicolo aziendale. I danni superiori al contributo possono essere segnalati con la procedura di segnalazione entro 10 giorni dall'evento.</p>
<p class="art">Art. 5 · Prescrizioni</p><p>Il mancato rispetto delle prescrizioni operative fa perdere il diritto all'indennizzo per i danni dell'evento a cui si riferiscono, ma non il contributo.</p>''')

# 8. Rapporto segnalazioni
documento('segnalazioni-t3-2037', 'Rapporto segnalazioni T3 2037', f'''
<p class="sopra">Rapporto trimestrale · luglio–settembre 2037</p>
<h1>Rapporto sulle segnalazioni dei cittadini</h1>
<p>Il rapporto riassume le segnalazioni arrivate dalla pagina Segnalazioni e reclami e dall'app nel terzo trimestre del 2037.</p>
{tab([['Tipo di segnalazione', 'Ricevute', 'Chiuse entro 30 giorni'], ['Pioggia fuori dal margine orario', '4.120', '96%'], ['Danni da grandinata di compensazione', '2.870', '88%'], ['Preavviso non ricevuto', '1.310', '99%'], ['Classe del bollino contestata', '640', '91%'], ['Altro', '1.050', '97%'], ['Totale', '9.990', '94%']], num=(1, 2), tot=True)}
<h2>Che cosa abbiamo cambiato</h2>
<p>Il margine di scostamento della pioggia è indicato ora anche nelle notifiche dell'app. Le perizie per i danni da grandine sono state affidate a tecnici di zona in ogni provincia di compensazione.</p>''')

# 9. Carta dei servizi
documento('carta-servizi', 'Carta dei servizi', f'''
<p class="sopra">Carta dei servizi · edizione 2037</p>
<h1>Carta dei servizi ai cittadini</h1>
<p>La carta indica che cosa MAMMA garantisce ai cittadini e come chiedere conto se un impegno non viene rispettato.</p>
{tab([['Impegno', 'Standard garantito'], ['Preavviso degli interventi nelle zone di compensazione', 'Almeno 72 ore prima'], ['Margine di scostamento della pioggia programmata', 'Entro ± 40 minuti'], ['Margine di scostamento delle grandinate', 'Entro ± 2 ore'], ['Risposta alle segnalazioni', 'Entro 30 giorni'], ['Pubblicazione dei dati di ogni intervento', 'Entro le 18:00 del giorno stesso']])}
<h2>Come presentare un reclamo</h2>
<p>Dalla pagina Segnalazioni e reclami del sito, indicando comune, data e intervento. Se la risposta non arriva entro 30 giorni puoi rivolgerti al responsabile della trasparenza, all'indirizzo trasparenza@pec.mamma.gov.it.</p>
<h2>Numero verde</h2>
<p>800 214 033, dal lunedì al sabato dalle 8:00 alle 20:00. Nei giorni di grandinata o acquazzone di compensazione anche la domenica.</p>''')

# 10. Calendario di Terralba (area produttori)
G = [('Venerdì 20 novembre', 'Pioggia di compensazione', '14:00–17:00 · ± 40 min · 12 mm', 'Sospendere i trattamenti fitosanitari'),
     ('Sabato 21 novembre', '<b>Grandinata di compensazione</b>', '16:00–16:30 · ± 2 ore · chicchi fino a 15 mm', '<b>Stendere le reti antigrandine entro venerdì 20 alle 20:00</b>'),
     ('Lunedì 23 novembre', 'Pioggia di compensazione', '06:00–11:00 · ± 40 min · 18 mm', 'Pulire i canali di scolo'),
     ('Mercoledì 25 novembre', 'Nessun intervento', 'Giornata utile per la raccolta', 'Raccogliere i prodotti maturi'),
     ('Venerdì 27 novembre', 'Pioggia di compensazione', '13:00–18:00 · ± 40 min · 22 mm', 'Chiudere le serre entro le 12:00'),
     ('Domenica 29 novembre', 'Nessun intervento', '', ''),
     ('Martedì 1° dicembre', 'Acquazzone di compensazione', '15:00–15:45 · ± 1 ora · 30 mm', 'Chiudere le serre e mettere al riparo i mezzi'),
     ('Giovedì 3 dicembre', 'Pioggia di compensazione', '09:00–13:00 · ± 40 min · 14 mm', 'Sospendere i trattamenti fitosanitari'),
     ('Sabato 5 dicembre', 'Pioggia di compensazione', '17:00–20:00 · ± 40 min · 10 mm', 'Nessuna prescrizione aggiuntiva')]
documento('calendario-terralba', 'Calendario di zona · Terralba', f'''
<p class="sopra">Area riservata · Azienda agricola Pinna · generato il 18 novembre 2037</p>
<h1>Calendario di zona · Terralba (OR)</h1>
<p>Zona di compensazione collegata alla Sicilia. Interventi programmati dal 20 novembre al 6 dicembre 2037. Gli orari sono confermati ogni lunedì e ogni intervento è preceduto da un preavviso di almeno 72 ore.</p>
{tab([['Giorno', 'Intervento', 'Orario e margine', 'Prescrizione']] + [list(x) for x in G])}
<p class="evidenza">Sabato 21 novembre · grandinata di compensazione. Completare la raccolta dei pomodori maturi entro venerdì 20 alle 20:00.</p>
<p class="piccolo">Il calendario può cambiare. Fanno fede i preavvisi ufficiali e le notifiche dell'app MAMMA.</p>''')

# 11. Prescrizioni operative
documento('prescrizioni-terralba', 'Prescrizioni operative · Terralba', f'''
<p class="sopra">Prescrizioni operative · zona di compensazione di Terralba · edizione 2037</p>
<h1>Prescrizioni operative per le aziende agricole</h1>
<p>Le prescrizioni indicano che cosa fare prima di ogni evento di compensazione per limitare i danni alle colture. Sono obbligatorie per tutte le aziende della zona.</p>
{tab([['Evento', 'Prescrizione', 'Entro'], ['Pioggia di compensazione', 'Sospendere i trattamenti fitosanitari e la concimazione fogliare', '24 ore prima'], ['Acquazzone di compensazione', 'Pulire i canali di scolo, chiudere le serre e mettere al riparo i mezzi', '12 ore prima'], ['Grandinata di compensazione', 'Stendere le reti antigrandine e completare la raccolta dei prodotti maturi', '20 ore prima'], ['Tempesta di sabbia', "Coprire i semenzai e chiudere le prese d'aria degli impianti di irrigazione", '6 ore prima']])}
<h2>Controlli</h2>
<p>Il tecnico di zona può verificare il rispetto delle prescrizioni con un sopralluogo, anche senza preavviso, nelle 24 ore che precedono un evento. Il mancato rispetto fa perdere il diritto all'indennizzo per i danni di quell'evento.</p>
<h2>Tecnico di zona</h2>
<p>Dott.ssa Maria Lai · Oristano e Campidano · 0783 214 033 · maria.lai@mamma.gov.it · dal lunedì al sabato, 7:00–19:00.</p>''')

# 12-14. Materiali per i negozi
lista = ''.join(f'<tr><td><span class="classe" style="background:{c};color:{t}">{l}</span></td><td>{desc[l]}</td></tr>' for l, c, t in CLASSI)
documento('cartello-bollino', 'Cartello espositivo del bollino', f'''
<h1 class="grande">Qui trovi il bollino MAMMA</h1>
<p style="font-size:12pt">Su ogni prodotto ortofrutticolo la classe di impatto climatico ti dice quanta protezione climatica ha ricevuto prima di arrivare al banco.</p>
{scala()}
<table><thead><tr><th style="width:14mm">Classe</th><th>Che cosa significa</th></tr></thead><tbody>{lista}</tbody></table>
<p class="evidenza">Inquadra il codice QR sull'etichetta per conoscere la storia climatica del prodotto. Il clima cambia, MAMMA ti informa.</p>''')

documento('cartello-compensazione', 'Cartello prodotto di zona di compensazione', '''
<h1 class="grande" style="margin-top:14mm">Prodotto di zona di compensazione</h1>
<div class="f-grande">F</div>
<p style="font-size:13pt;line-height:1.5">Questi prodotti vengono dalle zone che ricevono il maltempo spostato da MAMMA per proteggere le eccellenze del Made in Italy. Sono cresciuti con il meteo che hanno ricevuto.</p>
<p style="font-size:13pt;font-weight:700">Acquistarli sostiene le aziende agricole che contribuiscono alla protezione del Paese.</p>
<p class="piccolo" style="margin-top:8mm">Cartello previsto dal Regolamento MAMMA n. 4/2037, articolo 2.</p>''')

documento('guida-clienti', 'Guida alla lettura per i clienti', f'''
<p class="sopra">Guida per i clienti</p>
<h1>Come leggere il bollino MAMMA</h1>
<p>Il bollino si trova sulla confezione o sul cartellino del prezzo. Ha sei settori colorati, dalla A alla F. Il settore più grande, in evidenza, è la classe del prodotto.</p>
<img class="bollino" src="../../assets/bollini/a.webp" alt="Bollino MAMMA di classe A">
<h2>Che cosa vuol dire la classe</h2>
<p>La classe non è un voto sulla qualità o sulla salubrità. Racconta quanta protezione climatica ha ricevuto il prodotto. Un pomodoro di classe A è cresciuto con il sole programmato per tutta la stagione. Un pomodoro di classe F è cresciuto in una zona di compensazione, con il maltempo spostato dalle zone protette.</p>
{scala()}
<h2>Il codice QR</h2>
<p>Inquadrando il codice QR si apre la pagina del lotto, con il luogo di coltivazione, gli interventi ricevuti e la storia dell'azienda agricola.</p>
<h2>Domande frequenti</h2>
<p><b>I prodotti di classe F sono meno buoni?</b> No. Tutti i prodotti in vendita rispettano le stesse norme di sicurezza alimentare.</p>
<p><b>Perché alcuni prodotti costano di più?</b> La protezione climatica ha un costo che in parte si riflette sul prezzo.</p>
<p><b>Dove trovo altre informazioni?</b> Su mamma.gov.it e nell'app MAMMA, dove puoi anche ricevere i preavvisi per il tuo comune.</p>''')

print('\n'.join(sorted(os.listdir(OUT))))
