# Genera i PDF di scenario di MAMMA per il sito (trasparenza, chi siamo, area negoziante).
# Tutti i contenuti sono inventati per lo scenario speculativo. Font DejaVu, perché Semplicita non è incorporabile.
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
                                Image, PageBreak, KeepTogether)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

F = '/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('S', F + 'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('SB', F + 'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('SC', F + 'DejaVuSansCondensed.ttf'))
pdfmetrics.registerFontFamily('S', normal='S', bold='SB')

CIELO = colors.HexColor('#001F3F'); LUCE = colors.HexColor('#DBE64C'); BLU = colors.HexColor('#1E488F')
LINEA = colors.HexColor('#D9DCCB'); T2 = colors.HexColor('#3A4A5E'); CLOUD = colors.HexColor('#F6F7ED')
CLASSI = [('A', '#00964E', '#FFFFFF'), ('B', '#A9C801', '#001F3F'), ('C', '#E4C700', '#001F3F'),
          ('D', '#F49916', '#001F3F'), ('E', '#E94445', '#FFFFFF'), ('F', '#C62017', '#FFFFFF')]
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '')
os.makedirs(OUT, exist_ok=True)
DIR = os.path.dirname(os.path.abspath(__file__))  # qui stanno lockup.png e mappa.png

st = {
 'h1': ParagraphStyle('h1', fontName='SB', fontSize=20, leading=25, textColor=CIELO, spaceAfter=6),
 'sopra': ParagraphStyle('sopra', fontName='SC', fontSize=8, leading=11, textColor=T2, spaceAfter=4),
 'h2': ParagraphStyle('h2', fontName='SB', fontSize=12.5, leading=16, textColor=CIELO, spaceBefore=12, spaceAfter=5),
 'h3': ParagraphStyle('h3', fontName='SB', fontSize=10.5, leading=14, textColor=CIELO, spaceBefore=8, spaceAfter=3),
 'p': ParagraphStyle('p', fontName='S', fontSize=9.5, leading=14, textColor=CIELO, spaceAfter=6),
 'piccolo': ParagraphStyle('piccolo', fontName='S', fontSize=8, leading=11, textColor=T2, spaceAfter=4),
 'art': ParagraphStyle('art', fontName='SB', fontSize=10, leading=14, textColor=CIELO, spaceBefore=10, spaceAfter=3),
 'cella': ParagraphStyle('cella', fontName='S', fontSize=8.5, leading=11.5, textColor=CIELO),
 'cellab': ParagraphStyle('cellab', fontName='SB', fontSize=8.5, leading=11.5, textColor=CIELO),
}
P = lambda t, s='p': Paragraph(t, st[s])

def pagina(canvas, doc):
    w, h = A4
    canvas.saveState()
    canvas.setFillColor(CIELO); canvas.rect(0, h - 26 * mm, w, 26 * mm, fill=1, stroke=0)
    canvas.drawImage(os.path.join(DIR, 'lockup.png'), 18 * mm, h - 21 * mm, width=54 * mm, height=16.4 * mm, mask='auto')
    canvas.setFillColor(colors.white); canvas.setFont('SC', 7.5)
    canvas.drawRightString(w - 18 * mm, h - 12 * mm, doc.titolo_breve)
    canvas.drawRightString(w - 18 * mm, h - 16.5 * mm, 'mamma.gov.it')
    canvas.setStrokeColor(LINEA); canvas.line(18 * mm, 16 * mm, w - 18 * mm, 16 * mm)
    canvas.setFillColor(T2); canvas.setFont('S', 7)
    canvas.drawString(18 * mm, 11 * mm, 'MAMMA · Agenzia per il Monitoraggio Atmosferico e la Modifica Meteorologica Ambientale')
    canvas.drawString(18 * mm, 7.5 * mm, 'Documento di scenario. Progetto di speculative design, Politecnico di Milano. Dati e contenuti inventati.')
    canvas.drawRightString(w - 18 * mm, 11 * mm, f'Pagina {doc.page}')
    canvas.restoreState()

def documento(nome, titolo_breve, storia, pagesize=A4):
    doc = BaseDocTemplate(OUT + nome, pagesize=pagesize, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=34 * mm,
                          bottomMargin=22 * mm, title=titolo_breve, author='MAMMA (documento di scenario)')
    doc.titolo_breve = titolo_breve
    fr = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')
    doc.addPageTemplates([PageTemplate(id='p', frames=[fr], onPage=pagina)])
    doc.build(storia)
    return os.path.getsize(OUT + nome)

