"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

const NAV = 88

// Brings the clicked section to the middle of the screen, so it is never half cut.
// Sections taller than the screen are aligned just under the header instead.
function bring(id: string) {
  const sec = document.getElementById(id)
  if (!sec) return false
  const el = (sec.querySelector(".wrap") as HTMLElement) || sec
  const r = el.getBoundingClientRect()
  const room = window.innerHeight - NAV
  const top = r.height < room ? window.scrollY + r.top - NAV - (room - r.height) / 2 : window.scrollY + r.top - NAV - 12
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
  return true
}

export default function AnchorScroll() {
  const path = usePathname()
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute("href") || ""
      const hash = href.startsWith("#") ? href : href.startsWith(path + "#") ? href.slice(path.length) : ""
      if (!hash || hash === "#") return
      if (bring(hash.slice(1))) { e.preventDefault(); e.stopPropagation() }
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [path])
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    // The browser makes its own jump to the hash after load; centre again after it settles.
    const ts = [150, 800, 1600].map((d) => setTimeout(() => {
      const el = document.getElementById(id)?.querySelector(".wrap") as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect(), room = window.innerHeight - NAV
      const want = r.height < room ? NAV + (room - r.height) / 2 : NAV + 12
      if (Math.abs(r.top - want) > 10) bring(id)
    }, d))
    return () => ts.forEach(clearTimeout)
  }, [path])
  return null
}
