import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublishableKey } from "@/lib/supabase";
import type { HubData } from "./types";
export function hubClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = getSupabasePublishableKey();
  return url && key ? createBrowserClient(url, key) : null;
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
      .from("hub_projects")
      .select("*")
      .neq("status", "archived")
      .order("created_at", { ascending: false })
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
  return {
    students: [...(results[0].data || []).filter(s => s.id !== user.id), ...(results[6].data ? [results[6].data] : [])],
    summary: results[7].data,
    projects: results[1].data!,
    rooms: results[2].data!,
    events: results[3].data!,
    notifications: results[4].data!,
    connections: results[5].data!,
  } as HubData;
}
