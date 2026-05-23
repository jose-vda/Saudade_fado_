'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import { useLanguage } from '@/contexts/LanguageContext'
import { submitLead } from '@/lib/leads'
import { translations } from '@/lib/translations'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDO5xZcAN7e2H1y6h2qGogitzPpfAGHGiYrVKuGilOX56F_ZQHZKvEjPBzFeJlGxT3JF4oZFwAOuEYpmFCK-_1dTOz8u0XXx-JbtNC6RWuLE_o02XrzfwGEfsef_pOh0i9sP1ZEhM9yrNwrKPGB1elm9TQ8w4zrDJinDLUSbpopV97nhUJqRBViGLi3lZzle4VDWsx6IjHuiyVyZlherQHnAYnvie6wdsfkv_LpLesjYo8zIqNIO-kGlE4hqoTc7GKOzmP-2DuSviI'
const CORP_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAbfE6soTitkwDkZ-lL-WE0a7wtCjquy8ujqinJSS04DIHrNk-DHsiic8_CWXWDgdo5S6iup8qMy0iB-5v6ZlT9pEzT4P4yK1cRzeP_4jFUF_y2Rb9m365csbAKrkdXMgyeftAanMectgxmIN11j2OhQTcgK_27qDrUAqfDfQ3PiTr4PfJLx3Rf5Vm_QVtAxPmkLTNhOsyDiMZVQlRL9vPvEuAZLdLNHiI0hSXgmFih76j_fJZs6tNVwUrJWHCidDycqmmIxaO9nRA'
const PRIV_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCX7kIagV8fQbRtUJ6BhHHG7O_qTcmlExuKMx3hn6TxN0oqKf9ETcvVGR-1qSqpkaADkT2H_hnALwSKnjAktcgwTMgVwVBpXFIaI53mCxVKnjtvgqlBut0Coc9NZhk8i0kDv1NMT6jbBWj8gRpXCLpanadabOXoWpw1lIJZQSBzvX-9UP-pP8-fM4hNMtB0qKs-EOMVFxhKiy-KBud2urtsX78wJWE34h0jb4iniunsKkvUW6dSkdOb3Y-6Qt5T9axSu002OftSXUI'

type EventForm = {
  name: string
  email: string
  company: string
  eventType: string
  eventDate: string
  guestCount: string
  message: string
}

const ROMAN = ['I', 'II', 'III']

