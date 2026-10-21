import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SOLUTIONS, SITE } from "@/lib/content"
import { meta } from "@/lib/meta"
import { JsonLd, crumbLd, faqLd } from "@/lib/seo"
import ProductMedia from "@/components/ProductMedia"
import SolutionGuides from "@/components/SolutionGuides"
import { SOLUTION_PRODUCT } from "@/lib/media"
import { PageHero, TrialBtn, FeatureGrid, SectionHead, FaqSection, CtaBand } from "@/components/Sections"

// Which guides each solution page shows at the bottom (matched on the guide category).
const GUIDE_MATCH: Record<string, { match: RegExp; title: string }> = {
  "ngo-accounting-software": { match: /ngo/i, title: "NGO accounting guides" },
  "trading-business-software": { match: /trading|inventory|stock/i, title: "Trading and stock guides" },
  "inventory-management-software": { match: /trading|inventory|stock/i, title: "Trading and stock guides" },
  "rental-property-accounting": { match: /propert|rent/i, title: "Property management guides" },
  "accounting-software-pakistan": { match: /tax/i, title: "Tax and accounting guides" },
}

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
      {s.sections && (
        <section className="hx-sec"><div className="wrap"><article className="prose">
          {s.sections.map((x) => (
            <div key={x.h}>
              <h2>{x.h}</h2>
              {x.p.map((t, i) => <p key={i}>{t}</p>)}
              {x.list && <ul>{x.list.map((l) => <li key={l}>{l}</li>)}</ul>}
            </div>
          ))}
        </article></div></section>
      )}
      {SOLUTION_PRODUCT[s.slug] && <ProductMedia product={SOLUTION_PRODUCT[s.slug]} />}
      <FaqSection items={s.faq} title="Before you start" sub="Short answers to common questions." />
      {GUIDE_MATCH[s.slug] && <SolutionGuides match={GUIDE_MATCH[s.slug].match} title={GUIDE_MATCH[s.slug].title} />}
      <section className="sols"><div className="wrap"><div className="ind-head"><h2>Also see</h2><p>Related pages.</p></div>
        <div className="sol-grid">{others.map((o) => (<Link key={o.slug} href={`/solutions/${o.slug}`}>{o.h1}</Link>))}<a href={SITE.propertiesLogin} target="_blank" rel="noopener">Open Property Management</a></div></div></section>
      <CtaBand />
    </>
  )
}
