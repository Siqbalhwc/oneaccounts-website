import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

// Keeps the admin login session fresh. Only runs for /admin.
export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return res
  const sb = createServerClient(url, key, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list) => { list.forEach(({ name, value }) => req.cookies.set(name, value)); res = NextResponse.next({ request: req }); list.forEach(({ name, value, options }) => res.cookies.set(name, value, options)) },
    },
  })
  await sb.auth.getUser()
  res.headers.set("X-Robots-Tag", "noindex, nofollow")
  return res
}
export const config = { matcher: ["/admin/:path*"] }
