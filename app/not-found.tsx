import Link from "next/link"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import { PageHero } from "@/components/Sections"
export default function NotFound() {
  return (<><SiteHeader /><main><PageHero eyebrow="404" title="That page is not here" sub="It may have moved. Try the home page or the guides."><Link className="btn-primary" href="/">Go to home</Link><Link className="btn-secondary" href="/blog">Read the guides</Link></PageHero></main><SiteFooter /></>)
}
