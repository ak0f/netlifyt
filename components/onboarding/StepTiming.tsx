'use client'

import { DEADLINES, deliveryRange, type DeadlineId } from '@/lib/onboarding'
import type { Lang, T } from '@/lib/i18n'
import { NavRow, StepShell, eyebrowStyle, fill, hintStyle, optionStyle, stepHeadingStyle, subTextStyle } from './ui'

/**
 * Jede Spur zeigt ihre Lieferspanne und ihren Preisfaktor offen an. Ein
 * Aufpreis für Eile, der erst in der Offerte auftaucht, kostet Vertrauen, und
 * eine Spanne, die den Umfang ignoriert, verspricht Termine, die niemand hält.
 */
export default function StepTiming({
  deadlineId,
  note,
  extraDays,
  onChange,
  onBack,
  onNext,
  canAdvance,
  t,
  lang,
}: {
  deadlineId: DeadlineId | ''
  note: string
  /** Zusatzaufwand aus der Konfiguration, verschiebt alle drei Spannen. */
  extraDays: number
  onChange: (partial: { deadlineId?: DeadlineId; note?: string }) => void
  onBack: () => void
  onNext: () => void
  canAdvance: boolean
  t: T['onboarding']
  lang: Lang
}) {
  const ti = t.timing

  function rangeLabel(id: DeadlineId): string {
    const { lo, hi } = deliveryRange(id, extraDays)
    if (lo !== hi) return fill(ti.rangeDays, { lo, hi })
    return hi === 1 ? ti.rangeOneDay : fill(ti.rangeAbout, { hi })
  }

  return (
    <StepShell>
      <div>
        <h2 style={stepHeadingStyle}>{ti.heading}</h2>
        <p style={subTextStyle}>{ti.sub}</p>
      </div>

      <div>
        <span style={{ ...eyebrowStyle, marginBottom: '0.7rem' }}>{ti.deadlineLabel}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {DEADLINES.map(d => {
            const active = deadlineId === d.id
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ deadlineId: d.id })}
                style={{
                  ...optionStyle(active, 11),
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '0.75rem', padding: '0.8rem 0.95rem',
                }}
              >
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: '13.5px' }}>{d.label[lang]}</span>
                  <span style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                    {d.description[lang]}
                  </span>
                </span>
                <span style={{ flex: 'none', textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '13px', color: '#fff', whiteSpace: 'nowrap' }}>
                    {rangeLabel(d.id)}
                  </span>
                  {d.multiplier > 1 && (
                    <span style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                      × {d.multiplier}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
        <p style={{ ...hintStyle, marginTop: '0.75rem', lineHeight: 1.6 }}>{ti.scopeNote}</p>
        <p style={{ ...hintStyle, marginTop: '0.5rem', lineHeight: 1.6 }}>{ti.disclaimer}</p>
      </div>

      <div>
        <label htmlFor="onb-note" style={{ ...eyebrowStyle, marginBottom: '0.7rem' }}>{ti.noteLabel}</label>
        <textarea
          id="onb-note"
          className="ft"
          value={note}
          maxLength={4000}
          placeholder={ti.notePh}
          onChange={e => onChange({ note: e.target.value })}
        />
      </div>

      <NavRow onBack={onBack} backLabel={t.back} onNext={onNext} nextLabel={t.next} nextDisabled={!canAdvance} />
    </StepShell>
  )
}
