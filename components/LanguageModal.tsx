'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/context/LanguageContext'
import type { Lang } from '@/lib/i18n'

function FlagDE() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden>
      <rect width="22" height="5.33" y="0"    fill="#000" rx="1" />
      <rect width="22" height="5.33" y="5.33" fill="#D00" />
      <rect width="22" height="5.34" y="10.66" fill="#FFCE00" rx="1" />
    </svg>
  )
}
function FlagEN() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden>
      <rect width="22" height="16" fill="#012169" rx="1" />
      <path d="M0 0 L22 16 M22 0 L0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0 L22 16 M22 0 L0 16" stroke="#C8102E" strokeWidth="1.8" />
      <path d="M11 0 V16 M0 8 H22" stroke="#fff" strokeWidth="5" />
      <path d="M11 0 V16 M0 8 H22" stroke="#C8102E" strokeWidth="3" />
    </svg>
  )
}

export default function LanguageModal() {
  const { showModal, lang, confirmLang, t } = useLang()
  const [hovered, setHovered] = useState<Lang | null>(null)

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '1.5rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
            style={{
              background: 'rgba(16,16,16,0.92)',
              backdropFilter: 'blur(48px)',
              WebkitBackdropFilter: 'blur(48px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '22px',
              padding: '2.5rem 2rem',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center',
              boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
            }}
          >
            {/* Logo */}
            <Image
              src="/img/logo.png"
              alt="SLIDE"
              width={100}
              height={32}
              style={{ height: '28px', width: 'auto', marginBottom: '2rem', opacity: 0.9 }}
            />

            {/* Heading */}
            <p style={{ fontSize: '20px', fontWeight: 400, color: '#fff', margin: '0 0 0.5rem', letterSpacing: '-0.02em', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
              {t.modal.heading}
            </p>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.42)', margin: '0 0 2rem', lineHeight: 1.5 }}>
              {t.modal.sub}
            </p>

            {/* Language options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {([
                { code: 'de' as Lang, Flag: FlagDE, label: 'Deutsch' },
                { code: 'en' as Lang, Flag: FlagEN, label: 'English' },
              ]).map(({ code, Flag, label }) => {
                const isSelected = lang === code
                const isHovered  = hovered === code
                return (
                  <button
                    key={code}
                    onClick={() => confirmLang(code)}
                    onMouseEnter={() => setHovered(code)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '1.25rem 1rem',
                      borderRadius: '14px',
                      border: isSelected
                        ? '1.5px solid rgba(255,255,255,0.35)'
                        : '1px solid rgba(255,255,255,0.09)',
                      background: isSelected
                        ? 'rgba(255,255,255,0.08)'
                        : isHovered
                        ? 'rgba(255,255,255,0.04)'
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.18s',
                      fontFamily: 'inherit',
                    }}
                  >
                    <Flag />
                    <span style={{ fontSize: '14px', fontWeight: 400, color: isSelected ? '#fff' : 'rgba(255,255,255,0.65)' }}>
                      {label}
                    </span>
                    {isSelected && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'block' }} />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
