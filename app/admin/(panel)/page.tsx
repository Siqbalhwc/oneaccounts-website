import Link from "next/link"
import { adminClient } from "@/lib/supabase/admin"
import { fmtDate } from "@/lib/posts"

export default async function Posts() {
  const { data } = await adminClient().from("posts").select("id,title,slug,status,category,updated_at").order("updated_at", { ascending: false })
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h1 style={{ margin: 0 }}>Guides</h1><Link className="btn-primary" href="/admin/posts/new">New guide</Link></div>
      <table><thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Updated</th></tr></thead><tbody>
        {(data || []).map((p) => (<tr key={p.id}><td><Link href={`/admin/posts/${p.id}`} style={{ color: "var(--navy)", fontWeight: 600 }}>{p.title}</Link><div style={{ fontSize: 12, color: "var(--ink-soft)" }}>/blog/{p.slug}</div></td><td>{p.category}</td><td style={{ color: p.status === "published" ? "var(--sage)" : "var(--ink-soft)", fontWeight: 600 }}>{p.status}</td><td>{fmtDate(p.updated_at)}</td></tr>))}
        {!data?.length && <tr><td colSpan={4}>No guides yet.</td></tr>}
      </tbody></table>
    </>
  )
}
