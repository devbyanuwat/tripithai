import Link from 'next/link'
import { BookOpen, ChevronRight, Folder } from 'lucide-react'
import type { Doc } from '@/lib/mdx'
import { labelForSegment, TIPITAKA_TAXONOMY, type TaxonomyNode } from '@/lib/taxonomy'

interface Props {
  prefix: string  // e.g. '', 'suttanta', 'suttanta/digha'
  docs: Doc[]
}

function getTaxonomyChildren(prefix: string): string[] {
  const segments = prefix.split('/').filter(Boolean)
  let node: Record<string, TaxonomyNode> | undefined = TIPITAKA_TAXONOMY
  for (const seg of segments) {
    node = node?.[seg]?.children
    if (!node) return []
  }
  return Object.keys(node ?? {})
}

export function FolderIndex({ prefix, docs }: Props) {
  const segments = prefix.split('/').filter(Boolean)
  const title = segments.length === 0
    ? 'พระไตรปิฎก'
    : labelForSegment(segments[segments.length - 1])

  const breadcrumbs = segments.map((s, i) => ({
    label: labelForSegment(s),
    href: '/wiki/' + segments.slice(0, i + 1).join('/'),
  }))

  // Group docs by the segment one level below the current prefix
  const groups = new Map<string, Doc[]>()
  for (const doc of docs) {
    const remaining = prefix
      ? doc.slug.slice(prefix.length + 1)
      : doc.slug
    const childSegment = remaining.split('/')[0]
    const key = remaining.includes('/') ? childSegment : '__leaf__'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(doc)
  }

  // Merge taxonomy children so structural folders show even when no docs exist
  for (const child of getTaxonomyChildren(prefix)) {
    if (!groups.has(child)) groups.set(child, [])
  }

  const leafDocs = groups.get('__leaf__') ?? []
  const subFolders = Array.from(groups.entries())
    .filter(([k]) => k !== '__leaf__')
    .sort((a, b) => a[0].localeCompare(b[0]))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1 text-xs text-stone-400 mb-6">
        <Link href="/wiki" className="hover:text-stone-600">Wiki</Link>
        {breadcrumbs.map((crumb) => (
          <span key={crumb.href} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3" />
            <Link href={crumb.href} className="hover:text-stone-600">
              {crumb.label}
            </Link>
          </span>
        ))}
      </nav>

      <header className="mb-8 pb-6 border-b border-stone-200">
        <h1 className="text-2xl font-semibold text-stone-800">{title}</h1>
        <p className="text-sm text-stone-500 mt-2">
          {docs.length > 0 ? `${docs.length} หัวข้อในหมวดนี้` : 'ยังไม่มีหัวข้อในหมวดนี้'}
        </p>
      </header>

      {docs.length === 0 && (
        <div className="text-center py-16 text-stone-400">
          <Folder className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>เนื้อหาหมวดนี้กำลังจัดทำอยู่</p>
          <p className="text-sm mt-1">โปรดติดตามใน roadmap ของโครงการ</p>
        </div>
      )}

      {subFolders.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
            หมวด
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {subFolders.map(([seg, items]) => (
              <Link
                key={seg}
                href={`/wiki/${prefix ? prefix + '/' : ''}${seg}`}
                className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Folder className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800 group-hover:text-amber-700 transition-colors">
                      {labelForSegment(seg)}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {items.length > 0 ? `${items.length} หัวข้อ` : 'ยังไม่มีเนื้อหา'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-amber-400 transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {leafDocs.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">
            หัวข้อ
          </h2>
          <div className="space-y-2">
            {leafDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/wiki/${doc.slug}`}
                className="block p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-amber-600 mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-800 group-hover:text-amber-700 transition-colors">
                      {doc.frontmatter.title}
                    </p>
                    {doc.frontmatter.description && (
                      <p className="text-sm text-stone-500 mt-0.5">
                        {doc.frontmatter.description}
                      </p>
                    )}
                    {doc.frontmatter.ref && (
                      <p className="text-xs text-amber-600 mt-1">{doc.frontmatter.ref}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
