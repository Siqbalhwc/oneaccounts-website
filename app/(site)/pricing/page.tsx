import { meta } from "@/lib/meta"
import { JsonLd, faqLd } from "@/lib/seo"
import { PageHero, PricingBox, FaqSection, CtaBand } from "@/components/Sections"

const FAQ = [
  { q: "Is there a free trial?", a: "Yes. New companies get a free trial with no credit card required." },
  { q: "How will pricing work?", a: "Pricing is per user. Paid plans are being finalised and will appear in your dashboard once your trial is active. Nothing is charged without your say-so." },
  { q: "Can I try Property Management too?", a: "Yes. Ask us on WhatsApp or through the contact form and we will set up a trial for your building." },
]
export const metadata = meta("Pricing: Cloud Accounting & ERP Software | OneAccounts", "Simple per-user pricing for OneAccounts cloud accounting and ERP. Start a free trial with no credit card.", "/pricing")

export default function Page() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero eyebrow="Pricing" crumbs={[["Home", "/"], ["Pricing"]]} title="Simple, transparent pricing" sub="Start free. See your plan options inside your dashboard when your trial is active." />
      <PricingBox />
      <FaqSection items={FAQ} title="About pricing" sub="Short answers." />
      <CtaBand />
    </>
  )
}
