import type { ReactNode } from 'react'

interface LeadSummaryProps {
  children: ReactNode
}

export function LeadSummary({ children }: LeadSummaryProps) {
  return (
    <aside
      data-lead-summary
      className="not-prose my-6 rounded-r-xl border-l-4 border-amber-400 bg-gradient-to-r from-amber-50 to-transparent px-5 py-4"
    >
      <p className="text-xs uppercase tracking-[0.24em] text-amber-700/80 mb-2">
        สรุปย่อ
      </p>
      <div className="text-base leading-relaxed text-stone-700 [&_strong]:text-stone-900 [&_strong]:font-semibold">
        {children}
      </div>
    </aside>
  )
}
