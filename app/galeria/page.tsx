import type { Metadata } from 'next'
import GaleriaClient from './GaleriaClient'

export const metadata: Metadata = {
  title: 'A Experiência — Galeria Visual do Fado',
  description:
    'Uma galeria imersiva pelos momentos, texturas e silêncios das nossas noites de fado em Alfama. Fotografia editorial do palco, da mesa e da alma.',
  alternates: { canonical: '/galeria' },
  openGraph: {
    title: 'A Experiência — Saudade e Fado',
    description:
      'Fotografia editorial das noites de fado no coração de Alfama.',
    type: 'website',
  },
}

export default function GaleriaPage() {
  return <GaleriaClient />
}
