\set ON_ERROR_STOP on
begin;
create function pg_temp.check_presence(ok boolean,label text) returns void language plpgsql as $$begin if ok is not true then raise exception 'FAILED: %',label; end if; raise notice 'PASS: %',label; end$$;
insert into auth.users(id,email,email_confirmed_at) values
('70000000-0000-0000-0000-000000000001','teamhost@bitsathy.ac.in',now()),
('70000000-0000-0000-0000-000000000002','mate1@bitsathy.ac.in',now()),
('70000000-0000-0000-0000-000000000003','mate2@bitsathy.ac.in',now()),
('70000000-0000-0000-0000-000000000004','wanderer@bitsathy.ac.in',now());
insert into public.profiles select id,email from auth.users where id::text like '70000000%';
set local role authenticated;
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000001',true);
insert into public.hub_profiles(id,name,department,visibility) values(auth.uid(),'Team Host','CSE','campus');
select public.hub_create_room('{"name":"Hack night team","description":"A team bubble for the weekend hackathon","category":"AI/ML","capacity":4,"kind":"team"}') as room_id \gset
select set_config('test.room',:'room_id',true);
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000002',true);
insert into public.hub_profiles(id,name,department,visibility) values(auth.uid(),'Mate One','CSE','campus');
select pg_temp.check_presence((select count(*)>=1 from public.hub_room_directory where id=current_setting('test.room')::uuid),'any student sees every room in the directory');
select public.hub_join_room(:'room_id');
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000003',true);
insert into public.hub_profiles(id,name,department,visibility) values(auth.uid(),'Mate Two','CSE','campus');
select public.hub_join_room(:'room_id');
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000004',true);
insert into public.hub_profiles(id,name,department,visibility) values(auth.uid(),'Wandering Student','CSE','campus');
select public.hub_create_room('{"name":"Second bubble","description":"A place the wanderer joins first","category":"Cloud","capacity":3,"kind":"bubble"}') as room2 \gset
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000002',true);
select public.hub_join_room(:'room2');
select pg_temp.check_presence((select count(*)=1 from public.hub_room_members where user_id='70000000-0000-0000-0000-000000000002'),'joining a room moves you out of your previous room');
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000004',true);
do $$begin
 begin perform public.hub_set_typing(current_setting('test.room')::uuid,true); raise exception 'Former member pulsed typing';
 exception when raise_exception then if sqlerrm <> 'Join this room before using its typing indicator.' then raise; end if; raise notice 'PASS: typing requires membership'; end;
end$$;
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000003',true);
select set_config('test.typingmate',auth.uid()::text,true);
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000001',true);
select public.hub_set_typing(:'room_id',true) is null as t1;
select pg_temp.check_presence((select count(*)=1 and bool_and(typing) from public.hub_bubble_roster(:'room_id') where id=auth.uid()),'host typing shows in the live roster');
select public.hub_set_typing(:'room_id',false);
select pg_temp.check_presence((select not bool_or(typing) from public.hub_bubble_roster(:'room_id')),'clearing typing empties the indicator');
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000003',true);
do $$begin
 begin perform public.hub_remove_member(current_setting('test.room')::uuid,'70000000-0000-0000-0000-000000000001'); raise exception 'Non-host removed the host';
 exception when raise_exception then if sqlerrm <> 'Only the room host can remove members.' then raise; end if; raise notice 'PASS: member removal needs the host'; end;
end$$;
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000001',true);
do $$begin
 begin perform public.hub_remove_member(current_setting('test.room')::uuid,auth.uid()); raise exception 'Host removed self via kick';
 exception when raise_exception then if sqlerrm <> 'Use exit room to leave your own room.' then raise; end if; raise notice 'PASS: host exits instead of self-kick'; end;
end$$;
select public.hub_invite_members(:'room_id','["70000000-0000-0000-0000-000000000004","70000000-0000-0000-0000-000000000001"]'::jsonb) as invited \gset
select pg_temp.check_presence((:'invited')::int=1,'host invites campus students and not themselves');
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000004',true);
select pg_temp.check_presence((select count(*)=1 and bool_and(status='pending') from public.hub_room_invites where invitee_id=auth.uid() and room_id=:'room_id'),'invited student sees the pending invitation');
do $$begin
 begin perform public.hub_respond_invite(gen_random_uuid(),true); raise exception 'Random invite accepted';
 exception when raise_exception then if sqlerrm <> 'Invitation not found.' then raise; end if; raise notice 'PASS: unknown invitation rejected'; end;
