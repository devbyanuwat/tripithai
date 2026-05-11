import { MeiliSearch } from 'meilisearch'

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST ?? 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_API_KEY ?? 'masterKey',
})

export const INDEX_NAME = 'tipitaka'

export interface SearchHit {
  id: string
  slug: string
  title: string
  description?: string
  content: string
  ref?: string
  nikaya?: string
  tags?: string[]
  _formatted?: Record<string, string>
}

export interface SearchResult {
  hits: SearchHit[]
  total: number
  ok: boolean
  fallback: boolean
}

/**
 * ค้นหาด้วย keyword — ถ้า Meilisearch ไม่ตอบ return empty result (ไม่ crash)
 */
export async function searchDocs(
  query: string,
  options?: { limit?: number; offset?: number; filter?: string }
): Promise<SearchResult> {
  try {
    const index = client.index(INDEX_NAME)
    const result = await index.search<SearchHit>(query, {
      limit: options?.limit ?? 20,
      offset: options?.offset ?? 0,
      filter: options?.filter,
      attributesToHighlight: ['title', 'content'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
      attributesToCrop: ['content'],
      cropLength: 150,
    })

    return {
      hits: result.hits,
      total: result.estimatedTotalHits ?? result.hits.length,
      ok: true,
      fallback: false,
    }
  } catch {
    // Meilisearch ไม่พร้อม — return empty ให้ UI แสดง fallback state
    return { hits: [], total: 0, ok: false, fallback: true }
  }
}

/**
 * Index เอกสารลง Meilisearch — ใช้ใน scripts/index-content.ts
 */
export async function indexDocuments(docs: SearchHit[]) {
  const index = client.index(INDEX_NAME)

  await index.updateSettings({
    searchableAttributes: ['title', 'content', 'description', 'tags', 'ref'],
    filterableAttributes: ['nikaya', 'tags'],
    sortableAttributes: ['title'],
    displayedAttributes: ['id', 'slug', 'title', 'description', 'content', 'ref', 'nikaya', 'tags'],
  })

  await index.addDocuments(docs)
}

export { client as meiliClient }
