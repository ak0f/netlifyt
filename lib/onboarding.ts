import type { Lang } from './i18n'

/* ─── Konfigurator-Katalog und Preis-Engine (/onboarding) ───
   Aufbau wie lib/services.ts: zweisprachige Daten liegen hier bei den IDs,
   nicht in lib/i18n.ts. Sonst müssten zwei parallele Arrays über ihren Index
   zusammenpassen, und eine neue Integration wäre in der falschen Sprache
   sofort ein stiller Fehler. In lib/i18n.ts steht nur die UI-Copy des
   Wizards (Schrittnamen, Knöpfe, Fragen).

   Die Zahlen sind seit 20.08.2026 die gültige Preisliste, freigegeben von
   Akif. Sie liegen bewusst deutlich über den früheren Abschlüssen — die
   Positionierung geht nach oben.

   ⚠️ ZWEITE KOPIE der IDs und Zahlen: slide-dashboard,
   `lib/onboardingPricing.ts`. Dort liegt die verbindliche Fassung. Der
   Endpunkt dort rechnet jede Anfrage selbst nach und vermerkt es in der
   Kundenakte, wenn unsere Schätzung hier abweicht. Preisänderungen gehören
   also in beide Dateien. */

type L = Record<Lang, string>
type LP = Record<Lang, string[]>

/* ── Branchen ── */

export const INDUSTRIES: { id: string; label: L }[] = [
  { id: 'immobilien',  label: { de: 'Immobilien',            en: 'Real estate' } },
  { id: 'handwerk',    label: { de: 'Handwerk und Bau',      en: 'Trades and construction' } },
  { id: 'recht',       label: { de: 'Recht und Beratung',    en: 'Law and consulting' } },
  { id: 'gesundheit',  label: { de: 'Gesundheit',            en: 'Healthcare' } },
  { id: 'gastronomie', label: { de: 'Gastronomie',           en: 'Hospitality' } },
  { id: 'agentur',     label: { de: 'Agentur und Kreativ',   en: 'Agency and creative' } },
  { id: 'startup',     label: { de: 'Startup / SaaS',        en: 'Startup / SaaS' } },
  { id: 'handel',      label: { de: 'Handel und E-Commerce', en: 'Retail and e-commerce' } },
  { id: 'anderes',     label: { de: 'Anderes',               en: 'Something else' } },
]

/* ── Standard-Pakete ── */

export type PackageId = 'website' | 'infrastruktur' | 'system'

export interface Package {
  id: PackageId
  name: L
  tagline: L
  oneTime: number
  monthlyFrom: number
  /** Arbeitstage Grundaufwand. Fliesst in die Lieferspanne, nicht in den Preis. */
  days: number
  features: LP
  footnote: L
  badge?: L
}

