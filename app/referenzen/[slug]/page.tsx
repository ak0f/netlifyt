import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROJECTS, getProject } from '@/lib/projects'
import ProjectDetail from './ProjectDetail'
import { safeJsonLd } from '@/lib/jsonld'

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return {}
  return {
    title: `${p.title} | SLIDE Agentur`,
    description: p.desc.de,
    alternates: { canonical: `https://slideagentur.ch/referenzen/${p.slug}` },
    openGraph: {
      title: `${p.title} | SLIDE Agentur`,
      description: p.desc.de,
      url: `https://slideagentur.ch/referenzen/${p.slug}`,
      siteName: 'SLIDE Agentur',
      type: 'article',
      images: [{ url: p.img }],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    description: p.desc.de,
    url: `https://slideagentur.ch/referenzen/${p.slug}`,
    image: `https://slideagentur.ch${p.img}`,
    ...(p.year ? { dateCreated: p.year } : {}),
    creator: {
      '@type': 'Organization',
      name: 'SLIDE Agentur',
      url: 'https://slideagentur.ch',
    },
    about: p.meta.industry.de,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <ProjectDetail slug={slug} />
    </>
  )
}
