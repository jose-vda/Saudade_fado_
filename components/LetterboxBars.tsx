'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface LetterboxBarsProps {
  children: ReactNode
  /** Initial bar height as vh — opens to 0 on scroll */
  startHeight?: number
  className?: string
}

export default function LetterboxBars({
  children,
  startHeight = 7,
  className = '',
}: LetterboxBarsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const barHeight = useTransform(scrollYProgress, [0, 0.6], [`${startHeight}vh`, '0vh'])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.4])

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
      <motion.div
        aria-hidden="true"
        style={{ height: barHeight, opacity }}
        className="pointer-events-none absolute top-0 left-0 right-0 bg-noir-deep z-30"
      />
      <motion.div
        aria-hidden="true"
        style={{ height: barHeight, opacity }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 bg-noir-deep z-30"
      />
    </div>
  )
}