def tabella(righe, larg, intest=True, zebra=True):
    dati = [[P(str(c), 'cellab' if (intest and i == 0) else 'cella') for c in r] for i, r in enumerate(righe)]
    t = Table(dati, colWidths=larg, repeatRows=1 if intest else 0)
    s = [('VALIGN', (0, 0), (-1, -1), 'TOP'), ('LINEBELOW', (0, 0), (-1, -1), .4, LINEA),
         ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4), ('LEFTPADDING', (0, 0), (-1, -1), 4)]
    if intest: s += [('BACKGROUND', (0, 0), (-1, 0), CLOUD), ('LINEBELOW', (0, 0), (-1, 0), .8, CIELO)]
    t.setStyle(TableStyle(s)); return t

PROT = ['Trentino-Alto Adige', 'Veneto', 'Piemonte', 'Liguria', 'Lazio', 'Campania', 'Puglia', 'Calabria', 'Sicilia']
COMP = ["Valle d'Aosta", 'Lombardia', 'Friuli-Venezia Giulia', 'Emilia-Romagna', 'Toscana', 'Marche', 'Umbria', 'Abruzzo', 'Molise', 'Basilicata', 'Sardegna']
IVA = {'Sicilia': .81, 'Campania': .79, 'Liguria': .77, 'Puglia': .74, 'Veneto': .73, 'Lazio': .71, 'Piemonte': .70,
       'Trentino-Alto Adige': .68, 'Calabria': .63, 'Toscana': .58, 'Emilia-Romagna': .57, 'Lombardia': .55, 'Marche': .49,
       'Umbria': .46, 'Abruzzo': .44, 'Friuli-Venezia Giulia': .43, 'Sardegna': .41, 'Basilicata': .38, 'Molise': .35, "Valle d'Aosta": .31}
COPPIE = [('Sicilia', 'Sardegna', '80%'), ('Liguria', 'Lombardia', '70%'), ('Lazio', 'Abruzzo', '75%'), ('Campania', 'Basilicata', '65%'),
          ('Puglia', 'Molise', '60%'), ('Veneto', 'Friuli-Venezia Giulia', '55%'), ('Piemonte', "Valle d'Aosta", '50%'),
          ('Calabria', 'Basilicata', '45%'), ('Trentino-Alto Adige', 'Lombardia', '40%')]
pesi = {}

# 1. Mappa delle zone
s = [P('DELIBERA DEL CONSIGLIO DI AMMINISTRAZIONE N. 27/2036 · 30 GIUGNO 2036', 'sopra'),
     P('Mappa delle zone protette e di compensazione per il biennio 2036–2038', 'h1'),
     P("Il Consiglio di amministrazione di MAMMA, visto l'articolo 4 della legge 18 dicembre 2033, n. 214, e la Metodologia dell'Indice di valore agroalimentare (IVA) nella versione 3.1, delibera l'assegnazione delle zone per il periodo dal 1° luglio 2036 al 30 giugno 2038."),
     P('1. Assegnazione', 'h2'),
     P("Sono zone protette le regioni con IVA pari o superiore a 0,60. Sono zone di compensazione le altre. Rispetto al biennio precedente cambiano ruolo tre regioni. La Calabria diventa zona protetta, la Toscana e l'Emilia-Romagna diventano zone di compensazione."),
     Image(os.path.join(DIR, 'mappa.png'), width=82 * mm, height=87 * mm),
     P('In giallo le zone protette, a righe le zone di compensazione.', 'piccolo'),
     P('2. Indice di valore agroalimentare per regione', 'h2'),
     tabella([['Regione', 'IVA 2036', 'Ruolo']] + [[r, f'{v:.2f}'.replace('.', ','), 'Zona protetta' if r in PROT else 'Zona di compensazione'] for r, v in sorted(IVA.items(), key=lambda x: -x[1])], [70 * mm, 30 * mm, 74 * mm]),
     P('3. Coppie di compensazione', 'h2'),
     P("Ogni zona protetta è collegata a una o più zone di compensazione verso cui MAMMA può spostare le perturbazioni. La percentuale indica la quota massima di perturbazione che può essere spostata in un singolo intervento."),
     tabella([['Zona protetta', 'Zona di compensazione', 'Quota massima']] + [list(c) for c in COPPIE], [62 * mm, 72 * mm, 40 * mm]),
     P('4. Disposizioni finali', 'h2'),
     P("La presente delibera è pubblicata nella sezione Trasparenza del sito istituzionale. I comuni delle zone di compensazione ricevono i preavvisi di ogni intervento con almeno 72 ore di anticipo. Il contributo di compensazione è riconosciuto alle aziende agricole delle zone di compensazione secondo il Regolamento n. 2/2035."),
     Spacer(1, 10), P('Roma, 30 giugno 2036 · Il Presidente del Consiglio di amministrazione', 'piccolo')]
