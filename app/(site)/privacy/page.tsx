import { meta } from "@/lib/meta"
import { PageHero } from "@/components/Sections"
export const metadata = meta("Privacy Policy | OneAccounts", "How OneAccounts collects, uses and protects information.", "/privacy")
export default function Page() {
  return (<><PageHero crumbs={[["Home", "/"], ["Privacy"]]} title="Privacy Policy" sub="Draft text. Please review before launch." />
    <section style={{ paddingBottom: 100 }}><div className="wrap"><article className="prose">
      <h2>What we collect</h2><p>When you contact us or start a trial we collect the details you give us, such as your name, email, phone number and company name.</p>
      <h2>How we use it</h2><p>To reply to you, set up your trial, and support your account. We do not sell your information.</p>
      <h2>Your accounting data</h2><p>Inside the software, each company&apos;s records are isolated from every other company&apos;s and are encrypted in transit and at rest.</p>
      <h2>Contact</h2><p>Questions about privacy: support@oneaccountsbysiqbal.com.</p>
    </article></div></section></>)
}
