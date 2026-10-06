import Image from "next/image"
import Link from "next/link"
import dash from "@/assets/ngo-dashboard.png"
import { SITE, HOME_FAQ } from "@/lib/content"
import { JsonLd, softwareLd, faqLd } from "@/lib/seo"
import { Arc, IcReceipt, IcBox, IcPeople, IcClock, IcCoin, IcMobile } from "@/components/icons"
import { IndustriesSection, TypesSection, AppsSection, PropertySection, HowSection, PricingBox, FaqSection, CtaBand } from "@/components/Sections"
import LatestPosts from "@/components/LatestPosts"

export const revalidate = 300

export default function Home() {
  return (
    <>
      <JsonLd data={[softwareLd(), faqLd(HOME_FAQ)]} />
      <section className="hero">
        <div className="sunrise-glow" />
        <div className="wrap">
          <div className="eyebrow">Peace of mind, built in</div>
          <h1>Simple by Design. Professional by Nature.</h1>
          <p className="sub">OneAccounts keeps your accounting, inventory, and payroll clear, current, and calm, so you always know where things stand.</p>
          <div className="hero-ctas">
            <a href={SITE.youtube} target="_blank" rel="noopener" className="btn-primary"><span className="play">&#9654;</span> Watch 3-Minute Demo</a>
            <a href={`${SITE.app}/login`} target="_blank" rel="noopener" className="btn-secondary">Start Free Trial</a>
          </div>
          <div className="hero-meta">No credit card required &middot; Free trial for new companies</div>
          <div className="hero-meta" style={{ marginTop: 10 }}>Already a customer? <a href={`${SITE.app}/login`} target="_blank" rel="noopener" style={{ color: "var(--navy)", fontWeight: 600 }}>Open OneAccounts ERP</a> &middot; <a href={SITE.properties} target="_blank" rel="noopener" style={{ color: "var(--navy)", fontWeight: 600 }}>Open Property Management</a></div>
          <Arc />
        </div>
      </section>

      <section className="screenshot-band"><div className="wrap">
        <div className="browser-frame">
          <div className="browser-chrome"><span /><span /><span /></div>
          <div className="browser-body" style={{ display: "block", aspectRatio: "auto" }}>
            <Image src={dash} alt="OneAccounts NGO dashboard with donor balances and budget tracking" priority sizes="(max-width: 1120px) 100vw, 1120px" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>
      </div></section>

      <section className="pillars" id="features"><div className="wrap">
        <div className="pillars-head"><h2>Less time on the books. More time on your business.</h2><p>Here is what you gain the day you start.</p></div>
        <div className="pillars-grid">
          <div className="pillar"><div className="mark"><IcClock /></div><h3>Get your time back</h3><p>Post an invoice, bill or payment in seconds. Reports update the moment you save, so month-end stops being a project.</p></div>
          <div className="pillar"><div className="mark"><IcCoin /></div><h3>Run it yourself, save the cost</h3><p>It is easy enough for anyone on your team. No full-time accountant for daily bookkeeping, and no chasing for follow-ups.</p></div>
          <div className="pillar"><div className="mark"><IcMobile /></div><h3>Your business in your pocket</h3><p>A smooth mobile experience lets you work from your phone, anywhere in the world, at any time. Peace of mind wherever you are.</p></div>
          <div className="pillar"><div className="mark"><IcReceipt /></div><h3>Know exactly where you stand</h3><p>Accounting that answers the question before you have to ask it.</p></div>
          <div className="pillar"><div className="mark"><IcBox /></div><h3>Never wonder what&apos;s in stock</h3><p>Inventory you can trust, down to the last unit, in real time.</p></div>
          <div className="pillar"><div className="mark"><IcPeople /></div><h3>Pay everyone accurately, on time</h3><p>Payroll and banking that reconcile themselves quietly in the background.</p></div>
        </div>
      </div></section>

      <IndustriesSection />
      <TypesSection />
      <AppsSection />
      <PropertySection />

      <section className="sols"><div className="wrap">
        <div className="ind-head"><h2>Software for the problem you are solving</h2><p>Find the page that matches what you are looking for.</p></div>
        <div className="sol-grid">
          <Link href="/solutions/accounting-software-pakistan">Accounting software for Pakistan</Link>
          <Link href="/solutions/ngo-accounting-software">NGO accounting software</Link>
          <Link href="/solutions/inventory-management-software">Inventory management for traders</Link>
          <Link href="/solutions/construction-accounting-software">Construction company accounting</Link>
          <Link href="/property-management">Property management software in Pakistan</Link>
          <Link href="/solutions/rental-property-accounting">Rental property accounting</Link>
        </div>
      </div></section>

      <HowSection />
      <PricingBox />
      <LatestPosts />
      <FaqSection />
      <CtaBand />
    </>
  )
}
