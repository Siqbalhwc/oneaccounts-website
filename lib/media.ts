import { publicClient } from "@/lib/supabase/public"

export const PRODUCTS = ["General", "Service", "Trading", "NGO", "Construction", "Property"] as const
export type Media = { id: string; kind: "screenshot" | "video"; product: string; title: string; caption: string | null; url: string; sort_order: number; active: boolean }

export async function getMedia(kind: Media["kind"], product?: string): Promise<Media[]> {
  const sb = publicClient()
  if (!sb) return []
  let q = sb.from("media").select("id,kind,product,title,caption,url,sort_order,active").eq("kind", kind).eq("active", true).order("sort_order").order("created_at", { ascending: false })
  if (product) q = q.eq("product", product)
  const { data } = await q
  return (data as Media[]) || []
}

// Which media product each solution page shows.
export const SOLUTION_PRODUCT: Record<string, string> = {
  "service-business-accounting": "Service", "trading-business-software": "Trading", "inventory-management-software": "Trading",
  "ngo-accounting-software": "NGO", "construction-accounting-software": "Construction", "rental-property-accounting": "Property",
}

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/)
  return m ? m[1] : null
}
export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

// Pictures on our own storage are served through Next's image optimiser; any other address is shown as is.
export function isOptimisable(url: string) {
  try {
    const h = new URL(url).hostname, own = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : ""
    return !!own && h === own
  } catch { return false }
}
