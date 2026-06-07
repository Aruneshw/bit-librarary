'use client';

import { motion } from 'framer-motion';
import { type SubjectWithProgress } from '@/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ArcReactor from './ArcReactor';

interface SubjectOrbitProps {
  subjects: SubjectWithProgress[];
}

export default function SubjectOrbit({ subjects }: SubjectOrbitProps) {
  const count = subjects.length;
  // Use an elliptical orbit to make distances look visually equal since cards are wide
  const xRadius = 380;
  const yRadius = 280;

  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: `${yRadius * 2 + 200}px` }}>
      {/* Subtle ambient glow behind the orbit */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-arc-blue/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Center ARC Reactor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <ArcReactor size={150} />
      </div>

      {/* SVG Energy Lines */}
      <svg
        className="absolute top-1/2 left-1/2 overflow-visible pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {subjects.map((subject, index) => {
          const angle = (2 * Math.PI * index) / count - Math.PI / 2;
          const x = xRadius * Math.cos(angle);
          const y = yRadius * Math.sin(angle);
          const isMastered = subject.mastered;

          return (
            <line
              key={`line-${subject.id}`}
              x1="0"
              y1="0"
              x2={x}
              y2={y}
              stroke={isMastered ? 'rgba(0,255,65,0.25)' : 'rgba(0,217,255,0.25)'}
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-energy-flow"
            />
          );
        })}
      </svg>

      {/* Subject Nodes */}
      {subjects.map((subject, index) => {
        const angle = (2 * Math.PI * index) / count - Math.PI / 2;
        const x = xRadius * Math.cos(angle);
        const y = yRadius * Math.sin(angle);
        const isMastered = subject.mastered;
        const completionColor = isMastered ? 'var(--terminal-green)' : 'var(--arc-blue)';

        const radius = 28;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (subject.completion_percent / 100) * circumference;

        return (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute z-10"
            style={{
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Link href={`/subject/${subject.id}`} id={`orbit-subject-${index}`}>
              <div
                className={cn(
                  'group relative flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer w-36',
                  'transition-all duration-300 backdrop-blur-xl bg-glass-surface',
                  'hover:scale-105',
                  isMastered
                    ? 'border border-terminal-green/50 shadow-[0_0_16px_rgba(0,255,65,0.2)]'
                    : 'border border-glass-border hover:border-arc-blue/50 hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]'
                )}
              >
                {/* Completion Ring with Icon */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="absolute inset-0 w-14 h-14 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                    <circle
                      cx="32" cy="32" r={radius} fill="none"
                      stroke={completionColor} strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={circumference} strokeDashoffset={offset}
                      className="transition-all duration-700"
                      style={{ filter: `drop-shadow(0 0 4px ${completionColor})` }}
                    />
                  </svg>
                  <span className="text-xl z-10">{subject.icon}</span>
                </div>

                {/* Name */}
                <p className="font-rajdhani text-xs text-center text-text-white/80 uppercase tracking-wider leading-tight group-hover:text-arc-blue transition-colors">
                  {subject.subject_name}
                </p>

                {/* Percentage */}
                <span className="font-mono text-[10px] tracking-wider" style={{ color: completionColor }}>
                  {subject.completion_percent}%
                </span>

                {isMastered && (
                  <span className="font-rajdhani text-[9px] uppercase tracking-[2px] text-terminal-green px-1.5 py-0.5 rounded border border-terminal-green/30 bg-terminal-green/10">
                    Mastered
                  </span>
                )}
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
