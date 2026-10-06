"use client"
// "How this appears on Google" editor for guides. Both lines fill in automatically from
// what has been written. Edit one and it is kept as written until "Reset to auto".
import type { Check } from "@/lib/postseo"

type Props = {
  urlPreview: string; title: string; description: string
  titleIsAuto: boolean; descriptionIsAuto: boolean
  onTitleChange: (v: string) => void; onDescriptionChange: (v: string) => void
  onResetTitle: () => void; onResetDescription: () => void
  checks: Check[]
}

const small: React.CSSProperties = { fontSize: 12, color: "var(--ink-soft)" }
const reset: React.CSSProperties = { ...small, background: "none", border: 0, padding: 0, textDecoration: "underline", cursor: "pointer", justifySelf: "start" }

export default function SeoFields(p: Props) {
  const passed = p.checks.filter((c) => c.ok).length
  return (
    <div style={{ display: "grid", gap: 14, border: "1px solid rgba(11,10,92,.2)", borderRadius: 9, padding: 18, background: "#fff" }}>
      <div>
        <b style={{ color: "var(--navy)", fontSize: 14 }}>Google search listing (SEO)</b>
        <div style={small}>Filled in automatically from your title and article. Change either line and your wording is kept until you press &quot;Reset to auto&quot;.</div>
      </div>

      <div style={{ border: "1px solid var(--hairline)", borderRadius: 9, padding: 14, background: "#fff" }}>
        <div style={{ fontSize: 12, color: "#3F5548", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.urlPreview}</div>
        <div style={{ fontSize: 19, lineHeight: 1.3, color: "#1a0dab", marginTop: 3 }}>{p.title || "Page title appears here"}</div>
        <div style={{ fontSize: 14, color: "#4d5156", marginTop: 3 }}>{p.description || "Page description appears here."}</div>
      </div>

      <label>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Search title <span style={{ ...small, color: p.titleIsAuto ? "#3F5548" : "var(--gold)" }}>{p.titleIsAuto ? "(auto)" : "(edited by you)"}</span></span>
          <span style={{ ...small, color: p.title.length > 60 ? "#9B1C1C" : undefined }}>{p.title.length}/60</span>
        </span>
        <input value={p.title} onChange={(e) => p.onTitleChange(e.target.value)} />
        {!p.titleIsAuto && <button type="button" style={reset} onClick={p.onResetTitle}>Reset to auto</button>}
      </label>

      <label>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Search description <span style={{ ...small, color: p.descriptionIsAuto ? "#3F5548" : "var(--gold)" }}>{p.descriptionIsAuto ? "(auto)" : "(edited by you)"}</span></span>
          <span style={{ ...small, color: p.description.length > 160 ? "#9B1C1C" : undefined }}>{p.description.length}/155</span>
        </span>
        <textarea rows={3} style={{ minHeight: 70 }} value={p.description} onChange={(e) => p.onDescriptionChange(e.target.value)} />
        {!p.descriptionIsAuto && <button type="button" style={reset} onClick={p.onResetDescription}>Reset to auto</button>}
      </label>

      <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: 12 }}>
        <b style={{ color: "var(--navy)", fontSize: 13 }}>SEO checklist: {passed} of {p.checks.length} passed</b>
        <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", display: "grid", gap: 6 }}>
          {p.checks.map((c) => (
            <li key={c.label} style={{ fontSize: 13, color: c.ok ? "#3F5548" : "var(--ink)" }}>
              <span style={{ fontWeight: 700, color: c.ok ? "#3F5548" : "var(--gold)" }}>{c.ok ? "\u2713" : "\u2022"}</span> {c.label}
              {!c.ok && <div style={{ ...small, marginLeft: 16 }}>{c.hint}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}