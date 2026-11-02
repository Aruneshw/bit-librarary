import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublishableKey } from "@/lib/supabase";
import {
  rankStudents,
  type HubData,
  type Project,
  type Student,
} from "./types";

export function hubClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = getSupabasePublishableKey();
  return url && key ? createBrowserClient(url, key) : null;
}

export interface ProjectsPayload {
  projects: Project[];
  stats: Record<string, { xp: number; project_count: number }>;
  approvedCount: number;
  error?: string;
}

/**
 * Project records live in Neon and are read through an authenticated API so
 * the database connection string never reaches the browser. Profile,
 * room, event, and notification data remain in Supabase.
 */
export async function loadProjects(): Promise<ProjectsPayload> {
  const response = await fetch("/api/hub/projects", {
    cache: "no-store",
    credentials: "same-origin",
  });
  const payload = (await response.json().catch(() => null)) as ProjectsPayload | null;
  if (!response.ok || !payload) {
    throw new Error(payload?.error || "Projects could not be loaded.");
  }
  return payload;
}

export async function loadHub(): Promise<HubData> {
  const client = hubClient();
  if (!client) throw new Error("Supabase is not configured.");
  const { data: { user } } = await client.auth.getUser();
  if (!user) throw new Error("Please sign in again.");
  const results = await Promise.all([
    client
      .from("hub_students")
      .select("*")
      .order("xp", { ascending: false })
      .order("name")
      .order("id")
      .limit(500),
    client
      .from("hub_room_directory")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    client
      .from("hub_hackathons")
      .select("*")
      .gte("starts_at", new Date().toISOString())
      .order("starts_at")
      .limit(100),
    client
      .from("hub_notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    client.from("hub_connections").select("*").limit(500),
    client.from("hub_students").select("*").eq("id", user.id).maybeSingle(),
    client.rpc("hub_metrics"),
  ]);
  if (results.some((r) => r.error))
    throw new Error(
      "BIT HUB could not load. Check your connection and that the Hub database setup has been applied.",
    );
  const projectData = await loadProjects();
  const rawStudents = (results[0].data || []) as Student[];
  const self = results[5].data as Student | null;
  const students = rankStudents(
    [...rawStudents.filter((student) => student.id !== user.id), ...(self ? [self] : [])].map(
      (student) => ({
        ...student,
        xp: (Number(student.xp) || 0) + (projectData.stats[student.id]?.xp || 0),
        project_count: projectData.stats[student.id]?.project_count ?? 0,
      }),
    ),
  );
  const summary = results[6].data as HubData["summary"] | null;
  if (summary) {
    summary.projects = projectData.approvedCount;
    const position = students.findIndex((student) => student.id === user.id);
    summary.rank = position >= 0 ? position + 1 : null;
  }
  return {
    students,
    summary: summary || undefined,
    projects: projectData.projects,
    rooms: results[1].data!,
    events: results[2].data!,
    notifications: results[3].data!,
    connections: results[4].data!,
  } as HubData;
}
