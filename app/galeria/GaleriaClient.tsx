'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import YoutubeEmbed from '@/components/YoutubeEmbed'
import ReservaButton from '@/components/ReservaButton'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAPtRu4aOxF8OkkGzvEEMGvifAIOem2xJfZBDcp0c7zQvCYfNUhpi8OkWRkigBN-cTYqAKxfQ2G0BVBkdRhIwLbo2V9QCRvfMj0PLMD22RJOz9Rd56LFaGPv6YC7k3QYFeog0Fz3CPswuzcht45Ud1daP2HZFxc0Z9r9bOxAkaGafNiYDvkIv7R3jobsbW2a4Bj49lkPk6ly19UChk8lyT6CYITfVooHUiR__0jbE5vOBpy6bslxpcZO788lc3QkS2vBSGS0'

const galleryImages = [
  '/images/galeria/pexels-abedalbaset-12491762.jpg',
  '/images/galeria/pexels-alex-dos-santos-305643819-34788370.jpg',
  '/images/galeria/pexels-helenalopes-9124698.jpg',
  '/images/galeria/pexels-juan-manuel-perez-290426532-31517625.jpg',
  '/images/galeria/pexels-konect2-8593889.jpg',
  '/images/galeria/pexels-leonardo-delsabio-2150529415-33731188.jpg',
  '/images/galeria/pexels-leonardo-delsabio-2150529415-33731266.jpg',
  '/images/galeria/pexels-ruha-zaitoun-98933750-34024225.jpg',
  '/images/galeria/pexels-stephanie-vasco-197682735-11514793.jpg',
]

const galleryCategories = ['palco', 'alma', 'mesa', 'palco', 'alma', 'mesa', 'palco', 'alma', 'mesa']
const categoryKeys = ['all', 'palco', 'mesa', 'alma']

export default function GaleriaClient() {
  const { lang } = useLanguage()
  const tx = translations[lang].galeria

  const [activeKey, setActiveKey] = useState('all')

  const galleryItems = tx.items.map((item, i) => ({
    ...item,
    id: i + 1,
    img: galleryImages[i],
    category: galleryCategories[i],
  }))

  const filtered =
    activeKey === 'all'
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeKey)

  return (
    <main className="bg-noir">

      {/* Hero */}
      <section className="relative flex min-h-[52svh] w-full items-center justify-center overflow-hidden bg-noir-deep py-20 pt-28">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt="Guitarra Portuguesa"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
            className="object-cover"
            style={{
              filter: 'grayscale(0.8) sepia(0.18) contrast(1.1) brightness(0.68)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-deep/60 via-transparent to-noir-deep" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)',
            }}
          />
        </div>
        <div className="relative z-10 w-full px-6 text-center">
          <FadeIn>
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous">
                Cap. III · A Reel
              </span>
              <span className="h-px w-10 bg-gold/60" />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="font-headline italic text-3xl sm:text-4xl md:text-5xl leading-snug tracking-tight text-cream text-shadow-cinema text-balance">
              {tx.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-gold-luminous font-label uppercase tracking-[0.4em] text-[10px] mt-6">
              {tx.heroSub}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Documentary — primeiro conteúdo, mais engajamento */}
      <section className="bg-noir-deep py-16 md:py-20 px-6 md:px-12 border-t border-gold/15">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-gold-luminous">
                Featurette
              </span>
              <div className="h-px flex-1 bg-gold/15" />
              <h2 className="font-headline italic text-lg md:text-2xl text-cream">
                {tx.docTitle}
              </h2>
            </div>
            <div className="relative border border-gold/20">
              <div className="relative w-full aspect-video overflow-hidden">
                <YoutubeEmbed
                  videoId="93fmKniPP8k"
                  startTime={657}
                  title={tx.docFrameTitle}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Como é a nossa noite */}
      <section className="bg-noir py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-5 mb-10">
              <span className="h-px flex-1 bg-gold/20" />
              <span className="font-label text-[10px] uppercase tracking-[0.5em] text-gold-luminous shrink-0">
                Cap. IV · A Noite
              </span>
              <span className="h-px flex-1 bg-gold/20" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-headline italic text-2xl sm:text-3xl md:text-4xl text-cream text-center mb-8 leading-snug">
              {tx.noiteTitle}
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="font-body text-sm sm:text-base leading-relaxed text-cream/60 font-light text-center max-w-2xl mx-auto">
              {tx.noiteBody}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12 grid grid-cols-3 divide-x divide-gold/15 border border-gold/15">
              {tx.noiteDetails.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center gap-2 py-6 px-4 text-center">
                  <span className="font-label text-[9px] uppercase tracking-[0.4em] text-gold-luminous/70">
                    {label}
                  </span>
                  <span className="font-headline italic text-base sm:text-lg text-cream">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery — fotos compactas */}
      <div className="bg-noir text-cream pt-16 pb-24">
        <FadeIn>
          <div className="mx-auto mb-10 flex max-w-editorial flex-wrap justify-center gap-x-6 gap-y-3 px-6 md:px-12">
            {tx.categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveKey(categoryKeys[i])}
                className={`font-label text-[11px] uppercase tracking-[0.28em] pb-2 transition-colors duration-400 relative ${
                  activeKey === categoryKeys[i]
                    ? 'text-gold-luminous'
                    : 'text-cream/55 hover:text-cream'
                }`}
              >
                {cat}
                <span
                  className={`absolute -bottom-px left-0 right-0 h-px bg-gold-luminous transition-transform duration-500 ${
                    activeKey === categoryKeys[i] ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey + lang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            >
              {filtered.map((item, idx) => (
                <GalleryCard key={item.id} item={item} index={idx + 1} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-noir-deep py-20 md:py-28 px-6 border-t border-gold/15">
        <FadeIn>
          <div className="max-w-editorial mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-gold-luminous mb-4 block">
                Próxima Cena
              </span>
              <h2 className="mb-6 font-headline italic text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl text-cream">
                {tx.ctaTitle}
              </h2>
              <p className="font-body text-cream/60 text-base font-light leading-relaxed">{tx.ctaBody}</p>
            </div>
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-3 translate-x-1 translate-y-1 border border-gold/30 sm:-inset-4 sm:translate-x-2 sm:translate-y-2" />
              <ReservaButton className="btn-cinema relative">
                {tx.ctaButton}
              </ReservaButton>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}

function GalleryCard({
  item,
  index,
}: {
  item: { id: number; img: string; alt: string; label: string; title: string }
  index: number
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden group bg-noir-ember aspect-[3/4]"
      data-cinema-view="view"
    >
      <Image
        src={item.img}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover duotone-noir group-hover:scale-105 transition-transform duration-1000 ease-cinema"
      />
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 pointer-events-none">
        <span className="font-headline italic text-[10px] text-gold-luminous/80">
          {String(index).padStart(3, '0')}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-noir-deep/90 via-noir-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="font-label text-[9px] tracking-[0.22em] uppercase text-gold-luminous mb-0.5">
          {item.label}
        </p>
        <p className="font-headline italic text-sm text-cream leading-tight">{item.title}</p>
      </div>
      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/35 transition-colors duration-500" />
    </motion.div>
  )
}
