'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="pt-PT">
      <body
        style={{
          backgroundColor: '#141414',
          color: '#F2EAD9',
          fontFamily: 'system-ui, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 560, textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontStyle: 'italic', marginBottom: 16 }}>
            Erro inesperado
          </h1>
          <p style={{ color: '#A89B89', marginBottom: 24 }}>
            {error?.message || 'Algo correu mal.'}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: '12px 28px',
              border: '1px solid #E8C896',
              color: '#E8C896',
              background: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            Tentar de novo
          </button>
        </div>
      </body>
    </html>
  )
}
