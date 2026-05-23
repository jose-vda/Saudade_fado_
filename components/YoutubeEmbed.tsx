'use client'

import { useState } from 'react'
import Image from 'next/image'

interface YoutubeEmbedProps {
  videoId: string
  startTime?: number
  title: string
}

export default function YoutubeEmbed({ videoId, startTime = 0, title }: YoutubeEmbedProps) {
  const [playing, setPlaying] = useState(false)

  const src = `https://www.youtube.com/embed/${videoId}?start=${startTime}&rel=0&modestbranding=1&autoplay=1`
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  if (playing) {
    return (
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    )
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="absolute inset-0 w-full h-full group"
      aria-label={`Reproduzir: ${title}`}
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 80vw"
        className="object-cover"
        style={{ filter: 'grayscale(0.4) sepia(0.15) brightness(0.75)' }}
      />
      <div className="absolute inset-0 bg-noir-deep/30 group-hover:bg-noir-deep/10 transition-colors duration-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center border border-gold/60 bg-noir-deep/60 transition-all duration-500 group-hover:border-gold-luminous group-hover:bg-noir-deep/80 sm:h-20 sm:w-20">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 translate-x-0.5 fill-gold-luminous">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
