import Link from "next/link"
import { requireAdmin } from "@/lib/auth"
import { signOut } from "@/app/admin/actions"

export default async function Panel({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return (
    <>
      <div className="adm-bar"><div className="wrap"><b>OneAccounts admin</b><Link href="/admin">Guides</Link><Link href="/admin/leads">Leads</Link><Link href="/" target="_blank">View site</Link><form action={signOut}><button className="link-btn" style={{ color: "#F3CFA6" }}>Sign out</button></form></div></div>
      <div className="adm-w">{children}</div>
    </>
  )
}
