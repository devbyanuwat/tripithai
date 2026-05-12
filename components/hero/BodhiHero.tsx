'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * Layered 2D parallax hero — no WebGL.
 * Three depth layers that translate at different rates as the cursor moves:
 *   - bg gradient + warm glow (far, slow)
 *   - secondary glow ring   (mid)
 *   - transparent tree PNG  (near, fastest)
 * Mobile + reduced-motion fall back to a static composition.
 */
export function BodhiHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const motionMQ = window.matchMedia('(prefers-reduced-motion: reduce)')
    const widthMQ = window.matchMedia('(min-width: 768px)')
    const update = () => setEnabled(!motionMQ.matches && widthMQ.matches)
    update()
    motionMQ.addEventListener('change', update)
    widthMQ.addEventListener('change', update)
    return () => {
      motionMQ.removeEventListener('change', update)
      widthMQ.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    let raf = 0
    function onMove(e: MouseEvent) {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      // Clamp; getBoundingClientRect can return negatives when off-element.
      const cx = Math.max(-1, Math.min(1, x))
      const cy = Math.max(-1, Math.min(1, y))
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setMouse({ x: cx, y: cy }))
    }
    function onLeave() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setMouse({ x: 0, y: 0 }))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  // Layer translation amounts (px). Background moves least, tree the most.
  const t = enabled ? mouse : { x: 0, y: 0 }
  const bg = `translate3d(${t.x * -6}px, ${t.y * -4}px, 0) scale(1.05)`
  const glow = `translate3d(${t.x * -12}px, ${t.y * -8}px, 0)`
  const tree = `translate3d(${t.x * 18}px, ${t.y * 10}px, 0) scale(1.02)`

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl border border-amber-100 shadow-sm"
      style={{ aspectRatio: '16 / 9' }}
    >
      {/* Layer 1 — base gradient + breathing tint */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: bg,
          background:
            'linear-gradient(180deg, #fef9ef 0%, #fdf5dd 45%, #fbeec3 100%)',
        }}
      />

      {/* Layer 2 — soft glow halo, mid depth */}
      <div
        className="pointer-events-none absolute inset-0 transition-transform duration-400 ease-out"
        style={{
          transform: glow,
          background:
            'radial-gradient(ellipse 70% 65% at 50% 35%, rgba(252, 211, 77, 0.45), rgba(252, 211, 77, 0) 65%)',
        }}
      />

      {/* Layer 3 — tree foreground (transparent PNG) */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: tree }}
      >
        <Image
          src="/hero/bodhi-tree.webp"
          alt="ต้นพระศรีมหาโพธิ์ — TripiThai"
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-contain object-bottom drop-shadow-sm"
        />
      </div>

      {/* Bottom fade for readable hero text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/85 via-white/35 to-transparent" />

      <div className="relative z-10 flex h-full items-end px-6 pb-8 sm:px-10 sm:pb-12">
        {children}
      </div>
    </div>
  )
}
