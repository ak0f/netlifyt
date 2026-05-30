'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    const dot  = dotRef.current!
    const ring = ringRef.current!

    document.body.style.cursor = 'none'

    let mx = -200, my = -200   // raw mouse — dot tracks this instantly
    let rx = -200, ry = -200   // ring interpolates toward this
    let hovering = false
    let rafId: number

    /* ring trails at ~14% per frame ≈ smooth but clearly responsive */
    const LERP = 0.14

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.opacity = hovering ? '0' : '1'
      ring.style.opacity = hovering ? '0.85' : '0.45'
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const next = !!el.closest('a, button, [role="button"], input, textarea, select, label')
      if (next === hovering) return
      hovering = next
      dot.style.opacity       = hovering ? '0' : '1'
      ring.style.opacity      = hovering ? '0.85' : '0.45'
      ring.style.width        = hovering ? '40px' : '24px'
      ring.style.height       = hovering ? '40px' : '24px'
      ring.style.borderColor  = hovering ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.5)'
    }

    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
    const onEnter = () => {
      dot.style.opacity  = hovering ? '0' : '1'
      ring.style.opacity = hovering ? '0.85' : '0.45'
    }

    const tick = () => {
      /* dot: direct — zero lag */
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`

      /* ring: lerp — intentional trailing */
      rx += (mx - rx) * LERP
      ry += (my - ry) * LERP
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.style.cursor = ''
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      {/* dot — zero lag, instant tracking */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 5, height: 5,
          borderRadius: '50%',
          background: '#fff',
          pointerEvents: 'none',
          zIndex: 999999,
          opacity: 0,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* ring — lerp trail */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 24, height: 24,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.5)',
          pointerEvents: 'none',
          zIndex: 999998,
          opacity: 0,
          willChange: 'transform',
          transition: 'width 0.18s ease, height 0.18s ease, border-color 0.18s ease, opacity 0.12s ease',
        }}
      />
    </>
  )
}
