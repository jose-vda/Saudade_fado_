'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

const SIDE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBXpr4FVQFV9N2TFlKWMsa3dwuTuw8_hp_NMdJbxXt4R6ejDnKoAbyP6V9uMoauYBVMGBHxXOY2zRTmVhq_QBCZ4tjNHIM4noQXAf9p4bIe-CjAMbSx9l_8qNP6MOTmN9Wx9mBzHRZRM0g2vk4NRhvBatMs6pYJ75GMFK66SqU443-KcIgFD6-4dcrbvfBU_eEyDDdxZVMrnBxxCe9NydNviIxRsp-6p4w1Xoyq5I57b_8lvc20xvXZOMFkBoT7zM3jMXFYod_nwUc'

const WEEKDAY_PRICE = 15
const WEEKEND_PRICE = 17

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]
const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

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

function formatDisplayDate(dateStr: string) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d} de ${MONTH_NAMES[parseInt(m) - 1]} de ${y}`
}

function ReservaCalendar({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (date: string) => void
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
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={prevMonth}
          disabled={isPrevDisabled}
          className="w-8 h-8 flex items-center justify-center text-on-surface/40 hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          aria-label="Mês anterior"
        >
          ←
        </button>
        <span className="font-display text-sm font-medium tracking-[0.2em] uppercase text-on-surface">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center text-on-surface/40 hover:text-primary transition-colors"
          aria-label="Próximo mês"
        >
          →
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            className="text-center text-[9px] uppercase tracking-widest font-bold text-on-surface/30 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
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
                className={`text-[9px] leading-none font-semibold tracking-wide ${
                  isSelected
                    ? 'text-white/80'
                    : weekend
                    ? 'text-[#C19A6B]'
                    : 'text-on-surface/40'
                }`}
              >
                {price}€
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-on-surface/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-on-surface/5 border border-on-surface/10" />
          <span className="text-[10px] text-on-surface/40 uppercase tracking-widest">
            Seg–Sex · 15€
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-[#C19A6B]/20" />
          <span className="text-[10px] text-on-surface/40 uppercase tracking-widest">
            Sáb–Dom · 17€
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
  guests: string
  notes: string
}

type Errors = Partial<Record<keyof FormData, string>>

function validate(data: FormData): Errors {
  const errs: Errors = {}
  if (!data.name.trim()) errs.name = 'Nome obrigatório.'
  if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email))
    errs.email = 'E-mail inválido.'
  if (!data.date) errs.date = 'Escolha uma data no calendário.'
  return errs
}

export default function ReservaClient() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2 Pessoas',
    notes: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
    }
  }

  const handleDateSelect = (date: string) => {
    setForm((prev) => ({ ...prev, date }))
    if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  const textFields: {
    id: keyof FormData
    label: string
    type: string
    placeholder?: string
  }[] = [
    { id: 'name', label: 'Nome Completo', type: 'text', placeholder: 'O seu nome' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'exemplo@email.com' },
    { id: 'phone', label: 'Telefone', type: 'tel', placeholder: '+351 000 000 000' },
  ]

  return (
    <main className="min-h-screen flex flex-col md:flex-row pt-24">
      {/* Left — Form */}
      <section className="w-full md:w-[60%] bg-offwhite px-8 md:px-20 lg:px-28 py-16 flex flex-col justify-center">
        <div className="max-w-xl w-full mx-auto md:mx-0">
          <FadeIn>
            <header className="mb-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4 block font-bold">
                A Curated Heritage
              </span>
              <h1 className="text-4xl md:text-5xl font-headline text-on-surface mb-4 leading-tight">
                Sinta o Coração de Lisboa
              </h1>
              <p className="text-on-surface/50 text-sm font-light leading-relaxed max-w-md">
                Reserve o seu lugar numa jornada sensorial onde a voz e a
                guitarra portuguesa se encontram sob a luz das velas.
              </p>
            </header>
          </FadeIn>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">✦</div>
              <h2 className="font-headline text-3xl text-on-surface mb-4">
                Pedido Enviado
              </h2>
              <p className="text-on-surface/55 font-body">
                A nossa equipa entrará em contacto em breve para confirmar a
                disponibilidade.
              </p>
            </motion.div>
          ) : (
            <FadeIn delay={0.1}>
              <form className="space-y-8" onSubmit={handleSubmit} noValidate>

                {/* Calendar */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold block mb-3">
                    Escolha a Data
                  </label>
                  <div className="border border-on-surface/10 rounded-sm p-4 bg-white/40">
                    <ReservaCalendar
                      selected={form.date}
                      onSelect={handleDateSelect}
                    />
                  </div>
                  {form.date && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-primary font-semibold mt-2 tracking-wide"
                    >
                      ✦ {formatDisplayDate(form.date)} · {isWeekend(new Date(form.date + 'T00:00:00')) ? WEEKEND_PRICE : WEEKDAY_PRICE}€ por pessoa
                    </motion.p>
                  )}
                  {errors.date && (
                    <p className="text-red-500 text-[10px] mt-1">{errors.date}</p>
                  )}
                </div>

                {/* Other fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {textFields.map(({ id, label, type, placeholder }) => (
                    <div key={id} className="relative">
                      <label className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold block mb-1">
                        {label}
                      </label>
                      <input
                        id={id}
                        name={id}
                        type={type}
                        value={form[id]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={`w-full bg-transparent border-b py-2 text-on-surface placeholder:text-on-surface/25 focus:outline-none transition-colors duration-300 ${
                          errors[id]
                            ? 'border-red-400 focus:border-red-400'
                            : 'border-outline-variant/50 focus:border-gold'
                        }`}
                      />
                      {errors[id] && (
                        <p className="text-red-500 text-[10px] mt-1 font-label">
                          {errors[id]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="relative">
                    <label className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold block mb-1">
                      Número de Pessoas
                    </label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-outline-variant/50 focus:border-gold py-2 text-on-surface appearance-none focus:outline-none transition-colors duration-300"
                    >
                      {['1 Pessoa', '2 Pessoas', '3 Pessoas', '4 Pessoas', 'Grupo (5+)'].map(
                        (g) => <option key={g}>{g}</option>
                      )}
                    </select>
                  </div>

                  <div className="relative md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold block mb-1">
                      Notas Especiais
                    </label>
                    <input
                      name="notes"
                      type="text"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Preferências ou restrições"
                      className="w-full bg-transparent border-b border-outline-variant/50 focus:border-gold py-2 text-on-surface placeholder:text-on-surface/25 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="w-full py-6 bg-primary-container text-on-primary-container font-bold uppercase tracking-[0.2em] text-xs hover:bg-primary hover:text-white transition-all duration-400 flex items-center justify-center gap-4"
                  >
                    Solicitar Disponibilidade
                    <span>→</span>
                  </motion.button>
                </div>
              </form>
            </FadeIn>
          )}

          {/* Trust */}
          <div className="mt-14 pt-10 border-t border-on-surface/10 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold mb-1">
                Política de Dress Code
              </h4>
              <p className="text-xs text-on-surface/70 font-medium">Casual Chic</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-on-surface/40 font-bold mb-1">
                Horário de Chegada
              </h4>
              <p className="text-xs text-on-surface/70 font-medium">Recomendado: 20h00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right — Image */}
      <section className="w-full md:w-[40%] relative min-h-[500px] md:min-h-0 bg-stone-900">
        <div className="absolute inset-0">
          <Image
            src={SIDE_IMG}
            alt="Mesa romântica à luz de velas numa casa de fado"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            quality={82}
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
          <div className="max-w-xs">
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-headline italic text-white leading-tight">
              Prepare-se para uma noite de entrega e tradição
            </h2>
            <div className="mt-8 flex justify-center gap-6">
              <span className="text-gold text-2xl">♩</span>
              <span className="text-gold text-2xl">🍷</span>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-12 -left-12 hidden lg:block w-48 h-48 bg-gold/10 backdrop-blur-xl border border-white/5 p-6">
          <p className="text-[10px] text-gold uppercase tracking-widest leading-relaxed">
            O Fado não se explica, sente-se.
          </p>
        </div>
      </section>
    </main>
  )
}
