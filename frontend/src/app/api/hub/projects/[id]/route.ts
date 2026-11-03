import { requireApiUser } from '@/lib/auth/api';
import { projectsDb } from '@/lib/hub/projectsDb';
import { fail, json } from '@/lib/hub/projectServer';
import { isUuid } from '@/lib/hub/projectValidation';

export const runtime = 'nodejs';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireApiUser(request);
  if (access.error) return access.error;
  const { id } = await context.params;
  if (!isUuid(id)) return fail('Project not found.', 404);

  const body = await request.json().catch(() => null) as { action?: unknown } | null;
  if (body?.action !== 'archive') return fail('Unsupported action.', 400);

  const sql = projectsDb();
  if (!sql) return fail('Project storage is not configured.', 503);

  try {
    const [target] = (await sql`
      select owner_id, status from bithub.hub_projects where id = ${id}
    `) as { owner_id: string; status: string }[];
    if (!target || target.owner_id !== access.user.id) {
      return fail('Project not found or not owned by you.', 404);
    }
    await sql`
      with archived as (
        update bithub.hub_projects
        set status = 'archived'
        where id = ${id} and owner_id = ${access.user.id}
        returning id
      )
      update bithub.hub_project_xp
      set revoked_at = now()
      where project_id in (select id from archived) and revoked_at is null
    `;
    return json({ ok: true, status: 'archived' });
  } catch (error) {
    console.error('Project archive failed:', error);
    return fail('The project could not be archived.', 500);
  }
}
