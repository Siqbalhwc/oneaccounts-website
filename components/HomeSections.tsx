import Link from "next/link"
import type { ReactNode } from "react"
import { SITE, PRICING } from "@/lib/content"
import { fmtDate, type Post } from "@/lib/posts"

const rs = (n: number) => "Rs " + n.toLocaleString("en-PK")

// One business type: words on one side, a picture or example on the other.
export function SectorBlock({ id, title, intro, bullets, href, cta, flip, children }: {
  id: string; title: string; intro: string; bullets: string[]; href: string; cta: string; flip?: boolean; children: ReactNode
}) {
  return (
    <section className="hx-sec" id={id}><div className={`wrap hx-split${flip ? " rev" : ""}`}>
      <div className="hx-copy">
        <h2>{title}</h2>
        <p>{intro}</p>
        <ul className="hx-list">{bullets.map((b) => <li key={b}><span>{b}</span></li>)}</ul>
        <Link className="hx-link" href={href}>{cta}</Link>
      </div>
      <div className="hx-fig">{children}</div>
    </div></section>
  )
}

// Shown when no screenshot has been added from /admin for this product yet. Clearly marked as example figures.
export function ExampleCard({ title, head, rows, note }: { title: string; head?: string[]; rows: string[][]; note: string }) {
  return (
    <>
      <div className="hx-card">
        <div className="hd"><b>{title}</b><span>Example figures</span></div>
        <table className="hx-tbl">
          {head && <thead><tr>{head.map((h, i) => <th key={h} scope="col" className={i >= 2 ? "r" : ""}>{h}</th>)}</tr></thead>}
          <tbody>{rows.map((r, ri) => (
            <tr key={ri} className={ri === rows.length - 1 && !head ? "total" : ""}>{r.map((c, ci) => <td key={ci} className={ci > 0 && (!head || ci >= 2) ? "r" : ""}>{c}</td>)}</tr>
          ))}</tbody>
        </table>
        <div className="hx-note">{note}</div>
      </div>
    </>
  )
}

const ALSO = [
  { h: "/solutions/construction-accounting-software", t: "Construction company accounting", d: "Site budgets and investor capital" },
  { h: "/solutions/service-business-accounting", t: "Service business accounting", d: "Invoices, bills, receipts and payments" },
  { h: "/solutions/inventory-management-software", t: "Inventory management software", d: "Stock check and average costing" },
  { h: "/solutions/rental-property-accounting", t: "Rental property accounting", d: "Rent, deposits and the owner ledger" },
  { h: "/solutions/accounting-software-pakistan", t: "Accounting software for Pakistan", d: "Priced in rupees, with withholding tax inside the entry" },
]

export function AlsoBuiltFor() {
  return (
    <section className="hx-also"><div className="wrap">
      <div className="hx-head"><h2>Also built for</h2></div>
      <div className="hx-alsogrid">
        {ALSO.map((a) => (
          <Link className="hx-alsoitem" href={a.h} key={a.h}><b>{a.t}</b><span>{a.d}</span></Link>
        ))}
      </div>
    </div></section>
  )
}

export function HomePricing() {
  const rows = [
    { n: "Service and Trading", w: "Service companies and traders", p: rs(PRICING.service), u: "per user, per month", d: "Invoices, bills, receipts, payments, ledgers and every core report. Trading adds inventory with a stock check and average costing." },
    { n: "NGO and Construction", w: "Project-based organisations", p: rs(PRICING.ngo), u: "per user, per month", d: "Everything above, plus projects, activities, budgets and a budget check on every bill. Construction adds sites and investor capital." },
    { n: "Property Management", w: "Landlords, plazas and apartment buildings", p: rs(PRICING.property), u: "per month", d: "Buildings, rooms, owners, tenants, leases, rent, deposits and the owner ledger, with full accounting reports." },
  ]
  return (
    <section className="hx-price" id="pricing"><div className="wrap">
      <div className="hx-head"><h2>Pricing in rupees</h2><p>Ten days free, no credit card. Then a flat rate per user per month. Add-ons such as payroll are priced separately.</p></div>
      <div className="hx-plans">
        {rows.map((r) => (
          <div className="hx-prow" key={r.n}>
            <div className="a"><h3>{r.n}</h3><span>{r.w}</span></div>
            <div className="b"><div className="p">{r.p}</div><span>{r.u}</span></div>
            <div className="c">{r.d}</div>
          </div>
        ))}
      </div>
      <div className="hx-acts">
        <a className="hx-btn" href={`${SITE.app}/login`} target="_blank" rel="noopener">Start free trial</a>
        <a className="hx-link" href={SITE.propertiesLogin} target="_blank" rel="noopener">Open Property Management</a>
        <a className="hx-link" href={SITE.whatsapp} target="_blank" rel="noopener">Ask a question on WhatsApp</a>
      </div>
    </div></section>
  )
}

const groupOf = (title: string) => (/ngo|donor|grant|budget/i.test(title) ? 0 : /propert|rent/i.test(title) ? 1 : 2)
const GROUPS = ["NGO accounting", "Property management", "Tax, ERP and more"]

export function GuidesIndex({ posts }: { posts: Post[] }) {
  if (!posts.length) return null
  const cols = GROUPS.map((name, g) => ({ name, items: posts.filter((p) => groupOf(p.title) === g).slice(0, 3) })).filter((c) => c.items.length)
  return (
    <section className="hx-guides" id="guides"><div className="wrap">
      <div className="hx-head row"><h2>Guides for the people who keep the books</h2><Link className="hx-link" href="/blog">All guides</Link></div>
      <div className="hx-gcols">
        {cols.map((c) => (
          <div className="col" key={c.name}>
            <h3>{c.name}</h3>
            {c.items.map((p) => (
              <Link href={`/blog/${p.slug}`} key={p.id}>{p.title}<span>Updated {fmtDate(p.updated_at)}</span></Link>
            ))}
          </div>
        ))}
      </div>
    </div></section>
  )
}

export function HomeFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="hx-sec" id="faq"><div className="wrap">
      <div className="hx-head"><h2>Questions before you start</h2></div>
      <div className="hx-faq">{items.map((f) => <div key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>)}</div>
    </div></section>
  )
}
