import type { Metadata } from "next"
import { SITE } from "@/lib/content"
export function meta(title: string, description: string, path: string, extra: Partial<Metadata> = {}): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title, description, url: SITE.url + path, siteName: SITE.name, type: "website", locale: "en_PK" },
    twitter: { card: "summary_large_image", title, description },
    ...extra,
  }
}
