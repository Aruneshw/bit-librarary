'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNoticeStore } from '@/store/noticeStore';
import { useAuthStore } from '@/store/authStore';
import { createClient } from '@/lib/supabase';

export default function AINoticeBoard() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  
  const { notice, fetchNotice, updateNotice, isLoading } = useNoticeStore();
  const { isAdmin } = useAuthStore();

  useEffect(() => {
    fetchNotice();

    // Show notice board only once on login/first load in the current session
    const hasBeenShown = sessionStorage.getItem('notice_shown');
    if (!hasBeenShown) {
      setIsVisible(true);
      sessionStorage.setItem('notice_shown', 'true');
    }

    // Subscribe to system notice updates in real-time
    const supabase = createClient();
    const channel = supabase
      .channel('system-notices-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'system_notices' },
        (payload: any) => {
          if (payload.new && payload.new.message) {
            fetchNotice();
            // Pop open the notice board because it was updated while online!
            setIsVisible(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchNotice]);

  useEffect(() => {
    if (!isVisible) return;

    // Only auto-hide if not admin, or wait longer. Admins might want to edit it.
    const timer = setTimeout(() => {
      if (!isEditing && !isAdmin) setIsVisible(false);
    }, 12000); 

    return () => clearTimeout(timer);
  }, [isVisible, isEditing, isAdmin]);

  const handleSave = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (editText.trim()) {
      await updateNotice(editText.trim());
      setIsEditing(false);
    }
  };

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
            onClick={() => !isEditing && setIsVisible(false)}
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
              <div className="flex justify-between items-center mb-1">
                <span className="font-orbitron text-[10px] text-arc-blue tracking-widest uppercase drop-shadow-[0_0_5px_rgba(0,217,255,0.8)]">
                  System Notice
                </span>
                
                {isAdmin && !isEditing && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditText(notice || '');
                      setIsEditing(true);
                    }}
                    className="text-[10px] font-orbitron text-arc-blue/70 hover:text-arc-blue border border-arc-blue/30 px-2 py-0.5 rounded bg-arc-blue/10 z-10 relative"
                  >
                    Edit
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleSave} className="flex flex-col gap-2 relative z-10" onClick={e => e.stopPropagation()}>
                  <textarea 
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-black/50 border border-arc-blue/50 rounded p-2 text-xs text-text-white font-exo2 focus:outline-none focus:border-arc-blue"
                    rows={2}
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)}
                      className="text-xs text-white/50 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="text-xs bg-arc-blue/20 text-arc-blue px-3 py-1 rounded hover:bg-arc-blue/40"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <p className="font-exo2 text-xs sm:text-sm text-text-white/90 leading-tight min-h-[20px]">
                  {isLoading ? 'Loading system communications...' : (notice || 'Welcome to ARC_OS Academic Nexus')}
                </p>
              )}
            </div>

            {/* Close hint */}
            {!isEditing && (
              <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="text-text-white/40 hover:text-text-white text-sm px-1 z-10 relative">×</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
