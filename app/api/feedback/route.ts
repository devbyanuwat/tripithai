import { NextRequest, NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/site'

const REPO = 'devbyanuwat/tripithai'

interface Source {
  title: string
  slug: string
  ref?: string
  excerpt?: string
}

interface FeedbackBody {
  question: string
  answer: string
  sources?: Source[]
  fallback?: boolean
  fallbackReason?: string
  pageUrl?: string
}

// Cheap in-memory per-IP rate limit. Vercel functions are usually warm long
// enough that this catches most casual abuse; persistent storage would be
// overkill for a low-volume feedback endpoint.
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const buckets = new Map<string, number[]>()

function rateLimit(ip: string) {
  const now = Date.now()
  const hits = (buckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (hits.length >= RATE_LIMIT) return false
  hits.push(now)
  buckets.set(ip, hits)
  return true
}

function buildIssueBody(body: FeedbackBody): string {
  const { question, answer, sources, fallback, fallbackReason, pageUrl } = body
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

  return [
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
    '<!-- กรุณาอธิบายว่าคำตอบผิด/ขาดอย่างไร — ทีมจะนำไปปรับเนื้อหา/RAG -->',
    '',
    '## คำตอบที่ควรเป็น (ถ้ามี)',
    '',
    '<!-- ถ้าทราบอ้างอิงเล่ม/ข้อที่ถูก กรุณาใส่ -->',
    '',
    '---',
    '',
    `- Reported at: ${new Date().toISOString()}`,
    `- Fallback: ${fallback ? `yes (${fallbackReason ?? 'unknown'})` : 'no'}`,
    pageUrl ? `- Page: ${pageUrl}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: 'rate_limited', message: 'รายงานเร็วเกินไป กรุณารอสักครู่' },
      { status: 429 },
    )
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json(
      { error: 'not_configured', message: 'ฟีเจอร์รายงานยังไม่พร้อม (GITHUB_TOKEN ไม่ได้ตั้งค่า)' },
      { status: 503 },
    )
  }

  let body: FeedbackBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  if (!body.question?.trim() || body.question.length > 4000) {
    return NextResponse.json({ error: 'invalid_question' }, { status: 400 })
  }
  if (typeof body.answer !== 'string' || body.answer.length > 30000) {
    return NextResponse.json({ error: 'invalid_answer' }, { status: 400 })
  }

  const truncQuestion =
    body.question.length > 60 ? `${body.question.slice(0, 60)}…` : body.question
  const title = `[AI feedback] ${truncQuestion}`
  const issueBody = buildIssueBody(body)
  const labels = body.fallback ? ['ai-feedback', 'bad-answer'] : ['ai-feedback']

  const res = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'TripiThai-Feedback',
    },
    body: JSON.stringify({ title, body: issueBody, labels }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('GitHub issue create failed', res.status, detail)
    return NextResponse.json(
      { error: 'github_failed', status: res.status, detail },
      { status: 502 },
    )
  }

  const issue: { html_url: string; number: number } = await res.json()
  return NextResponse.json({ url: issue.html_url, number: issue.number })
}
