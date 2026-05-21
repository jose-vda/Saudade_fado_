'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDO5xZcAN7e2H1y6h2qGogitzPpfAGHGiYrVKuGilOX56F_ZQHZKvEjPBzFeJlGxT3JF4oZFwAOuEYpmFCK-_1dTOz8u0XXx-JbtNC6RWuLE_o02XrzfwGEfsef_pOh0i9sP1ZEhM9yrNwrKPGB1elm9TQ8w4zrDJinDLUSbpopV97nhUJqRBViGLi3lZzle4VDWsx6IjHuiyVyZlherQHnAYnvie6wdsfkv_LpLesjYo8zIqNIO-kGlE4hqoTc7GKOzmP-2DuSviI'
const CORP_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAbfE6soTitkwDkZ-lL-WE0a7wtCjquy8ujqinJSS04DIHrNk-DHsiic8_CWXWDgdo5S6iup8qMy0iB-5v6ZlT9pEzT4P4yK1cRzeP_4jFUF_y2Rb9m365csbAKrkdXMgyeftAanMectgxmIN11j2OhQTcgK_27qDrUAqfDfQ3PiTr4PfJLx3Rf5Vm_QVtAxPmkLTNhOsyDiMZVQlRL9vPvEuAZLdLNHiI0hSXgmFih76j_fJZs6tNVwUrJWHCidDycqmmIxaO9nRA'
const PRIV_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCX7kIagV8fQbRtUJ6BhHHG7O_qTcmlExuKMx3hn6TxN0oqKf9ETcvVGR-1qSqpkaADkT2H_hnALwSKnjAktcgwTMgVwVBpXFIaI53mCxVKnjtvgqlBut0Coc9NZhk8i0kDv1NMT6jbBWj8gRpXCLpanadabOXoWpw1lIJZQSBzvX-9UP-pP8-fM4hNMtB0qKs-EOMVFxhKiy-KBud2urtsX78wJWE34h0jb4iniunsKkvUW6dSkdOb3Y-6Qt5T9axSu002OftSXUI'

const pillars = [
  {
    icon: '🏛',
    title: 'In-House Exclusivo',
    desc: 'Fechamos as nossas portas para o seu grupo. Uma experiência privada com total discrição no coração da tradição.',
  },
  {
    icon: '✈',
    title: 'Fado On-Demand',
    desc: 'Levamos os nossos artistas ao seu hotel, palácio, quinta ou residência privada, transportando a atmosfera de Lisboa.',
  },
  {
    icon: '🎚',
    title: 'Curadoria Técnica',
    desc: 'Tratamos de todo o som, luz e logística para que a sua única preocupação seja sentir a música e honrar os seus convidados.',
  },
]

const differentials = [
  {
    title: 'Fadistas de Renome',
    desc: 'Acesso exclusivo a vozes consagradas e virtuosos da guitarra portuguesa.',
  },
  {
    title: 'Equipamento Invisível',
    desc: 'Tecnologia de som de alta fidelidade integrada discretamente na cenografia.',
  },
  {
    title: 'Gestor Dedicado',
    desc: 'Acompanhamento end-to-end por um especialista em eventos de luxo.',
  },
]

const clients = ['LVMH', 'Four Seasons', 'PwC', 'Cartier', 'EDP']