pesi['mappa-zone-2036-2038.pdf'] = documento('mappa-zone-2036-2038.pdf', 'Delibera n. 27/2036 · Mappa delle zone', s)

# 2. Metodologia IVA
s = [P('METODOLOGIA · VERSIONE 3.1 · APRILE 2036', 'sopra'), P("Metodologia dell'Indice di valore agroalimentare", 'h1'),
     P("L'Indice di valore agroalimentare (IVA) misura quanto ogni territorio contribuisce al patrimonio agroalimentare italiano. È il criterio con cui MAMMA assegna le zone protette e di compensazione ogni due anni, secondo l'articolo 4 della legge n. 214/2033."),
     P('1. Componenti', 'h2'),
     tabella([['Componente', 'Che cosa misura', 'Peso'],
              ['Valore delle denominazioni', 'Valore della produzione DOP, IGP e STG del territorio, a prezzi alla produzione', '40%'],
              ['Export', "Quota del territorio sull'export agroalimentare nazionale", '25%'],
              ['Lavoro', 'Giornate di lavoro nelle filiere agroalimentari per ettaro coltivato', '20%'],
              ['Vulnerabilità climatica', 'Danni medi da eventi estremi nei dieci anni precedenti, per ettaro', '15%']], [44 * mm, 108 * mm, 22 * mm]),
     P('2. Calcolo', 'h2'),
     P("Ogni componente è normalizzata tra 0 e 1 rispetto al valore massimo nazionale. L'indice è la media ponderata delle quattro componenti. Un territorio con IVA pari o superiore a 0,60 è zona protetta. Sotto la soglia è zona di compensazione."),
     P('IVA = 0,40 · Denominazioni + 0,25 · Export + 0,20 · Lavoro + 0,15 · Vulnerabilità', 'h3'),
     P('3. Fonti dei dati', 'h2'),
     P("ISTAT, Agenzia delle Dogane, consorzi di tutela, Osservatorio nazionale sugli eventi estremi. I dati sono aggiornati al 31 dicembre dell'anno precedente l'assegnazione."),
     P('4. Revisione', 'h2'),
     P("La metodologia è rivista ogni quattro anni da un comitato tecnico-scientifico indipendente. Le osservazioni dei cittadini e delle regioni possono essere inviate tramite la procedura di accesso agli atti.")]
pesi['metodologia-indice-valore.pdf'] = documento('metodologia-indice-valore.pdf', "Metodologia dell'Indice di valore", s)

# 3. Legge 214/2033
arts = [('Art. 1 · Finalità', "Il clima è bene di interesse nazionale. La Repubblica tutela le condizioni meteorologiche necessarie alla continuità del patrimonio agroalimentare italiano."),
        ('Art. 2 · Agenzia', "È istituita l'Agenzia per il Monitoraggio Atmosferico e la Modifica Meteorologica Ambientale (MAMMA), società a servizio della Repubblica Italiana, con sede in Roma. L'Agenzia riunisce i consorzi regionali di difesa antigrandine e i programmi sperimentali di inseminazione delle nubi."),
        ('Art. 3 · Interventi', "L'Agenzia programma ed esegue interventi di modifica meteorologica, tra cui l'inseminazione delle nubi (cloud seeding), il lancio di razzi antigrandine e l'impiego di specchi solari, nei limiti stabiliti dal presente articolo e dai regolamenti di attuazione."),
        ('Art. 4 · Zone', "Il territorio nazionale è diviso in zone protette e zone di compensazione, assegnate ogni due anni in base all'Indice di valore agroalimentare. Le perturbazioni spostate dalle zone protette possono essere indirizzate soltanto verso le zone di compensazione collegate."),
        ('Art. 5 · Preavviso', "Ogni intervento che interessa una zona di compensazione è comunicato ai comuni e ai cittadini con almeno 72 ore di anticipo, indicando orario, durata e margine di scostamento."),
        ('Art. 6 · Contributo di compensazione', "Alle aziende agricole delle zone di compensazione è riconosciuto un contributo annuale, commisurato agli interventi ricevuti."),
        ('Art. 7 · Bollino', "I prodotti ortofrutticoli in vendita riportano una classe di impatto climatico, dalla A alla F, secondo il regolamento dell'Agenzia."),
        ('Art. 8 · Trasparenza', "L'Agenzia pubblica i dati di ogni intervento in formato aperto e riferisce ogni anno al Parlamento.")]
