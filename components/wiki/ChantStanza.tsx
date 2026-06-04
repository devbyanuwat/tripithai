// บทสวด 1 วรรค แสดง 3 ชั้น: บาลี(อักษรไทย) / คำอ่าน / คำแปล
// ต้นฉบับบาลีและคำอ่านอยู่ใน MDX (ไม่ฝังใน code) เว้นว่างได้ จะขึ้น placeholder รอเติม
export function ChantStanza({
  n,
  pali,
  read,
  meaning,
}: {
  n?: string
  pali?: string
  read?: string
  meaning?: string
}) {
  const hasPali = Boolean(pali && pali.trim())
  const hasRead = Boolean(read && read.trim())

  return (
    <div
      data-chant-stanza
      className="not-prose my-3.5 rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 via-stone-50 to-amber-50/30 p-4"
    >
      {n && (
        <span className="mb-2 inline-block rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
          {n}
        </span>
      )}

      {/* ชั้นบาลี pinthu (แสดงเมื่อมี) */}
      {hasPali && (
        <div className="mb-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-amber-700/70">บาลี</span>
          <p className="mt-0.5 text-lg font-medium leading-relaxed text-stone-800">{pali}</p>
        </div>
      )}

      {/* ชั้นคำอ่าน (แสดงเมื่อมี) */}
      {hasRead && (
        <div className="mb-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-amber-700/70">คำอ่าน</span>
          <p className="mt-0.5 text-base font-medium leading-relaxed text-stone-800">{read}</p>
        </div>
      )}

      {/* ชั้นคำแปล */}
      {meaning && (
        <div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-700/70">แปล</span>
          <p className="mt-0.5 text-[15px] leading-relaxed text-stone-700">{meaning}</p>
        </div>
      )}
    </div>
  )
}
