'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';

interface AdminRoom {
  id: string;
  name: string;
  kind: 'bubble' | 'team';
  category: string;
  capacity: number;
  created_at: string;
  finalized_at?: string | null;
  hackathon_ends_at?: string | null;
  owner_id: string;
  owner_name: string;
  member_count: number;
  online_count: number;
}

interface AdminActivity {
  id: string;
  room_id: string;
  room_name: string;
  sender_id: string;
  sender_name: string;
  body: string;
  created_at: string;
}

type PendingCancel = { room: AdminRoom; reason: string } | null;

export default function HubSurveillance() {
  const [rooms, setRooms] = useState<AdminRoom[]>([]);
  const [activity, setActivity] = useState<AdminActivity[]>([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [lastSeen, setLastSeen] = useState<Date | null>(null);
  const [pending, setPending] = useState<PendingCancel>(null);
  const [cancelling, setCancelling] = useState(false);

  const reload = useCallback(async () => {
    const supabase = createClient();
    const [roomsResult, activityResult] = await Promise.all([
      supabase.rpc('hub_admin_surveillance'),
      supabase.rpc('hub_admin_activity', { room_limit: 100 }),
    ]);
    if (roomsResult.error || activityResult.error) {
      setError(roomsResult.error?.message || activityResult.error?.message || 'Hub activity could not be loaded.');
      return;
    }
    setRooms((roomsResult.data as AdminRoom[]) || []);
    setActivity((activityResult.data as AdminActivity[]) || []);
    setLastSeen(new Date());
    setError('');
  }, []);

  useEffect(() => {
    void reload();
    const supabase = createClient();
    let throttle = 0;
    const scheduleReload = () => {
      const now = Date.now();
      if (now - throttle < 1500) return;
      throttle = now;
      void reload();
    };
    // Administrator RLS policies deliver every room's rows, so these streams are campus-wide.
    const channel = supabase
      .channel('hub-admin-surveillance')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hub_messages' }, scheduleReload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hub_room_presence' }, scheduleReload)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hub_rooms' }, scheduleReload)
      .subscribe();
    const interval = setInterval(() => void reload(), 20000);
    return () => {
      clearInterval(interval);
      void supabase.removeChannel(channel);
    };
  }, [reload]);

  const confirmCancel = async () => {
    if (!pending) return;
    setCancelling(true);
    try {
      const supabase = createClient();
      const { data, error: cancelError } = await supabase.rpc('hub_admin_cancel_room', {
        room: pending.room.id,
        reason: pending.reason.trim(),
      });
      if (cancelError) throw new Error(cancelError.message);
      const snapshot = data as { name?: string; member_count?: number } | null;
      setNotice(`Cancelled “${snapshot?.name || pending.room.name}” (${snapshot?.member_count ?? 0} members). The action was recorded.`);
      setPending(null);
      await reload();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The room could not be cancelled.');
    } finally {
      setCancelling(false);
    }
  };

  const onlineTotal = rooms.reduce((sum, room) => sum + room.online_count, 0);
  const memberTotal = rooms.reduce((sum, room) => sum + room.member_count, 0);

  return (
    <div className="bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]">
      <div className="p-6 border-b border-arc-blue/20 bg-arc-blue/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-orbitron text-xl text-white tracking-wider flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-terminal-green shadow-[0_0_8px_rgba(0,255,65,1)] animate-pulse" />
            BIT HUB Surveillance
          </h2>
          <p className="font-mono text-[10px] text-white/40 mt-1">
            Live bubble telemetry, campus-wide message logs, and administrator room cancellation. All access is audited.
          </p>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] text-white/50">
          <span className="text-terminal-green">{onlineTotal} ONLINE</span>
          <span>{rooms.length} ROOMS</span>
          <span>{memberTotal} MEMBERS</span>
          <button
            onClick={() => void reload()}
            className="px-3 py-1.5 border border-arc-blue/30 text-arc-blue font-orbitron text-[10px] tracking-wider rounded hover:bg-arc-blue/10 transition-all"
          >
            REFRESH
          </button>
        </div>
      </div>

      {notice && <p className="px-6 pt-4 font-mono text-xs text-terminal-green">{notice}</p>}
      {error && <p className="px-6 pt-4 font-mono text-xs text-warning-red">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="border-b lg:border-b-0 lg:border-r border-arc-blue/10">
          <h3 className="px-6 pt-4 pb-2 font-orbitron text-[10px] tracking-widest text-arc-blue/60 uppercase">Active Rooms</h3>
          <div className="max-h-96 overflow-y-auto px-6 pb-6 space-y-2">
            {rooms.length === 0 && !error && (
              <p className="font-mono text-xs text-white/30">No Hub rooms exist yet.</p>
            )}
            {rooms.map(room => (
              <div key={room.id} className="p-3 border border-arc-blue/20 bg-arc-blue/5 rounded-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-orbitron text-sm text-white truncate">
                      {room.name}
                      <span className={`ml-2 px-1.5 py-0.5 text-[8px] font-mono rounded border ${room.kind === 'team' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' : 'text-arc-blue border-arc-blue/30 bg-arc-blue/10'}`}>
                        {room.kind.toUpperCase()}
                      </span>
                    </p>
                    <p className="font-mono text-[10px] text-white/40 mt-1 truncate">
                      HOST {room.owner_name} · {room.category} · ROOM {room.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="font-mono text-[10px] mt-1">
                      <span className={room.online_count > 0 ? 'text-terminal-green' : 'text-white/30'}>● {room.online_count} online</span>
                      <span className="text-white/30"> / {room.member_count} of {room.capacity} members · joined {new Date(room.created_at).toLocaleString()}</span>
                      {room.finalized_at && <span className="text-terminal-green"> · TEAM FINALISED{room.hackathon_ends_at ? ` → ends ${new Date(room.hackathon_ends_at).toLocaleString()}` : ''}</span>}
                    </p>
                  </div>
                  <button
                    onClick={() => setPending({ room, reason: '' })}
                    className="shrink-0 px-3 py-1.5 text-[10px] font-orbitron tracking-wider rounded border border-warning-red/40 text-warning-red hover:bg-warning-red/10 transition-all"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="px-6 pt-4 pb-2 font-orbitron text-[10px] tracking-widest text-arc-blue/60 uppercase">Live User Logs</h3>
          <div className="max-h-96 overflow-y-auto px-6 pb-6 space-y-2">
            {activity.length === 0 && !error && (
              <p className="font-mono text-xs text-white/30">No message activity recorded yet.</p>
            )}
            {activity.map(entry => (
              <div key={entry.id} className="p-3 border border-arc-blue/10 bg-black/30 rounded-lg">
                <p className="font-mono text-[10px] text-white/40">
                  {new Date(entry.created_at).toLocaleTimeString()} · <span className="text-arc-blue">{entry.sender_name}</span> in <span className="text-white/60">{entry.room_name}</span>
                </p>
                <p className="font-mono text-xs text-white/80 mt-1 whitespace-pre-wrap break-words">{entry.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-3 border-t border-arc-blue/10 flex justify-between items-center">
        <span className="font-mono text-[10px] text-white/30">
          {lastSeen ? `Telemetry synced ${lastSeen.toLocaleTimeString()}` : 'Syncing telemetry…'}
        </span>
      </div>

      {pending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <div className="max-w-md w-full bg-black border border-warning-red/40 rounded-xl p-6 shadow-[0_0_40px_rgba(255,50,50,0.2)]">
            <h3 className="font-orbitron text-lg text-warning-red tracking-wider">Cancel Room</h3>
            <p className="font-mono text-sm text-white/70 mt-3">
              “{pending.room.name}” will be deleted permanently with its {pending.room.member_count} memberships, message history, and live presence. The host ({pending.room.owner_name}) will be notified.
            </p>
            <input
              value={pending.reason}
              onChange={(e) => setPending({ ...pending, reason: e.target.value })}
              placeholder="Reason sent to the host (optional)"
              className="mt-4 w-full bg-black/60 border border-arc-blue/30 rounded p-2.5 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
            />
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setPending(null)}
                className="px-4 py-2 text-xs border border-white/20 text-white/50 rounded hover:text-white"
              >
                Abort
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => void confirmCancel()}
                disabled={cancelling}
                className="px-4 py-2 text-xs font-orbitron tracking-wider bg-warning-red/10 border border-warning-red text-warning-red rounded hover:bg-warning-red/20 disabled:opacity-50"
              >
                {cancelling ? 'Cancelling…' : 'Confirm Cancel'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
