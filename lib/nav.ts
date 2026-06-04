import { getAllDocs } from './mdx'
import { TIPITAKA_TAXONOMY, labelForSegment, type TaxonomyNode } from './taxonomy'

export interface NavNode {
  label: string
  href: string
  children?: NavNode[]
}

interface RawNode {
  title?: string // ถ้าเป็นบทความ (leaf) จะมี title จาก frontmatter
  children: Map<string, RawNode>
}

function taxonomyChildrenOrder(prefix: string): string[] {
  const segments = prefix.split('/').filter(Boolean)
  let node: Record<string, TaxonomyNode> | undefined = TIPITAKA_TAXONOMY
  for (const seg of segments) {
    node = node?.[seg]?.children
    if (!node) return []
  }
  return Object.keys(node ?? {})
}

// จัดลำดับ key ตาม taxonomy ก่อน แล้วตามด้วยที่เหลือเรียงตามตัวอักษรไทย
function orderKeys(prefix: string, keys: string[], labelOf: (k: string) => string): string[] {
  const order = taxonomyChildrenOrder(prefix)
  const inTax = order.filter((k) => keys.includes(k))
  const rest = keys
    .filter((k) => !order.includes(k))
    .sort((a, b) => labelOf(a).localeCompare(labelOf(b), 'th'))
  return [...inTax, ...rest]
}

function toNavNodes(raw: Map<string, RawNode>, prefix: string): NavNode[] {
  const labelOf = (key: string) => {
    const node = raw.get(key)
    return node?.title ?? labelForSegment(key)
  }
  const keys = orderKeys(prefix, Array.from(raw.keys()), labelOf)

  return keys.map((key) => {
    const node = raw.get(key)!
    const path = prefix ? `${prefix}/${key}` : key
    const href = `/wiki/${path}`
    if (node.children.size > 0) {
      return { label: labelForSegment(key), href, children: toNavNodes(node.children, path) }
    }
    return { label: node.title ?? labelForSegment(key), href }
  })
}

// สร้าง tree เมนู wiki ทั้งหมดจากไฟล์เนื้อหาจริง (ปิฎก -> นิกาย -> บทความ)
export function buildWikiTree(): NavNode[] {
  const root: Map<string, RawNode> = new Map()

  for (const doc of getAllDocs()) {
    const segs = doc.slug.split('/').filter(Boolean)
    let level = root
    segs.forEach((seg, i) => {
      if (!level.has(seg)) level.set(seg, { children: new Map() })
      const node = level.get(seg)!
      if (i === segs.length - 1) node.title = doc.frontmatter.title
      level = node.children
    })
  }

  return toNavNodes(root, '')
}
