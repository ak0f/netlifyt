'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'

/* ── Icons ── */
function IconContact() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
/* pixel-dot grid icons — matches reference aesthetic */
function PixelWeb() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden>
      {/* full 3×3 grid = "complete / web" */}
      {[0,6,12].map(x => [0,6,12].map(y => (
        <rect key={`${x}${y}`} x={x} y={y} width="4" height="4" rx="0.8" opacity={0.7} />
      )))}
    </svg>
  )
}
function PixelSocial() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden>
      {/* hub pattern */}
      <rect x="7" y="0" width="4" height="4" rx="0.8" opacity={0.85} />
      <rect x="0" y="7" width="4" height="4" rx="0.8" opacity={0.65} />
      <rect x="14" y="7" width="4" height="4" rx="0.8" opacity={0.65} />
      <rect x="7" y="14" width="4" height="4" rx="0.8" opacity={0.65} />
      <rect x="7" y="7" width="4" height="4" rx="0.8" opacity={0.45} />
    </svg>
  )
}
function PixelMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden>
      {/* envelope-like sparse grid */}
      <rect x="0"  y="0"  width="4" height="4" rx="0.8" opacity={0.85} />
      <rect x="14" y="0"  width="4" height="4" rx="0.8" opacity={0.85} />
      <rect x="7"  y="5"  width="4" height="4" rx="0.8" opacity={0.65} />
      <rect x="0"  y="14" width="4" height="4" rx="0.8" opacity={0.55} />
      <rect x="7"  y="14" width="4" height="4" rx="0.8" opacity={0.55} />
      <rect x="14" y="14" width="4" height="4" rx="0.8" opacity={0.55} />
    </svg>
  )
}
function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.55 }}
    >
      <path d="M2 4l4 4 4-4" />
    </svg>
  )
}

/* ── Flyout data ── */
const SERVICES = [
  { Icon: PixelWeb,    title: 'Website Development', count: '/5 Leistungen', href: '/#leistungen' },
  { Icon: PixelSocial, title: 'Social Media',         count: '/4 Leistungen', href: '/#leistungen' },
  { Icon: PixelMail,   title: 'Email Marketing',      count: '/3 Leistungen', href: '/#leistungen' },
]

const PILL: React.CSSProperties = {
  background: 'rgba(36, 36, 36, 0.50)',
  backdropFilter: 'blur(46.23px)',
  WebkitBackdropFilter: 'blur(46.23px)',
  borderRadius: '15.41px',
}

