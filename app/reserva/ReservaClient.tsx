'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import VenueMap from '@/components/VenueMap'
import { useLanguage } from '@/contexts/LanguageContext'
import { submitLead } from '@/lib/leads'
import { translations } from '@/lib/translations'

const WEEKDAY_PRICE = 15
const WEEKEND_PRICE = 17

function isWeekend(date: Date) {
  const d = date.getDay()
  return d === 0 || d === 6
}

function toDateString(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function ReservaCalendar({
  selected,
  onSelect,
  monthNames,
  dayNames,
  prevLabel,
  nextLabel,
  legendWeekday,
  legendWeekend,
}: {
  selected: string
  onSelect: (date: string) => void
  monthNames: string[]
  dayNames: string[]
  prevLabel: string
  nextLabel: string
  legendWeekday: string
  legendWeekend: string
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d))
  }
  while (cells.length % 7 !== 0) cells.push(null)

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const isPrevDisabled = year === today.getFullYear() && month === today.getMonth()

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={prevMonth}
          disabled={isPrevDisabled}
          className="w-9 h-9 flex items-center justify-center text-cream/50 hover:text-gold-luminous disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-300"
          aria-label={prevLabel}
        >
          ←
        </button>
        <span className="font-headline italic text-base tracking-[0.2em] uppercase text-cream">
          {monthNames[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-9 h-9 flex items-center justify-center text-cream/50 hover:text-gold-luminous transition-colors duration-300"
          aria-label={nextLabel}
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 mb-3">
        {dayNames.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] uppercase tracking-[0.2em] font-medium text-gold/60 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />

          const dateStr = toDateString(date)
          const isPast = date < today
          const isSelected = dateStr === selected
          const isToday = toDateString(date) === toDateString(today)
          const weekend = isWeekend(date)
          const price = weekend ? WEEKEND_PRICE : WEEKDAY_PRICE

          return (
            <motion.button
              key={dateStr}
              type="button"
              onClick={() => !isPast && onSelect(dateStr)}
              disabled={isPast}
              whileHover={!isPast ? { scale: 1.04 } : {}}
              whileTap={!isPast ? { scale: 0.97 } : {}}
              className={`
                relative flex flex-col items-center justify-center py-2 px-0.5
                transition-colors duration-300 select-none
                ${isPast ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}
                ${isSelected
                  ? 'bg-gold-luminous text-noir-deep'
                  : weekend && !isPast
                    ? 'bg-gold/15 hover:bg-gold/25 text-cream'
                    : !isPast
                      ? 'hover:bg-cream/5 text-cream'
                      : 'text-cream/50'}
              `}
            >
              {isToday && !isSelected && (
                <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-gold-luminous" />
              )}
              <span
                className={`text-sm font-medium leading-none mb-1 ${
                  isSelected ? 'text-noir-deep' : ''
                }`}
              >
                {date.getDate()}
              </span>
              <span
                className={`text-[10px] leading-none font-semibold tracking-wide ${
                  isSelected
                    ? 'text-noir-deep/80'
                    : weekend
                      ? 'text-gold-luminous'
                      : 'text-cream/40'
                }`}
              >
                {price}€
              </span>
            </motion.button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 pt-5 border-t border-cream/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cream/5 border border-cream/10" />
          <span className="text-[10px] text-cream/55 uppercase tracking-[0.2em]">
            {legendWeekday}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-gold/30 bg-gold/15" />
          <span className="text-[10px] text-cream/55 uppercase tracking-[0.2em]">
            {legendWeekend}
          </span>
        </div>
      </div>
    </div>
  )
}

type FormData = {
  name: string
  email: string
  phone: string
  date: string
  guestsIndex: number
  notes: string
}

type Errors = Partial<Record<keyof FormData, string>>

export default function ReservaClient() {
  const { lang } = useLanguage()
  const tx = translations[lang].reserva

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    guestsIndex: 1,
    notes: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    setForm((prev) => ({ ...prev, guestsIndex: 1 }))
  }, [lang])

  function formatDisplayDate(dateStr: string) {
    if (!dateStr) return ''
    const [y, m, d] = dateStr.split('-')
    if (tx.dateFormat === 'en') {
      return `${d} ${tx.monthNames[parseInt(m, 10) - 1]} ${y}`
    }
    return `${d} de ${tx.monthNames[parseInt(m, 10) - 1]} de ${y}`
  }

  function validate(data: FormData): Errors {
    const errs: Errors = {}
    if (!data.name.trim()) errs.name = tx.errName
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) errs.email = tx.errEmail
    if (!data.date) errs.date = tx.errDate
    return errs
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (status === 'error') setStatus('idle')
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleDateSelect = (date: string) => {
    setForm((prev) => ({ ...prev, date }))
    if (status === 'error') setStatus('idle')
    if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('submitting')

    try {
      await submitLead({
        kind: 'reservation',
        lang,
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        guests: tx.guestOptions[form.guestsIndex],
        notes: form.notes,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const textFields: {
    id: keyof Pick<FormData, 'name' | 'email' | 'phone'>
    label: string
    type: string
    placeholder?: string
  }[] = [
    { id: 'name', label: tx.nameLabel, type: 'text', placeholder: tx.namePlaceholder },
    { id: 'email', label: tx.emailLabel, type: 'email', placeholder: tx.emailPlaceholder },
    { id: 'phone', label: tx.phoneLabel, type: 'tel', placeholder: tx.phonePlaceholder },
  ]

  const ticketId = `SF-${Date.now().toString(36).toUpperCase().slice(-6)}`

  return (
    <>
      <main className="min-h-screen bg-noir pt-32 pb-20">
        <section className="px-6 py-12 md:px-12 md:py-16">
          <div className="max-w-2xl w-full mx-auto">
            <FadeIn>
              <header className="mb-12">
                <div className="mb-7 flex items-center gap-4">
                  <span className="h-px w-12 bg-gold/60" />
                  <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous">
                    Cap. VI · A Reserva
                  </span>
                </div>
                <h1 className="font-headline italic text-cream text-4xl md:text-6xl mb-6 leading-[1.05]">
                  {tx.title}
                </h1>
                <div className="h-px w-16 bg-gold-luminous mb-6" />
                <p className="text-cream/55 text-base font-light leading-relaxed max-w-md">
                  {tx.subtitle}
                </p>
              </header>
            </FadeIn>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
                className="relative"
              >
                {/* Vintage cinema ticket */}
                <div className="relative bg-cream text-noir-deep mx-auto max-w-md shadow-cinema">
                  {/* Perforations sides */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-2 flex flex-col gap-1">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <span key={i} className="w-4 h-4 rounded-full bg-noir" />
                    ))}
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 -right-2 flex flex-col gap-1">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <span key={i} className="w-4 h-4 rounded-full bg-noir" />
                    ))}
                  </div>

                  <div className="border-b border-dashed border-noir/30 p-8 text-center">
                    <span className="font-label text-[9px] uppercase tracking-[0.5em] text-gold-dark mb-3 block">
                      Saudade e Fado · Admit One
                    </span>
                    <div className="text-5xl text-gold-dark mb-3">✦</div>
                    <h2 className="font-headline italic text-3xl mb-2">{tx.successTitle}</h2>
                    <p className="text-noir/65 font-light text-sm">{tx.successBody}</p>
                  </div>
                  <div className="grid grid-cols-3 p-6 text-center">
                    <div>
                      <span className="font-label text-[8px] uppercase tracking-[0.3em] text-noir/45 block mb-1">
                        Bilhete
                      </span>
                      <span className="font-headline italic text-lg text-noir">
                        {ticketId}
                      </span>
                    </div>
                    <div className="border-x border-noir/15">
                      <span className="font-label text-[8px] uppercase tracking-[0.3em] text-noir/45 block mb-1">
                        Data
                      </span>
                      <span className="font-headline italic text-lg text-noir">
                        {formatDisplayDate(form.date)}
                      </span>
                    </div>
                    <div>
                      <span className="font-label text-[8px] uppercase tracking-[0.3em] text-noir/45 block mb-1">
                        Lugares
                      </span>
                      <span className="font-headline italic text-lg text-noir">
                        {tx.guestOptions[form.guestsIndex]}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <FadeIn delay={0.1}>
                <form className="space-y-10" onSubmit={handleSubmit} noValidate>
                  {/* Calendar */}
                  <div>
                    <label className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-luminous block mb-4">
                      {tx.chooseDate}
                    </label>
                    <div className="relative border border-gold/20 p-5 bg-noir-ember/60">
                      <span className="absolute top-0 left-0 h-3 w-3 border-t border-l border-gold/60" />
                      <span className="absolute top-0 right-0 h-3 w-3 border-t border-r border-gold/60" />
                      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-gold/60" />
                      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-gold/60" />
                      <ReservaCalendar
                        selected={form.date}
                        onSelect={handleDateSelect}
                        monthNames={tx.monthNames}
                        dayNames={tx.dayNames}
                        prevLabel={tx.prevMonth}
                        nextLabel={tx.nextMonth}
                        legendWeekday={tx.legendWeekday}
                        legendWeekend={tx.legendWeekend}
                      />
                    </div>
                    {form.date && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-gold-luminous font-medium mt-3 tracking-[0.18em] uppercase"
                      >
                        ✦ {formatDisplayDate(form.date)} ·{' '}
                        {isWeekend(new Date(form.date + 'T00:00:00')) ? WEEKEND_PRICE : WEEKDAY_PRICE}€{' '}
                        {tx.perPerson}
                      </motion.p>
                    )}
                    {errors.date && (
                      <p className="text-red-400 text-xs mt-2">{errors.date}</p>
                    )}
                  </div>

                  {/* Other fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    {textFields.map(({ id, label, type, placeholder }) => (
                      <div key={id} className="relative">
                        <label className="font-label text-[10px] uppercase tracking-[0.3em] text-cream/55 block mb-3">
                          {label}
                        </label>
                        <input
                          id={id}
                          name={id}
                          type={type}
                          value={form[id]}
                          onChange={handleChange}
                          disabled={status === 'submitting'}
                          placeholder={placeholder}
                          className={`w-full bg-transparent border-b py-3 text-cream placeholder:text-cream/25 focus:outline-none transition-colors duration-400 ${
                            errors[id]
                              ? 'border-red-400 focus:border-red-400'
                              : 'border-cream/15 focus:border-gold-luminous'
                          }`}
                        />
                        {errors[id] && (
                          <p className="text-red-400 text-xs mt-2 font-label">{errors[id]}</p>
                        )}
                      </div>
                    ))}

                    <div className="relative">
                      <label className="font-label text-[10px] uppercase tracking-[0.3em] text-cream/55 block mb-3">
                        {tx.guestsLabel}
                      </label>
                      <select
                        value={form.guestsIndex}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, guestsIndex: parseInt(e.target.value) }))
                        }
                        disabled={status === 'submitting'}
                        className="w-full bg-noir-deep border-b border-cream/15 focus:border-gold-luminous py-3 text-cream appearance-none focus:outline-none transition-colors duration-400"
                      >
                        {tx.guestOptions.map((opt, i) => (
                          <option key={i} value={i}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative md:col-span-2">
                      <label className="font-label text-[10px] uppercase tracking-[0.3em] text-cream/55 block mb-3">
                        {tx.notesLabel}
                      </label>
                      <input
                        name="notes"
                        type="text"
                        value={form.notes}
                        onChange={handleChange}
                        disabled={status === 'submitting'}
                        placeholder={tx.notesPlaceholder}
                        className="w-full bg-transparent border-b border-cream/15 focus:border-gold-luminous py-3 text-cream placeholder:text-cream/25 focus:outline-none transition-colors duration-400"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-cinema w-full !py-5"
                    >
                      {status === 'submitting' ? tx.submitSending : tx.submitButton}
                      <span className="ml-3">→</span>
                    </motion.button>
                    {status === 'error' && (
                      <p aria-live="polite" className="mt-4 text-sm text-red-400">
                        {tx.submitError}
                      </p>
                    )}
                  </div>
                </form>
              </FadeIn>
            )}

            {/* Trust */}
            <div className="mt-16 pt-10 border-t border-cream/10 grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-luminous mb-2">
                  {tx.dresscode}
                </h4>
                <p className="text-sm text-cream/70 font-light">{tx.dresscodeValue}</p>
              </div>
              <div>
                <h4 className="font-label text-[10px] uppercase tracking-[0.3em] text-gold-luminous mb-2">
                  {tx.arrival}
                </h4>
                <p className="text-sm text-cream/70 font-light">{tx.arrivalValue}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Map — full width */}
      <section className="bg-noir-deep py-16 md:py-20 border-t border-gold/15">
        <div className="max-w-editorial mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-7">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-gold-luminous">
              {tx.venueMapLabel}
            </span>
            <div className="flex-1 h-px bg-cream/10" />
          </div>
          <VenueMap
            address={tx.venueAddress}
            directionsLabel={tx.venueDirections}
            transportLabel={tx.venueTransport}
            height="460px"
          />
        </div>
      </section>
    </>
  )
}
