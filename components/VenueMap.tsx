'use client'

import dynamic from 'next/dynamic'

interface Props {
  address: string
  height?: string
  directionsLabel: string
  transportLabel: string
}

const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Rua+do+Crucifixo+17%2C+1100-184+Lisboa'

const VenueMapInner = dynamic(() => import('./VenueMapInner'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface-container-high animate-pulse" />,
})

export default function VenueMap({
  address,
  height = '400px',
  directionsLabel,
  transportLabel,
}: Props) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      {/* Map — isolated so Leaflet's internal z-index stays contained */}
      <div className="absolute inset-0 isolate">
        <VenueMapInner height={height} />
      </div>

      {/* Edge vignette — fades the map into the dark section */}
      <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_70px_25px_rgba(13,13,13,0.85)]" />

      {/* Hairline frame */}
      <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-gold/20" />

      {/* Corner accents */}
      <div className="pointer-events-none absolute top-4 left-4 z-10 h-7 w-7 border-t border-l border-gold/50" />
      <div className="pointer-events-none absolute top-4 right-4 z-10 h-7 w-7 border-t border-r border-gold/50" />
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 h-7 w-7 border-b border-l border-gold/50" />
      <div className="pointer-events-none absolute bottom-4 right-4 z-10 h-7 w-7 border-b border-r border-gold/50" />

      {/* Venue card */}
      <div className="glass-dark absolute bottom-6 left-6 right-6 z-20 p-6 sm:right-auto sm:w-[300px]">
        <div className="mb-4 h-px w-10 bg-gold" />
        <h3 className="font-headline text-xl leading-tight text-white">
          Saudade e Fado
        </h3>
        <p className="mt-2 font-body text-[11px] leading-relaxed text-white/55">
          {address}
        </p>
        <div className="mt-3 flex items-start gap-2">
          <span className="mt-px flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] bg-gold/80 font-label text-[8px] font-bold text-charcoal-deep">
            M
          </span>
          <span className="font-label text-[11px] uppercase leading-relaxed tracking-wide text-white/65">
            {transportLabel}
          </span>
        </div>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-center gap-3 border border-gold/40 px-5 py-3 font-label text-xs uppercase tracking-wide text-gold transition-colors duration-[400ms] hover:bg-gold hover:text-charcoal-deep"
        >
          {directionsLabel}
          <span className="transition-transform duration-[400ms] group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  )
}
