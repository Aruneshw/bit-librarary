import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSupabasePublishableKey } from '@/lib/supabase';
import { isAdminEmail } from '@/lib/adminEmails';
import fs from 'fs/promises';
import path from 'path';

const IGNORE = new Set([
  'node_modules', '.git', '.next', 'out', 'dist', 'build',
  '.cache', '.vercel', '.turbo', 'coverage',
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lock',
  '.env', '.env.local', '.env.production',
  '*.log', '.DS_Store',
]);

function shouldIgnore(name: string): boolean {
  if (IGNORE.has(name)) return true;
  if (name.startsWith('.')) return true;
  if (name.endsWith('.log')) return true;
  return false;
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  size?: number;
}

async function readTree(dir: string, depth: number = 0, maxDepth: number = 5): Promise<FileNode[]> {
  if (depth > maxDepth) return [];

  const entries: FileNode[] = [];
  let names: string[];

  try {
    names = await fs.readdir(dir);
  } catch {
    return [];
  }

  names.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  for (const name of names) {
    if (shouldIgnore(name)) continue;

    const full = path.join(dir, name);
    let stat;
    try {
      stat = await fs.stat(full);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      const children = await readTree(full, depth + 1, maxDepth);
      entries.push({ name, type: 'folder', children: children.length > 0 ? children : undefined });
    } else {
      entries.push({ name, type: 'file', size: stat.size });
    }
  }

  return entries;
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      getSupabasePublishableKey(),
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value; },
          set(name: string, value: string, options: CookieOptions) { cookieStore.set({ name, value, ...options }); },
          remove(name: string, options: CookieOptions) { cookieStore.delete({ name, ...options }); },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const rootDir = path.resolve(process.cwd(), '..');
    const tree = await readTree(rootDir, 0, Number(new URL(request.url).searchParams.get('depth')) || 4);

    return NextResponse.json({ root: path.basename(rootDir), tree });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to read directory' }, { status: 500 });
  }
}
