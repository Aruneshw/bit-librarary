'use client';

import { motion } from 'framer-motion';
import { getTitleColor, getNextTitle } from '@/lib/journey/titles';
import type { JourneyStats } from '@/lib/journey/types';

interface Props {
  stats: JourneyStats | null;
  name: string | null;
  department: string | null;
  avatarUrl?: string | null;
}

export default function ProfileCard({ stats, name, department, avatarUrl }: Props) {
  if (!stats) return null;

  const titleColor = getTitleColor(stats.current_title);
  const hours = Math.floor(stats.total_study_seconds / 3600);
  const minutes = Math.floor((stats.total_study_seconds % 3600) / 60);
  const nextTitle = getNextTitle(stats.total_active_days);
  const initials = (name || 'U').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl border border-arc-blue/15 bg-black/40 backdrop-blur-md p-4"
      style={{ boxShadow: '0 0 20px rgba(0,217,255,0.05)' }}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-14 h-14 rounded-full border border-arc-blue/30 object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full border border-arc-blue/30 bg-arc-blue/10 flex items-center justify-center">
              <span className="font-orbitron text-arc-blue font-bold text-lg">{initials}</span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-terminal-green border-2 border-black">
            <div className="w-full h-full rounded-full bg-terminal-green animate-pulse" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-orbitron text-sm text-white font-bold truncate">
            {name || 'Student'}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`font-orbitron text-[10px] ${titleColor} font-semibold`}>
              🏅 {stats.current_title}
            </span>
            {department && (
              <span className="font-rajdhani text-[10px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
                {department}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="font-mono text-[9px] text-terminal-green/70">
              🔥 {stats.current_streak}d
            </span>
            <span className="font-mono text-[9px] text-arc-blue/70">
              ⏱ {hours}h {minutes}m
            </span>
            <span className="font-mono text-[9px] text-amber-400/70">
              📚 {stats.total_resources_viewed}
            </span>
            <span className="font-mono text-[9px] text-white/40">
              📥 {stats.total_downloads}
            </span>
          </div>
        </div>
      </div>

      {/* Progress to next title */}
      {nextTitle && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[8px] text-white/20 tracking-wider uppercase">
              Next: {nextTitle.title}
            </span>
            <span className="font-mono text-[8px] text-white/20">
              {stats.total_active_days}/{nextTitle.day} days
            </span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((stats.total_active_days / nextTitle.day) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-arc-blue to-terminal-green rounded-full"
              style={{ boxShadow: '0 0 6px rgba(0,217,255,0.3)' }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
