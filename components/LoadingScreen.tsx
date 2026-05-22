'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'saudade-fado:loaded'
const DURATION_MS = 1400
const ELEGANT_EASE = [0.76, 0, 0.24, 1] as const

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
          initial={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.95, ease: ELEGANT_EASE }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(193,154,107,0.16)_0%,rgba(13,13,13,0)_34%,rgba(13,13,13,0)_66%,rgba(193,154,107,0.08)_100%)]"
            initial={{ opacity: 0, scale: 1.14 }}
            animate={{ opacity: [0, 1, 0.72], scale: 1 }}
            transition={{ duration: 1.1, ease: ELEGANT_EASE }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute inset-x-5 inset-y-7 border-x border-gold/[0.15] sm:inset-x-10 sm:inset-y-10"
            initial={{ opacity: 0, scaleY: 0.78 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.9, delay: 0.08, ease: ELEGANT_EASE }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: ELEGANT_EASE }}
            style={{ transformOrigin: 'center' }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
            initial={{ opacity: 0, scaleX: 0.2 }}
            animate={{ opacity: [0, 1, 0], scaleX: 1 }}
            transition={{ duration: 1.05, delay: 0.18, ease: ELEGANT_EASE }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.span
              className="mb-5 flex items-center gap-4 overflow-hidden font-label text-[10px] uppercase tracking-[0.5em] text-gold"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.16, ease: ELEGANT_EASE }}
            >
              <motion.span
                aria-hidden="true"
                className="h-px w-8 bg-gold/[0.55]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.62, delay: 0.24, ease: ELEGANT_EASE }}
              />
              Lisboa · Alfama
              <motion.span
                aria-hidden="true"
                className="h-px w-8 bg-gold/[0.55]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.62, delay: 0.24, ease: ELEGANT_EASE }}
              />
            </motion.span>

            <div className="overflow-hidden pb-3">
              <motion.h1
                className="font-headline text-[2.65rem] leading-none tracking-[0.06em] text-white sm:text-6xl sm:tracking-[0.1em] lg:text-[5.5rem]"
                initial={{ opacity: 0, y: 34, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.82, delay: 0.2, ease: ELEGANT_EASE }}
              >
                Saudade <span className="italic text-gold/90">e</span> Fado
              </motion.h1>
            </div>

            <motion.span
              aria-hidden="true"
              className="block h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ opacity: 0, scaleX: 0.2 }}
              animate={{ opacity: [0, 1, 0.65], scaleX: 1 }}
              transition={{ duration: 0.88, delay: 0.42, ease: ELEGANT_EASE }}
            />
          </div>

          <div className="absolute bottom-10 left-1/2 h-px w-36 -translate-x-1/2 overflow-hidden bg-white/10 sm:bottom-12 sm:w-44">
            <motion.div
              className="h-full origin-left bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DURATION_MS / 1000 - 0.18, ease: 'linear', delay: 0.12 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: ELEGANT_EASE }}
            style={{ transformOrigin: 'center' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
