import { meta } from "@/lib/meta"
import { SITE } from "@/lib/content"
import { PageHero } from "@/components/Sections"
export const metadata = meta("Privacy Policy | OneAccounts", "How OneAccounts collects, uses and protects information when you visit this website, contact us or start a trial.", "/privacy")
export default function Page() {
  return (<><PageHero crumbs={[["Home", "/"], ["Privacy"]]} title="Privacy Policy" sub="How we handle your information. Last updated 17 October 2026." />
    <section style={{ paddingBottom: 100 }}><div className="wrap"><article className="prose">
      <h2>Who we are</h2>
      <p>This website and the OneAccounts software are provided by OneAccounts by Siqbal. In this policy, &quot;we&quot; and &quot;us&quot; mean OneAccounts by Siqbal, {SITE.street}, {SITE.city}, {SITE.country}. You can reach us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or on WhatsApp at {SITE.whatsappDisplay}.</p>

      <h2>What we collect</h2>
      <p>When you send the contact form, we collect the details you type in: your name, email, phone number, company name, type of business and your message. When you start a trial, we collect the details you give us to create your account, such as your name, email, phone number and company name.</p>
      <p>If you message us on WhatsApp, the conversation also takes place on WhatsApp, under WhatsApp&apos;s own terms and privacy policy.</p>
      <p>We use Google Analytics on this website to see, in aggregate, which pages are visited and how people find us. It may set cookies in your browser. You can block or delete cookies in your browser settings.</p>

      <h2>How we use it</h2>
      <p>We use your details to reply to you, set up your trial, support your account and tell you about changes that affect your service. We do not sell your information.</p>

      <h2>Your accounting data</h2>
      <p>Inside the software, each company&apos;s records are isolated from every other company&apos;s and are encrypted in transit and at rest. We use your accounting data only to provide the service to you.</p>

      <h2>Service providers</h2>
      <p>We use trusted providers to host this website and to store data. They handle information only to provide those services to us.</p>

      <h2>Your choices</h2>
      <p>You can ask us to show you the personal details we hold about you, correct them, or delete them. Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will reply. If you want your company account closed, tell us the same way.</p>

      <h2>Changes to this policy</h2>
      <p>If we change this policy, we will update the date at the top of this page.</p>

      <h2>Contact</h2>
      <p>Questions about privacy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </article></div></section></>)
}
