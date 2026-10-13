"use client"
import { useState } from "react"
import { youtubeId, ytThumb, type Media } from "@/lib/media"

// Light by design: only thumbnails load. A YouTube player is created in that tile when someone presses play.
export default function DemoGrid({ items }: { items: Pick<Media, "id" | "url" | "title" | "caption">[] }) {
  const vids = items.map((m) => ({ ...m, vid: youtubeId(m.url) })).filter((m): m is typeof m & { vid: string } => !!m.vid)
  const [playing, setPlaying] = useState<string | null>(null)
  if (!vids.length) return null
  return (
    <div className="hx-demos">
      {vids.map((m) => (
        <div className="hx-demo" key={m.id}>
          <div className="th">
            {playing === m.id
              ? <iframe src={`https://www.youtube-nocookie.com/embed/${m.vid}?autoplay=1&rel=0`} title={m.title || "OneAccounts demo"} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
              : <button type="button" onClick={() => setPlaying(m.id)} aria-label={`Play ${m.title || "demo video"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ytThumb(m.vid)} alt={m.title || "OneAccounts demo video"} loading="lazy" decoding="async" /><span className="yt-play">&#9654;</span>
                </button>}
          </div>
          <b>{m.title || "Demo"}</b>
          {m.caption && <span>{m.caption}</span>}
        </div>
      ))}
    </div>
  )
}
