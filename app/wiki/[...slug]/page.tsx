import { notFound } from 'next/navigation'
import { getDocBySlug, getRelatedDocs } from '@/lib/mdx'
import { buildEtipitakaUrl } from '@/lib/etipitaka'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { BookOpen, Tag, ChevronRight, ExternalLink, Library } from 'lucide-react'
import { ListenButton } from '@/components/wiki/ListenButton'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = getDocBySlug(slug.join('/'))
  if (!doc) return {}
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  }
}

export default async function WikiPage({ params }: Props) {
  const { slug } = await params
  const doc = getDocBySlug(slug.join('/'))
  if (!doc) notFound()

  const related = getRelatedDocs(doc)
  const etipitakaUrl = buildEtipitakaUrl(doc.frontmatter.ref, doc.frontmatter.etipitaka)
  const breadcrumbs = slug.map((s, i) => ({
    label: s,
    href: '/wiki/' + slug.slice(0, i + 1).join('/'),
  }))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-stone-400 mb-6">
        <Link href="/wiki" className="hover:text-stone-600">Wiki</Link>
        {breadcrumbs.map((crumb) => (
          <span key={crumb.href} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3" />
            <Link href={crumb.href} className="hover:text-stone-600 capitalize">
              {crumb.label}
            </Link>
          </span>
        ))}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8">
        {/* Main content */}
        <article>
          {/* Header */}
          <header className="mb-8 pb-6 border-b border-stone-200">
            <h1 className="text-2xl font-semibold text-stone-800 mb-3">
              {doc.frontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {doc.frontmatter.ref && (
                etipitakaUrl ? (
                  <a
                    href={etipitakaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 hover:border-amber-400 hover:bg-amber-100 rounded-lg px-3 py-2 w-fit transition-colors"
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>{doc.frontmatter.ref}</span>
                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                  </a>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 w-fit">
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>{doc.frontmatter.ref}</span>
                  </div>
                )
              )}
              {doc.frontmatter.watnapp && (
                <a
                  href={doc.frontmatter.watnapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100 rounded-lg px-3 py-2 transition-colors"
                >
                  <Library className="w-4 h-4 shrink-0" />
                  <span>พุทธวจน</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                </a>
              )}
              <ListenButton text={doc.content} title={doc.frontmatter.title} />
            </div>
            {doc.frontmatter.tags?.length ? (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {doc.frontmatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="flex items-center gap-1 text-xs bg-stone-100 text-stone-500 hover:bg-amber-50 hover:text-amber-600 px-2.5 py-1 rounded-full transition-colors"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}
          </header>

          {/* MDX body */}
          <div className="prose prose-stone prose-sm max-w-none
            prose-headings:font-semibold
            prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
            prose-p:leading-relaxed
            prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-amber-300 prose-blockquote:bg-amber-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1
            prose-code:bg-stone-100 prose-code:rounded prose-code:px-1
            prose-strong:text-stone-800
          ">
            <MDXRemote source={doc.content} />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Related */}
          {related.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">
                หัวข้อที่เกี่ยวข้อง
              </h3>
              <div className="space-y-1">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/wiki/${r.slug}`}
                    className="block p-2.5 rounded-lg text-sm text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    {r.frontmatter.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
