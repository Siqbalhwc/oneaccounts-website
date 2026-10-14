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
const SECTIONS: { h: string; p: string[]; list?: string[] }[] = [
  { h: "Why property accounting goes wrong in spreadsheets", p: [
    "A building has many small money events: rent due, rent received, a deposit held, a repair paid, a salary, a payout to the owner. When these live in a rent register in one file and a cash book in another, the owner's statement becomes a monthly reconstruction, and nobody is sure the two agree.",
    "OneAccounts Property Management records each of these events once, in real double-entry accounting. The rent you invoice, the deposit you hold and the owner's statement all come from the same books, so there is nothing to reconcile at month end."
  ] },
  { h: "From the building to the lease", p: [
    "You set up buildings, floors and rooms, and keep the occupancy history of each room. Owners and tenants are recorded as parties, and each lease carries its own charges, roommates and facility details. When someone asks who lived in a room last year, or what a tenant was charged, the answer is on the lease."
  ] },
  { h: "Rent invoices and receipts", p: [
    "Rent is invoiced in batches, so a whole building can be billed in one step instead of tenant by tenant. Each payment produces a PDF receipt. Because the invoices post straight into the accounts, the amount shown as due to you is the same figure that appears in the ledger."
  ] },
  { h: "Security deposits, held and settled", p: [
    "A deposit is not income. OneAccounts lets you receive a deposit, hold it, and settle it at the end of the tenancy with deductions where they apply. The deposit stays visible as money held for the tenant until it is settled, rather than disappearing into the rent total."
  ] },
  { h: "The owner ledger and the owner's statement", p: [
    "For each owner you have a ledger: what was collected, what was spent on the building, and what is due to them. Statements, settlement and payout all come from this ledger, so the figure you hand an owner is the same figure in your books.",
    "Building expenses, staff and salary payments are recorded in the same system, so the cost of running a building sits next to the rent it earns."
  ], list: [
    "Buildings, floors, rooms and occupancy history",
    "Owners, tenants and leases with their charges",
    "Batch rent invoices with PDF receipts",
    "Security deposits received, held and settled",
    "Owner ledger with statements, settlement and payout",
    "Building expenses, staff and salary payments"
  ] },
  { h: "Real accounting reports underneath", p: [
    "Behind the property screens is a full set of accounting reports: chart of accounts, journal, ledger, trial balance, profit and loss and balance sheet. Property reports for occupancy, rent, deposits and owner statements come straight from the books, so your accountant and your property manager look at the same numbers."
  ] },
  { h: "Control, backup and getting started", p: [
    "Access is role-based and every action is kept in an audit log. You can back up and restore your data, and Excel templates are available for importing existing tenants and units in bulk. Property Management runs as its own application, built to the same accounting standard as OneAccounts, and we are happy to help you set up your first building."
  ] },
]

export const metadata = meta("Property Management Software Pakistan | OneAccounts", "Property management software for landlords and building managers: leases, rent invoices, deposits and owner statements in real accounting.", "/property-management")

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
      <section className="hx-sec"><div className="wrap"><article className="prose">
        {SECTIONS.map((x) => (
          <div key={x.h}>
            <h2>{x.h}</h2>
            {x.p.map((t, i) => <p key={i}>{t}</p>)}
            {x.list && <ul>{x.list.map((l) => <li key={l}>{l}</li>)}</ul>}
          </div>
        ))}
      </article></div></section>
      <FaqSection items={FAQ} title="About Property Management" sub="Short answers before you start." />
      <CtaBand title="See it with your own building" property />
    </>
  )
}
