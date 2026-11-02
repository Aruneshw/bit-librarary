-- BIT HUB: additive schema. Existing Library records and policies are untouched.
-- Apply once to the same Supabase project as BIT Library. No sample users/data.
begin;
create schema if not exists hub_private;
revoke all on schema hub_private from public, anon;
grant usage on schema hub_private to authenticated, service_role;

create table public.hub_domains (
  name text primary key, sort_order integer not null default 0
);
insert into public.hub_domains(name,sort_order) values
 ('Cybersecurity',1),('AI/ML',2),('Web Development',3),('IoT',4),('Data Science',5),('UI/UX',6),('Cloud',7);
create table public.hub_policy (
  id boolean primary key default true check(id),
  project_xp integer not null default 5 check(project_xp between 0 and 100),
  max_projects integer check(max_projects > 0), -- NULL means unlimited projects
  max_room_capacity integer not null default 16 check(max_room_capacity between 2 and 100),
  max_owned_rooms integer not null default 20 check(max_owned_rooms between 1 and 100)
);
insert into public.hub_policy(id) values(true);
create table public.hub_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  name text not null check(char_length(trim(name)) between 2 and 80),
  department text not null check(char_length(trim(department)) between 1 and 60),
  college text not null default 'BIT Sathy' check(char_length(trim(college)) between 1 and 100),
  year integer not null default 1 check(year between 1 and 6),
  bio text not null default '' check(char_length(bio) <= 500),
  skills text[] not null default '{}' check(cardinality(skills) <= 20),
  available boolean not null default true,
  avatar_url text check(avatar_url is null or (avatar_url ~ '^https://' and char_length(avatar_url) <= 1000)),
  github_url text not null default '' check(github_url = '' or (github_url ~ '^https://' and char_length(github_url) <= 500)),
  visibility text not null default 'campus' check(visibility in ('campus','private')),
  created_at timestamptz not null default now()
);
create index hub_profiles_discovery_idx on public.hub_profiles(visibility, available, year);
create index hub_profiles_skills_idx on public.hub_profiles using gin(skills);
create table public.hub_projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.hub_profiles(id) on delete cascade,
  title text not null check(char_length(trim(title)) between 3 and 100),
  description text not null check(char_length(trim(description)) between 20 and 2000),
  category text not null references public.hub_domains(name),
  technologies text[] not null default '{}' check(cardinality(technologies) <= 20),
  repository_url text not null default '' check(repository_url = '' or (repository_url ~ '^https://' and char_length(repository_url) <= 500)),
  demo_url text not null default '' check(demo_url = '' or (demo_url ~ '^https://' and char_length(demo_url) <= 500)),
  cover_path text check(cover_path is null or (split_part(cover_path,'/',1) = owner_id::text and cover_path ~ '\.(png|jpeg|webp)$' and char_length(cover_path) <= 200)),
  status text not null default 'pending' check(status in ('pending','approved','rejected','archived')),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create index hub_projects_owner_idx on public.hub_projects(owner_id,created_at desc);
