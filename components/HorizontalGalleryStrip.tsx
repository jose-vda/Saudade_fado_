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
}

const dims = [
  { w: 320, h: 450 },
  { w: 265, h: 360 },
  { w: 300, h: 420 },
] as const

export default function HorizontalGalleryStrip({ items }: HorizontalGalleryStripProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['8%', '-55%'])

  return (
    <div
      ref={containerRef}
      className="relative h-[55vh] min-h-[420px] overflow-hidden flex items-center bg-charcoal-deep"
    >
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <span className="font-label text-[9px] uppercase tracking-[0.4em] text-gold/85">
          Role para explorar
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
            >
              <Image
                src={item.img}
                alt={item.alt}
                fill
                sizes="340px"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loading={i < 3 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute bottom-0 left-0 p-5 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <p className="font-label text-[9px] tracking-widest uppercase text-gold mb-1">
                  {item.label}
                </p>
                <p className="font-headline italic text-base text-white">
                  {item.title}
                </p>
              </figcaption>
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/25 transition-all duration-500" />
            </figure>
          )
        })}
      </motion.div>

      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-charcoal-deep to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-36 h-full bg-gradient-to-l from-charcoal-deep to-transparent z-10 pointer-events-none" />
    </div>
  )
}
