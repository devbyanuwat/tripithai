'use client'

import { useEffect, useState } from 'react'

type SphereKey = 'buddha' | 'jhana' | 'kamma' | 'world'

type Sphere = {
  key: SphereKey
  title: string
  pali: string
  caption: string
  shortLabel: string
  href?: string
}

const SPHERES: Sphere[] = [
  {
    key: 'buddha',
    title: 'พุทธวิสัย',
    pali: 'buddhavisaya',
    shortLabel: 'พระพุทธญาณ',
    caption: 'เขตแห่งพระพุทธญาณที่ปุถุชนเอาความคิดสามัญไปวัดไม่ถึง',
  },
  {
    key: 'jhana',
    title: 'ฌานวิสัย',
    pali: 'jhānavisaya',
    shortLabel: 'สมาธิ อภิญญา',
    caption: 'ประสบการณ์ของผู้ได้ฌานและอภิญญา ไม่อาจเดาจากภายนอกให้ถูกต้อง',
  },
  {
    key: 'kamma',
    title: 'กรรมวิบาก',
    pali: 'kammavipāka',
    shortLabel: 'ผลกรรมละเอียด',
    caption: 'รู้หลักได้ แต่รายละเอียดว่าใครทำอะไรแล้วออกผลเมื่อไร คิดเอาเองไม่ได้',
    href: '/wiki/suttanta/majjhima/kamma-vibhanga',
  },
  {
    key: 'world',
    title: 'โลกจินตา',
    pali: 'lokacintā',
    shortLabel: 'โลก จักรวาล',
    caption: 'การคาดคั้นเรื่องโลก จักรวาล กัป หรือขอบเขตของภพภูมิ ทำให้หลงจากการปฏิบัติ',
    href: '/wiki/suttanta/anguttara/kappa',
  },
]

const THAI_NUMERALS = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'] as const

function toThaiNumeral(value: number) {
  return String(value).replace(/\d/g, (digit) => THAI_NUMERALS[Number(digit)])
}

function sphereStyle(active: boolean, reducedMotion: boolean) {
  return {
    transition: reducedMotion ? undefined : 'transform 220ms ease, filter 220ms ease, fill 220ms ease, stroke 220ms ease',
    transform: active ? 'translateY(-4px)' : undefined,
    transformOrigin: 'center',
    filter: active ? 'drop-shadow(0 18px 24px rgba(120, 53, 15, 0.28))' : undefined,
  }
}

function auraStyle(active: boolean, reducedMotion: boolean) {
  return {
    transition: reducedMotion ? undefined : 'opacity 220ms ease',
    opacity: active ? 0.95 : 0.45,
  }
}

