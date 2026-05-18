import type { ReactNode } from 'react'

interface ScholarlyNoteProps {
  title?: string
  children: ReactNode
}

export function ScholarlyNote({ title = 'หมายเหตุเชิงวิชาการ', children }: ScholarlyNoteProps) {
  return (
    <aside
      data-scholarly-note
      role="note"
      className="not-prose my-8 rounded-xl border border-stone-200 bg-stone-50 p-5"
    >
      <div className="flex items-start gap-3">
        <svg
          viewBox="0 0 20 20"
          className="w-5 h-5 shrink-0 mt-0.5 text-stone-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="8" />
          <line x1="10" y1="6" x2="10" y2="10" />
          <circle cx="10" cy="13.5" r="0.5" fill="currentColor" />
        </svg>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium mb-2">
            {title}
          </p>
          <div className="text-sm leading-relaxed text-stone-600 [&>p]:my-1.5 [&_strong]:text-stone-800 [&_em]:text-amber-700 [&_em]:not-italic [&_em]:font-medium">
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}
