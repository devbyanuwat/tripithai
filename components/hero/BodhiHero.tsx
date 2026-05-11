'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const BodhiScene = dynamic(() => import('./BodhiScene').then((m) => m.BodhiScene), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: 'url(/hero/bodhi.webp)' }}
      aria-hidden="true"
    />
  ),
})

export function BodhiHero({ children }: { children: React.ReactNode }) {
  // Respect reduced motion + skip WebGL when prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl border border-amber-100 shadow-sm"
      style={{ aspectRatio: '16 / 9' }}
    >
      {reducedMotion ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/hero/bodhi.webp)' }}
          aria-hidden="true"
        />
      ) : (
        <Suspense
          fallback={
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/hero/bodhi.webp)' }}
              aria-hidden="true"
            />
          }
        >
          <BodhiScene />
        </Suspense>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/85 via-white/30 to-transparent" />
      <div className="relative z-10 flex h-full items-end px-6 pb-8 sm:px-10 sm:pb-12">
        {children}
      </div>
    </div>
  )
}
