'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App error boundary caught:', error)
  }, [error])

  return (
    <main className="min-h-screen bg-noir flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="mb-7 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold/60" />
          <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous">
            Intervalo
          </span>
          <span className="h-px w-12 bg-gold/60" />
        </div>
        <h1 className="font-headline italic text-cream text-4xl md:text-6xl mb-6 leading-tight">
          Uma pausa <span className="text-gold-luminous">inesperada</span>
        </h1>
        <p className="text-cream/65 font-light leading-relaxed mb-10">
          Algo correu mal nesta cena. A nossa equipa técnica foi notificada.
        </p>
        {error?.message ? (
          <pre className="mb-10 max-w-full overflow-x-auto bg-noir-ember border border-gold/15 p-4 text-left text-xs text-cream/70 font-mono">
            {error.message}
            {error.digest ? `\n\nDigest: ${error.digest}` : ''}
          </pre>
        ) : null}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button type="button" onClick={() => reset()} className="btn-cinema">
            Tentar de novo
          </button>
          <Link
            href="/"
            className="link-cinema font-label text-[11px] uppercase tracking-[0.28em] text-cream/70 hover:text-gold-luminous"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  )
}
