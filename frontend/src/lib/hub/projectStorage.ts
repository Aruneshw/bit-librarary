import 'server-only';
import { Files } from 'files-sdk';
import { neon } from 'files-sdk/neon';

let files: Files | null | undefined;

/**
 * Server-only Neon Object Storage client. The `uploads` bucket is private;
 * covers are streamed through `/api/hub/projects/[id]/cover` after the route
 * checks the viewer's access to the project.
 */
export function projectStorage(): Files | null {
  if (files !== undefined) return files;
  const ready = Boolean(
    process.env.AWS_ENDPOINT_URL_S3 &&
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_REGION,
  );
  if (!ready) {
    files = null;
    return files;
  }
  try {
    files = new Files({
      adapter: neon({ bucket: process.env.NEON_STORAGE_BUCKET || 'uploads' }),
    });
  } catch (error) {
    console.error('Neon Object Storage could not be initialized:', error);
    files = null;
  }
  return files;
}

export const PROJECT_COVER_PREFIX = 'hub-covers';

export function newCoverKey(ownerId: string, extension: string): string {
  return `${PROJECT_COVER_PREFIX}/${ownerId}/${crypto.randomUUID()}.${extension}`;
}
