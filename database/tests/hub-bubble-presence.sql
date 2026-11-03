\set ON_ERROR_STOP on
begin;
create function pg_temp.check_presence(ok boolean,label text) returns void language plpgsql as $$begin if ok is not true then raise exception 'FAILED: %',label; end if; raise notice 'PASS: %',label; end$$;
insert into auth.users(id,email,email_confirmed_at) values
('30000000-0000-0000-0000-000000000001','bubble1@bitsathy.ac.in',now()),
('30000000-0000-0000-0000-000000000002','bubble2@bitsathy.ac.in',now());
insert into public.profiles select id,email from auth.users where id::text like '30000000%';
set local role authenticated;
select set_config('request.jwt.claim.sub','30000000-0000-0000-0000-000000000001',true);
insert into public.hub_profiles(id,name,department,visibility) values(auth.uid(),'Private Host','CSE','private');
select public.hub_create_room('{"name":"Presence test","description":"Testing room membership presence","category":"AI/ML","capacity":2,"kind":"bubble"}') as room_id \gset
select set_config('test.room',:'room_id',true);
select public.hub_bubble_pulse(:'room_id','40000000-0000-0000-0000-000000000001');
select public.hub_bubble_pulse(:'room_id','40000000-0000-0000-0000-000000000002');
select pg_temp.check_presence((select count(*)=1 and bool_and(online) from public.hub_bubble_roster(:'room_id')),'two tabs produce one online student');
select public.hub_bubble_pulse(:'room_id','40000000-0000-0000-0000-000000000001',true);
select pg_temp.check_presence((select bool_and(online) from public.hub_bubble_roster(:'room_id')),'closing one tab preserves another tab presence');
select set_config('request.jwt.claim.sub','30000000-0000-0000-0000-000000000002',true);
insert into public.hub_profiles(id,name,department) values(auth.uid(),'Second Student','CSE');
select pg_temp.check_presence((select count(*)=0 from public.hub_room_presence),'nonmember cannot read presence');
do $$begin
 begin perform public.hub_bubble_roster(current_setting('test.room')::uuid); raise exception 'Nonmember read roster'; exception when raise_exception then if sqlerrm <> 'Join this room before viewing its participants.' then raise; end if; raise notice 'PASS: nonmember roster denied'; end;
 begin perform public.hub_bubble_pulse(current_setting('test.room')::uuid,gen_random_uuid()); raise exception 'Nonmember pulsed'; exception when raise_exception then if sqlerrm <> 'Join this room before entering its live zone.' then raise; end if; raise notice 'PASS: nonmember presence denied'; end;
 begin insert into public.hub_room_presence values(current_setting('test.room')::uuid,auth.uid(),gen_random_uuid(),now()); raise exception 'Raw presence insert permitted'; exception when insufficient_privilege then raise notice 'PASS: raw presence spoof denied'; end;
end$$;
select public.hub_join_room(:'room_id');
select pg_temp.check_presence((select count(*)=2 from public.hub_bubble_roster(:'room_id')),'members see private-profile display names inside their room');
select public.hub_bubble_pulse(:'room_id','40000000-0000-0000-0000-000000000003');
delete from public.hub_room_members where room_id=:'room_id' and user_id=auth.uid();
reset role;
select pg_temp.check_presence((select count(*)=0 from public.hub_room_presence where user_id='30000000-0000-0000-0000-000000000002'),'leaving membership removes presence');
update public.hub_room_presence set seen_at=now()-interval '46 seconds';
set local role authenticated;
select set_config('request.jwt.claim.sub','30000000-0000-0000-0000-000000000001',true);
select pg_temp.check_presence((select not bool_or(online) from public.hub_bubble_roster(:'room_id')),'disconnected sessions expire');
rollback;
