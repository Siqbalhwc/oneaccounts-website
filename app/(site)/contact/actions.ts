"use server"
import { adminClient } from "@/lib/supabase/admin"

export type ContactState = { ok?: boolean; error?: string }
const FAIL = "Sorry, something went wrong. Please message us on WhatsApp instead."

export async function submitLead(_: ContactState, fd: FormData): Promise<ContactState> {
  if (String(fd.get("website") || "")) return { ok: true }
  const g = (k: string, n: number) => String(fd.get(k) || "").trim().slice(0, n)
  const name = g("name", 120), email = g("email", 160), phone = g("phone", 40)
  if (!name || (!email && !phone)) return { error: "Please add your name and an email or phone number." }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "That email address does not look right." }
  try {
    const { error } = await adminClient().from("leads").insert({ name, email, phone, company: g("company", 160), business_type: g("business_type", 40), message: g("message", 2000), source: "website" })
    if (error) return { error: FAIL }
  } catch { return { error: FAIL } }
  return { ok: true }
}
