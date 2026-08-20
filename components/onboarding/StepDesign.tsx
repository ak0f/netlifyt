'use client'

import { motion } from 'framer-motion'
import { DESIGN_TIERS, chf, getDesignTier, type DesignTierNumber } from '@/lib/onboarding'
import type { Lang, T } from '@/lib/i18n'
import { DISPLAY_FONT, EASE, NavRow, StepShell, Tick, eyebrowStyle, hintStyle, stepHeadingStyle, subTextStyle } from './ui'

/**
 * Ein Schieberegler statt fünf Karten: die Stufen sind eine Skala, keine
 * Alternativen. Beim Ziehen wechselt die Beschreibung mit, damit der
 * Aufschlag zur Wirkung sichtbar wird und nicht abstrakt bleibt.
 */
export default function StepDesign({
  designTier,
  onChange,
  onBack,
  onNext,
  t,
  lang,
}: {
  designTier: DesignTierNumber
  onChange: (tier: DesignTierNumber) => void
  onBack: () => void
  onNext: () => void
  t: T['onboarding']
  lang: Lang
}) {
  const d = t.design
  const tier = getDesignTier(designTier)

  const surcharge = [
    tier.oneTime > 0 ? `+${chf(tier.oneTime, lang)}` : '',
    tier.monthly > 0 ? `+${chf(tier.monthly, lang)}${t.config.perMonthShort}` : '',
  ].filter(Boolean).join(' · ') || d.noSurcharge

  return (
    <StepShell>
      <div>
        <h2 style={stepHeadingStyle}>{d.heading}</h2>
        <p style={subTextStyle}>{d.sub}</p>
      </div>

      <div style={{ border: '1px solid rgba(255,255,255,0.09)', borderRadius: '16px', background: 'rgba(255,255,255,0.025)', padding: '1.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
          <span style={eyebrowStyle}>{designTier}/5</span>
          <span style={{ fontSize: '13.5px', color: 'rgb(178,178,178)' }}>{surcharge}</span>
        </div>

        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={designTier}
          aria-label={d.heading}
          onChange={e => onChange(Number(e.target.value) as DesignTierNumber)}
          style={{ width: '100%', marginTop: '1.1rem', accentColor: '#ffffff', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '10.5px', color: 'rgba(255,255,255,0.4)' }}>
          {DESIGN_TIERS.map(x => (
            <span key={x.tier}>{x.tier}</span>
          ))}
        </div>

        <motion.div
          key={tier.tier}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: EASE }}
          style={{ marginTop: '1.5rem' }}
        >
          <h3 style={{ fontFamily: DISPLAY_FONT, fontSize: '21px', fontWeight: 400, letterSpacing: '-0.01em', margin: 0 }}>
            {tier.name[lang]}
          </h3>
          <p style={{ margin: '0.3rem 0 0', fontSize: '13.5px', color: 'rgb(178,178,178)' }}>{tier.tagline[lang]}</p>
          <ul style={{ listStyle: 'none', margin: '0.9rem 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {tier.features[lang].map(f => (
              <li key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '12.5px', color: 'rgba(255,255,255,0.7)' }}>
                <Tick />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <p style={{ ...hintStyle, lineHeight: 1.6 }}>{d.note}</p>

      <NavRow onBack={onBack} backLabel={t.back} onNext={onNext} nextLabel={t.next} />
    </StepShell>
  )
}
