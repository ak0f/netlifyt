'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import {
  DEFAULT_INTEGRATION_IDS, calculatePrice, deliveryRange, extraWorkDays,
  type AddonId, type BillingCycle, type ConfigSelection, type CustomBlockId,
  type DeadlineId, type DesignTierNumber, type PackageId,
} from '@/lib/onboarding'
import StepProfile, { profileComplete, type Profile } from './StepProfile'
import StepConfig from './StepConfig'
import StepDesign from './StepDesign'
import StepTiming from './StepTiming'
import StepReview from './StepReview'
import PriceBar from './PriceBar'
import { DISPLAY_FONT, EASE, eyebrowStyle } from './ui'

export interface WizardState {
  profile: Profile
  configMode: 'standard' | 'custom'
  packageId: PackageId
  addonIds: AddonId[]
  blockIds: CustomBlockId[]
  integrationIds: string[]
  designTier: DesignTierNumber
  deadlineId: DeadlineId | ''
  billing: BillingCycle
  note: string
}

function initialState(): WizardState {
  return {
    profile: { name: '', email: '', company: '', website: '', industry: '' },
    configMode: 'standard',
    packageId: 'infrastruktur',
    addonIds: [],
    blockIds: [],
    integrationIds: [...DEFAULT_INTEGRATION_IDS],
    designTier: 1,
    deadlineId: '',
    billing: 'monthly',
    note: '',
  }
}

const LAST_STEP = 4

