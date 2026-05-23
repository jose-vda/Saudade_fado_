'use client'

import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import ReservaButton from '@/components/ReservaButton'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const HERO_VIDEO = '/videos/hero-1.mp4'

export default function HistoriaClient() {
  const { lang } = useLanguage()
  const tx = translations[lang].historia

  return (
    <main className="bg-noir">

      {/* Hero — compacto */}
      <section className="relative flex min-h-[52svh] w-full items-center justify-center overflow-hidden bg-noir-deep py-20 pt-28">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: 'grayscale(0.85) sepia(0.18) contrast(1.1) brightness(0.55)',
            }}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-noir-deep/60 via-transparent to-noir-deep" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,0.75) 100%)',
            }}
          />
        </div>
        <div className="relative z-10 w-full px-6 text-center">
          <FadeIn>
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous">
                Cap. IV · Origens
              </span>
              <span className="h-px w-10 bg-gold/60" />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-headline italic text-3xl sm:text-4xl md:text-5xl leading-snug tracking-tight text-cream text-shadow-cinema text-balance">
              {tx.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-6 font-body text-sm text-cream/55 font-light max-w-sm mx-auto leading-relaxed">
              {tx.intro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Quote */}
      <section className="border-y border-gold/15 bg-noir-deep py-16 md:py-20">
        <FadeIn>
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="font-headline italic text-2xl sm:text-3xl md:text-4xl text-cream leading-snug text-glow-gold">
              {tx.quote}
            </p>
            <div className="mt-6 flex flex-col items-center gap-2">
              <span className="h-px w-10 bg-gold-luminous" />
              <cite className="font-label text-[10px] uppercase tracking-[0.4em] text-cream/45 not-italic">
                {tx.quoteSource}
              </cite>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Origin — editorial article */}
      <section className="bg-noir py-20 md:py-28 px-6 border-b border-gold/10">
        <div className="max-w-2xl mx-auto">

          {/* Section label */}
          <FadeIn>
            <div className="flex items-center gap-5 mb-14">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <span className="font-label text-[10px] uppercase tracking-[0.55em] text-gold-luminous shrink-0">
                {tx.originSectionLabel}
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.05}>
            <h2 className="font-headline italic text-2xl sm:text-3xl text-cream mb-10 leading-snug">
              {tx.originTitle}
            </h2>
          </FadeIn>

          {/* Para 1 — drop cap */}
          <FadeIn delay={0.1}>
            <p className="font-body text-[15px] leading-[1.9] text-cream/70 font-light mb-8">
              <span className="float-left font-headline italic text-gold-luminous text-[4.5rem] leading-[0.8] mr-3 mt-1 select-none">
                {tx.originParas[0][0]}
              </span>
              {tx.originParas[0].slice(1)}
            </p>
          </FadeIn>

          {/* Para 2 — theories */}
          <FadeIn delay={0.12}>
            <p className="font-body text-[15px] leading-[1.9] text-cream/70 font-light mb-12">
              {tx.originParas[1]}
            </p>
          </FadeIn>

          {/* Pull-quote */}
          <FadeIn delay={0.15}>
            <div className="relative my-12 py-8 text-center">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-16 bg-gold/30" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-16 bg-gold/30" />
              <blockquote className="font-headline italic text-xl sm:text-2xl md:text-3xl text-gold-luminous leading-snug px-4">
                &ldquo;{tx.originPullQuote}&rdquo;
              </blockquote>
            </div>
          </FadeIn>

          {/* Para 3 */}
          <FadeIn delay={0.17}>
            <p className="font-body text-[15px] leading-[1.9] text-cream/70 font-light mb-8">
              {tx.originParas[2]}
            </p>
          </FadeIn>

          {/* Para 4 */}
          <FadeIn delay={0.19}>
            <p className="font-body text-[15px] leading-[1.9] text-cream/70 font-light mb-8">
              {tx.originParas[3]}
            </p>
          </FadeIn>

          {/* Para 5 — Amália highlight */}
          <FadeIn delay={0.21}>
            <p className="font-body text-[15px] leading-[1.9] text-cream/70 font-light mb-8">
              {tx.originParas[4]}
            </p>
            <div className="mt-10 flex items-center gap-5 border-l-2 border-gold pl-5">
              <p className="font-headline italic text-base sm:text-lg text-cream/90 leading-snug">
                {tx.originAmalia}
              </p>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Timeline — 3 marcos minimalistas */}
      <section className="bg-noir py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-0 divide-y divide-gold/10">
            {tx.timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="grid grid-cols-[5rem_1fr] sm:grid-cols-[8rem_1fr] gap-6 py-8"
                >
                  <div className="pt-1">
                    <span className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-luminous leading-relaxed">
                      {item.period}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline italic text-xl sm:text-2xl text-cream mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-cream/50 font-light leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gold/15 bg-noir-deep py-16 md:py-24 px-6">
        <FadeIn>
          <div className="mx-auto max-w-xl text-center">
            <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous mb-6 block">
              {tx.ctaLabel}
            </span>
            <h2 className="font-headline italic text-3xl sm:text-4xl md:text-5xl text-cream mb-8 leading-snug">
              {tx.ctaTitle}
            </h2>
            <span className="block mx-auto h-px w-12 bg-gold-luminous mb-8" />
            <ReservaButton>{tx.ctaButton}</ReservaButton>
          </div>
        </FadeIn>
      </section>

    </main>
  )
}
