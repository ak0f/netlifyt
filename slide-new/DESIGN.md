# DESIGN.md — SLIDE Agentur Website Design System
> Vollständige Dokumentation des tatsächlich implementierten Designs von `slideagentur.ch` (Next.js/React/Framer Motion), Stand: Analyse des aktuellen Codes in `app/`, `components/`, `app/globals.css`, `tailwind.config.ts`.

---

## 1. GESAMTKONZEPT & PHILOSOPHIE

### Visuelles Leitmotiv
**Dark-first, Editorial, Cinematic-Minimal.** Fast schwarzer Hintergrund (`#000`) auf der gesamten Seite, große Weißräume, sehr zurückhaltende Farbigkeit — Kontrast entsteht fast ausschließlich über **Weiß in verschiedenen Opazitätsstufen**, Typografie-Größe und Bewegung. Die Marke tritt über ein riesiges, transparentes "S"/"SLIDE"-Lettering als Deko-Element in Erscheinung (Hero und Footer), nicht über Farbe.

### Design-Paradigma
- **Dark Theme ist die einzige Variante**, kein Light-Mode-Toggle.
- **Kein hartes Card-Grid** — asymmetrische, atmende Sektionen mit `vw`-basiertem Spacing, die auf jedem Viewport proportional bleiben.
- **Bewegung als Standard, nicht als Extra**: Jede Sektion hat Scroll-getriebene Reveal-Animationen (Framer Motion `useInView`/`useScroll`), Hero und About haben Parallax, Services-Cards haben 3D-Tilt.
- **Kontrast durch Opazität statt Farbe**: Text-Hierarchie wird über `rgba(255,255,255, X)` gesteuert (1.0 → 0.4), nicht über Farbtöne.
- **Custom Cursor** (Dot + verzögerter Ring) ersetzt den System-Cursor auf Desktop komplett — verstärkt das "durchdachte Produkt"-Gefühl.
- **Glassmorphism für schwebende UI**: Navbar, Flyouts, Cookie-Banner und der Floating-CTA nutzen `backdrop-filter: blur()` auf halbtransparentem Dunkelgrau.
- **Bewusst kein Bold**: Fast überall `font-weight: 400`. Hierarchie entsteht durch Schriftgröße, nicht Gewicht.

---

## 2. FARBPALETTE

Die Palette ist fast monochrom: Schwarz-Skala als Fläche, Weiß-Skala (über Opacity) als Text/UI. Es gibt **keine Akzentfarbe** im Live-Design — die in `tailwind.config.ts` definierte `accent: '#6366f1'` (Indigo) ist ungenutztes Altmaterial und taucht in keiner Komponente auf.

### Hintergrundflächen

| Token / Wert | Verwendung |
|---|---|
| `#000000` | Hero, About, Contact, Process, Footer, Loading-Screen — der Standard-Seitenhintergrund |
| `#0a0a0a` | Services-Sektion |
| `rgb(11, 11, 11)` | Testimonials-Sektion (äußerer Rahmen) |
| `rgb(6, 6, 6)` | Testimonials-Card (innerer Container) |
| `rgb(10, 10, 10)` | Process-Timeline Step-Cards |
| `rgb(16, 16, 16)` | Founder-Foto-Platzhalter (About) |
| `rgb(18,18,18)` → `rgb(11,11,11)` | References-Sektion, scroll-interpoliert (`useTransform`) |
| `rgb(29, 29, 29)` | Referenz-Bildkarten (`ReferencesPinnedSlider`) |
| `rgb(39, 39, 39)` | Kontaktformular-Container |
| `rgba(16, 16, 16, 0.88)` + `blur(52px)` | Nav-Flyout-Dropdown (Leistungen) |
| `rgba(18, 18, 18, 0.96)` + `blur(46px)` | Mobile-Nav-Dropdown |

### Text- und UI-Opazitätsskala (auf `#fff` bzw. `#000`-Basis)

