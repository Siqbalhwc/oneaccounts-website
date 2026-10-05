import { publicClient } from "@/lib/supabase/public"
import { marked } from "marked"

export type Post = {
  id: string; slug: string; title: string; excerpt: string | null; content_md: string
  category: string | null; cover_label: string | null; seo_title: string | null; seo_description: string | null
  status: string; published_at: string | null; updated_at: string
}
const COLS = "id,slug,title,excerpt,content_md,category,cover_label,seo_title,seo_description,status,published_at,updated_at"

export async function getPosts(limit?: number): Promise<Post[]> {
  const sb = publicClient()
  if (!sb) return []
  let q = sb.from("posts").select(COLS).eq("status", "published").order("published_at", { ascending: false })
  if (limit) q = q.limit(limit)
  const { data } = await q
  return (data as Post[]) || []
}
export async function getPost(slug: string): Promise<Post | null> {
  const sb = publicClient()
  if (!sb) return null
  const { data } = await sb.from("posts").select(COLS).eq("slug", slug).eq("status", "published").maybeSingle()
  return (data as Post) || null
}
export const renderMd = (md: string) => marked.parse(md, { async: false }) as string
export const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""
export const readMins = (md: string) => Math.max(1, Math.round(md.split(/\s+/).length / 200))
