import { getAllDocs } from '@/lib/mdx'
import { FolderIndex } from '@/components/wiki/FolderIndex'

export const metadata = {
  title: 'พระไตรปิฎก',
  description: 'รายการหัวข้อพระไตรปิฎกทั้งหมดใน TripiThai',
}

export default function WikiRoot() {
  const docs = getAllDocs()
  return <FolderIndex prefix="" docs={docs} />
}
