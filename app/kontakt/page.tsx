'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const SERVICES = [
  'Website Entwicklung',
  'Social Media Marketing',
  'E-Mail & Domain',
  'Wartung & IT-Support',
  'Sonstiges',
]

const BUDGETS = [
  'Unter CHF 500',
  'CHF 500 – 1\'000',
  'CHF 1\'000 – 3\'000',
  'Über CHF 3\'000',
  'Noch unklar',
]

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      variants={FADE_UP}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default function KontaktPage() {
  const [sent, setSent] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
      setSent(true)
    } catch {
      setSent(true)
    }
  }

  return (
    <main style={{ background: '#000', minHeight: '100vh', paddingTop: 'clamp(90px, 15vw, 120px)' }}>

      {/* Hero strip */}
      <section style={{ padding: 'max(6vw, 1.5rem) max(5vw, 1.25rem) max(4vw, 1.25rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeSection>
            <span className="s-label">Kontakt</span>
          </FadeSection>
          <FadeSection delay={0.08}>
            <h1 style={{
              fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
              fontSize: 'clamp(42px, 6vw, 96px)',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              margin: '0 0 2rem',
            }}>
              Lass uns<br />
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>zusammenarbeiten.</span>
            </h1>
          </FadeSection>
          <FadeSection delay={0.14}>
            <p style={{ fontSize: '15.41px', color: 'rgb(112,112,112)', maxWidth: '480px', lineHeight: 1.7 }}>
              Füll das Formular aus oder schreib uns direkt — wir melden uns innerhalb von 24 Stunden.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* Main content: form + sidebar */}
      <section style={{ padding: '0 max(5vw, 1.25rem) max(10vw, 3rem)' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 340px',
          gap: 'clamp(2rem, 6vw, 6rem)',
          alignItems: 'start',
        }}
          className="kontakt-grid"
        >

          {/* ── Form ── */}
          <FadeSection delay={0.1}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgb(16,16,16)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '15.41px',
                  padding: '4rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>✓</div>
                <h2 style={{
                  fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
                  fontSize: 'clamp(24px, 2.5vw, 36px)',
                  fontWeight: 400,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  marginBottom: '1rem',
                }}>
                  Nachricht erhalten.
                </h2>
                <p style={{ color: 'rgb(112,112,112)', fontSize: '15.41px', lineHeight: 1.7 }}>
                  Vielen Dank für deine Anfrage. Wir melden uns innerhalb von 24 Stunden bei dir.
                </p>
              </motion.div>
            ) : (
              <form
                name="kontakt"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
              >
                <input type="hidden" name="form-name" value="kontakt" />

                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Max Muster"
                      className="fi"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="max@beispiel.ch"
                      className="fi"
                    />
                  </div>
                </div>

                {/* Company + Phone row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                      Unternehmen
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Muster GmbH"
                      className="fi"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+41 78 000 00 00"
                      className="fi"
                    />
                  </div>
                </div>

                {/* Service selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                    Gewünschte Leistung
                  </label>
                  <input type="hidden" name="service" value={selectedService} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {SERVICES.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedService(s === selectedService ? '' : s)}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '9.246px',
                          border: `1px solid ${selectedService === s ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
                          background: selectedService === s ? 'rgba(255,255,255,0.08)' : 'transparent',
                          color: selectedService === s ? '#fff' : 'rgb(112,112,112)',
                          fontSize: '14px',
                          fontWeight: 400,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          transition: 'all 0.2s',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                    Budget
                  </label>
                  <input type="hidden" name="budget" value={selectedBudget} />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {BUDGETS.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBudget(b === selectedBudget ? '' : b)}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '9.246px',
                          border: `1px solid ${selectedBudget === b ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
                          background: selectedBudget === b ? 'rgba(255,255,255,0.08)' : 'transparent',
                          color: selectedBudget === b ? '#fff' : 'rgb(112,112,112)',
                          fontSize: '14px',
                          fontWeight: 400,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          transition: 'all 0.2s',
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                    Nachricht *
                  </label>
                  <textarea
                    name="message"
                    required
                    placeholder="Erzähl uns von deinem Projekt..."
                    className="ft"
                    style={{ minHeight: '140px' }}
                  />
                </div>

                {/* Submit */}
                <div>
                  <motion.button
                    type="submit"
                    whileHover={{ opacity: 0.88 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: 'rgba(255,255,255,0.88)',
                      color: '#000',
                      border: 'none',
                      borderRadius: '7.705px',
                      padding: '14px 28px',
                      fontSize: '15.41px',
                      fontWeight: 400,
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                    }}
                  >
                    Anfrage senden
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>→</span>
                  </motion.button>
                </div>
              </form>
            )}
          </FadeSection>

          {/* ── Sidebar ── */}
          <div style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <FadeSection delay={0.2}>
              <div style={{
                background: 'rgb(16,16,16)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '15.41px',
                padding: '2rem',
              }}>
                <p style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
                  Direktkontakt
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <a href="mailto:info@slideagentur.ch" style={{ color: '#fff', textDecoration: 'none', fontSize: '15.41px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', minWidth: '16px' }}>@</span>
                    info@slideagentur.ch
                  </a>
                  <a href="tel:+41783262952" style={{ color: '#fff', textDecoration: 'none', fontSize: '15.41px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', minWidth: '16px' }}>↗</span>
                    +41 78 326 29 52
                  </a>
                  <p style={{ color: 'rgb(112,112,112)', fontSize: '15.41px', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', margin: 0 }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', minWidth: '16px', marginTop: '2px' }}>◎</span>
                    Ostermundigen, Bern<br />Schweiz
                  </p>
                </div>
              </div>
            </FadeSection>

            <FadeSection delay={0.26}>
              <div style={{
                background: 'rgb(16,16,16)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '15.41px',
                padding: '2rem',
              }}>
                <p style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
                  Reaktionszeit
                </p>
                <p style={{ fontSize: '15.41px', color: 'rgb(112,112,112)', lineHeight: 1.7, margin: 0 }}>
                  Wir antworten in der Regel innerhalb von{' '}
                  <span style={{ color: '#fff' }}>24 Stunden</span> auf Anfragen.
                </p>
              </div>
            </FadeSection>

            <FadeSection delay={0.32}>
              <div style={{
                background: 'rgb(16,16,16)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '15.41px',
                padding: '2rem',
              }}>
                <p style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.5rem' }}>
                  Social Media
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a href="https://www.instagram.com/slideagentur" target="_blank" rel="noopener noreferrer"
                    style={{ color: 'rgb(112,112,112)', textDecoration: 'none', fontSize: '15.41px', transition: 'color 0.2s' }}
                    className="footer-link">
                    Instagram →
                  </a>
                  <a href="https://www.tiktok.com/@slideagentur" target="_blank" rel="noopener noreferrer"
                    style={{ color: 'rgb(112,112,112)', textDecoration: 'none', fontSize: '15.41px', transition: 'color 0.2s' }}
                    className="footer-link">
                    TikTok →
                  </a>
                </div>
              </div>
            </FadeSection>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .kontakt-grid {
            grid-template-columns: 1fr !important;
          }
          .kontakt-grid > div:last-child {
            position: static !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}

