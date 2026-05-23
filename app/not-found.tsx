import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-noir flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="mb-7 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold/60" />
          <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous">
            Cena Perdida
          </span>
          <span className="h-px w-12 bg-gold/60" />
        </div>
        <h1 className="font-headline italic text-cream text-6xl md:text-8xl mb-6 leading-none">
          404
        </h1>
        <p className="font-headline italic text-cream/80 text-xl md:text-2xl mb-10">
          Esta cena ficou na sala de montagem.
        </p>
        <Link href="/" className="btn-cinema">
          Voltar ao palco
        </Link>
      </div>
    </main>
  )
}