create index hub_projects_discovery_idx on public.hub_projects(status,category,created_at desc);
create unique index hub_projects_duplicate_title_idx on public.hub_projects(owner_id,lower(trim(title))) where status <> 'archived';
create unique index hub_projects_duplicate_repo_idx on public.hub_projects(lower(rtrim(repository_url,'/'))) where repository_url <> '' and status <> 'archived';
create table public.hub_xp_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.hub_profiles(id) on delete cascade,
  project_id uuid not null unique references public.hub_projects(id) on delete cascade,
  points integer not null check(points >= 0),
  awarded_at timestamptz not null default now(),
  revoked_at timestamptz
);
create index hub_xp_ledger_user_idx on public.hub_xp_ledger(user_id) where revoked_at is null;
create table public.hub_hackathons (
  id uuid primary key default gen_random_uuid(), title text not null check(char_length(title) between 3 and 120),
  starts_at timestamptz not null, location text not null default 'Online', tags text[] not null default '{}',
  url text not null default '' check(url = '' or (url ~ '^https://' and char_length(url) <= 500)),
  created_at timestamptz not null default now()
);
create index hub_hackathons_date_idx on public.hub_hackathons(starts_at);
create table public.hub_rooms (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.hub_profiles(id) on delete cascade,
  name text not null check(char_length(trim(name)) between 3 and 80),
  description text not null check(char_length(trim(description)) between 10 and 500),
  category text not null references public.hub_domains(name),
  capacity integer not null check(capacity between 2 and 100),
  kind text not null default 'bubble' check(kind in ('bubble','team')),
  hackathon_id uuid references public.hub_hackathons(id) on delete set null,
  created_at timestamptz not null default now()
);
create index hub_rooms_owner_idx on public.hub_rooms(owner_id);
create index hub_rooms_hackathon_idx on public.hub_rooms(hackathon_id);
create index hub_rooms_discovery_idx on public.hub_rooms(kind,category,created_at desc);
create table public.hub_room_members (
  room_id uuid not null references public.hub_rooms(id) on delete cascade,
  user_id uuid not null references public.hub_profiles(id) on delete cascade,
  joined_at timestamptz not null default now(), primary key(room_id,user_id)
);
create index hub_room_members_user_idx on public.hub_room_members(user_id,room_id);
create table public.hub_messages (
  id uuid primary key default gen_random_uuid(), room_id uuid not null references public.hub_rooms(id) on delete cascade,
  sender_id uuid not null references public.hub_profiles(id) on delete cascade,
  body text not null check(char_length(trim(body)) between 1 and 4000), created_at timestamptz not null default now()
);
create index hub_messages_room_idx on public.hub_messages(room_id,created_at desc,id);
create index hub_messages_sender_idx on public.hub_messages(sender_id,created_at desc);
create table public.hub_connections (
  id uuid primary key default gen_random_uuid(), sender_id uuid not null references public.hub_profiles(id) on delete cascade,
  recipient_id uuid not null references public.hub_profiles(id) on delete cascade,
  status text not null default 'pending' check(status in ('pending','accepted')),
  created_at timestamptz not null default now(), check(sender_id <> recipient_id)
);
create unique index hub_connections_pair_idx on public.hub_connections(least(sender_id,recipient_id),greatest(sender_id,recipient_id));
create index hub_connections_recipient_idx on public.hub_connections(recipient_id,status);
create index hub_connections_sender_idx on public.hub_connections(sender_id);
create table public.hub_notifications (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.hub_profiles(id) on delete cascade,
  body text not null check(char_length(body) <= 500), source_key text not null unique,
  read_at timestamptz, created_at timestamptz not null default now()
);
create index hub_notifications_user_idx on public.hub_notifications(user_id,created_at desc);

-- Internal helpers are outside the exposed schema. No caller-supplied user IDs.
create function hub_private.is_student() returns boolean language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and exists(select 1 from auth.users u where u.id = auth.uid() and u.email_confirmed_at is not null and lower(u.email) like '%@bitsathy.ac.in');
$$;
create function hub_private.is_member(room uuid) returns boolean language sql stable security definer set search_path = '' as $$
 select auth.uid() is not null and exists(select 1 from public.hub_room_members m where m.room_id = room and m.user_id = auth.uid());
$$;
create function hub_private.room_size(room uuid) returns bigint language sql stable security definer set search_path = '' as $$
 select count(*) from public.hub_room_members m where m.room_id = room and hub_private.is_student();
$$;
revoke all on function hub_private.is_student(),hub_private.is_member(uuid),hub_private.room_size(uuid) from public,anon;
grant execute on function hub_private.is_student(),hub_private.is_member(uuid),hub_private.room_size(uuid) to authenticated,service_role;

