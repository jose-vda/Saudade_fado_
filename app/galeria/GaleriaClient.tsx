'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import HorizontalGalleryStrip from '@/components/HorizontalGalleryStrip'
import AnimatedTitle from '@/components/AnimatedTitle'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAPtRu4aOxF8OkkGzvEEMGvifAIOem2xJfZBDcp0c7zQvCYfNUhpi8OkWRkigBN-cTYqAKxfQ2G0BVBkdRhIwLbo2V9QCRvfMj0PLMD22RJOz9Rd56LFaGPv6YC7k3QYFeog0Fz3CPswuzcht45Ud1daP2HZFxc0Z9r9bOxAkaGafNiYDvkIv7R3jobsbW2a4Bj49lkPk6ly19UChk8lyT6CYITfVooHUiR__0jbE5vOBpy6bslxpcZO788lc3QkS2vBSGS0'

const galleryImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBzGXkTFa8eFekiiWWyw_XYoL2r2URKrh1E3sDs-YuHOADTfiZss9VwqljUDDWg8FcoqmSmonfRgj3SFrGsUIxDvLpoKyKp0HPbfEfiPT_PB44usyjkKLvibr9kYEJ9qoLj8Ok_CuB042V5N5GAy-dY25yogO_inVDB9Eg7QGAef7L4YtVRyiZ7R1j6GYBAZJeJtYhJ0vXShUR-cctgyZCGGoMvbMhNV-B1EkAV9WAYpTMGFztMsz_cyPPMyTPYHqrY1wnJ4BcZk_k',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBHTlW54EsO00o0HtOV5zmgqVZGAoZJp6079vDJtbGg5VUsaSP8eLNSLhLqvVVYOoGXVjQ5NgT7UjyHVXf9fUmEWQZJngj8co9c4_OCz1aikKGUmjvPFc7QYR0fS6g2dgHtJZUUgA9kTHVDYgpA_5SuniLGqanReNn08ahxP7k5TMei22eBGq07Ayt14b7FfmKzZ44_7lnehEpu_idFIbuh7GwVb8mU549-YPDizSEXgH6G6ElG8u8y4l6OS6t6NgKylHPa8uBQ_ZU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDsnT8UjFyMXN8HiKiAftCpURBK__bq7E2Pw6mSz5HsKZuawlNs1tydiQNAOZzRiGH0Lryu6D4GWrAsQ2I4IBlfBcCkgyVMCnKBwI0oo86QcpFcU6p9ygp3Dt8wHih2OMd3hNDPbfe5mgYqjRJ68cm3wKj9pHCsy0cF7YTdOdZ0VUEfmCqWNqd6XKPjbklfQzjZA3LEdF4m9Sr-_Edow-j9hGSPeJhc61Afu737Fus4vibKkVVZt3keutkJYNnyF-emk3FDtSlqJfo',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBbmOcihgrIwPIYB4t8JjzGV2F7A4q2bRoC04tAF0UqmO5QhZ0VmxQdRtoftpNvq1yYMkj9edz2-48OJZCovHDiTmRliQM6lKhN4H2epQXRg5FsaLbVBc-758UTtw625lbhRn-kiXOTVoLugNhXTtxeANXuNEcNZ3sW-tgSfffsWf1lJzdNEmPjjN8ZC1xcioDnWRrCwbVCB3T5AwjMRScPfRQyZhoUUr0hP1BSXVFKujmGBTZLQkV_lCYLutX6uc7-4DsnEMVDeWI',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCe0l8TwvC1xEIGVvHkSj8eHC-wtaOrnjo0O1e-QS1dxIA4j3Q6VBi6HHj8U1lVt3mgMXM6dhdbVcyssSqO5rY84ezKKkcsKfNbaMuA1pxi63yiovaFWtsBkEGz3rZErPOuL14JXepFgLZY70z5HRG7JDz523titxZyBL8nMpEtzju56idteGcYyqkvt_pzHxlcHzVO_rwVYjwF2Vf3beKw9agff_ETUSgxa30mars5NA7Pohc6dN0-QAecO0LFVBQ7rmknxdGzEJUc',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBsmR4ZcDleFfaolLfOpREVphf3dby5P5V7oNalbFjeGkFzPZ38lZB1JFv27yI880cXX14PDUazKb8rI5V-_diwmssYJ6vkBdBubefiksc1muJBHAEEoBSl1ThD_RcJrlPR1TjhsKZz-pBeUvJKtvoGJ6x_7196VRYnb8NvxSL7KxoJ62BQvplMGDONA6xvX3HCZW7taQUE8fEDFQmk1QIrhXh3p1JgxI_mt_HqYffGPo1UzMN0c4GfpT6DviN1IFJaa7kG6-9S970',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDOCl-flo0VN2t9s7vyjw9foS9LJel1c-NEwTM7dqxziYoU2pZJpweeYTw9kyRdBZxLepv2jD5_k7T_4PWg0KS_gIckjttsOmUpirkkFZfBWnyc42JnqY26Lj72kZ0mdSDy2TnO0mXxdtwB86TQoEnI1il8DHP5yzfG3nPw4QCx3fhuZPXYpx1a88AG3pqobvmjUpYm7WYDyk_HxI8T7ax2yAaUs-FLiP-p8Z--UeSZwgmTte-jwHnH-yYBJjTEIh6wIcN2SqQ5G_M',
]

