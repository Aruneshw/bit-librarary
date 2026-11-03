export const DOMAINS = [
  "Cybersecurity",
  "AI/ML",
  "Web Development",
  "IoT",
  "Data Science",
  "UI/UX",
  "Cloud",
] as const;
export type HubPage =
  | "Home"
  | "Explore"
  | "Chat"
  | "Teams"
  | "Hackathons"
  | "Projects"
  | "Leaderboard"
  | "Profile";
export interface Student {
  id: string;
  name: string;
  department: string;
  college: string;
  year: number;
  bio: string;
  skills: string[];
  available: boolean;
  avatar_url: string | null;
  github_url: string;
  xp: number;
  project_count: number;
  achievement_count: number;
  visibility: string;
}
export interface Project {
  id: string;
  owner_id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  repository_url: string;
  demo_url: string;
  cover_path: string | null;
  status: "pending" | "approved" | "rejected" | "archived";
  created_at: string;
}
export interface Room {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  category: string;
  capacity: number;
  member_count: number;
  kind: "bubble" | "team";
  is_member: boolean;
  is_host: boolean;
  finalized_at: string | null;
  hackathon_ends_at: string | null;
  created_at: string;
}
export interface RoomInvite {
  id: string;
  room_id: string;
  inviter_id: string;
  invitee_id: string;
  status: "pending" | "accepted" | "declined";
  room_name: string;
}
export interface HubEvent {
  id: string;
  title: string;
  starts_at: string;
  location: string;
  tags: string[];
  url: string;
}
export interface Message {
  id: string;
  room_id: string;
  sender_id: string;
  body: string;
  created_at: string;
}
export interface HubNotification {
  id: string;
  user_id: string;
  body: string;
  read_at: string | null;
  created_at: string;
}
export interface Connection {
  id: string;
  sender_id: string;
  recipient_id: string;
  status: string;
}
export interface HubData {
  summary?: { students: number; projects: number; teams: number; events: number; rank: number | null };
  students: Student[];
  projects: Project[];
  rooms: Room[];
  events: HubEvent[];
  notifications: HubNotification[];
  connections: Connection[];
  invites: RoomInvite[];
}
export const EMPTY_HUB: HubData = {
  students: [],
  projects: [],
  rooms: [],
  events: [],
  notifications: [],
  connections: [],
  invites: [],
};
export function rankStudents(students: Student[]) {
  return [...students].sort(
    (a, b) =>
      b.xp - a.xp || a.name.localeCompare(b.name) || a.id.localeCompare(b.id),
  );
}
export function safeUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}
export function skillScores(student: Student, projects: Project[]) {
  return DOMAINS.slice(0, 6).map((domain) => ({
    domain,
    score: Math.min(
      5,
      (student.skills.includes(domain) ? 1 : 0) +
        projects.filter(
          (p) =>
            p.owner_id === student.id &&
            p.category === domain &&
            p.status === "approved",
        ).length,
    ),
  }));
}

/** Preserve events arriving while history/reconnect requests are in flight. */
export function mergeRoomMessages(roomId: string, current: Message[], incoming: Message[]) {
  const unique = new Map<string, Message>();
  for (const message of [...current, ...incoming]) {
    if (message.room_id === roomId) unique.set(message.id, message);
  }
  return [...unique.values()].sort((a, b) => a.created_at.localeCompare(b.created_at) || a.id.localeCompare(b.id));
}
