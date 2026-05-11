'use client'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  size?: 'sm' | 'lg'
  defaultValue?: string
}

export function SearchBar({ size = 'sm', defaultValue = '' }: SearchBarProps) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    router.push(`/search?q=${encodeURIComponent(value.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search
        className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none',
          size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
        )}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="ค้นหา เช่น อริยสัจ นิวรณ์ กสิณ..."
        className={cn(
          'w-full bg-stone-100 border border-transparent rounded-lg text-stone-800 placeholder:text-stone-400',
          'focus:outline-none focus:bg-white focus:border-amber-300 transition-all',
          size === 'lg'
            ? 'pl-12 pr-4 py-3.5 text-base'
            : 'pl-9 pr-3 py-2 text-sm'
        )}
      />
    </form>
  )
}
