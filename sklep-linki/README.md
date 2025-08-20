# Sklep Linki — gotowy projekt (Next.js + Vercel)

## Szybki start
1) Zainstaluj zależności: `npm install`
2) Uruchom lokalnie: `npm run dev` → http://localhost:3000
3) Wdróż na Vercel (połącz repo z GitHub).

## Zmienne środowiskowe (Vercel → Settings → Environment Variables)
- EMAIL_HOST=smtp.gmail.com
- EMAIL_PORT=465
- EMAIL_USER=twoj_email@gmail.com
- EMAIL_PASS=haslo_aplikacji_gmail
- (opcjonalnie do P24) P24_MERCHANT_ID, P24_POS_ID, P24_CRC, P24_API_KEY

Jeśli nie podasz P24*, sklep zadziała w trybie TEST: po kliknięciu Kup → od razu /success + wysyłka maila (jeśli ustawiono SMTP).
