'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import { PROJECTS } from '@/lib/projects'
import { useIsMobile } from '@/lib/useIsMobile'
import ScrollCountUp from '@/components/ScrollCountUp'
import ProcessTimeline from '@/components/ProcessTimeline'
import TestimonialsStack from '@/components/TestimonialsStack'
import ReferencesPinnedSlider from '@/components/ReferencesPinnedSlider'
import ConversationalContactForm from '@/components/ConversationalContactForm'

/* ─── Animation helpers ─── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 56 }}
      transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── 3D S character that follows mouse ─── */
function Hero3DLetter() {
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = tiltRef.current
    if (!el) return

    let tx = 0, ty = 0   // target normalised -1..1
    let cx = 0, cy = 0   // current (interpolated)
    let rafId: number
    const LERP = 0.12

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      cx += (tx - cx) * LERP
      cy += (ty - cy) * LERP
      const ry = cx * 34
      const rx = -cy * 20
      const sc = 1 - cy * 0.03
      el.style.transform = `perspective(700px) rotateY(${ry}deg) rotateX(${rx}deg) scale(${sc})`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="hidden md:block"
      style={{
        position: 'absolute',
        right: '-6vw',
        top: '50%',
        transform: 'translateY(-52%)',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 1,
        overflow: 'visible',
      }}
    >
      {/* motion.div handles only the bounce keyframe — no mouse tracking, no lag */}
      <motion.div
        animate={{ y: [0, -28, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: [0.37, 0, 0.63, 1] }}
      >
        {/* plain div: tilt via rAF lerp — bypasses React/Framer Motion entirely */}
        <div ref={tiltRef} style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
          <span
            style={{
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              fontSize: 'clamp(22rem, 54vw, 68rem)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.0)',
              WebkitTextStroke: '2px rgba(255,255,255,0.38)',
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              display: 'block',
              filter: 'drop-shadow(0 0 80px rgba(255,255,255,0.04))',
              textShadow: `
                2px  4px 0px rgba(255,255,255,0.14),
                4px  8px 0px rgba(255,255,255,0.10),
                6px 12px 0px rgba(255,255,255,0.08),
                9px 16px 0px rgba(255,255,255,0.06),
                13px 22px 0px rgba(255,255,255,0.04),
                18px 30px 0px rgba(255,255,255,0.025),
                0 0 140px rgba(255,255,255,0.07),
                0 40px 80px rgba(0,0,0,0.55)
              `,
            }}
          >
            S
          </span>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Decorative S watermark for mobile (no mouse tracking) ─── */
function MobileHeroLetter() {
  return (
    <motion.div
      aria-hidden
      className="md:hidden"
      style={{
        position: 'absolute',
        top: '14%',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 1,
      }}
      animate={{ y: [0, -18, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: [0.37, 0, 0.63, 1] }}
    >
      <span
        style={{
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          fontSize: 'clamp(15rem, 62vw, 26rem)',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.0)',
          WebkitTextStroke: '1.5px rgba(255,255,255,0.16)',
          lineHeight: 0.85,
          letterSpacing: '-0.06em',
          display: 'block',
          textShadow: `
            2px  4px 0px rgba(255,255,255,0.06),
            5px  9px 0px rgba(255,255,255,0.04),
            0 0 90px rgba(255,255,255,0.05)
          `,
        }}
      >
        S
      </span>
    </motion.div>
  )
}

/* ─── HERO ─── */
function HeroSection() {
  const { t } = useLang()
  const isMobile            = useIsMobile()
  const ref                 = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yContent            = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const heroOpacity         = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const yOrb1               = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const yOrb2               = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      ref={ref}
      className="grain"
      style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: isMobile ? 'center' : 'flex-end', padding: isMobile ? 'max(24vh, 7rem) max(5vw, 1.25rem) max(20vh, 7rem)' : '0 max(5vw, 1.25rem) max(8vw, 3rem)', background: '#000', overflow: 'hidden' }}
    >
      {/* Atmospheric background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>

        {/* 3D letter */}
        <Hero3DLetter />
        <MobileHeroLetter />

        {/* Orb 1 */}
        <motion.div style={{ y: yOrb1, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '4%', right: '10%', width: 'clamp(260px, 34vw, 540px)', height: 'clamp(260px, 34vw, 540px)', background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 42%, transparent 70%)', borderRadius: '50%', filter: 'blur(52px)' }} />
        </motion.div>

        {/* Orb 2 */}
        <motion.div style={{ y: yOrb2, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '32%', right: '24%', width: 'clamp(140px, 20vw, 300px)', height: 'clamp(140px, 20vw, 300px)', background: 'radial-gradient(circle at 60% 50%, rgba(255,255,255,0.028) 0%, transparent 65%)', borderRadius: '50%', filter: 'blur(38px)' }} />
        </motion.div>

        {/* Subtle grid */}
        {[20, 45, 70].map(p => <div key={p} style={{ position: 'absolute', left: 0, right: 0, top: `${p}%`, height: '1px', background: 'rgba(255,255,255,0.022)' }} />)}
        {[25, 50, 75].map(p => <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: '1px', background: 'rgba(255,255,255,0.016)' }} />)}
      </div>

      {/* Content */}
      <motion.div style={{ y: yContent, opacity: heroOpacity, position: 'relative', zIndex: 2 }}>
        <div style={{ overflow: 'hidden', marginBottom: 'max(3.5vw, 1.5rem)' }}>
          <motion.h1 initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.18 }} style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'var(--fs-hero)', fontWeight: 400, lineHeight: 1.2, margin: 0, maxWidth: '64rem' }}>
            <span style={{ color: '#ffffff' }}>{t.hero.line1} </span>
            <span style={{ color: 'rgba(255,255,255,0.40)' }}>{t.hero.line2}</span>
          </motion.h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.42 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: 'max(3vw, 1.5rem)', alignItems: 'center' }}>
          <Link href="/kontakt" className="btn-cta btn-cta-hero">
            {t.hero.cta}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.6rem', flexShrink: 0 }}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <motion.a
            href="/ablauf"
            className="btn-dark"
            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', textDecoration: 'none' }}
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0.58, background: 'rgba(255,255,255,0.10)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {t.hero.secondary}
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', x: '-50%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', pointerEvents: 'none' }}
        initial={{ opacity: 0, y: 56 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden
      >
        <span style={{ fontSize: '10px', fontWeight: 400, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 2.8 }}
          style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}

/* ─── SERVICES ─── */
const SERVICE_IMGS = ['/img/webdesign.png', '/img/socialmedia.png', '/img/email.png']
const SERVICE_SLUGS = ['webdesign-bern', 'social-media-bern', 'email-marketing']

function GridDotsIcon() {
  const dots: React.ReactNode[] = []
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      dots.push(<rect key={`${row}-${col}`} x={col * 7} y={row * 7} width="3" height="3" rx="0.8" fill="rgba(255,255,255,0.5)" />)
    }
  }
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>{dots}</svg>
}

