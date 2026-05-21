'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'

interface Artist {
  name: string
  role: string
  bio: string
  img: string
  alt: string
}

const artists: readonly Artist[] = [
  {
    name: 'Beatriz Oliveira',
    role: 'Fadista',
    bio: 'Uma voz que espelha as águas profundas do Tejo. Beatriz traz uma gravidade ancestral à sua actuação, uma fadista cuja lamentação captura a essência do pulso nocturno de Lisboa.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRau5OsRBR3SnAxZ7nAEHliry1iTkvdXChyGm8aUsJe-0YGARaWO4bYj01-LRcB46bMhHHdOR9XhyVWrD2KFq9tmFRJSOBt0BvSShjFe0R2PRvy3pZe0KoGmt5AvIuKM5AIkSFppmWOYNxB9MJ3UN3PWxS_IabbgVkO7PWXAY4RxfyB0os1Iq4ZiYjfGEeAHttca4CCGMhedq_KIlSggz1T80M9-oMQGWBSkUWhIY3UZYnhK4DR5gQnZCEzk8qME6vJoGbe9BCvwA',
    alt: 'Retrato dramático a preto e branco de uma fadista',
  },
  {
    name: 'Mestre Ricardo',
    role: 'Guitarra Portuguesa',
    bio: 'Com mais de quatro décadas dedicadas às doze cordas da Guitarra Portuguesa, os dedos de Ricardo tecem histórias de viagens perdidas e amores encontrados.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1u7w1h0XUkb-XMUHX5dxkysVUbStCr3Wszcz8G8fGYEf801_5VPME5Y9vo2O5zjWdrSUSow-VB0vyjb_88abY2wWM_iJGHVQAqlJ6uWYIs92c4cnT_1JgaFpdJ72utfCAu8Xc64OSYaB8uyzvHgU3uCxNpuTj5SQ_LyTViNaTRfzMXZUnA3RpBTu9L4xZeLMX8ZE1XS72cZdqukBoE6f7--T1QcvJgEetnrM-EAFrdqq8Nc3S0I3wbD772A6FiGNz0eJMxTRRgrY',
    alt: 'Mãos de mestre a tocar guitarra portuguesa',
  },
  {
    name: 'Tiago Amaral',
    role: 'Viola de Fado',
    bio: 'O batimento rítmico constante — a "viola de fado". A presença de Tiago é o alicerce sólido sobre o qual as melodias da saudade se constroem.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPcQvFe2iCHEqUdxrR34MdKSXg12SU4xPuhcT08pgd2Wq8u62Nv36leUngekkMNT694szoIoFBaPTVywQqWdxSvuArXPGIw2tPk8BwrhFMDyWjljIHoGCAQuiqx-PwY3rbxCLtgrRJ-OzBoMeOe3RLWMTQgRUGYaBqwChcV71T_q_MDYTSNB6SnomerwZOKK5Y48Ktx2HrfCw_D0PMIlUpv96778lyTyGqZ6fk_Zif77p2sqMMVlhYJy9IbSsi7UmkOUsXNasYjMw',
    alt: 'Guitarrista clássico em estúdio com iluminação dramática',
  },
  {
    name: 'Gonçalo Ramos',
    role: 'Fadista (Barítono)',
    bio: 'Um barítono que ressoa com as calçadas de Alfama. Gonçalo traz uma ternura masculina ao género, estabelecendo a ponte entre a tradição e a sensibilidade contemporânea.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAywpFmzCEyzyXlnus-FpvpfmmWpapoYmN-2QgXfXO5fL9ogzYdLze5HlwAQh8yncpb6-rnNQXr0IeiOx7nYRpPh-Dk3mpVOURs0yZiIFTUEre9FEjlwqunGtfakyBUssfg905eJG-R8ue7R2E8cqLaI11DHcTFQg5sOjLj6QI3AmtxpRywM6K4W-vGv6HLupd_ju9BTixuxkEF4wNIsUIJbywjs3IcL-L6_pnSWOdRScwLxnYbLao1xIVMPJ8RXancl8j_RBNzRx4',
    alt: 'Cantor em silhueta contra um foco de palco',
  },
]

export default function ElencoClient() {
  return (
    <main className="pt-32 pb-20">
      <section className="max-w-editorial mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <FadeIn className="md:col-span-8">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary mb-6 block">
              O Elenco
            </span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-balance">
              As Vozes e as{' '}
              <span className="italic font-normal text-gold">Cordas</span> da Alma
            </h1>
          </FadeIn>
          <FadeIn delay={0.15} className="md:col-start-7 md:col-span-6">
            <p className="text-on-surface-variant text-base leading-relaxed font-light border-l-2 border-gold pl-6 italic max-w-reading">
              O palco do Saudade e Fado não é apenas uma plataforma; é um
              santuário para a alma tradicional. Reunimos as vozes mais
              profundas e os instrumentistas mais habilidosos que carregam o
              peso de séculos em cada vibração.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-editorial mx-auto px-6 md:px-12 space-y-32 md:space-y-40">
        {artists.map((artist, i) => (
          <FadeIn key={artist.name} delay={0.05}>
            <article
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start ${
                i % 2 !== 0 ? 'md:mt-32' : ''
              }`}
            >
              <motion.div
                className={`group overflow-hidden ${
                  i % 2 !== 0 ? 'md:order-2' : ''
                }`}
                whileHover="hovered"
                initial="initial"
              >
                <div className="aspect-[3/4] relative bg-surface-container-low p-4 md:p-6 overflow-hidden shadow-soft">
                  <motion.div
                    variants={{
                      initial: { scale: 1 },
                      hovered: { scale: 1.04 },
                    }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={artist.img}
                      alt={artist.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-on-surface/5" />
                </div>
              </motion.div>

              <div
                className={`max-w-md flex flex-col justify-center ${
                  i % 2 !== 0 ? 'md:order-1' : ''
                }`}
              >
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface/45 mb-3 block">
                  {artist.role}
                </span>
                <h2 className="font-headline text-3xl text-gold mb-5 uppercase tracking-widest">
                  {artist.name}
                </h2>
                <p className="text-on-surface/70 mb-10 font-light leading-relaxed">
                  {artist.bio}
                </p>
                <motion.button
                  type="button"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 group/play w-fit"
                  aria-label={`Ouvir ${artist.name}`}
                >
                  <span
                    aria-hidden="true"
                    className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold transition-all duration-500 group-hover/play:bg-gold group-hover/play:text-white"
                  >
                    ▶
                  </span>
                  <span className="font-label text-xs tracking-widest uppercase text-on-surface">
                    Ouvir a Voz
                  </span>
                </motion.button>
              </div>
            </article>
          </FadeIn>
        ))}
      </section>

      <section className="mt-40 md:mt-60 py-32 md:py-40 bg-surface-container-low">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center px-6">
            <blockquote className="font-headline text-4xl md:text-5xl italic text-on-surface mb-16 leading-tight text-balance">
              &ldquo;O fado não se explica, sente-se.&rdquo;
            </blockquote>
            <Link
              href="/reserva"
              className="inline-block bg-primary text-white px-12 py-5 font-label text-sm tracking-[0.2em] uppercase border border-primary hover:bg-transparent hover:text-primary transition-all duration-500 shadow-soft"
            >
              Reservar uma Noite com estes Artistas
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
