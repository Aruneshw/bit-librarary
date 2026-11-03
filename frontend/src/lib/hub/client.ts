import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublishableKey } from "@/lib/supabase";
import {
  rankStudents,
  type HubData,
  type Project,
  type RoomInvite,
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
  // Projects live in Neon behind an API route; fetching them alongside the
  // Supabase queries keeps the Hub's first paint off a serial round trip.
  const [results, projectData] = await Promise.all([
    Promise.all([
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
    client
      .from("hub_room_invites")
      .select("id,room_id,inviter_id,invitee_id,status")
      .eq("invitee_id", user.id)
      .eq("status", "pending")
      .limit(100),
    ]),
    loadProjects(),
  ]);
  if (results.some((r) => r.error))
    throw new Error(
      "BIT HUB could not load. Check your connection and that the Hub database setup has been applied.",
    );
  const rawStudents = (results[0].data || []) as Student[];
  const self = results[5].data as Student | null;
  const students = rankStudents(
    [...rawStudents.filter((student) => student.id !== user.id), ...(self ? [self] : [])].map(
      (student) => ({
        ...student,
        xp: projectData.stats[student.id]?.xp || 0,
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
  const rooms = (results[1].data || []) as HubData["rooms"];
  const inviteRows = (results[7].data || []) as Omit<RoomInvite, "room_name">[];
  return {
    students,
    summary: summary || undefined,
    projects: projectData.projects,
    rooms,
    events: results[2].data!,
    notifications: results[3].data!,
    connections: results[4].data!,
    invites: inviteRows.map(invite => ({
      ...invite,
      room_name: rooms.find(room => room.id === invite.room_id)?.name || "a team room",
    })),
  } as HubData;
}

/**
 * Targeted refreshers. Mutations used to reload the entire campus payload, which
 * kept the global busy flag (and therefore most buttons) disabled for seconds.
 * Each slice fetches only what the action can have changed.
 */
function requireClient() {
  const client = hubClient();
  if (!client) throw new Error("Supabase is not configured.");
  return client;
}

export async function loadRoomsSlice(): Promise<Pick<HubData, "rooms" | "invites">> {
  const client = requireClient();
  const { data: { user } } = await client.auth.getUser();
  const invitesFor = user?.id ?? "00000000-0000-0000-0000-000000000000";
  const [directory, invites] = await Promise.all([
    client
      .from("hub_room_directory")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    client
      .from("hub_room_invites")
      .select("id,room_id,inviter_id,invitee_id,status")
      .eq("invitee_id", invitesFor)
      .eq("status", "pending")
      .limit(100),
  ]);
  if (directory.error) throw new Error(directory.error.message);
  const rooms = (directory.data || []) as HubData["rooms"];
  return {
    rooms,
    invites: ((invites.data || []) as Omit<RoomInvite, "room_name">[]).map(invite => ({
      ...invite,
      room_name: rooms.find(room => room.id === invite.room_id)?.name || "a team room",
    })),
  };
}

export async function loadNotificationsSlice(): Promise<Pick<HubData, "notifications">> {
  const client = requireClient();
  const { data, error } = await client
    .from("hub_notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(error.message);
  return { notifications: (data || []) as HubData["notifications"] };
}

export async function loadConnectionsSlice(): Promise<Pick<HubData, "connections">> {
  const client = requireClient();
  const { data, error } = await client.from("hub_connections").select("*").limit(500);
  if (error) throw new Error(error.message);
  return { connections: (data || []) as HubData["connections"] };
}

/** Own row only: profile edits must not re-fetch every student on campus. */
export async function loadSelfSlice(userId: string): Promise<{ self: Student | null }> {
  const client = requireClient();
  const { data, error } = await client
    .from("hub_students")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return { self: (data as Student | null) ?? null };
}

export async function loadProjectsSlice(): Promise<{
  projects: Project[];
  students: Student[];
  approvedCount: number;
}> {
  const client = requireClient();
  const [projectData, studentsResult] = await Promise.all([
    loadProjects(),
    client
      .from("hub_students")
      .select("*")
      .order("xp", { ascending: false })
      .order("name")
      .order("id")
      .limit(500),
  ]);
  if (studentsResult.error) throw new Error(studentsResult.error.message);
  const students = rankStudents(
    ((studentsResult.data || []) as Student[]).map(student => ({
      ...student,
      xp: projectData.stats[student.id]?.xp || 0,
      project_count: projectData.stats[student.id]?.project_count ?? 0,
    })),
  );
  return {
    projects: projectData.projects,
    students,
    approvedCount: projectData.approvedCount,
  };
}