alter table public.hub_domains enable row level security;
alter table public.hub_policy enable row level security;
alter table public.hub_profiles enable row level security;
alter table public.hub_projects enable row level security;
alter table public.hub_xp_ledger enable row level security;
alter table public.hub_hackathons enable row level security;
alter table public.hub_rooms enable row level security;
alter table public.hub_room_members enable row level security;
alter table public.hub_messages enable row level security;
alter table public.hub_connections enable row level security;
alter table public.hub_notifications enable row level security;
create policy hub_domains_read on public.hub_domains for select to authenticated using ((select hub_private.is_student()));
create policy hub_policy_read on public.hub_policy for select to authenticated using ((select hub_private.is_student()));
create policy hub_profiles_read on public.hub_profiles for select to authenticated using ((select hub_private.is_student()) and (visibility='campus' or id=(select auth.uid())));
create policy hub_profiles_insert on public.hub_profiles for insert to authenticated with check ((select hub_private.is_student()) and id=(select auth.uid()));
create policy hub_profiles_update on public.hub_profiles for update to authenticated using ((select hub_private.is_student()) and id=(select auth.uid())) with check ((select hub_private.is_student()) and id=(select auth.uid()));
create policy hub_projects_read on public.hub_projects for select to authenticated using ((select hub_private.is_student()) and (owner_id=(select auth.uid()) or (status='approved' and exists(select 1 from public.hub_profiles p where p.id=owner_id and p.visibility='campus'))));
create policy hub_xp_read on public.hub_xp_ledger for select to authenticated using ((select hub_private.is_student()) and exists(select 1 from public.hub_profiles p where p.id=user_id));
create policy hub_hackathons_read on public.hub_hackathons for select to authenticated using ((select hub_private.is_student()));
create policy hub_rooms_read on public.hub_rooms for select to authenticated using ((select hub_private.is_student()));
create policy hub_members_read on public.hub_room_members for select to authenticated using ((select hub_private.is_student()) and hub_private.is_member(room_id));
create policy hub_members_leave on public.hub_room_members for delete to authenticated using ((select hub_private.is_student()) and user_id=(select auth.uid()) and exists(select 1 from public.hub_rooms r where r.id=room_id and r.owner_id<>(select auth.uid())));
create policy hub_messages_read on public.hub_messages for select to authenticated using ((select hub_private.is_student()) and hub_private.is_member(room_id));
create policy hub_messages_send on public.hub_messages for insert to authenticated with check ((select hub_private.is_student()) and sender_id=(select auth.uid()) and hub_private.is_member(room_id));
create policy hub_connections_read on public.hub_connections for select to authenticated using ((select hub_private.is_student()) and (sender_id=(select auth.uid()) or recipient_id=(select auth.uid())));
create policy hub_connections_insert on public.hub_connections for insert to authenticated with check ((select hub_private.is_student()) and sender_id=(select auth.uid()) and status='pending' and exists(select 1 from public.hub_profiles p where p.id=recipient_id and p.visibility='campus'));
create policy hub_notifications_read on public.hub_notifications for select to authenticated using ((select hub_private.is_student()) and user_id=(select auth.uid()));
create policy hub_notifications_update on public.hub_notifications for update to authenticated using ((select hub_private.is_student()) and user_id=(select auth.uid())) with check ((select hub_private.is_student()) and user_id=(select auth.uid()));

-- Explicit grants: neither browser roles nor anonymous visitors can award XP,
-- change review status, forge notifications, or bypass room-capacity checks.
revoke all on public.hub_domains,public.hub_policy,public.hub_profiles,public.hub_projects,public.hub_xp_ledger,public.hub_hackathons,public.hub_rooms,public.hub_room_members,public.hub_messages,public.hub_connections,public.hub_notifications from anon,authenticated;
grant select on public.hub_domains,public.hub_policy,public.hub_profiles,public.hub_projects,public.hub_xp_ledger,public.hub_hackathons,public.hub_rooms,public.hub_room_members,public.hub_messages,public.hub_connections,public.hub_notifications to authenticated;
grant insert(id,name,department,college,year,bio,skills,available,avatar_url,github_url,visibility),update(id,name,department,college,year,bio,skills,available,avatar_url,github_url,visibility) on public.hub_profiles to authenticated;
grant insert(room_id,sender_id,body) on public.hub_messages to authenticated;
grant insert(sender_id,recipient_id) on public.hub_connections to authenticated;
grant update(read_at) on public.hub_notifications to authenticated;
grant delete on public.hub_room_members to authenticated;
grant all on public.hub_domains,public.hub_policy,public.hub_profiles,public.hub_projects,public.hub_xp_ledger,public.hub_hackathons,public.hub_rooms,public.hub_room_members,public.hub_messages,public.hub_connections,public.hub_notifications to service_role;

create view public.hub_students with(security_invoker=true) as
 select p.*, coalesce((select sum(x.points) from public.hub_xp_ledger x where x.user_id=p.id and x.revoked_at is null),0)::integer as xp,
 (select count(*) from public.hub_projects pr where pr.owner_id=p.id and pr.status <> 'archived')::integer as project_count,
 0::integer as achievement_count from public.hub_profiles p;
create view public.hub_room_directory with(security_invoker=true) as
 select r.*,hub_private.room_size(r.id)::integer as member_count,hub_private.is_member(r.id) as is_member from public.hub_rooms r;
grant select on public.hub_students,public.hub_room_directory to authenticated,service_role;
revoke all on public.hub_students,public.hub_room_directory from anon;

