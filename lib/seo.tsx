import { SITE } from "@/lib/content"

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
export const orgLd = () => ({
  "@context": "https://schema.org", "@type": "Organization", name: SITE.name, legalName: "OneAccounts by Siqbal", url: SITE.url,
  logo: `${SITE.url}/logo.png`, email: SITE.email, slogan: SITE.tagline,
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: SITE.email, telephone: "+92 371 6853677", areaServed: "PK", availableLanguage: ["English", "Urdu"] }],
  sameAs: [SITE.youtube],
})
export const websiteLd = () => ({ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, inLanguage: "en" })
export const softwareLd = () => ({
  "@context": "https://schema.org", "@type": "SoftwareApplication", name: "OneAccounts",
  applicationCategory: "BusinessApplication", operatingSystem: "Web", url: SITE.url,
  description: "Cloud ERP for growing businesses and NGOs: accounting, inventory, and payroll that stay clear, current, and calm.",
  offers: [
    { "@type": "Offer", name: "Free trial", price: "0", priceCurrency: "PKR", description: "Free trial, no credit card required" },
    { "@type": "Offer", name: "Service and Trading", priceCurrency: "PKR", priceSpecification: { "@type": "UnitPriceSpecification", price: "3000", priceCurrency: "PKR", unitText: "per user per month" } },
    { "@type": "Offer", name: "NGO and Construction", priceCurrency: "PKR", priceSpecification: { "@type": "UnitPriceSpecification", price: "5000", priceCurrency: "PKR", unitText: "per user per month" } },
  ],
  publisher: { "@type": "Organization", name: "Siqbal", url: SITE.url },
})
export const faqLd = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
})
export const crumbLd = (items: [string, string][]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE.url + path })),
})
