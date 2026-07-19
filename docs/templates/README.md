# SLIDE Dashboard — Dokumentvorlagen

Diese HTML-Vorlagen sind die **verdrahteten Quellvorlagen** für das künftige Dashboard.
Das Dashboard ersetzt die `{{PLATZHALTER}}` mit CRM-Daten und rendert daraus ein PDF
(z. B. via Headless-Chrome / Print). Alle Vorlagen sind **A4, druckfertig** und im
**1:1 SLIDE-Design** (dunkel; die Rechnung bewusst weiss/schwarz, weil der Schweizer
QR-Zahlteil scanbar sein muss).

> Fonts werden in der Vorschau über Google Fonts geladen. Für Offline-PDF im Dashboard
> die Fonts (DM Sans, Host Grotesk) **self-hosten**.

## Vorschau
Datei im Browser öffnen → `Strg/Cmd + P` → „Als PDF speichern", Ränder „Keine",
Hintergrundgrafiken aktivieren.

---

## Verarbeitete Vorlagen

| Datei | Quelle | Status |
|---|---|---|
| `offerte.html` | `Offerte.pdf` | 1:1 nachgebaut, 8 Seiten |
| `rechnung.html` | `Rechnungvorlage.docx` + `Rechnungvorlage 40%.docx` | Zusammengeführt, echte Kundendaten entfernt |
| `onboarding.html` | `Onboarding.docx` | Nachgebaut, als ausfüllbares Formular |

## Bewusst NICHT verarbeitet
- **`Dienstleistungsvertrag.docx`** — auf deinen Wunsch ausgelassen (mögliche Kundendaten).
- **`Journal.docx`** — persönliches Tagebuch, kein Kundendokument.
- **`Projektvorstellung.pptx`** — Präsentation, nicht Teil der Kundendokumente.

> ⚠️ `Rechnungvorlage 40%.docx` enthielt **echte Kundendaten** (Avanti Bistro, Ayse Ciftci,
> Adresse, SLIDE-001). Diese wurden **nicht** in die Vorlage übernommen — alles durch
> Platzhalter ersetzt.

---

## Platzhalter-Mapping (Vorlage → CRM/Preset)

### offerte.html
| Platzhalter | Quelle |
|---|---|
| `{{OFFERTE_NR}}` | Offerte-Zähler (z. B. OFF-001) |
| `{{KUNDE_NAME}}` | Company/Kontakt-Name |
| `{{PRAESENTIERT_ZU}}` | Firma / Person |
| `{{PRAESENTIERT_VON}}` | Admin (Standard: Akif Yaylaci) |
| `{{ANREDE}}` | „Sehr geehrter Herr/Frau …" |
| `{{#LEISTUNGEN}}` (POS, TITEL, BESCHREIBUNG) | Offerten-Positionen |
| `{{#PREISE}}` (DIENSTLEISTUNG, PREIS, ZEIT) | Preistabelle |

### rechnung.html
| Platzhalter | Quelle |
|---|---|
| `{{ABSENDER_*}}` (NAME, STRASSE, PLZ_ORT, TEL, MAIL, WEB, IBAN) | **Preset** (Einstellungen) |
| `{{KUNDE_FIRMA}}`, `{{KUNDE_ANREDE_ZEILE}}`, `{{KUNDE_STRASSE}}`, `{{KUNDE_PLZ_ORT}}` | Company |
| `{{RECHNUNG_NR}}`, `{{RECHNUNG_DATUM}}`, `{{ZAHLBAR_BIS}}` | Invoice |
| `{{#POSITIONEN}}` (NR, BEZEICHNUNG, MENGE, EINHEIT, PREIS, GESAMT) | Rechnungspositionen |
| `{{TOTAL}}`, `{{BETRAG}}`, `{{WAEHRUNG}}` | Invoice (CHF) |
| `{{ZAHLUNGSANTEIL}}` | „" oder „(40%)" |
| `{{ZAHLUNGSHINWEIS}}` | Standardtext oder 40%-Anzahlungstext |
| `{{REFERENZ_TEXT}}` | strukturierte Kundenreferenz (keine QR-Referenz) |
| `{{QR_CODE_SVG}}` | vom Dashboard generierter Swiss-QR-Bill-Code |

### onboarding.html
| Platzhalter | Quelle |
|---|---|
| `{{KUNDE_FIRMA}}`, `{{ANREDE}}`, `{{PROJEKTNAME}}` | Company / Project |

---

## Hinweise zur QR-Rechnung
- **Kein MwSt-Ausweis** (Art. 10 Abs. 2 MWSTG). Bei späterer MwSt-Pflicht Zeile ergänzen.
- **Ohne QR-Referenz**; die strukturierte Referenz steht unter „Zusätzliche Informationen".
- Der QR-Code muss nach **Swiss QR Bill**-Spezifikation erzeugt werden (IBAN/QR-IBAN aus Preset).
- Zahlteil-Layout entspricht der Struktur (Empfangsschein 62 mm + Zahlteil); vor Live-Gang
  mit einem QR-Validator (z. B. der Six/PostFinance-Prüfung) gegenchecken.