export const PACKAGES: Package[] = [
  {
    id: 'website',
    name: { de: 'Website', en: 'Website' },
    tagline: {
      de: 'Der saubere Auftritt. Schnell, mobil, gehostet.',
      en: 'A clean presence. Fast, mobile, hosted.',
    },
    oneTime: 1200,
    monthlyFrom: 50,
    days: 0,
    features: {
      de: [
        'Design, das auf Anhieb Vertrauen schafft',
        'Lädt in unter 2 Sekunden',
        'Auf jedem Gerät sauber dargestellt',
        'Flüssige Animationen',
        'Hosting und SSL inklusive',
        'Vorschaubild für geteilte Links',
      ],
      en: [
        'Design people trust at first sight',
        'Loads in under 2 seconds',
        'Renders cleanly on every device',
        'Smooth animations',
        'Hosting and SSL included',
        'Preview image for shared links',
      ],
    },
    footnote: {
      de: 'Rechnet sich meist mit dem ersten neuen Kunden.',
      en: 'Usually pays for itself with your first new client.',
    },
  },
  {
    id: 'infrastruktur',
    name: { de: 'Infrastruktur', en: 'Infrastructure' },
    tagline: {
      de: 'Die Website mit eigenem Rückgrat: Daten, Admin, E-Mail.',
      en: 'A website with a backbone: data, admin, email.',
    },
    oneTime: 2500,
    monthlyFrom: 120,
    days: 3,
    features: {
      de: [
        'Alles aus Website',
        'Deine Daten gehören dir, sicher gespeichert',
        'Inhalte selbst pflegen, ohne Rückfrage',
        'Anfragen landen strukturiert bei dir',
        'Zuverlässige E-Mails ab eigener Domain',
      ],
      en: [
        'Everything in Website',
        'Your data stays yours, stored securely',
        'Edit content yourself, no ticket needed',
        'Inquiries arrive structured',
        'Reliable email from your own domain',
      ],
    },
    footnote: {
      de: 'Rechnet sich ab dem ersten Lead über die Seite.',
      en: 'Pays off from the first lead through the site.',
    },
    badge: { de: 'Meistgewählt', en: 'Most chosen' },
  },
  {
    id: 'system',
    name: { de: 'System', en: 'System' },
    tagline: {
      de: 'Das volle Betriebssystem für dein Geschäft.',
      en: 'A full operating system for your business.',
    },
    oneTime: 4000,
    monthlyFrom: 200,
    days: 7,
    features: {
      de: [
        'Alles aus Infrastruktur',
        'Eigenes Kundenportal mit Login',
        'Rollen und Berechtigungen',
        'Automatisierte Abläufe',
        'Zahlungen direkt im System',
      ],
      en: [
        'Everything in Infrastructure',
        'Your own client portal with login',
        'Roles and permissions',
        'Automated workflows',
        'Payments inside the system',
      ],
    },
    footnote: {
      de: 'Ersetzt mehrere einzelne Tools.',
      en: 'Replaces several separate tools.',
    },
  },
]

export function getPackage(id: PackageId): Package {
  return PACKAGES.find(p => p.id === id) ?? PACKAGES[0]
}

/* ── Zusätze ──
   Bausteine aus "System", einzeln zubuchbar auf einem kleineren Paket. Auf
   "System" selbst nicht anzeigen, dort sind sie schon drin. */

export type AddonId = 'kundenportal' | 'rollen' | 'workflows' | 'zahlungen'

export interface Addon {
  id: AddonId
  name: L
  description: L
  oneTime: number
  monthly: number
  /** Zusätzliche Arbeitstage. */
  days: number
}

export const ADDONS: Addon[] = [
  {
    id: 'kundenportal',
    name: { de: 'Kundenportal', en: 'Client portal' },
    description: {
      de: 'Deine Kunden bekommen einen eigenen Login-Bereich.',
      en: 'Your clients get their own login area.',
    },
    oneTime: 1200,
    monthly: 40,
    days: 4,
  },
  {
    id: 'rollen',
    name: { de: 'Rollen und Berechtigungen', en: 'Roles and permissions' },
    description: {
      de: 'Wer darf was: Team, Kunden, Buchhaltung.',
      en: 'Who sees what: team, clients, accounting.',
    },
    oneTime: 500,
    monthly: 10,
    days: 2,
  },
  {
    id: 'workflows',
    name: { de: 'Automatisierte Abläufe', en: 'Automated workflows' },
    description: {
      de: 'Wiederkehrende Schritte laufen ohne Handarbeit durch.',
      en: 'Recurring steps run without manual work.',
    },
    oneTime: 600,
    monthly: 20,
    days: 3,
  },
  {
    id: 'zahlungen',
    name: { de: 'Zahlungen im System', en: 'Payments in the system' },
    description: {
      de: 'Rechnungen und Zahlungen direkt im Ablauf.',
      en: 'Invoices and payments inside the flow.',
    },
    oneTime: 450,
    monthly: 10,
    days: 2,
  },
]

export function getAddon(id: string): Addon | undefined {
  return ADDONS.find(a => a.id === id)
}

/* ── Integrationen ── */

export type IntegrationBadge = 'empfohlen' | 'beliebt' | 'sehr_beliebt' | 'premium'

