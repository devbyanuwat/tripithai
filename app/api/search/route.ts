import { NextRequest, NextResponse } from 'next/server'
import { searchDocs } from '@/lib/meilisearch'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const q = searchParams.get('q') ?? ''
  const limit = Number(searchParams.get('limit') ?? 20)
  const offset = Number(searchParams.get('offset') ?? 0)
  const nikaya = searchParams.get('nikaya') ?? undefined

  if (!q.trim()) {
    return NextResponse.json({ hits: [], total: 0, ok: true, fallback: false })
  }

  const filter = nikaya ? `nikaya = "${nikaya}"` : undefined
  const result = await searchDocs(q, { limit, offset, filter })

  return NextResponse.json(result)
}