| Wert | Rolle |
|---|---|
| `#ffffff` (1.0) | Primärtext, Headlines, aktive UI |
| `rgba(255,255,255,0.85–0.93)` | Hover-Zustände, aktive Pills |
| `rgba(255,255,255,0.72–0.75)` | Sekundäre Nav-Links (Login, Icon-Buttons) |
| `rgb(178,178,178)` (~0.7) | Standard Muted-Text — Fließtext, Footer-Links, Eyebrow-Alt |
| `rgba(255,255,255,0.55)` | Eyebrow-Labels, Meta-Infos, Bio-Stat-Labels |
| `rgba(255,255,255,0.40–0.45)` | Gedimmte Headline-Hälfte ("We deliver…"-Stil), sehr leise Meta-Werte |
| `rgba(255,255,255,0.08–0.10)` | Trennlinien (`border-top/bottom`), dezente Panel-Hintergründe |
| `#f87171` (Tailwind red-400) | Einzige Nicht-Grau-Farbe im System — Formular-Fehlermeldungen |

### Glass-/Floating-UI (Navbar, Buttons, Cookie-Banner)

| Token | Wert |
|---|---|
| `--ui-float` | `rgba(36, 36, 36, 0.50)` |
| Blur | `blur(46.23px)` (Navbar-Pills, Scroll-to-Top, Floating-CTA) |
| Flyout-Hintergrund | `rgba(16,16,16,0.88)`, `blur(52px)` |
| Cookie-Banner | ähnliches Muster, `blur(28px)` |

### Design-Tokens aus `app/globals.css`
```css
:root {
  --bg:        #000000;
  --bg-card:   rgb(16, 16, 16);
  --bg-dark:   rgb(29, 29, 29);
  --bg-form:   rgb(39, 39, 39);
  --bg-light:  #ebebeb;   /* definiert, aber im aktuellen Live-Design ungenutzt */
  --t1:        #ffffff;
  --t2:        rgb(178, 178, 178);
  --t3:        rgba(255, 255, 255, 0.45);
  --t-dim:     rgba(255, 255, 255, 0.50);
  --b:         rgba(255, 255, 255, 0.08);
  --ui-float:  rgba(36, 36, 36, 0.50);
  --blur-ui:   46.23px;
  --r-card:    15.41px;
  --r-btn:     7.705px;
  --r-pill:    9.246px;
  --ease:      cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```
> Hinweis: `tailwind.config.ts` definiert zusätzlich `base/surface/card/raised/accent` (Indigo-Palette) — dies ist ein Rest aus einer früheren Design-Iteration und wird in keiner aktuellen Komponente referenziert. Für neue Arbeit gilt ausschließlich die Schwarz/Weiß-Palette oben.

---

## 3. TYPOGRAFIE

### Fonts (Next/Font Google, self-hosted via `next/font`)

Definiert in [app/layout.tsx](app/layout.tsx):

| Font | Google-Family | Geladene Weights | CSS-Variable | Rolle |
|---|---|---|---|---|
| **DM Sans** | `DM_Sans` | 300, 400, 500, 700 | `--font-dm-sans` | **Display/Headline-Font** — alle H1/H2/H3, große Zahlen, Hero-"S"-Lettering |
| **Host Grotesk** | `Host_Grotesk` | 400 | `--font-hg` | **Body/UI-Font** — Fließtext, Navigation, Buttons, Labels, uppercase-Meta/Breadcrumbs (Standard-Fallback für `body`) |

> **Es gibt nur zwei Fonts im System.** IBM Plex Mono war früher eingebunden (u. a. für uppercase Meta-Labels/Breadcrumbs auf den Legal- und Leistungsseiten), wurde aber vollständig entfernt — Font-Import in `layout.tsx`, `mono`-Key in `tailwind.config.ts`, alle `font-mono`-Klassen im Code sowie die Erwähnung in der Datenschutzerklärung sind entfernt/ersetzt. **Keine Monospace-Schrift irgendwo verwenden** — auch nicht für Codeblöcke, IDs, technische Werte o. Ä.; dort gilt weiterhin Host Grotesk (`font-hg`).

Tailwind-Mapping ([tailwind.config.ts](tailwind.config.ts)):
```js
fontFamily: {
  sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
  hg:   ['var(--font-hg)', 'Host Grotesk', 'sans-serif'],
  ui:   ['var(--font-hg)', 'Host Grotesk', 'sans-serif'],
}
```
`body` (globals.css) setzt global `font-family: var(--font-hg), 'Host Grotesk', sans-serif` — **Host Grotesk ist die Basis-Schrift der gesamten Seite**, DM Sans wird gezielt inline für Headlines injiziert (`fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif'`).

### Font-Rollen im Detail (inkl. HERO)

