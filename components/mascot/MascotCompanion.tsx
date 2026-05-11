'use client'

import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { X } from 'lucide-react'

const MascotCanvas = dynamic(() => import('./MascotCanvas').then((m) => m.MascotCanvas), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse bg-stone-200/50 rounded-full" />,
})

const DISMISS_KEY = 'tripithai-mascot-dismissed'

export function MascotCompanion() {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === '1')
  }, [])

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, '1')
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-40 w-32 h-32 md:w-40 md:h-40 pointer-events-auto"
      aria-label="ธัมมะ mascot"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute -top-1 -right-1 z-10 w-6 h-6 rounded-full bg-white/90 border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-white shadow-sm flex items-center justify-center transition-colors"
        aria-label="ซ่อน mascot"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <Suspense fallback={<div className="w-full h-full animate-pulse bg-stone-200/50 rounded-full" />}>
        <MascotCanvas />
      </Suspense>
    </div>
  )
}