export const INTEGRATION_BADGE_LABEL: Record<IntegrationBadge, L> = {
  empfohlen:    { de: 'Empfohlen',    en: 'Recommended' },
  beliebt:      { de: 'Beliebt',      en: 'Popular' },
  sehr_beliebt: { de: 'Sehr beliebt', en: 'Very popular' },
  premium:      { de: 'Premium',      en: 'Premium' },
}

export interface Integration {
  id: string
  name: L
  oneTime: number
  monthly: number
  /* 'einmalig': einmal eingerichtet, kein laufender Mehrpreis.
     'laufend':  echter monatlicher Zusatzbetrag. */
  monthlyKind: 'einmalig' | 'laufend'
  /** Zusätzliche Arbeitstage. */
  days: number
  badge?: IntegrationBadge
  defaultSelected?: boolean
}

export const INTEGRATIONS: Integration[] = [
  { id: 'cookie_banner',   name: { de: 'Cookie-Banner',                    en: 'Cookie banner' },              oneTime: 50,  monthly: 0,  monthlyKind: 'einmalig', days: 0, badge: 'empfohlen', defaultSelected: true },
  { id: 'impressum',       name: { de: 'Impressum und Datenschutz',        en: 'Legal notice and privacy' },   oneTime: 150, monthly: 0,  monthlyKind: 'einmalig', days: 0, badge: 'empfohlen', defaultSelected: true },
  { id: 'whatsapp',        name: { de: 'WhatsApp-Widget',                  en: 'WhatsApp widget' },            oneTime: 60,  monthly: 5,  monthlyKind: 'laufend', days: 1,  badge: 'beliebt' },
  { id: 'google_reviews',  name: { de: 'Google-Bewertungen',               en: 'Google reviews' },             oneTime: 100, monthly: 20, monthlyKind: 'laufend', days: 1,  badge: 'beliebt' },
  { id: 'booking',         name: { de: 'Buchungssystem',                   en: 'Booking system' },             oneTime: 350, monthly: 50, monthlyKind: 'laufend', days: 3,  badge: 'sehr_beliebt' },
  { id: 'newsletter',      name: { de: 'Newsletter-System',                en: 'Newsletter system' },          oneTime: 200, monthly: 20, monthlyKind: 'laufend', days: 2,  badge: 'beliebt' },
  { id: 'instagram_feed',  name: { de: 'Instagram-Feed',                   en: 'Instagram feed' },             oneTime: 300, monthly: 10, monthlyKind: 'laufend', days: 1,  badge: 'beliebt' },
  { id: 'multilingual',    name: { de: 'Mehrsprachigkeit (DE/FR/IT/EN)',   en: 'Multilingual (DE/FR/IT/EN)' }, oneTime: 350, monthly: 0,  monthlyKind: 'einmalig', days: 3, badge: 'beliebt' },
  { id: 'stripe',          name: { de: 'Stripe-Zahlungen',                 en: 'Stripe payments' },            oneTime: 450, monthly: 0,  monthlyKind: 'einmalig', days: 3, badge: 'premium' },
  { id: 'ai_chatbot',      name: { de: 'KI-Chatbot',                       en: 'AI chatbot' },                 oneTime: 500, monthly: 55, monthlyKind: 'laufend', days: 4,  badge: 'premium' },
  { id: 'analytics',       name: { de: 'Analytics-Dashboard',              en: 'Analytics dashboard' },        oneTime: 300, monthly: 15, monthlyKind: 'laufend', days: 2,  badge: 'premium' },
  { id: 'maps',            name: { de: 'Google-Maps-Einbettung',           en: 'Google Maps embed' },          oneTime: 20,  monthly: 10, monthlyKind: 'laufend', days: 0  },
  { id: 'live_chat',       name: { de: 'Live-Chat',                        en: 'Live chat' },                  oneTime: 150, monthly: 50, monthlyKind: 'laufend', days: 1,  badge: 'beliebt' },
  { id: 'gbp',             name: { de: 'Google-Unternehmensprofil',        en: 'Google Business Profile' },    oneTime: 150, monthly: 0,  monthlyKind: 'einmalig', days: 1  },
  { id: 'maintenance_page',name: { de: 'Wartungsseite',                    en: 'Maintenance page' },           oneTime: 100, monthly: 0,  monthlyKind: 'einmalig', days: 0  },
  { id: 'perf_report',     name: { de: 'Performance-Report',               en: 'Performance report' },         oneTime: 0,   monthly: 35, monthlyKind: 'laufend', days: 1  },
]

