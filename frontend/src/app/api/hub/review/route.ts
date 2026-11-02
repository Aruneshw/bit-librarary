import { requireApiUser } from '@/lib/auth/api';
import { projectsDb } from '@/lib/hub/projectsDb';
import {
  fail,
  getNames,
  getProjectPolicy,
  json,
  notifyProject,
  toProject,
  type ProjectRow,
} from '@/lib/hub/projectServer';
import { isUuid } from '@/lib/hub/projectValidation';

export const runtime = 'nodejs';

const projectColumns = `
  id, owner_id, title, description, category, technologies,
  repository_url, demo_url, cover_url, cover_key, status, reviewed_at,
  reviewed_by, created_at
`;

export async function GET(request: Request) {
  const access = await requireApiUser(request, true);
  if (access.error) return access.error;
  const sql = projectsDb();
  if (!sql) return fail('Project storage is not configured.', 503);

  try {
    const rows = (await sql`
      select ${sql.unsafe(projectColumns)}
      from bithub.hub_projects
      where status = 'pending'
      order by created_at, id
      limit 100
    `) as ProjectRow[];
    const names = await getNames([...new Set(rows.map((row) => row.owner_id))]);
    return json({
      projects: rows.map((row) => ({
        ...toProject(row),
        owner_name: names.get(row.owner_id) || 'Unknown student',
      })),
    });
  } catch (error) {
    console.error('Review queue failed:', error);
    return fail('The review queue could not be loaded.', 500);
  }
}

export async function POST(request: Request) {
  const access = await requireApiUser(request, true);
  if (access.error) return access.error;
  const sql = projectsDb();
  if (!sql) return fail('Project storage is not configured.', 503);

  const body = await request.json().catch(() => null) as
    | { projectId?: unknown; decision?: unknown }
    | null;
  const projectId = body?.projectId;
  const decision = body?.decision;
  if (!isUuid(projectId) || (decision !== 'approved' && decision !== 'rejected')) {
    return fail('Choose approved or rejected for a valid project.', 400);
  }

  try {
    const [target] = (await sql`
      select id, owner_id, status from bithub.hub_projects where id = ${projectId}
    `) as { id: string; owner_id: string; status: string }[];
    if (!target) return fail('Project not found.', 404);
    if (target.owner_id === access.user.id) {
      return fail('Another reviewer must review your project.', 400);
    }
    if (target.status === decision) {
      return json({ ok: true, status: decision });
    }
    if (target.status !== 'pending') {
      return fail('This project has already been reviewed or archived.', 409);
    }

    const policy = await getProjectPolicy();
    const [updated] = (await sql`
      with updated as (
        update bithub.hub_projects
        set status = ${decision}, reviewed_at = now(), reviewed_by = ${access.user.id}
        where id = ${projectId} and status = 'pending'
        returning id, owner_id
      ),
      awarded as (
        insert into bithub.hub_project_xp (project_id, owner_id, points)
        select id, owner_id, ${policy.project_xp}::integer from updated
        where ${decision} = 'approved'
        on conflict (project_id) do update set revoked_at = null
        returning project_id
      ),
      revoked as (
        update bithub.hub_project_xp
        set revoked_at = now()
        where project_id = ${projectId} and revoked_at is null and ${decision} = 'rejected'
        returning project_id
      )
      select id, owner_id from updated
    `) as { id: string; owner_id: string }[];
    if (!updated) {
      return fail('This project was already reviewed. Refresh the queue.', 409);
    }

    await notifyProject(
      target.owner_id,
      decision === 'approved'
        ? 'Your project was approved. XP has been added to your profile.'
        : 'Your project was not approved. Please contact a campus moderator for feedback.',
      `project-${decision}:${projectId}`,
    );
    return json({ ok: true, status: decision });
  } catch (error) {
    console.error('Project review failed:', error);
    return fail('The review decision could not be saved.', 500);
  }
}
