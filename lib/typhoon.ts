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

const SYSTEM_PROMPT = `คุณคือผู้เชี่ยวชาญพระไตรปิฎกเถรวาท ชื่อ TripiThai
หลักการตอบ:
1. ตอบโดยอ้างอิงจากข้อมูลที่ให้มาเท่านั้น
2. ระบุชื่อพระสูตร นิกาย เล่ม และข้อที่อ้างอิงทุกครั้ง
3. ถ้าข้อมูลไม่เพียงพอให้บอกตรงๆ ว่า "ไม่พบข้อมูลในพระไตรปิฎกที่มี"
4. ตอบเป็นภาษาไทยเสมอ
5. ใช้ภาษาที่เข้าใจง่าย ไม่ต้องทางการมากเกินไป`

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
    const contextText = context
      .map((c, i) => `[${i + 1}] ${c}`)
      .join('\n\n')

    const messages: Message[] = [
      ...history,
      {
        role: 'user',
        content: `ข้อมูลอ้างอิง:\n${contextText}\n\nคำถาม: ${question}`,
      },
    ]

    const res = await fetch(`${TYPHOON_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TYPHOON_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 1500,
        temperature: 0.3,
        stream: false,
      }),
      signal: AbortSignal.timeout(20_000),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Typhoon ${res.status}: ${err}`)
    }

    const data = await res.json()
    const answer = data.choices?.[0]?.message?.content ?? ''

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
