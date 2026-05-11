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

// Tokenize: split by whitespace + drop stop-ish particles. Substring match
// handles within-token cases (Thai compound words still match).
const STOPWORDS = new Set([
  'คือ', 'อะไร', 'คืออะไร', 'และ', 'หรือ', 'ของ', 'ที่', 'แบบ', 'ไหน',
  'อย่างไร', 'ทำไม', 'เป็น', 'มี', 'ได้', 'ไหม', 'ค่ะ', 'ครับ', 'ๆ',
])

function tokenize(query: string): string[] {
  return query
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0 && !STOPWORDS.has(t))
}

export async function searchDocs(
  query: string,
  options?: { limit?: number; offset?: number; filter?: string }
): Promise<SearchResult> {
  try {
    const q = query.trim()
    if (!q) return { hits: [], total: 0, ok: true, fallback: false }

    let docs = getDocs()

    if (options?.filter) {
      const m = options.filter.match(/nikaya\s*=\s*"([^"]+)"/)
      if (m) docs = docs.filter((d) => d.frontmatter.nikaya === m[1])
    }

    // Token-level scoring: whole-query substring is a strong signal (exact phrase),
    // each remaining token adds incremental score. Falls back to whole-query if all
    // tokens get filtered as stopwords.
    const tokens = tokenize(q)
    const terms = tokens.length > 0 ? tokens : [q]
    const includeWholeQuery = tokens.length > 1

    // Thai has no word boundaries, so also check if a doc's title/tag is a substring
    // of the query itself. Handles queries like "ไตรลักษณ์คืออะไร" where "ไตรลักษณ์"
    // sits inside the unsplittable string.
    const qLower = q.toLowerCase()

    const scored = docs
      .map((doc) => {
        const title = doc.frontmatter.title ?? ''
        const ref = doc.frontmatter.ref ?? ''
        const desc = doc.frontmatter.description ?? ''
        const tagsArr = doc.frontmatter.tags ?? []
        const tags = tagsArr.join(' ')
        const content = doc.content

        let score = 0

        if (title.length >= 2 && qLower.includes(title.toLowerCase())) {
          score += 500
        }
        for (const tag of tagsArr) {
          if (tag.length >= 2 && qLower.includes(tag.toLowerCase())) {
            score += 80
          }
        }

        if (includeWholeQuery) {
          score +=
            countMatches(title, q) * 200 +
            countMatches(content, q) * 20
        }

        for (const term of terms) {
          score +=
            countMatches(title, term) * 100 +
            countMatches(tags, term) * 50 +
            countMatches(ref, term) * 30 +
            countMatches(desc, term) * 20 +
            countMatches(content, term) * 5
        }

        return { doc, score }
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)

    const total = scored.length
    const offset = options?.offset ?? 0
    const limit = options?.limit ?? 20
    const paginated = scored.slice(offset, offset + limit)

    // Highlight the strongest term per doc (first that appears in title, else first token)
    const hits: SearchHit[] = paginated.map(({ doc }) => {
      const highlightTerm =
        terms.find((t) => doc.frontmatter.title?.toLowerCase().includes(t.toLowerCase())) ??
        terms[0]
      return {
        id: doc.slug.replace(/\//g, '-'),
        slug: doc.slug,
        title: doc.frontmatter.title,
        description: doc.frontmatter.description,
        content: doc.content,
        ref: doc.frontmatter.ref,
        nikaya: doc.frontmatter.nikaya,
        tags: doc.frontmatter.tags,
        _formatted: {
          title: highlight(doc.frontmatter.title, highlightTerm),
          content: makeSnippet(doc.content, highlightTerm),
        },
      }
    })

    return { hits, total, ok: true, fallback: false }
  } catch (err) {
    console.error('Search failed:', err)
    return { hits: [], total: 0, ok: false, fallback: true }
  }
}
