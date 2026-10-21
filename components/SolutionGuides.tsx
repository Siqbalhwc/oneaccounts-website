import Link from "next/link"
import { getPosts } from "@/lib/posts"
import { PostCards } from "@/components/LatestPosts"

// A block of guides on one topic, shown at the bottom of a solution page. Gives every solution page real internal
// links to its guides, which is how search engines learn that the page and the guides belong together.
// Guides are picked by category (for example "NGO" or "Property"), newest first. Shows nothing if there are none.
export default async function SolutionGuides({ match, title = "Guides on this topic", sub = "Practical how-to guides from the OneAccounts team.", limit = 6 }: { match: RegExp; title?: string; sub?: string; limit?: number }) {
  const posts = (await getPosts()).filter((p) => match.test(p.category || "")).slice(0, limit)
  if (posts.length === 0) return null
  return (
    <section className="guides" aria-label="Related guides"><div className="wrap">
      <div className="ind-head"><h2>{title}</h2><p>{sub}</p></div>
      <PostCards posts={posts} />
      <p style={{ marginTop: 28 }}><Link className="btn-secondary" href="/blog">See all guides</Link></p>
    </div></section>
  )
}