function ServicesSection() {
  const { t }               = useLang()
  const ref                 = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yHeader             = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  const servicesData = t.services.items.map((item, i) => ({
    num: `0${i + 1}`,
    title: item.title,
    tagline: item.tagline,
    subtitle: t.flyout.counts[i],
    img: SERVICE_IMGS[i],
    slug: SERVICE_SLUGS[i],
    features: item.features,
  }))

  return (
    <section ref={ref} id="leistungen" style={{ background: '#0a0a0a', padding: 'max(10vw, 3.5rem) max(5vw, 1.25rem)', overflow: 'hidden' }}>
      <FadeUp>
        <motion.div style={{ y: yHeader }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '5vw' }}>
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '1.25rem', letterSpacing: '0.06em' }}>
                {t.services.label}
              </span>
              <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'var(--fs-section)', fontWeight: 400, color: '#fff', margin: '0 0 1rem', lineHeight: 1.2 }}>
                {t.services.heading[0]}<br />{t.services.heading[1]}
              </h2>
            </div>
            <a href="/kontakt" className="btn-float" style={{ textDecoration: 'none' }}>
              {t.services.cta}
            </a>
          </div>
        </motion.div>
      </FadeUp>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
        {servicesData.map((s, idx) => <ServiceCard key={s.num} {...s} idx={idx} />)}
      </div>
    </section>
  )
}

