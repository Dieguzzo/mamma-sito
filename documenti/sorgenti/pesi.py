# Aggiorna nelle pagine le dimensioni dei PDF scritte accanto ai link, leggendo i file veri.
import os, re, glob
R = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
kb = lambda n: f"{max(1, round(os.path.getsize(os.path.join(R, 'documenti', n + '.pdf')) / 1024))} KB"
for p in glob.glob(R + '/**/index.html', recursive=True):
    if '/prototipo/' in p: continue
    s = open(p, encoding='utf-8').read(); o = s
    s = re.sub(r"\{K:([a-z0-9-]+)\.pdf\}", lambda m: kb(m.group(1)), s)
    s = re.sub(r"PDF · \d+ KB','([a-z0-9-]+)\.pdf'", lambda m: f"PDF · {kb(m.group(1))}','{m.group(1)}.pdf'", s)
    s = re.sub(r"(documenti/([a-z0-9-]+)\.pdf\"[^<]{0,80}>(?:(?!</a>).){0,200}?PDF · )\d+ KB", lambda m: m.group(1) + kb(m.group(2)), s, flags=re.S)
    if s != o: open(p, 'w', encoding='utf-8').write(s); print('aggiornato', os.path.relpath(p, R))
