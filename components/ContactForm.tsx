"use client"
import { useActionState } from "react"
import { submitLead, type ContactState } from "@/app/(site)/contact/actions"

export default function ContactForm() {
  const [s, action, pending] = useActionState<ContactState, FormData>(submitLead, {})
  if (s.ok) return <div className="msg ok2">Thank you. We will get back to you within the day.</div>
  return (
    <form action={action} className="form">
      <label>Your name<input name="name" required maxLength={120} autoComplete="name" /></label>
      <div className="row2"><label>Email<input name="email" type="email" autoComplete="email" /></label><label>Phone or WhatsApp<input name="phone" type="tel" autoComplete="tel" /></label></div>
      <label>Company<input name="company" maxLength={160} autoComplete="organization" /></label>
      <label>Business type<select name="business_type" defaultValue=""><option value="">Choose one</option><option>Service</option><option>Trading</option><option>NGO</option><option>Construction</option><option>Property management</option></select></label>
      <label>How can we help?<textarea name="message" maxLength={2000} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px" }} aria-hidden="true" />
      {s.error && <div className="msg er">{s.error}</div>}
      <button className="btn-primary" style={{ border: 0, cursor: "pointer", justifySelf: "start" }} disabled={pending} type="submit">{pending ? "Sending..." : "Send message"}</button>
    </form>
  )
}
