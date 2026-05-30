import type { Metadata } from 'next'
import { DM_Sans, IBM_Plex_Mono, Host_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import PageTransition from '@/components/PageTransition'
import CustomCursor from '@/components/CustomCursor'
import CookieBanner from '@/components/CookieBanner'
import LanguageModal from '@/components/LanguageModal'
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
  title: 'SLIDE Agentur – Wir machen digital einfach',
  description:
    'Wir machen digitale Referenzen einfach. Websites, Social Media Management & IT-Lösungen für kleine Unternehmen. Jetzt Kontakt aufnehmen!',
  icons: { icon: '/img/favicon.png' },
  openGraph: {
    title: 'SLIDE Agentur – Wir machen digital einfach',
    description: 'Websites, Social Media und IT-Lösungen für Schweizer KMU. Live in 4 Wochen.',
    url: 'https://slideagentur.ch',
    siteName: 'SLIDE Agentur',
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SLIDE Agentur – Wir machen digital einfach',
    description: 'Websites, Social Media und IT-Lösungen für Schweizer KMU. Live in 4 Wochen.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${dmSans.variable} ${ibmMono.variable} ${hostGrotesk.variable}`}>
        <LanguageProvider>
          <CustomCursor />
          <LoadingScreen />
          <LanguageModal />
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  )
}
