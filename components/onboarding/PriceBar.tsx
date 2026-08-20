'use client'

import { motion } from 'framer-motion'
import { chf, type BillingCycle, type PriceBreakdown } from '@/lib/onboarding'
import type { Lang, T } from '@/lib/i18n'
import { EASE, DISPLAY_FONT, eyebrowStyle } from './ui'

/**
 * Der Preis klebt oben mit, sobald der Besucher konfiguriert. Glass-Muster
 * wie Navbar und Cookie-Banner (DESIGN.md §13.7), damit die Leiste über dem
 * Inhalt schwebt statt ihn zu unterbrechen.
 *
 * Die Beträge wechseln per `key`, damit Framer sie neu einblendet: eine
 * Zahl, die sich lautlos ändert, wird beim Klicken weiter unten übersehen.
 */
export default function PriceBar({
  price,
  billing,
  lang,
  t,
}: {
  price: PriceBreakdown
  billing: BillingCycle
  lang: Lang
  t: T['onboarding']
}) {
  const recurring =
    billing === 'yearly'
      ? `${chf(price.yearlyTotal, lang)} ${t.perYear}`
      : `${chf(price.monthlyTotal, lang)} ${t.perMonth}`

  return (
    <div
      style={{
        position: 'sticky',
        top: 'calc(env(safe-area-inset-top, 0px) + max(5.5vw, 74px))',
        zIndex: 20,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '0.6rem 1.25rem',
        background: 'rgba(36,36,36,0.5)',
        backdropFilter: 'blur(46.23px)',
        WebkitBackdropFilter: 'blur(46.23px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '15.41px',
        padding: '0.85rem 1.15rem',
        marginBottom: '1.25rem',
      }}
    >
      <span style={eyebrowStyle}>{t.priceLabel}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
        <motion.span
          key={price.oneTimeTotal}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          style={{ fontFamily: DISPLAY_FONT, fontSize: 'clamp(19px, 2.2vw, 24px)', letterSpacing: '-0.01em', color: '#fff' }}
        >
          {chf(price.oneTimeTotal, lang)}
        </motion.span>
        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{t.oneTime}</span>
        <motion.span
          key={`r-${price.monthlyTotal}-${billing}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
          style={{ fontSize: '13.5px', color: 'rgb(178,178,178)' }}
        >
          {recurring}
        </motion.span>
      </div>
    </div>
  )
}
