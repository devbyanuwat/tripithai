'use client'
import { SearchBar } from '@/components/search/SearchBar'
import { Menu } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-stone-200">
      <div className="flex items-center gap-3 px-4 h-14">
        <button className="lg:hidden p-1.5 text-stone-500 hover:text-stone-700">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
