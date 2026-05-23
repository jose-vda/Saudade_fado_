'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import ReservaButton from '@/components/ReservaButton'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const artistImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBRau5OsRBR3SnAxZ7nAEHliry1iTkvdXChyGm8aUsJe-0YGARaWO4bYj01-LRcB46bMhHHdOR9XhyVWrD2KFq9tmFRJSOBt0BvSShjFe0R2PRvy3pZe0KoGmt5AvIuKM5AIkSFppmWOYNxB9MJ3UN3PWxS_IabbgVkO7PWXAY4RxfyB0os1Iq4ZiYjfGEeAHttca4CCGMhedq_KIlSggz1T80M9-oMQGWBSkUWhIY3UZYnhK4DR5gQnZCEzk8qME6vJoGbe9BCvwA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC1u7w1h0XUkb-XMUHX5dxkysVUbStCr3Wszcz8G8fGYEf801_5VPME5Y9vo2O5zjWdrSUSow-VB0vyjb_88abY2wWM_iJGHVQAqlJ6uWYIs92c4cnT_1JgaFpdJ72utfCAu8Xc64OSYaB8uyzvHgU3uCxNpuTj5SQ_LyTViNaTRfzMXZUnA3RpBTu9L4xZeLMX8ZE1XS72cZdqukBoE6f7--T1QcvJgEetnrM-EAFrdqq8Nc3S0I3wbD772A6FiGNz0eJMxTRRgrY',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCPcQvFe2iCHEqUdxrR34MdKSXg12SU4xPuhcT08pgd2Wq8u62Nv36leUngekkMNT694szoIoFBaPTVywQqWdxSvuArXPGIw2tPk8BwrhFMDyWjljIHoGCAQuiqx-PwY3rbxCLtgrRJ-OzBoMeOe3RLWMTQgRUGYaBqwChcV71T_q_MDYTSNB6SnomerwZOKK5Y48Ktx2HrfCw_D0PMIlUpv96778lyTyGqZ6fk_Zif77p2sqMMVlhYJy9IbSsi7UmkOUsXNasYjMw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAywpFmzCEyzyXlnus-FpvpfmmWpapoYmN-2QgXfXO5fL9ogzYdLze5HlwAQh8yncpb6-rnNQXr0IeiOx7nYRpPh-Dk3mpVOURs0yZiIFTUEre9FEjlwqunGtfakyBUssfg905eJG-R8ue7R2E8cqLaI11DHcTFQg5sOjLj6QI3AmtxpRywM6K4W-vGv6HLupd_ju9BTixuxkEF4wNIsUIJbywjs3IcL-L6_pnSWOdRScwLxnYbLao1xIVMPJ8RXancl8j_RBNzRx4',
]

const artistNames = ['Beatriz Oliveira', 'Mestre Ricardo', 'Tiago Amaral', 'Gonçalo Ramos']

export default function ElencoClient() {
  const { lang } = useLanguage()
  const tx = translations[lang].elenco

  const artists = tx.artists.map((a, i) => ({
    ...a,
    name: artistNames[i],
    img: artistImages[i],
  }))

  return (
    <main className="bg-noir pt-32 pb-20">
      {/* Hero — Dramatis Personae */}
      <section className="max-w-editorial mx-auto px-6 md:px-12 mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <FadeIn className="md:col-span-8">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-gold/60" />
              <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous">
                Cap. II · Dramatis Personae
              </span>
            </div>
            <h1 className="font-headline text-3xl sm:text-cinema-sm lg:text-cinema leading-[1.05] tracking-tight text-balance text-cream">
              {tx.title1}{' '}
              <span className="italic font-light text-gold-luminous text-glow-gold">
                {tx.titleEm}
              </span>{' '}
              {tx.title2}
            </h1>
          </FadeIn>
          <FadeIn delay={0.15} className="md:col-start-8 md:col-span-5">
            <p className="font-body text-cream/65 text-base leading-relaxed font-light border-l border-gold/40 pl-6 italic max-w-reading">
              {tx.intro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Artist grid — contact sheet */}
      <section className="max-w-editorial mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gold/15">
          {artists.map((artist, i) => (
            <FadeIn key={artist.name} delay={i * 0.08}>
              <article className="bg-noir p-8 md:p-10 flex flex-col gap-5">
                {/* Image */}
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden bg-noir-ember"
                  whileHover="hovered"
                  initial="initial"
                >
                  {/* Corner ornaments */}
                  <span className="absolute top-2 left-2 z-20 h-4 w-4 border-t border-l border-gold/50 pointer-events-none" />
                  <span className="absolute top-2 right-2 z-20 h-4 w-4 border-t border-r border-gold/50 pointer-events-none" />
                  <span className="absolute bottom-2 left-2 z-20 h-4 w-4 border-b border-l border-gold/50 pointer-events-none" />
                  <span className="absolute bottom-2 right-2 z-20 h-4 w-4 border-b border-r border-gold/50 pointer-events-none" />

                  {/* Scene number */}
                  <span className="absolute top-3 left-4 z-20 font-headline italic text-lg text-cream/40 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <motion.div
                    variants={{
                      initial: { scale: 1 },
                      hovered: { scale: 1.03 },
                    }}
                    transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={artist.img}
                      alt={artist.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover duotone-noir"
                    />
                  </motion.div>
                </motion.div>

                {/* Text */}
                <div className="flex flex-col gap-3">
                  <span className="font-label text-[10px] uppercase tracking-[0.4em] text-gold/70">
                    {artist.role}
                  </span>
                  <h2 className="font-headline italic text-2xl md:text-3xl text-cream tracking-tight">
                    {artist.name}
                  </h2>
                  <div className="h-px w-10 bg-gold-luminous" />
                  <p className="text-cream/60 font-light text-sm leading-relaxed">
                    {artist.bio}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Closing scene — quote */}
      <section className="mt-20 md:mt-28 py-24 md:py-36 bg-noir-deep relative overflow-hidden border-y border-gold/15">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        <FadeIn>
          <div className="relative max-w-4xl mx-auto text-center px-6">
            <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous mb-10 block">
              Closing Lines
            </span>
            <blockquote className="font-headline italic text-3xl md:text-5xl lg:text-6xl text-cream mb-12 leading-tight text-balance">
              &ldquo;{tx.quote.replace(/^"|"$/g, '')}&rdquo;
            </blockquote>
            <div className="mx-auto h-px w-24 bg-gold-luminous mb-12" />
            <ReservaButton>{tx.cta}</ReservaButton>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
