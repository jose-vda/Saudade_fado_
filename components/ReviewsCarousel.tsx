'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

function StarRow({ count }: { count: number }) {
  return (
    <span aria-label={`${count} stars`} className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          className="h-2.5 w-2.5 shrink-0 fill-gold/70"
          viewBox="0 0 20 20"
        >
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

  return (
    <section
      className="relative border-y border-cream/10 bg-noir py-14 md:py-16"
      aria-label={tx.label}
    >
      <div className="mb-8 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-cream/20" />
        <p className="text-center font-label text-[9px] uppercase tracking-[0.42em] text-cream/60">
          {tx.label}
        </p>
        <span className="h-px w-8 bg-cream/20" />
      </div>

      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-noir to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-noir to-transparent sm:w-24" />

        <div
          className="flex w-max animate-marquee-scroll group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ willChange: 'transform' }}
        >
          {looped.map((review, i) => (
            <article
              key={i}
              aria-hidden={i >= tx.items.length ? true : undefined}
              className="mx-2 w-[min(17rem,calc(100vw-3rem))] shrink-0 sm:mx-2.5"
            >
              <div className="h-full border border-cream/10 bg-cream/[0.025] p-5 transition-colors duration-600 hover:border-cream/20 sm:p-6">
                <StarRow count={5} />
                <p className="my-5 font-body text-[13px] font-light leading-[1.75] text-cream/75">
                  &ldquo;{review.text}&rdquo;
                </p>
                <footer className="border-t border-cream/10 pt-3">
                  <p className="font-label text-[9px] uppercase tracking-[0.22em] text-cream/70">
                    {review.author}
                  </p>
                  <p className="mt-1 font-label text-[9px] uppercase tracking-[0.18em] text-cream/40">
                    {review.role}
                  </p>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
