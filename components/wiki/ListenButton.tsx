'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Square, Gauge } from 'lucide-react'

interface Props {
  text: string
  title: string
}

// Strip markdown/MDX-ish syntax → plain Thai for TTS
function stripMarkdown(s: string): string {
  return s
    .replace(/^---[\s\S]*?---/, '')           // frontmatter
    .replace(/```[\s\S]*?```/g, '')           // code fences
    .replace(/`([^`]+)`/g, '$1')              // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')          // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // links
    .replace(/[*_~]+/g, '')                   // bold/italic markers
    .replace(/^#{1,6}\s+/gm, '')              // headings
    .replace(/^[-*+]\s+/gm, '')               // list bullets
    .replace(/^\s*\|.*\|\s*$/gm, '')          // table rows
    .replace(/^\s*>\s?/gm, '')                // blockquotes
    .replace(/\n{3,}/g, '\n\n')               // collapse blank lines
    .trim()
}

const RATES = [0.85, 1.0, 1.15, 1.3] as const

export function ListenButton({ text, title }: Props) {
  const [supported, setSupported] = useState(false)
  const [state, setState] = useState<'idle' | 'playing' | 'paused'>('idle')
  const [rateIdx, setRateIdx] = useState(1)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  function start() {
    const synth = window.speechSynthesis
    synth.cancel()

    const body = `${title}. ${stripMarkdown(text)}`
    const u = new SpeechSynthesisUtterance(body)
    u.lang = 'th-TH'
    u.rate = RATES[rateIdx]
    u.pitch = 1

    const thaiVoice = synth.getVoices().find((v) => v.lang.startsWith('th'))
    if (thaiVoice) u.voice = thaiVoice

    u.onend = () => setState('idle')
    u.onerror = () => setState('idle')

    utterRef.current = u
    synth.speak(u)
    setState('playing')
  }

  function pause() {
    window.speechSynthesis.pause()
    setState('paused')
  }

  function resume() {
    window.speechSynthesis.resume()
    setState('playing')
  }

  function stop() {
    window.speechSynthesis.cancel()
    setState('idle')
  }

  function cycleRate() {
    setRateIdx((i) => (i + 1) % RATES.length)
    if (state !== 'idle') {
      stop()
      setTimeout(start, 50)
    }
  }

  if (!supported) return null

  return (
    <div className="inline-flex items-center gap-1 bg-stone-100 border border-stone-200 rounded-full p-0.5 text-sm">
      {state === 'idle' && (
        <button
          type="button"
          onClick={start}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors"
          aria-label="ฟังเสียงอ่าน"
        >
          <Play className="w-3.5 h-3.5" />
          ฟัง
        </button>
      )}
      {state === 'playing' && (
        <button
          type="button"
          onClick={pause}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
          aria-label="หยุดชั่วคราว"
        >
          <Pause className="w-3.5 h-3.5" />
          พัก
        </button>
      )}
      {state === 'paused' && (
        <button
          type="button"
          onClick={resume}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
          aria-label="อ่านต่อ"
        >
          <Play className="w-3.5 h-3.5" />
          ต่อ
        </button>
      )}
      {state !== 'idle' && (
        <button
          type="button"
          onClick={stop}
          className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-stone-200 transition-colors"
          aria-label="หยุด"
        >
          <Square className="w-3 h-3" />
        </button>
      )}
      <button
        type="button"
        onClick={cycleRate}
        className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-stone-200 text-xs text-stone-500 transition-colors"
        aria-label="ปรับความเร็ว"
      >
        <Gauge className="w-3 h-3" />
        {RATES[rateIdx]}x
      </button>
    </div>
  )
}
