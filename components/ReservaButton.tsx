'use client'

import { useReservaModal } from '@/contexts/ReservaModalContext'

type Props = {
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  dataCinemaView?: string
  onBeforeOpen?: () => void
}

export default function ReservaButton({
  children,
  className = 'btn-cinema',
  ariaLabel,
  dataCinemaView,
  onBeforeOpen,
}: Props) {
  const { open } = useReservaModal()
  return (
    <button
      type="button"
      onClick={() => {
        onBeforeOpen?.()
        open()
      }}
      aria-label={ariaLabel}
      data-cinema-view={dataCinemaView}
      className={className}
    >
      {children}
    </button>
  )
}