s = [P('GAZZETTA UFFICIALE · SERIE GENERALE · 22 DICEMBRE 2033', 'sopra'), P('Legge 18 dicembre 2033, n. 214', 'h1'),
     P('Disposizioni per la tutela della sovranità climatica nazionale e per la protezione del patrimonio agroalimentare', 'h3'),
     P("La Camera dei deputati ed il Senato della Repubblica hanno approvato. Il Presidente della Repubblica promulga la seguente legge.", 'piccolo')]
for a, t in arts: s += [P(a, 'art'), P(t)]
s += [Spacer(1, 10), P('La presente legge, munita del sigillo dello Stato, sarà inserita nella Raccolta ufficiale degli atti normativi della Repubblica italiana.', 'piccolo')]
pesi['legge-214-2033.pdf'] = documento('legge-214-2033.pdf', 'Legge n. 214/2033', s)

# 4. Regolamento bollino
desc = {'A': 'Protezione climatica massima. Sole e pioggia programmati per tutta la stagione.',
        'B': 'Protezione climatica alta. Interventi su gran parte della stagione, comprese fioritura e raccolta.',
        'C': 'Protezione climatica media. Interventi solo nelle fasi più delicate della coltivazione.',
        'D': 'Protezione climatica bassa. Interventi occasionali, solo in caso di eventi estremi.',
        'E': 'Protezione climatica minima. Nessun intervento diretto, solo benefici degli interventi vicini.',
        'F': 'Prodotto di zona di compensazione, cresciuto con il meteo ricevuto.'}
righe = [[P('<b>Classe</b>', 'cellab'), P('<b>Definizione</b>', 'cellab'), P('<b>Giornate protette nella stagione</b>', 'cellab')]]
soglie = ['oltre il 90%', 'dal 70 al 90%', 'dal 40 al 70%', 'dal 15 al 40%', 'meno del 15%', 'nessuna']
for (l, c, tc), sg in zip(CLASSI, soglie):
    righe.append([Paragraph(f'<b>{l}</b>', ParagraphStyle('x', fontName='SB', fontSize=11, textColor=colors.HexColor(tc), alignment=1)), P(desc[l], 'cella'), P(sg, 'cella')])
t = Table(righe, colWidths=[18 * mm, 110 * mm, 46 * mm])
ts = [('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('LINEBELOW', (0, 0), (-1, -1), .4, LINEA), ('BACKGROUND', (0, 0), (-1, 0), CLOUD),
      ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5)]
for i, (l, c, tc) in enumerate(CLASSI, 1): ts.append(('BACKGROUND', (0, i), (0, i), colors.HexColor(c)))
t.setStyle(TableStyle(ts))
s = [P('REGOLAMENTO N. 4/2037 · IN VIGORE DAL 1° MARZO 2037', 'sopra'), P('Bollino MAMMA e classi di impatto climatico', 'h1'),
     P("Il presente regolamento attua l'articolo 7 della legge n. 214/2033 e disciplina l'assegnazione e l'esposizione del bollino sui prodotti ortofrutticoli."),
     P('Art. 1 · Classi', 'art'), P("La classe esprime la protezione climatica ricevuta dal prodotto prima di arrivare al banco. È assegnata dall'Agenzia al lotto, sulla base degli interventi registrati nella zona di coltivazione."), t,
     P('Art. 2 · Esposizione', 'art'), P("Il bollino è applicato su ogni confezione o, per i prodotti sfusi, sul cartellino del prezzo. Accanto ai prodotti di classe F è esposto il cartello «Prodotto di zona di compensazione»."),
     P('Art. 3 · Codice del lotto', 'art'), P("Il bollino riporta il codice del lotto e un codice QR che apre la pagina di tracciabilità sul sito dell'Agenzia."),
     P('Art. 4 · Controlli e sanzioni', 'art'), P("I controlli sono svolti dai tecnici di zona e dai nuclei ispettivi. La mancata esposizione comporta una sanzione da 500 a 3.000 euro per punto vendita. L'esposizione di una classe diversa da quella assegnata comporta il ritiro del lotto.")]
