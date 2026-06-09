'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArcReactor from '@/components/dashboard/ArcReactor';
import MatrixBackground from './MatrixBackground';

interface IntroAnimationProps {
  subjectCount: number;
  onComplete: () => void;
}

export default function IntroAnimation({ subjectCount, onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'fadeIn' | 'charging' | 'text' | 'emerge' | 'done'>('fadeIn');

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

  useEffect(() => {
    document.documentElement.classList.add('intro-active');
    return () => {
      document.documentElement.classList.remove('intro-active');
    };
  }, []);

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
          {/* Matrix Rain Background */}
          <MatrixBackground />

          {/* ARC Reactor - Charging */}
          <div className="relative z-10 flex items-center justify-center">
            <ArcReactor size={240} isCharging={phase === 'charging'} />
          </div>

          {/* "KNOWLEDGE NODES DETECTED" */}
          {(phase === 'text' || phase === 'emerge') && (
            <motion.h2
              className="mt-8 font-orbitron text-lg text-arc-blue text-center z-10"
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
