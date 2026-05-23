'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'
import AmbientAudioToggle from '@/components/AmbientAudioToggle'
import ReservaButton from '@/components/ReservaButton'

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

export default function Navbar() {
  const pathname = usePathname()
  const { lang, setLang } = useLanguage()
  const tx = translations[lang].nav

  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastYRef = useRef(0)

  const navLinks = [
    { href: '/', label: tx.home },
    { href: '/elenco', label: tx.cast },
    { href: '/galeria', label: tx.experience },
    { href: '/historia', label: tx.history },
    { href: '/eventos', label: tx.events },
  ]

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      // Auto-hide on scroll down past threshold
      if (y > 240 && y > lastYRef.current + 6) {
        setHidden(true)
      } else if (y < lastYRef.current - 4 || y < 240) {
        setHidden(false)
      }
      lastYRef.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])

  return (
    <>
      <motion.nav
        aria-label={tx.mainNav}
        initial={false}
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
        className={`fixed top-0 inset-x-0 z-50 flex justify-between items-center px-6 md:px-10 py-4 md:py-5 transition-[background-color,backdrop-filter,border-color] duration-600 ${
          scrolled
            ? 'glass'
            : 'bg-gradient-to-b from-black/45 via-black/15 to-transparent'
        }`}
      >
        <Link
          href="/"
          aria-label={tx.homeLabel}
          className="min-w-0 font-headline text-base tracking-[0.16em] uppercase text-gold-luminous hover:text-cream transition-colors duration-500 sm:text-lg sm:tracking-[0.22em] md:text-xl"
        >
          Saudade <span className="italic font-light opacity-80">e</span> Fado
        </Link>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map(({ href, label }, idx) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative font-label text-[11px] uppercase tracking-[0.22em] transition-colors duration-400 ${
                  isActive
                    ? 'text-gold-luminous'
                    : 'text-cream/65 hover:text-cream'
                }`}
              >
                <span className="mr-2 font-headline italic text-[9px] tracking-normal opacity-50">
                  {ROMAN[idx]}
                </span>
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold-luminous transition-transform duration-500 ease-cinema ${
                    isActive ? 'w-full scale-x-100' : 'w-full origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <AmbientAudioToggle variant="dark" />

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setLang('pt')}
              aria-label="Português"
              className={`font-label text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                lang === 'pt' ? 'text-gold-luminous' : 'text-cream/45 hover:text-cream'
              }`}
            >
              PT
            </button>
            <span className="text-[10px] text-cream/25">·</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-label="English"
              className={`font-label text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                lang === 'en' ? 'text-gold-luminous' : 'text-cream/45 hover:text-cream'
              }`}
            >
              EN
            </button>
          </div>

          <span className="w-px h-4 bg-cream/15" />

          <ReservaButton className="btn-cinema !py-2.5 !px-6 !text-[10px] !tracking-[0.28em]">
            {tx.book}
          </ReservaButton>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? tx.closeMenu : tx.openMenu}
          className="fixed right-4 top-4 z-[60] flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 border border-gold-luminous bg-noir-deep p-2 md:hidden"
        >
          <span
            className={`block h-px w-6 bg-gold-luminous transition-transform duration-400 ease-cinema ${
              menuOpen ? 'translate-y-[6px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-6 bg-gold-luminous transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-px w-6 bg-gold-luminous transition-transform duration-400 ease-cinema ${
              menuOpen ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-y-auto bg-noir-deep/98 px-6 pb-10 pt-28 backdrop-blur-md md:hidden"
          >
            {/* Background lyric */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <p className="font-headline italic text-7xl text-cream/[0.04] leading-none whitespace-nowrap rotate-[-8deg]">
                Saudade
              </p>
            </motion.div>

            <div className="relative flex flex-col items-center gap-6">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                  className="flex items-baseline gap-3"
                >
                  <span className="font-headline italic text-xs text-gold/60 tracking-widest">
                    {ROMAN[i]}
                  </span>
                  <Link
                    href={href}
                    className={`font-headline italic text-3xl transition-colors duration-300 sm:text-4xl ${
                      pathname === href ? 'text-gold-luminous' : 'text-cream/85 hover:text-gold-luminous'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5 }}
                className="mt-6 flex items-center gap-4"
              >
                <AmbientAudioToggle variant="dark" />
                <span className="w-px h-4 bg-cream/15" />
                <button
                  type="button"
                  onClick={() => setLang('pt')}
                  className={`font-label text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
                    lang === 'pt' ? 'text-gold-luminous' : 'text-cream/45'
                  }`}
                >
                  PT
                </button>
                <span className="text-cream/20">·</span>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`font-label text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
                    lang === 'en' ? 'text-gold-luminous' : 'text-cream/45'
                  }`}
                >
                  EN
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6"
              >
                <ReservaButton
                  className="btn-cinema"
                  onBeforeOpen={() => setMenuOpen(false)}
                >
                  {tx.book}
                </ReservaButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
