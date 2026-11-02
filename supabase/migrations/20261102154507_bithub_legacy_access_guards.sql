-- Protect the existing Library objects discovered in the production audit.
-- Conditional checks also allow the isolated Hub-only test database to run this migration.
begin;
do $$begin
 if to_regclass('public.hackathons') is not null then
  alter table public.hackathons enable row level security;
  create policy library_hackathons_read on public.hackathons for select to authenticated using ((select hub_private.is_student()) or (select hub_private.is_reviewer()));
  create policy library_hackathons_admin on public.hackathons for all to authenticated using ((select hub_private.is_reviewer())) with check ((select hub_private.is_reviewer()));
 end if;
 if to_regclass('public.user_sessions') is not null then
  alter table public.user_sessions enable row level security;
  create policy library_sessions_own on public.user_sessions for select to authenticated using (user_id=(select auth.uid()));
 end if;
end $$;
commit;
