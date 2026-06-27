'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import { getService } from '@/lib/services'

export default function LeistungContent({ slug }: { slug: string }) {
  const { lang } = useLang()
  const s = getService(slug)
  if (!s) return null

  const en = lang === 'en'
  const L = (v: Record<'de' | 'en', string>) => (en ? v.en : v.de)

  const crumbHome = en ? 'Home' : 'Start'
  const crumbServices = en ? 'Services' : 'Leistungen'
  const featuresHeading = en ? 'What you get' : 'Das bekommst du'
  const faqHeading = en ? 'Frequently asked questions' : 'Häufige Fragen'
  const ctaText = en ? 'Book your free consultation →' : 'Kostenloses Erstgespräch buchen →'
  const ctaSub = en
    ? 'Tell us about your project — we usually reply within 24 hours.'
    : 'Erzähl uns von deinem Projekt — wir antworten meist innert 24 Stunden.'

  return (
    <main>
      {/* Hero */}
      <section
        className="min-h-[42vh] flex items-center justify-center pt-32 pb-16 px-6"
        style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-s) 100%)' }}
      >
        <div className="text-center max-w-[820px] mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[0.72rem] tracking-[0.08em] uppercase mb-6 flex items-center justify-center gap-2 flex-wrap"
            style={{ color: 'var(--t3)' }}
          >
            <Link href="/" className="legal-link">{crumbHome}</Link>
            <span>/</span>
            <Link href="/leistungen" className="legal-link">{crumbServices}</Link>
            <span>/</span>
            <span style={{ color: 'var(--t2)' }}>{L(s.eyebrow)}</span>
          </nav>

          <h1
            className="font-sans font-light tracking-[-0.04em] leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 4.6rem)', color: 'var(--t1)' }}
          >
            {L(s.title)}
          </h1>
          <p className="font-light leading-[1.8] max-w-[640px] mx-auto" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--t2)' }}>
            {(en ? s.intro.en : s.intro.de)[0]}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[900px] mx-auto">

          {/* Remaining intro paragraphs */}
          {(en ? s.intro.en : s.intro.de).slice(1).map((p, i) => (
            <p key={i} className="text-[1rem] font-light leading-[1.85] mb-6 max-w-[680px]" style={{ color: 'var(--t2)' }}>
              {p}
            </p>
          ))}

          {/* Features */}
          <h2 className="font-sans font-[400] tracking-[-0.02em] mt-12 mb-8" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', color: 'var(--t1)' }}>
            {featuresHeading}
          </h2>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {s.features.map((f, i) => (
              <div key={i} className="rounded-[8px] p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--b)' }}>
                <h3 className="text-[1.02rem] font-[500] tracking-[-0.01em] mb-2" style={{ color: 'var(--t1)' }}>
                  {L(f.title)}
                </h3>
                <p className="text-[0.9rem] font-light leading-[1.7]" style={{ color: 'var(--t2)' }}>
                  {L(f.desc)}
                </p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <h2 className="font-sans font-[400] tracking-[-0.02em] mt-16 mb-8" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', color: 'var(--t1)' }}>
            {faqHeading}
          </h2>
          <div className="flex flex-col gap-4">
            {s.faq.map((f, i) => (
              <div key={i} className="rounded-[8px] p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--b)' }}>
                <h3 className="text-[1rem] font-[500] mb-2" style={{ color: 'var(--t1)' }}>
                  {L(f.q)}
                </h3>
                <p className="text-[0.92rem] font-light leading-[1.75]" style={{ color: 'var(--t2)' }}>
                  {L(f.a)}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-[10px] text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--b)' }}>
            <p className="text-[0.95rem] font-light leading-[1.7] mb-5 max-w-[460px] mx-auto" style={{ color: 'var(--t2)' }}>
              {ctaSub}
            </p>
            <Link href="/kontakt" className="btn-w">
              {ctaText}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
