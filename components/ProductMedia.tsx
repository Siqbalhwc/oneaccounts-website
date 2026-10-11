import { getMedia } from "@/lib/media"
import ScreenshotGallery from "@/components/ScreenshotGallery"
import VideoShowcase from "@/components/VideoShowcase"
import { SectionHead } from "@/components/Sections"

// Screenshots and demo videos for one product (Trading, Construction, Property...). Shows nothing until the admin adds some.
export default async function ProductMedia({ product, title = "See it in action" }: { product: string; title?: string }) {
  const [shots, vids] = await Promise.all([getMedia("screenshot", product), getMedia("video", product)])
  if (!shots.length && !vids.length) return null
  return (
    <section className="pillars"><div className="wrap">
      <SectionHead title={title} />
      {shots.length > 0 && <ScreenshotGallery items={shots} />}
      {vids.length > 0 && <div style={{ marginTop: shots.length ? 40 : 0 }}><VideoShowcase items={vids} /></div>}
    </div></section>
  )
}
