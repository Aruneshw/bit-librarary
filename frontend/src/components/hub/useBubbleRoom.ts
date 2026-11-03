"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { hubClient } from "@/lib/hub/client";
export type BubbleMember = { id: string; name: string; joined_at: string; online: boolean; typing: boolean; team_status: 'member' | 'finalist'; slot: number };
export function useBubbleRoom(room: string) {
  const [members, setMembers] = useState<BubbleMember[]>([]);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastPulse = useRef(0);
  const clearTyping = useCallback(() => {
    clearTimeout(typingTimer.current);
    void hubClient()?.rpc("hub_set_typing", { room, typing: false });
  }, [room]);
  const pulseTyping = useCallback(() => {
    const now = Date.now();
    if (now - lastPulse.current > 2500) {
      lastPulse.current = now;
      void hubClient()?.rpc("hub_set_typing", { room, typing: true });
    }
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(clearTyping, 5000);
  }, [room, clearTyping]);
  useEffect(() => {
    const client = hubClient();
    if (!client) return;
    let alive = true;
    let running = false;
    const slots = new Map<string, number>();
    const session = crypto.randomUUID();
    async function sync(pulse = false) {
      if (running || !alive) return;
      running = true;
      try {
        if (pulse) {
          const result = await client!.rpc("hub_bubble_pulse", { room, session });
          if (result.error) throw result.error;
        }
        const result = await client!.rpc("hub_bubble_roster", { room });
        if (result.error) throw result.error;
        if (alive) {
          const rows = (result.data || []) as BubbleMember[];
          for (const id of slots.keys()) if (!rows.some(row => row.id === id)) slots.delete(id);
          for (const row of rows) if (!slots.has(row.id)) {
            let slot = 0;
            while ([...slots.values()].includes(slot)) slot++;
            slots.set(row.id, slot);
          }
          setMembers(rows.map(row => ({ ...row, slot: slots.get(row.id)! })));
          setError("");
        }
      } catch {
        if (alive) { setError("Live zone unavailable. Retrying automatically…"); setConnected(false); setMembers([]); }
      } finally { running = false; }
    }
    const channel = client.channel(`bubble-zone-${room}-${session}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "hub_room_presence", filter: `room_id=eq.${room}` }, () => void sync())
      .subscribe(status => {
        if (!alive) return;
        setConnected(status === "SUBSCRIBED");
        if (status === "SUBSCRIBED") void sync(true);
      });
    void sync(true);
    const timer = setInterval(() => void sync(true), 15000);
    const focus = () => void sync(true);
    window.addEventListener("online", focus);
    return () => {
      alive = false;
      clearInterval(timer);
      clearTimeout(typingTimer.current);
      window.removeEventListener("online", focus);
      void client.removeChannel(channel);
      // Per-tab sessions keep another open tab online. Abandoned sessions expire after 45s.
      void client.rpc("hub_bubble_pulse", { room, session, exiting: true });
      void client.rpc("hub_set_typing", { room, typing: false });
    };
  }, [room]);
  return { members, error, connected, pulseTyping, clearTyping };
}
