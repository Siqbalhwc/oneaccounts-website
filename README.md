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
- Prices are hidden because the live site says plans are being finalised. To show them, set
  `PRICING_PUBLIC = true` in `lib/content.ts` (figures are in the same file).
- "Start Free Trial" goes to `app.oneaccountsbysiqbal.com/login`, as on the current site.
- Privacy and Terms are draft text. Please review them.
- Clicking any in-page link brings that section to the middle of the screen (`components/AnchorScroll.tsx`).
