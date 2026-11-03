-- Bubble and team lifecycle: every student can see all rooms, join is atomic with a
-- one-room-per-user limit, hosts cancel rooms and remove members, team invites have a
-- full accept/decline flow with finalisation, a hackathon end date, automatic team
-- expiry, and per-room live typing indicators.
begin;

alter table public.hub_rooms
  add column if not exists hackathon_ends_at timestamptz,
  add column if not exists finalized_at timestamptz;

alter table public.hub_room_members
  add column if not exists team_status text not null default 'member'
    check(team_status in ('member','finalist'));

create table public.hub_room_invites (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.hub_rooms(id) on delete cascade,
  inviter_id uuid not null references public.hub_profiles(id) on delete cascade,
  invitee_id uuid not null references public.hub_profiles(id) on delete cascade,
  status text not null default 'pending' check(status in ('pending','accepted','declined')),
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  check(inviter_id <> invitee_id)
);
create unique index hub_room_invites_pair_idx on public.hub_room_invites(room_id,invitee_id);
create index hub_room_invites_invitee_idx on public.hub_room_invites(invitee_id,status);

create table public.hub_room_typing (
  room_id uuid not null references public.hub_rooms(id) on delete cascade,
  user_id uuid not null,
  typed_at timestamptz not null default now(),
  primary key(room_id,user_id),
  foreign key(room_id,user_id) references public.hub_room_members(room_id,user_id) on delete cascade
);

