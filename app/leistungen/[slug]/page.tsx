import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES, getService } from '@/lib/services'
import LeistungContent from './LeistungContent'
import { safeJsonLd } from '@/lib/jsonld'

const BASE = 'https://slideagentur.ch'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = getService(slug)
  if (!s) return {}
  const url = `${BASE}/leistungen/${s.slug}`
  return {
    title: s.metaTitle.de,
    description: s.metaDesc.de,
    alternates: { canonical: url },
    openGraph: {
      title: s.metaTitle.de,
      description: s.metaDesc.de,
      url,
      siteName: 'SLIDE Agentur',
      locale: 'de_CH',
      type: 'website',
      images: ['/img/og.png'],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getService(slug)
  if (!s) notFound()

  const url = `${BASE}/leistungen/${s.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: s.title.de,
        serviceType: s.serviceType,
        description: s.metaDesc.de,
        url,
        provider: { '@id': `${BASE}/#organization` },
        areaServed: [
          { '@type': 'City', name: 'Bern' },
          { '@type': 'Country', name: 'Switzerland' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${BASE}/leistungen` },
          { '@type': 'ListItem', position: 3, name: s.title.de, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faq.map((f) => ({
          '@type': 'Question',
          name: f.q.de,
          acceptedAnswer: { '@type': 'Answer', text: f.a.de },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <LeistungContent slug={s.slug} />
    </>
  )
}
