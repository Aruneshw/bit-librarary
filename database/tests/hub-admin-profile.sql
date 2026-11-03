\set ON_ERROR_STOP on
begin;
create function pg_temp.check_presence(ok boolean,label text) returns void language plpgsql as $$begin if ok is not true then raise exception 'FAILED: %',label; end if; raise notice 'PASS: %',label; end$$;
insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data) values
('80000000-0000-0000-0000-000000000001','profiledstudent@bitsathy.ac.in',now(),'{}'::jsonb),
('80000000-0000-0000-0000-000000000002','harishraghav489@gmail.com',now(),'{}'::jsonb),
('80000000-0000-0000-0000-000000000003','randomperson@gmail.com',now(),'{}'::jsonb),
('80000000-0000-0000-0000-000000000004','aruneshownsty1@gmail.com',null,'{}'::jsonb),
('80000000-0000-0000-0000-000000000005','moderator@somewhere.org',now(),'{"role":"admin"}'::jsonb);
insert into public.profiles select id,email from auth.users where id::text like '80000000%';
set local role authenticated;
select set_config('request.jwt.claim.sub','80000000-0000-0000-0000-000000000001',true);
insert into public.hub_profiles(id,name,department,visibility) values(auth.uid(),'Campus Student','CSE','campus');
select pg_temp.check_presence((select count(*)=1 from public.hub_profiles where id=auth.uid()),'campus student creates a Hub profile');
select set_config('request.jwt.claim.sub','80000000-0000-0000-0000-000000000002',true);
insert into public.hub_profiles(id,name,department,year,skills,visibility) values(auth.uid(),'Harish Raghavendra','AIML',2,array['AI/ML','Web Development','IoT','UI/UX'],'campus');
select pg_temp.check_presence((select count(*)=1 from public.hub_profiles where id=auth.uid()),'second allowlisted administrator creates a Hub profile');
select set_config('request.jwt.claim.sub','80000000-0000-0000-0000-000000000005',true);
insert into public.hub_profiles(id,name,department,visibility) values(auth.uid(),'Server Managed Admin','CSE','campus');
select pg_temp.check_presence((select count(*)=1 from public.hub_profiles where id=auth.uid()),'server-managed admin role is admitted');
select set_config('request.jwt.claim.sub','80000000-0000-0000-0000-000000000003',true);
do $$begin
 begin insert into public.hub_profiles(id,name,department) values(auth.uid(),'Intruder','CSE'); raise exception 'Unrelated Gmail created a profile';
 exception when insufficient_privilege then raise notice 'PASS: unrelated Gmail still denied'; end;
end$$;
select set_config('request.jwt.claim.sub','80000000-0000-0000-0000-000000000004',true);
do $$begin
 begin insert into public.hub_profiles(id,name,department) values(auth.uid(),'Unconfirmed Admin','CSE'); raise exception 'Unconfirmed administrator created a profile';
 exception when insufficient_privilege then raise notice 'PASS: administrator needs a confirmed email'; end;
end$$;
select set_config('request.jwt.claim.sub','80000000-0000-0000-0000-000000000002',true);
select public.hub_create_room('{"name":"Admin discussion bubble","description":"A bubble started by the administrator","category":"AI/ML","capacity":4,"kind":"bubble"}') is not null as created;
select pg_temp.check_presence((select count(*)=1 from public.hub_rooms r join public.hub_profiles p on p.id=r.owner_id where p.id='80000000-0000-0000-0000-000000000002'),'administrator can host a room');
select pg_temp.check_presence((select count(*)=3 from public.hub_students where visibility='campus'),'administrators appear in skill discovery like students');
reset role;
rollback;
