'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

function StarRow({ count }: { count: number }) {
  return (
    <span aria-label={`${count} stars`} className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} aria-hidden="true" className="w-3 h-3 fill-gold shrink-0" viewBox="0 0 20 20">
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.45.91-5.33L2.27 6.62l5.34-.78z" />
        </svg>
      ))}
    </span>
  )
}

export default function ReviewsCarousel() {
  const { lang } = useLanguage()
  const tx = translations[lang].reviews
  const looped = [...tx.items, ...tx.items]
  const prefersReducedMotion = useReducedMotion()

  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const hoveredRef = useRef(false)
  const draggingRef = useRef(false)
  const lastXRef = useRef(0)

  const wrap = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const half = el.scrollWidth / 2
    if (el.scrollLeft >= half) el.scrollLeft -= half
    if (el.scrollLeft < 0) el.scrollLeft += half
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el || prefersReducedMotion) return
    let prev = performance.now()

    const tick = (now: number) => {
      const delta = now - prev
      prev = now
      if (!hoveredRef.current && !draggingRef.current) {
        el.scrollLeft += delta * 0.045
        wrap()
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [prefersReducedMotion, wrap])

  const onMouseEnter = () => { hoveredRef.current = true }
  const onMouseLeave = () => { hoveredRef.current = false; draggingRef.current = false }

  const onMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true
    lastXRef.current = e.clientX
    e.preventDefault()
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!draggingRef.current) return
    const el = trackRef.current
    if (!el) return
    el.scrollLeft += lastXRef.current - e.clientX
    lastXRef.current = e.clientX
    wrap()
  }

  const onMouseUp = () => { draggingRef.current = false }

  return (
    <section
      className="bg-surface-container-low py-14 border-y border-gold/20"
      aria-label={tx.label}
    >
      <p className="font-label text-xs uppercase tracking-[0.2em] text-primary text-center mb-10">
        {tx.label}
      </p>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-surface-container-low to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-surface-container-low to-transparent" />

        <div
          ref={trackRef}
          className="flex overflow-x-auto select-none cursor-grab snap-x snap-mandatory active:cursor-grabbing focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold"
          style={{ scrollbarWidth: 'none' }}
          tabIndex={0}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          {looped.map((review, i) => (
            <article
              key={i}
              className="w-80 shrink-0 snap-start mx-4 px-8 py-8 border border-gold/20 bg-offwhite"
            >
              <StarRow count={5} />
              <p className="font-headline text-base italic text-on-surface leading-relaxed mt-5 mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer>
                <p className="font-label text-xs uppercase tracking-wide text-on-surface-variant">
                  {review.author}
                </p>
                <p className="font-label text-xs uppercase tracking-wide text-primary mt-0.5">
                  {review.role}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
