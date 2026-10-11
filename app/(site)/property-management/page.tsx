import { meta } from "@/lib/meta"
import { PM_FEATURES, SITE } from "@/lib/content"
import { JsonLd, crumbLd } from "@/lib/seo"
import ProductMedia from "@/components/ProductMedia"
import { PageHero, FeatureGrid, SectionHead, PropertySection, FaqSection, CtaBand } from "@/components/Sections"

const FAQ = [
  { q: "Who is OneAccounts Property Management for?", a: "Landlords, plaza and building owners, and property managers who collect rent, hold security deposits and report to owners." },
  { q: "Is it separate from OneAccounts?", a: "Yes. It is its own application at properties.oneaccountsbysiqbal.com, built to the same standard of double-entry accounting." },
  { q: "Does it include accounting reports?", a: "Yes. It includes the chart of accounts, journal, ledger, trial balance, profit and loss and balance sheet, along with an owner ledger." },
  { q: "Can I import my existing tenants and units?", a: "Yes. Excel templates are available for bulk import, and you can back up and restore your data." },
]
export const metadata = meta("Property Management Software in Pakistan | OneAccounts", "Buildings, rooms, owners, tenants, leases, rent invoices, deposits and owner statements, posted into real double-entry accounting. Built for landlords and building managers.", "/property-management")

export default function Page() {
  return (
    <>
      <JsonLd data={[crumbLd([["Home", "/"], ["Property Management", "/property-management"]]), { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "OneAccounts Property Management", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: `${SITE.url}/property-management`, description: "Property management and rental accounting software for landlords and building managers.", offers: { "@type": "Offer", name: "Property Management", priceCurrency: "PKR", priceSpecification: { "@type": "UnitPriceSpecification", price: "5000", priceCurrency: "PKR", unitText: "per month" } } }]} />
      <PageHero eyebrow="OneAccounts Property Management" crumbs={[["Home", "/"], ["Property Management"]]} title="From the building to the owner's statement" sub="Property operations and real double-entry accounting in one place, so rent collected is already in the books.">
        <a className="btn-primary" href={SITE.propertiesLogin} target="_blank" rel="noopener"><span className="play">&rarr;</span> Open Property Management</a><a className="btn-secondary" href={SITE.whatsapp} target="_blank" rel="noopener">Ask us on WhatsApp</a>
      </PageHero>
      <PropertySection />
      <ProductMedia product="Property" />
      <section className="pillars"><div className="wrap">
        <SectionHead title="Built for the way buildings are run" sub="Everything connects, so nothing is typed twice." />
        <FeatureGrid items={PM_FEATURES.map(([t, d]) => ({ t, d }))} />
      </div></section>
      <FaqSection items={FAQ} title="About Property Management" sub="Short answers before you start." />
      <CtaBand title="See it with your own building" property />
    </>
  )
}
