-- NOT APPLIED. Broad function changes were rejected by automatic approval review.
-- Requires a separate reviewed rollout with a rollback plan and explicit approval.
-- Protect the existing Library objects discovered in the production audit.
-- Conditional checks also allow the isolated Hub-only test database to run this migration.
begin;
revoke create on schema public from public,anon,authenticated;
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
-- Keep existing signed-in callers working while removing anonymous privileged RPCs.
-- public is no longer writable by browser roles; pg_temp is explicitly last.
do $$declare f record; allowed boolean; signature text; definition text; actor_param text;
begin
 for f in select p.oid,p.proname,p.prosecdef,p.proconfig,l.lanname from pg_proc p join pg_namespace n on n.oid=p.pronamespace join pg_language l on l.oid=p.prolang where n.nspname='public' and p.prokind='f' and p.proname not like 'hub_%' loop
  signature := f.oid::regprocedure::text;
  if f.proconfig is null or not exists(select 1 from unnest(f.proconfig) c where c like 'search_path=%') then
   execute format('alter function %s set search_path = public, pg_temp',signature);
  end if;
  if f.prosecdef then
   allowed := has_function_privilege('authenticated',f.oid,'EXECUTE');
   execute format('revoke execute on function %s from public, anon',signature);
   if allowed then execute format('grant execute on function %s to authenticated',signature); end if;
   execute format('grant execute on function %s to service_role',signature);
  end if;
  -- These operations are already called only by the verified server API/jobs.
  if f.proname in ('increment_journey_stat','process_journey_heartbeat','get_user_journey_stats','cleanup_old_sessions','upsert_user_session','mark_user_offline') then
   execute format('revoke execute on function %s from public,anon,authenticated',signature);
   execute format('grant execute on function %s to service_role',signature);
  end if;
  -- Browser callbacks can update only their own login/access record.
  if f.proname in ('increment_login_count','log_daily_access') and f.lanname='plpgsql' then
   definition := pg_get_functiondef(f.oid);
   actor_param := 'target_user_id';
   if definition !~* '\mBEGIN\M' then raise exception 'Unexpected function definition for %',signature; end if;
   definition := regexp_replace(definition,'\mBEGIN\M',
    'BEGIN' || E'\n' || '  IF coalesce(auth.jwt()->>''role'','''') <> ''service_role'' AND (auth.uid() IS NULL OR auth.uid() IS DISTINCT FROM '||actor_param||') THEN RAISE insufficient_privilege USING MESSAGE = ''Only your own account can be updated.''; END IF;', 'i');
   execute definition;
  end if;
 end loop;
end $$;
commit;
