/**
 * scripts/index-content.ts
 * ใช้ index เนื้อหาทั้งหมดลง Meilisearch
 * รัน: npm run index:content
 */
import { getAllDocs } from '../lib/mdx'
import { indexDocuments } from '../lib/meilisearch'

async function main() {
  console.log('📖 Reading content...')
  const docs = getAllDocs()
  console.log(`Found ${docs.length} documents`)

  const searchDocs = docs.map((doc) => ({
    id: doc.slug.replace(/\//g, '-'),
    slug: doc.slug,
    title: doc.frontmatter.title,
    description: doc.frontmatter.description ?? '',
    content: doc.content,
    ref: doc.frontmatter.ref ?? '',
    nikaya: doc.frontmatter.nikaya ?? '',
    tags: doc.frontmatter.tags ?? [],
  }))

  console.log('🔍 Indexing to Meilisearch...')
  await indexDocuments(searchDocs)
  console.log('✅ Done!')
}

main().catch(console.error)
