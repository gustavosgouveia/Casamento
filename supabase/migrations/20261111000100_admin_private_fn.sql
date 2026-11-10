-- Move is_admin() para fora do schema exposto pela API (evita /rest/v1/rpc/is_admin).
-- As policies referenciam a função por OID, então continuam valendo.
create schema if not exists private;
grant usage on schema private to authenticated;
alter function public.is_admin() set schema private;
