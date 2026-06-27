import type { Metadata } from 'next'
import { translations } from '@/lib/i18n'
import AblaufContent from './AblaufContent'

export const metadata: Metadata = {
  title: translations.de.ablauf.metaTitle,
  description: translations.de.ablauf.metaDesc,
}

export default function AblaufPage() {
  return <AblaufContent />
}
