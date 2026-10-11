"use server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/auth"
import { adminClient } from "@/lib/supabase/admin"
import { youtubeId } from "@/lib/media"

const s = (fd: FormData, k: string, n: number) => String(fd.get(k) || "").trim().slice(0, n)
const refresh = () => { revalidatePath("/"); revalidatePath("/admin/testimonials") }

function fields(fd: FormData) {
  const photo = s(fd, "photo_url", 600), video = s(fd, "video_url", 300)
  if (photo && !/^https:\/\//.test(photo)) redirect("/admin/testimonials?e=photo")
  if (video && !youtubeId(video)) redirect("/admin/testimonials?e=yt")
  return { name: s(fd, "name", 120), role: s(fd, "role", 120) || null, company: s(fd, "company", 160) || null, quote: s(fd, "quote", 700), photo_url: photo || null, video_url: video || null, sort_order: Number(fd.get("sort_order")) || 100 }
}

export async function addTestimonial(fd: FormData) {
  await requireAdmin()
  const f = fields(fd)
  if (!f.name || (!f.quote && !f.video_url)) redirect("/admin/testimonials?e=missing")
  const { error } = await adminClient().from("testimonials").insert(f)
  if (error) redirect("/admin/testimonials?e=save")
  refresh(); redirect("/admin/testimonials?ok=1")
}

export async function updateTestimonial(fd: FormData) {
  await requireAdmin()
  const f = fields(fd)
  if (!f.name || (!f.quote && !f.video_url)) redirect("/admin/testimonials?e=missing")
  await adminClient().from("testimonials").update({ ...f, active: fd.get("active") === "on" }).eq("id", String(fd.get("id")))
  refresh(); redirect("/admin/testimonials?ok=1")
}

export async function deleteTestimonial(fd: FormData) {
  await requireAdmin()
  await adminClient().from("testimonials").delete().eq("id", String(fd.get("id")))
  refresh(); redirect("/admin/testimonials")
}
