import { getAllDocs } from '@/lib/mdx'
import { SITE_URL, SITE_NAME } from '@/lib/site'

/**
 * llms-full.txt — every wiki doc concatenated as plain text, with citations.
 * AI agents can retrieve this single file instead of crawling individual pages.
 */
export const dynamic = 'force-static'

export function GET() {
  const docs = getAllDocs()

  const parts: string[] = []
  parts.push(`# ${SITE_NAME} — Full Content Corpus`)
  parts.push('')
  parts.push(`Source: ${SITE_URL}/`)
  parts.push(`Generated: ${new Date().toISOString()}`)
  parts.push(`Total documents: ${docs.length}`)
  parts.push('')
  parts.push('Each section below is one wiki entry. Frontmatter values are')
  parts.push('preserved as a header block, followed by the raw MDX body.')
  parts.push('')
  parts.push('---')
  parts.push('')

  for (const doc of docs) {
    const f = doc.frontmatter
    parts.push(`## ${f.title}`)
    parts.push('')
    parts.push(`URL: ${SITE_URL}/wiki/${doc.slug}`)
    if (f.ref) parts.push(`Reference: ${f.ref}`)
    if (f.nikaya) parts.push(`Piṭaka: ${f.nikaya}`)
    if (f.collection) parts.push(`Collection: ${f.collection}`)
    if (f.tags?.length) parts.push(`Tags: ${f.tags.join(', ')}`)
    if (f.description) parts.push(`Summary: ${f.description}`)
    parts.push('')
    parts.push(doc.content.trim())
    parts.push('')
    parts.push('---')
    parts.push('')
  }

  return new Response(parts.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
