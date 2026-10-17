import { SITE } from "@/lib/content"

// Floating "WhatsApp us" button shown on every public page.
// Plain link (no JavaScript, no animation) so it adds nothing to page weight.
const MESSAGE = "Hello OneAccounts, I would like to know more about your software."

export default function WhatsAppButton() {
  const href = `${SITE.whatsapp}?text=${encodeURIComponent(MESSAGE)}`
  return (
    <a className="wa-float" href={href} target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" />
        <path fill="#0F8040" transform="translate(6.1 6.1) scale(.5)" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
      </svg>
      <span>WhatsApp us</span>
    </a>
  )
}
