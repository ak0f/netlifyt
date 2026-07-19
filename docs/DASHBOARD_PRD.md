# PRD — SLIDE Kundendashboard & CRM

**Produkt:** `dashboard.slideagentur.ch`
**Version:** 1.0 (MVP-Definition)
**Datum:** 2026-07-19
**Autor:** SLIDE Agentur (Akif Yaylaci)
**Status:** Entwurf zur Umsetzung

---

## 1. Zusammenfassung & Ziel

SLIDE Agentur baut ein internes **CRM** und ein kundenseitiges **Dashboard** unter der eigenen Subdomain `dashboard.slideagentur.ch`. Es ist ein **internes Werkzeug ausschliesslich für SLIDE** – kein Produkt, das an Dritte verkauft oder als SaaS veröffentlicht wird.

Zwei Perspektiven, eine Anwendung:

1. **Admin (SLIDE):** Kunden & Leads verwalten, Projekte tracken, Rechnungen (Schweizer QR) erzeugen, Verträge versenden, Dateien austauschen, mit Kunden kommunizieren.
2. **Kunde (nach Login):** Eigenen Projektstatus sehen, Onboarding-Dateien hochladen, Deliverables & Rechnungen herunterladen, Verträge digital signieren, Termine buchen, Nachrichten schreiben.

**Grundprinzipien**
- **Datenschutz zuerst:** Alle Kundendaten liegen physisch in der **Schweiz**. DSG-konform.
- **Sicherheit:** Eigenes, vom Marketing-Repo **vollständig getrenntes Repository und Deployment**.
- **1:1 SLIDE-Design:** Kein neues Design-System. Identische Fonts, Farben, Komponenten-Sprache wie `slideagentur.ch`.
- **Zweisprachig:** Komplett **DE/EN**, überall.

---

## 2. Scope

### 2.1 MVP (Phase 1 — jetzt)
- Auth: Admin-Login + kundenspezifische Zugänge (Username + Passwort, vom Admin erstellt, vom Kunden änderbar)
- CRM: Kunden anlegen/bearbeiten mit allen Feldern, Erstellungsdatum, Status mit Farben + Filter
- Leads: Anfragen manuell erfassen, mit Quellen-Unterkategorie (Instagram, TikTok, Mund-zu-Mund, …)
- Projekte: unter Kunde, mit Status-Pipeline
- Kundendashboard: Projektstatus, Datei-Upload/Download, Rechnungen, Verträge, Nachrichten, Termin buchen
- Rechnungen: Schweizer QR-Rechnung als PDF, generiert aus `.docx`-Vorlagen mit CRM-Daten
- Verträge: Versand + einfache elektronische Signatur mit gerichtsfestem Prüfprotokoll
- Nachrichten: Thread pro Projekt + E-Mail-Benachrichtigung, plus Kontakt-Shortcuts (WhatsApp / Telefon)
- Einstellungen: Presets (mehrere IBANs, Absenderdaten etc.)
- Vollständig DE/EN

### 2.2 Zukunft (Phase 2+ — bewusst noch NICHT bauen)
- Automatischer Import: Netlify-Form-Einsendungen werden analysiert und automatisch als Lead in die Tabelle geschrieben
- Website-Analytics pro Kunde im Dashboard
- Team-Erweiterung: mehrere Admin-Nutzer mit Rollen & Rechten
- Online-Zahlung (Stripe/TWINT)

> **Architekturregel:** Phase-2-Features werden im Datenmodell und in der Rollenlogik von Anfang an **vorgesehen** (z. B. `role`-Feld, `source`-Feld an Leads), aber nicht implementiert.

---

## 3. Nutzer & Rollen

| Rolle | Beschreibung | MVP | Zugriff |
|---|---|---|---|
| **Admin** | Akif / SLIDE. Vollzugriff auf CRM, alle Kunden, alle Projekte, Einstellungen. | ✅ | Alles |
| **Kunde** | Ein Login pro Kunde. Sieht ausschliesslich eigene Daten. | ✅ | Nur eigene Projekte/Dateien/Rechnungen/Verträge/Nachrichten |
| **Team-Mitglied** | Weiterer Admin mit eingeschränkten Rechten. | ⏳ Phase 2 | Konfigurierbar |
| **Kunden-Mehrfachnutzer** | Mehrere Personen pro Kundenfirma. | ⏳ Phase 2 | Wie Kunde |

Das Datenmodell trägt von Beginn an ein `role`-Feld (`admin` / `client`) und Kunden hängen an einer `company`-Entität, damit spätere Mehrfachnutzer ohne Migration möglich sind.

