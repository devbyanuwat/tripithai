import Link from 'next/link'
import { Search, MessageCircle, BookOpen, ChevronRight } from 'lucide-react'
import { SearchBar } from '@/components/search/SearchBar'
import { BodhiHero } from '@/components/hero/BodhiHero'

const FEATURED = [
  { title: 'อริยสัจ ๔', slug: 'suttanta/digha/ariyasacca', desc: 'หัวใจของพระพุทธศาสนา' },
  { title: 'ไตรลักษณ์', slug: 'suttanta/samyutta/tilakkhana', desc: 'อนิจจัง ทุกขัง อนัตตา' },
  { title: 'มรรค ๘', slug: 'suttanta/samyutta/magga', desc: 'ทางสายกลางสู่นิพพาน' },
  { title: 'อานาปานสติ', slug: 'suttanta/majjhima/anapanasati', desc: 'การเจริญสติด้วยลมหายใจ' },
  { title: 'สติปัฏฐาน ๔', slug: 'suttanta/digha/satipatthana', desc: 'ทางเอกแห่งการดับทุกข์' },
  { title: 'กาลามสูตร', slug: 'suttanta/anguttara/kalama', desc: 'วิธีพิจารณาก่อนเชื่อ' },
]

const NIKAYA = [
  { name: 'พระวินัยปิฎก', slug: 'vinaya', count: '3 หมวด' },
  { name: 'ทีฆนิกาย', slug: 'suttanta/digha', count: '34 สูตร' },
  { name: 'มัชฌิมนิกาย', slug: 'suttanta/majjhima', count: '152 สูตร' },
  { name: 'สังยุตตนิกาย', slug: 'suttanta/samyutta', count: '56 สังยุต' },
  { name: 'อังคุตตรนิกาย', slug: 'suttanta/anguttara', count: '11 นิบาต' },
  { name: 'ขุททกนิกาย', slug: 'suttanta/khuddaka', count: '15 คัมภีร์' },
  { name: 'พระอภิธรรมปิฎก', slug: 'abhidhamma', count: '7 คัมภีร์' },
]

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

      {/* Hero */}
      <BodhiHero>
        <div className="w-full space-y-3 text-center sm:space-y-4">
          <h1 className="text-3xl font-semibold text-stone-800 drop-shadow-sm sm:text-4xl">
            TripiThai
          </h1>
          <p className="mx-auto max-w-xl text-stone-600 sm:text-lg">
            ค้นหาและเรียนรู้พระไตรปิฎก — ค้นหาด้วย keyword, ถาม-ตอบด้วย AI, หรืออ่านแบบ Wiki
          </p>
          <div className="mx-auto max-w-2xl">
            <SearchBar size="lg" />
          </div>
        </div>
      </BodhiHero>

      {/* Feature cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
              className="flex items-center gap-2 px-4 py-2 border border-amber-200 bg-amber-50/60 text-amber-800 rounded-full text-sm font-medium hover:border-amber-300 hover:bg-amber-50 transition-all"
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
