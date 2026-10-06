import { Marked } from "marked"
import { headingId, stripMd } from "@/lib/postseo"

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
      image({ href, title, text }: any) {
        const alt = stripMd(text || "") || altFallback
        return `<img src="${esc(href)}" alt="${esc(alt)}"${title ? ` title="${esc(title)}"` : ""} loading="lazy" decoding="async">`
      },
    },
  })
  return m.parse(md, { async: false }) as string
}