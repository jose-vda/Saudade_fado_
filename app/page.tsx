'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import Marquee from '@/components/Marquee'
import AnimatedTitle from '@/components/AnimatedTitle'
import GSAPReveal from '@/components/GSAPReveal'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDq2b6eglrrvgkRzrvk15IOvlIPcsut8f4LXZVMNT6qdY2pghtq-PTLZgFWqVhLLMPr-zJOlt5-UOrOXeF6EB8F74425JcsacT5BMNznmvFZlebrn5zV8eCJwi8pGXkqQUiyxZ6w9r42qQZphTDPNCXYZ25H4gjom8BZ3hgow6j520dzKQb94bMwRIF3ahW3rInXsQxHlehmJGXE1sY2mnnj6cyTXS2kVF3-al9MZOYw_xuEBR53SZlMxK9vvVoW-gKEO-ipsqW1RE'
const DINING_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDPg7Bu6e1-FmR-hQedhq9NlxLvdV8n7rZfIhlhggmWbZryOjFJs0zzQzj2Oy4Ln55qIw_2AYUDvK6eZmEfAcZHm7m6_S_Kq84ubqv6I8lRu3TY0_W0kcd-iAs1cQCD6h_Pt_bMGqnIPfvPXSH_EVv6iJEBmFueR-nozPaAcc74WGEXz5Yck-g2PWXTPdgk0I-5Og0_4PXDBRv8WMXrmMZxuMDNpKk3AXZzPj8_niKub-W_GKeORFvKDO76UfU6J6-hvXzsBTCjEMY'
const GUITAR_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA-tVlbwK8U9EbpG4QEuzoriArKDthixOEbMhLz7T3rvw5JMzbc6TKt2T3DMXIhM-gPpDPFwO3TDY3qGebswVEsINSONUCyO7GMSrJYd9NR3KbNcS4yQCNs4bZDt9WVlR0uFtHEBGMWJhUg0cd-db6HyLX5cW1yurs1-7qh0732Xg165qFMuThWd-k2o3OJLK1pchFUqP2AmQcgPwcxoj1dtYgdXEyrTc96YqGIlVqvou9yZK45kT17RYjZZ5snq3gcuP5nltblg7w'
const CONTACT_BG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA7bRSUKRPfbWEP16Ub8WKw3fZnxgt7b6pMLbVjYQrNp3JoKGoSvdRvhLfW-mHW8aJyfVwzTUecv_RpUkRxLjOcfpxCa0hAAw7wlNQIFpbT5e6-TVBHoeRTxdJhnvcHmUrVyNlARsOzhx5lD8DF0BBsiFDGdAKWsFWlc2u7727MM_hBGUIXEaiBjM13i9754z1v7w-lXDZzVfvni7J-tqZrgd-1uoog2yKx73lLHoLH44cMeqX5eQ3BLv6HU7W6uPNqdksvfTp--y0'

const marqueeItems = [
  'Fado',
  'Lisboa',
  'Saudade',
  'Alfama',
  'Guitarra Portuguesa',
  'Herança',
  'Emoção',
  'Arte',
] as const

