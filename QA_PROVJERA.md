# SDR Montaže – tehnička provjera demo verzije

Izvršene provjere:

- 13 HTML datoteka (12 sadržajnih stranica + 404), svaki dokument ima jedan `h1`, jedan `<main>`, hrvatski jezik i metapodatke.
- Sve lokalne poveznice i resursi provjereni su prema stvarnoj strukturi direktorija.
- CSS je parsiran bez sintaktičkih pogrešaka; JavaScript prolazi `node --check`.
- Sve lokalne AVIF fotografije provjerene su kao čitljive datoteke; uz njih postoji WebP alternativa.
- Skripta za produkcijski SEO provjerena je u zasebnoj kopiji: generira 12 URL-ova i uključuje `robots`, canonical te OG URL.
- Kontrolirano demo indeksiranje: `noindex,nofollow` i `robots.txt` koji blokira indeksiranje dok nema odobrenja vlasnika.
- Google Maps ne učitava se bez klika korisnika.

## Preostala obavezna provjera nakon deploya

Stvarni browser prikaz i interakcije nisu bili dostupni za automatizirano vizualno testiranje u ovom izvršnom okruženju. Zbog toga nakon postavljanja testirajte u Chrome/Safari na desktopu i mobitelu: intro, floating navigaciju, podizbornike, galeriju, lightbox, kontakt obrazac, kartu, cookie postavke te slike na svim širinama zaslona.

## Nije spremno za javno izdanje bez potvrde vlasnika

- Potvrditi broj, e-mail, službeni naziv i adresu obrta.
- Potvrditi koje usluge obrt stvarno nudi i na kojem području.
- Zamijeniti ilustrativne fotografije stvarnim radovima i po potrebi logotip.
- Odobriti pravne tekstove.
- Dodati aktivni Web3Forms ključ za stvarno slanje upita i testirati slanje.
- Navesti produkcijsku domenu i tek nakon potvrde pokrenuti `tools/prepare_production.py`.
