import type { MetadataRoute } from 'next'
import { PROJECTS } from '@/lib/projects'
import { SERVICES } from '@/lib/services'

const BASE = 'https://slideagentur.ch'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core, indexable pages. Legal pages (impressum, datenschutz, agb)
  // are intentionally excluded — they are set to noindex.
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,            lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/leistungen`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/referenzen`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/ablauf`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/kontakt`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/leistungen/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${BASE}/referenzen/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...projectPages]
}
