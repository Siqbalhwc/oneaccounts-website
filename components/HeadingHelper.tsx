"use client"
import { useMemo, useState } from "react"
import { applyHeadingSuggestions, suggestHeadings, type HeadingSuggestion } from "@/lib/heading-repair"

// Admin only. Suggests ## and ### headings for guides that were pasted as plain text.
// Nothing changes until the editor ticks the lines and presses Apply, and the guide is
// still not saved until the editor presses Save.
export default function HeadingHelper({ markdown, title, onApply }: { markdown: string; title: string; onApply: (next: string) => void }) {
  const suggestions = useMemo(() => suggestHeadings(markdown, title), [markdown, title])
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<Record<number, boolean>>({})
  const [levels, setLevels] = useState<Record<number, 2 | 3>>({})
  const checked = (s: HeadingSuggestion) => picked[s.line] ?? s.confidence === "high"
  const levelOf = (s: HeadingSuggestion) => levels[s.line] ?? s.level
  const chosen = suggestions.filter(checked).map((s) => ({ ...s, level: levelOf(s) }))
  return (
    <div style={{ border: "1px solid var(--hairline)", borderRadius: 9, background: "#fff", padding: "10px 14px" }}>
      <button type="button" className="link-btn" style={{ color: "var(--navy)" }} aria-expanded={open} onClick={() => setOpen(!open)}>
        Heading helper: {suggestions.length ? `${suggestions.length} possible heading${suggestions.length === 1 ? "" : "s"} found` : "no plain-text headings found"}
      </button>
      {open && (
        <div style={{ marginTop: 10, fontSize: 13.5 }}>
          <p style={{ color: "var(--ink-soft)", margin: "0 0 10px" }}>Guides pasted from Word or a chat tool often lose their headings, so Google and readers see one long block. Tick the lines that really are headings, choose the level, then press Apply. Review the result with Preview, then press Save.</p>
          {suggestions.length === 0 && <p>Nothing to suggest for this guide.</p>}
          <ul style={{ listStyle: "none", margin: 0, padding: 0, maxHeight: 320, overflow: "auto" }}>
            {suggestions.map((s) => (
              <li key={s.line} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0", borderTop: "1px solid var(--hairline)" }}>
                <input type="checkbox" checked={checked(s)} onChange={(e) => setPicked({ ...picked, [s.line]: e.target.checked })} aria-label={`Use "${s.text}" as a heading`} />
                <select value={levelOf(s)} onChange={(e) => setLevels({ ...levels, [s.line]: Number(e.target.value) as 2 | 3 })} aria-label="Heading level" style={{ width: 70 }}>
                  <option value={2}>H2</option><option value={3}>H3</option>
                </select>
                <span style={{ flex: 1, minWidth: 0 }}>{s.text}<small style={{ display: "block", color: "var(--ink-soft)" }}>Line {s.line + 1}: {s.reason}{s.confidence === "check" ? " (unticked by default)" : ""}</small></span>
              </li>
            ))}
          </ul>
          {suggestions.length > 0 && (
            <button type="button" className="btn-primary" style={{ border: 0, cursor: "pointer", marginTop: 10, padding: "9px 18px" }} disabled={!chosen.length}
              onClick={() => { onApply(applyHeadingSuggestions(markdown, chosen)); setPicked({}); setLevels({}) }}>
              Apply {chosen.length} heading{chosen.length === 1 ? "" : "s"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
