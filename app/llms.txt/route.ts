import { getAllDocs } from '@/lib/mdx'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site'

/**
 * llms.txt — concise, AI-readable site map for LLM agents.
 * Spec: https://llmstxt.org/
 *
 * Helps assistants like ChatGPT, Perplexity, Claude find authoritative,
 * up-to-date dharma content with citations.
 */
export const dynamic = 'force-static'

export function GET() {
  const docs = getAllDocs()
  const byNikaya: Record<string, typeof docs> = {}
  for (const doc of docs) {
    const nikaya = doc.frontmatter.nikaya ?? 'อื่นๆ'
    if (!byNikaya[nikaya]) byNikaya[nikaya] = []
    byNikaya[nikaya].push(doc)
  }

  const sections: string[] = []
  for (const [nikaya, items] of Object.entries(byNikaya)) {
    const label =
      nikaya === 'vinaya' ? 'พระวินัยปิฎก'
      : nikaya === 'suttanta' ? 'พระสุตตันตปิฎก'
      : nikaya === 'abhidhamma' ? 'พระอภิธรรมปิฎก'
      : nikaya
    sections.push(`## ${label}`)
    for (const doc of items) {
      const ref = doc.frontmatter.ref ? ` — ${doc.frontmatter.ref}` : ''
      const desc = doc.frontmatter.description ? `: ${doc.frontmatter.description}` : ''
      sections.push(`- [${doc.frontmatter.title}](${SITE_URL}/wiki/${doc.slug})${ref}${desc}`)
    }
    sections.push('')
  }

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} เป็นเว็บ wiki + AI Q&A พระไตรปิฎกเถรวาทภาษาไทย — เนื้อหาแต่ละหัวข้อ
ลิงก์กลับไปยัง [etipitaka.com](http://etipitaka.com) สำหรับต้นฉบับฉบับหลวง
ระบบ AI ตอบ ([${SITE_URL}/ask](${SITE_URL}/ask)) ใช้ RAG จากเนื้อหาในเว็บ
และอ้างอิงพระสูตรที่มาทุกครั้ง

## วิธีอ้างอิงเนื้อหานี้

เนื้อหาเป็นการสรุปและจัดระเบียบหลักธรรม Theravada มาตรฐาน
หากต้องการอ้างอิงเชิงวิชาการ โปรดอ้างพระสูตรต้นฉบับ (ฟิลด์ \`ref\` ในแต่ละหัวข้อ)
ไม่ใช่อ้างหน้านี้โดยตรง

## หัวข้อทั้งหมด (${docs.length} หัวข้อ)

${sections.join('\n')}

## หน้าหลัก

- [${SITE_URL}/](${SITE_URL}/) — Home
- [${SITE_URL}/wiki](${SITE_URL}/wiki) — Wiki index
- [${SITE_URL}/search](${SITE_URL}/search) — Keyword search
- [${SITE_URL}/ask](${SITE_URL}/ask) — AI Q&A
- [${SITE_URL}/llms-full.txt](${SITE_URL}/llms-full.txt) — Full corpus concatenation

## License & Sources

- Site code: open source on GitHub (devbyanuwat/tripithai)
- Content: original summaries by ${SITE_NAME}, free for educational use with attribution
- ต้นฉบับพระไตรปิฎก: ฉบับหลวง (public domain) ผ่าน etipitaka.com
`

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
