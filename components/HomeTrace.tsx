"use client"
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react"

type Sector = 0 | 1 | 2

// Example entries only. Each one is followed from the report down to the document behind it.
const DATA: { label: string; headline: string; entry: string; steps: [string, string][] }[] = [
  {
    label: "NGO",
    headline: "Rs 184,000",
    entry: "Vendor bill, Water Project 04, borehole drilling.",
    steps: [
      ["Balance sheet", "Accounts payable, Rs 184,000"],
      ["Trial balance", "Payables account, credit 184,000"],
      ["Ledger", "Vendor ledger, running balance in order"],
      ["Journal entry", "Debit project expense, credit payables"],
      ["Original document", "Bill 0142, passed the budget check with Rs 62,000 left"],
    ],
  },
  {
    label: "Property",
    headline: "Rs 45,000",
    entry: "Rent invoice, Plaza A, Shop 12.",
    steps: [
      ["Balance sheet", "Rent receivable, Rs 45,000"],
      ["Trial balance", "Receivables account, debit 45,000"],
      ["Ledger", "Owner ledger, statement in order"],
      ["Journal entry", "Debit receivable, credit rent income"],
      ["Original document", "Rent invoice with its PDF receipt"],
    ],
  },
  {
    label: "Trading",
    headline: "40 units",
    entry: "Sales invoice, Item 118, 112 on hand after the sale.",
    steps: [
      ["Balance sheet", "Inventory reduced, receivable raised"],
      ["Trial balance", "Cost of goods sold at average cost"],
      ["Ledger", "Product ledger, every movement in order"],
      ["Journal entry", "Debit cost of goods sold, credit inventory"],
      ["Original document", "Sales invoice, stock checked before posting"],
    ],
  },
]

type Doc = { t: string; sub: string; rows: [string, string][]; note: string }

// The page each step opens to. Example figures only, matching the entries above.
const DOCS: Doc[][] = [
  [
    { t: "Balance sheet, liabilities", sub: "The report line you selected.", rows: [["Accounts payable", "Rs 184,000"], ["Of which Bill 0142, Water Project 04", "Rs 184,000"]], note: "Every line on this report opens to the trial balance." },
    { t: "Trial balance", sub: "Account totals behind the balance sheet line.", rows: [["Accounts payable", "Credit 184,000"], ["Project expense, Water Project 04", "Debit 184,000"]], note: "Each account total opens to its ledger." },
    { t: "Vendor ledger", sub: "Every entry for this vendor, in date order.", rows: [["Bill 0142, borehole drilling", "Rs 184,000"], ["Running balance", "Rs 184,000"]], note: "Each ledger line opens to its journal entry." },
    { t: "Journal entry", sub: "The double entry posted by the bill.", rows: [["Debit, project expense, borehole drilling", "Rs 184,000"], ["Credit, accounts payable", "Rs 184,000"]], note: "The entry opens to the bill that created it." },
    { t: "Vendor bill 0142", sub: "The original document.", rows: [["Project", "Water Project 04"], ["Activity", "Borehole drilling"], ["Amount", "Rs 184,000"], ["Budget check", "Passed, Rs 62,000 left"]], note: "The bill was checked against the project budget before it posted." },
  ],
  [
    { t: "Balance sheet, assets", sub: "The report line you selected.", rows: [["Rent receivable", "Rs 45,000"], ["Of which Plaza A, Shop 12", "Rs 45,000"]], note: "Every line on this report opens to the trial balance." },
    { t: "Trial balance", sub: "Account totals behind the balance sheet line.", rows: [["Rent receivable", "Debit 45,000"], ["Rent income", "Credit 45,000"]], note: "Each account total opens to its ledger." },
    { t: "Owner ledger, Plaza A", sub: "Statement entries in date order.", rows: [["Rent invoiced, Shop 12", "Rs 45,000"], ["Running balance", "Rs 45,000"]], note: "Each ledger line opens to its journal entry." },
    { t: "Journal entry", sub: "The double entry posted by the rent invoice.", rows: [["Debit, rent receivable", "Rs 45,000"], ["Credit, rent income", "Rs 45,000"]], note: "The entry opens to the rent invoice behind it." },
    { t: "Rent invoice", sub: "The original document.", rows: [["Building", "Plaza A"], ["Unit", "Shop 12"], ["Amount", "Rs 45,000"], ["PDF receipt", "Available"]], note: "The invoice and its PDF receipt are stored with the entry." },
  ],
  [
    { t: "Balance sheet, current assets", sub: "The report lines you selected.", rows: [["Inventory", "Reduced by 40 units"], ["Receivable", "Raised by the invoice"]], note: "Every line on this report opens to the trial balance." },
    { t: "Trial balance", sub: "Account totals behind the balance sheet lines.", rows: [["Cost of goods sold", "Debit, average cost"], ["Inventory", "Credit, average cost"]], note: "Each account total opens to its ledger." },
    { t: "Product ledger, Item 118", sub: "Every stock movement, in order.", rows: [["06 Oct, sales invoice", "-48, on hand 152"], ["09 Oct, sales invoice", "-40, on hand 112"]], note: "Each ledger line opens to its journal entry." },
    { t: "Journal entry", sub: "The double entry posted by the sales invoice.", rows: [["Debit, cost of goods sold", "At average cost"], ["Credit, inventory", "At average cost"]], note: "The entry opens to the sales invoice behind it." },
    { t: "Sales invoice", sub: "The original document.", rows: [["Item", "Item 118"], ["Quantity", "40 units"], ["Stock check", "Passed, 152 available"], ["On hand after sale", "112"]], note: "Stock was checked before the invoice posted." },
  ],
]

