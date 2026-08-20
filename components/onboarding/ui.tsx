'use client'

import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

/* Gemeinsame Bausteine des Konfigurators (/onboarding).

   Alles hier hält sich an DESIGN.md: keine Akzentfarbe, Hierarchie nur über
   Weiss-Opazität, Gewicht 400 ausser beim einen Haupt-CTA pro Ansicht,
   Signature-Ease für jede Transition. "Ausgewählt" wird deshalb über hellere
   Fläche, hellere Kante und ein Häkchen gezeigt, nicht über Farbe. */

export const EASE = [0.25, 0.46, 0.45, 0.94] as const

export const DISPLAY_FONT = 'var(--font-dm-sans), DM Sans, sans-serif'

export const eyebrowStyle: CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'rgba(255,255,255,0.55)',
}

export const stepHeadingStyle: CSSProperties = {
  fontFamily: DISPLAY_FONT,
  fontSize: 'clamp(23px, 2.6vw, 30px)',
  fontWeight: 400,
  lineHeight: 1.2,
  letterSpacing: '-0.01em',
  color: '#fff',
  margin: 0,
}

export const subTextStyle: CSSProperties = {
  fontSize: '14.5px',
  lineHeight: 1.6,
  color: 'rgb(178,178,178)',
  margin: '0.65rem 0 0',
}

export const hintStyle: CSSProperties = {
  fontSize: '11.5px',
  color: 'rgba(255,255,255,0.4)',
  margin: 0,
}

/** Auswahlfläche: Paket, Integration, Zeitrahmen, Branche. */
export function optionStyle(active: boolean, radius = 14): CSSProperties {
  return {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    background: active ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.035)',
    border: `1px solid ${active ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.09)'}`,
    borderRadius: `${radius}px`,
    color: '#fff',
    font: 'inherit',
    cursor: 'pointer',
    transition: `background 0.2s var(--ease), border-color 0.2s var(--ease)`,
  }
}

/** Kleine Kapsel für Badges wie "Empfohlen" oder "Meistgewählt". */
export function Pill({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      style={{
        flex: 'none',
        borderRadius: '9.246px',
        border: `1px solid rgba(255,255,255,${strong ? 0.28 : 0.16})`,
        background: `rgba(255,255,255,${strong ? 0.1 : 0.05})`,
        padding: '3px 8px',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        color: `rgba(255,255,255,${strong ? 0.92 : 0.62})`,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

/** Häkchen-Kästchen für Mehrfachauswahl. */
export function CheckBox({ checked }: { checked: boolean }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none',
        width: '17px',
        height: '17px',
        borderRadius: '5px',
        border: `1px solid rgba(255,255,255,${checked ? 0.9 : 0.22})`,
        background: checked ? '#fff' : 'transparent',
        transition: `background 0.18s var(--ease), border-color 0.18s var(--ease)`,
      }}
    >
      {checked && (
        <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" width="10" height="10">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
    </span>
  )
}

/** Aufzählungszeichen in Feature-Listen. */
export function Tick() {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
      strokeLinecap="round" strokeLinejoin="round" width="13" height="13"
      style={{ flex: 'none', marginTop: '4px', color: 'rgba(255,255,255,0.5)' }}
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16"
      style={{ marginLeft: '8px' }} aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/** Umschalter Standard/Custom und Monatlich/Jährlich. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  label: string
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      style={{
        display: 'inline-flex',
        gap: '4px',
        padding: '4px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '11px',
        maxWidth: '100%',
        flexWrap: 'wrap',
      }}
    >
      {options.map(o => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            style={{
              border: 'none',
              borderRadius: '8px',
              padding: '7px 14px',
              fontFamily: 'inherit',
              fontSize: '13.5px',
              cursor: 'pointer',
              background: active ? 'rgba(255,255,255,0.14)' : 'transparent',
              color: active ? '#fff' : 'rgba(255,255,255,0.5)',
              transition: `background 0.2s var(--ease), color 0.2s var(--ease)`,
            }}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/** Ein Schritt blendet ein, der vorige aus. Kein hartes Umschalten. */
export function StepShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14, transition: { duration: 0.18 } }}
      transition={{ duration: 0.38, ease: EASE }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}
    >
      {children}
    </motion.div>
  )
}

export function NavRow({
  onBack,
  backLabel,
  onNext,
  nextLabel,
  nextDisabled,
}: {
  onBack?: () => void
  backLabel: string
  onNext?: () => void
  nextLabel?: string
  nextDisabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginTop: '0.4rem' }}>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontFamily: 'inherit', fontSize: '14px', cursor: 'pointer', padding: 0 }}
        >
          ← {backLabel}
        </button>
      ) : (
        <span />
      )}
      {onNext && nextLabel && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="btn-cta"
          style={{ opacity: nextDisabled ? 0.35 : 1, cursor: nextDisabled ? 'default' : 'pointer' }}
        >
          {nextLabel}
          <ArrowRight />
        </button>
      )}
    </div>
  )
}

/** Ersetzt {n}/{pct} in einem i18n-Text. */
export function fill(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template
  )
}
