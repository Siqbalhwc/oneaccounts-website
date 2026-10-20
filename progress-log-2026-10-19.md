# Progress log, 19 Oct 2026: NGO content work

Repos used: oneaccounts-website 1e41c95, oneaccounts-frontend (ERP) ba27127, oneaccounts-property-management 42ca3de.
Owner confirmed the site wording on budgets, approvals, owner statements and room history matches the system, so no wording changes were made there.

## Prepared (not yet live until the owner applies them)
1. Code patch `oneaccounts-ngo-page-guides-redirects.patch`
   - NGO solution page: new sections (NGO reports one by one, where a report goes, withholding tax, payroll/assets/controls), 4 new FAQs (reports, restricted funds, foreign currency, add-ons), sharper meta description.
   - 4 permanent (308) redirects for merged guides in next.config.ts.
   - Sitemap lastmod for the NGO page set to 19 Oct.
   - Free Excel file public/downloads/ngo-project-budget-template.xlsx.
   - Checked: production build passes, redirects return 308, new sections render, patch applies cleanly to a fresh clone.
2. SQL `ngo-guides-2026-10-19.sql` (website Supabase project)
   - 9 new NGO guides (budget template, withholding tax for NGOs, donor/project reports, chart of accounts, fixed assets, payroll, year-end close, Excel vs software, indirect cost allocation).
   - Adds scorecard, cloud-or-desktop and cost sections to the surviving "choose NGO software" guide.
   - Sets 4 merged guides to draft (reversible).
   - Checked: SQL parses; every guide passes the site's own SEO checklist; all internal links resolve.

## Guide consolidation decision (8 near-identical NGO guides to 4)
Keep: ngo-accounting-software-in-pakistan-donor-funds-project (Pakistan pillar), ngo-accounting-software-managing-donor-funds-projects-and-financial-transparency (broad guide), how-to-choose-the-right-ngo-accounting-software-in-pakistan-a-practical-checklist (choose), ngo-accounting-software-built-on-real-world-financial-and-audit-experience (trust/experience).
Redirected: the "...-with-on" guide to the Pakistan pillar; "comprehensive-financial-management..." to the NGO page (it made claims the product does not support: compliance-ready reports that satisfy international donors, replaces all third-party software, shared ledger with property management); "...a-complete-guide-for-ngos-and-nonprofits" to the broad guide; "how-to-choose-the-best-accounting-software-for-an-ngo" to the Pakistan checklist.

## Open items
- Product: NGO reports (overspent, remaining funds, spending detail, budget summary) are not on the ERP Reports landing page. Restricted-fund accounting, multi-currency, Urdu, donor-format reports, automatic indirect-cost allocation, EOBI/tax slabs in payroll are absent.
- Not written: Tally/QuickBooks alternative for NGOs (needs verified competitor facts), NGO bank reconciliation (feature not verified), city pages, regulatory guides (need accountant review).
- Property content work (page sections, guide consolidation, new guides) not started.
- New guides are 730 to 980 words; older guides run 1,800 to 2,500. Expand the strongest ones once they show impressions.
