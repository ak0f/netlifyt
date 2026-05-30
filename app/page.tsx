'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'

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

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
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

/* ─── HERO ─── */
function HeroSection() {
  const { t } = useLang()
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
      style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 max(5vw, 1.25rem) max(8vw, 3rem)', background: '#000', overflow: 'hidden' }}
    >
      {/* Atmospheric background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>

        {/* 3D letter */}
        <Hero3DLetter />

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
          <motion.h1 initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.18 }} style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'var(--fs-hero)', fontWeight: 400, lineHeight: 1.5, margin: 0 }}>
            <span style={{ color: '#ffffff' }}>{t.hero.line1} </span>
            <span style={{ color: 'rgba(255,255,255,0.40)' }}>{t.hero.line2}</span>
          </motion.h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.42 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: 'max(5vw, 2.5rem)' }}>
          <Link href="/#kontakt" className="btn-cta">{t.hero.cta}</Link>
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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68, duration: 1 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(1.25rem, 4vw, 3rem)', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <StatItem value={t.hero.stat1} label={t.hero.stat1Label} />
          <StatItem stars label={t.hero.stat2Label} />
          <StatItem value={t.hero.stat3} label={t.hero.stat3Label} />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', x: '-50%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', pointerEvents: 'none' }}
        initial={{ opacity: 0, y: 56 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden
      >
        <span style={{ fontSize: '10px', fontWeight: 400, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 2.8 }}
          style={{ display: 'block', color: 'rgba(255,255,255,0.28)', fontSize: '14px', lineHeight: 1 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}

function StatItem({ value, label, stars }: { value?: string; label: string; stars?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {stars ? (
        <span style={{ fontSize: '1rem', fontWeight: 400, color: '#fff', lineHeight: 1 }}>★★★★★</span>
      ) : (
        <span style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 400, color: '#fff', lineHeight: 1 }}>{value}</span>
      )}
      <span style={{ fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.08em' }}>{label}</span>
    </div>
  )
}

/* ─── SERVICES ─── */
const SERVICE_IMGS = ['/img/webdesign.png', '/img/socialmedia.png', '/img/email.png']

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
    subtitle: '/5 services',
    img: SERVICE_IMGS[i],
    features: item.features,
  }))

  return (
    <section ref={ref} id="leistungen" style={{ background: '#0a0a0a', padding: 'max(10vw, 3.5rem) max(5vw, 1.25rem)', overflow: 'hidden' }}>
      <FadeUp>
        <motion.div style={{ y: yHeader }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '5vw' }}>
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '1.25rem', letterSpacing: '0.06em' }}>
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

