import Link from "next/link"
import type { ReactNode } from "react"
import { SITE, PRICING, PRICING_PUBLIC, HOME_FAQ } from "@/lib/content"
import { IcCheck, IcSite, IcBag, IcHeart, IcBriefcase } from "@/components/icons"

const rs = (n: number) => "Rs " + n.toLocaleString("en-PK")

export function PageHero({ eyebrow, title, sub, crumbs, children }: { eyebrow?: string; title: string; sub?: string; crumbs?: [string, string?][]; children?: ReactNode }) {
  return (
    <header className="page-hero"><div className="sunrise-glow" />
      <div className="wrap">
        {crumbs && <div className="crumb">{crumbs.map(([t, h], i) => (<span key={t}>{i > 0 && " / "}{h ? <Link href={h}>{t}</Link> : t}</span>))}</div>}
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
        {children && <div className="hero-ctas">{children}</div>}
      </div>
    </header>
  )
}

export const TrialBtn = ({ label = "Start Free Trial" }: { label?: string }) => (<a href={`${SITE.app}/login`} target="_blank" rel="noopener" className="btn-primary"><span className="play">&rarr;</span>{label}</a>)

export function FeatureGrid({ items, id }: { items: { t: string; d: string }[]; id?: string }) {
  return (<div className="pillars-grid" id={id}>{items.map((p) => (<div className="pillar" key={p.t}><div className="mark"><IcCheck /></div><h3>{p.t}</h3><p>{p.d}</p></div>))}</div>)
}

export function SectionHead({ title, sub, tag }: { title: string; sub?: string; tag?: string }) {
  return (<div className="pillars-head">{tag && <span className="newtag">{tag}</span>}<h2>{title}</h2>{sub && <p>{sub}</p>}</div>)
}

export function IndustriesSection() {
  const cards = [
    ["c1", "Trading Businesses", "Manage inventory, receivables, and tax, without manual spreadsheets.", "/solutions/trading-business-software", <IcBag key="a" />],
    ["c2", "NGOs", "Track donor balances, enforce budgets, and generate audit-ready reports in real time.", "/solutions/ngo-accounting-software", <IcHeart key="b" />],
    ["c3", "Service Organisations", "Bill clients accurately and see project profitability the moment it changes.", "/solutions/service-business-accounting", <IcBriefcase key="c" />],
    ["c4", "Construction", "Control site budgets, track investor capital and profit share, and see every site's cost as it happens.", "/solutions/construction-accounting-software", <IcSite key="d" />],
  ] as const
  return (
    <section className="industries" id="industries"><div className="wrap">
      <div className="ind-head"><h2>Built for how you actually work</h2><p>Trading, NGOs, service organisations and construction, each with their own view.</p></div>
      <div className="ind-grid four">
        {cards.map(([c, t, d, h, ic]) => (<Link key={t} href={h} className={`ind-card ${c}`}><div className="ind-icon">{ic}</div><h3>{t}</h3><p>{d}</p></Link>))}
      </div>
    </div></section>
  )
}

export function TypesSection({ tag }: { tag?: string }) {
  const Y = <td className="y">Yes</td>, N = <td className="n">-</td>
  return (
    <section className="types" id="solutions"><div className="wrap">
      <SectionHead tag={tag} title="One book, shaped to the way you work" sub="Every company starts with full accounting. Your business type adds only what it needs." />
      <div className="tbl-wrap"><table className="m"><tbody>
        <tr><th></th><th>Service</th><th>Trading</th><th>NGO</th><th>Construction</th></tr>
        <tr><td>Invoices, bills, receipts, payments</td>{Y}{Y}{Y}{Y}</tr>
        <tr><td>Journal, ledgers, trial balance, P&amp;L, balance sheet</td>{Y}{Y}{Y}{Y}</tr>
        <tr><td>Inventory and product search</td>{N}{Y}{N}{N}</tr>
        <tr><td>Projects, activities, donor budgets</td>{N}{N}{Y}{N}</tr>
        <tr><td>Sites, locations, investor capital</td>{N}{N}{N}{Y}</tr>
        <tr><td>Budget check on every bill and invoice</td>{N}{N}{Y}{Y}</tr>
      </tbody></table></div>
      <div className="trail"><small>Every number can be traced</small><span>Balance sheet</span><span>Trial balance</span><span>Ledger</span><span>Journal entry</span><span>The original document</span></div>
    </div></section>
  )
}

export function AppsSection({ tag }: { tag?: string }) {
  return (
    <section className="apps" id="products"><div className="wrap">
      <SectionHead tag={tag} title="Two products, one standard" sub="Open either one directly, or read more about what it does." />
      <div className="apps-grid">
        <div className="app-card d"><div className="host">app.oneaccountsbysiqbal.com</div><h3>OneAccounts</h3>
          <p>Cloud accounting and ERP for trading, service, NGO and construction businesses.</p>
          <ul><li>Invoices, bills, receipts, payments</li><li>Inventory, payroll, fixed assets</li><li>Projects, budgets and site control</li></ul>
          <div className="acts"><a className="btn-light" href={`${SITE.app}/login`} target="_blank" rel="noopener">Open OneAccounts</a><Link className="btn-secondary" style={{ color: "#fff", borderColor: "#fff" }} href="/oneaccounts">Learn more</Link></div></div>
        <div className="app-card"><div className="host">properties.oneaccountsbysiqbal.com</div><h3>Property Management</h3>
          <p>Rent, leases and owner accounts for landlords, plazas and apartment buildings.</p>
          <ul><li>Buildings, apartments, tenants, leases</li><li>Security deposits and settlement</li><li>Owner ledger with full accounting</li></ul>
          <div className="acts"><a className="btn-primary" href={SITE.properties} target="_blank" rel="noopener">Open Property Management</a><Link className="btn-secondary" href="/property-management">Learn more</Link></div></div>
      </div>
    </div></section>
  )
}

