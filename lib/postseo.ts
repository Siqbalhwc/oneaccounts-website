// SEO helpers for guides. Everything on the Google listing is generated from what the
// admin has already written. Pure functions only, so the editor (browser) and the
// public pages (server) always agree.
import { SITE } from "@/lib/content"

const clean = (s?: string | null) => (s ?? "").replace(/\s+/g, " ").trim()

export function slugify(s: string) {
  return s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90)
}

// Cuts at a word boundary so a Google result never ends mid-word.
export function truncateAtWord(text: string, max: number) {
  const t = clean(text)
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  const sp = cut.lastIndexOf(" ")
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[.,;:\s-]+$/, "") + "\u2026"
}

// Markdown -> plain text (for summaries, FAQ answers, word counts).
export function stripMd(md: string) {
  return md
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/(\*|_)(.+?)\1/g, "$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// First real paragraph (skips headings, lists, tables, images, quotes).
export function firstParagraph(md: string) {
  const blocks = md.replace(/\r\n?/g, "\n").split(/\n{2,}/)
  for (const b of blocks) {
    const t = b.trim()
    if (!t || /^(#|[-*+]\s|\d+\.\s|>|\||!\[|---)/.test(t)) continue
    return stripMd(t)
  }
  return ""
}

export const headingId = (text: string) => stripMd(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

const FAQ_HEAD = /faq|frequently asked/i

export function extractHeadings(md: string) {
  const out: { text: string; id: string }[] = []
  for (const line of md.replace(/\r\n?/g, "\n").split("\n")) {
    const m = line.trim().match(/^#{1,2}\s+(.+)$/)
    if (m && !FAQ_HEAD.test(m[1])) out.push({ text: stripMd(m[1]), id: headingId(m[1]) })
  }
  return out
}

// A section headed "Frequently asked questions" with one smaller heading per question
// becomes FAQ rich results on Google.
export function extractFaqs(md: string) {
  const lines = md.replace(/\r\n?/g, "\n").split("\n")
  const faqs: { q: string; a: string }[] = []
  let inFaq = false, q = "", buf: string[] = []
  const flush = () => { if (q && buf.join(" ").trim()) faqs.push({ q: stripMd(q), a: stripMd(buf.join("\n")) }); q = ""; buf = [] }
  for (const raw of lines) {
    const line = raw.trim()
    const h = line.match(/^(#{1,4})\s+(.+)$/)
    if (h) {
      const level = h[1].length
      if (level <= 2) { flush(); inFaq = FAQ_HEAD.test(h[2]); continue }
      if (inFaq) { flush(); q = h[2]; continue }
    }
    if (inFaq && q) buf.push(raw)
  }
  flush()
  return faqs
}

export const wordCount = (md: string) => { const t = stripMd(md); return t ? t.split(" ").length : 0 }
export const readMinutes = (md: string) => Math.max(1, Math.round(wordCount(md) / 200))

// ---- Automatic Google listing ------------------------------------------------
export const BRAND = SITE.name // "OneAccounts"

export function genSeoTitle(title: string) {
  const t = clean(title)
  if (!t) return ""
  const withBrand = `${t} | ${BRAND}`
  if (withBrand.length <= 60) return withBrand
  if (t.length <= 60) return t
  // Too long even without the brand: cut cleanly at a word (no "..." inside a title tag).
  const cut = t.slice(0, 60), sp = cut.lastIndexOf(" ")
  const base = (sp > 36 ? cut.slice(0, sp) : cut).replace(/[.,;:\s-]+$/, "")
  // never end on a dangling filler word ("... payments in")
  return base.replace(/(\s+(in|on|for|of|and|to|the|a|an|with|at|by|from|your|or))+$/i, "")
}
export function genSeoDescription(summary: string) {
  return truncateAtWord(summary, 155)
}
export function autoSummary(md: string) {
  return truncateAtWord(firstParagraph(md), 160)
}

// Branded share card (served by app/og/route.tsx). WhatsApp, Facebook, LinkedIn and X read it.
export function ogImageUrl(opts?: { title?: string; tag?: string | null }) {
  const p = new URLSearchParams()
  if (opts?.title) p.set("title", opts.title)
  if (opts?.tag) p.set("tag", opts.tag)
  const qs = p.toString()
  return `${SITE.url}/og${qs ? `?${qs}` : ""}`
}

// ---- Live checklist shown in the editor ---------------------------------------
export type Check = { ok: boolean; label: string; hint: string }
export function seoChecks(i: { title: string; seoTitle: string; seoDescription: string; content: string; slug: string }): Check[] {
  const words = wordCount(i.content)
  const h2 = i.content.split("\n").filter((l) => /^##\s+/.test(l.trim())).length
  const internal = (i.content.match(/\]\(\s*(\/[^)\s]*|https?:\/\/(www\.)?oneaccountsbysiqbal\.com[^)\s]*)\s*\)/g) || []).length
  return [
    { ok: i.seoTitle.length >= 30 && i.seoTitle.length <= 60, label: "Search title is 30 to 60 characters", hint: `Now ${i.seoTitle.length}. Longer titles get cut off on Google.` },
    { ok: i.seoDescription.length >= 110 && i.seoDescription.length <= 160, label: "Search description is 110 to 160 characters", hint: `Now ${i.seoDescription.length}. Fill the space, but stay under 160.` },
    { ok: words >= 600, label: "Article has 600+ words", hint: `Now ${words}. Guides that fully answer a question rank better.` },
    { ok: h2 >= 3, label: "Has 3+ section headings (##)", hint: `Now ${h2}. Headings help readers and Google scan the page.` },
    { ok: extractFaqs(i.content).length >= 2, label: "Has a 'Frequently asked questions' section (2+ questions)", hint: "Add ## Frequently asked questions, then a ### heading per question. Google can show these directly." },
    { ok: internal >= 1, label: "Links to another page of this site", hint: "Link to /oneaccounts, /property-management or another guide, e.g. [see OneAccounts](/oneaccounts)." },
    { ok: i.slug.length > 0 && i.slug.length <= 60, label: "Web address is short (60 characters or less)", hint: "Short, descriptive addresses are easier to share." },
  ]
}