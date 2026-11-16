# SDR MONTAŽE – višestranična web stranica

**Izrada: Medium29 · demo verzija · 16.11.2026.**

Kompletan statički projekt u HTML-u, CSS-u i JavaScriptu, bez WordPressa ili build sustava. Sadržaj ZIP-a može se učitati izravno na Cloudflare Pages ili staviti u GitHub repozitorij za automatski deployment.

## Što je napravljeno

- **12 HTML stranica**: početna, usluge, ugradnja prozora, ugradnja vrata, sjenila i rolete, galerija, o nama, česta pitanja, kontakt, privatnost, kolačići i uvjeti korištenja, plus zasebna 404 stranica.
- Nenametljiv animirani intro pri prvom ulasku u sesiji, velika hero fotografija, lebdeća navigacija, mobilni izbornik i sticky kontakt traka.
- AVIF + WebP lokalno optimizirane slike, galerija s filtriranjem i lightbox prikazom.
- Kontakt forma s validacijom i honeypotom; opcionalna integracija Web3Forms.
- Funkcionalna cookie privola i izmjena postavki, bez učitavanja analitike u demo verziji.
- Responsive dizajn, osnovni SEO metapodaci, Open Graph, JSON-LD za organizaciju, struktura za sitemap, favicon, 404, robots.txt, sigurnosna HTTP zaglavlja.
- Kontakt sada prikazuje stvarnu Google Maps kartu registrirane adrese Trg maršala Tita 3, 52341 Žminj. Klik na kartu otvara Google Maps u novoj kartici. Prije javne objave treba potvrditi adresu i uskladiti vanjsku kartu s GDPR privolom.
- Organizacija komponenti inspirirana Client-First načelima. Nova revizija uklanja ponavljajuće dekoracije, uzastopne animacije i generičke elemente; detalji su u `DIZAJNERSKA_REVIZIJA.md`.

## Važno: prije javne objave potrebno je potvrditi s vlasnikom

1. **Je li +385 91 615 8758 broj koji želi javno prikazati na webu?** Broj je preuzet iz poslanog Meta lead obrasca, ali nije zasebno potvrđen kao službeni broj obrta.
2. **Je li artmontaggidoo@yahoo.com adresa za javne upite?** Adresa je također iz Meta obrasca i možda se odnosi na drugi poslovni subjekt. Po potrebi zamijeniti e-mail u `assets/js/site-config.js` i svim HTML stranicama.
3. Potvrditi službeni registrirani naziv, OIB, točnu adresu, područje rada i opis svih usluga.
4. Posebno potvrditi montažu **sjenila i roleta**: za sada je na webu izričito označena kao usluga čiji je opseg potrebno provjeriti.
5. Dostaviti službeni logotip i stvarne fotografije izvedenih radova. Trenutne slike su **ilustrativni vizuali** i nisu predstavljene kao stvarni projekti.
6. Provjeriti i završiti pravne tekstove (trenutno radni nacrti), dogovoriti politiku čuvanja upita i stvarnog pružatelja servisa za slanje obrazaca.
7. Potvrditi konačnu domenu. Do tada su demo SEO postavke svjesno postavljene na **noindex** i robots.txt blokira indeksiranje.

**Nemojte objaviti web kao službenu stranicu obrta bez provjere ovih podataka.** Kao pregledni demo može se deployati odmah.

## Cloudflare Pages – demo deployment

1. Raspakirajte ZIP: sve datoteke weba nalaze se u **korijenu arhive**, bez dodatne nadmape. Ako radite GitHub deployment, u repository root prenesite sve stavke, uključujući `index.html`, `assets/`, `_redirects` i `_headers`.
2. Za **Cloudflare Pages Direct Upload** učitajte ZIP koji sadrži datoteke stranice u korijenu, a ne ZIP s dodatnom nadmapom. ZIP koji ste dobili već je složen na taj način.
3. U Cloudflare Pages: framework **None**, build command prazno, output directory `/` (ili root projekta).
4. Otvorite početnu, usluge, galeriju i kontakt na desktopu i mobitelu te provjerite prikaz.
5. U početnoj demo verziji kontakt obrazac otvara unaprijed pripremljen e-mail. **Ne šalje podatke izravno sa stranice** dok ne unesete Web3Forms ključ.

## Web3Forms

U `assets/js/site-config.js` unesite odobreni Web3Forms access key pod `web3formsAccessKey: 'OVDJE_KLJUC'`. Trenutno je vrijednost prazna.

U slučaju postavljenog ključa, formular putem `fetch()` šalje upit Web3Forms endpointu; uspješna poruka prikazuje se samo nakon potvrđenog odgovora servisa. Testirajte slanje prije objave. Za privitke treba zasebno dovršiti upload integraciju – demo ne glumi da ih šalje.

## Uključivanje SEO-a nakon odobrenja

Kad vlasnik potvrdi podatke, usluge i pravne dokumente, pokrenite u korijenu projekta:

```bash
python tools/prepare_production.py --domain https://vasadomena.hr --owner-approved
```

Skripta umeće apsolutne canonical URL-ove, ažurira Open Graph URL, uključuje indeksiranje i popunjava pravi sitemap.xml s vašom domenom te robots.txt.

**Napomena:** Ne pokretati skriptu na demo domeni koja nije namijenjena Google indeksiranju.

## Struktura

```text
index.html                # Početna
usluge/index.html
ugradnja-prozora/index.html
ugradnja-vrata/index.html
sjenila-rolete/index.html
nasi-radovi/index.html
o-nama/index.html
cesta-pitanja/index.html
kontakt/index.html
privatnost/index.html
kolacici/index.html
uvjeti-koristenja/index.html
404.html
assets/css/main.css
assets/js/main.js
assets/js/site-config.js
assets/images/          # Lokalni AVIF/WebP vizuali
favicon.svg
_headers
_redirects
robots.txt
sitemap.xml
tools/prepare_production.py
```

## Što se može naknadno dodati

- Zamjena ilustrativnih fotografija stvarnim fotografijama radova, nazivima projekata i opisima (bez lažnih referenci).
- Puna engleska/talijanska verzija nakon potvrde tržišta.
- GA4 uz consent-aware pokretanje i stvarnu provjeru privole.
- Web3Forms i zaštita od spama prema produkcijskoj konfiguraciji.
- Google Search Console i Google Business Profile nakon objave na potvrđenoj domeni.
- **Obavezna završna provjera u stvarnom pregledniku nakon deploya:** desktop / mobilna navigacija, intro, kontakt i GDPR, karta, Core Web Vitals i PageSpeed. Automatska statička provjera izvornog koda nije zamjena za pregled uživo.

**Napomena o slikama:** Hero i prateći vizuali izrađeni su za demo kao ilustracije moderne stolarije, a ne kao fotografije stvarnih radova SDR Montaže. 
