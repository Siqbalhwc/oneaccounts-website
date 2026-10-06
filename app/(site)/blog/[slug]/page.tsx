import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getPost, getPosts, renderMd, fmtDate } from "@/lib/posts"
import { meta } from "@/lib/meta"
import { SITE } from "@/lib/content"
import { JsonLd, crumbLd, faqLd } from "@/lib/seo"
import { CtaBand } from "@/components/Sections"
import { autoSummary, extractFaqs, extractHeadings, genSeoDescription, genSeoTitle, ogImageUrl, readMinutes, wordCount } from "@/lib/postseo"

export const revalidate = 60
export async function generateStaticParams() { return (await getPosts()).map((p) => ({ slug: p.slug })) }

// Search title and description: the admin's own wording if they edited it, otherwise generated.
const seoOf = (p: { title: string; excerpt: string | null; content_md: string; seo_title: string | null; seo_description: string | null }) => ({
  title: p.seo_title?.trim() || genSeoTitle(p.title),
  description: p.seo_description?.trim() || genSeoDescription(p.excerpt?.trim() || autoSummary(p.content_md)),
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) return {}
  const { title, description } = seoOf(p)
  const image = { url: ogImageUrl({ title: p.title, tag: p.category }), width: 1200, height: 630, alt: p.title }
  return meta(title, description, `/blog/${p.slug}`, {
    openGraph: { type: "article", title, description, url: `${SITE.url}/blog/${p.slug}`, siteName: SITE.name, locale: "en_PK", publishedTime: p.published_at || undefined, modifiedTime: p.updated_at, section: p.category || undefined, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) notFound()
  const { description } = seoOf(p)
  const url = `${SITE.url}/blog/${p.slug}`
  const headings = extractHeadings(p.content_md).filter((h) => h.text !== p.title)
  const faqs = extractFaqs(p.content_md)
  const ld = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description,
    image: [ogImageUrl({ title: p.title, tag: p.category })], datePublished: p.published_at, dateModified: p.updated_at,
    articleSection: p.category || undefined, wordCount: wordCount(p.content_md), inLanguage: "en",
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  }
  const data: object[] = [ld, crumbLd([["Home", "/"], ["Guides", "/blog"], [p.title, `/blog/${p.slug}`]])]
  if (faqs.length) data.push(faqLd(faqs))
  return (
    <>
      <JsonLd data={data} />
      <header className="page-hero" style={{ paddingBottom: 30 }}><div className="sunrise-glow" /><div className="wrap">
        <div className="eyebrow">{p.category || "Guide"}</div>
        <h1 style={{ fontSize: "clamp(30px,3.8vw,42px)" }}>{p.title}</h1>
        <p className="sub" style={{ marginBottom: 0 }}>
          <time dateTime={p.published_at || undefined}>{fmtDate(p.published_at)}</time> &middot; {readMinutes(p.content_md)} min read
        </p>
      </div></header>
      <section style={{ padding: "20px 0 100px" }}><div className="wrap">
        {headings.length >= 3 && (
          <nav aria-label="In this guide" style={{ maxWidth: 720, margin: "0 auto 28px", borderLeft: "3px solid var(--gold)", paddingLeft: 18 }}>
            <b style={{ color: "var(--navy)", fontSize: 14 }}>In this guide</b>
            <ol style={{ margin: "8px 0 0", paddingLeft: 20, fontSize: 15, lineHeight: 1.9 }}>
              {headings.map((h) => <li key={h.id}><a href={`#${h.id}`} style={{ color: "var(--navy)" }}>{h.text}</a></li>)}
            </ol>
          </nav>
        )}
        <article className="prose" dangerouslySetInnerHTML={{ __html: renderMd(p.content_md, p.title) }} />
      </div></section>
      <CtaBand />
    </>
  )
}