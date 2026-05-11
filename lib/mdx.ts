import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface DocFrontmatter {
  title: string
  ref?: string          // อ้างอิง เช่น "ทีฆนิกาย เล่มที่ ๙ ข้อ ๒๗๓"
  nikaya?: string       // vinaya | suttanta | abhidhamma
  collection?: string   // digha | majjhima | samyutta | anguttara | khuddaka
  tags?: string[]
  related?: string[]    // slug ของหัวข้อที่เกี่ยวข้อง
  description?: string
  etipitaka?: string    // override URL ตรงไปที่ etipitaka.com (ถ้าไม่ใส่ จะ derive จาก ref)
  watnapp?: string      // URL ไปยังหนังสือพุทธวจน บน watnapp.com
}

export interface Doc {
  slug: string
  frontmatter: DocFrontmatter
  content: string
  rawContent: string
}

export function getDocBySlug(slug: string): Doc | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    frontmatter: data as DocFrontmatter,
    content,
    rawContent: raw,
  }
}

export function getAllDocs(): Doc[] {
  const docs: Doc[] = []

  function walk(dir: string, baseSlug: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), `${baseSlug}/${entry.name}`)
      } else if (entry.name.endsWith('.mdx')) {
        const slug = `${baseSlug}/${entry.name.replace('.mdx', '')}`
        const doc = getDocBySlug(slug.replace(/^\//, ''))
        if (doc) docs.push(doc)
      }
    }
  }

  walk(CONTENT_DIR, '')
  return docs
}

export function getDocsByTag(tag: string): Doc[] {
  return getAllDocs().filter((d) => d.frontmatter.tags?.includes(tag))
}

export function getDocsByPrefix(prefix: string): Doc[] {
  const p = prefix.replace(/^\/+|\/+$/g, '')
  if (!p) return getAllDocs()
  return getAllDocs().filter((d) => d.slug === p || d.slug.startsWith(p + '/'))
}

// Known structural folders — render an index even when empty so users see the
// hierarchy rather than 404. Update when new piṭakas/nikāyas come online.
export const KNOWN_FOLDERS = new Set([
  'vinaya',
  'suttanta',
  'suttanta/digha',
  'suttanta/majjhima',
  'suttanta/samyutta',
  'suttanta/anguttara',
  'suttanta/khuddaka',
  'abhidhamma',
])

export function isKnownFolder(path: string): boolean {
  return KNOWN_FOLDERS.has(path.replace(/^\/+|\/+$/g, ''))
}

export function getRelatedDocs(doc: Doc): Doc[] {
  if (!doc.frontmatter.related?.length) return []
  return doc.frontmatter.related
    .map((slug) => getDocBySlug(slug))
    .filter(Boolean) as Doc[]
}
