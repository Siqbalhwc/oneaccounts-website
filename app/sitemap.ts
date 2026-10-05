import type { MetadataRoute } from "next"
import { SITE, SOLUTIONS } from "@/lib/content"
import { getPosts } from "@/lib/posts"

export const revalidate = 3600
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()
  const fixed = ["", "/oneaccounts", "/property-management", "/solutions", "/pricing", "/blog", "/contact", "/privacy", "/terms"]
  return [
    ...fixed.map((p) => ({ url: SITE.url + p, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...SOLUTIONS.map((s) => ({ url: `${SITE.url}/solutions/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: p.updated_at, priority: 0.6 })),
  ]
}
