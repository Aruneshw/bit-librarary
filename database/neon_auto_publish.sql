-- BIT HUB projects publish immediately: no review queue, XP awarded on submission.
-- Apply once to the Neon database referenced by NEON_DATABASE_URL:
--   psql "$NEON_DATABASE_URL" -v ON_ERROR_STOP=1 -f database/neon_auto_publish.sql
-- Idempotent. Existing rows that were waiting for approval are published here and
-- receive the shipped default award once; rows already approved keep their ledger.
begin;

alter table bithub.hub_projects alter column status set default 'approved';

-- Publish everything left in the retired review queue.
with waiting as (
  update bithub.hub_projects
  set status = 'approved', reviewed_at = now()
  where status = 'pending'
  returning id, owner_id
)
insert into bithub.hub_project_xp (project_id, owner_id, points)
select id, owner_id, 5 from waiting
on conflict (project_id) do update set revoked_at = null;

-- Anything already approved but never awarded (older API paths) is settled too.
insert into bithub.hub_project_xp (project_id, owner_id, points)
select p.id, p.owner_id, 5
from bithub.hub_projects p
where p.status = 'approved'
  and not exists (select 1 from bithub.hub_project_xp x where x.project_id = p.id)
on conflict (project_id) do update set revoked_at = null;

comment on column bithub.hub_projects.status is
  'approved on submission; archived by the owner. The pending review state is retired.';

-- The partial review index no longer has rows to serve; discovery uses status.
drop index if exists bithub.hub_projects_review_idx;

commit;