export const DEFAULT_INTEGRATION_IDS = INTEGRATIONS.filter(i => i.defaultSelected).map(i => i.id)

export function getIntegration(id: string): Integration | undefined {
  return INTEGRATIONS.find(i => i.id === id)
}

/* Mengenrabatt auf die Einrichtungskosten der Integrationen, gestaffelt nach
   Anzahl (inklusive der beiden rechtlich vorausgewählten). */
const QUANTITY_DISCOUNT_TIERS: { min: number; pct: number }[] = [
  { min: 10, pct: 0.30 },
  { min: 5,  pct: 0.20 },
  { min: 3,  pct: 0.15 },
]

export function quantityDiscountPct(count: number): number {
  for (const tier of QUANTITY_DISCOUNT_TIERS) {
    if (count >= tier.min) return tier.pct
  }
  return 0
}

/** Wie viele Integrationen bis zur nächsten Rabattstufe fehlen, für den Live-Hinweis. */
export function nextDiscountTier(count: number): { needed: number; pct: number } | null {
  const upcoming = QUANTITY_DISCOUNT_TIERS.filter(t => t.min > count).sort((a, b) => a.min - b.min)
  if (upcoming.length === 0) return null
  const t = upcoming[0]
  return { needed: t.min - count, pct: t.pct }
}

/* ── Custom Builder: freie Bausteine, nur laufende Kosten ── */

export type CustomBlockId =
  | 'landing_page' | 'blog_cms' | 'multilingual_block' | 'auth_roles' | 'admin_dashboard'
  | 'analytics_block' | 'payments_stripe' | 'booking_calendar' | 'ai_assistant' | 'email_automation'

export interface CustomBlock { id: CustomBlockId; name: L; monthly: number; days: number }

export const CUSTOM_BLOCKS: CustomBlock[] = [
  { id: 'landing_page',       name: { de: 'Landing Page',           en: 'Landing page' },        monthly: 10, days: 2 },
  { id: 'blog_cms',           name: { de: 'Blog / CMS',             en: 'Blog / CMS' },          monthly: 15, days: 3 },
  { id: 'multilingual_block', name: { de: 'Mehrsprachigkeit',       en: 'Multilingual' },        monthly: 5, days: 3 },
  { id: 'auth_roles',         name: { de: 'Login und Rollen',       en: 'Login and roles' },     monthly: 15, days: 4 },
  { id: 'admin_dashboard',    name: { de: 'Admin-Dashboard',        en: 'Admin dashboard' },     monthly: 25, days: 6 },
  { id: 'analytics_block',    name: { de: 'Analytics',              en: 'Analytics' },           monthly: 10, days: 2 },
  { id: 'payments_stripe',    name: { de: 'Zahlungen (Stripe)',     en: 'Payments (Stripe)' },   monthly: 15, days: 3 },
  { id: 'booking_calendar',   name: { de: 'Buchung und Kalender',   en: 'Booking and calendar' },monthly: 15, days: 4 },
  { id: 'ai_assistant',       name: { de: 'KI-Assistent',           en: 'AI assistant' },        monthly: 60, days: 5 },
  { id: 'email_automation',   name: { de: 'E-Mail-Automation',      en: 'Email automation' },    monthly: 20, days: 3 },
]

export function getCustomBlock(id: string): CustomBlock | undefined {
  return CUSTOM_BLOCKS.find(b => b.id === id)
}

/* ── Design-Stufen ── */

export type DesignTierNumber = 1 | 2 | 3 | 4 | 5

export interface DesignTier {
  tier: DesignTierNumber
  name: L
  tagline: L
  oneTime: number
  monthly: number
  /** Zusätzliche Arbeitstage. Stufe 5 ist eine eigene 3D-Szene, das dauert. */
  days: number
  features: LP
}

