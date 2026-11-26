# Converte in livelli Figma le pagine del checkpoint. Lo lancia Claude dal computer di Diego.
# Uso: .\invia.ps1 -Url "<submitUrl di html_to_figma>" -File "pagine\01-home.html"
param([string]$Url, [string]$File)
curl.exe -sS -f -X POST $Url -H "Content-Type: text/html" --data-binary "@$File"
