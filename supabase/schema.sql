-- OneAccounts marketing website: run this once in the Supabase SQL Editor
-- (use a NEW Supabase project, separate from the ERP database).

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_md text not null default '',
  category text,
  cover_label text,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  company text,
  business_type text,
  message text,
  source text,
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;
alter table public.leads enable row level security;

-- Visitors may read published guides only.
drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts" on public.posts
  for select to anon, authenticated using (status = 'published');

-- leads: no policies on purpose. Only the server (service role key) can read or write them.
create index if not exists posts_published_idx on public.posts (status, published_at desc);
