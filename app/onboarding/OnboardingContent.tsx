'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import OnboardingWizard from '@/components/onboarding/OnboardingWizard'

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} variants={FADE_UP} initial="hidden" animate={inView ? 'visible' : 'hidden'} transition={{ delay }}>
      {children}
    </motion.div>
  )
}

export default function OnboardingContent() {
  const { t } = useLang()
  const o = t.onboarding

  return (
    <main style={{ background: '#000', minHeight: '100vh', paddingTop: 'clamp(90px, 15vw, 120px)' }}>
      <section style={{ padding: 'max(5vw, 1.5rem) max(5vw, 1.25rem) max(3vw, 1rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeSection>
            <span className="s-label">{o.eyebrow}</span>
          </FadeSection>
          <FadeSection delay={0.08}>
            <h1
              style={{
                fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
                fontSize: 'clamp(38px, 5.4vw, 84px)',
                fontWeight: 400,
                color: '#fff',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                margin: '0 0 1.5rem',
              }}
            >
              {o.heading1}
              <br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>{o.heading2}</span>
            </h1>
          </FadeSection>
          <FadeSection delay={0.16}>
            <p style={{ maxWidth: '34rem', margin: 0, fontSize: '15.41px', lineHeight: 1.7, color: 'rgb(178,178,178)' }}>
              {o.intro}
            </p>
          </FadeSection>
        </div>
      </section>

      <section style={{ padding: 'max(3vw, 1.5rem) max(5vw, 1.25rem) max(10vw, 4rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Nur Opazität, kein `y`: eine Transform auf diesem Wrapper würde
              zum Containing Block und die sticky Preisleiste im Wizard darin
              einsperren. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <OnboardingWizard />
          </motion.div>
        </div>
      </section>
    </main>
  )
}