function ServiceCard({ title, tagline, subtitle, img, slug, features, idx }: {
  num?: string; title: string; tagline: string; subtitle: string; img: string; slug: string; features: string[]; idx: number
}) {
  const { t }    = useLang()
  const wrapRef  = useRef<HTMLDivElement>(null)
  const cardRef  = useRef<HTMLDivElement>(null)
  const inView   = useInView(wrapRef, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const lightX = useMotionValue(0.5)
  const lightY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 26 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 26 })

  const shimmerBg = useTransform(
    [lightX, lightY] as const,
    ([x, y]: number[]) =>
      `radial-gradient(circle 280px at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.11) 0%, transparent 65%)`
  )

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect()
    const x    = (e.clientX - rect.left) / rect.width
    const y    = (e.clientY - rect.top)  / rect.height
    mouseX.set(x - 0.5)
    mouseY.set(y - 0.5)
    lightX.set(x)
    lightY.set(y)
  }

  function onMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    lightX.set(0.5)
    lightY.set(0.5)
    setHovered(false)
  }

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay: idx * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={isMobile ? undefined : onMouseMove}
        onMouseEnter={isMobile ? undefined : () => setHovered(true)}
        onMouseLeave={isMobile ? undefined : onMouseLeave}
        onClick={isMobile ? () => setHovered(v => !v) : undefined}
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          aspectRatio: isMobile ? undefined : '3 / 4',
          minHeight: isMobile ? '0' : undefined,
          cursor: isMobile ? 'pointer' : 'default',
          willChange: 'transform',
        }}
      >
        {/* Background image — blurs on hover */}
        <motion.div
          animate={{ filter: hovered ? 'blur(11px) brightness(0.6)' : 'blur(0px) brightness(0.88)', scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src={img}
            alt={title.replace('\n', ' ')}
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </motion.div>

        {/* Permanent cinematic gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(165deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.52) 100%)',
        }} />

        {/* Frosted dark overlay — fades in on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.42 }}
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'rgba(8,8,8,0.32)',
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
          }}
        />

        {/* Cursor light shimmer */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: shimmerBg }}
        />

        {/* ── Card content ── */}
        <div style={{
          position: 'relative', zIndex: 2,
          height: '100%',
          padding: '1.75rem 1.75rem 1.6rem',
          display: 'flex', flexDirection: 'column',
        }}>

          {/* Top row: title + subtitle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                fontSize: 'clamp(21px, 2.2vw, 28px)',
                fontWeight: 300,
                color: '#fff',
                lineHeight: 1.22,
                margin: '0 0 0.45rem',
                whiteSpace: 'pre-line',
                letterSpacing: '-0.01em',
              }}>
                {title}
              </h3>
              <p style={{
                fontSize: '12.5px',
                color: 'rgba(255,255,255,0.52)',
                margin: 0,
                letterSpacing: '0.01em',
                lineHeight: 1.4,
              }}>
                {tagline}
              </p>
            </div>
            <span style={{
              fontSize: '11px', color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.04em', marginTop: '3px', flexShrink: 0,
            }}>
              {subtitle}
            </span>
          </div>

          {/* Pills — revealed on tap (mobile) or hover (desktop), never shown automatically */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem', paddingBlock: '1.75rem' }}>
            <AnimatePresence>
              {hovered && features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.14 } }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    alignSelf: 'flex-start',
                    background: 'rgba(255,255,255,0.13)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '100px',
                    padding: '7px 17px',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.93)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom row: dots icon + See More */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <GridDotsIcon />
            <AnimatePresence>
              {hovered && (
                <motion.a
                  href={`/leistungen/${slug}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4, transition: { duration: 0.14 } }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.38)',
                    paddingBottom: '1px',
                    letterSpacing: '0.03em',
                  }}
                >
                  {t.services.more}
                </motion.a>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}


/* ─── REFERENCES ─── */
function ReferencesSection() {
  const { t, lang } = useLang()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start 25%'] })
  const bg = useTransform(scrollYProgress, [0, 1], ['rgb(18,18,18)', 'rgb(11,11,11)'])

  return (
    <motion.section ref={sectionRef} id="referenzen" style={{ background: bg, padding: 'max(7vw, 3rem) clamp(1rem, 2.5vw, 2.5rem)' }}>
      <FadeUp>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div>
            <span style={{ display: 'block', fontSize: '15.41px', fontWeight: 400, textTransform: 'uppercase', color: 'rgb(178,178,178)', marginBottom: '1.5rem' }}>{t.references.label}</span>
            <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'var(--fs-section)', fontWeight: 400, color: '#fff', margin: 0, lineHeight: 1.25 }}>
              {t.references.heading}
            </h2>
          </div>
          <Link href="/referenzen" className="btn-dark">{t.references.seeAll}</Link>
        </div>
      </FadeUp>

      {/* One wide pinned rectangle — scrolling slides the projects through it horizontally */}
      <ReferencesPinnedSlider projects={PROJECTS} t={t.references} lang={lang} />
    </motion.section>
  )
}

/* ─── TESTIMONIALS ─── */
function TestimonialsSection() {
  const { t, lang } = useLang()

  /* built from the bilingual project data so it follows the language toggle */
  const testimonials = PROJECTS.map(p => ({
    quote: `"${p.quote.text[lang]}"`,
    name: p.quote.author[lang],
    title: p.title,
  }))
  return (
    <section style={{ background: 'rgb(11, 11, 11)', padding: 'max(7vw, 3rem) clamp(1rem, 2.5vw, 2.5rem)' }}>
      <div style={{ position: 'relative', width: '100%', margin: '0 auto', background: 'rgb(6,6,6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'clamp(20px, 3vw, 32px)', padding: 'clamp(1.75rem, 4vw, 4rem)' }}>
        {/* soft blurred glow — clipped in its own layer so it doesn't break the tall sticky stack below (position: sticky needs an ancestor chain without overflow:hidden) */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, top: 0, height: 'clamp(300px, 30vw, 480px)', borderRadius: 'clamp(20px, 3vw, 32px) clamp(20px, 3vw, 32px) 0 0', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-25%', left: '50%', transform: 'translateX(-50%)', width: 'min(70%, 720px)', height: '200%', background: 'radial-gradient(ellipse at center, rgba(120,120,140,0.14), transparent 70%)', filter: 'blur(70px)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'start' }}>
        {/* Left — sticky intro + CTA */}
        <div style={{ position: 'sticky', top: 'clamp(2rem, 14vh, 9rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 6vw, 5rem)' }}>
          <FadeUp>
            <span style={{ display: 'inline-block', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgb(196,196,196)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '8px 18px', marginBottom: '2rem' }}>{t.testimonials.label}</span>
            <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', fontWeight: 400, margin: 0, lineHeight: 1.08, letterSpacing: '-0.02em' }}>
              <span style={{ color: '#fff' }}>{t.testimonials.heading[0]}</span>{' '}
              <span style={{ color: 'rgb(178,178,178)' }}>{t.testimonials.heading[1]}</span>
            </h2>
          </FadeUp>
          <div>
            <Link href="/kontakt" className="btn-dark">{t.contact.cta}</Link>
          </div>
        </div>

        {/* Right — scroll-scrubbed testimonial stack */}
        <TestimonialsStack testimonials={testimonials} />
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT (founder-focused) ─── */
function AboutSection() {
  const { t }               = useLang()
  const ref                 = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yPhoto              = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section ref={ref} id="ueber-uns" style={{ background: '#000', padding: 'max(10vw, 3.5rem) max(5vw, 1.25rem)', overflow: 'hidden' }}>

      {/* Header */}
      <FadeUp>
        <span style={{ display: 'block', fontSize: '15.41px', fontWeight: 400, textTransform: 'uppercase', color: 'rgb(178,178,178)', marginBottom: '1.5rem' }}>
          {t.about.label}
        </span>
        <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'var(--fs-section)', fontWeight: 400, color: '#fff', margin: '0 0 max(5vw, 3rem)', lineHeight: 1.25, maxWidth: '700px' }}>
          <span style={{ color: '#fff' }}>{t.about.heading1} </span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{t.about.heading2}</span>
        </h2>
      </FadeUp>

      {/* Founder — photo + editorial block */}
      <FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'center' }}>

          {/* Left: founder photo with parallax */}
          <motion.div style={{ y: yPhoto }}>
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', aspectRatio: '4 / 5', background: 'rgb(16,16,16)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Image
                src="/img/akif.webp"
                alt="Akif Yaylaci, Gründer von SLIDE"
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
              {/* subtle bottom gradient for depth */}
              <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45) 100%)' }} />
            </div>
          </motion.div>

          {/* Right: identity + bio */}
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '20px', fontWeight: 400, color: '#fff', margin: '0 0 0.3rem' }}>Akif Yaylaci</h3>
              <p style={{ fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: 0, letterSpacing: '0.08em' }}>{t.about.founderRole}</p>
            </div>
            <p style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', color: '#fff', lineHeight: 1.75, margin: '0 0 1.5rem', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>
              {t.about.founderGreeting}
            </p>
            <p style={{ fontSize: '15.41px', color: 'rgb(178,178,178)', lineHeight: 1.75, margin: '0 0 1.25rem' }}>
              {t.about.bio1}
            </p>
            <p style={{ fontSize: '15.41px', color: 'rgb(178,178,178)', lineHeight: 1.75, margin: '0 0 1.75rem' }}>
              {t.about.bio2}
            </p>
            <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(17px, 1.6vw, 21px)', color: '#fff', lineHeight: 1.55, margin: '0 0 2rem', borderLeft: '2px solid rgba(255,255,255,0.35)', paddingLeft: '1.25rem' }}>
              {t.about.bio3Quote}
            </p>

            {/* Stats — count up as this section scrolls through, not on a timer */}
            <div style={{ display: 'flex', gap: 'clamp(1.75rem, 4vw, 2.5rem)', flexWrap: 'wrap', paddingTop: '1.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {t.about.statsLabels.map((label, i) => {
                const cfg = [
                  { from: 0,    to: 10,   suffix: '+' },
                  { from: 0,    to: 100,  suffix: '%' },
                  { from: 2015, to: 2023, suffix: ''  },
                ][i]
                return (
                  <div key={label}>
                    <ScrollCountUp progress={scrollYProgress} range={[0.42, 0.6]} from={cfg.from} to={cfg.to} suffix={cfg.suffix} />
                    <p style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: 0, letterSpacing: '0.08em' }}>{label}</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </FadeUp>
    </section>
  )
}

/* ─── CONTACT ─── */
function ContactSection() {
  const { t } = useLang()

  return (
    <section id="kontakt" style={{ background: '#000', padding: 'max(10vw, 3.5rem) max(5vw, 1.25rem)' }}>
      <FadeUp>
        <span style={{ display: 'block', fontSize: '15.41px', fontWeight: 400, textTransform: 'uppercase', color: 'rgb(178,178,178)', marginBottom: '1.5rem' }}>{t.contact.label}</span>
        <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'var(--fs-section)', fontWeight: 400, color: '#fff', margin: '0 0 3rem', lineHeight: 1.25 }}>
          {t.contact.heading}
        </h2>
      </FadeUp>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        <FadeUp delay={0.1}>
          <ConversationalContactForm contact={t.contact} />
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {t.contact.infoLabels.map((label, i) => {
              const value = t.contact.infoValues[i]
              const href  = i === 0 ? 'mailto:info@slideagentur.ch' : i === 1 ? 'tel:+41783262952' : undefined
              return (
                <div key={label} style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '0.4rem', letterSpacing: '0.08em' }}>{label}</p>
                  {href ? (
                    <a href={href} style={{ fontSize: '15.41px', color: '#fff', textDecoration: 'none', transition: 'color 0.2s' }}>{value}</a>
                  ) : (
                    <p style={{ fontSize: '15.41px', color: '#fff', margin: 0 }}>{value}</p>
                  )}
                </div>
              )
            })}
            <div style={{ paddingTop: '2rem' }}>
              <Link href="/kontakt" className="btn-cta">{t.contact.cta}</Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── PROCESS ─── */
function ProcessSection() {
  const { t }    = useLang()
  const steps    = t.process.steps.map((s, i) => ({ ...s, num: `0${i + 1}` }))

  return (
    <section style={{ background: '#000', padding: 'max(10vw, 3.5rem) max(5vw, 1.25rem)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <FadeUp>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: 'max(5vw, 2.5rem)' }}>
          <div>
            <span style={{ display: 'block', fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '1.25rem', letterSpacing: '0.06em' }}>
              {t.process.label}
            </span>
            <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'var(--fs-section)', fontWeight: 400, color: '#fff', margin: 0, lineHeight: 1.2 }}>
              {t.process.heading[0]}<br />{t.process.heading[1]}
            </h2>
          </div>
          <Link href="/ablauf" className="btn-float" style={{ textDecoration: 'none' }}>
            {t.process.cta}
          </Link>
        </div>
      </FadeUp>

      <FadeUp delay={0.1}>
        <ProcessTimeline steps={steps} dragHint={t.process.dragHint} />
      </FadeUp>
    </section>
  )
}

/* ─── FLOATING START-PROJECT BUTTON ─── */
function StartProjectFab() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const label = t.references.cta.replace('→', '').trim()
  return (
    <div style={{ position: 'fixed', bottom: 'clamp(1.25rem, 3vw, 2rem)', left: '50%', transform: 'translateX(-50%)', zIndex: 50, pointerEvents: 'none' }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ pointerEvents: 'auto' }}
          >
            <Link
              href="/kontakt"
              className="btn-float"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', padding: '14px 26px', whiteSpace: 'nowrap', boxShadow: '0 10px 34px rgba(0,0,0,0.45)' }}
            >
              {label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── SCROLL TO TOP ─── */
function ScrollToTop() {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="stt" aria-label={t.a11y.scrollTop}>↑</motion.button>
      )}
    </AnimatePresence>
  )
}

/* ─── PAGE ─── */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ReferencesSection />
      <ProcessSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <StartProjectFab />
      <ScrollToTop />
    </main>
  )
}
