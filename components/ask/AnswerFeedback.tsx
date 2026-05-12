'use client'

import { useState } from 'react'
import { Flag, Check } from 'lucide-react'
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

export function AnswerFeedback({ question, answer, sources, fallback, fallbackReason }: Props) {
  const [reported, setReported] = useState(false)

  function buildIssueUrl() {
    const truncQuestion = question.length > 60 ? `${question.slice(0, 60)}…` : question
    const title = `[AI feedback] ${truncQuestion}`

    const sourcesBlock = sources?.length
      ? sources
          .map((s) => {
            const link = `${SITE_URL}/wiki/${s.slug}`
            const refSuffix = s.ref ? ` — ${s.ref}` : ''
            return `- [${s.title}](${link})${refSuffix}`
          })
          .join('\n')
      : '_(AI ไม่ได้อ้างอิงแหล่งใด)_'

    const answerBlock = answer.trim()
      ? answer.trim()
      : `_(AI ไม่ได้ตอบ — fallback: ${fallbackReason ?? 'unknown'})_`

    const body = [
      '## คำถาม',
      '',
      `> ${question.replace(/\n/g, '\n> ')}`,
      '',
      '## คำตอบที่ AI ให้',
      '',
      answerBlock,
      '',
      '## แหล่งอ้างอิงที่ AI ใช้',
      '',
      sourcesBlock,
      '',
      '## ปัญหาที่พบ',
      '',
      '<!-- อธิบายสั้นๆ ว่าคำตอบผิด/ขาดอย่างไร เช่น',
      '- อ้างเล่มผิด',
      '- ตัดเนื้อหาสำคัญออก',
      '- ตอบไม่ตรงคำถาม',
      '- เพิ่มเนื้อหาที่ไม่อยู่ในต้นฉบับ -->',
      '',
      '## คำตอบที่ควรเป็น (ถ้ามี)',
      '',
      '<!-- ถ้าทราบอ้างอิงเล่ม/ข้อที่ถูก กรุณาใส่ -->',
      '',
      '---',
      '',
      `- Reported at: ${new Date().toISOString()}`,
      `- Fallback: ${fallback ? `yes (${fallbackReason ?? 'unknown'})` : 'no'}`,
      `- Page: ${typeof window !== 'undefined' ? window.location.href : '—'}`,
    ].join('\n')

    const labels = fallback ? 'ai-feedback,bad-answer' : 'ai-feedback'

    return `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=${encodeURIComponent(labels)}`
  }

  function report() {
    if (typeof window === 'undefined') return
    window.open(buildIssueUrl(), '_blank', 'noopener,noreferrer')
    setReported(true)
  }

  return (
    <div className="flex items-center gap-1.5 mt-1">
      <button
        type="button"
        onClick={report}
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors"
        aria-label="รายงานคำตอบนี้ที่ GitHub"
      >
        {reported ? <Check className="w-3 h-3" /> : <Flag className="w-3 h-3" />}
        {reported ? 'รายงานแล้ว — ขอบคุณค่ะ' : 'รายงานคำตอบนี้'}
      </button>
    </div>
  )
}
