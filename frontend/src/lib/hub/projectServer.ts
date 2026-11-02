import 'server-only';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { Project } from './types';

export interface ProjectRow {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[] | string;
  repository_url: string;
  demo_url: string;
  cover_url: string | null;
  cover_key: string | null;
  status: Project['status'];
  reviewed_at: string | Date | null;
  reviewed_by: string | null;
  created_at: string | Date;
}

export interface ProjectStatsRow {
  owner_id: string;
  project_count: number;
  xp: number;
}

export interface ProjectPolicy {
  project_xp: number;
  max_projects: number | null;
}

const DEFAULT_POLICY: ProjectPolicy = { project_xp: 5, max_projects: null };

export function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'private, no-store' },
  });
}

export function fail(message: string, status: number) {
  return json({ error: message }, status);
}

function iso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') return value;
  return new Date(String(value)).toISOString();
}

function technologies(value: ProjectRow['technologies']): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== 'string') return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch { /* Fall through to the Postgres array literal parser. */ }
  if (value.startsWith('{') && value.endsWith('}')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => item.replace(/^"|"$/g, '').trim())
      .filter(Boolean);
  }
  return [];
}

export function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    owner_id: row.owner_id,
    title: row.title,
    description: row.description,
    category: row.category,
    technologies: technologies(row.technologies),
    repository_url: row.repository_url,
    demo_url: row.demo_url,
    cover_path: row.cover_key
      ? `/api/hub/projects/${row.id}/cover`
      : row.cover_url,
    status: row.status,
    created_at: iso(row.created_at),
  };
}

export interface ProfileInfo {
  id: string;
  name: string;
  visibility: string;
}

export async function getProfile(userId: string): Promise<ProfileInfo | null> {
  const admin = supabaseAdmin();
  if (!admin) return null;
  const { data, error } = await admin
    .from('hub_profiles')
    .select('id,name,visibility')
    .eq('id', userId)
    .maybeSingle();
  if (error || !data) return null;
  return data as ProfileInfo;
}

export async function getVisibilityMap(): Promise<Map<string, string>> {
  const admin = supabaseAdmin();
  const map = new Map<string, string>();
  if (!admin) return map;
  const { data } = await admin.from('hub_profiles').select('id,visibility').limit(5000);
  for (const profile of data || []) map.set(String(profile.id), String(profile.visibility));
  return map;
}

export async function getNames(ids: string[]): Promise<Map<string, string>> {
  const admin = supabaseAdmin();
  const map = new Map<string, string>();
  if (!admin || !ids.length) return map;
  const { data } = await admin.from('hub_profiles').select('id,name').in('id', ids);
  for (const profile of data || []) map.set(String(profile.id), String(profile.name));
  return map;
}

export async function getProjectPolicy(): Promise<ProjectPolicy> {
  const admin = supabaseAdmin();
  if (!admin) return DEFAULT_POLICY;
  const { data } = await admin
    .from('hub_policy')
    .select('project_xp,max_projects')
    .eq('id', true)
    .maybeSingle();
  if (!data) return DEFAULT_POLICY;
  return {
    project_xp: Number(data.project_xp) || 0,
    max_projects: data.max_projects == null ? null : Number(data.max_projects),
  };
}

/** Project notifications stay in the existing Supabase notification feed. */
export async function notifyProject(userId: string, body: string, sourceKey: string): Promise<void> {
  const admin = supabaseAdmin();
  if (!admin) return;
  const { error } = await admin.from('hub_notifications').upsert(
    { user_id: userId, body, source_key: sourceKey },
    { onConflict: 'source_key', ignoreDuplicates: true },
  );
  if (error) console.error('Project notification could not be stored:', error.message);
}
