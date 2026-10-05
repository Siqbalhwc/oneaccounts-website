import { adminClient } from "@/lib/supabase/admin"
import { fmtDate } from "@/lib/posts"
export default async function Leads() {
  const { data } = await adminClient().from("leads").select("*").order("created_at", { ascending: false }).limit(200)
  return (
    <>
      <h1>Leads</h1>
      <table><thead><tr><th>When</th><th>Name</th><th>Contact</th><th>Type</th><th>Message</th></tr></thead><tbody>
        {(data || []).map((l) => (<tr key={l.id}><td>{fmtDate(l.created_at)}</td><td><b>{l.name}</b><div style={{ fontSize: 12 }}>{l.company}</div></td><td>{l.email}<div>{l.phone}</div></td><td>{l.business_type}</td><td style={{ maxWidth: 280 }}>{l.message}</td></tr>))}
        {!data?.length && <tr><td colSpan={5}>No leads yet.</td></tr>}
      </tbody></table>
    </>
  )
}
