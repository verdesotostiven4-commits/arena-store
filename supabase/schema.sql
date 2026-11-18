-- Arena Store: esquema propuesto. NO aplicado automáticamente.
-- EJECUTAR SOLO en un proyecto Supabase nuevo y revisado, nunca en un proyecto ajeno.
create extension if not exists pgcrypto;
create table if not exists public.profiles(
 id uuid primary key references auth.users(id) on delete cascade,
 username text not null unique check(char_length(username) between 2 and 24),
 avatar_url text,
 created_at timestamptz not null default now()
);
create table if not exists public.listings(
 id uuid primary key default gen_random_uuid(),
 seller_id uuid not null references public.profiles(id) on delete cascade,
 title text not null check(char_length(title) between 5 and 100),
 description text not null default '',
 account_level integer not null check(account_level between 1 and 30),
 koen_net bigint not null default 0 check(koen_net>=0),
 storage_value bigint not null default 0 check(storage_value>=0),
 t7_count integer not null default 0 check(t7_count>=0),
 knife_skin_count integer not null default 0 check(knife_skin_count>=0),
 character_skin_count integer not null default 0 check(character_skin_count>=0),
 trade_type text not null check(trade_type in ('venta','cambio','ambos')),
 ask_price_usd numeric(12,2) check(ask_price_usd>=0),
 status text not null default 'draft' check(status in ('draft','pending','published','rejected','archived')),
 created_at timestamptz not null default now()
);
create table if not exists public.inventory(
 listing_id uuid not null references public.listings(id) on delete cascade,
 item_code text not null,
 quantity integer not null check(quantity between 1 and 9999),
 primary key(listing_id,item_code)
);
create table if not exists public.favorites(
 user_id uuid not null references public.profiles(id) on delete cascade,
 listing_id uuid not null references public.listings(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key(user_id,listing_id)
);
create table if not exists public.conversations(
 id uuid primary key default gen_random_uuid(),
 listing_id uuid not null references public.listings(id) on delete cascade,
 buyer_id uuid not null references public.profiles(id),
 seller_id uuid not null references public.profiles(id),
 created_at timestamptz not null default now(),
 check(buyer_id<>seller_id),
 unique(listing_id,buyer_id,seller_id)
);
create table if not exists public.messages(
 id uuid primary key default gen_random_uuid(),
 conversation_id uuid not null references public.conversations(id) on delete cascade,
 author_id uuid not null references public.profiles(id),
 body text not null check(char_length(body) between 1 and 2000),
 created_at timestamptz not null default now()
);
create table if not exists public.reports(
 id uuid primary key default gen_random_uuid(),
 reporter_id uuid not null references public.profiles(id),
 listing_id uuid not null references public.listings(id),
 reason text not null check(char_length(reason) between 10 and 1000),
 status text not null default 'pending' check(status in ('pending','reviewed','closed')),
 created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.inventory enable row level security;
alter table public.favorites enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.reports enable row level security;
create policy "profiles public view" on public.profiles for select using(true);
create policy "profiles self insert" on public.profiles for insert with check(auth.uid()=id);
create policy "profiles self update" on public.profiles for update using(auth.uid()=id) with check(auth.uid()=id);
create policy "listings public or owner read" on public.listings for select using(status='published' or seller_id=auth.uid());
create policy "listings owner create draft" on public.listings for insert with check(seller_id=auth.uid() and status in ('draft','pending'));
create policy "listings owner edit unpublished" on public.listings for update using(seller_id=auth.uid() and status in ('draft','rejected')) with check(seller_id=auth.uid() and status in ('draft','pending'));
create policy "inventory via readable listing" on public.inventory for select using(exists(select 1 from public.listings l where l.id=listing_id and (l.status='published' or l.seller_id=auth.uid())));
create policy "inventory insert by seller on draft" on public.inventory for insert with check(exists(select 1 from public.listings l where l.id=listing_id and l.seller_id=auth.uid() and l.status in ('draft','rejected')));
create policy "inventory edit by seller on draft" on public.inventory for update using(exists(select 1 from public.listings l where l.id=listing_id and l.seller_id=auth.uid() and l.status in ('draft','rejected'))) with check(exists(select 1 from public.listings l where l.id=listing_id and l.seller_id=auth.uid() and l.status in ('draft','rejected')));
create policy "inventory remove by seller on draft" on public.inventory for delete using(exists(select 1 from public.listings l where l.id=listing_id and l.seller_id=auth.uid() and l.status in ('draft','rejected')));
create policy "favorites private read" on public.favorites for select using(user_id=auth.uid());
create policy "favorites private add" on public.favorites for insert with check(user_id=auth.uid());
create policy "favorites private remove" on public.favorites for delete using(user_id=auth.uid());
create policy "conversations participants read" on public.conversations for select using(buyer_id=auth.uid() or seller_id=auth.uid());
create policy "conversations buyer create" on public.conversations for insert with check(buyer_id=auth.uid() and exists(select 1 from public.listings l where l.id=listing_id and l.seller_id=seller_id and l.status='published'));
create policy "messages participants read" on public.messages for select using(exists(select 1 from public.conversations c where c.id=conversation_id and (c.buyer_id=auth.uid() or c.seller_id=auth.uid())));
create policy "messages participants send" on public.messages for insert with check(author_id=auth.uid() and exists(select 1 from public.conversations c where c.id=conversation_id and (c.buyer_id=auth.uid() or c.seller_id=auth.uid())));
create policy "reports own read" on public.reports for select using(reporter_id=auth.uid());
create policy "reports own create" on public.reports for insert with check(reporter_id=auth.uid());
-- Admin moderation must use a separate, audited server-side role, never expose service_role key to client.
-- No escrow, payments, password transfer, user verification or review manipulation is implemented here.