**Hero-Headline (`H1`, größte Text-Instanz der Seite):**
```css
font-family: var(--font-dm-sans), DM Sans, sans-serif;
font-size: var(--fs-hero);     /* clamp(36px, 3vw, 56px) — Mobile: clamp(28px, 8vw, 44px) */
font-weight: 400;
line-height: 1.2;
```
Zweifarbig in einer Zeile: erste Hälfte `#ffffff` (Kernaussage), zweite Hälfte `rgba(255,255,255,0.40)` (Erweiterung/Versprechen) — identisches Muster wie bei allen Section-Headlines.

**Hero-Deko-Lettering (riesiges "S", `Hero3DLetter` / `MobileHeroLetter`):**
```css
font-family: var(--font-dm-sans), DM Sans, sans-serif;
font-size: clamp(22rem, 54vw, 68rem);   /* Desktop */  /* Mobile: clamp(15rem, 62vw, 26rem) */
font-weight: 400;
color: rgba(255,255,255,0);              /* nur Kontur sichtbar */
-webkit-text-stroke: 2px rgba(255,255,255,0.38);  /* Mobile: 1.5px, 0.16 */
letter-spacing: -0.06em;
line-height: 0.85;
```
Mehrschichtiger `text-shadow` (6 versetzte weiße Halbtransparenz-Layer + weicher Glow) erzeugt einen pseudo-3D-Extrusionseffekt. Reagiert per `requestAnimationFrame`-Lerp auf Mausbewegung (Tilt via `perspective/rotateX/rotateY`) und hat eine sanfte Bounce-Loop (`y: [0,-28,0]`, 5.5s). Dasselbe Lettering-Prinzip (ohne Maus-Tilt) erscheint als **"SLIDE"-Ghost-Wordmark im Footer**, dort mit Hover-Glow-Effekt.

**Eyebrow / Section-Label** (immer vor jeder Section-Headline):
```css
font-family: var(--font-hg), sans-serif;
font-size: 12–15.41px;   /* variiert leicht je Section */
font-weight: 400;
text-transform: uppercase;
color: rgba(255,255,255,0.55) / rgb(178,178,178);
letter-spacing: 0.06em (teils 0.04–0.08em);
```

**Section-Headlines (H2):**
```css
font-family: var(--font-dm-sans), DM Sans, sans-serif;
font-size: var(--fs-section);   /* clamp(30px, 3vw, 52px) — Mobile: clamp(26px, 7vw, 44px) */
font-weight: 400;
line-height: 1.2–1.25;
```
Contact-Headline ist ein Sonderfall — extra groß: `clamp(42px, 6vw, 88px)`, `line-height: 0.98`, `letter-spacing: -0.03em`.

**Body-Text (Bio, Beschreibungen):**
```css
font-family: var(--font-hg) (body-default, kein explizites override);
font-size: 15.41px;
font-weight: 400;
line-height: 1.75;
color: rgb(178,178,178);
```

**Meta/Label-Text (Stats, Kontakt-Labels):**
```css
font-size: 11–12px;
text-transform: uppercase;
letter-spacing: 0.06–0.08em;
color: rgba(255,255,255,0.55);
```

### Typografie-Prinzipien
- **Fast ausschließlich `font-weight: 400`** — Ausnahmen: Service-Card-Titel nutzen `300` (leichter als Standard, nicht schwerer).
- **Kein Bold irgendwo im UI-Text.** Hierarchie = Größe + Opazität, nie Gewicht.
- **Zweifarbige Headlines** als durchgängiges Muster: weiß (Kernaussage) + `rgba(255,255,255,0.40–0.55)` (Ergänzung), in derselben Zeile/demselben Block.
- **Negative Letter-Spacing** (`-0.01em` bis `-0.06em`) auf großen Display-Elementen (Card-Titel, Contact-Headline, "S"-Lettering) — macht große DM-Sans-Schrift kompakter/moderner.
- **Uppercase + positives Letter-Spacing** ausschließlich für Labels/Eyebrows/Meta, nie für Fließtext.

---

## 4. HERO-SECTION IM DETAIL

Datei: [app/page.tsx](app/page.tsx) — `HeroSection()`, Zeilen 164–250.

### Layout
- `min-height: 100svh`, Content **unten links ausgerichtet** (Desktop: `justify-content: flex-end`), auf Mobile vertikal zentriert.
- Hintergrund: reines `#000` + `.grain`-Klasse (SVG-Fractal-Noise-Overlay, `opacity: 0.03`, `background-size: 200px`, additiv über `::after`).
- Padding: `0 max(5vw, 1.25rem) max(8vw, 3rem)` (Desktop) / `max(24vh,7rem) max(5vw,1.25rem) max(20vh,7rem)` (Mobile).

