'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  const { lang } = useLanguage()
  const tx = translations[lang].footer

  const productionLinks = [
    { href: '/elenco', label: tx.cast },
    { href: '/galeria', label: tx.experience },
    { href: '/historia', label: tx.history },
    { href: '/eventos', label: tx.events },
    { href: '/reserva', label: tx.reservations },
  ]

  return (
    <footer
      className="relative w-full overflow-hidden border-t border-gold/15 bg-noir-deep px-6 md:px-12 pt-20 pb-10 md:pt-28 md:pb-12"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {tx.footerHeading}
      </h2>

      {/* Top hairline + label */}
      <div className="max-w-editorial mx-auto mb-14 md:mb-20 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-gold/40" />
          <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous">
            End Credits
          </span>
          <span className="h-px w-12 bg-gold/40" />
        </div>
        <Link
          href="/"
          className="font-headline italic text-4xl md:text-6xl tracking-tight text-cream hover:text-gold-luminous transition-colors duration-500"
        >
          Saudade <span className="not-italic font-normal text-gold-luminous">e</span> Fado
        </Link>
        <p className="max-w-md text-center font-body text-sm font-light leading-relaxed text-cream-mute">
          {tx.tagline}
        </p>
      </div>

      {/* Three-column credits */}
      <div className="max-w-editorial mx-auto grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16 mb-16 md:mb-20">
        <div className="flex flex-col gap-4">
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-gold/70 pb-3 border-b border-cream/10">
            Production
          </span>
          <nav aria-label={tx.footerNav} className="flex flex-col gap-3">
            {productionLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-headline italic text-base text-cream/80 hover:text-gold-luminous transition-colors duration-400 w-fit link-cinema"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-gold/70 pb-3 border-b border-cream/10">
            Location
          </span>
          <div className="flex flex-col gap-2 font-body text-sm font-light text-cream/75 leading-relaxed">
            <span>Largo do Chafariz de Dentro</span>
            <span>Alfama · Lisboa · Portugal</span>
            <a
              href="mailto:reservas@saudadeefado.pt"
              className="mt-2 link-cinema text-gold-luminous/90 hover:text-gold-luminous"
            >
              reservas@saudadeefado.pt
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-gold/70 pb-3 border-b border-cream/10">
            Showtimes
          </span>
          <div className="flex flex-col gap-2 font-body text-sm font-light text-cream/75 leading-relaxed">
            <span>Terça — Sábado</span>
            <span className="text-gold-luminous/90">20:00 · 22:30</span>
            <span className="text-cream/55 text-xs mt-2 tracking-wider uppercase">
              Domingos · Fado Vadio
            </span>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="max-w-editorial mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-cream/10 pt-8 mt-10">
        <span className="font-label text-[9px] uppercase tracking-[0.32em] text-cream/35">
          © {CURRENT_YEAR} Saudade e Fado · {tx.rights}
        </span>
        <span className="font-headline italic text-base text-gold/55">— Fin —</span>
        <span className="font-label text-[9px] uppercase tracking-[0.32em] text-cream/35">
          {tx.madeWith}
        </span>
      </div>
    </footer>
  )
}
