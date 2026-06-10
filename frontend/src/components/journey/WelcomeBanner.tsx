'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTitleColor, getNextTitle } from '@/lib/journey/titles';
import type { JourneyStats, TitleUnlock } from '@/lib/journey/types';

interface WelcomeBannerProps {
  stats: JourneyStats | null;
  newTitle: TitleUnlock | null;
  onDismiss: () => void;
}

export default function WelcomeBanner({ stats, newTitle, onDismiss }: WelcomeBannerProps) {
  const [stage, setStage] = useState<'enter' | 'show' | 'exit'>('enter');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isNewDay = stats?.last_active_date
    ? new Date(stats.last_active_date).toDateString() !== new Date().toDateString()
    : true;

  useEffect(() => {
    if (!stats) return;
    const t = setTimeout(() => setStage('show'), 800);
    return () => clearTimeout(t);
  }, [stats]);

  useEffect(() => {
    if (newTitle && typeof window !== 'undefined') {
      try {
        audioRef.current = new Audio('/sounds/achievement.mp3');
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      } catch {}
    }
  }, [newTitle]);

  if (!stats) return null;

  const titleColor = getTitleColor(stats.current_title);
  const nextTitle = getNextTitle(stats.total_active_days);
  const dayNumber = stats.total_active_days + (isNewDay ? 1 : 0);
  const hours = Math.floor(stats.total_study_seconds / 3600);

  return (
    <AnimatePresence>
      {stage !== 'exit' && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: stage === 'enter' ? 0.95 : 1,
          }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="relative overflow-hidden rounded-xl border border-arc-blue/20 bg-gradient-to-r from-arc-blue/5 via-black/60 to-terminal-green/5 p-4 sm:p-6"
          style={{ boxShadow: '0 0 30px rgba(0,217,255,0.08)' }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-arc-blue/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-terminal-green/5 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-orbitron text-lg sm:text-xl text-white font-bold tracking-wide"
                >
                  Welcome Back{stats.name ? `, ${stats.name.split(' ')[0]}` : ''}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1"
                >
                  <span className="font-mono text-xs text-white/50">
                    Day {Math.max(dayNumber, 1)} of your journey.
                  </span>
                  <span className="font-mono text-xs text-terminal-green/70">
                    {stats.current_streak > 0
                      ? `🔥 ${stats.current_streak} Day Streak`
                      : 'Start your streak today'}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-3 flex flex-wrap items-center gap-3"
                >
                  <span className={`font-orbitron text-sm font-bold ${titleColor}`}>
                    🏅 {stats.current_title}
                  </span>

                  {nextTitle && (
                    <span className="font-mono text-[10px] text-white/30">
                      Next: {nextTitle.title} (Day {nextTitle.day})
                    </span>
                  )}

                  {hours > 0 && (
                    <span className="font-mono text-[10px] text-white/30">
                      ⏱ {hours}h studied
                    </span>
                  )}
                </motion.div>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => { setStage('exit'); setTimeout(onDismiss, 300); }}
                className="font-mono text-[10px] text-white/30 hover:text-white/70 tracking-wider uppercase"
              >
                Dismiss
              </motion.button>
            </div>

            {/* New Title Unlock */}
            <AnimatePresence>
              {newTitle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="mt-4 p-3 rounded-lg border border-amber-400/30 bg-gradient-to-r from-amber-400/10 via-purple-400/5 to-amber-400/10"
                  style={{ boxShadow: '0 0 20px rgba(251,191,36,0.15)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl animate-pulse">🎖</div>
                    <div>
                      <p className="font-orbitron text-[10px] text-amber-400/70 tracking-[3px] uppercase">
                        New Title Unlocked
                      </p>
                      <p className="font-orbitron text-lg text-amber-300 font-bold">
                        {newTitle.title}
                      </p>
                      <p className="font-mono text-[10px] text-white/40">
                        {newTitle.day} Day Streak Achievement
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Journey progress bar */}
            {nextTitle && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[8px] text-white/20 uppercase tracking-wider">
                    Journey Progress
                  </span>
                  <span className="font-mono text-[8px] text-white/20">
                    {stats.total_active_days} / {nextTitle.day} days
                  </span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min((stats.total_active_days / nextTitle.day) * 100, 100)}%`,
                    }}
                    transition={{ delay: 1, duration: 1 }}
                    className="h-full bg-gradient-to-r from-arc-blue to-terminal-green rounded-full"
                    style={{ boxShadow: '0 0 8px rgba(0,217,255,0.3)' }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
