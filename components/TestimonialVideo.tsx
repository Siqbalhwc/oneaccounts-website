"use client"
import { useState } from "react"
import { youtubeId, ytThumb } from "@/lib/media"

// Thumbnail only until pressed, so the page stays light.
export default function TestimonialVideo({ url, name }: { url: string; name: string }) {
  const id = youtubeId(url), [on, setOn] = useState(false)
  if (!id) return null
  return (
    <div className="proof-vid">
      {on ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={`${name} on OneAccounts`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        : <button type="button" onClick={() => setOn(true)} aria-label={`Play video from ${name}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ytThumb(id)} alt="" loading="lazy" decoding="async" /><span className="yt-play">&#9654;</span>
          </button>}
    </div>
  )
}
