import { meta } from "@/lib/meta"
import { PageHero } from "@/components/Sections"
export const metadata = meta("Terms of Service | OneAccounts", "The terms for using the OneAccounts website and software.", "/terms")
export default function Page() {
  return (<><PageHero crumbs={[["Home", "/"], ["Terms"]]} title="Terms of Service" sub="Draft text. Please review before launch." />
    <section style={{ paddingBottom: 100 }}><div className="wrap"><article className="prose">
      <h2>Using the service</h2><p>OneAccounts is provided as a subscription service. You are responsible for the accuracy of the data you enter and for keeping your login details safe.</p>
      <h2>Trials and payment</h2><p>New companies may receive a free trial. Paid plans are billed per user for the period you choose.</p>
      <h2>Contact</h2><p>support@oneaccountsbysiqbal.com.</p>
    </article></div></section></>)
}
