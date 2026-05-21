'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'saudade-fado:loaded'
const DURATION_MS = 2200

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Já exibido nesta sessão? → não mostra de novo
    if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return

    // Respeita reduced-motion
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
      return
    }

    setVisible(true)
    document.documentElement.style.overflow = 'hidden'

    const timer = window.setTimeout(() => {
      setVisible(false)
      window.sessionStorage.setItem(STORAGE_KEY, '1')
      document.documentElement.style.overflow = ''
    }, DURATION_MS)

    return () => {
      window.clearTimeout(timer)
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="A carregar"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-charcoal-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-2%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="absolute top-0 left-0 h-px bg-gold"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="flex flex-col items-center gap-3 overflow-hidden px-6 text-center">
            <motion.span
              className="font-label text-[10px] tracking-[0.55em] text-gold uppercase"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
            >
              Lisboa · Alfama
            </motion.span>

            <motion.h1
              className="font-headline text-[clamp(1.8rem,6.5vw,5.5rem)] tracking-[0.06em] sm:tracking-[0.12em] text-white leading-none"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              Saudade <span className="italic text-gold/90">e</span> Fado
            </motion.h1>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 h-px bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DURATION_MS / 1000 - 0.3, ease: 'linear', delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <motion.div
            className="absolute bottom-0 right-0 h-px bg-gold"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
