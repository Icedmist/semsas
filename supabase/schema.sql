create extension if not exists pgcrypto;

create table if not exists public.live_dashboard (
  id uuid primary key default gen_random_uuid(),
  year text not null unique,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists idx_live_dashboard_year
  on public.live_dashboard (year);

create table if not exists public.asset_references (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  bucket text not null default 'site-assets',
  path text not null,
  url text,
  mime_type text,
  size_bytes integer,
  kind text not null default 'image',
  created_at timestamptz not null default now()
);

create index if not exists idx_asset_references_bucket
  on public.asset_references (bucket, path);

alter table public.live_dashboard enable row level security;
alter table public.asset_references enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'live_dashboard'
      and policyname = 'Public read access for live_dashboard'
  ) then
    create policy "Public read access for live_dashboard"
      on public.live_dashboard
      for select
      using (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'asset_references'
      and policyname = 'Public read access for asset_references'
  ) then
    create policy "Public read access for asset_references"
      on public.asset_references
      for select
      using (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'live_dashboard'
      and policyname = 'Allow authenticated writes to live_dashboard'
  ) then
    create policy "Allow authenticated writes to live_dashboard"
      on public.live_dashboard
      for all
      using (auth.role() = 'authenticated')
      with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'asset_references'
      and policyname = 'Allow authenticated writes to asset_references'
  ) then
    create policy "Allow authenticated writes to asset_references"
      on public.asset_references
      for all
      using (auth.role() = 'authenticated')
      with check (auth.role() = 'authenticated');
  end if;
end $$;
