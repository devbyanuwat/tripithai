type Pair = {
  quality: string
  good: string
  bad: string
}

// สัทธรรม ๗ เทียบอสัทธรรม ๗ ตามที่ปรากฏในบทความ
const PAIRS: Pair[] = [
  { quality: 'ศรัทธา', good: 'มีศรัทธา', bad: 'ไม่มีศรัทธา' },
  { quality: 'หิริ', good: 'ละอายต่อบาป', bad: 'ไม่ละอาย' },
  { quality: 'โอตตัปปะ', good: 'เกรงกลัวบาป', bad: 'ไม่เกรงกลัว' },
  { quality: 'สุตะ', good: 'ได้สดับมาก', bad: 'ได้สดับน้อย' },
  { quality: 'วิริยะ', good: 'ขยันเพียร', bad: 'เกียจคร้าน' },
  { quality: 'สติ', good: 'สติมั่นคง', bad: 'สติเลอะเลือน' },
  { quality: 'ปัญญา', good: 'มีปัญญา', bad: 'ปัญญาทราม' },
]

export function AsappurisaContrast() {
  return (
    <figure
      data-asappurisa-contrast
      className="not-prose my-8 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-stone-50 to-amber-50/40 p-4 sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700/80">
            สัทธรรม ๗ เทียบ อสัทธรรม ๗
          </p>
          <h3 className="mt-1 text-base font-semibold text-stone-800">
            คุณธรรมพื้นฐานที่แยกสัตบุรุษจากอสัตบุรุษ
          </h3>
        </div>
        <p className="text-xs text-stone-500">คุณธรรมเดียวกัน · คนละทิศ</p>
      </div>

      {/* หัวคอลัมน์ */}
      <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
        <span className="rounded-md bg-emerald-100 px-3 py-1.5 text-center text-xs font-semibold text-emerald-700">
          สัตบุรุษ
        </span>
        <span className="w-16 text-center text-[10px] uppercase tracking-wide text-stone-400 sm:w-24">
          คุณธรรม
        </span>
        <span className="rounded-md bg-stone-200 px-3 py-1.5 text-center text-xs font-semibold text-stone-600">
          อสัตบุรุษ
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {PAIRS.map((p) => (
          <div
            key={p.quality}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3"
          >
            <span className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-right text-sm text-stone-700">
              {p.good}
            </span>
            <span className="w-16 text-center text-xs font-semibold text-amber-700 sm:w-24">
              {p.quality}
            </span>
            <span className="rounded-lg border border-stone-300 bg-stone-100/80 px-3 py-2 text-left text-sm text-stone-600">
              {p.bad}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-stone-500">
        ทั้งสองฝั่งไม่ใช่ป้ายถาวร — เพาะคุณธรรมฝั่งซ้ายขึ้นใหม่ ก็ค่อยๆ เคลื่อนจากอสัตบุรุษมาสู่สัตบุรุษได้
      </p>

      <figcaption className="mt-4 text-xs leading-relaxed text-stone-500">
        อ้างอิงจูฬปุณณมสูตร มัชฌิมนิกาย อุปริปัณณาสก์ เล่ม ๑๔ และเรื่องสัทธรรม-อสัทธรรมพื้นฐาน —
        ตารางเป็นภาพสรุปเชิงเทียบ มิใช่แผนผังตายตัวในพระสูตร
      </figcaption>
    </figure>
  )
}