function Hero() {
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
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden"
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
          className="object-cover grayscale contrast-125 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/25 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/50 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 text-center max-w-5xl px-6"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-label text-[10px] uppercase tracking-[0.3em] text-gold mb-8 block"
        >
          Alfama, Lisboa — Portugal
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight text-shadow-hero text-balance"
        >
          O Fado. A Emoção.
          <br />
          <span className="text-gold italic font-normal">
            A Sua Noite Exclusiva.
          </span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-12 md:mt-14 flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link
            href="/reserva"
            className="border-draw px-10 py-5 text-white font-label uppercase tracking-[0.2em] text-sm hover:text-gold transition-colors duration-500"
          >
            Agendar Experiência
          </Link>
          <Link
            href="/galeria"
            className="font-label text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-400 border-b border-white/30 hover:border-white pb-0.5"
          >
            Ver A Experiência
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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

function MarqueeBand() {
  return (
    <div className="bg-charcoal-deep py-5 overflow-hidden border-y border-gold/20">
      <Marquee items={marqueeItems} speed={40} className="text-white/45" />
    </div>
  )
}

function Essence() {
  return (
    <section className="py-28 md:py-40 bg-surface">
      <div className="max-w-editorial mx-auto px-6 md:px-16 lg:px-48 text-center">
        <FadeIn>
          <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] mb-8 block">
            A Essência
          </span>
        </FadeIn>
        <AnimatedTitle
          text='"Não é apenas música; é o eco de séculos de alma portuguesa, traduzido em silêncio e voz."'
          as="h2"
          className="font-headline text-3xl md:text-5xl text-on-surface leading-snug mb-12 italic text-balance"
          delay={0.1}
        />
        <FadeIn delay={0.2}>
          <div className="w-20 h-px bg-gold mx-auto mb-12" />
          <p className="font-body text-lg text-on-surface/65 leading-relaxed max-w-reading mx-auto text-pretty">
            Nas ruelas de Lisboa, o tempo suspende-se. O Fado é a nossa
            herança imaterial, um diálogo entre a guitarra e o destino. A
            nossa curadoria transporta este património para o século XXI,
            mantendo o rigor do luxo clássico e a profundidade da Saudade.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function Experiences() {
  return (
    <section className="pb-28 md:pb-48 bg-surface overflow-hidden">
      <div className="max-w-editorial mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 items-end mb-24">
          <FadeIn className="col-span-12 md:col-span-7">
            <div className="relative group overflow-hidden shadow-soft-lg">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                className="relative aspect-[4/3]"
              >
                <Image
                  src={DINING_IMG}
                  alt="Jantar privativo à luz de velas numa adega histórica"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[900ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white max-w-sm">
                  <h3 className="font-headline text-3xl mb-2">
                    Jantares Privativos
                  </h3>
                  <p className="font-body text-sm opacity-85 uppercase tracking-widest">
                    A exclusividade do silêncio.
                  </p>
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </motion.div>
            </div>
          </FadeIn>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <GSAPReveal from={{ opacity: 0, x: 60 }} duration={1.1}>
              <h3 className="font-headline text-gold-dark text-6xl mb-6">01</h3>
              <p className="font-body text-on-surface/65 leading-loose">
                Experiências desenhadas à medida, onde a gastronomia de autor e
                o fado se fundem em espaços históricos de acesso restrito.
              </p>
            </GSAPReveal>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-3 mt-12">
            <GSAPReveal from={{ opacity: 0, x: -60 }} duration={1.1}>
              <h3 className="font-headline text-gold-dark text-6xl mb-6">02</h3>
              <p className="font-body text-on-surface/65 leading-loose">
                Workshops de Guitarra Portuguesa conduzidos por mestres,
                revelando os segredos das doze cordas.
              </p>
            </GSAPReveal>
          </div>
          <FadeIn className="col-span-12 md:col-span-8 md:col-start-5">
            <div className="relative group overflow-hidden shadow-soft-lg">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                className="relative aspect-[16/10]"
              >
                <Image
                  src={GUITAR_IMG}
                  alt="Guitarra Portuguesa com entalhes de madeira intrincados"
                  fill
                  sizes="(min-width: 768px) 67vw, 100vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[900ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
                <div className="absolute top-10 right-10 text-white text-right max-w-sm">
                  <h3 className="font-headline text-3xl mb-2">
                    Mestria de Cordas
                  </h3>
                  <p className="font-body text-sm opacity-85 uppercase tracking-widest">
                    A técnica por trás da emoção.
                  </p>
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="relative py-28 md:py-40 bg-charcoal-deep text-white overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <Image
          src={CONTACT_BG}
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/30 via-transparent to-charcoal-deep/70" />

      <div className="max-w-editorial mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <FadeIn direction="left">
            <span className="font-label text-gold uppercase tracking-[0.3em] text-[10px] mb-8 block">
              Contacto
            </span>
            <h2 className="font-headline text-4xl md:text-5xl mb-10 leading-snug text-balance">
              Dê o primeiro passo para uma noite{' '}
              <span className="italic text-gold">inesquecível</span>.
            </h2>
            <p className="font-body text-lg text-white/75 mb-12 leading-relaxed max-w-md font-light">
              A nossa equipa de curadores entrará em contacto para desenhar a
              sua experiência personalizada de Fado.
            </p>
            <dl className="space-y-5">
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="w-1.5 h-1.5 bg-gold rounded-full" />
                <dt className="sr-only">Localização</dt>
                <dd className="font-label text-xs tracking-widest">
                  ALFAMA, LISBOA — PORTUGAL
                </dd>
              </div>
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="w-1.5 h-1.5 bg-gold rounded-full" />
                <dt className="sr-only">Email</dt>
                <dd className="font-label text-xs tracking-widest">
                  <a
                    href="mailto:consultoria@fado.pt"
                    className="hover:text-gold transition-colors"
                  >
                    CONSULTORIA@FADO.PT
                  </a>
                </dd>
              </div>
            </dl>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <form
              className="space-y-10"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Formulário de contacto"
            >
              {[
                { id: 'name', label: 'Nome Completo', type: 'text', autoComplete: 'name' },
                { id: 'email', label: 'Endereço de E-mail', type: 'email', autoComplete: 'email' },
              ].map(({ id, label, type, autoComplete }) => (
                <div key={id} className="relative">
                  <input
                    id={id}
                    name={id}
                    type={type}
                    autoComplete={autoComplete}
                    placeholder=" "
                    className="peer block w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:outline-none focus:border-gold transition-colors duration-500 text-white placeholder-transparent"
                  />
                  <label
                    htmlFor={id}
                    className="peer-float-label absolute top-4 left-0 font-label text-[10px] uppercase tracking-widest text-white/60 transition-all duration-300 pointer-events-none"
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
                  placeholder=" "
                  className="peer block w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:outline-none focus:border-gold transition-colors duration-500 text-white placeholder-transparent resize-none"
                />
                <label
                  htmlFor="message"
                  className="peer-float-label absolute top-4 left-0 font-label text-[10px] uppercase tracking-widest text-white/60 transition-all duration-300 pointer-events-none"
                >
                  A Sua Mensagem
                </label>
              </div>
              <motion.button
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gold text-charcoal-deep py-5 font-label uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-500 shadow-gold"
              >
                Enviar Pedido de Consultoria
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MarqueeBand />
      <Essence />
      <Experiences />
      <Contact />
    </main>
  )
}
