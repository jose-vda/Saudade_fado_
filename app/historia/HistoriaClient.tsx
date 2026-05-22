'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import AnimatedTitle from '@/components/AnimatedTitle'
import GSAPReveal from '@/components/GSAPReveal'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/translations'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDhkiZ2Mq_DsKIX0CL__jwJlmedw41H9QqylrTz77C8CD9jR32pELY2pXG9O7nGDQ0etiJPzRJv8pNweBUBmK1t5ZoAYXXX_IrpI-QretUhOUCJKX8YjZa1qMW8nZfUwkFI63i8QzVxB1jA-6MRSRpeH_vorfFWCTTFbzRPcHwwqDgtZKGW3R8bXzkDJO7Ldx4UABknDSjLouIqp7SqYInS7QUBgJjzmMdlFXKEGN_khYLX0k1boL8soE3Suw0spD7VJfTALlWfvlw'
const FADOHOUSE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBEvq1iD-X3ygH5-foAlux7fhZ_B9Z9GCoYl4Dtu1u81kG_wOAEMx4PHnClgSA19HExWrY-pRl-MhxbcOgkeZSdqYtQzvilzdEA6egkGEXktcrkDbMblEooQj4rpXOdeIE4-lHVDCUxfRl3jPEfp6iNqikcdERf2sY6RbZYwUUHK4AtMaRj1jkfQgjO_1bTKVy-PGeivkeydB_to3uuz9_G01z6-0KZ4k2phuK2SZ18SOWgo9655Rzy2c4J6fwduSba1jO_HGPBBNo'
const GUITAR_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuARIFpCGK_2gk-ENynXDiYzEhNUZOQ4Sg-mI-b31Nxdm9OYe-FY9xSM9y9zTbPSsZo1IOawkS3-JLz2jk0VKMC489aJDO7RUIOSEtOBA_OPaav1Q_r0QDw4bcXgkQA5-yBbU0i1B6Z1tZu_awb39BpU58aVHhJtfO1wX4EUwG9LF0mGtDUfON0nwTY9xP16AiTqctSDOoV1n8_AzL-sfE7CrhwjTsBzw8LaBAothor7CTXl5MsENygEmibJd121xeGlJIXSHI_QQWQ'
const VIOLA_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuApiPMoR0MGqcsVmqZ2i7Q96pv1AklJ01Vxn_b7z74ApgVeQn6Nu5rVuUeG5wsx55k4-VEWk4qXiEpb1ZHuhafWFijLms8m08cK-jnY_nzn_VwWjSG9sW4pDgN4xz1VwSu1hyHGp-k1s7ORAQCc-O8MbKWzyo6H7MflQ69ipTGPr28KDutyTWlIPd9RiLX-f4k2QGAMyo94fAD_zIEkQISXi9LjrT0QuW4TWF8D3souRqXac250pp2N_2yWSPlTm-acs2U7ZoiCsDI'

const instrumentImages = [GUITAR_IMG, VIOLA_IMG]