export default function EventosClient() {
  return (
    <main>
      {/* Hero */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt="Palácio português com tecto dourado e candeeiros"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
            className="object-cover brightness-[0.35]"
          />
        </div>
        <div className="relative z-10 text-center max-w-5xl px-6">
          <FadeIn>
            <span className="font-label text-gold uppercase tracking-[0.3em] text-[10px] mb-6 block">
              Premium Event Solutions
            </span>
            <h1 className="font-headline text-6xl md:text-8xl text-white mb-8 leading-tight">
              Exclusividade Sem Fronteiras
            </h1>
            <p className="font-body text-xl text-white/75 font-light max-w-3xl mx-auto leading-relaxed">
              Leve a alma do fado ao seu evento, onde quer que ele seja.
              Experiências sonoras desenhadas para a elite corporativa e
              momentos privados inesquecíveis.
            </p>
          </FadeIn>
        </div>
      </header>

      {/* Three Pillars */}
      <section className="py-32 px-8 md:px-20 bg-surface">
        <div className="max-w-editorial mx-auto grid md:grid-cols-3 gap-16">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-2xl mb-8">
                  {p.icon}
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
      <section className="py-20 px-8 md:px-20 max-w-editorial mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <FadeIn direction="left" className="w-full md:w-1/2 order-2 md:order-1">
            <div className="p-4 bg-surface-container-high inline-block">
              <div className="relative w-full h-[500px] -translate-y-6 translate-x-6 shadow-2xl overflow-hidden">
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
              B2B & Institutional
            </span>
            <h2 className="font-headline text-4xl md:text-5xl leading-tight">
              Corporate Excellence
            </h2>
            <p className="font-body text-lg font-light text-on-surface-variant leading-relaxed">
              Transformamos galas corporativas, conferências internacionais e
              ativações de marca em momentos de profunda ligação cultural. A
              nossa equipa assegura uma integração perfeita com o protocolo da
              sua empresa.
            </p>
            <ul className="space-y-4 font-body font-medium text-sm">
              {['Gala Dinners', 'Brand Activations', 'International Conferences'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-4">
                    <span className="w-2 h-2 bg-gold" />
                    {item.toUpperCase()}
                  </li>
                )
              )}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Private */}
      <section className="py-20 px-8 md:px-20 max-w-editorial mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <FadeIn direction="left" className="w-full md:w-1/2 space-y-8">
            <span className="font-label text-primary text-sm uppercase tracking-widest">
              Personal & Intimate
            </span>
            <h2 className="font-headline text-4xl md:text-5xl leading-tight">
              Private Celebrations
            </h2>
            <p className="font-body text-lg font-light text-on-surface-variant leading-relaxed">
              Para aniversários, casamentos ou reuniões familiares restritas,
              criamos uma atmosfera de intimidade e prestígio. O fado como banda
              sonora das suas memórias mais valiosas.
            </p>
            <ul className="space-y-4 font-body font-medium text-sm">
              {['Luxury Weddings', 'Milestone Birthdays', 'Intimate Family Gatherings'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-4">
                    <span className="w-2 h-2 bg-gold" />
                    {item.toUpperCase()}
                  </li>
                )
              )}
            </ul>
          </FadeIn>
          <FadeIn direction="right" delay={0.1} className="w-full md:w-1/2">
            <div className="p-4 bg-gold/15 inline-block">
              <div className="relative w-full h-[500px] translate-y-6 -translate-x-6 shadow-2xl overflow-hidden">
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
      <section className="bg-primary-container/10 py-32 px-8 md:px-20">
        <div className="max-w-editorial mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="font-headline text-4xl mb-4">
                O Diferencial Cinematic Heritage
              </h2>
              <p className="font-body text-on-surface-variant font-light">
                Detalhes que definem a alta-curadoria.
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-10">
            {differentials.map((d, i) => (
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
      <section className="py-32 px-8 md:px-20 bg-surface">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-24 items-start">
          <FadeIn direction="left">
            <h2 className="font-headline text-4xl md:text-5xl mb-8 leading-tight">
              Inicie o seu Planeamento
            </h2>
            <p className="font-body text-on-surface-variant font-light leading-relaxed mb-10">
              Partilhe connosco a visão do seu evento. A nossa equipa entrará em
              contacto num prazo de 24 horas úteis com uma proposta preliminar
              personalizada.
            </p>
            <div className="space-y-5">
              <div className="flex items-center gap-5">
                <span className="text-primary">📞</span>
                <span className="font-body text-sm">+351 213 456 789</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-primary">✉</span>
                <span className="font-body text-sm">
                  concierge@fadoheritage.pt
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                  Empresa / Organização
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 transition-colors py-3 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                    Tipo de Evento
                  </label>
                  <select className="w-full bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 py-3 outline-none appearance-none">
                    <option>Gala Corporativa</option>
                    <option>Celebração Privada</option>
                    <option>Brand Activation</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    className="w-full bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 py-3 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">
                  Nº de Convidados
                </label>
                <input
                  type="number"
                  className="w-full bg-transparent border-b border-outline-variant focus:border-gold focus:ring-0 py-3 outline-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary text-white py-6 font-label text-xs uppercase tracking-[0.2em] hover:bg-primary-container hover:text-on-primary-container transition-all duration-400"
              >
                Submeter Pedido
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* Trust */}
      <section className="py-24 border-y border-surface-container-high">
        <div className="text-center mb-14">
          <span className="font-label text-xs text-on-surface-variant/50 uppercase tracking-widest">
            Clientes que confiaram em nós
          </span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 px-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          {clients.map((c) => (
            <div
              key={c}
              className="w-24 h-24 rounded-full border border-outline flex items-center justify-center"
            >
              <span className="font-headline text-base italic">{c}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-inverse-surface text-center px-6">
        <FadeIn>
          <h2 className="font-headline text-white text-5xl md:text-7xl mb-12">
            Pronto para elevar o seu evento?
          </h2>
          <Link
            href="/reserva"
            className="inline-block bg-gold text-on-primary-container px-16 py-8 font-label text-sm font-bold tracking-[0.3em] hover:bg-white hover:text-charcoal transition-all duration-400"
          >
            Solicitar Brochura para Eventos
          </Link>
        </FadeIn>
      </section>
    </main>
  )
}
