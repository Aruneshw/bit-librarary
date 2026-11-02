\set ON_ERROR_STOP on
begin;
create function pg_temp.assert_true(ok boolean,label text) returns void language plpgsql as $$begin if ok is not true then raise exception 'FAILED: %',label; end if; raise notice 'PASS: %',label; end$$;
insert into auth.users(id,email,email_confirmed_at,raw_app_meta_data,raw_user_meta_data) values
('00000000-0000-0000-0000-000000000011','student@bitsathy.ac.in',now(),'{}','{"role":"admin"}'),
('00000000-0000-0000-0000-000000000012','moderator@bitsathy.ac.in',now(),'{"role":"admin"}','{}');
insert into public.profiles select id,email from auth.users;
insert into public.hub_profiles(id,name,department) select id,email,'CSE' from auth.users;
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000011',true);
select public.hub_submit_project('{"title":"Review test project","description":"A test of the secure project approval workflow.","category":"AI/ML"}') as project_id \gset
select set_config('test.project',:'project_id',true);
do $$begin
 begin perform public.hub_review_queue(); raise exception 'Student read moderation queue'; exception when insufficient_privilege then raise notice 'PASS: user metadata does not grant moderation'; end;
 begin perform public.hub_review_project(current_setting('test.project')::uuid,'approved'); raise exception 'Student approved project'; exception when insufficient_privilege then raise notice 'PASS: student cannot award own points'; end;
end $$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000012',true);
select pg_temp.assert_true(jsonb_array_length(public.hub_review_queue())=1,'trusted reviewer can read pending queue');
select public.hub_review_project(:'project_id','approved');
select public.hub_review_project(:'project_id','approved');
select pg_temp.assert_true((select xp=5 from public.hub_students where id='00000000-0000-0000-0000-000000000011'),'review retry awards XP only once');
select pg_temp.assert_true(jsonb_array_length(public.hub_review_queue())=0,'approved project leaves queue');
select pg_temp.assert_true((public.hub_metrics()->>'projects')::int=1,'metrics count approved projects');
select public.hub_submit_project('{"title":"Moderator own project","description":"Reviewers may not approve their own submissions.","category":"AI/ML"}') as own_project \gset
select set_config('test.own',:'own_project',true);
do $$begin
 begin perform public.hub_review_project(current_setting('test.own')::uuid,'approved'); raise exception 'Reviewer self approved'; exception when raise_exception then if sqlerrm <> 'Another reviewer must review your project.' then raise; end if; raise notice 'PASS: reviewer cannot self approve'; end;
end $$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000011',true);
select public.hub_submit_project('{"title":"Rejected test project","description":"A test of rejection and notification behavior.","category":"AI/ML"}') as rejected_project \gset
update public.hub_profiles set visibility='private' where id=auth.uid();
select pg_temp.assert_true(public.hub_metrics()->>'rank' is null,'private profiles have no public rank');
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000012',true);
select public.hub_review_project(:'rejected_project','rejected');
reset role;
select pg_temp.assert_true((select reviewed_by='00000000-0000-0000-0000-000000000012' from public.hub_projects where id=:'project_id'),'reviewer identity is audited');
select pg_temp.assert_true((select count(*)=1 from public.hub_xp_ledger),'rejections award no XP');
select pg_temp.assert_true((select count(*)=1 from public.hub_notifications where source_key='project-rejected:'||:'rejected_project'),'rejection notifies submitter');
set local role anon;
do $$begin
 begin perform public.hub_review_queue(); raise exception 'Anonymous queue read'; exception when insufficient_privilege then raise notice 'PASS: anonymous reviewer denied'; end;
end $$;
rollback;