function ServiceCard({ title, tagline, subtitle, img, features, idx }: {
  num?: string; title: string; tagline: string; subtitle: string; img: string; features: string[]; idx: number
}) {
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
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          aspectRatio: isMobile ? undefined : '3 / 4',
          minHeight: isMobile ? '0' : undefined,
          cursor: 'default',
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

          {/* Pills — always visible on mobile (max 3), hover on desktop */}
          <div style={{ flexGrow: isMobile ? 0 : 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem', paddingBlock: isMobile ? '1rem' : '1.75rem' }}>
            <AnimatePresence>
              {(hovered || isMobile) && (isMobile ? features.slice(0, 3) : features).map((f, i) => (
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
              {(hovered || isMobile) && (
                <motion.a
                  href="/kontakt"
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
                  See More
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
const PROJECTS = [
  {
    img: '/img/apotheke.png', alt: 'Wegmühle Apotheke Website', title: 'Wegmühle Apotheke',
    desc: 'Eine moderne, benutzerfreundliche Website für die Wegmühle Apotheke. Vollständig in HTML, CSS und JavaScript programmiert.',
    quote: '"Die neue Website hat unsere Kundenanfragen spürbar erhöht. Schnelle Umsetzung, sauberes Ergebnis." – M. Emch',
    meta: { location: 'Bern, Schweiz', industry: 'Apotheke', service: 'Website' },
    links: [{ label: 'Website ansehen →', href: 'https://apotheke.akif.pw' }],
  },
  {
    img: '/img/doner.png', alt: 'Avanti Bistro', title: 'Avanti Bistro Ittigen',
    desc: 'Eine warme, responsive Website für das Avanti Bistro in Ittigen. Benutzerfreundliches Design, optimiert für alle Bildschirmgrössen.',
    quote: '"Unkomplizierte Zusammenarbeit, klare Kommunikation und ein Resultat, das überzeugt." – Avanti Bistro',
    meta: { location: 'Ittigen, Bern', industry: 'Gastronomie', service: 'Website' },
    links: [{ label: 'Website ansehen →', href: 'https://avanti-bern.akif.pw' }],
  },
  {
    img: '/img/zerotrace.png', alt: 'ZeroTrace', title: 'ZeroTrace',
    desc: 'SLIDE hat die Social-Media-Kanäle von ZeroTrace übernommen und 1–2 Beiträge pro Woche erstellt. Online-Sichtbarkeit deutlich gesteigert.',
    quote: '"Das Content Marketing ist sehr gut umgesetzt." – 9dl, CEO von ZeroTrace',
    meta: { location: 'Online', industry: 'Tech / Privacy', service: 'Social Media' },
    links: [{ label: 'TikTok →', href: 'https://www.tiktok.com/@zerotrace.pw' }, { label: 'Instagram →', href: 'https://www.instagram.com/zerotrace.pw' }],
  },
  {
    img: '/img/portfolio.png', alt: 'Portfolio Akif Yaylaci', title: 'Portfolio Akif Yaylaci',
    desc: 'Das persönliche Portfolio des SLIDE-Gründers – modernes Webprojekt in HTML, CSS und JavaScript als Demonstration des handwerklichen Könnens.',
    quote: '"Dein Portfolio hat uns recht beeindruckt." – Bundesamt für Informatik und Telekommunikation (BIT)',
    meta: { location: 'Bern, Schweiz', industry: 'Web Development', service: 'Portfolio' },
    links: [{ label: 'Portfolio ansehen →', href: 'https://akif.pw' }],
  },
]

function ReferencesSection() {
  const { t } = useLang()
  return (
    <section id="referenzen" style={{ background: 'rgb(15, 15, 15)', padding: 'max(10vw, 3.5rem) max(5vw, 1.25rem)' }}>
      <FadeUp>
        <span style={{ display: 'block', fontSize: '15.41px', fontWeight: 400, textTransform: 'uppercase', color: 'rgb(112,112,112)', marginBottom: '1.5rem' }}>{t.references.label}</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'var(--fs-section)', fontWeight: 400, color: '#fff', margin: 0, lineHeight: 1.25 }}>
            {t.references.heading}
          </h2>
          <Link href="/kontakt" className="btn-dark">{t.references.cta}</Link>
        </div>
      </FadeUp>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'max(10vw, 3.5rem)' }}>
        {PROJECTS.map((p, idx) => <ProjectCard key={p.title} {...p} idx={idx} />)}
      </div>
    </section>
  )
}

function ProjectCard({ img, alt, title, desc, quote, meta, links, idx }: {
  img: string; alt: string; title: string; desc: string; quote: string
  meta: { location: string; industry: string; service: string }
  links: { label: string; href: string }[]; idx: number
}) {
  const { t } = useLang()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yImg   = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const isEven = idx % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '3rem', alignItems: 'start', direction: isEven ? 'ltr' : 'rtl' }}
    >
      {/* Image with parallax */}
      <div style={{ borderRadius: '15.41px', overflow: 'hidden', background: 'rgb(29,29,29)', direction: 'ltr' }}>
        <motion.div style={{ y: yImg }}>
          <Image
            src={img} alt={alt} width={700} height={420}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', filter: 'brightness(0.88)', transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s', transform: 'scale(1.04)' }}
            unoptimized
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.09)'; e.currentTarget.style.filter = 'brightness(0.95)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'brightness(0.88)' }}
          />
        </motion.div>
      </div>

      <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '29px', fontWeight: 400, color: '#fff', margin: '0 0 0.5rem', lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: '15.41px', color: 'rgb(112,112,112)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
        <p style={{ fontSize: '15.41px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, margin: 0, paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>{quote}</p>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {[[t.references.meta.location, meta.location], [t.references.meta.industry, meta.industry], [t.references.meta.service, meta.service]].map(([k, v]) => (
            <div key={k}>
              <p style={{ fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '0.3rem', letterSpacing: '0.08em' }}>{k}</p>
              <p style={{ fontSize: '14px', color: '#fff', margin: 0 }}>{v}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-dark" style={{ padding: '10px 20px', fontSize: '14px' }}>{l.label}</a>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS = [
  { quote: '"Die neue Website hat unsere Kundenanfragen spürbar erhöht. Schnelle Umsetzung, sauberes Ergebnis."', name: 'M. Emch', title: 'Wegmühle Apotheke' },
  { quote: '"Unkomplizierte Zusammenarbeit, klare Kommunikation und ein Resultat, das überzeugt."',              name: 'Avanti Bistro Team', title: 'Avanti Bistro Ittigen' },
  { quote: '"Das Content Marketing ist sehr gut umgesetzt."',                                                    name: '9dl', title: 'CEO, ZeroTrace' },
  { quote: '"Dein Portfolio hat uns recht beeindruckt."',                                                        name: 'Bundesamt für Informatik und Telekommunikation', title: 'BIT' },
]

function TestimonialsSection() {
  const { t } = useLang()
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <section style={{ background: 'rgb(16, 16, 16)', padding: 'max(8vw, 2.5rem) 0', overflow: 'hidden' }}>
      <FadeIn>
        <p style={{ fontSize: '15.41px', fontWeight: 400, textTransform: 'uppercase', color: 'rgb(112,112,112)', paddingInline: 'max(5vw, 1.25rem)', marginBottom: 'max(4vw, 1.5rem)' }}>{t.testimonials.label}</p>
      </FadeIn>
      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-track" style={{ gap: '1.5rem', animationDuration: '40s' }}>
          {doubled.map((t, i) => (
            <div key={i} style={{ background: 'rgb(29,29,29)', borderRadius: '15.41px', padding: '1.75rem', minWidth: '340px', maxWidth: '380px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ fontSize: '15.41px', color: '#fff', lineHeight: 1.65, margin: 0 }}>{t.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: '13px', color: '#fff', margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: '11px', color: 'rgb(112,112,112)', margin: 0 }}>{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT (editorial row layout) ─── */
/* VALUES now come from translations — see AboutSection */

function ValueRow({ num, title, desc, idx, isMobile = false }: { num: string; title: string; desc: string; idx: number; isMobile?: boolean }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: idx * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '72px 1fr 1fr',
        gap: isMobile ? '0.5rem' : '2.5rem',
        alignItems: isMobile ? 'start' : 'center',
        padding: 'max(3vw, 1.5rem) 0',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        cursor: 'default',
      }}
    >
      {/* Number — hidden on mobile */}
      {!isMobile && (
        <motion.span
          animate={{ opacity: hovered ? 0.55 : 0.18 }}
          transition={{ duration: 0.3 }}
          style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '13px', color: '#fff', letterSpacing: '0.08em', fontWeight: 400 }}
        >
          {num}
        </motion.span>
      )}

      {/* Title */}
      <motion.h3
        animate={{ x: hovered ? 10 : 0, color: hovered ? '#ffffff' : 'rgba(255,255,255,0.85)' }}
        transition={{ duration: 0.3 }}
        style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(20px, 1.8vw, 28px)', fontWeight: 400, margin: 0, lineHeight: 1.2 }}
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        animate={{ opacity: hovered ? 1 : 0.45 }}
        transition={{ duration: 0.3 }}
        style={{ fontSize: '15.41px', color: 'rgb(112,112,112)', lineHeight: 1.65, margin: 0 }}
      >
        {desc}
      </motion.p>
    </motion.div>
  )
}

function AboutSection() {
  const { t }               = useLang()
  const ref                 = useRef(null)
  const isMobile            = useIsMobile()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yQuote              = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  return (
    <section ref={ref} id="ueber-uns" style={{ background: '#000', padding: 'max(10vw, 3.5rem) max(5vw, 1.25rem)', overflow: 'hidden' }}>

      {/* Header */}
      <FadeUp>
        <span style={{ display: 'block', fontSize: '15.41px', fontWeight: 400, textTransform: 'uppercase', color: 'rgb(112,112,112)', marginBottom: '1.5rem' }}>
          {t.about.label}
        </span>
        <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'var(--fs-section)', fontWeight: 400, color: '#fff', margin: '0 0 3rem', lineHeight: 1.25, maxWidth: '700px' }}>
          <span style={{ color: '#fff' }}>{t.about.heading1} </span>
          <span style={{ color: 'rgba(255,255,255,0.40)' }}>{t.about.heading2}</span>
        </h2>
      </FadeUp>

      {/* Values — editorial rows */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: 'max(10vw, 3rem)' }}>
        {t.about.values.map((v, idx) => <ValueRow key={v.num} {...v} idx={idx} isMobile={isMobile} />)}
      </div>

      {/* Founder — editorial block */}
      <FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5vw', alignItems: 'center' }}>

          {/* Left: identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgb(29,29,29)', borderRadius: '15.41px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', fontWeight: 400, color: 'rgba(255,255,255,0.4)', flexShrink: 0, border: '1px solid rgba(255,255,255,0.07)' }}>
                AY
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: '20px', fontWeight: 400, color: '#fff', margin: '0 0 0.2rem' }}>Akif Yaylaci</h3>
                <p style={{ fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', margin: 0, letterSpacing: '0.08em' }}>{t.about.founderRole}</p>
              </div>
            </div>
            <p style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', color: '#fff', lineHeight: 1.75, margin: '0 0 1.5rem', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>
              {t.about.founderGreeting}
            </p>
            <p style={{ fontSize: '15.41px', color: 'rgb(112,112,112)', lineHeight: 1.75, margin: '0 0 1.25rem' }}>
              {t.about.bio1}
            </p>
            <p style={{ fontSize: '15.41px', color: 'rgb(112,112,112)', lineHeight: 1.75, margin: '0 0 1.25rem' }}>
              {t.about.bio2}
            </p>
            <p style={{ fontSize: '15.41px', color: 'rgb(112,112,112)', lineHeight: 1.75, margin: 0 }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t.about.bio3Quote}</span>
            </p>
          </div>

          {/* Right: large pull-quote with parallax */}
          <motion.div style={{ y: yQuote }}>
            <div style={{ position: 'relative', padding: '3rem', background: 'rgb(16,16,16)', borderRadius: '15.41px', overflow: 'hidden' }}>
              {/* Decorative quote mark */}
              <span aria-hidden style={{ position: 'absolute', top: '-0.5rem', left: '1.5rem', fontFamily: 'Georgia, serif', fontSize: '8rem', color: 'rgba(255,255,255,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</span>
              <p style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(18px, 1.8vw, 26px)', fontWeight: 400, color: '#fff', lineHeight: 1.6, margin: '0 0 2rem', position: 'relative', zIndex: 1 }}>
                {t.about.bio3Quote}
              </p>
              <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                {t.about.statsLabels.map((label, i) => {
                  const val = ['10+', '100%', '2023'][i]
                  return (
                    <div key={label}>
                      <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1.4rem', fontWeight: 400, color: '#fff', margin: '0 0 0.2rem', lineHeight: 1 }}>{val}</p>
                      <p style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', margin: 0, letterSpacing: '0.08em' }}>{label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </FadeUp>
    </section>
  )
}

/* ─── CONTACT ─── */
function ContactSection() {
  const { t }                     = useLang()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data as unknown as Record<string, string>).toString() })
      setSubmitted(true)
    } catch { setError(true) }
  }

  return (
    <section id="kontakt" style={{ background: '#000', padding: 'max(10vw, 3.5rem) max(5vw, 1.25rem)' }}>
      <FadeUp>
        <span style={{ display: 'block', fontSize: '15.41px', fontWeight: 400, textTransform: 'uppercase', color: 'rgb(112,112,112)', marginBottom: '1.5rem' }}>{t.contact.label}</span>
        <h2 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'var(--fs-section)', fontWeight: 400, color: '#fff', margin: '0 0 3rem', lineHeight: 1.25 }}>
          {t.contact.heading}
        </h2>
      </FadeUp>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        <FadeUp delay={0.1}>
          <div style={{ background: 'rgb(39,39,39)', borderRadius: '20px', padding: 'clamp(1.25rem, 5vw, 2.5rem)' }}>
            <p style={{ fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem', letterSpacing: '0.08em' }}>
              {t.contact.formLabel}
            </p>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '3rem 0', textAlign: 'center' }}>
                  <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#fff', fontSize: '1.2rem' }}>✓</div>
                  <p style={{ fontSize: '15.41px', color: 'rgb(112,112,112)', lineHeight: 1.65 }}>{t.contact.success}</p>
                </motion.div>
              ) : (
                <motion.form key="form" name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="form-2col">
                    <div>
                      <label htmlFor="name" style={{ display: 'block', fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem', letterSpacing: '0.08em' }}>{t.contact.fields.name}</label>
                      <input id="name" name="name" type="text" required placeholder={t.contact.fields.namePh} className="fi" />
                    </div>
                    <div>
                      <label htmlFor="email" style={{ display: 'block', fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem', letterSpacing: '0.08em' }}>{t.contact.fields.email}</label>
                      <input id="email" name="email" type="email" required placeholder={t.contact.fields.emailPh} className="fi" />
                    </div>
                  </div>
                  <div className="form-2col">
                    <div>
                      <label htmlFor="phone" style={{ display: 'block', fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem', letterSpacing: '0.08em' }}>{t.contact.fields.phone}</label>
                      <input id="phone" name="phone" type="tel" placeholder={t.contact.fields.phonePh} className="fi" />
                    </div>
                    <div>
                      <label htmlFor="subject" style={{ display: 'block', fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem', letterSpacing: '0.08em' }}>{t.contact.fields.subject}</label>
                      <select id="subject" name="subject" required className="fs">
                        <option value="">{t.contact.fields.subjectDefault}</option>
                        {t.contact.subjects.map(s => <option key={s} value={s.toLowerCase().replace(/\s+/g, '-')}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.6rem', letterSpacing: '0.08em' }}>{t.contact.fields.message}</label>
                    <textarea id="message" name="message" required placeholder={t.contact.fields.messagePh} className="ft" />
                  </div>
                  {error && <p style={{ fontSize: '14px', color: '#f87171' }}>{t.contact.error}</p>}
                  <button type="submit" className="btn-dark" style={{ justifyContent: 'center' }}>{t.contact.submit}</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {t.contact.infoLabels.map((label, i) => {
              const value = t.contact.infoValues[i]
              const href  = i === 0 ? 'mailto:info@slideagentur.ch' : i === 1 ? 'tel:+41783262952' : undefined
              return (
                <div key={label} style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ fontSize: '11px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '0.4rem', letterSpacing: '0.08em' }}>{label}</p>
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
  const isMobile = useIsMobile()
  const steps    = t.process.steps.map((s, i) => ({ ...s, num: `0${i + 1}` }))

  return (
    <section style={{ background: '#000', padding: 'max(10vw, 3.5rem) max(5vw, 1.25rem)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <FadeUp>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: 'max(5vw, 2.5rem)' }}>
          <div>
            <span style={{ display: 'block', fontSize: '12px', fontWeight: 400, textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '1.25rem', letterSpacing: '0.06em' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: isMobile ? '1rem' : '2px' }}>
        {steps.map((step, idx) => {
          const isFirst = idx === 0
          const isLast  = idx === steps.length - 1
          const radius  = isMobile
            ? '15.41px'
            : isFirst
            ? '15.41px 4px 4px 15.41px'
            : isLast
            ? '4px 15.41px 15.41px 4px'
            : '4px'
          return (
            <FadeUp key={step.num} delay={idx * 0.12}>
              <div style={{ background: 'rgb(10,10,10)', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2.5rem)', borderRadius: radius, height: '100%' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', marginBottom: '2.5rem' }}>
                  {step.num}
                </span>
                <h3 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(32px, 3vw, 44px)', fontWeight: 400, color: '#fff', margin: '0 0 1.25rem', lineHeight: 1.1 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '15.41px', color: 'rgb(112,112,112)', lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </FadeUp>
          )
        })}
      </div>
    </section>
  )
}

/* ─── SCROLL TO TOP ─── */
function ScrollToTop() {
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
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="stt" aria-label="Nach oben scrollen">↑</motion.button>
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
      <ProcessSection />
      <ReferencesSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <ScrollToTop />
    </main>
  )
}
