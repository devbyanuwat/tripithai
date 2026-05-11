import { NextRequest, NextResponse } from 'next/server'
import { searchDocs } from '@/lib/meilisearch'
import { askTyphoon } from '@/lib/typhoon'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { question, history = [] } = body

  if (!question?.trim()) {
    return NextResponse.json({ error: 'กรุณาระบุคำถาม' }, { status: 400 })
  }

  // Step 1: RAG — ดึง context จาก Meilisearch
  const searchResult = await searchDocs(question, { limit: 5 })
  const context = searchResult.hits.map(
    (h) => `${h.title}${h.ref ? ` (${h.ref})` : ''}\n${h.content.slice(0, 800)}`
  )

  // Step 2: ถาม Typhoon พร้อม context
  const result = await askTyphoon(question, context, history)

  // Step 3: Return พร้อม sources เสมอ (ไม่ว่า LLM จะตอบหรือไม่)
  return NextResponse.json({
    ...result,
    searchResults: searchResult.hits.map((h) => ({
      title: h.title,
      slug: h.slug,
      ref: h.ref,
      excerpt: h._formatted?.content ?? h.content.slice(0, 200),
    })),
  })
}
