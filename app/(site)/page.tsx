import Image from "next/image"
import dash from "@/assets/ngo-dashboard.png"
import { SITE, HOME_FAQ, PRICING_PUBLIC } from "@/lib/content"
import { JsonLd, softwareLd, faqLd } from "@/lib/seo"
import { PricingBox, CtaBand } from "@/components/Sections"
import { SectorBlock, ExampleCard, AlsoBuiltFor, HomePricing, GuidesIndex, HomeFaq } from "@/components/HomeSections"
import HomeTrace from "@/components/HomeTrace"
import DemoGrid from "@/components/DemoGrid"
import Testimonials from "@/components/Testimonials"
import ScreenshotGallery from "@/components/ScreenshotGallery"
import { getMedia } from "@/lib/media"
import { getPosts } from "@/lib/posts"

export const revalidate = 300

// The six questions shown on the page (and in its FAQ data): trial, cost, accountant, import, security, property.
const FAQ_SHOWN = [0, 2, 3, 5, 9, 8]

export default async function Home() {
  const [vids, ngo, anyShots, prop, trade, posts] = await Promise.all([
    getMedia("video"), getMedia("screenshot", "NGO"), getMedia("screenshot"), getMedia("screenshot", "Property"), getMedia("screenshot", "Trading"), getPosts(),
  ])
  const ngoShots = ngo.length ? ngo : anyShots // same gallery as before until NGO pictures are tagged in /admin
  const hasDemo = vids.length > 0
  const faq = FAQ_SHOWN.map((i) => HOME_FAQ[i]).filter(Boolean)
  return (
    <div className="hx">
      <JsonLd data={[softwareLd(), faqLd(faq)]} />

      <section className="hx-hero"><div className="wrap hx-split">
        <div className="hx-copy">
          <h1>Accounting software in Pakistan for NGOs, property managers and trading companies</h1>
          <p className="lead">One cloud ledger where every number opens to the document behind it. Priced in rupees, with withholding tax handled inside the entry.</p>
          <div className="hx-acts">
            <a className="hx-btn" href={`${SITE.app}/login`} target="_blank" rel="noopener">Start free trial</a>
            <a className="hx-link" href={hasDemo ? "#demos" : SITE.youtube} {...(hasDemo ? {} : { target: "_blank", rel: "noopener" })}>{hasDemo ? "Watch the demos" : "Watch the demo"}</a>
          </div>
          <p className="hx-small">10 days free. No credit card. We help you bring over your opening balances.</p>
          <p className="hx-small">Donors and budgets for NGOs. Sites and installment plans for construction. Tenants and leases for property. Inventory for traders.</p>
        </div>
        <div className="hx-fig"><HomeTrace /></div>
      </div></section>

      <SectorBlock id="ngo" title="NGO accounting software with donor and project budgets"
        intro="Donors fund a project once, for its whole life. Set the budget by activity, location and account, and every bill is checked against it before it posts."
        bullets={["Month-wise budgets that follow the project period", "Approval workflow with a full change history", "Budget vs Actual by activity and location, on screen and in PDF"]}
        href="/solutions/ngo-accounting-software" cta="See NGO accounting">
        {ngoShots.length > 0 ? <ScreenshotGallery items={ngoShots} /> : (
          <>
            <div className="browser-frame">
              <div className="browser-chrome"><span /><span /><span /></div>
              <Image src={dash} alt="OneAccounts NGO dashboard with donor balances and budget tracking" sizes="(max-width: 860px) 100vw, 540px" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <p className="hx-cap"><b>NGO dashboard.</b> Donor balances and budget use at a glance.</p>
          </>
        )}
      </SectorBlock>

      <SectorBlock id="property" flip title="Property management software with real accounting underneath"
        intro="Buildings, rooms, owners, tenants and leases in one place. Rent invoices, security deposits and owner statements post straight into the books."
        bullets={["Batch rent invoices with PDF receipts", "Security deposits received, held and settled with deductions", "Owner ledger with settlement and payout"]}
        href="/property-management" cta="See property management">
        {prop.length > 0 ? <ScreenshotGallery items={prop} /> : (
          <ExampleCard title="Owner statement, Plaza A, October"
            rows={[["Rent invoiced", "Rs 540,000"], ["Rent received", "Rs 495,000"], ["Building expenses", "Rs 86,000"], ["Net to owner", "Rs 409,000"]]}
            note="Property Management runs as its own app, with the same accounting standard underneath." />
        )}
      </SectorBlock>

      <SectorBlock id="trading" title="Trading ERP with a stock check on every sale"
        intro="Trading is accounting plus stock. OneAccounts checks available stock before you sell and values it on average cost, so the shelf and the books agree."
        bullets={["Product search on invoices and bills", "Cash sales, with returns that reverse stock and accounts together", "Product ledger showing every movement in order"]}
        href="/solutions/trading-business-software" cta="See trading ERP">
        {trade.length > 0 ? <ScreenshotGallery items={trade} /> : (
          <ExampleCard title="Product ledger, Item 118" head={["Date", "Document", "Qty", "On hand"]}
            rows={[["02 Oct", "Purchase bill", "+200", "200"], ["06 Oct", "Sales invoice", "-48", "152"], ["09 Oct", "Sales invoice", "-40", "112"]]}
            note="A sale of 130 units is refused when only 112 are available." />
        )}
      </SectorBlock>

      {hasDemo && (
        <section className="hx-sec" id="demos"><div className="wrap">
          <div className="hx-head row"><div><h2>Watch the demos</h2><p>Short videos of everyday tasks in OneAccounts.</p></div><a className="hx-link" href={SITE.youtube} target="_blank" rel="noopener">All demos on YouTube</a></div>
          <DemoGrid items={vids} />
        </div></section>
      )}

      <AlsoBuiltFor />
      {PRICING_PUBLIC ? <HomePricing /> : <PricingBox />}
      <Testimonials />
      <GuidesIndex posts={posts} />
      <HomeFaq items={faq} />
      <CtaBand title="Start with your own books" />
    </div>
  )
}
