'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  const handleAcknowledge = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('settings')
        .update({ tutorial_seen: true })
        .eq('user_id', user.id);
    }
    onClose();
  };

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleAcknowledge();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className="relative glass-panel-blue p-8 md:p-10 max-w-md w-full"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ borderRadius: 'var(--radius-modal)' }}
          >
            {/* Title */}
            <h2 className="font-orbitron text-arc-blue text-xl font-bold tracking-wider text-center mb-6"
              style={{ textShadow: '0 0 12px rgba(0,217,255,0.5)' }}
            >
              WELCOME, OPERATOR
            </h2>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-arc-blue/30 to-transparent mb-6" />

            {/* Instructions */}
            <ul className="space-y-3 mb-8">
              {[
                'Select a subject node to begin',
                'Click any question to expand it',
                'Double-click anywhere to close a question',
                'Track your progress on each subject',
                'Complete all questions for 100% mastery',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-arc-blue font-mono text-xs mt-0.5">{'>'}</span>
                  <span className="font-exo2 text-sm text-text-white/80">{text}</span>
                </li>
              ))}
            </ul>

            {/* Acknowledge Button */}
            <button
              onClick={handleAcknowledge}
              className="w-full py-3 rounded-lg bg-arc-blue/20 border border-arc-blue text-arc-blue font-rajdhani font-bold text-sm tracking-[3px] uppercase
                hover:bg-arc-blue/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]
                active:scale-[0.98] transition-all duration-200"
              id="tutorial-acknowledge-btn"
            >
              Acknowledge
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
