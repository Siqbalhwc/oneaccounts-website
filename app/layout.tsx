import type { Metadata, Viewport } from "next"
import "@fontsource-variable/sora"
import "@fontsource-variable/inter"
import "./globals.css"
import { SITE } from "@/lib/content"
import { JsonLd, orgLd, websiteLd } from "@/lib/seo"

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "OneAccounts | Cloud Accounting & ERP Software for Pakistan", template: "%s" },
  description: "OneAccounts is a cloud ERP for growing businesses and NGOs: accounting, inventory, and payroll that stay clear, current, and calm. Start a free trial, no credit card required.",
  applicationName: "OneAccounts",
  alternates: { canonical: "/" },
  openGraph: { siteName: "OneAccounts", type: "website", locale: "en_PK", url: SITE.url, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OneAccounts: Simple by Design. Professional by Nature." }] },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: [{ url: "/favicon-32.png", sizes: "32x32" }, { url: "/favicon-16.png", sizes: "16x16" }], apple: "/favicon-180.png" },
}
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#FAF8F4" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><JsonLd data={[orgLd(), websiteLd()]} />{children}</body>
    </html>
  )
}
