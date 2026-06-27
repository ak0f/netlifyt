import type { Metadata } from 'next'
import { DM_Sans, IBM_Plex_Mono, Host_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import PageTransition from '@/components/PageTransition'
import CustomCursor from '@/components/CustomCursor'
import CookieBanner from '@/components/CookieBanner'
import { LanguageProvider } from '@/context/LanguageContext'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})
const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ibm-mono',
  display: 'swap',
})
const hostGrotesk = Host_Grotesk({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-hg',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://slideagentur.ch'),
  title: 'SLIDE Agentur | Digitalagentur in Bern für Websites, Social Media und IT',
  description:
    'SLIDE ist deine Digitalagentur in Bern. Wir bauen Websites, betreuen dein Social Media und lösen deine IT-Fragen. Für Schweizer KMU. Live in 4 Wochen.',
  keywords: [
    'Digitalagentur Bern', 'Webdesign Bern', 'Website erstellen Schweiz',
    'Social Media Agentur', 'IT-Support KMU', 'SLIDE Agentur',
  ],
  alternates: { canonical: 'https://slideagentur.ch' },
  icons: { icon: '/img/favicon.png' },
  openGraph: {
    title: 'SLIDE Agentur | Digitalagentur in Bern',
    description: 'Websites, Social Media und IT-Lösungen für Schweizer KMU. Live in 4 Wochen.',
    url: 'https://slideagentur.ch',
    siteName: 'SLIDE Agentur',
    locale: 'de_CH',
    type: 'website',
    images: [
      {
        url: '/img/og.png',
        width: 1200,
        height: 630,
        alt: 'SLIDE Agentur, Digitalagentur in Bern',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SLIDE Agentur | Digitalagentur in Bern',
    description: 'Websites, Social Media und IT-Lösungen für Schweizer KMU. Live in 4 Wochen.',
    images: ['/img/og.png'],
  },
}

/* Structured data for search engines and LLMs. Verified business facts only. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://slideagentur.ch/#organization',
  name: 'SLIDE Agentur',
  url: 'https://slideagentur.ch',
  image: 'https://slideagentur.ch/img/og.png',
  logo: 'https://slideagentur.ch/img/logo.png',
  description:
    'Digitalagentur in Bern für Websites, Social Media Management und IT-Lösungen für Schweizer KMU.',
  email: 'info@slideagentur.ch',
  telephone: '+41783262952',
  founder: { '@type': 'Person', name: 'Akif Yaylaci' },
  foundingDate: '2023',
  priceRange: 'CHF',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Forelstrasse 44',
    postalCode: '3072',
    addressLocality: 'Ostermundigen',
    addressRegion: 'Bern',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.9560,
    longitude: 7.4953,
  },
  knowsLanguage: ['de-CH', 'en'],
  areaServed: [
    { '@type': 'City', name: 'Bern' },
    { '@type': 'Country', name: 'Switzerland' },
  ],
  sameAs: [
    'https://www.instagram.com/slideagentur',
    'https://www.tiktok.com/@slideagentur',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Leistungen',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Management' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Email Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IT Support' } },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${dmSans.variable} ${ibmMono.variable} ${hostGrotesk.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <CustomCursor />
          <LoadingScreen />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  )
}
