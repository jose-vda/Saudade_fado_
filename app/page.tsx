'use client'

import { useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import ReviewsCarousel from '@/components/ReviewsCarousel'
import VenueMap from '@/components/VenueMap'
import { useLanguage } from '@/contexts/LanguageContext'
import { submitLead } from '@/lib/leads'
import { translations } from '@/lib/translations'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDq2b6eglrrvgkRzrvk15IOvlIPcsut8f4LXZVMNT6qdY2pghtq-PTLZgFWqVhLLMPr-zJOlt5-UOrOXeF6EB8F74425JcsacT5BMNznmvFZlebrn5zV8eCJwi8pGXkqQUiyxZ6w9r42qQZphTDPNCXYZ25H4gjom8BZ3hgow6j520dzKQb94bMwRIF3ahW3rInXsQxHlehmJGXE1sY2mnnj6cyTXS2kVF3-al9MZOYw_xuEBR53SZlMxK9vvVoW-gKEO-ipsqW1RE'
type HomeTx = typeof translations.pt.home

function Hero({ tx }: { tx: HomeTx }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <header
      ref={heroRef}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-0 pb-20 pt-24"
    >
      <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
        <Image
          src={HERO_IMG}
          alt="Fadista a cantar numa tasca lisboeta"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className="object-cover grayscale contrast-125 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/15 to-transparent opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/30 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 w-full max-w-5xl px-6 text-center"
      >
        <p className="mb-6 block font-label text-[10px] uppercase tracking-[0.24em] text-gold sm:mb-8 sm:tracking-[0.3em]">
          {tx.location}
        </p>
        <h1 className="mx-auto max-w-[19rem] font-headline text-[2rem] leading-[1.14] tracking-tight text-white text-shadow-hero sm:max-w-none sm:text-6xl sm:leading-[1.05] md:text-7xl lg:text-8xl">
          <span className="block text-balance">{tx.heroTitle}</span>
          <span className="mx-auto block max-w-[13ch] text-balance italic font-normal text-gold sm:max-w-none">
            {tx.heroSubtitle}
          </span>
        </h1>
        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:mt-12 sm:flex-row sm:gap-6 md:mt-14">
          <Link
            href="/reserva"
            className="border-draw px-7 py-4 text-center font-label text-xs uppercase tracking-[0.18em] text-white transition-colors duration-500 hover:text-gold sm:px-10 sm:py-5 sm:text-sm sm:tracking-[0.2em]"
          >
            {tx.bookExperience}
          </Link>
          <Link
            href="/galeria"
            className="font-label text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-400 border-b border-white/30 hover:border-white pb-0.5"
          >
            {tx.seeExperience}
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-px h-12 bg-white/30"
        />
      </motion.div>
    </header>
  )
}

