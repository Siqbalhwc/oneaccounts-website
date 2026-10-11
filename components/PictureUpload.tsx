"use client"
import { useRef, useState } from "react"
import { uploadPicture } from "@/lib/clientImage"

// "Choose picture" button: uploads (shrunk and converted to WebP) and hands back the address.
export default function PictureUpload({ onDone, label = "Upload picture" }: { onDone: (url: string) => void; label?: string }) {
  const ref = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState("")
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <input ref={ref} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={async (e) => {
        const f = e.target.files?.[0]; if (!f) return
        setBusy(true); setErr("")
        const r = await uploadPicture(f)
        setBusy(false); if (ref.current) ref.current.value = ""
        if (r.url) onDone(r.url); else setErr(r.error || "Upload failed.")
      }} />
      <button type="button" className="btn-login" style={{ cursor: "pointer", background: "#fff" }} disabled={busy} onClick={() => ref.current?.click()}>{busy ? "Uploading..." : label}</button>
      {err && <span style={{ color: "#a33", fontSize: 13 }}>{err}</span>}
    </span>
  )
}
