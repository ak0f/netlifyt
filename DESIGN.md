# DESIGN.md — Lesse Studio Website Design System
> Vollständige Analyse von lessestudio.com für 1:1-Übertragung auf eine andere Brand.

---

## 1. GESAMTKONZEPT & PHILOSOPHIE

### Visuelles Leitmotiv
**Dark-first, Editorial, Minimalistisch-Luxuriös.** Die Website wirkt wie ein hochpreisiges Designstudio aus Mailand: extrem wenig Farbe, viel schwarze Fläche, großzügiges Whitespace, langsame cinematische Scroll-Bewegungen. Kein Spektakel — die Qualität des Portfolios spricht für sich.

### Design-Paradigma
- **Dark Theme als Standard** (nicht als Option). Alles ist auf schwarzem Hintergrund.
- **Kein Grid-Denken** im klassischen Sinne — stattdessen: large-canvas, asymmetrische Komposition, die am Desktop-Viewport ausgerichtet ist.
- **Bewegung > Statik**: Fast jedes Element hat eine Scroll-Animation (fade-in, slide-up, parallax). Die Seite "erwacht" beim Scrollen.
- **Kontrast durch Typografie**, nicht durch Farbe. Fett vs. dünn, groß vs. klein, weiß vs. grau.
- **Sektions-Theming**: Bestimmte Sektionen (Services-Scroller) wechseln per JavaScript beim Scrollen ins Helle (near-white/light-grey), bevor die Seite wieder schwarz wird. Dieser Wechsel erzeugt visuellen Rhythmus.

---

## 2. FARBPALETTE

### Primäre Farben (Core)

| Token | Hex / RGB | Verwendung |
|---|---|---|
| `--bg-primary` | `#000000` | Haupt-Hintergrund, Hero, Footer |
| White | `#FFFFFF` | Primärer Text, Headlines |
| Off-Black | `rgb(16, 16, 16)` / `rgb(15, 15, 15)` | Dunkle Cards, Testimonials-Hintergrund |
| Dark Panel | `rgb(29, 29, 29)` | Portfolio-Cards (dunkle Variante) |
| Deep Grey | `rgb(39, 39, 39)` | Form-Container, Input-Hintergrund |

### Sekundäre / UI-Farben

| Token | Hex / RGBA | Verwendung |
|---|---|---|
| `--text-secondary` | `#999999` | Muted Text, Subtitles |
| Grey muted | `rgb(112, 112, 112)` | Eyebrow-Labels ("FULL-SERVICE AGENCY"), Nav-Hover |
| Grey light | `rgb(162, 162, 162)` | Sub-Labels, Footer Links |
| Dimmed text | `rgba(255,255,255,0.5)` | Hero-Sekundärtext ("We deliver hollistic...") |
| Nav / Floating UI | `rgba(36, 36, 36, 0.50)` | Alle schwebenden UI-Elemente (Navbar, floating button) |
| Pill-Tag BG | `rgba(34, 34, 34, 0.40)` | Service-Tags in Cards |
| Light tag | `rgba(223, 223, 223, 0.80)` / `#dfdfdf` | Approach-Section Value-Pills (helle Variante) |
| CTA Button (Hero) | `rgba(255, 255, 255, 0.70)` | "Start a Project" Knopf im Hero (weißlich-transparent) |

### Sektions-Hintergrund (Scroll-basierter Wechsel)
Die Services-Scroller-Sektion wechselt beim Scrollen **von schwarz zu einem hellen Off-White/Light-Grey** (circa `rgb(235–242, 235–242, 235–242)` — das exakte Theme-Color-Switching passiert per JS auf `document.body` oder einem Wrapper-Element). Die restliche Seite ist durchgehend schwarz/near-black.

---

## 3. TYPOGRAFIE

### Custom Fonts (Self-hosted, kein Google Fonts)

| Font-Familie | Datei | Weights | Verwendung |
|---|---|---|---|
| **DM Sans** | `DMSans.ttf` | 500 (Medium) | **Haupt-Headline-Font** — alle großen Überschriften |
| **Host Grotesk** | `HostGrotesk.ttf` | 100–900 (Variable) | Body, Navigation, Labels, Body Copy |
| **La Cerchia** | `LaCerchia.otf` | 400 (Regular) | Akzentfont — wahrscheinlich für Footer-Wordmark oder Ziertext |