---

## 4. Architektur & Tech-Stack

### 4.1 Grundsätze
- **Eigenes Repository**, eigenes Deployment. **Niemals** im selben Repo wie die Marketing-Website (`slide-next`).
- **Datenresidenz Schweiz** ist Pflicht — App-Hosting, Datenbank und Datei-Speicher.

### 4.2 Empfohlener Stack
| Schicht | Empfehlung | Begründung |
|---|---|---|
| Framework | **Next.js** (App Router) + TypeScript | Gleiche Technik wie Hauptseite → wiederverwendbares Design/Know-how |
| UI | Tailwind CSS mit **kopierten SLIDE-Tokens** | 1:1-Look ohne Fremd-Design |
| Auth | Eigene Session-Auth (z. B. Lucia/Auth.js, Credentials) mit **bcrypt/argon2**-Passwort-Hashing | Klassisch Username+Passwort, Kunde kann Passwort ändern |
| Datenbank | **PostgreSQL, gehostet in der Schweiz** | Relationale Struktur (Kunde→Projekt→Rechnung) |
| Datei-Speicher | **Schweizer Objektspeicher** | Onboarding-Uploads & Deliverables |
| PDF/Docs | `.docx`-Templating + PDF-Rendering serverseitig | QR-Rechnung & Verträge aus Vorlagen |
| E-Mail | **Schweizer SMTP** mit SLIDE-Domain | DSG-konforme Benachrichtigungen |

### 4.3 Schweizer Hosting-Kandidaten (zur Auswahl bei Umsetzung)
Für App + Postgres + Objektspeicher, alle mit Rechenzentrum in der Schweiz:
- **Infomaniak** (Genf/Schweiz) — Managed Public Cloud, Postgres, Swiss Object Storage, SMTP. Starke DSG-Positionierung.
- **cloudscale.ch** — Schweizer VPS + S3-kompatibler Object Storage.
- **Exoscale** (Schweizer Zonen) — VPS, Managed Postgres, Object Storage.
- **Hostpoint** — Schweizer Hosting/VPS (Node-fähig via Managed Server/VPS).

> Entscheidung offen; Anbieter muss ISO-27001-artige Standards, Schweizer Rechenzentrum und Backups bieten. **Nach der Wahl müssen Datenschutzerklärung & AGB entsprechend aktualisiert werden.**

### 4.4 Sicherheit
- Row-Level-Isolation: Kunde kann per API/DB **niemals** fremde Datensätze abrufen (Autorisierung auf jeder Query, nicht nur im UI).
- HTTPS erzwungen, sichere Session-Cookies (`HttpOnly`, `Secure`, `SameSite`).
- Passwörter gehasht (argon2id/bcrypt), nie im Klartext.
- Rate-Limiting auf Login, Passwort-Reset-Flow.
- Datei-Zugriff nur über signierte, kurzlebige URLs.
- Audit-Log für sicherheitsrelevante Aktionen (Login, Vertrag signiert, Rechnung erstellt).
- Regelmässige, in der Schweiz gelagerte Backups.

---

## 5. Datenschutz & Compliance
- Alle personenbezogenen Daten liegen in der Schweiz.
- DSG-konforme Verarbeitung; Auftragsverarbeitungsverträge (AVV) mit gewähltem Hoster.
- Datenschutzerklärung + AGB des Dashboards nach Hoster-Wahl aktualisieren (separater Vorgang).
- Kunde kann eigene Daten einsehen; Export/Löschung auf Anfrage (Prozess dokumentieren).

---

## 6. Datenmodell (Entitäten)

> Vereinfachte Übersicht. Zeitstempel `created_at` / `updated_at` an allen Entitäten. Erstellungsdatum ist überall sichtbar und filterbar.

**User**
- `id`, `role` (`admin` | `client`), `username`, `password_hash`, `email`, `locale` (`de` | `en`), `must_change_password` (bool), `last_login_at`, `created_at`
- Verknüpfung: gehört zu einer `Company` (bei `client`)

**Company (Kunde)**
- `id`, `name`, `contact_person`, `email`, `phone`, `address`, `whatsapp`
- `status` (`lead` | `onboarding` | `in_progress` | `review` | `done`)
- `lead_source` (`instagram` | `tiktok` | `word_of_mouth` | `referral` | `other`) — nur relevant im Lead-Status
- `deal_value` (Auftragswert), `customer_reference` (strukturierte Kundenreferenz-Nr.)
- `notes` (Freitext / Notizverlauf), `tags[]`
- `created_at` (Erstellungsdatum)

