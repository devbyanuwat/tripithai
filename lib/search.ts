import { getAllDocs, type Doc } from './mdx'

export interface SearchHit {
  id: string
  slug: string
  title: string
  description?: string
  content: string
  ref?: string
  nikaya?: string
  tags?: string[]
  _formatted?: { title?: string; content?: string }
}

export interface SearchResult {
  hits: SearchHit[]
  total: number
  ok: boolean
  fallback: boolean
}

let docCache: Doc[] | null = null

function getDocs(): Doc[] {
  if (!docCache) docCache = getAllDocs()
  return docCache
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlight(text: string, query: string): string {
  if (!query) return text
  return text.replace(new RegExp(escapeRegex(query), 'gi'), (m) => `<mark>${m}</mark>`)
}

function makeSnippet(content: string, query: string, contextChars = 80): string {
  const idx = content.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return content.slice(0, 200) + (content.length > 200 ? '…' : '')
  const start = Math.max(0, idx - contextChars)
  const end = Math.min(content.length, idx + query.length + contextChars)
  const prefix = start > 0 ? '…' : ''
  const suffix = end < content.length ? '…' : ''
  return prefix + highlight(content.slice(start, end), query) + suffix
}

function countMatches(text: string, query: string): number {
  if (!query) return 0
  const matches = text.match(new RegExp(escapeRegex(query), 'gi'))
  return matches ? matches.length : 0
}

export async function searchDocs(
  query: string,
  options?: { limit?: number; offset?: number; filter?: string }
): Promise<SearchResult> {
  try {
    const q = query.trim()
    if (!q) return { hits: [], total: 0, ok: true, fallback: false }

    let docs = getDocs()

    // Filter: e.g. 'nikaya = "suttanta"'
    if (options?.filter) {
      const m = options.filter.match(/nikaya\s*=\s*"([^"]+)"/)
      if (m) docs = docs.filter((d) => d.frontmatter.nikaya === m[1])
    }

    const lowerQ = q.toLowerCase()

    const scored = docs
      .map((doc) => {
        const title = doc.frontmatter.title ?? ''
        const ref = doc.frontmatter.ref ?? ''
        const desc = doc.frontmatter.description ?? ''
        const tags = (doc.frontmatter.tags ?? []).join(' ')

        const titleMatches = countMatches(title, q)
        const refMatches = countMatches(ref, q)
        const descMatches = countMatches(desc, q)
        const tagMatches = countMatches(tags, q)
        const contentMatches = countMatches(doc.content, q)

        const score =
          titleMatches * 100 +
          tagMatches * 50 +
          refMatches * 30 +
          descMatches * 20 +
          contentMatches * 5

        return { doc, score }
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)

    const total = scored.length
    const offset = options?.offset ?? 0
    const limit = options?.limit ?? 20
    const paginated = scored.slice(offset, offset + limit)

    const hits: SearchHit[] = paginated.map(({ doc }) => ({
      id: doc.slug.replace(/\//g, '-'),
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      content: doc.content,
      ref: doc.frontmatter.ref,
      nikaya: doc.frontmatter.nikaya,
      tags: doc.frontmatter.tags,
      _formatted: {
        title: highlight(doc.frontmatter.title, q),
        content: makeSnippet(doc.content, q),
      },
    }))

    return { hits, total, ok: true, fallback: false }
  } catch (err) {
    console.error('Search failed:', err)
    return { hits: [], total: 0, ok: false, fallback: true }
  }
}
