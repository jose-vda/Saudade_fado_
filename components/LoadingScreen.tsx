'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'saudade-fado:loaded'
const DURATION_MS = 1600
const CINEMA_EASE = [0.83, 0, 0.17, 1] as const

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobileLike = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
    if (prefersReduced || isMobileLike) {
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
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-noir-deep overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: CINEMA_EASE }}
        >
          {/* Vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)',
            }}
          />

          {/* Letterbox bars (opening) */}
          <motion.div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 bg-black"
            initial={{ height: '50vh' }}
            animate={{ height: '8vh' }}
            transition={{ duration: 1.4, delay: 0.15, ease: CINEMA_EASE }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 bg-black"
            initial={{ height: '50vh' }}
            animate={{ height: '8vh' }}
            transition={{ duration: 1.4, delay: 0.15, ease: CINEMA_EASE }}
          />

          {/* Top hairline */}
          <motion.div
            aria-hidden="true"
            className="absolute top-[8vh] inset-x-0 h-px bg-gold/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: CINEMA_EASE }}
          />
          {/* Bottom hairline */}
          <motion.div
            aria-hidden="true"
            className="absolute bottom-[8vh] inset-x-0 h-px bg-gold/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: CINEMA_EASE }}
          />

          {/* PRESENTING line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: [0, 1, 1, 0], y: 0 }}
            transition={{ duration: 1.6, times: [0, 0.2, 0.75, 1], delay: 0.7 }}
            className="absolute top-[28vh] flex items-center gap-4"
          >
            <span className="h-px w-10 bg-gold/60" />
            <span className="font-label text-[10px] uppercase tracking-[0.55em] text-gold-luminous">
              Apresenta
            </span>
            <span className="h-px w-10 bg-gold/60" />
          </motion.div>

          {/* Main title — split letter reveal */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="overflow-hidden pb-4"
            >
              <motion.h1
                className="font-headline text-4xl leading-none tracking-[0.06em] text-cream sm:text-6xl sm:tracking-[0.14em] lg:text-[6.5rem]"
                initial={{ y: 60, filter: 'blur(10px)' }}
                animate={{ y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 1.05, ease: CINEMA_EASE }}
              >
                Saudade <span className="italic font-light text-gold-luminous">e</span> Fado
              </motion.h1>
            </motion.div>

            <motion.span
              aria-hidden="true"
              className="mt-5 block h-px w-32 bg-gradient-to-r from-transparent via-gold-luminous to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 1.4, ease: CINEMA_EASE }}
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5 }}
              className="mt-6 font-label text-[9px] uppercase tracking-[0.55em] text-cream-mute"
            >
              Uma experiência em Alfama · MMXXV
            </motion.p>
          </div>

          {/* Progress strip */}
          <div className="absolute bottom-[11vh] left-1/2 h-px w-44 -translate-x-1/2 overflow-hidden bg-cream/10">
            <motion.div
              className="h-full origin-left bg-gold-luminous"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: (DURATION_MS - 400) / 1000, ease: 'linear', delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
