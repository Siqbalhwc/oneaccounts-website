import { authClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

const admins = () => (process.env.ADMIN_EMAILS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)

export async function requireAdmin() {
  const sb = await authClient()
  const { data } = await sb.auth.getUser()
  const email = data.user?.email?.toLowerCase()
  if (!email || !admins().includes(email)) redirect("/admin/login")
  return email
}
