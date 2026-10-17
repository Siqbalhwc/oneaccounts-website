import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import AnchorScroll from "@/components/AnchorScroll"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import WhatsAppButton from "@/components/WhatsAppButton"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (<><SiteHeader /><main>{children}</main><SiteFooter /><WhatsAppButton /><AnchorScroll /><GoogleAnalytics /></>)
}
