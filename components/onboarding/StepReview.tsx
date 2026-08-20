'use client'

import type { ReactNode } from 'react'
import {
  DEADLINES, INDUSTRIES, chf, deliveryRange, getAddon, getCustomBlock, getDesignTier, getIntegration, getPackage,
  type PriceBreakdown,
} from '@/lib/onboarding'
import type { Lang, T } from '@/lib/i18n'
import type { WizardState } from './OnboardingWizard'
import { ArrowRight, StepShell, eyebrowStyle, fill, hintStyle, stepHeadingStyle, subTextStyle } from './ui'

export default function StepReview({
  state,
  price,
  extraDays,
  goToStep,
  onBack,
  onSubmit,
  submitting,
  error,
  t,
  lang,
}: {
  state: WizardState
  price: PriceBreakdown
  extraDays: number
  goToStep: (step: number) => void
  onBack: () => void
  onSubmit: () => void
  submitting: boolean
  error: string | null
  t: T['onboarding']
  lang: Lang
}) {
  const r = t.review
  const design = getDesignTier(state.designTier)
  const deadline = DEADLINES.find(d => d.id === state.deadlineId)
  const industry = INDUSTRIES.find(i => i.id === state.profile.industry)

  const deliveryLabel = (() => {
    if (!state.deadlineId) return r.empty
    const { lo, hi } = deliveryRange(state.deadlineId, extraDays)
    if (lo !== hi) return fill(t.timing.rangeDays, { lo, hi })
    return hi === 1 ? t.timing.rangeOneDay : fill(t.timing.rangeAbout, { hi })
  })()

  const configName =
    state.configMode === 'standard'
      ? getPackage(state.packageId).name[lang]
      : state.blockIds.map(id => getCustomBlock(id)?.name[lang]).filter(Boolean).join(', ')

  const addonNames = state.addonIds.map(id => getAddon(id)?.name[lang]).filter(Boolean)
  const integrationNames = state.integrationIds.map(id => getIntegration(id)?.name[lang]).filter(Boolean)

  return (
    <StepShell>
      <div>
        <h2 style={stepHeadingStyle}>{r.heading}</h2>
        <p style={subTextStyle}>{r.sub}</p>
      </div>

      <Card title={r.cardProfile} onEdit={() => goToStep(0)} editLabel={t.edit}>
        <Row label={r.rowName} value={state.profile.name || r.empty} />
        <Row label={r.rowEmail} value={state.profile.email || r.empty} />
        <Row label={r.rowCompany} value={state.profile.company || r.empty} />
        {state.profile.website && <Row label={r.rowWebsite} value={state.profile.website} />}
        <Row label={r.rowIndustry} value={industry?.label[lang] ?? r.empty} />
      </Card>

      <Card title={r.cardConfig} onEdit={() => goToStep(1)} editLabel={t.edit}>
        <Row label={r.rowPackage} value={configName || r.empty} />
        {addonNames.length > 0 && <Row label={r.rowAddons} value={addonNames.join(', ')} />}
        <Row label={r.rowIntegrations} value={integrationNames.length ? integrationNames.join(', ') : r.none} />
        <Row label={r.rowBilling} value={state.billing === 'yearly' ? t.config.billingYearly : t.config.billingMonthly} />
      </Card>

      <Card title={r.cardDesign} onEdit={() => goToStep(2)} editLabel={t.edit}>
        <Row label={r.rowTier} value={`${design.tier}/5 · ${design.name[lang]}`} />
        <Row label={r.rowSurcharge} value={design.oneTime > 0 ? chf(design.oneTime, lang) : t.design.noSurcharge} />
        <Row
          label={r.rowRunning}
          value={design.monthly > 0 ? `+${chf(design.monthly, lang)}${t.config.perMonthShort}` : r.none}
        />
      </Card>

      <Card title={r.cardTiming} onEdit={() => goToStep(3)} editLabel={t.edit}>
        <Row label={r.rowDeadline} value={deadline?.label[lang] ?? r.empty} />
        <Row label={r.rowDelivery} value={deliveryLabel} />
        <Row label={r.rowNote} value={state.note || r.empty} />
      </Card>

      {/* Die Aufschlüsselung steht bewusst vollständig da. Wer den Weg zur
          Zahl nachvollziehen kann, glaubt ihr eher. */}
      <div style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', background: 'rgba(255,255,255,0.045)', padding: '1.25rem' }}>
        <span style={{ ...eyebrowStyle, marginBottom: '0.9rem' }}>{r.breakdownTitle}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Line label={r.brBase} value={chf(price.baseOneTime, lang)} />
          <Line label={`${r.brIntegrations} (${price.integrationCount})`} value={chf(price.integrationsRawOneTime, lang)} />
          {price.integrationsDiscountAmount > 0 && (
            <Line
              label={`${r.brDiscount} ${Math.round(price.integrationsDiscountPct * 100)}%`}
              value={`− ${chf(price.integrationsDiscountAmount, lang)}`}
            />
          )}
          {price.designOneTime > 0 && <Line label={r.brDesign} value={chf(price.designOneTime, lang)} />}
          {price.deadlineMultiplier > 1 && (
            <Line label={r.brDeadline} value={`× ${price.deadlineMultiplier}`} />
          )}
          <Line label={r.brSetup} value={chf(price.projectSetupFee, lang)} />
          <Line label={r.brOneTime} value={chf(price.oneTimeTotal, lang)} strong />
          <Line
            label={state.billing === 'yearly' ? r.brYearly : r.brMonthly}
            value={chf(state.billing === 'yearly' ? price.yearlyTotal : price.monthlyTotal, lang)}
            strong
          />
          {state.billing === 'yearly' && price.yearlySavings > 0 && (
            <Line label={r.brSaving} value={`− ${chf(price.yearlySavings, lang)}`} />
          )}
        </div>
      </div>

      <p style={{ ...hintStyle, lineHeight: 1.6 }}>{r.disclaimer}</p>

      {error && <p role="alert" style={{ fontSize: '14px', color: '#f87171', margin: 0 }}>{error}</p>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginTop: '0.4rem' }}>
        <button
          type="button"
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontFamily: 'inherit', fontSize: '14px', cursor: 'pointer', padding: 0 }}
        >
          ← {t.back}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="btn-cta"
          style={{ opacity: submitting ? 0.5 : 1, cursor: submitting ? 'default' : 'pointer' }}
        >
          {submitting ? r.submitting : r.submit}
          {!submitting && <ArrowRight />}
        </button>
      </div>
    </StepShell>
  )
}

function Card({ title, onEdit, editLabel, children }: { title: string; onEdit: () => void; editLabel: string; children: ReactNode }) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', background: 'rgba(255,255,255,0.025)', padding: '1.2rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.85rem' }}>
        <span style={eyebrowStyle}>{title}</span>
        <button
          type="button"
          onClick={onEdit}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          {editLabel}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <span style={{ flex: 'none', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{label}</span>
      <span style={{ fontSize: '13.5px', color: '#fff', textAlign: 'right', wordBreak: 'break-word' }}>{value}</span>
    </div>
  )
}

function Line({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div
      style={{
        display: 'flex', justifyContent: 'space-between', gap: '1.25rem',
        paddingTop: strong ? '0.5rem' : 0,
        borderTop: strong ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}
    >
      <span style={{ fontSize: '13px', color: strong ? '#fff' : 'rgba(255,255,255,0.5)' }}>{label}</span>
      <span style={{ fontSize: '13.5px', color: strong ? '#fff' : 'rgb(178,178,178)', whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  )
}
