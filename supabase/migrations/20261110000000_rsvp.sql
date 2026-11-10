-- Confirmação de presença (RSVP). Público só insere; leitura só pelo painel do Supabase.

create table public.rsvp (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 80),
  attending boolean not null,
  companions int not null default 0 check (companions between 0 and 10),
  companion_names text not null default '' check (char_length(companion_names) <= 400),
  dietary text not null default '' check (char_length(dietary) <= 300),
  song text not null default '' check (char_length(song) <= 200),
  message text not null default '' check (char_length(message) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.rsvp enable row level security;

revoke all on public.rsvp from anon, authenticated;
grant insert (name, attending, companions, companion_names, dietary, song, message) on public.rsvp to anon;

create policy "anon confirma presenca" on public.rsvp
  for insert to anon with check (true);
