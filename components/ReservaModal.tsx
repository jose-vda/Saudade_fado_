'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useReservaModal } from '@/contexts/ReservaModalContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const ReservaClient = dynamic(() => import('@/app/reserva/ReservaClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <span className="font-label text-[10px] uppercase tracking-[0.4em] text-gold-luminous/60 animate-pulse">
        A carregar…
      </span>
    </div>
  ),
})

export default function ReservaModal() {
  const { isOpen, close } = useReservaModal()
  const { lang } = useLanguage()
  const tx = translations[lang].reserva

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-noir-deep/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={tx.title}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="relative h-full w-full overflow-y-auto"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-4 bg-noir-deep/90 backdrop-blur-md border-b border-gold/15">
              <Link
                href="/reserva"
                onClick={close}
                className="font-label text-[10px] uppercase tracking-[0.4em] text-gold-luminous/80 hover:text-gold-luminous transition-colors"
              >
                ↗ {lang === 'pt' ? 'Abrir página completa' : 'Open full page'}
              </Link>
              <button
                type="button"
                onClick={close}
                aria-label={lang === 'pt' ? 'Fechar' : 'Close'}
                className="group flex items-center gap-3 text-cream/70 hover:text-gold-luminous transition-colors"
              >
                <span className="font-label text-[10px] uppercase tracking-[0.4em]">
                  {lang === 'pt' ? 'Fechar' : 'Close'}
                </span>
                <span className="flex items-center justify-center w-8 h-8 border border-cream/20 group-hover:border-gold-luminous transition-colors">
                  ✕
                </span>
              </button>
            </div>

            <ReservaClient />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