-- Host actions run as definer: membership RLS deliberately prevents students from
-- deleting other people's rows, so removals and cancellations go through these checks.
create function hub_private.cancel_room(room uuid, reason text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target public.hub_rooms; snapshot jsonb; actor uuid := auth.uid(); trimmed text;
begin
 select * into target from public.hub_rooms where id = room for update;
 if not found then raise exception 'Room not found.'; end if;
 if target.owner_id <> actor and not hub_private.is_reviewer() then
  raise exception 'Only the room host can close this room.';
 end if;
 trimmed := left(trim(coalesce(reason,'')),200);
 select jsonb_build_object('name',target.name,'kind',target.kind,'category',target.category,
   'member_count',(select count(*) from public.hub_room_members where room_id=room),
   'message_count',(select count(*) from public.hub_messages where room_id=room)) into snapshot;
 if target.owner_id <> actor then
  insert into public.hub_notifications(user_id,body,source_key)
   values(target.owner_id,'A campus administrator closed your room "'||target.name||'"'||(case when trimmed<>'' then ': '||trimmed else '' end)||'.',
     'admin-cancel:'||room::text||':'||clock_timestamp()::text) on conflict(source_key) do nothing;
  insert into hub_private.hub_admin_actions(admin_id,action,detail)
   values (actor,'cancel_room', jsonb_build_object('room_id',room,'reason',trimmed,'snapshot',snapshot)::text);
 else
  perform 1 from public.hub_profiles where id=actor for update;
  insert into public.hub_notifications(user_id,body,source_key)
   select m.user_id,'Your room "'||target.name||'" was closed by its host.','host-cancel:'||room::text||':'||m.user_id::text
   from public.hub_room_members m where m.room_id=room and m.user_id<>actor
   on conflict(source_key) do nothing;
  insert into hub_private.hub_admin_actions(admin_id,action,detail)
   values (actor,'host_cancel', jsonb_build_object('room_id',room,'snapshot',snapshot)::text);
 end if;
 delete from public.hub_rooms where id = room;
 return snapshot;
end $$;

create function hub_private.remove_member(room uuid, member uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare actor uuid := auth.uid(); owner uuid; name_text text;
begin
 perform 1 from public.hub_profiles where id=actor for update;
 if not hub_private.is_student() then raise exception 'Sign in with a verified BIT student account.'; end if;
 select r.owner_id into owner from public.hub_rooms r where r.id=room for update;
 if owner is null then raise exception 'Room not found.'; end if;
 if owner <> actor then raise exception 'Only the room host can remove members.'; end if;
 if member = actor then raise exception 'Use exit room to leave your own room.'; end if;
 select p.name into name_text from public.hub_profiles p where p.id=member;
 if not exists(select 1 from public.hub_room_members m where m.room_id=room and m.user_id=member) then
  raise exception 'That student is not in this room.';
 end if;
 delete from public.hub_room_members where room_id=room and user_id=member;
 insert into public.hub_notifications(user_id,body,source_key)
  values(member,'The host removed you from the room "'||
    (select r.name from public.hub_rooms r where r.id=room)||'".','removed:'||room::text||':'||member::text)
  on conflict(source_key) do nothing;
end $$;

-- One room per student, enforced atomically: joining moves you out of any other room.
drop function if exists hub_private.join_room(uuid);
create function hub_private.join_room(room uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare actor uuid; capacity_limit integer; occupants integer;
begin
 actor := hub_private.require_profile();
 select capacity into capacity_limit from public.hub_rooms where id=room for update;
 if not found then raise exception 'Room not found.'; end if;
 if exists(select 1 from public.hub_room_members where room_id=room and user_id=actor) then return; end if;
 delete from public.hub_room_members where user_id=actor;
 select count(*) into occupants from public.hub_room_members where room_id=room;
 if occupants >= capacity_limit then raise exception 'This room is full. Try another bubble.'; end if;
 insert into public.hub_room_members(room_id,user_id) values(room,actor);
end $$;

-- Team invitations. The host invites; only invited students can accept, and accepting
-- routes through the one-room join rule.
create function hub_private.invite_members(room uuid, members jsonb) returns integer
language plpgsql security definer set search_path = '' as $$
declare actor uuid; owner uuid; invited integer := 0; target uuid; room_name text; wanted uuid[];
begin
 actor := auth.uid();
 if actor is null then raise exception 'Please sign in first.'; end if;
 perform 1 from public.hub_profiles where id=actor for update;
 if not hub_private.is_student() then raise exception 'Sign in with a verified BIT student account.'; end if;
 select r.owner_id, r.name into owner, room_name from public.hub_rooms r where r.id=room for update;
 if owner is null then raise exception 'Room not found.'; end if;
 if owner <> actor and not hub_private.is_reviewer() then raise exception 'Only the room host can invite students.'; end if;
 if exists(select 1 from public.hub_rooms h where h.id=room and h.finalized_at is not null) then
  raise exception 'This team is already finalised.';
 end if;
 select array_agg(x::uuid) into wanted from jsonb_array_elements_text(coalesce(members,'[]'::jsonb)) x;
 if wanted is null then return 0; end if;
 foreach target in array wanted loop
  if target = actor then continue; end if;
  if exists(select 1 from public.hub_profiles p where p.id=target and p.visibility='campus')
     and not exists(select 1 from public.hub_room_members m where m.room_id=room and m.user_id=target) then
   insert into public.hub_room_invites(room_id,inviter_id,invitee_id) values(room,actor,target)
    on conflict(room_id,invitee_id) do update set status='pending', responded_at=null, created_at=now();
   -- A re-invite must be able to notify again, so retire the stale notice first.
   delete from public.hub_notifications where source_key = 'invite:'||room::text||':'||target::text;
   insert into public.hub_notifications(user_id,body,source_key)
    values(target,'The host invited you to join the team room "'||room_name||'".','invite:'||room::text||':'||target::text);
   invited := invited + 1;
  end if;
 end loop;
 return invited;
end $$;

create function hub_private.respond_invite(invite uuid, accept boolean) returns void
language plpgsql security definer set search_path = '' as $$
declare actor uuid := auth.uid(); target public.hub_room_invites;
begin
 perform 1 from public.hub_profiles where id=actor for update;
 if not hub_private.is_student() then raise exception 'Sign in with a verified BIT student account.'; end if;
 select * into target from public.hub_room_invites where id=invite for update;
 if not found or target.invitee_id <> actor then raise exception 'Invitation not found.'; end if;
 if target.status <> 'pending' then return; end if;
 update public.hub_room_invites set status=case when accept then 'accepted' else 'declined' end,
   responded_at=now() where id=invite;
 if accept then
   perform hub_private.join_room(target.room_id);
   update public.hub_room_members set team_status='member' where room_id=target.room_id and user_id=actor;
 end if;
end $$;

-- The host finalises the team: chosen students become finalists, everyone else leaves,
-- and the hackathon end date is stamped. After that date the whole team room is removed.
create function hub_private.finalize_team(room uuid, finalists jsonb, ends_at timestamptz) returns void
language plpgsql security definer set search_path = '' as $$
declare actor uuid; owner uuid; chosen uuid[]; room_name text;
begin
 actor := hub_private.require_profile();
 select r.owner_id, r.name into owner, room_name from public.hub_rooms r where r.id=room for update;
 if owner is null then raise exception 'Room not found.'; end if;
 if owner <> actor and not hub_private.is_reviewer() then raise exception 'Only the room host can finalise the team.'; end if;
 if ends_at is null or ends_at <= now() then raise exception 'Choose a future hackathon end date.'; end if;
 if jsonb_array_length(finalists) < 2 then raise exception 'Select at least two team members, including yourself.'; end if;
 if jsonb_array_length(finalists) > (select capacity from public.hub_rooms where id=room) then
  raise exception 'The team is larger than the room capacity.';
 end if;
 select array_agg(x::uuid) into chosen from jsonb_array_elements_text(finalists) x;
 if actor <> owner and not hub_private.is_reviewer() then
  if not actor = any(chosen) then raise exception 'You must include yourself in the team.'; end if;
 end if;
 if not chosen <@ (select array_agg(m.user_id) from public.hub_room_members m where m.room_id=room) then
  raise exception 'Only students already in the room can be selected.';
 end if;
 update public.hub_room_members set team_status='finalist' where room_id=room and user_id=any(chosen);
 delete from public.hub_room_members where room_id=room and not (user_id=any(chosen));
 update public.hub_rooms set finalized_at=now(), hackathon_ends_at=ends_at where id=room;
 insert into public.hub_notifications(user_id,body,source_key)
  select m.user_id,'You are on the final team for "'||room_name||'". Good luck at the hackathon!',
    'final-team:'||room::text||':'||m.user_id::text
  from public.hub_room_members m where m.room_id=room on conflict(source_key) do nothing;
end $$;

-- Expired teams are removed from the database entirely. Runs on a timer where pg_cron
-- is available and lazily whenever the directory or a mutation is touched.
create function hub_private.expire_teams() returns integer
language plpgsql security definer set search_path = '' as $$
declare removed integer;
begin
 with gone as (
   delete from public.hub_rooms
   where kind='team' and hackathon_ends_at is not null and hackathon_ends_at <= now()
   returning 1)
 select count(*) into removed from gone;
 return removed;
end $$;

-- Live typing indicator: fresh for six seconds, cleared explicitly on send.
create function hub_private.set_typing(room uuid, typing boolean) returns void
language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null or not hub_private.is_student() or not hub_private.is_member(room) then
  raise exception 'Join this room before using its typing indicator.';
 end if;
 if typing then
  insert into public.hub_room_typing(room_id,user_id,typed_at) values(room,auth.uid(),now())
   on conflict(room_id,user_id) do update set typed_at=now();
 else
  delete from public.hub_room_typing where room_id=room and user_id=auth.uid();
 end if;
end $$;

-- The roster now also reports who is typing right now.
drop function if exists public.hub_bubble_roster(uuid);
drop function if exists hub_private.bubble_roster(uuid);
create function hub_private.bubble_roster(room uuid)
returns table(id uuid,name text,joined_at timestamptz,online boolean,typing boolean,team_status text)
language plpgsql stable security definer set search_path='' as $$
begin
 if auth.uid() is null or not hub_private.is_student() or not hub_private.is_member(room) then
  raise exception 'Join this room before viewing its participants.';
 end if;
 return query select p.id,p.name,m.joined_at,
  exists(select 1 from public.hub_room_presence s where s.room_id=room and s.user_id=p.id and s.seen_at>now()-interval '45 seconds'),
  exists(select 1 from public.hub_room_typing t where t.room_id=room and t.user_id=p.id and t.typed_at>now()-interval '6 seconds'),
  m.team_status
  from public.hub_room_members m join public.hub_profiles p on p.id=m.user_id
  where m.room_id=room order by m.joined_at,p.id;
end $$;
create function public.hub_bubble_roster(room uuid)
returns table(id uuid,name text,joined_at timestamptz,online boolean,typing boolean,team_status text)
language sql stable security invoker set search_path='' as $$ select * from hub_private.bubble_roster(room) $$;

-- Room directory: hosts and members see invites/finalisation state; expired teams vanish.
drop view if exists public.hub_room_directory;
create view public.hub_room_directory with(security_invoker=true) as
 select r.*,hub_private.room_size(r.id)::integer as member_count,hub_private.is_member(r.id) as is_member,
 (r.owner_id=(select auth.uid())) as is_host
 from public.hub_rooms r
 where r.kind <> 'team' or r.hackathon_ends_at is null or r.hackathon_ends_at > now();
grant select on public.hub_room_directory to authenticated,service_role;
revoke all on public.hub_room_directory from anon;

create policy hub_invites_read on public.hub_room_invites for select to authenticated
 using ((select hub_private.is_student()) and (inviter_id=(select auth.uid()) or invitee_id=(select auth.uid())));
create policy hub_typing_read on public.hub_room_typing for select to authenticated
 using ((select hub_private.is_student()) and hub_private.is_member(room_id));

revoke all on table public.hub_room_invites,public.hub_room_typing from anon;
grant select on public.hub_room_invites,public.hub_room_typing to authenticated;

revoke all on function hub_private.cancel_room(uuid,text),hub_private.remove_member(uuid,uuid),
 hub_private.join_room(uuid),hub_private.invite_members(uuid,jsonb),hub_private.respond_invite(uuid,boolean),
 hub_private.finalize_team(uuid,jsonb,timestamptz),hub_private.expire_teams(),hub_private.set_typing(uuid,boolean)
 from public,anon;
grant execute on function hub_private.cancel_room(uuid,text),hub_private.remove_member(uuid,uuid),
 hub_private.join_room(uuid),
 hub_private.invite_members(uuid,jsonb),hub_private.respond_invite(uuid,boolean),
 hub_private.finalize_team(uuid,jsonb,timestamptz),hub_private.set_typing(uuid,boolean)
 to authenticated;
grant execute on function hub_private.expire_teams() to service_role;

create function public.hub_cancel_room(room uuid, reason text default '') returns jsonb
language sql security invoker set search_path='' as $$ select hub_private.cancel_room(room,reason) $$;
create function public.hub_remove_member(room uuid, member uuid) returns void
language sql security invoker set search_path='' as $$ select hub_private.remove_member(room,member) $$;
create function public.hub_invite_members(room uuid, members jsonb) returns integer
language sql security invoker set search_path='' as $$ select hub_private.invite_members(room,members) $$;
create function public.hub_respond_invite(invite uuid, accept boolean) returns void
language sql security invoker set search_path='' as $$ select hub_private.respond_invite(invite,accept) $$;
create function public.hub_finalize_team(room uuid, finalists jsonb, ends_at timestamptz) returns void
language sql security invoker set search_path='' as $$ select hub_private.finalize_team(room,finalists,ends_at) $$;
create function public.hub_set_typing(room uuid, typing boolean) returns void
language sql security invoker set search_path='' as $$ select hub_private.set_typing(room,typing) $$;
revoke all on function public.hub_cancel_room(uuid,text),public.hub_remove_member(uuid,uuid),
 public.hub_invite_members(uuid,jsonb),public.hub_respond_invite(uuid,boolean),
 public.hub_finalize_team(uuid,jsonb,timestamptz),public.hub_set_typing(uuid,boolean) from public,anon;
grant execute on function public.hub_cancel_room(uuid,text),public.hub_remove_member(uuid,uuid),
 public.hub_invite_members(uuid,jsonb),public.hub_respond_invite(uuid,boolean),
 public.hub_finalize_team(uuid,jsonb,timestamptz),public.hub_set_typing(uuid,boolean) to authenticated;

-- Expire teams opportunistically before reads and mutations that could create rooms.
create or replace function hub_private.create_room(input jsonb) returns uuid
language plpgsql security definer set search_path='' as $$
declare actor uuid; new_id uuid; cap integer; rules public.hub_policy;
begin
 perform hub_private.expire_teams();
 actor := hub_private.require_profile();
 perform 1 from public.hub_profiles where id=actor for update;
 delete from public.hub_room_members where user_id=actor;
 select * into rules from public.hub_policy where id;
 cap := (input->>'capacity')::integer;
 if cap > rules.max_room_capacity then raise exception 'Room size exceeds campus policy.'; end if;
 if (select count(*) from public.hub_rooms where owner_id=actor) >= rules.max_owned_rooms then raise exception 'You have reached the room limit.'; end if;
 insert into public.hub_rooms(owner_id,name,description,category,capacity,kind)
 values(actor,trim(input->>'name'),trim(input->>'description'),input->>'category',cap,input->>'kind') returning id into new_id;
 insert into public.hub_room_members(room_id,user_id) values(new_id,actor);
 return new_id;
end $$;
grant execute on function hub_private.create_room(jsonb) to authenticated;

do $$ begin
 if exists(select 1 from pg_extension where extname='pg_cron') then
   perform cron.schedule('hub-expire-teams','17 19 * * *','select hub_private.expire_teams()');
 end if;
end $$;

do $$ begin
 if exists(select 1 from pg_publication where pubname='supabase_realtime') then
   alter publication supabase_realtime add table public.hub_room_typing;
 end if;
end $$;
commit;
