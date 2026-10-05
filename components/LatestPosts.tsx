import Link from "next/link"
import { getPosts, readMins } from "@/lib/posts"

export const coverClass = (c: string | null) => (/ngo|budget/i.test(c || "") ? "s" : /propert|rent/i.test(c || "") ? "p" : "")

export function PostCards({ posts }: { posts: Awaited<ReturnType<typeof getPosts>> }) {
  return (
    <div className="g-grid">
      {posts.map((p) => (
        <Link key={p.id} href={`/blog/${p.slug}`} className="g-card">
          <div className={`g-cv ${coverClass(p.cover_label || p.category)}`}>{p.cover_label || p.category || "OneAccounts"}</div>
          <div className="g-b"><small>{(p.category || "GUIDE").toUpperCase()}</small><h3>{p.title}</h3>{p.excerpt && <p>{p.excerpt}</p>}<span>{readMins(p.content_md)} min read</span></div>
        </Link>
      ))}
    </div>
  )
}

export default async function LatestPosts() {
  const posts = await getPosts(3)
  if (posts.length === 0) return null
  return (
    <section className="guides" id="guides"><div className="wrap">
      <div className="ind-head"><h2>Plain answers for the people who keep the books</h2><p>Guides on tax, budgets, stock and property.</p></div>
      <PostCards posts={posts} />
      <p style={{ marginTop: 28 }}><Link className="btn-secondary" href="/blog">See all guides</Link></p>
    </div></section>
  )
}
