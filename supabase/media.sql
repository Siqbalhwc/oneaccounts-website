-- Run once in the Supabase SQL Editor (same project as schema.sql).
-- Adds: pictures and videos managed from /admin/media, and a public storage bucket for uploads.

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('screenshot','video')),
  product text not null default 'General',   -- General, Service, Trading, NGO, Construction, Property
  title text not null default '',
  caption text,
  url text not null,                          -- image address, or YouTube link for videos
  sort_order int not null default 100,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.media enable row level security;
drop policy if exists "public read active media" on public.media;
create policy "public read active media" on public.media
  for select to anon, authenticated using (active = true);
create index if not exists media_idx on public.media (kind, product, sort_order);

-- Public bucket for uploaded pictures (uploads only happen on the server with the service key).
insert into storage.buckets (id, name, public) values ('site-media', 'site-media', true)
  on conflict (id) do nothing;
