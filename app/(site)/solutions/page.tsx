import Link from "next/link"
import { meta } from "@/lib/meta"
import { SOLUTIONS } from "@/lib/content"
import { JsonLd, crumbLd } from "@/lib/seo"
import { PageHero, IndustriesSection, TypesSection, CtaBand } from "@/components/Sections"

export const metadata = meta("Accounting Software Solutions by Business Type | OneAccounts", "Accounting and ERP for service, trading, NGO and construction businesses. See what each business type includes.", "/solutions")

export default function Page() {
  return (
    <>
      <JsonLd data={crumbLd([["Home", "/"], ["Solutions", "/solutions"]])} />
      <PageHero eyebrow="Solutions" crumbs={[["Home", "/"], ["Solutions"]]} title="Software for the problem you are solving" sub="Pick your business type and see exactly what you get." />
      <IndustriesSection />
      <TypesSection />
      <section className="sols"><div className="wrap">
        <div className="ind-head"><h2>Find your page</h2><p>One page for each way people look for us.</p></div>
        <div className="sol-grid">{SOLUTIONS.map((s) => (<Link key={s.slug} href={`/solutions/${s.slug}`}>{s.h1}</Link>))}</div>
      </div></section>
      <CtaBand />
    </>
  )
}