> **Wichtig für die Brand-Übertragung**: Die Kombination aus einem serifenlosen Geometric-Font (DM Sans) für Headlines und einem Humanist Grotesque (Host Grotesk) für Fließtext ist das typografische Rückgrat. DM Sans wirkt modern, offen und tech-affin; Host Grotesk gibt Wärme und Lesbarkeit.

### CSS Font-Stack
```css
/* Headlines */
font-family: 'DMSans', sans-serif;

/* Body / UI / Navigation */
font-family: 'HostGrotesk', sans-serif;

/* Fallback (Tailwind default) */
font-family: ui-sans-serif, system-ui, sans-serif;
```

### Typografie-Skala (computed, 1541px Viewport)

| Rolle | px | Äquivalent (vw) | Font | Weight | Line-Height |
|---|---|---|---|---|---|
| **Hero Headline** | `46.23px` | ~3vw | DM Sans | 400 | 69.35px (1.5×) |
| **Section Headline** (groß) | `29.28px` | ~1.9vw | DM Sans | 400 | 30.82px |
| **Section Headline** (mittel) | `23.12px` | ~1.5vw | Host Grotesk | 400 | — |
| **Eyebrow / Label** | `15.41px` | ~1vw | System / HG | 400 | 23.12px |
| **Body / Nav** | `15.41px` / `16px` | — | Host Grotesk | 400 | 24px |
| **Small / Meta** | `12–13.87px` | — | Host Grotesk | 400 | — |

### Typografie-Verhalten
- **Letter-Spacing**: Normal (kein unnatürliches Tracking). Ausnahme: Eyebrow-Labels haben `text-transform: uppercase` ohne extra Letter-Spacing.
- **Font-Weight**: **Nur 400 (Regular)** und gelegentlich 100 (Thin) — kein Bold, kein Semi-Bold. Die Stärke kommt ausschließlich aus der Schriftgröße, nicht dem Gewicht.
- **Line-Height Hero**: 1.5× — sehr luftig.
- **Italic**: Nicht verwendet.

---

## 4. NAVIGATION

### Aufbau
Drei separate schwebende Elemente — kein klassischer Navbar-Balken über die gesamte Breite:
[Logo-Pill]    [Nav-Center-Pill: Services | Portfolio | About | Insights | Contact]    [Grid-Icon-Pill]

### Stil-Details
```css
/* Alle drei Nav-Elemente */
background: rgba(36, 36, 36, 0.50);
border-radius: 15.41px;          /* ~1vw */
backdrop-filter: blur(46.23px);  /* Starker Glasmorphismus-Effekt */
padding: 7.7px;                  /* innen */
position: fixed;
top: 1vw;
```

- **Logo**: Weißes "S"-Monogramm in einem dunklen, leicht transparenten gerundeten Quadrat (Pixel-Art/Dot-Grid Stil)
- **Nav-Links**: Schlichte weiße Texte, kein Underline, kein Background im Default-Zustand, `font-size: 15.41px`
- **Rechts**: Ein pixeliges Grid-Icon (Dot-Matrix Stil) — dient als Menü-Trigger oder Stilmittel
- **Floating "Start a project" Button** (links-unten schwebend, `position: fixed`):
```css
  background: rgba(36, 36, 36, 0.50);
  border-radius: 15.41px;
  color: white;
  padding: 0px 23px 0px 31px;
  backdrop-filter: blur(46px);
```
- Die Navbar ist **vollständig transparent** zur Seite (kein harter Balken) und schwebt über dem Content.

---

## 5. SEITENSTRUKTUR (Page Architecture)

### Sektionsreihenfolge & Backgrounds

