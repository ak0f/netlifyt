'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { T } from '@/lib/i18n'

type FieldKey = 'name' | 'email' | 'phone' | 'subject' | 'message'
const STEPS: FieldKey[] = ['name', 'email', 'phone', 'subject', 'message']

const easeOut = [0.25, 0.46, 0.45, 0.94] as const

/* One question at a time, with a live recap of what's already been
   answered — a dialogue instead of a form dump. */
export default function ConversationalContactForm({ contact: t }: { contact: T['contact'] }) {
  const [step, setStep]         = useState(0) // 0..4 = active field, 5 = review
  const [values, setValues]     = useState<Record<FieldKey, string>>({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]       = useState(false)
  const inputRef                = useRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>(null)

  useEffect(() => {
    if (step < 5) inputRef.current?.focus()
  }, [step])

  function set(key: FieldKey, v: string) {
    setValues(prev => ({ ...prev, [key]: v }))
  }

  function canAdvance() {
    if (step === 0) return values.name.trim().length > 0
    if (step === 1) return values.email.includes('@') && values.email.includes('.')
    if (step === 3) return values.subject.length > 0
    if (step === 4) return values.message.trim().length > 0
    return true
  }

  function next() {
    if (!canAdvance()) return
    setStep(s => Math.min(5, s + 1))
  }

  async function submit() {
    setSubmitting(true)
    setError(false)
    try {
      const body = new URLSearchParams({ 'form-name': 'contact', 'bot-field': '', ...values }).toString()
      await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
      setSubmitted(true)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const answeredChips = STEPS.slice(0, step).filter(k => values[k])

  return (
    <div style={{ background: 'rgb(39,39,39)', borderRadius: '20px', padding: 'clamp(1.25rem, 5vw, 2.5rem)' }}>
      <p style={{ fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.58)', marginBottom: '1.5rem', letterSpacing: '0.08em' }}>
        {t.formLabel}
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '3rem 0', textAlign: 'center' }}>
            <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#fff', fontSize: '1.2rem' }}>✓</div>
            <p style={{ fontSize: '15.41px', color: 'rgb(178,178,178)', lineHeight: 1.65 }}>{t.success}</p>
          </motion.div>
        ) : (
          <motion.div key="flow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* recap chips */}
            {answeredChips.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                {answeredChips.map(key => {
                  const i = STEPS.indexOf(key)
                  const raw = values[key]
                  const label = key === 'message' && raw.length > 28 ? raw.slice(0, 28) + '…' : raw
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setStep(i)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '999px', padding: '6px 12px', fontSize: '12.5px', color: 'rgba(255,255,255,0.8)',
                        cursor: 'pointer', maxWidth: '220px',
                      }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
                      <span style={{ opacity: 0.5, fontSize: '11px' }}>{t.flowEdit}</span>
                    </button>
                  )
                })}
              </div>
            )}

            {step < 5 && (
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '0 0 0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {t.flowStep} {step + 1} {t.flowOf} {STEPS.length}
              </p>
            )}

            <AnimatePresence mode="wait">
              {step === 0 && (
                <StepShell key="name">
                  <label htmlFor="cf-name" style={fieldLabelStyle}>{t.fields.name}</label>
                  <input id="cf-name" ref={inputRef} type="text" className="fi" value={values.name} placeholder={t.fields.namePh}
                    onChange={e => set('name', e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); next() } }} />
                  <NavRow onNext={next} nextDisabled={!canAdvance()} nextLabel={t.flowNext} />
                </StepShell>
              )}
              {step === 1 && (
                <StepShell key="email">
                  <label htmlFor="cf-email" style={fieldLabelStyle}>{t.fields.email}</label>
                  <input id="cf-email" ref={inputRef} type="email" className="fi" value={values.email} placeholder={t.fields.emailPh}
                    onChange={e => set('email', e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); next() } }} />
                  <NavRow onBack={() => setStep(0)} backLabel={t.flowBack} onNext={next} nextDisabled={!canAdvance()} nextLabel={t.flowNext} />
                </StepShell>
              )}
              {step === 2 && (
                <StepShell key="phone">
                  <label htmlFor="cf-phone" style={fieldLabelStyle}>{t.fields.phone}</label>
                  <input id="cf-phone" ref={inputRef} type="tel" className="fi" value={values.phone} placeholder={t.fields.phonePh}
                    onChange={e => set('phone', e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); next() } }} />
                  <NavRow onBack={() => setStep(1)} backLabel={t.flowBack} onNext={next} nextLabel={values.phone ? t.flowNext : t.flowSkip} />
                </StepShell>
              )}
              {step === 3 && (
                <StepShell key="subject">
                  <label htmlFor="cf-subject" style={fieldLabelStyle}>{t.fields.subject}</label>
                  <select id="cf-subject" ref={inputRef} className="fs" value={values.subject}
                    onChange={e => {
                      const v = e.target.value
                      set('subject', v)
                      if (v) setTimeout(() => setStep(s => (s === 3 ? 4 : s)), 260)
                    }}>
                    <option value="">{t.fields.subjectDefault}</option>
                    {t.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <NavRow onBack={() => setStep(2)} backLabel={t.flowBack} onNext={next} nextDisabled={!canAdvance()} nextLabel={t.flowNext} />
                </StepShell>
              )}
              {step === 4 && (
                <StepShell key="message">
                  <label htmlFor="cf-message" style={fieldLabelStyle}>{t.fields.message}</label>
                  <textarea id="cf-message" ref={inputRef} className="ft" value={values.message} placeholder={t.fields.messagePh}
                    onChange={e => set('message', e.target.value)} />
                  <NavRow onBack={() => setStep(3)} backLabel={t.flowBack} onNext={next} nextDisabled={!canAdvance()} nextLabel={t.flowNext} />
                </StepShell>
              )}
              {step === 5 && (
                <StepShell key="review">
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: '0 0 1.25rem' }}>{t.flowReviewLabel}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    {STEPS.filter(k => values[k]).map(k => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>{t.fields[k]}</span>
                        <span style={{ fontSize: '14px', color: '#fff', textAlign: 'right' }}>{values[k]}</span>
                      </div>
                    ))}
                  </div>
                  {error && <p style={{ fontSize: '14px', color: '#f87171', marginBottom: '1rem' }}>{t.error}</p>}
                  <NavRow onBack={() => setStep(4)} backLabel={t.flowBack} onNext={submit} nextLabel={submitting ? '…' : t.submit} nextDisabled={submitting} />
                </StepShell>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const fieldLabelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 400, textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.58)', marginBottom: '0.6rem', letterSpacing: '0.08em',
}

function StepShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

function NavRow({ onBack, backLabel, onNext, nextDisabled, nextLabel }: {
  onBack?: () => void; backLabel?: string; onNext: () => void; nextDisabled?: boolean; nextLabel: string
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
      {onBack ? (
        <button type="button" onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '14px', cursor: 'pointer', padding: 0 }}>
          {backLabel}
        </button>
      ) : <span />}
      <button type="button" onClick={onNext} disabled={nextDisabled} className="btn-dark" style={{ opacity: nextDisabled ? 0.4 : 1, cursor: nextDisabled ? 'default' : 'pointer' }}>
        {nextLabel}
      </button>
    </div>
  )
}
