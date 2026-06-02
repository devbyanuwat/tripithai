// ภาระที่ทำให้ชีวิตครองเรือน "คับแคบ"
const BURDENS = ['ทรัพย์สิน', 'ผู้คน', 'หน้าที่', 'ความคาดหวัง', 'ความห่วง']

// สิ่งที่เปิดกว้างขึ้นเมื่อเข้าสู่ "ที่แจ้ง"
const OPENNESS = ['เวลาเงียบ', 'ปล่อยวาง', 'ฝึกใจ', 'เห็นตามจริง']

export function PabbajjaSpace() {
  return (
    <figure
      data-pabbajja-space
      className="not-prose my-8 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-stone-50 to-amber-50/40 p-4 sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700/80">
            ฆราวาสคับแคบ บรรพชาปลอดโปร่ง
          </p>
          <h3 className="mt-1 text-base font-semibold text-stone-800">
            จากที่คับแคบ ผ่านช่องเปิด สู่ที่แจ้ง
          </h3>
        </div>
        <p className="text-xs text-stone-500">คับแคบ = ความยึด · ที่แจ้ง = เงื่อนไขที่เอื้อต่อการฝึก</p>
      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-stretch">
        {/* คับแคบ */}
        <div className="flex-1 rounded-xl border border-stone-400 bg-stone-100/80 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-600">
            สมฺพาโธ · คับแคบ
          </p>
          <p className="mt-1 text-sm font-semibold text-stone-800">ฆราวาส</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {BURDENS.map((b) => (
              <span
                key={b}
                className="rounded-md border border-stone-300 bg-white px-2 py-0.5 text-[11px] text-stone-600"
              >
                {b}
              </span>
            ))}
          </div>
          <p className="mt-2.5 text-[11px] text-stone-500">
            ยิ่งยึดมาก ช่องว่างสำหรับปล่อยวางยิ่งแคบ
          </p>
        </div>

        {/* ช่องเปิด */}
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-500 bg-amber-100/70 px-3 py-3 sm:max-w-[140px]">
          <span className="text-sm font-bold text-amber-800">ช่องเปิด</span>
          <span className="mt-0.5 text-[11px] font-medium text-amber-700">เนกขัมมะ</span>
          <span className="mt-1 text-center text-[10px] leading-snug text-stone-500">
            ลดความยึด
            <br />
            ออกจากเครื่องผูกพัน
          </span>
        </div>

        {/* ที่แจ้ง */}
        <div className="flex-1 rounded-xl border border-emerald-300 bg-emerald-50/70 p-3.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            อพฺโภกาโส · ปลอดโปร่ง
          </p>
          <p className="mt-1 text-sm font-semibold text-stone-800">บรรพชา</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {OPENNESS.map((o) => (
              <span
                key={o}
                className="rounded-md border border-emerald-200 bg-white px-2 py-0.5 text-[11px] text-emerald-700"
              >
                {o}
              </span>
            ))}
          </div>
          <p className="mt-2.5 text-[11px] text-stone-500">
            ภาระน้อยลง ช่องว่างสำหรับฝึกใจเปิดกว้าง
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-stone-500">
        ที่แจ้งไม่จำกัดเฉพาะผู้บวช — ผู้ครองเรือนก็เปิดช่องว่างในใจได้ตามระดับของตน
      </p>

      <figcaption className="mt-4 text-xs leading-relaxed text-stone-500">
        อ้างอิงสำนวน สมฺพาโธ ฆราวาโส รชาปโถ อพฺโภกาโส ปพฺพชฺชา ที่ปรากฏซ้ำในหลายพระสูตร
        เช่น สามัญญผลสูตร ทีฆนิกาย เล่ม ๙ — ภาพนี้เป็นอุปมาเชิงอธิบาย มิใช่แผนผังตายตัวในพระสูตร
      </figcaption>
    </figure>
  )
}