pesi['regolamento-4-2037.pdf'] = documento('regolamento-4-2037.pdf', 'Regolamento n. 4/2037 · Bollino', s)

# 5. Relazione al Parlamento
s = [P('RELAZIONE ANNUALE AL PARLAMENTO · ANNO 2036', 'sopra'), P('Relazione annuale al Parlamento 2036', 'h1'),
     P("La relazione presenta i risultati dell'attività dell'Agenzia nel 2036, come previsto dall'articolo 8 della legge n. 214/2033."),
     P('1. Interventi', 'h2'),
     tabella([['Indicatore', '2035', '2036'], ['Interventi programmati', '1.092', '1.318'], ['Interventi riusciti', '99,1%', '99,4%'],
              ['Voli di cloud seeding', '702', '818'], ['Lanci di razzi antigrandine', '3.940', '4.410'], ['Impianti di specchi solari attivi', '21', '34'],
              ['Preavviso medio', '70 ore', '72 ore']], [90 * mm, 42 * mm, 42 * mm]),
     P('2. Effetti sul patrimonio agroalimentare', 'h2'),
     P("Nel 2036 nessuna produzione DOP o IGP delle zone protette ha subito perdite superiori al 2%. L'export agroalimentare ha raggiunto 71 miliardi di euro. Le grandinate evitate nelle zone protette sono state 1.180."),
     P('3. Zone di compensazione', 'h2'),
     P("Le zone di compensazione hanno ricevuto in media 46 interventi per comune. Sono stati erogati contributi di compensazione a 18.420 aziende agricole, per 412 milioni di euro. Le segnalazioni dei cittadini sono state 48.213, di cui il 94% chiuse entro 30 giorni."),
     P('4. Priorità per il 2037', 'h2'),
     P("Entrata in vigore del bollino obbligatorio, estensione degli specchi solari in Puglia e Campania, nuova applicazione per i preavvisi ai cittadini.")]
pesi['relazione-parlamento-2036.pdf'] = documento('relazione-parlamento-2036.pdf', 'Relazione al Parlamento 2036', s)

# 6. Bilancio
s = [P('BILANCIO DI ESERCIZIO · 31 DICEMBRE 2036', 'sopra'), P('Bilancio 2036', 'h1'),
     P('Valori in milioni di euro.', 'piccolo'),
     P('Conto economico', 'h2'),
     tabella([['Voce', '2035', '2036'], ['Trasferimenti dallo Stato', '1.240', '1.395'], ['Ricavi da servizi ai consorzi', '86', '104'],
              ['Totale ricavi', '1.326', '1.499'], ['Personale', '212', '238'], ['Voli e materiali di inseminazione', '318', '362'],
              ['Razzi e postazioni antigrandine', '144', '171'], ['Specchi solari', '201', '246'], ['Contributi di compensazione', '366', '412'],
              ['Altri costi', '71', '58'], ['Totale costi', '1.312', '1.487'], ['Risultato di esercizio', '14', '12']], [90 * mm, 42 * mm, 42 * mm]),
     P('Stato patrimoniale in sintesi', 'h2'),
     tabella([['Voce', '2036'], ['Immobilizzazioni (aerei, postazioni, impianti)', '2.310'], ['Disponibilità liquide', '184'], ['Patrimonio netto', '1.902']], [132 * mm, 42 * mm]),
     P("Il bilancio è stato approvato dal Consiglio di amministrazione il 28 aprile 2037 e certificato dalla società di revisione.", 'piccolo')]
