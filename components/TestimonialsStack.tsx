'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { useStackCardTransforms } from '@/lib/useStackTransforms'

interface Testimonial { quote: string; name: string; title: string }

/* Replaces the auto-scrolling marquee with a scroll-scrubbed card stack —
   each testimonial peels off the top as the visitor scrolls, tied directly
   to scroll position rather than a timer. */
export default function TestimonialsStack({ testimonials }: { testimonials: Testimonial[] }) {
  const n         = testimonials.length
  const outerRef  = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })

  return (
    <div ref={outerRef} style={{ position: 'relative', height: `${n * 85}vh` }}>
      <div style={{ position: 'sticky', top: '18vh', height: 'clamp(380px, 60vh, 620px)', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {testimonials.map((tm, i) => (
            <StackCard key={i} i={i} n={n} progress={scrollYProgress} {...tm} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StackCard({ i, n, progress, quote, name, title }: Testimonial & {
  i: number; n: number; progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const { y, rotate, scale, opacity, pointerEvents } = useStackCardTransforms(progress, i, n)

  return (
    <motion.div
      style={{
        y, rotate, scale, opacity, pointerEvents, zIndex: i,
        position: 'absolute', inset: 0,
        background: 'rgb(20,20,20)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        padding: 'clamp(2rem, 3.5vw, 3.5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)', color: '#fff', lineHeight: 1.6, margin: 0, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{quote}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
          {name[0]}
        </div>
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontSize: '14px', color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{name}</p>
          <p style={{ fontSize: '12px', color: 'rgb(178,178,178)', margin: 0 }}>{title}</p>
        </div>
      </div>
    </motion.div>
  )
}