create function hub_private.require_profile() returns uuid language plpgsql security invoker set search_path='' as $$
declare actor uuid := auth.uid();
begin
 if not hub_private.is_student() then raise exception 'Sign in with a verified BIT student account.'; end if;
 if not exists(select 1 from public.hub_profiles where id=actor) then raise exception 'Create your student profile first.'; end if;
 return actor;
end $$;
create function hub_private.create_room(input jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid; new_id uuid; cap integer; rules public.hub_policy;
begin
 actor := hub_private.require_profile();
 perform 1 from public.hub_profiles where id=actor for update;
 select * into rules from public.hub_policy where id;
 cap := (input->>'capacity')::integer;
 if cap > rules.max_room_capacity then raise exception 'Room size exceeds campus policy.'; end if;
 if (select count(*) from public.hub_rooms where owner_id=actor) >= rules.max_owned_rooms then raise exception 'You have reached the room limit.'; end if;
 insert into public.hub_rooms(owner_id,name,description,category,capacity,kind)
 values(actor,trim(input->>'name'),trim(input->>'description'),input->>'category',cap,input->>'kind') returning id into new_id;
 insert into public.hub_room_members(room_id,user_id) values(new_id,actor);
 return new_id;
end $$;
create function hub_private.join_room(room uuid) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid; capacity_limit integer;
begin
 actor := hub_private.require_profile();
 select capacity into capacity_limit from public.hub_rooms where id=room for update;
 if not found then raise exception 'Room not found.'; end if;
 if exists(select 1 from public.hub_room_members where room_id=room and user_id=actor) then return; end if;
 if (select count(*) from public.hub_room_members where room_id=room) >= capacity_limit then raise exception 'This room is full. Try another bubble.'; end if;
 insert into public.hub_room_members(room_id,user_id) values(room,actor);
end $$;
create function hub_private.submit_project(input jsonb) returns uuid language plpgsql security definer set search_path='' as $$
declare actor uuid; new_id uuid; max_count integer;
begin
 actor := hub_private.require_profile();
 perform 1 from public.hub_profiles where id=actor for update;
 select max_projects into max_count from public.hub_policy where id;
 if max_count is not null and (select count(*) from public.hub_projects where owner_id=actor and status <> 'archived') >= max_count then raise exception 'Project limit reached. Archive an older project first.'; end if;
 if (select count(*) from public.hub_projects where owner_id=actor and created_at > now()-interval '1 hour') >= 20 then raise exception 'Please wait before submitting more projects.'; end if;
 insert into public.hub_projects(owner_id,title,description,category,technologies,repository_url,demo_url,cover_path)
 values(actor,trim(input->>'title'),trim(input->>'description'),input->>'category',array(select jsonb_array_elements_text(coalesce(input->'technologies','[]'))),coalesce(input->>'repository_url',''),coalesce(input->>'demo_url',''),input->>'cover_path') returning id into new_id;
 return new_id;
end $$;
create function hub_private.archive_project(project uuid) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid;
begin
 actor := hub_private.require_profile();
 update public.hub_projects set status='archived' where id=project and owner_id=actor and status<>'archived';
 if not found then raise exception 'Project not found or not owned by you.'; end if;
end $$;
create function hub_private.accept_connection(connection uuid) returns void language plpgsql security definer set search_path='' as $$
declare actor uuid; sender uuid;
begin
 actor := hub_private.require_profile();
 update public.hub_connections set status='accepted' where id=connection and recipient_id=actor and status='pending' returning sender_id into sender;
 if sender is null then raise exception 'Connection request not found.'; end if;
 insert into public.hub_notifications(user_id,body,source_key) values(sender,'Your connection request was accepted.','connection-accepted:'||connection) on conflict(source_key) do nothing;
end $$;
revoke all on function hub_private.require_profile(),hub_private.create_room(jsonb),hub_private.join_room(uuid),hub_private.submit_project(jsonb),hub_private.archive_project(uuid),hub_private.accept_connection(uuid) from public,anon;
grant execute on function hub_private.require_profile(),hub_private.create_room(jsonb),hub_private.join_room(uuid),hub_private.submit_project(jsonb),hub_private.archive_project(uuid),hub_private.accept_connection(uuid) to authenticated;
create function public.hub_create_room(input jsonb) returns uuid language sql security invoker set search_path='' as $$select hub_private.create_room(input)$$;
create function public.hub_join_room(room uuid) returns void language sql security invoker set search_path='' as $$select hub_private.join_room(room)$$;
create function public.hub_submit_project(input jsonb) returns uuid language sql security invoker set search_path='' as $$select hub_private.submit_project(input)$$;
create function public.hub_archive_project(project uuid) returns void language sql security invoker set search_path='' as $$select hub_private.archive_project(project)$$;
create function public.hub_accept_connection(connection uuid) returns void language sql security invoker set search_path='' as $$select hub_private.accept_connection(connection)$$;
revoke all on function public.hub_create_room(jsonb),public.hub_join_room(uuid),public.hub_submit_project(jsonb),public.hub_archive_project(uuid),public.hub_accept_connection(uuid) from public,anon;
grant execute on function public.hub_create_room(jsonb),public.hub_join_room(uuid),public.hub_submit_project(jsonb),public.hub_archive_project(uuid),public.hub_accept_connection(uuid) to authenticated;

-- Only a trusted reviewer (service role or DB administrator) can update status.
-- The ledger retains the original award value and uses one row per project.
create function hub_private.project_review() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if new.status='approved' then
   insert into public.hub_xp_ledger(user_id,project_id,points) select new.owner_id,new.id,project_xp from public.hub_policy where id
   on conflict(project_id) do update set revoked_at=null;
   insert into public.hub_notifications(user_id,body,source_key) values(new.owner_id,'Your project was approved. XP has been added to your profile.','project-approved:'||new.id) on conflict(source_key) do nothing;
 elsif new.status in ('archived','rejected','pending') then
   update public.hub_xp_ledger set revoked_at=now() where project_id=new.id and revoked_at is null;
 end if;
 return new;
end $$;
revoke all on function hub_private.project_review() from public,anon,authenticated;
create trigger hub_project_review after insert or update of status on public.hub_projects for each row execute function hub_private.project_review();
create function hub_private.connection_notice() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or new.sender_id<>auth.uid() or not hub_private.is_student() then raise exception 'Unauthorized connection request.'; end if;
 perform 1 from public.hub_profiles where id=new.sender_id for update;
 if (select count(*) from public.hub_connections where sender_id=new.sender_id and created_at>now()-interval '1 hour') >= 30 then raise exception 'Please wait before sending more connection requests.'; end if;
 insert into public.hub_notifications(user_id,body,source_key) values(new.recipient_id,'A student sent you a connection request.','connection:'||new.id) on conflict(source_key) do nothing;
 return new;
end $$;
revoke all on function hub_private.connection_notice() from public,anon,authenticated;
create trigger hub_connection_notice after insert on public.hub_connections for each row execute function hub_private.connection_notice();
create function hub_private.message_guard() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or new.sender_id<>auth.uid() or not hub_private.is_student() or not hub_private.is_member(new.room_id) then raise exception 'Join this room before sending messages.'; end if;
 perform 1 from public.hub_profiles where id=new.sender_id for update;
 if (select count(*) from public.hub_messages where sender_id=new.sender_id and created_at>now()-interval '1 minute') >= 30 then raise exception 'You are sending messages too quickly. Please wait a moment.'; end if;
 new.created_at:=now();
 return new;
end $$;
revoke all on function hub_private.message_guard() from public,anon,authenticated;
create trigger hub_message_guard before insert on public.hub_messages for each row execute function hub_private.message_guard();

-- Private image bucket: signed URLs still require the owner or an approved,
-- campus-visible project. Pending and private-profile covers are never public.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('hub-covers','hub-covers',false,5242880,array['image/png','image/jpeg','image/webp']);
create policy hub_cover_insert on storage.objects for insert to authenticated with check(bucket_id='hub-covers' and (select hub_private.is_student()) and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy hub_cover_read on storage.objects for select to authenticated using(bucket_id='hub-covers' and (select hub_private.is_student()) and ((storage.foldername(name))[1]=(select auth.uid())::text or exists(select 1 from public.hub_projects p where p.cover_path=name and p.status='approved')));
create policy hub_cover_delete on storage.objects for delete to authenticated using(bucket_id='hub-covers' and (select hub_private.is_student()) and (storage.foldername(name))[1]=(select auth.uid())::text);

-- Realtime only publishes the two tables used by subscriptions; RLS filters
-- delivered records. Persistent message history remains the source of truth.
do $$ begin
 if exists(select 1 from pg_publication where pubname='supabase_realtime') then
   alter publication supabase_realtime add table public.hub_messages,public.hub_notifications;
 end if;
end $$;
commit;
