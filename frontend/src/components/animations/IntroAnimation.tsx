'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { audioService } from '@/lib/audioService';

interface IntroAnimationProps {
  subjectCount: number;
  onComplete: () => void;
}

export default function IntroAnimation({ subjectCount, onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'fadeIn' | 'charging' | 'text' | 'emerge' | 'done'>('fadeIn');
  const { isAdmin } = useAuthStore();

  // Play cmatrix cascading sound for non-admin on login/dashboard entry
  useEffect(() => {
    if (phase === 'charging' && !isAdmin) {
      audioService.playCmatrixRain();
    }
  }, [phase, isAdmin]);

  const advancePhase = useCallback(() => {
    switch (phase) {
      case 'fadeIn':
        setTimeout(() => setPhase('charging'), 300);
        break;
      case 'charging':
        setTimeout(() => setPhase('text'), 1500);
        break;
      case 'text':
        setTimeout(() => setPhase('emerge'), 800);
        break;
      case 'emerge':
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, subjectCount * 80 + 600);
        break;
    }
  }, [phase, subjectCount, onComplete]);

  useEffect(() => {
    advancePhase();
  }, [advancePhase]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ARC Reactor - Charging */}
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            {/* Outer ring - counter-clockwise */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-arc-blue/50"
              animate={{
                rotate: -360,
                borderColor: phase === 'charging'
                  ? ['rgba(0,217,255,0.5)', 'rgba(0,217,255,0.9)', 'rgba(0,217,255,0.5)']
                  : 'rgba(0,217,255,0.5)',
              }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                borderColor: { duration: 1.5, repeat: Infinity },
              }}
              style={{ boxShadow: '0 0 20px rgba(0,217,255,0.3)' }}
            />

            {/* Middle ring - clockwise */}
            <motion.div
              className="absolute inset-4 md:inset-6 rounded-full border border-arc-blue/70"
              animate={{
                rotate: 360,
                boxShadow: phase === 'charging'
                  ? ['0 0 10px rgba(0,217,255,0.3)', '0 0 30px rgba(0,217,255,0.7)', '0 0 10px rgba(0,217,255,0.3)']
                  : '0 0 10px rgba(0,217,255,0.3)',
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                boxShadow: { duration: 1, repeat: Infinity },
              }}
            />

            {/* Inner ring - counter-clockwise */}
            <motion.div
              className="absolute inset-8 md:inset-12 rounded-full border border-arc-blue/90"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ boxShadow: '0 0 15px rgba(0,217,255,0.5)' }}
            />

            {/* Core - pulsing during charge */}
            <motion.div
              className="absolute inset-14 md:inset-20 rounded-full bg-arc-blue/30"
              animate={{
                scale: phase === 'charging' ? [1, 1.3, 1] : 1,
                boxShadow: phase === 'charging'
                  ? ['0 0 20px rgba(0,217,255,0.4)', '0 0 60px rgba(0,217,255,0.8)', '0 0 20px rgba(0,217,255,0.4)']
                  : '0 0 20px rgba(0,217,255,0.4)',
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />

            {/* Energy arcs - only during charging */}
            {phase === 'charging' && (
              <>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                  <motion.div
                    key={deg}
                    className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-b from-arc-blue to-transparent origin-top"
                    style={{
                      transform: `translate(-50%, 0) rotate(${deg}deg)`,
                      height: '50%',
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0, 0.8, 0], scaleY: [0, 1, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </>
            )}

            {/* Radial lines */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={`line-${deg}`}
                className="absolute top-1/2 left-1/2 w-px h-20 md:h-28 bg-gradient-to-b from-arc-blue/40 to-transparent origin-top"
                style={{ transform: `translate(-50%, 0) rotate(${deg}deg)` }}
              />
            ))}
          </div>

          {/* "KNOWLEDGE NODES DETECTED" */}
          {(phase === 'text' || phase === 'emerge') && (
            <motion.h2
              className="mt-8 font-orbitron text-lg text-arc-blue text-center"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.2em' }}
              transition={{ duration: 0.6 }}
              style={{ textShadow: '0 0 16px rgba(0,217,255,0.5)' }}
            >
              KNOWLEDGE NODES DETECTED
            </motion.h2>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
