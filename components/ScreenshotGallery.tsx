"use client"
import Image from "next/image"
import { useRef, useState } from "react"
import { isOptimisable, type Media } from "@/lib/media"

// Every slide uses the same frame (16:10, cropped from the top) so all screenshots look alike.
export default function ScreenshotGallery({ items }: { items: Pick<Media, "id" | "url" | "title" | "caption" | "product">[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const go = (n: number) => { const el = ref.current; if (!el) return; const k = (n + items.length) % items.length; el.scrollTo({ left: k * el.clientWidth, behavior: "smooth" }); setI(k) }
  return (
    <div className="browser-frame">
      <div className="browser-chrome"><span /><span /><span /></div>
      <div className="gal-track" ref={ref} onScroll={(e) => { const el = e.currentTarget; setI(Math.round(el.scrollLeft / el.clientWidth)) }}>
        {items.map((m, k) => (
          <figure className="gal-slide" key={m.id}>
            <div className="gal-img">
              {isOptimisable(m.url)
                ? <Image src={m.url} alt={m.title || "OneAccounts screenshot"} fill sizes="(max-width: 1120px) 100vw, 1120px" priority={k === 0} loading={k === 0 ? undefined : "lazy"} />
                // eslint-disable-next-line @next/next/no-img-element
                : <img src={m.url} alt={m.title || "OneAccounts screenshot"} loading={k === 0 ? "eager" : "lazy"} decoding="async" />}
            </div>
            {(m.title || m.caption) && <figcaption><b>{m.product !== "General" ? `${m.product}: ` : ""}{m.title}</b>{m.caption && <span> {m.caption}</span>}</figcaption>}
          </figure>
        ))}
      </div>
      {items.length > 1 && (
        <div className="gal-nav">
          <button type="button" aria-label="Previous screenshot" onClick={() => go(i - 1)}>&#8249;</button>
          <span>{items.map((m, k) => <i key={m.id} className={k === i ? "on" : ""} />)}</span>
          <button type="button" aria-label="Next screenshot" onClick={() => go(i + 1)}>&#8250;</button>
        </div>
      )}
    </div>
  )
}
