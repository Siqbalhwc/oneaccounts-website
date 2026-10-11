"use client"
import { useState } from "react"
import { addMedia } from "@/app/admin/media-actions"
import PictureUpload from "@/components/PictureUpload"
import { PRODUCTS } from "@/lib/media"

export default function MediaAddForm() {
  const [kind, setKind] = useState<"screenshot" | "video">("screenshot")
  const [url, setUrl] = useState("")
  return (
    <form action={addMedia} className="form" style={{ marginBottom: 36 }}>
      <h2 style={{ margin: 0 }}>Add a picture or video</h2>
      <div className="row2">
        <label>Type<select name="kind" value={kind} onChange={(e) => { setKind(e.target.value as "screenshot" | "video"); setUrl("") }}><option value="screenshot">Screenshot (picture)</option><option value="video">Demo video (YouTube link)</option></select></label>
        <label>Shows on<select name="product" defaultValue="General">{PRODUCTS.map((p) => <option key={p} value={p}>{p === "General" ? "Home page (General)" : `${p} page (and Home)`}</option>)}</select></label>
      </div>
      <label>{kind === "video" ? "YouTube link" : "Picture address (or upload below)"}<input name="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={kind === "video" ? "https://www.youtube.com/watch?v=..." : "https://..."} required /></label>
      {kind === "screenshot" && <div><PictureUpload onDone={setUrl} label="Upload a screenshot" /><div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 6 }}>Best at 16:10 (for example 1600 x 1000). It is shrunk automatically, so large files are fine. All pictures are shown in the same frame so they look alike.</div></div>}
      <div className="row2"><label>Title<input name="title" maxLength={120} placeholder="e.g. Trading dashboard" /></label><label>Order (small number shows first)<input name="sort_order" type="number" defaultValue={100} /></label></div>
      <label>Caption (optional)<input name="caption" maxLength={240} placeholder="One line shown under the picture" /></label>
      {url && kind === "screenshot" && /* eslint-disable-next-line @next/next/no-img-element */ <img src={url} alt="Preview" style={{ maxWidth: 360, borderRadius: 8, border: "1px solid var(--hairline)" }} />}
      <button className="btn-primary" style={{ border: 0, cursor: "pointer", justifySelf: "start" }}>Add</button>
    </form>
  )
}
