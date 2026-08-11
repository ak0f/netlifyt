'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

/* Draggable before/after comparison — lets visitors prove the redesign
   to themselves instead of just reading a claim next to a screenshot. */
export default function BeforeAfterSlider({
  before, after, alt, beforeLabel, afterLabel,
}: {
  before: string; after: string; alt: string; beforeLabel: string; afterLabel: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(50)
  const [touched, setTouched] = useState(false)
  const dragging = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const p = ((clientX - rect.left) / rect.width) * 100
    setPct(Math.min(100, Math.max(0, p)))
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => { if (dragging.current) setFromClientX(e.clientX) }
    const onUp   = () => { dragging.current = false }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [setFromClientX])

  return (
    <div
      ref={wrapRef}
      onPointerDown={e => { dragging.current = true; setTouched(true); setFromClientX(e.clientX) }}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', cursor: 'ew-resize', userSelect: 'none', touchAction: 'none' }}
    >
      {/* after — base layer */}
      <Image src={after} alt={alt} fill style={{ objectFit: 'cover' }} unoptimized draggable={false} />

      {/* before — clipped overlay */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
        <Image src={before} alt={alt} fill style={{ objectFit: 'cover' }} unoptimized draggable={false} />
      </div>

      {/* labels */}
      <span style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.45)', padding: '5px 10px', borderRadius: '999px', pointerEvents: 'none' }}>{beforeLabel}</span>
      <span style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.45)', padding: '5px 10px', borderRadius: '999px', pointerEvents: 'none' }}>{afterLabel}</span>

      {/* divider + handle */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pct}%`, width: '2px', background: 'rgba(255,255,255,0.85)', pointerEvents: 'none' }} />
      <motion.div
        animate={touched ? { x: 0 } : { x: [0, -14, 0, 14, 0] }}
        transition={touched ? { duration: 0.2 } : { duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%,-50%)',
          width: '38px', height: '38px', borderRadius: '50%',
          background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 18px rgba(0,0,0,0.5)', pointerEvents: 'none',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
        </svg>
      </motion.div>
    </div>
  )
}