export default function HistoriaClient() {
  const { lang } = useLanguage()
  const tx = translations[lang].historia

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[72svh] w-full items-center justify-center overflow-hidden bg-surface-container-low py-24 md:min-h-[80vh]">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt="Guitarra Portuguesa em estilo cinemático"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={85}
            className="object-cover grayscale opacity-35 mix-blend-multiply"
          />
        </div>
        <div className="relative z-10 w-full max-w-5xl px-6 text-center">
          <FadeIn>
            <p className="font-label tracking-[0.3em] uppercase text-xs text-primary mb-6">
              {tx.label}
            </p>
          </FadeIn>
          <AnimatedTitle
            text={tx.heroTitle}
            as="h1"
            className="font-headline italic text-4xl leading-[1.05] tracking-tight text-on-surface sm:text-5xl md:text-7xl lg:text-9xl lg:tracking-tighter"
            delay={0.2}
            stagger={0.1}
          />
        </div>
      </section>

      {/* Magazine Content */}
      <section className="mx-auto max-w-editorial px-6 py-24 md:px-8 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-1 hidden md:block">
            <div className="w-full h-px bg-outline-variant/30 mt-4" />
          </div>
          <FadeIn className="md:col-span-5">
            <p className="drop-cap text-lg leading-relaxed text-on-surface-variant mb-8">
              {tx.body1}
            </p>
            <p className="text-lg leading-relaxed text-on-surface-variant italic border-l-2 border-gold pl-6 py-2">
              {tx.body2}
            </p>
          </FadeIn>
          <FadeIn delay={0.15} className="md:col-span-5">
            <p className="text-lg leading-relaxed text-on-surface-variant mb-8">{tx.body3}</p>
            <div className="aspect-[4/5] bg-surface-container-high relative overflow-hidden group">
              <Image
                src={FADOHOUSE_IMG}
                alt="Interior de uma casa de fado vintage em Lisboa"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-5 bg-surface/90 backdrop-blur-sm">
                <span className="font-label text-[10px] tracking-widest uppercase text-outline">
                  {tx.imgCaption}
                </span>
              </div>
            </div>
          </FadeIn>
          <div className="md:col-span-1" />
        </div>
      </section>

      {/* Blockquote */}
      <section className="border-y border-outline-variant/10 bg-white py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
          <AnimatedTitle
            text={tx.quote}
            as="h2"
            className="font-headline italic text-4xl md:text-7xl text-primary leading-tight"
            stagger={0.07}
          />
          <GSAPReveal from={{ opacity: 0, y: 20 }} delay={0.3}>
            <cite className="block mt-8 font-label tracking-widest uppercase text-sm text-outline not-italic">
              {tx.quoteSource}
            </cite>
          </GSAPReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface-container-low py-24 md:py-32">
        <div className="mx-auto grid max-w-editorial grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-8">
          <FadeIn direction="left" className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <h2 className="mb-6 font-headline text-4xl text-on-surface md:text-5xl">
                {tx.timelineTitle}
              </h2>
              <p className="text-on-surface-variant font-body leading-loose">{tx.timelineBody}</p>
            </div>
          </FadeIn>
          <div className="md:col-span-1" />
          <div className="md:col-span-7 relative">
            <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-primary/30" />
            <div className="space-y-24">
              {tx.timeline.map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="relative pl-10 md:pl-16">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="absolute left-[-4px] md:left-[12px] top-2 w-2.5 h-2.5 bg-gold rounded-full"
                    />
                    <span className="font-label text-primary tracking-widest text-xs uppercase mb-2 block">
                      {item.period}
                    </span>
                    <h3 className="font-headline text-2xl text-on-surface mb-4">{item.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed max-w-xl">{item.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section className="bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-editorial px-6 md:px-8">
          <FadeIn>
            <h2 className="mb-16 text-center font-headline text-4xl text-on-surface md:mb-24">
              {tx.instrumentsTitle}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {tx.instruments.map((instr, i) => (
              <FadeIn key={instr.title} delay={i === 1 ? 0.15 : 0}>
                <div className={`group ${i === 1 ? 'md:mt-24' : ''}`}>
                  <div className="aspect-square bg-surface-container-high mb-10 overflow-hidden">
                    <Image
                      src={instrumentImages[i]}
                      alt={instr.alt}
                      width={700}
                      height={700}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-headline text-3xl mb-4 italic">{instr.title}</h4>
                  <p className="text-on-surface-variant leading-relaxed font-body">{instr.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-outline-variant/20 bg-primary-container/10 py-24 md:py-32">
        <FadeIn>
          <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
            <span className="font-label text-primary tracking-[0.4em] uppercase text-xs mb-8 block">
              {tx.ctaLabel}
            </span>
            <h2 className="mb-10 font-headline text-4xl text-on-surface md:mb-12 md:text-7xl">
              {tx.ctaTitle}
            </h2>
            <Link
              href="/reserva"
              className="inline-flex max-w-full justify-center bg-primary px-8 py-5 text-center font-label text-xs tracking-widest text-white shadow-2xl transition-all duration-400 hover:bg-primary-container hover:text-on-primary-container sm:px-12 sm:py-6 sm:text-sm"
            >
              {tx.ctaButton}
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