**Project (Projekt/Auftrag)**
- `id`, `company_id`, `title`, `service_type` (Website | Social Media | E-Mail | IT-Support | …)
- `status` (gleiche Pipeline wie oben, pro Projekt), `description`, `created_at`
- Regel: Hat ein Kunde **nur 1 Projekt**, zeigt das UI es direkt ohne zusätzlichen Klick. Bei **mehreren** Projekten erscheint eine Projekt-Auswahl.

**File**
- `id`, `project_id`, `uploaded_by` (`admin` | `client`), `kind` (`onboarding` | `deliverable`), `filename`, `storage_key`, `size`, `created_at`

**Invoice (Rechnung)**
- `id`, `project_id`/`company_id`, `number`, `preset_id` (welches Absender/IBAN-Preset), `line_items[]`, `total`, `currency` (CHF)
- `qr_reference` (optional Kundenreferenz, **keine QR-Referenz-Nr.**), `status` (`draft` | `sent` | `paid`), `pdf_key`, `created_at`, `due_date`

**Contract (Vertrag)**
- `id`, `project_id`/`company_id`, `template_id`, `pdf_key`
- `status` (`draft` | `sent` | `signed`)
- `signature` (Objekt: `signed_by_name`, `signed_at`, `ip_address`, `user_agent`, `signature_image`), `signed_pdf_key`, `created_at`

**Message**
- `id`, `project_id`, `author` (`admin` | `client`), `body`, `read_at`, `created_at`

**Setting / Preset**
- `id`, `type` (`sender` | `iban` | `invoice_template` | `contract_template`)
- `label`, `data` (JSON: z. B. IBAN, Bankname, Absenderadresse), `is_default`

---

## 7. Feature-Spezifikationen

### 7.1 Authentifizierung & Zugang
- **Admin-Login:** Username + Passwort.
- **Kundenzugang:** Admin erstellt pro Kunde einen Zugang durch Eingabe von Username/Kontakt. Das **initiale Passwort wird vom System automatisch und sicher generiert** (mind. 16 Zeichen, Gross-/Kleinbuchstaben, Zahlen, Sonderzeichen, kryptografisch zufällig). Admin tippt **kein** Passwort selbst.
- **Übergabe:** Das generierte Passwort wird dem Admin **einmalig zum Kopieren angezeigt** und/oder direkt in der Einladungs-E-Mail (DE/EN je nach `locale`) an den Kunden versendet. Es wird nur als Hash gespeichert, nicht im Klartext.
- **Passwort ändern:** Kunde kann sein Passwort jederzeit selbst ändern. `must_change_password`-Flag erzwingt die Änderung beim ersten Login (empfohlen, standardmässig aktiv).
- **Passwort vergessen:** E-Mail-basierter Reset-Link.
- Kein öffentliches Self-Signup.

### 7.2 CRM (Admin)
- **Kundentabelle** mit Spalten: Name, Ansprechpartner, Status (Farb-Badge), Leistung, Auftragswert, Erstellungsdatum.
- **Status mit Farbcodierung** + **Filterfunktion** nach Status. Vorschlag Farben (aus SLIDE-Palette ableiten):
  - `Lead / Anfrage` — neutral/grau
  - `Onboarding` — indigo (Accent `#6366f1`)
  - `In Arbeit` — blau
  - `Review` — amber
  - `Abgeschlossen` — grün
- **Lead-Erfassung:** manueller Eintrag mit Pflichtfeld **Quelle** (Instagram / TikTok / Mund-zu-Mund / Empfehlung / Sonstige). (Phase 2: automatischer Import aus Netlify Forms.)
- **Kundendetail-Ansicht:** alle Stammdaten, Notizverlauf, verknüpfte Projekte, Rechnungen, Verträge, Dateien, Nachrichten an einem Ort. „Bisschen tiefer" — d. h. ausführliche Detailseite, nicht nur Tabellenzeile.
- Sortier-/Suchfunktion über Name & Referenznummer.

### 7.3 Projekte
- Angelegt unter einem Kunden. Eigener Status (gleiche Pipeline).
- Enthält: Statusverlauf, Dateien (Onboarding + Deliverables), Rechnungen, Vertrag, Nachrichten-Thread.
- **UX-Regel:** 1 Projekt → direkt anzeigen; mehrere → Projektauswahl. Kein unnötiger Zweitklick.

