import type { Metadata } from 'next'
import ImpressumContent from './ImpressumContent'

export const metadata: Metadata = {
  title: 'Impressum – SLIDE Agentur',
  description: 'Impressum und rechtliche Informationen der SLIDE Digitalagentur gemäss Art. 3 Abs. 1 lit. s UWG.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://slideagentur.ch/impressum' },
}

export default function ImpressumPage() {
  return <ImpressumContent />
}