### Ebenen (von hinten nach vorne)
1. **Grain-Textur** (ganzflächig, sehr subtil)
2. **Riesiges "S"-Konturlettering** — rechts positioniert (`right: -6vw`, `top: 50%`), reagiert auf Mauszeiger, Mobile-Variante zentriert oben
3. **Zwei radiale Glow-Orbs** — `radial-gradient(circle, rgba(255,255,255,0.05→0.015), transparent)`, `blur(52px)`/`blur(38px)`, parallaxen leicht unterschiedlich schnell beim Scrollen (`useTransform(scrollYProgress, [0,1], ['0%','35%'/'20%'])`)
4. **Feines Grid-Liniennetz** — je 3 horizontale/vertikale 1px-Linien bei 20/45/70% bzw. 25/50/75%, `rgba(255,255,255,0.016–0.022)` — kaum wahrnehmbar, gibt Tiefe
5. **Content** (Headline, CTAs) — parallaxt gegenläufig zum Scroll (`yContent: 0%→22%`) und fadet aus (`heroOpacity: 1→0` über die ersten 60% Scrollstrecke)

### Content-Struktur
```
[H1 — zweifarbig, DM Sans 400]
  "{line1} " (weiß)  "{line2}" (rgba(255,255,255,0.40))
[CTA-Reihe]
  Primär: btn-cta btn-cta-hero → "/kontakt", weiß gefüllt, Pfeil-Icon (SVG, kein Font-Icon)
  Sekundär: btn-dark (transluzent, rgba(255,255,255,0.06) + blur(16px)) → "/ablauf"
[Scroll-Indikator]
  fixed unten zentriert: "SCROLL" (10px, uppercase, 0.14em tracking) + animierter "↓"-Pfeil (y-Loop, 1.8s, delay 2.8s)
```

### Bewegungs-Choreografie beim Laden (Entrance)
1. H1 fadet/slided rein: `opacity 0→1, y 56→0`, `duration 1.1s`, `delay 0.18s`, Easing `cubic-bezier(0.25,0.46,0.45,0.94)`
2. CTA-Reihe: `opacity 0→1, y 16→0`, `duration 0.85s`, `delay 0.42s`
3. Scroll-Indikator: erscheint zuletzt, `delay 1.6s`, `duration 1.1s`
4. "S"-Lettering: kontinuierlicher Bounce (`y: 0→-28→0`, 5.5s Loop) + Maus-Tilt-Lerp (unabhängig von Scroll-Choreografie, läuft dauerhaft)

### CTA-Button-Stil im Hero (`.btn-cta.btn-cta-hero`)
```css
background: #ffffff;
color: #000;
border-radius: 10px;
padding: 17px 26px 17px 30px;
font-size: clamp(15.41px, 1.4vw, 18px);
font-weight: 500;
box-shadow: 0 10px 40px rgba(255,255,255,0.22);
/* Hover: box-shadow 0 12px 52px rgba(255,255,255,0.34) */
```
Einziger Ort auf der Seite mit `font-weight: 500` statt 400 — markiert bewusst die wichtigste Handlung der Seite.

---

## 5. NAVIGATION

Datei: [components/Navbar.tsx](components/Navbar.tsx)

### Aufbau — drei schwebende Pills, kein durchgehender Balken
```
[Logo-Pill]   [Nav-Center-Pill: Leistungen▾ · Referenzen · Über uns · Ablauf · Kontakt]   [Sprache | Login | Kontakt-Icon | Hamburger]
```
Alle Pills teilen dasselbe `PILL`-Objekt:
```css
background: rgba(36, 36, 36, 0.50);
backdrop-filter: blur(46.23px);
border-radius: 15.41px;
```
`position: fixed`, `top: calc(env(safe-area-inset-top,0) + max(1vw,12px))`, `z-index: 99`.

