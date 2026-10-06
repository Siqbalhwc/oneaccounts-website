"use client"
import { useState } from "react"
import { savePost, deletePost } from "@/app/admin/actions"
import { renderMd } from "@/lib/markdown"
import SeoFields from "@/components/SeoFields"
import { autoSummary, genSeoDescription, genSeoTitle, seoChecks, slugify } from "@/lib/postseo"

type P = { id?: string; slug?: string; title?: string; excerpt?: string | null; content_md?: string; category?: string | null; cover_label?: string | null; seo_title?: string | null; seo_description?: string | null; status?: string }

export default function PostForm({ post, error }: { post?: P; error?: string }) {
  const isEdit = !!post?.id
  const [title, setTitle] = useState(post?.title || "")
  const [md, setMd] = useState(post?.content_md || "")
  const [prev, setPrev] = useState(false)
  const [slugOv, setSlugOv] = useState<string | null>(post?.slug || null)
  const [excerptOv, setExcerptOv] = useState<string | null>(post?.excerpt || null)
  const [seoTitleOv, setSeoTitleOv] = useState<string | null>(post?.seo_title || null)
  const [seoDescOv, setSeoDescOv] = useState<string | null>(post?.seo_description || null)

  // Automatic values, built from what has been written
  const slug = slugOv ?? slugify(title)
  const excerpt = excerptOv ?? autoSummary(md)
  const seoTitle = seoTitleOv ?? genSeoTitle(title)
  const seoDescription = seoDescOv ?? genSeoDescription(excerpt)
  const checks = seoChecks({ title, seoTitle, seoDescription, content: md, slug })

  return (
    <>
      <form action={savePost} className="form">
        <input type="hidden" name="id" defaultValue={post?.id || ""} />
        {/* Submitted values: the effective summary and web address; SEO fields only when edited (blank = auto) */}
        <input type="hidden" name="slug" value={slug} readOnly />
        <input type="hidden" name="excerpt" value={excerpt} readOnly />
        <input type="hidden" name="seo_title" value={seoTitleOv ?? ""} readOnly />
        <input type="hidden" name="seo_description" value={seoDescOv ?? ""} readOnly />
        {error && <div className="msg er">{error === "missing" ? "Please add a title." : error}</div>}
        <label>Title<input name="title" required value={title} onChange={(e) => setTitle(e.target.value)} maxLength={160} placeholder="e.g. How to calculate withholding tax on supplier payments" /></label>
        <div className="row2">
          <label>
            Web address
            <span style={{ display: "flex", alignItems: "center", border: "1px solid rgba(11,10,92,.2)", borderRadius: 9, background: "#fff" }}>
              <span style={{ padding: "0 4px 0 14px", fontSize: 14, color: "var(--ink-soft)", fontWeight: 400 }}>/blog/</span>
              <input value={slug} disabled={isEdit} onChange={(e) => setSlugOv(slugify(e.target.value) || null)} style={{ border: 0, flex: 1, minWidth: 0, background: "transparent", paddingLeft: 0 }} />
            </span>
            <span style={{ fontSize: 12, fontWeight: 400, color: "var(--ink-soft)" }}>{isEdit ? "Cannot be changed after saving, so shared links keep working." : "Made from the title automatically. Keep it short."}</span>
          </label>
          <label>Status<select name="status" defaultValue={post?.status || "draft"}><option value="draft">Draft (private)</option><option value="published">Published (live on the website)</option></select></label>
        </div>
        <div className="row2">
          <label>Category<input name="category" defaultValue={post?.category || ""} placeholder="Tax, NGO, Property, Inventory" /></label>
          <label>Cover label<input name="cover_label" defaultValue={post?.cover_label || ""} placeholder="Short text shown on the cover" maxLength={40} /></label>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <b style={{ color: "var(--navy)", fontSize: 13 }}>Article (Markdown)</b>
          <button type="button" className="link-btn" style={{ color: "var(--navy)" }} onClick={() => setPrev(!prev)}>{prev ? "Edit" : "Preview"}</button>
        </div>
        <textarea name="content_md" value={md} onChange={(e) => setMd(e.target.value)} style={{ minHeight: 420, fontFamily: "ui-monospace,Menlo,Consolas,monospace", fontSize: 14, display: prev ? "none" : "block" }} />
        {prev && <div className="prose" style={{ border: "1px solid var(--hairline)", borderRadius: 9, padding: 24, background: "#fff", maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: renderMd(md, title) }} />}
        <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: -6 }}>
          Tip: aim for 600+ words that fully answer one question. End with <code>## Frequently asked questions</code> and a <code>### question?</code> heading for each one; Google can then show them as FAQ results. Link to other pages like <code>[OneAccounts](/oneaccounts)</code>.
        </div>

        <label>
          <span style={{ display: "flex", justifyContent: "space-between" }}><span>Summary (shown on cards) <span style={{ fontSize: 12, fontWeight: 400, color: "var(--ink-soft)" }}>{excerptOv === null ? "(auto, from the first paragraph)" : "(your wording)"}</span></span></span>
          <textarea value={excerpt} onChange={(e) => setExcerptOv(e.target.value === "" ? null : e.target.value)} maxLength={300} style={{ minHeight: 70 }} />
          {excerptOv !== null && <button type="button" className="link-btn" style={{ color: "var(--ink-soft)", fontWeight: 400, fontSize: 12, textDecoration: "underline", justifySelf: "start" }} onClick={() => setExcerptOv(null)}>Reset to auto</button>}
        </label>

        <SeoFields
          urlPreview={`www.oneaccountsbysiqbal.com \u203A blog \u203A ${slug || "your-guide"}`}
          title={seoTitle} description={seoDescription}
          titleIsAuto={seoTitleOv === null} descriptionIsAuto={seoDescOv === null}
          onTitleChange={(v) => setSeoTitleOv(v === "" ? null : v)} onDescriptionChange={(v) => setSeoDescOv(v === "" ? null : v)}
          onResetTitle={() => setSeoTitleOv(null)} onResetDescription={() => setSeoDescOv(null)}
          checks={checks}
        />
        <button className="btn-primary" style={{ border: 0, cursor: "pointer", justifySelf: "start" }}>Save</button>
      </form>
      {post?.id && <form action={deletePost} style={{ marginTop: 22 }}><input type="hidden" name="id" value={post.id} /><button className="link-btn">Delete this guide</button></form>}
    </>
  )
}