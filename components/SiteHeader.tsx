"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import logo from "@/assets/logo.png"
import { SITE } from "@/lib/content"

const LINKS: [string, string][] = [["NGO accounting", "/solutions/ngo-accounting-software"], ["Property management", "/property-management"], ["Trading ERP", "/solutions/trading-business-software"], ["Pricing", "/pricing"], ["Guides", "/blog"]]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <nav aria-label="Main">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="OneAccounts home">
          <Image src={logo} alt="OneAccounts logo" width={38} height={38} priority />
          <div className="bt"><div className="name">OneAccounts</div><div className="by">by Siqbal</div></div>
        </Link>
        <div className="navlinks">{LINKS.map(([t, h]) => <Link key={t} href={h}>{t}</Link>)}</div>
        <div className="nav-cta">
          <a className="btn-login alt" href={SITE.propertiesLogin} target="_blank" rel="noopener">Property login</a>
          <a className="btn-login" href={`${SITE.app}/login`} target="_blank" rel="noopener">ERP login</a>
          <a className="hx-navcta" href={`${SITE.app}/login`} target="_blank" rel="noopener">Start free trial</a>
          <button className="hamburger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
        </div>
      </div>
      <div className={`mobile-menu${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        {LINKS.map(([t, h]) => <Link key={t} href={h}>{t}</Link>)}
        <Link href="/contact">Contact</Link>
        <a href={`${SITE.app}/login`} target="_blank" rel="noopener">Start free trial &rarr;</a>
        <a href={`${SITE.app}/login`} target="_blank" rel="noopener">ERP login &rarr;</a>
        <a href={SITE.propertiesLogin} target="_blank" rel="noopener">Property Management login &rarr;</a>
      </div>
    </nav>
  )
}
