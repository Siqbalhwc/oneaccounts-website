import { ImageResponse } from "next/og"

// Branded 1200x630 share card. Each guide gets its own, carrying its title, so a link
// pasted into WhatsApp, LinkedIn or Facebook shows a proper picture.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get("title") || "Accounting, inventory and property software that stays clear and calm").slice(0, 110)
  const tag = (searchParams.get("tag") || "").slice(0, 30)
  const size = title.length > 80 ? 52 : title.length > 50 ? 62 : 74
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B0A5C", color: "#FAF8F4", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
          <div style={{ width: 14, height: 44, background: "#C9862F", display: "flex" }} />
          OneAccounts
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {tag && <div style={{ fontSize: 28, color: "#C9862F", marginBottom: 18, textTransform: "uppercase", letterSpacing: 3, display: "flex" }}>{tag}</div>}
          <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.12, display: "flex" }}>{title}</div>
        </div>
        <div style={{ fontSize: 26, color: "#C9862F", display: "flex" }}>www.oneaccountsbysiqbal.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}