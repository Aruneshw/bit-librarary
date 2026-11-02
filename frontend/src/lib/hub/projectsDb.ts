import 'server-only';
import { neon } from '@neondatabase/serverless';

type Sql = ReturnType<typeof neon>;

let client: Sql | null | undefined;

/**
 * Server-only Neon client for BIT HUB project storage.
 * Returns null when NEON_DATABASE_URL has not been configured.
 */
export function projectsDb(): Sql | null {
  if (client !== undefined) return client;
  const url = process.env.NEON_DATABASE_URL;
  client = url ? neon(url) : null;
  return client;
}