// Pages in reading order: 0 NGO steps, 1 NGO document, 2 Property steps, 3 Property document, 4 Trading steps, 5 Trading document.
// Pages 0 to 4 are leaves that turn; page 5 is the last page and never turns.
const GAP = 0.22 // seconds between leaves when several pages turn in a row

export default function HomeTrace() {
  const [p, setP] = useState(0)
  const [prev, setPrev] = useState(0)
  const [i, setI] = useState(0)
  const [nudge, setNudge] = useState(false)
  const sector = Math.floor(p / 2) as Sector
  const focusNext = useRef<"back" | "step" | null>(null)
  const backRefs = useRef<(HTMLButtonElement | null)[]>([])
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([])
  const bookRef = useRef<HTMLDivElement | null>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const swiped = useRef(false)

  // The corner gives one small lift the first time the card is properly in view, so people notice it can be turned.
  useEffect(() => {
    const el = bookRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setNudge(true); io.disconnect() }
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const what = focusNext.current
    focusNext.current = null
    if (what === "back") backRefs.current[p]?.focus({ preventScroll: true })
    if (what === "step") stepRefs.current[i + p * 5]?.focus({ preventScroll: true })
  }, [p, i])

  const go = (to: number) => { setPrev(p); setP(to) }
  const openStep = (k: number) => { focusNext.current = "back"; setI(k); setPrev(p); setP(p + 1) }
  const goBack = () => { focusNext.current = "step"; go(p - 1) }
  const pickSector = (k: number) => go(k * 2)
  const turnNext = () => { setNudge(false); if (p < 5) go(p + 1) }
  const turnPrev = () => { if (p > 0) go(p - 1) }

  // Swipe on touch screens: a clear sideways drag turns the page; up and down still scrolls the site.
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    swiped.current = false
    if (e.pointerType === "mouse") return
    touch.current = { x: e.clientX, y: e.clientY }
  }
  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = touch.current
    touch.current = null
    if (!s) return
    const dx = e.clientX - s.x, dy = e.clientY - s.y
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return
    swiped.current = true
    if (dx < 0) turnNext(); else turnPrev()
  }
  // A swipe that ends on a button must not also count as a tap on it.
  const swallowTap = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (swiped.current) { e.stopPropagation(); e.preventDefault(); swiped.current = false }
  }

  const leafStyle = (k: number): CSSProperties => {
    const flipped = p > k
    const delay = p >= prev ? Math.max(0, k - prev) * GAP : Math.max(0, prev - 1 - k) * GAP
    return { "--d": `${delay.toFixed(2)}s`, "--z": flipped ? 10 + k : 10 - k } as CSSProperties
  }

  const stepsPage = (s: number, idx: number) => {
    const d = DATA[s]
    return (
      <div className="hx-page">
        <div className="hx-pv">
          <div className="big">{d.headline}</div>
          <div className="ln">{d.entry} <span>Example entry</span></div>
        </div>
        <div className="hx-steps">
          {d.steps.map(([name, line], k) => (
            <button type="button" key={name} ref={(el) => { stepRefs.current[k + idx * 5] = el }} onClick={() => openStep(k)}>
              <b>{name}</b><span>{line}</span>
            </button>
          ))}
        </div>
        <p className="hx-hint">Select a step. Every report line opens to the one below it.</p>
      </div>
    )
  }

  const docPage = (s: number, idx: number) => {
    const doc = DOCS[s][i]
    return (
      <div className="hx-page">
        <div className="hx-kick">{DATA[s].label} · opened from {DATA[s].steps[i][0]}</div>
        <div className="hx-dt">{doc.t}</div>
        <div className="hx-ds">{doc.sub}</div>
        <div className="hx-rows">
          {doc.rows.map(([a, b]) => <div key={a}><span>{a}</span><b>{b}</b></div>)}
        </div>
        <div className="hx-dn">{doc.note}</div>
        <div className="hx-foot">
          <button type="button" className="hx-back" ref={(el) => { backRefs.current[idx] = el }} onClick={goBack}>&lsaquo; Back to the steps</button>
          <span>Step {i + 1} of 5</span>
        </div>
      </div>
    )
  }

  const page = (idx: number) => (idx % 2 === 0 ? stepsPage(idx / 2, idx) : docPage((idx - 1) / 2, idx))

  return (
    <div className="hx-trace">
      <div className="hx-trace-h">
        <div className="t">Follow one entry through the books</div>
        <div className="hx-tabs" role="group" aria-label="Business type">
          {DATA.map((d, k) => (
            <button type="button" key={d.label} className={k === sector ? "on" : ""} aria-pressed={k === sector} onClick={() => pickSector(k)}>{d.label}</button>
          ))}
        </div>
      </div>
      <div className="hx-book" ref={bookRef} onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => { touch.current = null }} onClickCapture={swallowTap}>
        {/* last page, always underneath */}
        <div className="hx-last" inert={p !== 5}>{page(5)}</div>
        {[4, 3, 2, 1, 0].map((k) => (
          <div key={k} className={`hx-leaf${p > k ? " flip" : ""}`} style={leafStyle(k)}>
            <div className="hx-front" inert={p !== k}>{page(k)}</div>
            <div className="hx-back-face" aria-hidden="true" />
          </div>
        ))}
        {p < 5 && (
          <button type="button" className={`hx-curl${nudge ? " nudge" : ""}`} onClick={turnNext} onAnimationEnd={() => setNudge(false)} aria-label="Turn to the next page"><i /></button>
        )}
      </div>
      <p className="hx-swipe">Swipe the page sideways to turn it.</p>
    </div>
  )
}
