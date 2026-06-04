type Dimension = {
  axis: string
  blame: string
  praise: string
}

// ๓ ด้านที่ใช้วัดกามโภคี ตามกามโภคีสูตร
const DIMENSIONS: Dimension[] = [
  {
    axis: 'การแสวงหา',
    blame: 'หาโดยไม่ชอบธรรม เบียดเบียนผู้อื่น',
    praise: 'หาโดยชอบธรรม ไม่ข่มเหงใคร',
  },
  {
    axis: 'การใช้ทรัพย์',
    blame: 'ไม่เลี้ยงตน ไม่แบ่งปัน ไม่ทำบุญ',
    praise: 'เลี้ยงตน แบ่งปัน และทำบุญ',
  },
  {
    axis: 'ท่าทีของใจ',
    blame: 'ติดใจ หมกมุ่น ไม่เห็นทางออก',
    praise: 'ไม่ติด เห็นโทษ มีปัญญาสลัดออก',
  },
]

export function KamabhogiMatrix() {
  return (
    <figure
      data-kamabhogi-matrix
      className="not-prose my-8 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-stone-50 to-amber-50/40 p-4 sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700/80">
            กามโภคีสูตร
          </p>
          <h3 className="mt-1 text-base font-semibold text-stone-800">
            วัดผู้มีทรัพย์ที่คุณภาพ ๓ ด้าน
          </h3>
        </div>
        <p className="text-xs text-stone-500">ไม่ใช่จำนวนทรัพย์ แต่เป็นคุณภาพ</p>
      </div>

      {/* หัวคอลัมน์ */}
      <div className="mb-2 grid grid-cols-[auto_1fr_1fr] items-center gap-2 sm:gap-3">
        <span className="w-20 sm:w-24" />
        <span className="rounded-md bg-stone-200 px-2 py-1 text-center text-xs font-semibold text-stone-600">
          ควรติ
        </span>
        <span className="rounded-md bg-emerald-100 px-2 py-1 text-center text-xs font-semibold text-emerald-700">
          ควรสรรเสริญ
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {DIMENSIONS.map((d, i) => (
          <div
            key={d.axis}
            className="grid grid-cols-[auto_1fr_1fr] items-stretch gap-2 sm:gap-3"
          >
            <span className="flex w-20 items-center text-xs font-semibold text-amber-700 sm:w-24">
              {i + 1}. {d.axis}
            </span>
            <span className="rounded-lg border border-stone-300 bg-stone-100/80 px-3 py-2 text-sm text-stone-600">
              {d.blame}
            </span>
            <span className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-sm text-stone-700">
              {d.praise}
            </span>
          </div>
        ))}
      </div>

      {/* ผู้เลิศ = ครบทั้ง ๓ ด้านฝั่งสรรเสริญ */}
      <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50/70 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          กามโภคีผู้เลิศ
        </p>
        <p className="mt-1 text-sm text-stone-700">
          ครบทั้ง ๓ ด้านฝั่งสรรเสริญ — หาชอบธรรม + ใช้ครบวงจร + ใจเป็นอิสระไปพร้อมกัน
        </p>
      </div>

      <figcaption className="mt-4 text-xs leading-relaxed text-stone-500">
        อ้างอิงกามโภคีสูตร อังคุตตรนิกาย ทสกนิบาต เล่ม ๒๔ —
        สูตรจำแนกกามโภคี ๑๐ ประเภทจากการผสมเงื่อนไข ๓ ด้านนี้ ตารางเป็นภาพสรุปหลักการ
      </figcaption>
    </figure>
  )
}
