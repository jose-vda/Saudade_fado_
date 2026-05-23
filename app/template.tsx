'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const CHAPTER_MAP: Record<string, { numeral: string; title: string }> = {
  '/': { numeral: 'I', title: 'Prelúdio' },
  '/elenco': { numeral: 'II', title: 'Dramatis Personae' },
  '/galeria': { numeral: 'III', title: 'A Reel' },
  '/historia': { numeral: 'IV', title: 'Origens' },
  '/eventos': { numeral: 'V', title: 'Private Screenings' },
  '/reserva': { numeral: 'VI', title: 'A Reserva' },
}

const CINEMA_EASE = [0.83, 0, 0.17, 1] as const

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const chapter = CHAPTER_MAP[pathname] || { numeral: '', title: '' }
  const firstMountRef = useRef(true)
  const [showCurtain, setShowCurtain] = useState(false)

  useEffect(() => {
    if (firstMountRef.current) {
      firstMountRef.current = false
      return
    }
    setShowCurtain(true)
    const t = window.setTimeout(() => setShowCurtain(false), 1100)
    return () => window.clearTimeout(t)
  }, [pathname])

  return (
    <>
      <AnimatePresence>
        {showCurtain && (
          <motion.div
            key={pathname}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, ease: CINEMA_EASE }}
            className="fixed inset-0 z-[9998] bg-noir-deep pointer-events-none flex items-center justify-center"
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center gap-4 px-6 text-center"
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-gold/60" />
                <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous">
                  Capítulo {chapter.numeral}
                </span>
                <span className="h-px w-12 bg-gold/60" />
              </div>
              <h2 className="font-headline italic text-3xl text-cream sm:text-5xl">
                {chapter.title}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </>
  )
}
