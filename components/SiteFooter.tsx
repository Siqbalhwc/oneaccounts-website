import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.png"
import { SITE } from "@/lib/content"
import { IcPlay, IcMail, IcPhone } from "@/components/icons"

export default function SiteFooter() {
  return (
    <footer>
      <div className="foot-main"><div className="wrap"><div className="foot-grid">
        <div>
          <div className="foot-brand"><Image src={logo} alt="OneAccounts logo" width={34} height={34} /><div><div className="name">OneAccounts</div><div className="by">by Siqbal</div></div></div>
          <p className="foot-desc">Cloud ERP for growing businesses and NGOs. Accounting, inventory, and payroll that stay clear, current, and calm. Plus property management for landlords and building managers.</p>
        </div>
        <div className="foot-col">
          <div className="foot-col-title">Products</div>
          <Link href="/oneaccounts">OneAccounts ERP</Link>
          <Link href="/property-management">Property Management</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/blog">Guides</Link>
          <a href={`${SITE.app}/login`} target="_blank" rel="noopener">OneAccounts login</a>
          <a href={SITE.properties} target="_blank" rel="noopener">Property login</a>
        </div>
        <div className="foot-col">
          <div className="foot-col-title">Industries</div>
          <Link href="/solutions/trading-business-software">Trading Businesses</Link>
          <Link href="/solutions/ngo-accounting-software">NGOs</Link>
          <Link href="/solutions/service-business-accounting">Service Organisations</Link>
          <Link href="/solutions/construction-accounting-software">Construction</Link>
          <Link href="/solutions/inventory-management-software">Inventory</Link>
        </div>
        <div className="foot-col" id="contact">
          <div className="foot-col-title">Get in Touch</div>
          <a href={SITE.youtube} target="_blank" rel="noopener"><IcPlay />Watch Demo</a>
          <a href={`mailto:${SITE.email}`}><IcMail />{SITE.email}</a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener"><IcPhone />{SITE.whatsappDisplay}</a>
          <Link href="/contact">Contact form</Link>
        </div>
      </div></div></div>
      <div className="foot-bottom-bar">
        <span className="signature-inline">Simple by Design. Professional by Nature.</span><span className="fb-dot">&middot;</span>
        <span className="foot-bottom">&copy; 2026 OneAccounts by Siqbal. All rights reserved.</span><span className="fb-dot">&middot;</span>
        <span className="foot-bottom"><Link href="/privacy">Privacy</Link> &nbsp;&middot;&nbsp; <Link href="/terms">Terms</Link></span>
      </div>
    </footer>
  )
}
