"use client"
import { useState } from "react"
import { youtubeId, ytThumb, type Media } from "@/lib/media"

// Light by design: only a thumbnail loads. The YouTube player is created when someone presses play.
export default function VideoShowcase({ items }: { items: Pick<Media, "id" | "url" | "title" | "caption">[] }) {
  const vids = items.map((m) => ({ ...m, vid: youtubeId(m.url) })).filter((m) => m.vid) as (Pick<Media, "id" | "url" | "title" | "caption"> & { vid: string })[]
  const [cur, setCur] = useState(0)
  const [playing, setPlaying] = useState(false)
  if (!vids.length) return null
  const v = vids[cur]
  return (
    <div className="vid-wrap">
      <div className="vid-main">
        {playing
          ? <iframe src={`https://www.youtube-nocookie.com/embed/${v.vid}?autoplay=1&rel=0`} title={v.title || "OneAccounts demo"} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          : <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${v.title || "demo video"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ytThumb(v.vid)} alt={v.title || "OneAccounts demo video"} loading="lazy" decoding="async" /><span className="yt-play">&#9654;</span>
            </button>}
      </div>
      {(v.title || v.caption) && <p className="vid-cap"><b>{v.title}</b>{v.caption && <span> {v.caption}</span>}</p>}
      {vids.length > 1 && <div className="vid-list">{vids.map((m, k) => (
        <button type="button" key={m.id} className={k === cur ? "on" : ""} onClick={() => { setCur(k); setPlaying(false) }}>{m.title || `Video ${k + 1}`}</button>))}</div>}
    </div>
  )
}
