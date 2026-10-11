import { NextResponse } from "next/server"
import sharp from "sharp"
import { randomUUID } from "crypto"
import { getAdminEmail } from "@/lib/auth"
import { adminClient } from "@/lib/supabase/admin"

export const runtime = "nodejs"
const MAX_IN = 4 * 1024 * 1024 // Vercel allows about 4.5 MB per request; the browser shrinks pictures first.

// Admin only. Every picture is resized to at most 1600 px wide and saved as WebP, so pages stay light.
export async function POST(req: Request) {
  if (!(await getAdminEmail())) return NextResponse.json({ error: "Not signed in as admin." }, { status: 401 })
  const file = (await req.formData()).get("file")
  if (!(file instanceof File)) return NextResponse.json({ error: "No file." }, { status: 400 })
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Please choose a picture (PNG, JPG or WebP)." }, { status: 400 })
  if (file.size > MAX_IN) return NextResponse.json({ error: "Picture is over 4 MB. Please use a smaller screenshot." }, { status: 413 })
  try {
    const out = await sharp(Buffer.from(await file.arrayBuffer())).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()
    const path = `${new Date().toISOString().slice(0, 7)}/${randomUUID()}.webp`
    const sb = adminClient()
    const { error } = await sb.storage.from("site-media").upload(path, out, { contentType: "image/webp", cacheControl: "31536000" })
    if (error) return NextResponse.json({ error: "Upload failed. Did you run supabase/media.sql?" }, { status: 500 })
    return NextResponse.json({ url: sb.storage.from("site-media").getPublicUrl(path).data.publicUrl, kb: Math.round(out.length / 1024) })
  } catch { return NextResponse.json({ error: "Could not read that picture." }, { status: 400 }) }
}
