const TYPHOON_BASE = 'https://api.opentyphoon.ai/v1'
const MODEL = 'typhoon-v2.5-30b-a3b-instruct'

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface TyphoonResult {
  answer: string
  sources: string[]
  ok: boolean
  fallback: boolean
  fallbackReason?: string
}

const SYSTEM_PROMPT_WITH_CONTEXT = `คุณคือผู้ช่วยอธิบายพระไตรปิฎกเถรวาทภาษาไทย ชื่อ TripiThai

หลักการตอบที่เคร่งครัด (ห้ามทำผิด):

1. **อ้างอิงเฉพาะข้อมูลใน "ข้อมูลอ้างอิง" ที่ให้มาเท่านั้น** — ห้ามแต่งข้อมูลขึ้นมาเอง
2. **ห้ามแต่งชื่อพระสูตร / เลขเล่ม / เลขข้อ ที่ไม่อยู่ในข้อมูลอ้างอิง** — ถ้าจะอ้าง ต้อง quote ตรงจากข้อมูลที่ให้มาเท่านั้น
3. **ห้ามเขียนข้อความบาลี** เว้นแต่จะคัดลอกมาจากข้อมูลอ้างอิงตรงตัว — ห้ามแต่งบาลีขึ้นมาเอง
4. ถ้าข้อมูลอ้างอิงไม่มีคำตอบ ให้ตอบสั้นๆ ว่า: "ไม่พบข้อมูลในพระไตรปิฎกที่มีในเว็บไซต์นี้สำหรับคำถามนี้ — โปรดค้นหาหรือดู wiki"
5. ตอบเป็นภาษาไทยที่เข้าใจง่าย กระชับ ใช้ markdown สำหรับ bold/list/quote ได้
6. ถ้าไม่แน่ใจ ตอบสั้น ดีกว่าตอบยาวที่อาจผิด
7. ห้ามตอบยาวเกินจำเป็น — ใจความสำคัญพอ ขนาดประมาณ 200-400 คำ`

const SYSTEM_PROMPT_NO_CONTEXT = `คุณคือ TripiThai ผู้ช่วยพระไตรปิฎกเถรวาทภาษาไทย

ในกรณีนี้ไม่มีข้อมูลอ้างอิงจาก wiki ของเรา — ให้ตอบสั้นๆ ว่า:

"ไม่พบข้อมูลในพระไตรปิฎกที่มีในเว็บไซต์นี้สำหรับคำถามนี้ ลองค้นหาด้วยคำอื่น หรืออ่านหัวข้อใกล้เคียงในหน้า Wiki"

ห้ามแต่งคำตอบ ห้ามแต่งชื่อพระสูตร ห้ามอ้างเล่ม/ข้อ ห้ามเขียนบาลี`

/**
 * Detect runaway/looping output (e.g. same word repeated dozens of times).
 * Returns true if the answer looks pathological and should be treated as fallback.
 */
function looksDegenerate(answer: string): boolean {
  if (!answer || answer.length < 50) return false
  // Any single token (Thai word / Pali) repeated 8+ times in a row
  if (/(\S+)(\s+\1){7,}/u.test(answer)) return true
  // Same character class spammed
  if (/(.)\1{40,}/u.test(answer)) return true
  // > 30% of tokens are identical
  const tokens = answer.split(/\s+/).filter(Boolean)
  if (tokens.length >= 30) {
    const counts = new Map<string, number>()
    for (const t of tokens) counts.set(t, (counts.get(t) ?? 0) + 1)
    const max = Math.max(...counts.values())
    if (max / tokens.length > 0.3) return true
  }
  return false
}

/**
 * ถาม Typhoon พร้อม context จาก RAG
 * ถ้า API ไม่พร้อม → return sources ดิบให้ user อ่านเอง (ไม่ crash)
 */
export async function askTyphoon(
  question: string,
  context: string[],
  history: Message[] = []
): Promise<TyphoonResult> {
  const sources = context.map((_, i) => `[${i + 1}]`)
  const hasContext = context.length > 0

  if (!process.env.TYPHOON_API_KEY) {
    return {
      answer: '',
      sources,
      ok: false,
      fallback: true,
      fallbackReason: 'ไม่ได้ตั้งค่า TYPHOON_API_KEY',
    }
  }

  try {
    const userContent = hasContext
      ? `ข้อมูลอ้างอิง (ใช้เฉพาะข้อมูลนี้ในการตอบ ห้ามอ้างนอกเหนือจากนี้):\n\n${context.map((c, i) => `[${i + 1}] ${c}`).join('\n\n')}\n\n---\n\nคำถาม: ${question}`
      : `ไม่มีข้อมูลอ้างอิงสำหรับคำถามนี้ — ตอบตาม system prompt\n\nคำถาม: ${question}`

    const systemPrompt = hasContext ? SYSTEM_PROMPT_WITH_CONTEXT : SYSTEM_PROMPT_NO_CONTEXT

    const messages: Message[] = [
      ...history,
      { role: 'user', content: userContent },
    ]

    const res = await fetch(`${TYPHOON_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TYPHOON_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 700,
        temperature: 0.2,
        top_p: 0.9,
        frequency_penalty: 0.6,
        presence_penalty: 0.3,
        stream: false,
      }),
      signal: AbortSignal.timeout(20_000),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Typhoon ${res.status}: ${err}`)
    }

    const data = await res.json()
    const rawAnswer: string = data.choices?.[0]?.message?.content ?? ''
    const answer = rawAnswer.trim()

    if (looksDegenerate(answer)) {
      console.warn('Typhoon output looked degenerate, returning fallback', {
        preview: answer.slice(0, 200),
      })
      return {
        answer: '',
        sources,
        ok: false,
        fallback: true,
        fallbackReason: 'AI ตอบไม่ปกติ (output looped) — แสดงผลค้นหาแทน',
      }
    }

    return { answer, sources, ok: true, fallback: false }
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Unknown error'
    return {
      answer: '',
      sources,
      ok: false,
      fallback: true,
      fallbackReason: reason,
    }
  }
}
