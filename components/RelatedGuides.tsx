import Link from "next/link"
import { getPosts } from "@/lib/posts"
import { PostCards } from "@/components/LatestPosts"

// Where a guide sends the reader next: the product page that matches its topic, plus other guides.
// Gives every guide internal links even when the article itself has none.
function productFor(category: string | null) {
  const c = (category || "").toLowerCase()
  if (c.includes("propert") || c.includes("rent")) return { href: "/property-management", label: "OneAccounts Property Management", text: "Buildings, tenants, leases, rent and owner statements, posted into real double-entry accounts." }
  if (c.includes("ngo") || c.includes("budget") || c.includes("donor")) return { href: "/solutions/ngo-accounting-software", label: "NGO accounting software", text: "Projects, donor budgets and a budget check on every bill before it posts." }
  if (c.includes("inventory") || c.includes("stock")) return { href: "/solutions/inventory-management-software", label: "Inventory management software", text: "Stock check on every sale and average costing, connected to your accounts." }
  if (c.includes("construction")) return { href: "/solutions/construction-accounting-software", label: "Construction accounting software", text: "Site budgets, bill validation and investor profit share." }
  return { href: "/solutions/accounting-software-pakistan", label: "Accounting software for Pakistan", text: "Cloud accounting and ERP in rupees, with withholding tax, payroll and inventory." }
}

export default async function RelatedGuides({ current }: { current: { slug: string; category: string | null } }) {
  const all = (await getPosts()).filter((p) => p.slug !== current.slug)
  const sameTopic = all.filter((p) => p.category && p.category === current.category)
  const others = all.filter((p) => !sameTopic.includes(p))
  const picks = [...sameTopic, ...others].slice(0, 3)
  const prod = productFor(current.category)
  return (
    <section className="guides" aria-label="Related reading"><div className="wrap">
      <div className="ind-head"><h2>Keep reading</h2><p>Related pages from OneAccounts.</p></div>
      <p style={{ margin: "0 0 26px", fontSize: 16, lineHeight: 1.6 }}>
        See how it works in the product: <Link href={prod.href} style={{ color: "var(--navy)", fontWeight: 600, textDecoration: "underline" }}>{prod.label}</Link>. {prod.text}
      </p>
      {picks.length > 0 && <PostCards posts={picks} />}
    </div></section>
  )
}
