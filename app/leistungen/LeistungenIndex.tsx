'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import { SERVICES } from '@/lib/services'

export default function LeistungenIndex() {
  const { lang } = useLang()
  const en = lang === 'en'
  const L = (v: Record<'de' | 'en', string>) => (en ? v.en : v.de)

  const heroHeading = en ? 'Everything from one source.' : 'Alles aus einer Hand.'
  const heroSub = en
    ? 'Your digital agency in Bern for websites, social media, email marketing and IT support.'
    : 'Deine Digitalagentur in Bern für Websites, Social Media, E-Mail-Marketing und IT-Support.'
  const more = en ? 'Learn more →' : 'Mehr erfahren →'

  return (
    <main>
      {/* Hero */}
      <section
        className="min-h-[40vh] flex items-center justify-center pt-32 pb-16 px-6"
        style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-s) 100%)' }}
      >
        <div className="text-center max-w-[820px] mx-auto">
          <h1
            className="font-sans font-light tracking-[-0.04em] leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 5rem)', color: 'var(--t1)' }}
          >
            {heroHeading}
          </h1>
          <p className="font-light leading-[1.7] max-w-[560px] mx-auto" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--t2)' }}>
            {heroSub}
          </p>
        </div>
      </section>

      {/* Service grid */}
      <section className="py-20 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1000px] mx-auto grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/leistungen/${s.slug}`}
              className="group rounded-[10px] p-7 block transition-colors"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--b)' }}
            >
              <span className="font-mono text-[0.7rem] tracking-[0.1em] uppercase" style={{ color: 'var(--t3)' }}>
                {L(s.eyebrow)}
              </span>
              <h2 className="font-sans font-[500] tracking-[-0.02em] mt-3 mb-3" style={{ fontSize: '1.3rem', color: 'var(--t1)' }}>
                {L(s.title)}
              </h2>
              <p className="text-[0.92rem] font-light leading-[1.75] mb-5" style={{ color: 'var(--t2)' }}>
                {(en ? s.intro.en : s.intro.de)[0]}
              </p>
              <span className="text-[0.85rem] font-[500]" style={{ color: 'var(--t1)' }}>
                {more}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
