import Image from "next/image"
import { getTestimonials } from "@/lib/testimonials"
import { isOptimisable } from "@/lib/media"
import TestimonialVideo from "@/components/TestimonialVideo"

// Customer words, pictures and videos added from /admin/testimonials. Renders nothing until there is at least one.
export default async function Testimonials() {
  const items = await getTestimonials()
  if (!items.length) return null
  return (
    <section className="proof" id="customers"><div className="wrap">
      <div className="ind-head"><h2>What our customers say</h2><p>Real businesses using OneAccounts.</p></div>
      <div className="proof-grid">
        {items.map((t) => (
          <figure className="proof-card" key={t.id}>
            {t.video_url && <TestimonialVideo url={t.video_url} name={t.name} />}
            {t.quote && <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>}
            <figcaption>
              {t.photo_url && (isOptimisable(t.photo_url)
                ? <Image src={t.photo_url} alt={t.name} width={48} height={48} className="proof-ph" />
                // eslint-disable-next-line @next/next/no-img-element
                : <img src={t.photo_url} alt={t.name} width={48} height={48} loading="lazy" decoding="async" className="proof-ph" />)}
              <span><b>{t.name}</b>{(t.role || t.company) && <small>{[t.role, t.company].filter(Boolean).join(", ")}</small>}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div></section>
  )
}
