import { adminClient } from "@/lib/supabase/admin"
import TestimonialFields from "@/components/TestimonialFields"
import { addTestimonial, updateTestimonial, deleteTestimonial } from "@/app/admin/testimonial-actions"
import type { Testimonial } from "@/lib/testimonials"

const MSG: Record<string, string> = { missing: "Please add the customer's name and either their words or a YouTube link.", yt: "That is not a YouTube link.", photo: "The picture address must start with https://", save: "Could not save. Did you run supabase/testimonials.sql in Supabase?" }

export default async function TestimonialsPage({ searchParams }: { searchParams: Promise<{ e?: string; ok?: string }> }) {
  const sp = await searchParams
  const { data, error } = await adminClient().from("testimonials").select("*").order("sort_order").order("created_at", { ascending: false })
  const rows = (data as Testimonial[]) || []
  return (
    <>
      <h1>Customer testimonials</h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: 680 }}>These appear in a &quot;What our customers say&quot; section on the home page, only once you add the first one. Add a customer&apos;s words, a picture, a YouTube video, or all three. Please add only what the customer has agreed to share.</p>
      {sp.e && <div className="msg er">{MSG[sp.e] || "Something went wrong."}</div>}
      {sp.ok && <div className="msg ok2">Saved.</div>}
      {error && <div className="msg er">{MSG.save}</div>}
      <form action={addTestimonial} className="form" style={{ marginBottom: 36 }}>
        <h2 style={{ margin: 0 }}>Add a testimonial</h2>
        <TestimonialFields />
        <button className="btn-primary" style={{ border: 0, cursor: "pointer", justifySelf: "start" }}>Add</button>
      </form>
      {rows.map((t) => (
        <form key={t.id} action={updateTestimonial} className="form" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 20, marginTop: 20 }}>
          <input type="hidden" name="id" value={t.id} />
          <TestimonialFields t={t} edit />
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <button className="btn-login" style={{ cursor: "pointer" }}>Save changes</button>
            <button className="link-btn" formAction={deleteTestimonial} formNoValidate>Delete</button>
          </div>
        </form>
      ))}
      {!rows.length && <p>No testimonials yet.</p>}
    </>
  )
}
