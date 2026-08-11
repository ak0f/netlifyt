'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import type { Project } from '@/lib/projects'
import type { Lang } from '@/lib/i18n'

interface Copy {
  meta: { location: string; industry: string; service: string }
  viewProject: string
  beforeLabel: string
  afterLabel: string
}

/* One wide, pinned rectangle. The section stays fixed in the viewport while
   the projects inside it slide through horizontally, driven by normal
   vertical scroll — the classic "scroll down to move sideways" technique. */
export default function ReferencesPinnedSlider({ projects, t, lang }: { projects: Project[]; t: Copy; lang: Lang }) {
  const n         = projects.length
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end end'] })
  // row is n*100% wide, so as a percentage of the row's own width, moving
  // through all n cards (each one card-width) is (n-1)/n of the total row
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${((n - 1) / n) * 100}%`])

  return (
    <div ref={targetRef} style={{ position: 'relative', height: `${n * 70}vh` }}>
      <div
        style={{
          position: 'sticky',
          top: 'clamp(1rem, 8vh, 6rem)',
          height: 'clamp(480px, 76vh, 720px)',
          overflow: 'hidden',
          borderRadius: 'clamp(20px, 3vw, 32px)',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgb(16,16,16)',
        }}
      >
        <motion.div style={{ display: 'flex', height: '100%', width: `${n * 100}%`, x }}>
          {projects.map(p => (
            <div key={p.slug} style={{ width: `${100 / n}%`, height: '100%', flexShrink: 0, padding: 'clamp(1.5rem, 3vw, 3rem)' }}>
              <SlideCard project={p} t={t} lang={lang} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function SlideCard({ project, t, lang }: { project: Project; t: Copy; lang: Lang }) {
  const { img, beforeImg, alt, title, desc, meta, slug } = project

  const metaCols = [
    { label: t.meta.location, value: meta.location[lang] },
    { label: t.meta.industry, value: meta.industry[lang] },
    { label: t.meta.service, value: meta.service[lang] },
  ]

  return (
    <Link href={`/referenzen/${slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }} aria-label={title}>
      <article
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 3rem)',
          alignItems: 'stretch',
        }}
      >
        <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', background: 'rgb(29,29,29)', minHeight: '220px' }}>
          {beforeImg ? (
            <BeforeAfterSlider before={beforeImg} after={img} alt={alt} beforeLabel={t.beforeLabel} afterLabel={t.afterLabel} />
          ) : (
            <Image
              src={img} alt={alt} width={760} height={560}
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', filter: 'brightness(0.9)', transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s' }}
              unoptimized
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'brightness(1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(0.9)' }}
            />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.5rem)', overflow: 'auto' }}>
          <h3 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 400, color: '#fff', margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>{title}</h3>
          <p style={{ fontSize: '15.41px', color: 'rgb(196,196,196)', lineHeight: 1.7, margin: 0 }}>{desc[lang]}</p>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {metaCols.map(m => (
              <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span style={{ fontSize: '13px', color: 'rgb(178,178,178)' }}>{m.label}</span>
                <span style={{ fontSize: '14px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.value}</span>
              </div>
            ))}
          </div>

          <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '15.41px', color: '#fff', marginTop: '0.5rem', fontFamily: 'var(--font-hg), sans-serif' }}>
            {t.viewProject}
          </span>
        </div>
      </article>
    </Link>
  )
}
