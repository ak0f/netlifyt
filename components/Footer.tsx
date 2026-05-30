'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/context/LanguageContext'

const COMPANY_HREFS = ['/#ueber-uns', '/#referenzen', '/#preise', '/ablauf', '/#kontakt']
const SERVICE_HREFS = ['/#leistungen', '/#leistungen', '/#leistungen', '/#leistungen']
const LEGAL = [
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'Impressum',   href: '/impressum' },
  { label: 'AGB',         href: '/agb' },
]

const linkStyle: React.CSSProperties = {
  fontSize: '15.41px',
  fontWeight: 400,
  color: 'rgb(112, 112, 112)',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.85rem',
  transition: 'color 0.2s',
}

const headingStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 400,
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.28)',
  marginBottom: '1.5rem',
  letterSpacing: '0.04em',
}

function IconInstagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  )
}

const socialLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '15.41px',
  fontWeight: 400,
  color: 'rgb(112, 112, 112)',
  textDecoration: 'none',
  marginBottom: '0.85rem',
  transition: 'color 0.2s',
}

function FooterGlowWordmark() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', zIndex: 1, overflow: 'hidden', lineHeight: 0, marginTop: '-2vw', cursor: 'default' }}
    >
      <motion.span
        className="ghost-wm"
        animate={{
          filter: hovered
            ? 'drop-shadow(0 0 48px rgba(255,255,255,0.14)) brightness(3.8)'
            : 'brightness(1)',
          WebkitTextStroke: hovered ? '1.5px rgba(255,255,255,0.55)' : '1px rgba(255,255,255,0.18)',
        }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        SLIDE
      </motion.span>
    </div>
  )
}

export default function Footer() {
  const { t } = useLang()
  return (
    <footer style={{ position: 'relative', background: '#000', overflow: 'hidden', paddingBottom: 0 }}>

      {/* Content */}
      <div style={{ padding: '10vw 5vw 4vw', position: 'relative', zIndex: 2 }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '3rem',
          marginBottom: '6vw',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: '6vw',
        }}>

          {/* Brand */}
          <div>
            <Image src="/img/logo.png" alt="SLIDE" width={100} height={32} style={{ height: '28px', width: 'auto', marginBottom: '1.25rem' }} />
            <p style={{ fontSize: '15.41px', fontWeight: 400, color: 'rgb(112,112,112)', lineHeight: 1.65, maxWidth: '200px' }}>
              {t.footer.desc}
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <p style={headingStyle}>{t.footer.col1}</p>
            {t.footer.services.map((label, i) => (
              <Link key={label} href={SERVICE_HREFS[i]} style={linkStyle} className="footer-link">
                {label}
              </Link>
            ))}
          </div>

          {/* Unternehmen */}
          <div>
            <p style={headingStyle}>{t.footer.col2}</p>
            {t.footer.company.map((label, i) => (
              <Link key={label} href={COMPANY_HREFS[i]} style={linkStyle} className="footer-link">
                {label}
              </Link>
            ))}
          </div>

          {/* Kontakt + Social */}
          <div>
            <p style={headingStyle}>{t.footer.col3}</p>
            <a href="mailto:info@slideagentur.ch" style={linkStyle} className="footer-link">
              info@slideagentur.ch
            </a>
            <a href="tel:+41783262952" style={linkStyle} className="footer-link">
              +41 78 326 29 52
            </a>
            <p style={{ ...linkStyle, cursor: 'default', marginBottom: '1.75rem' }}>
              Ostermundigen, Bern<br />Schweiz
            </p>

            {/* Social links */}
            <p style={{ ...headingStyle, marginBottom: '1rem' }}>{t.footer.col4}</p>
            <a
              href="https://www.instagram.com/slideagentur"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...socialLinkStyle, display: 'flex' }}
              className="footer-link"
            >
              <IconInstagram />
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@slideagentur"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...socialLinkStyle, display: 'flex' }}
              className="footer-link"
            >
              <IconTikTok />
              TikTok
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <p style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.25)' }}>
            {t.footer.rights}
          </p>
          <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {LEGAL.map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'color 0.2s' }} className="footer-link-sm">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Ghost wordmark — spotlight glow on hover */}
      <FooterGlowWordmark />

    </footer>
  )
}
