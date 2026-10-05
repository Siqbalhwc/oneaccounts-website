import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getPost, getPosts, renderMd, fmtDate, readMins } from "@/lib/posts"
import { meta } from "@/lib/meta"
import { SITE } from "@/lib/content"
import { JsonLd, crumbLd } from "@/lib/seo"
import { CtaBand } from "@/components/Sections"

export const revalidate = 60
export async function generateStaticParams() { return (await getPosts()).map((p) => ({ slug: p.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) return {}
  const title = p.seo_title || `${p.title} | OneAccounts`
  const desc = p.seo_description || p.excerpt || ""
  return meta(title, desc, `/blog/${p.slug}`, { openGraph: { type: "article", title, description: desc, url: `${SITE.url}/blog/${p.slug}`, publishedTime: p.published_at || undefined, modifiedTime: p.updated_at, images: [{ url: "/og-image.png", width: 1200, height: 630 }] } })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) notFound()
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.seo_description || p.excerpt, image: `${SITE.url}/og-image.png`, datePublished: p.published_at, dateModified: p.updated_at, author: { "@type": "Organization", name: SITE.name }, publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` } }, mainEntityOfPage: `${SITE.url}/blog/${p.slug}` }
  return (
    <>
      <JsonLd data={[ld, crumbLd([["Home", "/"], ["Guides", "/blog"], [p.title, `/blog/${p.slug}`]])]} />
      <header className="page-hero" style={{ paddingBottom: 30 }}><div className="sunrise-glow" /><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / <Link href="/blog">Guides</Link></div>
        <div className="eyebrow">{p.category || "Guide"}</div>
        <h1 style={{ fontSize: "clamp(30px,3.8vw,42px)" }}>{p.title}</h1>
        <p className="sub" style={{ marginBottom: 0 }}>{fmtDate(p.published_at)} &middot; {readMins(p.content_md)} min read</p>
      </div></header>
      <section style={{ padding: "20px 0 100px" }}><div className="wrap"><article className="prose" dangerouslySetInnerHTML={{ __html: renderMd(p.content_md) }} /></div></section>
      <CtaBand />
    </>
  )
}
