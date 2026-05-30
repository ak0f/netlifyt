export type Lang = 'de' | 'en'

const de = {
  nav: {
    services: 'Leistungen', references: 'Referenzen', about: 'Über uns',
    process: 'Ablauf', contact: 'Kontakt',
  },
  hero: {
    line1: 'SLIDE ist deine Digitalagentur in Bern.',
    line2: 'Wir erstellen Websites, pflegen dein Social Media und lösen deine IT-Fragen.',
    cta: 'Erstgespräch buchen →', secondary: 'Wie läuft das ab? →',
    stat1: '100%', stat1Label: 'Weiterempfehlungsrate',
    stat2Label: '5.0 auf Google',
    stat3: '2 Wochen', stat3Label: 'Lieferzeit',
  },
  services: {
    label: 'Unsere Leistungen',
    heading: ['Alles aus einer Hand.', 'Ohne Umwege.'],
    cta: 'Kostenloses Erstgespräch →',
    items: [
      { title: 'Website\nDevelopment',    tagline: 'Responsive, schnell & modern',       features: ['Frontend Development', 'Backend Development', 'Full Stack', 'Responsive Design', 'API Integration'] },
      { title: 'Social Media\nManagement', tagline: 'Content, der Kunden bringt',         features: ['Content Creation', 'Strategy', 'Branding', 'Reels & Shorts', 'Audience Growth'] },
      { title: 'Email\nMarketing',         tagline: 'Newsletter, die geöffnet werden',    features: ['Campaign Design', 'Automation', 'Newsletter Design', 'Analytics', 'Conversion Optimization'] },
    ],
  },
  process: {
    label: 'Der Ablauf',
    heading: ['Von null auf fertig', 'in 4 Wochen.'],
    cta: 'Ablauf ansehen →',
    steps: [
      { title: 'Brief',  desc: 'Kostenloses Erstgespräch. Wir verstehen deine Ziele, dein Budget und deinen Zeitplan.' },
      { title: 'Build',  desc: 'Wir entwickeln deine Lösung – Design, Entwicklung und Content aus einer Hand.' },
      { title: 'Launch', desc: 'Live in 4 Wochen. Kein Versprechen – ein fertiges Produkt, das funktioniert.' },
    ],
  },
  references: {
    label: 'Neueste Referenzen', heading: 'Referenzen, die sprechen.', cta: 'Projekt starten →',
    meta: { location: 'Location', industry: 'Industry', service: 'Services' },
  },
  testimonials: { label: 'Was Kunden sagen' },
  about: {
    label: 'Über uns',
    heading1: 'SLIDE ist eine Digitalagentur aus Bern.',
    heading2: 'Wir glauben, dass Technik einfach funktionieren sollte – klar, verständlich und effektiv.',
    values: [
      { num: '01', title: 'Einfachheit',   desc: 'Wir erklären Dinge verständlich. Technik soll dir helfen, nicht im Weg stehen. Prozesse und Abläufe machen wir transparent und nachvollziehbar.' },
      { num: '02', title: 'Kreativität',   desc: 'Wir entwickeln Lösungen, die deine Marke sichtbar machen. Mit durchdachtem Design und innovativen Ideen schaffen wir Ergebnisse mit Wirkung.' },
      { num: '03', title: 'Partnerschaft', desc: 'Vertrauen ist die Grundlage unserer Arbeit. Wir agieren ehrlich und transparent. Langfristige Beziehungen sind uns wichtiger als kurzfristige Gewinne.' },
    ],
    founderRole: 'Gründer & Webentwickler',
    founderGreeting: 'Hi, ich bin Akif!',
    bio1: 'Seit 2023 baue ich Websites für Schweizer KMU. Mein Fokus? Keine komplizierten Extras, sondern einfache Seiten, die genau das tun, was sie sollen: funktionieren und Kunden bringen.',
    bio2: 'Alles begann mit meinen ersten Zertifikaten in Webprogrammierung. Nach über 10 erfolgreichen Projekten habe ich daraus SLIDE gegründet. Nebenbei unterstütze ich die Hilfsorganisation Time to Help ehrenamtlich bei der IT und Organisation.',
    bio3Quote: 'Was ich heute baue, wird morgen genutzt.',
    statsLabels: ['Projekte', 'Kunden', 'Seit'],
  },
  contact: {
    label: 'Kontakt', heading: 'Bereit loszulegen?',
    formLabel: 'Formular ausfüllen für ein kostenloses Erstgespräch:',
    fields: {
      name: 'Dein Name', namePh: 'Deinen Namen eingeben',
      email: 'Deine E-Mail', emailPh: 'deine@email.com',
      phone: 'Telefon (Optional)', phonePh: '+41 ...',
      subject: 'Betreff', subjectDefault: 'Thema wählen...',
      message: 'Nachricht', messagePh: 'Erzähl uns von deinem Projekt...',
    },
    subjects: ['Website', 'Social Media', 'E-Mail', 'IT-Support', 'Sonstiges'],
    submit: 'Nachricht senden →',
    success: 'Nachricht gesendet! Wir melden uns innerhalb von 24 Stunden.',
    error: 'Ein Fehler ist aufgetreten. Schreib uns direkt: info@slideagentur.ch',
    cta: "Let's work together →",
    infoLabels: ['E-Mail', 'Telefon', 'Standort', 'Antwortzeit'],
    infoValues: ['info@slideagentur.ch', '+41 78 326 29 52', 'Ostermundigen, Bern, Schweiz', 'Innert 24 Stunden'],
  },
  footer: {
    desc: 'Digitalagentur für Websites, Social Media und IT-Lösungen. Bern, Schweiz.',
    col1: 'Leistungen', col2: 'Unternehmen', col3: 'Kontakt', col4: 'Social',
    rights: '© 2026 SLIDE. Alle Rechte vorbehalten.',
    services: ['Website Entwicklung', 'Social Media', 'E-Mail & Domain', 'IT-Support'],
    company: ['Über uns', 'Referenzen', 'Preise', 'Ablauf', 'Kontakt'],
  },
  modal: {
    heading: 'Sprache wählen',
    sub: 'Bitte wähle deine bevorzugte Sprache.',
  },
  flyout: {
    counts: ['/5 Leistungen', '/4 Leistungen', '/3 Leistungen'],
  },
}

