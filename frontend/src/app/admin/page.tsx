'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { sumNonAdminLoginCount } from '@/lib/adminEmails';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  department: string;
  login_count: number;
  created_at: string;
}

interface UserFeedback {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  reply?: string | null;
  replied_at?: string | null;
  reply_read?: boolean;
  is_broadcast?: boolean;
  profiles?: {
    name: string | null;
    email: string;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAdmin, isLoading, fetchUser } = useAuthStore();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<{ totalUsers: number; totalVisits: number } | null>(null);
  const [replyingFeedbackId, setReplyingFeedbackId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const fetchSystemMetrics = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase.rpc('get_system_metrics');
    if (!error && data) {
      setSystemMetrics({
        totalUsers: Number(data.total_users) || 0,
        totalVisits: Number(data.total_visits) || 0,
      });
      return;
    }

    const { data: profiles } = await supabase.from('profiles').select('email, login_count');
    if (profiles) {
      setSystemMetrics({
        totalUsers: profiles.length,
        totalVisits: sumNonAdminLoginCount(profiles),
      });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAdmin) {
        router.replace('/dashboard');
      } else {
        fetchUsers();
        fetchFeedbacks();
        fetchSystemMetrics();
      }
    }
  }, [isAdmin, isLoading, router, fetchSystemMetrics]);

  useEffect(() => {
    if (!isAdmin) return;

    const supabase = createClient();

    const metricsChannel = supabase
      .channel('admin-system-metrics')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        () => {
          fetchSystemMetrics();
          fetchUsers();
        }
      )
      .subscribe();

    const presenceChannel = supabase.channel('online-users', {
      config: {
        presence: {
          key: user?.id || 'admin',
        },
      },
    });

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const onlineIds = Object.keys(state);
        setOnlineUserIds(onlineIds);
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED' && user) {
          await presenceChannel.track({
            online_at: new Date().toISOString(),
            name: user.name || user.email,
          });
        }
      });

    return () => {
      supabase.removeChannel(metricsChannel);
      supabase.removeChannel(presenceChannel);
    };
  }, [isAdmin, user, fetchSystemMetrics]);

  const fetchUsers = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setUsers(data as UserProfile[]);
    }
    setLoadingUsers(false);
  };

  const fetchFeedbacks = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('user_feedbacks')
      .select('*, profiles(name, email)')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setFeedbacks(data as unknown as UserFeedback[]);
    }
    setLoadingFeedbacks(false);
  };

  const handleDeleteFeedback = async (id: string) => {
    const supabase = createClient();
    await supabase.from('user_feedbacks').delete().eq('id', id);
    setFeedbacks(feedbacks.filter(f => f.id !== id));
  };

  const handleSendReply = async (e: React.FormEvent, feedbackId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const supabase = createClient();
    const { error } = await supabase
      .from('user_feedbacks')
      .update({
        reply: replyText.trim(),
        replied_at: new Date().toISOString(),
        reply_read: false,
      })
      .eq('id', feedbackId);

    if (!error) {
      setFeedbacks(feedbacks.map(f => f.id === feedbackId ? {
        ...f,
        reply: replyText.trim(),
        replied_at: new Date().toISOString(),
        reply_read: false,
      } : f));
      setReplyingFeedbackId(null);
      setReplyText('');
    } else {
      console.error('Failed to save reply:', error);
    }
  };

  const handleToggleBroadcast = async (feedbackId: string, currentBroadcast: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('user_feedbacks')
      .update({
        is_broadcast: !currentBroadcast
      })
      .eq('id', feedbackId);

    if (!error) {
      setFeedbacks(feedbacks.map(f => f.id === feedbackId ? {
        ...f,
        is_broadcast: !currentBroadcast
      } : f));
    } else {
      console.error('Failed to toggle broadcast:', error);
    }
  };

  if (isLoading || !isAdmin) {
    return <div className="min-h-screen bg-black flex items-center justify-center font-orbitron text-arc-blue animate-pulse">Initializing Terminal...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-text-white p-6 sm:p-12 font-exo2 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="font-orbitron text-3xl sm:text-4xl text-arc-blue font-bold tracking-widest drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]">
              ADMIN TERMINAL
            </h1>
            <p className="text-white/50 mt-2 font-mono text-sm">System Access Level: Maximum | Director: {user?.name}</p>
          </div>
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 border border-arc-blue/30 text-arc-blue font-orbitron text-sm rounded hover:bg-arc-blue/10 hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all"
          >
            RETURN TO NEXUS
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-black/40 border border-arc-blue/20 rounded-xl p-5 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.05)]">
            <p className="font-orbitron text-[10px] text-arc-blue/60 tracking-widest uppercase mb-2">Users Entered</p>
            <p className="font-orbitron text-3xl text-arc-blue font-bold" style={{ textShadow: '0 0 12px rgba(0,217,255,0.4)' }}>
              {systemMetrics ? systemMetrics.totalUsers : '—'}
            </p>
            <p className="font-mono text-[10px] text-white/40 mt-1">New signups only — returning users not counted</p>
          </div>
          <div className="bg-black/40 border border-arc-blue/20 rounded-xl p-5 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.05)]">
            <p className="font-orbitron text-[10px] text-arc-blue/60 tracking-widest uppercase mb-2">System Access</p>
            <p className="font-orbitron text-3xl text-white font-bold">
              {systemMetrics ? systemMetrics.totalVisits : '—'}
            </p>
            <p className="font-mono text-[10px] text-white/40 mt-1">Total logins including repeat visits</p>
          </div>
          <div className="bg-black/40 border border-terminal-green/20 rounded-xl p-5 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,65,0.05)]">
            <p className="font-orbitron text-[10px] text-terminal-green/60 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" />
              Online Now
            </p>
            <p className="font-orbitron text-3xl text-terminal-green font-bold" style={{ textShadow: '0 0 12px rgba(0,255,65,0.4)' }}>
              {onlineUserIds.length}
            </p>
            <p className="font-mono text-[10px] text-white/40 mt-1">Currently active on the platform</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]"
        >
          <div className="p-6 border-b border-arc-blue/20 bg-arc-blue/5">
            <h2 className="font-orbitron text-xl text-white tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-arc-blue shadow-[0_0_8px_rgba(0,217,255,1)] animate-pulse" />
              Registered Personnel Directory
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-arc-blue/20 bg-black/50 text-arc-blue/70 font-orbitron text-xs tracking-widest uppercase">
                  <th className="p-4 pl-6">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Logins</th>
                  <th className="p-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-arc-blue/10">
                {loadingUsers ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-white/50 font-mono animate-pulse">Loading personnel data...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-white/50 font-mono">No personnel records found.</td>
                  </tr>
                ) : (
                  users.map((u, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      key={u.id} 
                      className="hover:bg-arc-blue/5 transition-colors group"
                    >
                      <td className="p-4 pl-6 text-white group-hover:text-arc-blue transition-colors">
                        <div className="flex items-center gap-2">
                          {onlineUserIds.includes(u.id) && (
                            <span 
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-terminal-green shadow-[0_0_6px_rgba(0,255,65,0.8)] animate-pulse shrink-0" 
                              title="Online"
                            />
                          )}
                          <span>{u.name || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="p-4 text-white/70 font-mono text-sm">{u.email}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs font-mono border border-arc-blue/30 rounded bg-arc-blue/10 text-arc-blue">
                          {u.department || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4 text-white/70 font-mono text-sm">
                        {u.login_count || 0}
                      </td>
                      <td className="p-4 text-white/50 font-mono text-xs">
                        {new Date(u.created_at).toLocaleDateString()} {new Date(u.created_at).toLocaleTimeString()}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Feedback Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]"
        >
          <div className="p-6 border-b border-arc-blue/20 bg-arc-blue/5">
            <h2 className="font-orbitron text-xl text-white tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-arc-blue shadow-[0_0_8px_rgba(0,217,255,1)]" />
              User Feedback Transmissions
            </h2>
          </div>
          
          <div className="p-6">
            {loadingFeedbacks ? (
              <p className="text-center text-white/50 font-mono animate-pulse py-8">Decrypting incoming transmissions...</p>
            ) : feedbacks.length === 0 ? (
              <p className="text-center text-white/50 font-mono py-8">No active transmissions.</p>
            ) : (
              <div className="grid gap-4">
                {feedbacks.map((f, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    key={f.id}
                    className="p-4 border border-arc-blue/20 bg-arc-blue/5 rounded-lg relative group"
                  >
                    <button 
                      onClick={() => handleDeleteFeedback(f.id)}
                      className="absolute top-4 right-4 text-white/30 hover:text-warning-red transition-colors"
                      title="Delete Feedback"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-orbitron text-arc-blue text-sm">
                        {f.profiles?.name || 'Unknown User'}
                      </span>
                      <span className="font-mono text-white/40 text-xs">
                        ({f.profiles?.email})
                      </span>
                    </div>
                    <p className="font-mono text-white/80 text-sm whitespace-pre-wrap">{f.message}</p>
                    
                    {f.reply && (
                      <div className="mt-3 p-3 border-l-2 border-terminal-green bg-terminal-green/5 rounded font-mono text-sm">
                        <span className="text-terminal-green text-xs font-bold uppercase tracking-wider block mb-1">Reply Transmitted:</span>
                        <p className="text-white/80">{f.reply}</p>
                      </div>
                    )}

                    {replyingFeedbackId === f.id ? (
                      <form onSubmit={(e) => handleSendReply(e, f.id)} className="mt-3 flex flex-col gap-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type reply to user..."
                          className="w-full bg-black/60 border border-arc-blue/30 rounded p-2 text-white font-mono text-sm focus:outline-none focus:border-arc-blue"
                          rows={2}
                          required
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => { setReplyingFeedbackId(null); setReplyText(''); }}
                            className="px-3 py-1 text-xs border border-white/20 text-white/50 rounded hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1 text-xs bg-arc-blue/10 border border-arc-blue text-arc-blue rounded hover:bg-arc-blue/20"
                          >
                            Transmit Reply
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="mt-3 flex justify-between items-center">
                        <div className="font-mono text-white/30 text-[10px] uppercase">
                          Transmitted: {new Date(f.created_at).toLocaleString()}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleBroadcast(f.id, f.is_broadcast || false)}
                            className={`px-3 py-1 text-xs border rounded flex items-center gap-1.5 transition-all ${
                              f.is_broadcast
                                ? 'border-terminal-green text-terminal-green bg-terminal-green/10 shadow-[0_0_8px_rgba(0,255,65,0.2)]'
                                : 'border-white/20 text-white/50 hover:text-white hover:border-white/40'
                            }`}
                            title="Broadcast this announcement to all users"
                          >
                            <span>📢</span>
                            {f.is_broadcast ? 'Broadcasted' : 'Broadcast'}
                          </button>
                          
                          <button
                            onClick={() => {
                              setReplyingFeedbackId(f.id);
                              setReplyText(f.reply || '');
                            }}
                            className="px-3 py-1 text-xs border border-arc-blue/30 text-arc-blue rounded hover:bg-arc-blue/10 flex items-center gap-1.5 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>
                            {f.reply ? 'Edit Reply' : 'Reply'}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
