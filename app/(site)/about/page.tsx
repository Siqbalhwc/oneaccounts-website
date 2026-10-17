import Link from "next/link"
import { meta } from "@/lib/meta"
import { SITE } from "@/lib/content"
import { JsonLd, crumbLd } from "@/lib/seo"
import { PageHero, SectionHead, FeatureGrid, CtaBand } from "@/components/Sections"

export const metadata = meta(
  "About OneAccounts | Accounting Software Built in Pakistan",
  "Cloud accounting and ERP for NGOs, property managers and trading companies in Pakistan, built in Lahore by a finance professional with 15+ years' experience.",
  "/about",
)

const POINTS = [
  { t: "Priced in rupees", d: "Plans are charged in Pakistani rupees per user per month, and the prices are shown openly on the pricing page." },
  { t: "Try before you pay", d: "Every new company starts with a ten-day free trial and no credit card. We charge only after you have tested the software and confirmed." },
  { t: "Help with opening balances", d: "We help you bring over your opening balances so you start with your own books, not an empty screen." },
  { t: "Support where you already are", d: "Message us on WhatsApp, write by email or use the contact form. We reply within the day." },
]

export default function Page() {
  return (
    <>
      <JsonLd data={crumbLd([["Home", "/"], ["About", "/about"]])} />
      <PageHero eyebrow="About" crumbs={[["Home", "/"], ["About"]]} title="About OneAccounts" sub="Cloud accounting and ERP for NGOs, property managers and trading companies in Pakistan." />
      <section style={{ paddingBottom: 40 }}><div className="wrap"><article className="prose">
        <h2>What OneAccounts is</h2>
        <p>OneAccounts is accounting software that runs in your web browser. Underneath it keeps proper double-entry books, with the reports finance teams expect: trial balance, profit and loss, balance sheet and general ledger.</p>
        <p>On top of that core, OneAccounts is shaped for three kinds of organisation. For NGOs it adds donor and project budgets, with a budget check on every bill. For trading companies it adds inventory, with a stock check on every sale and average costing. Property Management is a separate application, with owner ledgers and rent handling, built to the same standard of accounting.</p>
        <h2>Who it is for</h2>
        <p>We built it for organisations that want their accounting and daily operations in one place: <Link href="/solutions/ngo-accounting-software">NGOs</Link>, <Link href="/property-management">property managers</Link>, <Link href="/solutions/trading-business-software">trading companies</Link>, and also <Link href="/solutions/service-business-accounting">service organisations</Link> and <Link href="/solutions/construction-accounting-software">construction companies</Link>.</p>
        <h2>Why we built it</h2>
        <p>OneAccounts is built by a finance professional with more than fifteen years of work in accounting, budgeting, financial reporting, payroll, cash management and day-to-day business operations, across NGOs, trading companies and service organisations. The aim is peace of mind in a Pakistani ERP: software that is simple by design and professional by nature.</p>
        <p>The same hands-on experience includes work with Odoo, Oracle Financials, Sage AccPac, QuickBooks and Zoho Books, and OneAccounts has been put to work in a trading company and a property management company. Beyond the software, we help organisations with ERP implementation, requirement gathering, fit-gap analysis and improving their financial processes, so the move from spreadsheets to a proper system goes smoothly.</p>
      </article></div></section>
      <section style={{ paddingBottom: 40 }}><div className="wrap">
        <SectionHead title="How we work with you" sub="Plain terms, in your currency, with a person to talk to." />
        <FeatureGrid items={POINTS} />
      </div></section>
      <section style={{ paddingBottom: 80 }}><div className="wrap"><article className="prose">
        <h2>Get in touch</h2>
        <p>Our office is at {SITE.street}, {SITE.city}, {SITE.country}.</p>
        <p>Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, message us on <a href={SITE.whatsapp} target="_blank" rel="noopener">WhatsApp at {SITE.whatsappDisplay}</a>, or use the <Link href="/contact">contact form</Link> to book a demo. You can also read how we handle information in our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>.</p>
      </article></div></section>
      <CtaBand />
    </>
  )
}
