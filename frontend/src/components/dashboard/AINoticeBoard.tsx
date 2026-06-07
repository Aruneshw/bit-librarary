'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AINoticeBoard() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[90%] max-w-[500px]"
        >
          <div 
            className="relative overflow-hidden group border border-arc-blue/30 bg-black/60 backdrop-blur-xl rounded-xl shadow-[0_0_30px_rgba(0,217,255,0.15)] px-5 py-4 flex items-center gap-4 cursor-pointer" 
            onClick={() => setIsVisible(false)}
          >
            {/* Animated Gradient Border Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-arc-blue/0 via-arc-blue/10 to-arc-blue/0 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
            
            {/* AI Icon */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-arc-blue/10 border border-arc-blue/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.4)]">
              <svg className="w-5 h-5 text-arc-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <div className="flex flex-col flex-1">
              <span className="font-orbitron text-[10px] text-arc-blue tracking-widest uppercase mb-1 drop-shadow-[0_0_5px_rgba(0,217,255,0.8)]">
                System Notice
              </span>
              <p className="font-exo2 text-xs sm:text-sm text-text-white/90 leading-tight">
                Here you will get AI based questions soon same as college question
              </p>
            </div>

            {/* Close hint */}
            <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="text-text-white/40 hover:text-text-white text-sm px-1">×</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
