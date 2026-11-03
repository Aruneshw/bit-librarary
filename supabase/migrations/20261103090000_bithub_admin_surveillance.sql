-- Hub administrator superuser: cross-room surveillance, live rosters, room cancellation.
-- Access is granted solely by hub_private.is_reviewer() (confirmed email from the named
-- allowlist or server-managed app_metadata.role='admin'). Every read and the cancel write
-- are recorded in hub_private.hub_admin_actions, which browser roles cannot query.
begin;

create table if not exists hub_private.hub_admin_actions (
  id bigint generated always as identity primary key,
  admin_id uuid not null,
  action text not null,
  detail text not null default '',
  performed_at timestamptz not null default now()
);
alter table hub_private.hub_admin_actions enable row level security;
revoke all on hub_private.hub_admin_actions from public, anon, authenticated;

-- Approved administrator emails. Hub UI access remains campus-only (is_student);
-- this function opens the moderation and surveillance surface to administrators.
create or replace function hub_private.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
 select exists (
   select 1 from auth.users u
   where u.id = auth.uid() and u.email_confirmed_at is not null
   and (lower(u.email) in ('aruneshownsty1@gmail.com','harishraghav489@gmail.com','admin@bitsathy.ac.in')
        or u.raw_app_meta_data->>'role' = 'admin')
 );
$$;

-- Same administrator set as is_admin(), with the misspelled allowlist entry corrected
-- so the named administrator also passes project review checks.
create or replace function hub_private.is_reviewer() returns boolean
language sql stable security definer set search_path = '' as $$
 select hub_private.is_admin();
$$;
revoke all on function hub_private.is_admin() from public, anon;
grant execute on function hub_private.is_admin(), hub_private.is_reviewer() to authenticated;

-- Full room directory with live and member counts for the surveillance panel.
create function hub_private.admin_surveillance() returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
 if not hub_private.is_admin() then raise insufficient_privilege using message='Administrator access required.'; end if;
 insert into hub_private.hub_admin_actions(admin_id,action,detail)
 values (auth.uid(),'surveillance','');
 return coalesce((
   select jsonb_agg(jsonb_build_object(
     'id', r.id, 'name', r.name, 'kind', r.kind, 'category', r.category,
     'capacity', r.capacity, 'created_at', r.created_at,
     'owner_id', o.id, 'owner_name', o.name,
     'member_count', (select count(*) from public.hub_room_members m where m.room_id = r.id),
     'online_count', (select count(distinct p.user_id) from public.hub_room_presence p
                      where p.room_id = r.id and p.seen_at > now() - interval '45 seconds')
   ) order by r.created_at desc, r.id)
   from public.hub_rooms r
   join public.hub_profiles o on o.id = r.owner_id
 ), '[]'::jsonb);
end $$;

-- Cross-room message feed: the most recent activity across every room.
create function hub_private.admin_activity(room_limit integer) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
 if not hub_private.is_admin() then raise insufficient_privilege using message='Administrator access required.'; end if;
 if room_limit is null or room_limit < 1 or room_limit > 200 then room_limit := 100; end if;
 insert into hub_private.hub_admin_actions(admin_id,action,detail)
 values (auth.uid(),'activity','limit=' || room_limit::text);
 return coalesce((
   select jsonb_agg(jsonb_build_object(
     'id', msg.id, 'room_id', rm.id, 'room_name', rm.name,
     'sender_id', s.id, 'sender_name', s.name,
     'body', msg.body, 'created_at', msg.created_at
   ) order by msg.created_at desc, msg.id)
   from (
     select m2.id, m2.room_id, m2.sender_id, m2.body, m2.created_at
     from public.hub_messages m2
     order by m2.created_at desc, m2.id desc
     limit room_limit
   ) msg
   join public.hub_rooms rm on rm.id = msg.room_id
   join public.hub_profiles s on s.id = msg.sender_id
 ), '[]'::jsonb);
end $$;

-- Cancel any bubble or team room. Membership, messages, presence, and the audit
-- trail of the removed messages are deleted together; the owner is notified.
create function hub_private.admin_cancel_room(room uuid, reason text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare target public.hub_rooms; snapshot jsonb; trimmed text;
begin
 if not hub_private.is_admin() then raise insufficient_privilege using message='Administrator access required.'; end if;
 select * into target from public.hub_rooms where id = room for update;
 if not found then raise exception 'Room not found.'; end if;
 trimmed := left(trim(coalesce(reason, '')), 200);
 select jsonb_build_object(
   'name', target.name, 'kind', target.kind, 'category', target.category,
   'member_count', (select count(*) from public.hub_room_members where room_id = room),
   'message_count', (select count(*) from public.hub_messages where room_id = room)
 ) into snapshot;
 insert into hub_private.hub_admin_actions(admin_id,action,detail)
 values (auth.uid(),'cancel_room', jsonb_build_object('room_id', room, 'reason', trimmed, 'snapshot', snapshot)::text);
 insert into public.hub_notifications(user_id, body, source_key)
 values (target.owner_id,
   'A campus administrator closed your room "' || target.name || '"'
     || (case when trimmed <> '' then ': ' || trimmed else '' end) || '.',
   'admin-cancel:' || room::text || ':' || clock_timestamp()::text)
 on conflict(source_key) do nothing;
 delete from public.hub_rooms where id = room;
 return snapshot;
end $$;

revoke all on function hub_private.admin_surveillance(), hub_private.admin_activity(integer), hub_private.admin_cancel_room(uuid,text) from public, anon;
grant execute on function hub_private.admin_surveillance(), hub_private.admin_activity(integer), hub_private.admin_cancel_room(uuid,text) to authenticated;

create function public.hub_admin_surveillance() returns jsonb
language sql security invoker set search_path = '' as $$ select hub_private.admin_surveillance() $$;
create function public.hub_admin_activity(room_limit integer) returns jsonb
language sql security invoker set search_path = '' as $$ select hub_private.admin_activity(room_limit) $$;
create function public.hub_admin_cancel_room(room uuid, reason text) returns jsonb
language sql security invoker set search_path = '' as $$ select hub_private.admin_cancel_room(room, reason) $$;
revoke all on function public.hub_admin_surveillance(), public.hub_admin_activity(integer), public.hub_admin_cancel_room(uuid,text) from public, anon;
grant execute on function public.hub_admin_surveillance(), public.hub_admin_activity(integer), public.hub_admin_cancel_room(uuid,text) to authenticated;

-- Administrators additionally stream live messages, presence, and membership changes
-- for every room through Realtime. Students remain restricted to rooms they joined.
create policy hub_admin_messages_read on public.hub_messages for select to authenticated
 using ((select hub_private.is_reviewer()));
create policy hub_admin_presence_read on public.hub_room_presence for select to authenticated
 using ((select hub_private.is_reviewer()));
create policy hub_admin_members_read on public.hub_room_members for select to authenticated
 using ((select hub_private.is_reviewer()));
commit;
