import { publicClient } from "@/lib/supabase/public"

export type Testimonial = { id: string; name: string; role: string | null; company: string | null; quote: string; photo_url: string | null; video_url: string | null; sort_order: number; active: boolean }

export async function getTestimonials(): Promise<Testimonial[]> {
  const sb = publicClient()
  if (!sb) return []
  const { data } = await sb.from("testimonials").select("id,name,role,company,quote,photo_url,video_url,sort_order,active").eq("active", true).order("sort_order").order("created_at", { ascending: false })
  return (data as Testimonial[]) || []
}
