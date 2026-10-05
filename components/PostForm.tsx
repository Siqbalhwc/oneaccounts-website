"use client"
import { useState } from "react"
import { marked } from "marked"
import { savePost, deletePost } from "@/app/admin/actions"

type P = { id?: string; slug?: string; title?: string; excerpt?: string | null; content_md?: string; category?: string | null; cover_label?: string | null; seo_title?: string | null; seo_description?: string | null; status?: string }

export default function PostForm({ post, error }: { post?: P; error?: string }) {
  const [md, setMd] = useState(post?.content_md || ""), [prev, setPrev] = useState(false)
  return (
    <>
      <form action={savePost} className="form">
        <input type="hidden" name="id" defaultValue={post?.id || ""} />
        {error && <div className="msg er">{error === "missing" ? "Please add a title." : error}</div>}
        <label>Title<input name="title" required defaultValue={post?.title || ""} maxLength={160} /></label>
        <div className="row2">
          <label>Address (slug, optional)<input name="slug" defaultValue={post?.slug || ""} placeholder="made-from-the-title" /></label>
          <label>Status<select name="status" defaultValue={post?.status || "draft"}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        </div>
        <div className="row2">
          <label>Category<input name="category" defaultValue={post?.category || ""} placeholder="Tax, NGO, Property, Inventory" /></label>
          <label>Cover label<input name="cover_label" defaultValue={post?.cover_label || ""} placeholder="Short text shown on the cover" maxLength={40} /></label>
        </div>
        <label>Summary (shown on cards)<textarea name="excerpt" defaultValue={post?.excerpt || ""} maxLength={300} style={{ minHeight: 70 }} /></label>
        <div className="row2">
          <label>Search title (up to 60 characters)<input name="seo_title" defaultValue={post?.seo_title || ""} maxLength={70} /></label>
          <label>Search description (up to 160 characters)<input name="seo_description" defaultValue={post?.seo_description || ""} maxLength={170} /></label>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <b style={{ color: "var(--navy)", fontSize: 13 }}>Article (Markdown)</b>
          <button type="button" className="link-btn" style={{ color: "var(--navy)" }} onClick={() => setPrev(!prev)}>{prev ? "Edit" : "Preview"}</button>
        </div>
        <textarea name="content_md" value={md} onChange={(e) => setMd(e.target.value)} style={{ minHeight: 420, fontFamily: "ui-monospace,Menlo,Consolas,monospace", fontSize: 14, display: prev ? "none" : "block" }} />
        {prev && <div className="prose" style={{ border: "1px solid var(--hairline)", borderRadius: 9, padding: 24, background: "#fff", maxWidth: "none" }} dangerouslySetInnerHTML={{ __html: marked.parse(md, { async: false }) as string }} />}
        <button className="btn-primary" style={{ border: 0, cursor: "pointer", justifySelf: "start" }}>Save</button>
      </form>
      {post?.id && <form action={deletePost} style={{ marginTop: 22 }}><input type="hidden" name="id" value={post.id} /><button className="link-btn">Delete this guide</button></form>}
    </>
  )
}
