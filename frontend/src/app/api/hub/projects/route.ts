import { requireApiUser } from '@/lib/auth/api';
import { projectsDb } from '@/lib/hub/projectsDb';
import {
  fail,
  getProfile,
  getProjectPolicy,
  getVisibilityMap,
  json,
  toProject,
  type ProjectRow,
  type ProjectStatsRow,
} from '@/lib/hub/projectServer';
import { newCoverKey, projectStorage } from '@/lib/hub/projectStorage';
import { validateProjectInput } from '@/lib/hub/projectValidation';

export const runtime = 'nodejs';

const projectColumns = `
  id, owner_id, title, description, category, technologies,
  repository_url, demo_url, cover_url, cover_key, status, reviewed_at,
  reviewed_by, created_at
`;

export async function GET(request: Request) {
  const access = await requireApiUser(request);
  if (access.error) return access.error;
  const sql = projectsDb();
  if (!sql) return fail('Project storage is not configured.', 503);

  try {
    const rows = (await sql`
      select ${sql.unsafe(projectColumns)}
      from bithub.hub_projects
      where status <> 'archived'
      order by created_at desc
      limit 500
    `) as ProjectRow[];
    const visibility = await getVisibilityMap();
    const visible = rows.filter(
      (row) =>
        row.owner_id === access.user.id ||
        (row.status === 'approved' && visibility.get(row.owner_id) === 'campus'),
    );
    const statsRows = (await sql`
      select p.owner_id::text as owner_id,
             count(*) filter (where p.status <> 'archived')::int as project_count,
             coalesce(sum(x.points) filter (where x.revoked_at is null), 0)::int as xp
      from bithub.hub_projects p
      left join bithub.hub_project_xp x on x.project_id = p.id
      group by p.owner_id
    `) as ProjectStatsRow[];
    const stats: Record<string, { xp: number; project_count: number }> = {};
    for (const row of statsRows) {
      if (row.owner_id === access.user.id || visibility.get(row.owner_id) === 'campus') {
        stats[row.owner_id] = {
          xp: Number(row.xp) || 0,
          project_count: Number(row.project_count) || 0,
        };
      }
    }
    return json({
      projects: visible.map(toProject),
      stats,
      approvedCount: visible.filter((row) => row.status === 'approved').length,
    });
  } catch (error) {
    console.error('Project list failed:', error);
    return fail('Projects could not be loaded.', 500);
  }
}

export async function POST(request: Request) {
  const access = await requireApiUser(request);
  if (access.error) return access.error;
  const sql = projectsDb();
  if (!sql) return fail('Project storage is not configured.', 503);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail('Invalid project submission.', 400);
  }

  let technologies: unknown = [];
  const rawTechnologies = form.get('technologies');
  if (typeof rawTechnologies === 'string' && rawTechnologies.trim()) {
    try {
      technologies = JSON.parse(rawTechnologies);
    } catch {
      return fail('Technologies must be a JSON array.', 400);
    }
  }
  const parsed = validateProjectInput({
    title: form.get('title'),
    description: form.get('description'),
    category: form.get('category'),
    technologies,
    repository_url: form.get('repository_url'),
    demo_url: form.get('demo_url'),
  });
  if (!parsed.ok) return fail(parsed.error, 400);
  const input = parsed.value;

  const profile = await getProfile(access.user.id);
  if (!profile) return fail('Create your student profile first.', 400);
  const policy = await getProjectPolicy();
  const cover = form.get('cover');

  let coverKey: string | null = null;
  let coverStorage: ReturnType<typeof projectStorage> = null;
  try {
    const [hourly] = (await sql`
      select count(*)::int as count
      from bithub.hub_projects
      where owner_id = ${access.user.id} and created_at > now() - interval '1 hour'
    `) as { count: number }[];
    if (Number(hourly?.count) >= 20) {
      return fail('Please wait before submitting more projects.', 429);
    }
    if (policy.max_projects != null) {
      const [active] = (await sql`
        select count(*)::int as count
        from bithub.hub_projects
        where owner_id = ${access.user.id} and status <> 'archived'
      `) as { count: number }[];
      if (Number(active?.count) >= policy.max_projects) {
        return fail('Project limit reached. Archive an older project first.', 400);
      }
    }

    if (cover instanceof File && cover.size > 0) {
      if (
        !['image/png', 'image/jpeg', 'image/webp'].includes(cover.type) ||
        cover.size > 5 * 1024 * 1024
      ) {
        return fail('Choose a PNG, JPG or WebP image under 5 MB.', 400);
      }
      coverStorage = projectStorage();
      if (!coverStorage) {
        return fail('Project cover storage is not configured.', 503);
      }
      const extension =
        cover.type === 'image/png' ? 'png' : cover.type === 'image/jpeg' ? 'jpg' : 'webp';
      coverKey = newCoverKey(access.user.id, extension);
      await coverStorage.upload(coverKey, Buffer.from(await cover.arrayBuffer()), {
        contentType: cover.type,
      });
    }

    const technologyJson = JSON.stringify(input.technologies);
    const [row] = (await sql`
      insert into bithub.hub_projects
        (owner_id, title, description, category, technologies,
         repository_url, demo_url, cover_key)
      values (
        ${access.user.id}, ${input.title}, ${input.description}, ${input.category},
        array(select jsonb_array_elements_text(${technologyJson}::jsonb)),
        ${input.repository_url}, ${input.demo_url}, ${coverKey}
      )
      returning ${sql.unsafe(projectColumns)}
    `) as ProjectRow[];
    return json({ project: toProject(row) }, 201);
  } catch (error) {
    if (coverKey && coverStorage) {
      try {
        await coverStorage.delete(coverKey);
      } catch { /* Orphan cleanup is best effort. */ }
    }
    const pgError = error as { code?: string; constraint?: string };
    if (pgError.code === '23505') {
      if (pgError.constraint === 'hub_projects_duplicate_title_idx') {
        return fail('You already have an active project with this title.', 409);
      }
      if (pgError.constraint === 'hub_projects_duplicate_repo_idx') {
        return fail('Another active project already uses this repository URL.', 409);
      }
      return fail('This project duplicates an existing submission.', 409);
    }
    console.error('Project submission failed:', error);
    return fail('The project could not be submitted.', 500);
  }
}
