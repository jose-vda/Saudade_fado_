import type { Metadata } from 'next'
import EventosClient from './EventosClient'

export const metadata: Metadata = {
  title: 'Eventos Privados & Corporativos — Fado On-Demand',
  description:
    'Fado à medida para galas corporativas, brand activations e celebrações privadas. Levamos o elenco do Saudade e Fado a qualquer lugar do mundo.',
  alternates: { canonical: '/eventos' },
  openGraph: {
    title: 'Eventos — Saudade e Fado',
    description:
      'Experiências sonoras desenhadas para a elite corporativa e celebrações privadas.',
    type: 'website',
  },
}

export default function EventosPage() {
  return <EventosClient />
}
