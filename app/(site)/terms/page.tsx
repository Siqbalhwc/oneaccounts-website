import Link from "next/link"
import { meta } from "@/lib/meta"
import { SITE } from "@/lib/content"
import { PageHero } from "@/components/Sections"
export const metadata = meta("Terms of Service | OneAccounts", "The terms for using the OneAccounts website and software: trials, payment, your responsibilities and ours.", "/terms")
export default function Page() {
  return (<><PageHero crumbs={[["Home", "/"], ["Terms"]]} title="Terms of Service" sub="The terms for using OneAccounts. Last updated 17 October 2026." />
    <section style={{ paddingBottom: 100 }}><div className="wrap"><article className="prose">
      <h2>Using the service</h2>
      <p>OneAccounts is provided as a subscription service over the internet. By creating an account or using the software you agree to these terms. You are responsible for the accuracy of the data you enter and for keeping your login details safe. Please tell us at once if you think someone else has used your login.</p>

      <h2>Trials and payment</h2>
      <p>New companies receive a ten-day free trial, with no credit card required, to test the software and confirm it suits them. You can ask us questions on WhatsApp at any time during the trial. We charge only after you have tested the software and confirmed that you want to go ahead. Paid plans are billed in Pakistani rupees, per user for the period you choose, at the prices shown on our <Link href="/pricing">pricing page</Link>. Optional add-ons are priced separately.</p>
      <p>The terms of service delivery for your organisation are set out in a signed agreement between you and us.</p>

      <h2>Your data</h2>
      <p>The accounting records you enter are your company&apos;s records. We use them only to provide the service to you, as described in our <Link href="/privacy">Privacy Policy</Link>.</p>

      <h2>Acceptable use</h2>
      <p>Please use the software only for lawful business purposes. Do not try to access another company&apos;s data, interfere with the service, or share your login with people outside your organisation.</p>

      <h2>Availability and support</h2>
      <p>We work to keep the service available and to help you when you need it, through WhatsApp, email and the contact form. We may occasionally pause the service for maintenance.</p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date at the top of this page shows when they were last changed.</p>

      <h2>Contact</h2>
      <p>Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </article></div></section></>)
}
