import type { MetadataRoute } from "next"
import { SITE, SOLUTIONS } from "@/lib/content"
import { getPosts } from "@/lib/posts"

// Search engines use lastmod only when it is honest. Update this date whenever the wording of a
// fixed page (home, solutions, pricing, privacy and so on) really changes. Guides use their own saved date.
const PAGES_UPDATED = new Date("2026-10-12")

export const revalidate = 3600
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const newestGuide = posts.reduce<Date | null>((d, p) => { const t = new Date(p.updated_at); return !d || t > d ? t : d }, null)
  const fixed = ["", "/oneaccounts", "/property-management", "/solutions", "/pricing", "/blog", "/contact", "/privacy", "/terms"]
  return [
    ...fixed.map((p) => ({ url: SITE.url + p, lastModified: p === "/blog" && newestGuide && newestGuide > PAGES_UPDATED ? newestGuide : PAGES_UPDATED })),
    ...SOLUTIONS.map((s) => ({ url: `${SITE.url}/solutions/${s.slug}`, lastModified: PAGES_UPDATED })),
    ...posts.map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: p.updated_at })),
  ]
}
