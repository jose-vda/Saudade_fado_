'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import AnimatedTitle from '@/components/AnimatedTitle'
import GSAPReveal from '@/components/GSAPReveal'

const HERO_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDhkiZ2Mq_DsKIX0CL__jwJlmedw41H9QqylrTz77C8CD9jR32pELY2pXG9O7nGDQ0etiJPzRJv8pNweBUBmK1t5ZoAYXXX_IrpI-QretUhOUCJKX8YjZa1qMW8nZfUwkFI63i8QzVxB1jA-6MRSRpeH_vorfFWCTTFbzRPcHwwqDgtZKGW3R8bXzkDJO7Ldx4UABknDSjLouIqp7SqYInS7QUBgJjzmMdlFXKEGN_khYLX0k1boL8soE3Suw0spD7VJfTALlWfvlw'
const FADOHOUSE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBEvq1iD-X3ygH5-foAlux7fhZ_B9Z9GCoYl4Dtu1u81kG_wOAEMx4PHnClgSA19HExWrY-pRl-MhxbcOgkeZSdqYtQzvilzdEA6egkGEXktcrkDbMblEooQj4rpXOdeIE4-lHVDCUxfRl3jPEfp6iNqikcdERf2sY6RbZYwUUHK4AtMaRj1jkfQgjO_1bTKVy-PGeivkeydB_to3uuz9_G01z6-0KZ4k2phuK2SZ18SOWgo9655Rzy2c4J6fwduSba1jO_HGPBBNo'
const GUITAR_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuARIFpCGK_2gk-ENynXDiYzEhNUZOQ4Sg-mI-b31Nxdm9OYe-FY9xSM9y9zTbPSsZo1IOawkS3-JLz2jk0VKMC489aJDO7RUIOSEtOBA_OPaav1Q_r0QDw4bcXgkQA5-yBbU0i1B6Z1tZu_awb39BpU58aVHhJtfO1wX4EUwG9LF0mGtDUfON0nwTY9xP16AiTqctSDOoV1n8_AzL-sfE7CrhwjTsBzw8LaBAothor7CTXl5MsENygEmibJd121xeGlJIXSHI_QQWQ'
const VIOLA_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuApiPMoR0MGqcsVmqZ2i7Q96pv1AklJ01Vxn_b7z74ApgVeQn6Nu5rVuUeG5wsx55k4-VEWk4qXiEpb1ZHuhafWFijLms8m08cK-jnY_nzn_VwWjSG9sW4pDgN4xz1VwSu1hyHGp-k1s7ORAQCc-O8MbKWzyo6H7MflQ69ipTGPr28KDutyTWlIPd9RiLX-f4k2QGAMyo94fAD_zIEkQISXi9LjrT0QuW4TWF8D3souRqXac250pp2N_2yWSPlTm-acs2U7ZoiCsDI'

const timeline = [
  {
    period: 'Século XIX',
    title: 'As Origens nas Ruelas de Alfama',
    body: 'O fado emerge nos bairros históricos de Lisboa, entre o porto e as tabernas, onde as classes populares expressavam as agruras do dia-a-dia. A mítica Severa torna-se a primeira grande figura icónica.',
  },
  {
    period: '1940 — 1990',
    title: 'A Era de Ouro e Amália Rodrigues',
    body: 'Com a voz de Amália, o Fado internacionaliza-se. A introdução de grandes poetas na composição lírica eleva o género a uma sofisticação literária sem precedentes.',
  },
  {
    period: '2011 — Presente',
    title: 'Património Mundial da UNESCO',
    body: 'O reconhecimento oficial como Património Cultural Imaterial da Humanidade sela o compromisso de Portugal em preservar e celebrar esta arte intemporal para as gerações futuras.',
  },
]

