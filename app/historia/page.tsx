import type { Metadata } from 'next'
import HistoriaClient from './HistoriaClient'

export const metadata: Metadata = {
  title: 'A História do Fado — Um Património da Alma',
  description:
    'Das ruelas de Alfama ao reconhecimento da UNESCO: a cronologia do Fado, dos seus mestres e dos instrumentos que tecem a saudade portuguesa.',
  alternates: { canonical: '/historia' },
  openGraph: {
    title: 'A História do Fado — Saudade e Fado',
    description:
      'A cronologia editorial de um dos maiores patrimónios imateriais de Portugal.',
    type: 'article',
  },
}

export default function HistoriaPage() {
  return <HistoriaClient />
}
