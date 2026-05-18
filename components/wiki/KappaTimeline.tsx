'use client'

import { useEffect, useState } from 'react'

type LayerKey = 'maha' | 'asankheyya' | 'antara'

const ASANKHEYYA_BLOCKS = ['อสงไขยกัป ๑', 'อสงไขยกัป ๒', 'อสงไขยกัป ๓', 'อสงไขยกัป ๔'] as const

const ANTARA_BLOCKS = Array.from({ length: 20 }, (_, index) => `อันตรกัป ${index + 1}`)

export function KappaTimeline() {
  const [activeLayer, setActiveLayer] = useState<LayerKey>('maha')
  const [hoveredLayer, setHoveredLayer] = useState<LayerKey | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches)

    syncPreference()
    mediaQuery.addEventListener('change', syncPreference)
    return () => mediaQuery.removeEventListener('change', syncPreference)
  }, [])

  const highlighted = hoveredLayer ?? activeLayer

  const layerClass = (layer: LayerKey, base: string, active: string) =>
    `${base} ${highlighted === layer ? active : ''}`

  return (
    <figure
      className="kappa-timeline not-prose my-8 rounded-[1.75rem] border border-amber-200/80 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/80 p-4 text-stone-100 shadow-[0_24px_80px_-36px_rgba(120,53,15,0.8)] sm:p-6"
      data-kappa-timeline="nested-kappa"
      id="kappa-timeline"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-200/80">โครงสร้างเวลา</p>
          <h3 className="mt-1 text-lg font-semibold text-amber-50">มหากัป ๑ ประกอบด้วย ๔ อสงไขยกัป และ ๒๐ อันตรกัป</h3>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            onClick={() => setActiveLayer('maha')}
            className={layerClass(
              'maha',
              'rounded-full border px-3 py-1.5 transition-colors',
              'border-amber-300 bg-amber-200/15 text-amber-50'
            )}
          >
            มหากัป
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('asankheyya')}
            className={layerClass(
              'asankheyya',
              'rounded-full border px-3 py-1.5 transition-colors',
              'border-orange-300 bg-orange-200/15 text-orange-50'
            )}
          >
            อสงไขยกัป
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('antara')}
            className={layerClass(
              'antara',
              'rounded-full border px-3 py-1.5 transition-colors',
              'border-stone-200 bg-stone-200/15 text-stone-50'
            )}
          >
            อันตรกัป
          </button>
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_40%),linear-gradient(180deg,rgba(28,25,23,0.96),rgba(12,10,9,0.98))]">
        <svg
          viewBox="0 0 1600 900"
          className="h-full w-full"
          role="img"
          aria-labelledby="kappa-timeline-title kappa-timeline-desc"
        >
          <title id="kappa-timeline-title">แผนผังเปรียบเทียบมหากัป อสงไขยกัป และอันตรกัป</title>
          <desc id="kappa-timeline-desc">กรอบใหญ่แทนมหากัป ด้านในแบ่งเป็นสี่ส่วนเท่ากันแทนอสงไขยกัป และแบ่งย่อยรวมยี่สิบส่วนแทนอันตรกัป</desc>

          <g
            onMouseEnter={() => setHoveredLayer('maha')}
            onMouseLeave={() => setHoveredLayer(null)}
            onClick={() => setActiveLayer('maha')}
            className="cursor-pointer"
          >
            <rect
              x="40"
              y="40"
              width="1520"
              height="820"
              rx="42"
              fill="rgba(245, 158, 11, 0.08)"
              stroke={highlighted === 'maha' ? '#fcd34d' : '#b45309'}
              strokeWidth={highlighted === 'maha' ? 8 : 4}
              style={{
                transition: prefersReducedMotion ? undefined : 'stroke 220ms ease, stroke-width 220ms ease, fill 220ms ease',
              }}
            />
            <text x="112" y="110" fill="#fde68a" fontSize="34" fontWeight="700">
              มหากัป ๑
            </text>
            <text x="112" y="150" fill="#f5f5f4" fontSize="20">
              วัฏจักรใหญ่ของโลกทั้งระบบ
            </text>
          </g>

          {ASANKHEYYA_BLOCKS.map((label, index) => {
            const x = 120 + index * 340
            return (
              <g
                key={label}
                onMouseEnter={() => setHoveredLayer('asankheyya')}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => setActiveLayer('asankheyya')}
                className="cursor-pointer"
              >
                <rect
                  x={x}
                  y="210"
                  width="280"
                  height="520"
                  rx="28"
                  fill={highlighted === 'asankheyya' ? 'rgba(251, 146, 60, 0.22)' : 'rgba(251, 146, 60, 0.12)'}
                  stroke={highlighted === 'asankheyya' ? '#fdba74' : '#c2410c'}
                  strokeWidth={highlighted === 'asankheyya' ? 6 : 3}
                  style={{
                    transition: prefersReducedMotion ? undefined : 'stroke 220ms ease, stroke-width 220ms ease, fill 220ms ease',
                  }}
                />
                <text x={x + 28} y="254" fill="#ffedd5" fontSize="24" fontWeight="700">
                  {label}
                </text>
                <text x={x + 28} y="286" fill="#fed7aa" fontSize="18">
                  ๕ อันตรกัป
                </text>
              </g>
            )
          })}

          {ANTARA_BLOCKS.map((label, index) => {
            const column = Math.floor(index / 5)
            const row = index % 5
            const x = 150 + column * 340
            const y = 330 + row * 74
            return (
              <g
                key={label}
                onMouseEnter={() => setHoveredLayer('antara')}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => setActiveLayer('antara')}
                className="cursor-pointer"
              >
                <rect
                  x={x}
                  y={y}
                  width="220"
                  height="52"
                  rx="16"
                  fill={highlighted === 'antara' ? 'rgba(231, 229, 228, 0.26)' : 'rgba(120, 113, 108, 0.26)'}
                  stroke={highlighted === 'antara' ? '#fafaf9' : '#a8a29e'}
                  strokeWidth={highlighted === 'antara' ? 3.5 : 2}
                  style={{
                    transition: prefersReducedMotion ? undefined : 'stroke 220ms ease, stroke-width 220ms ease, fill 220ms ease',
                  }}
                />
                <text x={x + 18} y={y + 32} fill="#fafaf9" fontSize="18" fontWeight="600">
                  {label.replace(/[0-9]+$/, String(index + 1).replace(/0/g, '๐').replace(/1/g, '๑').replace(/2/g, '๒').replace(/3/g, '๓').replace(/4/g, '๔').replace(/5/g, '๕').replace(/6/g, '๖').replace(/7/g, '๗').replace(/8/g, '๘').replace(/9/g, '๙'))}
                </text>
              </g>
            )
          })}
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 grid gap-2 border-t border-white/10 bg-stone-950/55 px-4 py-3 text-xs text-stone-200 sm:grid-cols-3 sm:text-sm">
          <p>มหากัป: หน่วยใหญ่สุดของแผนผังนี้</p>
          <p>อสงไขยกัป: ๔ ส่วนภายในมหากัป</p>
          <p>อันตรกัป: ๒๐ ส่วนย่อยสำหรับเทียบโครงสร้าง</p>
        </div>
      </div>

      <figcaption className="mt-4 text-sm leading-relaxed text-stone-300">
        แผนภาพนี้ใช้เพื่อเทียบ “ชั้นของหน่วยเวลา” ว่า ๑ มหากัป ประกอบด้วย ๔ อสงไขยกัป และ ๒๐ อันตรกัป
        สัดส่วนในภาพไม่ใช่มาตราส่วนจริงของเวลา แต่จัดให้เห็นความสัมพันธ์เชิงโครงสร้างได้ชัดบนหน้าจอ
      </figcaption>
    </figure>
  )
}
