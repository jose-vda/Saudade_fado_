import type { CSSProperties } from 'react'

interface MarqueeProps {
  items: readonly string[]
  speed?: number
  reverse?: boolean
  className?: string
}

export default function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = '',
}: MarqueeProps) {
  const repeated = [...items, ...items]

  const style: CSSProperties = {
    ['--marquee-duration' as string]: `${speed}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
  }

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      aria-hidden="true"
    >
      <div className="inline-flex marquee-track" style={style}>
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-8 px-8 font-label text-[11px] tracking-[0.4em] uppercase"
          >
            {item}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
