"use server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/auth"
import { adminClient } from "@/lib/supabase/admin"
import { PRODUCTS, youtubeId } from "@/lib/media"

const refresh = () => { revalidatePath("/"); revalidatePath("/property-management"); revalidatePath("/solutions/[slug]", "page"); revalidatePath("/admin/media") }

export async function addMedia(fd: FormData) {
  await requireAdmin()
  const kind = fd.get("kind") === "video" ? "video" : "screenshot"
  const url = String(fd.get("url") || "").trim()
  const product = PRODUCTS.includes(String(fd.get("product")) as never) ? String(fd.get("product")) : "General"
  if (!/^https:\/\//.test(url)) redirect("/admin/media?e=url")
  if (kind === "video" && !youtubeId(url)) redirect("/admin/media?e=yt")
  const { error } = await adminClient().from("media").insert({
    kind, product, url, title: String(fd.get("title") || "").trim().slice(0, 120),
    caption: String(fd.get("caption") || "").trim().slice(0, 240) || null, sort_order: Number(fd.get("sort_order")) || 100,
  })
  if (error) redirect("/admin/media?e=save")
  refresh(); redirect("/admin/media?ok=1")
}

export async function updateMedia(fd: FormData) {
  await requireAdmin()
  const id = String(fd.get("id"))
  await adminClient().from("media").update({
    title: String(fd.get("title") || "").trim().slice(0, 120), caption: String(fd.get("caption") || "").trim().slice(0, 240) || null,
    product: PRODUCTS.includes(String(fd.get("product")) as never) ? String(fd.get("product")) : "General",
    sort_order: Number(fd.get("sort_order")) || 100, active: fd.get("active") === "on",
  }).eq("id", id)
  refresh(); redirect("/admin/media?ok=1")
}

export async function deleteMedia(fd: FormData) {
  await requireAdmin()
  await adminClient().from("media").delete().eq("id", String(fd.get("id")))
  refresh(); redirect("/admin/media")
}
