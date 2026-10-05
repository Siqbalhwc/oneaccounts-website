"use server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/auth"
import { adminClient } from "@/lib/supabase/admin"
import { authClient } from "@/lib/supabase/server"

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90)

export async function savePost(fd: FormData) {
  await requireAdmin()
  const id = String(fd.get("id") || "")
  const title = String(fd.get("title") || "").trim()
  const slug = slugify(String(fd.get("slug") || "") || title)
  if (!title || !slug) redirect(`/admin/posts/${id || "new"}?e=missing`)
  const status = fd.get("status") === "published" ? "published" : "draft"
  const sb = adminClient()
  const row: Record<string, unknown> = {
    slug, title, status,
    excerpt: String(fd.get("excerpt") || "").trim() || null,
    content_md: String(fd.get("content_md") || ""),
    category: String(fd.get("category") || "").trim() || null,
    cover_label: String(fd.get("cover_label") || "").trim() || null,
    seo_title: String(fd.get("seo_title") || "").trim() || null,
    seo_description: String(fd.get("seo_description") || "").trim() || null,
    updated_at: new Date().toISOString(),
  }
  let old: { status: string; published_at: string | null } | null = null
  if (id) { const r = await sb.from("posts").select("status,published_at").eq("id", id).maybeSingle(); old = r.data }
  if (status === "published") row.published_at = old?.published_at || new Date().toISOString()
  const q = id ? sb.from("posts").update(row).eq("id", id) : sb.from("posts").insert(row)
  const { error } = await q
  if (error) redirect(`/admin/posts/${id || "new"}?e=${encodeURIComponent(error.message.includes("duplicate") ? "That address (slug) is already used." : "Could not save.")}`)
  revalidatePath("/blog"); revalidatePath(`/blog/${slug}`); revalidatePath("/"); revalidatePath("/sitemap.xml")
  redirect("/admin")
}

export async function deletePost(fd: FormData) {
  await requireAdmin()
  await adminClient().from("posts").delete().eq("id", String(fd.get("id")))
  revalidatePath("/blog"); revalidatePath("/"); revalidatePath("/sitemap.xml")
  redirect("/admin")
}

export async function signOut() {
  const sb = await authClient(); await sb.auth.signOut(); redirect("/admin/login")
}
