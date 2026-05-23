'use client'

import { motion } from 'framer-motion'

interface ChapterMarkerProps {
  numeral: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  variant?: 'noir' | 'cream'
  className?: string
}

const CINEMA_EASE = [0.83, 0, 0.17, 1] as const

export default function ChapterMarker({
  numeral,
  title,
  subtitle,
  align = 'left',
  variant = 'noir',
  className = '',
}: ChapterMarkerProps) {
  const alignment =
    align === 'center'
      ? 'items-center text-center'
      : align === 'right'
        ? 'items-end text-right'
        : 'items-start text-left'

  const textColor = variant === 'noir' ? 'text-cream' : 'text-on-surface'
  const muteColor = variant === 'noir' ? 'text-cream-mute' : 'text-on-surface-variant'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: CINEMA_EASE }}
      className={`flex flex-col gap-3 ${alignment} ${className}`}
    >
      <div className={`flex items-center gap-4 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: CINEMA_EASE }}
          className={`h-px w-16 origin-${align === 'right' ? 'right' : 'left'} bg-gold/70`}
          style={{ transformOrigin: align === 'right' ? 'right' : 'left' }}
        />
        <span
          className={`text-chapter text-[11px] uppercase tracking-[0.4em] ${muteColor}`}
        >
          Capítulo {numeral}
        </span>
      </div>
      <h2 className={`font-headline italic text-3xl tracking-tight sm:text-4xl md:text-5xl ${textColor}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`max-w-md font-body text-sm font-light leading-relaxed ${muteColor}`}>
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  )
}