### 7.4 Kundendashboard (Client-Ansicht)
Nach Login sieht der Kunde:
- **Projektstatus** — visuelle Pipeline, wo sein Projekt gerade steht.
- **Onboarding / Dateien** — eigene Assets hochladen (Logos, Texte, Bilder); Deliverables von SLIDE herunterladen.
- **Rechnungen** — Liste + PDF-Download, Status (offen/bezahlt).
- **Verträge** — anzeigen und **digital signieren**.
- **Termin buchen** — eingebettetes **Cal.com** (wie auf der Hauptseite).
- **Nachrichten** — Thread pro Projekt; plus Shortcuts „Per E-Mail antworten", „Dringend via WhatsApp", „Telefonisch".

### 7.5 Dateien / Onboarding
- Upload (Kunde) und Upload (Admin, Deliverables) getrennt gekennzeichnet (`kind`).
- Speicherung im Schweizer Objektspeicher.
- Zugriff nur über signierte, ablaufende URLs.
- Datei-Typen/-Grössen limitiert und validiert (Server-seitig).

### 7.6 Rechnungen — Schweizer QR-Rechnung
- **MWST:** SLIDE ist aktuell **nicht MWST-pflichtig** → Rechnungen **ohne MWST-Ausweis** (auf spätere MWST-Pflicht vorbereiten: Feld optional zuschaltbar).
- **Erzeugung:** Admin klickt „Rechnung erstellen" → System liest CRM-Daten, füllt die verdrahtete **`.docx`-Vorlage** (Platzhalter → Werte) und rendert ein **PDF mit Schweizer QR-Zahlteil**.
- **QR-Zahlteil:** IBAN/QR-IBAN aus gewähltem **Preset**. **Ohne QR-Referenznummer.** Die (strukturierte) **Kundenreferenz** kommt aus dem CRM-Feld `customer_reference` und wird auf der Rechnung als Referenz/Mitteilung geführt.
- **Presets in Einstellungen:** mehrere Absender-/IBAN-Profile speicherbar; eines als Standard. Beim Rechnungserstellen wählbar.
- Rechnungsnummern werden fortlaufend/strukturiert vergeben.

### 7.7 Verträge & E-Signatur
- **Erzeugung:** aus verdrahteter `.docx`-Vorlage mit CRM-Daten → PDF.
- **Versand:** an den Kunden; erscheint im Kundendashboard unter „Verträge".
- **Einfache elektronische Signatur (SES):** Kunde tippt oder zeichnet Unterschrift und bestätigt.
- **Gerichtsfestes Prüfprotokoll:** System speichert `signed_by_name`, `signed_at` (Zeitstempel), `ip_address`, `user_agent`, Signaturbild und erzeugt ein **signiertes PDF inkl. Audit-Seite** (Prüfprotokoll angehängt). Damit im Streitfall vor Gericht belegbar.
- Kein QES/ZertES im MVP (Kosten/Aufwand); SES mit Protokoll genügt für KMU-Verträge.

### 7.8 Nachrichten / Support
- **Thread pro Projekt.** Kunde schreibt, Admin antwortet; beide erhalten **E-Mail-Benachrichtigung** bei neuer Nachricht.
- **Kontakt-Shortcuts** im Nachrichtenbereich: „Antwort per E-Mail", „Dringend via WhatsApp", „Telefonisch" (mit hinterlegten SLIDE-Kontaktdaten).
- Kein Live-Chat im MVP.

### 7.9 Einstellungen (Admin)

Wichtig: **Presets** und **`.docx`-Vorlagen** sind zwei getrennte Dinge.

**a) Zahlungs-/Absender-Presets (kleine Datensätze, im Formular eingegeben — NICHT aus der `.docx` gelesen):**
- Ein Preset ist eine gespeicherte, wiederverwendbare Bankverbindung/Absender-Angabe, z. B. „Konto UBS": IBAN/QR-IBAN, Bankname, Absenderadresse.
- Admin kann **mehrere** Presets anlegen und eines als Standard markieren. Beim Rechnungserstellen wählt er nur das gewünschte Preset aus.
- Hat SLIDE nur ein Konto, genügt ein einziges (Standard-)Preset — die Auswahl entfällt dann faktisch.

**b) `.docx`-Vorlagen (Layout-Gerüst):**
- Admin lädt seine fertigen Dokument-Vorlagen (Rechnung, Vertrag) mit Platzhaltern hoch (z. B. `{{kunde_name}}`, `{{betrag}}`, `{{datum}}`, `{{iban}}`).
- Die Platzhalter werden **einmalig verdrahtet** (Platzhalter → CRM-Feld bzw. Preset-Feld). Danach füllt das System sie bei jeder Erstellung automatisch.
- Die `.docx` erzeugt **keine** Presets — sie ist nur das Layout, in das CRM-Daten + gewähltes Preset eingesetzt werden.