export const DESIGN_TIERS: DesignTier[] = [
  {
    tier: 1,
    name: { de: 'Professionell', en: 'Professional' },
    tagline: { de: 'Sauber, schnell, seriös.', en: 'Clean, fast, serious.' },
    oneTime: 0,
    monthly: 0,
    days: 0,
    features: {
      de: ['Klares Layout und Typo-Hierarchie', 'Dezente Fade-ins beim Scrollen', 'Mobil einwandfrei'],
      en: ['Clear layout and type hierarchy', 'Subtle fade-ins on scroll', 'Flawless on mobile'],
    },
  },
  {
    tier: 2,
    name: { de: 'Gehoben', en: 'Refined' },
    tagline: { de: 'Der Feinschliff, den man spürt.', en: 'Polish you feel.' },
    oneTime: 500,
    monthly: 0,
    days: 2,
    features: {
      de: ['Mikro-Animationen an Knöpfen und Karten', 'Feine Textur, weiche Schatten'],
      en: ['Micro-animations on buttons and cards', 'Fine texture, soft shadows'],
    },
  },
  {
    tier: 3,
    name: { de: 'Bewegt', en: 'Animated' },
    tagline: { de: 'Die Seite erzählt beim Scrollen.', en: 'The page tells a story as you scroll.' },
    oneTime: 1200,
    monthly: 10,
    days: 4,
    features: {
      de: ['Scroll-Choreografie', 'Hochzählende Zahlen', 'Eigene Hover-Zustände'],
      en: ['Scroll choreography', 'Counting numbers', 'Custom hover states'],
    },
  },
  {
    tier: 4,
    name: { de: 'Erlebnis', en: 'Experience' },
    tagline: { de: 'Ein durchkomponierter Auftritt.', en: 'A fully composed presence.' },
    oneTime: 2500,
    monthly: 20,
    days: 7,
    features: {
      de: ['Eigenes visuelles Konzept', 'Bewegter Hintergrund', 'Echter Hero-Moment'],
      en: ['Bespoke visual concept', 'Moving background', 'A real hero moment'],
    },
  },
  {
    tier: 5,
    name: { de: '3D Ultra', en: '3D Ultra' },
    tagline: { de: 'Die Obergrenze.', en: 'The upper limit.' },
    oneTime: 5000,
    monthly: 45,
    days: 12,
    features: {
      de: ['Echte 3D-Szene im Browser (WebGL)', 'Kamerafahrten, reaktive Objekte', 'Eigenes Performance-Tuning'],
      en: ['Real 3D scene in the browser (WebGL)', 'Camera moves, reactive objects', 'Dedicated performance tuning'],
    },
  },
]

export function getDesignTier(tier: DesignTierNumber): DesignTier {
  return DESIGN_TIERS.find(d => d.tier === tier) ?? DESIGN_TIERS[0]
}

/* ── Zeitrahmen ──

   Der Normalfall ist eine Website in bis zu 2 Wochen. Wer schneller will,
   verdrängt anderes und zahlt dafür. Die gezeigte Spanne ist aber nicht fix:
   sie wächst mit dem, was ausgewählt wurde. Ein Shop mit Stripe und einer
   3D-Szene ist in 3 Tagen nicht zu bauen, und ein Rechner, der das trotzdem
   behauptet, produziert nur einen enttäuschten Kunden. Nach oben ist bei
   einem Monat Schluss, auch beim grössten Umfang. */

export type DeadlineId = 'express' | 'zuegig' | 'normal'

export interface Deadline {
  id: DeadlineId
  label: L
  description: L
  multiplier: number
  /** Untere und obere Grenze in Tagen für den einfachsten Fall (Grundaufwand 0). */
  baseLo: number
  baseHi: number
  /** Anteil der Zusatztage, der in dieser Spur anfällt. Eile komprimiert, ersetzt aber keine Arbeit. */
  share: number
}

