'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/elenco', label: 'O Elenco' },
  { href: '/galeria', label: 'A Experiência' },
  { href: '/historia', label: 'História' },
  { href: '/eventos', label: 'Eventos' },
] as const

const DARK_HERO_PAGES = new Set(['/', '/galeria', '/historia', '/eventos'])

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const hasDarkHero = DARK_HERO_PAGES.has(pathname)
  const isOverDark = !scrolled && hasDarkHero

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll & trap ESC when mobile menu open
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
      <nav
        aria-label="Navegação principal"
        className={`fixed top-0 inset-x-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 md:py-5 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-700 ${
          scrolled
            ? 'glass-dark shadow-soft-lg'
            : hasDarkHero
              ? 'bg-gradient-to-b from-black/55 via-black/20 to-transparent'
              : 'bg-white/60 backdrop-blur-xl border-b border-on-surface/5'
        }`}
      >
        <Link
          href="/"
          aria-label="Saudade e Fado — Início"
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
                    : isOverDark || scrolled
                      ? 'text-white/85 hover:text-white border-transparent hover:border-white/40'
                      : 'text-on-surface/65 hover:text-gold border-transparent hover:border-gold/40'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        <Link
          href="/reserva"
          className={`hidden md:inline-flex items-center px-7 py-3 font-label text-[10px] uppercase tracking-widest transition-all duration-500 border ${
            isOverDark || scrolled
              ? 'border-gold/60 text-gold hover:bg-gold hover:text-charcoal-deep'
              : 'border-primary text-primary hover:bg-primary hover:text-white'
          }`}
        >
          Reservar
        </Link>

        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="md:hidden relative flex flex-col gap-1.5 p-2 -mr-2"
        >
          <span
            className={`block w-6 h-px transition-transform duration-400 ease-silk ${
              isOverDark || scrolled ? 'bg-white' : 'bg-on-surface'
            } ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-px transition-opacity duration-300 ${
              isOverDark || scrolled ? 'bg-white' : 'bg-on-surface'
            } ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
          />
          <span
            className={`block w-6 h-px transition-transform duration-400 ease-silk ${
              isOverDark || scrolled ? 'bg-white' : 'bg-on-surface'
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
            className="fixed inset-0 z-40 bg-charcoal-deep/98 backdrop-blur-md flex flex-col items-center justify-center gap-10 md:hidden"
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
                  className={`font-headline text-4xl transition-colors duration-300 hover:text-gold ${
                    pathname === href ? 'text-gold' : 'text-white/85'
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.45 }}
              className="mt-4"
            >
              <Link
                href="/reserva"
                className="inline-block bg-gold text-charcoal-deep px-10 py-4 font-label text-xs uppercase tracking-widest hover:bg-white transition-colors duration-500"
              >
                Reservar
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
