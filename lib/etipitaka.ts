const THAI_DIGITS: Record<string, string> = {
  '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4',
  '๕': '5', '๖': '6', '๗': '7', '๘': '8', '๙': '9',
}

export function thaiToArabic(s: string): string {
  return s.replace(/[๐-๙]/g, (d) => THAI_DIGITS[d] ?? d)
}

/**
 * etipitaka.com URL pattern: /read/thai/{volume}/{page}/
 * Best-effort: parse "เล่มที่ X" from ref and link to volume root.
 * Exact ข้อ → page mapping ไม่ตรงกันเสมอ (ข้อ = item number, page = printed page);
 * user override ผ่าน frontmatter.etipitaka สำหรับ URL ที่แม่นยำ
 */
export function buildEtipitakaUrl(ref?: string, override?: string): string | null {
  if (override) return override
  if (!ref) return null

  const arabicRef = thaiToArabic(ref)
  const volMatch = arabicRef.match(/เล่ม(?:ที่)?\s*(\d+)/)
  if (!volMatch) return null

  const volume = volMatch[1]
  return `http://etipitaka.com/read/thai/${volume}/0/`
}
