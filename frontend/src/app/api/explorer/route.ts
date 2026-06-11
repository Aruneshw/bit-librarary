import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getSupabasePublishableKey } from '@/lib/supabase';
import { isAdminEmail } from '@/lib/adminEmails';
import fs from 'fs/promises';
import path from 'path';

const IGNORE = new Set([
  'node_modules', '.git', '.next', 'dist', 'build',
]);

function shouldIgnore(name: string): boolean {
  return IGNORE.has(name);
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  size?: number;
}

async function readTree(dir: string, depth: number = 0, maxDepth: number = 10): Promise<FileNode[]> {
  if (depth > maxDepth) return [];

  const entries: FileNode[] = [];
  let names: string[];

  try {
    names = await fs.readdir(dir);
  } catch {
    return [];
  }

  names.sort((a, b) => {
    const aIsDir = a.startsWith('.') ? 1 : 0;
    const bIsDir = b.startsWith('.') ? 1 : 0;
    if (aIsDir !== bIsDir) return aIsDir - bIsDir;
    return a.localeCompare(b);
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
    const depth = Math.min(Number(new URL(request.url).searchParams.get('depth')) || 10, 12);
    const tree = await readTree(rootDir, 0, depth);

    return NextResponse.json({ root: path.basename(rootDir), path: rootDir, tree });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to read directory' }, { status: 500 });
  }
}
