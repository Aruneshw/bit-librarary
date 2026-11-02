import { requireApiUser } from '@/lib/auth/api';
import { canAdminister } from '@/lib/auth/access';
import { projectsDb } from '@/lib/hub/projectsDb';
import { fail, getProfile } from '@/lib/hub/projectServer';
import { projectStorage } from '@/lib/hub/projectStorage';
import { isUuid } from '@/lib/hub/projectValidation';

export const runtime = 'nodejs';

/**
 * Authenticated cover proxy. The Neon Object Storage bucket is private, so
 * <img> requests come here with the Supabase session cookie. The route applies
 * the same visibility rules as the project list: owners and admins always see
 * the cover; other students only see approved projects of campus-visible
 * owners.
 */
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const access = await requireApiUser(request);
  if (access.error) return access.error;
  const { id } = await context.params;
  if (!isUuid(id)) return fail('Cover not found.', 404);

  const sql = projectsDb();
  if (!sql) return fail('Project storage is not configured.', 503);

  try {
    const [project] = (await sql`
      select owner_id, status, cover_key, cover_url
      from bithub.hub_projects
      where id = ${id}
    `) as {
      owner_id: string;
      status: string;
      cover_key: string | null;
      cover_url: string | null;
    }[];

    if (!project) return fail('Cover not found.', 404);

    let allowed = project.owner_id === access.user.id || canAdminister(access.user);
    if (!allowed && project.status === 'approved') {
      const owner = await getProfile(project.owner_id);
      allowed = owner?.visibility === 'campus';
    }
    if (!allowed) return fail('Cover not found.', 404);

    if (!project.cover_key) {
      if (project.cover_url) {
        return new Response(null, {
          status: 302,
          headers: { Location: project.cover_url, 'Cache-Control': 'private, no-store' },
        });
      }
      return fail('Cover not found.', 404);
    }

    const storage = projectStorage();
    if (!storage) return fail('Project cover storage is not configured.', 503);
    const file = await storage.download(project.cover_key);
    return new Response(file.stream(), {
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
        'Content-Length': String(file.size),
        'Cache-Control': 'private, max-age=300',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Project cover could not be served:', error);
    return fail('Cover not found.', 404);
  }
}
