'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  department: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuthStore();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAdmin) {
        router.replace('/dashboard');
      } else {
        fetchUsers();
      }
    }
  }, [isAdmin, isLoading, router]);

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
                  <th className="p-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-arc-blue/10">
                {loadingUsers ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-white/50 font-mono animate-pulse">Loading personnel data...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-white/50 font-mono">No personnel records found.</td>
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
                      <td className="p-4 pl-6 text-white group-hover:text-arc-blue transition-colors">{u.name || 'Unknown'}</td>
                      <td className="p-4 text-white/70 font-mono text-sm">{u.email}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs font-mono border border-arc-blue/30 rounded bg-arc-blue/10 text-arc-blue">
                          {u.department || 'N/A'}
                        </span>
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
      </div>
    </div>
  );
}
