import { Check } from 'lucide-react'

type Rung = {
  level: string
  cut: string
  reach: string
  tone: 'base' | 'mid' | 'top' | 'key'
}

// ไล่จากยอด (อรหันต์) ลงมาฐาน — ตามลำดับการละสังโยชน์
const RUNGS: Rung[] = [
  { level: 'อรหันต์', cut: 'ละสังโยชน์ครบ ๑๐', reach: 'ยาก แต่ทำได้', tone: 'top' },
  { level: 'อนาคามี', cut: 'ละสังโยชน์เบื้องต่ำ ๕', reach: 'ภาวนาเข้มข้น', tone: 'mid' },
  { level: 'สกทาคามี', cut: 'ราคะ โทสะ โมหะ เบาบาง', reach: 'ภาวนาเข้มข้น', tone: 'mid' },
  { level: 'โสดาบัน', cut: 'ละสังโยชน์ ๓', reach: 'ทำได้ในชาตินี้', tone: 'key' },
  { level: 'เกิดดี / เทวดา-พรหม', cut: '๕ ธรรม + น้อมจิต', reach: 'ฐานเริ่มต้น', tone: 'base' },
]

const SOTAPANNA_CHECK = [
  'คบสัตบุรุษ',
  'ฟังสัทธรรม',
  'โยนิโสมนสิการ',
  'ปฏิบัติธรรมสมควรแก่ธรรม',
]

function reachChipClass(tone: Rung['tone']) {
  if (tone === 'key') return 'bg-emerald-100 text-emerald-700'
  if (tone === 'base') return 'bg-amber-100 text-amber-700'
  return 'bg-stone-200 text-stone-600'
}

export function AriyaLadder() {
  return (
    <figure
      data-ariya-ladder
      className="not-prose my-8 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-stone-50 to-amber-50/40 p-4 sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700/80">
            บันไดความปรารถนา
          </p>
          <h3 className="mt-1 text-base font-semibold text-stone-800">
            แต่ละขั้น ทำเหตุอะไร และทำได้แค่ไหน
          </h3>
        </div>
        <p className="text-xs text-stone-500">เป้ายิ่งสูง เหตุยิ่งประณีต</p>
      </div>

      <div className="flex flex-col gap-2">
        {RUNGS.map((r) => {
          const isKey = r.tone === 'key'
          return (
            <div
              key={r.level}
              className={
                isKey
                  ? 'rounded-xl border-2 border-emerald-300 bg-emerald-50/60 p-3.5'
                  : 'rounded-xl border border-amber-200 bg-white p-3.5'
              }
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-stone-800">{r.level}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${reachChipClass(r.tone)}`}>
                  {r.reach}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-500">{r.cut}</p>

              {isKey && (
                <div className="mt-2.5 border-t border-emerald-200 pt-2.5">
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                    เช็กลิสต์ โสตาปัตติยังคะ ๔
                  </p>
                  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {SOTAPANNA_CHECK.map((c) => (
                      <span key={c} className="flex items-center gap-2 text-sm text-stone-700">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-emerald-400 text-emerald-600">
                          <Check className="h-3 w-3" />
                        </span>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* พุทธภูมิ = อีกเส้นทาง */}
      <div className="mt-3 rounded-xl border border-dashed border-amber-400 bg-amber-50/50 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-stone-800">พุทธภูมิ</span>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-700">
            อีกเส้นทาง · นับอสงไขย
          </span>
        </div>
        <p className="mt-1 text-xs text-stone-500">
          ไม่ใช่เช็กลิสต์รายวัน แต่เป็นการตั้งจิตและสั่งสมบารมี ๑๐ ข้ามภพข้ามชาติ
        </p>
      </div>

      <figcaption className="mt-4 text-xs leading-relaxed text-stone-500">
        อ้างอิงสังขารูปปัตติสูตร มัชฌิมนิกาย เล่ม ๑๔ และโสตาปัตติสังยุต สังยุตตนิกาย เล่ม ๑๙ —
        ส่วนระยะเวลานับอสงไขยของพุทธภูมิเป็นเนื้อหาตามอรรถกถา ภาพนี้เป็นแผนผังสรุป
      </figcaption>
    </figure>
  )
}
