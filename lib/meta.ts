import type { Metadata } from "next"
import { SITE } from "@/lib/content"

// Next.js replaces (not merges) openGraph and twitter when a page sets its own,
// so every page must state its own image or it silently loses the share picture.
const DEFAULT_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "OneAccounts: Simple by Design. Professional by Nature." }

export function meta(title: string, description: string, path: string, extra: Partial<Metadata> = {}): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title, description, url: SITE.url + path, siteName: SITE.name, type: "website", locale: "en_PK", images: [DEFAULT_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_IMAGE.url] },
    ...extra,
  }
}