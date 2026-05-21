import type { Metadata } from 'next'
import ElencoClient from './ElencoClient'

export const metadata: Metadata = {
  title: 'O Elenco — Vozes e Cordas da Alma',
  description:
    'Conheça os fadistas, guitarristas portugueses e mestres que compõem o elenco do Saudade e Fado — vozes consagradas no coração de Alfama.',
  alternates: { canonical: '/elenco' },
  openGraph: {
    title: 'O Elenco — Saudade e Fado',
    description:
      'As vozes e cordas da alma portuguesa reunidas num único palco em Alfama.',
    type: 'website',
  },
}

export default function ElencoPage() {
  return <ElencoClient />
}
