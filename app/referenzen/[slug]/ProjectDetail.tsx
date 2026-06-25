'use client'

import { useRef, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import { PROJECTS, getProject } from '@/lib/projects'

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {children}
    </motion.div>
  )
}

export default function ProjectDetail({ slug }: { slug: string }) {
  const { t, lang } = useLang()
  const project = getProject(slug)
  if (!project) return null

  const { img, alt, title, desc, quote, meta, links, year, video, gallery, results } = project
  const idx = PROJECTS.findIndex(p => p.slug === slug)
  const prev = idx > 0 ? PROJECTS[idx - 1] : PROJECTS[PROJECTS.length - 1]
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : PROJECTS[0]

  const metaCols = [
    { label: t.references.meta.location, value: meta.location[lang] },
    { label: t.references.meta.industry, value: meta.industry[lang] },
    { label: t.references.meta.service, value: meta.service[lang] },
    ...(year ? [{ label: t.references.detail.year, value: year }] : []),
  ]

  const PAD = '0 clamp(1.25rem, 5vw, 5vw)'

  return (
    <main style={{ background: 'rgb(11,11,11)' }}>
      {/* Header */}
      <section
        style={{
          padding: 'clamp(8rem, 16vh, 12rem) clamp(1.25rem, 5vw, 5vw) clamp(2rem, 4vw, 3rem)',
          background: 'linear-gradient(180deg, rgb(18,18,18) 0%, rgb(11,11,11) 100%)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Link href="/referenzen" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', fontSize: '14px', color: 'rgb(150,150,150)', textDecoration: 'none', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }} className="footer-link">
            {t.references.detail.back}
          </Link>

          <h1 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(2.75rem, 8vw, 6rem)', fontWeight: 300, color: '#fff', margin: 0, lineHeight: 1.02, letterSpacing: '-0.03em' }}>
            {title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-w">
                {l.label[lang]}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(2rem, 5vw, 4rem)', marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            {metaCols.map(m => (
              <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <span style={{ fontSize: '13px', color: 'rgb(112,112,112)' }}>{m.label}</span>
                <span style={{ fontSize: '14px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cover image / video */}
      <section style={{ padding: PAD }}>
        <Reveal>
          <div style={{ maxWidth: '1100px', margin: '0 auto', borderRadius: 'clamp(16px, 2.5vw, 24px)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgb(29,29,29)' }}>
            {video ? (
              <video
                src={video} poster={img}
                autoPlay loop muted playsInline controls
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            ) : (
              <Image
                src={img} alt={alt} width={1400} height={875} unoptimized priority
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            )}
          </div>
        </Reveal>
      </section>

      {/* Overview */}
      <section style={{ padding: 'clamp(3.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5vw) 0' }}>
        <Reveal>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(1.5rem, 4vw, 4rem)', alignItems: 'start' }}>
            <span style={{ fontSize: '15.41px', textTransform: 'uppercase', color: 'rgb(112,112,112)', letterSpacing: '0.02em' }}>
              {t.references.detail.overview}
            </span>
            <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(1.35rem, 2.6vw, 2rem)', fontWeight: 300, color: 'rgb(220,220,220)', lineHeight: 1.5, margin: 0, letterSpacing: '-0.01em', gridColumn: 'span 2' }}>
              {desc[lang]}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Quote */}
      <section style={{ padding: 'clamp(3.5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 5vw)' }}>
        <Reveal>
          <figure style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgb(112,112,112)', marginBottom: '2rem' }}>
              {t.references.detail.clientVoice}
            </span>
            <blockquote style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 300, color: '#fff', lineHeight: 1.25, letterSpacing: '-0.02em', margin: 0 }}>
              “{quote.text[lang]}”
            </blockquote>
            <figcaption style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', marginTop: '1.75rem' }}>
              {quote.avatar && (
                <Image
                  src={quote.avatar} alt={quote.author[lang]} width={44} height={44} unoptimized
                  style={{ width: '44px', height: '44px', borderRadius: '999px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.12)' }}
                />
              )}
              <span style={{ fontSize: '15.41px', color: 'rgb(150,150,150)' }}>{quote.author[lang]}</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Results (optional) */}
      {results && results.length > 0 && (
        <section style={{ padding: '0 clamp(1.25rem, 5vw, 5vw) clamp(3.5rem, 8vw, 7rem)' }}>
          <Reveal>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'clamp(1rem, 2.5vw, 2rem)' }}>
              {results.map(r => (
                <div key={r.label[lang]} style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: 'clamp(1.5rem, 3vw, 2.25rem)', background: 'linear-gradient(135deg, rgba(34,34,34,0.5) 0%, rgba(18,18,18,0.3) 100%)' }}>
                  <div style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{r.value}</div>
                  <div style={{ fontSize: '14px', color: 'rgb(150,150,150)', marginTop: '0.75rem' }}>{r.label[lang]}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Gallery (optional) */}
      {gallery && gallery.length > 0 && (
        <section style={{ padding: '0 clamp(1.25rem, 5vw, 5vw) clamp(3.5rem, 8vw, 7rem)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'clamp(1rem, 2.5vw, 2rem)' }}>
            {gallery.map((m, i) => (
              <Reveal key={m.src} delay={(i % 2) * 0.08}>
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgb(29,29,29)' }}>
                  {m.type === 'video' ? (
                    <video src={m.src} autoPlay loop muted playsInline controls style={{ width: '100%', height: 'auto', display: 'block' }} />
                  ) : (
                    <Image src={m.src} alt={`${title} ${i + 1}`} width={760} height={520} unoptimized style={{ width: '100%', height: 'auto', display: 'block' }} />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}


      {/* Prev / Next */}
      <section style={{ padding: '0 clamp(1.25rem, 5vw, 5vw)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))' }}>
          <NavLink project={prev} label={t.references.detail.prev} align="left" />
          <NavLink project={next} label={t.references.detail.next} align="right" />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(4rem, 9vw, 8rem) clamp(1.25rem, 5vw, 5vw) clamp(5rem, 10vw, 9rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(1.9rem, 5vw, 3.5rem)', fontWeight: 300, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {t.references.detail.ctaHeading}
          </h2>
          <p style={{ fontSize: '15.41px', color: 'rgb(150,150,150)', margin: '1rem auto 2rem', maxWidth: '40ch' }}>
            {t.references.detail.ctaSub}
          </p>
          <Link href="/kontakt" className="btn-w">{t.references.detail.ctaButton}</Link>
        </div>
      </section>
    </main>
  )
}

function NavLink({ project, label, align }: { project: { slug: string; title: string }; label: string; align: 'left' | 'right' }) {
  return (
    <Link
      href={`/referenzen/${project.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: 'clamp(1.75rem, 4vw, 2.75rem) 0',
        textDecoration: 'none',
        textAlign: align,
        alignItems: align === 'right' ? 'flex-end' : 'flex-start',
        borderLeft: align === 'right' ? '1px solid rgba(255,255,255,0.06)' : 'none',
        paddingInline: align === 'right' ? 'clamp(1.25rem, 3vw, 2.5rem)' : '0 clamp(1.25rem, 3vw, 2.5rem)',
      }}
      className="footer-link"
    >
      <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'rgb(112,112,112)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 400, color: '#fff', letterSpacing: '-0.01em' }}>{project.title}</span>
    </Link>
  )
}
