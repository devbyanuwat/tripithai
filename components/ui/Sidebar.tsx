'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, MessageCircle, Home, ChevronDown, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useMobileMenu } from '@/components/ui/MobileMenuContext'
import { cn } from '@/lib/utils'
import type { NavNode } from '@/lib/nav'

const NAV = [
  { href: '/', icon: Home, label: 'หน้าแรก' },
  { href: '/search', icon: Search, label: 'ค้นหา' },
  { href: '/ask', icon: MessageCircle, label: 'ถาม AI' },
]

function NavBranch({
  node,
  depth,
  openSet,
  toggle,
  pathname,
  onNavigate,
}: {
  node: NavNode
  depth: number
  openSet: Set<string>
  toggle: (href: string) => void
  pathname: string
  onNavigate: () => void
}) {
  if (node.children?.length) {
    const isOpen = openSet.has(node.href)
    const headClass =
      depth === 0
        ? 'w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500 hover:text-stone-700'
        : 'w-full flex items-center justify-between px-3 py-1.5 text-sm font-medium text-stone-600 hover:text-stone-800'
    return (
      <div>
        <button onClick={() => toggle(node.href)} className={headClass}>
          <span className="text-left">{node.label}</span>
          <ChevronDown className={cn('w-3 h-3 shrink-0 transition-transform', isOpen && 'rotate-180')} />
        </button>
        {isOpen && (
          <div className={cn('space-y-0.5', depth === 0 ? 'ml-2' : 'ml-3 border-l border-stone-100 pl-1')}>
            {node.children.map((child) => (
              <NavBranch
                key={child.href}
                node={child}
                depth={depth + 1}
                openSet={openSet}
                toggle={toggle}
                pathname={pathname}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={node.href}
      onClick={onNavigate}
      className={cn(
        'block px-3 py-1.5 rounded-md text-sm transition-colors',
        pathname === node.href
          ? 'bg-amber-100 text-amber-800 font-medium'
          : 'text-stone-600 hover:bg-stone-100 hover:text-stone-800',
      )}
    >
      {node.label}
    </Link>
  )
}

// hrefs ของโฟลเดอร์บรรพบุรุษของ path ปัจจุบัน (ไม่รวม leaf) เพื่อกางเมนูให้เห็นบทที่เปิดอยู่
function ancestorsOf(pathname: string): string[] {
  const parts = pathname.split('/').filter(Boolean)
  if (parts[0] !== 'wiki') return []
  const acc: string[] = []
  let cur = '/wiki'
  for (let i = 1; i < parts.length - 1; i++) {
    cur += '/' + parts[i]
    acc.push(cur)
  }
  return acc
}

function WikiTree({ tree, onNavigate }: { tree: NavNode[]; onNavigate: () => void }) {
  const pathname = usePathname()
  const [openSet, setOpenSet] = useState<Set<string>>(
    () => new Set<string>(['/wiki/suttanta', ...ancestorsOf(pathname)]),
  )

  useEffect(() => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      ancestorsOf(pathname).forEach((h) => next.add(h))
      return next
    })
  }, [pathname])

  const toggle = (href: string) =>
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(href)) next.delete(href)
      else next.add(href)
      return next
    })

  return (
    <div className="space-y-0.5">
      {tree.map((node) => (
        <NavBranch
          key={node.href}
          node={node}
          depth={0}
          openSet={openSet}
          toggle={toggle}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  )
}

export function Sidebar({ tree }: { tree: NavNode[] }) {
  const pathname = usePathname()
  const { isOpen, setOpen } = useMobileMenu()

  const closeMenu = () => setOpen(false)
  const handleNavigate = () => {
    if (window.innerWidth < 1024) {
      closeMenu()
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex h-screen w-[280px] shrink-0 flex-col overflow-y-auto border-r border-stone-200 bg-white transition-transform duration-[250ms] ease-out lg:sticky lg:top-0 lg:z-auto lg:w-64 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-stone-100 px-4 py-4">
          <Link href="/" className="flex items-center gap-2" onClick={handleNavigate}>
            <span className="text-2xl">🪷</span>
            <div>
              <p className="font-semibold text-stone-800 text-sm">TripiThai</p>
              <p className="text-xs text-stone-400">พระไตรปิฎกภาษาไทย</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            className="rounded-md p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-700 lg:hidden"
            aria-label="ปิดเมนู"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main nav */}
        <nav className="px-2 py-3 space-y-0.5">
          {NAV.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={handleNavigate}
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
          <WikiTree tree={tree} onNavigate={handleNavigate} />
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-stone-100">
          <p className="text-xs text-stone-400">อ้างอิงพระไตรปิฎกฉบับมหาจุฬาฯ</p>
        </div>
      </aside>
    </>
  )
}