pesi['bilancio-2036.pdf'] = documento('bilancio-2036.pdf', 'Bilancio 2036', s)

# 7-9. Materiali per i negozi
def scala_classi():
    celle = [[Paragraph(f'<b>{l}</b>', ParagraphStyle('k', fontName='SB', fontSize=26, leading=30, alignment=1, textColor=colors.HexColor(tc))) for l, c, tc in CLASSI]]
    t = Table(celle, colWidths=[29 * mm] * 6, rowHeights=[22 * mm])
    t.setStyle(TableStyle([('BACKGROUND', (i, 0), (i, 0), colors.HexColor(c)) for i, (l, c, tc) in enumerate(CLASSI)] + [('VALIGN', (0, 0), (-1, -1), 'MIDDLE')]))
    return t
big = ParagraphStyle('big', fontName='SB', fontSize=30, leading=36, textColor=CIELO, spaceAfter=10)
s = [Spacer(1, 10), Paragraph('Qui trovi il bollino MAMMA', big),
     P("Su ogni prodotto ortofrutticolo la classe di impatto climatico ti dice quanta protezione climatica ha ricevuto prima di arrivare al banco."),
     Spacer(1, 10), scala_classi(), Spacer(1, 8),
     tabella([['Classe', 'Che cosa significa']] + [[l, desc[l]] for l, c, tc in CLASSI], [24 * mm, 150 * mm]),
     Spacer(1, 12), P("Inquadra il codice QR sull'etichetta per conoscere la storia climatica del prodotto. Il clima cambia, MAMMA ti informa.", 'h3')]
pesi['cartello-bollino.pdf'] = documento('cartello-bollino.pdf', 'Cartello espositivo del bollino', s)

