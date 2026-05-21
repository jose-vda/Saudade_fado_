import type { Metadata } from 'next'
import ReservaClient from './ReservaClient'

export const metadata: Metadata = {
  title: 'Reservar — A Sua Noite de Fado em Alfama',
  description:
    'Reserve a sua mesa para uma noite de fado no coração de Alfama. Escolha a data, partilhe as suas preferências e a nossa equipa confirma a disponibilidade.',
  alternates: { canonical: '/reserva' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Reservar — Saudade e Fado',
    description: 'Reserve a sua noite de fado em Alfama.',
    type: 'website',
  },
}

export default function ReservaPage() {
  return <ReservaClient />
}
