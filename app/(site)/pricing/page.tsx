import { meta } from "@/lib/meta"
import { JsonLd, faqLd } from "@/lib/seo"
import { PageHero, PricingBox, FaqSection, CtaBand } from "@/components/Sections"

const FAQ = [
  { q: "Is there a free trial?", a: "Yes. New companies get a free trial with no credit card required." },
  { q: "How will pricing work?", a: "Pricing is per user. After you start your free trial, your dashboard shows the plans and prices for your business type. Nothing is charged without your say-so." },
  { q: "Can I try Property Management too?", a: "Yes. Ask us on WhatsApp or through the contact form and we will set up a trial for your building." },
]
export const metadata = meta("Pricing: Cloud Accounting & ERP Software | OneAccounts", "Start a free trial of OneAccounts with no credit card. Your dashboard shows plans and pricing for your business type once you are in.", "/pricing")

export default function Page() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero eyebrow="Pricing" crumbs={[["Home", "/"], ["Pricing"]]} title="Simple, transparent pricing" sub="Start free. Your dashboard shows the plans and pricing for your business type." />
      <PricingBox showHead={false} />
      <FaqSection items={FAQ} title="About pricing" sub="Short answers." />
      <CtaBand />
    </>
  )
}
