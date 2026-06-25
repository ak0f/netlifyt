import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROJECTS, getProject } from '@/lib/projects'
import ProjectDetail from './ProjectDetail'

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return {}
  return {
    title: `${p.title} – SLIDE Agentur`,
    description: p.desc.de,
    openGraph: {
      title: `${p.title} – SLIDE Agentur`,
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
  if (!getProject(slug)) notFound()
  return <ProjectDetail slug={slug} />
}