/* NAV_ITEMS are built dynamically from translations inside Navbar() */

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [flyout, setFlyout]     = useState(false)
  const closeTimer              = useRef<ReturnType<typeof setTimeout>>()
  const { lang, setLang, t }    = useLang()

  const NAV_ITEMS = [
    { label: t.nav.services,   href: '/#leistungen' },
    { label: t.nav.references, href: '/referenzen' },
    { label: t.nav.about,      href: '/#ueber-uns'  },
    { label: t.nav.process,    href: '/ablauf'       },
    { label: t.nav.contact,    href: '/kontakt'      },
  ]

  /* update flyout service names too */
  const FLYOUT_SERVICES = [
    { Icon: PixelWeb,    title: lang === 'de' ? 'Website Development' : 'Website Development', count: t.flyout.counts[0], href: '/#leistungen' },
    { Icon: PixelSocial, title: lang === 'de' ? 'Social Media'        : 'Social Media',        count: t.flyout.counts[1], href: '/#leistungen' },
    { Icon: PixelMail,   title: lang === 'de' ? 'Email Marketing'     : 'Email Marketing',     count: t.flyout.counts[2], href: '/#leistungen' },
  ]

  function openFlyout()  { clearTimeout(closeTimer.current); setFlyout(true) }
  function closeFlyout() { closeTimer.current = setTimeout(() => setFlyout(false), 110) }

  return (
    <>
      {/* Three-pill floating header */}
      <header
        style={{ position: 'fixed', top: '1vw', left: 0, right: 0, zIndex: 99, padding: '0 5vw', pointerEvents: 'none' }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>

          {/* ① Logo pill */}
          <Link href="/" style={{ ...PILL, padding: '8px 14px', display: 'flex', alignItems: 'center', pointerEvents: 'auto' }}>
            <Image src="/img/logo.png" alt="SLIDE" width={88} height={28} style={{ height: '26px', width: 'auto' }} priority />
          </Link>

          {/* ② Nav-links pill */}
          <nav
            style={{ ...PILL, position: 'absolute', left: '50%', transform: 'translateX(-50%)', padding: '8px 6px', alignItems: 'center', gap: '2px', pointerEvents: 'auto' }}
            className="hidden lg:flex"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(item =>
              item.label === t.nav.services ? (

                /* ── Leistungen with flyout ── */
                <div
                  key={item.href}
                  style={{ position: 'relative' }}
                  onMouseEnter={openFlyout}
                  onMouseLeave={closeFlyout}
                >
                  <Link
                    href={item.href}
                    className="nav-item"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  >
                    {item.label}
                    <IconChevron open={flyout} />
                  </Link>

                  <AnimatePresence>
                    {flyout && (
                      <motion.div
                        key="flyout"
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        onMouseEnter={openFlyout}
                        onMouseLeave={closeFlyout}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 14px)',
                          left: '50%',
                          translateX: '-50%',
                          width: '340px',
                          background: 'rgba(16, 16, 16, 0.88)',
                          backdropFilter: 'blur(52px)',
                          WebkitBackdropFilter: 'blur(52px)',
                          borderRadius: '16px',
                          border: '1px solid rgba(255,255,255,0.07)',
                          overflow: 'hidden',
                          boxShadow: '0 24px 56px rgba(0,0,0,0.55)',
                        }}
                      >
                        {FLYOUT_SERVICES.map((s, i) => (
                          <motion.div
                            key={s.title}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.055, duration: 0.18, ease: 'easeOut' }}
                          >
                            <FlyoutCard {...s} onClose={() => setFlyout(false)} last={i === FLYOUT_SERVICES.length - 1} />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              ) : (
                <Link key={item.href} href={item.href} className="nav-item">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* ③ Right pill */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', pointerEvents: 'auto', marginLeft: 'auto' }}>
            {/* Language toggle — desktop */}
            <div
              className="hidden lg:flex"
              style={{ ...PILL, alignItems: 'center', padding: '4px', gap: '2px' }}
            >
              {(['de', 'en'] as const).map(code => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '11px',
                    border: 'none',
                    background: lang === code ? 'rgba(255,255,255,0.14)' : 'transparent',
                    color: lang === code ? '#fff' : 'rgba(255,255,255,0.42)',
                    fontSize: '12px',
                    fontWeight: 400,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    letterSpacing: '0.04em',
                    transition: 'all 0.18s',
                    textTransform: 'uppercase',
                  }}
                >
                  {code}
                </button>
              ))}
            </div>

            <Link
              href="/kontakt"
              aria-label="Erstgespräch buchen"
              className="hidden lg:inline-flex"
              style={{
                ...PILL,
                width: '42px', height: '42px',
                alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.72)',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(60,60,60,0.60)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.72)'; (e.currentTarget as HTMLElement).style.background = 'rgba(36,36,36,0.50)' }}
            >
              <IconContact />
            </Link>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setOpen(v => !v)}
              style={{ ...PILL, padding: '11px 14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className="lg:hidden"
              aria-label="Menü öffnen"
              aria-expanded={open}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '18px' }}>
                <span style={{ display: 'block', height: '1.5px', background: 'rgba(255,255,255,0.8)', borderRadius: '1px', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(0,6.5px)' : 'none' }} />
                <span style={{ display: 'block', height: '1.5px', background: 'rgba(255,255,255,0.8)', borderRadius: '1px', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
                <span style={{ display: 'block', height: '1.5px', background: 'rgba(255,255,255,0.8)', borderRadius: '1px', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(0,-6.5px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 'calc(1vw + 54px)',
              left: '5vw', right: '5vw',
              zIndex: 98,
              borderRadius: '15.41px',
              background: 'rgba(18, 18, 18, 0.96)',
              backdropFilter: 'blur(46px)',
              WebkitBackdropFilter: 'blur(46px)',
              padding: '8px',
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.18 }}
              >
                <Link href={item.href} onClick={() => setOpen(false)} className="nav-item-mobile">
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* CTA */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '8px 0 0', padding: '8px 0 0' }}>
              <Link
                href="/kontakt"
                onClick={() => setOpen(false)}
                style={{ display: 'block', padding: '12px 16px', color: '#fff', fontSize: '15.41px', fontWeight: 400, textDecoration: 'none', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', marginBottom: '6px' }}
              >
                {lang === 'de' ? 'Erstgespräch buchen →' : 'Book a free call →'}
              </Link>

              {/* Language switch */}
              <div style={{ display: 'flex', gap: '6px', padding: '4px 0' }}>
                {(['de', 'en'] as const).map(code => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setOpen(false) }}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: `1px solid ${lang === code ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}`,
                      background: lang === code ? 'rgba(255,255,255,0.09)' : 'transparent',
                      color: lang === code ? '#fff' : 'rgba(255,255,255,0.45)',
                      fontSize: '13px',
                      fontWeight: 400,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      transition: 'all 0.18s',
                    }}
                  >
                    {code === 'de' ? 'DE · Deutsch' : 'EN · English'}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Flyout row card — reference style ── */
function FlyoutCard({
  Icon, title, count, href, onClose, last,
}: {
  Icon: () => JSX.Element
  title: string
  count: string
  href: string
  onClose: () => void
  last?: boolean
}) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={href}
      onClick={onClose}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '1.1rem 1.25rem',
        textDecoration: 'none',
        background: hov ? 'rgba(255,255,255,0.05)' : 'transparent',
        borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.06)',
        transition: 'background 0.16s',
        cursor: 'pointer',
      }}
    >
      {/* pixel icon box */}
      <div style={{
        width: '34px', height: '34px', flexShrink: 0,
        borderRadius: '8px',
        background: hov ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
        transition: 'background 0.16s, color 0.16s',
      }}>
        <Icon />
      </div>

      {/* title */}
      <span style={{
        flex: 1,
        fontSize: '14px',
        fontWeight: 400,
        color: hov ? '#fff' : 'rgba(255,255,255,0.82)',
        transition: 'color 0.16s',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </span>

      {/* count */}
      <span style={{
        fontSize: '11px',
        color: 'rgba(255,255,255,0.28)',
        letterSpacing: '0.02em',
        flexShrink: 0,
      }}>
        {count}
      </span>
    </Link>
  )
}
