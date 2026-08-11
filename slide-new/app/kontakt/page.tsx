import type { Metadata } from 'next'
import KontaktContent from './KontaktContent'

export const metadata: Metadata = {
  title: 'Kontakt | SLIDE Agentur – Digitalagentur in Bern',
  description:
    'Kontaktiere SLIDE, deine Digitalagentur in Bern. Kostenloses Erstgespräch für Website, Social Media und IT. Antwort innert 24 Stunden.',
  alternates: { canonical: 'https://slideagentur.ch/kontakt' },
  openGraph: {
    title: 'Kontakt | SLIDE Agentur',
    description: 'Kostenloses Erstgespräch für Website, Social Media und IT. Antwort innert 24 Stunden.',
    url: 'https://slideagentur.ch/kontakt',
    siteName: 'SLIDE Agentur',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function KontaktPage() {
  return <KontaktContent />
}