export const DEADLINES: Deadline[] = [
  {
    id: 'express',
    label: { de: 'So schnell wie möglich', en: 'As fast as possible' },
    description: {
      de: 'Wir priorisieren dich und schieben anderes zur Seite.',
      en: 'We prioritise you and push other work aside.',
    },
    multiplier: 2,
    baseLo: 1,
    baseHi: 3,
    share: 0.45,
  },
  {
    id: 'zuegig',
    label: { de: 'Zügig', en: 'Quick' },
    description: {
      de: 'Straffer Plan, feste Reihenfolge.',
      en: 'Tight plan, fixed order.',
    },
    multiplier: 1.5,
    baseLo: 4,
    baseHi: 7,
    share: 0.7,
  },
  {
    id: 'normal',
    label: { de: 'Normaler Ablauf', en: 'Standard pace' },
    description: {
      de: 'Komfortabler Rahmen mit Puffer. Der günstigste Weg.',
      en: 'Comfortable window with buffer. The cheapest route.',
    },
    multiplier: 1,
    baseLo: 8,
    baseHi: 14,
    share: 1,
  },
]

export function getDeadline(id: DeadlineId): Deadline {
  return DEADLINES.find(d => d.id === id) ?? DEADLINES[2]
}

/** Obergrenze, auch für den grössten Umfang. */
export const MAX_DELIVERY_DAYS = 30

/**
 * Zusatzaufwand in Arbeitstagen über eine einfache Website hinaus. Summiert
 * die `days` aus Paket, Zusätzen, Integrationen und Design-Stufe.
 */
export function extraWorkDays(input: {
  config: ConfigSelection
  integrationIds: string[]
  designTier: DesignTierNumber
}): number {
  const base =
    input.config.mode === 'standard'
      ? getPackage(input.config.packageId).days +
        input.config.addonIds.reduce((sum, id) => sum + (getAddon(id)?.days ?? 0), 0)
      : input.config.blockIds.reduce((sum, id) => sum + (getCustomBlock(id)?.days ?? 0), 0)

  const integrations = input.integrationIds.reduce((sum, id) => sum + (getIntegration(id)?.days ?? 0), 0)

  return base + integrations + getDesignTier(input.designTier).days
}

/**
 * Zuschlag aus dem Umfang, gedeckelt. Die Grenze ergibt sich aus der
 * Obergrenze und der normalen Spur, damit `MAX_DELIVERY_DAYS` und `baseHi`
 * nicht getrennt gepflegt werden müssen.
 *
 * Ohne diesen Deckel liefen bei sehr grossem Umfang alle drei Spuren gegen
 * einen Monat, und der doppelte Preis für Eile hätte nichts mehr gekauft.
 */
const MAX_EXTRA_DAYS = MAX_DELIVERY_DAYS - 14

/** Lieferspanne einer Zeitspur. Erreicht nie mehr als einen Monat. */
export function deliveryRange(deadlineId: DeadlineId, extraDays: number): { lo: number; hi: number } {
  const d = getDeadline(deadlineId)
  const add = Math.min(Math.max(extraDays, 0), MAX_EXTRA_DAYS) * d.share
  const hi = Math.round(d.baseHi + add)
  const lo = Math.min(hi, Math.round(d.baseLo + add * 0.75))
  return { lo, hi }
}

/* ── Preis-Engine ── */

/** Fixer Betrag für das Aufsetzen des Projekts, bewusst ohne Deadline-Faktor. */
export const PROJECT_SETUP_FEE = 20

/** Jährliche Abrechnung: 2 Monate geschenkt, also ×10 statt ×12. */
export const YEARLY_MONTHS_BILLED = 10

export type BillingCycle = 'monthly' | 'yearly'

export type ConfigSelection =
  | { mode: 'standard'; packageId: PackageId; addonIds: AddonId[] }
  | { mode: 'custom'; blockIds: CustomBlockId[] }

export interface PriceInput {
  config: ConfigSelection
  integrationIds: string[]
  designTier: DesignTierNumber
  deadlineId: DeadlineId
}