### Details
- **Logo**: PNG (`/img/logo.png`), `height: 26px`, in eigener Pill mit `padding: 8px 14px`.
- **Nav-Links** (`.nav-item`): `rgba(255,255,255,0.62)` → Hover `#fff` + `rgba(255,255,255,0.06)`-Hintergrund, `15.41px`, kein Underline.
- **"Leistungen"-Flyout**: Hover öffnet Dropdown (`rgba(16,16,16,0.88)`, `blur(52px)`, `border-radius: 16px`, `1px solid rgba(255,255,255,0.07)`), 3 Service-Zeilen mit eigenen Pixel-Grid-SVG-Icons (`PixelWeb`/`PixelSocial`/`PixelMail` — 4×4px abgerundete Rechtecke in Mustern, erinnern an Dot-Matrix-Displays).
- **Sprachumschalter** (DE/EN): Pill-in-Pill, aktiver State `rgba(255,255,255,0.14)` + `#fff`, inaktiv transparent + `rgba(255,255,255,0.42)`.
- **Login-Link** → externes Dashboard (`dashboard.slideagentur.ch`), gleicher Pill-Stil wie Kontakt-Icon-Button.
- **Hamburger (Mobile)**: 3 Linien à `1.5px`, morpht per CSS-Transform zu "X".
- **Mobile-Dropdown**: volle Breite (`left/right: 5vw`), `rgba(18,18,18,0.96)` + `blur(46px)`, staggerte Link-Einblendung (`delay: i*0.04s`).

---

## 6. SEITENSTRUKTUR (Startseite)

Reihenfolge in [app/page.tsx](app/page.tsx) `HomePage()`:

```
HERO                 → #000, 100svh, Grain + 3D-"S" + Orbs
SERVICES             → #0a0a0a, 3-Card-Grid mit 3D-Tilt-Hover
REFERENCES           → rgb(18,18,18)→rgb(11,11,11) (scroll-interpoliert), Pinned-Horizontal-Slider
PROCESS              → #000, horizontale Drag-Timeline
TESTIMONIALS         → rgb(11,11,11) außen / rgb(6,6,6) innen, sticky Intro + Scroll-Stack
ABOUT (Founder)       → #000, Foto + Bio + Scroll-Count-up-Stats
CONTACT              → #000, Formular + Kontakt-Infoliste
[Floating "Start a Project"-Button — erscheint nach 85% Viewport-Scroll]
[Scroll-to-Top — erscheint nach 600px Scroll]
FOOTER (global)       → #000, riesige "SLIDE"-Ghost-Wordmark mit Hover-Glow
```

### Spacing-System
- Horizontales Section-Padding: `max(5vw, 1.25rem)`
- Vertikales Section-Padding: `max(10vw, 3.5rem)` (große Sections) / `max(7vw, 3rem)` (kompaktere wie References/Testimonials)
- Card-/Panel-Radien: `14–20px` (nie exakt einheitlich, aber immer in diesem Band) plus die feineren `--r-*`-Tokens (`15.41px`, `7.705px`, `9.246px`) für UI-Chrome
- Konsequent responsive über `clamp()` und `vw`/`vh`, kaum feste Pixelwerte auf Layout-Ebene

---

## 7. KOMPONENTEN-GUIDE

### 7.1 Services (`ServicesSection` / `ServiceCard`)
- Grid: `repeat(auto-fit, minmax(min(300px,100%), 1fr))`, 3 Karten, Seitenverhältnis `3/4`.
- Hintergrundbild pro Karte, `border-radius: 20px`, `perspective: 1200px` + Framer-`useSpring`-Tilt (Maus-getrieben, `rotateX/Y` 8°/-8°, `stiffness: 180, damping: 26`).
- Hover: Bild blurred (`11px`) + abgedunkelt (`brightness(0.6)`), permanenter Gradient-Overlay (`linear-gradient(165deg, rgba(0,0,0,0.15)→rgba(0,0,0,0.52))`), zusätzlicher Cursor-getriebener radialer Shimmer (`rgba(255,255,255,0.11)`).
- Feature-Pills erscheinen nur bei Hover/Tap: `rgba(255,255,255,0.13)` + `blur(16px)` + `1px solid rgba(255,255,255,0.2)`, `border-radius: 100px`.
- Titel: DM Sans, `clamp(21px,2.2vw,28px)`, `font-weight: 300` (einzige Stelle mit Light-Gewicht).
- Bottom-Row: eigenes 3×3-Pixel-Dot-Icon (`GridDotsIcon`) + "Mehr"-Link, der erst bei Hover einblendet.

### 7.2 References (`ReferencesPinnedSlider`)
- Bildkarten: `rgb(29,29,29)`, `border-radius: 14px`.
- Äußerer Wrapper: `border-radius: clamp(20px,3vw,32px)`.
- Sektionshintergrund interpoliert live zwischen zwei Grautönen abhängig von Scroll-Fortschritt.

