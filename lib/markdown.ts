import { Marked } from "marked"
import { headingId, stripMd } from "@/lib/postseo"
import { youtubeId, ytThumb } from "@/lib/media"

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

// Tables pasted from Word, Google Docs or Excel arrive as lines whose cells are separated by tab characters.
// Markdown does not know those, so they showed up as plain lines. Turn a block of two or more consecutive
// tab-separated lines with the same number of cells into a Markdown table. Anything else is left exactly as written
// (code blocks, single lines, lines with different cell counts).
export function tabsToTables(md: string): string {
  const lines = md.replace(/\r\n?/g, "\n").split("\n")
  const out: string[] = []
  let fence = false, i = 0
  const cells = (l: string) => l.split("\t").map((c) => c.trim())
  // The first cell must have text, so lines that merely start with an indent (a tab) are never treated as a table.
  const isRow = (l: string) => l.includes("\t") && cells(l).length >= 2 && cells(l)[0] !== ""
  while (i < lines.length) {
    const l = lines[i]
    if (/^\s*(```|~~~)/.test(l)) { fence = !fence; out.push(l); i++; continue }
    if (!fence && isRow(l)) {
      const width = cells(l).length
      let j = i
      while (j < lines.length && isRow(lines[j]) && cells(lines[j]).length === width) j++
      if (j - i >= 2) {
        const row = (r: string) => "| " + cells(r).map((c) => c.replace(/\|/g, "\\|")).join(" | ") + " |"
        if (out.length && out[out.length - 1].trim() !== "") out.push("")
        out.push(row(lines[i]), "|" + " --- |".repeat(width))
        for (let k = i + 1; k < j; k++) out.push(row(lines[k]))
        out.push("")
        i = j; continue
      }
    }
    out.push(l); i++
  }
  return out.join("\n")
}

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
  // Each table sits in a scrolling box, so a wide table slides sideways on a phone instead of breaking the page.
  const html = m.parse(tabsToTables(md), { async: false }) as string
  return html.replace(/<table>/g, '<div class="tbl"><table>').replace(/<\/table>/g, "</table></div>")
}