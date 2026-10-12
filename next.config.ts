import type { NextConfig } from "next"

// Pictures uploaded from /admin live on the Supabase project's storage; allow the optimiser to serve only those.
const sb = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : null

// Safe, low-risk browser security headers. No Content-Security-Policy yet: Google Analytics, YouTube and
// Supabase pictures all need testing first (see the notes that came with this change).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], remotePatterns: [...(sb ? [{ protocol: "https" as const, hostname: sb, pathname: "/storage/v1/object/public/site-media/**" }] : []), { protocol: "https" as const, hostname: "i.ytimg.com" }] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
  // Belt and braces: if the bare domain ever reaches this app, send it to www with a permanent (308) redirect.
  // The main fix is in Vercel (Settings > Domains), see the notes that came with this change.
  async redirects() {
    return [{ source: "/:path*", has: [{ type: "host" as const, value: "oneaccountsbysiqbal.com" }], destination: "https://www.oneaccountsbysiqbal.com/:path*", permanent: true }]
  },
}
export default nextConfig
