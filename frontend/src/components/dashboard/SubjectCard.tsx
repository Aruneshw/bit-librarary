'use client';

import { motion } from 'framer-motion';
import { type SubjectWithProgress } from '@/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SubjectCardProps {
  subject: SubjectWithProgress;
  index: number;
  delay?: number;
}

export default function SubjectCard({ subject, index, delay = 0 }: SubjectCardProps) {
  const isMastered = subject.mastered;
  const completionColor = isMastered ? 'var(--terminal-green)' : 'var(--arc-blue)';

  // Calculate ring circumference and offset for completion
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (subject.completion_percent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: delay + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/subject/${subject.id}`} id={`subject-card-${index}`}>
        <div
          className={cn(
            'group relative flex items-center gap-4 p-4 rounded-xl cursor-pointer',
            'transition-all duration-300',
            'backdrop-blur-xl bg-glass-surface',
            isMastered
              ? 'border border-terminal-green/60 shadow-[0_0_16px_rgba(0,255,65,0.3)]'
              : 'border border-glass-border hover:border-arc-blue/40 hover:shadow-[0_0_16px_rgba(0,217,255,0.2)]'
          )}
          style={{
            transform: 'translateZ(0)',
          }}
        >
          {/* Completion Ring */}
          <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center">
            <svg className="absolute inset-0 w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              {/* Background ring */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="3"
              />
              {/* Progress ring */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke={completionColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-700 ease-out"
                style={{
                  filter: `drop-shadow(0 0 4px ${completionColor})`,
                }}
              />
            </svg>
            {/* Subject Icon */}
            <span className="text-2xl z-10" role="img" aria-label={subject.subject_name}>
              {subject.icon}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-rajdhani font-semibold text-sm text-text-white/90 tracking-wider uppercase truncate group-hover:text-arc-blue transition-colors">
              {subject.subject_name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="font-mono text-xs tracking-wider"
                style={{ color: completionColor }}
              >
                {subject.completion_percent}%
              </span>
              {isMastered && (
                <span className="font-rajdhani text-[10px] uppercase tracking-[2px] text-terminal-green px-1.5 py-0.5 rounded border border-terminal-green/30 bg-terminal-green/10">
                  Mastered
                </span>
              )}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0 text-text-white/20 group-hover:text-arc-blue/60 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
