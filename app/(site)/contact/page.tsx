import { meta } from "@/lib/meta"
import { SITE } from "@/lib/content"
import { PageHero } from "@/components/Sections"
import ContactForm from "@/components/ContactForm"

export const metadata = meta("Contact OneAccounts | Book a Demo", "Talk to us about OneAccounts or Property Management. Message on WhatsApp, email, or send the form and we reply within the day.", "/contact")

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Contact" crumbs={[["Home", "/"], ["Contact"]]} title="Talk to a person" sub="We usually reply within the day." />
      <section className="contact"><div className="wrap"><div className="prop-grid">
        <div className="prop-copy">
          <h2>Fastest way</h2>
          <p><a href={SITE.whatsapp} target="_blank" rel="noopener" style={{ color: "var(--navy)", fontWeight: 600 }}>WhatsApp {SITE.whatsappDisplay}</a><br /><a href={`mailto:${SITE.email}`} style={{ color: "var(--navy)", fontWeight: 600 }}>{SITE.email}</a></p>
          <p>Tell us your business type and what you are trying to solve, and we will point you to the right setup.</p>
        </div>
        <ContactForm />
      </div></div></section>
    </>
  )
}
