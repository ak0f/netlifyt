'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { dissolveVertexShader, dissolveFragmentShader } from './shaders/dissolveShader'

// Opening sequence: logo holds on a solid black plane, then a WebGL shader
// dissolves that plane away (pixelated Perlin-noise field collapsing outward
// from center) with a pulsing blue glow tracing the dissolve boundary,
// revealing the hero underneath. Canvas removed from the DOM once finished.
export default function LoadingScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [logoVisible, setLogoVisible] = useState(true)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const uniforms = {
      uTransition: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0 },
      uBorderColor: { value: new THREE.Color('#3b5bff') },
    }

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader: dissolveVertexShader,
      fragmentShader: dissolveFragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      uniforms.uResolution.value.set(w, h)
    }
    window.addEventListener('resize', handleResize)

    const clock = new THREE.Clock()
    let rafId: number
    const tick = () => {
      uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(tick)
    }
    tick()

    const startDelay = reduceMotion ? 50 : 1100
    const dissolveDuration = reduceMotion ? 0.01 : 1.6

    const startTimer = setTimeout(() => {
      setLogoVisible(false)
      gsap.to(uniforms.uTransition, {
        value: 1,
        duration: dissolveDuration,
        ease: 'power2.inOut',
        onComplete: () => setDone(true),
      })
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (done) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <AnimatePresence>
        {logoVisible && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/img/logo.png"
              alt="SLIDE"
              width={560}
              height={176}
              priority
              style={{ height: '152px', width: 'auto' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
