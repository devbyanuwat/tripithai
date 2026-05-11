/**
 * โครงสร้างพระไตรปิฎกเถรวาท ๔๕ เล่ม
 * ใช้เป็น single source of truth สำหรับ folder index + label
 */
export interface TaxonomyNode {
  label: string
  children?: Record<string, TaxonomyNode>
}

export const TIPITAKA_TAXONOMY: Record<string, TaxonomyNode> = {
  vinaya: {
    label: 'พระวินัยปิฎก',
    children: {
      suttavibhanga: { label: 'สุตตวิภังค์' },
      khandhaka: { label: 'ขันธกะ' },
      parivara: { label: 'ปริวาร' },
    },
  },
  suttanta: {
    label: 'พระสุตตันตปิฎก',
    children: {
      digha: { label: 'ทีฆนิกาย' },
      majjhima: { label: 'มัชฌิมนิกาย' },
      samyutta: { label: 'สังยุตตนิกาย' },
      anguttara: { label: 'อังคุตตรนิกาย' },
      khuddaka: {
        label: 'ขุททกนิกาย',
        children: {
          khuddakapatha: { label: 'ขุททกปาฐะ' },
          dhammapada: { label: 'ธรรมบท' },
          udana: { label: 'อุทาน' },
          itivuttaka: { label: 'อิติวุตตกะ' },
          suttanipata: { label: 'สุตตนิบาต' },
          vimanavatthu: { label: 'วิมานวัตถุ' },
          petavatthu: { label: 'เปตวัตถุ' },
          theragatha: { label: 'เถรคาถา' },
          therigatha: { label: 'เถรีคาถา' },
          jataka: { label: 'ชาดก' },
          niddesa: { label: 'นิทเทส' },
          patisambhidamagga: { label: 'ปฏิสัมภิทามรรค' },
          apadana: { label: 'อปทาน' },
          buddhavamsa: { label: 'พุทธวงศ์' },
          cariyapitaka: { label: 'จริยาปิฎก' },
        },
      },
    },
  },
  abhidhamma: {
    label: 'พระอภิธรรมปิฎก',
    children: {
      dhammasangani: { label: 'ธัมมสังคณี' },
      vibhanga: { label: 'วิภังค์' },
      dhatukatha: { label: 'ธาตุกถา' },
      puggalapannatti: { label: 'ปุคคลบัญญัติ' },
      kathavatthu: { label: 'กถาวัตถุ' },
      yamaka: { label: 'ยมก' },
      patthana: { label: 'ปัฏฐาน' },
    },
  },
}

const _knownFolders = new Set<string>()
const _labelBySegment = new Map<string, string>()

function indexTaxonomy(nodes: Record<string, TaxonomyNode>, prefix: string) {
  for (const [key, node] of Object.entries(nodes)) {
    const path = prefix ? `${prefix}/${key}` : key
    _knownFolders.add(path)
    _labelBySegment.set(key, node.label)
    if (node.children) indexTaxonomy(node.children, path)
  }
}
indexTaxonomy(TIPITAKA_TAXONOMY, '')

export const KNOWN_FOLDERS: ReadonlySet<string> = _knownFolders

export function isKnownFolder(path: string): boolean {
  return _knownFolders.has(path.replace(/^\/+|\/+$/g, ''))
}

export function labelForSegment(segment: string): string {
  return _labelBySegment.get(segment) ?? segment
}
