'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: Direction
  once?: boolean
  amount?: number
  as?: 'div' | 'section' | 'article' | 'header' | 'footer'
}

const DISTANCE = 32

function offsetFor(direction: Direction) {
  switch (direction) {
    case 'up':
      return { x: 0, y: DISTANCE }
    case 'down':
      return { x: 0, y: -DISTANCE }
    case 'left':
      return { x: -DISTANCE, y: 0 }
    case 'right':
      return { x: DISTANCE, y: 0 }
    default:
      return { x: 0, y: 0 }
  }
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  direction = 'up',
  once = true,
  amount = 0.15,
  as = 'div',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px', amount })
  const prefersReducedMotion = useReducedMotion()

  const offset = offsetFor(direction)

  const variants: Variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: offset.y, x: offset.x },
    visible: { opacity: 1, x: 0, y: 0 },
  }

  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
