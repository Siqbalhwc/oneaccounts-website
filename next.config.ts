import type { NextConfig } from "next"

// Pictures uploaded from /admin live on the Supabase project's storage; allow the optimiser to serve only those.
const sb = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : null
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], remotePatterns: [...(sb ? [{ protocol: "https" as const, hostname: sb, pathname: "/storage/v1/object/public/site-media/**" }] : []), { protocol: "https" as const, hostname: "i.ytimg.com" }] },
}
export default nextConfig
