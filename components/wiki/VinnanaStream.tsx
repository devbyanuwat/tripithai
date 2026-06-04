import { ChevronRight } from 'lucide-react'

// จิตเกิดดับดวงต่อดวง — ดวงก่อนหน้าดับไป (จาง) จนถึงดวงปัจจุบัน แล้วมีช่องว่างก่อนดวงถัดไป
const PAST = [
  { n: 'ดวงก่อน', opacity: 'opacity-30' },
  { n: 'ดวงก่อน', opacity: 'opacity-50' },
  { n: 'ดวงก่อน', opacity: 'opacity-70' },
]

function Dot({
  label,
  sub,
  tone,
  className = '',
}: {
  label: string
  sub: string
  tone: 'past' | 'now' | 'next'
  className?: string
}) {
  const base =
    tone === 'now'
      ? 'border-amber-400 bg-amber-100 text-amber-800'
      : tone === 'next'
        ? 'border-2 border-dashed border-amber-300 bg-white text-amber-500'
        : 'border-stone-200 bg-stone-100 text-stone-400'
  return (
    <div
      className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border text-center ${base} ${className}`}
    >
      <span className="text-xs font-semibold leading-tight">{label}</span>
      <span className="text-[10px] leading-tight">{sub}</span>
    </div>
  )
}

export function VinnanaStream() {
  return (
    <figure
      data-vinnana-stream
      className="not-prose my-8 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-stone-50 to-amber-50/40 p-4 sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700/80">อัสสุตวาสูตร</p>
          <h3 className="mt-1 text-base font-semibold text-stone-800">
            วิญญาณเกิดดับ ดวงต่อดวง
          </h3>
        </div>
        <p className="text-xs text-stone-500">ไม่มีสองดวงพร้อมกัน มีแต่สืบต่อ</p>
      </div>

      {/* อุปมาวานร */}
      <p className="mb-4 rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs text-stone-600">
        ดุจวานรไพรคว้ากิ่งไม้ทีละกิ่ง ปล่อยกิ่งเก่าแล้วคว้ากิ่งใหม่ไม่หยุด จิตก็จับอารมณ์ทีละขณะเช่นนั้น
      </p>

      {/* กระแสดวงต่อดวง */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:gap-2">
        {PAST.map((p, i) => (
          <div key={i} className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Dot label={p.n} sub="ดับแล้ว" tone="past" className={p.opacity} />
            <ChevronRight className="h-4 w-4 shrink-0 text-stone-300" aria-hidden />
          </div>
        ))}

        <Dot label="ปัจจุบัน" sub="กำลังรู้" tone="now" />

        {/* ช่องว่าง */}
        <div className="mx-0.5 flex h-16 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 px-3 sm:mx-1">
          <span className="text-xs font-bold text-emerald-700">ช่องว่าง</span>
          <span className="text-[10px] text-emerald-600">สติเห็นเกิด-ดับ</span>
        </div>

        <ChevronRight className="h-4 w-4 shrink-0 text-amber-300" aria-hidden />
        <Dot label="ดวงถัดไป" sub="กำลังเกิด" tone="next" />
      </div>

      <p className="mt-3 text-center text-xs text-stone-500">
        เห็นว่าแต่ละดวงสักว่าเกิดแล้วดับ ไม่มีดวงไหนเป็น &ldquo;ตัวเรา&rdquo;
      </p>

      <figcaption className="mt-4 text-xs leading-relaxed text-stone-500">
        อ้างอิงอัสสุตวาสูตร สังยุตตนิกาย นิทานวรรค เล่ม ๑๖ —
        ภาพแสดงการสืบต่อของจิตเชิงอุปมา ส่วนรายละเอียดขณะจิตและภวังค์เป็นเนื้อหาชั้นอภิธรรม
      </figcaption>
    </figure>
  )
}
