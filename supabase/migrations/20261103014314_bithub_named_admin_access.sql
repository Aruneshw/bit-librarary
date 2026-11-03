-- Preserve campus-only access while admitting the explicitly approved administrator.
-- Membership and private-profile policies still apply; this is not an RLS bypass.
begin;
create or replace function hub_private.is_student() returns boolean
language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and exists (
   select 1 from auth.users u where u.id = auth.uid()
   and u.email_confirmed_at is not null
   and (lower(u.email) like '%@bitsathy.ac.in'
        or lower(u.email) = 'aruneshownsty1@gmail.com')
 );
$$;
revoke all on function hub_private.is_student() from public, anon;
grant execute on function hub_private.is_student() to authenticated, service_role;
commit;
