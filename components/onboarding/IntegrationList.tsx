'use client'

import {
  INTEGRATIONS,
  INTEGRATION_BADGE_LABEL,
  chf,
  nextDiscountTier,
  quantityDiscountPct,
} from '@/lib/onboarding'
import type { Lang, T } from '@/lib/i18n'
import { CheckBox, Pill, eyebrowStyle, fill, hintStyle, optionStyle } from './ui'

/**
 * Der Mengenrabatt steht direkt neben der Liste und aktualisiert sich beim
 * Anklicken. Ein Rabatt, den man erst auf der Rechnung sieht, ändert kein
 * Verhalten.
 */
export default function IntegrationList({
  selectedIds,
  onToggle,
  t,
  lang,
}: {
  selectedIds: string[]
  onToggle: (id: string) => void
  t: T['onboarding']['config']
  lang: Lang
}) {
  const count = selectedIds.length
  const pct = quantityDiscountPct(count)
  const next = nextDiscountTier(count)

  const discountLine = pct > 0
    ? fill(t.discountActive, { pct: Math.round(pct * 100) }) +
      (next ? `, ${fill(t.discountNextShort, { n: next.needed, pct: Math.round(next.pct * 100) })}` : '')
    : next
      ? fill(t.discountNext, { n: next.needed, pct: Math.round(next.pct * 100) })
      : ''

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={eyebrowStyle}>{t.integrationsTitle}</span>
        {discountLine && (
          <span style={{ fontSize: '12px', color: pct > 0 ? '#fff' : 'rgba(255,255,255,0.45)' }}>{discountLine}</span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {INTEGRATIONS.map(integration => {
          const active = selectedIds.includes(integration.id)
          return (
            <button
              key={integration.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(integration.id)}
              style={{
                ...optionStyle(active, 11),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                padding: '0.7rem 0.9rem',
              }}
            >
              <span style={{ display: 'flex', minWidth: 0, alignItems: 'center', gap: '0.6rem' }}>
                <CheckBox checked={active} />
                <span style={{ fontSize: '13.5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {integration.name[lang]}
                </span>
                {integration.badge && (
                  <Pill strong={integration.badge === 'empfohlen' || integration.badge === 'sehr_beliebt'}>
                    {INTEGRATION_BADGE_LABEL[integration.badge][lang]}
                  </Pill>
                )}
              </span>
              <span style={{ flex: 'none', fontSize: '12.5px', color: 'rgba(255,255,255,0.55)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                {integration.oneTime > 0 ? `+${chf(integration.oneTime, lang)}` : t.noSetup}
                {integration.monthly > 0 && ` · +${chf(integration.monthly, lang)}${t.perMonthShort}`}
                {integration.monthly === 0 && integration.monthlyKind === 'einmalig' && ` · ${t.oneOff}`}
              </span>
            </button>
          )
        })}
      </div>

      <p style={{ ...hintStyle, marginTop: '0.75rem', lineHeight: 1.6 }}>{t.discountNote}</p>
    </div>
  )
}
