# SDR MONTAŽE — detaljna dizajnerska revizija (16. 11. 2026.)

## Što je pregledano
Sve HTML datoteke, zajednička navigacija i footer, intro, hero, sekcije, galerija, kontakt, mapa, mobilna kontakt traka, CSS animacije i JavaScript događaji.

## Uklonjeno
- Dekorativne crte prije gotovo svih malih naslova.
- Lažne brojne oznake na karticama usluga, kružne strelice i strelice na gotovo svakom CTA gumbu.
- Dekorativne linije ispod logotipa i u uvodnoj animaciji.
- Okomiti natpis uz hero i dekorativni indikator za skrolanje.
- Zoom animacija hero fotografije i nepotrebno uvećavanje slika pri hoveru.
- Generičko dizanje kartica pri hoveru i ponavljajući scroll-reveal svih elemenata.
- Fotografija u završnom CTA bloku koja je svugdje ponavljala početni hero.
- Prazna tekstualna sekcija na naslovnici koja je ponavljala upute za upit.
- Četverokoračni proces kopiran na sve tri detaljne stranice usluga (ostavljen samo na početnoj).
- Umjetni nacrt cestovne mreže koji je izgledao kao karta, ali nije bio karta.
- Nepotrebni mikrotekstovi i oznake na fotografijama.

## Zadržano
- Fotografski vizualni smjer, paleta boja, elegantna lebdeća navigacija.
- Intro na prvom dolasku u sesiji i zaštita od kratkog prikaza naslovnice prije intro animacije.
- Galerija s filtrom i lightboxom, kontakt forma, kontakt gumbi, prikaz karte na klik, pravne stranice.
- Sve potvrđene informacije i napomene o ilustrativnim fotografijama.
- Cloudflare Pages statička struktura, SEO demo noindex pravilo.

## Prije javnog objavljivanja
Fotografije u ovom demou su ilustrativni vizuali izrađeni za koncept i **nisu dokaz izvedenih radova**. Za konačni sajt nabaviti stvarne fotografije vlasnika ili uredno licencirane dokumentarne fotografije. Potvrditi usluge, adresu i kontakt, postaviti aktivnu slanje forme, provjeriti GDPR i ukloniti demo `noindex` samo po odobrenju.

## Testiranje
Statičke provjere svih 13 HTML datoteka i njihovih lokalnih putanja prošle su bez pogrešaka. JavaScript sintaksa prošla je `node --check`. Interaktivne provjere uključuju mobilni izbornik, galerijski filter, lightbox, mapu na klik i prvo učitavanje intra; responzivnost je provjerena na 320, 390, 768, 1024 i 1440 px. Vizualni statički prikazi rađeni su kroz ugradnju lokalnih resursa u izolirani render preglednika jer su lokalni URL-ovi blokirani u testnom pregledniku. To nije potpuni E2E test deployanog weba.