export function PropertySection({ tag }: { tag?: string }) {
  return (
    <section className="prop" id="property"><div className="wrap"><div className="prop-grid">
      <div className="prop-copy">
        {tag && <span className="newtag">{tag}</span>}
        <div className="eyebrow">OneAccounts Property Management</div>
        <h2>From the building to the owner&apos;s statement</h2>
        <p>Property operations and real double-entry accounting in one place, so rent collected is already in the books.</p>
        <Link href="/property-management" className="btn-primary"><span className="play">&rarr;</span> Explore Property Management</Link>
      </div>
      <div>
        <div className="step"><i>1</i><div><b>Building, floor, apartment</b><span>Organise the portfolio the way managers think of it.</span></div></div>
        <div className="step"><i>2</i><div><b>Owner, tenant, lease</b><span>Charges, roommates and facilities stay with the lease.</span></div></div>
        <div className="step"><i>3</i><div><b>Rent invoice, receipt, security deposit</b><span>Batch invoicing, PDF receipts and deposit settlement.</span></div></div>
        <div className="step"><i>4</i><div><b>Owner ledger, profit and loss</b><span>Statements and payouts, straight from the books.</span></div></div>
      </div>
    </div></div></section>
  )
}

export function HowSection() {
  return (
    <section className="how" id="how"><div className="wrap">
      <SectionHead title="Up and running the same day" sub="No credit card, no long set-up project." />
      <div className="how-grid">
        <div><div className="num">01</div><h3>Start your free trial</h3><p>Create your company and pick your business type. You get the right dashboard and tools from the first login.</p></div>
        <div><div className="num">02</div><h3>We help you bring your data</h3><p>Chart of accounts, opening balances and history can be brought over with help from our team.</p></div>
        <div><div className="num">03</div><h3>Run your books calmly</h3><p>Post invoices, bills and payments, and watch every report, ledger and balance stay in step.</p></div>
      </div>
    </div></section>
  )
}

export function PricingBox() {
  return (
    <section className="pricing" id="pricing"><div className="wrap">
      <div className="pricing-box">
        <h2>Simple, transparent pricing</h2>
        {PRICING_PUBLIC ? (
          <>
            <p>Per user, per month. Longer billing periods cost less per month.</p>
            <div className="tbl-wrap" style={{ marginBottom: 28, textAlign: "left" }}><table className="m"><tbody>
              <tr><th>Plan</th><th>Monthly</th><th>6 months</th><th>Yearly</th></tr>
              <tr><td>Service and Trading</td><td>{rs(PRICING.service.monthly)}</td><td>{rs(PRICING.service.half)}</td><td>{rs(PRICING.service.yearly)}</td></tr>
              <tr><td>NGO and Construction</td><td>{rs(PRICING.ngo.monthly)}</td><td>{rs(PRICING.ngo.half)}</td><td>{rs(PRICING.ngo.yearly)}</td></tr>
            </tbody></table></div>
          </>
        ) : (
          <>
            <p>Start with a free trial, no credit card needed. Paid plans are being finalised and will appear in your dashboard once your trial is active.</p>
            <div className="pricing-note">Currently available to trial companies</div>
          </>
        )}
        <div className="pricing-ctas"><TrialBtn /><a href={`${SITE.app}/dashboard/upgrade`} target="_blank" rel="noopener" className="btn-secondary">View Plans (existing users)</a></div>
      </div>
    </div></section>
  )
}

export function FaqSection({ items = HOME_FAQ, title = "Questions, answered", sub = "Everything you'd want to know before you start." }: { items?: { q: string; a: string }[]; title?: string; sub?: string }) {
  return (
    <section className="faq" id="faq"><div className="wrap">
      <div className="faq-head"><h2>{title}</h2><p>{sub}</p></div>
      <div className="faq-list">{items.map((f, i) => (<details className="faq-item" key={f.q} open={i === 0}><summary><span>{f.q}</span><span className="plus" /></summary><p>{f.a}</p></details>))}</div>
    </div></section>
  )
}

export function CtaBand({ title = "Start calm. Stay calm." }: { title?: string }) {
  return (
    <section className="contact" id="start"><div className="wrap"><div className="cta-band">
      <h2>{title}</h2><p>Free trial for new companies, no credit card required. We help you bring over your opening balances.</p>
      <div className="row"><a className="btn-light" href={`${SITE.app}/login`} target="_blank" rel="noopener">Start Free Trial</a><a className="btn-secondary" href={SITE.whatsapp} target="_blank" rel="noopener">Talk to us on WhatsApp</a></div>
    </div></div></section>
  )
}
