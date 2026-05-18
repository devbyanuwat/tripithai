'use client'

import { useState } from 'react'

type HellItem = {
  id: string
  label: string
  pali: string
  humanYearsPerDay: number | null
  displayValue: string
  note: string
}

const HELLS: HellItem[] = [
  {
    id: 'sanjiva',
    label: 'สัญชีวนรก',
    pali: 'Sañjīva',
    humanYearsPerDay: 9000000,
    displayValue: '๙,๐๐๐,๐๐๐',
    note: '๑ วันนรก',
  },
  {
    id: 'kalasutta',
    label: 'กาฬสุตตนรก',
    pali: 'Kālasutta',
    humanYearsPerDay: 36000000,
    displayValue: '๓๖,๐๐๐,๐๐๐',
    note: '๑ วันนรก',
  },
  {
    id: 'sanghata',
    label: 'สังฆาฏนรก',
    pali: 'Saṅghāta',
    humanYearsPerDay: 144000000,
    displayValue: '๑๔๔,๐๐๐,๐๐๐',
    note: '๑ วันนรก',
  },
  {
    id: 'roruva',
    label: 'โรรุวนรก',
    pali: 'Roruva',
    humanYearsPerDay: 576000000,
    displayValue: '๕๗๖,๐๐๐,๐๐๐',
    note: '๑ วันนรก',
  },
  {
    id: 'maharoruva',
    label: 'มหาโรรุวนรก',
    pali: 'Mahāroruva',
    humanYearsPerDay: 2304000000,
    displayValue: '๒,๓๐๔,๐๐๐,๐๐๐',
    note: '๑ วันนรก',
  },
  {
    id: 'tapana',
    label: 'ตาปนรก',
    pali: 'Tāpana',
    humanYearsPerDay: 9216000000,
    displayValue: '๙,๒๑๖,๐๐๐,๐๐๐',
    note: '๑ วันนรก',
  },
  {
    id: 'mahatapana',
    label: 'มหาตาปนรก',
    pali: 'Mahātāpana',
    humanYearsPerDay: null,
    displayValue: 'ครึ่งอันตรกัป',
    note: 'ใช้หน่วยกัป',
  },
  {
    id: 'avici',
    label: 'อเวจีนรก',
    pali: 'Avīci',
    humanYearsPerDay: null,
    displayValue: '๑ อันตรกัป',
    note: 'ใช้หน่วยกัป',
  },
]

const NUMERIC_HELLS = HELLS.filter((item) => item.humanYearsPerDay !== null)
const MIN_LOG = Math.log10(NUMERIC_HELLS[0].humanYearsPerDay ?? 1)
const MAX_LOG = Math.log10(NUMERIC_HELLS[NUMERIC_HELLS.length - 1].humanYearsPerDay ?? 1)

function getBarWidth(value: number | null) {
  if (value === null) return 100
  const logValue = Math.log10(value)
  const ratio = (logValue - MIN_LOG) / (MAX_LOG - MIN_LOG)
  return 24 + ratio * 76
}

