import type { MetadataRoute } from 'next'

const BASE = 'https://slideagentur.ch'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // No Disallow for /impressum, /datenschutz, /agb on purpose:
      // they use a noindex meta tag, which crawlers must be able to read.
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
