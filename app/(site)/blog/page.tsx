import { meta } from "@/lib/meta"
import { getPosts } from "@/lib/posts"
import { JsonLd, crumbLd } from "@/lib/seo"
import { PageHero, CtaBand } from "@/components/Sections"
import { PostCards } from "@/components/LatestPosts"

export const revalidate = 60
export const metadata = meta("Guides: Accounting, Tax, NGO Budgets & Property | OneAccounts", "Plain answers for the people who keep the books: withholding tax, NGO budget control, inventory and property management.", "/blog")

export default async function Page() {
  const posts = await getPosts()
  return (
    <>
      <JsonLd data={crumbLd([["Home", "/"], ["Guides", "/blog"]])} />
      <PageHero eyebrow="Guides" crumbs={[["Home", "/"], ["Guides"]]} title="Plain answers for the people who keep the books" sub="Guides on withholding tax, NGO budgets, inventory and property management." />
      <section className="guides"><div className="wrap">{posts.length ? <PostCards posts={posts} /> : <p style={{ textAlign: "center", color: "var(--ink-soft)" }}>Guides are coming soon.</p>}</div></section>
      <CtaBand />
    </>
  )
}
