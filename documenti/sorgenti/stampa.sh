#!/bin/sh
# Stampa in PDF le pagine di documenti/stampa con Chrome. Serve un server locale sulla porta 8765
# oppure l'indirizzo pubblicato. Con i caratteri Adobe disponibili (sito pubblicato) i PDF li incorporano.
BASE=${1:-http://localhost:8765/mamma-sito}
CHROME=${CHROME:-google-chrome}
cd "$(dirname "$0")/../stampa" || exit 1
for f in *.html; do
  n=${f%.html}
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="../$n.pdf" "$BASE/documenti/stampa/$f"
done
