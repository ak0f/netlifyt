'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import { PROJECTS, type Project } from '@/lib/projects'

export default function ReferenzenIndex() {
  const { t } = useLang()

  return (
    <main style={{ background: 'rgb(11,11,11)' }}>
      {/* Hero */}
      <section
        style={{
          padding: 'clamp(8rem, 16vh, 12rem) clamp(1.25rem, 5vw, 5vw) clamp(2rem, 5vw, 4rem)',
          background: 'linear-gradient(180deg, rgb(18,18,18) 0%, rgb(11,11,11) 100%)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <span style={{ display: 'block', fontSize: '15.41px', textTransform: 'uppercase', color: 'rgb(112,112,112)', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
            {t.references.page.label}
          </span>
          <h1 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(2.75rem, 7vw, 5rem)', fontWeight: 300, color: '#fff', margin: 0, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '14ch' }}>
            {t.references.page.heading}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgb(150,150,150)', lineHeight: 1.7, marginTop: '1.5rem', maxWidth: '52ch' }}>
            {t.references.page.sub}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 clamp(1.25rem, 5vw, 5vw) clamp(4rem, 9vw, 8rem)' }}>
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1.25rem, 3vw, 2.25rem)',
          }}
        >
          {PROJECTS.map(p => <IndexCard key={p.slug} project={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 clamp(1.25rem, 5vw, 5vw) clamp(5rem, 10vw, 9rem)' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 'clamp(20px, 3vw, 28px)',
            background: 'linear-gradient(135deg, rgba(34,34,34,0.5) 0%, rgba(18,18,18,0.3) 100%)',
            padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 300, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
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

function IndexCard({ project }: { project: Project }) {
  const { t } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { slug, img, alt, title } = project

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 64 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 64 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/referenzen/${slug}`} style={{ textDecoration: 'none', display: 'block' }} aria-label={title}>
        <motion.article
          whileHover={{ borderColor: 'rgba(255,255,255,0.16)' }}
          style={{
            borderRadius: '18px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'linear-gradient(135deg, rgba(34,34,34,0.5) 0%, rgba(18,18,18,0.3) 100%)',
            transition: 'border-color 0.3s',
            height: '100%',
          }}
        >
          <div style={{ aspectRatio: '16 / 9', overflow: 'hidden', background: 'rgb(29,29,29)' }}>
            <Image
              src={img} alt={alt} width={760} height={428} unoptimized
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.9)', transform: 'scale(1.04)', transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.09)'; e.currentTarget.style.filter = 'brightness(1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'brightness(0.9)' }}
            />
          </div>

          <div style={{ padding: 'clamp(1.1rem, 2vw, 1.5rem)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <h3 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 400, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{title}</h3>
            <span style={{ fontSize: '14px', color: 'rgb(150,150,150)', fontFamily: 'var(--font-hg), sans-serif', flexShrink: 0 }}>
              {t.references.viewProject}
            </span>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}
