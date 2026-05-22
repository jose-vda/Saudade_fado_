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
    <main>
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
            className="object-cover brightness-[0.55]"
          />
        </div>
        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
          <FadeIn>
            <span className="font-label text-gold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              {tx.heroLabel}
            </span>
            <h1 className="mb-6 font-headline text-4xl leading-tight text-white sm:text-6xl md:mb-8 md:text-8xl">
              {tx.heroTitle}
            </h1>
            <p className="mx-auto max-w-3xl font-body text-base font-light leading-relaxed text-white/75 sm:text-xl">
              {tx.heroBody}
            </p>
          </FadeIn>
        </div>
      </header>

      {/* Three Pillars */}
      <section className="bg-surface px-6 py-24 md:px-20 md:py-32">
        <div className="max-w-editorial mx-auto grid md:grid-cols-3 gap-16">
          {tx.pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low font-label text-sm text-primary mb-8">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-headline text-2xl font-medium border-l-2 border-gold pl-5">
                  {p.title}
                </h3>
                <p className="font-body text-on-surface-variant font-light leading-relaxed pl-5">
                  {p.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Corporate */}
      <section className="mx-auto max-w-editorial px-6 py-16 md:px-20 md:py-20">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-20">
          <FadeIn direction="left" className="w-full md:w-1/2 order-2 md:order-1">
            <div className="inline-block w-full bg-surface-container-high p-3 sm:p-4">
              <div className="relative h-[360px] w-full overflow-hidden shadow-2xl md:h-[500px] md:-translate-y-6 md:translate-x-6">
                <Image
                  src={CORP_IMG}
                  alt="Gala corporativa com iluminação âmbar elegante"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.1} className="w-full md:w-1/2 order-1 md:order-2 space-y-8">
            <span className="font-label text-primary text-sm uppercase tracking-widest">
              {tx.corpLabel}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl leading-tight">{tx.corpTitle}</h2>
            <p className="font-body text-lg font-light text-on-surface-variant leading-relaxed">
              {tx.corpBody}
            </p>
            <ul className="space-y-4 font-body font-medium text-sm">
              {tx.corpItems.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-gold" />
                  {item.toUpperCase()}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Private */}
      <section className="mx-auto max-w-editorial px-6 py-16 md:px-20 md:py-20">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-20">
          <FadeIn direction="left" className="w-full md:w-1/2 space-y-8">
            <span className="font-label text-primary text-sm uppercase tracking-widest">
              {tx.privLabel}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl leading-tight">{tx.privTitle}</h2>
            <p className="font-body text-lg font-light text-on-surface-variant leading-relaxed">
              {tx.privBody}
            </p>
            <ul className="space-y-4 font-body font-medium text-sm">
              {tx.privItems.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-gold" />
                  {item.toUpperCase()}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn direction="right" delay={0.1} className="w-full md:w-1/2">
            <div className="inline-block w-full bg-gold/15 p-3 sm:p-4">
              <div className="relative h-[360px] w-full overflow-hidden shadow-2xl md:h-[500px] md:translate-y-6 md:-translate-x-6">
                <Image
                  src={PRIV_IMG}
                  alt="Jantar íntimo à luz de velas num pátio"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Differentials */}
      <section className="bg-primary-container/10 px-6 py-24 md:px-20 md:py-32">
        <div className="max-w-editorial mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="font-headline text-4xl mb-4">{tx.diffTitle}</h2>
              <p className="font-body text-on-surface-variant font-light">{tx.diffSub}</p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-10">
            {tx.differentials.map((d, i) => (
              <FadeIn key={d.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white p-12 text-center border-t-4 border-primary"
                >
                  <h4 className="font-label text-xs font-bold text-primary mb-6 uppercase tracking-widest">
                    {d.title}
                  </h4>
                  <p className="font-body text-sm font-light leading-relaxed text-on-surface-variant">
                    {d.desc}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Proposal Form */}
      <section id="event-request" className="bg-surface px-6 py-24 md:px-20 md:py-32">
        <div className="mx-auto grid max-w-5xl items-start gap-16 md:grid-cols-2 md:gap-24">
          <FadeIn direction="left">
            <h2 className="font-headline text-4xl md:text-5xl mb-8 leading-tight">{tx.formTitle}</h2>
            <p className="font-body text-on-surface-variant font-light leading-relaxed mb-10">
              {tx.formBody}
            </p>
            <div className="space-y-5">
              <div className="flex items-center gap-5">
                <span aria-hidden="true" className="font-label text-primary">
                  @
                </span>
                <a
                  href="mailto:eventos@saudadeefado.pt"
                  className="font-body text-sm hover:text-primary"
                >
                  eventos@saudadeefado.pt
                </a>
              </div>
              <div className="flex items-center gap-5">
                <span aria-hidden="true" className="font-label text-primary">
                  PT
                </span>
                <span className="font-body text-sm">Baixa-Chiado, Lisboa</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="event-name"
                    className="font-label text-xs uppercase tracking-wide text-on-surface-variant block mb-2"
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
                    className="w-full bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 transition-colors py-3 outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="event-email"
                    className="font-label text-xs uppercase tracking-wide text-on-surface-variant block mb-2"
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
                    className="w-full bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 transition-colors py-3 outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="event-company"
                  className="font-label text-xs uppercase tracking-wide text-on-surface-variant block mb-2"
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
                  className="w-full bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 transition-colors py-3 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="event-type"
                    className="font-label text-xs uppercase tracking-wide text-on-surface-variant block mb-2"
                  >
                    {tx.formEventType}
                  </label>
                  <select
                    id="event-type"
                    value={form.eventType}
                    onChange={(event) => updateField('eventType', event.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 py-3 outline-none appearance-none"
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
                    className="font-label text-xs uppercase tracking-wide text-on-surface-variant block mb-2"
                  >
                    {tx.formDate}
                  </label>
                  <input
                    id="event-date"
                    type="date"
                    value={form.eventDate}
                    onChange={(event) => updateField('eventDate', event.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 py-3 outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="event-guests"
                  className="font-label text-xs uppercase tracking-wide text-on-surface-variant block mb-2"
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
                  className="w-full bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 py-3 outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="event-message"
                  className="font-label text-xs uppercase tracking-wide text-on-surface-variant block mb-2"
                >
                  {tx.formMessage}
                </label>
                <textarea
                  id="event-message"
                  rows={3}
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full resize-y bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 py-3 outline-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary text-white py-6 font-label text-xs uppercase tracking-[0.2em] hover:bg-primary-container hover:text-on-primary-container transition-all duration-400"
              >
                {status === 'submitting' ? tx.formSending : tx.formSubmit}
              </motion.button>
              <p
                aria-live="polite"
                className={`min-h-6 text-sm ${
                  status === 'success' ? 'text-primary' : 'text-red-700'
                }`}
              >
                {feedback}
              </p>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-outline-variant/20 bg-primary-container/10 px-6 py-24 text-center md:py-40">
        <FadeIn>
          <h2 className="mb-10 font-headline text-4xl text-on-surface md:mb-12 md:text-7xl">
            {tx.ctaTitle}
          </h2>
          <Link
            href="#event-request"
            className="inline-flex max-w-full justify-center bg-gold px-8 py-5 text-center font-label text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container transition-all duration-400 hover:bg-primary hover:text-white sm:px-12 sm:py-6 md:px-16 md:py-8 md:text-sm md:tracking-[0.3em]"
          >
            {tx.ctaButton}
          </Link>
        </FadeIn>
      </section>
    </main>
  )
}
