'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getTitleColor } from '@/lib/journey/titles';
import type { LeaderboardEntry } from '@/lib/journey/types';

type SortMode = 'study_time' | 'streak' | 'downloads' | 'active_days';

const SORT_OPTIONS: { key: SortMode; label: string; icon: string }[] = [
  { key: 'study_time', label: 'Study Time', icon: '⏱' },
  { key: 'streak', label: 'Streak', icon: '🔥' },
  { key: 'downloads', label: 'Downloads', icon: '📥' },
  { key: 'active_days', label: 'Active Days', icon: '📆' },
];

export default function LeaderboardPanel() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortMode>('study_time');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [sortBy]);

  async function fetchLeaderboard() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/journey/leaderboard?sort=${sortBy}&limit=50`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setEntries(data.entries || []);
    } catch (err) {
      setError('Could not load leaderboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const currentUserId = null;

  return (
    <div>
      {/* Sort tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSortBy(opt.key)}
            className={`px-2.5 py-1 rounded-lg font-mono text-[9px] tracking-wider uppercase transition-all ${
              sortBy === opt.key
                ? 'bg-arc-blue/20 text-arc-blue border border-arc-blue/30'
                : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
            }`}
          >
            {opt.icon} {opt.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-5 h-5 border-2 border-arc-blue/30 border-t-arc-blue rounded-full animate-spin" />
        </div>
      ) : error ? (
        <p className="font-mono text-xs text-warning-red text-center py-6">{error}</p>
      ) : entries.length === 0 ? (
        <p className="font-mono text-xs text-white/30 text-center py-6">
          No learners on the leaderboard yet.
        </p>
      ) : (
        <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
          {entries.map((entry, idx) => {
            const color = getTitleColor(entry.title);
            const hours = Math.floor(entry.total_study_seconds / 3600);
            const rank = idx + 1;

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                  rank <= 3 ? 'border-amber-400/20 bg-amber-400/5' : 'border-white/5 hover:bg-white/5'
                }`}
              >
                {/* Rank */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-orbitron text-[10px] font-bold shrink-0 ${
                  rank === 1
                    ? 'bg-amber-400 text-black'
                    : rank === 2
                    ? 'bg-gray-300 text-black'
                    : rank === 3
                    ? 'bg-amber-700 text-white'
                    : 'bg-white/10 text-white/40'
                }`}>
                  {rank}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-orbitron text-xs text-white font-bold truncate">
                    {entry.name || 'Anonymous'}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`font-orbitron text-[9px] ${color}`}>
                      🏅 {entry.title}
                    </span>
                    {entry.department && (
                      <span className="font-rajdhani text-[8px] text-white/30 bg-white/5 px-1 rounded">
                        {entry.department}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right shrink-0">
                  {sortBy === 'study_time' && (
                    <p className="font-orbitron text-xs text-arc-blue">
                      {hours}h
                      <span className="font-mono text-[8px] text-white/30 ml-1">studied</span>
                    </p>
                  )}
                  {sortBy === 'streak' && (
                    <p className="font-orbitron text-xs text-terminal-green">
                      {entry.current_streak}d
                      <span className="font-mono text-[8px] text-white/30 ml-1">streak</span>
                    </p>
                  )}
                  {sortBy === 'downloads' && (
                    <p className="font-orbitron text-xs text-purple-400">
                      {entry.total_downloads}
                      <span className="font-mono text-[8px] text-white/30 ml-1">dl</span>
                    </p>
                  )}
                  {sortBy === 'active_days' && (
                    <p className="font-orbitron text-xs text-amber-400">
                      {entry.total_active_days}d
                      <span className="font-mono text-[8px] text-white/30 ml-1">active</span>
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