const galleryAspects = [
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-square',
  'aspect-square',
  'aspect-[2/3]',
  'aspect-square',
]

const galleryCategories = ['palco', 'mesa', 'alma', 'mesa', 'palco', 'alma', 'alma']

const categoryKeys = ['all', 'palco', 'mesa', 'alma']

export default function GaleriaClient() {
  const { lang } = useLanguage()
  const tx = translations[lang].galeria

  const [activeKey, setActiveKey] = useState('all')

  const galleryItems = tx.items.map((item, i) => ({
    ...item,
    id: i + 1,
    img: galleryImages[i],
    aspect: galleryAspects[i],
    category: galleryCategories[i],
  }))

  const filtered =
    activeKey === 'all'
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeKey)

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center bg-black">
        <div className="absolute inset-0 opacity-80">
          <Image
            src={HERO_IMG}
            alt="Guitarra Portuguesa"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        </div>
        <div className="relative z-10 text-center px-6">
          <AnimatedTitle
            text={tx.heroTitle}
            as="h1"
            className="font-headline italic text-5xl md:text-7xl text-white tracking-tight leading-tight"
            delay={0.2}
            stagger={0.09}
          />
          <FadeIn>
            <p className="text-gold font-label uppercase tracking-[0.3em] text-[10px] mt-6">
              {tx.heroSub}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Horizontal Scroll Strip */}
      <HorizontalGalleryStrip
        exploreLabel={tx.scrollHint}
        items={galleryItems.map((g) => ({
          img: g.img,
          alt: g.alt,
          label: g.label,
          title: g.title,
        }))}
      />

      {/* Gallery */}
      <div className="bg-surface text-on-surface pt-20 pb-32">
        {/* Category Filter */}
        <FadeIn>
          <div className="max-w-editorial mx-auto px-8 md:px-12 mb-16 flex flex-wrap gap-8 justify-center">
            {tx.categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveKey(categoryKeys[i])}
                className={`font-label text-[11px] uppercase tracking-[0.2em] pb-1 transition-all duration-300 ${
                  activeKey === categoryKeys[i]
                    ? 'text-primary border-b border-primary'
                    : 'text-on-surface/60 hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Masonry Grid */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey + lang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
            >
              <div className="md:col-span-4 flex flex-col gap-6">
                {filtered.filter((_, i) => i % 3 === 0).map((item) => (
                  <GalleryCard key={item.id} item={item} />
                ))}
              </div>
              <div className="md:col-span-5 flex flex-col gap-6 md:mt-20">
                {filtered.filter((_, i) => i % 3 === 1).map((item) => (
                  <GalleryCard key={item.id} item={item} />
                ))}
              </div>
              <div className="md:col-span-3 flex flex-col gap-6 md:-mt-12">
                {filtered.filter((_, i) => i % 3 === 2).map((item) => (
                  <GalleryCard key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Documentary */}
        <section className="mt-40 px-6 md:px-12 max-w-editorial mx-auto">
          <div className="relative border border-gold/30 p-4 md:p-6">
            <div className="mb-5 flex items-center gap-4">
              <h3 className="font-headline italic text-2xl md:text-4xl text-on-surface">
                {tx.docTitle}
              </h3>
              <div className="h-px flex-1 bg-gold/20" />
            </div>
            <div className="relative w-full aspect-video bg-charcoal-deep overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/93fmKniPP8k?start=657&rel=0&modestbranding=1"
                title={tx.docFrameTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-surface px-6">
        <FadeIn>
          <div className="max-w-editorial mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="font-headline text-4xl md:text-6xl tracking-tight leading-none mb-6">
                {tx.ctaTitle}
              </h2>
              <p className="font-body text-on-surface/60 text-lg">{tx.ctaBody}</p>
            </div>
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-4 border border-gold/20 translate-x-2 translate-y-2" />
              <Link
                href="/reserva"
                className="relative inline-block bg-primary text-white px-12 py-6 font-label text-xs uppercase tracking-[0.3em] hover:bg-primary-container hover:text-on-primary-container transition-all duration-400"
              >
                {tx.ctaButton}
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}

function GalleryCard({
  item,
}: {
  item: { id: number; img: string; alt: string; aspect: string; label: string; title: string }
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden group"
    >
      <div className={`relative ${item.aspect}`}>
        <Image
          src={item.img}
          alt={item.alt}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/85 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
          <p className="font-label text-xs tracking-wide uppercase text-gold">{item.label}</p>
          <p className="font-headline italic text-lg text-white">{item.title}</p>
        </div>
      </div>
    </motion.div>
  )
}
