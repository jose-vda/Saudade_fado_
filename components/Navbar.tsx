'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const DARK_HERO_PAGES = new Set(['/', '/galeria', '/eventos'])

export default function Navbar() {
  const pathname = usePathname()
  const { lang, setLang } = useLanguage()
  const tx = translations[lang].nav

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const hasDarkHero = DARK_HERO_PAGES.has(pathname)
  const isOverDark = !scrolled && hasDarkHero

  const navLinks = [
    { href: '/', label: tx.home },
    { href: '/elenco', label: tx.cast },
    { href: '/galeria', label: tx.experience },
    { href: '/historia', label: tx.history },
    { href: '/eventos', label: tx.events },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
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

  const textColor = isOverDark
    ? 'text-white/60 hover:text-white'
    : 'text-on-surface/50 hover:text-on-surface'

  const dividerColor = isOverDark ? 'bg-white/20' : 'bg-on-surface/15'

  return (
    <>
      <nav
        aria-label={tx.mainNav}
        className={`fixed top-0 inset-x-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 md:py-5 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-700 ${
          scrolled
            ? 'glass shadow-soft-lg'
            : hasDarkHero
              ? 'bg-gradient-to-b from-black/55 via-black/20 to-transparent'
              : 'bg-white/60 backdrop-blur-xl border-b border-on-surface/5'
        }`}
      >
        <Link
          href="/"
          aria-label={tx.homeLabel}
          className="font-headline text-lg md:text-xl tracking-[0.18em] uppercase text-gold hover:opacity-75 transition-opacity duration-400"
        >
          Saudade e Fado
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`font-label text-[11px] uppercase tracking-[0.18em] transition-all duration-400 pb-0.5 border-b ${
                  isActive
                    ? 'text-gold border-gold'
                    : isOverDark
                      ? 'text-white/85 hover:text-white border-transparent hover:border-white/40'
                      : 'text-on-surface/65 hover:text-gold border-transparent hover:border-gold/40'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* PT / EN toggle */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setLang('pt')}
              aria-label="Português"
              className={`font-label text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                lang === 'pt'
                  ? 'text-gold'
                  : textColor
              }`}
            >
              PT
            </button>
            <span className={`text-[10px] ${dividerColor.replace('bg-', 'text-')} opacity-60`}>·</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-label="English"
              className={`font-label text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                lang === 'en'
                  ? 'text-gold'
                  : textColor
              }`}
            >
              EN
            </button>
          </div>

          <span className={`w-px h-4 ${dividerColor}`} />

          <Link
            href="/reserva"
            className={`inline-flex items-center px-7 py-3 font-label text-[10px] uppercase tracking-widest transition-all duration-500 border ${
              isOverDark
                ? 'border-gold/60 text-gold hover:bg-gold hover:text-charcoal-deep'
                : 'border-primary text-primary hover:bg-primary hover:text-white'
            }`}
          >
            {tx.book}
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? tx.closeMenu : tx.openMenu}
          className="md:hidden relative flex flex-col gap-1.5 p-2 -mr-2"
        >
          <span
            className={`block w-6 h-px transition-transform duration-400 ease-silk ${
              isOverDark ? 'bg-white' : 'bg-on-surface'
            } ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-px transition-opacity duration-300 ${
              isOverDark ? 'bg-white' : 'bg-on-surface'
            } ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`block w-6 h-px transition-transform duration-400 ease-silk ${
              isOverDark ? 'bg-white' : 'bg-on-surface'
            } ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

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
            className="fixed inset-0 z-40 bg-offwhite/98 backdrop-blur-md flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link
                  href={href}
                  className={`font-headline text-4xl transition-colors duration-300 hover:text-primary ${
                    pathname === href ? 'text-primary' : 'text-on-surface/80'
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            {/* Language toggle in mobile menu */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className="flex items-center gap-3"
            >
              <button
                type="button"
                onClick={() => setLang('pt')}
                className={`font-label text-sm uppercase tracking-widest transition-colors duration-300 ${
                  lang === 'pt' ? 'text-primary' : 'text-on-surface/40 hover:text-on-surface/70'
                }`}
              >
                PT
              </button>
              <span className="text-on-surface/20">·</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`font-label text-sm uppercase tracking-widest transition-colors duration-300 ${
                  lang === 'en' ? 'text-primary' : 'text-on-surface/40 hover:text-on-surface/70'
                }`}
              >
                EN
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.45 }}
              className="mt-2"
            >
              <Link
                href="/reserva"
                className="inline-block bg-primary text-white px-10 py-4 font-label text-xs uppercase tracking-widest hover:bg-gold hover:text-charcoal-deep transition-colors duration-500"
              >
                {tx.book}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
