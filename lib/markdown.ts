import { Marked } from "marked"
import { headingId, stripMd } from "@/lib/postseo"
import { youtubeId, ytThumb } from "@/lib/media"

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

// Headings get anchor ids (for the "In this guide" contents list) and every image gets
// alt text (its own, or the guide title) plus lazy loading.
export function renderMd(md: string, altFallback = ""): string {
  const m = new Marked({
    gfm: true,
    renderer: {
      heading(this: any, { tokens, depth, text }: any) {
        return `<h${depth} id="${headingId(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`
      },
      // A line that holds only a YouTube link becomes a light thumbnail that opens the video (no player is loaded).
      paragraph(this: any, { tokens, text }: any) {
        const t = (text || "").trim(), id = /^https?:\/\/\S+$/.test(t) ? youtubeId(t) : null
        if (id) return `<a class="yt-thumb" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener"><img src="${ytThumb(id)}" alt="Watch the video on YouTube" loading="lazy" decoding="async"><span class="yt-play">&#9654;</span></a>\n`
        return `<p>${this.parser.parseInline(tokens)}</p>\n`
      },
      image({ href, title, text }: any) {
        const alt = stripMd(text || "") || altFallback
        return `<img src="${esc(href)}" alt="${esc(alt)}"${title ? ` title="${esc(title)}"` : ""} loading="lazy" decoding="async">`
      },
    },
  })
  return m.parse(md, { async: false }) as string
}