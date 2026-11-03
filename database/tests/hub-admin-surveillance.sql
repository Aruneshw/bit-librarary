\set ON_ERROR_STOP on
begin;
create function pg_temp.check_presence(ok boolean,label text) returns void language plpgsql as $$begin if ok is not true then raise exception 'FAILED: %',label; end if; raise notice 'PASS: %',label; end$$;
insert into auth.users(id,email,email_confirmed_at) values
('50000000-0000-0000-0000-000000000001','surhost@bitsathy.ac.in',now()),
('50000000-0000-0000-0000-000000000002','outsider@bitsathy.ac.in',now()),
('50000000-0000-0000-0000-000000000003','aruneshownsty1@gmail.com',now());
insert into public.profiles select id,email from auth.users where id::text like '50000000%';
set local role authenticated;
select set_config('request.jwt.claim.sub','50000000-0000-0000-0000-000000000001',true);
insert into public.hub_profiles(id,name,department,visibility) values(auth.uid(),'Surveillance Host','CSE','campus');
select public.hub_create_room('{"name":"Monitored bubble","description":"A bubble watched by the administrator","category":"AI/ML","capacity":4,"kind":"bubble"}') as room_id \gset
select set_config('test.room',:'room_id',true);
select public.hub_bubble_pulse(:'room_id','60000000-0000-0000-0000-000000000001');
insert into public.hub_messages(room_id,sender_id,body) values(:'room_id',auth.uid(),'Room activity one');
select set_config('request.jwt.claim.sub','50000000-0000-0000-0000-000000000002',true);
insert into public.hub_profiles(id,name,department,visibility) values(auth.uid(),'Curious Student','CSE','campus');
select pg_temp.check_presence((select count(*)=0 from public.hub_messages where room_id=:'room_id'),'student cannot read another room timeline');
select pg_temp.check_presence((select count(*)=0 from public.hub_room_presence where room_id=:'room_id'),'student cannot read another room presence');
do $$begin
 begin perform public.hub_admin_surveillance(); raise exception 'Student read surveillance';
 exception when insufficient_privilege then if sqlerrm <> 'Administrator access required.' then raise; end if; raise notice 'PASS: student surveillance denied'; end;
 begin perform public.hub_admin_activity(100); raise exception 'Student read activity';
 exception when insufficient_privilege then raise notice 'PASS: student activity denied'; end;
 begin perform public.hub_admin_cancel_room(current_setting('test.room')::uuid,'abuse'); raise exception 'Student cancelled room';
 exception when insufficient_privilege then raise notice 'PASS: student cancel denied'; end;
end$$;
select set_config('request.jwt.claim.sub','50000000-0000-0000-0000-000000000003',true);
select pg_temp.check_presence(hub_private.is_reviewer(),'named administrator passes reviewer checks');
select pg_temp.check_presence((select count(*)=1 from (select jsonb_array_elements(public.hub_admin_surveillance()) as e) sv where sv.e->>'id'=current_setting('test.room')::text and (sv.e->>'online_count')::int=1 and (sv.e->>'member_count')::int=1),'administrator sees every room with live counts');
select pg_temp.check_presence((select count(*)=1 from (select jsonb_array_elements(public.hub_admin_activity(100)) as e) sv where sv.e->>'body'='Room activity one' and sv.e->>'sender_name'='Surveillance Host'),'administrator reads cross-room message logs');
select pg_temp.check_presence((select count(*)=1 from public.hub_messages where room_id=:'room_id'),'administrator streams messages from rooms they never joined');
select pg_temp.check_presence((select count(*)=1 from public.hub_room_presence where room_id=:'room_id'),'administrator streams live presence');
do $$begin
 begin select count(*) from hub_private.hub_admin_actions; raise exception 'Browser role read the audit trail';
 exception when insufficient_privilege then raise notice 'PASS: audit trail is unreachable from browser roles'; end;
end$$;
select public.hub_admin_cancel_room(:'room_id','misuse') as outcome \gset
select set_config('test.outcome',:'outcome',true);
select pg_temp.check_presence((select not exists(select 1 from public.hub_rooms where id=current_setting('test.room')::uuid) and not exists(select 1 from public.hub_messages where room_id=current_setting('test.room')::uuid) and not exists(select 1 from public.hub_room_presence where room_id=current_setting('test.room')::uuid)),'cancelling removes the room with its messages and presence');
select pg_temp.check_presence((select current_setting('test.outcome')::jsonb->>'name'='Monitored bubble'),'cancel returns the removed room snapshot');
reset role;
select pg_temp.check_presence((select count(*)=1 from public.hub_notifications where source_key like 'admin-cancel:'||current_setting('test.room')||'%'),'room owner receives cancellation notice');
select pg_temp.check_presence((select count(*)>=2 from hub_private.hub_admin_actions where admin_id='50000000-0000-0000-0000-000000000003' and action in ('surveillance','activity')),'surveillance reads are audited');
select pg_temp.check_presence((select count(*)=1 from hub_private.hub_admin_actions where action='cancel_room' and detail like '%misuse%'),'cancellation is attributed and audited');
rollback;