export function Acinteyya4() {
  const [activeKey, setActiveKey] = useState<SphereKey>('kamma')
  const [hoveredKey, setHoveredKey] = useState<SphereKey | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => setReducedMotion(mediaQuery.matches)

    syncPreference()
    mediaQuery.addEventListener('change', syncPreference)
    return () => mediaQuery.removeEventListener('change', syncPreference)
  }, [])

  const highlightedKey = hoveredKey ?? activeKey
  const activeSphere = SPHERES.find((sphere) => sphere.key === highlightedKey) ?? SPHERES[0]

  const sphereNode = (
    sphere: Sphere,
    x: number,
    y: number,
    index: number
  ) => {
    const active = highlightedKey === sphere.key
    const labelNumber = toThaiNumeral(index + 1)
    const baseGroupProps = {
      onMouseEnter: () => setHoveredKey(sphere.key),
      onMouseLeave: () => setHoveredKey(null),
      onFocus: () => setHoveredKey(sphere.key),
      onBlur: () => setHoveredKey(null),
      className: 'cursor-pointer outline-none',
    }

    const content = (
      <g>
        <ellipse
          cx={x}
          cy={y}
          rx="114"
          ry="92"
          fill={active ? 'rgba(251, 191, 36, 0.26)' : 'rgba(251, 191, 36, 0.12)'}
          stroke={active ? '#fcd34d' : '#d6a43d'}
          strokeWidth={active ? 4 : 2.4}
          style={sphereStyle(active, reducedMotion)}
        />
        <ellipse
          cx={x}
          cy={y}
          rx="128"
          ry="104"
          fill="none"
          stroke="rgba(253, 230, 138, 0.32)"
          strokeWidth="1.5"
          strokeDasharray="6 9"
          style={auraStyle(active, reducedMotion)}
        />
        <text x={x} y={y - 34} textAnchor="middle" fill="#fef3c7" fontSize="17" fontWeight="700">
          {`${labelNumber}. ${sphere.title}`}
        </text>
        <text x={x} y={y - 8} textAnchor="middle" fill="#f5f5f4" fontSize="14" fontStyle="italic">
          {sphere.pali}
        </text>
        <text x={x} y={y + 20} textAnchor="middle" fill="#fcd34d" fontSize="14" fontWeight="600">
          {sphere.shortLabel}
        </text>
        <text x={x} y={y + 46} textAnchor="middle" fill="#d6d3d1" fontSize="12">
          {active ? 'ชี้รายละเอียดด้านล่าง' : 'แตะหรือชี้เพื่ออ่าน'}
        </text>
      </g>
    )

    if (sphere.href) {
      return (
        <a
          key={sphere.key}
          href={sphere.href}
          aria-label={`${sphere.title} ไปยังบทความที่เกี่ยวข้อง`}
          {...baseGroupProps}
        >
          {content}
        </a>
      )
    }

    return (
      <g
        key={sphere.key}
        role="button"
        tabIndex={0}
        aria-label={sphere.title}
        onClick={() => setActiveKey(sphere.key)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setActiveKey(sphere.key)
          }
        }}
        {...baseGroupProps}
      >
        {content}
      </g>
    )
  }

  const mobileNode = (sphere: Sphere, y: number, index: number) => {
    const active = highlightedKey === sphere.key
    const labelNumber = toThaiNumeral(index + 1)
    const commonProps = {
      onMouseEnter: () => setHoveredKey(sphere.key),
      onMouseLeave: () => setHoveredKey(null),
      onFocus: () => setHoveredKey(sphere.key),
      onBlur: () => setHoveredKey(null),
      className: 'cursor-pointer outline-none',
    }

    const content = (
      <g>
        <rect
          x="40"
          y={y}
          width="320"
          height="104"
          rx="26"
          fill={active ? 'rgba(251, 191, 36, 0.24)' : 'rgba(68, 64, 60, 0.76)'}
          stroke={active ? '#fcd34d' : '#bfa26a'}
          strokeWidth={active ? 3.6 : 2}
          style={sphereStyle(active, reducedMotion)}
        />
        <text x="64" y={y + 32} fill="#fef3c7" fontSize="16" fontWeight="700">
          {`${labelNumber}. ${sphere.title}`}
        </text>
        <text x="64" y={y + 54} fill="#fcd34d" fontSize="13" fontStyle="italic">
          {sphere.pali}
        </text>
        <text x="64" y={y + 78} fill="#e7e5e4" fontSize="13">
          {sphere.shortLabel}
        </text>
      </g>
    )

    if (sphere.href) {
      return (
        <a
          key={`${sphere.key}-mobile`}
          href={sphere.href}
          aria-label={`${sphere.title} ไปยังบทความที่เกี่ยวข้อง`}
          {...commonProps}
        >
          {content}
        </a>
      )
    }

    return (
      <g
        key={`${sphere.key}-mobile`}
        role="button"
        tabIndex={0}
        aria-label={sphere.title}
        onClick={() => setActiveKey(sphere.key)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setActiveKey(sphere.key)
          }
        }}
        {...commonProps}
      >
        {content}
      </g>
    )
  }

  return (
    <figure
      className="acinteyya-4 not-prose my-8 rounded-[1.75rem] border border-amber-200/80 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/80 p-4 text-stone-100 shadow-[0_24px_80px_-36px_rgba(120,53,15,0.8)] sm:p-6"
      data-acinteyya="4"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-200/80">อจินไตย ๔</p>
          <h3 className="mt-1 text-lg font-semibold text-amber-50">สิ่งที่ไม่ควรคาดคั้นด้วยความคิดสามัญ</h3>
        </div>
        <div className="max-w-md rounded-2xl border border-amber-200/20 bg-stone-950/35 px-4 py-3 text-sm leading-relaxed text-stone-300">
          <p className="font-medium text-amber-100">{activeSphere.title}</p>
          <p className="mt-1">{activeSphere.caption}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_34%),linear-gradient(180deg,rgba(28,25,23,0.98),rgba(12,10,9,0.99))]">
        <div className="hidden md:block">
          <svg
            viewBox="0 0 960 720"
            className="h-auto w-full"
            role="img"
            aria-labelledby="acinteyya4-title acinteyya4-desc"
          >
            <title id="acinteyya4-title">แผนภาพอจินไตย ๔ พร้อมจุดเชื่อมไปยังบทความที่เกี่ยวข้อง</title>
            <desc id="acinteyya4-desc">วงกลมสี่มุมล้อมแกนกลาง แสดงพุทธวิสัย ฌานวิสัย กรรมวิบาก และโลกจินตา โดยมีเส้นเชื่อมเข้าหาศูนย์กลางที่ย้ำให้กลับมาปฏิบัติแทนการคิดคาดคั้น</desc>

            <defs>
              <linearGradient id="acinteyya-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            <rect x="24" y="24" width="912" height="672" rx="34" fill="rgba(28,25,23,0.35)" stroke="rgba(251,191,36,0.12)" />

            <line x1="280" y1="198" x2="480" y2="360" stroke="url(#acinteyya-line)" strokeWidth="4" strokeLinecap="round" />
            <line x1="680" y1="198" x2="480" y2="360" stroke="url(#acinteyya-line)" strokeWidth="4" strokeLinecap="round" />
            <line x1="280" y1="520" x2="480" y2="360" stroke="url(#acinteyya-line)" strokeWidth="4" strokeLinecap="round" />
            <line x1="680" y1="520" x2="480" y2="360" stroke="url(#acinteyya-line)" strokeWidth="4" strokeLinecap="round" />

            <line x1="280" y1="198" x2="680" y2="198" stroke="rgba(251,191,36,0.22)" strokeWidth="2.4" strokeDasharray="10 10" />
            <line x1="280" y1="520" x2="680" y2="520" stroke="rgba(251,191,36,0.22)" strokeWidth="2.4" strokeDasharray="10 10" />
            <line x1="280" y1="198" x2="280" y2="520" stroke="rgba(251,191,36,0.22)" strokeWidth="2.4" strokeDasharray="10 10" />
            <line x1="680" y1="198" x2="680" y2="520" stroke="rgba(251,191,36,0.22)" strokeWidth="2.4" strokeDasharray="10 10" />

            <g>
              <circle cx="480" cy="360" r="96" fill="rgba(120,53,15,0.68)" stroke="#fcd34d" strokeWidth="4" />
              <circle cx="480" cy="360" r="120" fill="none" stroke="rgba(253,230,138,0.24)" strokeWidth="2" strokeDasharray="12 10" />
              <text x="480" y="340" textAnchor="middle" fill="#fef3c7" fontSize="25" fontWeight="700">
                อริยสัจ ๔
              </text>
              <text x="480" y="370" textAnchor="middle" fill="#fcd34d" fontSize="18" fontWeight="600">
                อย่าคิด → ปฏิบัติแทน
              </text>
              <text x="480" y="398" textAnchor="middle" fill="#e7e5e4" fontSize="13">
                คำถามที่พาออกจากทุกข์สำคัญกว่า
              </text>
            </g>

            {sphereNode(SPHERES[0], 280, 198, 0)}
            {sphereNode(SPHERES[1], 680, 198, 1)}
            {sphereNode(SPHERES[2], 280, 520, 2)}
            {sphereNode(SPHERES[3], 680, 520, 3)}

            <a
              href="/wiki/suttanta/anguttara/niraya"
              aria-label="โลกจินตา ไปยังมหานรก ๘"
              onMouseEnter={() => setHoveredKey('world')}
              onMouseLeave={() => setHoveredKey(null)}
              onFocus={() => setHoveredKey('world')}
              onBlur={() => setHoveredKey(null)}
              className="cursor-pointer outline-none"
            >
              <g>
                <path d="M708 584 C760 610, 804 616, 848 604" fill="none" stroke="rgba(251,191,36,0.56)" strokeWidth="2.4" strokeDasharray="8 8" />
                <rect
                  x="790"
                  y="566"
                  width="104"
                  height="38"
                  rx="16"
                  fill={highlightedKey === 'world' ? 'rgba(217, 119, 6, 0.28)' : 'rgba(68, 64, 60, 0.72)'}
                  stroke={highlightedKey === 'world' ? '#fcd34d' : '#bfa26a'}
                  strokeWidth="2"
                />
                <text x="842" y="590" textAnchor="middle" fill="#fef3c7" fontSize="13" fontWeight="700">
                  มหานรก ๘
                </text>
              </g>
            </a>
          </svg>
        </div>

        <div className="md:hidden">
          <svg
            viewBox="0 0 400 760"
            className="h-auto w-full"
            role="img"
            aria-labelledby="acinteyya4-mobile-title acinteyya4-mobile-desc"
          >
            <title id="acinteyya4-mobile-title">แผนภาพอจินไตย ๔ แบบคอลัมน์เดียว</title>
            <desc id="acinteyya4-mobile-desc">แสดงอจินไตยทั้งสี่แบบเรียงลงมา โดยมีใจกลางของคำสอนให้เลิกคาดคั้นแล้วกลับมาปฏิบัติ</desc>

            <rect x="20" y="20" width="360" height="720" rx="28" fill="rgba(28,25,23,0.34)" stroke="rgba(251,191,36,0.12)" />

            <g>
              <rect x="40" y="36" width="320" height="88" rx="24" fill="rgba(120,53,15,0.7)" stroke="#fcd34d" strokeWidth="3" />
              <text x="200" y="70" textAnchor="middle" fill="#fef3c7" fontSize="20" fontWeight="700">
                อย่าคิด → ปฏิบัติแทน
              </text>
              <text x="200" y="96" textAnchor="middle" fill="#fcd34d" fontSize="14" fontWeight="600">
                กลับมาที่อริยสัจ ๔
              </text>
            </g>

            <line x1="200" y1="124" x2="200" y2="170" stroke="rgba(251,191,36,0.38)" strokeWidth="2.4" strokeDasharray="8 8" />
            <line x1="200" y1="274" x2="200" y2="320" stroke="rgba(251,191,36,0.38)" strokeWidth="2.4" strokeDasharray="8 8" />
            <line x1="200" y1="424" x2="200" y2="470" stroke="rgba(251,191,36,0.38)" strokeWidth="2.4" strokeDasharray="8 8" />
            <line x1="200" y1="574" x2="200" y2="620" stroke="rgba(251,191,36,0.38)" strokeWidth="2.4" strokeDasharray="8 8" />

            {mobileNode(SPHERES[0], 170, 0)}
            {mobileNode(SPHERES[1], 320, 1)}
            {mobileNode(SPHERES[2], 470, 2)}
            {mobileNode(SPHERES[3], 620, 3)}
          </svg>

          <div className="border-t border-white/10 px-4 py-3">
            <a
              href="/wiki/suttanta/anguttara/niraya"
              onMouseEnter={() => setHoveredKey('world')}
              onMouseLeave={() => setHoveredKey(null)}
              onFocus={() => setHoveredKey('world')}
              onBlur={() => setHoveredKey(null)}
              className="inline-flex rounded-full border border-amber-200/40 bg-stone-900/70 px-3 py-1.5 text-sm text-amber-100 transition-colors hover:border-amber-300 hover:bg-amber-900/40"
            >
              โลกจินตา → มหานรก ๘
            </a>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-sm leading-relaxed text-stone-300">
        พระพุทธองค์ห้ามไม่ใช่เพื่อปิดกั้นปัญญา แต่เพื่อรักษาจิตให้ตั้งมั่นในทางพ้นทุกข์
      </figcaption>
    </figure>
  )
}
