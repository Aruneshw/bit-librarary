"use client";
import { useCallback, useEffect, useState } from "react";
import { isAdminEmail } from "@/lib/adminEmails";
import { demoAllowed } from "@/lib/auth/redirect";
import { hubClient, loadHub } from "@/lib/hub/client";
import { DEMO_DATA, DEMO_MESSAGES, DEMO_USER_ID } from "@/lib/hub/demo";
import {
  EMPTY_HUB,
  mergeRoomMessages,
  type HubData,
  type Message,
  type Project,
  type Room,
  type Student,
} from "@/lib/hub/types";
const DEMO_KEY = "bithub-demo-v1";
export function useHub() {
  const [data, setData] = useState<HubData>(EMPTY_HUB);
  const [userId, setUserId] = useState("");
  const [isReviewer, setIsReviewer] = useState(false);
  const [demo, setDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [chatStatus, setChatStatus] = useState("Connecting");
  const [hasOlder, setHasOlder] = useState(false);
  const refresh = useCallback(async () => setData(await loadHub()), []);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const client = hubClient();
        const forceDemo =
          new URLSearchParams(window.location.search).get("demo") === "1" && demoAllowed(process.env.NODE_ENV, process.env.NEXT_PUBLIC_HUB_DEMO_ENABLED);
        const user = forceDemo
          ? null
          : (await client?.auth.getUser())?.data.user;
        if (!alive) return;
        if (!user && !forceDemo) { window.location.replace('/login?next=/hub'); return; }
        if (forceDemo) {
          setDemo(true);
          setUserId(DEMO_USER_ID);
          try {
            const saved = JSON.parse(
              sessionStorage.getItem(DEMO_KEY) || "null",
            );
            setData(
              saved?.data?.students ? saved.data : structuredClone(DEMO_DATA),
            );
            setMessages(saved?.messages || DEMO_MESSAGES);
          } catch {
            setData(structuredClone(DEMO_DATA));
            setMessages(DEMO_MESSAGES);
          }
        } else {
          setUserId(user!.id);
          setIsReviewer(isAdminEmail(user!.email) || user!.app_metadata.role === "admin");
          setData(await loadHub());
        }
      } catch {
        if (alive)
          setError(
            "Could not connect to BIT HUB. Retry, or open the demo to review the interface.",
          );
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    if (demo || !userId) return;
    const client = hubClient();
    if (!client) return;
    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || (session?.user.id && session.user.id !== userId)) {
        setData(EMPTY_HUB); setMessages([]);
        window.location.replace('/login?next=/hub');
      }
    });
    return () => subscription.unsubscribe();
  }, [demo, userId]);
  async function signOut() {
    await run(async () => {
      const { error } = await hubClient()!.auth.signOut({ scope: 'local' });
      if (error) throw new Error('Could not sign out. Please try again.');
      setData(EMPTY_HUB); setMessages([]);
      window.location.replace('/login?next=/hub');
    });
  }
  useEffect(() => {
    if (demo && !loading) {
      try {
        sessionStorage.setItem(DEMO_KEY, JSON.stringify({ data, messages }));
      } catch {
        /* Demo can continue if browser storage is full. */
      }
    }
  }, [demo, data, messages, loading]);
  useEffect(() => {
    if (demo || !userId) return;
    const client = hubClient();
    if (!client) return;
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
          refresh().catch(() =>
            setError("Live updates interrupted. Please retry."),
          );
        },
      )
      .subscribe();
    return () => {
      void client.removeChannel(channel);
    };
  }, [demo, userId, refresh]);
  useEffect(() => {
    if (!activeRoom || demo) return;
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
      if (error) {
        setError("Unable to load messages. Try reopening the room.");
        return;
      }
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
  }, [activeRoom, demo]);
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
  async function joinRoom(room: Room) {
    await run(async () => {
      if (!room.is_member) {
        if (demo) {
          if (room.member_count >= room.capacity)
            throw new Error("This room is full. Try another bubble.");
          setData((d) => ({
            ...d,
            rooms: d.rooms.map((r) =>
              r.id === room.id
                ? { ...r, is_member: true, member_count: r.member_count + 1 }
                : r,
            ),
          }));
        } else {
          await rpc("hub_join_room", { room: room.id });
          await refresh();
        }
      }
      setActiveRoom(room.id);
    });
  }
  async function leaveRoom(room: Room) {
    await run(async () => {
      if (room.owner_id === userId)
        throw new Error(
          "As the room host, keep your place until the room is closed.",
        );
      if (demo)
        setData((d) => ({
          ...d,
          rooms: d.rooms.map((r) =>
            r.id === room.id
              ? { ...r, is_member: false, member_count: r.member_count - 1 }
              : r,
          ),
        }));
      else {
        const { error } = await hubClient()!
          .from("hub_room_members")
          .delete()
          .eq("room_id", room.id)
          .eq("user_id", userId);
        if (error) throw new Error(error.message);
        await refresh();
      }
      setActiveRoom(null);
    });
  }
  async function sendMessage(body: string) {
    if (!body.trim() || !activeRoom) return;
    await run(async () => {
      const message = {
        id: crypto.randomUUID(),
        room_id: activeRoom,
        sender_id: userId,
        body: body.trim(),
        created_at: new Date().toISOString(),
      };
      if (demo) setMessages((m) => [...m, message]);
      else {
        const { data: row, error } = await hubClient()!
          .from("hub_messages")
          .insert({ room_id: activeRoom, body: body.trim(), sender_id: userId })
          .select()
          .single();
        if (error) throw new Error(error.message);
        setMessages((m) =>
          m.some((item) => item.id === row.id) ? m : [...m, row as Message],
        );
      }
    });
  }
  async function olderMessages() {
    await run(async () => {
      const first = messages[0];
      if (!first || !activeRoom || demo) return;
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
      let id: string;
      if (demo) {
        id = crypto.randomUUID();
        setData((d) => ({
          ...d,
          rooms: [
            {
              ...input,
              id,
              owner_id: userId,
              member_count: 1,
              is_member: true,
              created_at: new Date().toISOString(),
            },
            ...d.rooms,
          ],
        }));
      } else {
        id = await rpc("hub_create_room", { input });
        await refresh();
      }
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
      if (demo)
        setData((d) => ({
          ...d,
          connections: [
            ...d.connections,
            {
              id: crypto.randomUUID(),
              sender_id: userId,
              recipient_id: recipient.id,
              status: "pending",
            },
          ],
        }));
      else {
        const { error } = await hubClient()!
          .from("hub_connections")
          .insert({ sender_id: userId, recipient_id: recipient.id });
        if (error) throw new Error(error.message);
        await refresh();
      }
      setNotice(`Connection request sent to ${recipient.name}.`);
    });
  }
  async function acceptConnection(id: string) {
    await run(async () => {
      if (demo)
        setData((d) => ({
          ...d,
          connections: d.connections.map((c) =>
            c.id === id ? { ...c, status: "accepted" } : c,
          ),
        }));
      else {
        await rpc("hub_accept_connection", { connection: id });
        await refresh();
      }
      setNotice("Connection accepted.");
    });
  }
  async function saveProfile(input: Partial<Student>) {
    await run(async () => {
      if (demo)
        setData((d) => ({
          ...d,
          students: d.students.map((s) =>
            s.id === userId ? { ...s, ...input } : s,
          ),
        }));
      else {
        const { error } = await hubClient()!
          .from("hub_profiles")
          .upsert({ id: userId, ...input });
        if (error) throw new Error(error.message);
        await refresh();
      }
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
      let coverPath: string | null = null;
      if (cover) {
        if (
          !["image/png", "image/jpeg", "image/webp"].includes(cover.type) ||
          cover.size > 5 * 1024 * 1024
        )
          throw new Error("Choose a PNG, JPG or WebP image under 5 MB.");
        if (!demo) {
          coverPath = `${userId}/${crypto.randomUUID()}.${cover.type.split("/")[1]}`;
          const { error } = await hubClient()!
            .storage.from("hub-covers")
            .upload(coverPath, cover, {
              contentType: cover.type,
              upsert: false,
            });
          if (error) throw new Error(error.message);
        } else {
          coverPath = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(cover);
          });
        }
      }
      if (demo) {
        const project: Project = {
          ...input,
          id: crypto.randomUUID(),
          owner_id: userId,
          cover_path: coverPath,
          status: "pending",
          created_at: new Date().toISOString(),
        };
        setData((d) => ({
          ...d,
          projects: [project, ...d.projects],
          students: d.students.map((s) =>
            s.id === userId ? { ...s, project_count: s.project_count + 1 } : s,
          ),
        }));
      } else {
        try {
          await rpc("hub_submit_project", {
            input: { ...input, cover_path: coverPath },
          });
          await refresh();
        } catch (error) {
          if (coverPath)
            await hubClient()!.storage.from("hub-covers").remove([coverPath]);
          throw error;
        }
      }
      setNotice(
        "Project submitted. It appears on your profile; +5 XP is awarded after approval.",
      );
    });
  }
  async function archiveProject(id: string) {
    await run(async () => {
      if (demo) {
        const p = data.projects.find((p) => p.id === id);
        setData((d) => ({
          ...d,
          projects: d.projects.filter((p) => p.id !== id),
          students: d.students.map((s) =>
            s.id === userId
              ? {
                  ...s,
                  project_count: Math.max(0, s.project_count - 1),
                  xp: s.xp - (p?.status === "approved" ? 5 : 0),
                }
              : s,
          ),
        }));
      } else {
        await rpc("hub_archive_project", { project: id });
        await refresh();
      }
      setNotice("Project archived.");
    });
  }
  async function readNotifications() {
    await run(async () => {
      const date = new Date().toISOString();
      if (demo)
        setData((d) => ({
          ...d,
          notifications: d.notifications.map((n) => ({ ...n, read_at: date })),
        }));
      else {
        const { error } = await hubClient()!
          .from("hub_notifications")
          .update({ read_at: date })
          .eq("user_id", userId);
        if (error) throw new Error(error.message);
        await refresh();
      }
    });
  }
  return {
    data,
    userId,
    demo,
    loading,
    error,
    notice,
    busy,
    messages,
    activeRoom,
    chatStatus: demo ? "Demo room" : chatStatus,
    hasOlder,
    setActiveRoom,
    setError,
    setNotice,
    refresh,
    joinRoom,
    leaveRoom,
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
