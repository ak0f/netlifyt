'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getPackage, recommendPackage, type PackageId, type QuizAnswers } from '@/lib/onboarding'
import type { Lang, T } from '@/lib/i18n'
import { EASE, optionStyle } from './ui'

/**
 * Drei Fragen statt einer Preistabelle zum Studieren. Eingeklappt, damit die
 * Pakete darunter der Hauptweg bleiben und die Hilfe nur da ist, wer sie
 * braucht.
 */
export default function RecommendationQuiz({
  onPick,
  t,
  lang,
}: {
  onPick: (id: PackageId) => void
  t: T['onboarding']['config']
  lang: Lang
}) {
  const [open, setOpen] = useState(false)
  const [need, setNeed] = useState<QuizAnswers['need'] | null>(null)
  const [payments, setPayments] = useState<QuizAnswers['payments'] | null>(null)
  const [budget, setBudget] = useState<QuizAnswers['budget'] | null>(null)

  const result = need && payments && budget ? recommendPackage({ need, payments, budget }) : null

  const needOptions: { value: QuizAnswers['need']; label: string }[] = [
    { value: 'auftritt', label: t.quizNeedOptions[0] },
    { value: 'pflege',   label: t.quizNeedOptions[1] },
    { value: 'login',    label: t.quizNeedOptions[2] },
  ]
  const paymentOptions: { value: QuizAnswers['payments']; label: string }[] = [
    { value: 'ja',   label: t.quizPaymentsOptions[0] },
    { value: 'nein', label: t.quizPaymentsOptions[1] },
  ]
  const budgetOptions: { value: QuizAnswers['budget']; label: string }[] = [
    { value: 'klein',  label: t.quizBudgetOptions[0] },
    { value: 'mittel', label: t.quizBudgetOptions[1] },
    { value: 'gross',  label: t.quizBudgetOptions[2] },
  ]

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.09)', borderRadius: '14px', background: 'rgba(255,255,255,0.025)', padding: '0.95rem 1.1rem' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          color: '#fff', fontFamily: 'inherit', fontSize: '14px', textAlign: 'left',
        }}
      >
        {t.quizOpen}
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
          width="15" height="15" aria-hidden
          style={{ flex: 'none', opacity: 0.5, transition: `transform 0.25s var(--ease)`, transform: open ? 'rotate(180deg)' : 'none' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', paddingTop: '1.1rem' }}>
              <Question label={t.quizNeed} options={needOptions} value={need} onSelect={setNeed} />
              <Question label={t.quizPayments} options={paymentOptions} value={payments} onSelect={setPayments} />
              <Question label={t.quizBudget} options={budgetOptions} value={budget} onSelect={setBudget} />

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{
                    display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
                    gap: '0.75rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.07)', padding: '0.8rem 1rem',
                  }}
                >
                  <span style={{ fontSize: '14px', color: '#fff' }}>
                    {t.quizResult}: {getPackage(result).name[lang]}
                  </span>
                  <button
                    type="button"
                    onClick={() => onPick(result)}
                    style={{
                      background: '#fff', color: '#000', border: 'none', borderRadius: '7.705px',
                      padding: '8px 14px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                    }}
                  >
                    {getPackage(result).name[lang]} {t.quizApply}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Question<V extends string>({
  label,
  options,
  value,
  onSelect,
}: {
  label: string
  options: { value: V; label: string }[]
  value: V | null
  onSelect: (v: V) => void
}) {
  return (
    <div>
      <p style={{ margin: '0 0 0.6rem', fontSize: '13.5px', color: 'rgb(178,178,178)' }}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {options.map(o => (
          <button
            key={o.value}
            type="button"
            onClick={() => onSelect(o.value)}
            style={{ ...optionStyle(value === o.value, 9), width: 'auto', padding: '7px 13px', fontSize: '13px' }}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