export interface PriceBreakdown {
  baseOneTime: number
  baseMonthly: number
  integrationsRawOneTime: number
  integrationsDiscountPct: number
  integrationsDiscountAmount: number
  integrationsNetOneTime: number
  integrationsMonthly: number
  designOneTime: number
  designMonthly: number
  deadlineMultiplier: number
  subtotalBeforeDeadline: number
  oneTimeAfterDeadline: number
  projectSetupFee: number
  oneTimeTotal: number
  monthlyTotal: number
  yearlyTotal: number
  yearlySavings: number
  integrationCount: number
}

export function calculatePrice(input: PriceInput): PriceBreakdown {
  const baseOneTime =
    input.config.mode === 'standard'
      ? getPackage(input.config.packageId).oneTime +
        input.config.addonIds.reduce((sum, id) => sum + (getAddon(id)?.oneTime ?? 0), 0)
      : 0

  const baseMonthly =
    input.config.mode === 'standard'
      ? getPackage(input.config.packageId).monthlyFrom +
        input.config.addonIds.reduce((sum, id) => sum + (getAddon(id)?.monthly ?? 0), 0)
      : input.config.blockIds.reduce((sum, id) => sum + (getCustomBlock(id)?.monthly ?? 0), 0)

  const selected = input.integrationIds
    .map(getIntegration)
    .filter((i): i is Integration => Boolean(i))
  const integrationsRawOneTime = selected.reduce((sum, i) => sum + i.oneTime, 0)
  const integrationsDiscountPct = quantityDiscountPct(selected.length)
  const integrationsDiscountAmount = Math.round(integrationsRawOneTime * integrationsDiscountPct)
  const integrationsNetOneTime = integrationsRawOneTime - integrationsDiscountAmount
  const integrationsMonthly = selected.reduce((sum, i) => sum + i.monthly, 0)

  const design = getDesignTier(input.designTier)
  const deadline = getDeadline(input.deadlineId)

  const subtotalBeforeDeadline = baseOneTime + integrationsNetOneTime + design.oneTime
  const oneTimeAfterDeadline = Math.round(subtotalBeforeDeadline * deadline.multiplier)
  const oneTimeTotal = oneTimeAfterDeadline + PROJECT_SETUP_FEE

  const monthlyTotal = baseMonthly + integrationsMonthly + design.monthly
  const yearlyTotal = monthlyTotal * YEARLY_MONTHS_BILLED
  const yearlySavings = monthlyTotal * (12 - YEARLY_MONTHS_BILLED)

  return {
    baseOneTime,
    baseMonthly,
    integrationsRawOneTime,
    integrationsDiscountPct,
    integrationsDiscountAmount,
    integrationsNetOneTime,
    integrationsMonthly,
    designOneTime: design.oneTime,
    designMonthly: design.monthly,
    deadlineMultiplier: deadline.multiplier,
    subtotalBeforeDeadline,
    oneTimeAfterDeadline,
    projectSetupFee: PROJECT_SETUP_FEE,
    oneTimeTotal,
    monthlyTotal,
    yearlyTotal,
    yearlySavings,
    integrationCount: selected.length,
  }
}

/* ── Empfehlung aus drei Fragen ── */

export interface QuizAnswers {
  need: 'auftritt' | 'pflege' | 'login'
  payments: 'ja' | 'nein'
  budget: 'klein' | 'mittel' | 'gross'
}

/**
 * Nachvollziehbare Heuristik, kein Ersatz für ein Gespräch. Sie liefert einen
 * Startpunkt, den der Besucher übernehmen oder ignorieren kann.
 */
export function recommendPackage(answers: QuizAnswers): PackageId {
  let tier = answers.need === 'auftritt' ? 0 : answers.need === 'pflege' ? 1 : 2
  if (answers.payments === 'ja') tier = Math.max(tier, 2)
  if (answers.budget === 'gross') tier = Math.max(tier, 2)
  if (answers.budget === 'klein' && answers.payments === 'nein') tier = Math.min(tier, 1)
  return PACKAGES[tier].id
}

/* ── Formatierung ── */

/** CHF im Schweizer Format, ohne Rappen: CHF 4'800. */
export function chf(value: number, lang: Lang = 'de'): string {
  return new Intl.NumberFormat(lang === 'en' ? 'en-CH' : 'de-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
