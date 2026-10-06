import { authClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

const admins = () => (process.env.ADMIN_EMAILS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)

export async function requireAdmin() {
  const sb = await authClient()
  const { data } = await sb.auth.getUser()
  const email = data.user?.email?.toLowerCase()
  if (!email) redirect("/admin/login?e=session")
  if (admins().length === 0) {
    const missing = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY", "ADMIN_EMAILS"].filter((k) => !process.env[k])
    redirect(`/admin/login?e=noenv&m=${encodeURIComponent(missing.join(", "))}`)
  }
  if (!admins().includes(email)) redirect(`/admin/login?e=denied&u=${encodeURIComponent(email)}`)
  return email
}
