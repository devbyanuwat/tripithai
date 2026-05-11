'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Lazy chunk — never fetched on mobile or when user prefers reduced motion.
const BodhiScene = dynamic(() => import('./BodhiScene').then((m) => m.BodhiScene), {
  ssr: false,
  loading: () => null,
})

export function BodhiHero({ children }: { children: React.ReactNode }) {
  // 3D Canvas is opt-in. Default to a static image so LCP fires fast and
  // TBT stays near zero. Promote to WebGL only on desktop, after the
  // browser is idle, and only when the user hasn't asked for reduced motion.
  const [enable3D, setEnable3D] = useState(false)
  const [sceneVisible, setSceneVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const motionMQ = window.matchMedia('(prefers-reduced-motion: reduce)')
    const widthMQ = window.matchMedia('(min-width: 1024px)')
    if (motionMQ.matches || !widthMQ.matches) return

    type IdleHandle = number
    const idle: (cb: () => void, opts?: { timeout: number }) => IdleHandle =
      typeof window.requestIdleCallback === 'function'
        ? (cb, opts) => window.requestIdleCallback(cb, opts)
        : (cb) => window.setTimeout(cb, 1500)

    const cancel = (id: IdleHandle) => {
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(id)
      } else {
        window.clearTimeout(id)
      }
    }

    // Wait for window load + idle, then mount the Canvas.
    let handle: IdleHandle | null = null
    const onReady = () => {
      handle = idle(() => setEnable3D(true), { timeout: 3000 })
    }
    if (document.readyState === 'complete') {
      onReady()
    } else {
      window.addEventListener('load', onReady, { once: true })
    }

    return () => {
      window.removeEventListener('load', onReady)
      if (handle !== null) cancel(handle)
    }
  }, [])

  // Cross-fade when scene becomes visible.
  function onSceneCreated() {
    requestAnimationFrame(() => setSceneVisible(true))
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-amber-100 shadow-sm"
      style={{ aspectRatio: '16 / 9' }}
    >
      <Image
        src="/hero/bodhi.webp"
        alt="ต้นพระศรีมหาโพธิ์ — TripiThai"
        fill
        priority
        sizes="(min-width: 1024px) 1024px, 100vw"
        className="object-cover"
      />
      {enable3D && (
        <Suspense fallback={null}>
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              sceneVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <BodhiScene onReady={onSceneCreated} />
          </div>
        </Suspense>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/85 via-white/30 to-transparent" />
      <div className="relative z-10 flex h-full items-end px-6 pb-8 sm:px-10 sm:pb-12">
        {children}
      </div>
    </div>
  )
}
