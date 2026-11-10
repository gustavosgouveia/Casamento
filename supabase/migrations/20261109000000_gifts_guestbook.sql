-- Presentes (Pix autodeclarado) e mural de recados.
-- Acesso público (role anon) é mínimo: só insere, e só lê o que precisa.

create table public.gift_purchases (
  id bigint generated always as identity primary key,
  gift_id int not null check (gift_id between 0 and 999),
  guest_name text not null check (char_length(guest_name) between 1 and 80),
  message text not null default '' check (char_length(message) <= 500),
  created_at timestamptz not null default now()
);

create table public.guestbook (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 80),
  message text not null check (char_length(message) between 1 and 1000),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.gift_purchases enable row level security;
alter table public.guestbook enable row level security;

-- Privilégios: tira o padrão "tudo" e concede só colunas necessárias.
revoke all on public.gift_purchases, public.guestbook from anon, authenticated;
grant insert (gift_id, guest_name, message) on public.gift_purchases to anon;
grant select (gift_id) on public.gift_purchases to anon; -- nomes/recados dos presenteadores ficam privados
grant insert (name, message) on public.guestbook to anon;
grant select (id, name, message, created_at, approved) on public.guestbook to anon;

create policy "anon registra presente" on public.gift_purchases
  for insert to anon with check (true);
create policy "anon ve quais presentes saíram" on public.gift_purchases
  for select to anon using (true);

create policy "anon envia recado" on public.guestbook
  for insert to anon with check (approved = false);
create policy "anon ve recados aprovados" on public.guestbook
  for select to anon using (approved);

create index guestbook_approved_created_idx on public.guestbook (created_at desc) where approved;
