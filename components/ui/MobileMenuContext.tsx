'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type MobileMenuContextValue = {
  isOpen: boolean
  setOpen: (open: boolean) => void
}

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null)

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [isOpen])

  const value = useMemo(
    () => ({
      isOpen,
      setOpen: setIsOpen,
    }),
    [isOpen]
  )

  return <MobileMenuContext.Provider value={value}>{children}</MobileMenuContext.Provider>
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext)

  if (!context) {
    throw new Error('useMobileMenu must be used within MobileMenuProvider')
  }

  return context
}
