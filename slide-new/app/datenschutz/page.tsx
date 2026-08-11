import type { Metadata } from 'next'
import DatenschutzContent from './DatenschutzContent'

export const metadata: Metadata = {
  title: 'Datenschutz – SLIDE Agentur',
  description: 'Datenschutzerklärung der SLIDE Digitalagentur nach revidiertem Schweizer DSG und EU-DSGVO.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://slideagentur.ch/datenschutz' },
}

export default function DatenschutzPage() {
  return <DatenschutzContent />
}
