"use client"
import { useState } from "react"

type Sector = "ngo" | "property" | "trading"

// Example entries only. Each one is followed from the report down to the document behind it.
const DATA: Record<Sector, { label: string; headline: string; entry: string; steps: [string, string][] }> = {
  ngo: {
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
  property: {
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
  trading: {
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
}

export default function HomeTrace() {
  const [s, setS] = useState<Sector>("ngo")
  const [i, setI] = useState(0)
  const d = DATA[s]
  return (
    <div className="hx-trace">
      <div className="hx-trace-h">
        <div className="t">Follow one entry through the books</div>
        <div className="hx-tabs" role="group" aria-label="Business type">
          {(Object.keys(DATA) as Sector[]).map((k) => (
            <button type="button" key={k} className={k === s ? "on" : ""} aria-pressed={k === s} onClick={() => { setS(k); setI(0) }}>{DATA[k].label}</button>
          ))}
        </div>
      </div>
      <div className="hx-trace-v">
        <div className="big">{d.headline}</div>
        <div className="ln">{d.entry} <span>Example entry</span></div>
      </div>
      <div className="hx-steps">
        {d.steps.map(([name, line], k) => (
          <button type="button" key={name} className={k === i ? "on" : ""} aria-pressed={k === i} onClick={() => setI(k)}>
            <b>{name}</b><span>{line}</span>
          </button>
        ))}
      </div>
      <p className="hx-hint">Select a step. Every report line opens to the one below it.</p>
    </div>
  )
}
