"use client"
import { useEffect, useState } from "react"
import { youtubeId } from "@/lib/media"

// The intro video for the front page. A text button in the hero opens the player on top of the page,
// so nobody is sent down the page. Nothing from YouTube loads until the button is pressed.
export default function IntroVideo({ url, title }: { url: string; title?: string | null }) {
  const [open, setOpen] = useState(false)
  const vid = youtubeId(url)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey) }
  }, [open])
  if (!vid) return null
  return (
    <>
      <button type="button" className="hx-link intro-btn" onClick={() => setOpen(true)}>&#9654;&nbsp;Watch the intro video</button>
      {open && (
        <div className="intro-modal" role="dialog" aria-modal="true" aria-label={title || "OneAccounts intro video"} onClick={() => setOpen(false)}>
          <button type="button" className="intro-close" onClick={() => setOpen(false)} aria-label="Close video">&times;</button>
          <div className="intro-box" onClick={(e) => e.stopPropagation()}>
            <iframe src={`https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0`} title={title || "OneAccounts intro video"} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          </div>
        </div>
      )}
    </>
  )
}
