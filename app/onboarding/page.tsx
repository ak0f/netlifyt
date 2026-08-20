import type { Metadata } from 'next'
import { translations } from '@/lib/i18n'
import OnboardingContent from './OnboardingContent'

/* Metadaten sind serverseitig und kennen die Sprachwahl des Besuchers nicht
   (die steckt in localStorage, siehe context/LanguageContext.tsx). Wie auf den
   übrigen Seiten gilt deshalb Deutsch, hier aber aus lib/i18n.ts statt als
   zweite Textkopie. */
const de = translations.de.onboarding

export const metadata: Metadata = {
  title: de.metaTitle,
  description: de.metaDesc,
  alternates: { canonical: 'https://slideagentur.ch/onboarding' },
  openGraph: {
    title: de.metaTitle,
    description: de.metaDesc,
    url: 'https://slideagentur.ch/onboarding',
    siteName: 'SLIDE Agentur',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function OnboardingPage() {
  return <OnboardingContent />
}
