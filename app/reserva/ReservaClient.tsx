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

  const isPrevDisabled =
    year === today.getFullYear() && month === today.getMonth()

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={prevMonth}
          disabled={isPrevDisabled}
          className="w-8 h-8 flex items-center justify-center text-on-surface/40 hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          aria-label={prevLabel}
        >
          ←
        </button>
        <span className="font-display text-sm font-medium tracking-[0.2em] uppercase text-on-surface">
          {monthNames[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center text-on-surface/40 hover:text-primary transition-colors"
          aria-label={nextLabel}
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] uppercase tracking-wide font-bold text-on-surface/45 py-1"
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
                relative flex flex-col items-center justify-center rounded-sm py-1.5 px-0.5
                transition-colors duration-200 select-none
                ${isPast ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'}
                ${isSelected
                  ? 'bg-[#C19A6B] text-white'
                  : weekend && !isPast
                  ? 'bg-[#C19A6B]/10 hover:bg-[#C19A6B]/20'
                  : !isPast
                  ? 'hover:bg-on-surface/5'
                  : ''}
              `}
            >
              {isToday && !isSelected && (
                <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#C19A6B]" />
              )}
              <span
                className={`text-xs font-medium leading-none mb-0.5 ${
                  isSelected ? 'text-white' : 'text-on-surface'
                }`}
              >
                {date.getDate()}
              </span>
              <span
                className={`text-[11px] leading-none font-semibold tracking-wide ${
                  isSelected ? 'text-white/80' : weekend ? 'text-[#C19A6B]' : 'text-on-surface/40'
                }`}
              >
                {price}€
              </span>
            </motion.button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4 pt-4 border-t border-on-surface/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-on-surface/5 border border-on-surface/10" />
          <span className="text-xs text-on-surface/55 uppercase tracking-wide">
            {legendWeekday}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm border border-gold/20 bg-gold/10" />
          <span className="text-xs text-on-surface/55 uppercase tracking-wide">
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

  return (
    <>
    <main className="min-h-screen bg-offwhite pt-24">
      <section className="px-6 py-16 md:px-12 md:py-20">
        <div className="max-w-2xl w-full mx-auto">
          <FadeIn>
            <header className="mb-10">
              <span className="text-xs uppercase tracking-[0.2em] text-primary mb-4 block font-bold">
                {tx.label}
              </span>
              <h1 className="text-4xl md:text-5xl font-headline text-on-surface mb-4 leading-tight">
                {tx.title}
              </h1>
              <p className="text-on-surface/50 text-sm font-light leading-relaxed max-w-md">
                {tx.subtitle}
              </p>
            </header>
          </FadeIn>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">✦</div>
              <h2 className="font-headline text-3xl text-on-surface mb-4">{tx.successTitle}</h2>
              <p className="text-on-surface/55 font-body">{tx.successBody}</p>
            </motion.div>
          ) : (
            <FadeIn delay={0.1}>
              <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                {/* Calendar */}
                <div>
                  <label className="text-xs uppercase tracking-wide text-on-surface/60 font-bold block mb-3">
                    {tx.chooseDate}
                  </label>
                  <div className="border border-on-surface/10 rounded-sm p-4 bg-white/40">
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
                      className="text-[11px] text-primary font-semibold mt-2 tracking-wide"
                    >
                      ✦ {formatDisplayDate(form.date)} ·{' '}
                      {isWeekend(new Date(form.date + 'T00:00:00')) ? WEEKEND_PRICE : WEEKDAY_PRICE}€{' '}
                      {tx.perPerson}
                    </motion.p>
                  )}
                  {errors.date && (
                    <p className="text-red-600 text-xs mt-1">{errors.date}</p>
                  )}
                </div>

                {/* Other fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {textFields.map(({ id, label, type, placeholder }) => (
                    <div key={id} className="relative">
                      <label className="text-xs uppercase tracking-wide text-on-surface/60 font-bold block mb-1">
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
                        className={`w-full bg-transparent border-b py-2 text-on-surface placeholder:text-on-surface/25 focus:outline-none transition-colors duration-300 ${
                          errors[id]
                            ? 'border-red-400 focus:border-red-400'
                            : 'border-outline-variant/50 focus:border-gold'
                        }`}
                      />
                      {errors[id] && (
                        <p className="text-red-600 text-xs mt-1 font-label">{errors[id]}</p>
                      )}
                    </div>
                  ))}

                  <div className="relative">
                    <label className="text-xs uppercase tracking-wide text-on-surface/60 font-bold block mb-1">
                      {tx.guestsLabel}
                    </label>
                    <select
                      value={form.guestsIndex}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, guestsIndex: parseInt(e.target.value) }))
                      }
                      disabled={status === 'submitting'}
                      className="w-full bg-transparent border-b border-outline-variant/50 focus:border-gold py-2 text-on-surface appearance-none focus:outline-none transition-colors duration-300"
                    >
                      {tx.guestOptions.map((opt, i) => (
                        <option key={i} value={i}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative md:col-span-2">
                    <label className="text-xs uppercase tracking-wide text-on-surface/60 font-bold block mb-1">
                      {tx.notesLabel}
                    </label>
                    <input
                      name="notes"
                      type="text"
                      value={form.notes}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      placeholder={tx.notesPlaceholder}
                      className="w-full bg-transparent border-b border-outline-variant/50 focus:border-gold py-2 text-on-surface placeholder:text-on-surface/25 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-6 bg-primary-container text-on-primary-container font-bold uppercase tracking-[0.2em] text-xs hover:bg-primary hover:text-white transition-all duration-400 flex items-center justify-center gap-4"
                  >
                    {status === 'submitting' ? tx.submitSending : tx.submitButton}
                    <span>→</span>
                  </motion.button>
                  {status === 'error' && (
                    <p aria-live="polite" className="mt-4 text-sm text-red-700">
                      {tx.submitError}
                    </p>
                  )}
                </div>
              </form>
            </FadeIn>
          )}

          {/* Trust */}
          <div className="mt-14 pt-10 border-t border-on-surface/10 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs uppercase tracking-wide text-on-surface/55 font-bold mb-1">
                {tx.dresscode}
              </h4>
              <p className="text-xs text-on-surface/70 font-medium">{tx.dresscodeValue}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wide text-on-surface/55 font-bold mb-1">
                {tx.arrival}
              </h4>
              <p className="text-xs text-on-surface/70 font-medium">{tx.arrivalValue}</p>
            </div>
          </div>
        </div>
      </section>

    </main>

    {/* Map — full width */}
    <section className="bg-surface py-12 md:py-16">
      <div className="max-w-editorial mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">
            {tx.venueMapLabel}
          </span>
          <div className="flex-1 h-px bg-on-surface/10" />
        </div>
        <VenueMap
          address={tx.venueAddress}
          directionsLabel={tx.venueDirections}
          transportLabel={tx.venueTransport}
          height="440px"
        />
      </div>
    </section>
  </>
  )
}
