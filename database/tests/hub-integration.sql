\set ON_ERROR_STOP on
begin;
create function pg_temp.assert_true(ok boolean,label text) returns void language plpgsql as $$begin if ok is not true then raise exception 'FAILED: %',label; end if; raise notice 'PASS: %',label; end$$;
insert into auth.users(id,email,email_confirmed_at) values
 ('00000000-0000-0000-0000-000000000001','one@bitsathy.ac.in',now()),
 ('00000000-0000-0000-0000-000000000002','two@bitsathy.ac.in',now()),
 ('00000000-0000-0000-0000-000000000003','three@bitsathy.ac.in',now()),
 ('00000000-0000-0000-0000-000000000004','outside@example.com',now());
insert into public.profiles select id,email from auth.users;
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001',true);
insert into public.hub_profiles(id,name,department,bio) values(auth.uid(),'Test One','CSE','A test student builder.');
-- Match PostgREST upsert's SET list to cover profile save permissions.
insert into public.hub_profiles(id,name,department,bio) values(auth.uid(),'Test One','CSE','A test student builder.') on conflict(id) do update set id=excluded.id,name=excluded.name,department=excluded.department,bio=excluded.bio;
select public.hub_create_room('{"name":"Test bubble","description":"A discussion test room","category":"AI/ML","capacity":2,"kind":"bubble"}') as room_id \gset
select pg_temp.assert_true((select member_count=1 and is_member from public.hub_room_directory where id=:'room_id'),'room creator becomes member');
select public.hub_submit_project('{"title":"Test project","description":"An original student project for validation.","category":"AI/ML","technologies":["Python"],"repository_url":"https://github.com/test/first"}') as project_id \gset
select pg_temp.assert_true((select xp=0 from public.hub_students where id=auth.uid()),'pending project gives no points');
do $$begin
 begin update public.hub_projects set status='approved'; raise exception 'Client awarded own XP'; exception when insufficient_privilege then raise notice 'PASS: client cannot approve projects'; end;
 begin insert into public.hub_xp_ledger(user_id,project_id,points) select auth.uid(),id,999 from public.hub_projects; raise exception 'Client wrote ledger'; exception when insufficient_privilege then raise notice 'PASS: ledger cannot be forged'; end;
 begin perform public.hub_submit_project('{"title":"Test project","description":"An original student project for validation.","category":"AI/ML"}'); raise exception 'Duplicate accepted'; exception when unique_violation then raise notice 'PASS: duplicate project rejected'; end;
 begin update public.hub_profiles set id='00000000-0000-0000-0000-000000000003' where id=auth.uid(); raise exception 'Identity reassigned'; exception when insufficient_privilege then raise notice 'PASS: profile identity cannot be reassigned'; end;
end$$;
insert into public.hub_messages(room_id,sender_id,body) values(:'room_id',auth.uid(),'Welcome, builders!');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000002',true);
insert into public.hub_profiles(id,name,department,bio) values(auth.uid(),'Test Two','IT','A second test student.');
select pg_temp.assert_true((select count(*)=0 from public.hub_messages),'nonmember cannot read messages');
select pg_temp.assert_true((select count(*)=0 from public.hub_projects),'another student cannot read pending project');
select public.hub_join_room(:'room_id');
select public.hub_join_room(:'room_id');
select pg_temp.assert_true((select member_count=2 from public.hub_room_directory where id=:'room_id'),'repeated join is idempotent');
select pg_temp.assert_true((select count(*)=1 from public.hub_messages),'member can read persisted history');
insert into public.hub_connections(sender_id,recipient_id) values(auth.uid(),'00000000-0000-0000-0000-000000000001');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000003',true);
insert into public.hub_profiles(id,name,department,bio) values(auth.uid(),'Test Three','ECE','A third test student.');
select set_config('test.room',:'room_id',true);
do $$begin
 begin perform public.hub_join_room(current_setting('test.room')::uuid); raise exception 'Capacity exceeded'; exception when raise_exception then if sqlerrm <> 'This room is full. Try another bubble.' then raise; end if; raise notice 'PASS: room capacity enforced'; end;
 begin insert into public.hub_messages(room_id,sender_id,body) values(current_setting('test.room')::uuid,auth.uid(),'Unauthorized'); raise exception 'Nonmember sent message'; exception when raise_exception then if sqlerrm <> 'Join this room before sending messages.' then raise; end if; raise notice 'PASS: nonmember send rejected'; end;
end $$;
select pg_temp.assert_true((select count(*)=0 from public.hub_connections),'unrelated students cannot read connections');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000004',true);
select pg_temp.assert_true((select count(*)=0 from public.hub_profiles),'non-campus account cannot read profiles');
reset role;
update public.hub_projects set status='approved',reviewed_at=now() where id=:'project_id';
update public.hub_projects set status='approved' where id=:'project_id';
select pg_temp.assert_true((select sum(points)=5 and count(*)=1 from public.hub_xp_ledger),'repeated approval awards exactly five XP once');
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000002',true);
select pg_temp.assert_true((select count(*)=1 from public.hub_projects),'approved campus project visible');
insert into storage.objects(bucket_id,name) values('hub-covers',auth.uid()::text||'/test.png');
do $$begin
 begin insert into storage.objects(bucket_id,name) values('hub-covers','00000000-0000-0000-0000-000000000001/spoof.png'); raise exception 'Foreign upload allowed'; exception when insufficient_privilege then raise notice 'PASS: cover upload ownership enforced'; end;
end $$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001',true);
select pg_temp.assert_true((select count(*)=2 from public.hub_notifications),'connection and approval notify only recipient');
select public.hub_accept_connection(id) from public.hub_connections;
select pg_temp.assert_true((select status='accepted' from public.hub_connections),'recipient accepts connection');
update public.hub_profiles set visibility='private' where id=auth.uid();
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000002',true);
select pg_temp.assert_true((select count(*)=0 from public.hub_projects),'private profile projects hidden');
select pg_temp.assert_true((select count(*)=0 from public.hub_students where id='00000000-0000-0000-0000-000000000001'),'private profile absent from leaderboard');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001',true);
select public.hub_archive_project(:'project_id');
select pg_temp.assert_true((select xp=0 from public.hub_students where id=auth.uid()),'archiving reverses points');
reset role;
select pg_temp.assert_true((select count(*)=1 and bool_and(revoked_at is not null) from public.hub_xp_ledger),'revoked award remains auditable');
set local role anon;
do $$begin
 begin perform * from public.hub_messages; raise exception 'Anonymous read allowed'; exception when insufficient_privilege then raise notice 'PASS: anonymous access denied'; end;
end $$;
reset role;
select pg_temp.assert_true((select count(*)=4 from public.profiles),'existing Library profiles preserved');
rollback;
