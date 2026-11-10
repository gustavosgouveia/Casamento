-- Área admin: usuários logados (Supabase Auth) cujo e-mail está em public.admins
-- podem ler RSVPs/presentes completos e moderar o mural.
-- Adicionar outro admin: insert into public.admins (email) values ('fulana@exemplo.com');

create table public.admins (
  email text primary key check (email = lower(email))
);
alter table public.admins enable row level security; -- sem policies: invisível pela API
revoke all on public.admins from anon, authenticated;

insert into public.admins (email) values ('gustavomsgouveia1@hotmail.com');

create function public.is_admin() returns boolean
  language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.admins where email = lower(auth.jwt() ->> 'email'));
$$;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

grant select, delete on public.rsvp, public.gift_purchases, public.guestbook to authenticated;
grant update (approved) on public.guestbook to authenticated;

create policy "admin le rsvp" on public.rsvp for select to authenticated using (public.is_admin());
create policy "admin apaga rsvp" on public.rsvp for delete to authenticated using (public.is_admin());

create policy "admin le presentes" on public.gift_purchases for select to authenticated using (public.is_admin());
create policy "admin apaga presentes" on public.gift_purchases for delete to authenticated using (public.is_admin());

create policy "admin le recados" on public.guestbook for select to authenticated using (public.is_admin());
create policy "admin modera recados" on public.guestbook for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy "admin apaga recados" on public.guestbook for delete to authenticated using (public.is_admin());
