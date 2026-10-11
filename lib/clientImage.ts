// Browser side: shrink a picture before upload so it is small and never hits the size limit.
export async function shrinkImage(file: File, maxW = 1600): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") return file
  try {
    const bmp = await createImageBitmap(file)
    const scale = Math.min(1, maxW / bmp.width)
    const c = document.createElement("canvas")
    c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale)
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height)
    const blob: Blob | null = await new Promise((r) => c.toBlob(r, "image/webp", 0.82))
    return blob ? new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", { type: "image/webp" }) : file
  } catch { return file }
}

export async function uploadPicture(file: File): Promise<{ url?: string; error?: string }> {
  const small = await shrinkImage(file)
  const fd = new FormData(); fd.append("file", small)
  try {
    const r = await fetch("/admin/upload", { method: "POST", body: fd })
    const j = await r.json().catch(() => ({}))
    return r.ok ? { url: j.url } : { error: j.error || "Upload failed." }
  } catch { return { error: "Upload failed. Check your connection." } }
}