export default function OnboardingWizard() {
  const { t, lang } = useLang()
  const o = t.onboarding

  const [state, setState] = useState<WizardState>(initialState)
  const [step, setStep] = useState(0)
  const [maxReached, setMaxReached] = useState(0)
  const [profileSubStep, setProfileSubStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  // null = kein Fehler. Sonst der Text, der angezeigt wird: entweder die
  // konkrete Meldung vom Dashboard (Limit erreicht, Feld fehlt) oder der
  // allgemeine Hinweis auf die E-Mail-Adresse.
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  // Für Bots: unsichtbares Feld, das kein Mensch ausfüllt. Der Server verwirft
  // die Anfrage still, wenn etwas drinsteht.
  const [hp, setHp] = useState('')

  function patch(partial: Partial<WizardState>) {
    setState(s => ({ ...s, ...partial }))
  }

  const config: ConfigSelection = useMemo(
    () =>
      state.configMode === 'standard'
        ? { mode: 'standard', packageId: state.packageId, addonIds: state.addonIds }
        : { mode: 'custom', blockIds: state.blockIds },
    [state.configMode, state.packageId, state.addonIds, state.blockIds]
  )

  const price = useMemo(
    () =>
      calculatePrice({
        config,
        integrationIds: state.integrationIds,
        designTier: state.designTier,
        deadlineId: state.deadlineId || 'normal',
      }),
    [config, state.integrationIds, state.designTier, state.deadlineId]
  )

  // Zusatzaufwand aus der Auswahl. Verschiebt alle drei Lieferspannen, spielt
  // für den Preis keine Rolle.
  const extraDays = useMemo(
    () => extraWorkDays({ config, integrationIds: state.integrationIds, designTier: state.designTier }),
    [config, state.integrationIds, state.designTier]
  )

  function canAdvance(): boolean {
    if (step === 0) return profileComplete(state.profile)
    if (step === 1) return state.configMode === 'standard' ? Boolean(state.packageId) : state.blockIds.length > 0
    if (step === 3) return Boolean(state.deadlineId)
    return true
  }

  function goToStep(target: number) {
    setStep(target)
    setMaxReached(m => Math.max(m, target))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goNext() {
    if (!canAdvance()) return
    goToStep(Math.min(step + 1, LAST_STEP))
  }

  function goBack() {
    setStep(s => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submit() {
    if (!canAdvance() || !state.deadlineId) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hp,
          profile: state.profile,
          config,
          integrationIds: state.integrationIds,
          designTier: state.designTier,
          deadlineId: state.deadlineId,
          billing: state.billing,
          note: state.note,
          // Nur zum Abgleich. Verbindlich ist, was das Dashboard nachrechnet.
          estimate: { oneTimeTotal: price.oneTimeTotal, monthlyTotal: price.monthlyTotal },
          // Was dem Kunden als Lieferspanne angezeigt wurde, damit in der
          // Kundenakte steht, worauf er sich eingestellt hat.
          delivery: deliveryRange(state.deadlineId, extraDays),
        }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        setError(data.error || o.error)
        return
      }
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError(o.error)
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ textAlign: 'center', padding: 'clamp(2.5rem, 8vw, 5rem) 0' }}
      >
        <div
          style={{
            width: '46px', height: '46px', margin: '0 auto 1.75rem', borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width="19" height="19" aria-hidden>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 style={{ fontFamily: DISPLAY_FONT, fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>
          {o.done.heading}
        </h2>
        <p style={{ margin: '1rem auto 2rem', maxWidth: '30rem', fontSize: '15.41px', lineHeight: 1.7, color: 'rgb(178,178,178)' }}>
          {o.done.body}
        </p>
        <Link href="/" className="btn-dark">{o.done.back}</Link>
      </motion.div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '46rem', margin: '0 auto' }}>
      {/* Fortschritt: erreichte Schritte sind anklickbar, spätere nicht. */}
      <div style={{ marginBottom: '1.6rem' }}>
        {/* Der Balken ist 2px hoch, die Schaltfläche darum herum 18px. Sonst
            wäre der Sprung zurück auf dem Handy nicht zu treffen. */}
        <div style={{ display: 'flex', gap: '6px', margin: '-8px 0 0.6rem' }}>
          {o.steps.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => i <= maxReached && goToStep(i)}
              disabled={i > maxReached}
              aria-label={label}
              aria-current={i === step ? 'step' : undefined}
              style={{
                flex: 1, padding: '8px 0', border: 'none', background: 'none',
                cursor: i <= maxReached ? 'pointer' : 'default',
              }}
            >
              <span
                style={{
                  display: 'block', height: '2px', borderRadius: '2px',
                  background: i <= step
                    ? 'rgba(255,255,255,0.9)'
                    : i <= maxReached ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                  transition: `background 0.3s var(--ease)`,
                }}
              />
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
          <span style={eyebrowStyle}>{o.steps[step]}</span>
          <span style={{ ...eyebrowStyle, color: 'rgba(255,255,255,0.4)' }}>
            {o.stepWord} {step + 1} {o.ofWord} {o.steps.length}
          </span>
        </div>
      </div>

      {step >= 1 && <PriceBar price={price} billing={state.billing} lang={lang} t={o} />}

      <div style={{ background: 'rgb(28,28,28)', borderRadius: '20px', padding: 'clamp(1.25rem, 4vw, 2.25rem)' }}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepProfile
              key="profile"
              profile={state.profile}
              onChange={profile => patch({ profile })}
              subStep={profileSubStep}
              setSubStep={setProfileSubStep}
              onDone={profile => {
                patch({ profile })
                if (profileComplete(profile)) goToStep(1)
              }}
              t={o}
              lang={lang}
            />
          )}
          {step === 1 && (
            <StepConfig
              key="config"
              state={state}
              patch={patch}
              onBack={goBack}
              onNext={goNext}
              canAdvance={canAdvance()}
              t={o}
              lang={lang}
            />
          )}
          {step === 2 && (
            <StepDesign
              key="design"
              designTier={state.designTier}
              onChange={designTier => patch({ designTier })}
              onBack={goBack}
              onNext={goNext}
              t={o}
              lang={lang}
            />
          )}
          {step === 3 && (
            <StepTiming
              key="timing"
              deadlineId={state.deadlineId}
              note={state.note}
              extraDays={extraDays}
              onChange={partial => patch(partial)}
              onBack={goBack}
              onNext={goNext}
              canAdvance={canAdvance()}
              t={o}
              lang={lang}
            />
          )}
          {step === 4 && (
            <StepReview
              key="review"
              state={state}
              price={price}
              extraDays={extraDays}
              goToStep={goToStep}
              onBack={goBack}
              onSubmit={submit}
              submitting={submitting}
              error={error}
              t={o}
              lang={lang}
            />
          )}
        </AnimatePresence>

        <input
          type="text"
          value={hp}
          onChange={e => setHp(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 0, height: 0, opacity: 0 }}
        />
      </div>
    </div>
  )
}
