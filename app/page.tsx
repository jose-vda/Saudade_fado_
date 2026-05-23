'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import ReviewsCarousel from '@/components/ReviewsCarousel'
import ChapterMarker from '@/components/ChapterMarker'
import YoutubeEmbed from '@/components/YoutubeEmbed'
import ReservaButton from '@/components/ReservaButton'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const HERO_VIDEOS = [
  '/videos/hero-1.mp4',
  '/videos/hero-2.mp4',
  '/videos/hero-3.mp4',
  '/videos/hero-4.mp4',
  '/videos/hero-5.mp4',
  '/videos/hero-6.mp4',
  '/videos/hero-7.mp4',
]

type HomeTx = typeof translations.pt.home

function Hero({ tx }: { tx: HomeTx }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  useEffect(() => {
    const idx = Math.floor(Math.random() * HERO_VIDEOS.length)
    setVideoSrc(HERO_VIDEOS[idx])
  }, [])
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '35%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 1.08])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const barHeight = useTransform(scrollYProgress, [0, 0.5], ['8vh', '0vh'])

  return (
    <header
      ref={heroRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-0 pb-20 pt-24"
    >
      <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
        {videoSrc && (
          <video
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: 'grayscale(0.5) sepia(0.15) contrast(1.05) brightness(0.62)',
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
        {/* Multi-layer gradient for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-deep via-noir-deep/40 to-noir-deep/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir-deep/70 via-transparent to-transparent" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
          }}
        />
      </motion.div>

      {/* Letterbox bars (animated open) */}
      <motion.div
        aria-hidden="true"
        style={{ height: barHeight }}
        className="absolute top-0 inset-x-0 z-20 bg-noir-deep border-b border-gold/15"
      />
      <motion.div
        aria-hidden="true"
        style={{ height: barHeight }}
        className="absolute bottom-0 inset-x-0 z-20 bg-noir-deep border-t border-gold/15"
      />

      {/* Side credits — left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-3 [writing-mode:vertical-rl] rotate-180">
          <span className="h-12 w-px bg-gold/40" />
          <span className="font-label text-[9px] uppercase tracking-[0.6em] text-cream/50">
            Alfama · Lisboa · MMXXV
          </span>
        </div>
      </motion.div>

      {/* Side credits — right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-3 [writing-mode:vertical-rl]">
          <span className="font-label text-[9px] uppercase tracking-[0.6em] text-cream/50">
            Cap. I · Prelúdio
          </span>
          <span className="h-12 w-px bg-gold/40" />
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 w-full max-w-5xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          className="mb-7 flex items-center justify-center gap-4 sm:mb-10"
        >
          <span className="h-px w-8 bg-gold/60 sm:w-12" />
          <span className="font-label text-[10px] uppercase tracking-[0.45em] text-gold-luminous sm:tracking-[0.55em]">
            {tx.location}
          </span>
          <span className="h-px w-8 bg-gold/60 sm:w-12" />
        </motion.div>

        <h1 className="mx-auto font-headline leading-[1.3] text-cream text-shadow-cinema">
          <motion.span
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.55, duration: 1.1, ease: [0.83, 0, 0.17, 1] }}
            className="block text-balance text-2xl sm:text-3xl lg:text-[2.5rem] tracking-[0.12em] font-light"
          >
            {tx.heroTitle}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
            className="block text-balance italic font-light text-gold-luminous text-glow-gold text-2xl sm:text-3xl lg:text-[2.5rem] tracking-[0.1em]"
          >
            {tx.heroSubtitle}
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.9 }}
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:mt-16 sm:flex-row sm:gap-8"
        >
          <ReservaButton dataCinemaView="reservar">
            {tx.bookExperience}
          </ReservaButton>
          <Link
            href="/galeria"
            className="link-cinema font-label text-[11px] uppercase tracking-[0.28em] text-cream/65 hover:text-gold-luminous transition-colors duration-500"
          >
            {tx.seeExperience}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-12 z-10"
        aria-hidden="true"
      >
        <span className="font-label text-[9px] uppercase tracking-[0.45em] text-cream/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-gold-luminous to-transparent"
        />
      </motion.div>
    </header>
  )
}

function Essence({ tx }: { tx: HomeTx }) {
  return (
    <section className="relative overflow-hidden bg-noir py-24 sm:py-32 md:py-40">
      <div className="max-w-editorial mx-auto px-6 md:px-12">
        <FadeIn className="mb-14 md:mb-20">
          <ChapterMarker
            numeral="II"
            title={tx.essenceLabel}
            subtitle="Um documentário curto. A alma do fado em imagem e som."
            align="center"
            variant="noir"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mx-auto max-w-5xl">
            {/* Gold frame */}
            <div className="absolute -inset-1.5 border border-gold/30 pointer-events-none" />
            <div className="absolute -inset-3 border border-gold/15 pointer-events-none" />
            <div className="relative aspect-video bg-noir-deep overflow-hidden shadow-cinema">
              <YoutubeEmbed
                videoId="93fmKniPP8k"
                startTime={657}
                title="Fado — Saudade e Fado"
              />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-gold/60">
                Feature
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-cream/40">
                — 00:10:57
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const PILARES = [
  { numeral: 'I',   titleKey: 'sobreNosPilar1Title', bodyKey: 'sobreNosPilar1Body' },
  { numeral: 'II',  titleKey: 'sobreNosPilar2Title', bodyKey: 'sobreNosPilar2Body' },
  { numeral: 'III', titleKey: 'sobreNosPilar3Title', bodyKey: 'sobreNosPilar3Body' },
] as const

function OrnamentDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-gold/20" />
      <span className="flex items-center gap-2 text-gold/60">
        <span className="block h-[3px] w-[3px] rotate-45 bg-gold/40" />
        <span className="block h-[5px] w-[5px] rotate-45 border border-gold/50" />
        <span className="block h-[3px] w-[3px] rotate-45 bg-gold/40" />
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/30 to-gold/20" />
    </div>
  )
}

function SobreNos({ tx }: { tx: HomeTx }) {
  return (
    <section className="relative bg-noir py-24 sm:py-32 md:py-40 text-cream overflow-hidden">
      {/* Subtle vignette + grain backdrop for editorial depth */}
      <div className="pointer-events-none absolute inset-0 bg-vignette-soft opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grain-noise opacity-[0.04] mix-blend-overlay" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-6 md:px-12">

        {/* Chapter label */}
        <FadeIn>
          <div className="flex items-center gap-5 mb-14 md:mb-20">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
            <span className="font-label text-[10px] uppercase tracking-[0.55em] text-gold-luminous shrink-0">
              {tx.sobreNosChapter}
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </FadeIn>

        {/* Quote with decorative quotation marks */}
        <FadeIn delay={0.1}>
          <blockquote className="relative text-center mb-14 md:mb-20 px-4">
            <span
              aria-hidden="true"
              className="absolute -top-6 left-1/2 -translate-x-1/2 font-headline text-gold/30 text-6xl md:text-7xl leading-none select-none"
            >
              &ldquo;
            </span>
            <p className="relative font-headline italic text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight text-cream whitespace-pre-line">
              {tx.sobreNosQuote}
            </p>
            <span
              aria-hidden="true"
              className="block mt-6 mx-auto h-px w-16 bg-gold/40"
            />
          </blockquote>
        </FadeIn>

        {/* Body copy */}
        <FadeIn delay={0.15}>
          <OrnamentDivider className="mb-12 md:mb-14" />

          <div className="max-w-xl mx-auto text-center space-y-5 mb-14 md:mb-16">
            <p className="font-body text-[15px] leading-[1.85] text-cream/65 font-light">
              {tx.sobreNosBody1}
            </p>
            <p className="font-body text-[15px] leading-[1.85] text-cream/65 font-light">
              {tx.sobreNosBody2}
            </p>
          </div>

          <OrnamentDivider className="mb-14 md:mb-16" />

          {/* Pillars with vertical gold separators on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-0 text-center mb-14 md:mb-16">
            {PILARES.map(({ numeral, titleKey, bodyKey }, idx) => (
              <div
                key={numeral}
                className={`relative flex flex-col items-center px-4 sm:px-6 ${
                  idx > 0 ? 'sm:border-l sm:border-gold/15' : ''
                }`}
              >
                {/* Oversized watermark numeral */}
                <span
                  aria-hidden="true"
                  className="font-headline italic text-gold/10 text-7xl md:text-8xl leading-none select-none -mb-6"
                >
                  {numeral}
                </span>
                <span className="relative font-label text-[9px] uppercase tracking-[0.42em] text-gold-luminous">
                  {numeral}
                </span>
                <span className="mt-4 mb-4 h-px w-6 bg-gold/30" />
                <h3 className="font-headline italic text-lg md:text-xl text-cream tracking-tight mb-3">
                  {tx[titleKey]}
                </h3>
                <p className="font-body text-[13px] leading-[1.75] text-cream/50 font-light max-w-[16rem]">
                  {tx[bodyKey]}
                </p>
              </div>
            ))}
          </div>

          <OrnamentDivider className="mb-12 md:mb-14" />
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.25}>
          <div className="flex justify-center">
            <ReservaButton>{tx.sobreNosCta}</ReservaButton>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}

export default function HomePage() {
  const { lang } = useLanguage()
  const tx = translations[lang].home

  return (
    <main className="bg-noir">
      <Hero tx={tx} />
      <ReviewsCarousel />
      <Essence tx={tx} />
      <SobreNos tx={tx} />
    </main>
  )
}
