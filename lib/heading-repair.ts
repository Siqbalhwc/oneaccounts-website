// Conservative suggestions only. The editor must review and explicitly apply them.
// No database calls, slug changes, tax wording changes or automatic publishing.
export type HeadingSuggestion = {
  line: number
  original: string
  text: string
  level: 2 | 3
  reason: string
  // "high" suggestions are ticked by default; "check" ones need a human look first.
  confidence: "high" | "check"
}

export function suggestHeadings(markdown: string, articleTitle = ""): HeadingSuggestion[] {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n")
  const suggestions: HeadingSuggestion[] = []
  const normalizedTitle = articleTitle.trim().toLowerCase()
  let fence: string | null = null
  let inFaq = false
  for (let i = 0; i < lines.length; i++) {
    const original = lines[i]
    const t = original.trim()
    const marker = t.match(/^(`{3,}|~{3,})/)
    if (marker) {
      if (!fence) fence = marker[1][0]
      else if (marker[1][0] === fence) fence = null
      continue
    }
    if (fence || !t || /^\s{4}|^\t/.test(original)) continue
    const existing = t.match(/^(#{1,6})\s+(.+)$/)
    if (existing) {
      if (existing[1].length <= 2) inFaq = /^(?:frequently asked questions|faqs?)(?:\b|$)/i.test(existing[2])
      continue
    }
    // Never convert list blocks, HTML, links, images, amounts or formulae.
    if (/^[-*+]\s|^[>|<]|https?:\/\/|www\.|@|\t|→|=|÷|×|\[.+?\]\(|\bRs\.?\s*\d|\d{1,3}(?:,\d{3})+|\d\s?%/.test(t)) continue
    const previous = (lines[i - 1] || "").trim()
    const next = (lines[i + 1] || "").trim()
    const plain = t.replace(/^\*\*(.+)\*\*$/, "$1").replace(/^__(.+)__$/, "$1")
    const text = plain.replace(/^\d+[.)]\s+/, "").trim()
    if (text.toLowerCase() === normalizedTitle || text.length > 110 || text.length < 5) continue
    const isFaq = /^(?:frequently asked questions|faqs?)(?:\b|$)/i.test(text)
    const isCommon = /^(?:introduction|conclusion|final thoughts|recommended solution|how OneAccounts addresses this problem)$/i.test(text)
    const isolated = !previous && !next
    // Most headings are single-line blocks. Common labels may start a paragraph.
    if (!isolated && !(isCommon && !previous)) continue
    const words = text.split(/\s+/)
    const numbered = /^\d+[.)]\s+/.test(t) && isolated && words.length >= 2 && !/[.;!]$/.test(text)
    const bold = /^(?:\*\*.+\*\*|__.+__)$/.test(t) && isolated
    const titleLike = words.length >= 4 && words.length <= 16 && !/[.:;,!]$/.test(text)
      && /^[A-Z]/.test(text)
      && words.filter(w => /^[A-Z]/.test(w)).length / words.length >= 0.45
    const questionInFaq = inFaq && isolated && /\?$/.test(text)
    // Sentence-case question followed by a real answer paragraph (not a list of questions).
    const answered = isolated && /\?$/.test(text) && words.length >= 4 && next === "" && nextText(lines, i).length >= 80 && !/[?:]$/.test(prevText(lines, i))
    if (!(isFaq || isCommon || numbered || bold || titleLike || questionInFaq || answered)) continue
    const level: 2 | 3 = questionInFaq || (answered && inFaq) || /^(?:recommended solution|how OneAccounts addresses this problem)$/i.test(text) ? 3 : 2
    const titleCase = words.filter(w => /^[A-Z]/.test(w)).length / words.length >= 0.6
    const high = isFaq || isCommon || bold || questionInFaq || (numbered && titleCase) || (answered && titleCase) || (titleLike && titleCase)
    suggestions.push({ line: i, original, text, level, confidence: high ? "high" : "check",
      reason: isFaq ? "FAQ section label" : questionInFaq ? "Question in an FAQ section" : numbered ? "Standalone numbered title" : bold ? "Standalone bold title" : isCommon ? "Section label" : answered ? "Question followed by an answer" : "Possible section title; check carefully" })
    if (level === 2) inFaq = isFaq
  }
  return suggestions
}

const nextText = (lines: string[], i: number) => { for (let j = i + 1; j < lines.length; j++) if (lines[j].trim()) return lines[j].trim(); return "" }
const prevText = (lines: string[], i: number) => { for (let j = i - 1; j >= 0; j--) if (lines[j].trim()) return lines[j].trim(); return "" }

export function applyHeadingSuggestions(markdown: string, choices: HeadingSuggestion[]): string {
  if (!choices.length) return markdown
  const eol = markdown.includes("\r\n") ? "\r\n" : "\n"
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n")
  for (const choice of choices) {
    // Ignore stale suggestions after the source was edited.
    if (lines[choice.line] !== choice.original) continue
    lines[choice.line] = `${"#".repeat(choice.level)} ${choice.text}`
    // Keep an ATX heading separated from the following paragraph.
    if (lines[choice.line + 1]?.trim()) lines[choice.line] += eol
  }
  return lines.join(eol)
}
