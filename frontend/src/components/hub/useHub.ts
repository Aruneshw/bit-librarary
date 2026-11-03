"use client";
import { useCallback, useEffect, useState } from "react";
import { isAdminEmail } from "@/lib/adminEmails";
import { hubClient, loadHub } from "@/lib/hub/client";
import {
  loadConnectionsSlice,
  loadNotificationsSlice,
  loadProjectsSlice,
  loadRoomsSlice,
  loadSelfSlice,
} from "@/lib/hub/client";
import {
  EMPTY_HUB,
  mergeRoomMessages,
  type HubData,
  type Message,
  type Project,
  type Room,
  type Student,
} from "@/lib/hub/types";
type OAuthIdentity = {
  name: string;
  avatar_url: string | null;
};
function readOAuthIdentity(user: {
  email?: string | null;
  user_metadata?: Record<string, unknown> | null;
}): OAuthIdentity {
  const metadata = user.user_metadata || {};
  const name = [metadata.full_name, metadata.name].find(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0,
  );
  const avatar = [metadata.avatar_url, metadata.picture].find(
    (value): value is string =>
      typeof value === "string" && value.startsWith("https://"),
  );
  return {
    name: (name || user.email?.split("@")[0] || "").trim(),
    avatar_url: avatar || null,
  };
}
export function useHub() {
  const [data, setData] = useState<HubData>(EMPTY_HUB);
  const [userId, setUserId] = useState("");
  const [isReviewer, setIsReviewer] = useState(false);
  const [identity, setIdentity] = useState<OAuthIdentity>({
    name: "",
    avatar_url: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [chatStatus, setChatStatus] = useState("Connecting");
  const [hasOlder, setHasOlder] = useState(false);
  const refresh = useCallback(async () => setData(await loadHub()), []);
  const patch = useCallback(
    (part: Partial<HubData>) => setData(current => ({ ...current, ...part })),
    [],
  );
  // Refresh only the slice an action can have changed. The full campus reload
  // kept `busy` true for seconds, which is what made buttons feel unresponsive.
  const settle = useCallback(
    async (slice: Promise<Partial<HubData>>) => {
      try {
        patch(await slice);
      } catch {
        /* Keep the optimistic state; the next realtime event reconciles. */
      }
    },
    [patch],
  );
  const roomsNow = useCallback(() => settle(loadRoomsSlice()), [settle]);
  const refreshSelf = useCallback(async () => {
    try {
      const { self } = await loadSelfSlice(userId);
      if (!self) return;
      setData(current => ({
        ...current,
        students: current.students.some(s => s.id === self.id)
          ? current.students.map(s => (s.id === self.id ? self : s))
          : [...current.students, self],
      }));
    } catch {
      /* Ignore; the next full load corrects it. */
    }
  }, [userId]);
  const refreshProjects = useCallback(async () => {
    try {
      const slice = await loadProjectsSlice();
      setData(current => ({
        ...current,
        projects: slice.projects,
        students: slice.students,
        summary: current.summary
          ? { ...current.summary, projects: slice.approvedCount }
          : current.summary,
      }));
    } catch {
      /* Ignore; the next full load corrects it. */
    }
  }, []);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const client = hubClient();
        const user = (await client?.auth.getUser())?.data.user;
        if (!alive) return;
        if (!user) { window.location.replace('/login?next=/hub'); return; }
        setUserId(user.id);
        const oauth = readOAuthIdentity(user);
        setIdentity(oauth);
        if (oauth.avatar_url) {
          try {
            const { data: profile } = await client!
              .from("hub_profiles")
              .select("avatar_url")
              .eq("id", user.id)
              .maybeSingle();
            if (profile && profile.avatar_url !== oauth.avatar_url) {
              await client!
                .from("hub_profiles")
                .update({ avatar_url: oauth.avatar_url })
                .eq("id", user.id);
            }
          } catch {
            /* Keep the Google photo as a display fallback if sync fails. */
          }
        }
        setIsReviewer(isAdminEmail(user.email) || user.app_metadata.role === "admin");
        setData(await loadHub());
      } catch (cause) {
        if (alive) setError(cause instanceof Error ? cause.message : "BIT HUB could not load. Please retry.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    if (!userId) return;
    const client = hubClient();
    if (!client) return;
    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || (session?.user.id && session.user.id !== userId)) {
        setData(EMPTY_HUB); setMessages([]);
        window.location.replace('/login?next=/hub');
      }
    });
    return () => subscription.unsubscribe();
  }, [userId]);
  async function signOut() {
    await run(async () => {
      const { error } = await hubClient()!.auth.signOut();
      if (error) throw new Error('Could not sign out. Please try again.');
      setIdentity({ name: "", avatar_url: null });
      setData(EMPTY_HUB); setMessages([]);
      window.location.replace('/login?next=/hub');
    });
  }
  useEffect(() => {
    if (!userId) return;
    const client = hubClient();
    if (!client) return;
    // Notification bursts (connection spam, batch approvals) must not each
    // trigger a campus-wide reload; coalesce them into one refresh.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const channel = client
      .channel(`hub-updates-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "hub_notifications",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          clearTimeout(timer);
          timer = setTimeout(async () => {
            // A notification arriving only changes the notification list; a full
            // campus reload here was disabling the whole interface for seconds.
            void settle(loadNotificationsSlice());
            void settle(loadRoomsSlice());
            // Approvals change XP, which the leaderboard and cards display.
            await refreshProjects();
          }, 2500);
        },
      )
      .subscribe();
    return () => {
      clearTimeout(timer);
      void client.removeChannel(channel);
    };
  }, [userId, settle, refreshProjects]);
  useEffect(() => {
    if (!activeRoom) return;
    const client = hubClient();
    if (!client) return;
    let alive = true;
    queueMicrotask(() => {
      if (alive) {
        setMessages([]);
        setChatStatus("Connecting");
      }
    });
    const fetchMessages = async () => {
      const { data: rows, error } = await client
        .from("hub_messages")
        .select("*")
        .eq("room_id", activeRoom)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false })
        .limit(50);
      if (!alive) return;
      if (error) return;
      setMessages(old => mergeRoomMessages(activeRoom, old, rows as Message[]));
      setHasOlder(rows!.length === 50);
    };
    const channel = client
      .channel(`hub-room-${activeRoom}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "hub_messages",
          filter: `room_id=eq.${activeRoom}`,
        },
        (payload) => {
          if (!alive) return;
          const message = payload.new as Message;
          setMessages(old => mergeRoomMessages(activeRoom, old, [message]));
        },
      )
      .subscribe((status) => {
        if (!alive) return;
        setChatStatus(
          status === "SUBSCRIBED"
            ? "Live"
            : status === "CHANNEL_ERROR" || status === "TIMED_OUT"
              ? "Reconnecting"
              : "Connecting",
        );
        if (status === "SUBSCRIBED") void fetchMessages();
      });
    void fetchMessages();
    return () => {
      alive = false;
      void client.removeChannel(channel);
    };
  }, [activeRoom]);
  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await action();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.",
      );
      throw e;
    } finally {
      setBusy(false);
    }
  }
  async function rpc(name: string, args: Record<string, unknown>) {
    const client = hubClient();
    if (!client) throw new Error("Database connection unavailable.");
    const result = await client.rpc(name, args);
    if (result.error) throw new Error(result.error.message);
    return result.data;
  }
  // Directory rows are patched locally so navigation never waits for the
  // campus-wide refetch; the background refresh settles the authoritative data.
  function patchRoom(id: string, patch: (room: Room) => Room) {
    setData(current => ({
      ...current,
      rooms: current.rooms.map(room => (room.id === id ? patch(room) : room)),
    }));
  }
  function backgroundRefresh() {
    // Room-shaped mutations only need the directory back, not the whole campus.
    void settle(loadRoomsSlice());
  }
  async function joinRoom(room: Room) {
    await run(async () => {
      if (!room.is_member) {
        try {
          await rpc("hub_join_room", { room: room.id });
        } catch (cause) {
          throw new Error(cause instanceof Error && cause.message.includes("full")
            ? `“${room.name}” is full. Try another bubble.`
            : `Could not join “${room.name}”. Please try again.`);
        }
        patchRoom(room.id, item => ({ ...item, is_member: true, member_count: item.member_count + 1 }));
        backgroundRefresh();
      }
      setActiveRoom(room.id);
    });
  }
  async function leaveRoom(room: Room) {
    await run(async () => {
      if (room.is_host) {
        // Closing your own room cancels it for everyone, matching the DB rule.
        await rpc("hub_cancel_room", { room: room.id, reason: "" });
        backgroundRefresh();
        setActiveRoom(null);
        setNotice(`“${room.name}” is closed. Students were notified.`);
        return;
      }
      const { error } = await hubClient()!
        .from("hub_room_members")
        .delete()
        .eq("room_id", room.id)
        .eq("user_id", userId);
      if (error) throw new Error(error.message);
      patchRoom(room.id, item => ({ ...item, is_member: false, member_count: Math.max(0, item.member_count - 1) }));
      backgroundRefresh();
      setActiveRoom(null);
    });
  }
  async function cancelRoom(room: Room, reason = "") {
    await run(async () => {
      await rpc("hub_cancel_room", { room: room.id, reason });
      backgroundRefresh();
      setActiveRoom(null);
      setNotice(`“${room.name}” is closed.`);
    });
  }
  async function removeMember(room: Room, member: string) {
    await run(async () => {
      await rpc("hub_remove_member", { room: room.id, member });
      patchRoom(room.id, item => ({ ...item, member_count: Math.max(0, item.member_count - 1) }));
      backgroundRefresh();
    });
  }
  async function inviteMembers(room: Room, members: string[]): Promise<number> {
    let invited = 0;
    await run(async () => {
      invited = Number(await rpc("hub_invite_members", { room: room.id, members })) || 0;
      setNotice(`${invited} invitation${invited === 1 ? "" : "s"} sent.`);
      await roomsNow();
    });
    return invited;
  }
  async function respondInvite(invite: string, accept: boolean) {
    const roomId = data.invites.find(item => item.id === invite)?.room_id ?? null;
    await run(async () => {
      await rpc("hub_respond_invite", { invite, accept });
      await roomsNow();
      if (accept && roomId) setActiveRoom(roomId);
    });
  }
  async function finalizeTeam(room: Room, finalists: string[], endsAt: string) {
    await run(async () => {
      await rpc("hub_finalize_team", { room: room.id, finalists, ends_at: endsAt });
      await roomsNow();
      setNotice("Team finalised. Everyone selected was notified.");
    });
  }
  async function sendMessage(body: string) {
    if (!body.trim() || !activeRoom) return;
    await run(async () => {
      const { data: row, error } = await hubClient()!
        .from("hub_messages")
        .insert({ room_id: activeRoom, body: body.trim(), sender_id: userId })
        .select()
        .single();
      if (error) throw new Error(error.message);
      setMessages((m) =>
        m.some((item) => item.id === row.id) ? m : [...m, row as Message],
      );
    });
  }
  async function olderMessages() {
    await run(async () => {
      const first = messages[0];
      if (!first || !activeRoom) return;
      const { data: rows, error } = await hubClient()!
        .from("hub_messages")
        .select("*")
        .eq("room_id", activeRoom)
        .or(`created_at.lt.${first.created_at},and(created_at.eq.${first.created_at},id.lt.${first.id})`)
        .order("created_at", { ascending: false })
        .order("id", { ascending: false })
        .limit(50);
      if (error) throw new Error(error.message);
      setMessages(old => mergeRoomMessages(activeRoom, old, rows as Message[]));
      setHasOlder(rows!.length === 50);
    });
  }
  async function createRoom(
    input: Pick<
      Room,
      "name" | "description" | "category" | "capacity" | "kind"
    >,
  ) {
    await run(async () => {
      const id = await rpc("hub_create_room", { input });
      setData(current => ({
        ...current,
        rooms: [
          {
            id,
            owner_id: userId,
            is_host: true,
            finalized_at: null,
            hackathon_ends_at: null,
            name: input.name,
            description: input.description,
            category: input.category,
            capacity: input.capacity,
            kind: input.kind,
            member_count: 1,
            is_member: true,
            created_at: new Date().toISOString(),
          },
          ...current.rooms,
        ],
      }));
      backgroundRefresh();
      setActiveRoom(id);
      setNotice(
        `${input.kind === "team" ? "Team" : "Bubble"} created. Your discussion room is ready.`,
      );
    });
  }
  async function connect(recipient: Student) {
    await run(async () => {
      if (
        data.connections.some(
          (c) =>
            (c.sender_id === userId && c.recipient_id === recipient.id) ||
            (c.recipient_id === userId && c.sender_id === recipient.id),
        )
      )
        return;
      const { error } = await hubClient()!
        .from("hub_connections")
        .insert({ sender_id: userId, recipient_id: recipient.id });
      if (error) throw new Error(error.message);
      await settle(loadConnectionsSlice());
      setNotice(`Connection request sent to ${recipient.name}.`);    });
  }
  async function acceptConnection(id: string) {
    await run(async () => {
      await rpc("hub_accept_connection", { connection: id });
      await settle(
        Promise.all([loadConnectionsSlice(), loadNotificationsSlice()]).then(
          ([connections, notifications]) => ({ ...connections, ...notifications }),
        ),
      );
      setNotice("Connection accepted.");
    });
  }
  async function saveProfile(input: Partial<Student>) {
    await run(async () => {
      const payload = {
        id: userId,
        ...input,
        ...(identity.avatar_url && !input.avatar_url
          ? { avatar_url: identity.avatar_url }
          : {}),
      };
      const { error } = await hubClient()!
        .from("hub_profiles")
        .upsert(payload);
      if (error) throw new Error(error.message);
      await refreshSelf();
      setNotice("Your student profile is saved.");
    });
  }
  async function addProject(
    input: Pick<
      Project,
      | "title"
      | "description"
      | "category"
      | "technologies"
      | "repository_url"
      | "demo_url"
    >,
    cover: File | null,
  ) {
    await run(async () => {
      if (cover) {
        if (
          !["image/png", "image/jpeg", "image/webp"].includes(cover.type) ||
          cover.size > 5 * 1024 * 1024
        )
          throw new Error("Choose a PNG, JPG or WebP image under 5 MB.");
      }
      const form = new FormData();
      form.set("title", input.title);
      form.set("description", input.description);
      form.set("category", input.category);
      form.set("technologies", JSON.stringify(input.technologies));
      form.set("repository_url", input.repository_url);
      form.set("demo_url", input.demo_url);
      if (cover) form.set("cover", cover);
      const response = await fetch("/api/hub/projects", {
        method: "POST",
        body: form,
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      if (!response.ok)
        throw new Error(payload?.error || "The project could not be submitted.");
      await refreshProjects();
      setNotice(
        "Project submitted. It appears on your profile; XP is awarded after approval.",
      );
    });
  }
  async function archiveProject(id: string) {
    await run(async () => {
      const response = await fetch(
        `/api/hub/projects/${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "archive" }),
          credentials: "same-origin",
        },
      );
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      if (!response.ok)
        throw new Error(payload?.error || "The project could not be archived.");
      await refreshProjects();
      setNotice("Project archived.");
    });
  }
  async function readNotifications() {
    await run(async () => {
      const date = new Date().toISOString();
      const { error } = await hubClient()!
        .from("hub_notifications")
        .update({ read_at: date })
        .eq("user_id", userId);
      if (error) throw new Error(error.message);
      await settle(loadNotificationsSlice());
    });
  }
  return {
    demo: false,
    data,
    userId,
    loading,
    error,
    notice,
    busy,
    messages,
    activeRoom,
    chatStatus,
    hasOlder,
    setActiveRoom,
    setError,
    setNotice,
    identityName: identity.name,
    identityAvatar: identity.avatar_url,
    refresh,
    joinRoom,
    leaveRoom,
    cancelRoom,
    removeMember,
    inviteMembers,
    respondInvite,
    finalizeTeam,
    createRoom,
    connect,
    acceptConnection,
    saveProfile,
    addProject,
    archiveProject,
    sendMessage,
    olderMessages,
    readNotifications,
    signOut,
    isReviewer,
  };
}