end$$;
select id as invite_id from public.hub_room_invites where invitee_id=auth.uid() and room_id=:'room_id' \gset
select public.hub_respond_invite(:'invite_id'::uuid,true);
select pg_temp.check_presence((select count(*)=1 from public.hub_room_members where room_id=:'room_id' and user_id=auth.uid()),'accepting the invitation joins the team room');
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000001',true);
do $$begin
 begin perform public.hub_finalize_team(current_setting('test.room')::uuid,'["70000000-0000-0000-0000-000000000001","70000000-0000-0000-0000-000000000003"]'::jsonb,now()-interval '1 hour'); raise exception 'Past date accepted';
 exception when raise_exception then if sqlerrm <> 'Choose a future hackathon end date.' then raise; end if; raise notice 'PASS: past end date rejected'; end;
 begin perform public.hub_finalize_team(current_setting('test.room')::uuid,'["70000000-0000-0000-0000-000000000001"]'::jsonb,now()+interval '1 day'); raise exception 'Solo team finalised';
 exception when raise_exception then if sqlerrm <> 'Select at least two team members, including yourself.' then raise; end if; raise notice 'PASS: solo team rejected'; end;
 begin perform public.hub_finalize_team(current_setting('test.room')::uuid,'["70000000-0000-0000-0000-000000000001","70000000-0000-0000-0000-000000000002"]'::jsonb,now()+interval '1 day'); raise exception 'Outsider finalised';
 exception when raise_exception then if sqlerrm <> 'Only students already in the room can be selected.' then raise; end if; raise notice 'PASS: only room members can be finalists'; end;
end$$;
select public.hub_finalize_team(:'room_id','["70000000-0000-0000-0000-000000000001","70000000-0000-0000-0000-000000000004"]'::jsonb,now()+interval '2 hours');
select pg_temp.check_presence((select count(*)=2 and bool_and(team_status='finalist') from public.hub_room_members where room_id=:'room_id'),'finalising keeps finalists and removes the rest');
do $$begin
 begin perform public.hub_invite_members(current_setting('test.room')::uuid,'["70000000-0000-0000-0000-000000000003"]'::jsonb); raise exception 'Invite after finalise';
 exception when raise_exception then if sqlerrm <> 'This team is already finalised.' then raise; end if; raise notice 'PASS: finalised teams take no new invites'; end;
end$$;
reset role;
update public.hub_rooms set hackathon_ends_at=now()-interval '1 minute' where id=:'room_id';
set local role authenticated;
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000001',true);
select pg_temp.check_presence((select not exists(select 1 from public.hub_room_directory where id=current_setting('test.room')::uuid)),'expired team vanishes from the directory');
select public.hub_create_room('{"name":"Post expiry bubble","description":"A fresh bubble created after teams expired","category":"Cloud","capacity":3,"kind":"bubble"}');
select pg_temp.check_presence((select not exists(select 1 from public.hub_rooms where id=current_setting('test.room')::uuid)),'expiry deletes the finished team from the database');
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000001',true);
do $$begin
 begin perform public.hub_join_room(current_setting('test.room')::uuid); raise exception 'Cancelled room joined';
 exception when raise_exception then if sqlerrm <> 'Room not found.' then raise; end if; raise notice 'PASS: cancelled room no longer joinable'; end;
end$$;
select set_config('request.jwt.claim.sub','70000000-0000-0000-0000-000000000004',true);
select public.hub_cancel_room(:'room2','') is not null as cancelled;
select pg_temp.check_presence((select not exists(select 1 from public.hub_rooms where id=:'room2'::uuid)),'host cancels their own room');
reset role;
select pg_temp.check_presence((select count(*)=1 from hub_private.hub_admin_actions where action='host_cancel' and admin_id='70000000-0000-0000-0000-000000000004'),'host cancellations are audited');
select pg_temp.check_presence((select count(*)=1 from public.hub_notifications where user_id='70000000-0000-0000-0000-000000000004' and source_key like 'final-team:%'),'finalists receive the team confirmation');
rollback;
