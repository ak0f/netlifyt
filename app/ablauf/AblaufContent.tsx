'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

export default function AblaufContent() {
  const { t } = useLang()
  const a = t.ablauf

  return (
    <main>
      {/* Hero */}
      <section
        className="min-h-[42vh] flex items-center justify-center pt-32 pb-16 px-6"
        style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-s) 100%)' }}
      >
        <div className="text-center max-w-[800px] mx-auto">
          <h1
            className="font-sans font-light tracking-[-0.04em] leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)', color: 'var(--t1)' }}
          >
            {a.heroHeading}
          </h1>
          <p className="font-light leading-[1.7]" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--t2)' }}>
            {a.heroSub}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[900px] mx-auto">

          <p className="text-[1rem] font-light leading-[1.8] mb-16 max-w-[680px]" style={{ color: 'var(--t2)' }}>
            {a.intro}
          </p>

          {/* Steps */}
          <div className="flex flex-col gap-0">
            {a.steps.map((step, idx) => (
              <div key={step.num} className="relative flex gap-8 pb-12">

                {/* Vertical line */}
                {idx < a.steps.length - 1 && (
                  <div
                    className="absolute left-[27px] top-[56px] w-px"
                    style={{
                      bottom: 0,
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.01))',
                    }}
                  />
                )}

                {/* Number bubble */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-mono text-[0.75rem] font-[400] tracking-[0.1em]"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--b)',
                      color: 'var(--t2)',
                    }}
                  >
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-[6px] p-6 mb-0"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--b)' }}
                >
                  <h2 className="text-[1.1rem] font-[500] tracking-[-0.01em] mb-3" style={{ color: 'var(--t1)' }}>
                    {step.title}
                  </h2>
                  <p className="text-[0.9rem] font-light leading-[1.75] mb-4" style={{ color: 'var(--t2)' }}>
                    {step.desc}
                  </p>
                  <div
                    className="flex gap-3 items-start pt-4"
                    style={{ borderTop: '1px solid var(--b)' }}
                  >
                    <span
                      className="font-ui text-[0.65rem] font-[600] uppercase tracking-[0.14em] px-2 py-1 rounded-[3px] flex-shrink-0 mt-[1px]"
                      style={{ background: 'var(--bg-card)', color: 'var(--t2)', border: '1px solid var(--b)' }}
                    >
                      {a.goalLabel}
                    </span>
                    <p className="text-[0.85rem] font-light leading-[1.6]" style={{ color: 'var(--t2)' }}>
                      {step.goal}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div
            className="mt-8 p-8 rounded-[8px]"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--b)' }}
          >
            <h3 className="text-[1.15rem] font-[500] mb-3" style={{ color: 'var(--t1)' }}>
              {a.summaryHeading}
            </h3>
            <p className="text-[0.95rem] font-light leading-[1.75]" style={{ color: 'var(--t2)' }}>
              {a.summaryBody}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link href="/#kontakt" className="btn-w">
              {a.cta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