export function HellTimeline() {
  const [activeId, setActiveId] = useState<string>(HELLS[0].id)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const highlightedId = hoveredId ?? activeId

  return (
    <figure
      className="hell-timeline not-prose my-8 rounded-[1.75rem] border border-amber-200/80 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/75 p-4 text-stone-100 shadow-[0_24px_80px_-36px_rgba(120,53,15,0.8)] sm:p-6"
      data-hell-timeline="log-scale"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-amber-200/80">เวลาในนรก</p>
          <h3 className="mt-1 text-lg font-semibold text-amber-50">ตัวคูณ ๑ วันนรก เทียบกับปีมนุษย์บนสเกลลอการิทึม</h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-stone-300">
          แถบยาวขึ้นตามสเกลลอการิทึมเพื่อให้เห็นการทวีคูณของมหานรก ๖ ชั้นแรก ส่วน ๒ ชั้นท้ายแยกแสดงเป็นหน่วยอันตรกัป
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),linear-gradient(180deg,rgba(28,25,23,0.97),rgba(12,10,9,0.99))]">
        <div className="aspect-[4/3] w-full">
          <svg
            viewBox="0 0 1200 900"
            className="h-full w-full"
            role="img"
            aria-labelledby="hell-timeline-title hell-timeline-desc"
          >
            <title id="hell-timeline-title">แผนภาพเวลาในมหานรก ๘ เทียบกับปีมนุษย์</title>
            <desc id="hell-timeline-desc">มหานรก ๖ ชั้นแรกแสดงด้วยแถบความยาวตามสเกลลอการิทึม ส่วนมหาตาปนรกและอเวจีนรกแสดงเป็นหน่วยอันตรกัปนอกสเกลตัวเลข</desc>

            <rect x="48" y="48" width="1104" height="804" rx="34" fill="rgba(28,25,23,0.58)" stroke="rgba(251,191,36,0.18)" />

            <text x="84" y="104" fill="#fde68a" fontSize="28" fontWeight="700">
              ๑ วันนรก = ปีมนุษย์
            </text>
            <text x="84" y="136" fill="#d6d3d1" fontSize="16">
              ชั้นที่ ๑-๖ ใช้สเกลลอการิทึม ส่วนชั้นที่ ๗-๘ ใช้หน่วยอันตรกัปตามวิสุทธิมรรค
            </text>

            <line x1="360" y1="180" x2="1040" y2="180" stroke="rgba(245,158,11,0.35)" strokeDasharray="8 8" />
            <text x="360" y="170" fill="#fde68a" fontSize="14">
              ๙ ล้านปี
            </text>
            <text x="660" y="170" fill="#fde68a" fontSize="14">
              ๕๗๖ ล้านปี
            </text>
            <text x="960" y="170" fill="#fde68a" fontSize="14">
              ๙,๒๑๖ ล้านปี
            </text>

            {HELLS.map((item, index) => {
              const y = 210 + index * 78
              const isActive = highlightedId === item.id
              const barWidth = item.humanYearsPerDay === null ? 600 : getBarWidth(item.humanYearsPerDay) * 6.2
              const barFill = item.humanYearsPerDay === null
                ? isActive ? '#d97706' : '#92400e'
                : isActive ? '#f59e0b' : '#b45309'

              return (
                <g
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActiveId(item.id)}
                  className="cursor-pointer"
                >
                  <rect
                    x="72"
                    y={y - 28}
                    width="1060"
                    height="60"
                    rx="18"
                    fill={isActive ? 'rgba(251,191,36,0.12)' : 'rgba(68,64,60,0.42)'}
                    stroke={isActive ? '#fcd34d' : 'rgba(214,211,209,0.12)'}
                  />
                  <text x="96" y={y - 4} fill="#fafaf9" fontSize="22" fontWeight="700">
                    {`${index + 1}. ${item.label}`}
                  </text>
                  <text x="96" y={y + 18} fill="#d6d3d1" fontSize="16" fontStyle="italic">
                    {item.pali}
                  </text>

                  <rect
                    x="360"
                    y={y - 10}
                    width={barWidth}
                    height="22"
                    rx="11"
                    fill={barFill}
                  />

                  {item.humanYearsPerDay === null ? (
                    <>
                      <text x="378" y={y + 6} fill="#fffbeb" fontSize="16" fontWeight="700">
                        {`= ${item.displayValue}`}
                      </text>
                      <text x="860" y={y + 6} fill="#fde68a" fontSize="15">
                        {item.note}
                      </text>
                    </>
                  ) : (
                    <>
                      <text x={Math.min(380 + barWidth, 990)} y={y + 6} fill="#fffbeb" fontSize="16" fontWeight="700">
                        {item.displayValue}
                      </text>
                      <text x="1048" y={y + 6} textAnchor="end" fill="#fde68a" fontSize="15">
                        {item.note}
                      </text>
                    </>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <figcaption className="mt-4 text-sm leading-relaxed text-stone-300">
        ตัวเลขเปรียบเทียบจากอรรถกถา/วิสุทธิมรรค — ไม่ใช่พุทธพจน์ตรง
      </figcaption>
    </figure>
  )
}
