import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SOLUTIONS, SITE } from "@/lib/content"
import { meta } from "@/lib/meta"
import { JsonLd, crumbLd, faqLd } from "@/lib/seo"
import { PageHero, TrialBtn, FeatureGrid, SectionHead, FaqSection, CtaBand } from "@/components/Sections"

export function generateStaticParams() { return SOLUTIONS.map((s) => ({ slug: s.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = SOLUTIONS.find((x) => x.slug === slug)
  return s ? meta(s.metaTitle, s.metaDesc, `/solutions/${s.slug}`) : {}
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = SOLUTIONS.find((x) => x.slug === slug)
  if (!s) notFound()
  const others = SOLUTIONS.filter((x) => x.slug !== s.slug).slice(0, 4)
  return (
    <>
      <JsonLd data={[faqLd(s.faq), crumbLd([["Home", "/"], ["Solutions", "/solutions"], [s.name, `/solutions/${s.slug}`]])]} />
      <PageHero eyebrow={s.name} crumbs={[["Home", "/"], ["Solutions", "/solutions"], [s.name]]} title={s.h1} sub={s.intro}>
        <TrialBtn /><Link className="btn-secondary" href="/oneaccounts">See all of OneAccounts</Link>
      </PageHero>
      <section className="pillars"><div className="wrap"><SectionHead title="Built around the way this business works" /><FeatureGrid items={s.points} /></div></section>
      <FaqSection items={s.faq} title="Before you start" sub="Short answers to common questions." />
      <section className="sols"><div className="wrap"><div className="ind-head"><h2>Also see</h2><p>Related pages.</p></div>
        <div className="sol-grid">{others.map((o) => (<Link key={o.slug} href={`/solutions/${o.slug}`}>{o.h1}</Link>))}<a href={SITE.properties} target="_blank" rel="noopener">Open Property Management</a></div></div></section>
      <CtaBand />
    </>
  )
}
