'use client'

import { useEffect, useRef, useState } from 'react'

export default function CinemaCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const supportsFine = window.matchMedia('(pointer: fine)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsFine || prefersReduced) return
    setEnabled(true)

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    let dotX = window.innerWidth / 2
    let dotY = window.innerHeight / 2
    let ringX = dotX
    let ringY = dotY
    let firstMove = false

    const onMove = (e: PointerEvent) => {
      dotX = e.clientX
      dotY = e.clientY
      dot.style.left = `${dotX}px`
      dot.style.top = `${dotY}px`
      label.style.left = `${dotX}px`
      label.style.top = `${dotY + 40}px`

      if (!firstMove) {
        firstMove = true
        document.documentElement.classList.add('cinema-cursor-active')
        dot.classList.add('is-visible')
        ring.classList.add('is-visible')
      }

      const target = e.target as HTMLElement | null
      if (!target) return
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label'
      )
      const image = target.closest('[data-cinema-view]')

      if (image) {
        ring.classList.add('is-view')
        ring.classList.remove('is-hover')
        const txt = image.getAttribute('data-cinema-view') || 'VIEW'
        label.textContent = txt.toUpperCase()
        label.classList.add('is-visible')
      } else if (interactive) {
        ring.classList.add('is-hover')
        ring.classList.remove('is-view')
        label.classList.remove('is-visible')
      } else {
        ring.classList.remove('is-hover', 'is-view')
        label.classList.remove('is-visible')
      }
    }

    const onLeave = () => {
      dot.classList.remove('is-visible')
      ring.classList.remove('is-visible')
      label.classList.remove('is-visible')
    }
    const onEnter = () => {
      if (firstMove) {
        dot.classList.add('is-visible')
        ring.classList.add('is-visible')
      }
    }
    const onDown = () => {
      ring.style.transform = 'translate(-50%, -50%) scale(0.85)'
    }
    const onUp = () => {
      ring.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    let raf = 0
    const tick = () => {
      ringX += (dotX - ringX) * 0.18
      ringY += (dotY - ringY) * 0.18
      if (ring) {
        ring.style.left = `${ringX}px`
        ring.style.top = `${ringY}px`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      document.documentElement.classList.remove('cinema-cursor-active')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cinema-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cinema-cursor-ring" aria-hidden="true" />
      <div ref={labelRef} className="cinema-cursor-label" aria-hidden="true" />
    </>
  )
}
