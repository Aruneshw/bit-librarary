-- Every allowlisted administrator is admitted to the Hub, not just the first named one.
-- Before this, an administrator could sign in (the app checks the full ADMIN_EMAILS list)
-- but could not create their student profile, because hub_profiles' insert policy calls
-- is_student(), which only admitted campus emails and one hard-coded address.
-- Trusted server-managed app_metadata.role='admin' is admitted too. This is still not an
-- RLS bypass: membership, message, notification and private-profile rules all still apply.
begin;
create or replace function hub_private.is_student() returns boolean
language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and exists (
   select 1 from auth.users u where u.id = auth.uid()
   and u.email_confirmed_at is not null
   and (lower(u.email) like '%@bitsathy.ac.in'
        or lower(u.email) in ('aruneshownsty1@gmail.com','harishraghav489@gmail.com','admin@bitsathy.ac.in')
        or u.raw_app_meta_data->>'role' = 'admin')
 );
$$;
revoke all on function hub_private.is_student() from public, anon;
grant execute on function hub_private.is_student() to authenticated, service_role;
commit;
