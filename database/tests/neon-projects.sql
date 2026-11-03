\set ON_ERROR_STOP on
-- Disposable database only. Every fixture is rolled back.
begin;
create function pg_temp.check_project(ok boolean, label text) returns void language plpgsql as $$
begin if ok is not true then raise exception 'FAILED: %', label; end if;
raise notice 'PASS: %', label; end $$;
insert into bithub.hub_projects(id,owner_id,title,description,category,repository_url)
values ('10000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000002',
 'Database verification','A disposable project for testing portfolio persistence.','Web Development','https://example.com/verification');
select pg_temp.check_project((select status='pending' from bithub.hub_projects where id='10000000-0000-0000-0000-000000000001'),'projects start pending');
select pg_temp.check_project((select count(*)=0 from bithub.hub_project_xp),'pending projects earn no XP');
do $$begin
 begin
 insert into bithub.hub_projects(owner_id,title,description,category)
 values ('10000000-0000-0000-0000-000000000002','DATABASE VERIFICATION','A duplicate title should not be accepted.','Web Development');
 raise exception 'duplicate title accepted'; exception when unique_violation then raise notice 'PASS: duplicate active titles rejected'; end;
 begin
 insert into bithub.hub_projects(owner_id,title,description,category,repository_url)
 values ('10000000-0000-0000-0000-000000000003','Another project','A duplicate repository should not be accepted.','Web Development','https://example.com/verification/');
 raise exception 'duplicate repository accepted'; exception when unique_violation then raise notice 'PASS: duplicate repositories rejected'; end;
 begin
 update bithub.hub_projects set repository_url='javascript:alert(1)' where id='10000000-0000-0000-0000-000000000001';
 raise exception 'unsafe repository accepted'; exception when check_violation then raise notice 'PASS: unsafe repository rejected'; end;
end $$;
update bithub.hub_projects set status='approved',reviewed_by='10000000-0000-0000-0000-000000000003',reviewed_at=now()
where id='10000000-0000-0000-0000-000000000001';
insert into bithub.hub_project_xp(project_id,owner_id,points)
values ('10000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000002',5);
insert into bithub.hub_project_xp(project_id,owner_id,points)
values ('10000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000002',5)
on conflict(project_id) do update set revoked_at=null;
select pg_temp.check_project((select count(*)=1 and sum(points)=5 from bithub.hub_project_xp),'repeat approval cannot duplicate XP');
with archived as (
 update bithub.hub_projects set status='archived'
 where id='10000000-0000-0000-0000-000000000001' and owner_id='10000000-0000-0000-0000-000000000002'
 returning id
) update bithub.hub_project_xp set revoked_at=now() where project_id in(select id from archived) and revoked_at is null;
select pg_temp.check_project((select status='archived' from bithub.hub_projects where id='10000000-0000-0000-0000-000000000001'),'archive persists');
select pg_temp.check_project((select coalesce(sum(points) filter(where revoked_at is null),0)=0 from bithub.hub_project_xp),'archive revokes XP');
select pg_temp.check_project(not has_table_privilege('anon','bithub.hub_projects','select'),'anonymous role cannot read Neon project table');
select pg_temp.check_project(not has_table_privilege('authenticated','bithub.hub_project_xp','insert'),'browser role cannot award Neon XP');
rollback;
