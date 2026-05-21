import Link from 'next/link'

const footerLinks = [
  { href: '/elenco', label: 'O Elenco' },
  { href: '/galeria', label: 'A Experiência' },
  { href: '/historia', label: 'História' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/reserva', label: 'Reservas' },
] as const

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer
      className="relative w-full border-t border-on-surface/10 bg-surface px-6 md:px-12 py-16 md:py-20"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Rodapé
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
            Experiências curadas de Fado no coração de Alfama, onde a tradição
            encontra o luxo contemporâneo.
          </p>
        </div>

        <nav aria-label="Ligações do rodapé" className="flex flex-wrap md:justify-center gap-x-8 gap-y-4">
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
          Todos os direitos reservados.
        </div>
      </div>

      <div className="max-w-editorial mx-auto mt-12 pt-8 border-t border-on-surface/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-label text-[9px] uppercase tracking-[0.3em] text-on-surface/35">
          Alfama · Lisboa · Portugal
        </span>
        <span className="font-label text-[9px] uppercase tracking-[0.3em] text-on-surface/35">
          Feito com saudade
        </span>
      </div>
    </footer>
  )
}
