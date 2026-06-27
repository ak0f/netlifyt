import type { Lang } from './i18n'

/* ─── Bilingual service data ───
   Each entry powers an SEO-optimised landing page at /leistungen/[slug],
   the /leistungen index, the sitemap and the structured data (Service +
   BreadcrumbList + FAQPage). Add a new service here and it appears
   everywhere automatically — no layout changes needed. */

type L = Record<Lang, string>
type LP = Record<Lang, string[]>

export interface ServiceFeature {
  title: L
  desc: L
}

export interface ServiceFAQ {
  q: L
  a: L
}

export interface Service {
  slug: string
  serviceType: string // for schema.org Service
  eyebrow: L          // small label above the H1
  title: L            // page H1 (keyword + location)
  metaTitle: L
  metaDesc: L
  intro: LP           // one or more lead paragraphs
  features: ServiceFeature[]
  faq: ServiceFAQ[]
}

export const SERVICES: Service[] = [
  {
    slug: 'webdesign-bern',
    serviceType: 'Web design',
    eyebrow: { de: 'Websites', en: 'Websites' },
    title: { de: 'Webdesign & Website-Entwicklung in Bern', en: 'Web Design & Website Development in Bern' },
    metaTitle: {
      de: 'Webdesign Bern | Website erstellen lassen – SLIDE Agentur',
      en: 'Web Design Bern | Have a Website Built – SLIDE Agentur',
    },
    metaDesc: {
      de: 'Professionelle Websites aus Bern: schnell, modern und für Google optimiert. SLIDE entwickelt deine Website von Konzept bis Launch – aus einer Hand.',
      en: 'Professional websites from Bern: fast, modern and optimised for Google. SLIDE builds your website from concept to launch – all from one source.',
    },
    intro: {
      de: [
        'Deine Website ist dein wichtigster Verkäufer – rund um die Uhr. Wir bauen schnelle, moderne und mobil-optimierte Websites, die nicht nur gut aussehen, sondern Besucher zu Kunden machen.',
        'Von der ersten Idee über das Design bis zur fertigen, bei Google auffindbaren Seite kommt alles aus einer Hand. Kein Baukasten, sondern eine massgeschneiderte Lösung für dein Unternehmen.',
      ],
      en: [
        'Your website is your most important salesperson – around the clock. We build fast, modern and mobile-optimised websites that not only look great but turn visitors into customers.',
        'From the first idea through design to a finished, Google-friendly site, everything comes from one source. No website builder, but a tailor-made solution for your business.',
      ],
    },
    features: [
      { title: { de: 'Responsive Design', en: 'Responsive design' }, desc: { de: 'Perfekt auf Handy, Tablet und Desktop – auf jedem Gerät überzeugend.', en: 'Perfect on phone, tablet and desktop – convincing on every device.' } },
      { title: { de: 'SEO-Grundlagen inklusive', en: 'SEO foundations included' }, desc: { de: 'Sauberer Code, schnelle Ladezeiten und korrekte Meta-Daten, damit Google dich findet.', en: 'Clean code, fast loading times and correct metadata so Google finds you.' } },
      { title: { de: 'Frontend & Backend', en: 'Frontend & backend' }, desc: { de: 'Von der Oberfläche bis zur Logik dahinter – Full-Stack-Entwicklung nach Mass.', en: 'From the interface to the logic behind it – full-stack development tailored to you.' } },
      { title: { de: 'Performance & Sicherheit', en: 'Performance & security' }, desc: { de: 'Schnelle, sichere Seiten mit modernem Hosting und SSL-Verschlüsselung.', en: 'Fast, secure pages with modern hosting and SSL encryption.' } },
      { title: { de: 'Pflegeleicht', en: 'Easy to maintain' }, desc: { de: 'Du kannst Inhalte selbst anpassen – oder wir übernehmen die Wartung für dich.', en: 'You can update content yourself – or we take care of maintenance for you.' } },
    ],
    faq: [
      { q: { de: 'Was kostet eine Website?', en: 'How much does a website cost?' }, a: { de: 'Der Preis hängt vom Umfang ab. Im kostenlosen Erstgespräch klären wir deine Ziele und erstellen dir eine transparente Offerte ohne versteckte Kosten.', en: 'The price depends on the scope. In a free initial consultation we clarify your goals and give you a transparent quote with no hidden costs.' } },
      { q: { de: 'Wird meine Website bei Google gefunden?', en: 'Will my website be found on Google?' }, a: { de: 'Ja. Wir bauen jede Website technisch SEO-freundlich – mit schnellen Ladezeiten, sauberer Struktur und korrekten Meta-Daten als solide Grundlage für gute Rankings.', en: 'Yes. We build every website to be technically SEO-friendly – with fast loading times, clean structure and correct metadata as a solid basis for good rankings.' } },
      { q: { de: 'Betreut ihr die Website auch nach dem Launch?', en: 'Do you support the website after launch?' }, a: { de: 'Gerne. Auf Wunsch übernehmen wir Wartung, Updates und kleinere Änderungen, damit deine Seite immer aktuell und sicher bleibt.', en: 'Happily. On request we handle maintenance, updates and smaller changes so your site always stays current and secure.' } },
    ],
  },
  {
    slug: 'social-media-bern',
    serviceType: 'Social media marketing',
    eyebrow: { de: 'Social Media', en: 'Social media' },
    title: { de: 'Social Media Management aus Bern', en: 'Social Media Management from Bern' },
    metaTitle: {
      de: 'Social Media Agentur Bern | Content & Betreuung – SLIDE',
      en: 'Social Media Agency Bern | Content & Management – SLIDE',
    },
    metaDesc: {
      de: 'Social Media Agentur aus Bern: Content, der Kunden bringt. SLIDE übernimmt Strategie, Content-Erstellung und Betreuung für Instagram, TikTok & Co.',
      en: 'Social media agency from Bern: content that wins customers. SLIDE handles strategy, content creation and management for Instagram, TikTok & co.',
    },
    intro: {
      de: [
        'Sichtbarkeit entsteht nicht zufällig. Wir entwickeln eine klare Social-Media-Strategie und erstellen Content, der zu deiner Marke passt und echte Kunden bringt – statt nur Likes.',
        'Du konzentrierst dich auf dein Geschäft, wir kümmern uns um deinen Auftritt: von der Planung über Reels und Shorts bis zur laufenden Betreuung deiner Kanäle.',
      ],
      en: [
        'Visibility does not happen by chance. We develop a clear social media strategy and create content that fits your brand and brings real customers – not just likes.',
        'You focus on your business, we take care of your presence: from planning through reels and shorts to the ongoing management of your channels.',
      ],
    },
    features: [
      { title: { de: 'Strategie', en: 'Strategy' }, desc: { de: 'Ein klarer Plan, der zu deinen Zielen und deiner Zielgruppe passt.', en: 'A clear plan that fits your goals and your audience.' } },
      { title: { de: 'Content-Erstellung', en: 'Content creation' }, desc: { de: 'Posts, Grafiken und Texte, die deine Marke stark und einheitlich darstellen.', en: 'Posts, graphics and copy that present your brand strongly and consistently.' } },
      { title: { de: 'Reels & Shorts', en: 'Reels & shorts' }, desc: { de: 'Kurzvideos, die Aufmerksamkeit erzeugen und Reichweite aufbauen.', en: 'Short videos that grab attention and build reach.' } },
      { title: { de: 'Branding', en: 'Branding' }, desc: { de: 'Ein wiedererkennbarer Auftritt über alle Kanäle hinweg.', en: 'A recognisable presence across all channels.' } },
      { title: { de: 'Laufende Betreuung', en: 'Ongoing management' }, desc: { de: 'Wir planen, posten und behalten die Entwicklung deiner Kanäle im Blick.', en: 'We plan, post and keep an eye on how your channels develop.' } },
    ],
    faq: [
      { q: { de: 'Welche Plattformen betreut ihr?', en: 'Which platforms do you manage?' }, a: { de: 'Wir arbeiten dort, wo deine Kunden sind – vor allem Instagram und TikTok, auf Wunsch auch weitere Kanäle.', en: 'We work where your customers are – mainly Instagram and TikTok, and other channels on request.' } },
      { q: { de: 'Erstellt ihr auch die Inhalte selbst?', en: 'Do you create the content yourselves?' }, a: { de: 'Ja. Von Konzept über Grafik und Text bis zu Reels erstellen wir den Content für dich – aus einer Hand.', en: 'Yes. From concept through graphics and copy to reels, we create the content for you – all from one source.' } },
      { q: { de: 'Wie schnell sieht man Ergebnisse?', en: 'How quickly will I see results?' }, a: { de: 'Social Media ist ein Aufbau. Mit einer klaren Strategie und konstantem Content entsteht Reichweite Schritt für Schritt – nachhaltig statt kurzfristig.', en: 'Social media is a build-up. With a clear strategy and consistent content, reach grows step by step – sustainably rather than short-term.' } },
    ],
  },
  {
    slug: 'email-marketing',
    serviceType: 'Email marketing',
    eyebrow: { de: 'E-Mail & Domain', en: 'Email & domain' },
    title: { de: 'E-Mail-Marketing & Newsletter', en: 'Email Marketing & Newsletters' },
    metaTitle: {
      de: 'E-Mail-Marketing Schweiz | Newsletter, die geöffnet werden – SLIDE',
      en: 'Email Marketing Switzerland | Newsletters That Get Opened – SLIDE',
    },
    metaDesc: {
      de: 'E-Mail-Marketing aus Bern: Newsletter und Automationen, die geöffnet werden und Umsatz bringen. SLIDE übernimmt Design, Aufbau und Auswertung.',
      en: 'Email marketing from Bern: newsletters and automations that get opened and drive revenue. SLIDE handles design, setup and analytics.',
    },
    intro: {
      de: [
        'E-Mail ist nach wie vor einer der direktesten Wege zu deinen Kunden. Wir gestalten Newsletter und Automationen, die geöffnet, gelesen und angeklickt werden.',
        'Von der professionellen E-Mail-Adresse über das Newsletter-Design bis zur automatisierten Kampagne richten wir alles ein und werten die Ergebnisse für dich aus.',
      ],
      en: [
        'Email is still one of the most direct ways to reach your customers. We design newsletters and automations that get opened, read and clicked.',
        'From a professional email address through newsletter design to automated campaigns, we set everything up and analyse the results for you.',
      ],
    },
    features: [
      { title: { de: 'Newsletter-Design', en: 'Newsletter design' }, desc: { de: 'Ansprechende Vorlagen, die auf jedem Gerät sauber dargestellt werden.', en: 'Attractive templates that render cleanly on every device.' } },
      { title: { de: 'Automationen', en: 'Automations' }, desc: { de: 'Willkommensstrecken und Follow-ups, die automatisch im richtigen Moment auslösen.', en: 'Welcome sequences and follow-ups that trigger automatically at the right moment.' } },
      { title: { de: 'Kampagnen', en: 'Campaigns' }, desc: { de: 'Aktionen und Ankündigungen, die deine Empfänger zur richtigen Zeit erreichen.', en: 'Promotions and announcements that reach your recipients at the right time.' } },
      { title: { de: 'E-Mail & Domain', en: 'Email & domain' }, desc: { de: 'Professionelle Adressen auf deiner eigenen Domain – seriös und vertrauenswürdig.', en: 'Professional addresses on your own domain – credible and trustworthy.' } },
      { title: { de: 'Auswertung', en: 'Analytics' }, desc: { de: 'Wir messen Öffnungen und Klicks und optimieren laufend für bessere Ergebnisse.', en: 'We measure opens and clicks and continuously optimise for better results.' } },
    ],
    faq: [
      { q: { de: 'Welches Newsletter-Tool nutzt ihr?', en: 'Which newsletter tool do you use?' }, a: { de: 'Wir wählen das Tool passend zu deinen Anforderungen und Budget und richten es vollständig für dich ein.', en: 'We choose the tool to match your requirements and budget and set it up fully for you.' } },
      { q: { de: 'Bekomme ich eine eigene E-Mail-Adresse?', en: 'Do I get my own email address?' }, a: { de: 'Ja. Auf Wunsch richten wir professionelle Adressen auf deiner eigenen Domain ein, z. B. name@deinefirma.ch.', en: 'Yes. On request we set up professional addresses on your own domain, e.g. name@yourcompany.ch.' } },
      { q: { de: 'Ist das DSGVO-konform?', en: 'Is it GDPR-compliant?' }, a: { de: 'Wir richten den Versand datenschutzkonform ein – mit sauberer Einwilligung und Abmeldemöglichkeit gemäss Schweizer DSG und EU-DSGVO.', en: 'We set up sending in a privacy-compliant way – with proper consent and an unsubscribe option in line with the Swiss FADP and EU GDPR.' } },
    ],
  },
  {
    slug: 'it-support-bern',
    serviceType: 'IT support',
    eyebrow: { de: 'IT-Support', en: 'IT support' },
    title: { de: 'IT-Support & Wartung für KMU in Bern', en: 'IT Support & Maintenance for SMEs in Bern' },
    metaTitle: {
      de: 'IT-Support Bern für KMU | Wartung & Betreuung – SLIDE',
      en: 'IT Support Bern for SMEs | Maintenance & Care – SLIDE',
    },
    metaDesc: {
      de: 'IT-Support aus Bern für KMU: schnelle Hilfe bei technischen Fragen, Wartung und Betreuung. SLIDE löst deine IT-Probleme verständlich und zuverlässig.',
      en: 'IT support from Bern for SMEs: fast help with technical questions, maintenance and care. SLIDE solves your IT problems clearly and reliably.',
    },
    intro: {
      de: [
        'Technik soll dir helfen, nicht im Weg stehen. Wir sind dein verlässlicher Ansprechpartner für IT-Fragen – verständlich erklärt, ohne Fachchinesisch.',
        'Ob Wartung deiner Website, technische Einrichtung oder Hilfe im Alltag: Wir kümmern uns darum, damit du dich auf dein Geschäft konzentrieren kannst.',
      ],
      en: [
        'Technology should help you, not get in your way. We are your reliable contact for IT questions – explained clearly, without jargon.',
        'Whether it is maintaining your website, technical setup or everyday help: we take care of it so you can focus on your business.',
      ],
    },
    features: [
      { title: { de: 'Website-Wartung', en: 'Website maintenance' }, desc: { de: 'Updates, Backups und Sicherheit, damit deine Seite stabil läuft.', en: 'Updates, backups and security so your site runs stable.' } },
      { title: { de: 'Technische Einrichtung', en: 'Technical setup' }, desc: { de: 'Domains, E-Mail, Tools – wir richten alles korrekt für dich ein.', en: 'Domains, email, tools – we set everything up correctly for you.' } },
      { title: { de: 'Schnelle Hilfe', en: 'Fast help' }, desc: { de: 'Ein direkter Ansprechpartner, der zeitnah reagiert, wenn es klemmt.', en: 'A direct contact who responds promptly when something goes wrong.' } },
      { title: { de: 'Verständlich erklärt', en: 'Explained clearly' }, desc: { de: 'Wir erklären Lösungen so, dass du sie verstehst – ohne Fachchinesisch.', en: 'We explain solutions so you understand them – without jargon.' } },
    ],
    faq: [
      { q: { de: 'Für wen ist der IT-Support gedacht?', en: 'Who is the IT support for?' }, a: { de: 'Vor allem für kleine und mittlere Unternehmen in Bern und der Schweiz, die einen verlässlichen Ansprechpartner ohne eigene IT-Abteilung suchen.', en: 'Mainly for small and medium-sized businesses in Bern and Switzerland looking for a reliable contact without their own IT department.' } },
      { q: { de: 'Helft ihr auch bei bestehenden Websites?', en: 'Do you also help with existing websites?' }, a: { de: 'Ja. Wir übernehmen auf Wunsch Wartung und Betreuung auch für Websites, die nicht von uns erstellt wurden.', en: 'Yes. On request we also take over maintenance and care for websites that we did not build.' } },
    ],
  },
]

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
