# Navigation & globale Elemente

## Navbar — Hauptlinks

| Key | DE | EN |
|---|---|---|
| services | Leistungen | Services |
| references | Referenzen | Portfolio |
| about | Über uns | About |
| process | Ablauf | Process |
| contact | Kontakt | Contact |
| login | Login für Kunden | Client Login |

## Leistungen-Flyout (Dropdown im Navbar)

Fest codiert in `components/Navbar.tsx` (identisch DE/EN):

- Website Development
- Social Media
- Email Marketing

Zähler-Labels (aus i18n `flyout.counts`):

| DE | EN |
|---|---|
| /5 Leistungen | /5 services |
| /4 Leistungen | /4 services |
| /3 Leistungen | /3 services |

## Sprachumschalter-Modal (i18n `modal`)

| DE | EN |
|---|---|
| Sprache wählen | Choose language |
| Wähl deine bevorzugte Sprache. | Pick your preferred language. |

## Accessibility-Labels (i18n `a11y`)

| Key | DE | EN |
|---|---|---|
| scrollTop | Nach oben scrollen | Scroll to top |
| openMenu | Menü öffnen | Open menu |
| bookCall | Erstgespräch buchen | Book a free call |

## Mobile-Menü — zusätzlicher Text

Der Hamburger-Button öffnet ein Vollbild-Menü mit den fünf Hauptlinks oben (gross, in
Grossbuchstaben dargestellt) sowie darunter:

- Primärer CTA-Button: Text = `hero.cta` ("Kostenloses Erstgespräch buchen" / "Book a free call")
- Zweiter Link: Text = `nav.login` ("Login für Kunden" / "Client Login")
- Sprachumschalter: "DE · Deutsch" / "EN · English"

## Breadcrumbs auf Leistungsseiten (fest codiert in `LeistungContent.tsx`)

| DE | EN |
|---|---|
| Start | Home |
| Leistungen | Services |