const en: typeof de = {
  nav: {
    services: 'Services', references: 'Portfolio', about: 'About',
    process: 'Process', contact: 'Contact',
  },
  hero: {
    line1: 'SLIDE is your digital agency in Berne.',
    line2: 'We build websites, manage your social media and solve your IT challenges.',
    cta: 'Book a free call →', secondary: 'How does it work? →',
    stat1: '100%', stat1Label: 'Referral rate',
    stat2Label: '5.0 on Google',
    stat3: '2 weeks', stat3Label: 'Delivery time',
  },
  services: {
    label: 'Our Services',
    heading: ['Everything from one source.', 'No detours.'],
    cta: 'Free consultation →',
    items: [
      { title: 'Website\nDevelopment',    tagline: 'Responsive, fast & modern',          features: ['Frontend Development', 'Backend Development', 'Full Stack', 'Responsive Design', 'API Integration'] },
      { title: 'Social Media\nManagement', tagline: 'Content that converts',              features: ['Content Creation', 'Strategy', 'Branding', 'Reels & Shorts', 'Audience Growth'] },
      { title: 'Email\nMarketing',         tagline: 'Newsletters that get opened',       features: ['Campaign Design', 'Automation', 'Newsletter Design', 'Analytics', 'Conversion Optimization'] },
    ],
  },
  process: {
    label: 'The Process',
    heading: ['From zero to live', 'in 4 weeks.'],
    cta: 'See full process →',
    steps: [
      { title: 'Brief',  desc: 'Free consultation. We understand your goals, budget and timeline.' },
      { title: 'Build',  desc: 'We develop your solution — design, development and content from one source.' },
      { title: 'Launch', desc: 'Live in 4 weeks. Not a promise — a finished product that works.' },
    ],
  },
  references: {
    label: 'Latest Work', heading: 'Work that speaks for itself.', cta: 'Start a project →',
    meta: { location: 'Location', industry: 'Industry', service: 'Services' },
  },
  testimonials: { label: 'What clients say' },
  about: {
    label: 'About us',
    heading1: 'SLIDE is a digital agency from Berne.',
    heading2: 'We believe technology should just work — clear, understandable, and effective.',
    values: [
      { num: '01', title: 'Simplicity',    desc: 'We explain things clearly. Technology should help you, not get in your way. We make processes transparent and easy to follow.' },
      { num: '02', title: 'Creativity',    desc: 'We develop solutions that make your brand visible. With thoughtful design and innovative ideas, we deliver results that make an impact.' },
      { num: '03', title: 'Partnership',   desc: 'Trust is the foundation of our work. We act honestly and transparently. Long-term relationships matter more to us than short-term gains.' },
    ],
    founderRole: 'Founder & Web Developer',
    founderGreeting: "Hi, I'm Akif!",
    bio1: "Since 2023 I've been building websites for Swiss SMEs. My focus? No complicated extras — just clean sites that do exactly what they're supposed to: work and bring in clients.",
    bio2: "It all started with my first web programming certificates. After over 10 successful projects, I founded SLIDE. In my spare time I volunteer with the aid organisation Time to Help, helping with IT and organisation.",
    bio3Quote: 'What I build today will be used tomorrow.',
    statsLabels: ['Projects', 'Clients', 'Since'],
  },
  contact: {
    label: 'Contact', heading: 'Ready to get started?',
    formLabel: 'Fill in the form for a free consultation:',
    fields: {
      name: 'Your name', namePh: 'Enter your name',
      email: 'Your email', emailPh: 'your@email.com',
      phone: 'Phone (optional)', phonePh: '+41 ...',
      subject: 'Subject', subjectDefault: 'Choose a topic...',
      message: 'Message', messagePh: 'Tell us about your project...',
    },
    subjects: ['Website', 'Social Media', 'Email', 'IT Support', 'Other'],
    submit: 'Send message →',
    success: "Message sent! We'll get back to you within 24 hours.",
    error: 'An error occurred. Write to us at: info@slideagentur.ch',
    cta: "Let's work together →",
    infoLabels: ['Email', 'Phone', 'Location', 'Response time'],
    infoValues: ['info@slideagentur.ch', '+41 78 326 29 52', 'Ostermundigen, Berne, Switzerland', 'Within 24 hours'],
  },
  footer: {
    desc: 'Digital agency for websites, social media and IT solutions. Berne, Switzerland.',
    col1: 'Services', col2: 'Company', col3: 'Contact', col4: 'Social',
    rights: '© 2026 SLIDE. All rights reserved.',
    services: ['Website Development', 'Social Media', 'Email & Domain', 'IT Support'],
    company: ['About us', 'Portfolio', 'Pricing', 'Process', 'Contact'],
  },
  modal: {
    heading: 'Choose language',
    sub: 'Please select your preferred language.',
  },
  flyout: {
    counts: ['/5 services', '/4 services', '/3 services'],
  },
}

export const translations: Record<Lang, typeof de> = { de, en }
export type T = typeof de
