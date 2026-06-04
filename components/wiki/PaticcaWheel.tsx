type Link = {
  n: string
  name: string
  gloss: string
}

// นิทาน ๑๒ เรียงตามสายเกิด (อนุโลม) ตรงกับเนื้อหาในบทความ
const LINKS: Link[] = [
  { n: '๑', name: 'อวิชชา', gloss: 'ความไม่รู้' },
  { n: '๒', name: 'สังขาร', gloss: 'การปรุงแต่ง' },
  { n: '๓', name: 'วิญญาณ', gloss: 'การรับรู้' },
  { n: '๔', name: 'นามรูป', gloss: 'กายและจิต' },
  { n: '๕', name: 'สฬายตนะ', gloss: 'อายตนะ ๖' },
  { n: '๖', name: 'ผัสสะ', gloss: 'การกระทบ' },
  { n: '๗', name: 'เวทนา', gloss: 'ความรู้สึก' },
  { n: '๘', name: 'ตัณหา', gloss: 'ความอยาก' },
  { n: '๙', name: 'อุปาทาน', gloss: 'ความยึด' },
  { n: '๑๐', name: 'ภพ', gloss: 'ภาวะก่อตัว' },
  { n: '๑๑', name: 'ชาติ', gloss: 'การเกิด' },
  { n: '๑๒', name: 'ชรา-มรณะ', gloss: 'แก่และตาย' },
]

const CX = 300
const CY = 300
const R = 232 // รัศมีที่วางจุดศูนย์กลางของแต่ละโหนด
const NODE_R = 52

// index รอยต่อที่เป็นจุดตัดวงจร: เวทนา(๗) -> ตัณหา(๘)
const CUT_FROM = 6

function pos(i: number) {
  const deg = -90 + i * 30 // เริ่มที่ด้านบน หมุนตามเข็มนาฬิกา
  const rad = (deg * Math.PI) / 180
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) }
}

export function PaticcaWheel() {
  const cutMidRad = ((-90 + (CUT_FROM + 0.5) * 30) * Math.PI) / 180
  const cut = { x: CX + R * Math.cos(cutMidRad), y: CY + R * Math.sin(cutMidRad) }

  return (
    <figure
      data-paticca-wheel
      className="not-prose my-8 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-stone-50 to-amber-50/40 p-4 sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700/80">
            ปฏิจจสมุปบาท
          </p>
          <h3 className="mt-1 text-base font-semibold text-stone-800">
            วงจรนิทาน ๑๒ — สายเกิดและจุดตัดวงจร
          </h3>
        </div>
        <p className="text-xs text-stone-500">หมุนตามเข็ม = สายเกิด</p>
      </div>

      {/* วงล้อ (desktop) */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 600 600"
          className="mx-auto h-auto w-full max-w-[560px]"
          role="img"
          aria-labelledby="paticca-title paticca-desc"
        >
          <title id="paticca-title">วงล้อปฏิจจสมุปบาท นิทาน ๑๒</title>
          <desc id="paticca-desc">
            องค์ประกอบ ๑๒ เรียงเป็นวงกลมตามสายเกิด ตั้งแต่อวิชชาถึงชรามรณะ มีจุดตัดวงจรระหว่างเวทนากับตัณหา
          </desc>

          {/* วงแหวนนำสายตา */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="rgba(217, 119, 6, 0.16)"
            strokeWidth="1.5"
            strokeDasharray="5 6"
          />

          {/* ศูนย์กลาง */}
          <circle cx={CX} cy={CY} r="74" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x={CX} y={CY - 6} textAnchor="middle" fill="#78350f" fontSize="16" fontWeight="700">
            ปฏิจจสมุปบาท
          </text>
          <text x={CX} y={CY + 16} textAnchor="middle" fill="#92400e" fontSize="11">
            ทุกข์เกิด–ทุกข์ดับ
          </text>

          {/* จุดตัดวงจร */}
          <g>
            <circle cx={cut.x} cy={cut.y} r="13" fill="#ecfdf5" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
            <text x={cut.x} y={cut.y - 22} textAnchor="middle" fill="#047857" fontSize="11" fontWeight="700">
              จุดตัดวงจร
            </text>
            <text x={cut.x} y={cut.y + 30} textAnchor="middle" fill="#059669" fontSize="10">
              มีสติที่ เวทนา→ตัณหา
            </text>
          </g>

          {/* โหนด ๑๒ */}
          {LINKS.map((l, i) => {
            const p = pos(i)
            const isCut = i === CUT_FROM || i === CUT_FROM + 1
            return (
              <g key={l.n}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={NODE_R}
                  fill="white"
                  stroke={isCut ? '#059669' : '#d97706'}
                  strokeWidth={isCut ? '2.5' : '2'}
                />
                <text x={p.x} y={p.y - 20} textAnchor="middle" fill={isCut ? '#047857' : '#b45309'} fontSize="17" fontWeight="700">
                  {l.n}
                </text>
                <text x={p.x} y={p.y + 2} textAnchor="middle" fill="#292524" fontSize="13" fontWeight="700">
                  {l.name}
                </text>
                <text x={p.x} y={p.y + 20} textAnchor="middle" fill="#a8a29e" fontSize="10">
                  {l.gloss}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* รายการ (mobile) */}
      <ol className="md:hidden flex flex-col gap-1.5">
        {LINKS.map((l, i) => {
          const isCut = i === CUT_FROM || i === CUT_FROM + 1
          return (
            <li
              key={l.n}
              className={
                isCut
                  ? 'flex items-center gap-3 rounded-lg border border-emerald-300 bg-emerald-50/70 px-3 py-2'
                  : 'flex items-center gap-3 rounded-lg border border-amber-200 bg-white px-3 py-2'
              }
            >
              <span className={isCut ? 'text-sm font-bold text-emerald-700' : 'text-sm font-bold text-amber-700'}>
                {l.n}
              </span>
              <span className="text-sm font-semibold text-stone-800">{l.name}</span>
              <span className="text-xs text-stone-400">{l.gloss}</span>
            </li>
          )
        })}
      </ol>

      <p className="mt-3 text-center text-xs text-stone-500">
        อวิชชาดับ วงจรทั้งสายก็ดับ — จุดที่ตัดได้ง่ายในชีวิตประจำวันคือช่วง เวทนา → ตัณหา
      </p>

      <figcaption className="mt-4 text-xs leading-relaxed text-stone-500">
        อ้างอิงปฏิจจสมุปปาทสูตร สังยุตตนิกาย นิทานวรรค เล่ม ๑๖ —
        การวางเป็นวงกลมเป็นภาพช่วยเข้าใจลำดับเหตุปัจจัย มิใช่แผนผังตายตัวในพระสูตร
      </figcaption>
    </figure>
  )
}
