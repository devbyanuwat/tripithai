'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, MessageCircle, BookOpen, Home, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', icon: Home, label: 'หน้าแรก' },
  { href: '/search', icon: Search, label: 'ค้นหา' },
  { href: '/ask', icon: MessageCircle, label: 'ถาม AI' },
]

const WIKI_TREE = [
  {
    label: 'พระวินัยปิฎก',
    href: '/wiki/vinaya',
    children: [
      { label: 'มหาวิภังค์', href: '/wiki/vinaya/mahavibhanga' },
      { label: 'ภิกขุนีวิภังค์', href: '/wiki/vinaya/bhikkhunivibhanga' },
      { label: 'ขันธกะ', href: '/wiki/vinaya/khandhaka' },
    ],
  },
  {
    label: 'พระสุตตันตปิฎก',
    href: '/wiki/suttanta',
    children: [
      { label: 'ทีฆนิกาย', href: '/wiki/suttanta/digha' },
      { label: 'มัชฌิมนิกาย', href: '/wiki/suttanta/majjhima' },
      { label: 'สังยุตตนิกาย', href: '/wiki/suttanta/samyutta' },
      { label: 'อังคุตตรนิกาย', href: '/wiki/suttanta/anguttara' },
      { label: 'ขุททกนิกาย', href: '/wiki/suttanta/khuddaka' },
    ],
  },
  {
    label: 'พระอภิธรรมปิฎก',
    href: '/wiki/abhidhamma',
    children: [
      { label: 'ธัมมสังคณี', href: '/wiki/abhidhamma/dhammasangani' },
      { label: 'วิภังค์', href: '/wiki/abhidhamma/vibhanga' },
      { label: 'ธาตุกถา', href: '/wiki/abhidhamma/dhatukatha' },
    ],
  },
]

function WikiTree() {
  const [open, setOpen] = useState<string | null>('พระสุตตันตปิฎก')
  const pathname = usePathname()

  return (
    <div className="space-y-0.5">
      {WIKI_TREE.map((section) => (
        <div key={section.label}>
          <button
            onClick={() => setOpen(open === section.label ? null : section.label)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-stone-500 hover:text-stone-700 uppercase tracking-wide"
          >
            {section.label}
            <ChevronDown
              className={cn('w-3 h-3 transition-transform', open === section.label && 'rotate-180')}
            />
          </button>
          {open === section.label && (
            <div className="ml-2 space-y-0.5">
              {section.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    'block px-3 py-1.5 rounded-md text-sm transition-colors',
                    pathname === child.href
                      ? 'bg-amber-100 text-amber-800 font-medium'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-800'
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-stone-200 bg-white shrink-0 sticky top-0 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-stone-100">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🪷</span>
          <div>
            <p className="font-semibold text-stone-800 text-sm">TripiThai</p>
            <p className="text-xs text-stone-400">พระไตรปิฎกภาษาไทย</p>
          </div>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="px-2 py-3 space-y-0.5">
        {NAV.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
              pathname === href
                ? 'bg-amber-50 text-amber-700 font-medium'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-800'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-2 py-2">
        <div className="h-px bg-stone-100" />
      </div>

      {/* Wiki tree */}
      <div className="px-2 py-2 flex-1">
        <WikiTree />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-stone-100">
        <p className="text-xs text-stone-400">อ้างอิงพระไตรปิฎกฉบับมหาจุฬาฯ</p>
      </div>
    </aside>
  )
}
