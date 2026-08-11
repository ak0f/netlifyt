# SLIDE Agentur Website — Alle Texte

Vollständige Sammlung sämtlicher Texte der Website (slide-new), exportiert aus dem Quellcode
(`lib/i18n.ts`, `lib/projects.ts`, `lib/services.ts` und allen Seiten-Komponenten). Deutsch (DE)
und Englisch (EN) sind jeweils enthalten, da die Seite zweisprachig ist.

## Dateien

| Datei | Inhalt |
|---|---|
| `01-navigation-und-global.md` | Navbar-Links, Login, Sprachumschalter, A11y-Labels, Leistungen-Flyout |
| `02-startseite-hero.md` | Hero-Sektion (Startseite) + Ladebildschirm |
| `03-startseite-leistungen-sektion.md` | "Unsere Leistungen"-Sektion auf der Startseite |
| `04-startseite-referenzen-sektion.md` | "Referenzen"-Sektion auf der Startseite |
| `05-startseite-ablauf-sektion.md` | "Der Ablauf"-Sektion auf der Startseite |
| `06-startseite-testimonials-sektion.md` | Kundenstimmen-Sektion |
| `07-startseite-ueber-uns-sektion.md` | "Über uns"-Sektion (Founder-Bio) |
| `08-startseite-kontakt-sektion.md` | Kontaktformular-Sektion (Startseite, eingebettet) |
| `09-footer.md` | Footer (alle Spalten, Social, Rechtliches) |
| `10-cookie-banner.md` | Cookie-Banner |
| `11-seite-kontakt.md` | Eigenständige Seite `/kontakt` |
| `12-seite-ablauf.md` | Eigenständige Seite `/ablauf` (alle 7 Schritte) |
| `13-seite-leistungen-uebersicht.md` | Seite `/leistungen` (Übersicht) |
| `14-17-seite-leistungen-detail-*.md` | Die 4 Leistungsseiten (Webdesign, Social Media, E-Mail, IT-Support) |
| `18-seite-referenzen-uebersicht.md` | Seite `/referenzen` (Übersicht) |
| `19-referenzen-projekte.md` | Alle 6 Projekt-Detailseiten |
| `20-seo-meta-texte.md` | Alle `<title>` / Meta-Description pro Seite |
| `21-agb.md` | Allgemeine Geschäftsbedingungen (vollständig, DE + EN) |
| `22-datenschutz.md` | Datenschutzerklärung (vollständig, DE + EN) |
| `23-impressum.md` | Impressum (vollständig, DE + EN) |

## Quelldateien im Code

- `lib/i18n.ts` — fast alle UI-Texte (Startseite-Sektionen, Footer, Kontakt, Cookie-Banner, Ablauf-Seite)
- `lib/projects.ts` — Referenzprojekte (Titel, Beschreibung, Zitate, Meta)
- `lib/services.ts` — Leistungsseiten (Intro, Features, FAQ)
- `app/agb/AGBContent.tsx`, `app/datenschutz/DatenschutzContent.tsx`, `app/impressum/ImpressumContent.tsx` — Rechtstexte
- `app/kontakt/KontaktContent.tsx`, `app/leistungen/LeistungenIndex.tsx`, `app/leistungen/[slug]/LeistungContent.tsx`,
  `app/referenzen/ReferenzenIndex.tsx`, `app/referenzen/[slug]/ProjectDetail.tsx` — Seiten mit teils fest codiertem Text
  (nicht aus i18n.ts)
- `components/CookieBanner.tsx`, `components/ConversationalContactForm.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`
