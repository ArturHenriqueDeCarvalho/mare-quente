-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── Users ─────────────────────────────────────────────────────────
create table public.users (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  name         text not null default '',
  photo_url    text,
  auth_provider text not null default 'password',
  role         text not null default 'customer' check (role in ('admin','seller','customer')),
  status       text not null default 'active' check (status in ('active','blocked')),
  created_at   timestamptz not null default now(),
  last_sign_in timestamptz
);
alter table public.users enable row level security;

create policy "Users can read own profile" on public.users
  for select using (auth.uid() = id);
create policy "Admins can read all users" on public.users
  for select using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );
create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.users where id = auth.uid()));
create policy "Admins can update any user" on public.users
  for update using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
  );
create policy "Service role full access" on public.users
  for all using (auth.role() = 'service_role');

-- ─── Products ───────────────────────────────────────────────────────
create table public.products (
  id         uuid primary key default uuid_generate_v4(),
  type       text not null check (type in ('top','bottom','set')),
  name       text not null,
  collection text not null default '',
  print      text not null default '',
  price      numeric(10,2) not null default 0,
  photo_url  text,
  gradient   text default 'pordosol',
  published  boolean not null default false,
  variants   jsonb not null default '[]',
  top_ref    uuid references public.products(id),
  bottom_ref uuid references public.products(id),
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;

create policy "Anyone can read published products" on public.products
  for select using (published = true);
create policy "Staff can read all products" on public.products
  for select using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role in ('admin','seller'))
  );
create policy "Staff can insert products" on public.products
  for insert with check (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role in ('admin','seller'))
  );
create policy "Staff can update products" on public.products
  for update using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role in ('admin','seller'))
  );
create policy "Staff can delete products" on public.products
  for delete using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role in ('admin','seller'))
  );

-- ─── Orders ─────────────────────────────────────────────────────────
create table public.orders (
  id               uuid primary key default uuid_generate_v4(),
  customer_id      uuid references public.users(id),
  customer_name    text not null,
  customer_email   text not null,
  customer_cpf     text,
  customer_address jsonb,
  items            jsonb not null default '[]',
  total            numeric(10,2) not null default 0,
  status           text not null default 'pending'
    check (status in ('pending','paid','shipped','delivered','canceled')),
  channel          text not null default 'online'
    check (channel in ('online','whatsapp','physical')),
  payment          jsonb not null default '{}',
  created_at       timestamptz not null default now()
);
alter table public.orders enable row level security;

create policy "Customers can read own orders" on public.orders
  for select using (customer_id = auth.uid());
create policy "Staff can read all orders" on public.orders
  for select using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role in ('admin','seller'))
  );
create policy "Authenticated users can create orders" on public.orders
  for insert with check (auth.uid() is not null);
create policy "Service role can update orders" on public.orders
  for update using (auth.role() = 'service_role');
create policy "Staff can update orders" on public.orders
  for update using (
    exists (select 1 from public.users u where u.id = auth.uid() and u.role in ('admin','seller'))
  );

-- ─── Storage ─────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public) values ('products', 'products', true)
  on conflict do nothing;

create policy "Anyone can read product images" on storage.objects
  for select using (bucket_id = 'products');
create policy "Staff can upload product images" on storage.objects
  for insert with check (
    bucket_id = 'products' and
    exists (select 1 from public.users u where u.id = auth.uid() and u.role in ('admin','seller'))
  );
create policy "Staff can delete product images" on storage.objects
  for delete using (
    bucket_id = 'products' and
    exists (select 1 from public.users u where u.id = auth.uid() and u.role in ('admin','seller'))
  );

-- ─── Seed data ───────────────────────────────────────────────────────
-- Run this after creating your first admin user to seed products
