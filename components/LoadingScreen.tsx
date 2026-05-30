'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LoadingScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: [0, 1, 1, 0], y: [24, 0, 0, -12] }}
            transition={{ duration: 1.8, times: [0, 0.22, 0.72, 1], ease: 'easeInOut' }}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
