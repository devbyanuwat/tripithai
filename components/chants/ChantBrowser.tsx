'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ScrollText } from 'lucide-react'

export interface ChantItem {
  slug: string
  title: string
  description?: string
  ref?: string
  chantUses: string[]
}

const ALL = 'ทั้งหมด'

export function ChantBrowser({ items }: { items: ChantItem[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const it of items) it.chantUses.forEach((c) => set.add(c))
    return [ALL, ...Array.from(set)]
  }, [items])

  const [active, setActive] = useState<string>(ALL)

  const filtered = useMemo(
    () => (active === ALL ? items : items.filter((it) => it.chantUses.includes(active))),
    [items, active],
  )

  return (
    <div>
      {/* filter หมวด */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = cat === active
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={
                isActive
                  ? 'rounded-full border border-amber-500 bg-amber-500 px-3.5 py-1.5 text-sm font-medium text-white'
                  : 'rounded-full border border-amber-200 bg-white px-3.5 py-1.5 text-sm text-stone-600 transition-colors hover:border-amber-400 hover:bg-amber-50'
              }
            >
              {cat}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-8 text-center text-sm text-stone-500">
          ยังไม่มีบทสวดในหมวดนี้
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((it) => (
            <Link
              key={it.slug}
              href={`/wiki/${it.slug}`}
              className="group flex flex-col rounded-2xl border border-amber-200/80 bg-white p-4 transition-colors hover:border-amber-400 hover:bg-amber-50/50"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ScrollText className="h-4 w-4 shrink-0 text-amber-600" aria-hidden />
                  <h2 className="text-base font-semibold text-stone-800">{it.title}</h2>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-stone-300 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-500" aria-hidden />
              </div>

              {it.description && (
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone-500">
                  {it.description}
                </p>
              )}

              {it.chantUses.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {it.chantUses.map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
