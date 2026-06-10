'use client';

import { motion } from 'framer-motion';
import { getTitleColor } from '@/lib/journey/titles';
import type { TitleHistoryEntry } from '@/lib/journey/types';

interface Props {
  titles: TitleHistoryEntry[];
  currentTitle: string;
}

export default function TitleHistory({ titles, currentTitle }: Props) {
  if (titles.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="font-orbitron text-xs text-white/20 tracking-[3px] uppercase">
          No Titles Unlocked Yet
        </p>
        <p className="font-mono text-[10px] text-white/10 mt-2">
          Keep learning to unlock your first title on Day 2.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {titles.map((entry, idx) => {
        const isCurrent = entry.title === currentTitle;
        const color = getTitleColor(entry.title);

        return (
          <motion.div
            key={entry.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.03 }}
            className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
              isCurrent
                ? 'border-amber-400/30 bg-amber-400/5'
                : 'border-white/5 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              {isCurrent ? (
                <span className="text-amber-400 text-lg">🏅</span>
              ) : (
                <span className="text-white/20 text-sm">✓</span>
              )}
              <div>
                <p className={`font-orbitron text-xs font-semibold ${color}`}>
                  {entry.title}
                  {isCurrent && (
                    <span className="ml-2 font-mono text-[8px] text-amber-400/60 tracking-wider uppercase">
                      Current
                    </span>
                  )}
                </p>
                <p className="font-mono text-[9px] text-white/30">
                  Day {entry.day_number} · {new Date(entry.unlocked_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Badge */}
            {isCurrent ? (
              <div className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                <span className="font-orbitron text-[8px] text-amber-400 tracking-wider">Active</span>
              </div>
            ) : (
              <div className="px-2 py-0.5 rounded-full bg-terminal-green/5 border border-terminal-green/10">
                <span className="font-orbitron text-[8px] text-terminal-green/50 tracking-wider">Earned</span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
