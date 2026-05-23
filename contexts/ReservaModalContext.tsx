'use client'

import { createContext, useCallback, useContext, useState } from 'react'

type ReservaModalContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ReservaModalContext = createContext<ReservaModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function ReservaModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <ReservaModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ReservaModalContext.Provider>
  )
}

export function useReservaModal() {
  return useContext(ReservaModalContext)
}
