'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STORAGE_KEY = 'saudade-fado:ambient-on'
const AUDIO_SRC = '/ambient.mp3'

interface Props {
  variant?: 'light' | 'dark'
}

export default function AmbientAudioToggle({ variant = 'dark' }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [on, setOn] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const audio = new Audio(AUDIO_SRC)
    audio.loop = true
    audio.volume = 0.18
    audio.preload = 'auto'

    const onError = () => setAvailable(false)
    audio.addEventListener('error', onError)
    audioRef.current = audio

    return () => {
      audio.removeEventListener('error', onError)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (on) {
      audio.play().catch(() => setAvailable(false))
    } else {
      audio.pause()
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, on ? '1' : '0')
    } catch {}
  }, [on])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        const target = e.target as HTMLElement | null
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
        setOn((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!available) return null

  const color = variant === 'light' ? 'text-on-surface/70' : 'text-cream/70'
  const hover = variant === 'light' ? 'hover:text-gold' : 'hover:text-gold-luminous'

  return (
    <button
      type="button"
      aria-label={on ? 'Desligar áudio ambiente' : 'Ligar áudio ambiente'}
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      title="Áudio ambiente (M)"
      className={`group relative flex h-9 w-9 items-center justify-center transition-colors duration-400 ${color} ${hover}`}
    >
      <span className="absolute inset-0 rounded-full border border-current opacity-25 transition-opacity duration-400 group-hover:opacity-70" />
      {on ? (
        <motion.svg
          key="on"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </motion.svg>
      ) : (
        <motion.svg
          key="off"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
          <line x1="3" y1="3" x2="21" y2="21" strokeWidth="1.2" />
        </motion.svg>
      )}
      {on && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.55, 0.2, 0.55], scale: [1, 1.25, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-1 rounded-full border border-gold-luminous/40"
        />
      )}
    </button>
  )
}