export default function HistoriaClient() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center bg-surface-container-low">
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
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <FadeIn>
            <p className="font-label tracking-[0.3em] uppercase text-xs text-primary mb-6">
              A História do Fado
            </p>
          </FadeIn>
          <AnimatedTitle
            text="O Fado: Um Património da Alma"
            as="h1"
            className="font-headline italic text-5xl md:text-7xl lg:text-9xl text-on-surface leading-none tracking-tighter"
            delay={0.2}
            stagger={0.1}
          />
        </div>
      </section>

      {/* Magazine Content */}
      <section className="py-32 px-8 max-w-editorial mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-1 hidden md:block">
            <div className="w-full h-px bg-outline-variant/30 mt-4" />
          </div>
          <FadeIn className="md:col-span-5">
            <p className="drop-cap text-lg leading-relaxed text-on-surface-variant mb-8">
              Nascido nas entranhas de Lisboa, o Fado é muito mais que uma
              canção; é o suspiro de um povo que encontrou na melancolia a sua
              forma mais pura de expressão. É um diálogo íntimo entre a voz
              humana e o choro das cordas, uma narrativa que atravessa séculos
              de saudade e esperança, ecoando pelas ruelas de Alfama até
              conquistar os palcos mais prestigiados do mundo.
            </p>
            <p className="text-lg leading-relaxed text-on-surface-variant italic border-l-2 border-gold pl-6 py-2">
              A palavra fado vem do latim <em>fatum</em>, que significa
              "destino". É essa aceitação solene da vida, com todas as suas
              sombras e brilhos, que define o género.
            </p>
          </FadeIn>
          <FadeIn delay={0.15} className="md:col-span-5">
            <p className="text-lg leading-relaxed text-on-surface-variant mb-8">
              A sua evolução é uma jornada editorial pela identidade portuguesa.
              Das tavernas frequentadas por marinheiros e figuras boémias do
              século XIX, o Fado transformou-se num símbolo nacional de
              sofisticação e profundidade emocional. Não se ensina; sente-se na
              pele e na alma.
            </p>
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
                  Lisboa, Circa 1920
                </span>
              </div>
            </div>
          </FadeIn>
          <div className="md:col-span-1" />
        </div>
      </section>

      {/* Blockquote */}
      <section className="py-24 bg-white border-y border-outline-variant/10">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <AnimatedTitle
            text='"O Fado não se canta, acontece."'
            as="h2"
            className="font-headline italic text-4xl md:text-7xl text-primary leading-tight"
            stagger={0.07}
          />
          <GSAPReveal from={{ opacity: 0, y: 20 }} delay={0.3}>
            <cite className="block mt-8 font-label tracking-widest uppercase text-sm text-outline not-italic">
              — Adágio Popular
            </cite>
          </GSAPReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-inverse-surface py-32">
        <div className="max-w-editorial mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
          <FadeIn direction="left" className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <h2 className="font-headline text-5xl text-white mb-6">
                Crónica do Destino
              </h2>
              <p className="text-white/80 font-body leading-loose">
                Os marcos que transformaram uma canção marginal no maior tesouro
                imaterial de Portugal.
              </p>
            </div>
          </FadeIn>
          <div className="md:col-span-1" />
          <div className="md:col-span-7 relative">
            <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-primary/30" />
            <div className="space-y-24">
              {timeline.map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="relative pl-10 md:pl-16">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="absolute left-[-4px] md:left-[12px] top-2 w-2.5 h-2.5 bg-gold rounded-full"
                    />
                    <span className="font-label text-gold tracking-widest text-xs uppercase mb-2 block">
                      {item.period}
                    </span>
                    <h3 className="font-headline text-2xl text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed max-w-xl">
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section className="py-32 bg-surface">
        <div className="max-w-editorial mx-auto px-8">
          <FadeIn>
            <h2 className="font-headline text-4xl text-on-surface mb-24 text-center">
              Os Instrumentos
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {[
              {
                img: GUITAR_IMG,
                alt: 'Guitarra Portuguesa com incrustações de madrepérola',
                title: 'Guitarra Portuguesa',
                desc: 'Com a sua forma distintiva de pêra e doze cordas de aço, a guitarra portuguesa é a alma melódica do Fado. O seu som metálico e chorado é responsável pelas ornamentações que pontuam a voz do fadista.',
                offset: false,
              },
              {
                img: VIOLA_IMG,
                alt: 'Viola de nylon encostada a parede de madeira escura',
                title: 'Viola de Fado',
                desc: 'A viola acústica clássica fornece a estrutura rítmica e a base harmónica. É o "chão" sobre o qual a melodia caminha, mantendo o pulso constante que sustenta a narrativa emocional.',
                offset: true,
              },
            ].map((instr) => (
              <FadeIn key={instr.title} delay={instr.offset ? 0.15 : 0}>
                <div
                  className={`group ${instr.offset ? 'md:mt-24' : ''}`}
                >
                  <div className="aspect-square bg-surface-container-high mb-10 overflow-hidden">
                    <Image
                      src={instr.img}
                      alt={instr.alt}
                      width={700}
                      height={700}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-headline text-3xl mb-4 italic">
                    {instr.title}
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed font-body">
                    {instr.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-container/10 py-32 border-t border-outline-variant/20">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-8 text-center">
            <span className="font-label text-primary tracking-[0.4em] uppercase text-xs mb-8 block">
              Uma Experiência Sensorial
            </span>
            <h2 className="font-headline text-5xl md:text-7xl text-on-surface mb-12">
              Sinta esta história ao vivo
            </h2>
            <Link
              href="/reserva"
              className="inline-block bg-primary text-white font-label tracking-widest text-sm py-6 px-12 transition-all duration-400 hover:bg-primary-container hover:text-on-primary-container shadow-2xl"
            >
              Reservar a Minha Mesa
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
