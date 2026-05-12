'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'

const MIN_LENGTH = 3
const MAX_LENGTH = 500

interface ToolbarState {
  text: string
  top: number
  left: number
}

export function SelectionToolbar() {
  const router = useRouter()
  const [state, setState] = useState<ToolbarState | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    function updateFromSelection() {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        setState(null)
        return
      }

      const text = selection.toString().trim()
      if (text.length < MIN_LENGTH) {
        setState(null)
        return
      }

      // Ignore selections inside form inputs (we're inside a chat there)
      const node = selection.anchorNode
      const el = node instanceof Element ? node : node?.parentElement
      if (el?.closest('input, textarea, [contenteditable], [data-no-selection-toolbar]')) {
        setState(null)
        return
      }

      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) {
        setState(null)
        return
      }

      // Prefer placing the toolbar above; if it would clip, drop it below
      const placeAbove = rect.top > 56
      const top = placeAbove ? rect.top - 44 : rect.bottom + 8
      const left = Math.min(
        Math.max(8, rect.left + rect.width / 2 - 60),
        window.innerWidth - 128,
      )

      setState({ text: text.slice(0, MAX_LENGTH), top, left })
    }

    function onMouseDown(event: MouseEvent) {
      // Allow clicking the toolbar itself
      if (event.target instanceof Element && event.target.closest('[data-selection-toolbar]')) {
        return
      }
      setState(null)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setState(null)
    }

    document.addEventListener('selectionchange', updateFromSelection)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('scroll', () => setState(null), { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('selectionchange', updateFromSelection)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  function askAI() {
    if (!state) return
    router.push(`/ask?q=${encodeURIComponent(state.text)}`)
    setState(null)
    window.getSelection()?.removeAllRanges()
  }

  if (!state) return null

  return (
    <button
      ref={buttonRef}
      type="button"
      data-selection-toolbar
      onClick={askAI}
      onMouseDown={(e) => e.preventDefault()}
      className="fixed z-50 flex items-center gap-1.5 rounded-full bg-stone-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg ring-1 ring-stone-700/50 transition-all hover:bg-amber-600 hover:ring-amber-500"
      style={{
        top: `${state.top}px`,
        left: `${state.left}px`,
      }}
      aria-label="ถาม AI เกี่ยวกับข้อความที่เลือก"
    >
      <Sparkles className="h-3.5 w-3.5" />
      ถาม AI
    </button>
  )
}
