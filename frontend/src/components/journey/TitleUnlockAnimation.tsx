'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTitleColor } from '@/lib/journey/titles';
import type { TitleUnlock } from '@/lib/journey/types';

interface Props {
  unlock: TitleUnlock | null;
  onComplete: () => void;
}

export default function TitleUnlockAnimation({ unlock, onComplete }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (unlock) {
      setShow(true);
      const t = setTimeout(() => {
        setShow(false);
        setTimeout(onComplete, 500);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [unlock, onComplete]);

  const titleColor = unlock ? getTitleColor(unlock.title) : '';

  return (
    <AnimatePresence>
      {show && unlock && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.3, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 12 }}
            className="relative px-8 py-10 rounded-2xl border border-amber-400/40 bg-gradient-to-b from-amber-400/10 via-black/80 to-purple-400/10 text-center"
            style={{ boxShadow: '0 0 60px rgba(251,191,36,0.2), 0 0 120px rgba(168,85,247,0.1)' }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🎖
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-orbitron text-[10px] text-amber-400/70 tracking-[4px] uppercase mb-2"
            >
              New Title Unlocked
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`font-orbitron text-3xl sm:text-4xl font-bold ${titleColor} mb-2`}
            >
              {unlock.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-mono text-xs text-white/40"
            >
              Day {unlock.day} Achievement
            </motion.p>

            {/* Particle burst */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    delay: Math.random() * 0.3,
                    ease: 'easeOut',
                  }}
                  className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: i % 3 === 0 ? '#00D9FF' : i % 3 === 1 ? '#00FF41' : '#FBBF24',
                    boxShadow: `0 0 6px ${i % 3 === 0 ? '#00D9FF' : i % 3 === 1 ? '#00FF41' : '#FBBF24'}`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
