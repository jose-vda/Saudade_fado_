import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GSAPProvider from '@/components/GSAPProvider'
import GrainOverlay from '@/components/GrainOverlay'
import LoadingScreen from '@/components/LoadingScreen'
import JsonLd from '@/components/JsonLd'
import { LanguageProvider } from '@/contexts/LanguageContext'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  preload: true,
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

const SITE_URL = 'https://saudadeefado.pt'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F9F9' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Saudade e Fado — Experiência Imersiva de Luxo em Alfama, Lisboa',
    template: '%s · Saudade e Fado',
  },
  description:
    'Experiências curadas de Fado no coração de Alfama. Jantares privativos, concertos exclusivos e noites inesquecíveis — onde a tradição encontra o luxo contemporâneo.',
  keywords: [
    'Fado',
    'Lisboa',
    'Alfama',
    'Saudade',
    'Jantar Privativo',
    'Experiência de Luxo',
    'Guitarra Portuguesa',
    'Cultura Portuguesa',
  ],
  authors: [{ name: 'Saudade e Fado' }],
  creator: 'Saudade e Fado',
  publisher: 'Saudade e Fado',
  alternates: {
    canonical: '/',
    languages: { 'pt-PT': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: SITE_URL,
    siteName: 'Saudade e Fado',
    title: 'Saudade e Fado — Experiência Imersiva em Lisboa',
    description:
      'Experiências curadas de Fado no coração de Alfama. Uma noite inesquecível entre guitarra portuguesa, gastronomia e a alma de Lisboa.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saudade e Fado',
    description:
      'Experiências curadas de Fado no coração de Alfama, Lisboa.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Arts & Entertainment',
  formatDetection: { email: false, address: false, telephone: false },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PerformingArtsTheater',
  name: 'Saudade e Fado',
  description:
    'Experiências curadas de Fado em Lisboa — jantares privativos e concertos exclusivos em Alfama.',
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lisboa',
    addressRegion: 'Alfama',
    addressCountry: 'PT',
  },
  sameAs: [SITE_URL],
  priceRange: '€€€',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-PT"
      className={`${playfair.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <JsonLd data={organizationJsonLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100000] focus:bg-charcoal focus:text-gold focus:px-4 focus:py-2 focus:font-label focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Saltar para o conteúdo
        </a>
        <LoadingScreen />
        <GrainOverlay />
        <LanguageProvider>
          <GSAPProvider>
            <Navbar />
            <div id="main">{children}</div>
            <Footer />
          </GSAPProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
