import type { Metadata } from 'next'
import ReferenzenIndex from './ReferenzenIndex'

export const metadata: Metadata = {
  title: 'Referenzen – SLIDE Agentur',
  description:
    'Ausgewählte Projekte von SLIDE – Websites, Social Media und mehr für Schweizer KMU.',
  openGraph: {
    title: 'Referenzen – SLIDE Agentur',
    description: 'Ausgewählte Projekte von SLIDE – Websites, Social Media und mehr.',
    url: 'https://slideagentur.ch/referenzen',
    siteName: 'SLIDE Agentur',
    type: 'website',
  },
}

export default function Page() {
  return <ReferenzenIndex />
}
