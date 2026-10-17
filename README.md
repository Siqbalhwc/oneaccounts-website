# OneAccounts website (www.oneaccountsbysiqbal.com)

Next.js 15 + Supabase + Vercel. Same navy, cream and gold design as the existing site.

Pages: Home, OneAccounts, Property Management, Solutions (index + 7 landing pages), Pricing,
Guides (blog), Contact, Privacy, Terms, and a private /admin for guides and leads.

## 1. Supabase (one time, about 10 minutes)

1. Go to supabase.com and create a NEW project (not the ERP one). Name it `oneaccounts-website`.
2. Open SQL Editor, paste all of `supabase/schema.sql`, click Run.
3. Paste all of `supabase/seed_posts.sql`, click Run. This adds three starter guides.
4. Authentication > Users > Add user. Use your email and a strong password. This is your admin login.
5. Project Settings > API. Copy: Project URL, anon public key, service_role key.

## 2. Put the code on GitHub

Unzip this folder, then in PowerShell:

```powershell
cd "C:\path\to\oneaccounts-website"
git init
git add -A
git commit -m "OneAccounts website"
git branch -M main
git remote add origin https://github.com/Siqbalhwc/oneaccounts-website.git
git push -u origin main
```
(Create an empty repo called `oneaccounts-website` on GitHub first.)

## 3. Vercel

1. vercel.com > Add New > Project > import `oneaccounts-website`.
2. Add these Environment Variables (see `.env.example`):
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS` (your login email).
3. Deploy. Test it on the free `*.vercel.app` address first.

## 4. Move www to the new site (Cloudflare)

1. In Vercel: Project > Settings > Domains > add `www.oneaccountsbysiqbal.com`.
2. In Cloudflare, first remove `www` from the old Worker (Workers & Pages > old project > Settings > Domains and Routes).
3. Cloudflare > DNS: add `CNAME  www  ->  cname.vercel-dns.com` and set it to DNS only (grey cloud).
4. Leave `app` and `properties` exactly as they are.
5. Optional: Cloudflare > Rules > Redirect `oneaccountsbysiqbal.com` to `https://www.oneaccountsbysiqbal.com`.

## 5. After launch (SEO)

1. Google Search Console: add `https://www.oneaccountsbysiqbal.com`, verify, submit `/sitemap.xml`.
2. Bing Webmaster Tools: import from Search Console.
3. Publish one new guide every week or two from `/admin`. Fresh, useful content is what ranks.
4. Link to the site from your YouTube channel, LinkedIn and WhatsApp business profile.

## Things to know

- `/admin` sign in with the Supabase user from step 1.4. Only emails listed in `ADMIN_EMAILS` get in.
- Contact form entries appear in `/admin/leads`.
- Prices are public (`PRICING_PUBLIC = true` in `lib/content.ts`, figures are in the same file).
  Set it to `false` to hide them and show the "see plans inside your trial" box instead.
- Guides pasted from Word or a chat tool lose their headings. In the guide editor, open "Heading helper",
  tick the lines that are real headings, press Apply, check Preview, then Save. Nothing changes until you save.
- New guide addresses are cut at a whole word, at most 60 characters. Saved guides keep their address.
- `app/sitemap.ts` has a `PAGES_UPDATED` date. Change it when the wording of a fixed page really changes.
- Browser security headers are set in `next.config.ts`. A Content-Security-Policy is not set yet.
- "Start Free Trial" goes to `app.oneaccountsbysiqbal.com/login`, as on the current site.
- Privacy, Terms and About were rewritten on 17 Oct 2026 (no "draft" label). Have a lawyer review Privacy and Terms, and add refund wording and a company address when decided.
- Clicking any in-page link brings that section to the middle of the screen (`components/AnchorScroll.tsx`).

## Admin login troubleshooting
If `/admin/login` sends you back to the login page, it now tells you why:
- "not listed in ADMIN_EMAILS": fix the `ADMIN_EMAILS` value in Vercel (exact email, no spaces), then Deployments > Redeploy.
- "sign-in was not kept": check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel, then redeploy.
Environment variable changes only take effect after a redeploy.
