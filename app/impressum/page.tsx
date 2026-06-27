import type { Metadata } from 'next'
import ImpressumContent from './ImpressumContent'

export const metadata: Metadata = {
  title: 'Impressum – SLIDE Agentur',
  description: 'Impressum und rechtliche Informationen der SLIDE Digitalagentur gemäss Art. 3 Abs. 1 lit. s UWG.',
}

export default function ImpressumPage() {
  return <ImpressumContent />
}