### 7.3 Process (`ProcessTimeline`)
- Horizontale Drag-Timeline: 2px-Fortschrittslinie (`rgba(255,255,255,0.1)` Basis, `rgba(255,255,255,0.55)` Fill), 9px runde Step-Dots.
- Step-Cards: `rgb(10,10,10)`, `padding: clamp(1.5rem,4vw,3rem)`, variabler `border-radius`.

### 7.4 Testimonials (`TestimonialsStack`)
- Äußerer Rahmen: `rgb(6,6,6)`, `1px solid rgba(255,255,255,0.06)`, `border-radius: clamp(20px,3vw,32px)`, weicher radialer Glow oben (`rgba(120,120,140,0.14)`, `blur(70px)`).
- Layout: linke Spalte `position: sticky` (Intro + CTA), rechte Spalte Scroll-scrubbed Card-Stack.
- Einzelkarte: `border-radius: 20px`, rundes Avatar-Placeholder `44×44px`, `rgba(255,255,255,0.08)`.

### 7.5 About / Founder (`AboutSection`)
- Zweispaltig: Foto (`aspect-ratio 4/5`, `border-radius 20px`, `rgb(16,16,16)`-Platzhalter, `1px solid rgba(255,255,255,0.08)`, Bottom-Gradient für Tiefe) + editorialer Bio-Block.
- Zitat-Callout: `border-left: 2px solid rgba(255,255,255,0.35)`, `padding-left: 1.25rem`.
- Stats zählen erst hoch, wenn die Section durchgescrollt wird (`ScrollCountUp`, kein Timer-Trigger).

### 7.6 Contact (`ConversationalContactForm`)
- Container: `rgb(39,39,39)`, `border-radius: 20px`.
- Erfolgs-Icon: rundes `44px`-Badge, `rgba(255,255,255,0.06)`.
- Einzige Farb-Ausnahme im ganzen System: Fehlertext `#f87171` (Tailwind `red-400`).
- Kontakt-Infoliste rechts: `sticky`, Zeilen getrennt durch `1px solid rgba(255,255,255,0.08)`.

### 7.7 Footer
- `#000`, oberer Grid-Bereich (Brand + 3 Linkspalten + Social) getrennt durch `1px solid rgba(255,255,255,0.08)`.
- **Ghost-Wordmark "SLIDE"**: gleiche Stroke-Technik wie das Hero-"S", aber ohne Maus-Tilt — stattdessen Hover-State mit `drop-shadow`-Glow und `brightness(3.8)`.
- Social-Icons (Instagram, TikTok) als Inline-SVG, `14–15px`.

### 7.8 Cookie-Banner
- Gleicher Glass-Stil wie Navbar: `blur(28px)`, `border-radius: 15.41px`, `rgba(...)`-Buttons mit `8px`-Radius für Accept/Decline.

### 7.9 Loading-Screen
- Vollflächig `#000`, `z-index: 9999`, zeigt nur das Logo (`/img/logo.png`, `height: 152px`), fadet über `opacity [0,1,1,0]` in 1.8s ein/aus (Timing `[0, 0.22, 0.72, 1]`), dann `exit`-Fade der ganzen Ebene.

### 7.10 Custom Cursor
- Ersetzt den System-Cursor komplett auf Nicht-Touch-Geräten (`document.body.style.cursor = 'none'`).
- **Dot**: `5px`, `#fff`, `mix-blend-mode: difference`, folgt der Maus 1:1 ohne Lag.
- **Ring**: `24px` (Hover: `40px`), `1px solid rgba(255,255,255,0.5)` (Hover: `0.7`), folgt per `requestAnimationFrame`-Lerp (`14%`/Frame) — bewusst nachziehend.
- Bei Hover über `a, button, [role=button], input, textarea, select, label`: Dot verschwindet, Ring vergrößert sich und wird deutlicher.

---

## 8. BUTTONS & CTAs

Vier definierte Klassen in [app/globals.css](app/globals.css):

**`.btn-cta`** — Primär, weiß gefüllt
```css
background: #ffffff; color: #000;
border-radius: 7.705px;
padding: 12px 17px 12px 23px;
font-weight: 500;
box-shadow: 0 6px 24px rgba(255,255,255,0.16);
/* Hover: box-shadow 0 8px 34px rgba(255,255,255,0.28), translateY(-1px) */
```

