'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFirstRender = useRef(true)
  const [visible, setVisible] = useState(true)

  // Fades the new route in on every pathname change. Driven by plain state
  // + CSS transition (not framer-motion's AnimatePresence) because
  // AnimatePresence's enter animation can silently never fire when the
  // animated child streams in via React Suspense, as every App Router route
  // does — that left the page permanently at opacity 0 until a hard reload.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setVisible(false)
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => cancelAnimationFrame(raf1)
  }, [pathname])

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}>
      {children}
    </div>
  )
}
