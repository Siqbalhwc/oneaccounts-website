import Link from "next/link"
import { meta } from "@/lib/meta"
import { MODULES, SITE } from "@/lib/content"
import { JsonLd, crumbLd, softwareLd } from "@/lib/seo"
import { PageHero, TrialBtn, FeatureGrid, SectionHead, TypesSection, PricingBox, CtaBand } from "@/components/Sections"

export const metadata = meta("OneAccounts Cloud ERP: Accounting, Inventory, Payroll in Pakistan", "Cloud accounting and ERP for trading, service, NGO and construction companies. Invoices, bills, inventory, payroll, tax and budgets in one calm system. Free trial.", "/oneaccounts")

export default function Page() {
  return (
    <>
      <JsonLd data={[softwareLd(), crumbLd([["Home", "/"], ["OneAccounts", "/oneaccounts"]])]} />
      <PageHero eyebrow="OneAccounts" crumbs={[["Home", "/"], ["OneAccounts"]]} title="Cloud accounting and ERP, shaped to your business" sub="Every company starts with full double-entry accounting. Add stock, payroll, projects, budgets and more only when you need them.">
        <TrialBtn /><a className="btn-secondary" href={`${SITE.app}/login`} target="_blank" rel="noopener">Open OneAccounts</a>
      </PageHero>
      <section className="pillars"><div className="wrap">
        <SectionHead title="Everything an accountant expects" sub="A complete double-entry core, with drill-down from every report to its source." />
        <FeatureGrid items={[
          { t: "Sales and purchases", d: "Invoices, bills, receipts and payments, with opening balances and partial payments handled properly." },
          { t: "Books and reports", d: "Chart of accounts, journal, ledgers, trial balance, profit and loss and balance sheet, with PDF and Excel export." },
          { t: "Traceable by design", d: "Every number drills down to its ledger, journal entry and source document. Edits reverse and repost; nothing is deleted." },
        ]} />
      </div></section>
      <TypesSection />
      <section className="pillars"><div className="wrap">
        <SectionHead title="Modules that switch on per company" sub="Add what you need, when you need it." />
        <FeatureGrid items={MODULES.map(([t, d]) => ({ t, d }))} />
      </div></section>
      <PricingBox />
      <CtaBand />
    </>
  )
}
