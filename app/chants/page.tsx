import { getDocsByPrefix } from '@/lib/mdx'
import { ChantBrowser, type ChantItem } from '@/components/chants/ChantBrowser'

export const metadata = {
  title: 'บทสวด',
  description:
    'รวมบทสวดสำคัญ แสดงบาลีอักษรไทย คำอ่าน และคำแปล จัดหมวดตามการใช้ เช่น ทำวัตรเช้า-เย็น ปริตรป้องกันภัย และการแผ่เมตตา',
}

export default function ChantsRoot() {
  const items: ChantItem[] = getDocsByPrefix('chants')
    .map((doc) => ({
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      ref: doc.frontmatter.ref,
      chantUses: doc.frontmatter.chantUses ?? [],
    }))
    .sort((a, b) => a.title.localeCompare(b.title, 'th'))

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.24em] text-amber-700/80">TripiThai</p>
        <h1 className="mt-1 text-2xl font-bold text-stone-800">บทสวด</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">
          รวมบทสวดสำคัญ แต่ละบทแสดง ๓ ชั้น — บาลีอักษรไทย คำอ่าน และคำแปล
          เลือกดูตามหมวดการใช้ได้จากปุ่มด้านล่าง
        </p>
      </header>

      {items.length === 0 ? (
        <p className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-8 text-center text-sm text-stone-500">
          ยังไม่มีบทสวดในระบบ
        </p>
      ) : (
        <ChantBrowser items={items} />
      )}
    </div>
  )
}
