'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback, Suspense } from 'react'
import { Search, BookOpen, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { SearchBar } from '@/components/search/SearchBar'

interface Hit {
  slug: string
  title: string
  ref?: string
  nikaya?: string
  tags?: string[]
  _formatted?: { content?: string; title?: string }
}

interface Result {
  hits: Hit[]
  total: number
  ok: boolean
  fallback: boolean
}

function SearchResults() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)

  const doSearch = useCallback(async (query: string) => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResult(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { doSearch(q) }, [q, doSearch])

  if (!q) return (
    <div className="text-center py-20 text-stone-400">
      <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
      <p>พิมพ์คำที่ต้องการค้นหา</p>
    </div>
  )

  if (loading) return (
    <div className="space-y-3 mt-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 bg-stone-100 rounded-lg animate-pulse" />
      ))}
    </div>
  )

  if (!result) return null

  return (
    <div className="mt-6 space-y-4">
      {/* Status bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">
          {result.ok
            ? `พบ ${result.total} รายการสำหรับ "${q}"`
            : `ค้นหาด้วย keyword สำหรับ "${q}"`}
        </p>
        {result.fallback && (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
            <AlertCircle className="w-3 h-3" />
            ระบบค้นหาออฟไลน์
          </div>
        )}
      </div>

      {/* Results */}
      {result.hits.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>ไม่พบผลลัพธ์สำหรับ "{q}"</p>
          <p className="text-sm mt-1">ลองค้นหาด้วยคำอื่น หรือเรียกดูตามนิกาย</p>
        </div>
      ) : (
        result.hits.map((hit) => (
          <Link
            key={hit.slug}
            href={`/wiki/${hit.slug}`}
            className="block p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3
                  className="font-medium text-stone-800"
                  dangerouslySetInnerHTML={{
                    __html: hit._formatted?.title ?? hit.title,
                  }}
                />
                {hit.ref && (
                  <p className="text-xs text-amber-600 mt-0.5">{hit.ref}</p>
                )}
                {hit._formatted?.content && (
                  <p
                    className="text-sm text-stone-500 mt-1.5 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: hit._formatted.content }}
                  />
                )}
              </div>
              {hit.nikaya && (
                <span className="shrink-0 text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
                  {hit.nikaya}
                </span>
              )}
            </div>
            {hit.tags?.length ? (
              <div className="flex flex-wrap gap-1 mt-2">
                {hit.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))
      )}
    </div>
  )
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar defaultValue={q} size="lg" />
      </div>
      <SearchResults />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  )
}
