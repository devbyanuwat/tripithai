type Disa = {
  key: string
  number: string
  direction: string
  axis: string
  role: string
  shortRole: string
  anchor: string
}

const DISA: Disa[] = [
  {
    key: 'above',
    number: '๖',
    direction: 'ทิศเบื้องบน',
    axis: 'อุทธมทิส',
    role: 'สมณพราหมณ์',
    shortRole: 'ครูทางจิตวิญญาณ',
    anchor: '#disa-6',
  },
  {
    key: 'east',
    number: '๑',
    direction: 'ทิศตะวันออก',
    axis: 'ปุรัตถิมทิส',
    role: 'บิดามารดา',
    shortRole: 'พ่อแม่',
    anchor: '#disa-1',
  },
  {
    key: 'south',
    number: '๒',
    direction: 'ทิศใต้',
    axis: 'ทักษิณทิส',
    role: 'ครูอาจารย์',
    shortRole: 'ครู',
    anchor: '#disa-2',
  },
  {
    key: 'below',
    number: '๕',
    direction: 'ทิศเบื้องล่าง',
    axis: 'เหฏฐิมทิส',
    role: 'ผู้อยู่ใต้บังคับ',
    shortRole: 'ลูกน้อง',
    anchor: '#disa-5',
  },
  {
    key: 'west',
    number: '๓',
    direction: 'ทิศตะวันตก',
    axis: 'ปัจฉิมทิส',
    role: 'คู่ครอง',
    shortRole: 'สามี/ภรรยา',
    anchor: '#disa-3',
  },
  {
    key: 'north',
    number: '๔',
    direction: 'ทิศเหนือ',
    axis: 'อุตตรทิส',
    role: 'มิตรสหาย',
    shortRole: 'เพื่อน',
    anchor: '#disa-4',
  },
]

const HEX_POSITIONS = [
  { x: 360, y: 100 },
  { x: 580, y: 230 },
  { x: 580, y: 470 },
  { x: 360, y: 600 },
  { x: 140, y: 470 },
  { x: 140, y: 230 },
] as const

const CENTER = { x: 360, y: 350 }

export function DisaSixDiagram() {
  return (
    <figure
      data-disa-six
      className="not-prose my-8 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-stone-50 to-amber-50/40 p-4 sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700/80">
            ทิศ ๖ ของชีวิต
          </p>
          <h3 className="mt-1 text-base font-semibold text-stone-800">
            บุคคล ๖ กลุ่มรอบผู้ครองเรือน
          </h3>
        </div>
        <p className="text-xs text-stone-500">แตะวงกลมเพื่อข้ามไปยังเนื้อหา</p>
      </div>

      <div className="hidden md:block">
        <svg
          viewBox="0 0 720 700"
          className="h-auto w-full"
          role="img"
          aria-labelledby="disa6-title disa6-desc"
        >
          <title id="disa6-title">แผนภาพทิศ ๖ ตามสิงคาลกสูตร</title>
          <desc id="disa6-desc">
            ผู้ครองเรือนตรงกลาง ล้อมรอบด้วยบุคคล ๖ กลุ่ม คือ บิดามารดา ครูอาจารย์ คู่ครอง มิตรสหาย ลูกน้อง และสมณพราหมณ์
          </desc>

          {HEX_POSITIONS.map((pos, i) => (
            <line
              key={`spoke-${i}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={pos.x}
              y2={pos.y}
              stroke="rgba(217, 119, 6, 0.18)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
          ))}

          <g>
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="78"
              fill="#fef3c7"
              stroke="#d97706"
              strokeWidth="2.5"
            />
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="92"
              fill="none"
              stroke="rgba(217, 119, 6, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            <text
              x={CENTER.x}
              y={CENTER.y - 8}
              textAnchor="middle"
              fill="#78350f"
              fontSize="15"
              fontWeight="700"
            >
              ผู้ครองเรือน
            </text>
            <text
              x={CENTER.x}
              y={CENTER.y + 14}
              textAnchor="middle"
              fill="#92400e"
              fontSize="12"
            >
              คิหิวินัย
            </text>
          </g>

          {DISA.map((d, i) => {
            const pos = HEX_POSITIONS[i]
            return (
              <a key={d.key} href={d.anchor} aria-label={`${d.direction} — ${d.role}`}>
                <g className="transition-transform">
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="70"
                    fill="white"
                    stroke="#d97706"
                    strokeWidth="2"
                    className="transition-all hover:fill-amber-100"
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 24}
                    textAnchor="middle"
                    fill="#b45309"
                    fontSize="22"
                    fontWeight="700"
                  >
                    {d.number}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y - 2}
                    textAnchor="middle"
                    fill="#57534e"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {d.direction}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y + 18}
                    textAnchor="middle"
                    fill="#292524"
                    fontSize="13"
                    fontWeight="700"
                  >
                    {d.role}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y + 38}
                    textAnchor="middle"
                    fill="#a8a29e"
                    fontSize="10"
                    fontStyle="italic"
                  >
                    {d.axis}
                  </text>
                </g>
              </a>
            )
          })}
        </svg>
      </div>

      <div className="md:hidden grid grid-cols-2 gap-2.5">
        {DISA.map((d) => (
          <a
            key={d.key}
            href={d.anchor}
            className="group flex flex-col gap-1 rounded-xl border border-amber-200 bg-white px-3 py-3 transition-colors hover:border-amber-400 hover:bg-amber-50"
            aria-label={`${d.direction} — ${d.role}`}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-amber-700">{d.number}</span>
              <span className="text-[11px] text-stone-500">{d.direction}</span>
            </div>
            <p className="text-sm font-semibold text-stone-800">{d.role}</p>
            <p className="text-[11px] italic text-stone-400">{d.axis}</p>
          </a>
        ))}
      </div>

      <figcaption className="mt-4 text-xs leading-relaxed text-stone-500">
        อ้างอิงสิงคาลกสูตร ทีฆนิกาย ปาฏิกวรรค เล่ม ๑๑ — การจัดวางทิศตามผู้ที่หันหน้าไปทางทิศตะวันออก
      </figcaption>
    </figure>
  )
}
