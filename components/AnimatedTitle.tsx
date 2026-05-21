'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { createElement, type ElementType } from 'react'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface AnimatedTitleProps {
  text: string
  as?: Tag
  className?: string
  delay?: number
  stagger?: number
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: '90%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
  },
}

export default function AnimatedTitle({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  stagger = 0.07,
}: AnimatedTitleProps) {
  const words = text.split(' ')
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return createElement(as as ElementType, { className }, text)
  }

  const Tag = as as ElementType

  return (
    <motion.div
      className={className}
      variants={{
        ...containerVariants,
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <Tag className="flex flex-wrap gap-x-[0.3em] gap-y-1">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="overflow-hidden inline-block leading-[1.1]">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}
