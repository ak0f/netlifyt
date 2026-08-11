'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Script from 'next/script'
import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

export default function CookieBanner() {
  const { t } = useLang()
  const [consent, setConsent] = useState<boolean | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('slide_consent')
    if (stored === null) {
      const t = setTimeout(() => setShow(true), 2200)
      return () => clearTimeout(t)
    } else {
      setConsent(stored === 'true')
    }
  }, [])

  function accept() {
    localStorage.setItem('slide_consent', 'true')
    setConsent(true)
    setShow(false)
  }

  function decline() {
    localStorage.setItem('slide_consent', 'false')
    setConsent(false)
    setShow(false)
  }

  return (
    <>
      {consent === true && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-8F1NEXTRWX"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8F1NEXTRWX');
          `}</Script>
        </>
      )}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              left: '50%',
              translateX: '-50%',
              zIndex: 9998,
              background: 'rgba(22, 22, 22, 0.97)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: '15.41px',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '1.1rem 1.4rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              maxWidth: '600px',
              width: 'calc(100vw - 3rem)',
            }}
          >
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, margin: 0, flex: 1, minWidth: '180px' }}>
              {t.cookie.text}{' '}
              <Link href="/datenschutz" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                {t.cookie.privacy}
              </Link>
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
              <button
                onClick={decline}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              >
                {t.cookie.decline}
              </button>
              <button
                onClick={accept}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              >
                {t.cookie.accept}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
