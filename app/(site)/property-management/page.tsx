import { meta } from "@/lib/meta"
import { PM_FEATURES, SITE } from "@/lib/content"
import { JsonLd, crumbLd } from "@/lib/seo"
import ProductMedia from "@/components/ProductMedia"
import SolutionGuides from "@/components/SolutionGuides"
import { PageHero, FeatureGrid, SectionHead, PropertySection, FaqSection, CtaBand } from "@/components/Sections"

const FAQ = [
  { q: "Who is OneAccounts Property Management for?", a: "Landlords, plaza and building owners, and property managers who collect rent, hold security deposits and report to owners." },
  { q: "Is it separate from OneAccounts?", a: "Yes. It is its own application at properties.oneaccountsbysiqbal.com, built to the same standard of double-entry accounting." },
  { q: "Does it include accounting reports?", a: "Yes. It includes the chart of accounts, journal, ledger, trial balance, profit and loss and balance sheet, along with an owner ledger." },
  { q: "Can I import my existing tenants and units?", a: "Yes. Excel templates are available for bulk import, and you can back up and restore your data." },
  { q: "Can I recover electricity, gas and water bills from tenants?", a: "Yes. Download an Excel template pre-filled with every active lease, type the month's amounts and upload it. You see a preview first, and the amounts then land on the tenants' invoices as their own lines. The feature is switched on per company." },
  { q: "How does monthly rent billing work?", a: "You run the month's billing yourself, for all buildings or for one. OneAccounts lists the leases that still need an invoice and creates them in batches. It is safe to repeat: a tenant who already has an invoice for the month is skipped." },
  { q: "Can one payment cover several invoices, or more than is owed?", a: "Yes. One receipt can pay several invoices, oldest first, with an optional discount that only an owner or admin can give. Any amount beyond what is owed is held as an advance on the lease." },
  { q: "Can I send invoices and receipts on WhatsApp?", a: "Yes. The app opens a WhatsApp message with a link to the invoice or receipt, and you tap send. PDF copies are also available." },
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
  { h: "Utility bills, recovered every month", p: [
    "Electricity, water and gas change every month, so they cannot sit on the lease as a fixed charge. OneAccounts gives you an Excel template pre-filled with every active lease's building, apartment, tenant and utility names. You type the amounts and upload the file.",
    "First you see a preview of what would happen to each row, and nothing is saved until you confirm. Each amount lands on the tenant's invoice as its own line, and invoices that have not been paid are recalculated. An invoice that already has a payment is left alone and reported as locked. Uploading the same file twice replaces the amounts instead of duplicating them. The feature is switched on per company."
  ] },
  { h: "Part payments, advances and discounts", p: [
    "One receipt can pay several invoices at once. The money goes to the opening balance first and then to invoices from the oldest to the newest. A payment smaller than the invoice leaves it partly paid, and anything beyond what is owed is held as an advance on the lease.",
    "A discount can be given only by an owner or an admin, and it is posted to an account you choose, so it stays visible. Payments can be recorded as cash, bank transfer or cheque, and each one produces a PDF receipt."
  ] },
  { h: "Lease charges that change", p: [
    "Each lease carries labelled charges, such as Rent, Parking or Internet, marked as recurring or one-time. You can add a charge during the lease, change its amount or end it on a date. Past invoices are never touched. The current month's invoice is recalculated if nobody has paid against it yet, and part months are charged by the day."
  ] },
  { h: "Moving out: lease settlement", p: [
    "When a tenant leaves, lease settlement works out the unpaid balances, the final part-month rent up to the move-out date, the deposit actually received, your itemised deductions and the net refund, with a settlement PDF.",
    "A lease created in error can be reversed by an owner or an admin without deleting anything, and every reversal is kept in the audit log. A lease with payments against it cannot be reversed this way."
  ] },
  { h: "The tenant ledger and what is still owed", p: [
    "Every tenant has a ledger with the opening balance, each invoice and payment, and the running balance. The room-wise receivables report shows, for each apartment, the opening balance, what was invoiced and received in the period, and what is still receivable.",
    "A collection against expenses report and the dashboard list of unpaid invoices with the days overdue help you chase what is late. A button opens a WhatsApp message to the tenant for you to send."
  ] },
  { h: "Shared and recurring expenses", p: [
    "Building expenses are posted to the accounts when they are entered, with the account they were paid from. Monthly recurring expenses can be generated each month, one expense can be split across buildings, and an expense charged to an owner is netted off when you pay that owner."
  ] },
  { h: "Made for large portfolios", p: [
    "Monthly billing runs in small batches with progress shown, and can be repeated safely, so a large portfolio does not depend on one long request finishing. You can search by building, apartment, tenant or owner, and users can be limited to the buildings they look after."
  ] },
  { h: "Real accounting reports underneath", p: [
    "Behind the property screens is a full set of accounting reports: chart of accounts, journal, ledger, trial balance, profit and loss and balance sheet. Property reports for occupancy, rent, deposits and owner statements come straight from the books, so your accountant and your property manager look at the same numbers."
  ] },
  { h: "Control, backup and getting started", p: [
    "Access is role-based and every action is kept in an audit log. You can back up and restore your data, and Excel templates are available for importing existing tenants and units in bulk. Property Management runs as its own application, built to the same accounting standard as OneAccounts, and we are happy to help you set up your first building."
  ] },
]

export const metadata = meta("Property Management Software Pakistan | OneAccounts", "Property management software for landlords and managers in Pakistan: rent invoices, utility bills, deposits, tenant ledger and owner ledger in real accounting.", "/property-management")

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
      <SolutionGuides match={/propert|rent/i} title="Property management guides" sub="How rent billing, deposits, owner payouts and move-outs work in practice." />
      <CtaBand title="See it with your own building" property />
    </>
  )
}
