'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const COVER_MS = 340
const REVEAL_MS = 480

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFirstRender = useRef(true)
  const [visible, setVisible] = useState(true)
  const [curtain, setCurtain] = useState<'idle' | 'covering' | 'revealing'>('idle')

  // Route change plays a black curtain wipe (enters from bottom, covers,
  // exits top) while the new content fades in beneath it. Content visibility
  // is driven by plain state + CSS transition, not framer-motion's
  // AnimatePresence — AnimatePresence's enter animation can silently never
  // fire when the animated child streams in via React Suspense, as every App
  // Router route does, which left the page stuck at opacity 0 until reload.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setVisible(false)
    setCurtain('covering')

    const revealTimer = setTimeout(() => {
      setCurtain('revealing')
      const raf1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
      return () => cancelAnimationFrame(raf1)
    }, COVER_MS)

    const idleTimer = setTimeout(() => setCurtain('idle'), COVER_MS + REVEAL_MS)

    return () => {
      clearTimeout(revealTimer)
      clearTimeout(idleTimer)
    }
  }, [pathname])

  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9997,
          background: '#000',
          pointerEvents: 'none',
          transform: `translateY(${curtain === 'covering' ? '0%' : curtain === 'revealing' ? '-100%' : '100%'})`,
          transition:
            curtain === 'revealing'
              ? `transform ${REVEAL_MS}ms cubic-bezier(0.76,0,0.24,1)`
              : curtain === 'covering'
              ? `transform ${COVER_MS}ms cubic-bezier(0.65,0,0.35,1)`
              : 'none',
        }}
      />
      <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}>
        {children}
      </div>
    </>
  )
}
