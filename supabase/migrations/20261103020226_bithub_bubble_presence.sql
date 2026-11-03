begin;
-- Only server-authenticated members can announce presence or read a roster.
create table public.hub_room_presence (
 room_id uuid not null,
 user_id uuid not null,
 session_id uuid not null,
 seen_at timestamptz not null default now(),
 primary key(room_id,user_id,session_id),
 foreign key(room_id,user_id) references public.hub_room_members(room_id,user_id) on delete cascade
);
alter table public.hub_room_presence enable row level security;
create policy hub_presence_read on public.hub_room_presence for select to authenticated
 using ((select hub_private.is_student()) and hub_private.is_member(room_id));
revoke all on public.hub_room_presence from anon,authenticated;
grant select on public.hub_room_presence to authenticated;
create function hub_private.bubble_pulse(room uuid, session uuid, exiting boolean default false)
returns void language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not hub_private.is_student() or not hub_private.is_member(room) then
  raise exception 'Join this room before entering its live zone.';
 end if;
 if exiting then
  delete from public.hub_room_presence where room_id=room and user_id=auth.uid() and session_id=session;
 else
  delete from public.hub_room_presence where room_id=room and user_id=auth.uid() and seen_at < now()-interval '2 minutes';
  insert into public.hub_room_presence(room_id,user_id,session_id) values(room,auth.uid(),session)
  on conflict(room_id,user_id,session_id) do update set seen_at=now();
 end if;
end $$;
create function hub_private.bubble_roster(room uuid)
returns table(id uuid,name text,joined_at timestamptz,online boolean)
language plpgsql stable security definer set search_path='' as $$
begin
 if auth.uid() is null or not hub_private.is_student() or not hub_private.is_member(room) then
  raise exception 'Join this room before viewing its participants.';
 end if;
 return query select p.id,p.name,m.joined_at,exists(
  select 1 from public.hub_room_presence s where s.room_id=room and s.user_id=p.id and s.seen_at>now()-interval '45 seconds'
 ) from public.hub_room_members m join public.hub_profiles p on p.id=m.user_id
 where m.room_id=room order by m.joined_at,p.id;
end $$;
revoke all on function hub_private.bubble_pulse(uuid,uuid,boolean),hub_private.bubble_roster(uuid) from public,anon;
grant execute on function hub_private.bubble_pulse(uuid,uuid,boolean),hub_private.bubble_roster(uuid) to authenticated;
create function public.hub_bubble_pulse(room uuid,session uuid,exiting boolean default false)
returns void language sql security invoker set search_path='' as $$ select hub_private.bubble_pulse(room,session,exiting) $$;
create function public.hub_bubble_roster(room uuid)
returns table(id uuid,name text,joined_at timestamptz,online boolean)
language sql stable security invoker set search_path='' as $$ select * from hub_private.bubble_roster(room) $$;
revoke all on function public.hub_bubble_pulse(uuid,uuid,boolean),public.hub_bubble_roster(uuid) from public,anon;
grant execute on function public.hub_bubble_pulse(uuid,uuid,boolean),public.hub_bubble_roster(uuid) to authenticated;
do $$ begin
 if exists(select 1 from pg_publication where pubname='supabase_realtime') then
  alter publication supabase_realtime add table public.hub_room_presence;
 end if;
end $$;
commit;
