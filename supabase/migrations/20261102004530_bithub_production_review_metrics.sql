-- Trusted moderation and complete dashboard totals. No sample records.
begin;
alter table public.hub_projects add column reviewed_by uuid references auth.users(id) on delete set null;
create index hub_projects_reviewer_idx on public.hub_projects(reviewed_by);
create function hub_private.is_reviewer() returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and exists(select 1 from auth.users u where u.id=auth.uid() and u.email_confirmed_at is not null and
 (u.raw_app_meta_data->>'role'='admin' or lower(u.email) in ('aruneshownsty1@gmail.com','harishraghav489@gmail.com','admin@bitsathy.ac.in')));
$$;
create function hub_private.review_queue() returns jsonb language plpgsql stable security definer set search_path='' as $$
begin
 if not hub_private.is_reviewer() then raise insufficient_privilege using message='Administrator access required.'; end if;
 return coalesce((select jsonb_agg(to_jsonb(q) order by q.created_at,q.id) from
 (select p.*,s.name as owner_name from public.hub_projects p join public.hub_profiles s on s.id=p.owner_id where p.status='pending' order by p.created_at,p.id limit 100) q),'[]'::jsonb);
end $$;
create function hub_private.review_project(project uuid,decision text) returns void language plpgsql security definer set search_path='' as $$
declare target public.hub_projects;
begin
 if not hub_private.is_reviewer() then raise insufficient_privilege using message='Administrator access required.'; end if;
 if decision not in ('approved','rejected') or decision is null then raise exception 'Choose approved or rejected.'; end if;
 select * into target from public.hub_projects where id=project for update;
 if not found then raise exception 'Project not found.'; end if;
 if target.owner_id=auth.uid() then raise exception 'Another reviewer must review your project.'; end if;
 if target.status=decision then return; end if;
 if target.status<>'pending' then raise exception 'This project has already been reviewed or archived.'; end if;
 update public.hub_projects set status=decision,reviewed_at=now(),reviewed_by=auth.uid() where id=project;
 if decision='rejected' then
 insert into public.hub_notifications(user_id,body,source_key) values(target.owner_id,'Your project was not approved. Please contact a campus moderator for feedback.','project-rejected:'||project) on conflict(source_key) do nothing;
 end if;
end $$;
revoke all on function hub_private.is_reviewer(),hub_private.review_queue(),hub_private.review_project(uuid,text) from public,anon;
grant execute on function hub_private.is_reviewer(),hub_private.review_queue(),hub_private.review_project(uuid,text) to authenticated;
create function public.hub_review_queue() returns jsonb language sql stable security invoker set search_path='' as $$select hub_private.review_queue()$$;
create function public.hub_review_project(project uuid,decision text) returns void language sql security invoker set search_path='' as $$select hub_private.review_project(project,decision)$$;
create function public.hub_metrics() returns jsonb language sql stable security invoker set search_path='' as $$
 select jsonb_build_object(
 'students',(select count(*) from public.hub_profiles where visibility='campus'),
 'projects',(select count(*) from public.hub_projects where status='approved'),
 'teams',(select count(*) from public.hub_rooms where kind='team'),
 'events',(select count(*) from public.hub_hackathons where starts_at>=now()),
 'rank',(select position from (select id,row_number() over(order by xp desc,name,id) as position from public.hub_students where visibility='campus') ranked where id=auth.uid()));
$$;
revoke all on function public.hub_review_queue(),public.hub_review_project(uuid,text),public.hub_metrics() from public,anon;
grant execute on function public.hub_review_queue(),public.hub_review_project(uuid,text),public.hub_metrics() to authenticated;
commit;