s = [Spacer(1, 30), Paragraph('Prodotto di zona di compensazione', big),
     Table([[Paragraph('<b>F</b>', ParagraphStyle('f', fontName='SB', fontSize=60, leading=66, alignment=1, textColor=colors.white))]], colWidths=[50 * mm], rowHeights=[50 * mm],
           style=[('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#C62017')), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE')]),
     Spacer(1, 14),
     P("Questi prodotti vengono dalle zone che ricevono il maltempo spostato da MAMMA per proteggere le eccellenze del Made in Italy. Sono cresciuti con il meteo che hanno ricevuto."),
     P("Acquistarli sostiene le aziende agricole che contribuiscono alla protezione del Paese.", 'h3'),
     Spacer(1, 8), P('Cartello previsto dal Regolamento MAMMA n. 4/2037, articolo 2.', 'piccolo')]
pesi['cartello-compensazione.pdf'] = documento('cartello-compensazione.pdf', 'Cartello prodotto di zona di compensazione', s)

s = [P('GUIDA PER I CLIENTI', 'sopra'), P('Come leggere il bollino MAMMA', 'h1'),
     P("Il bollino si trova sulla confezione o sul cartellino del prezzo. Ha sei settori colorati, dalla A alla F. Il settore in evidenza è la classe del prodotto."),
     scala_classi(),
     P('Che cosa vuol dire la classe', 'h2'),
     P("La classe non è un voto sulla qualità o sulla salubrità. Racconta quanta protezione climatica ha ricevuto il prodotto. Un pomodoro di classe A è cresciuto con il sole programmato per tutta la stagione. Un pomodoro di classe F è cresciuto in una zona di compensazione, con il maltempo spostato dalle zone protette."),
     P('Il codice QR', 'h2'),
     P("Inquadrando il codice QR si apre la pagina del lotto, con il luogo di coltivazione, gli interventi ricevuti e la storia dell'azienda agricola."),
     P('Domande frequenti', 'h2'),
     P('<b>I prodotti di classe F sono meno buoni?</b> No. Tutti i prodotti in vendita rispettano le stesse norme di sicurezza alimentare.'),
     P('<b>Perché alcuni prodotti costano di più?</b> La protezione climatica ha un costo che in parte si riflette sul prezzo.'),
     P('<b>Dove trovo altre informazioni?</b> Su mamma.gov.it e nell\'app MAMMA, dove puoi anche ricevere i preavvisi per il tuo comune.')]
pesi['guida-clienti.pdf'] = documento('guida-clienti.pdf', 'Guida alla lettura per i clienti', s)

for k, v in pesi.items(): print(k, round(v / 1024), 'KB')

# 10-12. Altri documenti della trasparenza
s = [P('REGOLAMENTO N. 2/2035 · TESTO AGGIORNATO AL 1° GENNAIO 2037', 'sopra'), P('Contributo di compensazione', 'h1'),
     P("Il regolamento attua l'articolo 6 della legge n. 214/2033 e stabilisce come si calcola e si richiede il contributo per le aziende agricole delle zone di compensazione."),
     P('Art. 1 · Chi può chiederlo', 'art'), P("Le aziende agricole con sede operativa in un comune di zona di compensazione, iscritte al registro delle imprese agricole."),
     P('Art. 2 · Calcolo', 'art'),
     tabella([['Evento ricevuto', 'Contributo per ettaro'], ['Pioggia di compensazione', '18 euro'], ['Acquazzone di compensazione', '42 euro'],
              ['Grandinata di compensazione', '160 euro'], ['Tempesta di sabbia di compensazione', '95 euro']], [110 * mm, 64 * mm]),
     P('Art. 3 · Domanda', 'art'), P("La domanda si presenta ogni anno dal 1° novembre al 31 gennaio dall'area riservata del sito, allegando il registro dei trattamenti e il fascicolo aziendale."),
     P('Art. 4 · Pagamento', 'art'), P("Il contributo è pagato entro il 30 aprile. I danni superiori al contributo possono essere segnalati con la procedura di segnalazione entro 30 giorni dall'evento.")]
pesi['regolamento-2-2035.pdf'] = documento('regolamento-2-2035.pdf', 'Regolamento n. 2/2035 · Contributo', s)

s = [P('RAPPORTO TRIMESTRALE · LUGLIO–SETTEMBRE 2037', 'sopra'), P('Rapporto sulle segnalazioni dei cittadini', 'h1'),
     P("Il rapporto riassume le segnalazioni arrivate dalla pagina Segnalazioni e reclami e dall'app nel terzo trimestre del 2037."),
     tabella([['Tipo di segnalazione', 'Ricevute', 'Chiuse entro 30 giorni'], ['Pioggia fuori dal margine orario', '4.120', '96%'],
              ['Danni da grandinata di compensazione', '2.870', '88%'], ['Preavviso non ricevuto', '1.310', '99%'],
              ['Classe del bollino contestata', '640', '91%'], ['Altro', '1.050', '97%'], ['Totale', '9.990', '94%']], [92 * mm, 36 * mm, 46 * mm]),
     P('Che cosa abbiamo cambiato', 'h2'),
     P("Il margine di scostamento della pioggia è indicato ora anche nelle notifiche dell'app. Le perizie per i danni da grandine sono state affidate a tecnici di zona in ogni provincia di compensazione.")]
pesi['segnalazioni-t3-2037.pdf'] = documento('segnalazioni-t3-2037.pdf', 'Rapporto segnalazioni T3 2037', s)

s = [P('CARTA DEI SERVIZI · EDIZIONE 2037', 'sopra'), P('Carta dei servizi ai cittadini', 'h1'),
     P("La carta indica che cosa MAMMA garantisce ai cittadini e come chiedere conto se un impegno non viene rispettato."),
     tabella([['Impegno', 'Standard garantito'], ['Preavviso degli interventi nelle zone di compensazione', 'Almeno 72 ore prima'],
              ['Margine di scostamento della pioggia programmata', 'Entro ± 40 minuti'], ['Margine di scostamento delle grandinate', 'Entro ± 2 ore'],
              ['Risposta alle segnalazioni', 'Entro 30 giorni'], ['Pubblicazione dei dati di ogni intervento', 'Entro le 18:00 del giorno stesso']], [110 * mm, 64 * mm]),
     P('Come presentare un reclamo', 'h2'),
     P("Dalla pagina Segnalazioni e reclami del sito, indicando comune, data e intervento. Se la risposta non arriva entro 30 giorni puoi rivolgerti al responsabile della trasparenza.")]
pesi['carta-servizi.pdf'] = documento('carta-servizi.pdf', 'Carta dei servizi', s)
for k in ['regolamento-2-2035.pdf', 'segnalazioni-t3-2037.pdf', 'carta-servizi.pdf']: print(k, round(pesi[k] / 1024), 'KB')
