'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion'
import { useIsMobile } from '@/lib/useIsMobile'

interface Step { num: string; title: string; desc: string }

/* A draggable/scrubbable route line — visitors control which process
   step is in focus instead of just reading a static grid top to bottom. */
export default function ProcessTimeline({ steps, dragHint }: { steps: Step[]; dragHint: string }) {
  const trackRef            = useRef<HTMLDivElement>(null)
  const isMobile             = useIsMobile()
  const [active, setActive]  = useState(0)
  const x                    = useMotionValue(0)
  const n                    = steps.length

  useEffect(() => {
    let prev = trackRef.current?.offsetWidth ?? 0
    const measure = () => {
      const next = trackRef.current?.offsetWidth ?? 0
      if (prev > 0 && next > 0 && next !== prev) x.set((x.get() / prev) * next)
      prev = next
    }
    measure()
    window.addEventListener('resize', measure, { passive: true })
    return () => window.removeEventListener('resize', measure)
  }, [x])

  const progress  = useTransform(x, v => {
    const w = trackRef.current?.offsetWidth ?? 0
    return w ? Math.min(1, Math.max(0, v / w)) : 0
  })
  const fillWidth = useTransform(progress, p => `${p * 100}%`)

  useMotionValueEvent(progress, 'change', p => {
    setActive(Math.min(n - 1, Math.max(0, Math.round(p * (n - 1)))))
  })

  function jumpTo(i: number) {
    const w = trackRef.current?.offsetWidth ?? 0
    if (!w) return
    animate(x, (i / (n - 1)) * w, { type: 'spring', stiffness: 260, damping: 30 })
  }

  return (
    <div>
      {/* scrub line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)' }}>{dragHint}</span>
      </div>
      <div ref={trackRef} style={{ position: 'relative', height: '2px', background: 'rgba(255,255,255,0.1)', margin: '0 10px 3rem', borderRadius: '2px' }}>
        <motion.div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: fillWidth, background: 'rgba(255,255,255,0.55)', borderRadius: '2px' }} />

        {steps.map((s, i) => (
          <button
            key={s.num}
            type="button"
            onClick={() => jumpTo(i)}
            aria-label={s.title}
            style={{
              position: 'absolute', top: '50%', left: `${(i / (n - 1)) * 100}%`,
              transform: 'translate(-50%,-50%)',
              width: '9px', height: '9px', borderRadius: '50%',
              background: i <= active ? '#fff' : 'rgba(255,255,255,0.25)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'background 0.25s',
            }}
          />
        ))}

        <motion.div
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          style={{
            x, position: 'absolute', top: '50%', left: 0,
            width: '20px', height: '20px', marginLeft: '-10px', marginTop: '-10px',
            borderRadius: '50%', background: '#fff',
            boxShadow: '0 2px 14px rgba(0,0,0,0.55)', cursor: 'grab', touchAction: 'none',
          }}
          whileDrag={{ scale: 1.15 }}
          whileTap={{ scale: 1.1 }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${n}, 1fr)`, gap: isMobile ? '1rem' : '2px' }}>
        {steps.map((step, idx) => {
          const isFirst  = idx === 0
          const isLast   = idx === n - 1
          const isActive = idx === active
          const radius   = isMobile ? '15.41px' : isFirst ? '15.41px 4px 4px 15.41px' : isLast ? '4px 15.41px 15.41px 4px' : '4px'
          return (
            <motion.div
              key={step.num}
              onClick={() => jumpTo(idx)}
              animate={{ opacity: isActive || isMobile ? 1 : 0.4, scale: isActive || isMobile ? 1 : 0.97 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ background: 'rgb(10,10,10)', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2.5rem)', borderRadius: radius, height: '100%', cursor: isMobile ? 'default' : 'pointer' }}
            >
              <span style={{ display: 'block', fontFamily: 'var(--font-dm-sans)', fontSize: '13px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', marginBottom: '2.5rem' }}>
                {step.num}
              </span>
              <h3 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontSize: 'clamp(32px, 3vw, 44px)', fontWeight: 400, color: '#fff', margin: '0 0 1.25rem', lineHeight: 1.1 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '15.41px', color: 'rgb(178,178,178)', lineHeight: 1.65, margin: 0 }}>
                {step.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
