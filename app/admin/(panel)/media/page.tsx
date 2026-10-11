import { adminClient } from "@/lib/supabase/admin"
import MediaAddForm from "@/components/MediaAddForm"
import { updateMedia, deleteMedia } from "@/app/admin/media-actions"
import { PRODUCTS, youtubeId, ytThumb, type Media } from "@/lib/media"

const MSG: Record<string, string> = { url: "Please enter an address that starts with https://", yt: "That is not a YouTube link.", save: "Could not save. Did you run supabase/media.sql in Supabase?" }

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ e?: string; ok?: string }> }) {
  const sp = await searchParams
  const { data, error } = await adminClient().from("media").select("*").order("kind").order("sort_order").order("created_at", { ascending: false })
  const rows = (data as (Media & { created_at: string })[]) || []
  return (
    <>
      <h1>Pictures and videos</h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: 680 }}>Screenshots appear as a swipeable gallery on the home page, and on the matching product page. YouTube videos appear in a light &quot;Watch the demo&quot; section (the video only loads when someone presses play). To put a picture inside a guide, use <b>Add picture</b> when writing or editing that guide.</p>
      {sp.e && <div className="msg er">{MSG[sp.e] || "Something went wrong."}</div>}
      {sp.ok && <div className="msg ok2">Saved.</div>}
      {error && <div className="msg er">{MSG.save}</div>}
      <MediaAddForm />
      <table><thead><tr><th>Preview</th><th>Details</th><th></th></tr></thead><tbody>
        {rows.map((m) => { const yt = m.kind === "video" ? youtubeId(m.url) : null; return (
          <tr key={m.id}>
            <td style={{ width: 150 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={yt ? ytThumb(yt) : m.url} alt="" style={{ width: 140, borderRadius: 6 }} loading="lazy" /><div style={{ fontSize: 12 }}>{m.kind === "video" ? "Video" : "Screenshot"}</div></td>
            <td><form action={updateMedia} className="form" style={{ gap: 8 }}>
              <input type="hidden" name="id" value={m.id} />
              <div className="row2"><input name="title" defaultValue={m.title} placeholder="Title" /><select name="product" defaultValue={m.product}>{PRODUCTS.map((p) => <option key={p}>{p}</option>)}</select></div>
              <div className="row2"><input name="caption" defaultValue={m.caption || ""} placeholder="Caption" /><input name="sort_order" type="number" defaultValue={m.sort_order} title="Order" /></div>
              <label style={{ flexDirection: "row", display: "flex", gap: 8, alignItems: "center", fontWeight: 400 }}><input type="checkbox" name="active" defaultChecked={m.active} style={{ width: "auto" }} /> Show on the website</label>
              <button className="btn-login" style={{ cursor: "pointer", justifySelf: "start" }}>Save changes</button>
            </form></td>
            <td><form action={deleteMedia}><input type="hidden" name="id" value={m.id} /><button className="link-btn">Delete</button></form></td>
          </tr>) })}
        {!rows.length && <tr><td colSpan={3}>Nothing yet. The home page shows the built-in NGO dashboard picture until you add one.</td></tr>}
      </tbody></table>
    </>
  )
}
