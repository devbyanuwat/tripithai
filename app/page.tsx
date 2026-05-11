import Link from 'next/link'
import { Search, MessageCircle, BookOpen, ChevronRight } from 'lucide-react'
import { SearchBar } from '@/components/search/SearchBar'

const FEATURED = [
  { title: 'อริยสัจ ๔', slug: 'suttanta/digha/ariyasacca', desc: 'หัวใจของพระพุทธศาสนา' },
  { title: 'อานาปานสติ', slug: 'suttanta/majjhima/anapanasati', desc: 'การเจริญสติด้วยลมหายใจ' },
  { title: 'กสิณ ๑๐', slug: 'suttanta/anguttara/kasina', desc: 'กรรมฐานแบบเพ่ง' },
  { title: 'ภพภูมิ ๓๑', slug: 'suttanta/anguttara/bhumi', desc: 'โลกและสรรพสัตว์ในสังสารวัฏ' },
  { title: 'โพชฌงค์ ๗', slug: 'suttanta/samyutta/bojjhanga', desc: 'องค์แห่งการตรัสรู้' },
  { title: 'นิวรณ์ ๕', slug: 'suttanta/anguttara/nivarana', desc: 'สิ่งกั้นจิตไม่ให้สงบ' },
]

const NIKAYA = [
  { name: 'พระวินัยปิฎก', slug: 'vinaya', count: '3 ปิฎก', color: 'bg-amber-50 border-amber-200 text-amber-800' },
  { name: 'ทีฆนิกาย', slug: 'suttanta/digha', count: '34 สูตร', color: 'bg-sky-50 border-sky-200 text-sky-800' },
  { name: 'มัชฌิมนิกาย', slug: 'suttanta/majjhima', count: '152 สูตร', color: 'bg-sky-50 border-sky-200 text-sky-800' },
  { name: 'สังยุตตนิกาย', slug: 'suttanta/samyutta', count: '56 สังยุต', color: 'bg-sky-50 border-sky-200 text-sky-800' },
  { name: 'อังคุตตรนิกาย', slug: 'suttanta/anguttara', count: '11 นิบาต', color: 'bg-sky-50 border-sky-200 text-sky-800' },
  { name: 'ขุททกนิกาย', slug: 'suttanta/khuddaka', count: '15 คัมภีร์', color: 'bg-sky-50 border-sky-200 text-sky-800' },
  { name: 'พระอภิธรรมปิฎก', slug: 'abhidhamma', count: '7 คัมภีร์', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
]

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="text-4xl">🪷</div>
        <h1 className="text-3xl font-semibold text-stone-800">TripiThai</h1>
        <p className="text-stone-500 text-lg max-w-xl mx-auto">
          ค้นหาและเรียนรู้พระไตรปิฎก — ค้นหาด้วย keyword, ถาม-ตอบด้วย AI, หรืออ่านแบบ Wiki
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar size="lg" />
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-4">
        <Link href="/search" className="group flex flex-col items-center gap-3 p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all">
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-center">
            <p className="font-medium text-stone-800">ค้นหา</p>
            <p className="text-xs text-stone-400 mt-0.5">Keyword search ทันที</p>
          </div>
        </Link>
        <Link href="/ask" className="group flex flex-col items-center gap-3 p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all">
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-center">
            <p className="font-medium text-stone-800">ถาม AI</p>
            <p className="text-xs text-stone-400 mt-0.5">ตอบพร้อมอ้างอิง</p>
          </div>
        </Link>
        <Link href="/wiki" className="group flex flex-col items-center gap-3 p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all">
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-center">
            <p className="font-medium text-stone-800">Wiki</p>
            <p className="text-xs text-stone-400 mt-0.5">อ่านแบบสารานุกรม</p>
          </div>
        </Link>
      </div>

      {/* Featured topics */}
      <div>
        <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-4">หัวข้อแนะนำ</h2>
        <div className="grid grid-cols-2 gap-3">
          {FEATURED.map((item) => (
            <Link
              key={item.slug}
              href={`/wiki/${item.slug}`}
              className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-300 hover:shadow-sm transition-all group"
            >
              <div>
                <p className="font-medium text-stone-800 group-hover:text-amber-700 transition-colors">{item.title}</p>
                <p className="text-xs text-stone-400 mt-0.5">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-amber-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Browse by Nikaya */}
      <div>
        <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-4">เรียกดูตามนิกาย</h2>
        <div className="flex flex-wrap gap-2">
          {NIKAYA.map((n) => (
            <Link
              key={n.slug}
              href={`/wiki/${n.slug}`}
              className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium hover:shadow-sm transition-all ${n.color}`}
            >
              {n.name}
              <span className="opacity-60 text-xs">{n.count}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