HERO                    → bg: #000000 (solid black), 90vh height
SERVICES SCROLLER       → bg: theme-switch to light grey (~#EBEBEB) via JS
APPROACH & VALUES       → bg: zurück zu schwarz/transparent
LATEST WORK             → bg: #000 (near-black), portfolio cards dunkel
TESTIMONIALS            → bg: dark (rgb(16,16,16) cards)
LATEST NEWS             → bg: dark, cards mit bild
CONTACT FORM            → bg: dark (rgb(39,39,39) Container)
FOOTER                  → bg: #000, riesiges LESSE Wortmarke im BG


### Abstände / Spacing-System
- Horizontaler Padding: `px-5` (mobile) / `px-[5vw]` (desktop) → ~77px bei 1541px Breite
- Vertikaler Sektions-Abstand: `mt-[8vw]` / `mt-[10vw]` — alles relativ zum Viewport, sehr großzügig
- Alle Abstände sind konsequent in `vw`-Einheiten — skaliert perfekt auf alle Screen-Größen

---

## 6. KOMPONENTEN-GUIDE

### 6.1 Hero Section
Layout: Left-aligned, unterer Bildschirmbereich
Hintergrund: Schwarz, mit 3D-Objekt/Render im Hintergrund (weißes, abstraktes Objekt schwebt)
Struktur:
[Eyebrow Label]     "FULL-SERVICE AGENCY"
→ uppercase, rgb(112,112,112), 15.41px, System font
[Hero Headline H2]  "Lesse is a design and technology studio based in Italy."
→ DM Sans, 46.23px, weight 400, white (#fff)
→ Zweite Hälfte ("We deliver hollistic...") in rgba(255,255,255,0.5)
→ Beide Hälften in derselben Zeile/Block, kein separates Element
[CTA Button]        "Start a Project →"  (rechts unten, fixed position)
→ bg: rgba(255,255,255,0.7), color: black
→ border-radius: 7.7px, padding: 12px 17px 12px 23px
[Scroll Indicator]  "Scroll ∨" — zentriert unten, muted grau

### 6.2 Services Section (Horizontal Scroller)
Layout: Horizontaler Karten-Scroller (Overflow-X oder Marquee-Scroll)
Hintergrund: HELL (Light-Grey, ~#EBEBEB) — durch Scroll-Trigger
Karten-Stil:
border-radius: 15.41px
overflow: hidden
padding: 18.5px
Hintergrundbild: Produktfoto/Mockup (greyscale oder muted colors)
Karten-Header: "[Service Name]   /N services"
→ Service Name: weißer Text, 23px, DM Sans
→ Count: muted grey, gleiche Größe
Hover: Image skaliert via scale-105 und blur(0.8vw) — weich defokussierter Hintergrund
"See More" CTA-Tag:
bg: rgba(34,34,34,0.4)
border-radius: 9.25px
Farbe: weiß
Abschluss-Button: "Explore All Services"
→ Pill-Button, dark bg, weiße Schrift, border-radius ~15px

### 6.3 Portfolio Cards (Latest Work)
Layout: Volle Breite, stacked (eine nach der anderen, kein Grid)
Hintergrund: Sehr dunkles Schwarz (#0F0F0F / rgb(15,15,15))
Karten-Struktur:
[Großes Projekt-Bild]        → Links, ~45% Breite, border-radius 15px
[Projekt-Info]               → Rechts
- Projektname (groß, DM Sans)
- Beschreibungstext (Host Grotesk, muted weiß, 15.41px)
- Meta-Labels: "Location", "Industry", "Services"
→ Uppercase label + normaler Wert darunter, kleiner Text
Übergang zwischen Karten: großzügiger vertikaler Abstand (~10vw)
Abschluss-Button: "View full portfolio"
→ Pill-Shape, transparent border oder dark bg

### 6.4 Testimonials (Auto-scrollend)
Layout: Horizontaler auto-scrollender Ticker (Marquee, kein User-Control)
Hintergrund: Dark (near-black)
Einzelnes Testimonial:
[Langer Zitat-Text]     → Host Grotesk, 16–18px, weiß, normal weight
[Avatar-Bild]           → Kleines rundes Foto
[Name]                  → Weiß, fett (relativ)
[Titel]                 → Muted grey, kleiner
Inset-Button "Let's work together →"
→ Pill-Form, outline oder semi-transparent
Auto-Scroll: Beide Richtungen (zwei Loops), kein Pause-on-Hover

### 6.5 News / Insights Cards
Layout: 2-3 Cards nebeneinander (Desktop)
Hintergrund: Dunkel
Card-Stil:
border-radius: ~15px
Overflow hidden
[Bild oben] + [Titel + Datum unten]
Text:
Titel: Host Grotesk, 23–29px, weiß
Datum: Muted grey, klein ("April 6")

### 6.6 Contact Form
Hintergrund-Container:
background: rgb(39, 39, 39)  (dunkelgrau)
border-radius: ~20px
Überschrift: "Ready to get started?"
→ DM Sans, sehr groß (~46px), weiß
Sub-Label: "FILL THE FORM TO REQUEST A QUOTE:"
→ Uppercase, klein, muted
Input-Felder:
background: transparent
border: kein sichtbarer Border (nur bottom-border oder Underline-Stil)
color: white
border-radius: 0
padding: 0px 11.5px
Service-Checkboxen:
Pill-shaped Radio-Buttons / Toggle-Buttons
→ Aktiviert: dunkel mit weißem Text
→ Inaktiv: Outline oder muted
Submit-Button "Send Message →":
→ Pill-form, halbdunkler Hintergrund, weiße Schrift
→ Gleicher Stil wie andere CTAs

### 6.7 Footer
Hintergrund: #000000 (solid black)
Layout: 5-spaltig (Desktop), mit Kategorie-Headings + Sub-Links
MEGA-Wortmarke: "LESSE" als riesiger outline/ghosted Text im Hintergrund
→ Sehr große Schrift (~300px), dark-on-dark (nur Kontur sichtbar), kein fill
→ Erzeugt texture im Footer
Oberer Bereich:
"VISUAL AND MARKETING" / "TECHNOLOGY"
→ Uppercase, muted, sehr klein, linke Spalte
Kategorien mit Links:
Heading: z.B. "Brand Strategy ↗"
→ Weiß, Host Grotesk, ~15px
Sub-Links: muted grey, kleiner, ohne Pfeil
Footer-Links (Social):
INSTAGRAM | LINKEDIN | DRIBBLE | MAIL
→ Uppercase, spacig, sehr kleiner muted Text
→ Horizontal nebeneinander ganz unten
Logo: Wiederholt im Footer (kleinere Version)
Shopify Experts Badge: kleines Partner-Badge

---

## 7. BUTTONS & CTAs

### Button-Hierarchie (3 Varianten)

**Variante 1 — Primary Dark (floating/nav)**
```css
background: rgba(36, 36, 36, 0.50);
backdrop-filter: blur(46px);
border-radius: 15.41px;
color: #ffffff;
padding: 0px 23px 0px 31px;
font-size: 15.41px;
font-weight: 400;
```
*Verwendet für: "Start a project" floating CTA, Nav-Container*

**Variante 2 — Primary Light (Hero CTA)**
```css
background: rgba(255, 255, 255, 0.70);
border-radius: 7.705px;
color: #000000;
padding: 12px 17px 12px 23px;
font-size: 15.41px;
font-weight: 400;
```
*Verwendet für: "Start a Project" im Hero (oben rechts)*

**Variante 3 — Solid Dark (Section CTA)**
```css
background: rgb(30–40, 30–40, 30–40);  /* near-black */
border-radius: ~15px;
color: #ffffff;
padding: 14px 28px;
font-size: 15.41px;
font-weight: 400;
```
*Verwendet für: "Explore All Services", "View full portfolio", "Send Message"*

### Arrow-Icon in Buttons
Fast alle Buttons haben ein `→` oder `»` Suffix — diese sind **immer inline mit dem Text**, in gleicher Schriftgröße. Kein Icon-Font, einfaches Unicode oder SVG.

### Button-Interaktion
```css
transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
/* Hover: leichte Scale-Up oder Opacity-Change */
```

---

## 8. ABSTÄNDE & GRID

```css
/* Responsive Spacing via vw-Units */
--section-gap-v: 10vw;       /* Vertikaler Sektions-Abstand */
--section-gap-small: 7–8vw;  /* kleinere Sektionen */
--page-padding-h: 5vw;       /* Horizontaler Seiten-Rand */
--card-padding: 18.5px;      /* Card-Innen-Padding */
--card-radius: 15.41px;      /* ~1vw */

/* Breakpoint */
Mobile: px-5 (20px)
Desktop: px-[5vw] → ~77px at 1541px
```

---

## 9. ANIMATIONEN & TRANSITIONS

### Scroll-Animations (GSAP / IntersectionObserver)
- **Fade-In von unten**: Alle Sektionsüberschriften und Cards erscheinen beim Scrollen (opacity 0→1, translateY 30px→0)
- **Staggered entrance**: Mehrere Elemente erscheinen mit Zeitverzögerung nacheinander
- **Hero 3D-Objekt**: Schwebt leicht, Parallax beim Scrollen
- **Service Cards**: Hover → `scale(1.05)` auf dem Hintergrundbild + `blur(0.8vw)`
- **Sektions-Theme-Switch**: Hintergrundfarbe des Viewports wechselt sanft (schwarz→hell→schwarz) via Scroll-Trigger

### Globale Transition-Easing
```css
cubic-bezier(0.25, 0.46, 0.45, 0.94)  /* "easeOutQuad" — flüssig, nicht zu schnell */
```

### Marquee / Auto-Scroller
Testimonials und Services-Labels: **css-animation: marquee, linear, infinite** (beide Richtungen) — kein JavaScript-Loop.

---

## 10. WORTWAHL & TONE OF VOICE

### Kerncharakter
**Selbstbewusst, klar, ohne Ausrufezeichen.** Kein Marketing-Speak. Die Sprache klingt wie ein Gespräch unter Profis — kurz, direkt, präzise.

### Headline-Strategie
- **Immer eine klare Aussage** — nicht "Willkommen bei X", sondern "X is a design and technology studio based in Y."
- Sätze sind **lang, aber nicht komplex**: eine Hauptaussage pro Headline.
- **Zweifärbige Headline**: Erster Teil weißer Text (die Kernaussage), zweiter Teil grau/gedimmt (die Erweiterung). Zieht das Auge auf das Wesentliche.
BEISPIEL:
"[BRAND] is a [Beschreibung] based in [Ort]."   ← weiß
"We deliver [Versprechen]."                       ← gedimmt/grau

### Eyebrow Labels (Sektionskennzeichner)
Immer in **ALL CAPS, kurz, ohne Punkt**:
- `FULL-SERVICE AGENCY`
- `OUR SERVICES`
- `LATEST WORK`
- `TESTIMONIALS`
- `LATEST NEWS`
- `VISUAL AND MARKETING`
- `TECHNOLOGY`

### CTA-Formulierungen
| Kontext | Text |
|---|---|
| Hauptaktion | `Start a Project` |
| Sekundär | `Let's work together` |
| Portfolio | `View full portfolio` |
| Services | `Explore All Services` |
| News | `View all news` |
| Mehr Details | `See More` |
| Formular | `Send Message` |
| Kontakt | `Get in touch` |

**Muster**: Imperativ + Substantiv (kein "Click here", kein "Learn more"). Handlungsorientiert, aber nicht aggressiv.

### Projektbeschreibungen (Portfolio-Texte)
Struktur: **Problem → Ansatz → Lösung**
- Immer aus der Wir-Perspektive: "Our challenge was...", "We created...", "Our task was..."
- Fachsprache ohne Jargon: "visual language", "brand identity", "submark", "design system"
- Poetische Bildsprache bei Lifestyle-Brands: "celebrates femininity", "divine spirits of nature", "celebrate togetherness"
- Immer Kontext: Location + Industry + Services als Meta-Tags

### Testimonials
- Vollständige, authentische Zitate — keine gekürzten Testimonials
- Firmenname + Name + Titel darunter
- Keine sternförmigen Ratings, kein "5/5"

### Fehler/Typos im Original
Das Original enthält bewusst oder unbewusst Tippfehler: "hollistic" (statt holistic), "idendity" (statt identity) — dies zeigt, dass die Texte authentisch-menschlich, nicht marketingpoliert sind.

---

## 11. BILDER & VISUELLER INHALT

### Bildstil
- **Produktfotos**: Hochwertig, studiolit, oft weiche Schatten, neutrale/warme Hintergründe
- **Lifestyle-Fotos**: Sehr editorial, natural lighting, muted Tones, Natur + Mensch
- **Mockups**: 3D-gerendert (MacBook, iPhone, Tablet) in realistischen Szenen
- **Farbpalette der Bilder**: Warm Beige, Warm Grey, Off-White, Terracotta — immer harmonisch, nie schreiend bunt
- **Skalierung**: Bilder füllen ihre Container vollständig (object-fit: cover)
- **Border-Radius auf Bilder-Containern**: 15.41px (gleich wie alle Cards)

### Hero Background
Ein **3D-gerendetes weißes abstraktes Objekt** schwebt auf schwarzem Hintergrund — rotierend oder pulsierend (CSS/Three.js). Wirkt wie ein Produktskulptur. Dieses visuelle Stilmittel macht den Hero sofort premium.

---

## 12. LOGO & BRANDING

### Logo-Komposition
- **Monogramm**: Einzelner Buchstabe "S" in einem gerundeten Quadrat
- **Schrift im Logo**: Pixel/Dot-Matrix Stil — erinnert an alte Computerschriften oder LED-Displays
- **Wortmarke "LESSE"**: Im Footer als riesige Ghost-Wortmarke im Hintergrund
- **Farbe**: Weiß auf schwarz (primär), schwarz auf weiß (invertiert für helle Kontexte)

---

## 13. TECHNISCHES SETUP

### Framework & Stack
- **SvelteKit** (URL: `/_app/immutable/assets/` → typisch für Svelte)
- **Tailwind CSS** (erkennbar an `md:mt-[8vw]`, `px-[5vw]` etc.)
- **GSAP** / eigene Scroll-Animations-Library (wahrscheinlich)
- **Self-hosted Fonts** (kein Google Fonts CDN)
- Shopify Partner (Backend-Integration für eCommerce)

### Performance-Hinweise
- Fonts als `.ttf` / `.otf` selbst gehostet → keine Font-Request-Delays
- Bilder: lazy-loaded
- Navigation: `position: fixed`, `z-index: 99`
- Farb-Wechsel: Scroll-Trigger-basiert via JS, nicht CSS

---

## 14. ADAPTION AUF EINE ANDERE BRAND (Template)

Um diesen Look mit einer neuen Brand zu replizieren, ersetze folgendes:

### Ersetzen
| Original | Ersetzen durch |
|---|---|
| `Lesse Studio` | Dein Brand-Name |
| `Italy` | Dein Standort |
| `design and technology` | Deine Kernkompetenz |
| `DMSans` | Äquivalenter Geometric Sans (z.B. Inter, Space Grotesk, Plus Jakarta Sans) |
| `HostGrotesk` | Äquivalenter Humanist Grotesque (z.B. Figtree, Outfit, Nunito Sans) |
| Produktfotos | Deine eigenen (gleicher Stil: warm, editorial, muted) |
| Service-Kategorien | Deine Leistungen (gleiche Kartenstruktur) |
| `Full-Service Agency` | Dein Eyebrow-Label |

### Beibehalten
- Schwarzer Hintergrund (#000) als Basis
- `rgba(36,36,36,0.5)` + `backdrop-filter: blur(46px)` für alle floating UI
- `border-radius: 15.41px` (~~1vw) als universeller Radius
- `font-weight: 400` überall — kein Bold
- Eyebrow Labels: `ALL CAPS, muted grey`
- Zweifarbige Headlines: Weiß + Grau in einer Zeile
- Horizontale Sektions-Padding: `5vw`
- Vertikale Sektions-Abstände: `8–10vw`
- Arrow-Suffix `→` in allen CTAs

---

## 15. QUICK-REFERENCE CSS TOKENS

```css
:root {
  /* Farben */
  --color-bg:              #000000;
  --color-bg-card:         rgb(16, 16, 16);
  --color-bg-form:         rgb(39, 39, 39);
  --color-text-primary:    #ffffff;
  --color-text-secondary:  rgb(112, 112, 112);  /* muted */
  --color-text-dim:        rgba(255, 255, 255, 0.50);
  --color-ui-float:        rgba(36, 36, 36, 0.50);
  --color-ui-pill:         rgba(34, 34, 34, 0.40);
  --color-cta-light:       rgba(255, 255, 255, 0.70);
  --color-tag-light:       rgba(223, 223, 223, 0.80);

  /* Typografie */
  --font-display:          'DMSans', sans-serif;
  --font-body:             'HostGrotesk', sans-serif;
  --font-weight:           400;           /* einziges Weight */
  --font-size-hero:        clamp(36px, 3vw, 56px);
  --font-size-section:     clamp(22px, 1.9vw, 32px);
  --font-size-body:        15.41px;       /* ~1vw */
  --font-size-label:       12px;
  --line-height-hero:      1.5;
  --letter-spacing:        normal;

  /* Radien */
  --radius-card:           15.41px;       /* ~1vw */
  --radius-btn-sm:         7.705px;       /* ~0.5vw */
  --radius-pill:           9.246px;

  /* Spacing */
  --spacing-section-v:     10vw;
  --spacing-page-h:        5vw;
  --spacing-card:          18.5px;

  /* Blur / Glassmorphism */
  --blur-ui:               46.23px;

  /* Animation */
  --easing-default:        cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-default:    0.2s var(--easing-default);
}
```