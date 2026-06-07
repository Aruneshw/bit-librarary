'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CompletionCelebrationProps {
  subjectName: string;
  isVisible: boolean;
  onDismiss: () => void;
}

export default function CompletionCelebration({
  subjectName,
  isVisible,
  onDismiss,
}: CompletionCelebrationProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate particles
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);

      // Auto-dismiss after 3 seconds
      const timer = setTimeout(onDismiss, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onDismiss}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/90" />

          {/* Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-terminal-green"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                boxShadow: `0 0 ${p.size * 2}px rgba(0,255,65,0.6)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -(Math.random() * 100 + 50)],
              }}
              transition={{
                duration: 2,
                delay: p.delay,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Energy pulse */}
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: [0, 4, 8], opacity: [0.8, 0.3, 0] }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              border: '2px solid rgba(0,255,65,0.4)',
              boxShadow: '0 0 30px rgba(0,255,65,0.3)',
            }}
          />

          {/* Text Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Checkmark */}
            <motion.div
              className="text-terminal-green text-4xl"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              ✓
            </motion.div>

            <h2
              className="font-orbitron text-2xl md:text-3xl text-terminal-green font-bold tracking-wider"
              style={{ textShadow: '0 0 20px rgba(0,255,65,0.5)' }}
            >
              SYSTEM COMPLETE
            </h2>

            <p className="font-rajdhani text-lg text-text-white/80 uppercase tracking-[4px]">
              Subject Mastered
            </p>

            <p className="font-mono text-xs text-terminal-green/60 tracking-wider mt-2">
              KNOWLEDGE NODE SYNCHRONIZED
            </p>

            <p className="font-exo2 text-sm text-text-white/40 mt-4 max-w-xs">
              {subjectName}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
