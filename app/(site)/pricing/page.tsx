import { meta } from "@/lib/meta"
import { JsonLd, faqLd } from "@/lib/seo"
import { PageHero, PricingBox, FaqSection, CtaBand } from "@/components/Sections"

const FAQ = [
  { q: "Is there a free trial?", a: "Yes. New companies get a free trial with no credit card required." },
  { q: "How much does it cost?", a: "Service and Trading companies pay Rs 3,000 per user per month. NGO and Construction companies pay Rs 5,000 per user per month. Property Management is Rs 5,000 per month. Add-ons are extra, if you choose any." },
  { q: "What are add-ons?", a: "Optional modules such as Payroll, which you can switch on only when you need them." },
  { q: "Can I try Property Management too?", a: "Yes. Ask us on WhatsApp or through the contact form and we will set up a trial for your building." },
]
export const metadata = meta("Pricing in PKR: Cloud Accounting & ERP | OneAccounts", "Service and Trading from Rs 3,000 per user per month. NGO, Construction and Property Management from Rs 5,000. Free trial, no credit card.", "/pricing")

export default function Page() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero eyebrow="Pricing" crumbs={[["Home", "/"], ["Pricing"]]} title="Simple, transparent pricing" sub="Service and Trading from Rs 3,000. NGO, Construction and Property Management from Rs 5,000. Add-ons are extra, if any." />
      <PricingBox showHead={false} />
      <FaqSection items={FAQ} title="About pricing" sub="Short answers." />
      <CtaBand />
    </>
  )
}
