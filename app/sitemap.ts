import type { MetadataRoute } from "next"
import { SITE, SOLUTIONS } from "@/lib/content"
import { getPosts } from "@/lib/posts"

// Search engines use lastmod only when it is honest. Update this date whenever the wording of a
// fixed page (home, solutions, pricing, privacy and so on) really changes. Guides use their own saved date.
const PAGES_UPDATED = new Date("2026-10-12")
// The NGO solution page gained its reports, withholding tax, payroll, controls, grant reporting and audit sections (19 and 24 Oct 2026).
const NGO_PAGE_UPDATED = new Date("2026-10-24")
// The Trading and Construction solution pages gained new sections on 22 Oct 2026.
const TRADING_CONSTRUCTION_UPDATED = new Date("2026-10-22")
// The Property Management page gained its keyword heading, sections, FAQs and price on 24 Oct 2026.
const PROPERTY_UPDATED = new Date("2026-10-24")
// The home page changed on 24 Oct 2026 (intro video button, keyword sections).
const HOME_UPDATED = new Date("2026-10-24")
// About, Privacy and Terms were rewritten on 17 Oct 2026.
const TRUST_PAGES_UPDATED = new Date("2026-10-17")
const TRUST_PAGES = ["/about", "/privacy", "/terms"]

// The database stores dates with microseconds (for example 2026-10-05T02:03:36.824879+00:00).
// Convert every date to the standard form (2026-10-05T02:03:36.824Z) so all entries look the same to Google.
const safeDate = (v: string | null | undefined, fallback: Date) => { const d = v ? new Date(v) : fallback; return isNaN(d.getTime()) ? fallback : d }

export const revalidate = 3600
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const newestGuide = posts.reduce<Date | null>((d, p) => { const t = safeDate(p.updated_at, PAGES_UPDATED); return !d || t > d ? t : d }, null)
  const fixed = ["", "/oneaccounts", "/property-management", "/solutions", "/pricing", "/blog", "/contact", "/about", "/privacy", "/terms"]
  const fixedDate = (p: string) => p === "" ? HOME_UPDATED : p === "/property-management" ? PROPERTY_UPDATED : TRUST_PAGES.includes(p) ? TRUST_PAGES_UPDATED : p === "/blog" && newestGuide && newestGuide > PAGES_UPDATED ? newestGuide : PAGES_UPDATED
  return [
    ...fixed.map((p) => ({ url: SITE.url + p, lastModified: fixedDate(p) })),
    ...SOLUTIONS.map((s) => ({ url: `${SITE.url}/solutions/${s.slug}`, lastModified: s.slug === "ngo-accounting-software" ? NGO_PAGE_UPDATED : s.slug === "trading-business-software" || s.slug === "construction-accounting-software" ? TRADING_CONSTRUCTION_UPDATED : PAGES_UPDATED })),
    ...posts.map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: safeDate(p.updated_at, PAGES_UPDATED) })),
  ]
}
