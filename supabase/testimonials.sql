-- Run once in the Supabase SQL Editor (same project as schema.sql and media.sql).
-- Customer testimonials, managed from /admin/testimonials.

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,                -- e.g. "Finance Manager"
  company text,             -- e.g. "ABC Traders, Lahore"
  quote text not null default '',
  photo_url text,           -- optional picture of the customer or their logo
  video_url text,           -- optional YouTube link of the customer speaking
  sort_order int not null default 100,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
drop policy if exists "public read active testimonials" on public.testimonials;
create policy "public read active testimonials" on public.testimonials
  for select to anon, authenticated using (active = true);
create index if not exists testimonials_idx on public.testimonials (active, sort_order);
