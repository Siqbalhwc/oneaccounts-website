# OneAccounts website: progress log (to 16 Oct 2026)

Owner is non-IT. Runs SQL, cmd and PowerShell. Wants every change explained and checked. Site must not look like any market site. Priority searches: NGO accounting software, property management software, trading ERP. Pakistan is the first market.

Repo: https://github.com/Siqbalhwc/oneaccounts-website (Next.js 15, Supabase, Vercel auto-deploy, Cloudflare DNS).
IMPORTANT: Claude's session cannot push to this repo (git proxy returns 403 until the owner links GitHub). Every change is delivered as a .patch file; the owner applies it in PowerShell: git pull, git apply <file>, git add -A, git commit, git push. Always clone the repo fresh for the latest code. Patch files should not be committed into the repo (they were committed twice by mistake; remove with git rm). Do not push to main from a session even if access is added; use a branch, because main auto-deploys to the live site.

## Live and confirmed (checked 15 Oct)
- Homepage redesign: h1 "Accounting software in Pakistan for NGOs, property managers and trading companies"; sector blocks for NGO, Property, Trading; new menu (NGO accounting, Property management, Trading ERP, Pricing, Guides).
- SEO titles and descriptions rewritten on all solution pages; "Trading ERP" added to the trading page.
- Header overlap fix and wider layout (content up to 1440 px).
- Expanded text on the NGO (~1,050 words), Trading (~840), Construction (~730) and Property (~900) pages. New optional `sections` field on solutions in lib/content.ts; Property text is in app/(site)/property-management/page.tsx.
- Homepage closing banner heading now white on navy ("Start with your own books").

## Delivered, waiting for the owner to apply
- oneaccounts-guide-toc-fix.patch (16 Oct): the "In this guide" contents box is a <nav> and inherited the header's sticky rule, so it slid over the header on every guide page. Fix: nav[aria-label="In this guide"]{position:static;...} at the end of app/globals.css. Tested. (Repo head showed a later commit "fix" by 16 Oct afternoon; owner may have applied it, check with a fresh clone.)
- oneaccounts-page-turn-card-complete.patch (16 Oct): USE THIS ONE ONLY. It replaces the earlier oneaccounts-page-turn-card.patch (same card, without swipe and corner). Homepage hero card "Follow one entry through the books" behaves like a book:
  - NGO / Property / Trading tabs turn pages (3D turn from the left edge, leaves turn in sequence).
  - Each of the five steps turns to a page showing that report (balance sheet, trial balance, ledger, journal entry, original document), with "Back to the steps" and "Step n of 5".
  - Turned-up corner at the bottom right of the book: lifts once when the card first comes into view, grows on hover or focus, and turns to the next page when pressed (hidden on the last page).
  - Swipe left or right on phones turns the page (touch only; up and down still scrolls; a swipe that begins on a step does not open it). A small "Swipe the page sideways to turn it." line shows on touch devices only.
  - Edits only components/HomeTrace.tsx and the card block of app/globals.css (classes .hx-book, .hx-leaf, .hx-page, .hx-curl, .hx-swipe etc). Rest of the hero unchanged. Applies cleanly to main.
  - Tested on a fresh clone: next build passes; Playwright at 360, 390, 820 and 1440 px: no sideways scroll; reduced-motion turns animation and nudge off; keyboard focus goes to Back then returns to the step; hidden pages use the inert attribute; touch swipe tested with real touch events. All figures are labelled example entries. Text of all three sectors stays in the page HTML. Mockup (private artifact, shows the earlier version without swipe and corner): https://claude.ai/artifact/PuBLjBRimW4P11nGVNsBTV
  - Still to do by the owner after deploy: run PageSpeed Insights on the homepage before and after and send the numbers; try it on a real phone.

## Guides: merge plan (approved by owner)
18 published guides, 13 on NGO. Target: 12 guides.
- New merged NGO pillar guide written and published by the owner (slug planned: ngo-accounting-software-pakistan; owner has uploaded it, URL not yet sent). Files: ngo-pillar-fields.md and ngo-pillar-guide-body.md (~2,100 words).
- Redirects to write AFTER the owner sends the live URL, into the new pillar:
  ngo-accounting-software-managing-donor-funds-projects-and-financial-transparency, ngo-accounting-software-a-complete-guide-for-ngos-and-nonprofits, ngo-accounting-software-manage-donor-funds-project-budgets-and-financial-reporting-with-on, ngo-accounting-software-built-on-real-world-financial-and-audit-experience, comprehensive-financial-management-and-specialized-ngo-accounting-with-oneaccounts.
