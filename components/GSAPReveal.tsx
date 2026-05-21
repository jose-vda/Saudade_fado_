'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface GSAPRevealProps {
  children: ReactNode
  className?: string
  from?: gsap.TweenVars
  duration?: number
  delay?: number
}

export default function GSAPReveal({
  children,
  className = '',
  from = { opacity: 0, y: 50 },
  duration = 0.9,
  delay = 0,
}: GSAPRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        el,
        { ...from },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          paused: true,
        }
      )

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => tween.play(),
      })
    }, el)

    return () => ctx.revert()
  }, [from, duration, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
