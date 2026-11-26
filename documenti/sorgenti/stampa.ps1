# Stampa in PDF i documenti di scenario dal sito pubblicato, con i caratteri del sito incorporati.
# Uso: tasto destro > Esegui con PowerShell. I PDF finiscono nella cartella PDF-MAMMA sul Desktop.
$base = "https://dieguzzo.github.io/mamma-sito/documenti/stampa"
$out = Join-Path $env:USERPROFILE "Desktop\PDF-MAMMA"
New-Item -ItemType Directory -Force -Path $out | Out-Null
$chrome = @("$env:ProgramFiles\Google\Chrome\Application\chrome.exe", "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe", "$env:LocalAppData\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
$nomi = "mappa-zone-2036-2038","metodologia-indice-valore","legge-214-2033","regolamento-4-2037","regolamento-2-2035","relazione-parlamento-2036","bilancio-2036","segnalazioni-t3-2037","carta-servizi","calendario-terralba","prescrizioni-terralba","cartello-bollino","cartello-compensazione","guida-clienti"
foreach ($n in $nomi) {
  & $chrome --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 "--print-to-pdf=$out\$n.pdf" "$base/$n.html" | Out-Null
  Write-Host "fatto $n"
}
Write-Host "PDF salvati in $out"