function Essence({ tx }: { tx: HomeTx }) {
  return (
    <section className="overflow-hidden bg-surface py-20 sm:py-28 md:py-40">
      <div className="max-w-editorial mx-auto px-6 md:px-12">
        <FadeIn className="text-center mb-12">
          <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] block">
            {tx.essenceLabel}
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative w-full aspect-video shadow-soft-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/93fmKniPP8k?start=657&rel=0&modestbranding=1"
              title="Fado — Saudade e Fado"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Contact({ tx }: { tx: HomeTx }) {
  const { lang } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setFeedback(tx.contactRequired)
      return
    }

    setStatus('submitting')
    setFeedback('')

    try {
      await submitLead({
        kind: 'contact',
        lang,
        name: form.name,
        email: form.email,
        message: form.message,
      })
      setStatus('success')
      setFeedback(tx.contactSuccess)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
      setFeedback(tx.contactError)
    }
  }

  const updateField = (name: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [name]: value }))
    if (status === 'error') {
      setStatus('idle')
      setFeedback('')
    }
  }

  return (
    <section className="overflow-hidden bg-surface-container-low py-20 text-on-surface sm:py-28 md:py-40">
      <div className="max-w-editorial mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <FadeIn direction="left">
            <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] mb-8 block">
              {tx.contactLabel}
            </span>
            <h2 className="mb-8 font-headline text-3xl leading-snug text-balance sm:text-4xl md:mb-10 md:text-5xl">
              {tx.contactTitle1}{' '}
              <span className="italic text-primary">{tx.contactTitleEm}</span>
              {tx.contactTitle2}
            </h2>
            <p className="font-body text-lg text-on-surface-variant mb-12 leading-relaxed max-w-md font-light">
              {tx.contactBody}
            </p>
            <dl className="space-y-5">
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="w-1.5 h-1.5 bg-gold rounded-full" />
                <dt className="sr-only">Location</dt>
                <dd className="font-label text-xs tracking-widest">{tx.contactLocation}</dd>
              </div>
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="w-1.5 h-1.5 bg-gold rounded-full" />
                <dt className="sr-only">Email</dt>
                <dd className="font-label text-xs tracking-widest">
                  <a
                    href={`mailto:${tx.contactEmailAddr.toLowerCase()}`}
                    className="hover:text-primary transition-colors"
                  >
                    {tx.contactEmailAddr}
                  </a>
                </dd>
              </div>
            </dl>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <form
              className="space-y-10"
              onSubmit={handleSubmit}
              aria-label="Contact form"
              noValidate
            >
              {[
                { id: 'name', label: tx.contactName, type: 'text', autoComplete: 'name' },
                { id: 'email', label: tx.contactEmailLabel, type: 'email', autoComplete: 'email' },
              ].map(({ id, label, type, autoComplete }) => (
                <div key={id} className="relative">
                  <input
                    id={id}
                    name={id}
                    type={type}
                    autoComplete={autoComplete}
                    value={form[id as 'name' | 'email']}
                    onChange={(event) =>
                      updateField(id as 'name' | 'email', event.target.value)
                    }
                    disabled={status === 'submitting'}
                    placeholder=" "
                    className="peer block w-full px-0 py-4 bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:outline-none focus:border-gold transition-colors duration-500 text-on-surface placeholder-transparent"
                  />
                  <label
                    htmlFor={id}
                    className="peer-float-label absolute top-4 left-0 font-label text-[10px] uppercase tracking-widest text-on-surface-variant transition-all duration-300 pointer-events-none"
                  >
                    {label}
                  </label>
                </div>
              ))}
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  disabled={status === 'submitting'}
                  placeholder=" "
                  className="peer block w-full px-0 py-4 bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:outline-none focus:border-gold transition-colors duration-500 text-on-surface placeholder-transparent resize-none"
                />
                <label
                  htmlFor="message"
                  className="peer-float-label absolute top-4 left-0 font-label text-[10px] uppercase tracking-widest text-on-surface-variant transition-all duration-300 pointer-events-none"
                >
                  {tx.contactMessage}
                </label>
              </div>
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary text-white py-5 font-label uppercase tracking-[0.2em] text-xs hover:bg-gold hover:text-charcoal-deep transition-colors duration-500 shadow-gold"
              >
                {status === 'submitting' ? tx.contactSending : tx.contactSubmit}
              </motion.button>
              <p
                aria-live="polite"
                className={`min-h-6 text-sm leading-relaxed ${
                  status === 'success' ? 'text-primary' : 'text-red-700'
                }`}
              >
                {feedback}
              </p>
            </form>
          </FadeIn>
        </div>

        <FadeIn delay={0.25}>
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-5">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">
                {tx.venueMapLabel}
              </span>
              <div className="flex-1 h-px bg-on-surface/10" />
            </div>
            <VenueMap
              address={tx.venueAddress}
              directionsLabel={tx.venueDirections}
              transportLabel={tx.venueTransport}
              height="400px"
            />
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
    <main>
      <Hero tx={tx} />
      <ReviewsCarousel />
      <Essence tx={tx} />
      <Contact tx={tx} />
    </main>
  )
}