export default function EventosClient() {
  const { lang } = useLanguage()
  const tx = translations[lang].eventos
  const [form, setForm] = useState<EventForm>({
    name: '',
    email: '',
    company: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const updateField = (name: keyof EventForm, value: string) => {
    setForm((current) => ({ ...current, [name]: value }))
    if (status === 'error') {
      setStatus('idle')
      setFeedback('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !form.name.trim() ||
      !/\S+@\S+\.\S+/.test(form.email) ||
      !form.eventType.trim()
    ) {
      setStatus('error')
      setFeedback(tx.formRequired)
      return
    }

    setStatus('submitting')
    setFeedback('')

    try {
      await submitLead({
        kind: 'event',
        lang,
        name: form.name,
        email: form.email,
        company: form.company,
        eventType: form.eventType,
        eventDate: form.eventDate,
        guestCount: form.guestCount,
        message: form.message,
      })
      setStatus('success')
      setFeedback(tx.formSuccess)
      setForm({
        name: '',
        email: '',
        company: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        message: '',
      })
    } catch {
      setStatus('error')
      setFeedback(tx.formError)
    }
  }

  return (
    <main className="bg-noir">
      {/* Hero */}
      <header className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-0 py-24">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt="Palácio português com tecto dourado e candeeiros"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{
              filter: 'grayscale(0.7) sepia(0.18) contrast(1.15) brightness(0.45)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-deep/55 via-transparent to-noir-deep" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
            }}
          />
        </div>
        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
          <FadeIn>
            <div className="mb-8 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-gold/60" />
              <span className="font-label text-gold-luminous uppercase tracking-[0.5em] text-[10px]">
                Cap. V · Private Screenings
              </span>
              <span className="h-px w-12 bg-gold/60" />
            </div>
            <h1 className="mb-8 font-headline italic text-cream text-cinema-sm sm:text-cinema md:text-cinema-lg leading-[1.02] text-shadow-cinema">
              {tx.heroTitle}
            </h1>
            <p className="mx-auto max-w-3xl font-body text-base font-light leading-relaxed text-cream/75 sm:text-lg">
              {tx.heroBody}
            </p>
          </FadeIn>
        </div>
      </header>

      {/* Three Acts (Pillars) */}
      <section className="bg-noir px-6 py-28 md:px-12 md:py-40">
        <FadeIn>
          <div className="max-w-editorial mx-auto text-center mb-20">
            <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous mb-5 block">
              Three Acts
            </span>
            <h2 className="font-headline italic text-cream text-3xl md:text-5xl">
              A estrutura da noite
            </h2>
          </div>
        </FadeIn>
        <div className="max-w-editorial mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
          {tx.pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.12}>
              <div className="relative space-y-6 p-8 border border-gold/15 bg-noir-ember/40 h-full group hover:border-gold/40 transition-colors duration-700">
                {/* Corner ornaments */}
                <span className="absolute top-0 left-0 h-4 w-4 border-t border-l border-gold/60" />
                <span className="absolute top-0 right-0 h-4 w-4 border-t border-r border-gold/60" />
                <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-gold/60" />
                <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-gold/60" />

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-headline italic text-5xl md:text-6xl text-gold-luminous/80">
                    {ROMAN[i]}
                  </span>
                  <span className="font-label text-[9px] uppercase tracking-[0.4em] text-cream/40">
                    Acto {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-headline italic text-2xl md:text-3xl text-cream border-l border-gold/50 pl-5">
                  {p.title}
                </h3>
                <p className="font-body text-cream/60 font-light leading-relaxed pl-5">
                  {p.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Corporate */}
      <section className="mx-auto max-w-editorial px-6 py-20 md:px-12 md:py-24">
        <div className="flex flex-col items-center gap-14 md:flex-row md:gap-24">
          <FadeIn direction="left" className="w-full md:w-1/2 order-2 md:order-1">
            <div className="relative inline-block w-full p-3 sm:p-4 bg-noir-ember">
              <span className="absolute top-3 left-3 z-10 h-5 w-5 border-t border-l border-gold/60" />
              <span className="absolute top-3 right-3 z-10 h-5 w-5 border-t border-r border-gold/60" />
              <span className="absolute bottom-3 left-3 z-10 h-5 w-5 border-b border-l border-gold/60" />
              <span className="absolute bottom-3 right-3 z-10 h-5 w-5 border-b border-r border-gold/60" />
              <div
                className="relative h-[380px] w-full overflow-hidden shadow-cinema md:h-[520px] md:-translate-y-6 md:translate-x-6"
                data-cinema-view="view"
              >
                <Image
                  src={CORP_IMG}
                  alt="Gala corporativa com iluminação âmbar elegante"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover duotone-noir"
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn
            direction="right"
            delay={0.1}
            className="w-full md:w-1/2 order-1 md:order-2 space-y-8"
          >
            <span className="font-label text-gold-luminous text-[10px] uppercase tracking-[0.4em]">
              {tx.corpLabel}
            </span>
            <h2 className="font-headline italic text-cream text-3xl md:text-5xl leading-tight">
              {tx.corpTitle}
            </h2>
            <div className="h-px w-16 bg-gold-luminous" />
            <p className="font-body text-base font-light text-cream/65 leading-relaxed">
              {tx.corpBody}
            </p>
            <ul className="space-y-4 font-body font-light text-sm text-cream/75">
              {tx.corpItems.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-gold-luminous" />
                  <span className="tracking-[0.18em] uppercase text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Private */}
      <section className="mx-auto max-w-editorial px-6 py-20 md:px-12 md:py-24">
        <div className="flex flex-col items-center gap-14 md:flex-row md:gap-24">
          <FadeIn direction="left" className="w-full md:w-1/2 space-y-8">
            <span className="font-label text-gold-luminous text-[10px] uppercase tracking-[0.4em]">
              {tx.privLabel}
            </span>
            <h2 className="font-headline italic text-cream text-3xl md:text-5xl leading-tight">
              {tx.privTitle}
            </h2>
            <div className="h-px w-16 bg-gold-luminous" />
            <p className="font-body text-base font-light text-cream/65 leading-relaxed">
              {tx.privBody}
            </p>
            <ul className="space-y-4 font-body font-light text-sm text-cream/75">
              {tx.privItems.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-gold-luminous" />
                  <span className="tracking-[0.18em] uppercase text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn direction="right" delay={0.1} className="w-full md:w-1/2">
            <div className="relative inline-block w-full p-3 sm:p-4 bg-gold/10">
              <span className="absolute top-3 left-3 z-10 h-5 w-5 border-t border-l border-gold/60" />
              <span className="absolute top-3 right-3 z-10 h-5 w-5 border-t border-r border-gold/60" />
              <span className="absolute bottom-3 left-3 z-10 h-5 w-5 border-b border-l border-gold/60" />
              <span className="absolute bottom-3 right-3 z-10 h-5 w-5 border-b border-r border-gold/60" />
              <div
                className="relative h-[380px] w-full overflow-hidden shadow-cinema md:h-[520px] md:translate-y-6 md:-translate-x-6"
                data-cinema-view="view"
              >
                <Image
                  src={PRIV_IMG}
                  alt="Jantar íntimo à luz de velas num pátio"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover duotone-noir"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Differentials */}
      <section className="bg-noir-deep px-6 py-28 md:px-12 md:py-40 border-y border-gold/15">
        <div className="max-w-editorial mx-auto">
          <FadeIn>
            <div className="text-center mb-20 md:mb-24">
              <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous mb-5 block">
                Distinguishing Features
              </span>
              <h2 className="font-headline italic text-cream text-3xl md:text-5xl mb-4">
                {tx.diffTitle}
              </h2>
              <p className="font-body text-cream/55 font-light">{tx.diffSub}</p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-10">
            {tx.differentials.map((d, i) => (
              <FadeIn key={d.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
                  className="relative bg-noir-ember p-10 text-center border-t border-gold-luminous"
                >
                  <span className="absolute -top-px left-0 h-px w-12 bg-gold-luminous" />
                  <h4 className="font-label text-[10px] font-medium text-gold-luminous mb-7 uppercase tracking-[0.4em]">
                    {d.title}
                  </h4>
                  <p className="font-body text-sm font-light leading-relaxed text-cream/65">
                    {d.desc}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Proposal Form */}
      <section id="event-request" className="bg-noir px-6 py-28 md:px-12 md:py-40">
        <div className="mx-auto grid max-w-5xl items-start gap-16 md:grid-cols-2 md:gap-24">
          <FadeIn direction="left">
            <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous mb-6 block">
              Request a Private Screening
            </span>
            <h2 className="font-headline italic text-cream text-3xl md:text-5xl mb-8 leading-tight">
              {tx.formTitle}
            </h2>
            <div className="h-px w-16 bg-gold-luminous mb-8" />
            <p className="font-body text-cream/60 font-light leading-relaxed mb-10">
              {tx.formBody}
            </p>
            <div className="space-y-5">
              <div className="flex items-center gap-5">
                <span aria-hidden="true" className="font-label text-gold-luminous text-xs tracking-widest">
                  @
                </span>
                <a
                  href="mailto:eventos@saudadeefado.pt"
                  className="link-cinema font-body text-sm text-cream/80 hover:text-gold-luminous"
                >
                  eventos@saudadeefado.pt
                </a>
              </div>
              <div className="flex items-center gap-5">
                <span aria-hidden="true" className="font-label text-gold-luminous text-xs tracking-widest">
                  PT
                </span>
                <span className="font-body text-sm text-cream/70">Alfama, Lisboa</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="event-name"
                    className="font-label text-[10px] uppercase tracking-[0.3em] text-cream/55 block mb-3"
                  >
                    {tx.formName}
                  </label>
                  <input
                    id="event-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full bg-transparent border-b border-cream/15 focus:border-gold-luminous focus:ring-0 transition-colors py-3 outline-none text-cream"
                  />
                </div>
                <div>
                  <label
                    htmlFor="event-email"
                    className="font-label text-[10px] uppercase tracking-[0.3em] text-cream/55 block mb-3"
                  >
                    {tx.formEmail}
                  </label>
                  <input
                    id="event-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full bg-transparent border-b border-cream/15 focus:border-gold-luminous focus:ring-0 transition-colors py-3 outline-none text-cream"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="event-company"
                  className="font-label text-[10px] uppercase tracking-[0.3em] text-cream/55 block mb-3"
                >
                  {tx.formCompany}
                </label>
                <input
                  id="event-company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={(event) => updateField('company', event.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full bg-transparent border-b border-cream/15 focus:border-gold-luminous focus:ring-0 transition-colors py-3 outline-none text-cream"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="event-type"
                    className="font-label text-[10px] uppercase tracking-[0.3em] text-cream/55 block mb-3"
                  >
                    {tx.formEventType}
                  </label>
                  <select
                    id="event-type"
                    value={form.eventType}
                    onChange={(event) => updateField('eventType', event.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full bg-noir-deep border-b border-cream/15 focus:border-gold-luminous focus:ring-0 py-3 outline-none appearance-none text-cream"
                  >
                    <option value="" disabled>
                      {tx.formEventType}
                    </option>
                    {tx.formEventOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="event-date"
                    className="font-label text-[10px] uppercase tracking-[0.3em] text-cream/55 block mb-3"
                  >
                    {tx.formDate}
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    value={form.eventDate}
                    onChange={(event) => updateField('eventDate', event.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full bg-transparent border-b border-cream/15 focus:border-gold-luminous focus:ring-0 py-3 outline-none text-cream [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="event-guests"
                  className="font-label text-[10px] uppercase tracking-[0.3em] text-cream/55 block mb-3"
                >
                  {tx.formGuests}
                </label>
                <input
                  id="event-guests"
                  type="number"
                  min={1}
                  value={form.guestCount}
                  onChange={(event) => updateField('guestCount', event.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full bg-transparent border-b border-cream/15 focus:border-gold-luminous focus:ring-0 py-3 outline-none text-cream"
                />
              </div>
              <div>
                <label
                  htmlFor="event-message"
                  className="font-label text-[10px] uppercase tracking-[0.3em] text-cream/55 block mb-3"
                >
                  {tx.formMessage}
                </label>
                <textarea
                  id="event-message"
                  rows={3}
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full resize-y bg-transparent border-b border-cream/15 focus:border-gold-luminous focus:ring-0 py-3 outline-none text-cream"
                />
              </div>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'submitting'}
                className="btn-cinema w-full"
              >
                {status === 'submitting' ? tx.formSending : tx.formSubmit}
              </motion.button>
              <p
                aria-live="polite"
                className={`min-h-6 text-sm ${
                  status === 'success' ? 'text-gold-luminous' : 'text-red-400'
                }`}
              >
                {feedback}
              </p>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative border-t border-gold/15 bg-noir-deep px-6 py-28 text-center md:py-40 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        <FadeIn>
          <div className="relative">
            <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous mb-10 block">
              The Premiere
            </span>
            <h2 className="mb-12 font-headline italic text-cream text-4xl md:text-6xl lg:text-7xl">
              {tx.ctaTitle}
            </h2>
            <div className="mx-auto h-px w-20 bg-gold-luminous mb-12" />
            <Link href="#event-request" className="btn-cinema">
              {tx.ctaButton}
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
