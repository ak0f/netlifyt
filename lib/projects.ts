import type { Lang } from './i18n'

/* ─── Bilingual reference data ───
   Each project powers both the homepage teaser card and its own
   detail page at /referenzen/[slug]. Optional fields (gallery,
   results, year) render only when present, so projects can be
   enriched later without touching the layout. */

type L = Record<Lang, string>

export type Media = { type: 'image' | 'video'; src: string }

export interface Project {
  slug: string
  img: string            // still image — used on cards and as video poster
  alt: string
  title: string
  desc: L
  quote: { text: L; author: L; avatar?: string }
  meta: { location: L; industry: L; service: L }
  links: { label: L; href: string }[]
  year?: string
  video?: string         // optional showcase video for the detail hero
  gallery?: Media[]
  results?: { value: string; label: L }[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'shots-by-levin',
    img: '/img/shotsbylevin.png',
    video: '/videos/shotsbylevin.mp4',
    alt: 'Shots by Levin Website',
    title: 'Shots by Levin',
    desc: {
      de: 'Eine moderne, responsive Website für Shots by Levin – einen Sportfotografen aus Bern. Klares Design mit Portfolio, Leistungsübersicht und integrierter Buchungsfunktion, optimiert für alle Bildschirmgrössen.',
      en: 'A modern, responsive website for Shots by Levin – a sports photographer from Berne. Clean design with portfolio, services overview and integrated booking, optimised for every screen size.',
    },
    quote: {
      text: {
        de: 'Akif ist ein sehr kreativer, sympathischer und vertrauenswürdiger Junge. Die Website sieht top aus und war sehr schnell fertig. Alles top!',
        en: 'Akif is a very creative, likeable and trustworthy guy. The website looks top and was finished very quickly. Everything top!',
      },
      author: { de: 'Levin', en: 'Levin' },
      avatar: '/img/levin.jpg',
    },
    meta: {
      location: { de: 'Bern, Schweiz', en: 'Berne, Switzerland' },
      industry: { de: 'Sportfotografie', en: 'Sports Photography' },
      service: { de: 'Website', en: 'Website' },
    },
    links: [{ label: { de: 'Website ansehen →', en: 'View website →' }, href: 'https://shotsbylevin.ch' }],
  },
  {
    slug: 'nj-clothing',
    img: '/img/nj-photo.jpeg',
    alt: 'N&J Fashion Kampagne',
    title: 'N&J',
    year: '2026',
    desc: {
      de: 'Foto- und Videoproduktion für die Kleidungsmarke N&J – gedreht an verschiedenen Standorten und aus unterschiedlichen Perspektiven, verbreitet über mehrere Social-Media-Accounts. Für ein Video wurde gezielt ein Hook eingebaut, um virale Reichweite zu erzeugen. Die Kampagne erreichte die Zielgruppe erfolgreich und steigerte die Verkäufe – mit insgesamt über 10\'000 Aufrufen.',
      en: 'Photo and video production for the clothing brand N&J – filmed at various locations and from different perspectives, distributed across multiple social media accounts. One video was built around a deliberate hook to drive viral reach. The campaign successfully reached the target audience and boosted sales – with over 10,000 views in total.',
    },
    quote: {
      text: {
        de: 'Die Videos sahen richtig gut aus und viele Leute haben danach bei uns ein Kleidungsstück gekauft. SLIDE Agentur hat das richtig gut gemacht – er hatte einen Plan und hat ihn sehr gut umgesetzt.',
        en: 'The videos looked really good and a lot of people bought a piece of clothing from us afterwards. SLIDE Agentur did a really great job – he had a plan and executed it very well.',
      },
      author: { de: 'Jules, Inhaber von N&J', en: 'Jules, owner of N&J' },
    },
    meta: {
      location: { de: 'Bern, Schweiz', en: 'Berne, Switzerland' },
      industry: { de: 'Modemarke / Fashion', en: 'Fashion Brand' },
      service: { de: 'Foto & Video, Social Media', en: 'Photo & Video, Social Media' },
    },
    results: [{ value: '10\'000+', label: { de: 'Aufrufe', en: 'Views' } }],
    gallery: [
      { type: 'video', src: '/videos/nj-sweater-video2.mp4' },
      { type: 'image', src: '/img/nj-sweater-model.jpeg' },
      { type: 'image', src: '/img/nj-sweater1.jpeg' },
      { type: 'video', src: '/videos/nj-sweater-video1.mp4' },
      { type: 'image', src: '/img/nj-tshirt1.jpeg' },
      { type: 'image', src: '/img/nj-tshirt-mockup.jpeg' },
      { type: 'image', src: '/img/nj-tshirt-mockup-back.jpeg' },
    ],
    links: [
      { label: { de: 'Website ansehen →', en: 'View website →' }, href: 'https://www.njshop.ch/' },
      { label: { de: 'TikTok →', en: 'TikTok →' }, href: 'https://www.tiktok.com/@nj.clothingbrand' },
    ],
  },
  {
    slug: 'wegmuehle-apotheke',
    img: '/img/apotheke.png',
    alt: 'Wegmühle Apotheke Website',
    title: 'Wegmühle Apotheke',
    year: '2024',
    desc: {
      de: 'Eine moderne, benutzerfreundliche Website für die Wegmühle Apotheke. Vollständig in HTML, CSS und JavaScript programmiert – schnell, klar und auf allen Geräten zuverlässig.',
      en: 'A modern, user-friendly website for Wegmühle Apotheke. Fully built in HTML, CSS and JavaScript – fast, clear and reliable on every device.',
    },
    quote: {
      text: {
        de: 'Die neue Website hat unsere Kundenanfragen spürbar erhöht. Schnelle Umsetzung, sauberes Ergebnis.',
        en: 'The new website noticeably increased our customer inquiries. Fast delivery, clean result.',
      },
      author: { de: 'M. Emch', en: 'M. Emch' },
    },
    meta: {
      location: { de: 'Bern, Schweiz', en: 'Berne, Switzerland' },
      industry: { de: 'Apotheke', en: 'Pharmacy' },
      service: { de: 'Website', en: 'Website' },
    },
    links: [{ label: { de: 'Website ansehen →', en: 'View website →' }, href: 'https://apotheke.akif.pw' }],
  },
  {
    slug: 'avanti-bistro',
    img: '/img/doner.png',
    alt: 'Avanti Bistro Website',
    title: 'Avanti Bistro Ittigen',
    year: '2024',
    desc: {
      de: 'Eine warme, responsive Website für das Avanti Bistro in Ittigen. Benutzerfreundliches Design, optimiert für alle Bildschirmgrössen.',
      en: 'A warm, responsive website for Avanti Bistro in Ittigen. User-friendly design, optimised for every screen size.',
    },
    quote: {
      text: {
        de: 'Unkomplizierte Zusammenarbeit, klare Kommunikation und ein Resultat, das überzeugt.',
        en: 'Straightforward collaboration, clear communication and a result that convinces.',
      },
      author: { de: 'Avanti Bistro', en: 'Avanti Bistro' },
    },
    meta: {
      location: { de: 'Ittigen, Bern', en: 'Ittigen, Berne' },
      industry: { de: 'Gastronomie', en: 'Gastronomy' },
      service: { de: 'Website', en: 'Website' },
    },
    links: [{ label: { de: 'Website ansehen →', en: 'View website →' }, href: 'https://avanti-bern.akif.pw' }],
  },
  {
    slug: 'zerotrace',
    img: '/img/zerotrace.png',
    alt: 'ZeroTrace Social Media',
    title: 'ZeroTrace',
    desc: {
      de: 'SLIDE hat die Social-Media-Kanäle von ZeroTrace übernommen und 1–2 Beiträge pro Woche erstellt. Die Online-Sichtbarkeit wurde deutlich gesteigert.',
      en: 'SLIDE took over ZeroTrace’s social media channels and produced 1–2 posts per week. Online visibility increased significantly.',
    },
    quote: {
      text: {
        de: 'Das Content Marketing ist sehr gut umgesetzt.',
        en: 'The content marketing is very well executed.',
      },
      author: { de: '9dl, CEO von ZeroTrace', en: '9dl, CEO of ZeroTrace' },
    },
    meta: {
      location: { de: 'Online', en: 'Online' },
      industry: { de: 'Tech / Privacy', en: 'Tech / Privacy' },
      service: { de: 'Social Media', en: 'Social Media' },
    },
    links: [
      { label: { de: 'TikTok →', en: 'TikTok →' }, href: 'https://www.tiktok.com/@zerotrace.pw' },
      { label: { de: 'Instagram →', en: 'Instagram →' }, href: 'https://www.instagram.com/zerotrace.pw' },
    ],
  },
  {
    slug: 'portfolio-akif-yaylaci',
    img: '/img/portfolio.png',
    alt: 'Portfolio Akif Yaylaci',
    title: 'Portfolio Akif Yaylaci',
    year: '2023',
    desc: {
      de: 'Das persönliche Portfolio des SLIDE-Gründers – ein modernes Webprojekt in HTML, CSS und JavaScript als Demonstration des handwerklichen Könnens.',
      en: 'The personal portfolio of SLIDE’s founder – a modern web project in HTML, CSS and JavaScript demonstrating craftsmanship.',
    },
    quote: {
      text: {
        de: 'Dein Portfolio hat uns recht beeindruckt.',
        en: 'Your portfolio quite impressed us.',
      },
      author: {
        de: 'Bundesamt für Informatik und Telekommunikation (BIT)',
        en: 'Federal Office of Information Technology (BIT)',
      },
    },
    meta: {
      location: { de: 'Bern, Schweiz', en: 'Berne, Switzerland' },
      industry: { de: 'Web Development', en: 'Web Development' },
      service: { de: 'Portfolio', en: 'Portfolio' },
    },
    links: [{ label: { de: 'Portfolio ansehen →', en: 'View portfolio →' }, href: 'https://akif.pw' }],
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug)
}
