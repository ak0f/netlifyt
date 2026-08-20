'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { INDUSTRIES } from '@/lib/onboarding'
import type { Lang, T } from '@/lib/i18n'
import { StepShell, NavRow, optionStyle, stepHeadingStyle, subTextStyle, hintStyle } from './ui'

export interface Profile {
  name: string
  email: string
  company: string
  website: string
  industry: string
}

type FieldKey = 'name' | 'email' | 'company' | 'website'

export function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function profileComplete(p: Profile) {
  return Boolean(p.name.trim() && isValidEmail(p.email) && p.industry)
}

/**
 * Eine Frage pro Bildschirm, wie im Kontaktformular der Startseite. Ein
 * Formular mit fünf Feldern auf einmal wirkt hier wie Arbeit; einzeln gefragt
 * fühlt es sich nach Gespräch an und die Abbruchquote sinkt.
 */
export default function StepProfile({
  profile,
  onChange,
  subStep,
  setSubStep,
  onDone,
  onBack,
  t,
  lang,
}: {
  profile: Profile
  onChange: (p: Profile) => void
  subStep: number
  setSubStep: (n: number) => void
  /**
   * Bekommt das fertige Profil mit, statt nur "weiter" zu melden. Sonst würde
   * der Wizard im selben Render noch das Profil ohne Branche prüfen und den
   * Schritt nicht freigeben.
   */
  onDone: (profile: Profile) => void
  onBack?: () => void
  t: T['onboarding']
  lang: Lang
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const p = t.profile

  const FIELDS: { key: FieldKey; label: string; hint: string; ph: string; required: boolean; type: 'text' | 'email' }[] = [
    { key: 'name',    label: p.nameLabel,    hint: p.nameHint,    ph: p.namePh,    required: true,  type: 'text' },
    { key: 'email',   label: p.emailLabel,   hint: p.emailHint,   ph: p.emailPh,   required: true,  type: 'email' },
    { key: 'company', label: p.companyLabel, hint: p.companyHint, ph: p.companyPh, required: false, type: 'text' },
    { key: 'website', label: p.websiteLabel, hint: p.websiteHint, ph: p.websitePh, required: false, type: 'text' },
  ]

  useEffect(() => {
    if (subStep < FIELDS.length) inputRef.current?.focus({ preventScroll: true })
  }, [subStep, FIELDS.length])

  function canAdvanceField() {
    if (subStep >= FIELDS.length) return true
    const field = FIELDS[subStep]
    if (!field.required) return true
    const value = profile[field.key]
    return field.type === 'email' ? isValidEmail(value) : value.trim().length > 0
  }

  function next() {
    if (!canAdvanceField()) return
    setSubStep(Math.min(subStep + 1, FIELDS.length))
  }

  function back() {
    if (subStep === 0) onBack?.()
    else setSubStep(subStep - 1)
  }

  if (subStep < FIELDS.length) {
    const field = FIELDS[subStep]
    return (
      <AnimatePresence mode="wait">
        <StepShell key={field.key}>
          <div>
            <h2 style={stepHeadingStyle}>
              {field.label}
              {!field.required && (
                <span style={{ marginLeft: '0.6rem', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                  ({t.optional})
                </span>
              )}
            </h2>
            <p style={subTextStyle}>{field.hint}</p>
          </div>

          <input
            ref={inputRef}
            type={field.type}
            className="fi"
            value={profile[field.key]}
            placeholder={field.ph}
            autoComplete={field.key === 'email' ? 'email' : field.key === 'name' ? 'name' : 'off'}
            onChange={e => onChange({ ...profile, [field.key]: e.target.value })}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                next()
              }
            }}
          />

          <p style={hintStyle}>{field.required ? t.enterHint : t.enterSkipHint}</p>

          <NavRow
            onBack={subStep > 0 || onBack ? back : undefined}
            backLabel={t.back}
            onNext={next}
            nextLabel={t.next}
            nextDisabled={!canAdvanceField()}
          />
        </StepShell>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <StepShell key="industry">
        <div>
          <h2 style={stepHeadingStyle}>{p.industryLabel}</h2>
          <p style={subTextStyle}>{p.industryHint}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '0.6rem' }}>
          {INDUSTRIES.map(industry => (
            <button
              key={industry.id}
              type="button"
              onClick={() => onDone({ ...profile, industry: industry.id })}
              style={{ ...optionStyle(profile.industry === industry.id), padding: '0.85rem 1rem', fontSize: '14px' }}
            >
              {industry.label[lang]}
            </button>
          ))}
        </div>

        <p style={hintStyle}>{t.tapHint}</p>
        <NavRow onBack={back} backLabel={t.back} />
      </StepShell>
    </AnimatePresence>
  )
}
