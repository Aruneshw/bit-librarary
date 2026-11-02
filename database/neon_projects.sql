-- BIT HUB project storage on Neon (server-only).
--
-- Apply this file once to the Neon database referenced by NEON_DATABASE_URL:
--   psql "$NEON_DATABASE_URL" -v ON_ERROR_STOP=1 -f database/neon_projects.sql
--
-- Only the Next.js server connects to this database. Browser clients never
-- receive the connection string; every read/write goes through
-- /api/hub/projects and /api/hub/review, which authenticate the Supabase
-- session first. The schema is therefore intentionally separate from Supabase
-- and does not use Supabase row-level security.

begin;

create schema if not exists bithub;

create table if not exists bithub.hub_projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  title text not null check (char_length(trim(title)) between 3 and 100),
  description text not null check (char_length(trim(description)) between 20 and 2000),
  category text not null check (char_length(trim(category)) between 1 and 60),
  technologies text[] not null default '{}' check (cardinality(technologies) <= 20),
  repository_url text not null default '' check (
    repository_url = '' or (repository_url ~ '^https://' and char_length(repository_url) <= 500)
  ),
  demo_url text not null default '' check (
    demo_url = '' or (demo_url ~ '^https://' and char_length(demo_url) <= 500)
  ),
  cover_url text check (cover_url is null or (cover_url ~ '^https://' and char_length(cover_url) <= 1000)),
  cover_key text check (cover_key is null or (char_length(cover_key) between 1 and 500)),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'archived')),
  reviewed_at timestamptz,
  reviewed_by uuid,
  created_at timestamptz not null default now()
);

-- Existing installations created before Neon Object Storage covers.
alter table bithub.hub_projects
  add column if not exists cover_key text
  check (cover_key is null or (char_length(cover_key) between 1 and 500));

create index if not exists hub_projects_owner_idx
  on bithub.hub_projects (owner_id, created_at desc);
create index if not exists hub_projects_discovery_idx
  on bithub.hub_projects (status, category, created_at desc);
create index if not exists hub_projects_review_idx
  on bithub.hub_projects (created_at, id) where status = 'pending';
create unique index if not exists hub_projects_duplicate_title_idx
  on bithub.hub_projects (owner_id, lower(trim(title))) where status <> 'archived';
create unique index if not exists hub_projects_duplicate_repo_idx
  on bithub.hub_projects (lower(rtrim(repository_url, '/')))
  where repository_url <> '' and status <> 'archived';

-- Project XP lives with the project data, so approving or archiving a project
-- never writes project rows back to Supabase. One ledger row per project keeps
-- repeat approvals idempotent and preserves the original award value.
create table if not exists bithub.hub_project_xp (
  project_id uuid primary key references bithub.hub_projects (id) on delete cascade,
  owner_id uuid not null,
  points integer not null check (points >= 0),
  awarded_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index if not exists hub_project_xp_owner_idx
  on bithub.hub_project_xp (owner_id) where revoked_at is null;

-- Only the database owner (the server connection) may use these objects.
revoke all on schema bithub from public;
revoke all on all tables in schema bithub from public;

comment on schema bithub is 'BIT HUB project storage and project XP ledger (Neon).';
comment on table bithub.hub_projects is 'Student project portfolio records. Server API access only.';
comment on column bithub.hub_projects.cover_key is 'Private Neon Object Storage key for the project cover (bucket: uploads).';
comment on table bithub.hub_project_xp is 'Trusted project XP ledger; at most one row per project.';

commit;
