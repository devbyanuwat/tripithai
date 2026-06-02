type Step = {
  key: string
  label: string
  sub: string
}

// ลำดับช่วงรับรู้ในปฏิจจสมุปบาท ก่อนและหลังช่องว่าง
const BEFORE: Step[] = [
  { key: 'phassa', label: 'ผัสสะ', sub: 'การกระทบ' },
  { key: 'vedana', label: 'เวทนา', sub: 'สุข/ทุกข์/เฉย' },
]

const AFTER: Step[] = [
  { key: 'tanha', label: 'ตัณหา', sub: 'อยาก/ผลักไส' },
  { key: 'upadana', label: 'อุปาทาน', sub: 'ยึดมั่น' },
  { key: 'papanca', label: 'ปปัญจะ', sub: 'ความคิดท่วมท้น' },
]

function StepCard({ step, tone }: { step: Step; tone: 'calm' | 'heat' }) {
  const border = tone === 'calm' ? 'border-amber-300' : 'border-orange-300'
  const numTone = tone === 'calm' ? 'text-amber-700' : 'text-orange-600'
  return (
    <div className={`flex min-w-[96px] flex-col items-center rounded-xl border ${border} bg-white px-3 py-2.5`}>
      <span className={`text-sm font-bold ${numTone}`}>{step.label}</span>
      <span className="mt-0.5 text-[11px] text-stone-500">{step.sub}</span>
    </div>
  )
}

export function PhassaGap() {
  return (
    <figure
      data-phassa-gap
      className="not-prose my-8 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-stone-50 to-amber-50/40 p-4 sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700/80">
            ช่องว่างระหว่างผัสสะ
          </p>
          <h3 className="mt-1 text-base font-semibold text-stone-800">
            จุดเดียวที่ตัดวงจรทุกข์ได้ง่ายที่สุด
          </h3>
        </div>
        <p className="text-xs text-stone-500">รู้ทันที่ช่องว่าง = วงจรขาด</p>
      </div>

      {/* แถวบน: สองทางเลือกจากช่องว่าง */}
      <div className="mb-3 grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            มีสติ
          </p>
          <p className="mt-1 text-sm font-semibold text-stone-800">
            หยุดแค่ &ldquo;สักว่าเห็น สักว่าได้ยิน&rdquo;
          </p>
          <p className="mt-0.5 text-[11px] text-stone-500">
            ไม่เติมตัวเราเข้าไป — ทุกข์ไม่มีที่ตั้ง
          </p>
        </div>
        <div className="rounded-xl border border-orange-300 bg-orange-50/70 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
            ขาดสติ
          </p>
          <p className="mt-1 text-sm font-semibold text-stone-800">
            ไหลต่อเป็นความอยากและความยึด
          </p>
          <p className="mt-0.5 text-[11px] text-stone-500">
            บานปลายเป็นปปัญจะ — ความคิดท่วมท้น
          </p>
        </div>
      </div>

      {/* แถวกลาง: สายปฏิจจสมุปบาท + ช่องว่างตรงกลาง */}
      <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:gap-2">
        {BEFORE.map((s) => (
          <StepCard key={s.key} step={s} tone="calm" />
        ))}

        {/* ช่องว่าง — จุดตัด */}
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-500 bg-amber-100/70 px-4 py-3 sm:min-w-[120px]">
          <span className="text-base font-bold text-amber-800">ช่องว่าง</span>
          <span className="mt-0.5 text-[11px] font-medium text-amber-700">รู้ทันตรงนี้</span>
          <span className="mt-1 text-[10px] uppercase tracking-wide text-emerald-700">จุดตัดวงจร</span>
        </div>

        {AFTER.map((s) => (
          <StepCard key={s.key} step={s} tone="heat" />
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-stone-500">
        ก่อนช่องว่างยังเป็นเพียงการรู้สึก · หลังช่องว่างกลายเป็นความยึดและทุกข์
      </p>

      <figcaption className="mt-4 text-xs leading-relaxed text-stone-500">
        อ้างอิงพาหิยสูตร อุทาน ขุททกนิกาย เล่ม ๒๕ และมธุปิณฑิกสูตร มัชฌิมนิกาย เล่ม ๑๒ —
        ลำดับเป็นภาพอธิบายช่วงผัสสะถึงตัณหาในปฏิจจสมุปบาท มิใช่แผนผังตายตัวในพระสูตร
      </figcaption>
    </figure>
  )
}