**`.btn-cta-hero`** — Modifier für den Hero-CTA (größer, stärkerer Schatten) — siehe Abschnitt 4.

**`.btn-dark`** — Solid Dark, Section-CTAs
```css
background: rgb(28,28,28); color: #fff;
border-radius: 15.41px;
padding: 14px 28px;
font-weight: 400;
/* Hover: opacity 0.7 */
```

**`.btn-float`** — Glassmorphism-Pill (Navbar-verwandt), für "Alle Leistungen"/"Ablauf ansehen"/Floating-FAB
```css
background: rgba(36,36,36,0.50);
backdrop-filter: blur(46.23px);
border-radius: 15.41px;
padding: 10px 20px 10px 26px;
/* Hover: opacity 0.78 */
```

### Gemeinsame Regeln
- **Arrow-Icon** (SVG, `M5 12h14M13 6l6 6-6 6`, `strokeWidth 2–2.2`) statt Unicode-Pfeil oder Icon-Font — konsistent bei allen CTAs mit "weiterführender" Handlung.
- **Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` für praktisch alle Transitions/Framer-Motion-Tweens im System — der zentrale "Signature-Ease" der Seite.
- Mobile: alle drei Button-Typen werden `width: 100%`, `justify-content: center`.

---

## 9. ANIMATION & MOTION-SYSTEM

Bibliothek: **Framer Motion** (nicht GSAP). Zentrale Muster:

| Muster | Implementierung | Wo |
|---|---|---|
| **Scroll-Reveal** | `useInView(ref, { once: true })` + `initial:{opacity:0,y:56} → animate:{opacity:1,y:0}`, `duration: 1.1s` | `FadeUp`-Helper, überall wiederverwendet |
| **Parallax** | `useScroll({target, offset})` + `useTransform` auf `y`/`opacity` | Hero (Content, 2 Orbs), About (Foto), References/Services (Header) |
| **3D-Tilt** | Maus-Position → `useMotionValue` → `useSpring(useTransform(...))` auf `rotateX/rotateY` | Service-Cards |
| **Lerp-Loop (rAF, kein Framer)** | Eigener `requestAnimationFrame`-Loop mit manuellem Lerp-Faktor (`0.12–0.14`) | Hero-"S"-Tilt, Custom Cursor (Dot + Ring) |
| **Staggered Entrance** | `delay: i * 0.04–0.14s` pro Listenelement | Nav-Dropdown-Items, Service-Cards, Mobile-Menü |
| **Scroll-Scrub Stack** | Scroll-Fortschritt steuert Karten-Stapel-Position direkt (kein Zeit-Trigger) | `TestimonialsStack` |
| **Count-Up on Scroll** | Zahl läuft hoch, getriggert durch `scrollYProgress`-Range, nicht durch Timer | `ScrollCountUp` (About-Stats) |
| **Marquee** | reine CSS-`@keyframes`-Loop, `30s linear infinite`, `translateX(0→-50%)` | `.marquee-track` (aktuell in Basis-Styles vorhanden) |
| **Ambient Loop** | endlose `y`-Bounce-Animation, mehrere Sekunden Dauer, eigene Easing-Kurve `[0.37,0,0.63,1]` | Hero-"S" (5.5s), Mobile-"S" (6s), Scroll-Pfeil (1.8s) |

**Globale Signature-Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — wird sowohl in CSS-Transitions als auch in praktisch jedem Framer-`transition`-Objekt verwendet. Zweite, seltenere Kurve `[0.37, 0, 0.63, 1]` ausschließlich für ambiente Loop-Bewegungen (fühlt sich organischer/schwebender an als die Standardkurve).

**Grundprinzip:** Nichts poppt abrupt auf. Jedes Element hat einen `opacity`+`y`-Entrance, jede Zahl zählt hoch statt zu erscheinen, jede Hover-Interaktion hat einen weichen Übergang (nie `transition: none`).

---

## 10. RESPONSIVE-VERHALTEN

- **Mobile-Breakpoint**: `639px` (siehe `@media (max-width: 639px)` in globals.css) sowie Tailwind `lg:` (`1024px`) für die Desktop-Navigation.
- `--fs-hero`/`--fs-section` werden auf Mobile über eigene `clamp()`-Werte neu definiert (kleinerer Min-Wert, höherer vw-Faktor).
- Ghost-Wordmark (Footer) schrumpft massiv auf Mobile (`clamp(3.5rem,20vw,7rem)` statt `clamp(8rem,18vw,22rem)`).
- Formulare wechseln von 2-spaltig (`.form-2col`) zu 1-spaltig.
- Buttons werden auf Mobile volle Breite, zentriert.
- Custom Cursor deaktiviert sich selbst auf Touch-Geräten (`ontouchstart` / `maxTouchPoints` Check).
- `useIsMobile()`-Hook schaltet zusätzlich JS-seitig aufwendige Interaktionen ab (z. B. 3D-Tilt auf Service-Cards wird zu Tap-Toggle).

---

## 11. TECHNISCHES SETUP

- **Framework**: Next.js (App Router) + React, TypeScript
- **Styling**: Tailwind CSS (Utility-Layer) kombiniert mit **Inline-Style-Objects** für alle designintensiven/animierten Komponenten (bewusster Stilbruch: Tailwind für Layout-Utilities, Inline-Styles für alles, was Framer Motion animiert)
- **Motion**: Framer Motion (`motion`, `useScroll`, `useTransform`, `useSpring`, `useMotionValue`, `AnimatePresence`)
- **Fonts**: `next/font/google` (DM Sans, Host Grotesk — nur diese zwei) — self-hosted durch Next.js, kein externer Font-CDN-Request
- **i18n**: eigener `LanguageContext` (DE/EN) — sämtliche Copy kommt aus `lib/i18n.ts`, nicht hartcodiert in Komponenten
- **Bilder**: `next/image`

---

## 12. WORTWAHL & TONE OF VOICE

- **Zielgruppe**: Schweizer KMU (Bern-Fokus), Ansprache in `de-CH`.
- Eyebrow-Labels konsequent in **ALL CAPS**, kurz, ohne Satzzeichen (z. B. Section-Kicker vor jeder H2).
- Zweifarbige Headline-Formel überall: **Kernaussage weiß, Erweiterung/Versprechen gedimmt** — in genau einer Zeile/einem Block.
- CTAs sind Imperativ + kurz ("Kontakt", "Projekt starten" o.ä. je nach Sprache) statt vager Linktexte wie "Mehr erfahren".
- Persönliche, gründergeführte Tonalität in der About-Section (Ich-/Wir-Perspektive, Foto + Zitat statt anonymer Agentur-Beschreibung).

---

## 13. QUICK-REFERENCE — DESIGN-REGELN FÜR NEUE KOMPONENTEN

Damit neue Sections/Komponenten stilistisch nicht auffallen:

1. Hintergrund: `#000` als Standard; nur wechseln, wenn eine Section sich bewusst abheben soll (`#0a0a0a`, `rgb(6–29,…)`-Bereich) — nie außerhalb der Schwarz-Skala.
2. Text-Hierarchie über `rgba(255,255,255,X)`, niemals über neue Farben. Eyebrow = `0.55`, Body = `rgb(178,178,178)`, Primär = `#fff`.
3. Headline = DM Sans 400, zweifarbig, in einer Zeile. Body/UI = Host Grotesk 400 (Standard, kein Override nötig).
4. Kein `font-weight` über 500; 500 ist reserviert für den einen Haupt-CTA pro View.
5. Border-Radius im Band 14–20px für Cards/Panels, `7.7px/9.25px/15.41px` für UI-Chrome (Buttons, Pills, Nav).
6. Jedes neue Element bekommt einen Scroll-Entrance (`opacity 0→1, y 56→0`, `1.1s`, Easing `cubic-bezier(0.25,0.46,0.45,0.94)`) — kein hartes Erscheinen.
7. Schwebende UI (Badges, Sticky-Bars, Dropdowns) = Glass-Pattern: `rgba(36,36,36,0.5)` + `backdrop-filter: blur(~46px)` + `border-radius: 15.41px`.
8. Farbe nur einsetzen, wenn semantisch nötig (aktuell einzige Ausnahme: Formular-Fehler in Rot `#f87171`). Keine neue Akzentfarbe ohne expliziten Grund einführen.
9. Arrow-Icon in weiterführenden CTAs immer als Inline-SVG (`M5 12h14M13 6l6 6-6 6`), nicht als Unicode-Pfeil.
10. Spacing in `vw`/`clamp()`, nicht in festen Pixelwerten — die Seite muss von Mobile bis Ultra-Wide proportional bleiben.
