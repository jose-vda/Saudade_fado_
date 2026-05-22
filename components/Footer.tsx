'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  const { lang } = useLanguage()
  const tx = translations[lang].footer

  const footerLinks = [
    { href: '/elenco', label: tx.cast },
    { href: '/galeria', label: tx.experience },
    { href: '/historia', label: tx.history },
    { href: '/eventos', label: tx.events },
    { href: '/reserva', label: tx.reservations },
  ]

  return (
    <footer
      className="relative w-full border-t border-on-surface/10 bg-surface px-6 md:px-12 py-16 md:py-20"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {tx.footerHeading}
      </h2>

      <div className="max-w-editorial mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-12">
        <div className="space-y-5 max-w-sm">
          <Link
            href="/"
            className="font-headline text-xl tracking-[0.18em] uppercase text-gold"
          >
            Saudade e Fado
          </Link>
          <p className="font-body text-sm text-on-surface/55 leading-relaxed font-light">
            {tx.tagline}
          </p>
        </div>

        <nav aria-label={tx.footerNav} className="flex flex-wrap md:justify-center gap-x-8 gap-y-4">
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/55 hover:text-gold transition-colors duration-400"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="font-label text-[10px] uppercase tracking-[0.18em] text-on-surface/40 md:text-right leading-relaxed">
          © {CURRENT_YEAR} Saudade e Fado.
          <br />
          {tx.rights}
        </div>
      </div>

      <div className="max-w-editorial mx-auto mt-12 pt-8 border-t border-on-surface/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-label text-[9px] uppercase tracking-[0.3em] text-on-surface/35">
          Alfama · Lisboa · Portugal
        </span>
        <span className="font-label text-[9px] uppercase tracking-[0.3em] text-on-surface/35">
          {tx.madeWith}
        </span>
      </div>
    </footer>
  )
}