- Other redirects: how-to-choose-the-best-accounting-software-for-an-ngo -> how-to-choose-the-right-ngo-accounting-software-in-pakistan-a-practical-checklist; budget-control-for-ngo-projects-step-by-step -> ngo-budget-vs-actual-reporting-a-practical-guide-for-finance-managers; what-property-management-software-should-control -> property-management-software-in-pakistan-complete-guide.
- Keep as they are: ngo-accounting-problems, financial-reporting-for-ngos..., ngo-audit-preparation-checklist..., restricted-vs-unrestricted-funds..., grant-accounting-software..., property-management-and-rent-management-companies..., erp-and-accounting-software-in-pakistan..., how-withholding-tax-is-posted-on-a-vendor-payment.
- guide-merge-pack-1.md (sent): paste blocks and new SEO titles/descriptions for the three kept guides (Pakistan checklist, Budget vs Actual, Property Pakistan guide).
- Order: owner pastes blocks and publishes pillar, then Claude writes redirect patch (next.config redirects), owner applies it, then owner unpublishes the old guides. Do not unpublish before the redirects are live.
- Owner must delete the leftover AI sentence ("Are you looking to tailor this blog post...") in the "Comprehensive Financial Management..." guide.

## Open questions for the owner
- How installment plans work in construction (a few plain sentences). Not yet written into the Construction page; do not guess.
- Whether OneAccounts supports foreign currency and donor-specific report formats (not claimed anywhere yet).
- Comfort with naming WWF-Pakistan publicly (short section with disclaimer is in the pillar guide; can be deleted).
- Whether the example figures on the new report pages (e.g. "Budget check passed, Rs 62,000 left", "Stock check passed, 152 available") match how the software really behaves.

## Owner's to-do
- Apply the page-turn card patch (complete version) and push; apply the contents-box patch if not already applied.
- Screenshots (about 3 each for NGO, Trading, Property) uploaded in Admin, Pictures and videos, with the right product tag. Pages show them automatically.
- Customer quote or video in Admin, Testimonials.
- Request indexing in Google Search Console after deploys.
- Fix cut-off excerpts and slugs in guides (resolved by the merge for most).

## Design direction (owner decisions, 16 Oct)
- Keep the live homepage structure exactly as it is; only the right-hand card changes. A folder / separate book / ledger-stack concept was rejected. Owner liked the page-turn motion. Do not add a "Tactile Web" style strip (mockup source had typos and generic wording).
- One moving element on the page only; do not add animation elsewhere (page speed).

## Possible next work for Claude
- Redirect patch (above).
- Dates on /blog cards, visible breadcrumbs, sideways-scroll hint on wide tables for phones, contrast and focus fixes outside the homepage.
- Guides still to review for overlaps after the merge.

## Technical notes for future sessions
- CSS: new .hx-* classes are appended at the end of app/globals.css (the card block sits in the homepage section, around the .hx-trace/.hx-book rules). Brand tokens: --navy #0B0A5C, --cream #FAF8F4, --gold #C9862F. Fonts: Sora (headings), Inter (body).
- Header rules in globals.css target `nav`; any other <nav> on a page inherits them unless overridden.
- Guides come from the Supabase `posts` table (status, slug, title, excerpt, content_md, category, cover_label, seo_title, seo_description, published_at, updated_at). There is no keywords column.
- Guide page renderer: app/(site)/blog/[slug]/page.tsx. Long-form solution text: app/(site)/solutions/[slug]/page.tsx.
- WebFetch can return stale copies; add a ?query=value to the URL to check what is really live. The shell has no network access to the live site. Local screenshots use the preinstalled Chromium with Playwright (executable_path /opt/pw-browsers/chromium); run `npm ci`, `npx next build`, `npx next start -p 3111`.
- Never use `pkill -f` or `pgrep -f ... | xargs kill` in the shell (it kills the session). Use `fuser -k <port>/tcp`.
- Playwright tips: pages inside the card are stacked, so target the visible one with `.hx-front:not([inert])`. Touch swipes: use a context with has_touch and is_mobile and send CDP Input.dispatchTouchEvent; recompute the book's position after any vertical scroll.
