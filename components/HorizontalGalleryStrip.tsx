'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

interface StripItem {
  img: string
  alt: string
  label: string
  title: string
}

interface HorizontalGalleryStripProps {
  items: readonly StripItem[]
  exploreLabel: string
}

const dims = [
  { w: 340, h: 480 },
  { w: 280, h: 380 },
  { w: 320, h: 440 },
] as const

export default function HorizontalGalleryStrip({
  items,
  exploreLabel,
}: HorizontalGalleryStripProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-55%'])

  return (
    <div
      ref={containerRef}
      className="relative h-[60vh] min-h-[460px] overflow-hidden flex items-center bg-noir-deep border-y border-gold/15"
    >
      <div className="absolute top-7 left-8 z-10 pointer-events-none flex items-center gap-3">
        <span className="h-px w-8 bg-gold/50" />
        <span className="font-label text-[10px] uppercase tracking-[0.4em] text-gold-luminous">
          {exploreLabel}
        </span>
      </div>

      <div className="absolute top-7 right-8 z-10 pointer-events-none">
        <span className="font-label text-[10px] uppercase tracking-[0.4em] text-cream/40">
          {String(items.length).padStart(2, '0')} frames
        </span>
      </div>

      <motion.div style={{ x }} className="flex gap-5 pl-16 pr-32 items-center">
        {items.map((item, i) => {
          const { w, h } = dims[i % dims.length]
          return (
            <figure
              key={`${item.title}-${i}`}
              className="relative flex-shrink-0 overflow-hidden group"
              style={{ width: w, height: h }}
              data-cinema-view="view"
            >
              <Image
                src={item.img}
                alt={item.alt}
                fill
                sizes="340px"
                className="object-cover duotone-noir transition-transform duration-1000 ease-cinema group-hover:scale-105"
                loading={i < 3 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-deep/80 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />

              {/* Frame number top-left */}
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <span className="font-headline italic text-base text-gold-luminous/90">
                  {String(i + 1).padStart(3, '0')}
                </span>
                <span className="h-px w-5 bg-gold/40" />
              </div>

              <figcaption className="absolute bottom-0 left-0 p-5 sm:translate-y-3 sm:group-hover:translate-y-0 transition-transform duration-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <p className="font-label text-[10px] tracking-[0.25em] uppercase text-gold-luminous mb-1">
                  {item.label}
                </p>
                <p className="font-headline italic text-base text-cream">
                  {item.title}
                </p>
              </figcaption>
              {/* Border hover */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
              {/* Corner accents */}
              <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-gold/0 group-hover:border-gold/70 transition-colors duration-500" />
              <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-gold/0 group-hover:border-gold/70 transition-colors duration-500" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-gold/0 group-hover:border-gold/70 transition-colors duration-500" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-gold/0 group-hover:border-gold/70 transition-colors duration-500" />
            </figure>
          )
        })}
      </motion.div>

      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-noir-deep to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-36 h-full bg-gradient-to-l from-noir-deep to-transparent z-10 pointer-events-none" />
    </div>
  )
}