**c) Sonstiges:** eigene Profildaten, Passwort ändern, Standardsprache.

> **Zusammenspiel beim Rechnungserstellen:** `.docx`-Vorlage + Preset (IBAN/Absender) + Kunde (CRM-Daten) → fertiges PDF mit QR-Zahlteil.

### 7.10 Benachrichtigungen (E-Mail)
Ausgelöst bei: Kundeneinladung, Passwort-Reset, Statuswechsel, neue Datei/Deliverable, neue Rechnung, Vertrag zum Signieren, neue Nachricht. Alle Mails in `de`/`en` je nach `locale` des Empfängers, über Schweizer SMTP mit SLIDE-Domain.

---

## 8. Design (1:1 SLIDE)

> **Regel:** Kein neues Design erfinden. Tokens & Komponenten aus `slide-next` übernehmen. Bei Unklarheit **immer nachfragen**, keine neuen Inhalte/Styles generieren.

**Farb-Tokens (aus `app/globals.css` übernehmen):**
```
--bg:        #000000
--bg-card:   rgb(16,16,16)
--bg-dark:   rgb(29,29,29)
--bg-form:   rgb(39,39,39)
--t1:        #ffffff        (Primärtext)
--t2:        rgb(178,178,178) (Sekundärtext)
--b:         rgba(255,255,255,0.08) (Borders)
Accent:      #6366f1        (Indigo, aus tailwind.config)
--r-card:    15.41px  |  --r-btn: 7.705px  |  --r-pill: 9.246px
```
**Fonts:** DM Sans (Headlines), Host Grotesk (Body/UI), IBM Plex Mono (Mono/Labels) — identisch zur Hauptseite.
**Look:** Dark-first, editorial, viel Whitespace, ruhige Übergänge (framer-motion), Grain-Overlay optional. Buttons: `.btn-cta` (weiss) / `.btn-dark`. Eyebrow-Labels uppercase in `--t2`.

**Status-Badges** nutzen den Accent + abgeleitete Farbtöne, konsistent mit dem Dark-Theme.

---

## 9. Internationalisierung
- Vollständig **DE/EN**, analog zur Hauptseite (`LanguageContext` / `lib/i18n`-Muster wiederverwenden).
- Alle UI-Texte, E-Mails, generierte Dokumente sprachabhängig.
- `locale` pro User gespeichert; Kunde kann Sprache umschalten.

---

## 10. Nicht-funktionale Anforderungen
- **Performance:** schnelle Ladezeiten, serverseitiges Rendering wo sinnvoll.
- **Mobile:** vollständig responsive (Kunden öffnen Dashboard auch am Handy).
- **Verfügbarkeit:** Backups täglich, in der Schweiz.
- **Wartbarkeit:** klare Trennung Admin/Client, wiederverwendbare Komponenten.

---

## 11. Roadmap

| Phase | Inhalt |
|---|---|
| **1 — MVP** | Auth, CRM (Kunden+Leads+Status+Filter), Projekte, Kundendashboard, Dateien, QR-Rechnung aus `.docx`, Verträge+SES, Nachrichten+E-Mail, Presets, DE/EN |
| **2** | Netlify-Forms → Auto-Lead-Import & -Analyse |
| **3** | Website-Analytics pro Kunde im Dashboard |
| **4** | Team-Rollen für mehrere Admins; Mehrfachnutzer pro Kundenfirma |
| **5** | Online-Zahlung (Stripe/TWINT), evtl. MWST-Modul |

---

## 12. Offene Punkte / Vor Umsetzung zu klären
1. **Hoster final wählen** (Infomaniak / cloudscale / Exoscale / Hostpoint) → danach AVV, Datenschutz & AGB aktualisieren.
2. **`.docx`-Vorlagen** einmal bereitstellen und Platzhalter-Mapping definieren (Rechnung + Vertrag).
3. **Bankdaten** für Rechnungs-Presets (IBAN/QR-IBAN, Bankname, Absenderadresse).
4. **SLIDE-Kontaktdaten** für Support-Shortcuts (WhatsApp-Nummer, Telefon, E-Mail).
5. **Cal.com**-Konto/Embed für den geschützten Bereich bestätigen.
6. Genaue **Status-Farbwerte** final abstimmen (Vorschlag in 7.2).

---

*Dieses Dokument beschreibt bewusst nur MVP + geplante Ausbaustufen. Neue Inhalte/Designs werden nicht ohne Rückfrage erzeugt.*
