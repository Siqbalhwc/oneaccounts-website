import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import AnchorScroll from "@/components/AnchorScroll"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (<><SiteHeader /><main>{children}</main><SiteFooter /><AnchorScroll /></>)
}
