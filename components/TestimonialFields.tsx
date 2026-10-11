"use client"
import { useState } from "react"
import PictureUpload from "@/components/PictureUpload"

type T = { name?: string; role?: string | null; company?: string | null; quote?: string; photo_url?: string | null; video_url?: string | null; sort_order?: number; active?: boolean }

// Shared by "add" and "edit" so both look the same.
export default function TestimonialFields({ t = {}, edit = false }: { t?: T; edit?: boolean }) {
  const [photo, setPhoto] = useState(t.photo_url || "")
  return (
    <>
      <div className="row2"><label>Customer name<input name="name" defaultValue={t.name || ""} maxLength={120} required placeholder="e.g. Ahmed Raza" /></label><label>Role (optional)<input name="role" defaultValue={t.role || ""} maxLength={120} placeholder="e.g. Finance Manager" /></label></div>
      <div className="row2"><label>Company (optional)<input name="company" defaultValue={t.company || ""} maxLength={160} placeholder="e.g. ABC Traders, Lahore" /></label><label>Order (small number shows first)<input name="sort_order" type="number" defaultValue={t.sort_order ?? 100} /></label></div>
      <label>What they said<textarea name="quote" defaultValue={t.quote || ""} maxLength={700} style={{ minHeight: 90 }} placeholder="Their words, as they gave them. Only add what the customer has agreed to." /></label>
      <div className="row2">
        <label>YouTube link of the customer speaking (optional)<input name="video_url" defaultValue={t.video_url || ""} placeholder="https://www.youtube.com/watch?v=..." /></label>
        <label>Picture or logo address (optional)<input name="photo_url" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="https://..." /></label>
      </div>
      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <PictureUpload onDone={setPhoto} label="Upload picture" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {photo && <img src={photo} alt="Preview" style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--hairline)" }} />}
      </div>
      {edit && <label style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", fontWeight: 400 }}><input type="checkbox" name="active" defaultChecked={t.active ?? true} style={{ width: "auto" }} /> Show on the website</label>}
    </>
  )
}
