import type { Metadata } from 'next'
import AGBContent from './AGBContent'

export const metadata: Metadata = {
  title: 'AGB – SLIDE Agentur',
  description: 'Allgemeine Geschäftsbedingungen (AGB) der SLIDE Digitalagentur nach Schweizer Obligationenrecht.',
}

export default function AGBPage() {
  return <AGBContent />
}
