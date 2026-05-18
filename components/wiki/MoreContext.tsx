import type { ReactNode } from 'react'

interface MoreContextProps {
  title?: string
  children: ReactNode
}

export function MoreContext({ title = 'บริบทเพิ่มเติม', children }: MoreContextProps) {
  return (
    <details
      data-more-context
      className="not-prose group my-5 rounded-lg border border-stone-200 bg-stone-50/60 open:bg-amber-50/40 open:border-amber-200 transition-colors"
    >
      <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3 text-sm font-medium text-stone-600 group-open:text-amber-800 hover:text-amber-700 select-none">
        <span className="flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 transition-transform group-open:rotate-90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 4 10 8 6 12" />
          </svg>
          {title}
        </span>
        <span className="text-xs text-stone-400 group-open:hidden">อ่านเพิ่ม</span>
        <span className="text-xs text-amber-600 hidden group-open:inline">ย่อ</span>
      </summary>
      <div className="px-5 pb-4 pt-1 text-sm leading-relaxed text-stone-600 [&>p]:my-2 [&_strong]:text-stone-800">
        {children}
      </div>
    </details>
  )
}
