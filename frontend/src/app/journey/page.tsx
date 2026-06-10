'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { getTitleColor, getNextTitle } from '@/lib/journey/titles';
import TitleHistory from '@/components/journey/TitleHistory';
import LeaderboardPanel from '@/components/journey/LeaderboardPanel';
import type { JourneyStats } from '@/lib/journey/types';

export default function JourneyPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<JourneyStats | null>(null);
  const [fetching, setFetching] = useState(true);
  const [tab, setTab] = useState<'stats' | 'titles' | 'leaderboard'>('stats');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated, isLoading, router]);

  async function fetchStats() {
    try {
      const res = await fetch('/api/journey/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to load journey stats:', err);
    } finally {
      setFetching(false);
    }
  }

  if (isLoading || fetching) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-arc-blue/30 border-t-arc-blue rounded-full animate-spin" />
      </div>
    );
  }

  const hours = stats ? Math.floor(stats.total_study_seconds / 3600) : 0;
  const minutes = stats ? Math.floor((stats.total_study_seconds % 3600) / 60) : 0;
  const titleColor = stats ? getTitleColor(stats.current_title) : '';
  const nextTitle = stats ? getNextTitle(stats.total_active_days) : null;
  const joinYear = stats ? new Date(stats.journey_start_date).getFullYear() : new Date().getFullYear();

  return (
    <div className="min-h-screen bg-black">
      {/* Background */}
      <div className="fixed inset-0 arc-bg pointer-events-none opacity-40" />

      <div className="relative max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <p className="font-orbitron text-xs text-arc-blue/50 tracking-[4px] uppercase mb-2">
            Student Journey
          </p>
          <h1 className="font-orbitron text-2xl sm:text-3xl text-white font-bold tracking-wide">
            {stats?.name || 'Learner'}
          </h1>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {[
            { label: '🏅 Title', value: stats?.current_title || 'Newcomer', color: titleColor, sub: `Joined ${joinYear}` },
            { label: '🔥 Streak', value: `${stats?.current_streak || 0}d`, color: 'text-terminal-green', sub: `Best: ${stats?.longest_streak || 0}d` },
            { label: '⏱ Study Time', value: `${hours}h ${minutes}m`, color: 'text-arc-blue', sub: `${stats?.total_active_days || 0} active days` },
            { label: '📚 Resources', value: `${stats?.total_resources_viewed || 0}`, color: 'text-amber-400', sub: `${stats?.total_downloads || 0} downloads` },
          ].map((card, idx) => (
            <div
              key={card.label}
              className="bg-black/40 border border-white/10 rounded-xl p-3 text-center"
            >
              <p className="font-mono text-[9px] text-white/30 tracking-wider">{card.label}</p>
              <p className={`font-orbitron text-lg font-bold mt-1 ${card.color}`}>{card.value}</p>
              <p className="font-mono text-[8px] text-white/20 mt-0.5">{card.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Journey progress */}
        {nextTitle && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 border border-white/10 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-orbitron text-[10px] text-white/40 tracking-wider uppercase">
                Next Title: {nextTitle.title}
              </span>
              <span className="font-mono text-[9px] text-white/20">
                {stats.total_active_days} / {nextTitle.day} days
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((stats.total_active_days / nextTitle.day) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-arc-blue via-purple-400 to-amber-400 rounded-full"
                style={{ boxShadow: '0 0 10px rgba(0,217,255,0.3)' }}
              />
            </div>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-1 mb-4 bg-white/5 rounded-lg p-1 border border-white/10"
        >
          {[
            { key: 'stats' as const, label: 'Journey Stats' },
            { key: 'titles' as const, label: 'Title Archive' },
            { key: 'leaderboard' as const, label: 'Leaderboard' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 px-3 rounded-md font-orbitron text-[10px] tracking-wider uppercase transition-all ${
                tab === t.key
                  ? 'bg-arc-blue/20 text-arc-blue border border-arc-blue/30'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-black/40 border border-white/10 rounded-xl p-4"
        >
          {tab === 'stats' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Current Streak', value: `${stats?.current_streak || 0} days`, color: 'text-terminal-green' },
                { label: 'Longest Streak', value: `${stats?.longest_streak || 0} days`, color: 'text-arc-blue' },
                { label: 'Total Active Days', value: `${stats?.total_active_days || 0}`, color: 'text-amber-400' },
                { label: 'Total Study Hours', value: `${hours}h ${minutes}m`, color: 'text-arc-blue' },
                { label: 'Resources Viewed', value: `${stats?.total_resources_viewed || 0}`, color: 'text-purple-400' },
                { label: 'Total Downloads', value: `${stats?.total_downloads || 0}`, color: 'text-terminal-green' },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="font-mono text-[9px] text-white/40 uppercase tracking-wider">{s.label}</p>
                  <p className={`font-orbitron text-lg font-bold mt-1 ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          )}
          {tab === 'titles' && stats && (
            <TitleHistory titles={stats.title_history} currentTitle={stats.current_title} />
          )}
          {tab === 'leaderboard' && <LeaderboardPanel />}
        </motion.div>

        {/* Back to dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <button
            onClick={() => router.push('/dashboard')}
            className="font-mono text-[10px] text-white/30 hover:text-white/60 tracking-wider uppercase transition-colors"
          >
            ← Back to Dashboard
          </button>
        </motion.div>
      </div>
    </div>
  );
}
