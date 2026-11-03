\set ON_ERROR_STOP on
begin;
insert into auth.users(id,email,email_confirmed_at) values
('20000000-0000-0000-0000-000000000001','aruneshownsty1@gmail.com',now()),
('20000000-0000-0000-0000-000000000002','outside@gmail.com',now());
set local role authenticated;
select set_config('request.jwt.claim.sub','20000000-0000-0000-0000-000000000001',true);
do $$begin
 if not hub_private.is_student() or not hub_private.is_reviewer() then raise exception 'Named administrator denied'; end if;
 if not exists(select 1 from public.hub_domains) then raise exception 'Administrator cannot read Hub domains'; end if;
 raise notice 'PASS: named Gmail administrator has Hub and review access';
end $$;
select set_config('request.jwt.claim.sub','20000000-0000-0000-0000-000000000002',true);
do $$begin
 if hub_private.is_student() or hub_private.is_reviewer() then raise exception 'Outside account allowed'; end if;
 raise notice 'PASS: unrelated Gmail accounts remain denied';
end $$;
reset role;
update auth.users set email_confirmed_at=null where id='20000000-0000-0000-0000-000000000001';
set local role authenticated;
select set_config('request.jwt.claim.sub','20000000-0000-0000-0000-000000000001',true);
do $$begin
 if hub_private.is_student() or hub_private.is_reviewer() then raise exception 'Unconfirmed administrator allowed'; end if;
 raise notice 'PASS: administrator must have confirmed email';
end $$;
rollback;
