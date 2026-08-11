'use client'

import { useState } from 'react'
import { motion, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion'

/* Counts a number up as the page scrolls through a slice of a section's
   progress — no timer, no re-trigger, purely a function of scroll position. */
export default function ScrollCountUp({
  progress,
  range,
  from = 0,
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  progress: MotionValue<number>
  range: [number, number]
  from?: number
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
}) {
  const value = useTransform(progress, range, [from, to])
  const [display, setDisplay] = useState(() => from.toFixed(decimals))

  useMotionValueEvent(value, 'change', v => {
    setDisplay(v.toFixed(decimals))
  })

  return (
    <motion.p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1.5rem', fontWeight: 400, color: '#fff', margin: '0 0 0.2rem', lineHeight: 1 }}>
      {prefix}{display}{suffix}
    </motion.p>
  )
}
