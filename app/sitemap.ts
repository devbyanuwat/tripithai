import type { MetadataRoute } from 'next'
import { getAllDocs } from '@/lib/mdx'
import { KNOWN_FOLDERS } from '@/lib/taxonomy'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/ask`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/wiki`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
  ]

  const folderRoutes: MetadataRoute.Sitemap = Array.from(KNOWN_FOLDERS).map((folder) => ({
    url: `${SITE_URL}/wiki/${folder}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const docRoutes: MetadataRoute.Sitemap = getAllDocs().map((doc) => ({
    url: `${SITE_URL}/wiki/${doc.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...folderRoutes, ...docRoutes]
}
