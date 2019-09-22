# StormFront Demo App - WarsawJS MasterClass #6

W repozytorium znajdują się wszystkie pliki potrzebne do rozpoczęcia prac nad tematem przewodnim - aplikacją webową, z której zrobimy pełne PWA.

Podczas warsztatów wytworzymy w JS (bez frameworków) apkę do wyświetlania prognoz pogody z serwisu DarkSky, który udostępnia dobrze udokumentowane API. Apka będzie:

* Zbudowana z wytycznymi mobile-first, czyli koncentracji na urządzeniach mobilnych.
* Szybka i niezawodna, cache'ując w wybranych strategiach zasoby za pomocą Service Workera, po to by móc działać bez połączenia z internetem.
* Instalowalna na telefonach, tabletach i komputerach dzięki pliku manifestu oraz obsłudze eventu `beforeinstallprompt` żeby umożliwić zainstalowanie z poziomu samej aplikacji.
* Korzystała z progresywnych udogodnień, takich jak geolokalizacja, powiadomienia push, odczyt stanu baterii, kamera i wibracje telefonu.

To sprowadzi się do osiągnięcia pełnej zgodności ze standardem PWA, co będziemy mogli zaobserwować w narzędziu Google Lighthouse.

## Co zrobimy?
### Opis funkcjonalny aplikacji
1. Strona główna zoptymalizowana pod mobile, która będzie przedstawiać prognozy kolejnych miast w mini-kartach
2. Komunikacja oraz wyciąganie prognoz pogody z API DarkSky
3. Prezentowanie prognozy pogody z domyślnego miejsca, jakim będzie Warszawa, PL
4. Opcja dodawania nowych miast do listy mini-kart
5. Pop-up/subsite z wybierakiem miast do dodania lub opcją do wpisania własnych koordynatów lub geolokalizacji (w późniejszym etapie)
6. Opcja odświeżenia prognoz
7. Opcja instalacji aplikacji na urządzeniu
8. Działanie bez połączenia z internetem (offline)
9. (w późniejszym etapie) Powiadomienia push o zmianach w pogodzie
10. (w późniejszym etapie) Odczytywanie kodów QR z koordynatami lokalizacji + wibracja
11. (w późniejszym etapie) Prezentowanie stanu baterii telefonu

## Jak to zrobimy?

1. Zainicjujemy swoje osobiste repozytorium na GitHubie, z nazwą `warsawjs-masterclass-6-stormfront`
2. Utworzymy podstawową strukturę katalogów pod projekt, dobierzemy architekturę (apka musi być serwowana przez HTTPS) oraz biblioteki, których będziemy używać:
    * komunikacja z zewnętrznym API (XMLHttpRequest, **[Fetch API]**)
    * ostylowanie ([Materialize], [Bootstrap], [Foundation], [AdminLTE], ...)
    * obsługa dat i dni tygodnia ([Luxon], ...)
    * kamera i rozpoznawanie kodów QR ([qr-scanner], [jsqrcode])
3. Rozpoczniemy kodowanie, żeby wytworzyć bazę, jakim jest strona główna z layoutem mobile-first, gotowa pod prezentowanie kart z prognozami pogody per lokalizacja
4. Zintegrujemy się z API DarkSky, żeby wyciągać i prezentować prawdziwe dane prognoz
5. Wstawimy opcję dodawania nowych miast lub koordynatów do listy kart z prognozami
6. Dodamy opcję odśwież, która odpyta API DarkSky o najnowsze dane
7. Przebadamy nasz projekt narzędziem Google Lighthouse, żeby rozpocząć prace nad PWA
8. Uzupełnimy tzw. quick-winy PWA, nie zapominając o iOS
9. Dodamy plik manifestu, generując wcześniej ikony aplikacji
10. Dodamy podstawowego service workera, który będzie się instalował i aktywował, w wypadku braku internetu wystawiając stronę `offline.html`
11. Zmodyfikujemy strategię cache'owania i zaczniemy przechowywać lokalnie więcej informacji, modyfikując service workera żeby nie wyświetlał już `offline.html`, tylko zachache'owane wcześniejsze dane.
12. Dodamy opcję dodaj do ekranu domowego w aplikacji, obsługując event `beforeinstallprompt`
13. Przetestujemy apkę na telefonie oraz w Google Lighthouse
14. Wstawimy bibliotekę [Workbox], która uprości nam obsługę trybu offline o stokroć
15. Dodamy powiadomienia push, które będą co jakiś czas informować o bieżącej prognozie pogody
16. Dodamy obsługę geolokalizacji, tak aby dodając nową lokalizację, można było skorzystać ze swoich obecnych, bieżących koordynatów z telefonu lub komputera
17. Wyświetlimy stan baterii oraz dodamy wibracje przy wysłaniu powiadomienia push
18. Dodamy wsparcie dla czytania kodów QR z koordynatami lokalizacji
19. Zapakujemy nasz projekt jako TWA, by mógł być opublikowany w Google Play Store
20. Dodamy cokolwiek wymyślnego, co nam przyjdzie do głowy, a zrobią to współczesne przeglądarki ;)

## Do dzieła!

[Fetch API]: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
[Materialize]: https://materializecss.com/getting-started.html
[Bootstrap]: https://getbootstrap.com/docs/4.3/getting-started/introduction/
[AdminLTE]: https://adminlte.io/docs/3.0/index.html
[Foundation]: https://foundation.zurb.com/develop/getting-started.html
[Luxon]: https://moment.github.io/luxon/
[qr-scanner]: https://github.com/nimiq/qr-scanner
[jsqrcode]: https://github.com/LazarSoft/jsqrcode
[Workbox]: https://developers.google.com/web/tools/workbox/