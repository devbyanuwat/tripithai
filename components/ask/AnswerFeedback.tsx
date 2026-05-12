'use client'

import { useState } from 'react'
import { Flag, Check, Loader2 } from 'lucide-react'
import { SITE_URL } from '@/lib/site'

const REPO = 'devbyanuwat/tripithai'

interface Source {
  title: string
  slug: string
  ref?: string
  excerpt?: string
}

interface Props {
  question: string
  answer: string
  sources?: Source[]
  fallback?: boolean
  fallbackReason?: string
}

type Status = 'idle' | 'loading' | 'reported' | 'error'

export function AnswerFeedback({
  question,
  answer,
  sources,
  fallback,
  fallbackReason,
}: Props) {
  const [status, setStatus] = useState<Status>('idle')

  function buildFallbackUrl() {
    const truncQuestion = question.length > 60 ? `${question.slice(0, 60)}…` : question
    const title = `[AI feedback] ${truncQuestion}`
    // Truncate aggressively so the URL stays under GitHub's ~8KB limit
    const answerSnip = answer.slice(0, 1500) + (answer.length > 1500 ? '\n\n… (ตัดทอน — กรุณาคัดลอกจาก /ask)' : '')
    const sourcesBlock = sources?.length
      ? sources.slice(0, 4).map((s) => `- [${s.title}](${SITE_URL}/wiki/${s.slug})${s.ref ? ` — ${s.ref}` : ''}`).join('\n')
      : '_(ไม่มี)_'
    const body = [
      '## คำถาม',
      `> ${question.slice(0, 500)}`,
      '',
      '## คำตอบที่ AI ให้',
      answerSnip,
      '',
      '## แหล่งอ้างอิง',
      sourcesBlock,
      '',
      '## ปัญหาที่พบ',
      '<!-- อธิบายสั้นๆ ว่าคำตอบผิด/ขาดอย่างไร -->',
      '',
      `_Fallback: ${fallback ? `yes (${fallbackReason ?? 'unknown'})` : 'no'}_`,
      `_Page: ${typeof window !== 'undefined' ? window.location.href : '—'}_`,
    ].join('\n')
    const labels = fallback ? 'ai-feedback,bad-answer' : 'ai-feedback'
    return `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=${encodeURIComponent(labels)}`
  }

  async function report() {
    if (typeof window === 'undefined') return
    setStatus('loading')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          answer,
          sources,
          fallback,
          fallbackReason,
          pageUrl: window.location.href,
        }),
      })
      if (res.ok) {
        const data: { url: string } = await res.json()
        window.open(data.url, '_blank', 'noopener,noreferrer')
        setStatus('reported')
        return
      }
      // Server didn't create issue — fall back to manual form (works without token)
      if (res.status === 503) {
        window.open(buildFallbackUrl(), '_blank', 'noopener,noreferrer')
        setStatus('reported')
        return
      }
      const errJson = await res.json().catch(() => null)
      const msg = errJson?.message ?? `Server error ${res.status}`
      // Still let the user file manually as last resort
      window.open(buildFallbackUrl(), '_blank', 'noopener,noreferrer')
      setStatus('error')
      console.warn('Feedback fallback after server error:', msg)
    } catch (err) {
      console.warn('Feedback network error:', err)
      window.open(buildFallbackUrl(), '_blank', 'noopener,noreferrer')
      setStatus('error')
    }
  }

  const label =
    status === 'loading'
      ? 'กำลังเปิด issue…'
      : status === 'reported'
      ? 'รายงานแล้ว — ขอบคุณค่ะ'
      : status === 'error'
      ? 'เปิดฟอร์ม GitHub (manual)'
      : 'รายงานคำตอบนี้'

  const Icon =
    status === 'loading' ? Loader2 : status === 'reported' ? Check : Flag

  return (
    <div className="flex items-center gap-1.5 mt-1">
      <button
        type="button"
        onClick={report}
        disabled={status === 'loading' || status === 'reported'}
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="รายงานคำตอบนี้ที่ GitHub"
      >
        <Icon className={`w-3 h-3 ${status === 'loading' ? 'animate-spin' : ''}`} />
        {label}
      </button>
    </div>
  )
}
