import type { Metadata } from 'next'
import LeistungenIndex from './LeistungenIndex'

export const metadata: Metadata = {
  title: 'Leistungen | Webdesign, Social Media & IT – SLIDE Agentur Bern',
  description:
    'Die Leistungen von SLIDE, deiner Digitalagentur in Bern: Webdesign, Social Media Management, E-Mail-Marketing und IT-Support für Schweizer KMU. Alles aus einer Hand.',
  alternates: { canonical: 'https://slideagentur.ch/leistungen' },
  openGraph: {
    title: 'Leistungen | SLIDE Agentur Bern',
    description: 'Webdesign, Social Media, E-Mail-Marketing und IT-Support für Schweizer KMU.',
    url: 'https://slideagentur.ch/leistungen',
    siteName: 'SLIDE Agentur',
    locale: 'de_CH',
    type: 'website',
    images: ['/img/og.png'],
  },
}

export default function LeistungenPage() {
  return <LeistungenIndex />
}
